// all translation files
import ar from '../../../translations/pages/ar/ar.json' assert { type: 'json' };
import de from '../../../translations/pages/de/de.json' assert { type: 'json' };
import el from '../../../translations/pages/el/el.json' assert { type: 'json' };
import es from '../../../translations/pages/es/es.json' assert { type: 'json' };
import fr from '../../../translations/pages/fr/fr.json' assert { type: 'json' };
import it from '../../../translations/pages/it/it.json' assert { type: 'json' };
import ja from '../../../translations/pages/ja/ja.json' assert { type: 'json' };
import ko from '../../../translations/pages/ko/ko.json' assert { type: 'json' };
import pt from '../../../translations/pages/pt/pt.json' assert { type: 'json' };
import ru from '../../../translations/pages/ru/ru.json' assert { type: 'json' };
import uk from '../../../translations/pages/uk/uk.json' assert { type: 'json' };
import zh from '../../../translations/pages/zh/zh.json' assert { type: 'json'};

let all = Object.assign({}, {ar: ar}, {de: de}, {el: el}, {es: es}, {fr: fr}, {it: it}, {ja: ja}, {ko: ko}, {pt: pt}, {ru: ru}, {uk: uk}, {zh: zh});


export const translateLine = (line, lang) => {

  if(lang !== 'en') {
    return all[lang][line]
  } else {
    return line
  }
}