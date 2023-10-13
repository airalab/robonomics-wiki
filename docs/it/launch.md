---
title: Lancio
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Un'altra funzionalità di base di Robonomics parachain è il pallet di lancio. Ti consente di inviare comandi agli account/entità che si trovano dietro di essi. Questi comandi includono un parametro per specificare il compito da eseguire.**

<robo-wiki-note type="warning" title="Dev Node">

  Fai attenzione che questo e i tutorial successivi vengono dimostrati su un'istanza locale di Robonomics Node. Configura la tua con [queste istruzioni](/docs/run-dev-node).

</robo-wiki-note>

## 1. Vai su Developer -> Extrinsics

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. Scegli launch -> launch dalla lista a discesa degli extrinsics possibili

Scegli anche un account con cui desideri inviare l'extrinsic. Compila il campo indirizzo di destinazione e il campo parametro.

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  - Launch supporta stringhe lunghe 32 byte come comandi ([fonte](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  quindi c'è spazio per improvvisare qui:
  - Per i comandi di base come la commutazione è possibile utilizzare "0x000000000000000000000000000000000000000000000000000000000000001" o
  "0x00000000000000000000000000000000000000000000000000000000000000".
  - Per comandi avanzati, inclusi quelli di tipo json, puoi utilizzare il CID [IPFS](https://ipfs.tech/) formattato in un
  [modo corretto](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).

</robo-wiki-note>

## 3. Invia la transazione

<robo-wiki-picture src="launch/submit.jpg" />

## 4. Rivedi il tuo lancio negli eventi

Per fare ciò, vai su *Network -> Explorer* e trova un elenco di eventi sulla destra. Fai clic su un'icona a triangolo per espanderla.

<robo-wiki-picture src="launch/event.jpg" />
