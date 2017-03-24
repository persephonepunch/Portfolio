<?php

namespace YOOtheme\Image;

class GDResource extends Resource
{
    /**
     * @var resource
     */
    protected $image;

    /**
     * {@inheritdoc}
     */
    public function save($file, $type = null)
    {
        switch (strtolower($type ?: $this->type)) {

            case 'gif':
                imagegif($this->image, $file);
                break;

            case 'png':
                imagepng($this->image, $file, round($this->quality * 0.09));
                break;

            case 'jpeg':
                imagejpeg($this->image, $file, round($this->quality));
                break;

            default:
                throw new \RuntimeException('Image type is not supported');
        }
    }

    /**
     * {@inheritdoc}
     */
    public function doCrop($width, $height, $x, $y)
    {
        $image = $this->createImage($width, $height);

        imagealphablending($image, false);
        imagesavealpha($image, true);
        imagecopy($image, $this->image, 0, 0, intval($x), intval($y), imagesx($this->image), imagesy($this->image));
        imagedestroy($this->image);

        $this->image = $image;
    }

    /**
     * {@inheritdoc}
     */
    public function doResize($width, $height, $dstWidth, $dstHeight, $background = 'transparent')
    {
        $image = $this->createImage($width, $height);
        $color = $this->allocateColor($background);

        imagealphablending($image, false);
        imagefill($image, 0, 0, $color);

        if ($background == 'transparent') {
            imagesavealpha($image, true);
        }

        imagecopyresampled($image, $this->image, ($width - $dstWidth) / 2, ($height - $dstHeight) / 2, 0, 0, $dstWidth, $dstHeight, imagesx($this->image), imagesy($this->image));
        imagedestroy($this->image);

        $this->image = $image;
    }

    /**
     * Creates an image resource.
     *
     * @return resource
     */
    protected function createImage($width, $height)
    {
        if (!$this->image) {

            switch ($this->type) {

                case 'gif':
                    $this->image = imagecreatefromgif($this->file);
                    break;

                case 'png':
                    $this->image = imagecreatefrompng($this->file);
                    break;

                case 'jpeg':
                    $this->image = imagecreatefromjpeg($this->file);
                    break;

                default:
                    throw new \RuntimeException('Image type is not supported');
            }
        }

        return imagecreatetruecolor($width, $height);
    }

    /**
     * Allocates an image color.
     *
     * @param  mixed $color
     * @return int
     */
    protected function allocateColor($color)
    {
        $rgba = $this->parseColor($color);

        $b = ($rgba) & 0xff;
        $rgba >>= 8;
        $g = ($rgba) & 0xff;
        $rgba >>= 8;
        $r = ($rgba) & 0xff;
        $rgba >>= 8;
        $a = ($rgba) & 0xff;

        $c = imagecolorallocatealpha($this->image, $r, $g, $b, $a);

        if ($color == 'transparent') {
            imagecolortransparent($this->image, $c);
        }

        return $c;
    }
}
