(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--el--notifications-md"],{

/***/ "++RS":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/el/notifications.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/el/notifications.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "10mP":
/*!**********************************!*\
  !*** ./docs/el/notifications.md ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _notifications_md_vue_type_template_id_2590aa38___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notifications.md?vue&type=template&id=2590aa38& */ \"h4Dw\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _notifications_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifications.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"M/c/\");\n/* harmony import */ var _notifications_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifications.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"en46\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _notifications_md_vue_type_template_id_2590aa38___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _notifications_md_vue_type_template_id_2590aa38___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _notifications_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_notifications_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _notifications_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_notifications_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/el/notifications.md?");

/***/ }),

/***/ "ICyx":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/el/notifications.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Robonomics Smart Home\",\n  \"contributors\": [\"LoSk-p\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/el/notifications.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "M/c/":
/*!**************************************************************************************!*\
  !*** ./docs/el/notifications.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_notifications_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./notifications.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"++RS\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_notifications_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/el/notifications.md?");

/***/ }),

/***/ "en46":
/*!*******************************************************************************************!*\
  !*** ./docs/el/notifications.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_notifications_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./notifications.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"ICyx\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_notifications_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/el/notifications.md?");

/***/ }),

/***/ "h4Dw":
/*!*****************************************************************!*\
  !*** ./docs/el/notifications.md?vue&type=template&id=2590aa38& ***!
  \*****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_notifications_md_vue_type_template_id_2590aa38___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"58be6945-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/babel-loader/lib??ref--1-1!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./notifications.md?vue&type=template&id=2590aa38& */ \"spmT\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_notifications_md_vue_type_template_id_2590aa38___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_notifications_md_vue_type_template_id_2590aa38___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/el/notifications.md?");

/***/ }),

