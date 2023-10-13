---
title: Crea un account per Robonomics Parachain

contributors: [PaTara43, Fingerling42]
---

**Per interagire e operare con Robonomics Parachain, gli sviluppatori e gli utenti devono creare un account sul portale Polkadot / Substrate. L'account esegue le funzioni di base della rete: il tuo indirizzo di rete pubblica (la chiave pubblica), il controllo dell'accesso all'indirizzo e ai fondi (la chiave privata), l'invio di transazioni alla rete, la visualizzazione dei token e il loro importo, ecc. Di seguito sono riportate due modi principali per creare un account per Robonomics Parachain**

## 1. Utilizzando l'estensione del browser Polkadot{.js}

L'estensione di Polkadot fornisce un meccanismo per generare l'account e interagire con tutti i progetti Polkadot / Kusama, inclusi Robonomics Parachain. Questo non è il modo più sicuro per gestire il tuo account, ma è il più conveniente in termini di equilibrio tra sicurezza e usabilità.

## 1.1. Installaa l'estensione del browser

L'estensione del browser è disponibile per [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) e [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (oltre ai browser basati su Chromium).

![Browser Extension](../images/creating-an-account/1.1-polkadot-extension.png "Browser Extension")

## 1.2. Apri l'app Robonomics Parachain

Vai a [App Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) su Polkadot / Substrate Portal. Se è la prima volta che accedi al portale, richiederà l'accesso all'estensione del browser, quindi consenti l'accesso. 

Once you've opened the app, take a look at the top left corner. The name of the network, its icon and the number of the last block are displayed tqui. Clicking on this area will open a list of all Polkadot / Kusama networks, including test networks and local nodes. You can switch between networks by selezionaing the required one e premiing the `Switch` Assicurati di essere connesso a Robonomics Parachain ora **1.3. Aggiorna i metadati dell'estensione**. 

Una volta aperta l'app, dai un'occhiata all'angolo in alto a sinistra. Qui vengono visualizzati il nome della rete, la sua icona e il numero dell'ultimo blocco. Facendo clic su quest'area si aprirà un elenco di tutte le reti Polkadot/Kusama, incluse le reti di test e i nodi locali. È possibile passare da una rete all'altra selezionando quella richiesta e premendo il pulsante `Switch`. **Assicurati di essere connesso a Robonomics Parachain adesso**.

![Robonomics Parachain app](../images/creating-an-account/1.2-robonomics-app.png "Robonomics Parachain app")

## 1.3. Aggiorna metadati dell'estensione

È molto probabile che l'app ti chieda di aggiornare i metadati dell'estensione per visualizzare le informazioni corrette sulla catena a cui sei connesso. Vai su  **Settings -> Metadata**, premi il pulsante `Update metadata` e poi, nella finestra pop-up, consenti all'estensione di farlo.

![Updating metadata](../images/creating-an-account/1.3-metadata-update.png "Updating metadata")

## 1.4. Crea un account nell'estensione 

Apri l'estensione del browser Polkadot{.js}. Fai clic sul pulsante più grande o seleziona `Create new account` dalla piccola icona più in alto a destra. Dovresti vedere il seguente menu, con il seme mnemonico generato sotto forma di dodici parole e l'indirizzo.

![Account creation, step one](../images/creating-an-account/1.4-create-account-step-1.png "Account creation, step one")

Il seme è la tua chiave per l'account. Conoscere il seed consente a te (o a chiunque altro conosca il seed) di ottenere il controllo su questo account e persino di ricrearlo, se dimentichi la password. **È molto importante archiviarlo in un luogo sicuro**, preferibilmente su carta o altro dispositivo non digitale, non in un archivio digitale o su un computer. 

Salva il seed e premi `Next step`. Dovresti vedere il seguente menu.

![Account creation, step two](../images/creating-an-account/1.5-create-account-step-2.png "Account creation, step two")

- *Network* ti consente di scegliere quale delle reti verrà utilizzata esclusivamente per questo account. Puoi utilizzare lo stesso indirizzo su più reti, tuttavia, per motivi di privacy, è consigliabile creare un nuovo indirizzo per ogni rete che utilizzi. 
Seleziona la rete Robonomics dal menu a discesa. Se non riesci a trovare la rete Robonomics, molto probabilmente non hai aggiornato i metadati, torna indietro e fallo.

    - Noterai che il formato dell'indirizzo e dell'icona dell'account cambieranno - questo è normale. I diversi formati di rete sono semplicemente altre rappresentazioni della stessa chiave pubblica. 

