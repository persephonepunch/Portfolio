<?php

$config = [

    'name' => 'yootheme/builder-joomla-module',

    'builder' => 'joomla_module',

    'main' => function () {

        $this['mods'] = function () {
            return $this['db']->fetchAllObjects("SELECT id, title, module, position, content, showtitle, params FROM @modules WHERE client_id = 0 AND published != -2");
        };

    },

    'render' => function ($element) {

        foreach ($this['mods'] as $module) {
            if ($module->id == $element['module']) {
                $element->title = $module->title;
                $element->content = JModuleHelper::renderModule($module);
                $element->props->merge($this['modules']->get('yootheme/joomla-modules')->prepareModule($module)->config, true);
                break;
            }
        }

        return $this['view']->render('@builder/joomla-module/template', compact('element'));
    },

    'events' => [

        'theme.admin' => function () {

            $modules = ['- Select Module -' => ''];

            foreach ($this['mods'] as $module) {
                $modules[$module->position ?: 'none'][$module->title] = $module->id;
            }

            $this['@config']->set('tabs.0.fields.module.options', $modules);
        }

    ],

    'config' => [

        'title' => 'J! Module',
        'width' => 600,
        'element' => true,
        'mixins' => ['element'],
        'tabs' => [

            [

                'title' => 'Content',
                'fields' => [

                    'module' => [
                        'label' => 'Module',
                        'description' => 'Any Joomla module can be displayed in your custom layout.',
                        'type' => 'select',
                        'default' => '',
                        'options' => [],
                    ],

                ],

            ],

            [

                'title' => 'Settings',
                'fields' => [

                    'maxwidth' => '{maxwidth}',

                    'maxwidth_align' => '{maxwidth_align}',

                    'margin' => '{margin}',

                    'margin_remove_top' => '{margin_remove_top}',

                    'margin_remove_bottom' => '{margin_remove_bottom}',

                    'animation' => '{animation}',

                    'visibility' => '{visibility}',

                    'id' => '{id}',

                    'class' => '{class}',

                    'name' => '{name}',

                ],

            ],

        ],

    ],

];

return defined('_JEXEC') ? $config : false;
