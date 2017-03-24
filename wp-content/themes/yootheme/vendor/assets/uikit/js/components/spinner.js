/*! UIkit 3.0.0 | http://www.getuikit.com | (c) 2014 - 2016 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

UIkit.component('spinner', UIkit.components.icon.extend({

    name: 'spinner',

    init: function init() {
        this.height = this.width = this.$el.width();
    },
    ready: function ready() {
        var _this = this;

        this.svg.then(function (svg) {
            var circle = svg.find('circle'),
                diameter = Math.floor(_this.width / 2);

            svg[0].setAttribute('viewBox', '0 0 ' + _this.width + ' ' + _this.width);
            circle.attr('cx', diameter).attr('cy', diameter).attr('r', diameter - parseInt(circle.css('stroke-width'), 10));
        });
    }
}));

})));