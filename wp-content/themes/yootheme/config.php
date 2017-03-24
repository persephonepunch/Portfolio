<?php

return array_merge([

    'name' => 'YOOtheme',

    'main' => 'YOOtheme\\Theme',

    'require' => 'yootheme/theme',

    'include' => 'vendor/yootheme/theme/index.php',

    'menus' => [

        'navbar' => 'Navbar',
        'mobile' => 'Mobile',

    ],

    'positions' => [

        'toolbar-left' => 'Toolbar Left',
        'toolbar-right' => 'Toolbar Right',
        'navbar' => 'Navbar',
        'header' => 'Header',
        'top' => 'Top',
        'sidebar' => 'Sidebar',
        'bottom' => 'Bottom',
        'mobile' => 'Mobile',

    ],

    'styles' => [

        'imports' => [
            'less/*.less',
            'vendor/assets/uikit/images/*.*',
        ],

    ],

    'config' => [

        'menu' => [
            'positions' => [
                'navbar' => '',
                'mobile' => '',
            ]
        ]

    ],

    'events' => [

        'theme.site' => function ($theme) {

            // add assets
            $this['styles']->add('theme-style', 'css/theme.css', 'highlight');
            $this['scripts']->add('theme-script', 'js/theme.js', 'theme-uikit');
            $this['scripts']->add('theme-uikit', 'vendor/assets/uikit/js/uikit.min.js');

            if ($custom = $this['locator']->find('@assets/css/custom.css')) {
                $this['styles']->add('theme-custom', $custom, 'theme-style');
            }

            if ($custom = $theme->get('custom_js')) {
                $this['scripts']->add('theme-custom', "try { {$custom} } catch (e) { console.error('Custom Theme JS Code: ', e); }", 'theme-script', 'string');
            }

        },

        'content' => function ($content) {

            // add highlighter
            if ($style = $this['theme']->get('highlight') and strpos($content, '</code>')) {
                $this['styles']->add('highlight', "vendor/assets/highlightjs/styles/{$style}.css");
                $this['scripts']->add('highlight', 'vendor/assets/highlightjs/highlight.pack.min.js', 'theme-script', ['defer' => true]);
                $this['scripts']->add('highlight-init', 'jQuery(function() {hljs.initHighlightingOnLoad()});', 'highlight', 'string');
            }

        }

    ],

    'yootheme/layout' => require 'config/layout.php',
    'yootheme/settings' => require 'config/settings.php',
    'yootheme/styler' => require 'config/styler.php',

], require 'config/platform.php');
