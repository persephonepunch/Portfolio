/*! UIkit 3.0.0 | http://www.getuikit.com | (c) 2014 - 2016 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define(['jquery'], factory) :
    (global.UIkit = factory(global.jQuery));
}(this, (function ($) { 'use strict';

var $__default = 'default' in $ ? $['default'] : $;

var langDirection = $__default('html').attr('dir') == 'rtl' ? 'right' : 'left';

function isReady() {
    return document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll;
}

function ready(fn) {

    var handle = function handle() {
        off(document, 'DOMContentLoaded', handle);
        off(window, 'load', handle);
        fn();
    };

    if (isReady()) {
        fn();
    } else {
        on(document, 'DOMContentLoaded', handle);
        on(window, 'load', handle);
    }
}

function on(el, type, listener, useCapture) {
    $__default(el)[0].addEventListener(type, listener, useCapture);
}

function off(el, type, listener, useCapture) {
    $__default(el)[0].removeEventListener(type, listener, useCapture);
}

function transition(element, props) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;
    var transition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'linear';


    var d = $__default.Deferred();

    element = $__default(element);

    for (var name in props) {
        element.css(name, element.css(name));
    }

    var timer = setTimeout(function () {
        return element.trigger(transitionend || 'transitionend');
    }, duration);

    element.one(transitionend || 'transitionend', function (e, cancel) {
        clearTimeout(timer);
        element.removeClass('uk-transition').css('transition', '');
        if (!cancel) {
            d.resolve();
        } else {
            d.reject();
        }
    }).addClass('uk-transition').css('transition', 'all ' + duration + 'ms ' + transition).css(props);

    return d.promise();
}

var Transition = {

    start: transition,

    stop: function stop(element) {
        $__default(element).trigger(transitionend || 'transitionend');
        return this;
    },
    cancel: function cancel(element) {
        $__default(element).trigger(transitionend || 'transitionend', [true]);
        return this;
    },
    inProgress: function inProgress(element) {
        return $__default(element).hasClass('uk-transition');
    }
};

function animate(element, animation) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
    var origin = arguments[3];
    var out = arguments[4];


    var d = $__default.Deferred(),
        cls = out ? 'uk-animation-leave' : 'uk-animation-enter';

    element = $__default(element);

    if (animation.lastIndexOf('uk-animation-', 0) === 0) {

        if (origin) {
            animation += ' uk-animation-' + origin;
        }

        if (out) {
            animation += ' uk-animation-reverse';
        }
    }

    reset();

    element.one(animationend || 'animationend', function () {
        return d.resolve().then(reset);
    }).css('animation-duration', duration + 'ms').addClass(animation);

    var cancel = requestAnimationFrame$1(function () {
        return element.addClass(cls);
    });

    if (!animationend) {
        requestAnimationFrame$1(function () {
            return Animation.cancel(element);
        });
    }

    return d.promise();

    function reset() {
        cancelAnimationFrame(cancel);
        element.css('animation-duration', '').removeClass(cls + ' ' + animation);
    }
}

var Animation = {
    in: function _in(element, animation, duration, origin) {
        return animate(element, animation, duration, origin, false);
    },
    out: function out(element, animation, duration, origin) {
        return animate(element, animation, duration, origin, true);
    },
    inProgress: function inProgress(element) {
        return $__default(element).hasClass('uk-animation-enter') || $__default(element).hasClass('uk-animation-leave');
    },
    cancel: function cancel(element) {
        $__default(element).trigger(animationend || 'animationend');
        return this;
    }
};

function isWithin(element, selector) {
    element = $__default(element);
    return element.is(selector) || !!(isString(selector) ? element.parents(selector).length : $__default.contains(selector instanceof $__default ? selector[0] : selector, element[0]));
}

function attrFilter(element, attr, pattern, replacement) {
    element = $__default(element);
    return element.attr(attr, function (i, value) {
        return value ? value.replace(pattern, replacement) : value;
    });
}

function removeClass(element, cls) {
    return attrFilter(element, 'class', new RegExp('(^|\\s)' + cls + '(?!\\S)', 'g'), '');
}

function createEvent(e) {
    var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (isString(e)) {
        var event = document.createEvent('Event');
        event.initEvent(e, bubbles, cancelable);
        return event;
    }

    return e;
}

var win = $__default(window);
function isInView(element) {
    var offsetTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var offsetLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


    element = $__default(element);

    if (!element.is(':visible')) {
        return false;
    }

    var scrollLeft = win.scrollLeft(),
        scrollTop = win.scrollTop(),
        _element$offset = element.offset(),
        top = _element$offset.top,
        left = _element$offset.left;

    return top + element.height() >= scrollTop && top - offsetTop <= scrollTop + win.height() && left + element.width() >= scrollLeft && left - offsetLeft <= scrollLeft + win.width();
}

function getIndex(index, elements) {
    var current = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


    elements = $__default(elements);

    var length = $__default(elements).length;

    index = (isNumber(index) ? index : index === 'next' ? current + 1 : index === 'previous' ? current - 1 : isString(index) ? parseInt(index, 10) : elements.index(index)) % length;

    return index < 0 ? index + length : index;
}

var voidElements = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    menuitem: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
};
function isVoidElement(element) {
    element = $__default(element);
    return voidElements[element[0].tagName.toLowerCase()];
}

var Dimensions = {
    ratio: function ratio(dimensions, prop, value) {
        var _ref;

        var aProp = prop === 'width' ? 'height' : 'width';

        return _ref = {}, _ref[aProp] = Math.round(value * dimensions[aProp] / dimensions[prop]), _ref[prop] = value, _ref;
    },
    fit: function fit(dimensions, maxDimensions) {
        var _this = this;

        dimensions = $.extend({}, dimensions);

        $.each(dimensions, function (prop) {
            return dimensions = dimensions[prop] > maxDimensions[prop] ? _this.ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
        });

        return dimensions;
    },
    cover: function cover(dimensions, maxDimensions) {
        var _this2 = this;

        dimensions = this.fit(dimensions, maxDimensions);

        $.each(dimensions, function (prop) {
            return dimensions = dimensions[prop] < maxDimensions[prop] ? _this2.ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
        });

        return dimensions;
    }
};

function query(selector, context) {
    var selectors = getContextSelectors(selector);
    return selectors ? selectors.reduce(function (context, selector) {
        return toJQuery(selector, context);
    }, context) : toJQuery(selector);
}

var Observer = window.MutationObserver || window.WebKitMutationObserver;
var requestAnimationFrame$1 = window.requestAnimationFrame || function (fn) {
    return setTimeout(fn, 1000 / 60);
};
var cancelAnimationFrame = window.cancelAnimationFrame || window.clearTimeout;

var hasTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch || navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 // IE 10
|| navigator.pointerEnabled && navigator.maxTouchPoints > 0; // IE >=11

var pointerDown = !hasTouch ? 'mousedown' : window.PointerEvent ? 'pointerdown' : 'touchstart';
var pointerMove = !hasTouch ? 'mousemove' : window.PointerEvent ? 'pointermove' : 'touchmove';
var pointerUp = !hasTouch ? 'mouseup' : window.PointerEvent ? 'pointerup' : 'touchend';

var transitionend = function () {

    var element = document.body || document.documentElement,
        names = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
    },
        name;

    for (name in names) {
        if (element.style[name] !== undefined) {
            return names[name];
        }
    }
}();

var animationend = function () {

    var element = document.body || document.documentElement,
        names = {
        WebkitAnimation: 'webkitAnimationEnd',
        MozAnimation: 'animationend',
        OAnimation: 'oAnimationEnd oanimationend',
        animation: 'animationend'
    },
        name;

    for (name in names) {
        if (element.style[name] !== undefined) {
            return names[name];
        }
    }
}();

var matchesFn = Element.prototype.matches ? 'matches' : Element.prototype.msMatchesSelector ? 'msMatchesSelector' : Element.prototype.webkitMatchesSelector ? 'webkitMatchesSelector' : false;
function matches(element, selector) {
    return element[matchesFn] ? element[matchesFn](selector) : false;
}

function getCssVar(name) {

    /* usage in css:  .var-name:before { content:"xyz" } */

    var val,
        doc = document.documentElement,
        element = doc.appendChild(document.createElement('div'));

    element.classList.add('var-' + name);

    try {

        val = JSON.parse(val = window.getComputedStyle(element, ':before').content.replace(/^["'](.*)["']$/, '$1'));
    } catch (e) {}

    doc.removeChild(element);

    return val || undefined;
}

function bind(fn, context) {
    return function (a) {
        var l = arguments.length;
        return l ? l > 1 ? fn.apply(context, arguments) : fn.call(context, a) : fn.call(context);
    };
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

function classify(str) {
    return str.replace(/(?:^|[-_\/])(\w)/g, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
}

function hyphenate(str) {
    return str.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
}

var camelizeRE = /-(\w)/g;
function camelize(str) {
    return str.replace(camelizeRE, toUpper);
}

function toUpper(_, c) {
    return c ? c.toUpperCase() : '';
}

function isString(value) {
    return typeof value === 'string';
}

function isNumber(value) {
    return typeof value === 'number';
}

function isContextSelector(selector) {
    return isString(selector) && selector.match(/^(!|>|\+|-)/);
}

function getContextSelectors(selector) {
    return isContextSelector(selector) && selector.split(/(?=\s(?:!|>|\+|-))/g).map(function (value) {
        return value.trim();
    });
}

var contextSelectors = { '!': 'closest', '+': 'nextAll', '-': 'prevAll' };
function toJQuery(element, context) {

    if (element === true) {
        return null;
    }

    try {

        if (context && isContextSelector(element) && element[0] !== '>') {
            element = $__default(context)[contextSelectors[element[0]]](element.substr(1));
        } else {
            element = $__default(element, context);
        }
    } catch (e) {
        return null;
    }

    return element.length ? element : null;
}

function toBoolean(value) {
    return typeof value === 'boolean' ? value : value === 'true' || value == '1' || value === '' ? true : value === 'false' || value == '0' ? false : value;
}

function toNumber(value) {
    var number = Number(value);
    return !isNaN(number) ? number : false;
}

var vars = {};
function toMedia(value) {
    if (isString(value) && value[0] == '@') {
        var name = 'media-' + value.substr(1);
        value = vars[name] || (vars[name] = parseFloat(getCssVar(name)));
    }

    return value && !isNaN(value) ? '(min-width: ' + value + 'px)' : false;
}

function coerce(type, value, context) {

    if (type === Boolean) {
        return toBoolean(value);
    } else if (type === Number) {
        return toNumber(value);
    } else if (type === 'jQuery') {
        return query(value, context);
    } else if (type === 'media') {
        return toMedia(value);
    }

    return type ? type(value) : value;
}

var strats = {};

// concat strategy
strats.created = strats.init = strats.ready = strats.update = strats.destroy = function (parentVal, childVal) {
    return childVal ? parentVal ? parentVal.concat(childVal) : $.isArray(childVal) ? childVal : [childVal] : parentVal;
};

// events strategy
strats.events = function (parentVal, childVal) {

    if (!childVal) {
        return parentVal;
    }

    if (!parentVal) {
        return childVal;
    }

    var ret = $.extend({}, parentVal);

    for (var key in childVal) {
        var parent = ret[key],
            child = childVal[key];

        if (parent && !$.isArray(parent)) {
            parent = [parent];
        }

        ret[key] = parent ? parent.concat(child) : [child];
    }

    return ret;
};

// property strategy
strats.props = function (parentVal, childVal) {

    if ($.isArray(childVal)) {
        var ret = {};
        childVal.forEach(function (val) {
            ret[val] = String;
        });
        childVal = ret;
    }

    return strats.methods(parentVal, childVal);
};

// extend strategy
strats.defaults = strats.methods = function (parentVal, childVal) {
    return childVal ? parentVal ? $.extend({}, parentVal, childVal) : childVal : parentVal;
};

// default strategy
var defaultStrat = function defaultStrat(parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal;
};

function mergeOptions(parent, child, thisArg) {

    var options = {},
        key;

    if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
            parent = mergeOptions(parent, child.mixins[i], thisArg);
        }
    }

    for (key in parent) {
        mergeKey(key);
    }

    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeKey(key);
        }
    }

    function mergeKey(key) {
        options[key] = (strats[key] || defaultStrat)(parent[key], child[key], thisArg, key);
    }

    return options;
}