- *Name* è solo il nome dell'account per il tuo uso personale. Non viene memorizzato nella blockchain e non sarà visibile ad altri utenti. 

- *Password* viene utilizzato per crittografare le informazioni del tuo account. Dovrai reinserirlo quando firmi transazioni sul portale. Creane uno e ricordatelo.

Di conseguenza, dopo aver creato un account, lo vedrai nell'elenco degli account nell'estensione Polkadot{.js}. Cliccando sui tre puntini, puoi rinominare l'account, esportarlo, rimuoverlo dall'estensione e cambiare la rete utilizzata per l'account. 

Inoltre, l'account verrà visualizzato nel menu **Account -> Account** del portale, dove verrà notato che è stato inserito utilizzando l'estensione.

![Successful account creation](../images/creating-an-account/1.6-account-injected.png "Successful account creation")


## 2. Direttamente su Robonomics Parachain App

Puoi utilizzare l'interfaccia utente sul Portale Polkadot / Substrate per creare un account. Può essere utilizzato per lo sviluppo e i test. 

## 2.1. Apri Robonomics Parachain App

Vai a [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) su Polkadot / Substrate Portal. **Controlla nell'angolo in alto a sinistra che sei connesso a Robonomics Parachain**.  

Vai a **Accounts -> Accounts** e premi il pulsante `Add account`.

![Robonomics Parachain App](../images/creating-an-account/2.1-robonomics-app-main-view.png "Robonomics Parachain App")

## 2.2. Crea Account

Dovresti vedere il seguente menu popup con il seed dell'account. 

![Generating account seed](../images/creating-an-account/2.2-robonomics-app-seed.png "Generating account seed")

Ha due forme: *Mnemonic* (leggibile dall'uomo) e *Raw* (una sequenza di cifre e lettere). Salva la frase di recupero in modo sicuro e premi `Next`.

> Puoi anche cambiare il tipo di crittografia per la creazione dell'account, per farlo apri `Advanced creation options` e scegli il tipo (`ed25519` nella foto).

![ed25519 crypto type account](../images/creating-an-account/ed-account.jpg)

Nel menu successivo, devi impostare il nome dell'account e la password, simili alle istruzioni dell'estensione descritte sopra.

![Generating account name and password](../images/creating-an-account/2.3-robonomics-app-name-pass.png "Generating account name and password")

Cliccando sul pulsante `Next` ti porterà all'ultima finestra. Clicca `Save` per completare la creazione dell'account. Verranno generati anche dei file JSON di backup che dovresti conservare in modo sicuro. In seguito potrai utilizzare questo file per recuperare il tuo account se ricordi la password.

![Successful account creation](../images/creating-an-account/2.4-robonomics-app-account-created.png "Successful account creation")

## 2.3 Aggiungi l'account ed25519 all'estensione Polkadot

Potrebbe essere necessario aggiungere l'account creato all'estensione Polkadot.js (per l'account ed25519 puoi farlo solo con il file JSON di backup). Per farlo devi creare un file di backup dell'account. Premi sui tre puntini sul tuo account e scegli `Create a backup file for this account` e scrivi la tua password.

![Backup file](../images/creating-an-account/backup-file.jpg)

Quindi apri un'estensione e premi il pulsante `+` in alto a destra, quindi scegli `Restore account from backup JSON file`.

![Restore backup in extension](../images/creating-an-account/extention-add-backup.jpg)

Nella finestra aperta rilascia il file salvato, inserisci la password e premi `Restore`.

![Restore backup in extension 2](../images/creating-an-account/file-backup.jpg)

## 3. Account creato con successo 

Ora puoi operare completamente con il tuo account appena creato. Invia e ricevi token, messaggi, scrivi datalog e altro ancora. Sentiti libero di esplorare tutte le funzionalità dell'app. Per copiare l'indirizzo del tuo account basta fare clic sulla sua icona, l'indirizzo verrà copiato negli appunti. 

Se desideri saperne di più sugli account Polkadot / Kusama e su ulteriori modi per crearli, puoi trovare ulteriori informazioni [qui](https://wiki.polkadot.network/docs/learn-accounts) e [qui](https://wiki.polkadot.network/docs/learn-account-generation).
