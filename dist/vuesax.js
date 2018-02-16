(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Vuesax", [], factory);
	else if(typeof exports === 'object')
		exports["Vuesax"] = factory();
	else
		root["Vuesax"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+Rib":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("s8/V");
var global = __webpack_require__("W9uE");
var hide = __webpack_require__("KktU");
var Iterators = __webpack_require__("vbkx");
var TO_STRING_TAG = __webpack_require__("Imef")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "/Yjn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("q9/b");
var $export = __webpack_require__("SZ/P");
var redefine = __webpack_require__("36xL");
var hide = __webpack_require__("KktU");
var has = __webpack_require__("DVK/");
var Iterators = __webpack_require__("vbkx");
var $iterCreate = __webpack_require__("Lqei");
var setToStringTag = __webpack_require__("fL6e");
var getPrototypeOf = __webpack_require__("4vNa");
var ITERATOR = __webpack_require__("Imef")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "12/L":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "1tVq":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("12/L");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "2hHA":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("GJ5T");
var document = __webpack_require__("W9uE").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "36xL":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("KktU");


/***/ }),

/***/ "3Ygt":
/***/ (function(module, exports) {



/***/ }),

/***/ "4db7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("ElwZ")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("/Yjn")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "4vNa":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("DVK/");
var toObject = __webpack_require__("vNUB");
var IE_PROTO = __webpack_require__("O5S5")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "54gY":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "5xWW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "6zZR":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("W9uE");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ "7owH":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("VA2M")('observable');


/***/ }),

/***/ "9F6d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("ToFw");
var dPs = __webpack_require__("VdYW");
var enumBugKeys = __webpack_require__("9rUb");
var IE_PROTO = __webpack_require__("O5S5")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("2hHA")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("wgds").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "9rUb":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "DVK/":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "DiG7":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("OcUk"), __esModule: true };

/***/ }),

/***/ "Dqm4":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "ElwZ":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("12/L");
var defined = __webpack_require__("v41l");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "FC7b":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("QtM0");
__webpack_require__("3Ygt");
__webpack_require__("t4fa");
__webpack_require__("7owH");
module.exports = __webpack_require__("WsAY").Symbol;


/***/ }),

/***/ "Fmkg":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("DVK/");
var toIObject = __webpack_require__("buEK");
var arrayIndexOf = __webpack_require__("bt/m")(false);
var IE_PROTO = __webpack_require__("O5S5")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "GJ5T":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "HuYH":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("p25U");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "HuhR":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("WFAk");
var gOPS = __webpack_require__("rXIM");
var pIE = __webpack_require__("hOZK");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "Imef":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("6zZR")('wks');
var uid = __webpack_require__("XQtG");
var Symbol = __webpack_require__("W9uE").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "JL8o":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("12/L");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "Jh2P":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("Fmkg");
var hiddenKeys = __webpack_require__("9rUb").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./css/index.css
var css = __webpack_require__("SZiR");
var css_default = /*#__PURE__*/__webpack_require__.n(css);