var dirs = {
    x: ['width', 'left', 'right'],
    y: ['height', 'top', 'bottom']
};

function position(element, target, attach, targetAttach, offset, targetOffset, flip, boundary) {

    element = $__default(element);
    target = $__default(target);
    boundary = boundary && $__default(boundary);
    attach = getPos(attach);
    targetAttach = getPos(targetAttach);

    var dim = getDimensions(element),
        targetDim = getDimensions(target),
        position = targetDim;

    moveTo(position, attach, dim, -1);
    moveTo(position, targetAttach, targetDim, 1);

    offset = getOffsets(offset, dim.width, dim.height);
    targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);

    offset['x'] += targetOffset['x'];
    offset['y'] += targetOffset['y'];

    position.left += offset['x'];
    position.top += offset['y'];

    boundary = getDimensions(boundary || window);

    var flipped = { element: attach, target: targetAttach };

    if (flip) {
        $__default.each(dirs, function (dir, _ref) {
            var prop = _ref[0],
                align = _ref[1],
                alignFlip = _ref[2];


            if (!(flip === true || flip.indexOf(dir) !== -1)) {
                return;
            }

            var elemOffset = attach[dir] === align ? -dim[prop] : attach[dir] === alignFlip ? dim[prop] : 0,
                targetOffset = targetAttach[dir] === align ? targetDim[prop] : targetAttach[dir] === alignFlip ? -targetDim[prop] : 0;

            if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {

                var newVal = position[align] + elemOffset + targetOffset - offset[dir] * 2;

                if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
                    position[align] = newVal;

                    ['element', 'target'].forEach(function (el) {
                        flipped[el][dir] = !elemOffset ? flipped[el][dir] : flipped[el][dir] === dirs[dir][1] ? dirs[dir][2] : dirs[dir][1];
                    });
                }
            }
        });
    }

    element.offset({ left: position.left, top: position.top });

    return flipped;
}

function getDimensions(elem) {

    elem = $__default(elem);

    var width = elem.outerWidth(),
        height = elem.outerHeight(),
        offset = elem[0].getClientRects ? elem.offset() : null,
        left = offset ? Math.round(offset.left) : elem.scrollLeft(),
        top = offset ? Math.round(offset.top) : elem.scrollTop();

    return { width: width, height: height, left: left, top: top, right: left + width, bottom: top + height };
}

function moveTo(position, attach, dim, factor) {
    $__default.each(dirs, function (dir, _ref2) {
        var prop = _ref2[0],
            align = _ref2[1],
            alignFlip = _ref2[2];

        if (attach[dir] === alignFlip) {
            position[align] += dim[prop] * factor;
        } else if (attach[dir] === 'center') {
            position[align] += dim[prop] * factor / 2;
        }
    });
}

function getPos(pos) {

    var x = /left|center|right/,
        y = /top|center|bottom/;

    pos = (pos || '').split(' ');

    if (pos.length === 1) {
        pos = x.test(pos[0]) ? pos.concat(['center']) : y.test(pos[0]) ? ['center'].concat(pos) : ['center', 'center'];
    }

    return {
        x: x.test(pos[0]) ? pos[0] : 'center',
        y: y.test(pos[1]) ? pos[1] : 'center'
    };
}

function getOffsets(offsets, width, height) {

    offsets = (offsets || '').split(' ');

    return {
        x: offsets[0] ? parseFloat(offsets[0]) * (offsets[0][offsets[0].length - 1] === '%' ? width / 100 : 1) : 0,
        y: offsets[1] ? parseFloat(offsets[1]) * (offsets[1][offsets[1].length - 1] === '%' ? height / 100 : 1) : 0
    };
}

function flipPosition(pos) {
    switch (pos) {
        case 'left':
            return 'right';
        case 'right':
            return 'left';
        case 'top':
            return 'bottom';
        case 'bottom':
            return 'top';
        default:
            return pos;
    }
}

// Copyright (c) 2010-2016 Thomas Fuchs
// http://zeptojs.com/

var touch = {};
var touchTimeout;
var tapTimeout;
var swipeTimeout;
var longTapTimeout;
var longTapDelay = 750;
var gesture;
var clicked;
function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
}

function longTap() {
    longTapTimeout = null;
    if (touch.last) {
        if (touch.el !== undefined) touch.el.trigger('longTap');
        touch = {};
    }
}

function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout);
    longTapTimeout = null;
}

function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout);
    if (tapTimeout) clearTimeout(tapTimeout);
    if (swipeTimeout) clearTimeout(swipeTimeout);
    if (longTapTimeout) clearTimeout(longTapTimeout);
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
    touch = {};
}

ready(function () {
    var now,
        delta,
        deltaX = 0,
        deltaY = 0,
        firstTouch;

    if ('MSGesture' in window) {
        gesture = new MSGesture();
        gesture.target = document.body;
    }

    document.addEventListener('click', function () {
        return clicked = true;
    }, true);

    $__default(document).on('MSGestureEnd gestureend', function (e) {

        var swipeDirectionFromVelocity = e.originalEvent.velocityX > 1 ? 'Right' : e.originalEvent.velocityX < -1 ? 'Left' : e.originalEvent.velocityY > 1 ? 'Down' : e.originalEvent.velocityY < -1 ? 'Up' : null;

        if (swipeDirectionFromVelocity && touch.el !== undefined) {
            touch.el.trigger('swipe');
            touch.el.trigger('swipe' + swipeDirectionFromVelocity);
        }
    }).on(pointerDown, function (e) {

        firstTouch = e.originalEvent.touches ? e.originalEvent.touches[0] : e;

        now = Date.now();
        delta = now - (touch.last || now);
        touch.el = $__default('tagName' in firstTouch.target ? firstTouch.target : firstTouch.target.parentNode);

        if (touchTimeout) clearTimeout(touchTimeout);

        touch.x1 = firstTouch.pageX;
        touch.y1 = firstTouch.pageY;

        if (delta > 0 && delta <= 250) touch.isDoubleTap = true;

        touch.last = now;
        longTapTimeout = setTimeout(longTap, longTapDelay);

        // adds the current touch contact for IE gesture recognition
        if (gesture && (e.type == 'pointerdown' || e.type == 'touchstart')) {
            gesture.addPointer(e.originalEvent.pointerId);
        }

        clicked = false;
    }).on(pointerMove, function (e) {

        firstTouch = e.originalEvent.touches ? e.originalEvent.touches[0] : e;

        cancelLongTap();
        touch.x2 = firstTouch.pageX;
        touch.y2 = firstTouch.pageY;

        deltaX += Math.abs(touch.x1 - touch.x2);
        deltaY += Math.abs(touch.y1 - touch.y2);
    }).on(pointerUp, function () {

        cancelLongTap();

        // swipe
        if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 || touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) {

            swipeTimeout = setTimeout(function () {
                if (touch.el !== undefined) {
                    touch.el.trigger('swipe');
                    touch.el.trigger('swipe' + swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2));
                }
                touch = {};
            }, 0);

            // normal tap
        } else if ('last' in touch) {

            // don't fire tap when delta position changed by more than 30 pixels,
            // for instance when moving to a point and back to origin
            if (isNaN(deltaX) || deltaX < 30 && deltaY < 30) {
                // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
                // ('tap' fires before 'scroll')
                tapTimeout = setTimeout(function () {

                    // trigger universal 'tap' with the option to cancelTouch()
                    // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
                    var event = $__default.Event('tap');
                    event.cancelTouch = cancelAll;

                    if (touch.el !== undefined) {
                        touch.el.trigger(event);
                    }

                    // trigger double tap immediately
                    if (touch.isDoubleTap) {
                        if (touch.el !== undefined) touch.el.trigger('doubleTap');
                        touch = {};
                    }

                    // trigger single tap after 300ms of inactivity
                    else {
                            touchTimeout = setTimeout(function () {
                                touchTimeout = null;
                                if (touch.el !== undefined) {
                                    touch.el.trigger('singleTap');

                                    if (!clicked) {
                                        touch.el.trigger('click');
                                    }
                                }
                                touch = {};
                            }, 300);
                        }
                });
            } else {
                touch = {};
            }
            deltaX = deltaY = 0;
        }
    })
    // when the browser window loses focus,
    // for example when a modal dialog is shown,
    // cancel all ongoing events
    .on('touchcancel pointercancel', cancelAll);

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $__default(window).on('scroll', cancelAll);
});



var util = Object.freeze({
	langDirection: langDirection,
	isReady: isReady,
	ready: ready,
	on: on,
	off: off,
	transition: transition,
	Transition: Transition,
	animate: animate,
	Animation: Animation,
	isWithin: isWithin,
	attrFilter: attrFilter,
	removeClass: removeClass,
	createEvent: createEvent,
	isInView: isInView,
	getIndex: getIndex,
	isVoidElement: isVoidElement,
	Dimensions: Dimensions,
	query: query,
	Observer: Observer,
	requestAnimationFrame: requestAnimationFrame$1,
	cancelAnimationFrame: cancelAnimationFrame,
	hasTouch: hasTouch,
	pointerDown: pointerDown,
	pointerMove: pointerMove,
	pointerUp: pointerUp,
	transitionend: transitionend,
	animationend: animationend,
	matches: matches,
	getCssVar: getCssVar,
	$: $__default,
	bind: bind,
	hasOwn: hasOwn,
	classify: classify,
	hyphenate: hyphenate,
	camelize: camelize,
	isString: isString,
	isNumber: isNumber,
	isContextSelector: isContextSelector,
	getContextSelectors: getContextSelectors,
	toJQuery: toJQuery,
	toBoolean: toBoolean,
	toNumber: toNumber,
	toMedia: toMedia,
	coerce: coerce,
	ajax: $.ajax,
	each: $.each,
	extend: $.extend,
	map: $.map,
	merge: $.merge,
	isArray: $.isArray,
	isNumeric: $.isNumeric,
	isFunction: $.isFunction,
	isPlainObject: $.isPlainObject,
	mergeOptions: mergeOptions,
	position: position,
	getDimensions: getDimensions,
	flipPosition: flipPosition
});

function bootAPI (UIkit) {

    if (Observer) {

        new Observer(function (mutations) {

            var visited = [];

            mutations.forEach(function (mutation) {

                for (var i = 0; i < mutation.addedNodes.length; ++i) {
                    apply(mutation.addedNodes[i], attachComponents, visited);
                }
            });
        }).observe(document, { childList: true, subtree: true });
    } else {
        ready(function () {
            apply(document.body, attachComponents);
            on(document.body, 'DOMNodeInserted', function (e) {
                return apply(e.target, attachComponents);
            });
        });
    }

    function attachComponents(node) {

        if (!matches(node, UIkit.component.selector)) {
            return;
        }

        for (var i = 0, name; i < node.attributes.length; i++) {

            name = node.attributes[i].name;

            if (name.lastIndexOf('uk-', 0) === 0) {
                name = camelize(name.replace('uk-', ''));

                if (UIkit[name]) {
                    UIkit[name](node);
                }
            }
        }
    }

    function apply(node, fn) {
        var visited = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


        var next;

        if (node.nodeType !== Node.ELEMENT_NODE || visited.indexOf(node) !== -1 || node.hasAttribute('uk-no-boot')) {
            return;
        }

        fn(node);
        visited.push(node);
        node = node.firstChild;
        while (node) {
            next = node.nextSibling;
            apply(node, fn, visited);
            node = next;
        }
    }
}

