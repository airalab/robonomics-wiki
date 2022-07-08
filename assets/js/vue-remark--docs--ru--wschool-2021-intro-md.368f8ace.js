(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--ru--wschool-2021-intro-md"],{

/***/ "+CBU":
/*!***********************************************************************************************!*\
  !*** ./docs/ru/wschool2021-intro.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_wschool2021_intro_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./wschool2021-intro.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"Sbr9\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_wschool2021_intro_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ru/wschool2021-intro.md?");

/***/ }),

/***/ "PX4b":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/wschool2021-intro.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/ru/wschool2021-intro.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "Sbr9":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/wschool2021-intro.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Robonomics Winter School 2021 introduction\",\n  \"translated\": false\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/ru/wschool2021-intro.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

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

/***/ "ZGnL":
/*!**************************************!*\
  !*** ./docs/ru/wschool2021-intro.md ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wschool2021_intro_md_vue_type_template_id_41130a61___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wschool2021-intro.md?vue&type=template&id=41130a61& */ \"e2UK\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _wschool2021_intro_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wschool2021-intro.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"tWYV\");\n/* harmony import */ var _wschool2021_intro_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wschool2021-intro.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"+CBU\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _wschool2021_intro_md_vue_type_template_id_41130a61___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _wschool2021_intro_md_vue_type_template_id_41130a61___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _wschool2021_intro_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_wschool2021_intro_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _wschool2021_intro_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_wschool2021_intro_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/ru/wschool2021-intro.md?");

/***/ }),

/***/ "e2UK":
/*!*********************************************************************!*\
  !*** ./docs/ru/wschool2021-intro.md?vue&type=template&id=41130a61& ***!
  \*********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_564eb8b5_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_wschool2021_intro_md_vue_type_template_id_41130a61___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"564eb8b5-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./wschool2021-intro.md?vue&type=template&id=41130a61& */ \"l/9q\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_564eb8b5_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_wschool2021_intro_md_vue_type_template_id_41130a61___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_564eb8b5_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_wschool2021_intro_md_vue_type_template_id_41130a61___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/ru/wschool2021-intro.md?");

/***/ }),

/***/ "l/9q":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"564eb8b5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/wschool2021-intro.md?vue&type=template&id=41130a61& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('p',[_vm._v(\"Robonomics Winter School 2021 is held from 10 to 24 February \"),_c('strong',[_vm._v(\"online\")]),_vm._v(\". It's \"),_c('strong',[_vm._v(\"free\")]),_vm._v(\".\")]),_c('p',[_vm._v(\"We are publishing \"),_c('strong',[_vm._v(\"lessons\")]),_vm._v(\" online in different ways: text here in Wiki, video on our \"),_c('a',{attrs:{\"href\":\"https://www.youtube.com/channel/UCrSiho1uB-1n6F8cZpCLhjQ\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"YouTube channel\")]),_vm._v(\", announce in \"),_c('a',{attrs:{\"href\":\"https://twitter.com/AIRA_Robonomics\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"Twitter account\")]),_vm._v(\". Please, keep in mind, that video lessons and text lessons are not the same. For the start we plan to publish two language versions: English and Russian. \")]),_c('p',[_vm._v(\"Join us, take your steps through the lessons, \"),_c('strong',[_vm._v(\"discuss and ask questions\")]),_vm._v(\" in \"),_c('a',{attrs:{\"href\":\"https://discord.gg/5UWNGNaAUf\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"Discord\")]),_vm._v(\".\")]),_c('h2',{attrs:{\"id\":\"watch-opening-ceremony\"}},[_c('a',{attrs:{\"href\":\"#watch-opening-ceremony\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Watch opening ceremony\")]),_c('div',{staticClass:\"youtube-embed\"},[_c('div',{staticStyle:{\"width\":\"100%\",\"margin\":\"0 auto\"}},[_c('div',{staticStyle:{\"position\":\"relative\",\"padding-bottom\":\"56.25%\",\"padding-top\":\"25px\",\"height\":\"0\"}},[_c('iframe',{staticStyle:{\"position\":\"absolute\",\"top\":\"0\",\"left\":\"0\",\"width\":\"100%\",\"height\":\"100%\"},attrs:{\"src\":\"https://www.youtube-nocookie.com/embed/kQaSwNYHJQ8\",\"allow\":\"autoplay; encrypted-media\",\"allowfullscreen\":\"\"}})])])]),_c('h2',{attrs:{\"id\":\"basic-information\"}},[_c('a',{attrs:{\"href\":\"#basic-information\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Basic information\")]),_c('p',[_vm._v(\"Take a look at \"),_c('a',{attrs:{\"href\":\"https://robonomics.network/blog/winter-robonomics-school/\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"page about school\")]),_vm._v(\" on our website. We are collecting there all basic information: shedule, infopartners, links.\")]),_c('h2',{attrs:{\"id\":\"links-links-links\"}},[_c('a',{attrs:{\"href\":\"#links-links-links\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Links, links, links\")]),_c('p',[_vm._v(\"Lets repeat what links do we have for following Robonomics Winter School 2021:\")]),_c('ul',[_c('li',[_c('a',{attrs:{\"href\":\"https://robonomics.network/blog/winter-robonomics-school/\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"Summary on website\")])]),_c('li',[_vm._v(\"Wiki for text lessons, YOU ARE HERE 🤓\")]),_c('li',[_c('a',{attrs:{\"href\":\"https://www.youtube.com/channel/UCrSiho1uB-1n6F8cZpCLhjQ\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"Video lessons\")])]),_c('li',[_c('a',{attrs:{\"href\":\"https://twitter.com/AIRA_Robonomics\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"Fast announce on Twitter\")])]),_c('li',[_c('a',{attrs:{\"href\":\"https://discord.gg/5UWNGNaAUf\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"Questions, Discussions, Quizes in Discord\")])])]),_c('p',[_c('strong',[_vm._v(\"Lets start learn Robonomics!\")])])])}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/ru/wschool2021-intro.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%22564eb8b5-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "tWYV":
/*!******************************************************************************************!*\
  !*** ./docs/ru/wschool2021-intro.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_wschool2021_intro_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./wschool2021-intro.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"PX4b\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_wschool2021_intro_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ru/wschool2021-intro.md?");

/***/ })

}]);