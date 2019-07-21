!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function o(t,e,n){return(o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&i(o,n.prototype),o}).apply(null,arguments)}function a(t){var e="function"==typeof Map?new Map:void 0;return(a=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,a)}function a(){return o(t,arguments,r(this).constructor)}return a.prototype=Object.create(t.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),i(a,t)})(t)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}Array.prototype.includes||(Array.prototype.includes=function(t){if(null==this)throw new TypeError("Array.prototype.includes called on null or undefined");var e=Object(this),n=parseInt(e.length,10)||0;if(0===n)return!1;var r,i,o=parseInt(arguments[1],10)||0;for(0<=o?r=o:(r=n+o)<0&&(r=0);r<n;){if(t===(i=e[r])||t!=t&&i!=i)return!0;r++}return!1});var c=function(t,e,n){return Math.max(e,Math.min(n,t))},u=function(){function e(n,r){t(this,e),this._type=n||"linear",this._t=0,this._d=r}return n(e,[{key:"Convarsion",value:function(t){return t>=1?1:t}},{key:"ease_in",value:function(){return this._t*this._t}},{key:"ease_out",value:function(){return this._t*(2-this._t)}},{key:"ease_in_out",value:function(){return this._t<.5?2*this._t*this._t:(4-2*this._t)*this._t-1}},{key:"linear",value:function(){return this._t}},{key:"Start",value:function(t){this._now=performance.now();var e=this;return requestAnimationFrame(function n(r){e.requ=requestAnimationFrame(n);e._t=e.Convarsion((r-e._now)/e._d);switch(e._type.replace(/-/g,"_")){case"linear":t(e.linear());break;case"ease_in":t(e.ease_in());break;case"ease_out":t(e.ease_out());break;case"ease_in_out":t(e.ease_in_out())}e._t>=1&&(cancelAnimationFrame(e.requ),"function"==typeof e._endFunc&&e._endFunc())}),this}},{key:"End",value:function(t){this._endFunc=t}},{key:"Stop",value:function(t){cancelAnimationFrame(this.requ),"function"==typeof t&&t()}},{key:"duration",set:function(t){this._d=t},get:function(){return this._d}},{key:"type",set:function(t){this._type=t}}]),e}(),h=function(){if("undefined"!=typeof Map)return Map;function t(t,e){var n=-1;return t.some(function(t,r){return t[0]===e&&(n=r,!0)}),n}return function(){function e(){this.__entries__=[]}return Object.defineProperty(e.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),e.prototype.get=function(e){var n=t(this.__entries__,e),r=this.__entries__[n];return r&&r[1]},e.prototype.set=function(e,n){var r=t(this.__entries__,e);~r?this.__entries__[r][1]=n:this.__entries__.push([e,n])},e.prototype.delete=function(e){var n=this.__entries__,r=t(n,e);~r&&n.splice(r,1)},e.prototype.has=function(e){return!!~t(this.__entries__,e)},e.prototype.clear=function(){this.__entries__.splice(0)},e.prototype.forEach=function(t,e){void 0===e&&(e=null);for(var n=0,r=this.__entries__;n<r.length;n++){var i=r[n];t.call(e,i[1],i[0])}},e}()}(),l="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,d="undefined"!=typeof global&&global.Math===Math?global:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),f="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(d):function(t){return setTimeout(function(){return t(Date.now())},1e3/60)},b=2;var v=20,p=["top","right","bottom","left","width","height","size","weight"],g="undefined"!=typeof MutationObserver,w=function(){function t(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(t,e){var n=!1,r=!1,i=0;function o(){n&&(n=!1,t()),r&&s()}function a(){f(o)}function s(){var t=Date.now();if(n){if(t-i<b)return;r=!0}else n=!0,r=!1,setTimeout(a,e);i=t}return s}(this.refresh.bind(this),v)}return t.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},t.prototype.removeObserver=function(t){var e=this.observers_,n=e.indexOf(t);~n&&e.splice(n,1),!e.length&&this.connected_&&this.disconnect_()},t.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},t.prototype.updateObservers_=function(){var t=this.observers_.filter(function(t){return t.gatherActive(),t.hasActive()});return t.forEach(function(t){return t.broadcastActive()}),t.length>0},t.prototype.connect_=function(){l&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),g?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},t.prototype.disconnect_=function(){l&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},t.prototype.onTransitionEnd_=function(t){var e=t.propertyName,n=void 0===e?"":e;p.some(function(t){return!!~n.indexOf(t)})&&this.refresh()},t.getInstance=function(){return this.instance_||(this.instance_=new t),this.instance_},t.instance_=null,t}(),y=function(t,e){for(var n=0,r=Object.keys(e);n<r.length;n++){var i=r[n];Object.defineProperty(t,i,{value:e[i],enumerable:!1,writable:!1,configurable:!0})}return t},m=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||d},_=R(0,0,0,0);function E(t){return parseFloat(t)||0}function S(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return e.reduce(function(e,n){return e+E(t["border-"+n+"-width"])},0)}function O(t){var e=t.clientWidth,n=t.clientHeight;if(!e&&!n)return _;var r=m(t).getComputedStyle(t),i=function(t){for(var e={},n=0,r=["top","right","bottom","left"];n<r.length;n++){var i=r[n],o=t["padding-"+i];e[i]=E(o)}return e}(r),o=i.left+i.right,a=i.top+i.bottom,s=E(r.width),c=E(r.height);if("border-box"===r.boxSizing&&(Math.round(s+o)!==e&&(s-=S(r,"left","right")+o),Math.round(c+a)!==n&&(c-=S(r,"top","bottom")+a)),!function(t){return t===m(t).document.documentElement}(t)){var u=Math.round(s+o)-e,h=Math.round(c+a)-n;1!==Math.abs(u)&&(s-=u),1!==Math.abs(h)&&(c-=h)}return R(i.left,i.top,s,c)}var k="undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof m(t).SVGGraphicsElement}:function(t){return t instanceof m(t).SVGElement&&"function"==typeof t.getBBox};function T(t){return l?k(t)?function(t){var e=t.getBBox();return R(0,0,e.width,e.height)}(t):O(t):_}function R(t,e,n,r){return{x:t,y:e,width:n,height:r}}var A=function(){function t(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=R(0,0,0,0),this.target=t}return t.prototype.isActive=function(){var t=T(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},t.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},t}(),L=function(){return function(t,e){var n,r,i,o,a,s,c,u=(r=(n=e).x,i=n.y,o=n.width,a=n.height,s="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,c=Object.create(s.prototype),y(c,{x:r,y:i,width:o,height:a,top:i,right:r+o,bottom:a+i,left:r}),c);y(this,{target:t,contentRect:u})}}(),x=function(){function t(t,e,n){if(this.activeObservations_=[],this.observations_=new h,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=e,this.callbackCtx_=n}return t.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof m(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new A(t)),this.controller_.addObserver(this),this.controller_.refresh())}},t.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof m(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e.delete(t),e.size||this.controller_.removeObserver(this))}},t.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},t.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(e){e.isActive()&&t.activeObservations_.push(e)})},t.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map(function(t){return new L(t.target,t.broadcastRect())});this.callback_.call(t,e,t),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t}(),F="undefined"!=typeof WeakMap?new WeakMap:new h,B=function(){return function t(e){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=w.getInstance(),r=new x(e,n,this);F.set(this,r)}}();["observe","unobserve","disconnect"].forEach(function(t){B.prototype[t]=function(){var e;return(e=F.get(this))[t].apply(e,arguments)}});var q=void 0!==d.ResizeObserver?d.ResizeObserver:B,C=function(t){var e,n=!0;return function(){return n?(e=t.apply(this,arguments),n=!1,e):(t=null,!1)}},M="<style>".concat(":host {  overflow: hidden;  display: block;  position: relative;  height: 100%;  width: 100%;  box-sizing: border-box; }  :host * {    box-sizing: border-box; }  :host button {    background-color: transparent;    border: none;    cursor: pointer;    outline: none;    padding: 0;    -webkit-appearance: none;       -moz-appearance: none;            appearance: none;    vertical-align: top; }  :host .bar-area {    position: absolute;    width: 8px;    height: 100%;    right: 0;    background-color: rgba(0, 0, 0, 0.6); }    :host .bar-area .bar-area-padding {      height: 100%;      border: 2px solid transparent; }      :host .bar-area .bar-area-padding .bar-area-padding-inner {        height: 100%; }        :host .bar-area .bar-area-padding .bar-area-padding-inner .btn-wrap {          font-size: 0;          vertical-align: bottom; }          :host .bar-area .bar-area-padding .bar-area-padding-inner .btn-wrap .btn {            width: 100%;            height: 100%;            background-color: white; }            :host .bar-area .bar-area-padding .bar-area-padding-inner .btn-wrap .btn:hover {              opacity: 0.7; }        :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner {          width: 100%;          max-width: 100%;          vertical-align: bottom; }          :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner .bar {            cursor: pointer;            width: 100%; }            :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner .bar .bar-thum {              height: 100%;              font-size: 0; }              :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner .bar .bar-thum .bar-btn {                width: 100%;                max-height: 100%;                height: 30%;                background-color: white; }                :host .bar-area .bar-area-padding .bar-area-padding-inner .bar-contaner .bar .bar-thum .bar-btn:hover {                  opacity: 0.7; }  :host .view {    overflow: auto;    width: 100%;    height: 100%;    scrollbar-width: none;    -ms-overflow-style: none; }    :host .view::-webkit-scrollbar {      display: none; }    :host .view.select-none {      -webkit-user-select: none;         -moz-user-select: none;          -ms-user-select: none;              user-select: none;      pointer-events: none; }","</style>"),H="\n    ".concat(M,'\n    <div class="bar-area">\n        <div class="bar-area-padding">\n            <div class="bar-area-padding-inner">\n                <div class="btn-wrap"><button class="btn edge-top"></button></div>\n                <div class="bar-contaner">\n                    <div class="bar">\n                        <div class="bar-thum">\n                            <button class="bar-btn up"></button>\n                            <button class="bar-btn main-btn"></button>\n                            <button class="bar-btn down"></button>\n                        </div>\n                    </div>\n                </div>\n                <div class="btn-wrap"><button class="btn edge-bottom"></button></div>\n            </div>\n        </div>\n    </div>\n    <div class="view">\n        <div class="view-inner">\n            <slot class="contents"></slot>\n        </div>\n    </div>\n'),j=document.createElement("template");j.id="rikaaascrollbar",j.innerHTML=H,window.ShadyCSS&&ShadyCSS.prepareTemplate(j,"rikaaa-scrollbar");var D=function(e){function o(){var e,n,i;return t(this,o),n=this,e=!(i=r(o).call(this))||"object"!=typeof i&&"function"!=typeof i?s(n):i,window.ShadyCSS&&ShadyCSS.styleElement(s(e)),e.attachShadow({mode:"open"}),e.shadowRoot.appendChild(j.content.cloneNode(!0)),e.btnH=10,e.btnSeparation=2,e.barAreaMaxW=14,e.barAreaMinW=8,e.barEdgeBtnH=5,e.barBtnSeparation=2,e.allowToEdgeBtn=!1,e.allowToBarBtn=!1,e.hide=!0,e.navigation=!0,e.naviData=null,e.currentIndex=0,e.barOpend=!1,e.barSliding=!1,e.scrolling=!1,e.view=e.shadowRoot.querySelector(".view"),e}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(o,a(HTMLElement)),n(o,[{key:"connectedCallback",value:function(){var t,e,n,r=this;this.autohide&&(e=C(function(){return r.barShow(200)})),this.mouseScrollingFunc=function(){r.barPos=r.scrollRatio,r.autohide&&e(),t=C(function(){return r.barHide(200)}),r.scrolling=!0,r.autohide&&(clearTimeout(n),n=setTimeout(function(){r.scrolling=!1,r.barOpend||r.barSliding||(t(),e=C(function(){return r.barShow(200)}))},3e3))},this.view.addEventListener("scroll",this.mouseScrollingFunc,{passive:!0}),this.scrollToEdgeFunc=function(t){var e=t.currentTarget;if(Array.from(e.classList).includes("main-btn"))return!1;Array.from(e.classList).includes("up")?r.goTo(0,300):r.goTo(1,300)},this.shadowRoot.querySelectorAll(".bar-btn").forEach(function(t){t.addEventListener("click",r.scrollToEdgeFunc)});var i,o,a;this.resizeOb=new q(function(){r.redraw(0)}),this.resizeOb.observe(this),this.barContanerClickFunc=function(t){if(!Array.from(t.target.classList).includes("bar-contaner"))return!1;var e=(t.pageY-t.currentTarget.getBoundingClientRect().top)/r.barContanerH;r.goTo(e,200)},this.shadowRoot.querySelector(".bar-contaner").addEventListener("click",this.barContanerClickFunc);var s,c,u=function(t){var e=(t.pageY-i)/(r.barContanerH-r.barHeight);r.goTo(o+e,0)};this.attachslideFunc=function(t){window.addEventListener("mousemove",u),window.addEventListener("touchmove",u),i=t.pageY,o=r.scrollRatio,r.view.classList.add("select-none"),r.barSliding=!0},this.releaseslideFunc=function(){window.removeEventListener("mousemove",u),window.removeEventListener("touchmove",u),r.view.classList.remove("select-none"),r.barSliding=!1,r.autohide&&(clearTimeout(a),a=setTimeout(function(){r.barOpend||r.scrolling||"function"!=typeof t||(t(),e=C(function(){return r.barShow(200)}))},3e3))},this.shadowRoot.querySelector(".main-btn").addEventListener("mousedown",this.attachslideFunc),this.shadowRoot.querySelector(".main-btn").addEventListener("touchstart",this.attachslideFunc),window.addEventListener("mouseup",this.releaseslideFunc),window.addEventListener("touchend",this.releaseslideFunc),window.addEventListener("mouseleave",this.releaseslideFunc),window.addEventListener("touchleave",this.releaseslideFunc),this.barOpenFunc=function(){r.allowToEdgeBtn=!0,r.allowToBarBtn=!0,r.redraw(100),r.barAreaW(r.maxwidth,100,"ease-out"),r.barOpend=!0},this.barCloseFunc=function(){r.allowToEdgeBtn=!1,r.allowToBarBtn=!1,r.redraw(80),r.barAreaW(r.minwidth,80,"ease-out"),r.barOpend=!1,r.autohide&&(clearTimeout(s),s=setTimeout(function(){r.barSliding||r.scrolling||(t(),e=C(function(){return r.barShow(200)}))},3e3))},this.shadowRoot.querySelector(".bar-area").addEventListener("mouseenter",this.barOpenFunc),this.shadowRoot.querySelector(".bar-area").addEventListener("mouseleave",this.barCloseFunc),this.naviFunc=function(t){var e=!Array.from(t.currentTarget.classList).includes("edge-top");r.goNavigation(e)},this.shadowRoot.querySelectorAll(".btn").forEach(function(t){t.addEventListener("click",r.naviFunc)}),c=function(){r.redraw(0),r.autohide&&r.barHide(0),r.dispatchEvent(new CustomEvent("load"))},(document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)?setTimeout(function(){c()},0):document.addEventListener("DOMContentLoaded",c)}},{key:"attributeChangedCallback",value:function(t,e,n){"minwidth"===t&&this.barAreaW(Number(n),0,"ease-in"),"usenavi"===t&&this.redraw(0)}},{key:"disconnectedCallback",value:function(){var t=this;this.shadowRoot.querySelectorAll(".btn").forEach(function(e){e.removeEventListener("click",t.naviFunc)}),this.shadowRoot.querySelector(".bar-area").removeEventListener("mouseenter",this.barOpenFunc),this.shadowRoot.querySelector(".bar-area").removeEventListener("mouseleave",this.barCloseFunc),this.shadowRoot.querySelector(".main-btn").removeEventListener("mousedown",this.attachslideFunc),this.shadowRoot.querySelector(".main-btn").removeEventListener("touchstart",this.attachslideFunc),window.removeEventListener("mouseup",this.releaseslideFunc),window.removeEventListener("touchend",this.releaseslideFunc),window.removeEventListener("mouseleave",this.releaseslideFunc),window.removeEventListener("touchleave",this.releaseslideFunc),this.shadowRoot.querySelector(".bar-contaner").removeEventListener("click",this.barContanerClickFunc),this.resizeOb.disconnect(this),this.shadowRoot.querySelectorAll(".bar-btn").forEach(function(e){e.removeEventListener("click",t.scrollToEdgeFunc)}),this.view.removeEventListener("scroll",this.mouseScrollingFunc,{passive:!0})}},{key:"setBarAreaSeparation",value:function(t,e,n){var r=this.usenavi&&null!==this.naviData?t:0,i=this.shadowRoot.querySelectorAll(".btn"),o=this.shadowRoot.querySelector(".bar-contaner"),a=this.shadowRoot.querySelector(".bar-area-padding-inner"),s=i[0].getBoundingClientRect().height,c=Number(i[0].style.marginBottom.replace(/px/g,"")),h=Number(o.style.height.replace(/px/g,"")),l=a.getBoundingClientRect().height;this.barContanerH=l-2*r;var d=function(t){Array.from(i).forEach(function(n){n.style.height="".concat(s+(r-s)*t,"px");var i=c+(e-c)*t;Array.from(n.classList).includes("edge-top")?n.style.marginBottom="".concat(i,"px"):n.style.marginTop="".concat(i,"px")}),o.style.height="".concat(h+(l-2*(r+e)-h)*t,"px")};0!==n?new u("ease-in",n).Start(function(t){return d(t)}):d(1)}},{key:"setBarH",value:function(){var t=this.shadowRoot.querySelector(".bar"),e=this.viewHeight/this.areaHeight;t.style.height="".concat(100*e,"%"),this.barHeight=this.barContanerH*e}},{key:"setBarBtnSeparation",value:function(t,e,n){var r=this.shadowRoot.querySelector(".down"),i=this.shadowRoot.querySelector(".up"),o=this.shadowRoot.querySelector(".main-btn"),a=this.shadowRoot.querySelector(".bar-thum").getBoundingClientRect().height,s=r.getBoundingClientRect().height,c=o.getBoundingClientRect().height,h=Number(r.style.marginTop.replace(/px/g,"")),l=function(n){var u=(s+(t-s)*n)/a*100,l=h+(e-h)*n;Object.assign(r.style,{height:"".concat(u,"%"),marginTop:"".concat(l,"px")}),Object.assign(i.style,{height:"".concat(u,"%"),marginBottom:"".concat(l,"px")}),o.style.height="".concat((c+(a-2*t-2*e-c)*n)/a*100,"%")};0!==n?new u("ease-in",n).Start(function(t){l(t)}):l(1)}},{key:"goTo",value:function(t,e){var n=c(t,0,1),r=this.scrollRatio,i=n-r,o=this.areaHeight-this.viewHeight,a=this.view,s=function(t){a.scrollTop=o*r+o*i*t};0!==e?new u("ease-out",e).Start(function(t){return s(t)}):s(1)}},{key:"barAreaW",value:function(t,e,n){var r=this.shadowRoot.querySelector(".bar-area");Object.assign(r.style,{transition:"width ".concat(e,"ms ").concat(n),width:"".concat(t,"px")})}},{key:"navi",value:function(t){this.naviData=t}},{key:"goNavigation",value:function(t){var e=this,n=this.naviSaggestion,r=function(t){return e.shadowRoot.querySelector(".contents").assignedNodes({flattern:!0}).filter(function(t){return t.nodeType===t.ELEMENT_NODE})[0].querySelector("#".concat(t)).offsetTop},i=this.areaHeight-this.viewHeight;t?!1!==n.next&&this.goTo(r(n.next.id)/i,300):!1!==n.prev&&this.goTo(r(n.prev.id)/i,300)}},{key:"redraw",value:function(t){this.allowToEdgeBtn?this.setBarAreaSeparation(this.btnH,this.btnSeparation,t):this.setBarAreaSeparation(0,0,t),this.setBarH(),this.allowToBarBtn?this.setBarBtnSeparation(this.barEdgeBtnH,this.barBtnSeparation,t):this.setBarBtnSeparation(0,0,t),this.viewHeight>=this.areaHeight?this.barHide(100):this.autohide||this.barShow(100)}},{key:"barOpacity",value:function(t,e){var n=c(t,0,1),r=this.shadowRoot.querySelector(".bar-area"),i=Number(r.style.opacity),o=n-i,a=function(t){var e=i+o*t;r.style.opacity=e,r.style.visibility=0===e?"hidden":""};0!==e?new u("ease-in",e).Start(function(t){return a(t)}):a(1)}},{key:"barShow",value:function(t){this.barOpacity(1,t)}},{key:"barHide",value:function(t){this.barOpacity(0,t)}},{key:"maxwidth",get:function(){var t=this.getAttribute("maxwidth");return null===t?this.barAreaMaxW:Number(t)}},{key:"minwidth",get:function(){var t=this.getAttribute("minwidth");return null===t?this.barAreaMinW:Number(t)}},{key:"usenavi",get:function(){var t=this.getAttribute("usenavi");return null===t?this.navigation:"trure"===t.toLowerCase()}},{key:"autohide",get:function(){var t=this.getAttribute("autohide");return null===t?this.hide:"true"===t.toLowerCase()}},{key:"scrollRatio",get:function(){var t=this.view.scrollTop,e=this.viewHeight,n=this.areaHeight;return c(t/(n-e),0,1)}},{key:"barPos",set:function(t){var e=this.shadowRoot.querySelector(".bar"),n=this.viewHeight,r=n/(n*(n/this.areaHeight))-1;e.style.transform="translateY(".concat(100*r*t,"%)")}},{key:"naviSaggestion",get:function(){var t=this;if(null===this.naviData)return!1;var e=this.view.scrollTop,n=this.naviData,r=n.reduce(function(n,r){var i=function(e){return t.shadowRoot.querySelector(".contents").assignedNodes({flattern:!0}).filter(function(t){return t.nodeType===t.ELEMENT_NODE})[0].querySelector("#".concat(e)).offsetTop};return Math.abs(i(r.id)-e)<Math.abs(i(n.id)-e)?r:n}),i=[n.indexOf(r)-1,n.indexOf(r),n.indexOf(r)+1].map(function(t){return!(t<0||t>n.length-1)&&t});return{prev:!1!==i[0]&&n[i[0]],near:!1!==i[1]&&n[i[1]],next:!1!==i[2]&&n[i[2]]}}},{key:"areaHeight",get:function(){return this.shadowRoot.querySelector(".view-inner").getBoundingClientRect().height}},{key:"viewHeight",get:function(){return this.getBoundingClientRect().height}}],[{key:"observedAttributes",get:function(){return["minwidth","usenavi"]}}]),o}();customElements.define("rikaaa-scrollbar",D)}();