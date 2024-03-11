(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--ko--datalog-md"],{

/***/ "+IR3":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ko/datalog.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"데이터로그\",\n  \"contributors\": [\"PaTara43\"],\n  \"tools\": [\"Robonomics 2.3.0 https://github.com/airalab/robonomics\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/ko/datalog.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "9qH6":
/*!***********************************************************!*\
  !*** ./docs/ko/datalog.md?vue&type=template&id=a35c807c& ***!
  \***********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_datalog_md_vue_type_template_id_a35c807c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"4964dc46-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./datalog.md?vue&type=template&id=a35c807c& */ \"VCgl\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_datalog_md_vue_type_template_id_a35c807c___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_datalog_md_vue_type_template_id_a35c807c___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/ko/datalog.md?");

/***/ }),

/***/ "BtXa":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ko/datalog.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/ko/datalog.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "HSFx":
/*!****************************!*\
  !*** ./docs/ko/datalog.md ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _datalog_md_vue_type_template_id_a35c807c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datalog.md?vue&type=template&id=a35c807c& */ \"9qH6\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _datalog_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datalog.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"f1Fg\");\n/* harmony import */ var _datalog_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./datalog.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"cbbg\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _datalog_md_vue_type_template_id_a35c807c___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _datalog_md_vue_type_template_id_a35c807c___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _datalog_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_datalog_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _datalog_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_datalog_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/ko/datalog.md?");

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

/***/ "VCgl":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"4964dc46-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ko/datalog.md?vue&type=template&id=a35c807c& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('p',[_c('strong',[_vm._v(\"계정에 일정 금액의 자금이 있으므로 extrinsic을 제출할 수 있습니다. 먼저 시도해 볼 수 있는 것은 데이터로그입니다. 이를 통해 데이터를 블록체인에 영구적으로 저장할 수 있습니다. 분산 및 암호화된 데이터 저장소를 상상해보세요. 그게 바로 데이터로그입니다!\")])]),_c('robo-wiki-note',{attrs:{\"type\":\"warning\",\"title\":\"Dev Node\"}},[_c('p',[_vm._v(\"  주의하세요. 이 튜토리얼 및 다음 튜토리얼은 로보노믹스 노드의 로컬 인스턴스에서 보여집니다. \"),_c('a',{attrs:{\"href\":\"/docs/run-dev-node\"}},[_vm._v(\"이 지침\")]),_vm._v(\"을 따라 직접 설정하세요.\")])]),_c('h2',{attrs:{\"id\":\"1-developer---extrinsics로-이동하기\"}},[_c('a',{attrs:{\"href\":\"#1-developer---extrinsics%EB%A1%9C-%EC%9D%B4%EB%8F%99%ED%95%98%EA%B8%B0\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"1. Developer -> Extrinsics로 이동하기\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"datalog/extrinsics.jpg\"}}),_c('h2',{attrs:{\"id\":\"2-드롭다운-목록에서-datalog---record를-선택하기\"}},[_c('a',{attrs:{\"href\":\"#2-%EB%93%9C%EB%A1%AD%EB%8B%A4%EC%9A%B4-%EB%AA%A9%EB%A1%9D%EC%97%90%EC%84%9C-datalog---record%EB%A5%BC-%EC%84%A0%ED%83%9D%ED%95%98%EA%B8%B0\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"2. 드롭다운 목록에서 datalog -> record를 선택하기\")]),_c('p',[_vm._v(\"또한 extrinsic을 제출할 계정을 선택하세요. record 필드를 작성하세요.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"datalog/record.jpg\"}}),_c('robo-wiki-note',{attrs:{\"type\":\"note\",\"title\":\"Large amount of data\"}},[_c('p',[_vm._v(\"  데이터로그는 최대 512바이트의 문자열을 지원합니다. 대량의 데이터를 저장하려면 \"),_c('a',{attrs:{\"href\":\"https://ipfs.tech/\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"IPFS\")]),_vm._v(\"를 사용할 수 있습니다.\")])]),_c('h2',{attrs:{\"id\":\"3-트랜잭션-제출하기\"}},[_c('a',{attrs:{\"href\":\"#3-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EC%A0%9C%EC%B6%9C%ED%95%98%EA%B8%B0\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"3. 트랜잭션 제출하기\")]),_c('p',[_vm._v(\"확장 프로그램이나 DApp을 사용하여 트랜잭션에 서명하고 제출하세요.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"datalog/submit.jpg\"}}),_c('robo-wiki-note',{attrs:{\"type\":\"note\",\"title\":\"Erase\"}},[_c('p',[_vm._v(\"  또한 \"),_c('em',[_vm._v(\"datalog -> erase\")]),_vm._v(\" 호출로 \"),_c('strong',[_vm._v(\"모든\")]),_vm._v(\" 레코드를 삭제할 수도 있습니다.\")])]),_c('h2',{attrs:{\"id\":\"4-스토리지에서-데이터로그-검토하기\"}},[_c('a',{attrs:{\"href\":\"#4-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80%EC%97%90%EC%84%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A1%9C%EA%B7%B8-%EA%B2%80%ED%86%A0%ED%95%98%EA%B8%B0\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"4. 스토리지에서 데이터로그 검토하기\")]),_c('p',[_vm._v(\"이를 위해 \"),_c('em',[_vm._v(\"Developer -> Chain state\")]),_vm._v(\",로 이동하고 \"),_c('em',[_vm._v(\"datalog -> datalogIndex\")]),_vm._v(\"를 선택한 다음, 계정을 지정하고 \\\"+\\\" 버튼을 눌러 계정의 레코드 인덱스를 가져온 다음, \"),_c('em',[_vm._v(\"datalog -> datalogItem\")]),_vm._v(\"을 사용하여 필요한 레코드를 탐색하세요.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"datalog/item.jpg\"}}),_c('robo-wiki-note',{attrs:{\"type\":\"note\",\"title\":\"탐색하기r\"}},[_c('p',[_vm._v(\"  데이터로그 레코드를 포함한 모든 이벤트는 \"),_c('em',[_vm._v(\"Explorer\")]),_vm._v(\"의 이벤트 플로우에서 볼 수 있습니다.\")])])],1)}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/ko/datalog.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%224964dc46-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "cbbg":
/*!*************************************************************************************!*\
  !*** ./docs/ko/datalog.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_datalog_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./datalog.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"+IR3\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_datalog_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ko/datalog.md?");

/***/ }),

/***/ "f1Fg":
/*!********************************************************************************!*\
  !*** ./docs/ko/datalog.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_datalog_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./datalog.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"BtXa\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_datalog_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ko/datalog.md?");

/***/ })

}]);