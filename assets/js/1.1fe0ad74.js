(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "/5il":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"ae3711d8-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SidebarDocs.vue?vue&type=template&id=7d3a1b9a&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c('ul', {\n    staticClass: \"menu\"\n  }, _vm._l(_vm.items, function (item, key) {\n    return _c('li', {\n      key: key\n    }, [item.link && item.published != false ? _c('g-link', {\n      staticClass: \"menu-link\",\n      attrs: {\n        \"to\": _vm.$path(item.link, _vm.locale),\n        \"exact\": \"\"\n      }\n    }, [_vm._v(\"\\n      \" + _vm._s(_vm.getTitle(item)) + \"\\n    \")]) : [item.published != false ? _c('h4', {\n      staticClass: \"menu-subtitle\",\n      class: _vm.hascurrent(item.items) ? 'open' : 'close',\n      on: {\n        \"click\": _vm.toggle\n      }\n    }, [_vm._v(\"\\n        \" + _vm._s(_vm.getTitle(item)) + \"\\n      \")]) : _vm._e(), _c('List', {\n      attrs: {\n        \"items\": item.items\n      }\n    })]], 2);\n  }), 0);\n};\nvar staticRenderFns = [];\n\n\n//# sourceURL=webpack:///./src/components/SidebarDocs.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%22ae3711d8-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "4B8V":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??ref--2-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--2-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SidebarDocs.vue?vue&type=style&index=0&id=7d3a1b9a&prod&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/components/SidebarDocs.vue?./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??ref--2-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--2-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "F3eC":
/*!****************************************!*\
  !*** ./src/components/SidebarDocs.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SidebarDocs_vue_vue_type_template_id_7d3a1b9a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidebarDocs.vue?vue&type=template&id=7d3a1b9a&scoped=true& */ \"KT5I\");\n/* harmony import */ var _SidebarDocs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SidebarDocs.vue?vue&type=script&lang=js& */ \"JISl\");\n/* empty/unused harmony star reexport *//* harmony import */ var _SidebarDocs_vue_vue_type_style_index_0_id_7d3a1b9a_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SidebarDocs.vue?vue&type=style&index=0&id=7d3a1b9a&prod&scoped=true&lang=css& */ \"kGic\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _SidebarDocs_vue_vue_type_custom_index_0_blockType_static_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SidebarDocs.vue?vue&type=custom&index=0&blockType=static-query */ \"ruz1\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _SidebarDocs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _SidebarDocs_vue_vue_type_template_id_7d3a1b9a_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _SidebarDocs_vue_vue_type_template_id_7d3a1b9a_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"7d3a1b9a\",\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _SidebarDocs_vue_vue_type_custom_index_0_blockType_static_query__WEBPACK_IMPORTED_MODULE_4__[\"default\"] === 'function') Object(_SidebarDocs_vue_vue_type_custom_index_0_blockType_static_query__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/SidebarDocs.vue?");

/***/ }),

/***/ "H2Ju":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SidebarDocs.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: {\n    items: {\n      default: []\n    }\n  },\n  components: {\n    List: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./SidebarDocs.vue */ \"F3eC\"))\n  },\n  computed: {\n    locale() {\n      return this.$store.state.locale;\n    }\n  },\n  methods: {\n    toggle(event) {\n      event.target.classList.toggle('open');\n    },\n    hascurrent(a) {\n      let path = this.$route.matched[0].path + '/';\n      let contains = false;\n      for (var i = 0; i < a.length; i++) {\n        if (!a[i].items) {\n          if (this.$path(a[i].link, this.locale) == path) {\n            contains = true;\n          }\n        } else {\n          if (this.hascurrent(a[i].items)) {\n            contains = true;\n          }\n        }\n      }\n      return contains;\n    },\n    getTitle(item) {\n      if (eval(`item.title_${this.locale}`)) {\n        return eval(`item.title_${this.locale}`);\n      }\n      if (eval(`item.title_${this.$static.metadata.defaultLocale}`)) {\n        return eval(`item.title_${this.$static.metadata.defaultLocale}`);\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/SidebarDocs.vue?./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "JISl":
/*!*****************************************************************!*\
  !*** ./src/components/SidebarDocs.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarDocs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/babel-loader/lib??ref--1-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SidebarDocs.vue?vue&type=script&lang=js& */ \"H2Ju\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarDocs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/SidebarDocs.vue?");

/***/ }),

/***/ "KT5I":
/*!***********************************************************************************!*\
  !*** ./src/components/SidebarDocs.vue?vue&type=template&id=7d3a1b9a&scoped=true& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_ae3711d8_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarDocs_vue_vue_type_template_id_7d3a1b9a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"ae3711d8-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/babel-loader/lib??ref--1-1!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SidebarDocs.vue?vue&type=template&id=7d3a1b9a&scoped=true& */ \"/5il\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_ae3711d8_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarDocs_vue_vue_type_template_id_7d3a1b9a_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_ae3711d8_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarDocs_vue_vue_type_template_id_7d3a1b9a_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/SidebarDocs.vue?");

/***/ }),

/***/ "PVPN":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--14-0!./node_modules/gridsome/lib/plugins/vue-components/lib/loaders/static-query.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SidebarDocs.vue?vue&type=custom&index=0&blockType=static-query ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nconst {\n  computed\n} = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nconst data = {\n  \"metadata\": {\n    \"defaultLocale\": \"en\"\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (({\n  options\n}) => {\n  if (options.__staticData) {\n    options.__staticData.data = data;\n    return;\n  }\n  options.__staticData = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].observable({\n    data\n  });\n  options.computed = computed({\n    $static: () => options.__staticData.data\n  }, options.computed);\n});\n\n//# sourceURL=webpack:///./src/components/SidebarDocs.vue?./node_modules/babel-loader/lib??ref--14-0!./node_modules/gridsome/lib/plugins/vue-components/lib/loaders/static-query.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "kGic":
/*!******************************************************************************************************!*\
  !*** ./src/components/SidebarDocs.vue?vue&type=style&index=0&id=7d3a1b9a&prod&scoped=true&lang=css& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_2_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_2_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarDocs_vue_vue_type_style_index_0_id_7d3a1b9a_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/dist/cjs.js??ref--2-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--2-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SidebarDocs.vue?vue&type=style&index=0&id=7d3a1b9a&prod&scoped=true&lang=css& */ \"4B8V\");\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_2_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_2_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarDocs_vue_vue_type_style_index_0_id_7d3a1b9a_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_2_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_2_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarDocs_vue_vue_type_style_index_0_id_7d3a1b9a_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_2_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_2_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarDocs_vue_vue_type_style_index_0_id_7d3a1b9a_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_2_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_2_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarDocs_vue_vue_type_style_index_0_id_7d3a1b9a_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/components/SidebarDocs.vue?");

/***/ }),

/***/ "ruz1":
/*!***************************************************************************************!*\
  !*** ./src/components/SidebarDocs.vue?vue&type=custom&index=0&blockType=static-query ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_14_0_node_modules_gridsome_lib_plugins_vue_components_lib_loaders_static_query_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarDocs_vue_vue_type_custom_index_0_blockType_static_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--14-0!../../node_modules/gridsome/lib/plugins/vue-components/lib/loaders/static-query.js!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SidebarDocs.vue?vue&type=custom&index=0&blockType=static-query */ \"PVPN\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_14_0_node_modules_gridsome_lib_plugins_vue_components_lib_loaders_static_query_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarDocs_vue_vue_type_custom_index_0_blockType_static_query__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/SidebarDocs.vue?");

/***/ })

}]);