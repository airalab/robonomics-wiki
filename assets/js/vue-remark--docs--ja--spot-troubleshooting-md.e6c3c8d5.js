(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--ja--spot-troubleshooting-md"],{

/***/ "8xOj":
/*!*********************************************************************************************!*\
  !*** ./docs/ja/spot-troubleshooting.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_spot_troubleshooting_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./spot-troubleshooting.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"KX7l\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_spot_troubleshooting_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ja/spot-troubleshooting.md?");

/***/ }),

/***/ "KX7l":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ja/spot-troubleshooting.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/ja/spot-troubleshooting.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

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

/***/ "eAT0":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ja/spot-troubleshooting.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Troubleshooting\",\n  \"contributors\": [\"LoSk-p\"],\n  \"translated\": false\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/ja/spot-troubleshooting.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "fZY1":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"709914d4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ja/spot-troubleshooting.md?vue&type=template&id=383cbca5& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('h3',{attrs:{\"id\":\"admin-socket-already-exists\"}},[_c('a',{attrs:{\"href\":\"#admin-socket-already-exists\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Admin socket already exists\")]),_c('p',[_vm._v(\"If you can't run yggdrasil with this error:\")]),_c('pre',[_c('code',{pre:true,attrs:{\"class\":\"hljs language-bash\"}},[_vm._v(\"Admin socket /var/run/yggdrasil.sock already exists and is \"),_c('span',{pre:true,attrs:{\"class\":\"hljs-keyword\"}},[_vm._v(\"in\")]),_vm._v(\" use by another process\")])]),_c('p',[_vm._v(\"Try to remove file yggdrasil.sock and run it again:\")]),_c('pre',[_c('code',{pre:true,attrs:{\"class\":\"hljs language-bash\"}},[_vm._v(\"sudo rm /var/run/yggdrasil.sock\")])]),_c('h3',{attrs:{\"id\":\"cant-get-lease\"}},[_c('a',{attrs:{\"href\":\"#cant-get-lease\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Can't get lease\")]),_c('p',[_vm._v(\"If you can't get lease with this error:\")]),_c('pre',[_c('code',{pre:true,attrs:{\"class\":\"hljs language-python\"}},[_c('span',{pre:true,attrs:{\"class\":\"hljs-type\"}},[_vm._v(\"Generic\")]),_vm._v(\" exception during check-\"),_c('span',{pre:true,attrs:{\"class\":\"hljs-keyword\"}},[_vm._v(\"in\")]),_vm._v(\":\\nNo lease \"),_c('span',{pre:true,attrs:{\"class\":\"hljs-keyword\"}},[_vm._v(\"for\")]),_vm._v(\" resource \"),_c('span',{pre:true,attrs:{\"class\":\"hljs-string\"}},[_vm._v(\"\\\"body\\\"\")]),_vm._v(\"\\n    (resuming check-\"),_c('span',{pre:true,attrs:{\"class\":\"hljs-keyword\"}},[_vm._v(\"in\")]),_vm._v(\")\")])]),_c('p',[_vm._v(\"Or this error:\")]),_c('pre',[_c('code',{pre:true,attrs:{\"class\":\"hljs language-python\"}},[_c('span',{pre:true,attrs:{\"class\":\"hljs-type\"}},[_vm._v(\"Generic\")]),_vm._v(\" exception during check-\"),_c('span',{pre:true,attrs:{\"class\":\"hljs-keyword\"}},[_vm._v(\"in\")]),_vm._v(\":\\nbosdyn.api.RetainLeaseResponse (LeaseUseError): \\n    (resuming check-\"),_c('span',{pre:true,attrs:{\"class\":\"hljs-keyword\"}},[_vm._v(\"in\")]),_vm._v(\")\")])]),_c('p',[_vm._v(\"You need to acquire lease (if you have already done it, try again):\")]),_c('pre',[_c('code',{pre:true,attrs:{\"class\":\"hljs language-python\"}},[_vm._v(\"lease = lease_client.acquire()\")])])])}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/ja/spot-troubleshooting.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%22709914d4-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "hVfY":
/*!*****************************************!*\
  !*** ./docs/ja/spot-troubleshooting.md ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _spot_troubleshooting_md_vue_type_template_id_383cbca5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spot-troubleshooting.md?vue&type=template&id=383cbca5& */ \"luhs\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _spot_troubleshooting_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./spot-troubleshooting.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"8xOj\");\n/* harmony import */ var _spot_troubleshooting_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./spot-troubleshooting.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"uTYh\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _spot_troubleshooting_md_vue_type_template_id_383cbca5___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _spot_troubleshooting_md_vue_type_template_id_383cbca5___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _spot_troubleshooting_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_spot_troubleshooting_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _spot_troubleshooting_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_spot_troubleshooting_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/ja/spot-troubleshooting.md?");

/***/ }),

/***/ "luhs":
/*!************************************************************************!*\
  !*** ./docs/ja/spot-troubleshooting.md?vue&type=template&id=383cbca5& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_709914d4_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_spot_troubleshooting_md_vue_type_template_id_383cbca5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"709914d4-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./spot-troubleshooting.md?vue&type=template&id=383cbca5& */ \"fZY1\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_709914d4_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_spot_troubleshooting_md_vue_type_template_id_383cbca5___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_709914d4_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_spot_troubleshooting_md_vue_type_template_id_383cbca5___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/ja/spot-troubleshooting.md?");

/***/ }),

/***/ "uTYh":
/*!**************************************************************************************************!*\
  !*** ./docs/ja/spot-troubleshooting.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_spot_troubleshooting_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./spot-troubleshooting.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"eAT0\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_spot_troubleshooting_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ja/spot-troubleshooting.md?");

/***/ })

}]);