// CONCATENATED MODULE: C:/Users/pc 01/Documents/vuesax/node_modules/babel-loader/lib!C:/Users/pc 01/Documents/vuesax/node_modules/vue-loader/lib/selector.js?type=script&index=0!./components/vsButton.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var vsButton = ({
  name: 'vs-button',
  props: ['vsType'],
  data: function data() {
    return {
      clasex: 'vs-button-' + this.vsType
    };
  },
  mounted: function mounted() {
    var el = this.$el;
    el.addEventListener('click', function (event) {
      // console.log(event);
      var elSpan = document.createElement("span");
      elSpan.className = 'relleno';
      el.appendChild(elSpan);
      var x = event.offsetX;
      var y = event.offsetY;
      var spanx = this.querySelector('.relleno');
      // if(!this.classList.contains('activo')){
      var time = 0.7;
      if (this.classList.contains('filled') || event.target.clientWidth > 100) {
        var s = event.target.clientWidth - 10;
        time = event.target.clientWidth / s;
      }
      // console.log(time);
      spanx.style.transition = 'width ' + time + 's ease,height ' + time + 's ease,opacity ' + time / 1.5 + 's ease';
      spanx.style.left = x + 'px';
      spanx.style.top = y + 'px';
      spanx.style.width = event.target.clientWidth * 3 + 'px';
      spanx.style.height = event.target.clientWidth * 3 + 'px';
      spanx.style.opacity = '1';
      // spanx.style.borderRadius = '0px'
      this.classList.add('activo');
      // }
      if (this.classList.contains('filled')) {
        setTimeout(function () {
          spanx.style.left = x + 'px';
          spanx.style.top = y + 'px';
          spanx.style.width = '0px';
          spanx.style.height = '0px';
          spanx.remove();
        }, time * 1000);
      }
    });
  },

  methods: {
    btnBlur: function btnBlur(evt) {
      // console.log(evt);
      if (!evt.target.classList.contains('filled')) {
        evt.target.classList.remove('activo');
        var spanx = evt.target.querySelector('.relleno');
        spanx.style.opacity = '0';
        setTimeout(function () {
          spanx.style.width = '0px';
          spanx.style.height = '0px';
          spanx.remove();
        }, 300);
      }
    }
  }
});
// CONCATENATED MODULE: C:/Users/pc 01/Documents/vuesax/node_modules/vue-loader/lib/template-compiler?{"id":"data-v-ae913800","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!C:/Users/pc 01/Documents/vuesax/node_modules/vue-loader/lib/selector.js?type=template&index=0!./components/vsButton.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{class:[_vm.vsType?_vm.clasex:'vs-button-primary-filled',{'filled':_vm.vsType?_vm.vsType.search('filled')!=-1:false,'border':_vm.vsType?_vm.vsType.search('border')!=-1:false}],attrs:{"type":"button","name":"button"},on:{"click":function($event){_vm.$emit('click')},"blur":function($event){_vm.btnBlur($event)}}},[_c('span',{staticClass:"text"},[_vm._t("default")],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_components_vsButton = (esExports);
// CONCATENATED MODULE: ./components/vsButton.vue
function injectStyle (ssrContext) {
  __webpack_require__("5xWW")
}
var normalizeComponent = __webpack_require__("mUJo")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  vsButton,
  selectortype_template_index_0_components_vsButton,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_vsButton = (Component.exports);

// EXTERNAL MODULE: ./css/iconfont/material-icons.css
var material_icons = __webpack_require__("tQxq");
var material_icons_default = /*#__PURE__*/__webpack_require__.n(material_icons);

