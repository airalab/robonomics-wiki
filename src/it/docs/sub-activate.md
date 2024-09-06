---
title: Attiva Abbonamento
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - App Robonomics
    https://github.com/airalab/robonomics.app
---

In questo articolo, creerai account della parachain di Robonomics e acquisterai un abbonamento IoT.

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Per controllare Home Assistant con Robonomics, hai bisogno di 2 account sulla parachain di Robonomics. Per uno degli account (`OWNER`), acquisterai un abbonamento Robonomics. Il secondo account (`CONTROLLER`) controllerà tutti i processi di Home Assistant (come la telemetria) e darà accesso ad altri utenti. Questi account garantiranno la sicurezza del tuo Home Assistant.

{% roboWikiNote {title:"ATTENZIONE", type: "warning"}%}
Entrambi gli account devono essere creati con crittografia **ed25519**. Pertanto, è necessario creare un account utilizzando l'interfaccia utente Polkadot-JS e selezionare la crittografia richiesta.

Questa funzionalità è disabilitata per impostazione predefinita nell'interfaccia utente Polkadot-JS. Per abilitarla, vai su `Impostazioni` -> `Generale` -> `opzioni account` e seleziona `Consenti archiviazione account locale nel browser` nel menu a discesa sotto `creazione account nel browser`.
{% endroboWikiNote %}

## Crea Account Owner e Controller

{% roboWikiVideo {videos:[{src: 'QmajeEV4adqR2DCaBJPZhH6NR74eHaRmvCcbeQtnLm7Kcc', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Vai all'[app della Parachain di Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) sul Portale Polkadot / Substrate. **Controlla l'angolo in alto a sinistra per assicurarti di essere connesso alla Parachain di Robonomics.**

2. Vai su `Account` -> `Account` e premi il pulsante `Aggiungi account`. Vedrai il menu a comparsa con il seed dell'account. Hadue forme: *Mnemonic* (leggibile dall'essere umano) e *Raw* (una sequenza di cifre e lettere).

3. Apri `Opzioni di creazione avanzate`, cambia il tipo di crittografia dell'account in creazione in `Edwards - ed25519` e premi `Avanti`.

4. Salva la frase mnemonica in modo sicuro e premi `Avanti`.

5. Nel menu successivo, devi impostare il nome dell'account e la password. Per comodità, chiamalo `OWNER`. Premi `Avanti`.

6. Nella finestra finale, clicca su `Salva` per completare la creazione dell'account. Questo genererà anche dei file JSON di backup che dovresti conservare in modo sicuro. In seguito potrai utilizzare questo file per ripristinare il tuo account se ricordi la password.

7. Ripeti questi passaggi per creare un account con il nome `CONTROLLER`.


## Aggiungi Account a Polkadot.js

Per comodità, dovresti utilizzare l'[estensione Polkadot.js](https://polkadot.js.org/extension/) e aggiungere questi account appena creati ad essa. Per un account ed25519, puoi farlo solo con un file JSON di backup. Puoi utilizzare i file salvati quando hai creato gli account.

Puoi ottenere nuovamente questi file creando un file di backup dell'account. Clicca sui tre puntini accanto al tuo account, scegli `Crea un file di backup per questo account` e inserisci la tua password.

{% roboWikiVideo {videos:[{src: 'Qmc5LcbLSdVCUubLomUUo5Qxrxb2xaixpwUFqnpj2C9iM5', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Apre l'estensione e premi il pulsante `+` in alto a destra, quindi scegli `Ripristina account da file JSON di backup`.

2. Nella finestra aperta, carica il file JSON, inserisci la password e premi `Ripristina`.

3. Assicurati che la rete Robonomics sia selezionata per gli account nell'estensione Polkadot.js. Su Polkadot / Substrate Portal vai su `Impostazioni` -> `Metadati` e clicca sul pulsante `Aggiorna metadati`.

4. Conferma l'aggiornamento dei metadati nel popup. L'estensione mostrerà ora l'etichetta della rete per cui viene utilizzato l'indirizzo.## Attiva l'abbonamento a Robonomics

{% roboWikiNote {type: "okay"}%} Per questo passaggio, devi avere una quantità sufficiente di token XRT (minimo 2-3 XRT) nel tuo account `OWNER`. {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Vai alla dApp di Robonomics e vai alla [pagina di abbonamento](https://robonomics.app/#/rws-buy). Quindi, fai clic su `Connetti Account` nella barra laterale destra.

2. Nel menu popup successivo, connetti l'estensione Polkadot.js. Vedrai l'indirizzo del tuo account insieme al suo saldo.

3. Prima di acquistare, assicurati di aver selezionato l'account `OWNER`. Fai clic sull'icona del profilo dell'indirizzo e dovresti vedere l'account `OWNER`.

4. Infine, fai clic sul pulsante `ACQUISTA ABBONAMENTO` e inserisci la password del tuo account. Attendi fino al completamento del processo di attivazione. Vedrai lo stato del tuo abbonamento dopo un po'.

## Configura il tuo Abbonamento

Ora devi configurare il tuo abbonamento aggiungendo l'account `CONTROLLER` ad esso.

{% roboWikiVideo {videos:[{src: 'Qmd5P356UE1yDLAd4uSdq1dERbyp5gk5wpWD3iENNt2mjV', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Vai alla dApp di Robonomics e vai alla [pagina di configurazione dell'abbonamento](https://robonomics.app/#/rws-setup). Vai alla sezione **IMPOSTAZIONI GENERALI**.

2. Rimuovi la frase seed dal campo `Frase seed del Controller` e inserisci la frase seed dell'account `CONTROLLER`.

3. Copia l'indirizzo del `CONTROLLER`: apri l'estensione e fai clic sull'icona accanto ail nome dell'account.

4. Incolla questo indirizzo nel campo `Controller` e clicca sul pulsante `SALVA`.

## Aggiungi Account alla Sottoscrizione

Ora devi aggiungere il tuo account `CONTROLLER` alla **lista di accesso**.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Vai alla dApp di Robonomics e naviga alla [pagina di configurazione della sottoscrizione](https://robonomics.app/#/rws-setup). Assicurati di aver selezionato la sottoscrizione corretta e l'account `OWNER`.

2. Copia l'indirizzo del `CONTROLLER`: apri l'estensione e clicca sull'icona accanto al nome dell'account.

3. Incolla questo indirizzo nel campo `Indirizzo Polkadot` nella sezione **UTENTI NELLA SOTTOSCRIZIONE** e clicca sul pulsante `+`.

4. Inserisci la password per il tuo account `OWNER` nella finestra popup, quindi attendi il completamento del processo di attivazione.