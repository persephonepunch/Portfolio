/*! UIkit 3.0.0 | http://www.getuikit.com | (c) 2014 - 2016 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('uikit')) :
    typeof define === 'function' && define.amd ? define(['uikit'], factory) :
    (factory(global.UIkit));
}(this, (function (uikit) { 'use strict';

var isInView = uikit.util.isInView;


UIkit.component('gif', {

    update: {
        handler: function handler() {

            var inview = isInView(this.$el);

            if (!this.isInView && inview) {
                this.$el[0].src = this.$el[0].src;
            }

            this.isInView = inview;
        },


        events: ['scroll', 'load', 'resize', 'orientationchange']
    }

});

})));