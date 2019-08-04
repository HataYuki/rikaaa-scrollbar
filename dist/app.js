/**
 * @license
 * rikaaa-scrollbar.js
 *
 * Generated : 2019-08-05
 * Version : 1.1.0
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

    var ready = (function (fn) {
      if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        setTimeout(function () {
          fn();
        }, 0);
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    });

    ready(function () {
      var wp = document.querySelector('.wp'),
          article = document.querySelector('article'),
          header = document.querySelector('header'),
          wp_inner = document.querySelector('.wp-inner'),
          fit = function fit() {
        wp.style.width = window.innerWidth + 'px';
        wp.style.height = window.innerHeight + 'px';
        article.style.height = wp_inner.offsetHeight - header.offsetHeight + 'px';
      };

      window.addEventListener('resize', fit);
      fit();
      var scrollbar = document.getElementById('scrollbar');
      scrollbar.addEventListener('load', function () {
        console.log('load');
        scrollbar.navi([{
          name: "demo",
          id: "demo"
        }, {
          name: "issue",
          id: "issue"
        }, {
          name: "installation",
          id: "installation"
        }, {
          name: "usage",
          id: "usage"
        }, {
          name: "events",
          id: "events"
        }, {
          name: "getters",
          id: "getters"
        }, {
          name: "methods",
          id: "methods"
        }, {
          name: "attributes",
          id: "attributes"
        }]);
      }); // const demo1 = document.getElementById('demo1');
      // const demo1Parent = demo1.parentNode;
      // demo1Parent.removeChild(demo1);
    });

}());
