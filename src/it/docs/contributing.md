---
title: Contribuire
contributors: [positivecrash, ensrationis]
---

Robonomics è un progetto open source, e vogliamo che chiunque possa contribuire facilmente. Puoi segnalare un problema, proporre una modifica, migliorare il codice o questa documentazione. Apri una issue o una pull request nel repository a cui appartiene la modifica.

## Repository principali

- [airalab/robonomics](https://github.com/airalab/robonomics): il runtime e i suoi pallet. Ha i propri CONTRIBUTING.md e SECURITY.md.
- [airalab/robins](https://github.com/airalab/robins): strumenti, tra cui lo strumento a riga di comando `cps` e i gateway per i dispositivi.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): la libreria Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): l'app web su [robonomics.app](https://robonomics.app).
- [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki): questa wiki.
- [airalab/robonomics.network](https://github.com/airalab/robonomics.network): il sito principale.
- [airalab/robonomics.academy](https://github.com/airalab/robonomics.academy): il sito di Robonomics Academy.

## Segnalare problemi

1. Scegli il repository a cui appartiene la issue.
2. Se è un bug, controlla che non sia già stato segnalato.
3. Scrivi un titolo e una descrizione chiari, con tutte le informazioni utili che puoi dare.
4. Per questa wiki usa il modello di issue e indica la pagina da correggere.

Non segnalare vulnerabilità di sicurezza in issue pubbliche. Segui SECURITY.md in [airalab/robonomics](https://github.com/airalab/robonomics): prevede segnalazioni private tramite GitHub Security Advisories.

## Proporre modifiche alla rete

Le modifiche al runtime e ai suoi parametri le decidono i possessori di XRT. Prima descrivi l'idea in una issue su [airalab/robonomics](https://github.com/airalab/robonomics/issues), poi portala a un referendum. Vedi [XRT e governance](/docs/xrt-and-governance/#how-to-propose-a-change).

## Pull request

1. Per piccole correzioni, come i refusi, è meglio una pull request che una issue.
2. Descrivi il problema e la soluzione nella pull request. Collega la issue relativa, se c'è.
3. Non inviare pull request che correggono solo spazi o formattazione.
4. Segui lo stile, la lingua e l'impaginazione del testo circostante.

## Modificare questa wiki

La wiki è costruita con Eleventy. Ti serve Node.js 20, oppure 22 o successivo.

1. Clona [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki), poi esegui `npm install` e `npm run start` per servirla in locale.
2. Le pagine sono file Markdown in `src/docs/`. Ognuna inizia con un frontmatter: `title`, `contributors` (nomi utente GitHub) e, facoltativamente, `tools`.
3. La barra laterale è `src/_data/sidebar_docs.json`. Quando aggiungi una voce, aggiungi il suo titolo anche a `translations/pages/en.json`.

Il [README](https://github.com/airalab/robonomics-wiki#readme) spiega i componenti delle pagine e il flusso di traduzione.
