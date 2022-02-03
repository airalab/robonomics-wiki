(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--ko--contributing-md"],{

/***/ "4cNj":
/*!****************************************************************!*\
  !*** ./docs/ko/contributing.md?vue&type=template&id=7337f1c8& ***!
  \****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_709914d4_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_contributing_md_vue_type_template_id_7337f1c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"709914d4-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./contributing.md?vue&type=template&id=7337f1c8& */ \"iJRR\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_709914d4_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_contributing_md_vue_type_template_id_7337f1c8___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_709914d4_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_contributing_md_vue_type_template_id_7337f1c8___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/ko/contributing.md?");

/***/ }),

/***/ "Bhvu":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ko/contributing.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/ko/contributing.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "TnAf":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ko/contributing.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"How to contribute\",\n  \"contributors\": [\"positivecrash\"],\n  \"translated\": false\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/ko/contributing.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "UNjM":
/*!*************************************************************************************!*\
  !*** ./docs/ko/contributing.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_contributing_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./contributing.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"Bhvu\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_contributing_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ko/contributing.md?");

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

/***/ "aTuB":
/*!*********************************!*\
  !*** ./docs/ko/contributing.md ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _contributing_md_vue_type_template_id_7337f1c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contributing.md?vue&type=template&id=7337f1c8& */ \"4cNj\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _contributing_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contributing.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"UNjM\");\n/* harmony import */ var _contributing_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contributing.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"iibh\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _contributing_md_vue_type_template_id_7337f1c8___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _contributing_md_vue_type_template_id_7337f1c8___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _contributing_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_contributing_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _contributing_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_contributing_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/ko/contributing.md?");

/***/ }),

/***/ "iJRR":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"709914d4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ko/contributing.md?vue&type=template&id=7337f1c8& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('p',[_vm._v(\"Robonomics network is an open-source project built by core maintainers from Airalab and contributors. We want to make it easy for anyone to contribute. You may contribute to core, suggest changes, improve documentation or write a blog post. Please, read some rules and suggestions for contributing.\")]),_c('h2',{attrs:{\"id\":\"main-airalab-repositories\"}},[_c('a',{attrs:{\"href\":\"#main-airalab-repositories\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Main Airalab repositories\")]),_c('ul',[_c('li',[_c('a',{attrs:{\"href\":\"https://github.com/airalab/aira\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"aira\")]),_vm._v(\" - AIRA client for Robonomics network. \")]),_c('li',[_c('a',{attrs:{\"href\":\"https://github.com/airalab/robonomics_comm\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"robonomics_comm\")]),_vm._v(\" - Robonomics communication stack\")]),_c('li',[_c('a',{attrs:{\"href\":\"https://github.com/airalab/robonomics_contracts\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"robonomics_contracts\")]),_vm._v(\" - smart contracts of Robonomics network\")])]),_c('h2',{attrs:{\"id\":\"bugs-and-proposals-for-improvements\"}},[_c('a',{attrs:{\"href\":\"#bugs-and-proposals-for-improvements\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Bugs and proposals for improvements\")]),_c('p',[_vm._v(\"If you find a bug in AIRA client, Robonomics repositories, this documentation or would like to propose an improvement, please, open a new issue in the same repository, that you want to contribute.\")]),_c('h3',{attrs:{\"id\":\"rules-for-reporting\"}},[_c('a',{attrs:{\"href\":\"#rules-for-reporting\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Rules for reporting\")]),_c('p',[_vm._v(\"When opening a new issue, do not forget about a few basic rules for reporting:\")]),_c('ol',[_c('li',[_c('p',[_vm._v(\"Choose exact repository, that you want to submit an issue.\")])]),_c('li',[_c('p',[_vm._v(\"If you are reporting bug, make sure the bug was not already reported.\")])]),_c('li',[_c('p',[_vm._v(\"Be sure to include title and clear description, as much relevant information as possible.\")])]),_c('li',[_c('p',[_vm._v(\"Please prefix your issue with one of the following: \"),_c('code',{pre:true},[_vm._v(\"[BUG]\")]),_vm._v(\", \"),_c('code',{pre:true},[_vm._v(\"[PROPOSAL]\")]),_vm._v(\", \"),_c('code',{pre:true},[_vm._v(\"[QUESTION]\")]),_vm._v(\".\")])])]),_c('h2',{attrs:{\"id\":\"pull-requests\"}},[_c('a',{attrs:{\"href\":\"#pull-requests\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Pull requests\")]),_c('p',[_vm._v(\"Any Airalab repository or this documentation may be subject to pull requests or changes by contributors where you believe you have something valuable to add or change. Please, do not forget about basic rules for contributors.\")]),_c('h3',{attrs:{\"id\":\"rules-for-contributing\"}},[_c('a',{attrs:{\"href\":\"#rules-for-contributing\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Rules for contributing\")]),_c('ol',[_c('li',[_c('p',[_vm._v(\"Pull requests are preferred to issues, if you have some fixes, especially for small changes such as typos.\")])]),_c('li',[_c('p',[_vm._v(\"Make sure the PR description clearly describes the problem and the solution. Include the relevant issue number if applicable.\")])]),_c('li',[_c('p',[_vm._v(\"Please, do not fix whitespace, format code, or make a purely cosmetic patch.\")])]),_c('li',[_c('p',[_vm._v(\"Please, attempt to adhere to the prevailing Markdown style, language, and layout.\")])])])])}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/ko/contributing.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%22709914d4-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "iibh":
/*!******************************************************************************************!*\
  !*** ./docs/ko/contributing.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_contributing_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./contributing.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"TnAf\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_contributing_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ko/contributing.md?");

/***/ })

}]);