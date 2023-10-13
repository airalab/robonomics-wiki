(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--ru--carbon-footprint-sensor-md"],{

/***/ "1yGW":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"58be6945-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/carbon-footprint-sensor.md?vue&type=template&id=b6812d52& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c('VueRemarkRoot', [_c('p', [_vm._v(\"Пример работы есть в видео:\")]), _c('div', {\n    staticClass: \"youtube-embed\"\n  }, [_c('div', {\n    staticStyle: {\n      \"width\": \"100%\",\n      \"margin\": \"0 auto\"\n    }\n  }, [_c('div', {\n    staticStyle: {\n      \"position\": \"relative\",\n      \"padding-bottom\": \"56.25%\",\n      \"padding-top\": \"25px\",\n      \"height\": \"0\"\n    }\n  }, [_c('iframe', {\n    staticStyle: {\n      \"position\": \"absolute\",\n      \"top\": \"0\",\n      \"left\": \"0\",\n      \"width\": \"100%\",\n      \"height\": \"100%\"\n    },\n    attrs: {\n      \"src\": \"https://www.youtube-nocookie.com/embed/jsaFCVAx2sA\",\n      \"allow\": \"autoplay; encrypted-media\",\n      \"allowfullscreen\": \"\"\n    }\n  })])])]), _c('h2', {\n    attrs: {\n      \"id\": \"требования\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D1%82%D1%80%D0%B5%D0%B1%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Требования\")]), _c('ul', [_c('li', [_c('a', {\n    attrs: {\n      \"href\": \"https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"Aqara Smart Plug\")])]), _c('li', [_vm._v(\"Raspberry Pi\")]), _c('li', [_vm._v(\"Адаптер Zigbee \"), _c('a', {\n    attrs: {\n      \"href\": \"https://jhome.ru/catalog/parts/PCBA/293/\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"JetHome USB JetStick Z2\")]), _vm._v(\" (или один из \"), _c('a', {\n    attrs: {\n      \"href\": \"https://www.zigbee2mqtt.io/information/supported_adapters.html\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"поддерживаемых\")]), _vm._v(\")\")])]), _c('p', [_vm._v(\"Сервис работает на Raspberry Pi и связывается со смарт-розеткой через протокол Zigbee.\")]), _c('h2', {\n    attrs: {\n      \"id\": \"адаптер-zigbee\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B5%D1%80-zigbee\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Адаптер Zigbee\")]), _c('p', [_vm._v(\"Если у вас есть JetHome USB JetStick Z2, он уже имеет необходимое программное обеспечение, поэтому вам не нужно его прошивать. Но если у вас есть другой адаптер, сначала вам нужно прошить его с помощью программного обеспечения zigbee2MQTT. Инструкции для вашего устройства можно найти \"), _c('a', {\n    attrs: {\n      \"href\": \"https://www.zigbee2mqtt.io/information/supported_adapters.html\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"здесь\")]), _vm._v(\".\")]), _c('p', [_vm._v(\"Подключите адаптер и проверьте адрес адаптера (он также может быть \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"/dev/ttyUSB1\")]), _vm._v(\"):\")]), _c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-bash\"\n    }\n  }, [_vm._v(\"$ ls -l /dev/ttyUSB0\\ncrw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 \")])]), _c('p', [_vm._v(\"Возможно, вам потребуется получить доступ к USB-порту. Добавьте своего пользователя в группу \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"dialout\")]), _vm._v(\" (это работает для Ubuntu, но имя группы может отличаться в других ОС).\\nДля Ubuntu:\")]), _c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-bash\"\n    }\n  }, [_vm._v(\"sudo usermod -a -G dialout \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-variable\"\n    }\n  }, [_vm._v(\"$USER\")])])]), _c('p', [_vm._v(\"Для Arch:\")]), _c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-bash\"\n    }\n  }, [_vm._v(\"sudo usermod -a -G uucp \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-variable\"\n    }\n  }, [_vm._v(\"$USER\")])])]), _c('p', [_vm._v(\"Затем выйдите из системы и войдите снова или перезагрузите компьютер.\")]), _c('h2', {\n    attrs: {\n      \"id\": \"установка\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Установка\")]), _c('p', [_vm._v(\"Клонируйте репозиторий:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"git clone https://github.com/makyul/robonomics-carbon-footprint.git\\ncd robonomics-carbon-footprint\\n\")])]), _c('h2', {\n    attrs: {\n      \"id\": \"конфигурация\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%86%D0%B8%D1%8F\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Конфигурация\")]), _c('p', [_vm._v(\"Перейдите в \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"data/configuration.yaml\")]), _vm._v(\" и установите \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"permit_join: true\")]), _vm._v(\":\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"# Home Assistant integration (MQTT discovery)\\nhomeassistant: false\\n\\n# allow new devices to join\\npermit_join: true\\n\\n# MQTT settings\\nmqtt:\\n  # MQTT base topic for zigbee2mqtt MQTT messages\\n  base_topic: zigbee2mqtt\\n  # MQTT server URL\\n  server: 'mqtt://172.17.0.1'\\n  # MQTT server authentication, uncomment if required:\\n  # user: my_user\\n  # password: my_password\\n\\n# Serial settings\\nserial:\\n  # Location of CC2531 USB sniffer\\n  port: /dev/ttyUSB0\\n\")])]), _c('p', [_vm._v(\"Также вы можете заполнить поля \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"server\")]), _vm._v(\" и \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"port\")]), _vm._v(\" соответствующей информацией. В поле \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"server\")]), _vm._v(\" используйте IP-адрес моста \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"docker0\")]), _vm._v(\" для установления соединения: \")]), _c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-bash\"\n    }\n  }, [_vm._v(\"$ ip a                                                 127\\n1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000\\n    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\\n\\n...\\n\\n5: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default \\n    link/ether 02:42:0d:ff:5f:a3 brd ff:ff:ff:ff:ff:ff\\n    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0\\n       valid_lft forever preferred_lft forever\\n    inet6 fe80::42:dff:feff:5fa3/64 scope link \\n       valid_lft forever preferred_lft forever\")])]), _c('p', [_vm._v(\"Здесь ваш адрес - \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"172.17.0.1\")]), _vm._v(\".\")]), _c('p', [_vm._v(\"Затем создайте файл config/config.yaml со следующей информацией и установите свое местоположение (вы можете посмотреть на \"), _c('a', {\n    attrs: {\n      \"href\": \"https://countrycode.org/\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"https://countrycode.org/\")]), _vm._v(\" для 3-буквенного ISO-кода):\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"location: RUS\\nservice_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd\\ntwin_id: 5\\nsending_timeout: 3600\\nbroker_address: \\\"172.17.0.1\\\"\\nbroker_port: 1883\\n\")])]), _c('h2', {\n    attrs: {\n      \"id\": \"подключите-розетку\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5-%D1%80%D0%BE%D0%B7%D0%B5%D1%82%D0%BA%D1%83\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Подключите розетку\")]), _c('p', [_vm._v(\"Первый запуск:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"docker-compose up     \\n\")])]), _c('p', [_vm._v(\"Чтобы перейти в режим сопряжения с розеткой, удерживайте кнопку питания в течение нескольких секунд, пока не начнет быстро мигать синий свет. \")]), _c('p', [_vm._v(\"В журналах вы должны увидеть, что ваша розетка начала публиковаться в mqtt. \")]), _c('h2', {\n    attrs: {\n      \"id\": \"после-сопряжения\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%BF%D0%BE%D1%81%D0%BB%D0%B5-%D1%81%D0%BE%D0%BF%D1%80%D1%8F%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"После сопряжения\")]), _c('p', [_vm._v(\"Если вы не хотите разрешить другим устройствам сопрягаться с вашим адаптером, теперь вы должны перейти в \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"data/configuration.yaml\")]), _vm._v(\" и установить \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"permit_join: false\")]), _vm._v(\". Перезапустите сервис (используйте 'Ctrl+C' и \")]), _c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-bash\"\n    }\n  }, [_vm._v(\"docker-compose up     \")])]), _c('p', [_vm._v(\"еще раз, чтобы применить изменения).\")]), _c('h2', {\n    attrs: {\n      \"id\": \"запуск\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Запуск\")]), _c('p', [_vm._v(\"При первом запуске будет создан аккаунт для розетки. \")]), _c('blockquote', [_c('p', [_vm._v(\"Если у вас уже есть аккаунт, вы должны добавить его сид в файл \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"config.config.yaml\")]), _vm._v(\" в разделе \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"device_seed\")]), _vm._v(\":\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"location: RUS\\nservice_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd\\ntwin_id: 5\\nsending_timeout: 3600\\nbroker_address: \\\"172.17.0.1\\\"\\nbroker_port: 1883\\ndevice_seed: <device_seed>\\n\")])])]), _c('p', [_vm._v(\"После создания аккаунта вы увидите адрес в журналах (сид будет добавлен в \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"config/config.yaml\")]), _vm._v(\"):\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT\\n\")])]), _c('p', [_vm._v(\"Вам нужно перевести некоторые токены на этот аккаунт для оплаты комиссии за транзакции, вы можете сделать это на \"), _c('a', {\n    attrs: {\n      \"href\": \"https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"Robonomics Portal\")]), _vm._v(\". \")]), _c('p', [_vm._v(\"Сервис увидит, что у вас достаточно токенов, в журналах вы увидите:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"plug               | Balance is OK\\n\")])]), _c('p', [_vm._v(\"Сервис увидит mqtt-сообщения от розетки и обеспечит безопасное использование электроэнергии. Каждый час (вы можете изменить таймаут в \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"config/config.yaml\")]), _vm._v(\" в разделе \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"sending_timeout\")]), _vm._v(\", таймаут указывается в секундах) будет создан журнал данных со следующей информацией:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}\\n\")])])]);\n};\nvar staticRenderFns = [];\n\n\n//# sourceURL=webpack:///./docs/ru/carbon-footprint-sensor.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%2258be6945-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "Hqcw":
/*!************************************************************************************************!*\
  !*** ./docs/ru/carbon-footprint-sensor.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_carbon_footprint_sensor_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./carbon-footprint-sensor.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"vQFG\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_carbon_footprint_sensor_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ru/carbon-footprint-sensor.md?");

/***/ }),

