---
title: Configurazione Altruist
contributors: [tubleronchik]
---

**Questa guida ti accompagna nella configurazione e attivazione di un sensore Altruist Outdoor. Collegherai il sensore al Wi-Fi, configurerai la sua posizione e attiverai un abbonamento utilizzando i token XRT. Inoltre, sono fornite istruzioni per integrare il sensore con Home Assistant tramite HACS o installazione manuale.**

{% roboWikiNote {type: "warning"}%} Tutti i dispositivi di Robonomics possono essere acquistati sul sito ufficiale [website](https://robonomics.network/devices/).{% endroboWikiNote %}

## Attivare l'Abbonamento Robonomics

{% roboWikiNote {type: "okay"} %}Per completare questo passaggio, assicurati di avere almeno 2-3 token XRT nel tuo account `Robonomics Polkadot`.{% endroboWikiNote %}

1) Vai alla [pagina di abbonamento](https://robonomics.app/#/rws-buy) del dApp di Robonomics. 
2) Clicca su **Account** e connetti il tuo portafoglio. Verranno visualizzati l'indirizzo del tuo account e il saldo.
Se non hai un account, segui [questa guida](https://wiki.robonomics.network/docs/create-account-in-dapp/) per crearne uno.

{% roboWikiPicture {src:"docs/altruist/altruist_syb_buy.jpg", alt:"pagina di abbonamento"} %}{% endroboWikiPicture %}

3) Clicca su `ACQUISTA ABBONAMENTO` e firma la transazione. **Attendi il completamento del processo di attivazione**. 
4) Una volta attivato, verrai reindirizzato alla **pagina di configurazione**, dove potrai vedere il nome del tuo abbonamento e la data di scadenza.

{% roboWikiPicture {src:"docs/altruist/altruist_setup_page.jpg", alt:"pagina di configurazione dell'abbonamento"} %}{% endroboWikiPicture %}

5) **Salva l'indirizzo del tuo account** — ti servirà durante la configurazione del sensore. Puoi copiarlo dalla sezione "PROPRIETARIO" o cliccando sul nome del tuo account nell'angolo in alto a destra e selezionando il pulsante di copia.

## Configurazione del Sensore

{% roboWikiNote {type: "warning", title: "INFO"}%} Il sensore può essere connesso solo a una rete Wi-Fi a 2.4GHz.{% endroboWikiNote %}

1) **Collega il sensore** a una presa di corrente.
2) La scheda creerà una rete Wi-Fi chiamata Altruist-xxxxxxxxx. Connettiti ad essa dal tuo telefono o computer. Dovresti essere automaticamente invitato ad aprire la finestra di autorizzazione.
- Se non accade, apri un browser e vai su 192.168.4.1.

{% roboWikiPicture {src:"docs/altruist/on_board.png", alt:"sensore-altruist"} %}{% endroboWikiPicture %}

3) **Configura le impostazioni Wi-Fi**:
- Seleziona la tua rete Wi-Fi dall'elenco o inseriscila manualmente se non appare.
- Inserisci la password nel campo "IMPOSTAZIONI WI-FI".

4) **Inserisci i dettagli di Robonomics**:
- Incolla l'indirizzo del proprietario RWS che hai copiato in precedenza nel campo designato.

5) **Imposta la posizione del sensore**:
- Inserisci le coordinate del sito di installazione del sensore.
- Puoi trovare le coordinate utilizzando mappe online o convertire un indirizzo in latitudine/longitudine usando [questo link.](https://www.latlong.net/convert-address-to-lat)-long.html)

{% roboWikiNote {type: "warning", title: "ATTENZIONE"}%}Le coordinate del sensore verranno visualizzate su una mappa pubblicamente disponibile. Se non vuoi mostrare le tue informazioni private, scrivi coordinate vicine, ma non esatte.{% endroboWikiNote %}

{% roboWikiPicture {src:"docs/altruist/sensor_setup.png", alt:"altruist-sensor-wifi"} %}{% endroboWikiPicture %}

6) **Copia l'"Indirizzo Robonomics" di Altruist**:
- Lo troverai in cima alla pagina. Salvalo per il passaggio finale.

7) Clicca su "**Salva configurazione e riavvia**" in fondo alla pagina. La scheda si riavvierà e si connetterà alla rete Wi-Fi specificata.

## Attivazione di Altruist
L'ultimo passaggio nel processo di configurazione è aggiungere l'**indirizzo Altruist** al tuo **Abbonamento Robonomics**.

1) Torna alla [pagina di configurazione](https://robonomics.app/#/rws-setup).

2) Scorri verso il basso fino alla sezione "**Utenti nell'abbonamento**".

3) Nel campo "**Aggiungi un utente**", incolla l'**indirizzo Robonomics di Altruist** che hai copiato in precedenza.

{% roboWikiPicture {src:"docs/altruist/add_user.jpg", alt:"aggiungi utente"} %}{% endroboWikiPicture %}

4) Clicca sul **pulsante più (+)** e firma il messaggio.

5) Attendi il completamento dell'operazione.

Ecco fatto! La tua configurazione è ora completa. 🎉

Ora puoi trovare il tuo Altruist su [Robonomics Sensors Social](https://sensors.social/#) mappa. 🚀

{% roboWikiPicture {src:"docs/altruist/map.jpg", alt:"mappa del sensore"} %}{% endroboWikiPicture %}

## Home Assistant

Ci sono due modi per aggiungere **Altruist** a **Home Assistant**:

### Opzione 1: HACS (Consigliato)

Il modo più semplice per aggiungere **Altruist** è tramite **HACS**. Puoi trovare una breve guida all'installazione [qui](https://hacs.xyz/docs/use/)

**Passaggi**:
1) Una volta installato HACS, aprilo.

2) Clicca sui **tre punti** nell'angolo in alto a destra e seleziona "**Custom repositories**".

3) Nella finestra pop-up, inserisci il seguente URL:

```
https://github.com/airalab/altruist-homeassistant-integration
```
4) Imposta il tipo su "**Integration**" e clicca su "**ADD**".

{% roboWikiPicture {src:"docs/altruist/hacs.jpg", alt:"altruist-add"} %}{% endroboWikiPicture %}

5) Cerca l'integrazione **Altruist Sensor**.

6) Clicca sul pulsante **Download**, quindi riavvia **Home Assistant** una volta installata l'integrazione.


{% roboWikiPicture {src:"docs/altruist/integration.jpg", alt:"altruist-hacs"} %}{% endroboWikiPicture %}

### Opzione 2: Installazione Manuale

1) Sotto l'utente `homeassistant`, clona il repository del progetto:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/airalab/altruist-homeassistant-integration.git
```

{% endcodeHelper %}

2) Se hai già delle integrazioni personalizzate, sposta la cartella `altruist` nella tua directory `custom_components`:

{% codeHelper { copy: true}%}

```
cd altruist-homeassistant-integration
mv custom_components/altruist ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

3) Se **non** hai integrazioni personalizzate, sposta l'intera directory custom_components:

{% codeHelper { copy: true}%}

 ```
cd altruist-homeassistant-integration
mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Configurazione

Dopo l'installazione e il riavvio di Home Assistant, l'integrazione rileverà automaticamente Altruist sulla tua rete.

1) Vai su **Impostazioni → Dispositivi e Servizi**.

2) Aggiungi il **Sensore Altruist**.

{% roboWikiPicture {src:"docs/altruist/add_altruist.jpg", alt:"scopri altruist"} %}{% endroboWikiPicture %}

Ecco fatto! 🚀 Il tuo Sensore Altruist è ora integrato con Home Assistant.