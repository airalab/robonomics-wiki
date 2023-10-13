---
title: Come utilizzare le Blueprints
contributors: [tubleronchik]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

In questo articolo imparerai come aggiungere le automazioni blueprints al tuo Home Assistant e come configurarle.

## Automazioni Blueprints

Alcune blueprints sono già installate. Le automazioni basate su queste blueprints devono solo essere configurate. Nell'interfaccia web puoi trovare le blueprints pre-installate in `Settings/Automations & Scenes`. Apri `Blueprints` e trova la blueprint che desideri utilizzare. In questo esempio verrà utilizzata `Motion-activated Light`. 

<robo-wiki-picture src="home-assistant/blueprint-settings.jpg" alt="Blueprint Settings" />

Clicca su `Create Automation` per aprire l'editor di automazioni. Dai un nome, scegli una blueprint da utilizzare (`Motion-activated Light` nel nostro caso). Dopo di che devi scegliere il sensore di movimento e la lampada. Quando la configurazione è terminata, clicca su `Save`.

<robo-wiki-picture src="home-assistant/automation-configure.jpg" alt="Automation Configurazione" />

Se vuoi apportare modifiche, puoi trovarla andando su `Settings/Automations & Scenes` e poi`Automations`.

<robo-wiki-picture src="home-assistant/automations-all.jpg" alt="Automations List" />

## Importazione delle Blueprints

Home Assistant può importare blueprints dai forum di Home Assistant, GitHub e GitHub gists. L'elenco di tutte le Blueprints si trova su [Blueprints Exchange](https://community.home-assistant.io/c/blueprints-exchange/53). Dopo aver scelto, vai su `Settings/Automations & Scenes` e apri `Blueprints`. Clicca su `Import Blueprint` e inserisci l'URL della blueprint scelta. Quindi clicca su `PREVIEW BLUEPRINT`. In questo caso utilizzeremo [Rilevazione e notifica del livello di batteria basso per tutti i sensori di batteria](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664). 

<robo-wiki-picture src="home-assistant/importing-blueprint.jpg" alt="Importing Blueprint" /> 

Questo caricherà la blueprint e mostrerà un'anteprima nella finestra di importazione. Puoi cambiare il nome e completare l'importazione. Clicca su `Create Automation` per aprire l'editor di automazioni. Qui puoi configurare i parametri dell'automazione e aggiungere azioni per ricevere notifiche.

<robo-wiki-picture src="home-assistant/configure-battery-blueprint.jpg" alt="Configure Battery Blueprint" /> 