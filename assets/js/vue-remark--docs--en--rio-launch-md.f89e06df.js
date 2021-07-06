(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--en--rio-launch-md"],{

/***/ "1nZs":
/*!***********************************************************************************!*\
  !*** ./docs/en/rio-launch.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_rio_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./rio-launch.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"lsnM\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_rio_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/en/rio-launch.md?");

/***/ }),

/***/ "AjUM":
/*!*******************************!*\
  !*** ./docs/en/rio-launch.md ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rio_launch_md_vue_type_template_id_5691293b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rio-launch.md?vue&type=template&id=5691293b& */ \"YXcu\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _rio_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rio-launch.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"1nZs\");\n/* harmony import */ var _rio_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rio-launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"vIXU\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _rio_launch_md_vue_type_template_id_5691293b___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _rio_launch_md_vue_type_template_id_5691293b___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _rio_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_rio_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _rio_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_rio_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/en/rio-launch.md?");

/***/ }),

/***/ "Rx6t":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/en/rio-launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Robonomics IO Launch\",\n  \"contributors\": [\"Vourhey\", \"PaTara43\"],\n  \"translated\": true\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/en/rio-launch.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

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

/***/ "UrBU":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"108a2ad9-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/en/rio-launch.md?vue&type=template&id=5691293b& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('p',[_vm._v(\"A simple way to turn on and off an IoT device or a robot. Basically sending \\\"ON\\\" will result in \"),_c('code',{pre:true},[_vm._v(\"true\")]),_vm._v(\" state for a device, anything else will result in \"),_c('code',{pre:true},[_vm._v(\"false\")]),_vm._v(\".\")]),_c('p',[_vm._v(\"For the examples the development network is used. Check \"),_c('a',{attrs:{\"href\":\"/docs/robonomics-test-network-manual/\"}},[_vm._v(\"this\")]),_vm._v(\" out to set it up for yourself.\")]),_c('h2',{attrs:{\"id\":\"requirements\"}},[_c('a',{attrs:{\"href\":\"#requirements\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Requirements\")]),_c('ul',[_c('li',[_c('code',{pre:true},[_vm._v(\"robonomics\")]),_c('a',{attrs:{\"href\":\"https://github.com/airalab/robonomics/releases\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"executable\")])]),_c('li',[_vm._v(\"Accounts on parachain\")])]),_c('p',[_vm._v(\"You can find instructions on how to create an account \"),_c('a',{attrs:{\"href\":\"/docs/create-account-in-dapp\"}},[_vm._v(\"here\")])]),_c('h2',{attrs:{\"id\":\"usage\"}},[_c('a',{attrs:{\"href\":\"#usage\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Usage\")]),_c('p',[_vm._v(\"To see the result of transaction first of all run \"),_c('code',{pre:true},[_vm._v(\"read\")]),_vm._v(\" part:\")]),_c('pre',[_c('code',{pre:true},[_vm._v(\"% ./robonomics io read launch\\n\")])]),_c('p',[_vm._v(\"Now let's turn a robot on:\")]),_c('pre',[_c('code',{pre:true},[_vm._v(\"% echo \\\"ON\\\" | ./robonomics io write launch -r 5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL -s 0xb046fc3c322e91e14a61ad4f08a3809ee0de7092e73aa9b3c2b642a0f476d4d6\\n\")])]),_c('p',[_vm._v(\"Then you should see in the first terminal window:\")]),_c('pre',[_c('code',{pre:true},[_vm._v(\"% ./robonomics io read launch\\n5H3iRnX16DH2sb2RLxMM8UhDZTvJjP84EhhKXv3sCiEDq6bH >> 5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL : true\\n\")])]),_c('p',[_vm._v(\"Let's describe all the accounts and options above.\")]),_c('ul',[_c('li',[_c('code',{pre:true},[_vm._v(\"-r 5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL\")]),_vm._v(\" means robot's address\")]),_c('li',[_c('code',{pre:true},[_vm._v(\"-s 0xb046fc3c322e91e14a61ad4f08a3809ee0de7092e73aa9b3c2b642a0f476d4d6\")]),_vm._v(\" private key of the account to launch from (must have tokens for a transaction)\")]),_c('li',[_c('code',{pre:true},[_vm._v(\"5H3iRnX16DH2sb2RLxMM8UhDZTvJjP84EhhKXv3sCiEDq6bH\")]),_vm._v(\" address that launches a robot\")]),_c('li',[_c('code',{pre:true},[_vm._v(\"true\")]),_vm._v(\" turn it on\")])]),_c('p',[_vm._v(\"If we pass anything else but \\\"ON\\\" the state becomes \"),_c('code',{pre:true},[_vm._v(\"false\")])]),_c('h2',{attrs:{\"id\":\"remote\"}},[_c('a',{attrs:{\"href\":\"#remote\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Remote\")]),_c('p',[_vm._v(\"If your local node is configured differently from defaults or you have a remote node, it's possible to specify it with \"),_c('code',{pre:true},[_vm._v(\"--remote\")]),_vm._v(\" option\")]),_c('pre',[_c('code',{pre:true},[_vm._v(\"% echo \\\"ON\\\" | ./robonomics io write launch -r 5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL -s 0xb046fc3c322e91e14a61ad4f08a3809ee0de7092e73aa9b3c2b642a0f476d4d6 --remote https://ipfs.infura.io:5001/\\n\")])]),_c('p',[_vm._v(\"and\")]),_c('pre',[_c('code',{pre:true},[_vm._v(\"% ./robonomics io read launch --remote https://ipfs.infura.io:5001/\\n\")])])])}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/en/rio-launch.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%22108a2ad9-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "YXcu":
/*!**************************************************************!*\
  !*** ./docs/en/rio-launch.md?vue&type=template&id=5691293b& ***!
  \**************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_108a2ad9_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_rio_launch_md_vue_type_template_id_5691293b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"108a2ad9-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./rio-launch.md?vue&type=template&id=5691293b& */ \"UrBU\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_108a2ad9_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_rio_launch_md_vue_type_template_id_5691293b___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_108a2ad9_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_rio_launch_md_vue_type_template_id_5691293b___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/en/rio-launch.md?");

/***/ }),

/***/ "lsnM":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/en/rio-launch.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/en/rio-launch.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "vIXU":
/*!****************************************************************************************!*\
  !*** ./docs/en/rio-launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_rio_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./rio-launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"Rx6t\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_rio_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/en/rio-launch.md?");

/***/ })

}]);