/***/ "TQOp":
/*!***************************************************************************!*\
  !*** ./docs/ru/carbon-footprint-sensor.md?vue&type=template&id=b6812d52& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_carbon_footprint_sensor_md_vue_type_template_id_b6812d52___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"58be6945-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/babel-loader/lib??ref--1-1!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./carbon-footprint-sensor.md?vue&type=template&id=b6812d52& */ \"1yGW\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_carbon_footprint_sensor_md_vue_type_template_id_b6812d52___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_carbon_footprint_sensor_md_vue_type_template_id_b6812d52___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/ru/carbon-footprint-sensor.md?");

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

/***/ "iqUh":
/*!********************************************!*\
  !*** ./docs/ru/carbon-footprint-sensor.md ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _carbon_footprint_sensor_md_vue_type_template_id_b6812d52___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carbon-footprint-sensor.md?vue&type=template&id=b6812d52& */ \"TQOp\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _carbon_footprint_sensor_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./carbon-footprint-sensor.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"Hqcw\");\n/* harmony import */ var _carbon_footprint_sensor_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./carbon-footprint-sensor.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"jfT5\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _carbon_footprint_sensor_md_vue_type_template_id_b6812d52___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _carbon_footprint_sensor_md_vue_type_template_id_b6812d52___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _carbon_footprint_sensor_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_carbon_footprint_sensor_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _carbon_footprint_sensor_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_carbon_footprint_sensor_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/ru/carbon-footprint-sensor.md?");

/***/ }),

/***/ "jfT5":
/*!*****************************************************************************************************!*\
  !*** ./docs/ru/carbon-footprint-sensor.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_carbon_footprint_sensor_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./carbon-footprint-sensor.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"kAYc\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_carbon_footprint_sensor_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ru/carbon-footprint-sensor.md?");

/***/ }),

/***/ "kAYc":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/carbon-footprint-sensor.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Подключите датчик\",\n  \"contributors\": [\"LoSk-p\", \"makyul\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/ru/carbon-footprint-sensor.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "vQFG":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/carbon-footprint-sensor.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/ru/carbon-footprint-sensor.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ })

}]);