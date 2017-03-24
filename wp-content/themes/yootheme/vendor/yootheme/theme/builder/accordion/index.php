<?php

return [

    'name' => 'yootheme/builder-accordion',

    'builder' => 'accordion',

    'render' => function ($element) {
        return $this['view']->render('@builder/accordion/template', compact('element'));
    },

    'config' => [

        'title' => 'Accordion',
        'width' => 600,
        'element' => true,
        'mixins' => ['element', 'container'],
        'tabs' => [

            [

                'title' => 'Content',
                'fields' => [

                    'content' => [
                        'label' => 'Items',
                        'type' => 'content-items',
                        'item' => 'accordion_item',
                    ],

                    'multiple' => [
                        'label' => 'Behavior',
                        'type' => 'checkbox',
                        'text' => 'Allow multiple open items',
                    ],

                    'collapsible' => [
                        'type' => 'checkbox',
                        'text' => 'Allow all items to be closed',
                    ],

                ],

            ],

            [

                'title' => 'Settings',
                'fields' => [

                    'text_align' => '{text_align_justify}',

                    'text_align_breakpoint' => '{text_align_breakpoint}',

                    'text_align_fallback' => '{text_align_justify_fallback}',

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

        'defaults' => [

            'collapsible' => true

        ],

    ],

    'default' => [

        'children' => array_fill(0, 3, [
            'type' => 'accordion_item',
        ]),

    ],

    'include' => [

        'yootheme/builder-accordion-item' => [

            'builder' => 'accordion_item',

            'config' => [

                'title' => 'Item',
                'width' => 600,
                'mixins' => ['element', 'item'],
                'fields' => [

                    'title' => [
                        'label' => 'Title',
                    ],

                    'content' => [
                        'label' => 'Content',
                        'type' => 'editor',
                    ],

                ],

            ],

            'default' => [

                'props' => [
                    'title' => 'Item',
                    'content' => '{lorem_ipsum}',
                ],

            ],

        ],

    ],

];