// CONCATENATED MODULE: C:/Users/pc 01/Documents/vuesax/node_modules/babel-loader/lib!C:/Users/pc 01/Documents/vuesax/node_modules/vue-loader/lib/selector.js?type=script&index=0!./components/vsSelect.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var vsSelect = ({
  name: 'vs-select',
  props: ['label', 'options', 'value', 'disabled'],
  data: function data() {
    return {
      scroll: false,
      visible: false,
      topx: 0,
      leftx: 0,
      widthx: 0
    };
  },

  watch: {
    visible: function visible() {
      var _this = this;

      if (this.visible) {
        setTimeout(function () {

          var selects = document.querySelectorAll('.con-ul-select');
          if (selects.length == 1) {
            console.log("paso en 1");
            if (document.querySelector('.con-ul-select').clientHeight >= 300) {
              _this.scroll = true;
            }
          } else {
            console.log("paso en 2", selects);
            if (selects[1].clientHeight >= 300) {
              _this.scroll = true;
            }
          }
        }, 400);
        setTimeout(function () {
          console.log();
          var elx = _this.$el.querySelector('.con-ul-select');
          var elx2 = document.querySelectorAll('.con-ul-select');
          var elxUl = document.querySelector('.con-ul-select ul');
          for (var i = 0; i < elx2.length; i++) {
            mousewheelx(elx2[i]);
          }
          function mousewheelx(el) {
            console.log();
            el.querySelector('.con-ul-select ul').scrollTop = el.querySelector('.con-ul-select ul .activo').offsetTop;
            if (el.clientHeight >= 300) {
              el.addEventListener('mousewheel', function (e) {
                // console.log($(".con-codes").scrollTop());
                if (e.wheelDelta / 120 > 0) {
                  // console.log('scrolling up !');
                  if (el.querySelector('.con-ul-select ul').scrollTop == 0) {
                    el.querySelector('.con-ul-select ul').style.paddingTop = '25px';
                    setTimeout(function () {
                      el.querySelector('.con-ul-select ul').style.paddingTop = '0px';
                    }, 300);
                  }
                } else {
                  if (el.querySelector('.con-ul-select ul').scrollHeight - el.querySelector('.con-ul-select ul').scrollTop === el.querySelector('.con-ul-select ul').clientHeight) {
                    el.querySelector('.con-ul-select ul').style.paddingBottom = '30px';
                    setTimeout(function () {
                      el.querySelector('.con-ul-select ul').style.paddingBottom = '0px';
                    }, 300);
                  }
                  // console.log('scrolling down !');
                }
              });
            }

            if (elx) {

              document.body.insertBefore(elx, document.body.firstChild);
              elx.scrollIntoView();
            }
          }
        }, 1);
      } else {
        this.scroll = false;
      }
    }
  },
  methods: {
    clickSelect: function clickSelect() {
      if (!this.disabled) {
        this.$refs.inputHidden.focus();
      }
    },
    blurx: function blurx() {
      this.visible = false;
    },
    clickOption: function clickOption(evt) {
      this.visible = false;
      this.$emit('input', evt.target.dataset.value);
      this.$emit('change', evt.target.dataset.value);
    },
    clickInputSelect: function clickInputSelect() {
      this.topx = this.$refs.vsSelect.querySelector('.con-input-select').getBoundingClientRect().top;
      this.leftx = this.$refs.vsSelect.querySelector('.con-input-select').getBoundingClientRect().left;
      this.widthx = this.$refs.vsSelect.querySelector('.con-input-select').offsetWidth;
    }
  },
  computed: {
    seleccionado: function seleccionado() {
      var _this2 = this;

      var seleccionadox = this.options.filter(function (item) {
        return item.value == _this2.value;
      });
      return seleccionadox[0].text;
    },
    seleccionadoValue: function seleccionadoValue() {
      var _this3 = this;

      var seleccionadox = this.options.filter(function (item) {
        return item.value == _this3.value;
      });
      return seleccionadox[0].value;
    }
  },
  mounted: function mounted() {
    var _this4 = this;

    function getParents(e) {
      var result = [];
      for (var p = e && e.parentElement; p; p = p.parentElement) {
        result.push(p);
      }
      return result;
    }
    window.addEventListener('mousewheel', function (e) {
      var parents = getParents(e.toElement);
      parents = parents.filter(function (item) {
        return item.className.search('con-ul-select') != -1;
      });
      if (parents.length == 0) {
        _this4.visible = false;
      }
    });
  }
});
// CONCATENATED MODULE: C:/Users/pc 01/Documents/vuesax/node_modules/vue-loader/lib/template-compiler?{"id":"data-v-740e7b9c","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!C:/Users/pc 01/Documents/vuesax/node_modules/vue-loader/lib/selector.js?type=template&index=0!./components/vsSelect.vue
var vsSelect_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"vsSelect",staticClass:"vs-select",class:{'abierto':_vm.visible,'disabledx':_vm.disabled},on:{"click":_vm.clickSelect}},[_c('label',{attrs:{"for":""}},[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_c('div',{staticClass:"con-input-select",attrs:{"title":_vm.seleccionado}},[_c('span',[_vm._v(_vm._s(_vm.seleccionado))]),_vm._v(" "),_c('i',{staticClass:"i-icon material-icons"},[_vm._v("expand_more")]),_vm._v(" "),_c('input',{ref:"inputHidden",staticClass:"input-hidden",attrs:{"type":"text","name":"","value":""},on:{"blur":function($event){_vm.blurx()},"focus":function($event){_vm.visible=true,_vm.clickInputSelect()}}})]),_vm._v(" "),_c('transition',{attrs:{"name":"fade"}},[(_vm.visible)?_c('div',{ref:"conUlSelect",staticClass:"con-ul-select",class:{'visiblex':_vm.visible},style:({'top':_vm.topx+'px','left':_vm.leftx+'px','width':_vm.widthx+'px'})},[_c('ul',{class:{'scrollx':_vm.scroll}},_vm._l((_vm.options),function(option,index){return _c('li',{class:{'activo':_vm.seleccionadoValue==option.value},style:({'transition':'transform .2s ease '+index/30+'s , background .2s ease,opacity .2s ease '+index/30+'s'}),attrs:{"data-value":option.value},on:{"click":function($event){_vm.clickOption($event)}}},[_vm._v(_vm._s(option.text))])}))]):_vm._e()])],1)}
var vsSelect_staticRenderFns = []
var vsSelect_esExports = { render: vsSelect_render, staticRenderFns: vsSelect_staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_components_vsSelect = (vsSelect_esExports);
// CONCATENATED MODULE: ./components/vsSelect.vue
function vsSelect_injectStyle (ssrContext) {
  __webpack_require__("54gY")
}
var vsSelect_normalizeComponent = __webpack_require__("mUJo")
/* script */


/* template */

/* template functional */
var vsSelect___vue_template_functional__ = false
/* styles */
var vsSelect___vue_styles__ = vsSelect_injectStyle
/* scopeId */
var vsSelect___vue_scopeId__ = "data-v-740e7b9c"
/* moduleIdentifier (server only) */
var vsSelect___vue_module_identifier__ = null
var vsSelect_Component = vsSelect_normalizeComponent(
  vsSelect,
  selectortype_template_index_0_components_vsSelect,
  vsSelect___vue_template_functional__,
  vsSelect___vue_styles__,
  vsSelect___vue_scopeId__,
  vsSelect___vue_module_identifier__
)

/* harmony default export */ var components_vsSelect = (vsSelect_Component.exports);

// EXTERNAL MODULE: ./components/vsNoti/vsNoti.css
var vsNoti = __webpack_require__("Dqm4");
var vsNoti_default = /*#__PURE__*/__webpack_require__.n(vsNoti);

// CONCATENATED MODULE: ./components/vsNoti/vsNoti.js

/* harmony default export */ var vsNoti_vsNoti = (function(text,type='white',position='bottom-right',icon,functiox,fixed){
  if(text==null){
    console.warn('vsNoti not parameters text');
    text = 'vsNoti not parameters text'
    icon = 'warning'
    type = 'warning'
  }
  if(type==null){
    type = 'white'
  }
  if(position==null){
    position = 'bottom-right'
  }

  let conNotix = document.createElement('div')
  conNotix.classList.add('vs-noti-contenedor')
  conNotix.classList.add('vs-'+type);
  conNotix.classList.add('vs-'+position);

  let arrayPosition = position.split('-')

if(position.search('center')==-1){
  conNotix.style[arrayPosition[0]] = '15px';
  conNotix.style[arrayPosition[1]] = '15px';
}
if(position.search('top-center')!=-1){
    conNotix.style.left = `50%`
    conNotix.style.top = `15px`
    conNotix.style.transform = `translate(-50%)`
}
if(position.search('bottom-center')!=-1){
    conNotix.style.left = `50%`
    conNotix.style.bottom = `15px`
    conNotix.style.transform = `translate(-50%)`
}

  document.body.insertBefore(conNotix, document.body.firstChild);

  let rellenox = document.createElement('span')
  rellenox.classList.add('rellenox')
  if(/[#()]/i.test(type)){
    rellenox.style.background = type
  } else {
    rellenox.style.background = `rgb(var(--${type}))`
  }
  if(position.search('center')==-1){
    rellenox.style[arrayPosition[0]] = '50%';
    rellenox.style[arrayPosition[1]] = '0px';
  }
  if (position.search('bottom-center')!=-1){
    rellenox.style.left = '50%'
    rellenox.style.top = '100%'
  }
  if (position.search('top-center')!=-1){
    rellenox.style.left = '50%'
    rellenox.style.top = '0%'
  }
  conNotix.appendChild(rellenox)
  setTimeout(function () {
    if(position.search('left')!=-1){
      rellenox.style.left = '50%'
    } else if (position.search('right')!=-1) {
      rellenox.style.right = '-50%'
      rellenox.style.transform = 'translate(50%,-50%)'
    }
    // else if (position.search('center')!=-1){
    //   rellenox.style.left = '50%'
    //   rellenox.style.top = '100%'
    // }
    rellenox.style.top = '50%'
    rellenox.style.width = conNotix.offsetWidth*3 + 'px'
    rellenox.style.height = conNotix.offsetWidth*3 + 'px'
    moverNotis(position)
  }, 100);

  let notix = document.createElement('div')
  conNotix.appendChild(notix)
  notix.innerHTML = text
  notix.classList.add('vs-noti')



  if(icon){
    conNotix.classList.add('con-icon')
    let iconx = document.createElement('span')
    iconx.classList.add('icon-noti')
    iconx.innerHTML=`<i class="material-icons">${icon}</i>`
    conNotix.appendChild(iconx)
  }

  setTimeout(function () {
    conNotix.classList.add('vs-noti-listo')
  }, 300);

  conNotix.addEventListener('click',function(e){
    if(functiox){
      functiox()
    }
    eliminarx(conNotix,position,conNotix,fluent)
  })

  let conFluent = document.createElement('div')
  conFluent.classList.add('vs-con-fluent')

  let fluent = document.createElement('div')
  fluent.classList.add('vs-fluent')
  fluent.style.height = conNotix.offsetHeight*2+'px'
  fluent.style.width = conNotix.offsetHeight*2+'px'
  conFluent.appendChild(fluent)

  conNotix.appendChild(conFluent)

  conNotix.addEventListener('mousemove',function(e){
    // console.log(e);
    let x = e.pageX
    let y = e.pageY
    fluent.style.left = x - conNotix.getBoundingClientRect().left+'px'
    fluent.style.top = y - conNotix.getBoundingClientRect().top+'px'
    fluent.style.opacity = '1'
    fluent.style.height = conNotix.offsetHeight*2+'px'
    fluent.style.width = conNotix.offsetHeight*2+'px'
  })
  conNotix.addEventListener('mouseleave',function(e){
    fluent.style.opacity = '0'
    fluent.style.height = conNotix.offsetHeight*4+'px'
    fluent.style.width = conNotix.offsetHeight*4+'px'
  })

setTimeout(function () {
  if(!fixed){
    eliminarx(conNotix,position,conNotix,fluent)
  }
}, 2000);
});

function eliminarx(contenedor,position,conNotix,fluent){
  fluent.style.filter = 'blur(10px)'
  fluent.style.opacity = '0'
  fluent.style.height = conNotix.offsetHeight*5+'px'
  fluent.style.width = conNotix.offsetHeight*5+'px'
  if (position.search('top-center')!=-1) {
    contenedor.style.opacity = 0
    contenedor.style.top = '-20px'
  }
  if (position.search('bottom-center')!=-1) {
    contenedor.style.opacity = 0
    contenedor.style.bottom = '-20px'
  }
  setTimeout(function () {
    if(position.search('left')!=-1){
      contenedor.style.left = '-300px'
      contenedor.style.opacity = 0
    } else if (position.search('right')!=-1){
      contenedor.style.right = '-300px'
      contenedor.style.opacity = 0
    }
  }, 200);
    setTimeout(function () {
      contenedor.remove()
      moverNotis(position)
    }, 300);
}

function moverNotis(position){
  // console.log("paso en posision");
  let notisx = document.querySelectorAll('.vs-'+position);
  for (var i = 0; i < notisx.length; i++) {
    let hx = 0
    for (var i2 = 0; i2 < i; i2++) {
      hx += notisx[i2].offsetHeight + 10
    }
    if(position.search('center')==-1){
      if(position.search('top')!=-1){
        notisx[i].style.transform = `translatey(${hx}px)`
      } else if (position.search('bottom')!=-1) {
        notisx[i].style.transform = `translatey(-${hx}px)`
      }
    }

     if (position.search('top-center')!=-1) {
      notisx[i].style.transform = `translate(-50%,${hx}px)`
      notisx[i].style.zIndex = 10000-i
    }
     if (position.search('bottom-center')!=-1) {
      notisx[i].style.transform = `translate(-50%,-${hx}px)`
      notisx[i].style.zIndex = 10000-i
    }
  }
  // console.log(hx);
}

// CONCATENATED MODULE: C:/Users/pc 01/Documents/vuesax/node_modules/babel-loader/lib!C:/Users/pc 01/Documents/vuesax/node_modules/vue-loader/lib/selector.js?type=script&index=0!./components/vsSwitch.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var vsSwitch = ({
  name: 'vs-switch',
  props: ['value', 'vsType', 'vsIcon'],
  methods: {
    backgroundx: function backgroundx() {
      if (this.value) {
        if (/[#()]/i.test(this.vsType)) {
          return this.vsType;
        } else {
          return 'rgb(var(--' + this.vsType + '))';
        }
      }
    }
  },
  mounted: function mounted() {}
});
// CONCATENATED MODULE: C:/Users/pc 01/Documents/vuesax/node_modules/vue-loader/lib/template-compiler?{"id":"data-v-59001bac","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!C:/Users/pc 01/Documents/vuesax/node_modules/vue-loader/lib/selector.js?type=template&index=0!./components/vsSwitch.vue
var vsSwitch_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{ref:"switchx",staticClass:"con-switch",class:[{'switch-activo':_vm.value}],style:({'background':_vm.backgroundx()}),on:{"click":function($event){_vm.$emit('input',!_vm.value),_vm.$emit('change',!_vm.value)}}},[_c('span',{staticClass:"switch-circle"}),_vm._v(" "),_c('i',{staticClass:"material-icons"},[_vm._v(_vm._s(_vm.vsIcon))])])}
var vsSwitch_staticRenderFns = []
var vsSwitch_esExports = { render: vsSwitch_render, staticRenderFns: vsSwitch_staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_components_vsSwitch = (vsSwitch_esExports);
// CONCATENATED MODULE: ./components/vsSwitch.vue
function vsSwitch_injectStyle (ssrContext) {
  __webpack_require__("z6TR")
}
var vsSwitch_normalizeComponent = __webpack_require__("mUJo")
/* script */


/* template */

/* template functional */
var vsSwitch___vue_template_functional__ = false
/* styles */
var vsSwitch___vue_styles__ = vsSwitch_injectStyle
/* scopeId */
var vsSwitch___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var vsSwitch___vue_module_identifier__ = null
var vsSwitch_Component = vsSwitch_normalizeComponent(
  vsSwitch,
  selectortype_template_index_0_components_vsSwitch,
  vsSwitch___vue_template_functional__,
  vsSwitch___vue_styles__,
  vsSwitch___vue_scopeId__,
  vsSwitch___vue_module_identifier__
)

/* harmony default export */ var components_vsSwitch = (vsSwitch_Component.exports);

// EXTERNAL MODULE: C:/Users/pc 01/Documents/vuesax/node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("WxTP");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: C:/Users/pc 01/Documents/vuesax/node_modules/babel-loader/lib!C:/Users/pc 01/Documents/vuesax/node_modules/vue-loader/lib/selector.js?type=script&index=0!./components/vsCheckBox.vue

//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var vsCheckBox = ({
  name: 'vs-checkbox',
  props: ['vs-value', 'value', 'vsColor', 'disabled'],
  data: function data() {
    return {};
  },

  computed: {
    valueArray: function valueArray() {
      var arrayx = this.value;
      if (typeof_default()(this.value) == 'object' && this.value != null) {
        if (arrayx.includes(this.vsValue)) {
          return true;
        } else {
          return false;
        }
      } else if (typeof this.value == 'string' || this.value == '' || this.value == null) {
        if (this.value == this.vsValue) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  methods: {
    checkBoxClick: function checkBoxClick() {
      var _this = this;

      if (typeof_default()(this.value) == 'object' && this.value != null) {
        var valueOld = this.value;
        if (this.$refs.checkBoxx.classList.contains('checkBoxActivo')) {
          var valuenew = valueOld.filter(function (item) {
            return item.indexOf(_this.vsValue) == -1;
          });
          this.$emit('input', valuenew);
        } else {
          valueOld.push(this.vsValue);
          this.$emit('input', valueOld);
        }
      } else if (typeof this.value == 'boolean') {
        this.$emit('input', !this.value);
      } else if (typeof this.value == 'string' || this.value == '' || this.value == null) {
        if (this.value == this.vsValue) {
          this.$emit('input', null);
        } else {
          this.$emit('input', this.vsValue);
        }
      }
    },
    backgroundx: function backgroundx() {
      if (this.vsColor) {
        if (/[#()]/i.test(this.vsColor)) {
          return this.vsColor;
        } else {
          return 'rgb(var(--' + this.vsColor + '))';
        }
      } else {
        return 'rgb(var(--primary))';
      }
    }
  }
});
// CONCATENATED MODULE: C:/Users/pc 01/Documents/vuesax/node_modules/vue-loader/lib/template-compiler?{"id":"data-v-29ea52fe","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!C:/Users/pc 01/Documents/vuesax/node_modules/vue-loader/lib/selector.js?type=template&index=0!./components/vsCheckBox.vue
var vsCheckBox_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{ref:"checkBoxx",staticClass:"con-check",class:[{'disabledx':_vm.disabled,'checkBoxActivo':typeof _vm.value == 'boolean'?_vm.value:_vm.valueArray}],attrs:{"disabled":_vm.disabled},on:{"click":_vm.checkBoxClick}},[_c('span',{staticClass:"cuadro",style:({'border':!_vm.value?'2px solid rgb(160, 160, 160)':'2px solid '+_vm.backgroundx()})},[_c('i',{staticClass:"material-icons"},[_vm._v("check")]),_vm._v(" "),_c('span',{staticClass:"afterx",style:({'background':_vm.backgroundx()})})]),_vm._v(" "),_vm._t("default")],2)}
var vsCheckBox_staticRenderFns = []
var vsCheckBox_esExports = { render: vsCheckBox_render, staticRenderFns: vsCheckBox_staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_components_vsCheckBox = (vsCheckBox_esExports);
// CONCATENATED MODULE: ./components/vsCheckBox.vue
function vsCheckBox_injectStyle (ssrContext) {
  __webpack_require__("Q35d")
}
var vsCheckBox_normalizeComponent = __webpack_require__("mUJo")
/* script */


/* template */

/* template functional */
var vsCheckBox___vue_template_functional__ = false
/* styles */
var vsCheckBox___vue_styles__ = vsCheckBox_injectStyle
/* scopeId */
var vsCheckBox___vue_scopeId__ = "data-v-29ea52fe"
/* moduleIdentifier (server only) */
var vsCheckBox___vue_module_identifier__ = null
var vsCheckBox_Component = vsCheckBox_normalizeComponent(
  vsCheckBox,
  selectortype_template_index_0_components_vsCheckBox,
  vsCheckBox___vue_template_functional__,
  vsCheckBox___vue_styles__,
  vsCheckBox___vue_scopeId__,
  vsCheckBox___vue_module_identifier__
)

/* harmony default export */ var components_vsCheckBox = (vsCheckBox_Component.exports);

// CONCATENATED MODULE: ./index.js
// import Vue from 'vue'





// import './css/index.css'
const Vuesax = {
  install(Vue, options) {
    //buttons
    Vue.component(components_vsButton.name,components_vsButton)
    //selects
    Vue.component(components_vsSelect.name,components_vsSelect)
    //switch
    Vue.component(components_vsSwitch.name,components_vsSwitch)
    //checkBox
    Vue.component(components_vsCheckBox.name,components_vsCheckBox)
  	Vue.mixin({
      methods:{
        vsNoti: vsNoti_vsNoti
      }
    });

  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuesax)
}

// export default Vuesax;



// import * as vsComponents from './components'
//
// let vuesax = Vue => {
//   Object.values(vsComponents).forEach((vsComponent) => {
//     Vue.use(vsComponent)
//   })
// }

// Vuesax.version = '__VERSION__'
/* harmony default export */ var index = __webpack_exports__["default"] = (Vuesax);


/***/ }),

