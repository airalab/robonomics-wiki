(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vue-remark--docs--el--how-to-launch-the-robonomics-collator-md"],{

/***/ "8+pl":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/gridsome","cacheIdentifier":"58be6945-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/el/how-to-launch-the-robonomics-collator.md?vue&type=template&id=a4d2c646& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c('VueRemarkRoot', [_c('robo-wiki-note', {\n    attrs: {\n      \"type\": \"note\",\n      \"title\": \"Note\"\n    }\n  }, [_vm._v(\"\\n  Στο συνεχόμενο βίντεο και στις στιγμιότυπες οθόνης αυτού του άρθρου, χρησιμοποιήσαμε την έκδοση 1.4.0 του Robonomics. Θα πρέπει να χρησιμοποιήσετε τις ίδιες εντολές, αλλά να αντικαταστήσετε την έκδοση του Robonomics με την τρέχουσα.\\n\")]), _c('div', {\n    staticClass: \"youtube-embed\"\n  }, [_c('div', {\n    staticStyle: {\n      \"width\": \"100%\",\n      \"margin\": \"0 auto\"\n    }\n  }, [_c('div', {\n    staticStyle: {\n      \"position\": \"relative\",\n      \"padding-bottom\": \"56.25%\",\n      \"padding-top\": \"25px\",\n      \"height\": \"0\"\n    }\n  }, [_c('iframe', {\n    staticStyle: {\n      \"position\": \"absolute\",\n      \"top\": \"0\",\n      \"left\": \"0\",\n      \"width\": \"100%\",\n      \"height\": \"100%\"\n    },\n    attrs: {\n      \"src\": \"https://www.youtube-nocookie.com/embed/wUTDDLDbzTg\",\n      \"allow\": \"autoplay; encrypted-media\",\n      \"allowfullscreen\": \"\"\n    }\n  })])])]), _c('p', [_vm._v(\"Αυτήν τη στιγμή, το δίκτυο Robonomics διατηρείται κυρίως από τους αρχικούς προγραμματιστές, αλλά οποιοσδήποτε μπορεί να υποστηρίξει το έργο. Κάθε πιπλέον πλήρης κόμβος της αλυσίδας μπλοκ βοηθά να γίνει πιο βιώσιμο και ανθεκτικό σε σφάλματα. Οι δυαδικοί κόμβοι του Robonomics είναι διαθέσιμοι στο \"), _c('a', {\n    attrs: {\n      \"href\": \"https://github.com/airalab/robonomics/releases\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"release\")]), _vm._v(\" assets ή μπορεί να δημιουργηθεί \"), _c('a', {\n    attrs: {\n      \"href\": \"/docs/how-to-build-collator-node/\"\n    }\n  }, [_vm._v(\"από την πηγή\")]), _vm._v(\".\")]), _c('h2', {\n    attrs: {\n      \"id\": \"τι-είναι-ένας-συλλέκτης\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%CF%84%CE%B9-%CE%B5%CE%AF%CE%BD%CE%B1%CE%B9-%CE%AD%CE%BD%CE%B1%CF%82-%CF%83%CF%85%CE%BB%CE%BB%CE%AD%CE%BA%CF%84%CE%B7%CF%82\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Τι είναι ένας συλλέκτης\")]), _c('p', [_vm._v(\"Ένας Συλλέκτης είναι μέρος του Robonomics parachain. Αυτός ο τύπος κόμβου δημιουργεί νέα μπλοκ για την αλυσίδα Robonomics.\")]), _c('blockquote', [_c('p', [_vm._v(\"Οι συλλέκτες διατηρούν τα parachains συλλέγοντας συναλλαγές parachain από χρήστες και παράγοντας αποδείξεις μετάβασης κατάστασης για τους επικυρωτές της Relay Chain. Με άλλα λόγια, οι συλλέκτες διατηρούν τα parachains συγκεντρώνοντας συναλλαγές parachain σε υποψήφια μπλοκ parachain και παράγοντας αποδείξεις μετάβασης κατάστασης για τους επικυρωτές βάσει αυτών των μπλοκ.\")])]), _c('p', [_vm._v(\"Μπορείτε να μάθετε περισσότερα για τους συλλέκτες στη σχετική \"), _c('a', {\n    attrs: {\n      \"href\": \"https://wiki.polkadot.network/docs/learn-collator\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"σελίδα του wiki του Polkadot\")])]), _c('p', [_vm._v(\"Στην parachain Robonomics, κάθε ταξινομητής λαμβάνει ανταμοιβές (\"), _c('strong', [_vm._v(\"0,001598184 XRT\")]), _vm._v(\") για κάθε μπλοκ που δημιουργεί ο ταξινομητής (οι ανταμοιβές εμφανίζονται όταν τα μπλοκ σφραγίζονται στην αλυσίδα).\\nΕπίσης, ο συλλέκτης που δημιουργεί το μπλοκ λαμβάνει \"), _c('strong', [_vm._v(\"50% των προμηθειών συναλλαγών\")]), _vm._v(\" που περιέχονται στο μπλοκ που δημιουργούν.\")]), _c('h2', {\n    attrs: {\n      \"id\": \"απαιτήσεις\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%CE%B1%CF%80%CE%B1%CE%B9%CF%84%CE%AE%CF%83%CE%B5%CE%B9%CF%82\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Απαιτήσεις\")]), _c('p', [_vm._v(\"Συνιστάται να ξεκινήσετε έναν συλλέκτη χρησιμοποιώντας τις \"), _c('strong', [_vm._v(\"τυπικές απαιτήσεις υλικού\")]), _vm._v(\" για τους \"), _c('a', {\n    attrs: {\n      \"href\": \"https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"επικυρωτές του Polkadot\")]), _vm._v(\":\")]), _c('ul', [_c('li', [_vm._v(\"Συμβατό με x86-64.\")]), _c('li', [_vm._v(\"Intel Ice Lake, ή νεότερο (Xeon ή Core σειρά); AMD Zen3, ή νεότερο (EPYC ή Ryzen).\")]), _c('li', [_vm._v(\"4 φυσικοί πυρήνες @ 3.4GHz.\")]), _c('li', [_vm._v(\"Απενεργοποιημένη ταυτόχρονη πολυνηματοποίηση (Hyper-Threading στην Intel, SMT στην AMD).\")]), _c('li', [_vm._v(\"Αποθήκευση - Ένας NVMe SSD 1 TB (Καθώς πρέπει να έχει λογικό μέγεθος για να αντιμετωπίσει την ανάπτυξη της αλυσίδας μπλοκ).\")]), _c('li', [_vm._v(\"Μνήμη - 32 GB DDR4 ECC\")])]), _c('p', [_vm._v(\"Σε αυτό το άρθρο χρησιμοποιούμε τις επόμενες προδιαγραφές:\")]), _c('ul', [_c('li', [_vm._v(\"4 vCPU\")]), _c('li', [_vm._v(\"700 GB χώρου NVMe για τις βάσεις δεδομένων του συλλέκτη. Απαιτείται η δυνατότητα επέκτασης αυτού του χώρου δίσκου.\")]), _c('li', [_vm._v(\"8GB RAM\")])]), _c('h2', {\n    attrs: {\n      \"id\": \"σημαντικές-πληροφορίες\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%CF%83%CE%B7%CE%BC%CE%B1%CE%BD%CF%84%CE%B9%CE%BA%CE%AD%CF%82-%CF%80%CE%BB%CE%B7%CF%81%CE%BF%CF%86%CE%BF%CF%81%CE%AF%CE%B5%CF%82\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Σημαντικές πληροφορίες\")]), _c('ol', [_c('li', [_c('p', [_vm._v(\"Χρησιμοποιούμε μερικές μεταβλητές σε αυτές τις οδηγίες και θα πρέπει να αντικαταστήσετε τις τιμές με τις δικές σας σε όλες τις εντολές:\")]), _c('ul', [_c('li', [_c('strong', [_vm._v(\"%NODE_NAME%\")]), _vm._v(\" είναι το όνομα του κόμβου. Παράδειγμα: \"), _c('em', [_vm._v(\"my-robonomics-kusama-collator\")])]), _c('li', [_c('strong', [_vm._v(\"%BASE_PATH%\")]), _vm._v(\" είναι η διαδρομή προς τοποθετημένο όγκο. Παράδειγμα: \"), _c('em', [_vm._v(\"/mnt/HC_Volume_16056435/\")])]), _c('li', [_c('strong', [_vm._v(\"%POLKADOT_ACCOUNT_ADDRESS%\")]), _vm._v(\" είναι η διεύθυνση λογαριασμού στο οικοσύστημα του Polkadot σε μορφή SS58. Παράδειγμα: \"), _c('em', [_vm._v(\"4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu\")])])])]), _c('li', [_c('p', [_vm._v(\"Σημειώστε ότι πρέπει να περιλαμβάνετε το \"), _c('em', [_vm._v(\"--state-cache-size=0\")]), _vm._v(\" στην εκκίνηση της υπηρεσίας του συλλέκτη. Αυτή η παράμετρος είναι σημαντική για την σταθερότητα του συλλέκτη.\\nΜπορείτε να δείτε περισσότερες πληροφορίες στο σχετικό \"), _c('a', {\n    attrs: {\n      \"href\": \"https://github.com/airalab/robonomics/issues/234\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"θέμα\")]), _vm._v(\" στο github.\")])])]), _c('h2', {\n    attrs: {\n      \"id\": \"πρώτη-φορά-εύκολα-ξεκινήστε-έναν-συλλέκτη-robonomics\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%CF%80%CF%81%CF%8E%CF%84%CE%B7-%CF%86%CE%BF%CF%81%CE%AC-%CE%B5%CF%8D%CE%BA%CE%BF%CE%BB%CE%B1-%CE%BE%CE%B5%CE%BA%CE%B9%CE%BD%CE%AE%CF%83%CF%84%CE%B5-%CE%AD%CE%BD%CE%B1%CE%BD-%CF%83%CF%85%CE%BB%CE%BB%CE%AD%CE%BA%CF%84%CE%B7-robonomics\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Πρώτη φορά εύκολα ξεκινήστε έναν συλλέκτη Robonomics\")]), _c('p', [_vm._v(\"Μπορείτε εύκολα να ξεκινήσετε έναν συλλέκτη απευθείας από τη γραμμή εντολών για να ελέγξετε για σφάλματα.\\nΜετά από αυτό, συνιστάται ιδιαίτερα να ξεκινήσετε τον συλλέκτη Robonomics ως υπηρεσία (δείτε το επόμενο βήμα).\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"root@robokusama-collator-screencast:~# robonomics \\\\\\n  --parachain-id=2048 \\\\\\n  --name=\\\"%NODE_NAME%\\\" \\\\\\n  --validator \\\\\\n  --lighthouse-account=\\\"%POLKADOT_ACCOUNT_ADDRESS%\\\" \\\\\\n  --telemetry-url=\\\"wss://telemetry.parachain.robonomics.network/submit/ 0\\\" \\\\\\n  --base-path=\\\"%BASE_PATH%\\\" \\\\\\n  --state-cache-size=0 \\\\\\n  -- \\\\\\n  --database=RocksDb \\n\")])]), _c('h2', {\n    attrs: {\n      \"id\": \"ξεκινήστε-τον-συλλέκτη-robonomics-ως-υπηρεσία\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%CE%BE%CE%B5%CE%BA%CE%B9%CE%BD%CE%AE%CF%83%CF%84%CE%B5-%CF%84%CE%BF%CE%BD-%CF%83%CF%85%CE%BB%CE%BB%CE%AD%CE%BA%CF%84%CE%B7-robonomics-%CF%89%CF%82-%CF%85%CF%80%CE%B7%CF%81%CE%B5%CF%83%CE%AF%CE%B1\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Ξεκινήστε τον συλλέκτη Robonomics ως υπηρεσία\")]), _c('ol', [_c('li', [_c('p', [_vm._v(\"Δημιουργήστε τον χρήστη για την υπηρεσία με τον κατάλογο αρχικού καταλόγου\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"root@robokusama-collator-screencast:~# useradd -m robonomics\\n\")])])]), _c('li', [_c('p', [_vm._v(\"Κατεβάστε, αποσυμπιέστε και μετακινήστε το δυαδικό του Robonomics στον κατάλογο \"), _c('em', [_vm._v(\"/usr/local/bin/\")]), _vm._v(\". Θα πρέπει να αντικαταστήσετε το \"), _c('em', [_vm._v(\"$ROBONOMICS_VERSION\")]), _vm._v(\" με την τρέχουσα έκδοση του Robonomics στις εντολές σε αυτήν την ενότητα. Μπορείτε να βρείτε την τρέχουσα έκδοση στη \"), _c('a', {\n    attrs: {\n      \"href\": \"https://github.com/airalab/robonomics/releases\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"σελίδα Κυκλοφορίας του αποθετηρίου Robonomics στο github\")]), _vm._v(\".\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz\\nroot@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz\\nroot@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/\\n\")])]), _c('p', [_c('g-image', {\n    attrs: {\n      \"src\": __webpack_require__(/*! !assets-loader?alt=Download%20Robonomics%201.4.0%20binary!../images/how-to-launch-the-robonomics-collator/wget_binary.png */ \"DckE\"),\n      \"alt\": \"Download Robonomics 1.4.0 binary\"\n    }\n  })], 1)])]), _c('ol', {\n    attrs: {\n      \"start\": \"3\"\n    }\n  }, [_c('li', [_c('p', [_vm._v(\"Δημιουργήστε το αρχείο υπηρεσίας systemd με το όνομα \"), _c('em', [_vm._v(\"robonomics.service\")]), _vm._v(\":\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service\\n\")])]), _c('p', [_vm._v(\"Και προσθέστε τις παρακάτω γραμμές στο αρχείο υπηρεσίας:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"[Unit]\\nDescription=robonomics\\nAfter=network.target\\n\\n[Service]\\nUser=robonomics\\nGroup=robonomics\\nType=simple\\nRestart=on-failure\\n\\nExecStart=/usr/local/bin/robonomics \\\\\\n  --parachain-id=2048 \\\\\\n  --name=\\\"%NODE_NAME%\\\" \\\\\\n  --validator \\\\\\n  --lighthouse-account=\\\"%POLKADOT_ACCOUNT_ADDRESS%\\\" \\\\\\n  --telemetry-url=\\\"wss://telemetry.parachain.robonomics.network/submit/ 0\\\" \\\\\\n  --base-path=\\\"%BASE_PATH%\\\" \\\\\\n  --state-cache-size=0 \\\\\\n  --execution=Wasm \\\\\\n  -- \\\\\\n  --database=RocksDb \\\\\\n  --execution=Wasm\\n\\n[Install]\\nWantedBy=multi-user.target\\n\")])]), _c('p', [_c('g-image', {\n    attrs: {\n      \"src\": __webpack_require__(/*! !assets-loader?alt=Create%20Robonomics%20service%20file!../images/how-to-launch-the-robonomics-collator/nano_robonomics_service.png */ \"uVHJ\"),\n      \"alt\": \"Create Robonomics service file\"\n    }\n  })], 1)])]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"```\\nroot@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%\\n```\\n\")])]), _c('ol', {\n    attrs: {\n      \"start\": \"4\"\n    }\n  }, [_c('li', [_vm._v(\"Αποθηκεύστε αυτό το αρχείο, και στη συνέχεια ενεργοποιήστε και ξεκινήστε την υπηρεσία:\"), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"root@robokusama-collator-screencast:~# systemctl enable robonomics.service \\nroot@robokusama-collator-screencast:~# systemctl start robonomics.service\\n\")])])])]), _c('p', [_vm._v(\"Διεύθυνση URL τηλεμετρίας: \"), _c('a', {\n    attrs: {\n      \"href\": \"https://telemetry.parachain.robonomics.network/#/Robonomics\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"https://telemetry.parachain.robonomics.network/#/Robonomics\")])]), _c('p', [_vm._v(\"Τα αρχεία καταγραφής συλλαγτών μπορούν να παρακολουθούνται με: \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"journalctl -u robonomics.service -f\")])]), _c('p', [_vm._v(\"Μόλις εκκινηθεί ο συλλέκτης Robonomics, θα αρχίσει να συγχρονίζεται με την αλυσίδα αναμετάδοσης Kusama, αυτό μπορεί να διαρκέσει σημαντικό χρόνο, ανάλογα με την ταχύτητα του δικτύου σας και τις προδιαγραφές του συστήματός σας, γι' αυτό σας συνιστούμε να κάνετε λήψη ενός στιγμιότυπου Kusama.\")]), _c('h2', {\n    attrs: {\n      \"id\": \"επιτάχυνση-της-διαδικασίας-συγχρονισμού-χρησιμοποιώντας-ένα-στιγμιότυπο-kusama\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%CE%B5%CF%80%CE%B9%CF%84%CE%AC%CF%87%CF%85%CE%BD%CF%83%CE%B7-%CF%84%CE%B7%CF%82-%CE%B4%CE%B9%CE%B1%CE%B4%CE%B9%CE%BA%CE%B1%CF%83%CE%AF%CE%B1%CF%82-%CF%83%CF%85%CE%B3%CF%87%CF%81%CE%BF%CE%BD%CE%B9%CF%83%CE%BC%CE%BF%CF%8D-%CF%87%CF%81%CE%B7%CF%83%CE%B9%CE%BC%CE%BF%CF%80%CE%BF%CE%B9%CF%8E%CE%BD%CF%84%CE%B1%CF%82-%CE%AD%CE%BD%CE%B1-%CF%83%CF%84%CE%B9%CE%B3%CE%BC%CE%B9%CF%8C%CF%84%CF%85%CF%80%CE%BF-kusama\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Επιτάχυνση της διαδικασίας συγχρονισμού χρησιμοποιώντας ένα στιγμιότυπο Kusama\")]), _c('p', [_vm._v(\"Συνιστούμε να το κάνετε αμέσως μετά τη δημιουργία και την έναρξη της υπηρεσίας Robonomics. Μπορείτε να βρείτε περισσότερες πληροφορίες σχετικά με τα στιγμιότυπα και τις οδηγίες χρήσης στην ακόλουθη σελίδα: \"), _c('a', {\n    attrs: {\n      \"href\": \"https://ksm-rocksdb.polkashots.io/\",\n      \"target\": \"_blank\",\n      \"rel\": \"nofollow noopener noreferrer\"\n    }\n  }, [_vm._v(\"https://ksm-rocksdb.polkashots.io/\")])]), _c('p', [_vm._v(\"Οδηγίες:\")]), _c('ol', [_c('li', [_c('p', [_vm._v(\"Διακόψτε την υπηρεσία Robonomics και αφαιρέστε τον τρέχοντα κατάλογο βάσης δεδομένων Kusama:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"root@robokusama-collator-screencast:~# systemctl stop robonomics.service\\nroot@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/\\n\")])])]), _c('li', [_c('p', [_vm._v(\"Κατεβάστε το πραγματικό στιγμιότυπο και αποσυμπιέστε το:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4\\nroot@robokusama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3\\n\")])]), _c('p', [_c('g-image', {\n    attrs: {\n      \"src\": __webpack_require__(/*! !assets-loader?alt=Download%20Kusama%20snapshot!../images/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png */ \"5AcP\"),\n      \"alt\": \"Download Kusama snapshot\"\n    }\n  })], 1), _c('p', [_vm._v(\"Μπορείτε να αφαιρέσετε το ληφθέν αρχείο μετά την επιτυχή αποσυσκευασία:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4\\n\")])])]), _c('li', [_c('p', [_vm._v(\"Ορίστε τη σωστή κυριότητα για τον φάκελο της βάσης δεδομένων:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3\\n\")])])]), _c('li', [_c('p', [_vm._v(\"Ξεκινήστε ξανά την υπηρεσία Robonomics:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"root@robokusama-collator-screencast:~# systemctl start robonomics.service\\n\")])])]), _c('li', [_c('p', [_vm._v(\"Ελέγξτε τα αρχεία καταγραφής της υπηρεσίας:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f\\n\")])]), _c('p', [_c('g-image', {\n    attrs: {\n      \"src\": __webpack_require__(/*! !assets-loader?alt=Check%20service%20logs!../images/how-to-launch-the-robonomics-collator/finish_journalctl.png */ \"0J1J\"),\n      \"alt\": \"Check service logs\"\n    }\n  })], 1)])]), _c('h2', {\n    attrs: {\n      \"id\": \"επίλυση-προβλημάτων\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%CE%B5%CF%80%CE%AF%CE%BB%CF%85%CF%83%CE%B7-%CF%80%CF%81%CE%BF%CE%B2%CE%BB%CE%B7%CE%BC%CE%AC%CF%84%CF%89%CE%BD\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Επίλυση Προβλημάτων\")]), _c('h3', {\n    attrs: {\n      \"id\": \"σφάλμα-state-database-error-too-many-sibling-blocks-inserted\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%CF%83%CF%86%CE%AC%CE%BB%CE%BC%CE%B1-state-database-error-too-many-sibling-blocks-inserted\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Σφάλμα: \\\"State Database error: Too many sibling blocks inserted\\\"\")]), _c('p', [_vm._v(\"Για να διορθώσετε αυτό το σφάλμα, μπορείτε απλώς να εκκινήσετε τον ταξινομητή σας σε λειτουργία αρχειοθέτησης:\")]), _c('p', [_vm._v(\"1) Πρώτα, χρειάζεται να διακόψετε την υπηεσία Robonomics: \")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"root@robokusama-collator-screencast:~# systemctl stop robonomics.service\\n\")])]), _c('p', [_vm._v(\"2) Στη συνέχεια, προσθέστε την παράμετρο \"), _c('code', {\n    pre: true\n  }, [_vm._v(\"--state-pruning=archive\")]), _vm._v(\" στο τμήμα parachain του αρχείου υπηρεσίας. Παράδειγμα του επεξεργασμένου αρχείου υπηρεσίας:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"```\\n[Unit]\\nDescription=robonomics\\nAfter=network.target\\n\\n[Service]\\nUser=robonomics\\nGroup=robonomics\\nType=simple\\nRestart=on-failure\\n\\nExecStart=/usr/local/bin/robonomics \\\\\\n--parachain-id=2048 \\\\\\n--name=\\\"%NODE_NAME%\\\" \\\\\\n--validator \\\\\\n--lighthouse-account=\\\"%POLKADOT_ACCOUNT_ADDRESS%\\\" \\\\\\n--telemetry-url=\\\"wss://telemetry.parachain.robonomics.network/submit/ 0\\\" \\\\\\n--base-path=\\\"%BASE_PATH%\\\" \\\\\\n--state-cache-size=0 \\\\\\n--execution=Wasm \\\\\\n--state-pruning=archive \\\\\\n-- \\\\\\n--database=RocksDb \\\\\\n--execution=Wasm \\n\\n[Install]\\nWantedBy=multi-user.target\\n```\\n\")])]), _c('p', [_vm._v(\"3) Επαναφορτώστε τη διαμόρφωση του διαχειριστή systemd:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"```\\nroot@robokusama-collator-screencast:~# systemctl daemon-reload\\n```\\n\")])]), _c('p', [_vm._v(\"4) Αφαιρέστε την υπάρχουσα βάση δεδομένων parachain:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"```\\nroot@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/\\n```\\n\")])]), _c('p', [_vm._v(\"5) Ξεκινήστε την υπηρεσία robonomics:\")]), _c('pre', [_c('code', {\n    pre: true\n  }, [_vm._v(\"```\\nroot@robokusama-collator-screencast:~# systemctl start robonomics.service\\n```\\n\\nΜετά από αυτό, χρειάζεται να περιμένετε για τον συγχρονισμό της βάσης δεδομένων parahain.\\n\")])]), _c('h3', {\n    attrs: {\n      \"id\": \"σφάλμα-cannot-create-module-compilation-settings-are-not-compatible-with-the-native-host\"\n    }\n  }, [_c('a', {\n    attrs: {\n      \"href\": \"#%CF%83%CF%86%CE%AC%CE%BB%CE%BC%CE%B1-cannot-create-module-compilation-settings-are-not-compatible-with-the-native-host\",\n      \"aria-hidden\": \"true\"\n    }\n  }, [_vm._v(\"#\")]), _vm._v(\"Σφάλμα: \\\"cannot create module: compilation settings are not compatible with the native host\\\"\")]), _c('p', [_vm._v(\"Αυτό το σφάλμα σχετίζεται με τις παραμέτρους εικονικοποίησης. Χρειάζεται να χρησιμοποιήσετε τον τύπο \\\"host-model\\\" του εμούλαριστου επεξεργαστή. Μπορείτε να ρυθμίσετε αυτό στον κεντρικό υπολογιστή εικονικοποίησης.\")]), _c('p', [_vm._v(\"Ωστόσο, αν αντιμετωπίσετε αυτό το σφάλμα σε οποιοδήποτε φιλοξενούμενο, χρειάζεται να ζητήσετε υποστήριξη από την τεχνική υποστήριξη για αυτό το πρόβλημα μόνο.\")])], 1);\n};\nvar staticRenderFns = [];\n\n\n//# sourceURL=webpack:///./docs/el/how-to-launch-the-robonomics-collator.md?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/gridsome%22,%22cacheIdentifier%22:%2258be6945-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/babel-loader/lib??ref--1-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "Vg1P":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/el/how-to-launch-the-robonomics-collator.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initFrontMatter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"Kw5r\");\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.optionMergeStrategies;\nvar key = '__vueRemarkFrontMatter';\nvar data = {\n  \"excerpt\": null,\n  \"title\": \"Πώς να ξεκινήσετε τον συλλέκτη Robonomics\",\n  \"contributors\": [\"dergudzon\", \"Leemo94\"],\n  \"tools\": [\"Ubuntu 22.04.1 https://releases.ubuntu.com/22.04/\", \"Robonomics 2.6.0 https://github.com/airalab/robonomics\"]\n};\nfunction initFrontMatter(Component) {\n  if (Component.options[key]) {\n    Component.options[key] = data;\n  }\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].util.defineReactive(Component.options, key, data);\n  Component.options.computed = strats.computed({\n    $frontmatter: function $frontmatter() {\n      return Component.options[key];\n    }\n  }, Component.options.computed);\n}\n\n//# sourceURL=webpack:///./docs/el/how-to-launch-the-robonomics-collator.md?./node_modules/babel-loader/lib??ref--16-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "ZwxT":
/*!*******************************************************************************************************************!*\
  !*** ./docs/el/how-to-launch-the-robonomics-collator.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_launch_the_robonomics_collator_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--16-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./how-to-launch-the-robonomics-collator.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"Vg1P\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_16_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_launch_the_robonomics_collator_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/el/how-to-launch-the-robonomics-collator.md?");

/***/ }),

/***/ "eZFP":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./docs/el/how-to-launch-the-robonomics-collator.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@gridsome/vue-remark/src/VueRemarkRoot.js */ \"UQSp\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"Kw5r\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n\n\nvar strats = vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].config.optionMergeStrategies;\nvar imported = {\n  VueRemarkRoot: _home_runner_work_robonomics_wiki_robonomics_wiki_node_modules_gridsome_vue_remark_src_VueRemarkRoot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n  var components = Component.options.components = Component.options.components || {};\n  var computed = Component.options.computed = Component.options.computed || {};\n  Object.keys(imported).forEach(function (key) {\n    if (_typeof(imported[key]) === 'object' && typeof imported[key].render === 'function') {\n      components[key] = imported[key];\n    } else if (typeof imported[key] === 'function' && typeof imported[key].options.render === 'function') {\n      components[key] = imported[key];\n    } else {\n      computed[key] = function () {\n        return imported[key];\n      };\n    }\n  });\n});\n\n//# sourceURL=webpack:///./docs/el/how-to-launch-the-robonomics-collator.md?./node_modules/babel-loader/lib??ref--15-0!./node_modules/vue-loader/lib??ref--17-0!./node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1");

/***/ }),

