---
title: Creare un Account per Robonomics Parachain

contributors: [PaTara43, Fingerling42]
---

**Per interagire e operare con Robonomics Parachain, gli sviluppatori e gli utenti devono creare un account sul Portale Polkadot / Substrate. L'account svolge funzioni di base per la rete: il tuo indirizzo di rete pubblico (la chiave pubblica), il controllo dell'accesso all'indirizzo e ai fondi (la chiave privata), l'invio di transazioni alla rete, la visualizzazione dei tuoi token e del loro importo, ecc. Di seguito ci sono due modi principali per creare un account per Robonomics Parachain.**

## 1. Utilizzando l'Estensione del Browser Polkadot{.js}

L'Estensione Polkadot fornisce un meccanismo per generare l'account e interagire con tutti i progetti Polkadot / Kusama, inclusi Robonomics Parachain. Questo non è il modo più sicuro per gestire il tuo account, ma è il più conveniente in termini di equilibrio tra sicurezza e usabilità.

## 1.1. Installa l'Estensione del Browser

L'estensione del browser è disponibile per [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) e [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (oltre ai browser basati su Chromium).

{% roboWikiPicture {src:"docs/creating-an-account/1.1-polkadot-extension.png", alt:"Estensione del Browser"} %}{% endroboWikiPicture %}

## 1.2. Apri l'App Robonomics Parachain

Vai all'[app Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) sul Portale Polkadot / Substrate. Se è la prima volta che accedi al portale, richiederà l'accesso all'estensione del browser, quindi consenti l'accesso.

Una volta aperta l'app, guarda l'angolo in alto a sinistra. Lì vengono visualizzati il nome della rete, la sua icona e il numero dell'ultimo blocco. Cliccando su questa area si aprirà un elenco di tutte le reti Polkadot / Kusama, inclusi le reti di test e i nodi locali. Puoi passare tra le reti selezionando quella richiesta e premendo il pulsante `Switch`. **Assicurati di**Sono collegato a Robonomics Parachain ora**.

{% roboWikiPicture {src:"docs/creating-an-account/1.2-robonomics-app.png", alt:"App Robonomics Parachain"} %}{% endroboWikiPicture %}

## 1.3. Aggiornamento dei metadati dell'estensione e creazione dell'account nel browser

È molto probabile che l'app ti chieda di aggiornare i metadati dell'estensione per visualizzare le informazioni corrette sulla catena a cui sei connesso. Vai su **Impostazioni -> Metadati**, premi il pulsante `Aggiorna metadati` e poi, nella finestra popup, permetti all'estensione di farlo.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-metadata-update.png", alt:"Aggiornamento metadati"} %}{% endroboWikiPicture %}

Per impostazione predefinita, l'applicazione web funziona solo con account esterni. Per consentire la creazione di nuovi account direttamente nel browser, vai su **Impostazioni -> Generale -> Opzioni account -> creazione di account nel browser**, scegli `Consenti archiviazione account locale nel browser` e premi il pulsante `Salva`.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-in-browser-account-creation.png", alt:"Aggiornamento creazione account nel browser"} %}{% endroboWikiPicture %}

## 1.4. Creare un account nell'estensione

Apri l'estensione del browser Polkadot{.js}. Clicca sul grande pulsante più o seleziona `Crea nuovo account` dall'icona più piccola in alto a destra. Dovresti vedere il seguente menu, con il seed mnemonico generato sotto forma di dodici parole e l'indirizzo.

{% roboWikiPicture {src:"docs/creating-an-account/1.4-create-account-step-1.png", alt:"Creazione account, passaggio uno"} %}{% endroboWikiPicture %}

Il seed è la chiave per l'account. Conoscere il seed ti permette (o a chiunque altro lo conosca) di controllare questo account e persino ricrearlo, nel caso in cui dimentichi la password. **È molto importante conservarlo in modo sicuro**, preferibilmente su carta o su un dispositivo non digitale, non in un archivio digitale o su un computer.

Salva il seed e premi `Passaggio successivo`. Dovresti vedere il seguente menu.

{% roboWikiPicture {src:"docs/creating-an-account/1.5-create-account-step-2.png", alt:"Creazione account, passaggio due"} %}{% endroboWikiPicture %}


- *Rete* ti consente di scegliere su quale delle reti questo account verrà utilizzato esclusivamente. Puoi utilizzare lo stesso indirizzo su più reti, tuttavia, per motivi di privacy, si consiglia di creare un nuovo indirizzo per ciascuna rete che utilizzi.
Seleziona la rete Robonomics dall'elenco a discesa. Se non riesci a trovare la rete Robonomics, molto probabilmente non hai aggiornato i metadati, torna indietro e fallo.

	`Noterai che il formato dell'indirizzo e l'icona dell'account cambieranno — questo è normale. I diversi formati di rete sono semplicemente altre rappresentazioni della stessa chiave pubblica.`

- *Nome* è solo il nome dell'account per il tuo uso personale. Non viene memorizzato nel blockchain e non sarà visibile ad altri utenti.

