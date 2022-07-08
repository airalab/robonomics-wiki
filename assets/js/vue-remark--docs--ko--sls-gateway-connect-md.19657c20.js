(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--ko--sls-gateway-connect-md"],{

/***/ "/2Ga":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ko/sls-gateway-connect.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/ko/sls-gateway-connect.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "FjiL":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"564eb8b5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ko/sls-gateway-connect.md?vue&type=template&id=0c56cf02& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('h2',{attrs:{\"id\":\"mqtt-integration\"}},[_c('a',{attrs:{\"href\":\"#mqtt-integration\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"MQTT Integration\")]),_c('p',[_vm._v(\"Now you need to add MQTT integration to Home Assistant. Open web interface then go to \"),_c('code',{pre:true},[_vm._v(\"Configuration/Integrations\")]),_vm._v(\" page and press \"),_c('code',{pre:true},[_vm._v(\"Add Integration\")]),_vm._v(\" button. Find MQTT:\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/mqtt.jpg\"}}),_c('p',[_vm._v(\"Press on it and set up your brocker address (localhost), port (1883) and your username and password (default \"),_c('code',{pre:true},[_vm._v(\"user\")]),_vm._v(\" and \"),_c('code',{pre:true},[_vm._v(\"pass\")]),_vm._v(\" if you haven't changed it \"),_c('a',{attrs:{\"href\":\"/docs/raspberry-setup/\"}},[_vm._v(\"here\")]),_vm._v(\"), then press \"),_c('code',{pre:true},[_vm._v(\"submit\")]),_vm._v(\":\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/mqtt-setup.jpg\"}}),_c('p',[_vm._v(\"Then press on three dots on MQTT integration and choose \"),_c('code',{pre:true},[_vm._v(\"System Options\")]),_vm._v(\" and check if automatically adding new devices is enabled:\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/add-dev.jpg\"}}),_c('h2',{attrs:{\"id\":\"mqtt-on-sls-gateway\"}},[_c('a',{attrs:{\"href\":\"#mqtt-on-sls-gateway\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"MQTT on SLS Gateway\")]),_c('p',[_vm._v(\"Also you need to configure MQTT on SLS Gateway. Come back to your \"),_c('a',{attrs:{\"href\":\"https://wiki.robonomics.network/docs/en/sls-setup/#setup\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"SLS Gateway\")]),_vm._v(\" go to \"),_c('code',{pre:true},[_vm._v(\"Settings/Link\")]),_vm._v(\" -> \"),_c('code',{pre:true},[_vm._v(\"MQTT Setup\")]),_vm._v(\":\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/sls-mqtt-menu.jpg\"}}),_c('p',[_vm._v(\"And add your brocker address (address of the Raspberry Pi with Home Assistant in local network), port (1883) and your brocker username and password (default \"),_c('code',{pre:true},[_vm._v(\"user\")]),_vm._v(\" and \"),_c('code',{pre:true},[_vm._v(\"pass\")]),_vm._v(\" if you haven't changed it \"),_c('a',{attrs:{\"href\":\"/docs/raspberry-setup/\"}},[_vm._v(\"here\")]),_vm._v(\"). Also write the topic name (you can choose any). \")]),_c('robo-wiki-note',{attrs:{\"type\":\"warning\"}},[_vm._v(\"Don't forget to tick `Enable` and `Retain states`.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/sls-mqtt1.jpg\"}}),_c('p',[_vm._v(\"Save changes. Now devices will be automatically shown in Home Assistant.\")]),_c('p',[_vm._v(\"After that you can connect your devices to Robonomics with this \"),_c('a',{attrs:{\"href\":\"/docs/add-smart-device-to-robonomics\"}},[_vm._v(\"instruction\")]),_vm._v(\".\")])],1)}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/ko/sls-gateway-connect.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%22564eb8b5-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "PiV/":
/*!********************************************************************************************!*\
  !*** ./docs/ko/sls-gateway-connect.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_sls_gateway_connect_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./sls-gateway-connect.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"/2Ga\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_sls_gateway_connect_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ko/sls-gateway-connect.md?");

/***/ }),

/***/ "SSRN":
/*!*************************************************************************************************!*\
  !*** ./docs/ko/sls-gateway-connect.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_sls_gateway_connect_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./sls-gateway-connect.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"jGyW\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_sls_gateway_connect_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ko/sls-gateway-connect.md?");

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

/***/ "fM6I":
/*!***********************************************************************!*\
  !*** ./docs/ko/sls-gateway-connect.md?vue&type=template&id=0c56cf02& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_564eb8b5_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_sls_gateway_connect_md_vue_type_template_id_0c56cf02___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"564eb8b5-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./sls-gateway-connect.md?vue&type=template&id=0c56cf02& */ \"FjiL\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_564eb8b5_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_sls_gateway_connect_md_vue_type_template_id_0c56cf02___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_564eb8b5_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_sls_gateway_connect_md_vue_type_template_id_0c56cf02___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/ko/sls-gateway-connect.md?");

/***/ }),

/***/ "jGyW":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ko/sls-gateway-connect.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Connect SLS Gateway to Home Assistant\",\n  \"contributors\": [\"LoSk-p\"],\n  \"translated\": false\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/ko/sls-gateway-connect.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "pl5L":
/*!****************************************!*\
  !*** ./docs/ko/sls-gateway-connect.md ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sls_gateway_connect_md_vue_type_template_id_0c56cf02___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sls-gateway-connect.md?vue&type=template&id=0c56cf02& */ \"fM6I\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _sls_gateway_connect_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sls-gateway-connect.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"PiV/\");\n/* harmony import */ var _sls_gateway_connect_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sls-gateway-connect.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"SSRN\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _sls_gateway_connect_md_vue_type_template_id_0c56cf02___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _sls_gateway_connect_md_vue_type_template_id_0c56cf02___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _sls_gateway_connect_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_sls_gateway_connect_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _sls_gateway_connect_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_sls_gateway_connect_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/ko/sls-gateway-connect.md?");

/***/ })

}]);