/***/ "enkg":
/*!**************************************************************************************************************!*\
  !*** ./docs/el/how-to-launch-the-robonomics-collator.md?vue&type=custom&index=0&blockType=vue-remark-import ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_launch_the_robonomics_collator_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--15-0!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./how-to-launch-the-robonomics-collator.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"eZFP\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_15_0_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_launch_the_robonomics_collator_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./docs/el/how-to-launch-the-robonomics-collator.md?");

/***/ }),

/***/ "qtZQ":
/*!*****************************************************************************************!*\
  !*** ./docs/el/how-to-launch-the-robonomics-collator.md?vue&type=template&id=a4d2c646& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_launch_the_robonomics_collator_md_vue_type_template_id_a4d2c646___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/gridsome\",\"cacheIdentifier\":\"58be6945-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/babel-loader/lib??ref--1-1!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/vue-loader/lib??ref--17-0!../../node_modules/@gridsome/vue-remark/lib/loader.js??ref--17-1!./how-to-launch-the-robonomics-collator.md?vue&type=template&id=a4d2c646& */ \"8+pl\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_launch_the_robonomics_collator_md_vue_type_template_id_a4d2c646___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_gridsome_cacheIdentifier_58be6945_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_babel_loader_lib_index_js_ref_1_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_ref_17_0_node_modules_gridsome_vue_remark_lib_loader_js_ref_17_1_how_to_launch_the_robonomics_collator_md_vue_type_template_id_a4d2c646___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./docs/el/how-to-launch-the-robonomics-collator.md?");

