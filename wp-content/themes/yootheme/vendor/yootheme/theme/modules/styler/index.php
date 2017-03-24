<?php

use YOOtheme\Theme\StyleController;
use YOOtheme\Util\File;

return [

    'name' => 'yootheme/styler',

    'main' => function ($app) {

        $app['#style'] = function () {
            return new StyleController($this);
        };

    },

    'routes' => function ($route) {

        $route->post('/styles', '#style:save');

    },

    'events' => [

        'theme.init' => function ($theme) {

            // set defaults
            $theme['@config']->merge($this['@config']->get('defaults'), true);
        },

        'theme.site' => [function ($theme) {

            // set fonts
            if ($fonts = $theme['@config']->get('fonts', [])) {
                $this['styles']->add('google-fonts', $this['url']->to('//fonts.googleapis.com/css', [
                    'family' => implode('|', array_map(function ($font) {
                        return trim($font['name'], "'").($font['variants'] ? ':'.$font['variants'] : '');
                    }, $fonts)),
                    'subsets' => implode(',', array_unique(array_map('trim', explode(',', implode(',', array_map(function ($font) {
                        return $font['subsets'];
                    }, $fonts)))))) ?: null
                ]));
            }

            // uikit dev
            if (isset($theme['@customizer']) && $theme['@customizer']->isActive() && $test = $theme['@config']->get('uikit_dev')) {

                $this['styles']->add('uikit-dev-css', "{$this->path}/tests/tests.css");

                $bodyClass = $theme->get('body_class');
                $theme->set('body_class', $bodyClass->merge(['yo-style-devmode']));

                $this['view']['sections']->set('builder', function () use ($test) {
                    return $this['view']->render("{$this->path}/tests/index.php", ['test' => is_string($test) && file_exists("{$this->path}/tests/{$test}.html") ? $test : 'index']);
                });
            }

        }, -5],

        'theme.admin' => function ($theme) {

            $styles = [];
            $imports = [];

            // add styles
            foreach ($this['locator']->findAll('@theme/less/theme.*.less') as $file) {
                $styles[substr(basename($file, '.less'), 6)] = [
                    'filename' => $this['url']->to($file),
                    'contents' => file_get_contents($file)
                ];
            }

            $resolve = function ($file) use (&$imports, &$resolve) {

                $imports[File::normalizePath($this['url']->to($file))] = $contents = @file_get_contents($file) ?: '';

                if (preg_match_all('/^@import.*"(.*)";/m', $contents, $matches)) {
                    foreach ($matches[1] as $path) {
                        $resolve(dirname($file).'/'.$path);
                    }
                }

            };

            // add imports
            if (isset($theme->options['styles'], $theme->options['styles']['imports'])) {
                foreach ((array) $theme->options['styles']['imports'] as $path) {
                    foreach ($this['locator']->findAll("@theme/{$path}") as $file) {
                        $resolve($file);
                    }
                }
            }

            $this['@config']->set('section.styles', $styles);
            $this['@config']->set('section.imports', $imports);

            $this['scripts']->add('customizer-styler', "{$this->path}/app/styler.min.js", 'customizer');
        }

    ],

    'config' => [

        'section' => [
            'title' => 'Style',
            'width' => 350,
            'priority' => 11
        ],

        'fields' => [],

        'defaults' => [

            'less' => [],
            'fonts' => [],

        ]

    ]

];