function globalAPI (UIkit) {

    UIkit.use = function (plugin) {

        if (plugin.installed) {
            return;
        }

        plugin.call(null, this);
        plugin.installed = true;

        return this;
    };

    UIkit.mixin = function (mixin, component) {
        component = (isString(component) ? UIkit.components[component] : component) || this;
        component.options = mergeOptions(component.options, mixin);
    };

    UIkit.extend = function (options) {

        options = options || {};

        var Super = this,
            name = options.name || Super.options.name;
        var Sub = createClass(name || 'UIkitComponent');

        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options, options);

        Sub['super'] = Super;
        Sub.extend = Super.extend;

        return Sub;
    };

    UIkit.update = function (e) {
        for (var id in UIkit.instances) {
            if (UIkit.instances[id]._isReady) {
                UIkit.instances[id]._callUpdate(e);
            }
        }
    };

    var container;
    Object.defineProperty(UIkit, 'container', {
        get: function get() {
            return container || document.body;
        },
        set: function set(element) {
            container = element;
        }
    });
}

function createClass(name) {
    return new Function('return function ' + classify(name) + ' (options) { this._init(options); }')();
}

function internalAPI (UIkit) {

    var uid = 0;

    UIkit.prototype.props = {};

    UIkit.prototype._init = function (options) {

        options = options || {};
        options = this.$options = mergeOptions(this.constructor.options, options, this);

        UIkit.instances[uid] = this;

        this.$el = null;
        this.$name = UIkit.prefix + hyphenate(this.$options.name);

        this._uid = uid++;
        this._initData();
        this._initMethods();
        this._callHook('created');

        if (options.el) {
            this.$mount(options.el);
        }
    };

    UIkit.prototype._initData = function () {

        var defaults = $.extend(true, {}, this.$options.defaults),
            data = this.$options.data || {},
            props = this.$options.props || {};

        if (defaults) {
            for (var key in defaults) {
                this[key] = hasOwn(data, key) ? coerce(props[key], data[key], this.$options.el) : defaults[key];
            }
        }
    };

    UIkit.prototype._initProps = function () {

        var el = this.$el[0],
            props = this.$options.props || {},
            options = el.getAttribute(this.$name);

        if (props) {
            for (var key in props) {
                var prop = hyphenate(key);
                if (el.hasAttribute(prop)) {
                    this[key] = coerce(props[key], el.getAttribute(prop), el);
                }
            }

            if (options) {
                if (options[0] === '{') {
                    try {
                        options = JSON.parse(options);
                    } catch (e) {
                        console.warn('Invalid JSON.');
                        options = {};
                    }
                } else {
                    var tmp = {};
                    options.split(';').forEach(function (option) {
                        var _option$split = option.split(/:(.+)/),
                            key = _option$split[0],
                            value = _option$split[1];

                        if (key && value) {
                            tmp[key.trim()] = value.trim();
                        }
                    });
                    options = tmp;
                }

                for (var key in options || {}) {
                    var prop = camelize(key);
                    if (props[prop] !== undefined) {
                        this[prop] = coerce(props[prop], options[key], el);
                    }
                }
            }
        }
    };

    UIkit.prototype._initMethods = function () {

        var methods = this.$options.methods;

        if (methods) {
            for (var key in methods) {
                this[key] = bind(methods[key], this);
            }
        }
    };

    UIkit.prototype._initEvents = function () {
        var _this = this;

        var events = this.$options.events,
            register = function register(name, fn) {
            return _this.$el.on(name, isString(fn) ? _this[fn] : bind(fn, _this));
        };

        if (events) {
            for (var key in events) {

                if ($.isArray(events[key])) {
                    events[key].forEach(function (event) {
                        return register(key, event);
                    });
                } else {
                    register(key, events[key]);
                }
            }
        }
    };

    UIkit.prototype._callReady = function () {
        this._isReady = true;
        this._callHook('ready');
        this._callUpdate();
    };

    UIkit.prototype._callHook = function (hook) {
        var _this2 = this;

        var handlers = this.$options[hook];

        if (handlers) {
            handlers.forEach(function (handler) {
                return handler.call(_this2);
            });
        }
    };

    UIkit.prototype._callUpdate = function (e) {
        var _this3 = this;

        e = createEvent(e || 'update');

        var updates = this.$options.update;

        if (!updates) {
            return;
        }

        updates.forEach(function (update) {
            if ($.isPlainObject(update)) {

                if (e.type !== 'update' && update.events && update.events.indexOf(e.type) === -1) {
                    return;
                }

                update = update.handler;
            }

            update.call(_this3, e);
        });
    };
}

function instanceAPI (UIkit) {

    var DATA = UIkit.data;

    UIkit.prototype.$mount = function (el) {
        var _this = this;

        var name = this.$options.name;

        if (!el[DATA]) {
            el[DATA] = {};
            UIkit.elements.push(el);
        }

        if (el[DATA][name]) {
            console.warn('Component "' + name + '" is already mounted on element: ', el);
            return;
        }

        el[DATA][name] = this;

        this.$el = $__default(el);

        this._initProps();

        this._callHook('init');

        this._initEvents();

        ready(function () {
            return _this._callReady();
        });
    };

    UIkit.prototype.$update = function (e, element) {

        element = element ? $__default(element)[0] : this.$el[0];

        UIkit.elements.forEach(function (el) {
            if (el[DATA] && (el === element || $__default.contains(element, el))) {
                for (var name in el[DATA]) {
                    el[DATA][name]._callUpdate(e);
                }
            }
        });
    };

    UIkit.prototype.$updateParents = function (e, element) {

        element = element ? $__default(element)[0] : this.$el[0];

        UIkit.elements.forEach(function (el) {
            if (el[DATA] && (el === element || $__default.contains(el, element))) {
                for (var name in el[DATA]) {
                    el[DATA][name]._callUpdate(e);
                }
            }
        });
    };

    UIkit.prototype.$destroy = function () {
        var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


        this._callHook('destroy');

        delete UIkit.instances[this._uid];

        var el = this.$options.el;

        if (!el || !el[DATA]) {
            return;
        }

        delete el[DATA][this.$options.name];

        if (!Object.keys(el[DATA]).length) {
            delete el[DATA];
            delete UIkit.elements[UIkit.elements.indexOf(el)];
        }

        if (remove) {
            this.$el.remove();
        }
    };
}

function componentAPI (UIkit) {

    var DATA = UIkit.data;

    UIkit.components = {};

    UIkit.component = function (name, options) {

        UIkit.component.selector = (UIkit.component.selector + ',' || '') + ('[uk-' + name + ']');

        name = camelize(name);

        if ($.isPlainObject(options)) {
            options.name = name;
            options = UIkit.extend(options);
        } else {
            options.options.name = name;
        }

        UIkit.components[name] = options;

        UIkit[name] = function (element, data) {

            if ($.isPlainObject(element)) {
                return new UIkit.components[name]({ data: element });
            }

            var result = [];

            data = data || {};

            $__default(element).each(function (i, el) {
                return result.push(el[DATA] && el[DATA][name] || new UIkit.components[name]({ el: el, data: data }));
            });

            return result;
        };

        return UIkit.components[name];
    };

    UIkit.getComponents = function (element) {
        return element && element[DATA] || {};
    };
    UIkit.getComponent = function (element, name) {
        return UIkit.getComponents(element)[name];
    };
}

var UIkit = function UIkit(options) {
    this._init(options);
};

UIkit.util = util;
UIkit.data = '__uikit__';
UIkit.prefix = 'uk-';
UIkit.options = {};
UIkit.instances = {};
UIkit.elements = [];

globalAPI(UIkit);
internalAPI(UIkit);
instanceAPI(UIkit);
componentAPI(UIkit);
bootAPI(UIkit);

var Class = {
    init: function init() {
        this.$el.addClass(this.$name);
    }
};

var initProps = {
    overflow: '',
    height: '',
    paddingTop: '',
    paddingBottom: '',
    marginTop: '',
    marginBottom: ''
};
var hideProps = {
    overflow: 'hidden',
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
};
var Toggable = {

    props: {
        cls: Boolean,
        animation: Boolean,
        duration: Number,
        origin: String,
        transition: String,
        queued: Boolean
    },

    defaults: {
        cls: false,
        animation: false,
        duration: 200,
        origin: false,
        transition: 'linear',
        queued: false
    },

    ready: function ready() {

        if (isString(this.animation)) {

            this.animation = this.animation.split(',');

            if (this.animation.length === 1) {
                this.animation[1] = this.animation[0];
            }

            this.animation = this.animation.map(function (animation) {
                return animation.trim();
            });
        }
    },


    methods: {
        toggleElement: function toggleElement(targets, show, animate) {
            var _this = this;

            var all = function all(targets) {
                return $__default.when.apply($__default, targets.toArray().map(function (el) {
                    return _this._toggleElement(el, show, animate);
                }));
            },
                toggles,
                res,
                body = document.body,
                scroll = body.scrollTop;

            targets = $__default(targets);

            if (!this.queued) {
                return all(targets);
            }

            if (this.queued !== true) {
                res = all(this.queued);
                this.queued = true;
                body.scrollTop = scroll;
                return res;
            }

            this.queued = targets.not(toggles = targets.filter(function (_, el) {
                return _this.isToggled(el);
            }));

            return all(toggles).then(function () {
                if (_this.queued !== true) {
                    res = all(_this.queued);
                    _this.queued = true;
                    body.scrollTop = scroll;
                    return res;
                }
            });
        },
        toggleNow: function toggleNow(el, show) {
            return this.toggleElement(el, show, false);
        },
        isToggled: function isToggled(el) {
            el = $__default(el);
            return this.cls ? el.hasClass(this.cls.split(' ')[0]) : !el.attr('hidden');
        },
        updateAria: function updateAria(el) {
            if (this.cls === false) {
                el.attr('aria-hidden', !this.isToggled(el));
            }
        },
        _toggleElement: function _toggleElement(el, show, animate) {

            el = $__default(el);

            var toggled, deferred;

            Animation.cancel(el);

            toggled = typeof show === 'boolean' ? !show : this.isToggled(el);

            var event = $__default.Event('before' + (toggled ? 'hide' : 'show'));
            el.trigger(event, [this]);

            if (event.result === false) {
                return $__default.Deferred().reject();
            }

            if (this.animation === true && animate !== false) {

                deferred = this._toggleHeight(el, !toggled);
            } else if (this.animation && animate !== false) {

                deferred = this._toggleAnimation(el, !toggled);
            } else {
                this._toggle(el, !toggled);
                deferred = $__default.Deferred().resolve();
            }

            el.trigger(toggled ? 'hide' : 'show', [this]);
            return deferred;
        },
        _toggle: function _toggle(el, toggled) {
            el = $__default(el);

            if (this.cls) {

                if (this.cls.indexOf(' ') != -1) {
                    el.toggleClass(this.cls);
                } else {
                    el.toggleClass(this.cls, toggled);
                }
            } else {
                el.attr('hidden', !toggled);
            }

            el.find('[autofocus]:visible').focus();

            this.updateAria(el);
            this.$update(null, el);
        },
        _toggleHeight: function _toggleHeight(el, show) {
            var _this2 = this;

            var inProgress = Transition.inProgress(el),
                inner = parseFloat(el.children().first().css('margin-top')) + parseFloat(el.children().last().css('margin-bottom')),
                height = el[0].offsetHeight ? el.height() + (inProgress ? 0 : inner) : 0,
                endHeight;

            Transition.cancel(el);

            if (!this.isToggled(el)) {
                this._toggle(el, true);
            }

            el.css('height', '');
            endHeight = el.height() + (inProgress ? 0 : inner);
            el.height(height);

            return show ? Transition.start(el, $.extend(initProps, { overflow: 'hidden', height: endHeight }), Math.round(this.duration * (1 - height / endHeight)), this.transition) : Transition.start(el, hideProps, Math.round(this.duration * (height / endHeight)), this.transition).then(function () {
                _this2._toggle(el, false);
                el.css(initProps);
            });
        },
        _toggleAnimation: function _toggleAnimation(el, show) {
            var _this3 = this;

            if (show) {
                this._toggle(el, true);
                return Animation.in(el, this.animation[0], this.duration, this.origin);
            }

            return Animation.out(el, this.animation[1], this.duration, this.origin).then(function () {
                return _this3._toggle(el, false);
            });
        }
    }

};

