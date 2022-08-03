(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--ru--iot-sub-setup-md"],{

/***/ "/NS3":
/*!*******************************************************************************************!*\
  !*** ./docs/ru/iot-sub-setup.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_iot_sub_setup_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./iot-sub-setup.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"pVWa\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_iot_sub_setup_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ru/iot-sub-setup.md?");

/***/ }),

/***/ "5tFe":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"564eb8b5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/iot-sub-setup.md?vue&type=template&id=3db1ba17& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VueRemarkRoot',[_c('p',[_vm._v(\"After setting up \"),_c('a',{attrs:{\"href\":\"/docs/zigbee2-mqtt/\"}},[_vm._v(\"Zigbee2MQTT stick\")]),_vm._v(\", It is time to create robonomics parachain's accounts and buy subscription. \")]),_c('h2',{attrs:{\"id\":\"create-accounts\"}},[_c('a',{attrs:{\"href\":\"#create-accounts\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Create accounts\")]),_c('p',[_vm._v(\"First, let's create account.\")]),_c('p',[_vm._v(\"Go to \"),_c('a',{attrs:{\"href\":\"https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"Robonomics Parachain app\")]),_vm._v(\" on Polkadot / Substrate Portal. \"),_c('strong',[_vm._v(\"Check at the top left corner that you are connected to Robonomics Parachain\")]),_vm._v(\".  \")]),_c('p',[_vm._v(\"Go to \"),_c('strong',[_vm._v(\"Accounts -> Accounts\")]),_vm._v(\" and press \"),_c('code',{pre:true},[_vm._v(\"Add account\")]),_vm._v(\" button. \")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/add-account.jpg\"}}),_c('p',[_vm._v(\"You should see the following popup menu with account seed. \")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/mnemonic.jpg\"}}),_c('p',[_vm._v(\"It has two forms: \"),_c('em',[_vm._v(\"Mnemonic\")]),_vm._v(\" (human-readable) and \"),_c('em',[_vm._v(\"Raw\")]),_vm._v(\" (a sequence of digits and letters). Save the mnemonic seed phrase securely and press \"),_c('code',{pre:true},[_vm._v(\"Next\")]),_vm._v(\".\")]),_c('robo-wiki-note',{attrs:{\"type\":\"warning\"}},[_vm._v(\"\\nThen open `Advanced creation options` and change the crypto type of creating account to `Edwards - ed25519`.\\n\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/edw.jpg\"}}),_c('p',[_vm._v(\"In the next menu, you need to set the account name and password, similar to the extension instructions described above. Let's give a name - \"),_c('code',{pre:true},[_vm._v(\"sub_owner\")]),_vm._v(\".\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/name.jpg\"}}),_c('p',[_vm._v(\"Clicking on the \"),_c('code',{pre:true},[_vm._v(\"Next\")]),_vm._v(\" button will take you to the last window. Click \"),_c('code',{pre:true},[_vm._v(\"Save\")]),_vm._v(\" to finish account creation. It will also generate a backup JSON-files that you should safely store. You can later use this file to recover your account if you remember the password.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/done.jpg\"}}),_c('robo-wiki-note',{attrs:{\"type\":\"note\"}},[_vm._v(\"The same way create account with name `sub_admin` \")]),_c('h3',{attrs:{\"id\":\"add-to-extension\"}},[_c('a',{attrs:{\"href\":\"#add-to-extension\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"add to extension\")]),_c('p',[_vm._v(\"You need to add created account to \"),_c('a',{attrs:{\"href\":\"https://polkadot.js.org/extension/\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"Polkadot.js extension\")]),_vm._v(\" (for ed25519 account you can do that only with backup JSON file). \\nFor that you need to create backup file of the account. Press on three dots on your account and choose \"),_c('code',{pre:true},[_vm._v(\"Create a backup file for this account\")]),_vm._v(\" and write your password.\")]),_c('p',[_c('g-image',{attrs:{\"src\":__webpack_require__(/*! !assets-loader?alt=Backup%20file!../images/creating-an-account/backup-file.jpg */ \"wQgo\"),\"alt\":\"Backup file\"}})],1),_c('p',[_vm._v(\"Then open an extension and press \"),_c('code',{pre:true},[_vm._v(\"+\")]),_vm._v(\" button on the top right, then choose \"),_c('code',{pre:true},[_vm._v(\"Restore account from backup JSON file\")]),_vm._v(\".\")]),_c('p',[_c('g-image',{attrs:{\"src\":__webpack_require__(/*! !assets-loader?alt=Restore%20backup%20in%20extension!../images/creating-an-account/extention-add-backup.jpg */ \"iKFn\"),\"alt\":\"Restore backup in extension\"}})],1),_c('p',[_vm._v(\"In opened window drop saved file, enter the password and press \"),_c('code',{pre:true},[_vm._v(\"Restore\")]),_vm._v(\".\")]),_c('p',[_c('g-image',{attrs:{\"src\":__webpack_require__(/*! !assets-loader?alt=Restore%20backup%20in%20extension%202!../images/creating-an-account/file-backup.jpg */ \"BWuA\"),\"alt\":\"Restore backup in extension 2\"}})],1),_c('h2',{attrs:{\"id\":\"buy-subscription\"}},[_c('a',{attrs:{\"href\":\"#buy-subscription\",\"aria-hidden\":\"true\"}},[_vm._v(\"#\")]),_vm._v(\"Buy subscription\")]),_c('p',[_vm._v(\"Now it's time to buy a subscription. \")]),_c('robo-wiki-note',{attrs:{\"type\":\"okay\"}},[_vm._v(\" To buy subscription you should have free XRT on our `SUB_OWNER` account. \")]),_c('p',[_vm._v(\"Go to our DaPP to \"),_c('strong',[_vm._v(\"subscription\")]),_c('a',{attrs:{\"href\":\"https://dapp.robonomics.network/#/subscription\",\"target\":\"_blank\",\"rel\":\"nofollow noopener noreferrer\"}},[_vm._v(\"page\")]),_vm._v(\" and press \"),_c('code',{pre:true},[_vm._v(\"add account\")]),_vm._v(\" at right sidebar.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/dapp.jpg\"}}),_c('p',[_vm._v(\"In the following popup menu connect \"),_c('code',{pre:true},[_vm._v(\"Polkadot{.js}\")]),_vm._v(\" extension. Now you will see your account address with balance:\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/connect.jpg\"}}),_c('p',[_c('strong',[_vm._v(\"Let's buy a subscription!\")])]),_c('robo-wiki-note',{attrs:{\"type\":\"warning\"}},[_vm._v(\"First, check which address connected to dapp.\")]),_c('p',[_c('code',{pre:true},[_vm._v(\"Check owner account\")]),_vm._v(\" should be the same as in extension account with name \"),_c('code',{pre:true},[_vm._v(\"SUB_owner\")]),_vm._v(\".\")]),_c('p',[_vm._v(\"Press \"),_c('code',{pre:true},[_vm._v(\"submit\")]),_vm._v(\" button and write \"),_c('code',{pre:true},[_vm._v(\"password\")]),_vm._v(\" for your account. After that wait until activation process is completed.\\nYou will see state of your subscription:\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/subscription.jpg\"}}),_c('p',[_vm._v(\"Add \"),_c('code',{pre:true},[_vm._v(\"SUB_ADMIN\")]),_vm._v(\" account to \"),_c('strong',[_vm._v(\"access list\")]),_vm._v(\". For this open extension and click on \\\"colorized round\\\" near account name. It will copy account address.\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/sub-admin.jpg\"}}),_c('p',[_vm._v(\"and parse this address to \"),_c('code',{pre:true},[_vm._v(\"Robonomics parachain address\")]),_vm._v(\" in \"),_c('strong',[_vm._v(\"Manage access\")]),_vm._v(\" part:\")]),_c('robo-wiki-picture',{attrs:{\"src\":\"home-assistant/access.jpg\"}}),_c('p',[_vm._v(\"Give it a name and press \\\"+\\\" button. Write password in popup window and wait activation process is completed. \")]),_c('robo-wiki-note',{attrs:{\"type\":\"okay\"}},[_vm._v(\"Do the same thing for `SUB_OWNER` account.\")]),_c('p',[_vm._v(\"That's all. Now got to the next article \"),_c('a',{attrs:{\"href\":\"/docs/add-smart-device-to-robonomics/\"}},[_vm._v(\"\\\"Robonomics integration setup\\\"\")])])],1)}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./docs/ru/iot-sub-setup.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%22564eb8b5-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "BKpH":
/*!**********************************!*\
  !*** ./docs/ru/iot-sub-setup.md ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _iot_sub_setup_md_vue_type_template_id_3db1ba17___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./iot-sub-setup.md?vue&type=template&id=3db1ba17& */ \"OMJ+\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _iot_sub_setup_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./iot-sub-setup.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"zquw\");\n/* harmony import */ var _iot_sub_setup_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./iot-sub-setup.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"/NS3\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _iot_sub_setup_md_vue_type_template_id_3db1ba17___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _iot_sub_setup_md_vue_type_template_id_3db1ba17___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _iot_sub_setup_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_iot_sub_setup_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _iot_sub_setup_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_iot_sub_setup_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/ru/iot-sub-setup.md?");

