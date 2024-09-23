---
title: Lancio
contributors: [PaTara43]
strumenti:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Un'altra funzionalità di base della parachain di Robonomics è il pallet di Lancio. Ti consente di inviare comandi agli account/entità dietro di essi. Questi comandi includono parametri per specificare il compito da eseguire.**

{% roboWikiNote {title:"Nodo Dev", type: "Avviso"}%} Presta attenzione che questi e i tutorial successivi sono dimostrati su un'istanza locale di Robonomics Node. Configura la tua con [queste istruzioni](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Naviga su Sviluppatore -> Estrinseci

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"estrinseci"} %}{% endroboWikiPicture %}

## 2. Scegli lancio -> lancio dall'elenco a discesa degli estrinseci possibili

Scegli anche un account con cui desideri inviare l'estrinseco. Compila il campo dell'indirizzo di destinazione e il campo del parametro.

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"lancio"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32 byte", type: "nota"}%}   Il Lancio supporta stringhe lunghe 32 byte come comandi ([fonte](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  quindi c'è spazio per improvvisare qui:
  - Per comandi di base come l'attivazione, puoi usare "0x0000000000000000000000000000000000000000000000000000000000000001" o
  "0x0000000000000000000000000000000000000000000000000000000000000000".
  - Per comandi avanzati, inclusi quelli simili a JSON, puoi utilizzare [IPFS](https://ipfs.tech/) CID formattato in modo
  [corretto](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
{% endroboWikiNote %}

## 3. Invia la transazione

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"invia"} %}{% endroboWikiPicture %}

## 4. Rivedi il tuo lancio negli eventi

Per farlo, vai su *Rete -> Esploratore* e trova un elenco di eventi sulla destra. Clicca sull'icona del triangolo per espandere.

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"evento"} %}{% endroboWikiPicture %}
