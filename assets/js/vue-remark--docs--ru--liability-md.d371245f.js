(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--ru--liability-md"],{

/***/ "4jAU":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/liability.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/ru/liability.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "6sKc":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"58be6945-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/liability.md?vue&type=template&id=3d5a843e& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c('VueRemarkRoot', [_c('p', [_c('strong', [_vm._v(\"Чтобы превратить роботов в экономические агенты, нужен инструмент контракта. Знакомьтесь с Liability - паллет Robonomics, реализующий\\nконтракты между учетными записями parachain!\")])]), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"warning\",\n      \"title\": \"Dev Node\"\n    }\n  }, [_c('p', [_vm._v(\"  Обратите внимание, что этот учебник демонстрируется на локальном экземпляре Robonomics Node. Настройте свой с помощью \"), _c('a', {\n    attrs: {\n      \"href\": \"/docs/run-dev-node\"\n    }\n  }, [_vm._v(\"этих инструкций\")]), _vm._v(\".\")])]), _c('h2', {\n    attrs: {\n      \"id\": \"обзор-теории\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%BE%D0%B1%D0%B7%D0%BE%D1%80-%D1%82%D0%B5%D0%BE%D1%80%D0%B8%D0%B8\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Обзор теории\")]), _c('p', [_vm._v(\"На Ethereum была довольно сложная структура взаимодействия с ответственностью. Вы можете ознакомиться с ней \\n\"), _c('a', {\n    attrs: {\n      \"href\": \"/docs/robonomics-how-it-works\"\n    }\n  }, [_vm._v(\"здесь\")]), _vm._v(\". В наши дни с Kusama все немного проще!\")]), _c('h3', {\n    attrs: {\n      \"id\": \"переговоры\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%BF%D0%B5%D1%80%D0%B5%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D1%8B\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Переговоры\")]), _c('p', [_vm._v(\"Для подписания контракта стороны должны сначала провести переговоры. Это может быть сделано несколькими способами, включая \\n\"), _c('a', {\n    attrs: {\n      \"href\": \"https://blog.ipfs.tech/25-pubsub/\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"IPFS PubSub\")]), _vm._v(\" или Robonomics PubSub. Пример кода на Python с использованием Robonomics PubSub \\nпредставлен \"), _c('a', {\n    attrs: {\n      \"href\": \"https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"здесь\")]), _vm._v(\". \")]), _c('p', [_vm._v(\"Предложение и спрос - это сообщения, содержащие две основные характеристики контракта: \"), _c('strong', [_vm._v(\"описание работы\")]), _vm._v(\" и \"), _c('strong', [_vm._v(\"цена\")]), _vm._v(\". Формат сообщения\\nдолжен быть разработан пользователем для каждого конкретного приложения. Важно не соблюдать строгое правило формата в процессе переговоров.\\nВозможный ход представлен на рисунке ниже.\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"liability/negotiations.jpg\"\n    }\n  }), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"warning\",\n      \"title\": \"PubSub\"\n    }\n  }, [_c('p', [_vm._v(\"  Обратите внимание, что PubSub - это открытый протокол, поэтому нельзя передавать конфиденциальные данные. Для этого следует использовать другие протоколы.\")])]), _c('h3', {\n    attrs: {\n      \"id\": \"signatures\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#signatures\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Signatures\")]), _c('p', [_vm._v(\"Когда переговоры успешно завершены, каждая сторона должна подписать свое так называемое соглашение, названное подписью. Это \\nсообщение, содержащее описание работы и цену \"), _c('strong', [_vm._v(\"в определенном формате\")]), _vm._v(\", подписанное с помощью закрытого ключа учетной записи. Для этого есть \\n\"), _c('a', {\n    attrs: {\n      \"href\": \"https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"инструмент на Python\")]), _vm._v(\".\")]), _c('ul', [_c('li', [_vm._v(\"Описание работы называется \"), _c('strong', [_vm._v(\"техника\")]), _vm._v(\". Это строка длиной 32 байта, похожая на запуск, которая может быть закодирована в IPFS CID.\")]), _c('li', [_vm._v(\"Цена называется \"), _c('strong', [_vm._v(\"экономика\")]), _vm._v(\". Это десятичное число XRT - Вейнер. 1 Вейнер = 10**-9 XRT.\")])]), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"note\",\n      \"title\": \"32 bytes\"\n    }\n  }, [_c('p', [_vm._v(\"  Вы можете получить \"), _c('a', {\n    attrs: {\n      \"href\": \"https://ipfs.tech/\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"IPFS\")]), _vm._v(\" CID, отформатированный правильно, с помощью \"), _c('a', {\n    attrs: {\n      \"href\": \"https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"библиотеки на Python\")]), _vm._v(\".\\n  При использовании функции \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"sign_liability\")]), _vm._v(\" нет необходимости преобразовывать хеш, это будет сделано автоматически.\")])]), _c('p', [_vm._v(\"Следуя примеру с кофе:\")]), _c('ol', [_c('li', [_vm._v(\"Задача - это JSON\")])]), _c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-json\"\n    }\n  }, [_vm._v(\"{\"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"\\\"task\\\"\")]), _vm._v(\": \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"\\\"make_espresso\\\"\")]), _vm._v(\", \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"\\\"description\\\"\")]), _vm._v(\": \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"\\\"Make one cup of espresso\\\"\")]), _vm._v(\"}\")])]), _c('ol', {\n    attrs: {\n      \"start\": \"2\"\n    }\n  }, [_c('li', [_vm._v(\"Его IPFS CID - \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi\")])]), _c('li', [_vm._v(\"Таким образом, \"), _c('strong', [_vm._v(\"техника\")]), _vm._v(\" (преобразованный CID) - \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9\")])]), _c('li', [_c('strong', [_vm._v(\"Экономика\")]), _vm._v(\" составляет \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"1.5 XRT\")]), _vm._v(\".\")])]), _c('p', [_vm._v(\"Когда подписано, пришло время создать обязательство! Это может быть сделано одной из сторон (либо обещающей стороной, либо обещателем), либо \\n3-ей стороной, так называемым поставщиком.\")]), _c('h2', {\n    attrs: {\n      \"id\": \"создать-обязательство\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BE%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D1%82%D0%B2%D0%BE\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Создать обязательство\")]), _c('h3', {\n    attrs: {\n      \"id\": \"подготовка\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%BF%D0%BE%D0%B4%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BA%D0%B0\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Подготовка\")]), _c('p', [_vm._v(\"Как уже упоминалось ранее, в процессе участвуют как минимум две стороны. В этом примере давайте используем три и создадим\\nотдельного поставщика для этого. Предположим, что переговоры уже состоялись каким-то образом.\")]), _c('h3', {\n    attrs: {\n      \"id\": \"1-создайте-три-аккаунта-и-добавьте-на-них-средства\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#1-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%B9%D1%82%D0%B5-%D1%82%D1%80%D0%B8-%D0%B0%D0%BA%D0%BA%D0%B0%D1%83%D0%BD%D1%82%D0%B0-%D0%B8-%D0%B4%D0%BE%D0%B1%D0%B0%D0%B2%D1%8C%D1%82%D0%B5-%D0%BD%D0%B0-%D0%BD%D0%B8%D1%85-%D1%81%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B2%D0%B0\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"1. Создайте три аккаунта и добавьте на них средства\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"liability/balances.jpg\"\n    }\n  }), _c('p', [_vm._v(\"Здесь мы предоставили поставщику 100 XRT для подписи внешних обязательств, обещающей стороне было предоставлено 2 XRT для оплаты работы.\\nОбещатель не получил никаких средств (за исключением существенного депозита не менее 1 мXRT).\")]), _c('h3', {\n    attrs: {\n      \"id\": \"1-перейдите-в-developer---extrinsics\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#1-%D0%BF%D0%B5%D1%80%D0%B5%D0%B9%D0%B4%D0%B8%D1%82%D0%B5-%D0%B2-developer---extrinsics\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"1. Перейдите в Developer -> Extrinsics\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"liability/extrinsics.jpg\"\n    }\n  }), _c('h3', {\n    attrs: {\n      \"id\": \"2-выберите-liability---create-из-выпадающего-списка-возможных-внешних-обязательств\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#2-%D0%B2%D1%8B%D0%B1%D0%B5%D1%80%D0%B8%D1%82%D0%B5-liability---create-%D0%B8%D0%B7-%D0%B2%D1%8B%D0%BF%D0%B0%D0%B4%D0%B0%D1%8E%D1%89%D0%B5%D0%B3%D0%BE-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B0-%D0%B2%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D1%8B%D1%85-%D0%B2%D0%BD%D0%B5%D1%88%D0%BD%D0%B8%D1%85-%D0%BE%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D1%82%D0%B2\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"2. Выберите liability -> create из выпадающего списка возможных внешних обязательств\")]), _c('p', [_vm._v(\"Также выберите аккаунт, с которым вы хотите отправить extrinsic. Заполните все параметры.\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"liability/create.jpg\"\n    }\n  }), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"note\",\n      \"title\": \"Signatures\"\n    }\n  }, [_c('p', [_vm._v(\"  Поскольку здесь используется поставщик, нет необходимости знать семена участников. Необходимы только их подписи.\")])]), _c('h3', {\n    attrs: {\n      \"id\": \"3-отправьте-транзакцию\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#3-%D0%BE%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D1%8C%D1%82%D0%B5-%D1%82%D1%80%D0%B0%D0%BD%D0%B7%D0%B0%D0%BA%D1%86%D0%B8%D1%8E\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"3. Отправьте транзакцию\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"liability/submit.jpg\"\n    }\n  }), _c('h3', {\n    attrs: {\n      \"id\": \"4-просмотрите-свое-обязательство-в-событиях\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#4-%D0%BF%D1%80%D0%BE%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B8%D1%82%D0%B5-%D1%81%D0%B2%D0%BE%D0%B5-%D0%BE%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D1%82%D0%B2%D0%BE-%D0%B2-%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F%D1%85\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"4. Просмотрите свое обязательство в событиях\")]), _c('p', [_vm._v(\"Для этого перейдите в \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Network -> Explorer\")]), _vm._v(\"  и найдите список событий справа. Нажмите на треугольник, чтобы развернуть его.\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"liability/new-liability.jpg\"\n    }\n  }), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"note\",\n      \"title\": \"Hash\"\n    }\n  }, [_c('p', [_vm._v(\"  Хэш может быть преобразован в IPFS CID с тем же \\n  \"), _c('a', {\n    attrs: {\n      \"href\": \"https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"Python tool\")]), _vm._v(\".\")])]), _c('h3', {\n    attrs: {\n      \"id\": \"5-исследование-хранения\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#5-%D0%B8%D1%81%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"5. Исследование хранения\")]), _c('p', [_vm._v(\"Вы также можете изучить некоторые характеристики обязательств в модуле хранения \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"liability\")]), _vm._v(\".\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"liability/storage-liability.jpg\"\n    }\n  }), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"note\",\n      \"title\": \"Next Index\"\n    }\n  }, [_c('p', [_vm._v(\"  Функция хранения \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Next Index\")]), _vm._v(\" показывает последний индекс обязательства +1, поэтому, даже если это \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"1\")]), _vm._v(\", обязательство \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"0\")]), _vm._v(\" исследуется.\")])]), _c('h2', {\n    attrs: {\n      \"id\": \"отчеты\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%D0%BE%D1%82%D1%87%D0%B5%D1%82%D1%8B\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Отчеты\")]), _c('p', [_vm._v(\"Представьте себе, что кофе был приготовлен, и теперь кофеварке нужно somehow сообщить об этом. Вот где появляются отчеты об обязательствах\\n. В качестве доказательства труда аккаунт добавляет еще один IPFS CID в качестве содержимого отчета при завершении существующего\\nобязательства. Для этого также требуется подпись обещателя.\")]), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"note\",\n      \"title\": \"Report signature\"\n    }\n  }, [_c('p', [_vm._v(\"  Подписанное сообщение содержит существующий индекс обязательства и IPFS CID отчета, закодированный в 32-байтовом представлении. Опять же,\\n  \"), _c('a', {\n    attrs: {\n      \"href\": \"https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"инструмент Python\")]), _vm._v(\" может помочь подписать отчет.\")])]), _c('p', [_vm._v(\"Продолжая пример с кофеваркой:\")]), _c('ol', [_c('li', [_vm._v(\"Отчет - это JSON\")])]), _c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-json\"\n    }\n  }, [_vm._v(\"{\"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-attr\"\n    }\n  }, [_vm._v(\"\\\"report\\\"\")]), _vm._v(\": \"), _c('span', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs-string\"\n    }\n  }, [_vm._v(\"\\\"Coffee made! Time to execute - 80 seconds.\\\"\")]), _vm._v(\"}\")])]), _c('ol', {\n    attrs: {\n      \"start\": \"2\"\n    }\n  }, [_c('li', [_vm._v(\"Его IPFS CID - \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm\")])]), _c('li', [_vm._v(\"Таким образом, \"), _c('strong', [_vm._v(\"payload\")]), _vm._v(\" (преобразованный CID) — это \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2\")])]), _c('li', [_c('strong', [_vm._v(\"Индекс\")]), _vm._v(\" - \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"0\")]), _vm._v(\", это существующий индекс обязательства.\")])]), _c('h3', {\n    attrs: {\n      \"id\": \"1-перейдите-к-extrinsics-liability---finalizereport\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#1-%D0%BF%D0%B5%D1%80%D0%B5%D0%B9%D0%B4%D0%B8%D1%82%D0%B5-%D0%BA-extrinsics-liability---finalizereport\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"1. Перейдите к extrinsics, liability -> finalize(report)\")]), _c('p', [_vm._v(\"Заполните параметры и отправьте внешнее обязательство. Опять же, это может быть сделано 3-ей стороной. \")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"liability/report.jpg\"\n    }\n  }), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"warning\",\n      \"title\": \"Existential deposit\"\n    }\n  }, [_c('p', [_vm._v(\"  Обратите внимание, что учетная запись обещателя не должна быть \\\"мертвой\\\" - у нее должен быть существенный депозит не менее 1 мXRT.\")])]), _c('p', [_vm._v(\"Подпишите и отправьте отчет. После выполнения вы можете изучить его в событиях.\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"liability/new-report.jpg\"\n    }\n  }), _c('h3', {\n    attrs: {\n      \"id\": \"2-исследуйте-reports\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#2-%D0%B8%D1%81%D1%81%D0%BB%D0%B5%D0%B4%D1%83%D0%B9%D1%82%D0%B5-reports\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"2. Исследуйте reports\")]), _c('p', [_vm._v(\"Вы также можете наблюдать отчет в хранилище. Перейдите в \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Developer -> Storage\")]), _vm._v(\" и выберите \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"liability\")]), _vm._v(\" из выпадающего списка.\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"liability/storage-report.jpg\"\n    }\n  }), _c('h3', {\n    attrs: {\n      \"id\": \"3-проверьте-балансы\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#3-%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5-%D0%B1%D0%B0%D0%BB%D0%B0%D0%BD%D1%81%D1%8B\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"3. Проверьте балансы\")]), _c('p', [_vm._v(\"На картинке показано, что теперь обещатель получил \\\"зарплату\\\". Произошли экономические отношения!\")]), _c('robo-wiki-picture', {\n    attrs: {\n      \"src\": \"liability/balances-2.jpg\"\n    }\n  }), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"note\",\n      \"title\": \"Проверка\"\n    }\n  }, [_c('p', [_vm._v(\"  На данный момент нет способа проверить, выполнена ли работа, поэтому как только обещатель сообщает, токены переводятся на его счет.\\n  Функция проверки будет добавлена в будущем.\")])])], 1);\n};\nvar staticRenderFns = [];\n\n\n//# sourceURL=webpack:///./docs/ru/liability.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%2258be6945-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "6z5Y":
/*!**********************************************************************************!*\
  !*** ./docs/ru/liability.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_liability_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./liability.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"4jAU\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_liability_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ru/liability.md?");

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

/***/ "W4++":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/ru/liability.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Liability\",\n  \"contributors\": [\"PaTara43\"],\n  \"tools\": [\"Robonomics 2.3.0 https://github.com/airalab/robonomics\", \"robonomics_interface 1.3.5 https://github.com/Multi-Agent-io/robonomics-interface\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/ru/liability.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "aLNM":
/*!*************************************************************!*\
  !*** ./docs/ru/liability.md?vue&type=template&id=3d5a843e& ***!
  \*************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_liability_md_vue_type_template_id_3d5a843e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"58be6945-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/babel-loader/lib??ref--1-1!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./liability.md?vue&type=template&id=3d5a843e& */ \"6sKc\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_liability_md_vue_type_template_id_3d5a843e___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_liability_md_vue_type_template_id_3d5a843e___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/ru/liability.md?");

/***/ }),

/***/ "mKNI":
/*!******************************!*\
  !*** ./docs/ru/liability.md ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _liability_md_vue_type_template_id_3d5a843e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./liability.md?vue&type=template&id=3d5a843e& */ \"aLNM\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _liability_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./liability.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"6z5Y\");\n/* harmony import */ var _liability_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./liability.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"pEKy\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _liability_md_vue_type_template_id_3d5a843e___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _liability_md_vue_type_template_id_3d5a843e___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _liability_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_liability_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _liability_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_liability_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/ru/liability.md?");

/***/ }),

/***/ "pEKy":
/*!***************************************************************************************!*\
  !*** ./docs/ru/liability.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_liability_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./liability.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"W4++\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_liability_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/ru/liability.md?");

/***/ })

}]);