/***/ "spmT":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"58be6945-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/el/notifications.md?vue&type=template&id=2590aa38& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c('VueRemarkRoot', [_c('p', [_vm._v(\"Μπορείτε να λαμβάνετε ειδοποιήσεις στο smartphone σας με το \"), _c('a', {\n    attrs: {\n      \"href\": \"https://notify.events/\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"notify\")]), _vm._v(\". Πρώτα εγγραφείτε εκεί και στο \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Control Panel\")]), _vm._v(\" δημιουργήστε νέο κανάλι:\")]), _c('p', [_c('g-image', {\n    attrs: {\n      \"src\": __webpack_require__(/*! !assets-loader?alt=control_panel!../images/home-assistant/not_control_panel.png */ \"HdCj\"),\n      \"alt\": \"control_panel\"\n    }\n  })], 1), _c('p', [_vm._v(\"Προσθέστε τίτλο και πατήστε \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Save\")]), _vm._v(\":\")]), _c('p', [_c('g-image', {\n    attrs: {\n      \"src\": __webpack_require__(/*! !assets-loader?alt=channel!../images/home-assistant/not_create_chanell.png */ \"EvOT\"),\n      \"alt\": \"channel\"\n    }\n  })], 1), _c('p', [_vm._v(\"Στη συνέχεια πατήστε \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Add Source\")]), _vm._v(\" και επιλέξτε \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Home Assistant\")]), _vm._v(\" στην καρτέλα \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"IoT και Smart Home\")]), _vm._v(\":\")]), _c('p', [_c('g-image', {\n    attrs: {\n      \"src\": __webpack_require__(/*! !assets-loader?alt=source!../images/home-assistant/not_add_source.png */ \"HhDF\"),\n      \"alt\": \"source\"\n    }\n  })], 1), _c('p', [_vm._v(\"Γράψτε τίτλο και πατήστε \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Next\")]), _vm._v(\":\")]), _c('p', [_c('g-image', {\n    attrs: {\n      \"src\": __webpack_require__(/*! !assets-loader?alt=source_next!../images/home-assistant/not_add_source_next.png */ \"eNVB\"),\n      \"alt\": \"source_next\"\n    }\n  })], 1), _c('p', [_vm._v(\"Εκεί θα δείτε το τοκέν που χρειάζεστε για να προσθέσετε στο αρχείο διαμόρφωσης για το Home Assistant. Αποθηκεύστε το κάπου και πατήστε \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Done\")]), _vm._v(\":\")]), _c('p', [_c('g-image', {\n    attrs: {\n      \"src\": __webpack_require__(/*! !assets-loader?alt=token!../images/home-assistant/not_token.png */ \"RF6Y\"),\n      \"alt\": \"token\"\n    }\n  })], 1), _c('p', [_vm._v(\"στη συνέχεια πατήστε \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Subscribe\")]), _vm._v(\" για να προσθέσετε συνδρομητές:\")]), _c('p', [_c('g-image', {\n    attrs: {\n      \"src\": __webpack_require__(/*! !assets-loader?alt=subscribe!../images/home-assistant/not_subscribe.png */ \"fZUm\"),\n      \"alt\": \"subscribe\"\n    }\n  })], 1), _c('p', [_vm._v(\"Επιλέξτε τον επιθυμητό συνδρομητή και ακολουθήστε τις οδηγίες.\")]), _c('p', [_vm._v(\"Τώρα πρέπει να επεξεργαστείτε τη διαμόρφωση στον υπολογιστή σας με το Home Assistant. Υπό τον χρήστη \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"homeassistant\")]), _vm._v(\" ανοίξτε το αρχείο \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"configuration.yaml\")]), _vm._v(\":\")]), _c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-bash\"\n    }\n  }, [_vm._v(\"sudo -u homeassistant -H -s\\nnano ~/.homeassistant/configuration.yaml\")])]), _c('p', [_vm._v(\"Και προσθέστε αυτές τις γραμμές:\")]), _c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-yaml\"\n    }\n  }, [_c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"notify_events:\")]), _vm._v(\"\\n    \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"token:\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"<your\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"token\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"from\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"notify>\")])])]), _c('p', [_vm._v(\"Προσθέστε επίσης νέα αυτοματισμό μετά τη γραμμή \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"automation:\")]), _vm._v(\":\")]), _c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-yaml\"\n    }\n  }, [_c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-bullet\"\n    }\n  }, [_vm._v(\"-\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"alias:\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"notifications\")]), _vm._v(\"\\n  \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"trigger:\")]), _vm._v(\"\\n  \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-bullet\"\n    }\n  }, [_vm._v(\"-\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"entity_id:\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"binary_sensor.contact_sensor_contact\")]), _vm._v(\"\\n    \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"platform:\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"state\")]), _vm._v(\"\\n    \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"from:\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"'off'\")]), _vm._v(\"\\n    \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"to:\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"'on'\")]), _vm._v(\"\\n  \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"action:\")]), _vm._v(\"\\n  \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-bullet\"\n    }\n  }, [_vm._v(\"-\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"service:\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"notify.notify\")]), _vm._v(\"\\n    \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"data:\")]), _vm._v(\"\\n      \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"message:\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"Door\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"was\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"changed\")]), _vm._v(\" \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"to\")]), _vm._v(\" {{ \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"states(\\\"binary_sensor.contact_sensor_contact\\\")\")]), _vm._v(\" }}\")])]), _c('p', [_vm._v(\"Αυτός ο αυτοματισμός θα στείλει το μήνυμα \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Door was changed to on/off\")]), _vm._v(\" μετά την αλλαγή της κατάστασης του αισθητήρα με αναγνωριστικό οντότητας \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"binary_sensor.contact_sensor_contact\")]), _vm._v(\" από \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"off\")]), _vm._v(\" σε \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"on\")]), _vm._v(\".\")]), _c('p', [_vm._v(\"Και επανεκκινήστε το Home Assistant:\")]), _c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-bash\"\n    }\n  }, [_vm._v(\"systemctl restart home-assistant@homeassistant.service\")])])]);\n};\nvar staticRenderFns = [];\n\n\n//# sourceURL=webpack:///./docs/el/notifications.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%2258be6945-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ })

}]);