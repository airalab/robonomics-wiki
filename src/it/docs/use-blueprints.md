---
title: Come Utilizzare i Progetti
contributors: [tubleronchik]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

In questo articolo imparerai come aggiungere i progetti di automazione al tuo Home Assistant e configurarli.

## Automazioni con Progetti

Alcuni progetti sono già installati. Le automazioni basate su tali progetti devono solo essere configurate. Nell'interfaccia web puoi trovare i progetti preinstallati in `Impostazioni/Automazioni e Scene`. Apri `Progetti` e trova il progetto che desideri utilizzare. In questo esempio verrà utilizzato `Luce Attivata dal Movimento`.

{% roboWikiPicture {src:"docs/home-assistant/blueprint-settings.jpg", alt:"Impostazioni del Progetto"} %}{% endroboWikiPicture %}

Clicca su `Crea Automazione` per aprire l'editor di automazioni. Dai un nome, scegli un progetto da utilizzare (`Luce Attivata dal Movimento` nel nostro caso). Dopo di che devi scegliere il sensore di movimento e la lampada. Quando la configurazione è completata, clicca su `Salva`.

{% roboWikiPicture {src:"docs/home-assistant/automation-configure.jpg", alt:"Configurazione dell'Automazione"} %}{% endroboWikiPicture %}

Se desideri apportare modifiche, puoi trovarlo andando su `Impostazioni/Automazioni e Scene` e poi `Automazioni`.

{% roboWikiPicture {src:"docs/home-assistant/automations-all.jpg", alt:"Elenco delle Automazioni"} %}{% endroboWikiPicture %}

## Importare i Progetti

Home Assistant può importare progetti dai forum di Home Assistant, da GitHub e da GitHub gists. L'elenco di tutti i Progetti si trova su [Blueprints Exchange](https://community.home-assistant.io/c/blueprints-exchange/53). Dopo aver scelto, vai su `Impostazioni/Automazioni e Scene` e apri `Progetti`. Clicca su `Importa Progetto` e inserisci l'URL del progetto scelto. Quindi clicca su `ANTEPRIMA PROGETTO`. In questo caso useremo [Rilevamento e Notifica del Livello di Batteria Basso per tutti i Sensori di Batteria](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664).

{% roboWikiPicture {src:"docs/home-assistant/importing-blueprint.jpg", alt:"Importazione del Progetto"} %}{% endroboWikiPicture %}

Questo caricherà il progetto e mostrerà un'anteprima nella finestra di importazione. Puoi cambiare il nome e completare l'importazione. Clicca su `Crea Automazione` per aprire l'editor di automazioni. Qui puoi configurare i parametri dell'automazione e aggiungere azioni per ricevere notifiche.

{% roboWikiPicture {src:"docs/home-assistant/configure-battery-blueprint.jpg", alt:"Configurazione del Progetto della Batteria"} %}{% endroboWikiPicture %}