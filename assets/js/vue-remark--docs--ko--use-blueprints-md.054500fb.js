(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--ko--use-blueprints-md"],{

/***/ "6AWc":
/*!***************************************************************************************!*\
  !*** ./docs/ko/use-blueprints.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./use-blueprints.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"ud5u\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ko/use-blueprints.md?");

/***/ }),

/***/ "Fvje":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"4964dc46-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ko/use-blueprints.md?vue&type=template&id=4abefb1e& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('p',[_vm._v(\"이 문서에서는 Home Assistant에 자동화 블루프린트를 추가하고 구성하는 방법을 알 수 있습니다.\")]),_c('h2',{attrs:{\"id\":\"블루프린트-자동화\"}},[_c('a',{attrs:{\"href\":\"#%EB%B8%94%EB%A3%A8%ED%94%84%EB%A6%B0%ED%8A%B8-%EC%9E%90%EB%8F%99%ED%99%94\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"블루프린트 자동화\")]),_c('p',[_vm._v(\"일부 블루프린트는 이미 설치되어 있습니다. 이러한 블루프린트를 기반으로 한 자동화는 구성만 해주면 니다. 웹 인터페이스에서는 \"),_c('code',{pre:true},[_vm._v(\"Settings/Automations & Scenes\")]),_vm._v(\"에서 미리 설치된 블루프린트를 찾을 수 있습니다. \"),_c('code',{pre:true},[_vm._v(\"Blueprints\")]),_vm._v(\"를 열고 사용하려는 블루프린트를 찾으세요. 이 예제에서는 \"),_c('code',{pre:true},[_vm._v(\"Motion-activated Light\")]),_vm._v(\"를 사용합니다. \")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/blueprint-settings.jpg\",\"alt\":\"Blueprint Settings\"}}),_c('p',[_c('code',{pre:true},[_vm._v(\"Create Automation\")]),_vm._v(\"을 클릭하여 자동화 편집기를 엽니다. 이름을 지정하고 사용할 블루프린트를 선택하세요 (우리의 경우 \"),_c('code',{pre:true},[_vm._v(\"Motion-activated Light\")]),_vm._v(\"). 그 후 모션 센서와 램프를 선택해야 합니다. 구성이 완료되면 \"),_c('code',{pre:true},[_vm._v(\"Save\")]),_vm._v(\"을 클릭하세요.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/automation-configure.jpg\",\"alt\":\"Automation 구성\"}}),_c('p',[_vm._v(\"변경 사항을 만들고 싶다면 \"),_c('code',{pre:true},[_vm._v(\"Settings/Automations & Scenes\")]),_vm._v(\"으로 이동한 다음 \"),_c('code',{pre:true},[_vm._v(\"Automations\")]),_vm._v(\"를 찾으세요. \")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/automations-all.jpg\",\"alt\":\"Automations List\"}}),_c('h2',{attrs:{\"id\":\"블루프린트-가져오기\"}},[_c('a',{attrs:{\"href\":\"#%EB%B8%94%EB%A3%A8%ED%94%84%EB%A6%B0%ED%8A%B8-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"블루프린트 가져오기\")]),_c('p',[_vm._v(\"Home Assistant는 Home Assistant 포럼, GitHub 및 GitHub gists에서 블루프린트를 가져올 수 있습니다. 모든 블루프린트 목록은 \"),_c('a',{attrs:{\"href\":\"https://community.home-assistant.io/c/blueprints-exchange/53\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"블루프린트 교환\")]),_vm._v(\"에서 찾을 수 있습니다. 선택한 후 \"),_c('code',{pre:true},[_vm._v(\"Settings/Automations & Scenes\")]),_vm._v(\"으로 이동하여 \"),_c('code',{pre:true},[_vm._v(\"Blueprints\")]),_vm._v(\"를 엽니다. \"),_c('code',{pre:true},[_vm._v(\"Import Blueprint\")]),_vm._v(\"를 클릭하고 선택한 블루프린트의 URL을 입력하세요. 그런 다음 \"),_c('code',{pre:true},[_vm._v(\"PREVIEW BLUEPRINT\")]),_vm._v(\"를 클릭하세요. 이 경우 \"),_c('a',{attrs:{\"href\":\"https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"모든 배터리 센서에 대한 저전압 감지 및 알림\")]),_vm._v(\"를 사용합니다. \")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/importing-blueprint.jpg\",\"alt\":\"Importing Blueprint\"}}),_c('p',[_vm._v(\"이렇게 하면 블루프린트가 로드되고 가져오기 대화 상자에서 미리보기가 표시됩니다. 이름을 변경하고 가져오기를 완료할 수 있습니다. \"),_c('code',{pre:true},[_vm._v(\"Create Automation\")]),_vm._v(\"을 클릭하여 자동화 편집기를 엽니다. 여기에서 자동화 매개변수를 구성하고 알림을 받기 위한 작업을 추가할 수 있습니다.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/configure-battery-blueprint.jpg\",\"alt\":\"Configure Battery Blueprint\"}})],1)}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/ko/use-blueprints.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%224964dc46-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "GKCx":
/*!***********************************!*\
  !*** ./docs/ko/use-blueprints.md ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _use_blueprints_md_vue_type_template_id_4abefb1e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-blueprints.md?vue&type=template&id=4abefb1e& */ \"gIFd\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-blueprints.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"6AWc\");\n/* harmony import */ var _use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-blueprints.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"MS96\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _use_blueprints_md_vue_type_template_id_4abefb1e___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _use_blueprints_md_vue_type_template_id_4abefb1e___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/ko/use-blueprints.md?");

/***/ }),

/***/ "MS96":
/*!********************************************************************************************!*\
  !*** ./docs/ko/use-blueprints.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./use-blueprints.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"RAsG\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ko/use-blueprints.md?");

/***/ }),

/***/ "RAsG":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ko/use-blueprints.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"블루프린트 사용 방법\",\n  \"contributors\": [\"tubleronchik\"],\n  \"tools\": [\"Home Assistant 2022.11.3 https://github.com/home-assistant/core\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/ko/use-blueprints.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

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

/***/ "gIFd":
/*!******************************************************************!*\
  !*** ./docs/ko/use-blueprints.md?vue&type=template&id=4abefb1e& ***!
  \******************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_template_id_4abefb1e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"4964dc46-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./use-blueprints.md?vue&type=template&id=4abefb1e& */ \"Fvje\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_template_id_4abefb1e___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_template_id_4abefb1e___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/ko/use-blueprints.md?");

/***/ }),

/***/ "ud5u":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ko/use-blueprints.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/ko/use-blueprints.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ })

}]);