/***/ }),

/***/ "BWuA":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/gridsome/lib/webpack/loaders/assets-loader.js?alt=Restore%20backup%20in%20extension%202!./docs/images/creating-an-account/file-backup.jpg ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\"type\":\"image\",\"mimeType\":\"image/jpeg\",\"src\":\"/assets/static/file-backup.ffc88bc.8c6d170b18a9f99ec1c6dad495969f12.jpg\",\"size\":{\"width\":558,\"height\":477},\"sizes\":\"(max-width: 558px) 100vw, 558px\",\"srcset\":[\"/assets/static/file-backup.ffc88bc.8c6d170b18a9f99ec1c6dad495969f12.jpg 558w\"],\"dataUri\":\"data:image/svg+xml,%3csvg fill='none' viewBox='0 0 558 477' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cdefs%3e%3cfilter id='__svg-blur-824be3a02ecf095fdb4eff5e97f7cb15'%3e%3cfeGaussianBlur in='SourceGraphic' stdDeviation='40'/%3e%3c/filter%3e%3c/defs%3e%3cimage x='0' y='0' filter='url(%23__svg-blur-824be3a02ecf095fdb4eff5e97f7cb15)' width='558' height='477' xlink:href='data:image/jpeg%3bbase64%2c/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAA3AEADASIAAhEBAxEB/8QAHAAAAgMBAQEBAAAAAAAAAAAAAAMCBAcBBQYI/8QANhAAAQMCAwINAgYDAAAAAAAAAQACEQMEBRIhBjETFBUiI0FSYWJxkpOhc%2bEzQlFykbGBwdH/xAAYAQEAAwEAAAAAAAAAAAAAAAAAAQIFA//EACERAAICAQMFAQAAAAAAAAAAAAACAQMFEUFTMYGR4fBD/9oADAMBAAIRAxEAPwD9NVxcltTgH0A6RkztJ851SRykc8ushpzSA4/zqqW1mOnAbO3qttXXDq1Q0wZhrNCZJ/wrFhivGrGyuOLsaK9MPPTAZfKd4U6bgY4YkWth9o10mYBIiBG/vn4VyjnFJgrFhqxzizQT3Kqb52WRQpk66cYborTLi3LW5qlIOIkjPMKATkdyJHcom4tRvrU/UjjFrBPDU4G850BKR3IkdyYwU3tDmEOadxBUXZAS0HnDUhAJq53gsNEVKZ7UEH4U2glozU4gRGWYSL6g%2bu1mRgc5uaJquZv8lRGHViBnt6UjrF1UQHrZfAPSuZfAPSksw21aZAqA/Vcf9rnJdpzvxOdv6Z//AFAWMvgHpRlkRkEftSOTbaAAasfWdr8oGG20841T51XR/aAsAuAgAgdwQS7rn%2bEgYdagkw/WJ6V2vynUqLKFIspl0EzznF39oBNzTdo6nbCs47%2bkywmUrem6mx1SkGPIBc2ZgxulZrtzZ7S1to6z8KbfG0NNgbwT4bMa9f6rwOTts%2bxinufdY12Weqxkilp0nqbFOKWxIebljWOht7abGthogLuVqw/k7bPsYp7n3U6WH7XyeFp4sR4a0H5K5xmnn8G%2b7F5w6c6%2bfZtuVqMrViNTD9r83RU8WDY/NVk/BUeTts%2bxinufdJzT8DfdhGHTnXz7NwytXHAAaLEOTts%2bxinufdfQ7B2m0dHaBj8WbfC14N4PDPlsxp1rpTlntsVJpaNdyl2KWuuXi5Z02NLRKELZMcJRKEIAlEoQgCUIQgP/2Q==' /%3e%3c/svg%3e\"}\n\n//# sourceURL=webpack:///./docs/images/creating-an-account/file-backup.jpg?./node_modules/gridsome/lib/webpack/loaders/assets-loader.js?alt=Restore%2520backup%2520in%2520extension%25202");

