---
title: Dispositivi Virtuali

contributors: [nakata5321]
---

**Questo articolo ti spiegherà come creare dispositivi virtuali in una casa intelligente, così da poter vedere come appare effettivamente la piattaforma.**

{% roboWikiPicture {src:"docs/home-assistant/virtual-sensors.png", alt:"sensore virtuale"} %}{% endroboWikiPicture %}

## Installare l'integrazione

Per utilizzare dispositivi virtuali è necessario installare l'integrazione ["demo"](https://www.home-assistant.io/integrations/demo/).
Per farlo, è necessario modificare il file di configurazione.

Vai alla cartella di configurazione che hai fornito durante il processo di configurazione. In questa cartella, troverai una cartella
chiamata "homeassistant". Entra al suo interno. Apri il file `configuration.yaml` con un editor di testo sotto l'utente **root** e inserisci la seguente riga:

{% codeHelper { copy: true}%}

```
...
# Esempio di inserimento in configuration.yaml
demo:
...
```

{% endcodeHelper %}


Dopo di che, riavvia Home Assistant tramite l'interfaccia web. Quando la casa intelligente si riavvia, puoi trovare tutti i dispositivi virtuali nelle entità "demo".
Trovali in `Impostazioni -> Dispositivi e servizi -> Demo`. Tutte queste entità possono essere aggiunte al tuo cruscotto.

{% roboWikiPicture {src:"docs/home-assistant/demo-entities.png", alt:"entità-demo"} %}{% endroboWikiPicture %}