var active;

$__default(document).on({
    click: function click(e) {
        if (active && active.bgClose && !e.isDefaultPrevented() && !isWithin(e.target, active.panel)) {
            active.hide();
        }
    },
    keydown: function keydown(e) {
        if (e.keyCode === 27 && active && active.escClose) {
            e.preventDefault();
            active.hide();
        }
    }
});

var Modal = {

    mixins: [Class, Toggable],

    props: {
        clsPanel: String,
        selClose: String,
        escClose: Boolean,
        bgClose: Boolean,
        stack: Boolean
    },

    defaults: {
        cls: 'uk-open',
        escClose: true,
        bgClose: true,
        overlay: true,
        stack: false
    },

    ready: function ready() {
        var _this = this;

        this.page = $__default(document.documentElement);
        this.body = $__default(document.body);
        this.panel = toJQuery('.' + this.clsPanel, this.$el);

        this.$el.on('click', this.selClose, function (e) {
            e.preventDefault();
            _this.hide();
        });
    },


    events: {
        toggle: function toggle(e) {
            e.preventDefault();
            this.toggleNow(this.$el);
        },
        beforeshow: function beforeshow(e) {
            var _this2 = this;

            if (!this.$el.is(e.target)) {
                return;
            }

            if (this.isActive()) {
                return false;
            }

            var prev = active && active !== this && active;

            if (!active) {
                this.body.css('overflow-y', this.getScrollbarWidth() && this.overlay ? 'scroll' : '');
            }

            active = this;

            if (prev) {
                if (this.stack) {
                    this.prev = prev;
                } else {
                    prev.hide();
                }
            }

            this.panel.one(transitionend, function () {
                var event = $__default.Event('show');
                event.isShown = true;
                _this2.$el.trigger(event, [_this2]);
            });
        },
        show: function show(e) {

            if (!this.$el.is(e.target)) {
                return;
            }

            if (!e.isShown) {
                e.stopImmediatePropagation();
            }
        },
        beforehide: function beforehide(e) {
            var _this3 = this;

            if (!this.$el.is(e.target)) {
                return;
            }

            active = active && active !== this && active || this.prev;

            this.panel.one(transitionend, function () {
                var event = $__default.Event('hide');
                event.isHidden = true;
                _this3.$el.trigger(event, [_this3]);
            });
        },
        hide: function hide(e) {

            if (!this.$el.is(e.target)) {
                return;
            }

            if (!e.isHidden) {
                e.stopImmediatePropagation();
                return;
            }

            if (!active) {
                this.body.css('overflow-y', '');
            }
        }
    },

    methods: {
        isActive: function isActive() {
            return this.$el.hasClass(this.cls);
        },
        toggle: function toggle() {
            return this.isActive() ? this.hide() : this.show();
        },
        show: function show() {
            var deferred = $__default.Deferred();
            this.$el.one('show', function () {
                return deferred.resolve();
            });
            this.toggleNow(this.$el, true);
            return deferred.promise();
        },
        hide: function hide() {
            var deferred = $__default.Deferred();
            this.$el.one('hide', function () {
                return deferred.resolve();
            });
            this.toggleNow(this.$el, false);
            return deferred.promise();
        },
        getActive: function getActive() {
            return active;
        },
        getScrollbarWidth: function getScrollbarWidth() {
            var width = this.page[0].style.width;

            this.page.css('width', '');

            var scrollbarWidth = window.innerWidth - this.page.width();

            if (width) {
                this.page.width(width);
            }

            return scrollbarWidth;
        }
    }

};

var Mouse = {

    defaults: {

        positions: [],
        position: null

    },

    methods: {
        initMouseTracker: function initMouseTracker() {
            var _this = this;

            this.positions = [];
            this.position = null;

            this.mouseHandler = function (e) {
                _this.positions.push({ x: e.pageX, y: e.pageY });

                if (_this.positions.length > 5) {
                    _this.positions.shift();
                }
            };

            $__default(document).on('mousemove', this.mouseHandler);
        },
        cancelMouseTracker: function cancelMouseTracker() {
            if (this.mouseHandler) {
                $__default(document).off('mousemove', this.mouseHandler);
            }
        },
        movesTo: function movesTo(target) {

            var p = getDimensions(target),
                points = [[{ x: p.left, y: p.top }, { x: p.right, y: p.bottom }], [{ x: p.right, y: p.top }, { x: p.left, y: p.bottom }]],
                position = this.positions[this.positions.length - 1],
                prevPos = this.positions[0] || position;

            if (!position) {
                return false;
            }

            if (p.right <= position.x) {} else if (p.left >= position.x) {
                points[0].reverse();
                points[1].reverse();
            } else if (p.bottom <= position.y) {
                points[0].reverse();
            } else if (p.top >= position.y) {
                points[1].reverse();
            }

            var delay = position && !(this.position && position.x === this.position.x && position.y === this.position.y) && points.reduce(function (result, point) {
                return result + (slope(prevPos, point[0]) < slope(position, point[0]) && slope(prevPos, point[1]) > slope(position, point[1]));
            }, 0);

            this.position = delay ? position : null;
            return delay;
        }
    }

};

function slope(a, b) {
    return (b.y - a.y) / (b.x - a.x);
}

var Position = {

    props: {
        pos: String,
        offset: null,
        flip: Boolean,
        clsPos: String
    },

    defaults: {
        pos: 'bottom-left',
        flip: true,
        offset: false,
        clsPos: ''
    },

    init: function init() {
        this.pos = (this.pos + (this.pos.indexOf('-') === -1 ? '-center' : '')).split('-');
        this.dir = this.pos[0];
        this.align = this.pos[1];
    },


    methods: {
        positionAt: function positionAt(element, target, boundary) {

            removeClass(element, this.clsPos + '-(top|bottom|left|right)(-[a-z]+)?').css({ top: '', left: '' });

            this.dir = this.pos[0];
            this.align = this.pos[1];

            var offset = toNumber(this.offset) || 0,
                axis = this.getAxis(),
                flipped = position(element, target, axis === 'x' ? flipPosition(this.dir) + ' ' + this.align : this.align + ' ' + flipPosition(this.dir), axis === 'x' ? this.dir + ' ' + this.align : this.align + ' ' + this.dir, axis === 'x' ? '' + (this.dir === 'left' ? -1 * offset : offset) : ' ' + (this.dir === 'top' ? -1 * offset : offset), null, this.flip, boundary);

            this.dir = axis === 'x' ? flipped.target.x : flipped.target.y;
            this.align = axis === 'x' ? flipped.target.y : flipped.target.x;

            element.css('display', '').toggleClass(this.clsPos + '-' + this.dir + '-' + this.align, this.offset === false);
        },
        getAxis: function getAxis() {
            return this.pos[0] === 'top' || this.pos[0] === 'bottom' ? 'y' : 'x';
        }
    }

};

function mixin (UIkit) {

    UIkit.mixin.class = Class;
    UIkit.mixin.modal = Modal;
    UIkit.mixin.mouse = Mouse;
    UIkit.mixin.position = Position;
    UIkit.mixin.toggable = Toggable;
}

function Accordion (UIkit) {

    UIkit.component('accordion', {

        mixins: [Class, Toggable],

        props: {
            targets: String,
            active: null,
            collapsible: Boolean,
            multiple: Boolean,
            toggle: String,
            content: String,
            transition: String
        },

        defaults: {
            targets: '> *',
            active: false,
            animation: true,
            collapsible: true,
            multiple: false,
            clsOpen: 'uk-open',
            toggle: '.uk-accordion-title',
            content: '.uk-accordion-content',
            transition: 'ease'
        },

        ready: function ready() {
            var _this = this;

            this.items = toJQuery(this.targets, this.$el);

            if (!this.items) {
                return;
            }

            this.$el.on('click', this.targets + ' ' + this.toggle, function (e) {
                e.preventDefault();
                _this.show(_this.items.find(_this.toggle).index(e.currentTarget));
            });

            this.items.each(function (i, el) {
                el = $__default(el);
                _this.toggleNow(el.find(_this.content), el.hasClass(_this.clsOpen));
            });

            var active = this.active !== false && toJQuery(this.items.eq(Number(this.active))) || !this.collapsible && toJQuery(this.items.eq(0));
            if (active && !active.hasClass(this.clsOpen)) {
                this.show(active, false);
            }
        },


        methods: {
            show: function show(item, animate) {
                var _this2 = this;

                var index = getIndex(item, this.items),
                    active = this.items.filter('.' + this.clsOpen);

                item = this.items.eq(index);

                item.add(!this.multiple && active).each(function (i, el) {

                    el = $__default(el);

                    var content = el.find(_this2.content),
                        isItem = el.is(item),
                        state = isItem && !el.hasClass(_this2.clsOpen);

                    if (!state && isItem && !_this2.collapsible && active.length < 2) {
                        return;
                    }

                    el.toggleClass(_this2.clsOpen, state);

                    if (!Transition.inProgress(content.parent())) {
                        content.wrap('<div>').parent().attr('hidden', state);
                    }

                    _this2.toggleNow(content, true);
                    _this2.toggleElement(content.parent(), state, animate).then(function () {
                        if (el.hasClass(_this2.clsOpen) === state) {

                            if (!state) {
                                _this2.toggleNow(content, false);
                            }

                            content.unwrap();
                        }
                    });
                });
            }
        }

    });
}

function Alert (UIkit) {

    UIkit.component('alert', {

        mixins: [Class, Toggable],

        props: {
            animation: Boolean,
            close: String
        },

        defaults: {
            animation: true,
            close: '.uk-alert-close',
            duration: 150
        },

        ready: function ready() {
            var _this = this;

            this.$el.on('click', this.close, function (e) {
                e.preventDefault();
                _this.closeAlert();
            });
        },


        methods: {
            closeAlert: function closeAlert() {
                var _this2 = this;

                this.toggleElement(this.$el).then(function () {
                    return _this2.$destroy(true);
                });
                requestAnimationFrame(function () {
                    return _this2.$el.css('opacity', 0);
                });
            }
        }

    });
}

function Cover (UIkit) {

    UIkit.component('cover', {

        props: {
            automute: Boolean,
            width: Number,
            height: Number
        },

        defaults: { automute: true },

        ready: function ready() {
            if (this.$el.is('iframe') && this.automute) {

                var src = this.$el.attr('src');

                this.$el.attr('src', '').on('load', function () {

                    this.contentWindow.postMessage('{"event": "command", "func": "mute", "method":"setVolume", "value":0}', '*');
                }).attr('src', [src, src.indexOf('?') > -1 ? '&' : '?', 'enablejsapi=1&api=1'].join(''));
            }
        },


        update: {
            handler: function handler() {

                if (this.$el[0].offsetHeight === 0) {
                    return;
                }

                this.$el.css({ width: '', height: '' }).css(Dimensions.cover({ width: this.width || this.$el.width(), height: this.height || this.$el.height() }, { width: this.$el.parent().width(), height: this.$el.parent().height() }));
            },


            events: ['load', 'resize', 'orientationchange']

        }

    });
}

