---
title: Configurazione dell'integrazione di Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
strumenti:
  - Robonomics Home Assistant Integration 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In questo articolo, aggiungerai Robonomics a Home Assistant. Ciò consente a Home Assistant di registrare datalog con dati crittografati su Robonomics Parachain e di ascoltare i comandi di avvio dal parachain per controllare i dispositivi intelligenti. L'integrazione utilizza IPFS per memorizzare i dati e inviare gli hash IPFS alle funzioni di datalog o di avvio.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'configurazione integrazione'}%} {% endroboWikiPicture %}

Innanzitutto è necessario creare una configurazione per il tuo cruscotto. Per fare ciò, apri il tuo cruscotto di Home Assistant e nell'angolo in alto a destra premi il pulsante "Modifica cruscotto" (una matita).
Nella finestra pop-up aperta, fai clic sull'icona dei tre puntini e seleziona il pulsante "Prendi il controllo":

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'configurazione integrazione'}%} {% endroboWikiPicture %}

Premi nuovamente su "Prendi il controllo":

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'configurazione integrazione'}%} {% endroboWikiPicture %}

Ora puoi installare l'integrazione di Robonomics. Per farlo, segui questi passaggi:
 

1. Nell'interfaccia web di Home Assistant vai su `Impostazioni` -> `Dispositivi e servizi` e premi `AGGIUNGI INTEGRAZIONE`. Cerca `Robonomics`.

2. Fai clic su Robonomics, carica il tuo file di configurazione (chiamato `robonomics.app-settings-<nome-sottoscrizione>-server.json`, dove `<nome-sottoscrizione>` è il nome della tua sottoscrizione), e inserisci la password per l'account `CONTROLLER`. Le istruzioni su come creare il file di configurazione possono essere trovate [qui](/docs/sub-activate/?topic=smart-home#setup-your-subscription).

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"crea controller"} %}{% endroboWikiPicture %}

3. Opzionale: Puoi scegliere quale rete utilizzare.

4. Premi `INVIA` dopo aver completato la configurazione. Se hai compilato tutto correttamente, vedrai la finestra di successo. 

{% roboWikiNote {type: "okay", title: "" }%} L'installazione potrebbe richiedere circa 10-15 minuti, a seconda della tua connessione internet. {% endroboWikiNote %}

Questo è tutto! Hai configurato completamente l'Integrazione di Robonomics in Home Assistant. Ora puoi utilizzare tutti i Servizi Web di Robonomics. Per saperne di più su di essi, vai alla sezione ["Utilizzo"](/docs/add-user).