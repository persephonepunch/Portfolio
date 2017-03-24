<?php

use YOOtheme\Util\File;

return [

    'name' => 'yootheme/framework',

    'main' => function ($app) {

        $app->extend('view', function ($view, $app) {

            $view->addFunction('url', [$app['url'], 'to']);
            $view->addFunction('route', [$app['url'], 'route']);

            return $view;
        });

        if (!isset($app['path.cache'])) {
            $app['path.cache'] = File::normalizePath("{$this->path}/../../../cache");
        }

        $app->trigger('framework.init', [$app]);

    },

    'require' => [

        'yootheme/app',
        'yootheme/asset',
        'yootheme/view',
        'yootheme/common',
        'yootheme/joomla',
        'yootheme/wordpress',

    ],

    'include' => [

        'modules/*/index.php',
        'platforms/*/index.php',

    ]

];
