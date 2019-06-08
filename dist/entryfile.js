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

  Array.prototype.includes||(Array.prototype.includes=function(r){if(null==this)throw new TypeError("Array.prototype.includes called on null or undefined");var e=Object(this),n=parseInt(e.length,10)||0;if(0===n)return !1;var t,o,i=parseInt(arguments[1],10)||0;for(0<=i?t=i:(t=n+i)<0&&(t=0);t<n;){if(r===(o=e[t])||r!=r&&o!=o)return !0;t++;}return !1});

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

  /**
   * A collection of shims that provide minimal functionality of the ES6 collections.
   *
   * These implementations are not meant to be used outside of the ResizeObserver
   * modules as they cover only a limited range of use cases.
   */
  /* eslint-disable require-jsdoc, valid-jsdoc */
  var MapShim = (function () {
      if (typeof Map !== 'undefined') {
          return Map;
      }
      /**
       * Returns index in provided array that matches the specified key.
       *
       * @param {Array<Array>} arr
       * @param {*} key
       * @returns {number}
       */
      function getIndex(arr, key) {
          var result = -1;
          arr.some(function (entry, index) {
              if (entry[0] === key) {
                  result = index;
                  return true;
              }
              return false;
          });
          return result;
      }
      return /** @class */ (function () {
          function class_1() {
              this.__entries__ = [];
          }
          Object.defineProperty(class_1.prototype, "size", {
              /**
               * @returns {boolean}
               */
              get: function () {
                  return this.__entries__.length;
              },
              enumerable: true,
              configurable: true
          });
          /**
           * @param {*} key
           * @returns {*}
           */
          class_1.prototype.get = function (key) {
              var index = getIndex(this.__entries__, key);
              var entry = this.__entries__[index];
              return entry && entry[1];
          };
          /**
           * @param {*} key
           * @param {*} value
           * @returns {void}
           */
          class_1.prototype.set = function (key, value) {
              var index = getIndex(this.__entries__, key);
              if (~index) {
                  this.__entries__[index][1] = value;
              }
              else {
                  this.__entries__.push([key, value]);
              }
          };
          /**
           * @param {*} key
           * @returns {void}
           */
          class_1.prototype.delete = function (key) {
              var entries = this.__entries__;
              var index = getIndex(entries, key);
              if (~index) {
                  entries.splice(index, 1);
              }
          };
          /**
           * @param {*} key
           * @returns {void}
           */
          class_1.prototype.has = function (key) {
              return !!~getIndex(this.__entries__, key);
          };
          /**
           * @returns {void}
           */
          class_1.prototype.clear = function () {
              this.__entries__.splice(0);
          };
          /**
           * @param {Function} callback
           * @param {*} [ctx=null]
           * @returns {void}
           */
          class_1.prototype.forEach = function (callback, ctx) {
              if (ctx === void 0) { ctx = null; }
              for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                  var entry = _a[_i];
                  callback.call(ctx, entry[1], entry[0]);
              }
          };
          return class_1;
      }());
  })();

  /**
   * Detects whether window and document objects are available in current environment.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

  // Returns global object of a current environment.
  var global$1 = (function () {
      if (typeof global !== 'undefined' && global.Math === Math) {
          return global;
      }
      if (typeof self !== 'undefined' && self.Math === Math) {
          return self;
      }
      if (typeof window !== 'undefined' && window.Math === Math) {
          return window;
      }
      // eslint-disable-next-line no-new-func
      return Function('return this')();
  })();

  /**
   * A shim for the requestAnimationFrame which falls back to the setTimeout if
   * first one is not supported.
   *
   * @returns {number} Requests' identifier.
   */
  var requestAnimationFrame$1 = (function () {
      if (typeof requestAnimationFrame === 'function') {
          // It's required to use a bounded function because IE sometimes throws
          // an "Invalid calling object" error if rAF is invoked without the global
          // object on the left hand side.
          return requestAnimationFrame.bind(global$1);
      }
      return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
  })();

  // Defines minimum timeout before adding a trailing call.
  var trailingTimeout = 2;
  /**
   * Creates a wrapper function which ensures that provided callback will be
   * invoked only once during the specified delay period.
   *
   * @param {Function} callback - Function to be invoked after the delay period.
   * @param {number} delay - Delay after which to invoke callback.
   * @returns {Function}
   */
  function throttle (callback, delay) {
      var leadingCall = false, trailingCall = false, lastCallTime = 0;
      /**
       * Invokes the original callback function and schedules new invocation if
       * the "proxy" was called during current request.
       *
       * @returns {void}
       */
      function resolvePending() {
          if (leadingCall) {
              leadingCall = false;
              callback();
          }
          if (trailingCall) {
              proxy();
          }
      }
      /**
       * Callback invoked after the specified delay. It will further postpone
       * invocation of the original function delegating it to the
       * requestAnimationFrame.
       *
       * @returns {void}
       */
      function timeoutCallback() {
          requestAnimationFrame$1(resolvePending);
      }
      /**
       * Schedules invocation of the original function.
       *
       * @returns {void}
       */
      function proxy() {
          var timeStamp = Date.now();
          if (leadingCall) {
              // Reject immediately following calls.
              if (timeStamp - lastCallTime < trailingTimeout) {
                  return;
              }
              // Schedule new call to be in invoked when the pending one is resolved.
              // This is important for "transitions" which never actually start
              // immediately so there is a chance that we might miss one if change
              // happens amids the pending invocation.
              trailingCall = true;
          }
          else {
              leadingCall = true;
              trailingCall = false;
              setTimeout(timeoutCallback, delay);
          }
          lastCallTime = timeStamp;
      }
      return proxy;
  }

  // Minimum delay before invoking the update of observers.
  var REFRESH_DELAY = 20;
  // A list of substrings of CSS properties used to find transition events that
  // might affect dimensions of observed elements.
  var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
  // Check if MutationObserver is available.
  var mutationObserverSupported = typeof MutationObserver !== 'undefined';
  /**
   * Singleton controller class which handles updates of ResizeObserver instances.
   */
  var ResizeObserverController = /** @class */ (function () {
      /**
       * Creates a new instance of ResizeObserverController.
       *
       * @private
       */
      function ResizeObserverController() {
          /**
           * Indicates whether DOM listeners have been added.
           *
           * @private {boolean}
           */
          this.connected_ = false;
          /**
           * Tells that controller has subscribed for Mutation Events.
           *
           * @private {boolean}
           */
          this.mutationEventsAdded_ = false;
          /**
           * Keeps reference to the instance of MutationObserver.
           *
           * @private {MutationObserver}
           */
          this.mutationsObserver_ = null;
          /**
           * A list of connected observers.
           *
           * @private {Array<ResizeObserverSPI>}
           */
          this.observers_ = [];
          this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
          this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
      }
      /**
       * Adds observer to observers list.
       *
       * @param {ResizeObserverSPI} observer - Observer to be added.
       * @returns {void}
       */
      ResizeObserverController.prototype.addObserver = function (observer) {
          if (!~this.observers_.indexOf(observer)) {
              this.observers_.push(observer);
          }
          // Add listeners if they haven't been added yet.
          if (!this.connected_) {
              this.connect_();
          }
      };
      /**
       * Removes observer from observers list.
       *
       * @param {ResizeObserverSPI} observer - Observer to be removed.
       * @returns {void}
       */
      ResizeObserverController.prototype.removeObserver = function (observer) {
          var observers = this.observers_;
          var index = observers.indexOf(observer);
          // Remove observer if it's present in registry.
          if (~index) {
              observers.splice(index, 1);
          }
          // Remove listeners if controller has no connected observers.
          if (!observers.length && this.connected_) {
              this.disconnect_();
          }
      };
      /**
       * Invokes the update of observers. It will continue running updates insofar
       * it detects changes.
       *
       * @returns {void}
       */
      ResizeObserverController.prototype.refresh = function () {
          var changesDetected = this.updateObservers_();
          // Continue running updates if changes have been detected as there might
          // be future ones caused by CSS transitions.
          if (changesDetected) {
              this.refresh();
          }
      };
      /**
       * Updates every observer from observers list and notifies them of queued
       * entries.
       *
       * @private
       * @returns {boolean} Returns "true" if any observer has detected changes in
       *      dimensions of it's elements.
       */
      ResizeObserverController.prototype.updateObservers_ = function () {
          // Collect observers that have active observations.
          var activeObservers = this.observers_.filter(function (observer) {
              return observer.gatherActive(), observer.hasActive();
          });
          // Deliver notifications in a separate cycle in order to avoid any
          // collisions between observers, e.g. when multiple instances of
          // ResizeObserver are tracking the same element and the callback of one
          // of them changes content dimensions of the observed target. Sometimes
          // this may result in notifications being blocked for the rest of observers.
          activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
          return activeObservers.length > 0;
      };
      /**
       * Initializes DOM listeners.
       *
       * @private
       * @returns {void}
       */
      ResizeObserverController.prototype.connect_ = function () {
          // Do nothing if running in a non-browser environment or if listeners
          // have been already added.
          if (!isBrowser || this.connected_) {
              return;
          }
          // Subscription to the "Transitionend" event is used as a workaround for
          // delayed transitions. This way it's possible to capture at least the
          // final state of an element.
          document.addEventListener('transitionend', this.onTransitionEnd_);
          window.addEventListener('resize', this.refresh);
          if (mutationObserverSupported) {
              this.mutationsObserver_ = new MutationObserver(this.refresh);
              this.mutationsObserver_.observe(document, {
                  attributes: true,
                  childList: true,
                  characterData: true,
                  subtree: true
              });
          }
          else {
              document.addEventListener('DOMSubtreeModified', this.refresh);
              this.mutationEventsAdded_ = true;
          }
          this.connected_ = true;
      };
      /**
       * Removes DOM listeners.
       *
       * @private
       * @returns {void}
       */
      ResizeObserverController.prototype.disconnect_ = function () {
          // Do nothing if running in a non-browser environment or if listeners
          // have been already removed.
          if (!isBrowser || !this.connected_) {
              return;
          }
          document.removeEventListener('transitionend', this.onTransitionEnd_);
          window.removeEventListener('resize', this.refresh);
          if (this.mutationsObserver_) {
              this.mutationsObserver_.disconnect();
          }
          if (this.mutationEventsAdded_) {
              document.removeEventListener('DOMSubtreeModified', this.refresh);
          }
          this.mutationsObserver_ = null;
          this.mutationEventsAdded_ = false;
          this.connected_ = false;
      };
      /**
       * "Transitionend" event handler.
       *
       * @private
       * @param {TransitionEvent} event
       * @returns {void}
       */
      ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
          var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
          // Detect whether transition may affect dimensions of an element.
          var isReflowProperty = transitionKeys.some(function (key) {
              return !!~propertyName.indexOf(key);
          });
          if (isReflowProperty) {
              this.refresh();
          }
      };
      /**
       * Returns instance of the ResizeObserverController.
       *
       * @returns {ResizeObserverController}
       */
      ResizeObserverController.getInstance = function () {
          if (!this.instance_) {
              this.instance_ = new ResizeObserverController();
          }
          return this.instance_;
      };
      /**
       * Holds reference to the controller's instance.
       *
       * @private {ResizeObserverController}
       */
      ResizeObserverController.instance_ = null;
      return ResizeObserverController;
  }());

  /**
   * Defines non-writable/enumerable properties of the provided target object.
   *
   * @param {Object} target - Object for which to define properties.
   * @param {Object} props - Properties to be defined.
   * @returns {Object} Target object.
   */
  var defineConfigurable = (function (target, props) {
      for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
          var key = _a[_i];
          Object.defineProperty(target, key, {
              value: props[key],
              enumerable: false,
              writable: false,
              configurable: true
          });
      }
      return target;
  });

  /**
   * Returns the global object associated with provided element.
   *
   * @param {Object} target
   * @returns {Object}
   */
  var getWindowOf = (function (target) {
      // Assume that the element is an instance of Node, which means that it
      // has the "ownerDocument" property from which we can retrieve a
      // corresponding global object.
      var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
      // Return the local global object if it's not possible extract one from
      // provided element.
      return ownerGlobal || global$1;
  });

  // Placeholder of an empty content rectangle.
  var emptyRect = createRectInit(0, 0, 0, 0);
  /**
   * Converts provided string to a number.
   *
   * @param {number|string} value
   * @returns {number}
   */
  function toFloat(value) {
      return parseFloat(value) || 0;
  }
  /**
   * Extracts borders size from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @param {...string} positions - Borders positions (top, right, ...)
   * @returns {number}
   */
  function getBordersSize(styles) {
      var positions = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          positions[_i - 1] = arguments[_i];
      }
      return positions.reduce(function (size, position) {
          var value = styles['border-' + position + '-width'];
          return size + toFloat(value);
      }, 0);
  }
  /**
   * Extracts paddings sizes from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @returns {Object} Paddings box.
   */
  function getPaddings(styles) {
      var positions = ['top', 'right', 'bottom', 'left'];
      var paddings = {};
      for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
          var position = positions_1[_i];
          var value = styles['padding-' + position];
          paddings[position] = toFloat(value);
      }
      return paddings;
  }
  /**
   * Calculates content rectangle of provided SVG element.
   *
   * @param {SVGGraphicsElement} target - Element content rectangle of which needs
   *      to be calculated.
   * @returns {DOMRectInit}
   */
  function getSVGContentRect(target) {
      var bbox = target.getBBox();
      return createRectInit(0, 0, bbox.width, bbox.height);
  }
  /**
   * Calculates content rectangle of provided HTMLElement.
   *
   * @param {HTMLElement} target - Element for which to calculate the content rectangle.
   * @returns {DOMRectInit}
   */
  function getHTMLElementContentRect(target) {
      // Client width & height properties can't be
      // used exclusively as they provide rounded values.
      var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
      // By this condition we can catch all non-replaced inline, hidden and
      // detached elements. Though elements with width & height properties less
      // than 0.5 will be discarded as well.
      //
      // Without it we would need to implement separate methods for each of
      // those cases and it's not possible to perform a precise and performance
      // effective test for hidden elements. E.g. even jQuery's ':visible' filter
      // gives wrong results for elements with width & height less than 0.5.
      if (!clientWidth && !clientHeight) {
          return emptyRect;
      }
      var styles = getWindowOf(target).getComputedStyle(target);
      var paddings = getPaddings(styles);
      var horizPad = paddings.left + paddings.right;
      var vertPad = paddings.top + paddings.bottom;
      // Computed styles of width & height are being used because they are the
      // only dimensions available to JS that contain non-rounded values. It could
      // be possible to utilize the getBoundingClientRect if only it's data wasn't
      // affected by CSS transformations let alone paddings, borders and scroll bars.
      var width = toFloat(styles.width), height = toFloat(styles.height);
      // Width & height include paddings and borders when the 'border-box' box
      // model is applied (except for IE).
      if (styles.boxSizing === 'border-box') {
          // Following conditions are required to handle Internet Explorer which
          // doesn't include paddings and borders to computed CSS dimensions.
          //
          // We can say that if CSS dimensions + paddings are equal to the "client"
          // properties then it's either IE, and thus we don't need to subtract
          // anything, or an element merely doesn't have paddings/borders styles.
          if (Math.round(width + horizPad) !== clientWidth) {
              width -= getBordersSize(styles, 'left', 'right') + horizPad;
          }
          if (Math.round(height + vertPad) !== clientHeight) {
              height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
          }
      }
      // Following steps can't be applied to the document's root element as its
      // client[Width/Height] properties represent viewport area of the window.
      // Besides, it's as well not necessary as the <html> itself neither has
      // rendered scroll bars nor it can be clipped.
      if (!isDocumentElement(target)) {
          // In some browsers (only in Firefox, actually) CSS width & height
          // include scroll bars size which can be removed at this step as scroll
          // bars are the only difference between rounded dimensions + paddings
          // and "client" properties, though that is not always true in Chrome.
          var vertScrollbar = Math.round(width + horizPad) - clientWidth;
          var horizScrollbar = Math.round(height + vertPad) - clientHeight;
          // Chrome has a rather weird rounding of "client" properties.
          // E.g. for an element with content width of 314.2px it sometimes gives
          // the client width of 315px and for the width of 314.7px it may give
          // 314px. And it doesn't happen all the time. So just ignore this delta
          // as a non-relevant.
          if (Math.abs(vertScrollbar) !== 1) {
              width -= vertScrollbar;
          }
          if (Math.abs(horizScrollbar) !== 1) {
              height -= horizScrollbar;
          }
      }
      return createRectInit(paddings.left, paddings.top, width, height);
  }
  /**
   * Checks whether provided element is an instance of the SVGGraphicsElement.
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */
  var isSVGGraphicsElement = (function () {
      // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
      // interface.
      if (typeof SVGGraphicsElement !== 'undefined') {
          return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
      }
      // If it's so, then check that element is at least an instance of the
      // SVGElement and that it has the "getBBox" method.
      // eslint-disable-next-line no-extra-parens
      return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
          typeof target.getBBox === 'function'); };
  })();
  /**
   * Checks whether provided element is a document element (<html>).
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */
  function isDocumentElement(target) {
      return target === getWindowOf(target).document.documentElement;
  }
  /**
   * Calculates an appropriate content rectangle for provided html or svg element.
   *
   * @param {Element} target - Element content rectangle of which needs to be calculated.
   * @returns {DOMRectInit}
   */
  function getContentRect(target) {
      if (!isBrowser) {
          return emptyRect;
      }
      if (isSVGGraphicsElement(target)) {
          return getSVGContentRect(target);
      }
      return getHTMLElementContentRect(target);
  }
  /**
   * Creates rectangle with an interface of the DOMRectReadOnly.
   * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
   *
   * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
   * @returns {DOMRectReadOnly}
   */
  function createReadOnlyRect(_a) {
      var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
      // If DOMRectReadOnly is available use it as a prototype for the rectangle.
      var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
      var rect = Object.create(Constr.prototype);
      // Rectangle's properties are not writable and non-enumerable.
      defineConfigurable(rect, {
          x: x, y: y, width: width, height: height,
          top: y,
          right: x + width,
          bottom: height + y,
          left: x
      });
      return rect;
  }
  /**
   * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
   * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @param {number} width - Rectangle's width.
   * @param {number} height - Rectangle's height.
   * @returns {DOMRectInit}
   */
  function createRectInit(x, y, width, height) {
      return { x: x, y: y, width: width, height: height };
  }

  /**
   * Class that is responsible for computations of the content rectangle of
   * provided DOM element and for keeping track of it's changes.
   */
  var ResizeObservation = /** @class */ (function () {
      /**
       * Creates an instance of ResizeObservation.
       *
       * @param {Element} target - Element to be observed.
       */
      function ResizeObservation(target) {
          /**
           * Broadcasted width of content rectangle.
           *
           * @type {number}
           */
          this.broadcastWidth = 0;
          /**
           * Broadcasted height of content rectangle.
           *
           * @type {number}
           */
          this.broadcastHeight = 0;
          /**
           * Reference to the last observed content rectangle.
           *
           * @private {DOMRectInit}
           */
          this.contentRect_ = createRectInit(0, 0, 0, 0);
          this.target = target;
      }
      /**
       * Updates content rectangle and tells whether it's width or height properties
       * have changed since the last broadcast.
       *
       * @returns {boolean}
       */
      ResizeObservation.prototype.isActive = function () {
          var rect = getContentRect(this.target);
          this.contentRect_ = rect;
          return (rect.width !== this.broadcastWidth ||
              rect.height !== this.broadcastHeight);
      };
      /**
       * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
       * from the corresponding properties of the last observed content rectangle.
       *
       * @returns {DOMRectInit} Last observed content rectangle.
       */
      ResizeObservation.prototype.broadcastRect = function () {
          var rect = this.contentRect_;
          this.broadcastWidth = rect.width;
          this.broadcastHeight = rect.height;
          return rect;
      };
      return ResizeObservation;
  }());

  var ResizeObserverEntry = /** @class */ (function () {
      /**
       * Creates an instance of ResizeObserverEntry.
       *
       * @param {Element} target - Element that is being observed.
       * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
       */
      function ResizeObserverEntry(target, rectInit) {
          var contentRect = createReadOnlyRect(rectInit);
          // According to the specification following properties are not writable
          // and are also not enumerable in the native implementation.
          //
          // Property accessors are not being used as they'd require to define a
          // private WeakMap storage which may cause memory leaks in browsers that
          // don't support this type of collections.
          defineConfigurable(this, { target: target, contentRect: contentRect });
      }
      return ResizeObserverEntry;
  }());

  var ResizeObserverSPI = /** @class */ (function () {
      /**
       * Creates a new instance of ResizeObserver.
       *
       * @param {ResizeObserverCallback} callback - Callback function that is invoked
       *      when one of the observed elements changes it's content dimensions.
       * @param {ResizeObserverController} controller - Controller instance which
       *      is responsible for the updates of observer.
       * @param {ResizeObserver} callbackCtx - Reference to the public
       *      ResizeObserver instance which will be passed to callback function.
       */
      function ResizeObserverSPI(callback, controller, callbackCtx) {
          /**
           * Collection of resize observations that have detected changes in dimensions
           * of elements.
           *
           * @private {Array<ResizeObservation>}
           */
          this.activeObservations_ = [];
          /**
           * Registry of the ResizeObservation instances.
           *
           * @private {Map<Element, ResizeObservation>}
           */
          this.observations_ = new MapShim();
          if (typeof callback !== 'function') {
              throw new TypeError('The callback provided as parameter 1 is not a function.');
          }
          this.callback_ = callback;
          this.controller_ = controller;
          this.callbackCtx_ = callbackCtx;
      }
      /**
       * Starts observing provided element.
       *
       * @param {Element} target - Element to be observed.
       * @returns {void}
       */
      ResizeObserverSPI.prototype.observe = function (target) {
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          // Do nothing if current environment doesn't have the Element interface.
          if (typeof Element === 'undefined' || !(Element instanceof Object)) {
              return;
          }
          if (!(target instanceof getWindowOf(target).Element)) {
              throw new TypeError('parameter 1 is not of type "Element".');
          }
          var observations = this.observations_;
          // Do nothing if element is already being observed.
          if (observations.has(target)) {
              return;
          }
          observations.set(target, new ResizeObservation(target));
          this.controller_.addObserver(this);
          // Force the update of observations.
          this.controller_.refresh();
      };
      /**
       * Stops observing provided element.
       *
       * @param {Element} target - Element to stop observing.
       * @returns {void}
       */
      ResizeObserverSPI.prototype.unobserve = function (target) {
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          // Do nothing if current environment doesn't have the Element interface.
          if (typeof Element === 'undefined' || !(Element instanceof Object)) {
              return;
          }
          if (!(target instanceof getWindowOf(target).Element)) {
              throw new TypeError('parameter 1 is not of type "Element".');
          }
          var observations = this.observations_;
          // Do nothing if element is not being observed.
          if (!observations.has(target)) {
              return;
          }
          observations.delete(target);
          if (!observations.size) {
              this.controller_.removeObserver(this);
          }
      };
      /**
       * Stops observing all elements.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.disconnect = function () {
          this.clearActive();
          this.observations_.clear();
          this.controller_.removeObserver(this);
      };
      /**
       * Collects observation instances the associated element of which has changed
       * it's content rectangle.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.gatherActive = function () {
          var _this = this;
          this.clearActive();
          this.observations_.forEach(function (observation) {
              if (observation.isActive()) {
                  _this.activeObservations_.push(observation);
              }
          });
      };
      /**
       * Invokes initial callback function with a list of ResizeObserverEntry
       * instances collected from active resize observations.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.broadcastActive = function () {
          // Do nothing if observer doesn't have active observations.
          if (!this.hasActive()) {
              return;
          }
          var ctx = this.callbackCtx_;
          // Create ResizeObserverEntry instance for every active observation.
          var entries = this.activeObservations_.map(function (observation) {
              return new ResizeObserverEntry(observation.target, observation.broadcastRect());
          });
          this.callback_.call(ctx, entries, ctx);
          this.clearActive();
      };
      /**
       * Clears the collection of active observations.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.clearActive = function () {
          this.activeObservations_.splice(0);
      };
      /**
       * Tells whether observer has active observations.
       *
       * @returns {boolean}
       */
      ResizeObserverSPI.prototype.hasActive = function () {
          return this.activeObservations_.length > 0;
      };
      return ResizeObserverSPI;
  }());

  // Registry of internal observers. If WeakMap is not available use current shim
  // for the Map collection as it has all required methods and because WeakMap
  // can't be fully polyfilled anyway.
  var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
  /**
   * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
   * exposing only those methods and properties that are defined in the spec.
   */
  var ResizeObserver = /** @class */ (function () {
      /**
       * Creates a new instance of ResizeObserver.
       *
       * @param {ResizeObserverCallback} callback - Callback that is invoked when
       *      dimensions of the observed elements change.
       */
      function ResizeObserver(callback) {
          if (!(this instanceof ResizeObserver)) {
              throw new TypeError('Cannot call a class as a function.');
          }
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          var controller = ResizeObserverController.getInstance();
          var observer = new ResizeObserverSPI(callback, controller, this);
          observers.set(this, observer);
      }
      return ResizeObserver;
  }());
  // Expose public methods of ResizeObserver.
  [
      'observe',
      'unobserve',
      'disconnect'
  ].forEach(function (method) {
      ResizeObserver.prototype[method] = function () {
          var _a;
          return (_a = observers.get(this))[method].apply(_a, arguments);
      };
  });

  var index = (function () {
      // Export existing implementation if available.
      if (typeof global$1.ResizeObserver !== 'undefined') {
          return global$1.ResizeObserver;
      }
      return ResizeObserver;
  })();

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

  var _css = ':host {  overflow: hidden;  display: block;  position: relative;  height: 100%;  width: 100%;  box-sizing: border-box; }  :host * {    box-sizing: border-box; }  :host button {    background-color: transparent;    border: none;    cursor: pointer;    outline: none;    padding: 0;    -webkit-appearance: none;       -moz-appearance: none;            appearance: none;    vertical-align: top; }  :host .bar-area {    position: absolute;    width: 8px;    height: 100%;    right: 0;    background-color: rgba(0, 0, 0, 0.6); }    :host .bar-area .bar-area-padding {      height: 100%;      border: 2px solid transparent; }      :host .bar-area .bar-area-padding .bar-area-padding-inner {        height: 100%; }        :host .bar-area .bar-area-padding .bar-area-padding-inner .btn-wrap {          font-size: 0;          vertical-align: bottom; }          :host .bar-area .bar-area-padding .bar-area-padding-inner .btn-wrap .btn {            width: 100%;            height: 100%;            background-color: white; }            :host .bar-area .bar-area-padding .bar-area-padding-inner .btn-wrap .btn:hover {              opacity: 0.7; }        :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner {          width: 100%;          max-width: 100%;          vertical-align: bottom; }          :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner .bar {            cursor: pointer;            width: 100%; }            :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner .bar .bar-thum {              height: 100%;              font-size: 0; }              :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner .bar .bar-thum .bar-btn {                width: 100%;                max-height: 100%;                height: 30%;                background-color: white; }                :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner .bar .bar-thum .bar-btn:hover {                  opacity: 0.7; }  :host .view {    overflow: auto;    width: 100%;    height: 100%;    scrollbar-width: none;    -ms-overflow-style: none; }    :host .view::-webkit-scrollbar {      display: none; }    :host .view.select-none {      -webkit-user-select: none;         -moz-user-select: none;          -ms-user-select: none;              user-select: none;      pointer-events: none; }';

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
        }); // mouse scroll

        var timer;

        this.mouseScrollingFunc = function () {
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

        this.view.addEventListener('scroll', this.mouseScrollingFunc, {
          passive: true
        }); // to edge

        this.scrollToEdgeFunc = function (e) {
          var btn = e.currentTarget;
          if (Array.from(btn.classList).includes('main-btn')) return false;
          var dir = Array.from(btn.classList).includes('up');
          if (dir) _this2.goTo(0, 300);else _this2.goTo(1, 300);
        };

        this.shadowRoot.querySelectorAll('.bar-btn').forEach(function (elem) {
          elem.addEventListener('click', _this2.scrollToEdgeFunc);
        }); // reiseze

        var resize = function resize() {
          _this2.redraw(0);
        };

        this.resizeOb = new index(resize);
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
        this.resizeOb.disconnect(this);
        this.shadowRoot.querySelectorAll('.bar-btn').forEach(function (elem) {
          elem.removeEventListener('click', _this3.scrollToEdgeFunc);
        });
        this.view.removeEventListener('scroll', this.mouseScrollingFunc, {
          passive: true
        });
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
