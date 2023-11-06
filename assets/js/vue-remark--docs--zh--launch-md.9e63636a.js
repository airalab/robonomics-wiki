(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--zh--launch-md"],{

/***/ "0D/v":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/zh/launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"启动\",\n  \"contributors\": [\"PaTara43\"],\n  \"tools\": [\"Robonomics 2.3.0 https://github.com/airalab/robonomics\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/zh/launch.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "9HiZ":
/*!***************************!*\
  !*** ./docs/zh/launch.md ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _launch_md_vue_type_template_id_38953370__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./launch.md?vue&type=template&id=38953370 */ \"g7Cb\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./launch.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"yRVh\");\n/* harmony import */ var _launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"jGhi\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _launch_md_vue_type_template_id_38953370__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _launch_md_vue_type_template_id_38953370__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/zh/launch.md?");

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

/***/ "VaS6":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/zh/launch.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/zh/launch.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "g7Cb":
/*!*********************************************************!*\
  !*** ./docs/zh/launch.md?vue&type=template&id=38953370 ***!
  \*********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_524ceff2_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_template_id_38953370__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"524ceff2-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/babel-loader/lib??ref--1-1!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./launch.md?vue&type=template&id=38953370 */ \"t/0m\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_524ceff2_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_template_id_38953370__WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_524ceff2_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_template_id_38953370__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/zh/launch.md?");

/***/ }),

/***/ "jGhi":
/*!************************************************************************************!*\
  !*** ./docs/zh/launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./launch.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"0D/v\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/zh/launch.md?");

/***/ }),

/***/ "t/0m":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"524ceff2-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/zh/launch.md?vue&type=template&id=38953370 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c('VueRemarkRoot', [_c('p', [_c('strong', [_vm._v(\"Another basic feature of Robonomics parachain is the 启动 pallet. It allows you to send commands to the accounts/any entities behind them. These commands include parameter to specify the task to be executed.\")])]), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"warning\",\n      \"title\": \"Dev Node\"\n    }\n  }, [_c('p', [_vm._v(\"  请注意，此教程及其后续教程是在Robonomics节点的本地实例上演示的。请按照\"), _c('a', {\n    attrs: {\n      \"href\": \"/docs/run-dev-node\"\n    }\n  }, [_vm._v(\"这些说明\")]), _vm._v(\"设置您自己的节点。\")])]), _c('h2', {\n    attrs: {\n      \"id\": \"1-1-导航到-developer---extrinsics\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#1-1-%E5%AF%BC%E8%88%AA%E5%88%B0-developer---extrinsics\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"1. 1. 导航到 Developer -> Extrinsics\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"launch/extrinsics.jpg\"\n    }\n  }), _c('h2', {\n    attrs: {\n      \"id\": \"2-从可能的外部变量的下拉列表中选择-launch---launch\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#2-%E4%BB%8E%E5%8F%AF%E8%83%BD%E7%9A%84%E5%A4%96%E9%83%A8%E5%8F%98%E9%87%8F%E7%9A%84%E4%B8%8B%E6%8B%89%E5%88%97%E8%A1%A8%E4%B8%AD%E9%80%89%E6%8B%A9-launch---launch\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"2. 从可能的外部变量的下拉列表中选择 launch -> launch\")]), _c('p', [_vm._v(\"还要选择要提交外部操作的账户。填写目标地址和参数字段。\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"launch/launch.jpg\"\n    }\n  }), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"note\",\n      \"title\": \"32 bytes\"\n    }\n  }, [_c('p', [_vm._v(\"  Launch 支持 32 字节长的字符串作为命令（\"), _c('a', {\n    attrs: {\n      \"href\": \"https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"来源\")]), _vm._v(\"），\\n  所以这里有一个即兴创作的空间：\")]), _c('ul', [_c('li', [_vm._v(\"对于切换等基本命令，您可以使用“0x0000000000000000000000000000000000000000000000000000000000000001”或\\n“0x0000000000000000000000000000000000000000000000000000000000000000”。\")]), _c('li', [_vm._v(\"对于包括 json 之类的高级命令，您可以使用 \"), _c('a', {\n    attrs: {\n      \"href\": \"https://ipfs.tech/\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"IPFS\")]), _vm._v(\" CID 格式\\n\"), _c('a', {\n    attrs: {\n      \"href\": \"https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"正确的方法\")]), _vm._v(\"。\")])])]), _c('h2', {\n    attrs: {\n      \"id\": \"3-提交交易\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#3-%E6%8F%90%E4%BA%A4%E4%BA%A4%E6%98%93\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"3. 提交交易\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"launch/submit.jpg\"\n    }\n  }), _c('h2', {\n    attrs: {\n      \"id\": \"4-在事件中查看您的启动\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#4-%E5%9C%A8%E4%BA%8B%E4%BB%B6%E4%B8%AD%E6%9F%A5%E7%9C%8B%E6%82%A8%E7%9A%84%E5%90%AF%E5%8A%A8\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"4. 在事件中查看您的启动\")]), _c('p', [_vm._v(\"为此，导航到\"), _c('em', [_vm._v(\"Network -> Explorer\")]), _vm._v(\"，在右侧找到事件列表。点击三角形图标展开。\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"launch/event.jpg\"\n    }\n  })], 1);\n};\nvar staticRenderFns = [];\n\n\n//# sourceURL=webpack:///./docs/zh/launch.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%22524ceff2-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "yRVh":
/*!*******************************************************************************!*\
  !*** ./docs/zh/launch.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./launch.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"VaS6\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_launch_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/zh/launch.md?");

/***/ })

}]);