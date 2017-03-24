<?php

$config = [

    'name' => 'yootheme/builder-wordpress-widget',

    'builder' => 'wordpress_widget',

    'render' => function ($element) {

        global $wp_registered_widgets;

        if (isset($wp_registered_widgets[$element['widget']])) {

            $instance = $wp_registered_widgets[$element['widget']];

            $defaults = [
                'name' => '',
                'id' => '',
                'description' => '',
                'class' => '',
                'before_widget' => '<content>',
                'after_widget' => '</content>',
                'before_title' => '<title>',
                'after_title' => '</title>',
            ];

            if (isset($instance['callback']) && is_callable($instance['callback'])) {
                call_user_func($instance['callback'], wp_parse_args($instance, $defaults), $instance['params'][0]);
                $module = $this['modules']->get('yootheme/wordpress-widgets');
                if ($widget = array_pop($module->widgets[$module->sidebar])) {
                    $element->title = $widget->title;
                    $element->content = $widget->content;
                    $element->props->merge($widget->config, true);
                }
            }

        }

        return $this['view']->render('@builder/wordpress-widget/template', compact('element'));
    },

    'events' => [

        'theme.admin' => function () {

            global $wp_registered_widgets;

            $widgets = ['- Select Widget -' => ''];

            foreach (wp_get_sidebars_widgets() as $pos => $instances) {
                foreach ($instances as $instance) {
                    $id_base = _get_widget_id_base($instance);
                    $id = str_replace($id_base . '-', '', $instance);
                    $data = get_option('widget_' . $id_base);

                    if ($widget = $wp_registered_widgets[$instance]) {
                        $widget_title = (is_array($data[$id]) && array_key_exists('title', $data[$id])) ? $widget['name'] .' : '. $data[$id]['title'] : $widget['name'];

                        $widgets[$pos][$widget_title] = $widget['id'];
                    }
                }
            }

            $this['@config']->set('tabs.0.fields.widget.options', $widgets);
        }

    ],

    'config' => [

        'title' => 'WP Widget',
        'width' => 600,
        'element' => true,
        'mixins' => ['element'],
        'tabs' => [

            [

                'title' => 'Content',
                'fields' => [

                    'widget' => [
                        'label' => 'Widget',
                        'description' => 'Any WordPress widget can be displayed in your custom layout.',
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

return defined('WPINC') ? $config : false;
