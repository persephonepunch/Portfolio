var path = require('path');
var loaders = [
    {loader: 'vue', test: /\.vue$/},
    {loader: 'vue-html', test: /\.html$/},
    {loader: 'json', test: /\.json/},
    {
        loader: 'babel',
        test: /\.js$/,
        include: [
            path.resolve(__dirname, 'app'),
            path.resolve(__dirname, 'builder'),
            path.resolve(__dirname, 'modules'),
            path.resolve(__dirname, 'platforms')
        ]
    }
];

module.exports = [

    {
        entry: {

            // modules
            'modules/styler/app/styler': './modules/styler/app/styler.vue',
            'modules/styler/app/worker': './modules/styler/app/lib/worker',
            'modules/layout/app/layout': './modules/layout/app/layout',
            'modules/builder/app/builder': './modules/builder/app/builder.vue',
            'modules/settings/app/settings': './modules/settings/app/settings.vue',

            // joomla
            'platforms/joomla/app/customizer': './platforms/joomla/app/customizer.vue',
            'platforms/joomla-menus/app/menus': './platforms/joomla-menus/app/menus.vue',
            'platforms/joomla-modules/app/modules': './platforms/joomla-modules/app/modules.vue',
            'platforms/joomla-modules/app/module-edit': './platforms/joomla-modules/app/module-edit.vue',

            // wordpress
            'platforms/wordpress/app/customizer': './platforms/wordpress/app/customizer.vue',
            'platforms/wordpress-widgets/app/widgets': './platforms/wordpress-widgets/app/widgets.vue',

            // builder
            'builder/map/app/map': './builder/map/app/map.js',
            'builder/row/app/row': './builder/row/app/row.vue',
            'builder/column/app/column': './builder/column/app/column.vue',
            'builder/section/app/section': './builder/section/app/section.vue'

        },
        output: {
            filename: './[name].min.js'
        },
        externals: {
            "vue": "Vue",
            "uikit": "UIkit",
            "jquery": "jQuery",
            "builder": "Builder",
            "customizer": "Customizer"
        },
        resolve: {
            alias: {
                "util$": __dirname + "/app/lib/util.js"
            }
        },
        module: {loaders}
    },

    {
        // Vue
        entry: './app/vue',
        output: {
            filename: './app/vue.min.js'
        },
        externals: {
            "uikit": "UIkit",
            "jquery": "jQuery"
        },
        resolve: {
            alias: {
                "util$": __dirname + "/app/lib/util.js",
                "spectrum$": __dirname + "/../../assets/spectrum/spectrum.js",
                "codemirror$": __dirname + "/../../assets/codemirror/lib/codemirror.js",
                "codemirror-css$": __dirname + "/../../assets/codemirror/mode/css/css.js",
                "codemirror-js$": __dirname + "/../../assets/codemirror/mode/javascript/javascript.js"
            }
        },
        module: {loaders}
    },

    {
        // UIkit
        entry: './app/uikit',
        output: {
            filename: './app/uikit.min.js'
        },
        externals: {
            "jquery": "jQuery",
            "uikit": "UIkit"
        },
        resolve: {
            alias: {
                "uikit": __dirname + "/../../assets/uikit/js"
            }
        },
        module: {loaders}
    }

];