/***/ }),

/***/ "xTLO":
/*!**********************************************************!*\
  !*** ./docs/el/how-to-launch-the-robonomics-collator.md ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _how_to_launch_the_robonomics_collator_md_vue_type_template_id_a4d2c646___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./how-to-launch-the-robonomics-collator.md?vue&type=template&id=a4d2c646& */ \"qtZQ\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"KHd+\");\n/* harmony import */ var _how_to_launch_the_robonomics_collator_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./how-to-launch-the-robonomics-collator.md?vue&type=custom&index=0&blockType=vue-remark-import */ \"enkg\");\n/* harmony import */ var _how_to_launch_the_robonomics_collator_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./how-to-launch-the-robonomics-collator.md?vue&type=custom&index=1&blockType=vue-remark-frontmatter */ \"ZwxT\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _how_to_launch_the_robonomics_collator_md_vue_type_template_id_a4d2c646___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _how_to_launch_the_robonomics_collator_md_vue_type_template_id_a4d2c646___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _how_to_launch_the_robonomics_collator_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"] === 'function') Object(_how_to_launch_the_robonomics_collator_md_vue_type_custom_index_0_blockType_vue_remark_import__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(component)\n\nif (typeof _how_to_launch_the_robonomics_collator_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_how_to_launch_the_robonomics_collator_md_vue_type_custom_index_1_blockType_vue_remark_frontmatter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./docs/el/how-to-launch-the-robonomics-collator.md?");

/***/ })

}]);