function Drop (UIkit) {

    var active;

    $__default(document).on('click', function (e) {
        if (active && !isWithin(e.target, active.$el) && (!active.toggle || !isWithin(e.target, active.toggle.$el))) {
            active.hide(false);
        }
    });

    UIkit.component('drop', {

        mixins: [Mouse, Position, Toggable],

        props: {
            mode: String,
            toggle: Boolean,
            boundary: 'jQuery',
            boundaryAlign: Boolean,
            delayShow: Number,
            delayHide: Number,
            clsDrop: String
        },

        defaults: {
            mode: 'hover',
            toggle: '- :first',
            boundary: window,
            boundaryAlign: false,
            delayShow: 0,
            delayHide: 800,
            clsDrop: false,
            hoverIdle: 200,
            animation: 'uk-animation-fade',
            cls: 'uk-open'
        },

        init: function init() {
            this.clsDrop = this.clsDrop || 'uk-' + this.$options.name;
            this.clsPos = this.clsDrop;

            this.$el.addClass(this.clsDrop);
        },
        ready: function ready() {
            var _this = this;

            this.updateAria(this.$el);

            this.$el.on('click', '.' + this.clsDrop + '-close', function (e) {
                e.preventDefault();
                _this.hide(false);
            });

            if (this.toggle) {

                this.toggle = query(this.toggle, this.$el);

                if (this.toggle) {
                    this.toggle = UIkit.toggle(this.toggle, { target: this.$el, mode: this.mode })[0];
                }
            }
        },


        update: {
            handler: function handler() {

                if (!this.$el.hasClass(this.cls)) {
                    return;
                }

                removeClass(this.$el, this.clsDrop + '-(stack|boundary)').css({ top: '', left: '' });

                this.$el.toggleClass(this.clsDrop + '-boundary', this.boundaryAlign);

                this.dir = this.pos[0];
                this.align = this.pos[1];

                var boundary = getDimensions(this.boundary),
                    alignTo = this.boundaryAlign ? boundary : getDimensions(this.toggle.$el);

                if (this.align === 'justify') {
                    var prop = this.getAxis() === 'y' ? 'width' : 'height';
                    this.$el.css(prop, alignTo[prop]);
                } else if (this.$el.outerWidth() > Math.max(boundary.right - alignTo.left, alignTo.right - boundary.left)) {
                    this.$el.addClass(this.clsDrop + '-stack');
                    this.$el.trigger('stack', [this]);
                }

                this.positionAt(this.$el, this.boundaryAlign ? this.boundary : this.toggle.$el, this.boundary);
            },


            events: ['resize', 'orientationchange']

        },

        events: {
            toggle: function toggle(e, _toggle) {
                e.preventDefault();

                if (this.isToggled(this.$el)) {
                    this.hide(false);
                } else {
                    this.show(_toggle, false);
                }
            },
            'toggleShow mouseenter': function toggleShowMouseenter(e, toggle) {
                e.preventDefault();
                this.show(toggle || this.toggle);
            },
            'toggleHide mouseleave': function toggleHideMouseleave(e) {
                e.preventDefault();

                if (this.toggle && this.toggle.mode === 'hover') {
                    this.hide();
                }
            }
        },

        methods: {
            show: function show(toggle) {
                var _this2 = this;

                var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


                if (toggle && this.toggle && !this.toggle.$el.is(toggle.$el)) {
                    this.hide(false);
                }

                this.toggle = toggle || this.toggle;

                this.clearTimers();

                if (this.isActive()) {
                    return;
                } else if (delay && active && active !== this && active.isDelaying) {
                    this.showTimer = setTimeout(this.show, 75);
                    return;
                } else if (active) {
                    active.hide(false);
                }

                var show = function show() {
                    if (_this2.toggleElement(_this2.$el, true).state() !== 'rejected') {
                        _this2.initMouseTracker();
                        _this2.toggle.$el.addClass(_this2.cls).attr('aria-expanded', 'true');
                        _this2.clearTimers();
                    }
                };

                if (delay && this.delayShow) {
                    this.showTimer = setTimeout(show, this.delayShow);
                } else {
                    show();
                }

                active = this;
            },
            hide: function hide() {
                var _this3 = this;

                var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


                this.clearTimers();

                var hide = function hide() {
                    if (_this3.toggleNow(_this3.$el, false).state() !== 'rejected') {
                        active = _this3.isActive() ? null : active;
                        _this3.toggle.$el.removeClass(_this3.cls).attr('aria-expanded', 'false').blur().find('a, button').blur();
                        _this3.cancelMouseTracker();
                        _this3.clearTimers();
                    }
                };

                this.isDelaying = this.movesTo(this.$el);

                if (delay && this.isDelaying) {
                    this.hideTimer = setTimeout(this.hide, this.hoverIdle);
                } else if (delay && this.delayHide) {
                    this.hideTimer = setTimeout(hide, this.delayHide);
                } else {
                    hide();
                }
            },
            clearTimers: function clearTimers() {
                clearTimeout(this.showTimer);
                clearTimeout(this.hideTimer);
                this.showTimer = null;
                this.hideTimer = null;
            },
            isActive: function isActive() {
                return active === this;
            }
        }

    });

    UIkit.drop.getActive = function () {
        return active;
    };
}

function Dropdown (UIkit) {

    UIkit.component('dropdown', UIkit.components.drop.extend({ name: 'dropdown' }));
}

function FormCustom (UIkit) {

    UIkit.component('form-custom', {

        mixins: [Class],

        props: {
            target: Boolean
        },

        defaults: {
            target: false
        },

        ready: function ready() {
            this.input = this.$el.find(':input:first');
            this.target = this.target && query(this.target === true ? '> :input:first + :first' : this.target, this.$el);

            var state = this.input.next();
            this.input.on({
                focus: function focus(e) {
                    return state.addClass('uk-focus');
                },
                blur: function blur(e) {
                    return state.removeClass('uk-focus');
                },
                mouseenter: function mouseenter(e) {
                    return state.addClass('uk-hover');
                },
                mouseleave: function mouseleave(e) {
                    return state.removeClass('uk-hover');
                }
            });

            this.input.trigger('change');
        },


        events: {
            change: function change() {
                this.target && this.target[this.target.is(':input') ? 'val' : 'text'](this.input[0].files && this.input[0].files[0] ? this.input[0].files[0].name : this.input.is('select') ? this.input.find('option:selected').text() : this.input.val());
            }
        }

    });
}

function Grid (UIkit) {

    UIkit.component('grid', UIkit.components.margin.extend({

        mixins: [Class],

        name: 'grid',

        defaults: {
            margin: 'uk-grid-margin',
            clsStack: 'uk-grid-stack'
        },

        update: {
            handler: function handler() {

                this.$el.toggleClass(this.clsStack, !this.$el.children().filter(function (i, el) {
                    return el.offsetHeight;
                }).not('.' + this.firstColumn).length);
            },


            events: ['load', 'resize', 'orientationchange']

        }

    }));
}

function HeightMatch (UIkit) {

    UIkit.component('height-match', {

        props: {
            target: String,
            row: Boolean
        },

        defaults: {
            target: '> *',
            row: true
        },

        update: {
            handler: function handler() {
                var _this = this;

                var elements = toJQuery(this.target, this.$el).css('min-height', '');

                if (!this.row) {
                    this.match(elements);
                    return this;
                }

                var lastOffset = false,
                    group = [];

                elements.each(function (i, el) {

                    el = $__default(el);

                    var offset = el.offset().top;

                    if (offset != lastOffset && group.length) {
                        _this.match($__default(group));
                        group = [];
                        offset = el.offset().top;
                    }

                    group.push(el);
                    lastOffset = offset;
                });

                if (group.length) {
                    this.match($__default(group));
                }
            },


            events: ['resize', 'orientationchange']

        },

        methods: {
            match: function match(elements) {

                if (elements.length < 2) {
                    return;
                }

                var max = 0;

                elements.each(function (i, el) {

                    el = $__default(el);

                    var height;

                    if (el.css('display') === 'none') {
                        var style = el.attr('style');
                        el.attr('style', style + ';display:block !important;');
                        height = el.outerHeight();
                        el.attr('style', style || '');
                    } else {
                        height = el.outerHeight();
                    }

                    max = Math.max(max, height);
                }).each(function (i, el) {
                    el = $__default(el);
                    el.css('min-height', max - (el.outerHeight() - parseFloat(el.css('height'))) + 'px');
                });
            }
        }

    });
}

function HeightViewport (UIkit) {

    UIkit.component('height-viewport', {

        props: {
            mode: String
        },

        defaults: {
            mode: 'viewport'
        },

        init: function init() {
            this._callUpdate();
        },


        update: {
            handler: function handler() {

                var viewport = window.innerHeight,
                    height,
                    offset;

                if (this.mode === 'expand') {

                    this.$el.css({ height: '', minHeight: '' });

                    var diff = viewport - document.documentElement.offsetHeight;

                    if (diff > 0) {
                        this.$el.css('min-height', height = this.$el.outerHeight() + diff);
                    }
                } else {

                    var top = this.$el[0].offsetTop;

                    offset = this.mode === 'offset' && top < viewport;

                    this.$el.css('min-height', height = offset ? 'calc(100vh - ' + (offset ? top : 0) + 'px)' : '100vh');
                }

                // IE 10-11 fix (min-height on a flex container won't apply to its flex items)
                this.$el.css('height', '');
                if (height && viewport - (offset ? top : 0) >= this.$el.outerHeight()) {
                    this.$el.css('height', height);
                }
            },


            events: ['load', 'resize', 'orientationchange']

        }

    });
}

function Hover (UIkit) {

    ready(function () {

        if (!hasTouch) {
            return;
        }

        var cls = 'uk-hover',
            doc = $__default(document.documentElement).on('tap', function (_ref) {
            var target = _ref.target;
            return $__default('.' + cls).filter(function (_, el) {
                return !isWithin(target, el);
            }).removeClass(cls);
        });

        Object.defineProperty(UIkit, 'hoverSelector', {
            set: function set(selector) {

                doc.on('tap', selector, function () {
                    this.classList.add(cls);
                });
            }
        });

        UIkit.hoverSelector = '.uk-animation-toggle, .uk-transition-toggle, [uk-hover]';
    });
}

function Icon (UIkit) {

    UIkit.component('icon', UIkit.components.svg.extend({

        mixins: [Class],

        name: 'icon',

        props: ['icon'],

        defaults: { exclude: ['id', 'style', 'class'] },

        init: function init() {
            this.$el.addClass('uk-icon');
        }
    }));

    ['close', 'navbar-toggle-icon', 'overlay-icon', 'pagination-previous', 'pagination-next', 'slidenav', 'search-icon', 'totop'].forEach(function (name) {
        return UIkit.component(name, UIkit.components.icon.extend({ name: name }));
    });
}

