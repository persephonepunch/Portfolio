<?php

namespace YOOtheme\Theme;

use YOOtheme\Controller;
use YOOtheme\Util\File;

class StyleController extends Controller
{
    public function save($request, $response)
    {
        try {

            $upload = $request->getUploadedFile('files');

            if (!$upload || $upload->getError()) {
                throw new \RuntimeException('Invalid file upload.');
            }

            if (!$contents = (string) $upload->getStream()) {
                throw new \RuntimeException('Unable to read contents file.');
            }

            if (!$contents = @base64_decode($contents)) {
                throw new \RuntimeException('Base64 Decode failed.');
            }

            if (!$files = @json_decode($contents, true)) {
                throw new \RuntimeException('Unable to decode JSON from temporary file.');
            }

            foreach ($files as $file => $data) {

                $file = new File("@theme/$file");

                if (!$file->isFile()) {
                    continue;
                }

                if ($file->putContents($data) === false) {
                    throw new \RuntimeException(sprintf('Unable to write file (%s).', (string) $file));
                }
            }

            $message = 'success';

        } catch (\RuntimeException $e) {

            $message = $e->getMessage();
        }

        return $response->withJson(compact('message'));
    }
}
