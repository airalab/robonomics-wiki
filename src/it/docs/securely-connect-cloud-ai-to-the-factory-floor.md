---
title: Collegare in modo sicuro l'IA cloud al piano di fabbrica
contributors: [vitl2907]
---

Le tecnologie Robonomics possono già risolvere le sfide che l'Industria 4.0 affronta e sono già applicate a scenari reali nell'ambiente industriale.

Un gran numero di aziende di intelligenza artificiale sta sviluppando soluzioni per ottimizzare i processi sul piano di fabbrica, consentendo alle fabbriche di produrre di più con minor costo. Tuttavia, la maggior parte delle fabbriche è riluttante a collegare direttamente la propria infrastruttura al cloud poiché ciò comporta potenziali rischi per la sicurezza informatica, che potrebbero portare a perdite milionarie e persino alla perdita di vite umane.

[MerkleBot](https://merklebot.com) ha utilizzato [Robonomics Network](https://robonomics.network) per creare una soluzione per i clienti industriali per collegare in modo sicuro la propria fabbrica all'IA basata su cloud.

Questo articolo è scritto in seguito a un esperimento che abbiamo condotto con [Veracity Protocol](https://www.veracityprotocol.org/) che utilizza algoritmi per creare una protezione non invasiva di qualsiasi oggetto fisico basata sulle fotografie da un dispositivo mobile.

Questo caso d'uso mostra il processo di scansione delle parti industriali utilizzando un braccio robotico.

[Video dimostrativo](https://youtu.be/8AL70LFVX5w)

## Processo passo dopo passo

### DApp come interfaccia utente

{% roboWikiPicture {src:"docs/google-play-store.gif", alt:"/google-play-store"} %}{% endroboWikiPicture %}

DApp funge da interfaccia utente per l'operatore. Viene utilizzata per richiedere l'avvio del robot per raccogliere le fotografie e ha lo scopo di consentire una comunicazione sicura tra l'ambiente di fabbrica e l'IA basata su cloud.

### Avvio del robot

{% roboWikiPicture {src:"docs/Veracity_Protocol_Transaction.gif", alt:"/Veracity_Protocol_Transaction"} %}{% endroboWikiPicture %}

L'operatore avvia la scansione robotica firmando la transazione nella DApp. Questo passaggio garantisce che il processo sul piano di fabbrica possa iniziare solo in base alla transazione nella blockchain pubblica.

Il robot riceve un comando dalla blockchain attraverso la rete Robonomics e inizia la scansione. Le tecnologie della rete Robonomics ci consentono di colmare il divario tra l'obiettivo aziendale e l'operazione robotica.

### Raccolta dati e invio all'IA basata su cloud

Nella DApp l'operatore vede la conferma e il robot inizia a scansionare gli oggetti posti sul tavolo, come in questo caso d'uso, o direttamente sulla linea di fabbrica se necessario.

{% roboWikiPicture {src:"docs/Veracity_Protocol_Launch.gif", alt:"/Veracity_Protocol_Launch"} %}{% endroboWikiPicture %}

Quando il robot raccoglie i dati, li memorizza localmente e li rende disponibili all'IA basata su cloud tramite il protocollo IPFS. Crittografando i dati e organizzando lo scambio dati attraverso una transazione blockchain, possiamo autorizzare l'accesso all'IA basata su cloud garantendo che i dati rimangano sicuri e al loro posto.

Il meccanismo di sicurezza integrato in Robonomics basato sulla sicurezza condivisa delle blockchain pubbliche consente di ottenere il livello di sicurezza che è proibitivamente costoso per la maggior parte delle fabbriche organizzare autonomamente.

### Creazione del passaporto digitale

Quando l'IA basata su cloud analizza i dati, il file di registro e le raccomandazioni vengono registrati automaticamente come un [Passaporto Digitale](https://wiki.robonomics.network/docs/create-digital-identity-run-by-ethereum/). Ogni operazione e scansione possono essere rintracciate poiché il record blockchain ha l'hash di tutti questi file tramite il protocollo IPFS.

## Commenti sul caso d'uso

In questo caso d'uso è stato utilizzato il braccio industriale Universal Robot UR3. Ma grazie al supporto di Robonomics per ROS, la maggior parte dei principali manipolatori industriali può essere utilizzata e collegata in modo sicuro all'IA basata su cloud, inclusi KUKA, Fanuc e Yaskawa.

Se sei interessato a saperne di più sulla distribuzione e integrazione sicura degli strumenti di IA basati su cloud, ti preghiamo di [contattarci](mailto:v@merklebot.com)