function Margin (UIkit) {

    UIkit.component('margin', {

        props: {
            margin: String,
            firstColumn: Boolean
        },

        defaults: {
            margin: 'uk-margin-small-top',
            firstColumn: 'uk-first-column'
        },

        update: {
            handler: function handler() {
                var _this = this;

                if (this.$el[0].offsetHeight === 0) {
                    return;
                }

                var columns = this.$el.children().filter(function (_, el) {
                    return el.offsetHeight > 0;
                }).removeClass(this.margin).removeClass(this.firstColumn),
                    rows = [[columns.get(0)]];

                columns.slice(1).each(function (_, el) {

                    var top = Math.ceil(el.offsetTop),
                        bottom = top + el.offsetHeight;

                    for (var index = rows.length - 1; index >= 0; index--) {
                        var row = rows[index],
                            rowTop = Math.ceil(row[0].offsetTop);

                        if (top >= rowTop + row[0].offsetHeight) {
                            rows.push([el]);
                            break;
                        }

                        if (bottom > rowTop) {

                            if (el.offsetLeft < row[0].offsetLeft) {
                                row.unshift(el);
                                break;
                            }

                            row.push(el);
                            break;
                        }

                        if (index === 0) {
                            rows.splice(index, 0, [el]);
                            break;
                        }
                    }
                });

                rows.forEach(function (row, i) {
                    return row.forEach(function (el, j) {
                        return $__default(el).toggleClass(_this.margin, i !== 0).toggleClass(_this.firstColumn, j === 0);
                    });
                });
            },


            events: ['load', 'resize', 'orientationchange']

        }

    });
}

function Modal$1 (UIkit) {

    UIkit.component('modal', {

        mixins: [Modal],

        props: {
            center: Boolean,
            container: Boolean
        },

        defaults: {
            center: false,
            clsPage: 'uk-modal-page',
            clsPanel: 'uk-modal-dialog',
            selClose: '.uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full',
            container: true
        },

        ready: function ready() {

            this.container = this.container === true && UIkit.container || this.container && toJQuery(this.container);

            if (this.container && !this.$el.parent().is(this.container)) {
                this.$el.appendTo(this.container);
            }
        },


        update: {
            handler: function handler() {

                if (this.$el.css('display') === 'block' && this.center) {
                    this.$el.removeClass('uk-flex uk-flex-center uk-flex-middle').css('display', 'block').toggleClass('uk-flex uk-flex-center uk-flex-middle', window.innerHeight > this.panel.outerHeight(true)).css('display', this.$el.hasClass('uk-flex') ? '' : 'block');
                }
            },


            events: ['resize', 'orientationchange']

        },

        events: {
            beforeshow: function beforeshow(e) {

                if (!this.$el.is(e.target)) {
                    return;
                }

                this.page.addClass(this.clsPage);
                this.$el.css('display', 'block');
                this.$el.height();
            },
            hide: function hide(e) {

                if (!this.$el.is(e.target)) {
                    return;
                }

                if (!this.getActive()) {
                    this.page.removeClass(this.clsPage);
                }

                this.$el.css('display', '').removeClass('uk-flex uk-flex-center uk-flex-middle');
            }
        }

    });

    UIkit.component('overflow-auto', {

        mixins: [Class],

        ready: function ready() {
            var _this = this;

            this.panel = query('!.uk-modal-dialog', this.$el);
            this.$el.css('min-height', 150);

            new Observer(function () {
                return _this.$update();
            }).observe(this.panel[0], { childList: true, subtree: true });
        },


        update: {
            handler: function handler() {
                var current = this.$el.css('max-height');
                this.$el.css('max-height', 150).css('max-height', Math.max(150, 150 - (this.panel.outerHeight(true) - window.innerHeight)));
                if (current !== this.$el.css('max-height')) {
                    this.$el.trigger('resize');
                }
            },


            events: ['load', 'resize', 'orientationchange']

        }

    });

    UIkit.modal.dialog = function (content, options) {

        var dialog = UIkit.modal($__default('<div class="uk-modal">\n                <div class="uk-modal-dialog">' + content + '</div>\n             </div>'), options)[0];

        dialog.show();
        dialog.$el.on('hide', function () {
            return dialog.$destroy(true);
        });

        return dialog;
    };

    UIkit.modal.alert = function (message, options) {

        options = $.extend({ bgClose: false, escClose: false, labels: UIkit.modal.labels }, options);

        var deferred = $__default.Deferred();

        UIkit.modal.dialog('\n            <div class="uk-modal-body">' + (isString(message) ? message : $__default(message).html()) + '</div>\n            <div class="uk-modal-footer uk-text-right">\n                <button class="uk-button uk-button-primary uk-modal-close" autofocus>' + options.labels.ok + '</button>\n            </div>\n        ', options).$el.on('hide', function () {
            return deferred.resolve();
        });

        return deferred.promise();
    };

    UIkit.modal.confirm = function (message, options) {

        options = $.extend({ bgClose: false, escClose: false, labels: UIkit.modal.labels }, options);

        var deferred = $__default.Deferred();

        UIkit.modal.dialog('\n            <div class="uk-modal-body">' + (isString(message) ? message : $__default(message).html()) + '</div>\n            <div class="uk-modal-footer uk-text-right">\n                <button class="uk-button uk-button-default uk-modal-close">' + options.labels.cancel + '</button>\n                <button class="uk-button uk-button-primary uk-modal-close" autofocus>' + options.labels.ok + '</button>\n            </div>\n        ', options).$el.on('click', '.uk-modal-footer button', function (e) {
            return deferred[$__default(e.target).index() === 0 ? 'reject' : 'resolve']();
        });

        return deferred.promise();
    };

    UIkit.modal.prompt = function (message, value, options) {

        options = $.extend({ bgClose: false, escClose: false, labels: UIkit.modal.labels }, options);

        var deferred = $__default.Deferred(),
            prompt = UIkit.modal.dialog('\n                <form class="uk-form-stacked">\n                    <div class="uk-modal-body">\n                        <label>' + (isString(message) ? message : $__default(message).html()) + '</label>\n                        <input class="uk-input" type="text" autofocus>\n                    </div>\n                    <div class="uk-modal-footer uk-text-right">\n                        <button class="uk-button uk-button-default uk-modal-close" type="button">' + options.labels.cancel + '</button>\n                        <button class="uk-button uk-button-primary" type="submit">' + options.labels.ok + '</button>\n                    </div>\n                </form>\n            ', options),
            input = prompt.$el.find('input').val(value);

        prompt.$el.on('submit', 'form', function (e) {
            e.preventDefault();
            deferred.resolve(input.val());
            prompt.hide();
        }).on('hide', function () {
            if (deferred.state() === 'pending') {
                deferred.resolve(null);
            }
        });

        return deferred.promise();
    };

    UIkit.modal.labels = {
        ok: 'Ok',
        cancel: 'Cancel'
    };
}

function Nav (UIkit) {

    UIkit.component('nav', UIkit.components.accordion.extend({

        name: 'nav',

        defaults: {
            targets: '> .uk-parent',
            toggle: '> a',
            content: 'ul:first'
        }

    }));
}

function Navbar (UIkit) {

    UIkit.component('navbar', {

        mixins: [Class],

        props: {
            dropdown: String,
            mode: String,
            align: String,
            offset: Number,
            boundary: Boolean,
            boundaryAlign: Boolean,
            clsDrop: String,
            delayShow: Number,
            delayHide: Number,
            dropbar: Boolean,
            dropbarMode: String,
            dropbarAnchor: 'jQuery',
            duration: Number
        },

        defaults: {
            dropdown: '.uk-navbar-nav > li',
            mode: 'hover',
            align: 'left',
            offset: false,
            boundary: true,
            boundaryAlign: false,
            clsDrop: 'uk-navbar-dropdown',
            delayShow: 0,
            delayHide: 800,
            flip: 'x',
            dropbar: false,
            dropbarMode: 'slide',
            dropbarAnchor: false,
            duration: 200
        },

        ready: function ready() {
            var _this = this;

            var drop;

            this.boundary = this.boundary === true || this.boundaryAlign ? this.$el : this.boundary;
            this.pos = 'bottom-' + this.align;

            $__default(this.dropdown, this.$el).each(function (i, el) {

                drop = toJQuery('.' + _this.clsDrop, el);

                if (drop && !UIkit.getComponent(drop, 'drop') && !UIkit.getComponent(drop, 'dropdown')) {
                    UIkit.drop(drop, $.extend({}, _this));
                }
            }).on('mouseenter', function (_ref) {
                var target = _ref.target;

                var active = _this.getActive();
                if (active && !isWithin(target, active.toggle.$el) && !active.isDelaying) {
                    active.hide(false);
                }
            });

            if (!this.dropbar) {
                return;
            }

            this.dropbar = query(this.dropbar, this.$el) || $__default('<div class="uk-navbar-dropbar"></div>').insertAfter(this.dropbarAnchor || this.$el);

            if (this.dropbarMode === 'slide') {
                this.dropbar.addClass('uk-navbar-dropbar-slide');
            }

            this.dropbar.on({

                mouseleave: function mouseleave() {

                    var active = _this.getActive();

                    if (active && !_this.dropbar.is(':hover')) {
                        active.hide();
                    }
                },

                beforeshow: function beforeshow(e, _ref2) {
                    var $el = _ref2.$el;

                    $el.addClass(_this.clsDrop + '-dropbar');
                    _this.transitionTo($el.outerHeight(true));
                },

                beforehide: function beforehide(e, _ref3) {
                    var $el = _ref3.$el;


                    var active = _this.getActive();

                    if (_this.dropbar.is(':hover') && active && active.$el.is($el)) {
                        return false;
                    }
                },

                hide: function hide(e, _ref4) {
                    var $el = _ref4.$el;


                    var active = _this.getActive();

                    if (active && active.$el.is($el)) {
                        _this.transitionTo(0);
                    }
                }

            });
        },


        events: {
            beforeshow: function beforeshow(e, _ref5) {
                var $el = _ref5.$el,
                    dir = _ref5.dir;

                if (this.dropbar && dir === 'bottom' && !isWithin($el, this.dropbar)) {
                    $el.appendTo(this.dropbar);
                    this.dropbar.trigger('beforeshow', [{ $el: $el }]);
                }
            }
        },

        methods: {
            getActive: function getActive() {
                var active = UIkit.drop.getActive();
                return active && active.mode !== 'click' && isWithin(active.toggle.$el, this.$el) && active;
            },
            transitionTo: function transitionTo(height) {
                this.dropbar.height(this.dropbar[0].offsetHeight ? this.dropbar.height() : 0);
                return Transition.cancel(this.dropbar).start(this.dropbar, { height: height }, this.duration);
            }
        }

    });
}

