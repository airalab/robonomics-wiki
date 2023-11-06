(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--de--robonomics-hass-integration-md"],{

/***/ "PMuP":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/de/robonomics-hass-integration.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Robonomics Integration Setup\",\n  \"contributors\": [\"LoSk-p\", \"nakata5321\", \"Fingerling42\"],\n  \"tools\": [\"Robonomics Home Assistant Integration 1.5.9 https://github.com/airalab/homeassistant-robonomics-integration\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/de/robonomics-hass-integration.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "UQSp":
/*!****************************************************************!*\
  !*** ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// @vue/component\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'VueRemarkRoot',\n  render(h) {\n    return h('div', null, this.$slots.default);\n  }\n});\n\n//# sourceURL=webpack:///./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js?");

/***/ }),

/***/ "Zvpj":
/*!****************************************************************************************************!*\
  !*** ./docs/de/robonomics-hass-integration.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_hass_integration_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./robonomics-hass-integration.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"ihoH\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_hass_integration_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/de/robonomics-hass-integration.md?");

/***/ }),

/***/ "ihoH":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/de/robonomics-hass-integration.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/de/robonomics-hass-integration.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "kYeo":
/*!******************************************************************************!*\
  !*** ./docs/de/robonomics-hass-integration.md?vue&type=template&id=0dd98e2a ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_524ceff2_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_hass_integration_md_vue_type_template_id_0dd98e2a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"524ceff2-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/babel-loader/lib??ref--1-1!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./robonomics-hass-integration.md?vue&type=template&id=0dd98e2a */ \"xLh1\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_524ceff2_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_hass_integration_md_vue_type_template_id_0dd98e2a__WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_524ceff2_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_hass_integration_md_vue_type_template_id_0dd98e2a__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/de/robonomics-hass-integration.md?");

/***/ }),

/***/ "lolW":
/*!************************************************!*\
  !*** ./docs/de/robonomics-hass-integration.md ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _robonomics_hass_integration_md_vue_type_template_id_0dd98e2a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./robonomics-hass-integration.md?vue&type=template&id=0dd98e2a */ \"kYeo\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _robonomics_hass_integration_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./robonomics-hass-integration.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"Zvpj\");\n/* harmony import */ var _robonomics_hass_integration_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./robonomics-hass-integration.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"q4vm\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _robonomics_hass_integration_md_vue_type_template_id_0dd98e2a__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _robonomics_hass_integration_md_vue_type_template_id_0dd98e2a__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _robonomics_hass_integration_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_robonomics_hass_integration_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _robonomics_hass_integration_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_robonomics_hass_integration_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/de/robonomics-hass-integration.md?");

/***/ }),

/***/ "q4vm":
/*!*********************************************************************************************************!*\
  !*** ./docs/de/robonomics-hass-integration.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_hass_integration_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./robonomics-hass-integration.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"PMuP\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_hass_integration_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/de/robonomics-hass-integration.md?");

/***/ }),

/***/ "xLh1":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"524ceff2-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/de/robonomics-hass-integration.md?vue&type=template&id=0dd98e2a ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c('VueRemarkRoot', [_c('p', [_c('strong', [_vm._v(\"In diesem Artikel fügen Sie Robonomics zu Home Assistant hinzu. Dadurch kann Home Assistant Datalogs mit verschlüsselten Daten auf Robonomics Parachain aufzeichnen und Startbefehle von der Parachain empfangen, um intelligente Geräte zu steuern. Die Integration verwendet IPFS, um Daten zu speichern und IPFS-Hashes an Datalog- oder Startfunktionen zu senden.\")])]), _c('robo-wiki-video', {\n    attrs: {\n      \"autoplay\": \"\",\n      \"loop\": \"\",\n      \"controls\": \"\",\n      \"videos\": [{\n        src: 'https://cloudflare-ipfs.com/ipfs/QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD',\n        type: 'mp4'\n      }]\n    }\n  }), _c('ol', [_c('li', [_c('p', [_vm._v(\"Gehen Sie im Webinterface von Home Assistant zu \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Settings\")]), _vm._v(\" -> \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Device & Services\")]), _vm._v(\" und klicken Sie auf \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"ADD INTEGRATION\")]), _vm._v(\". Suchen Sie nach \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Robonomics\")]), _vm._v(\".\")])]), _c('li', [_c('p', [_vm._v(\"Klicken Sie auf Robonomics und füllen Sie die Konfiguration aus: \")])])]), _c('ul', [_c('li', [_vm._v(\"Fügen Sie den Seed des \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"SUB_CONTROLLER\")]), _vm._v(\"-Kontos zum Controller-Kontoseed hinzu.\")]), _c('li', [_vm._v(\"Fügen Sie die öffentliche Adresse des \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"SUB_OWNER\")]), _vm._v(\"-Kontos zur Abonnementbesitzeradresse hinzu.\")]), _c('li', [_vm._v(\"Legen Sie das Intervall für das Senden von Daten fest (standardmäßig 10 Minuten).\")]), _c('li', [_vm._v(\"(Optional) Sie können Anmeldeinformationen für den Pinning-Dienst Pinata oder ein anderes benutzerdefiniertes Gateway hinzufügen, um Ihre Daten breiter im IPFS-Netzwerk zu verteilen.\")])]), _c('ol', {\n    attrs: {\n      \"start\": \"3\"\n    }\n  }, [_c('li', [_vm._v(\"Drücken Sie nach Abschluss der Konfiguration \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"SUBMIT\")]), _vm._v(\". Wenn Sie alles korrekt ausgefüllt haben, sehen Sie das Erfolgsfenster.\")])]), _c('p', [_vm._v(\"Das ist alles! Sie haben Robonomics Integration vollständig in Home Assistant eingerichtet. Jetzt können Sie alle Robonomics-Webdienste nutzen. Um mehr darüber zu erfahren, gehen Sie zum \"), _c('a', {\n    attrs: {\n      \"href\": \"/docs/global-administration\"\n    }\n  }, [_vm._v(\"\\\"Verwendung\\\"-Abschnitt\")]), _vm._v(\".\")])], 1);\n};\nvar staticRenderFns = [];\n\n\n//# sourceURL=webpack:///./docs/de/robonomics-hass-integration.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%22524ceff2-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ })

}]);