(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--uk--use-blueprints-md"],{

/***/ "+1De":
/*!******************************************************************!*\
  !*** ./docs/uk/use-blueprints.md?vue&type=template&id=021141fd& ***!
  \******************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_template_id_021141fd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"4964dc46-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./use-blueprints.md?vue&type=template&id=021141fd& */ \"4WZk\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_template_id_021141fd___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_4964dc46_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_template_id_021141fd___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/uk/use-blueprints.md?");

/***/ }),

/***/ "4WZk":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"4964dc46-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/uk/use-blueprints.md?vue&type=template&id=021141fd& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('p',[_vm._v(\"У цій статті ви дізнаєтеся, як додати автоматизаційні шаблони до вашого Home Assistant та налаштувати їх.\")]),_c('h2',{attrs:{\"id\":\"автоматизації-на-основі-шаблонів\"}},[_c('a',{attrs:{\"href\":\"#%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D0%B7%D0%B0%D1%86%D1%96%D1%97-%D0%BD%D0%B0-%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D1%96-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%D1%96%D0%B2\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Автоматизації на основі шаблонів\")]),_c('p',[_vm._v(\"Деякі шаблони уже встановлені. Автоматизації на основі таких шаблонів потребують лише налаштування. У веб-інтерфейсі ви можете знайти попередньо встановлені шаблони в розділі \"),_c('code',{pre:true},[_vm._v(\"Settings/Automations & Scenes\")]),_vm._v(\". Відкрийте \"),_c('code',{pre:true},[_vm._v(\"Blueprints\")]),_vm._v(\" та знайдіть шаблон, який ви хочете використовувати. У цьому прикладі буде використано \"),_c('code',{pre:true},[_vm._v(\"Motion-activated Light\")]),_vm._v(\".\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/blueprint-settings.jpg\",\"alt\":\"Blueprint Settings\"}}),_c('p',[_vm._v(\"Клацніть \"),_c('code',{pre:true},[_vm._v(\"Create Automation\")]),_vm._v(\",  щоб відкрити редактор автоматизацій. Вкажіть назву, виберіть шаблон для використання (\"),_c('code',{pre:true},[_vm._v(\"Motion-activated Light\")]),_vm._v(\" у нашому випадку). Після цього вам потрібно вибрати датчик руху та лампу. Коли налаштування завершено, клацніть \"),_c('code',{pre:true}),_vm._v(\"Save`.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/automation-configure.jpg\",\"alt\":\"Automation Конфігурація\"}}),_c('p',[_vm._v(\"Якщо ви хочете внести зміни, ви можете знайти їх, перейшовши до \"),_c('code',{pre:true},[_vm._v(\"Settings/Automations & Scenes\")]),_vm._v(\", а потім \"),_c('code',{pre:true},[_vm._v(\"Automations\")]),_vm._v(\". \")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/automations-all.jpg\",\"alt\":\"Automations List\"}}),_c('h2',{attrs:{\"id\":\"імпорт-шаблонів\"}},[_c('a',{attrs:{\"href\":\"#%D1%96%D0%BC%D0%BF%D0%BE%D1%80%D1%82-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%D1%96%D0%B2\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Імпорт шаблонів\")]),_c('p',[_vm._v(\"Home Assistant мож імпортувати шаблони з форумів Home Assistant, GitHub та GitHub gists. Список всіх шаблонів розташований на \"),_c('a',{attrs:{\"href\":\"https://community.home-assistant.io/c/blueprints-exchange/53\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"Біржі шаблонів\")]),_vm._v(\". Після вибору перейдіть до \"),_c('code',{pre:true},[_vm._v(\"Settings/Automations & Scenes\")]),_vm._v(\" та відкрийте \"),_c('code',{pre:true},[_vm._v(\"Blueprints\")]),_vm._v(\". Клацніть \"),_c('code',{pre:true},[_vm._v(\"Import Blueprint\")]),_vm._v(\" та вставте URL обраного шаблону. Потім клацніть \"),_c('code',{pre:true},[_vm._v(\"PREVIEW BLUEPRINT\")]),_vm._v(\". У цьому випадку ми використовуватимемо \"),_c('a',{attrs:{\"href\":\"https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"Виявлення та сповіщення про низький рівень заряду батареї для всіх датчиків батареї\")]),_vm._v(\". \")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/importing-blueprint.jpg\",\"alt\":\"Importing Blueprint\"}}),_c('p',[_vm._v(\"Це завантажить шаблон та покаже попередній перегляд у діалоговому вікні імпорту. Ви можете змінити назву та завершити імпорт. Клацніть \"),_c('code',{pre:true},[_vm._v(\"Create Automation\")]),_vm._v(\", щоб відкрити редактор автоматизацій. Тут ви можете налаштувати параметри автоматизації та додати дії для отримання сповіщень.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/configure-battery-blueprint.jpg\",\"alt\":\"Configure Battery Blueprint\"}})],1)}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/uk/use-blueprints.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%224964dc46-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "NE4q":
/*!********************************************************************************************!*\
  !*** ./docs/uk/use-blueprints.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./use-blueprints.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"jYzp\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/uk/use-blueprints.md?");

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

/***/ "X4u7":
/*!***************************************************************************************!*\
  !*** ./docs/uk/use-blueprints.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./use-blueprints.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"fwlk\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/uk/use-blueprints.md?");

/***/ }),

/***/ "cYrj":
/*!***********************************!*\
  !*** ./docs/uk/use-blueprints.md ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _use_blueprints_md_vue_type_template_id_021141fd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-blueprints.md?vue&type=template&id=021141fd& */ \"+1De\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-blueprints.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"X4u7\");\n/* harmony import */ var _use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-blueprints.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"NE4q\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _use_blueprints_md_vue_type_template_id_021141fd___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _use_blueprints_md_vue_type_template_id_021141fd___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_use_blueprints_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_use_blueprints_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/uk/use-blueprints.md?");

/***/ }),

/***/ "fwlk":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/uk/use-blueprints.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/uk/use-blueprints.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "jYzp":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/uk/use-blueprints.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Як використовувати шаблони\",\n  \"contributors\": [\"tubleronchik\"],\n  \"tools\": [\"Home Assistant 2022.11.3 https://github.com/home-assistant/core\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/uk/use-blueprints.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ })

}]);