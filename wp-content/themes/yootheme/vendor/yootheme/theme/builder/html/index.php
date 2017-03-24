<?php

return [

    'name' => 'yootheme/builder-html',

    'builder' => 'html',

    'config' => [

        'title' => 'Html',
        'width' => 600,
        'element' => true,
        'mixins' => ['element'],
        'fields' => [

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

];
