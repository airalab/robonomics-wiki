(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--el--launch-md"],{

/***/ "01lq":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/el/launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Εκκίνηση\",\n  \"contributors\": [\"PaTara43\"],\n  \"tools\": [\"Robonomics 2.3.0 https://github.com/airalab/robonomics\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/el/launch.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "4Btw":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"4964dc46-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/el/launch.md?vue&type=template&id=e22688ae& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('p',[_c('strong',[_vm._v(\"Ένα άλλο βασικό χαρακτηριστικό του Robonomics parachain είναι η παλέτα Launch. Σας επιτρέπει να στέλνετε εντολές στους λογαριασμούς/οποιεσδήποτε οντότητες βρίσκονται πίσω από αυτές. Αυτές οι εντολές περιλαμβάνουν παράμετρο για τον καθορισμό της εργασίας που θα εκτελεστεί.\")])]),_c('robo-wiki-note',{attrs:{\"type\":\"warning\",\"title\":\"Dev Node\"}},[_c('p',[_vm._v(\"  Παρακαλούμε να προσέξετε ότι αυτά και τα επόμενα εκπαιδευτικά προγράμματα παρουσιάζονται σε μια τοπική εκδοχή του Robonomics Node. Δημιουργήστε τη δική σας με \"),_c('a',{attrs:{\"href\":\"/docs/run-dev-node\"}},[_vm._v(\"αυτές τις οδηγίες\")]),_vm._v(\".\")])]),_c('h2',{attrs:{\"id\":\"1-πλοηγηθείτε-στο-developer---extrinsics\"}},[_c('a',{attrs:{\"href\":\"#1-%CF%80%CE%BB%CE%BF%CE%B7%CE%B3%CE%B7%CE%B8%CE%B5%CE%AF%CF%84%CE%B5-%CF%83%CF%84%CE%BF-developer---extrinsics\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"1. Πλοηγηθείτε στο Developer -> Extrinsics\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"launch/extrinsics.jpg\"}}),_c('h2',{attrs:{\"id\":\"2-επιλέξτε-launch---launch-από-την-αναπτυσσόμενη-λίστα-πιθανών-extrinsics\"}},[_c('a',{attrs:{\"href\":\"#2-%CE%B5%CF%80%CE%B9%CE%BB%CE%AD%CE%BE%CF%84%CE%B5-launch---launch-%CE%B1%CF%80%CF%8C-%CF%84%CE%B7%CE%BD-%CE%B1%CE%BD%CE%B1%CF%80%CF%84%CF%85%CF%83%CF%83%CF%8C%CE%BC%CE%B5%CE%BD%CE%B7-%CE%BB%CE%AF%CF%83%CF%84%CE%B1-%CF%80%CE%B9%CE%B8%CE%B1%CE%BD%CF%8E%CE%BD-extrinsics\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"2. Επιλέξτε launch -> launch από την αναπτυσσόμενη λίστα πιθανών extrinsics\")]),_c('p',[_vm._v(\"Επίσης, επιλέξτε έναν λογαριασμό στον οποίο θέλετε να υποβάλετε το extrinsic. Συμπληρώστε τη διεύθυνση προορισμού και το πεδίο παραμέτρου.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"launch/launch.jpg\"}}),_c('robo-wiki-note',{attrs:{\"type\":\"note\",\"title\":\"32 bytes\"}},[_c('ul',[_c('li',[_vm._v(\"Η εκκίνηση υποστηρίζει συμβολοσειρές μήκους 32 byte ως εντολές (\"),_c('a',{attrs:{\"href\":\"https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"πηγή\")]),_vm._v(\"),\\nοπότε υπάρχει χώρος για αυτοσχεδιασμό εδώ:\")]),_c('li',[_vm._v(\"Για βασικές εντολές όπως η εναλλαγή μπορείτε να χρησιμοποιήσετε \\\"0x000000000000000000000000000000000000000000000000000000000001\\\" ή\\n\\\"0x0000000000000000000000000000000000000000000000000000000000000000000000000.\")]),_c('li',[_vm._v(\"Για προχωρημένες εντολές, συμπεριλαμβανομένων json-like, μπορείτε να χρησιμοποιήσετε \"),_c('a',{attrs:{\"href\":\"https://ipfs.tech/\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"IPFS\")]),_vm._v(\" CID μορφοποιημένο σε\\n\"),_c('a',{attrs:{\"href\":\"https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"σωστός τρόπος\")]),_vm._v(\".\")])])]),_c('h2',{attrs:{\"id\":\"3-υποβολή-συναλλαγής\"}},[_c('a',{attrs:{\"href\":\"#3-%CF%85%CF%80%CE%BF%CE%B2%CE%BF%CE%BB%CE%AE-%CF%83%CF%85%CE%BD%CE%B1%CE%BB%CE%BB%CE%B1%CE%B3%CE%AE%CF%82\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"3. Υποβολή συναλλαγής\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"launch/submit.jpg\"}}),_c('h2',{attrs:{\"id\":\"4-ελέγξτε-την-εκκίνησή-σας-στα-events\"}},[_c('a',{attrs:{\"href\":\"#4-%CE%B5%CE%BB%CE%AD%CE%B3%CE%BE%CF%84%CE%B5-%CF%84%CE%B7%CE%BD-%CE%B5%CE%BA%CE%BA%CE%AF%CE%BD%CE%B7%CF%83%CE%AE-%CF%83%CE%B1%CF%82-%CF%83%CF%84%CE%B1-events\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"4. Ελέγξτε την εκκίνησή σας στα events\")]),_c('p',[_vm._v(\"Για αυτό, πλοηγηθείτε στο \"),_c('em',[_vm._v(\"Network -> Explorer\")]),_vm._v(\" και βρείτε μια λίστα με events στα δεξιά. Κάντε κλικ σε ένα εικονίδιο τριγώνου για να το αναπτύξετε.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"launch/event.jpg\"}})],1)}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/el/launch.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%224964dc46-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "4Kev":
/*!*******************************************************************************!*\
  !*** ./docs/el/launch.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./launch.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"E5Cv\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/el/launch.md?");

/***/ }),

/***/ "E5Cv":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/el/launch.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/el/launch.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "Fpm4":
/*!**********************************************************!*\
  !*** ./docs/el/launch.md?vue&type=template&id=e22688ae& ***!
  \**********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_template_id_e22688ae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"4964dc46-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./launch.md?vue&type=template&id=e22688ae& */ \"4Btw\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_template_id_e22688ae___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_template_id_e22688ae___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/el/launch.md?");

/***/ }),

/***/ "JZ9j":
/*!***************************!*\
  !*** ./docs/el/launch.md ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _launch_md_vue_type_template_id_e22688ae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./launch.md?vue&type=template&id=e22688ae& */ \"Fpm4\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./launch.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"4Kev\");\n/* harmony import */ var _launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"mPYo\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _launch_md_vue_type_template_id_e22688ae___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _launch_md_vue_type_template_id_e22688ae___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/el/launch.md?");

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

/***/ "mPYo":
/*!************************************************************************************!*\
  !*** ./docs/el/launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"01lq\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/el/launch.md?");

/***/ })

}]);