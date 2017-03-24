<?php

return [

    'name' => 'yootheme/builder-grid',

    'builder' => 'grid',

    'render' => function ($element) {
        return $this['view']->render('@builder/grid/template', compact('element'));
    },

    'config' => [

        'title' => 'Grid',
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
                        'item' => 'grid_item',
                    ],

                    'grid_default' => [
                        'label' => 'Phone Portrait',
                        'type' => 'select',
                        'default' => '1',
                        'options' => [
                            '1 Column' => '1',
                            '2 Columns' => '2',
                            '3 Columns' => '3',
                            '4 Columns' => '4',
                            '5 Columns' => '5',
                            '6 Columns' => '6',
                        ],
                    ],

                    'grid_small' => [
                        'label' => 'Phone Landscape',
                        'type' => 'select',
                        'default' => '',
                        'options' => [
                            'Inherit' => '',
                            '1 Column' => '1',
                            '2 Columns' => '2',
                            '3 Columns' => '3',
                            '4 Columns' => '4',
                            '5 Columns' => '5',
                            '6 Columns' => '6',
                        ],
                    ],

                    'grid_medium' => [
                        'label' => 'Tablet Landscape',
                        'type' => 'select',
                        'default' => '3',
                        'options' => [
                            'Inherit' => '',
                            '1 Column' => '1',
                            '2 Columns' => '2',
                            '3 Columns' => '3',
                            '4 Columns' => '4',
                            '5 Columns' => '5',
                            '6 Columns' => '6',
                        ],
                    ],

                    'grid_large' => [
                        'label' => 'Desktop',
                        'type' => 'select',
                        'default' => '',
                        'options' => [
                            'Inherit' => '',
                            '1 Column' => '1',
                            '2 Columns' => '2',
                            '3 Columns' => '3',
                            '4 Columns' => '4',
                            '5 Columns' => '5',
                            '6 Columns' => '6',
                        ],
                    ],

                    'grid_xlarge' => [
                        'label' => 'Large Screens',
                        'type' => 'select',
                        'default' => '',
                        'options' => [
                            'Inherit' => '',
                            '1 Column' => '1',
                            '2 Columns' => '2',
                            '3 Columns' => '3',
                            '4 Columns' => '4',
                            '5 Columns' => '5',
                            '6 Columns' => '6',
                        ],
                    ],

                    'gutter' => [
                        'label' => 'Gutter',
                        'type' => 'select',
                        'default' => '',
                        'options' => [
                            'Small' => 'small',
                            'Medium' => 'medium',
                            'Default' => '',
                            'Large' => 'large',
                            'Collapse' => 'collapse',
                        ],
                    ],

                    'divider' => [
                        'description' => 'Set the grid gutter width and display dividers between grid cells.',
                        'type' => 'checkbox',
                        'text' => 'Show dividers between the grid items',
                    ],

                ],

            ],

            [

                'title' => 'Settings',
                'fields' => [

                    'text_align' => '{text_align_justify}',

                    'text_align_breakpoint' => '{text_align_breakpoint}',

                    'text_align_fallback' => '{text_align_justify_fallback}',

                    'item_maxwidth' => '{maxwidth}',

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
            'grid_default' => '1',
            'grid_medium' => '3',
        ],

    ],

    'default' => [

        'children' => array_fill(0, 3, [
            'type' => 'grid_item',
        ])

    ],

    'include' => [

        'yootheme/builder-grid-item' => [

            'builder' => 'grid_item',

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
                    'content' => '{lorem_ipsum}',
                ],

            ],
        ],
    ],

];
