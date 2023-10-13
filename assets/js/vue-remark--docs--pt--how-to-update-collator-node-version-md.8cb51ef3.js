(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--pt--how-to-update-collator-node-version-md"],{

/***/ "1iYL":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"58be6945-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/pt/how-to-update-collator-node-version.md?vue&type=template&id=46bad6df& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c('VueRemarkRoot', [_c('p', [_vm._v(\"Recomenda-se ler os seguintes artigos antes de ler esta postagem: \"), _c('a', {\n    attrs: {\n      \"href\": \"/docs/how-to-build-collator-node\"\n    }\n  }, [_vm._v(\"\\\"Como construir um nó Collator\\\"\")]), _vm._v(\" e \"), _c('a', {\n    attrs: {\n      \"href\": \"/docs/how-to-launch-the-robonomics-collator\"\n    }\n  }, [_vm._v(\"\\\"Como lançar o Robonomics Collator\\\"\")]), _vm._v(\".\")]), _c('p', [_vm._v(\"Este artigo contém os comandos necessarios para atualizar um nó collator Robonomics (executando no Ubuntu) e também dá um exemplo posteriormente.\")]), _c('h2', {\n    attrs: {\n      \"id\": \"comandos-necessários\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#comandos-necess%C3%A1rios\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _c('strong', [_vm._v(\"Comandos necessários\")])]), _c('ol', {\n    attrs: {\n      \"start\": \"0\"\n    }\n  }, [_c('li', [_vm._v(\"Antes de começar, é recomendado que você esteja logado como \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"root\")]), _vm._v(\", caso contrário, recomendo que você use:\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"sudo su -\")])])]), _c('ol', [_c('li', [_vm._v(\"Pare o serviço Robonomics:\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"systemctl stop robonomics.service\")])])]), _c('ol', {\n    attrs: {\n      \"start\": \"2\"\n    }\n  }, [_c('li', [_vm._v(\"Remova a versão anterior do Robonomics (certifique-se de estar no diretório correto):\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz\")])])]), _c('ol', {\n    attrs: {\n      \"start\": \"3\"\n    }\n  }, [_c('li', [_vm._v(\"Obtenha a \"), _c('a', {\n    attrs: {\n      \"href\": \"https://github.com/airalab/robonomics/releases\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"versão mais recente\")]), _vm._v(\" do Robonomics:\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"wget https://github.com/airalab/robonomics/releases/vX.X.X/.....\")])])]), _c('ol', {\n    attrs: {\n      \"start\": \"4\"\n    }\n  }, [_c('li', [_vm._v(\"Extraia o arquivo:\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz\")])])]), _c('ol', {\n    attrs: {\n      \"start\": \"5\"\n    }\n  }, [_c('li', [_vm._v(\"Mova o arquivo:\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"mv robonomics /usr/local/bin/\")])])]), _c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"note\"\n    }\n  }, [_c('p', [_vm._v(\"Você precisa mover este arquivo para o diretório correto onde você instalou o nó Robonomics)\")])]), _c('ol', {\n    attrs: {\n      \"start\": \"6\"\n    }\n  }, [_c('li', [_vm._v(\"Inicie o Robonomics:\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"systemctl start robonomics.service\")])])]), _c('p', [_vm._v(\"Exemplo de atualização do nó collator para Robonomics v1.8.4:\")]), _c('code-helper', [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"sudo su -\\ncd /home/admin\\nsystemctl stop robonomics.service\\nrm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz\\nwget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz\\ntar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz\\nmv robonomics /usr/local/bin/\\nsystemctl start robonomics.service\")])])]), _c('h2', {\n    attrs: {\n      \"id\": \"alterando-o-banco-de-dados-da-cadeia-de-retransmissão-kusama-sem-definir-um-caminho-base\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#alterando-o-banco-de-dados-da-cadeia-de-retransmiss%C3%A3o-kusama-sem-definir-um-caminho-base\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _c('strong', [_vm._v(\"Alterando o banco de dados da cadeia de retransmissão Kusama sem definir um caminho base\")])]), _c('p', [_vm._v(\"Há momentos em que certos instantâneos da cadeia de retransmissão Kusama causam erros no seu nó. Isso geralmente faz com que o nó pare de funcionar. Exemplo de erro causado por um banco de dados corrompido da cadeia de retransmissão:\")]), _c('code-helper', [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] GRANDPA voter error: could not complete a round on disk: Database\\nDec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Essential task `grandpa-voter` failed. Shutting down service.\\nDec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Service(Other(\\\"Essential task failed.\\\"))\\nDec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE\\nDec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.\\nec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Service(Client(Backend(\\\"Invalid argument: Column families not opened: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0\\\")))\\nDec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE\\nDec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.\")])])]), _c('p', [_vm._v(\"Para corrigir esse erro, você deve remover o banco de dados existente da cadeia de retransmissão Kusama (provavelmente RocksDb) e substituí-lo por outro banco de dados, como ParityDb. Execute os seguintes comandos:\")]), _c('ol', [_c('li', [_vm._v(\"Encontre o diretório do nó Robonomics e verifique os arquivos:\")])]), _c('code-helper', [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"cd /home/robonomics/\\nls -a\")])])]), _c('ol', {\n    attrs: {\n      \"start\": \"2\"\n    }\n  }, [_c('li', [_vm._v(\"Confirme que você vê o diretório polkadot e, em seguida, navegue até o diretório chains:\")])]), _c('code-helper', [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"cd /polkadot/chains/\\nls -a\")])])]), _c('ol', {\n    attrs: {\n      \"start\": \"3\"\n    }\n  }, [_c('li', [_vm._v(\"Exclua o diretório \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"ksmcc3\")]), _vm._v(\":\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"rm -r ksmcc3\")])])]), _c('ol', {\n    attrs: {\n      \"start\": \"4\"\n    }\n  }, [_c('li', [_vm._v(\"Crie um novo diretório \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"ksmcc3\")]), _vm._v(\".\")])]), _c('code-helper', [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"mkdir ksmcc3\\nchown -R robonomics:robonomics ksmcc3\\ncd ksmcc3\")])])]), _c('ol', {\n    attrs: {\n      \"start\": \"5\"\n    }\n  }, [_c('li', [_vm._v(\"Agora você precisa baixar um novo instantâneo. Este exemplo usa um instantâneo da cadeia de retransmissão fortemente podado, mas você pode trocá-lo por qualquer instantâneo que preferir.\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz\")])])]), _c('ol', {\n    attrs: {\n      \"start\": \"6\"\n    }\n  }, [_c('li', [_vm._v(\"Enquanto o instantâneo está sendo baixado, abra uma nova sessão e edite seu arquivo de serviço:\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"sudo nano /etc/systemd/system/robonomics.service\")])])]), _c('p', [_vm._v(\"Modifique as linhas dentro do arquivo de serviço que se referem ao banco de dados e poda:\")]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"  --database=paritydb \\\\\\n  --state-pruning=100 \\\\\\n  --blocks-pruning=100 \\\\\\n  --execution=Wasm\")])])]), _c('p', [_vm._v(\"Use \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Ctrl + S\")]), _vm._v(\" e depois \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"Ctrl + X\")]), _vm._v(\" para salvar e sair do arquivo de serviço.\")]), _c('ol', {\n    attrs: {\n      \"start\": \"7\"\n    }\n  }, [_c('li', [_vm._v(\"Agora você precisa recarregar seu daemon.\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"systemctl daemon-reload\")])])]), _c('ol', {\n    attrs: {\n      \"start\": \"8\"\n    }\n  }, [_c('li', [_vm._v(\"Neste momento, em sua outra sessão, esperamos que o novo banco de dados tenha sido baixado, então extraia o arquivo:\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"tar -xvzf ksm_pruned.tar.gz\")])])]), _c('ol', {\n    attrs: {\n      \"start\": \"9\"\n    }\n  }, [_c('li', [_vm._v(\"Após a descompactação ser concluída, execute o seguinte:\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"chown -R robonomics:robonomics paritydb\")])])]), _c('ol', {\n    attrs: {\n      \"start\": \"10\"\n    }\n  }, [_c('li', [_vm._v(\"Agora você pode iniciar o serviço, monitorá-lo em busca de erros e verificar se ele está se conectando tanto à cadeia de retransmissão quanto à parachain.\")])]), _c('code-helper', {\n    attrs: {\n      \"copy\": \"\"\n    }\n  }, [_c('pre', [_c('code', {\n    pre: true,\n    attrs: {\n      \"class\": \"hljs language-shell\"\n    }\n  }, [_vm._v(\"systemctl start robonomics && journalctl -fu robonomics\")])])])], 1);\n};\nvar staticRenderFns = [];\n\n\n//# sourceURL=webpack:///./docs/pt/how-to-update-collator-node-version.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%2258be6945-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "1vV5":
/*!***************************************************************************************!*\
  !*** ./docs/pt/how-to-update-collator-node-version.md?vue&type=template&id=46bad6df& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_update_collator_node_version_md_vue_type_template_id_46bad6df___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"58be6945-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/babel-loader/lib??ref--1-1!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./how-to-update-collator-node-version.md?vue&type=template&id=46bad6df& */ \"1iYL\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_update_collator_node_version_md_vue_type_template_id_46bad6df___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_update_collator_node_version_md_vue_type_template_id_46bad6df___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/pt/how-to-update-collator-node-version.md?");

