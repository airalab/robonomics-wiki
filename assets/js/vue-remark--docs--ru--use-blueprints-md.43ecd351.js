(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--ru--use-blueprints-md"],{

/***/ "2jfv":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/use-blueprints.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Как использовать чертежи\",\n  \"contributors\": [\"tubleronchik\"],\n  \"tools\": [\"Home Assistant 2022.11.3 https://github.com/home-assistant/core\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/ru/use-blueprints.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "A+Kl":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"4964dc46-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/use-blueprints.md?vue&type=template&id=35067f30& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('p',[_vm._v(\"В этой статье вы узнаете, как добавить автоматические чертежи в свой Home Assistant и настроить их.\")]),_c('h2',{attrs:{\"id\":\"автоматизация-чертежей\"}},[_c('a',{attrs:{\"href\":\"#%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F-%D1%87%D0%B5%D1%80%D1%82%D0%B5%D0%B6%D0%B5%D0%B9\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Автоматизация чертежей\")]),_c('p',[_vm._v(\"Некоторые чертежи уже установлены. Автоматизации, основанные на таких чертежах, нужно только настроить. В веб-интерфейсе вы можете найти предустановленные чертежи в \"),_c('code',{pre:true},[_vm._v(\"Settings/Automations & Scenes\")]),_vm._v(\". Откройте \"),_c('code',{pre:true},[_vm._v(\"Blueprints\")]),_vm._v(\" и найдите нужный вам чертеж. В этом примере будет использоваться \"),_c('code',{pre:true},[_vm._v(\"Motion-activated Light\")]),_vm._v(\". \")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/blueprint-settings.jpg\",\"alt\":\"Blueprint Settings\"}}),_c('p',[_vm._v(\"Нажмите на \"),_c('code',{pre:true},[_vm._v(\"Create Automation\")]),_vm._v(\", чтобы открыть редактор автоматизации. Дайте имя, выберите чертеж для использования (\"),_c('code',{pre:true},[_vm._v(\"Motion-activated Light\")]),_vm._v(\" в нашем случае). После этого вам нужно выбрать датчик движения и лампу. Когда конфигурация завершена, нажмите \"),_c('code',{pre:true},[_vm._v(\"Save\")]),_vm._v(\".\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/automation-configure.jpg\",\"alt\":\"Automation Настройка\"}}),_c('p',[_vm._v(\"Если вы хотите внести изменения, вы можете найти их, перейдя в \"),_c('code',{pre:true},[_vm._v(\"Settings/Automations & Scenes\")]),_vm._v(\", а затем \"),_c('code',{pre:true},[_vm._v(\"Automations\")]),_vm._v(\". \")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/automations-all.jpg\",\"alt\":\"Automations List\"}}),_c('h2',{attrs:{\"id\":\"импорт-чертежей\"}},[_c('a',{attrs:{\"href\":\"#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82-%D1%87%D0%B5%D1%80%D1%82%D0%B5%D0%B6%D0%B5%D0%B9\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Импорт чертежей\")]),_c('p',[_vm._v(\"Home Assistant может импортировать чертежи из  Home Assistant, GitHub и GitHub gists. Список всех чертежей находится на \"),_c('a',{attrs:{\"href\":\"https://community.home-assistant.io/c/blueprints-exchange/53\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"Бирже чертежей\")]),_vm._v(\". После выбора перейдите в \"),_c('code',{pre:true},[_vm._v(\"Settings/Automations & Scenes\")]),_vm._v(\" и откройте \"),_c('code',{pre:true},[_vm._v(\"Blueprints\")]),_vm._v(\". Нажмите на \"),_c('code',{pre:true},[_vm._v(\"Import Blueprint\")]),_vm._v(\" и вставьте URL выбранного чертежа. Затем нажмите \"),_c('code',{pre:true},[_vm._v(\"PREVIEW BLUEPRINT\")]),_vm._v(\". В этом случае мы будем использовать \"),_c('a',{attrs:{\"href\":\"https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"Обнаружение и уведомление о низком уровне заряда батареи для всех батарейных датчиков\")]),_vm._v(\". \")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/importing-blueprint.jpg\",\"alt\":\"Importing Blueprint\"}}),_c('p',[_vm._v(\"Это загрузит чертеж и покажет предварительный просмотр в диалоговом окне импорта. Вы можете изменить имя и завершить импорт. Нажмите на \"),_c('code',{pre:true},[_vm._v(\"Create Automation\")]),_vm._v(\", чтобы открыть редактор автоматизации. Здесь вы можете настроить параметры автоматизации и добавить действия для получения уведомлений.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/configure-battery-blueprint.jpg\",\"alt\":\"Configure Battery Blueprint\"}})],1)}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/ru/use-blueprints.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%224964dc46-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "F3QC":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/use-blueprints.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/ru/use-blueprints.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "HGZn":
/*!********************************************************************************************!*\
  !*** ./docs/ru/use-blueprints.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./use-blueprints.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"2jfv\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ru/use-blueprints.md?");

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

/***/ "WvfB":
/*!***********************************!*\
  !*** ./docs/ru/use-blueprints.md ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _use_blueprints_md_vue_type_template_id_35067f30___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-blueprints.md?vue&type=template&id=35067f30& */ \"gvmI\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-blueprints.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"nfJf\");\n/* harmony import */ var _use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-blueprints.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"HGZn\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _use_blueprints_md_vue_type_template_id_35067f30___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _use_blueprints_md_vue_type_template_id_35067f30___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/ru/use-blueprints.md?");

/***/ }),

/***/ "gvmI":
/*!******************************************************************!*\
  !*** ./docs/ru/use-blueprints.md?vue&type=template&id=35067f30& ***!
  \******************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_template_id_35067f30___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"4964dc46-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./use-blueprints.md?vue&type=template&id=35067f30& */ \"A+Kl\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_template_id_35067f30___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_template_id_35067f30___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/ru/use-blueprints.md?");

/***/ }),

/***/ "nfJf":
/*!***************************************************************************************!*\
  !*** ./docs/ru/use-blueprints.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./use-blueprints.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"F3QC\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ru/use-blueprints.md?");

/***/ })

}]);