/***/ "KktU":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("qQMF");
var createDesc = __webpack_require__("Te4x");
module.exports = __webpack_require__("V5XO") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "LGng":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("FC7b"), __esModule: true };

/***/ }),

/***/ "Lqei":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("9F6d");
var descriptor = __webpack_require__("Te4x");
var setToStringTag = __webpack_require__("fL6e");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("KktU")(IteratorPrototype, __webpack_require__("Imef")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "O5S5":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("6zZR")('keys');
var uid = __webpack_require__("XQtG");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "OcUk":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("4db7");
__webpack_require__("+Rib");
module.exports = __webpack_require__("b5sM").f('iterator');


/***/ }),

/***/ "Q35d":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "QtM0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("W9uE");
var has = __webpack_require__("DVK/");
var DESCRIPTORS = __webpack_require__("V5XO");
var $export = __webpack_require__("SZ/P");
var redefine = __webpack_require__("36xL");
var META = __webpack_require__("UGBX").KEY;
var $fails = __webpack_require__("gHxa");
var shared = __webpack_require__("6zZR");
var setToStringTag = __webpack_require__("fL6e");
var uid = __webpack_require__("XQtG");
var wks = __webpack_require__("Imef");
var wksExt = __webpack_require__("b5sM");
var wksDefine = __webpack_require__("VA2M");
var enumKeys = __webpack_require__("HuhR");
var isArray = __webpack_require__("t4Wa");
var anObject = __webpack_require__("ToFw");
var isObject = __webpack_require__("GJ5T");
var toIObject = __webpack_require__("buEK");
var toPrimitive = __webpack_require__("scWE");
var createDesc = __webpack_require__("Te4x");
var _create = __webpack_require__("9F6d");
var gOPNExt = __webpack_require__("YxkS");
var $GOPD = __webpack_require__("rLEW");
var $DP = __webpack_require__("qQMF");
var $keys = __webpack_require__("WFAk");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("Jh2P").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("hOZK").f = $propertyIsEnumerable;
  __webpack_require__("rXIM").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("q9/b")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("KktU")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "SAmk":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("V5XO") && !__webpack_require__("gHxa")(function () {
  return Object.defineProperty(__webpack_require__("2hHA")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "SZ/P":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("W9uE");
var core = __webpack_require__("WsAY");
var ctx = __webpack_require__("yhwo");
var hide = __webpack_require__("KktU");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "SZiR":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Te4x":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "ToFw":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("GJ5T");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "UGBX":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("XQtG")('meta');
var isObject = __webpack_require__("GJ5T");
var has = __webpack_require__("DVK/");
var setDesc = __webpack_require__("qQMF").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("gHxa")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "V5XO":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("gHxa")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "VA2M":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("W9uE");
var core = __webpack_require__("WsAY");
var LIBRARY = __webpack_require__("q9/b");
var wksExt = __webpack_require__("b5sM");
var defineProperty = __webpack_require__("qQMF").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "VdYW":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("qQMF");
var anObject = __webpack_require__("ToFw");
var getKeys = __webpack_require__("WFAk");

module.exports = __webpack_require__("V5XO") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "W9uE":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "WFAk":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("Fmkg");
var enumBugKeys = __webpack_require__("9rUb");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "WsAY":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "WxTP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__("DiG7");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__("LGng");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ "XQtG":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "YxkS":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("buEK");
var gOPN = __webpack_require__("Jh2P").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "aJ6x":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "b5sM":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("Imef");


/***/ }),

/***/ "bt/m":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("buEK");
var toLength = __webpack_require__("JL8o");
var toAbsoluteIndex = __webpack_require__("1tVq");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "buEK":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("HuYH");
var defined = __webpack_require__("v41l");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "fL6e":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("qQMF").f;
var has = __webpack_require__("DVK/");
var TAG = __webpack_require__("Imef")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "gHxa":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "hOZK":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "mUJo":
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "p0o+":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "p25U":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "q9/b":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "qQMF":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("ToFw");
var IE8_DOM_DEFINE = __webpack_require__("SAmk");
var toPrimitive = __webpack_require__("scWE");
var dP = Object.defineProperty;

exports.f = __webpack_require__("V5XO") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "rLEW":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("hOZK");
var createDesc = __webpack_require__("Te4x");
var toIObject = __webpack_require__("buEK");
var toPrimitive = __webpack_require__("scWE");
var has = __webpack_require__("DVK/");
var IE8_DOM_DEFINE = __webpack_require__("SAmk");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("V5XO") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "rXIM":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "s8/V":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("vbaD");
var step = __webpack_require__("aJ6x");
var Iterators = __webpack_require__("vbkx");
var toIObject = __webpack_require__("buEK");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("/Yjn")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "scWE":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("GJ5T");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "t4Wa":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("p25U");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "t4fa":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("VA2M")('asyncIterator');


/***/ }),

/***/ "tQxq":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "v41l":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "vNUB":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("v41l");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "vbaD":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "vbkx":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "wgds":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("W9uE").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "yhwo":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("p0o+");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "z6TR":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
});