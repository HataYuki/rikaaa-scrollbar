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
      var main = document.getElementById('main');
      main.addEventListener('load', function () {
        console.log('load');
        main.navi([{
          name: "page top",
          id: "t1"
        }, {
          name: "Issue",
          id: "t2"
        }, {
          name: "Installation",
          id: "t3"
        }, {
          name: "Usage",
          id: "t4"
        }, {
          name: "Attribute",
          id: "t5"
        }]);
      }); // const demo1 = document.getElementById('demo1');
      // const demo1Parent = demo1.parentNode;
      // demo1Parent.removeChild(demo1);
    });

}());
