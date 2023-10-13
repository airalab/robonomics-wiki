---
title: Datalog
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Ora che hai dei fondi sul tuo account, puoi inviare estrinseci. Il primo da provare è un Datalog. Ti consente di archiviare dati in modo persistente nella blockchain. Immagina uno storage distribuito e cripto-protetto per i tuoi dati e questo è proprio quello!**

<robo-wiki-note type="warning" title="Dev Node">

Si prega di prestare attenzione al fatto che questi tutorial vengono dimostrati su un'istanza locale di Robonomics Node. Configura la tua con [queste istruzioni](/docs/run-dev-node).

</robo-wiki-note>

## 1. Vai su  Developer -> Extrinsics

<robo-wiki-picture src="datalog/extrinsics.jpg" />

## 2. Scegli datalog -> record dal menu a tendina degli extrinsics possibili

Scegli anche un account con cui desideri inviare l'extrinsic. Compila il campo record.

<robo-wiki-picture src="datalog/record.jpg" />

<robo-wiki-note type="note" title="Large amount of data">

  Datalog supporta una stringa con un massimo di 512 byte. Per archiviare grandi quantità di dati è possibile utilizzare [IPFS](https://ipfs.tech/).

</robo-wiki-note>

## 3. Invia la transazione

Firma e invia la transazione con un account creato in precedenza utilizzando l'estensione o l'applicazione DApp.

<robo-wiki-picture src="datalog/submit.jpg" />

<robo-wiki-note type="note" title="Erase">

  È anche possibile cancellare **TUTTI** i tuoi record con *datalog -> erase* call.

</robo-wiki-note>

## 4. Verifica il tuo datalog nello storage

Per fare ciò, vai su *Developer -> Chain state*, seleziona *datalog -> datalogIndex*, specifica il tuo account e premi il 
"+" pulsante per ottenere gli indici dei record del tuo account e quindi esplora quello di cui hai bisogno con *datalog -> datalogItem*.

<robo-wiki-picture src="datalog/item.jpg" />

<robo-wiki-note type="note" title="Esplorar">

  Tutti gli eventi, inclusi i record del datalog, possono essere visualizzati nel flusso degli eventi nell'*Explorer*.

</robo-wiki-note>