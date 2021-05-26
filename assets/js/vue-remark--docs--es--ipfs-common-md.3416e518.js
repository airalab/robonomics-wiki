(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--es--ipfs-common-md"],{

/***/ "0ZLH":
/*!***************************************************************!*\
  !*** ./docs/es/ipfs-common.md?vue&type=template&id=8bb2ef86& ***!
  \***************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_293f11d7_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_ipfs_common_md_vue_type_template_id_8bb2ef86___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"293f11d7-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./ipfs-common.md?vue&type=template&id=8bb2ef86& */ \"iY4Q\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_293f11d7_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_ipfs_common_md_vue_type_template_id_8bb2ef86___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_293f11d7_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_ipfs_common_md_vue_type_template_id_8bb2ef86___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/es/ipfs-common.md?");

/***/ }),

/***/ "JlzL":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/es/ipfs-common.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"IPFS Common\",\n  \"contributors\": [\"ensrationis\", \"akru\"],\n  \"translated\": false\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/es/ipfs-common.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "UQSp":
/*!****************************************************************!*\
  !*** ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// @vue/component\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'VueRemarkRoot',\n  render: function render(h) {\n    return h('div', null, this.$slots[\"default\"]);\n  }\n});\n\n//# sourceURL=webpack:///./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js?");

/***/ }),

/***/ "iY4Q":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"293f11d7-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/es/ipfs-common.md?vue&type=template&id=8bb2ef86& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('p',[_vm._v(\"The package handle IPFS connections, provides useful services for working with IPFS Network. \\nIt's included in \"),_c('code',{pre:true},[_vm._v(\"robonomics_liability\")]),_vm._v(\" launch file\")]),_c('h2',{attrs:{\"id\":\"ros-parameters\"}},[_c('a',{attrs:{\"href\":\"#ros-parameters\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"ROS Parameters\")]),_c('h3',{attrs:{\"id\":\"lighthouse_contract\"}},[_c('a',{attrs:{\"href\":\"#lighthouse_contract\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"~lighthouse_contract\")]),_c('p',[_vm._v(\"The name of a lighthouse you are working on. The type is \"),_c('code',{pre:true},[_vm._v(\"string\")]),_vm._v(\", defaults to \"),_c('code',{pre:true},[_vm._v(\"airalab.lighthouse.5.robonomics.eth\")])]),_c('h3',{attrs:{\"id\":\"ipfs_http_provider\"}},[_c('a',{attrs:{\"href\":\"#ipfs_http_provider\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"~ipfs_http_provider\")]),_c('p',[_vm._v(\"IPFS HTTP provider address. The type is \"),_c('code',{pre:true},[_vm._v(\"string\")]),_vm._v(\", defaults to \"),_c('code',{pre:true},[_vm._v(\"http://127.0.0.1:5001\")])]),_c('h3',{attrs:{\"id\":\"ipfs_public_providers\"}},[_c('a',{attrs:{\"href\":\"#ipfs_public_providers\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"~ipfs_public_providers\")]),_c('p',[_vm._v(\"A public IPFS node to pin result files. The type is \"),_c('code',{pre:true},[_vm._v(\"string\")]),_vm._v(\", defaults to \"),_c('code',{pre:true},[_vm._v(\"\\\"\\\"\")])]),_c('h3',{attrs:{\"id\":\"ipfs_file_providers\"}},[_c('a',{attrs:{\"href\":\"#ipfs_file_providers\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"~ipfs_file_providers\")]),_c('p',[_vm._v(\"A list of public nodes to pin result files. The type is \"),_c('code',{pre:true},[_vm._v(\"list of strings\")]),_vm._v(\", defaults to \"),_c('code',{pre:true},[_vm._v(\"[ipfs_public_providers]\")])]),_c('h3',{attrs:{\"id\":\"ipfs_swarm_connect_addresses\"}},[_c('a',{attrs:{\"href\":\"#ipfs_swarm_connect_addresses\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"~ipfs_swarm_connect_addresses\")]),_c('p',[_vm._v(\"IPFS nodes to connect to. The type is \"),_c('code',{pre:true},[_vm._v(\"string\")]),_vm._v(\", defaults to \"),_c('code',{pre:true},[_vm._v(\"\\\"\\\"\")])]),_c('h3',{attrs:{\"id\":\"ipfs_swarm_connect_to\"}},[_c('a',{attrs:{\"href\":\"#ipfs_swarm_connect_to\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"~ipfs_swarm_connect_to\")]),_c('p',[_vm._v(\"A list of IPFS nodes to connect to. The type is \"),_c('code',{pre:true},[_vm._v(\"list of strings\")]),_vm._v(\", defaults to \"),_c('code',{pre:true},[_vm._v(\"[ipfs_swarm_connect_addresses]\")])]),_c('h2',{attrs:{\"id\":\"subscribed-topics\"}},[_c('a',{attrs:{\"href\":\"#subscribed-topics\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Subscribed topics\")])])}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/es/ipfs-common.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%22293f11d7-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "p54B":
/*!********************************!*\
  !*** ./docs/es/ipfs-common.md ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ipfs_common_md_vue_type_template_id_8bb2ef86___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ipfs-common.md?vue&type=template&id=8bb2ef86& */ \"0ZLH\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _ipfs_common_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ipfs-common.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"wvkb\");\n/* harmony import */ var _ipfs_common_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ipfs-common.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"ulgw\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _ipfs_common_md_vue_type_template_id_8bb2ef86___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _ipfs_common_md_vue_type_template_id_8bb2ef86___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _ipfs_common_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_ipfs_common_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _ipfs_common_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_ipfs_common_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/es/ipfs-common.md?");

/***/ }),

/***/ "qYED":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/es/ipfs-common.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/es/ipfs-common.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "ulgw":
/*!*****************************************************************************************!*\
  !*** ./docs/es/ipfs-common.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_ipfs_common_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./ipfs-common.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"JlzL\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_ipfs_common_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/es/ipfs-common.md?");

/***/ }),

/***/ "wvkb":
/*!************************************************************************************!*\
  !*** ./docs/es/ipfs-common.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_ipfs_common_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./ipfs-common.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"qYED\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_ipfs_common_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/es/ipfs-common.md?");

/***/ })

}]);