<?php

use YOOtheme\Theme\Builder;
use YOOtheme\Theme\ElementRenderer;
use YOOtheme\Theme\StyleRenderer;
use YOOtheme\Util\Arr;
use YOOtheme\Util\Collection;

return [

    'name' => 'yootheme/builder',

    'main' => function ($app) {

        $this['@data'] = function () {
            return new Collection();
        };

        $app['builder'] = function () {
            return new Builder();
        };

        $app['modules']->addLoader(function ($options, $next) use ($app) {

            $module = $next($options);

            if ($type = Arr::get($options, 'builder')) {

                $options = $module->options;
                $options['config'] = $module['@config'];

                if ($render = Arr::get($options, 'render')) {
                    if ($render instanceof \Closure) {
                        $options['render'] = $render->bindTo($module, $module);
                    }
                }

                $app['builder']->add($type, $options);
            }

            return $module;
        });

    },

    'include' => [

        '../../builder/*/index.php'

    ],

    'routes' => function ($route) {

        $route->post('/builder/library', function ($id, $element, $response) {

            $this['option']->set("library.{$id}", $this['builder']->load($element));

            return $response->withJson(['message' => 'success']);
        });

        $route->delete('/builder/library', function ($id, $response) {

            $this['option']->remove("library.{$id}");

            return $response->withJson(['message' => 'success']);
        });
    },

    'events' => [

        'theme.site' => function ($theme) {

            $this['builder']->addRenderer(new StyleRenderer);
            $this['builder']->addRenderer(new ElementRenderer);

            if ($theme['@customizer']->isActive()) {

                $this['builder']->addRenderer(function ($element, $type, $next) {

                    $content = $next($element, $type);

                    if (!in_array($element->type, ['layout', 'section', 'column'])) {
                        $content = preg_replace('/(^\s*<[^>]+)(>)/i', "$1 data-type=\"{$element->type}\"$2", $content, 1);
                    }

                    return $content;
                });

            }

        },

        'theme.admin' => [function ($theme) {

            foreach ($this['builder']->all() as $name => $type) {
                $this['@data']->set("types.{$name}", $type['config']);
            }

            $this['@data']->set('library', new Collection($this['option']->get('library')));
            $this['scripts']->add('customizer-builder', "{$this->path}/app/builder.min.js", 'customizer');

        }, -5],

        'view' => function () {
            if ($data = $this['@data']->all()) {
                $this['scripts']->add('builder-data', sprintf('var $builder = %s;', json_encode($data)), 'customizer-builder', 'string');
            }
        }

    ],

    'config' => [

        'section' => [
            'title' => 'Builder',
            'heading' => false,
            'width' => 600,
            'priority' => 20,
            'edit' => true,
        ]

    ]

];
