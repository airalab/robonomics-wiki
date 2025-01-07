---
title: Attiva abbonamento
contributors: [nakata5321, Fingerling42]
strumenti:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.8.2
    https://github.com/airalab/robonomics.app
---

**In questo articolo, creerai account della parachain di Robonomics e acquisterai un abbonamento IoT.**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Per controllare Home Assistant con Robonomics, hai bisogno di 2 account sulla parachain di Robonomics. Per uno dei conti (`OWNER`), acquisterai un abbonamento Robonomics. Il secondo account (`CONTROLLER`) controllerà tutti i processi di Home Assistant (come la telemetria) e darà accesso ad altri utenti. Questi account garantiranno la sicurezza del tuo Home Assistant.

Se non hai un account, controlla questo articolo e crea [l'account OWNER](/docs/create-account-in-dapp/). L'account Controller verrà creato automaticamente durante la configurazione.

Nell'articolo, viene utilizzato un portafoglio [estensione Polkadot.js](https://polkadot.js.org/extension/) per lavorare con gli account, ma puoi utilizzare un altro portafoglio che ti risulti comodo.

## Attiva l'abbonamento Robonomics

{% roboWikiNote {type:"ok"} %}

Per questo passaggio, è necessario avere una quantità sufficiente di token XRT (minimo 2-3 XRT) nel tuo account `OWNER`.

{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Vai alla dApp di Robonomics e naviga alla [pagina di sottoscrizione](https://robonomics.app/#/rws-buy). Successivamente, fai clic su `Connetti Account` nella barra laterale destra.

2. Nel menu a comparsa successivo, connetti l'estensione Polkadot.js. Vedrai l'indirizzo del tuo account insieme al suo saldo.

3. Prima di effettuare l'acquisto, assicurati di aver selezionato l'account `OWNER`. Fai clic sull'icona del profilo dell'indirizzo e dovresti vedere l'account `OWNER`.

4. Infine, fai clic sul pulsante `ACQUISTA SOTTOSCRIZIONE` e inserisci la password del tuo account. Attendi fino al completamento del processo di attivazione. Vedrai lo stato della tua sottoscrizione dopo un po' di tempo.

## Configura la tua Sottoscrizione

Ora devi configurare la tua sottoscrizione aggiungendo l'account `CONTROLLER` ad essa.

{% roboWikiPicture {src:"docs/home-assistant/sub-download-backup.png",alt:"sub_setup"} %}{% endroboWikiPicture %}

1. Vai alla dApp di Robonomics e naviga fino alla [pagina di configurazione di una sottoscrizione](https://robonomics.app/#/rws-setup). Vai alla sezione **Impostazioni della sottoscrizione**.

2. Clicca su `SCARICA BACKUP` e seleziona l'opzione `PER IL SERVER`.

{% roboWikiNote {type: "warning", title: "Informazioni importanti" }%} Questa azione creerà un nuovo controller per la tua sottoscrizione. Non dimenticare di aggiungerlo alla sottoscrizione. {% endroboWikiNote %}

3. Nella finestra popup crea una password per l'account `CONTROLLER`.

{% roboWikiPicture {src:"docs/home-assistant/server-new-settings.png", alt:"crea controller"} %}{% endroboWikiPicture %}

4. Nella successiva finestra popup, vedrai l'indirizzo del tuo nuovo account e la frase mnemonica. Salva la frase mnemonica in modo sicuro. Nella cartella dei download, troverai due file JSON: il primo file è chiamato `Controller-<indirizzo>.json`, dove `<indirizzo>` è l'indirizzo del tuo controller appena generato. Il secondo file è chiamato `robonomics.app-settings-<nome-sottoscrizione>-server.json`, dove `<nome-sottoscrizione>` è il nome della tua sottoscrizione. Salva questi file in modo sicuro, poiché saranno necessari successivamente per la configurazione dell'integrazione. Inoltre, puoi importare il tuo controller.conto nel tuo portafoglio. Le istruzioni per importarlo nell'estensione Polkadot.js possono essere trovate [qui](/docs/create-account-in-dapp/).

{% roboWikiPicture {src:"docs/home-assistant/controller-acc.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

5. (Opzionale) Puoi aggiungere credenziali per il servizio di pinning Pinata o altri gateway personalizzati per diffondere i tuoi dati in modo più ampio sulla rete IPFS.

{% roboWikiNote {title:"Nota", type: "Nota"}%} Nella sezione [Configurazione di Pinata](/docs/pinata-setup) puoi trovare informazioni più dettagliate sull'utilizzo di Pinata.{% endroboWikiNote %}

6. Chiudi il pop-up e clicca sul pulsante `SALVA`.

{% roboWikiPicture {src:"docs/home-assistant/save-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

## Aggiungi Account Controller alla Sottoscrizione

Ora devi aggiungere il tuo account `CONTROLLER` alla **lista di accesso**.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls']} %}{% endroboWikiVideo %}

1. Vai alla dApp di Robonomics eVai alla [pagina di configurazione di una sottoscrizione](https://robonomics.app/#/rws-setup). Assicurati di aver selezionato la sottoscrizione corretta e l'account `OWNER`.

2. Copia l'indirizzo del `CONTROLLER`: apri l'estensione e fai clic sull'icona accanto al nome dell'account o copia l'indirizzo dalla sezione **Impostazioni sottoscrizione**.

3. Incolla questo indirizzo nel campo `Indirizzo Polkadot` nella sezione **UTENTI NELLA SOTTOSCRIZIONE** e fai clic sul pulsante `+`.

4. Inserisci la password per il tuo account `OWNER` nella finestra popup, quindi attendi il completamento del processo di attivazione.

Questo è tutto. Vai all'articolo successivo.