/***/ }),

/***/ "OMJ+":
/*!*****************************************************************!*\
  !*** ./docs/ru/iot-sub-setup.md?vue&type=template&id=3db1ba17& ***!
  \*****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_564eb8b5_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_iot_sub_setup_md_vue_type_template_id_3db1ba17___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"564eb8b5-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./iot-sub-setup.md?vue&type=template&id=3db1ba17& */ \"5tFe\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_564eb8b5_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_iot_sub_setup_md_vue_type_template_id_3db1ba17___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_564eb8b5_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_iot_sub_setup_md_vue_type_template_id_3db1ba17___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/ru/iot-sub-setup.md?");

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

/***/ "iKFn":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/gridsome/lib/webpack/loaders/assets-loader.js?alt=Restore%20backup%20in%20extension!./docs/images/creating-an-account/extention-add-backup.jpg ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\"type\":\"image\",\"mimeType\":\"image/jpeg\",\"src\":\"/assets/static/extention-add-backup.c9b6bd8.5652cb5e1803e09e7c4392255aae922c.jpg\",\"size\":{\"width\":557,\"height\":600},\"sizes\":\"(max-width: 557px) 100vw, 557px\",\"srcset\":[\"/assets/static/extention-add-backup.c9b6bd8.5652cb5e1803e09e7c4392255aae922c.jpg 557w\"],\"dataUri\":\"data:image/svg+xml,%3csvg fill='none' viewBox='0 0 557 600' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cdefs%3e%3cfilter id='__svg-blur-3805faba4397feab4fec228b26d5a6aa'%3e%3cfeGaussianBlur in='SourceGraphic' stdDeviation='40'/%3e%3c/filter%3e%3c/defs%3e%3cimage x='0' y='0' filter='url(%23__svg-blur-3805faba4397feab4fec228b26d5a6aa)' width='557' height='600' xlink:href='data:image/jpeg%3bbase64%2c/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABFAEADASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAEDBAIFCP/EADEQAAIBAgQEBQEIAwAAAAAAAAECAAMRBBIUITFSYZEFE1Fx0aEiIyQyQUKBkmJy8P/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABwRAQEAAgIDAAAAAAAAAAAAAAARAiEBEjFBYf/aAAwDAQACEQMRAD8A%2bk3pY8%2bI1KiYikMKadkQi5D24n%2beslR4lYZqmDJ9ArWP1m%2bJjDDjCznztrLLtGbDarO2qbDlf0FIEH%2bbmX5r8Ax9hOpWtIVAGNSotriytYbkfE2y6zHlf%2bpjMeV/6mQuFIA/EYg2N92G/ThOkw5VwTXrNY3sW2P0gQSbGytf/UzFgl8QQ09ZUpuApD5KRF2vse1p6sSTdW6imIiVEMcqkngN55oxNHE4dKoVQHVx9umW2zD06/8AbT0am9Nx6gzJ4GGpeGU1ZWJBbjYHjE9rqfVSLSyAZcP6H7pvSdUilNhUp%2bSG3GYUm4%2b/sR9Z6Pm7XyN3HzJ83/E9x8wjE2Mc7LVpZuBvSbj0llDFVHr01ZkswOwpsLm3qZqDki/lv3HzOlJIuVK9DAqiJnajVJNsTUUE3tlXbpwgaJWyXUqURlv%2b6Z3o10Qtqq723yqi3PThKb4m5AOL9yibfMDXp6dmHkUbMLEW4yFw1JUCjD0bDhtMjPijw1gBF/yJtNIpV3IfU1UvvkKrt0gaVZ1UAKgA2Ak%2bZU9FmdaFUOjHFVGA4qVWze%2b00QEREBERAiTEQEREDNqTyjvGpPKO8RKGpPKO8ak8o7xEBqTyjvGpPKO8RAak8o7xqTyjvEQP/9k=' /%3e%3c/svg%3e\"}\n\n//# sourceURL=webpack:///./docs/images/creating-an-account/extention-add-backup.jpg?./node_modules/gridsome/lib/webpack/loaders/assets-loader.js?alt=Restore%2520backup%2520in%2520extension");

