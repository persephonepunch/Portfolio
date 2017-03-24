<?php

return [

    'name' => 'yootheme/builder-column',

    'builder' => 'column',

    'render' => function ($element) {
        return $this['view']->render('@builder/column/template', compact('element'));
    },

    'events' => [

        'theme.admin' => function () {
            $this['scripts']->add('builder-column', '@builder/column/app/column.min.js', 'customizer-builder');
        }

    ]

];
