/**
 * @license
 * rikaaa-scrollbar.js
 *
 * Generated : 2019-07-21
 * Version : 1.0.3
 * Author : rikaaa.org | Yuki Hata
 * Url : http://rikaaa.org
 *
 *
 * The MIT License (MIT)
 *
 * Copyright 2019 rikaaa.org | Yuki Hata
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var constrain = (function (value, min, max) {
    return Math.max(min, Math.min(max, value));
  });

  var Ease =
  /*#__PURE__*/
  function () {
    function Ease(typestr, duration) {
      _classCallCheck(this, Ease);

      this._type = typestr ? typestr : 'linear';
      this._t = 0;
      this._d = duration;
    }

    _createClass(Ease, [{
      key: "Convarsion",
      value: function Convarsion(val) {
        return val >= 1 ? 1.0 : val;
      }
    }, {
      key: "ease_in",
      value: function ease_in() {
        return this._t * this._t;
      }
    }, {
      key: "ease_out",
      value: function ease_out() {
        return this._t * (2 - this._t);
      }
    }, {
      key: "ease_in_out",
      value: function ease_in_out() {
        return this._t < .5 ? 2 * this._t * this._t : -1 + (4 - 2 * this._t) * this._t;
      }
    }, {
      key: "linear",
      value: function linear() {
        return this._t;
      }
    }, {
      key: "Start",
      value: function Start(func) {
        this._now = performance.now();
        var that = this;
        requestAnimationFrame(loop);

        function loop(timedamp) {
          that.requ = requestAnimationFrame(loop);
          that._t = that.Convarsion((timedamp - that._now) / that._d);

          switch (that._type.replace(/-/g, '_')) {
            case 'linear':
              func(that.linear());
              break;

            case 'ease_in':
              func(that.ease_in());
              break;

            case 'ease_out':
              func(that.ease_out());
              break;

            case 'ease_in_out':
              func(that.ease_in_out());
              break;

            default:
              break;
          }

          if (that._t >= 1.0) {
            cancelAnimationFrame(that.requ);
            if (typeof that._endFunc === 'function') that._endFunc();
          }
        }

        return this;
      }
    }, {
      key: "End",
      value: function End(func) {
        this._endFunc = func;
      }
    }, {
      key: "Stop",
      value: function Stop(func) {
        cancelAnimationFrame(this.requ);
        if (typeof func === 'function') func();
      }
    }, {
      key: "duration",
      set: function set(n) {
        this._d = n;
      },
      get: function get() {
        return this._d;
      }
    }, {
      key: "type",
      set: function set(n) {
        this._type = n;
      }
    }]);

    return Ease;
  }();

  var onebang = (function (func) {
    var _func,
        allow = true;

    return function () {
      if (!allow) {
        func = null;
        return false;
      }

      _func = func.apply(this, arguments);
      allow = false;
      return _func;
    };
  });

  var ready = (function (fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
      setTimeout(function () {
        fn();
      }, 0);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  });

  /**
   * @license
   * rikaaa-ResizeWatcher.js
   *
   * Generated : 2019-07-14
   * Version : 0.5.0
   * Author : rikaaa.org | YUKI HATA
   * Url : http://rikaaa.org
   *
   *
   * The MIT License (MIT)
   *
   * Copyright 2019 rikaaa.org | YUKI HATA
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var onbang = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (func) {
      var _func,
          allow = true;

      return function () {
        var arg = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }

        if (!allow) {
          func = null;
          return false;
        }

        _func = func.apply(this, arg);
        allow = false;
        return _func;
      };
    };
  });
  unwrapExports(onbang);
  var debounce = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (func, interval) {
      var timer = null;
      return function () {
        var arg = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }

        clearTimeout(timer);
        timer = setTimeout(function () {
          return func.apply(this, arg);
        }, interval);
      };
    };
  });
  unwrapExports(debounce);
  var throttle = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (func, interval) {
      var req = null;
      var startTime = null;
      var firstFunc = onbang.default(func);
      var lastFunc = debounce.default(func, interval);
      var clearFirstFunc = debounce.default(function () {
        firstFunc = onbang.default(func);
        startTime = null;
        cancelAnimationFrame(req);
      }, interval);
      return function () {
        var _this = this;

        var arg = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }

        firstFunc.apply(this, arg);
        req = requestAnimationFrame(function (timestamp) {
          if (startTime === null) startTime = timestamp;
          var elapsedTime = timestamp - startTime;

          if (elapsedTime >= interval) {
            startTime = null;
            cancelAnimationFrame(req);
            return func.apply(_this, arg);
          }
        });
        clearFirstFunc();
        return lastFunc.apply(this, arg);
      };
    };
  });
  unwrapExports(throttle);
  var valueObserver = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (firstVal, func, option) {
      if (option === void 0) {
        option = {
          observValKeyName: 'watch'
        };
      }

      var _func,
          _firstval = firstVal,
          _watchKeyName = option.observValKeyName;

      return function (_a) {
        _a = {};
        var originalArgument = [],
            watchVal = null;

        for (var i = 0; i < arguments.length; i++) {
          if (!arguments[i] || !(arguments[i].constructor == Object)) {
            originalArgument.push(arguments[i]);
          } else {
            watchVal = arguments[i][_watchKeyName];
            delete arguments[i][_watchKeyName];

            if (Object.keys(arguments[i]).length > 0) {
              originalArgument.push(arguments[i]);
            }
          }
        }

        if (_firstval === watchVal) {
          return false;
        }

        _firstval = watchVal;
        _func = func.apply(this, originalArgument);
        return _func;
      };
    };
  });
  unwrapExports(valueObserver);
  var isDisplay = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (target) {
      var result = false;
      var style = target.currentStyle || getComputedStyle(target, '');
      result = style.display === 'none' ? false : true;
      return result;
    };
  });
  unwrapExports(isDisplay);
  var calculateContentRect = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (target) {
      var style = getComputedStyle(target, '');
      var targetBounding = target.getBoundingClientRect();

      var parser = function parser(px) {
        return px === ' ' ? 0 : parseFloat(px || '0px');
      };

      var paddingTop = parser(style.paddingTop);
      var paddingBottom = parser(style.paddingBottom);
      var paddingLeft = parser(style.paddingLeft);
      var paddingRight = parser(style.paddingRight);
      var borderTop = parser(style.borderTopWidth);
      var borderBottom = parser(style.borderBottomWidth);
      var borderLeft = parser(style.borderLeftWidth);
      var borderRight = parser(style.borderRightWidth);
      var paddingHorizon = paddingTop + paddingBottom;
      var paddingVertical = paddingLeft + paddingRight;
      var borderHorizon = borderTop + borderBottom;
      var borderVertical = borderLeft + borderRight;
      var width = targetBounding.width - paddingVertical - borderVertical;
      var height = targetBounding.height - paddingHorizon - borderHorizon;
      var contentRect = isDisplay.default(target) ? {
        width: width,
        height: height,
        x: paddingLeft,
        y: paddingTop,
        top: paddingTop,
        left: paddingLeft,
        bottom: paddingTop + height,
        right: paddingLeft + width
      } : {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      };
      return Object.freeze(contentRect);
    };
  });
  unwrapExports(calculateContentRect);

  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function value(searchElement, fromIndex) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        } // 1. Let O be ? ToObject(this value).


        var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

        var len = o.length >>> 0; // 3. If len is 0, return false.

        if (len === 0) {
          return false;
        } // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)


        var n = fromIndex | 0; // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.

        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
        } // 7. Repeat, while k < len


        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          } // c. Increase k by 1. 


          k++;
        } // 8. Return false


        return false;
      }
    });
  }

  var Controller_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Controller =
    /** @class */
    function () {
      function Controller() {
        this.instanceOfResizeWatcher = [];
        this.targetsAll = [];
        this.mutationObserverConfig = {
          childList: true,
          attributes: true,
          characterData: true,
          subtree: true
        };
        this.watcher_binded = throttle.default(Controller.watcher.bind(null, this), Controller.THROTTLE_INTERVAL);
        this.mo = new MutationObserver(this.watcher_binded);
        this.firstCallback = debounce.default(onbang.default(function (entriesContaner) {
          entriesContaner.forEach(function (entries) {
            var callbackArg = entries.entries.map(function (entry) {
              var isDisplay = Controller.isDisplay(entry.target);
              if (isDisplay) return Object.freeze({
                target: entry.target,
                contentRect: entry.contentRect
              });
            }).filter(function (entry) {
              return typeof entry !== 'undefined';
            });
            if (callbackArg.length !== 0) entries.callback(callbackArg);
          });
        }), Controller.THROTTLE_INTERVAL);
      }

      Controller.prototype.init = function (instance) {
        this.instanceOfResizeWatcher.push(instance);
      };

      Controller.prototype.observe = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        if (this.targetsAll.length !== 0) Controller.onWatcher(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instanceOfResizeWatcher);
        this.firstCallback(this.entriesContaner);
      };

      Controller.prototype.unobserve = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instanceOfResizeWatcher);
      };

      Controller.prototype.disconnect = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instanceOfResizeWatcher);

        if (this.targetsAll.length === 0) {
          Controller.offWatcher(this);
        }
      };

      Controller.watcher = function (instances) {
        instances.entriesContaner.forEach(function (entries) {
          var callbackArg = entries.entries.map(function (entry) {
            var currentContentRect = Controller.calculateContentRect(entry.target);
            var isResized = entry.valueObserver({
              watch: Controller.contentRectWHToStr(currentContentRect)
            });
            if (isResized) entry.contentRect = currentContentRect;
            if (isResized) return Object.freeze({
              target: entry.target,
              contentRect: entry.contentRect
            });
          }).filter(function (entry) {
            return typeof entry !== 'undefined';
          });
          if (callbackArg.length !== 0) entries.callback(callbackArg);
        });
      };

      Controller.calculateEntriesContaner = function (instances) {
        return instances.map(function (instance) {
          var entries = instance.targets.map(function (target) {
            var contentRect = Controller.calculateContentRect(target);
            return {
              contentRect: contentRect,
              target: target,
              valueObserver: valueObserver.default(Controller.contentRectWHToStr(contentRect), function () {
                return true;
              })
            };
          });
          instance.entries = entries;
          return instance;
        });
      };

      Controller.contentRectWHToStr = function (contentRect) {
        return "" + contentRect.width + contentRect.height;
      };

      Controller.updateTargetsAll = function (instance) {
        return instance.instanceOfResizeWatcher.map(function (instance) {
          return instance.targets;
        }).reduce(function (a, c) {
          return a.concat(c);
        }, []);
      };

      Controller.onWatcher = function (instance) {
        instance.mo.disconnect();
        instance.mo.observe(document.getElementsByTagName('html')[0], instance.mutationObserverConfig);
        window.addEventListener('resize', instance.watcher_binded, false);
      };

      Controller.offWatcher = function (instance) {
        instance.mo.disconnect();
        window.removeEventListener('resize', instance.watcher_binded);
      };

      Controller.calculateContentRect = function (target) {
        return calculateContentRect.default(target);
      };

      Controller.isDisplay = function (target) {
        return isDisplay.default(target);
      };

      Object.defineProperty(Controller, "THROTTLE_INTERVAL", {
        get: function get() {
          return 33;
        },
        enumerable: true,
        configurable: true
      });
      return Controller;
    }();

    exports.default = Controller;
  });
  unwrapExports(Controller_1);
  var rikaaaResizeWatcher_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var controller = new Controller_1.default();

    var rikaaaResizeWatcher =
    /** @class */
    function () {
      function rikaaaResizeWatcher(callback) {
        this.callback = callback;
        this.targets = [];
        this.entries = [];
        controller.init(this);
      }

      rikaaaResizeWatcher.prototype.observe = function (target) {
        var exist = this.targets.includes(target);
        if (!exist) this.targets.push(target);
        controller.observe();
      };

      rikaaaResizeWatcher.prototype.unobserve = function (target) {
        this.targets = this.targets.filter(function (existTarget) {
          return existTarget !== target;
        });
        controller.unobserve();
      };

      rikaaaResizeWatcher.prototype.disconnect = function () {
        this.targets = [];
        controller.disconnect();
      };

      rikaaaResizeWatcher.calculateContentRect = function (target) {
        return Controller_1.default.calculateContentRect(target);
      };

      rikaaaResizeWatcher.isDisplay = function (target) {
        return Controller_1.default.isDisplay(target);
      };

      Object.defineProperty(rikaaaResizeWatcher, "THROTTLE_INTERVAL", {
        get: function get() {
          return Controller_1.default.THROTTLE_INTERVAL;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(rikaaaResizeWatcher, "CONTROLLER", {
        get: function get() {
          return controller;
        },
        enumerable: true,
        configurable: true
      });
      return rikaaaResizeWatcher;
    }();

    exports.default = rikaaaResizeWatcher;
  });
  var rikaaaResizeWatcher = unwrapExports(rikaaaResizeWatcher_1);

  var debounce$1 = (function (func, interval) {
    var timer = null;
    return function () {
      for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      clearTimeout(timer);
      timer = setTimeout(function () {
        return func.apply(this, arg);
      }, interval);
    };
  });

  var throttle$1 = (function (func, interval) {
    var req = null;
    var startTime = null;
    var firstFunc = onebang(func);
    var lastFunc = debounce$1(func, interval);
    var clearFirstFunc = debounce$1(function () {
      firstFunc = onebang(func);
      startTime = null;
      cancelAnimationFrame(req);
    }, interval);
    return function () {
      var _this = this;

      for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      firstFunc.apply(this, arg);
      req = requestAnimationFrame(function (timestamp) {
        if (startTime === null) startTime = timestamp;
        var elapsedTime = timestamp - startTime;

        if (elapsedTime >= interval) {
          startTime = null;
          cancelAnimationFrame(req);
          return func.apply(_this, arg);
        }
      });
      clearFirstFunc();
      return lastFunc.apply(this, arg);
    };
  });

  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function value(searchElement, fromIndex) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        } // 1. Let O be ? ToObject(this value).


        var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

        var len = o.length >>> 0; // 3. If len is 0, return false.

        if (len === 0) {
          return false;
        } // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)


        var n = fromIndex | 0; // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.

        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
        } // 7. Repeat, while k < len


        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          } // c. Increase k by 1. 


          k++;
        } // 8. Return false


        return false;
      }
    });
  }

  var _css = ':host {  overflow: hidden;  display: block;  position: relative;  height: 100%;  width: 100%;  -webkit-box-sizing: border-box;          box-sizing: border-box; }  :host * {    -webkit-box-sizing: border-box;            box-sizing: border-box; }  :host button {    background-color: transparent;    border: none;    cursor: pointer;    outline: none;    padding: 0;    -webkit-appearance: none;       -moz-appearance: none;            appearance: none;    vertical-align: top; }  :host .bar-area {    position: absolute;    width: 8px;    height: 100%;    right: 0;    background-color: rgba(0, 0, 0, 0.6); }    :host .bar-area .bar-area-padding {      height: 100%;      border: 2px solid transparent; }      :host .bar-area .bar-area-padding .bar-area-padding-inner {        height: 100%; }        :host .bar-area .bar-area-padding .bar-area-padding-inner .btn-wrap {          font-size: 0;          vertical-align: bottom; }          :host .bar-area .bar-area-padding .bar-area-padding-inner .btn-wrap .btn {            width: 100%;            height: 100%;            background-color: white; }            :host .bar-area .bar-area-padding .bar-area-padding-inner .btn-wrap .btn:hover {              opacity: 0.7; }        :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner {          width: 100%;          max-width: 100%;          vertical-align: bottom; }          :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner .bar {            cursor: pointer;            width: 100%; }            :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner .bar .bar-thum {              height: 100%;              font-size: 0; }              :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner .bar .bar-thum .bar-btn {                width: 100%;                max-height: 100%;                height: 30%;                background-color: white; }                :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner .bar .bar-thum .bar-btn:hover {                  opacity: 0.7; }  :host .view {    overflow: auto;    width: 100%;    height: 100%;    scrollbar-width: none;    -ms-overflow-style: none; }    :host .view::-webkit-scrollbar {      display: none; }    :host .view.select-none {      -webkit-user-select: none;         -moz-user-select: none;          -ms-user-select: none;              user-select: none;      pointer-events: none; }';

  var _style = "<style>".concat(_css, "</style>");

  var _shadowdomHTML = "\n    ".concat(_style, "\n    <div class=\"bar-area\">\n        <div class=\"bar-area-padding\">\n            <div class=\"bar-area-padding-inner\">\n                <div class=\"btn-wrap\"><button class=\"btn edge-top\"></button></div>\n                <div class=\"bar-contaner\">\n                    <div class=\"bar\">\n                        <div class=\"bar-thum\">\n                            <button class=\"bar-btn up\"></button>\n                            <button class=\"bar-btn main-btn\"></button>\n                            <button class=\"bar-btn down\"></button>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"btn-wrap\"><button class=\"btn edge-bottom\"></button></div>\n            </div>\n        </div>\n    </div>\n    <div class=\"view\">\n        <div class=\"view-inner\">\n            <slot class=\"contents\"></slot>\n        </div>\n    </div>\n");

  var template = document.createElement('template');
  template.id = 'rikaaascrollbar';
  template.innerHTML = _shadowdomHTML;
  if (window.ShadyCSS) ShadyCSS.prepareTemplate(template, 'rikaaa-scrollbar');

  var rikaaahoge =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(rikaaahoge, _HTMLElement);

    function rikaaahoge() {
      var _this;

      _classCallCheck(this, rikaaahoge);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(rikaaahoge).call(this));
      if (window.ShadyCSS) ShadyCSS.styleElement(_assertThisInitialized(_this));

      _this.attachShadow({
        mode: 'open'
      });

      _this.shadowRoot.appendChild(template.content.cloneNode(true)); // data


      _this.btnH = 10;
      _this.btnSeparation = 2;
      _this.barAreaMaxW = 14;
      _this.barAreaMinW = 8;
      _this.barEdgeBtnH = 5;
      _this.barBtnSeparation = 2;
      _this.allowToEdgeBtn = false;
      _this.allowToBarBtn = false;
      _this.hide = true;
      _this.navigation = true;
      _this.naviData = null;
      _this.currentIndex = 0;
      _this.barOpend = false;
      _this.barSliding = false;
      _this.scrolling = false;
      _this.view = _this.shadowRoot.querySelector('.view');
      return _this;
    }

    _createClass(rikaaahoge, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        var oneHide, oneShow;
        if (this.autohide) oneShow = onebang(function () {
          return _this2.barShow(200);
        });

        if (!window.ResizeObserver && !window.WcRikaaaResizeObserver) {
          Object.defineProperty(window, 'WcRikaaaResizeObserver', {
            value: rikaaaResizeWatcher
          });
        }

        var resizeobserver = window.ResizeObserver || window.WcRikaaaResizeObserver; // mouse scroll

        var timer;

        this.mouseScrollingFunc = function (e) {
          e.preventDefault();
          _this2.barPos = _this2.scrollRatio;
          if (_this2.autohide) oneShow();
          oneHide = onebang(function () {
            return _this2.barHide(200);
          });
          _this2.scrolling = true;

          if (_this2.autohide) {
            clearTimeout(timer);
            timer = setTimeout(function () {
              _this2.scrolling = false;

              if (!_this2.barOpend && !_this2.barSliding) {
                oneHide();
                oneShow = onebang(function () {
                  return _this2.barShow(200);
                });
              }
            }, 3000);
          }
        };

        this.mouseScrollingFunc_throtted = throttle$1(this.mouseScrollingFunc, 10); // this.view.addEventListener('scroll', this.mouseScrollingFunc, {

        this.view.addEventListener('scroll', this.mouseScrollingFunc_throtted, false); // to edge

        this.scrollToEdgeFunc = function (e) {
          var btn = e.currentTarget;
          if (Array.from(btn.classList).includes('main-btn')) return false;
          var dir = Array.from(btn.classList).includes('up');
          if (dir) _this2.goTo(0, 300);else _this2.goTo(1, 300);
        };

        this.shadowRoot.querySelectorAll('.bar-btn').forEach(function (elem) {
          elem.addEventListener('click', _this2.scrollToEdgeFunc);
        });

        var resize = function resize() {
          _this2.redraw(0);
        };

        this.resizeOb = new resizeobserver(resize);
        this.resizeOb.observe(this); // skip

        this.barContanerClickFunc = function (e) {
          if (!Array.from(e.target.classList).includes('bar-contaner')) return false;

          var newScrollRatio = (e.pageY - e.currentTarget.getBoundingClientRect().top) / _this2.barContanerH;

          _this2.goTo(newScrollRatio, 200);
        };

        this.shadowRoot.querySelector('.bar-contaner').addEventListener('click', this.barContanerClickFunc); // bar scroll

        var slideStartPos, slideStartRatio, stimer;

        var slide = function slide(e) {
          var slidedVal = e.pageY - slideStartPos;
          var maxSlideVal = _this2.barContanerH - _this2.barHeight;
          var slidedRatio = slidedVal / maxSlideVal;

          _this2.goTo(slideStartRatio + slidedRatio, 0);
        };

        this.attachslideFunc = function (e) {
          window.addEventListener('mousemove', slide);
          window.addEventListener('touchmove', slide);
          slideStartPos = e.pageY;
          slideStartRatio = _this2.scrollRatio;

          _this2.view.classList.add('select-none');

          _this2.barSliding = true;
        };

        this.releaseslideFunc = function () {
          window.removeEventListener('mousemove', slide);
          window.removeEventListener('touchmove', slide);

          _this2.view.classList.remove('select-none');

          _this2.barSliding = false;

          if (_this2.autohide) {
            clearTimeout(stimer);
            stimer = setTimeout(function () {
              if (!_this2.barOpend && !_this2.scrolling && typeof oneHide === 'function') {
                oneHide();
                oneShow = onebang(function () {
                  return _this2.barShow(200);
                });
              }
            }, 3000);
          }
        };

        this.shadowRoot.querySelector('.main-btn').addEventListener('mousedown', this.attachslideFunc);
        this.shadowRoot.querySelector('.main-btn').addEventListener('touchstart', this.attachslideFunc);
        window.addEventListener('mouseup', this.releaseslideFunc);
        window.addEventListener('touchend', this.releaseslideFunc);
        window.addEventListener('mouseleave', this.releaseslideFunc);
        window.addEventListener('touchleave', this.releaseslideFunc); // bar opend and close

        var botimer;

        this.barOpenFunc = function () {
          var d = 100;
          _this2.allowToEdgeBtn = true;
          _this2.allowToBarBtn = true;

          _this2.redraw(d);

          _this2.barAreaW(_this2.maxwidth, d, 'ease-out');

          _this2.barOpend = true;
        };

        this.barCloseFunc = function () {
          var d = 80;
          _this2.allowToEdgeBtn = false;
          _this2.allowToBarBtn = false;

          _this2.redraw(d);

          _this2.barAreaW(_this2.minwidth, 80, 'ease-out');

          _this2.barOpend = false;

          if (_this2.autohide) {
            clearTimeout(botimer);
            botimer = setTimeout(function () {
              if (!_this2.barSliding && !_this2.scrolling) {
                oneHide();
                oneShow = onebang(function () {
                  return _this2.barShow(200);
                });
              }
            }, 3000);
          }
        };

        this.shadowRoot.querySelector('.bar-area').addEventListener('mouseenter', this.barOpenFunc);
        this.shadowRoot.querySelector('.bar-area').addEventListener('mouseleave', this.barCloseFunc); // navi

        this.naviFunc = function (e) {
          var dir = Array.from(e.currentTarget.classList).includes('edge-top') ? false : true; // true is next;

          _this2.goNavigation(dir);
        };

        this.shadowRoot.querySelectorAll('.btn').forEach(function (elem) {
          elem.addEventListener('click', _this2.naviFunc);
        }); // init

        ready(function () {
          _this2.redraw(0);

          if (_this2.autohide) _this2.barHide(0);

          _this2.dispatchEvent(new CustomEvent('load'));
        });
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldval, newval) {
        if (attr === 'minwidth') this.barAreaW(Number(newval), 0, 'ease-in');
        if (attr === 'usenavi') this.redraw(0);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this3 = this;

        this.shadowRoot.querySelectorAll('.btn').forEach(function (elem) {
          elem.removeEventListener('click', _this3.naviFunc);
        });
        this.shadowRoot.querySelector('.bar-area').removeEventListener('mouseenter', this.barOpenFunc);
        this.shadowRoot.querySelector('.bar-area').removeEventListener('mouseleave', this.barCloseFunc);
        this.shadowRoot.querySelector('.main-btn').removeEventListener('mousedown', this.attachslideFunc);
        this.shadowRoot.querySelector('.main-btn').removeEventListener('touchstart', this.attachslideFunc);
        window.removeEventListener('mouseup', this.releaseslideFunc);
        window.removeEventListener('touchend', this.releaseslideFunc);
        window.removeEventListener('mouseleave', this.releaseslideFunc);
        window.removeEventListener('touchleave', this.releaseslideFunc);
        this.shadowRoot.querySelector('.bar-contaner').removeEventListener('click', this.barContanerClickFunc);
        this.resizeOb.disconnect();
        this.shadowRoot.querySelectorAll('.bar-btn').forEach(function (elem) {
          elem.removeEventListener('click', _this3.scrollToEdgeFunc);
        });
        this.view.removeEventListener('scroll', this.mouseScrollingFunc_throtted);
      }
    }, {
      key: "setBarAreaSeparation",
      value: function setBarAreaSeparation(btnH_px, btnSeparation_px, changIngAnimationDuration_ms) {
        var btnh = this.usenavi && this.naviData !== null ? btnH_px : 0;
        var btn = this.shadowRoot.querySelectorAll('.btn');
        var barContaner = this.shadowRoot.querySelector('.bar-contaner');
        var barAreaPaddingInner = this.shadowRoot.querySelector('.bar-area-padding-inner');
        var currentBtnH = btn[0].getBoundingClientRect().height;
        var currentBtnSeparation = Number(btn[0].style.marginBottom.replace(/px/g, ''));
        var currentBarContanerH = Number(barContaner.style.height.replace(/px/g, ''));
        var barUIAreaH = barAreaPaddingInner.getBoundingClientRect().height;
        this.barContanerH = barUIAreaH - btnh * 2;

        var change = function change(ease) {
          Array.from(btn).forEach(function (elem) {
            elem.style.height = "".concat(currentBtnH + (btnh - currentBtnH) * ease, "px");
            var separation = currentBtnSeparation + (btnSeparation_px - currentBtnSeparation) * ease;
            if (Array.from(elem.classList).includes('edge-top')) elem.style.marginBottom = "".concat(separation, "px");else elem.style.marginTop = "".concat(separation, "px");
          });
          barContaner.style.height = "".concat(currentBarContanerH + (barUIAreaH - (btnh + btnSeparation_px) * 2 - currentBarContanerH) * ease, "px");
        };

        if (changIngAnimationDuration_ms !== 0) {
          var ease = new Ease('ease-in', changIngAnimationDuration_ms);
          ease.Start(function (e) {
            return change(e);
          });
        } else {
          change(1);
        }
      }
    }, {
      key: "setBarH",
      value: function setBarH() {
        var bar = this.shadowRoot.querySelector('.bar');
        var viewH = this.viewHeight;
        var contentH = this.areaHeight;
        var barHRatio = viewH / contentH;
        bar.style.height = "".concat(barHRatio * 100, "%");
        this.barHeight = this.barContanerH * barHRatio;
      }
    }, {
      key: "setBarBtnSeparation",
      value: function setBarBtnSeparation(NextBackBtnH, btnSeparationH, duration) {
        var nextBtn = this.shadowRoot.querySelector('.down');
        var backBtn = this.shadowRoot.querySelector('.up');
        var mainBtn = this.shadowRoot.querySelector('.main-btn');
        var areaH = this.shadowRoot.querySelector('.bar-thum').getBoundingClientRect().height;
        var currentNBBtnH = nextBtn.getBoundingClientRect().height;
        var currentMainBtnH = mainBtn.getBoundingClientRect().height;
        var currentSeparation = Number(nextBtn.style.marginTop.replace(/px/g, ''));

        var change = function change(ease) {
          var NBbtnH = (currentNBBtnH + (NextBackBtnH - currentNBBtnH) * ease) / areaH * 100;
          var separation = currentSeparation + (btnSeparationH - currentSeparation) * ease;
          Object.assign(nextBtn.style, {
            height: "".concat(NBbtnH, "%"),
            marginTop: "".concat(separation, "px")
          });
          Object.assign(backBtn.style, {
            height: "".concat(NBbtnH, "%"),
            marginBottom: "".concat(separation, "px")
          });
          mainBtn.style.height = "".concat((currentMainBtnH + (areaH - NextBackBtnH * 2 - btnSeparationH * 2 - currentMainBtnH) * ease) / areaH * 100, "%");
        };

        if (duration !== 0) {
          var ease = new Ease('ease-in', duration);
          ease.Start(function (e) {
            change(e);
          });
        } else {
          change(1);
        }
      }
    }, {
      key: "goTo",
      value: function goTo(newScrollRatio, duration) {
        var ratio = constrain(newScrollRatio, 0, 1);
        var currentScrollRatio = this.scrollRatio;
        var diffRatio = ratio - currentScrollRatio;
        var maxScrollVal = this.areaHeight - this.viewHeight;
        var view = this.view;

        var scroll = function scroll(ease) {
          view.scrollTop = maxScrollVal * currentScrollRatio + maxScrollVal * diffRatio * ease;
        };

        if (duration !== 0) {
          var ease = new Ease('ease-out', duration);
          ease.Start(function (e) {
            return scroll(e);
          });
        } else {
          scroll(1);
        }
      }
    }, {
      key: "barAreaW",
      value: function barAreaW(areaW, duration, timingFunc) {
        var barArea = this.shadowRoot.querySelector('.bar-area');
        Object.assign(barArea.style, {
          transition: "width ".concat(duration, "ms ").concat(timingFunc),
          width: "".concat(areaW, "px")
        });
      }
    }, {
      key: "navi",
      value: function navi(naviTargets) {
        // if (!navigator) return false;
        this.naviData = naviTargets;
      }
    }, {
      key: "goNavigation",
      value: function goNavigation(dir) {
        var _this4 = this;

        var sag = this.naviSaggestion;

        var getOffsetTop = function getOffsetTop(id) {
          return _this4.shadowRoot.querySelector('.contents').assignedNodes({
            flattern: true
          }).filter(function (n) {
            return n.nodeType === n.ELEMENT_NODE;
          })[0].querySelector("#".concat(id)).offsetTop;
        };

        var areaH = this.areaHeight - this.viewHeight;

        if (dir) {
          if (sag.next !== false) this.goTo(getOffsetTop(sag.next.id) / areaH, 300);
        } else {
          if (sag.prev !== false) this.goTo(getOffsetTop(sag.prev.id) / areaH, 300);
        }
      }
    }, {
      key: "redraw",
      value: function redraw(duration) {
        this.barPos = this.scrollRatio;
        if (this.allowToEdgeBtn) this.setBarAreaSeparation(this.btnH, this.btnSeparation, duration);else this.setBarAreaSeparation(0, 0, duration);
        this.setBarH();
        if (this.allowToBarBtn) this.setBarBtnSeparation(this.barEdgeBtnH, this.barBtnSeparation, duration);else this.setBarBtnSeparation(0, 0, duration);
        if (this.viewHeight >= this.areaHeight) this.barHide(100);else if (!this.autohide) this.barShow(100);
      }
    }, {
      key: "barOpacity",
      value: function barOpacity(ratio, duration) {
        var r = constrain(ratio, 0, 1);
        var bar = this.shadowRoot.querySelector('.bar-area');
        var currentRatio = Number(bar.style.opacity);
        var diff = r - currentRatio;

        var change = function change(ease) {
          var o = currentRatio + diff * ease;
          var style = bar.style;
          style.opacity = o;
          o === 0 ? bar.style.visibility = 'hidden' : bar.style.visibility = '';
        };

        if (duration !== 0) {
          var ease = new Ease('ease-in', duration);
          ease.Start(function (e) {
            return change(e);
          });
        } else {
          change(1);
        }
      }
    }, {
      key: "barShow",
      value: function barShow(duration) {
        this.barOpacity(1, duration);
      }
    }, {
      key: "barHide",
      value: function barHide(duration) {
        this.barOpacity(0, duration);
      }
    }, {
      key: "maxwidth",
      get: function get() {
        var attr = this.getAttribute('maxwidth');
        return attr === null ? this.barAreaMaxW : Number(attr);
      }
    }, {
      key: "minwidth",
      get: function get() {
        var attr = this.getAttribute('minwidth');
        return attr === null ? this.barAreaMinW : Number(attr);
      }
    }, {
      key: "usenavi",
      get: function get() {
        var attr = this.getAttribute('usenavi');
        return attr === null ? this.navigation : attr.toLowerCase() === 'trure';
      }
    }, {
      key: "autohide",
      get: function get() {
        var attr = this.getAttribute('autohide');
        return attr === null ? this.hide : attr.toLowerCase() === 'true';
      }
    }, {
      key: "scrollRatio",
      get: function get() {
        var scrollPosY = this.view.scrollTop;
        var viewH = this.viewHeight;
        var contentH = this.areaHeight;
        var scrollRatio = scrollPosY / (contentH - viewH);
        return constrain(scrollRatio, 0, 1);
      }
    }, {
      key: "barPos",
      set: function set(scrollRatio) {
        var bar = this.shadowRoot.querySelector('.bar');
        var viewH = this.viewHeight;
        var contentH = this.areaHeight;
        var viewRatio_y = viewH / contentH;
        var PosMaxRatio_y = viewH / (viewH * viewRatio_y) - 1;
        bar.style.transform = "translateY(".concat(PosMaxRatio_y * 100 * scrollRatio, "%)");
      }
    }, {
      key: "naviSaggestion",
      get: function get() {
        var _this5 = this;

        if (this.naviData === null) return false;
        var goal = this.view.scrollTop;
        var data = this.naviData;
        var near = data.reduce(function (a, c) {
          var getOffsetTop = function getOffsetTop(id) {
            return _this5.shadowRoot.querySelector('.contents').assignedNodes({
              flattern: true
            }).filter(function (n) {
              return n.nodeType === n.ELEMENT_NODE;
            })[0].querySelector("#".concat(id)).offsetTop;
          };

          return Math.abs(getOffsetTop(c.id) - goal) < Math.abs(getOffsetTop(a.id) - goal) ? c : a;
        });
        var indexs = [data.indexOf(near) - 1, data.indexOf(near), data.indexOf(near) + 1].map(function (index) {
          return index < 0 || index > data.length - 1 ? false : index;
        });
        return {
          prev: indexs[0] === false ? false : data[indexs[0]],
          near: indexs[1] === false ? false : data[indexs[1]],
          next: indexs[2] === false ? false : data[indexs[2]]
        };
      }
    }, {
      key: "areaHeight",
      get: function get() {
        return this.shadowRoot.querySelector('.view-inner').getBoundingClientRect().height;
      }
    }, {
      key: "viewHeight",
      get: function get() {
        return this.getBoundingClientRect().height;
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['minwidth', 'usenavi'];
      }
    }]);

    return rikaaahoge;
  }(_wrapNativeSuper(HTMLElement));

  customElements.define('rikaaa-scrollbar', rikaaahoge);

}());