function Offcanvas (UIkit) {

    UIkit.component('offcanvas', {

        mixins: [Modal],

        props: {
            mode: String,
            flip: Boolean,
            overlay: Boolean
        },

        defaults: {
            mode: 'slide',
            flip: false,
            overlay: false,
            clsPage: 'uk-offcanvas-page',
            clsPanel: 'uk-offcanvas-bar',
            clsFlip: 'uk-offcanvas-flip',
            clsPageAnimation: 'uk-offcanvas-page-animation',
            clsSidebarAnimation: 'uk-offcanvas-bar-animation',
            clsMode: 'uk-offcanvas',
            clsOverlay: 'uk-offcanvas-overlay',
            clsPageOverlay: 'uk-offcanvas-page-overlay',
            selClose: '.uk-offcanvas-close'
        },

        ready: function ready() {

            this.clsFlip = this.flip ? this.clsFlip : '';
            this.clsOverlay = this.overlay ? this.clsOverlay : '';
            this.clsPageOverlay = this.overlay ? this.clsPageOverlay : '';
            this.clsMode = this.clsMode + '-' + this.mode;

            if (this.mode === 'none' || this.mode === 'reveal') {
                this.clsSidebarAnimation = '';
            }

            if (this.mode !== 'push' && this.mode !== 'reveal') {
                this.clsPageAnimation = '';
            }
        },


        update: {
            handler: function handler() {

                if (this.isActive()) {
                    this.page.width(window.innerWidth - this.getScrollbarWidth());
                }
            },


            events: ['resize', 'orientationchange']

        },

        events: {
            beforeshow: function beforeshow(e) {

                if (!this.$el.is(e.target)) {
                    return;
                }

                this.page.addClass(this.clsPage + ' ' + this.clsFlip + ' ' + this.clsPageAnimation + ' ' + this.clsPageOverlay);
                this.panel.addClass(this.clsSidebarAnimation + ' ' + this.clsMode);
                this.$el.addClass(this.clsOverlay).css('display', 'block').height();
            },
            beforehide: function beforehide(e) {

                if (!this.$el.is(e.target)) {
                    return;
                }

                this.page.removeClass(this.clsPageAnimation).css('margin-left', '');

                if (this.mode === 'none' || this.getActive() && this.getActive() !== this) {
                    this.panel.trigger(transitionend);
                }
            },
            hide: function hide(e) {

                if (!this.$el.is(e.target)) {
                    return;
                }

                this.page.removeClass(this.clsPage + ' ' + this.clsFlip + ' ' + this.clsPageOverlay).width('');
                this.panel.removeClass(this.clsSidebarAnimation + ' ' + this.clsMode);
                this.$el.removeClass(this.clsOverlay).css('display', '');
            }
        }

    });
}

function Responsive (UIkit) {

    UIkit.component('responsive', {

        props: ['width', 'height'],

        update: {
            handler: function handler() {
                if (this.$el.is(':visible') && this.width && this.height) {
                    this.$el.height(Dimensions.fit({ height: this.height, width: this.width }, { width: this.$el.parent().width(), height: this.height || this.$el.height() })['height']);
                }
            },


            events: ['load', 'resize', 'orientationchange']

        }

    });
}

function Scroll (UIkit) {

    UIkit.component('scroll', {

        props: {
            duration: Number,
            transition: String,
            offset: Number
        },

        defaults: {
            duration: 1000,
            transition: 'easeOutExpo',
            offset: 0
        },

        methods: {
            scrollToElement: function scrollToElement(el) {
                var _this = this;

                el = $__default(el);

                // get / set parameters
                var target = el.offset().top - this.offset,
                    docHeight = $__default(document).height(),
                    winHeight = window.innerHeight;

                if (target + winHeight > docHeight) {
                    target = docHeight - winHeight;
                }

                // animate to target, fire callback when done
                $__default('html,body').stop().animate({ scrollTop: parseInt(target, 10) || 1 }, this.duration, this.transition).promise().then(function () {
                    return _this.$el.triggerHandler($__default.Event('scrolled'), [_this]);
                });
            }
        },

        events: {
            click: function click(e) {
                e.preventDefault();
                this.scrollToElement($__default(this.$el[0].hash).length ? this.$el[0].hash : 'body');
            }
        }

    });

    if (!$__default.easing.easeOutExpo) {
        $__default.easing.easeOutExpo = function (x, t, b, c, d) {
            return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        };
    }
}

function Scrollspy (UIkit) {

    UIkit.component('scrollspy', {

        props: {
            cls: String,
            target: String,
            hidden: Boolean,
            offsetTop: Number,
            offsetLeft: Number,
            repeat: Boolean,
            delay: Number
        },

        defaults: {
            cls: 'uk-scrollspy-inview',
            target: false,
            hidden: true,
            offsetTop: 0,
            offsetLeft: 0,
            repeat: false,
            delay: 0,
            inViewClass: 'uk-scrollspy-inview'
        },

        init: function init() {
            if (this.hidden) {
                this.getElements().css('visibility', 'hidden');
            }
        },
        ready: function ready() {

            this.elements = this.getElements();

            if (this.hidden) {
                this.elements.css('visibility', 'hidden');
            }
        },


        update: {
            handler: function handler() {
                var _this = this;

                var index = this.elements.length === 1 ? 1 : 0;

                requestAnimationFrame(function () {
                    // wait for other components to do their positioning (grid)

                    _this.elements.each(function (i, el) {

                        var $el = $__default(el);

                        if (!el.__uk_scrollspy) {
                            el.__uk_scrollspy = { toggles: ($el.attr('uk-scrollspy-class') ? $el.attr('uk-scrollspy-class') : _this.cls).split(',') };
                        }

                        var data = el.__uk_scrollspy;

                        if (isInView(el, _this.offsetTop, _this.offsetLeft)) {

                            if (!data.inview && !data.timer) {

                                data.timer = setTimeout(function () {

                                    $el.css('visibility', '').addClass(_this.inViewClass).toggleClass(data.toggles[0]).trigger('inview'); // TODO rename event?

                                    data.inview = true;
                                    delete data.timer;
                                }, _this.delay * index++);
                            }
                        } else {

                            if (data.inview && _this.repeat) {

                                if (data.timer) {
                                    clearTimeout(data.timer);
                                    delete data.timer;
                                }

                                $el.removeClass(_this.inViewClass).toggleClass(data.toggles[0]).css('visibility', _this.hidden ? 'hidden' : '').trigger('outview'); // TODO rename event?
                                data.inview = false;
                            }
                        }

                        data.toggles.reverse();
                    });
                });
            },


            events: ['scroll', 'load', 'resize', 'orientationchange']

        },

        methods: {
            getElements: function getElements() {
                return this.target && toJQuery(this.target, this.$el) || this.$el;
            }
        }

    });
}

function ScrollspyNav (UIkit) {

    UIkit.component('scrollspy-nav', {

        props: {
            cls: String,
            closest: String,
            scroll: Boolean,
            overflow: Boolean
        },

        defaults: {
            cls: 'uk-active',
            closest: false,
            scroll: false,
            overflow: true
        },

        ready: function ready() {
            this.links = this.$el.find('a[href^="#"]').filter(function (i, el) {
                return el.hash;
            });
            this.elements = this.closest ? this.links.closest(this.closest) : this.links;
            this.targets = $__default($__default.map(this.links, function (el) {
                return el.hash;
            }).join(','));

            if (this.scroll) {
                this.links.each(function () {
                    UIkit.scroll(this);
                });
            }
        },


        update: {
            handler: function handler() {
                var _this = this;

                var scrollTop = $__default(window).scrollTop();

                this.links.blur();
                this.elements.removeClass(this.cls);

                this.targets.each(function (i, el) {

                    el = $__default(el);

                    var offset = el.offset(),
                        last = i + 1 === _this.targets.length;
                    if (!_this.overflow && (i === 0 && offset.top > scrollTop || last && offset.top + el.outerHeight() < scrollTop)) {
                        return false;
                    }

                    if (!last && _this.targets.eq(i + 1).offset().top <= scrollTop) {
                        return;
                    }

                    var active = _this.links.filter('[href="#' + el.attr('id') + '"]');

                    if (active.length) {
                        active = (_this.closest ? active.closest(_this.closest) : active).addClass(_this.cls);
                        _this.$el.trigger('active', [el, active]);

                        return false;
                    }
                });
            },


            events: ['scroll', 'load', 'resize', 'orientationchange']

        }

    });
}

function Sticky (UIkit) {

    UIkit.component('sticky', {

        props: {
            top: null,
            bottom: Boolean,
            offset: Number,
            animation: String,
            clsActive: String,
            clsInactive: String,
            widthElement: 'jQuery',
            showOnUp: Boolean,
            media: 'media',
            target: Number
        },

        defaults: {
            top: 0,
            bottom: false,
            offset: 0,
            animation: '',
            clsActive: 'uk-active',
            clsInactive: '',
            widthElement: false,
            showOnUp: false,
            media: false,
            target: false
        },

        ready: function ready() {
            var _this = this;

            this.placeholder = $__default('<div class="uk-sticky-placeholder"></div>').insertAfter(this.$el).attr('hidden', true);
            this.widthElement = this.widthElement || this.placeholder;
            this.topProp = this.top;
            this.bottomProp = this.bottom;

            var scroll = $__default(window).scrollTop();
            if (location.hash && scroll > 0 && this.target) {

                var target = query(location.hash);

                if (target) {
                    requestAnimationFrame$1(function () {

                        var top = target.offset().top,
                            elTop = _this.$el.offset().top,
                            elHeight = _this.$el.outerHeight(),
                            elBottom = elTop + elHeight;

                        if (elBottom >= top && elTop <= top + target.outerHeight()) {
                            window.scrollTo(0, top - elHeight - _this.target - _this.offset);
                        }
                    });
                }
            }
        },


        update: {
            handler: function handler(_ref) {
                var _this2 = this;

                var type = _ref.type,
                    dir = _ref.dir;


                var isActive = this.$el.hasClass(this.clsActive) && !this.$el.hasClass('uk-animation-leave'),
                    el;

                if (type !== 'scroll') {

                    var outerHeight = this.$el.outerHeight();

                    this.placeholder.css({
                        height: this.$el.css('position') !== 'absolute' ? outerHeight : '',
                        marginTop: this.$el.css('marginTop'),
                        marginBottom: this.$el.css('marginBottom'),
                        marginLeft: this.$el.css('marginLeft'),
                        marginRight: this.$el.css('marginRight')
                    });

                    this.topOffset = (isActive ? this.placeholder.offset() : this.$el.offset()).top;
                    this.bottomOffset = this.topOffset + outerHeight;

                    ['top', 'bottom'].forEach(function (prop) {

                        _this2[prop] = _this2[prop + 'Prop'];

                        if (!_this2[prop]) {
                            return;
                        }

                        if ($.isNumeric(_this2[prop])) {

                            _this2[prop] = _this2[prop + 'Offset'] + parseFloat(_this2[prop]);
                        } else {

                            if (isString(_this2[prop]) && _this2[prop].match(/^-?\d+vh$/)) {
                                _this2[prop] = window.innerHeight * parseFloat(_this2[prop]) / 100;
                            } else {

                                el = _this2[prop] === true ? _this2.$el.parent() : query(_this2[prop], _this2.$el);

                                if (el) {
                                    _this2[prop] = el.offset().top + el.outerHeight();
                                }
                            }
                        }
                    });

                    this.top = Math.max(parseFloat(this.top), this.topOffset) - this.offset;
                    this.bottom = this.bottom && this.bottom - outerHeight;

                    this.inactive = this.media && !window.matchMedia(this.media).matches;
                }

                var scroll = $__default(window).scrollTop();

                if (scroll < 0 || !this.$el.is(':visible') || this.disabled) {
                    return;
                }

                if (this.inactive || scroll < this.top || this.showOnUp && (dir !== 'up' || dir === 'up' && !isActive && scroll <= this.bottomOffset)) {
                    if (isActive) {

                        var hide = function hide() {
                            _this2.$el.removeClass(_this2.clsActive).addClass(_this2.clsInactive).css({ position: '', top: '', width: '' }).trigger('inactive');
                            _this2.placeholder.attr('hidden', true);
                        };

                        if (this.animation && this.bottomOffset < this.$el.offset().top) {
                            Animation.cancel(this.$el).out(this.$el, this.animation).then(hide);
                        } else {
                            hide();
                        }
                    }

                    return;
                }

                this.placeholder.attr('hidden', false);

                var top = Math.max(0, this.offset);
                if (this.bottom && scroll > this.bottom - this.offset) {
                    top = this.bottom - scroll;
                }

                this.$el.css({
                    position: 'fixed',
                    top: top + 'px',
                    width: this.widthElement[0].getBoundingClientRect().width
                });

                if (isActive) {
                    return;
                }

                if (this.animation) {
                    Animation.cancel(this.$el).in(this.$el, this.animation);
                }

                this.$el.addClass(this.clsActive).removeClass(this.clsInactive).trigger('active');
            },


            events: ['scroll', 'load', 'resize', 'orientationchange']

        }

    });
}

