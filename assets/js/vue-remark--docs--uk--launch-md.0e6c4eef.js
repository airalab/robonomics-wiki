(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--uk--launch-md"],{

/***/ "6fi2":
/*!*******************************************************************************!*\
  !*** ./docs/uk/launch.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./launch.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"lrAX\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/uk/launch.md?");

/***/ }),

/***/ "JhnY":
/*!***************************!*\
  !*** ./docs/uk/launch.md ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _launch_md_vue_type_template_id_447abeb4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./launch.md?vue&type=template&id=447abeb4& */ \"msVE\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./launch.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"6fi2\");\n/* harmony import */ var _launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"yTDD\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _launch_md_vue_type_template_id_447abeb4___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _launch_md_vue_type_template_id_447abeb4___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/uk/launch.md?");

/***/ }),

/***/ "MO8O":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/uk/launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Запуск\",\n  \"contributors\": [\"PaTara43\"],\n  \"tools\": [\"Robonomics 2.3.0 https://github.com/airalab/robonomics\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/uk/launch.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

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

/***/ "VvV2":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"4964dc46-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/uk/launch.md?vue&type=template&id=447abeb4& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('p',[_c('strong',[_vm._v(\"Ще одна основна функція палети Robonomics - це палета запуску. Вона дозволяє відправляти команди на рахунки/будь-які сутності, що стоять за ними. Ці команди включають параметр, що вказує завдання, яке має бути виконане.\")])]),_c('robo-wiki-note',{attrs:{\"type\":\"warning\",\"title\":\"Dev Node\"}},[_c('p',[_vm._v(\"  Зверніть увагу, що ці та наступні посібники демонструються на локальному екземплярі вузла Robonomics. Налаштуйте свій за допомогою \"),_c('a',{attrs:{\"href\":\"/docs/run-dev-node\"}},[_vm._v(\"цієї інструкції\")]),_vm._v(\".\")])]),_c('h2',{attrs:{\"id\":\"1-перейдіть-до-developer---extrinsics\"}},[_c('a',{attrs:{\"href\":\"#1-%D0%BF%D0%B5%D1%80%D0%B5%D0%B9%D0%B4%D1%96%D1%82%D1%8C-%D0%B4%D0%BE-developer---extrinsics\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"1. Перейдіть до Developer -> Extrinsics\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"launch/extrinsics.jpg\"}}),_c('h2',{attrs:{\"id\":\"2-виберіть-launch---launch-зі-списку-можливих-екстриксів\"}},[_c('a',{attrs:{\"href\":\"#2-%D0%B2%D0%B8%D0%B1%D0%B5%D1%80%D1%96%D1%82%D1%8C-launch---launch-%D0%B7%D1%96-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D1%83-%D0%BC%D0%BE%D0%B6%D0%BB%D0%B8%D0%B2%D0%B8%D1%85-%D0%B5%D0%BA%D1%81%D1%82%D1%80%D0%B8%D0%BA%D1%81%D1%96%D0%B2\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"2. Виберіть launch -> launch зі списку можливих екстриксів\")]),_c('p',[_vm._v(\"Також виберіть рахунок, з яким ви хочете відправити екстрикс. Заповніть поле цільової адреси та параметрів.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"launch/launch.jpg\"}}),_c('robo-wiki-note',{attrs:{\"type\":\"note\",\"title\":\"32 bytes\"}},[_c('p',[_vm._v(\"  Launch підтримує рядки довжиною 32 байти як команди (\"),_c('a',{attrs:{\"href\":\"https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"джерело\")]),_vm._v(\"), \\n  тож тут є місце для імпровізації:\")]),_c('ul',[_c('li',[_vm._v(\"Для основних команд, таких як перемикання, ви можете використовувати \\\"0x0000000000000000000000000000000000000000000000000000000000000001\\\" або \\\"0x00000000000000000000000000000000000000000000000000000000000000000\\\".\")]),_c('li',[_c('ul',[_c('li',[_vm._v(\"Для розширених команд, включаючи json-подібні, ви можете використовувати \"),_c('a',{attrs:{\"href\":\"https://ipfs.tech/\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"IPFS\")]),_vm._v(\" CID у форматі\\n\"),_c('a',{attrs:{\"href\":\"https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"правильний спосіб\")]),_vm._v(\".\")])])])])]),_c('h2',{attrs:{\"id\":\"3-відправити-транзакцію\"}},[_c('a',{attrs:{\"href\":\"#3-%D0%B2%D1%96%D0%B4%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D1%82%D0%B8-%D1%82%D1%80%D0%B0%D0%BD%D0%B7%D0%B0%D0%BA%D1%86%D1%96%D1%8E\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"3. Відправити транзакцію\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"launch/submit.jpg\"}}),_c('h2',{attrs:{\"id\":\"4-перегляньте-свій-запуск-у-подіях\"}},[_c('a',{attrs:{\"href\":\"#4-%D0%BF%D0%B5%D1%80%D0%B5%D0%B3%D0%BB%D1%8F%D0%BD%D1%8C%D1%82%D0%B5-%D1%81%D0%B2%D1%96%D0%B9-%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA-%D1%83-%D0%BF%D0%BE%D0%B4%D1%96%D1%8F%D1%85\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"4. Перегляньте свій запуск у подіях\")]),_c('p',[_vm._v(\"Для цього перейдіть до \"),_c('em',[_vm._v(\"Network -> Explorer\")]),_vm._v(\" і знайдіть список подій праворуч. Натисніть піктограму трикутника, щоб розгорнути.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"launch/event.jpg\"}})],1)}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/uk/launch.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%224964dc46-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "lrAX":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/uk/launch.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/uk/launch.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "msVE":
/*!**********************************************************!*\
  !*** ./docs/uk/launch.md?vue&type=template&id=447abeb4& ***!
  \**********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_template_id_447abeb4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"4964dc46-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./launch.md?vue&type=template&id=447abeb4& */ \"VvV2\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_template_id_447abeb4___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_template_id_447abeb4___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/uk/launch.md?");

/***/ }),

/***/ "yTDD":
/*!************************************************************************************!*\
  !*** ./docs/uk/launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"MO8O\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/uk/launch.md?");

/***/ })

}]);