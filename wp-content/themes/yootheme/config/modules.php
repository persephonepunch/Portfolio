<?php

return [

    'fields' => [

        'visibility' => [
            'label' => 'Visibility',
            'description' => 'Display the module only from this device width and larger.',
            'type' => 'select',
            'default' => '',
            'options' => [
                'Always' => '',
                'Small (Phone)' => 's',
                'Medium (Tablet)' => 'm',
                'Large (Desktop)' => 'l',
                'X-Large (Large Screens)' => 'xl',
            ],
        ],

        'style' => [
            'label' => 'Style',
            'description' => 'The module\'s style.',
            'type' => 'select',
            'default' => '',
            'options' => [
                'Blank' => '',
                'Card Default' => 'card-default',
                'Card Primary' => 'card-primary',
                'Card Secondary' => 'card-secondary',
                'Card Hover' => 'card-hover',
            ],
            'show' => 'position == "top" || position == "bottom" || position == "sidebar"',
        ],

        'title_style' => [
            'label' => 'Title Style',
            'description' => 'Title styles differ in font-size but also may come with a predefined color, size and font.',
            'type' => 'select',
            'default' => '',
            'options' => [
                'Default' => '',
                'Primary' => 'heading-primary',
                'H1' => 'h1',
                'H2' => 'h2',
                'H3' => 'h3',
                'H4' => 'h4',
                'H5' => 'h5',
                'H6' => 'h6',
            ],
            'show' => 'position == "top" || position == "bottom" || position == "sidebar" || position == "mobile"',
        ],

        'title_decoration' => [
            'label' => 'Title Decoration',
            'description' => 'Decorate the title with a divider, bullet or a line that is vertically centered to the heading.',
            'type' => 'select',
            'default' => '',
            'options' => [
                'None' => '',
                'Divider' => 'divider',
                'Bullet' => 'bullet',
                'Line' => 'line',
            ],
            'show' => 'position == "top" || position == "bottom" || position == "sidebar" || position == "mobile"',
        ],

        'text_align' => [
            'label' => 'Text Alignment',
            'description' => 'The module\'s text alignment.',
            'type' => 'checkbox',
            'text' => 'Center the module\'s content',
            'show' => 'position == "top" || position == "bottom" || position == "sidebar" || position == "mobile"',
        ],

        'width' => [
            'label' => 'Width',
            'description' => 'The width of the grid column where the module is inside.',
            'type' => 'select',
            'default' => '',
            'options' => [
                'Expand' => '',
                '20%' => '1-5',
                '25%' => '1-4',
                '33%' => '1-3',
                '40%' => '2-5',
                '50%' => '1-2',
                '100%' => '1-1'
            ],
            'show' => 'position == "top" || position == "bottom"',
        ],

        'maxwidth' => [
            'label' => 'Max Width',
            'description' => 'The module\'s maximum width.',
            'type' => 'select',
            'default' => '',
            'options' => [
                'None' => '',
                'Small' => 'small',
                'Medium' => 'medium',
                'Large' => 'large',
                'X-Large' => 'xlarge',
                'XX-Large' => 'xxlarge',
            ],
            'show' => 'position == "top" || position == "bottom"',
        ],

        'maxwidth_align' => [
            'label' => 'Max Width (Alignment)',
            'description' => 'Set the how the module should align when the container is larger than its max-width.',
            'type' => 'checkbox',
            'text' => 'Center the module',
            'show' => 'maxwidth != "" && (position == "top" || position == "bottom")',
        ],

    ],

];
