---
title: Come eseguire il nodo di sviluppo di Robonomics
contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Per testare le tue applicazioni su Robonomics potresti voler eseguirlo in modalità di sviluppo. Questo articolo mostra istruzioni passo dopo passo su come ottenere la tua istanza di test locale di Robonomics.**


## Ottenere il Binario del Nodo

1. Per prima cosa, hai bisogno di un file binario, scarica l'archivio con esso dall'ultima [release](https://github.com/airalab/robonomics/releases).

2. Naviga nella cartella dell'archivio, estrai il binario e cambia i permessi:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## Esegui

Esegui il nodo con:

```bash
./robonomics --dev
```
Vedrai il seguente output:

{% roboWikiPicture {src:"docs/dev-node/robonomics.png", alt:"robonomics"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Da Zero", type: "note"}%} Se desideri eliminare i blocchi esistenti puoi farlo rimuovendo RocksDB in `/tmp/substrate******/chains/dev/db/full`.
Sostituisci `******` con un identificatore corrispondente visualizzato nei log all'avvio.

Se desideri avviare il nodo da zero ogni volta, utilizza il flag `--tmp`.
{% endroboWikiNote %}


## Connetti

Ora puoi connetterti al tuo nodo locale attraverso il [Portale Polkadot](https://polkadot.js.org/apps/#/explorer).

Cambia la rete in `Nodo Locale` nell'angolo in alto a sinistra e premi `Cambia`.

{% roboWikiPicture {src:"docs/dev-node/portal.png", alt:"switch"} %}{% endroboWikiPicture %}

Benvenuto nell'istanza locale di Robonomics!

{% roboWikiPicture {src:"docs/dev-node/dev-portal.png", alt:"local node"} %}{% endroboWikiPicture %}