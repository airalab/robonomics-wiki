---
title: Datalogo
contributors: [PaTara43]
strumenti:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Ora che hai dei fondi sul tuo account, puoi inviare estrinseci. Il primo da provare è un Datalogo. Ti consente di memorizzare dati in modo persistente nella blockchain. Immagina uno storage distribuito e cripto-protetto per i tuoi dati ed eccolo qui!**

{% roboWikiNote {type: "warning", title: "Nodo di Sviluppo"}%}Fai attenzione che questo e i tutorial successivi vengono dimostrati su un'istanza locale di Robonomics Node. Configura la tua con [queste istruzioni](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Naviga su Sviluppatore -> Estrinseci

{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"estrinseci"} %}{% endroboWikiPicture %}

## 2. Scegli datalogo -> record dal menu a discesa degli estrinseci possibili

Scegli anche un account con cui desideri inviare l'estrinseco. Compila il campo record.

{% roboWikiPicture {src:"docs/datalog/record.jpg", alt:"record"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Grande quantità di dati"}%} Il Datalogo supporta una stringa con un massimo di 512 byte. Per memorizzare una grande quantità di dati, si può utilizzare [IPFS](https://ipfs.tech/).
{% endroboWikiNote %}

## 3. Invia la transazione

Firma e invia la transazione con un account creato in precedenza utilizzando l'estensione o l'applicazione DApp.

{% roboWikiPicture {src:"docs/datalog/submit.jpg", alt:"invia"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Cancellare"}%} È anche possibile cancellare **TUTTI** i tuoi record con la chiamata *datalogo -> cancella*.
{% endroboWikiNote %}

## 4. Controlla il tuo datalogo nello storage

Per farlo, vai su *Sviluppatore -> Stato della catena*, seleziona *datalogo -> datalogoIndex*, specifica il tuo account e premi il
pulsante "+" per ottenere gli indici dei record del tuo account e quindi esplora quello di cui hai bisogno con *datalogo -> datalogoItem*.

{% roboWikiPicture {src:"docs/datalog/item.jpg", alt:"elemento"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Esploratore"}%} Tutti gli eventi, inclusi i record del datalogo, possono essere visualizzati nel flusso degli eventi nell'*Esploratore*.
{% endroboWikiNote %}