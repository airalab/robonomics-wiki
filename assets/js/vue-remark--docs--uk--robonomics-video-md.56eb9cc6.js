(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--uk--robonomics-video-md"],{

/***/ "0lnr":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/uk/robonomics-video.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Сервіс відео Robonomics\",\n  \"contributors\": [\"nakata5321\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/uk/robonomics-video.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "Gs9s":
/*!*************************************!*\
  !*** ./docs/uk/robonomics-video.md ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _robonomics_video_md_vue_type_template_id_bceef80a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./robonomics-video.md?vue&type=template&id=bceef80a& */ \"t4x6\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _robonomics_video_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./robonomics-video.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"ayCY\");\n/* harmony import */ var _robonomics_video_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./robonomics-video.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"qcRR\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _robonomics_video_md_vue_type_template_id_bceef80a___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _robonomics_video_md_vue_type_template_id_bceef80a___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _robonomics_video_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_robonomics_video_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _robonomics_video_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_robonomics_video_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/uk/robonomics-video.md?");

/***/ }),

/***/ "HlXY":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"58be6945-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/uk/robonomics-video.md?vue&type=template&id=bceef80a& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c('VueRemarkRoot', [_c('p', [_vm._v(\"У цій статті показано, як додати IP-камеру до Home Assistant та надсилати відео на веб-сервіс Robonomics.\")]), _c('p', [_vm._v(\"Для підключення камери до Home Assistant вам потрібно знати його IP-адресу та створити локальний обліковий запис камери для підключення до потоку RTSP.\")]), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"warning\"\n    }\n  }, [_vm._v(\"\\nОскільки це робиться по-різному для кожної камери, цей процес не розглядається в цій статті.\\n\")]), _c('p', [_vm._v(\"Вимоги:\")]), _c('ul', [_c('li', [_vm._v(\"IP-камера\")]), _c('li', [_vm._v(\"Налаштований локальний обліковий запис камери\")]), _c('li', [_vm._v(\"IP-адреса камери\")]), _c('li', [_vm._v(\"Налаштований Home Assistant\")])]), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"note\"\n    }\n  }, [_c('p', [_vm._v(\"У цій статті припускається, що у вас є загальна IP-камера без опцій RTZ (поворот, нахил, збільшення). \\nЯкщо у вас є камера RTZ, перевірте статтю \"), _c('a', {\n    attrs: {\n      \"href\": \"/docs/ptz-camera\"\n    }\n  }, [_vm._v(\"\\\"Камера RTZ\\\"\")]), _vm._v(\". А потім поверніться до другого кроку тут.\")])]), _c('h2', {\n    attrs: {\n      \"id\": \"підключіть-камеру\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%BF%D1%96%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D1%96%D1%82%D1%8C-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D1%83\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Підключіть камеру\")]), _c('p', [_vm._v(\"По-перше, вам потрібно дізнатися URL-адресу потоку RTSP камери. \\nДля цього спробуйте ввести наступний запит в Інтернеті: \\\"<НАЗВА\"), _c('em', [_vm._v(\"КАМЕРИ> RTSP-потік\\\".\\nURL потоку повинен починатися з `rtsp://<IP\")]), _vm._v(\"Адреса>...`. \")]), _c('p', [_vm._v(\"У цій статті використовується камера \\\"Tapo\\\", а шлях потоку - \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"rtsp://<IP_Адреса>/stream1\")]), _vm._v(\".\")]), _c('p', [_vm._v(\"Відкрийте Home Assistant та перейдіть до \\\"Settings\\\"-> \\\"Devices & Services\\\". Натисніть кнопку \\\"ADD INTEGRATION\\\" та\\nпочніть вводити інтеграцію \\\"Generic Camera\\\". Виберіть її.\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"home-assistant/generic.jpg\"\n    }\n  }), _c('p', [_vm._v(\"У вікні конфігурації надайте наступну інформацію:\")]), _c('ul', [_c('li', [_vm._v(\"Stream Source URL - URL потоку RTSP камери\")]), _c('li', [_vm._v(\"Username - введіть ім'я користувача вашого локального облікового запису камери\")]), _c('li', [_vm._v(\"Password - введіть пароль для вашого локального облікового запису камери\")])]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"home-assistant/genericconf.jpg\"\n    }\n  }), _c('p', [_vm._v(\"Прокрутіть налаштування вниз і натисніть кнопку \\\"Submit\\\".\")]), _c('p', [_vm._v(\"У попередньому вікні активуйте прапорець \\\"This image looks good.\\\" і натисніть кнопку \\\"Submit\\\". Потім - \\\"Finish\\\".\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"home-assistant/preview-camera.jpg\"\n    }\n  }), _c('h3', {\n    attrs: {\n      \"id\": \"додати-до-панелі-інструментів\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%B4%D0%BE%D0%B4%D0%B0%D1%82%D0%B8-%D0%B4%D0%BE-%D0%BF%D0%B0%D0%BD%D0%B5%D0%BB%D1%96-%D1%96%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%96%D0%B2\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Додати до панелі інструментів\")]), _c('p', [_vm._v(\"Крім того, ви можете додати потік на свою панель інструментів. Для цього перейдіть на панель і створіть нову картку \\n\\\"Picture Glance\\\". Далі кроки:\")]), _c('ul', [_c('li', [_vm._v(\"введіть бажану \\\"Title\\\"\")]), _c('li', [_vm._v(\"видаліть дані з \\\"Image Path\\\"\")]), _c('li', [_vm._v(\"виберіть камера в \\\"Camera Entity\\\"\")]), _c('li', [_vm._v(\"у \\\"Camera View\\\", виберіть \\\"live\\\", щоб зменшити затримку\")])]), _c('p', [_vm._v(\"І збережіть це.\\n\"), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"home-assistant/camera_picture_glance.jpg\"\n    }\n  })], 1), _c('h2', {\n    attrs: {\n      \"id\": \"перевірте-папку-з-медіа\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D1%96%D1%80%D1%82%D0%B5-%D0%BF%D0%B0%D0%BF%D0%BA%D1%83-%D0%B7-%D0%BC%D0%B5%D0%B4%D1%96%D0%B0\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Перевірте папку з медіа\")]), _c('p', [_vm._v(\"Before being sent to the Robonomics Video Service, the video must be saved in a folder, and Home Assistant must have access to this folder. \\nНайпростіший варіант у цьому випадку - використовувати медіа-пакет, в якому Home Assistant зберігає всі медіа-файли.\")]), _c('ul', [_c('li', [_vm._v(\"Якщо ви використовуєте HAOS або попередньо встановлене зображення, ваш Home Assistant \"), _c('strong', [_vm._v(\"вже має папку Media\")]), _vm._v(\".\")]), _c('li', [_vm._v(\"Якщо ви використовуєте Home Assistant Core, вам слід перейти до папки \"), _c('code', {\n    pre: true\n  }, [_vm._v(\".homeassistant\")]), _vm._v(\" і створити в ній папку \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"media\")]), _vm._v(\".\")]), _c('li', [_vm._v(\"Якщо ви використовуєте Home Assistant Docker, додайте рядок \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"-v /ШЛЯХ_ДО_ВАШОГО_МЕДІА:/media \\\\\")]), _vm._v(\" до команди Docker.\")])]), _c('p', [_vm._v(\"Щоб перевірити, що все налаштовано правильно, перейдіть на вкладку “Media” -> “local media” в своєму Home Assistant. \\nВи повинні побачити порожню папку (без помилок):\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"home-assistant/media-folder.jpg\"\n    }\n  }), _c('h2', {\n    attrs: {\n      \"id\": \"виклик-сервісу\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%B2%D0%B8%D0%BA%D0%BB%D0%B8%D0%BA-%D1%81%D0%B5%D1%80%D0%B2%D1%96%D1%81%D1%83\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Виклик сервісу\")]), _c('p', [_vm._v(\"Щоб надіслати відео на Robonomics, вам слід викликати спеціальний сервіс в Home Assistant. \\nУ цій статті це робиться вручну, але ви можете створити для цього автоматизацію.\")]), _c('p', [_vm._v(\"Для цього перейдіть до \\\"Developer tools\\\" -> \\\"Services\\\" та знайдіть \\\"Robonomics: Save recording to Robonomics \\\".\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"home-assistant/robonomics-service.jpg\"\n    }\n  }), _c('p', [_vm._v(\"У \\\"Цілі\\\" виберіть сутність вашої камери.\\nУ \\\"Шляху для збереження запису\\\" ви повинні вказати абсолютний шлях до папки,\\nде Home Assistant може зберігати відео:\")]), _c('ul', [_c('li', [_vm._v(\"Для попередньо встановленого зображення - \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"/home/homeassistant/.homeassistant/media\")]), _vm._v(\";\")]), _c('li', [_vm._v(\"Для HA OS або Home Assistant Docker- \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"/media\")]), _vm._v(\";\")]), _c('li', [_vm._v(\"Для Home Assistant Core - Шлях до раніше створеної папки media.\")])]), _c('p', [_vm._v(\"Крім того, ви можете вибрати тривалість запису. \")]), _c('p', [_vm._v(\"Заповніть дані та викличте сервіс за допомогою кнопки \\\"CALL SERVICE\\\".\")]), _c('h2', {\n    attrs: {\n      \"id\": \"dapp\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#dapp\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"DAPP\")]), _c('p', [_vm._v(\"Щоб переглянути отримане відео, перейдіть до \"), _c('a', {\n    attrs: {\n      \"href\": \"https://vol4tim.github.io/videostream/\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"Robonomics DAPP\")]), _vm._v(\".\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"home-assistant/video-dapp.jpg\"\n    }\n  }), _c('p', [_vm._v(\"Вставте адресу вашого контролера та натисніть кнопку нижче. Зачекайте процесу \\\"Search for Twins\\\". \\nВ результаті ви отримаєте IPFS CID з усіма записаними відео.\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"home-assistant/video-ipfs.jpg\"\n    }\n  }), _c('p', [_vm._v(\"Далі виберіть обліковий запис контролера (або будь-який інший) зі списку та підпишіть повідомлення для авторизації в\\nвеб-порталі Web3 IPFS для завантаження всіх відео. В результаті ви отримаєте всі відео, записані вашим розумним будинком.\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"home-assistant/show-videos.jpg\"\n    }\n  }), _c('p', [_vm._v(\"Оскільки всі відео в папці зашифровані ключем контролера, вам потрібно вставити його для розшифрування відео.\\nПісля цього кнопка відтворення відео активується. Натисніть на неї, щоб завантажити відео.\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"home-assistant/video-seed.jpg\"\n    }\n  })], 1);\n};\nvar staticRenderFns = [];\n\n\n//# sourceURL=webpack:///./docs/uk/robonomics-video.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%2258be6945-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

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

/***/ "ayCY":
/*!*****************************************************************************************!*\
  !*** ./docs/uk/robonomics-video.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_video_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./robonomics-video.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"bdui\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_video_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/uk/robonomics-video.md?");

/***/ }),

/***/ "bdui":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/uk/robonomics-video.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/uk/robonomics-video.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "qcRR":
/*!**********************************************************************************************!*\
  !*** ./docs/uk/robonomics-video.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_video_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./robonomics-video.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"0lnr\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_video_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/uk/robonomics-video.md?");

/***/ }),

/***/ "t4x6":
/*!********************************************************************!*\
  !*** ./docs/uk/robonomics-video.md?vue&type=template&id=bceef80a& ***!
  \********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_video_md_vue_type_template_id_bceef80a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"58be6945-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/babel-loader/lib??ref--1-1!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./robonomics-video.md?vue&type=template&id=bceef80a& */ \"HlXY\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_video_md_vue_type_template_id_bceef80a___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_robonomics_video_md_vue_type_template_id_bceef80a___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/uk/robonomics-video.md?");

/***/ })

}]);