var storage = window.sessionStorage || {};
var svgs = {};
function Svg (UIkit) {

    UIkit.component('svg', {

        props: {
            id: String,
            icon: String,
            src: String,
            class: String,
            style: String,
            width: Number,
            height: Number,
            ratio: Number
        },

        defaults: {
            ratio: 1,
            id: false,
            class: '',
            exclude: ['src']
        },

        ready: function ready() {

            this.svg = $__default.Deferred();
            this.init();
        },


        update: {
            handler: function handler() {
                if (!this.src) {
                    this.init();
                }
            },


            events: ['load']

        },

        destroy: function destroy() {

            if (isVoidElement(this.$el)) {
                this.$el.attr({ hidden: null, id: this.id || null });
            }

            if (this.svg) {
                this.svg.then(function (svg) {
                    return svg.remove();
                });
            }
        },


        methods: {
            init: function init() {
                var _this = this;

                if (!this.src) {

                    this.src = getSrc(this.$el);

                    if (!this.src) {
                        return;
                    }
                }

                if (this.src.indexOf('#') !== -1) {

                    var parts = this.src.split('#');

                    if (parts.length > 1) {
                        this.src = parts[0];
                        this.icon = parts[1];
                    }
                }

                this.get(this.src).then(function (svg) {

                    var el;

                    el = !_this.icon ? svg.clone() : (el = toJQuery('#' + _this.icon, svg)) && toJQuery((el[0].outerHTML || $__default('<div>').append(el.clone()).html()).replace(/symbol/g, 'svg')) // IE workaround, el[0].outerHTML
                    || !toJQuery('symbol', svg) && svg.clone(); // fallback if SVG has no symbols

                    if (!el || !el.length) {
                        return $__default.Deferred().reject('SVG not found.');
                    }

                    var dimensions = el[0].getAttribute('viewBox'); // jQuery workaround, el.attr('viewBox')

                    if (dimensions) {
                        dimensions = dimensions.split(' ');
                        _this.width = _this.width || dimensions[2];
                        _this.height = _this.height || dimensions[3];
                    }

                    _this.width *= _this.ratio;
                    _this.height *= _this.ratio;

                    for (var prop in _this.$options.props) {
                        if (_this[prop] && _this.exclude.indexOf(prop) === -1) {
                            el.attr(prop, _this[prop]);
                        }
                    }

                    if (!_this.id) {
                        el.removeAttr('id');
                    }

                    if (_this.width && !_this.height) {
                        el.removeAttr('height');
                    }

                    if (_this.height && !_this.width) {
                        el.removeAttr('width');
                    }

                    if (isVoidElement(_this.$el)) {
                        _this.$el.attr({ hidden: true, id: null });
                        _this.svg.resolve(el.insertAfter(_this.$el));
                    } else {
                        _this.svg.resolve(el.appendTo(_this.$el));
                    }
                });
            },
            get: function get(src) {

                if (svgs[src]) {
                    return svgs[src];
                }

                svgs[src] = $__default.Deferred();

                if (src.lastIndexOf('data:', 0) === 0) {
                    svgs[src].resolve(getSvg(decodeURIComponent(src.split(',')[1])));
                } else {

                    var key = 'uikit_' + UIkit.version + '_' + src;

                    if (storage[key]) {
                        svgs[src].resolve(getSvg(storage[key]));
                    } else {
                        $__default.get(src).then(function (doc, status, res) {
                            storage[key] = res.responseText;
                            svgs[src].resolve(getSvg(storage[key]));
                        });
                    }
                }

                return svgs[src];

                function getSvg(doc) {
                    return $__default(doc).filter('svg');
                }
            }
        }

    });

    function getSrc(el) {

        var image = getBackgroundImage(el);

        if (!image && !el.is(':visible')) {
            el = el.clone().attr('uk-no-boot', '').appendTo(document.body).show();
            image = getBackgroundImage(el);
            el.remove();
        }

        return image && image.slice(4, -1).replace(/"/g, '');
    }

    function getBackgroundImage(el) {
        var image = (window.getComputedStyle(el[0], '::before') || {}).backgroundImage;
        return image !== 'none' && image;
    }
}

function Switcher (UIkit) {

    UIkit.component('switcher', {

        mixins: [Toggable],

        props: {
            connect: 'jQuery',
            toggle: String,
            active: Number,
            swiping: Boolean
        },

        defaults: {
            connect: false,
            toggle: ' > *',
            active: 0,
            swiping: true,
            cls: 'uk-active',
            clsContainer: 'uk-switcher',
            attrItem: 'uk-switcher-item'
        },

        ready: function ready() {
            var _this = this;

            this.toggles = toJQuery(this.toggle, this.$el);

            if (!this.connect) {
                this.connect = toJQuery(this.$el.next('.' + this.clsContainer));
            }

            if (!this.connect || !this.toggles) {
                return;
            }

            this.$el.on('click', this.toggle + ':not(.uk-disabled)', function (e) {
                e.preventDefault();
                _this.show(e.currentTarget);
            });

            this.connect.on('click', '[' + this.attrItem + ']', function (e) {
                e.preventDefault();
                _this.show($__default(e.currentTarget).attr(_this.attrItem));
            });

            if (this.swiping) {
                this.connect.on('swipeRight swipeLeft', function (e) {
                    e.preventDefault();
                    if (!window.getSelection().toString()) {
                        _this.show(e.type == 'swipeLeft' ? 'next' : 'previous');
                    }
                });
            }

            this.updateAria(this.connect.children());
            this.show(toJQuery(this.toggles.filter('.' + this.cls + ':first')) || toJQuery(this.toggles.eq(this.active)) || this.toggles.first());
        },


        methods: {
            show: function show(item) {
                var _this2 = this;

                var length = this.toggles.length,
                    prev = this.connect.children('.' + this.cls).index(),
                    hasPrev = prev >= 0,
                    index = getIndex(item, this.toggles, prev),
                    dir = item === 'previous' ? -1 : 1,
                    toggle;

                for (var i = 0; i < length; i++, index = (index + dir + length) % length) {
                    if (!this.toggles.eq(index).is('.uk-disabled, [disabled]')) {
                        toggle = this.toggles.eq(index);
                        break;
                    }
                }

                if (!toggle || prev >= 0 && toggle.hasClass(this.cls) || prev === index) {
                    return;
                }

                this.toggles.removeClass(this.cls).attr('aria-expanded', false);
                toggle.addClass(this.cls).attr('aria-expanded', true);

                this.toggleElement(hasPrev ? this.connect.children(':nth-child(' + (prev + 1) + ')') : undefined, null, hasPrev).then(function () {
                    _this2.toggleElement(_this2.connect.children(':nth-child(' + (index + 1) + ')'), null, hasPrev);
                });
            }
        }

    });
}

function Tab (UIkit) {

    UIkit.component('tab', UIkit.components.switcher.extend({

        mixins: [Class],

        name: 'tab',

        defaults: {
            media: 960,
            attrItem: 'uk-tab-item'
        },

        init: function init() {

            var cls = this.$el.hasClass('uk-tab-left') && 'uk-tab-left' || this.$el.hasClass('uk-tab-right') && 'uk-tab-right';

            if (cls) {
                UIkit.toggle(this.$el, { cls: cls, mode: 'media', media: this.media });
            }
        }
    }));
}

function Toggle (UIkit) {

    UIkit.component('toggle', {

        mixins: [UIkit.mixin.toggable],

        props: {
            href: 'jQuery',
            target: 'jQuery',
            mode: String,
            media: 'media'
        },

        defaults: {
            href: false,
            target: false,
            mode: 'click',
            queued: true,
            media: false
        },

        ready: function ready() {
            var _this = this;

            this.target = this.target || this.href || this.$el;

            this.mode = hasTouch && this.mode == 'hover' ? 'click' : this.mode;

            if (this.mode === 'media') {
                return;
            }

            if (this.mode === 'hover') {
                this.$el.on({
                    mouseenter: function mouseenter() {
                        return _this.toggle('toggleShow');
                    },
                    mouseleave: function mouseleave() {
                        return _this.toggle('toggleHide');
                    }
                });
            }

            this.$el.on('click', function (e) {

                // TODO better isToggled handling
                if ($__default(e.target).closest('a[href="#"], button').length || $__default(e.target).closest('a[href]') && !_this.target.is(':visible')) {
                    e.preventDefault();
                }

                _this.toggle();
            });
        },


        update: {
            handler: function handler() {

                if (this.mode !== 'media' || !this.media) {
                    return;
                }

                var toggled = this.isToggled(this.target);
                if (window.matchMedia(this.media).matches ? !toggled : toggled) {
                    this.toggle();
                }
            },


            events: ['load', 'resize', 'orientationchange']

        },

        methods: {
            toggle: function toggle(type) {

                var event = $__default.Event(type || 'toggle');
                this.target.triggerHandler(event, [this]);

                if (!event.isDefaultPrevented()) {
                    this.toggleElement(this.target);
                }
            }
        }

    });
}

function core (UIkit) {

    var scroll = window.pageYOffset,
        dir,
        ticking,
        resizing;

    $__default(window).on('load', UIkit.update).on('resize orientationchange', function (e) {
        if (!resizing) {
            requestAnimationFrame$1(function () {
                UIkit.update(e);
                resizing = false;
            });
            resizing = true;
        }
    }).on('scroll', function (e) {
        dir = scroll < window.pageYOffset;
        scroll = window.pageYOffset;
        if (!ticking) {
            requestAnimationFrame$1(function () {
                e.dir = dir ? 'down' : 'up';
                UIkit.update(e);
                ticking = false;
            });
            ticking = true;
        }
    });

    var started = 0;
    on(document, 'animationstart', function (_ref) {
        var target = _ref.target;

        if ($__default(target).css('animationName').lastIndexOf('uk-', 0) === 0) {
            document.body.style.overflowX = 'hidden';
            started++;
        }
    }, true);

    on(document, 'animationend', function (_ref2) {
        var target = _ref2.target;

        if ($__default(target).css('animationName').lastIndexOf('uk-', 0) === 0 && ! --started) {
            document.body.style.overflowX = '';
        }
    }, true);

    on(document.documentElement, 'webkitAnimationEnd', function (_ref3) {
        var target = _ref3.target;

        if ((getComputedStyle(target) || {}).webkitFontSmoothing === 'antialiased') {
            target.style.webkitFontSmoothing = 'subpixel-antialiased';
            setTimeout(function () {
                return target.style.webkitFontSmoothing = '';
            });
        }
    }, true);

    // core components
    UIkit.use(Accordion);
    UIkit.use(Alert);
    UIkit.use(Cover);
    UIkit.use(Drop);
    UIkit.use(Dropdown);
    UIkit.use(FormCustom);
    UIkit.use(HeightMatch);
    UIkit.use(HeightViewport);
    UIkit.use(Hover);
    UIkit.use(Margin);
    UIkit.use(Grid);
    UIkit.use(Modal$1);
    UIkit.use(Nav);
    UIkit.use(Navbar);
    UIkit.use(Offcanvas);
    UIkit.use(Responsive);
    UIkit.use(Scroll);
    UIkit.use(Scrollspy);
    UIkit.use(ScrollspyNav);
    UIkit.use(Sticky);
    UIkit.use(Svg);
    UIkit.use(Icon);
    UIkit.use(Switcher);
    UIkit.use(Tab);
    UIkit.use(Toggle);
}

UIkit.version = '3.0.0';

mixin(UIkit);
core(UIkit);

if (typeof module !== 'undefined') {
    module.exports = UIkit;
}

return UIkit;

})));