/***/ }),

/***/ "7gM9":
/*!************************************************************************************************************!*\
  !*** ./docs/pt/how-to-update-collator-node-version.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_update_collator_node_version_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./how-to-update-collator-node-version.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"vmqw\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_update_collator_node_version_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/pt/how-to-update-collator-node-version.md?");

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

/***/ "eICJ":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/pt/how-to-update-collator-node-version.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Como atualizar a versão do nó Robonomics Collator\",\n  \"contributors\": [\"Leemo94\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/pt/how-to-update-collator-node-version.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "uy5O":
/*!********************************************************!*\
  !*** ./docs/pt/how-to-update-collator-node-version.md ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _how_to_update_collator_node_version_md_vue_type_template_id_46bad6df___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./how-to-update-collator-node-version.md?vue&type=template&id=46bad6df& */ \"1vV5\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _how_to_update_collator_node_version_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./how-to-update-collator-node-version.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"7gM9\");\n/* harmony import */ var _how_to_update_collator_node_version_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./how-to-update-collator-node-version.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"xfno\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _how_to_update_collator_node_version_md_vue_type_template_id_46bad6df___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _how_to_update_collator_node_version_md_vue_type_template_id_46bad6df___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _how_to_update_collator_node_version_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_how_to_update_collator_node_version_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _how_to_update_collator_node_version_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_how_to_update_collator_node_version_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/pt/how-to-update-collator-node-version.md?");

/***/ }),

/***/ "vmqw":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/pt/how-to-update-collator-node-version.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/pt/how-to-update-collator-node-version.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "xfno":
/*!*****************************************************************************************************************!*\
  !*** ./docs/pt/how-to-update-collator-node-version.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_update_collator_node_version_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./how-to-update-collator-node-version.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"eICJ\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_update_collator_node_version_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/pt/how-to-update-collator-node-version.md?");

/***/ })

}]);