/*! @license Firebase v4.1.0
Build: rev-d3e3a6f
Terms: https://firebase.google.com/terms/ */

var firebase=function(){var e=void 0===e?self:e;return function(t){function n(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var r=e.webpackJsonp;e.webpackJsonp=function(e,o,a){for(var c,s,u,f=0,l=[];f<e.length;f++)s=e[f],i[s]&&l.push(i[s][0]),i[s]=0;for(c in o)Object.prototype.hasOwnProperty.call(o,c)&&(t[c]=o[c]);for(r&&r(e,o,a);l.length;)l.shift()();if(a)for(f=0;f<a.length;f++)u=n(n.s=a[f]);return u};var o={},i={2:0};return n.e=function(e){function t(){a.onerror=a.onload=null,clearTimeout(c);var t=i[e];0!==t&&(t&&t[1](new Error("Loading chunk "+e+" failed.")),i[e]=void 0)}if(0===i[e])return Promise.resolve();if(i[e])return i[e][2];var r=new Promise(function(t,n){i[e]=[t,n]});i[e][2]=r;var o=document.getElementsByTagName("head")[0],a=document.createElement("script");a.type="text/javascript",a.charset="utf-8",a.async=!0,a.timeout=12e4,n.nc&&a.setAttribute("nonce",n.nc),a.src=n.p+""+e+".js";var c=setTimeout(t,12e4);return a.onerror=a.onload=t,o.appendChild(a),r},n.m=t,n.c=o,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n.oe=function(e){throw console.error(e),e},n(n.s=4)}({10:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var r=void 0;if(void 0!==e)r=e;else if("undefined"!=typeof self)r=self;else try{r=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var o=r.Promise||n(52);t.local={Promise:o,GoogPromise:o}}).call(t,n(26))},17:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){var n=new p(e,t);return n.subscribe.bind(n)}function i(e,t){return function(){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];l.resolve(!0).then(function(){e.apply(void 0,r)}).catch(function(e){t&&t(e)})}}function a(e,t){if("object"!==(void 0===e?"undefined":s(e))||null===e)return!1;var n=!0,r=!1,o=void 0;try{for(var i,a=t[Symbol.iterator]();!(n=(i=a.next()).done);n=!0){var c=i.value;if(c in e&&"function"==typeof e[c])return!0}}catch(e){r=!0,o=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw o}}return!1}function c(){}Object.defineProperty(t,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.createSubscribe=o,t.async=i;var f=n(10),l=f.local.Promise,p=function(){function e(t,n){var o=this;r(this,e),this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=l.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(function(){t(o)}).catch(function(e){o.error(e)})}return u(e,[{key:"next",value:function(e){this.forEachObserver(function(t){t.next(e)})}},{key:"error",value:function(e){this.forEachObserver(function(t){t.error(e)}),this.close(e)}},{key:"complete",value:function(){this.forEachObserver(function(e){e.complete()}),this.close()}},{key:"subscribe",value:function(e,t,n){var r=this,o=void 0;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");o=a(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===o.next&&(o.next=c),void 0===o.error&&(o.error=c),void 0===o.complete&&(o.complete=c);var i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(function(){try{r.finalError?o.error(r.finalError):o.complete()}catch(e){}}),this.observers.push(o),i}},{key:"unsubscribeOne",value:function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}},{key:"forEachObserver",value:function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)}},{key:"sendOne",value:function(e,t){var n=this;this.task.then(function(){if(void 0!==n.observers&&void 0!==n.observers[e])try{t(n.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}},{key:"close",value:function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(function(){t.observers=void 0,t.onNoObservers=void 0}))}}]),e}()},26:function(t,n){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof e&&(r=e)}t.exports=r},27:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){function e(e){e=e||p;var t=a[e];return void 0===t&&i("no-app",{name:e}),t}function t(){return Object.keys(a).map(function(e){return a[e]})}function n(e,t){Object.keys(d).forEach(function(n){var o=r(e,n);null!==o&&v[o]&&v[o](t,e)})}function r(e,t){return"serverAuth"===t?null:(e.options,t)}var a={},d={},v={},m={__esModule:!0,initializeApp:function(e,t){void 0===t?t=p:"string"==typeof t&&""!==t||i("bad-app-name",{name:t+""}),void 0!==a[t]&&i("duplicate-app",{name:t});var r=new h(e,t,m);return a[t]=r,n(r,"create"),r},app:e,apps:null,Promise:l,SDK_VERSION:"4.1.0",INTERNAL:{registerService:function(n,r,o,a,c){d[n]&&i("duplicate-service",{name:n}),d[n]=r,a&&(v[n]=a,t().forEach(function(e){a("create",e)}));var s=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e();return"function"!=typeof t[n]&&i("invalid-app-argument",{name:n}),t[n]()};return void 0!==o&&(0,f.deepExtend)(s,o),m[n]=s,h.prototype[n]=function(){for(var e=this._getService.bind(this,n),t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return e.apply(this,c?r:[])},s},createFirebaseNamespace:o,extendNamespace:function(e){(0,f.deepExtend)(m,e)},createSubscribe:c.createSubscribe,ErrorFactory:s.ErrorFactory,removeApp:function(e){n(a[e],"delete"),delete a[e]},factories:d,useAsService:r,Promise:u.local.GoogPromise,deepExtend:f.deepExtend}};return(0,f.patchProperty)(m,"default",m),Object.defineProperty(m,"apps",{get:t}),(0,f.patchProperty)(e,"App",h),m}function i(e,t){throw m.create(e,t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.createFirebaseNamespace=o;var c=n(17),s=n(9),u=n(10),f=n(32),l=u.local.Promise,p="[DEFAULT]",d=[],h=function(){function e(t,n,o){r(this,e),this.firebase_=o,this.isDeleted_=!1,this.services_={},this.name_=n,this.options_=(0,f.deepCopy)(t)}return a(e,[{key:"delete",value:function(){var e=this;return new l(function(t){e.checkDestroyed_(),t()}).then(function(){e.firebase_.INTERNAL.removeApp(e.name_);var t=[];return Object.keys(e.services_).forEach(function(n){Object.keys(e.services_[n]).forEach(function(r){t.push(e.services_[n][r])})}),l.all(t.map(function(e){return e.INTERNAL.delete()}))}).then(function(){e.isDeleted_=!0,e.services_={}})}},{key:"_getService",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:p;if(this.checkDestroyed_(),this.services_[e]||(this.services_[e]={}),!this.services_[e][t]){var n=this.firebase_.INTERNAL.factories[e](this,this.extendApp.bind(this),t);this.services_[e][t]=n}return this.services_[e][t]}},{key:"extendApp",value:function(t){var n=this;(0,f.deepExtend)(e.prototype,t),t.INTERNAL&&t.INTERNAL.addAuthTokenListener&&(d.forEach(function(e){n.INTERNAL.addAuthTokenListener(e)}),d=[])}},{key:"checkDestroyed_",value:function(){this.isDeleted_&&i("app-deleted",{name:this.name_})}},{key:"name",get:function(){return this.checkDestroyed_(),this.name_}},{key:"options",get:function(){return this.checkDestroyed_(),this.options_}}]),e}();h.prototype.INTERNAL={getUid:function(){return null},getToken:function(){return l.resolve(null)},addAuthTokenListener:function(e){d.push(e),setTimeout(function(){return e(null)},0)},removeAuthTokenListener:function(e){d=d.filter(function(t){return t!==e})}},h.prototype.name&&h.prototype.options||h.prototype.delete||console.log("dc");var v={"no-app":"No Firebase App '{$name}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$name}","duplicate-app":"Firebase App named '{$name}' already exists","app-deleted":"Firebase App named '{$name}' already deleted","duplicate-service":"Firebase service named '{$name}' already registered","sa-not-supported":"Initializing the Firebase SDK with a service account is only allowed in a Node.js environment. On client devices, you should instead initialize the SDK with an api key and auth domain","invalid-app-argument":"firebase.{$name}() takes either no argument or a Firebase App instance."},m=new s.ErrorFactory("app","Firebase",v)},32:function(e,t,n){"use strict";function r(e){return o(void 0,e)}function o(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(var n in t)t.hasOwnProperty(n)&&(e[n]=o(e[n],t[n]));return e}function i(e,t,n){e[t]=n}Object.defineProperty(t,"__esModule",{value:!0}),t.deepCopy=r,t.deepExtend=o,t.patchProperty=i},4:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(27),o=(0,r.createFirebaseNamespace)();t.default=o,e.exports=t.default},51:function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(f===setTimeout)return setTimeout(e,0);if((f===n||!f)&&setTimeout)return f=setTimeout,setTimeout(e,0);try{return f(e,0)}catch(t){try{return f.call(null,e,0)}catch(t){return f.call(this,e,0)}}}function i(e){if(l===clearTimeout)return clearTimeout(e);if((l===r||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(e);try{return l(e)}catch(t){try{return l.call(null,e)}catch(t){return l.call(this,e)}}}function a(){v&&d&&(v=!1,d.length?h=d.concat(h):m=-1,h.length&&c())}function c(){if(!v){var e=o(a);v=!0;for(var t=h.length;t;){for(d=h,h=[];++m<t;)d&&d[m].run();m=-1,t=h.length}d=null,v=!1,i(e)}}function s(e,t){this.fun=e,this.array=t}function u(){}var f,l,p=e.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:n}catch(e){f=n}try{l="function"==typeof clearTimeout?clearTimeout:r}catch(e){l=r}}();var d,h=[],v=!1,m=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new s(e,t)),1!==h.length||v||o(c)},s.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=u,p.addListener=u,p.once=u,p.off=u,p.removeListener=u,p.removeAllListeners=u,p.emit=u,p.prependListener=u,p.prependOnceListener=u,p.listeners=function(e){return[]},p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},52:function(e,t,n){(function(t){!function(n){function r(){}function o(e,t){return function(){e.apply(t,arguments)}}function i(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function a(e,t){for(;3===e._state;)e=e._value;if(0===e._state)return void e._deferreds.push(t);e._handled=!0,i._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null===n)return void(1===e._state?c:s)(t.promise,e._value);var r;try{r=n(e._value)}catch(e){return void s(t.promise,e)}c(t.promise,r)})}function c(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof i)return e._state=3,e._value=t,void u(e);if("function"==typeof n)return void l(o(n,t),e)}e._state=1,e._value=t,u(e)}catch(t){s(e,t)}}function s(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null}function f(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,c(t,e))},function(e){n||(n=!0,s(t,e))})}catch(e){if(n)return;n=!0,s(t,e)}}var p=setTimeout;i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(r);return a(this,new f(e,t,n)),n},i.all=function(e){var t=Array.prototype.slice.call(e);return new i(function(e,n){function r(i,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var c=a.then;if("function"==typeof c)return void c.call(a,function(e){r(i,e)},n)}t[i]=a,0==--o&&e(t)}catch(e){n(e)}}if(0===t.length)return e([]);for(var o=t.length,i=0;i<t.length;i++)r(i,t[i])})},i.resolve=function(e){return e&&"object"==typeof e&&e.constructor===i?e:new i(function(t){t(e)})},i.reject=function(e){return new i(function(t,n){n(e)})},i.race=function(e){return new i(function(t,n){for(var r=0,o=e.length;r<o;r++)e[r].then(t,n)})},i._immediateFn="function"==typeof t&&function(e){t(e)}||function(e){p(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},i._setImmediateFn=function(e){i._immediateFn=e},i._setUnhandledRejectionFn=function(e){i._unhandledRejectionFn=e},void 0!==e&&e.exports?e.exports=i:n.Promise||(n.Promise=i)}(this)}).call(t,n(54).setImmediate)},53:function(e,t,n){(function(e,t){!function(e,n){"use strict";function r(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var r={callback:e,args:t};return u[s]=r,c(s),s++}function o(e){delete u[e]}function i(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}function a(e){if(f)setTimeout(a,0,e);else{var t=u[e];if(t){f=!0;try{i(t)}finally{o(e),f=!1}}}}if(!e.setImmediate){var c,s=1,u={},f=!1,l=e.document,p=Object.getPrototypeOf&&Object.getPrototypeOf(e);p=p&&p.setTimeout?p:e,"[object process]"==={}.toString.call(e.process)?function(){c=function(e){t.nextTick(function(){a(e)})}}():function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?function(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"==typeof n.data&&0===n.data.indexOf(t)&&a(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),c=function(n){e.postMessage(t+n,"*")}}():e.MessageChannel?function(){var e=new MessageChannel;e.port1.onmessage=function(e){a(e.data)},c=function(t){e.port2.postMessage(t)}}():l&&"onreadystatechange"in l.createElement("script")?function(){var e=l.documentElement;c=function(t){var n=l.createElement("script");n.onreadystatechange=function(){a(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}():function(){c=function(e){setTimeout(a,0,e)}}(),p.setImmediate=r,p.clearImmediate=o}}("undefined"==typeof self?void 0===e?this:e:self)}).call(t,n(26),n(51))},54:function(t,n,r){function o(e,t){this._id=e,this._clearFn=t}var i=Function.prototype.apply;n.setTimeout=function(){return new o(i.call(setTimeout,e,arguments),clearTimeout)},n.setInterval=function(){return new o(i.call(setInterval,e,arguments),clearInterval)},n.clearTimeout=n.clearInterval=function(e){e&&e.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(e,this._id)},n.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},n.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},n._unrefActive=n.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},r(53),n.setImmediate=setImmediate,n.clearImmediate=clearImmediate},9:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e){var t=a;return a=e,t}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.patchCapture=o;var a=Error.captureStackTrace,c=t.FirebaseError=function e(t,n){if(r(this,e),this.code=t,this.message=n,a)a(this,s.prototype.create);else{var o=Error.apply(this,arguments);this.name="FirebaseError",Object.defineProperty(this,"stack",{get:function(){return o.stack}})}};c.prototype=Object.create(Error.prototype),c.prototype.constructor=c,c.prototype.name="FirebaseError";var s=t.ErrorFactory=function(){function e(t,n,o){r(this,e),this.service=t,this.serviceName=n,this.errors=o,this.pattern=/\{\$([^}]+)}/g}return i(e,[{key:"create",value:function(e,t){void 0===t&&(t={});var n=this.errors[e],r=this.service+"/"+e,o=void 0;o=void 0===n?"Error":n.replace(this.pattern,function(e,n){var r=t[n];return void 0!==r?r.toString():"<"+n+"?>"}),o=this.serviceName+": "+o+" ("+r+").";var i=new c(r,o);for(var a in t)t.hasOwnProperty(a)&&"_"!==a.slice(-1)&&(i[a]=t[a]);return i}}]),e}()}})}();
//# sourceMappingURL=firebase-app.js.map