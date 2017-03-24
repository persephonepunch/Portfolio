<?php

namespace YOOtheme\Theme\Wordpress;

use YOOtheme\EventSubscriber;

class UpgradeListener extends EventSubscriber
{
    public function onInit($theme)
    {
        if (!$this['admin']) {
            return;
        }

        add_action('wp_loaded', function () use ($theme) {
            $theme['update']->register(basename($theme->path), 'theme', $theme->options['update'], ['key' => $theme->get('yootheme_apikey')]);
        }, 15);

        add_filter('upgrader_pre_install', function ($return, $package) {
            return $this->copy($return, $package);
        }, 10, 2);

        add_filter('upgrader_post_install', function ($return, $package) {
            return $this->copy($return, $package, true);
        }, 10, 2);
    }

    public function copy($return, $package, $reverse = false)
    {
        global $wp_filesystem;

        if (is_wp_error($return)) {
            return $return;
        }

        $theme = isset($package['theme']) ? $package['theme'] : '';

        if ($theme == basename($this['theme']->path)) {

            $paths = [
                $this['theme']->path."/css/theme.css",
                $wp_filesystem->wp_content_dir()."/upgrade/{$theme}_theme.css"
            ];

            if ($reverse) {
                $wp_filesystem->copy($paths[1], $paths[0], true);
                $wp_filesystem->delete($paths[1]);
            } else {
                $wp_filesystem->copy($paths[0], $paths[1]);
            }
        }

        return $return;
    }

    public static function getSubscribedEvents()
    {
        return [
            'theme.init' => 'onInit'
        ];
    }
}