/***/ }),

/***/ "pVWa":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/iot-sub-setup.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"IOT subscription setup\",\n  \"contributors\": [\"nakata5321\"],\n  \"translated\": false\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/ru/iot-sub-setup.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "wQgo":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/gridsome/lib/webpack/loaders/assets-loader.js?alt=Backup%20file!./docs/images/creating-an-account/backup-file.jpg ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\"type\":\"image\",\"mimeType\":\"image/jpeg\",\"src\":\"/assets/static/backup-file.96669a0.99d2d73c0150154be2a5cb1a925461a0.jpg\",\"size\":{\"width\":1910,\"height\":714},\"sizes\":\"(max-width: 1910px) 100vw, 1910px\",\"srcset\":[\"/assets/static/backup-file.82a2fbd.99d2d73c0150154be2a5cb1a925461a0.jpg 480w\",\"/assets/static/backup-file.cbab2cf.99d2d73c0150154be2a5cb1a925461a0.jpg 1024w\",\"/assets/static/backup-file.96669a0.99d2d73c0150154be2a5cb1a925461a0.jpg 1910w\"],\"dataUri\":\"data:image/svg+xml,%3csvg fill='none' viewBox='0 0 1910 714' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cdefs%3e%3cfilter id='__svg-blur-ea6367d904cc895ee0aec8cf727a6af1'%3e%3cfeGaussianBlur in='SourceGraphic' stdDeviation='40'/%3e%3c/filter%3e%3c/defs%3e%3cimage x='0' y='0' filter='url(%23__svg-blur-ea6367d904cc895ee0aec8cf727a6af1)' width='1910' height='714' xlink:href='data:image/jpeg%3bbase64%2c/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAYAEADASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAEHAgME/8QANBAAAQMDAgIHBAsAAAAAAAAAAQIDEQAEIRIxBhMFBwhRYXHRFEGhsRgiIyQyNFJUY4GT/8QAGAEBAAMBAAAAAAAAAAAAAAAAAAECAwT/xAAjEQABAgQGAwAAAAAAAAAAAAAAAQIDERPRBBQhYZLwMUGR/9oADAMBAAIRAxEAPwCgN9RnDybdbSru5cUpYUHVto1pEEFIjEGQdpkCvV0h1KcK3VixbtMJtHGo1XDLf2jsJg6pJGTnA3qoAFRAG5plCwYgz4Vu7FRV10%2bJYqkNvgjg6guHYH36/wAfwoz8Kyez7w2RAvL%2be8Mon5VXxaOkTqPx9aaGlNKhRzHuBn50z0fbi2xFJvVUj30e%2bHP3vSP%2bLfpTPZ94bI/N348mEelWJxYbQpalkJSConOAP7rn7SzKBzsrBUnfIEePiKZ7EbcUsKTOqpIR2e%2bHArF/fyO5pv0rvddRXQqmjp6Svg8EwlS20d2AcbVXG3g8pRbHMAJSYGxG%2b4rbxVI14Me8zV87G9y4tsKTeqoklI/ECfIxW1u4GhKR5iaKK5DQ0HURlsUuanVOgRG0UUUAc1Ezop85H6KKKAwtSVT9WO7AxXnbS6lx/W6FtKILaSmCjGRM5E7CBHjRRUzEj//Z' /%3e%3c/svg%3e\"}\n\n//# sourceURL=webpack:///./docs/images/creating-an-account/backup-file.jpg?./node_modules/gridsome/lib/webpack/loaders/assets-loader.js?alt=Backup%2520file");

/***/ }),

/***/ "z5Bq":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/iot-sub-setup.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/ru/iot-sub-setup.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "zquw":
/*!**************************************************************************************!*\
  !*** ./docs/ru/iot-sub-setup.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_iot_sub_setup_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./iot-sub-setup.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"z5Bq\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_iot_sub_setup_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ru/iot-sub-setup.md?");

/***/ })

}]);