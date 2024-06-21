---
title: Attiva sottoscrizione
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

In questo articolo creerai account Robonomics parachain e acquisterai una sottoscrizione IoT. 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


Per controllare Home Assistant con Robonomics, hai bisogno di 2 account sulla parachain Robonomics. Per uno degli account (`sub_owner`), acquisterai una sottoscrizione Robonomics. Il secondo account (`sub_controller`) controllerà tutti i processi di Home Assistant (come la telemetria) e darà accesso ad altri utenti. Questi account garantiranno la sicurezza per il tuo Home Assistant. 

<robo-wiki-note type="warning" title="WARNING">

Entrambi gli account devono essere creati con crittografia **ed25519**. Per questo motivo, è necessario creare un account utilizzando l'interfaccia utente di Polkadot-JS e selezionare la crittografia richiesta. 

Questa funzionalità è disabilitata per impostazione predefinita nell'interfaccia utente di Polkadot-JS. Per abilitarla, vai su `Settings` -> `General` -> `account options` e seleziona `Allow local in-browser account storage` nel menu a discesa `in-browser account creation`.

</robo-wiki-note>

## Crea account proprietario e controller

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQiJYPYajUJXENX2PzSJMSKGSshyWyPNqugSYxP5eCNvm', type:'mp4'}]" />

1. Vai all'app [Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) su Polkadot / Substrate Portal. **Controlla l'angolo in alto a sinistra per assicurarti di essere connesso a Robonomics Parachain.**

2. Vai su `Account` -> `Account` e premi il pulsante `Add account`. Vedrai il menu popup con il seed dell'account. Ha due forme: *Mnemonic* (leggibile dall'uomo) e *Raw* (una sequenza di cifre e lettere). 

3. Apri `Advanced creation options`, cambia il tipo di crittografia per la creazione dell'account in `Edwards - ed25519` e premi `Next`.


4. Salva in modo sicuro la frase seed mnemonica e premi `Next`.

5. Nel menu successivo, devi impostare il nome dell'account e la password. Dà un nome `sub_owner` per comodità. Premi `Next`.

6. Nell'ultima finestra clicca su `Save` per completare la creazione dell'account. Verranno generati anche file JSON di backup che dovresti conservare in modo sicuro. Puoi utilizzare successivamente questo file per recuperare il tuo account se ricordi la password.

7. Ripeti questi passaggi per un account con il nome `sub_controller`.


## Aggiungi Account a Polkadot.js

Per comodità, dovresti utilizzare l'[estensione Polkadot.js](https://polkadot.js.org/extension/) e aggiungere questi account appena creati. Per un account ed25519 puoi farlo solo con un file JSON di backup. Puoi utilizzare i file salvati quando hai creato gli account.

Puoi ottenere nuovamente questi file creando un file di backup dell'account. Premi sui tre puntini sul tuo account, scegli `Create a backup file for this account` e inserisci la tua password.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmRd7gztUjWkLF4W2XuJwy5aXBwzNV2aPCU6CQQLvUpSNj', type:'mp4'}]" />

1. Apri un'estensione e premi il pulsante `+` in alto a destra, quindi scegli `Restore account from backup JSON file`.

2. In una finestra aperta carica il file JSON, inserisci la password e premi `Restore`.

3. Assicurati che la rete Robonomics sia selezionata per gli account nell'estensione Polkadot.js. Su Polkadot / Substrate Portal vai su  `Setting` -> `Metadata` e clicca sul pulsante `Update metadata`.

4. Conferma l'aggiornamento dei metadati nel popup. Ora l'estensione mostrerà l'etichetta della rete per cui viene utilizzato l'indirizzo.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmT5sTNP9t8gpbD4RJJw6ETwG4wiziiChAh2uHHBk9Zsyd', type:'mp4'}]" />

## Attiva la Sottoscrizione Robonomics 

<robo-wiki-note type="okay">

Per questo passaggio, devi avere una quantità sufficiente di token XRT (minimo 2-3 XRT) nel tuo account `sub_owner`.

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmXrFCajmJgkRDSbshGD3QehjnoyS6jafEPSjHdYkoBHum', type:'mp4'}]" />

1. Vai alla dapp Robonomics alla [pagina di sottoscrizione](https://dapp.robonomics.network/#/subscription) e premi connetti account nella barra laterale destra.

2. Nel menu popup successivo connetti l'estensione Polkadot.js. Vedrai il tuo indirizzo dell'account con il saldo.

3. Prima di effettuare l'acquisto, verifica di aver scelto l'account `sub_owner`. Premi sull'icona del profilo dell'indirizzo, dovresti vedere l'account `sub_owner` sotto il campo `Check owner account`.

4. Infine, premi il pulsante `SUBMIT` e inserisci la password del tuo account. Dopo di che, attendi il completamento del processo di attivazione. Vedrai lo stato della tua sottoscrizione dopo un po' di tempo.


## Aggiungi Account alla Sottoscrizione

Ora devi aggiungere un account `sub_controller` alla **lista di accesso**. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmV1gkwtcXsWv54ov9tuXfcHg7nqs1foM8cRwts4sqnqtX', type:'mp4'}]" />

1. Apri l'estensione e fai clic sull'icona accanto al nome dell'account. Verrà copiato l'indirizzo dell'account.


2. Incolla questo indirizzo nel campo `Robonomics parachain address` nella parte **Gestisci accesso**. Dà un nome e premi il pulsante `+`. 

3. Ripeti i passaggi 1 e 2 per l'account `sub_owner`.

4. Premi `Save`. Inserisci la password del tuo `sub_owner` nella finestra popup e attendi il completamento del processo di attivazione.
