---
title: Attiva abbonamento
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.7.0
    https://github.com/airalab/robonomics.app
---

**In questo articolo, creerai account della parachain di Robonomics e acquisterai un abbonamento IoT.**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Per controllare Home Assistant con Robonomics, hai bisogno di 2 account sulla parachain di Robonomics. Per uno dei conti (`OWNER`), acquisterai un abbonamento Robonomics. Il secondo conto (`CONTROLLER`) controllerà tutti i processi di Home Assistant (come la telemetria) e darà accesso ad altri utenti. Questi account garantiranno la sicurezza del tuo Home Assistant.

Se non hai un account, controlla questo articolo e crea [l'account OWNER](/docs/create-account-in-dapp/). L'account Controller verrà creato automaticamente durante la configurazione.

Nell'articolo, viene utilizzato un portafoglio [estensione Polkadot.js](https://polkadot.js.org/extension/) per lavorare con gli account, ma puoi utilizzare un altro portafoglio che ti risulti comodo.

## Attiva l'abbonamento Robonomics

{% roboWikiNote {type:"ok"}%}

Per questo passaggio, è necessario avere una quantità sufficiente di token XRT (minimo 2-3 XRT) nel tuo account `OWNER`.

{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

1. Vai alla dApp di Robonomics e vai alla [pagina di sottoscrizione](https://robonomics.app/#/rws-buy). Quindi, fai clic su `Connetti Account` nella barra laterale destra.

2. Nel menu popup successivo, connetti l'estensione Polkadot.js. Vedrai l'indirizzo del tuo account insieme al suo saldo.

3. Prima di effettuare l'acquisto, assicurati di aver selezionato l'account `OWNER`. Fai clic sull'icona del profilo dell'indirizzo e dovresti vedere l'account `OWNER`.

4. Infine, fai clic sul pulsante `ACQUISTA SOTTOSCRIZIONE` e inserisci la password del tuo account. Attendi fino al completamento del processo di attivazione. Vedrai lo stato della tua sottoscrizione dopo un po'.

## Configura la tua Sottoscrizione

Ora devi configurare la tua sottoscrizione aggiungendo l'account `CONTROLLER` ad essa.

{% roboWikiPicture {src:"docs/home-assistant/sub-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

1. Vai alla dApp di Robonomics e naviga fino alla [pagina di configurazione di una sottoscrizione](https://robonomics.app/#/rws-setup). Vai alla sezione **Impostazioni della sottoscrizione**.

2. Nel campo `Frase segreta del controller`, premi la bacchetta magica per creare un nuovo account `CONTROLLER`.

3. Nella finestra pop-up, crea una password per l'account `CONTROLLER`.

4. Nella successiva finestra pop-up, vedrai l'indirizzo del tuo nuovo account e la frase mnemonica. Salva la frase mnemonica in modo sicuro perché ne avrai bisogno in seguito per la configurazione dell'integrazione. Inoltre, verrà scaricato il file JSON con l'account `CONTROLLER`. Puoi importarlo nel tuo portafoglio. Come farlo con l'estensione Polkadot.js si trova [qui](/docs/create-account-in-dapp/).

{% roboWikiPicture {src:"docs/home-assistant/controller-create.jpg", alt:"controller create"} %}{% endroboWikiPicture %}

5. Chiudi la finestra pop-up e clicca sul pulsante `SALVA`.

## Aggiungi l'account del controller alla sottoscrizione

Ora devi aggiungere il tuo account `CONTROLLER` alla **lista di accesso**.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls']} %}{% endroboWikiVideo %}

1. Vai alla dApp di Robonomics e naviga alla [pagina di configurazione di una sottoscrizione](https://robonomics.app/#/rws-setup). Assicurati di aver selezionato la sottoscrizione corretta e l'account `OWNER`.

2. Copia l'indirizzo del `CONTROLLER`: apri l'estensione e fai clic sull'icona accanto al nome dell'account o copia l'indirizzo dalla sezione **Impostazioni della sottoscrizione**.

3. Incolla questo indirizzo nel campo `Indirizzo Polkadot` nella sezione **UTENTI NELLA SOTTOSCRIZIONE** e fai clic sul pulsante `+`.

4. Inserisci la password del tuo account `OWNER` nella finestra popup, quindi attendi il completamento del processo di attivazione.

Questo è tutto. Vai all'articolo successivo.