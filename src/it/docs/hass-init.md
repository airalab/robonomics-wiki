---
title: Inizializzazione di Home Assistant
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.5.4
    https://github.com/home-assistant/core
---

**Dopo aver installato Home Assistant, è necessario inizializzarlo.**

{% roboWikiPicture {src:"docs/home-assistant/ha_init.png", alt:"ha_init"} %}{% endroboWikiPicture %}

Si inizia con la creazione dell'account proprietario di Home Assistant. Questo account è un amministratore e può apportare qualsiasi modifica.
Apri il browser web e vai su `http://%PC_IP_ADDRESS%:8123`. Puoi trovare l'indirizzo IP del Raspberry Pi utilizzando l'app mobile [Fing](https://www.fing.com/products) o lo strumento CLI [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).
Se hai configurato tutto sul tuo PC, utilizza `http://localhost:8123`.

{% roboWikiNote {type: "note"}%} L'indirizzo IP potrebbe cambiare nel tempo, a causa delle impostazioni del router {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Alla prima pagina, inserisci un nome, un nome utente, una password e clicca sul pulsante `CREA ACCOUNT`.

2. Nella schermata successiva, inserisci un nome per la tua casa e imposta la tua posizione e il sistema di unità. Clicca su `DETECT` per trovare la tua posizione e impostare il fuso orario e il sistema di unità in base a quella posizione. Se non vuoi inviare la tua posizione, puoi impostare manualmente questi valori.

3. Successivamente, Home Assistant mostrerà eventuali dispositivi che ha scoperto nella tua rete. Non preoccuparti se vedi meno elementi rispetto a quelli mostrati di seguito; puoi sempre aggiungere manualmente dispositivi in seguito. Per ora, clicca su `FINISH` e sarai sulla schermata principale di Home Assistant.

4. Infine, vedrai l'interfaccia web di Home Assistant, che mostrerà tutti i tuoi dispositivi.


## Risoluzione dei problemi

1. Se dimentichi il tuo nome utente o la tua password per l'utente locale, [controlla questo articolo](https://www.home-assistant.io/docs/locked_out/) per ripristinare le tue credenziali.