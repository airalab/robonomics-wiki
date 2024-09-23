// all translation files
const ar = require("../../../translations/pages/ar/ar.json");
const de = require("../../../translations/pages/de/de.json");
const el = require("../../../translations/pages/el/el.json");
const es = require("../../../translations/pages/es/es.json");
const fr = require("../../../translations/pages/fr/fr.json");
const it = require("../../../translations/pages/it/it.json");
const ja = require("../../../translations/pages/ja/ja.json");
const ko = require("../../../translations/pages/ko/ko.json");
const pt = require("../../../translations/pages/pt/pt.json");
const ru = require("../../../translations/pages/ru/ru.json");
const uk = require("../../../translations/pages/uk/uk.json");
const zh = require("../../../translations/pages/zh/zh.json");

let all = Object.assign({}, {ar: ar}, {de: de}, {el: el}, {es: es}, {fr: fr}, {it: it}, {ja: ja}, {ko: ko}, {pt: pt}, {ru: ru}, {uk: uk}, {zh: zh});


const translateLine = (line, lang) => {

  if(lang !== 'en') {
    return all[lang][line]
  } else {
    return line
  }
}

module.exports = {
  translateLine
};