- *Password* viene utilizzata per crittografare le informazioni del tuo account. Dovrai reinserirlo quando firmi transazioni sul portale. Creane uno e ricordatelo.

Di conseguenza, dopo aver creato un account, lo vedrai nell'elenco degli account nell'estensione Polkadot{.js}. Cliccando sui tre puntini, puoi rinominare l'account, esportarlo, rimuoverlo dall'estensione e cambiare la rete utilizzata per l'account.

Inoltre, l'account comparirà nel menu **Accounts -> Accounts** sul portale, dove sarà notato che è stato iniettato utilizzando l'estensione.

{% roboWikiPicture {src:"docs/creating-an-account/1.6-account-injected.png", alt:"Creazione dell'account riuscita"} %}{% endroboWikiPicture %}


## 2. Direttamente sull'App Robonomics Parachain

Puoi utilizzare l'interfaccia utente sull'App Polkadot / Substrate Portal per creare un account. Potrebbe essere utilizzato per lo sviluppo e i test.

## 2.1. Apri l'App Robonomics Parachain

Vai all'[App Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) su Polkadot / Substrate Portal. **Controlla nell'angolo in alto a sinistra di essere connesso a Robonomics Parachain**.

Vai su **Accounts -> Accounts** e premi il pulsante `Aggiungi account`.

{% roboWikiPicture {src:"docs/creating-an-account/2.1-robonomics-app-main-view.png", alt:"App Robonomics Parachain"} %}{% endroboWikiPicture %}WikiPicture %}

## 2.2. Creare un Account

Dovresti vedere il seguente menu a comparsa con il seed dell'account.

{% roboWikiPicture {src:"docs/creating-an-account/2.2-robonomics-app-seed.png", alt:"Generazione del seed dell'account"} %}{% endroboWikiPicture %}

Ci sono due forme: *Mnemonic* (leggibile dall'essere umano) e *Raw* (una sequenza di cifre e lettere). Salva la frase seed in modo sicuro e premi `Avanti`.

> Puoi anche cambiare il tipo di crittografia per la creazione dell'account, per farlo apri `Opzioni di creazione avanzate` e scegli il tipo (`ed25519` nell'immagine).

{% roboWikiPicture {src:"docs/creating-an-account/ed-account.jpg", alt:"Account di tipo crittografico ed25519"} %}{% endroboWikiPicture %}

Nel menu successivo, devi impostare il nome dell'account e la password, simile alle istruzioni dell'estensione descritte sopra.

{% roboWikiPicture {src:"docs/creating-an-account/2.3-robonomics-app-name-pass.png", alt:"Generazione del nome dell'account e della password"} %}{% endroboWikiPicture %}

Cliccando sul pulsante `Avanti` verrai portato all'ultima finestra. Clicca su `Salva` per completare la creazione dell'account. Verranno generati anche file JSON di backup che dovresti conservare in modo sicuro. In seguito potrai utilizzare questo file per ripristinare il tuo account se ricordi la password.

{% roboWikiPicture {src:"docs/creating-an-account/2.4-robonomics-app-account-created.png", alt:"Creazione dell'account riuscita"} %}{% endroboWikiPicture %}

## 2.3 Aggiungi l'account ed25519 all'estensione Polkadot

Potresti aver bisogno di aggiungere l'account creato all'estensione Polkadot.js (per l'account ed25519 puoi farlo solo con il file JSON di backup). Per farlo devi creare un file di backup dell'account. Clicca sui tre puntini sul tuo account e scegli `Crea un file di backup per questo account` e inserisci la tua password.

{% roboWikiPicture {src:"docs/creating-an-account/backup-file.jpg", alt:"File di backup"} %}{% endroboWikiPicture %}

Successivamente apri l'estensione e premi il pulsante `+` in alto a destra, quindi scegli `Ripristina account da file JSON di backup`.

{% roboWikiPicture {src:"docs/creating-an-account/extention-add-backup.jpg", alt:"Ripristino del backup nell'estensione"} %}{% endroboWikiPicture %}

Nella finestra aperta, rilascia il file salvato, inserisci la password e premi `Ripristina`.

{% roboWikiPicture {src:"docs/creating-an-account/file-backup.jpg", alt:"Ripristino del backup nell'estensione 2"} %}{% endroboWikiPicture %}

## 3. Account Creato con Successo

Ora puoi operare pienamente con il tuo account appena creato. Invia e ricevi token, messaggi, scrivi datalog e altro ancora. Sentiti libero di esplorare tutte le funzionalità dell'app. Per copiare l'indirizzo del tuo account, fai semplicemente clic sull'icona, l'indirizzo verrà copiato negli appunti.

Se desideri saperne di più sugli account Polkadot / Kusama e su ulteriori modi per crearli, puoi trovare ulteriori informazioni [qui](https://wiki.polkadot.network/docs/learn-accounts) e [qui](https://wiki.polkadot.network/docs/learn-account-generation).