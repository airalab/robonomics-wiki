---
title: Start
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Ein weiteres grundlegendes Merkmal der Robonomics-Parachain ist das Start-Paket. Es ermöglicht Ihnen, Befehle an die Konten/Entitäten dahinter zu senden. Diese Befehle enthalten Parameter, um die auszuführende Aufgabe zu spezifizieren.**

{% roboWikiNote {title:"Entwicklerknoten", type: "Warnung"}%} Bitte beachten Sie, dass diese und die folgenden Tutorials an einer lokalen Instanz des Robonomics-Knotens demonstriert werden. Richten Sie Ihren eigenen mit [diesen Anweisungen](/docs/run-dev-node) ein.
{% endroboWikiNote %}

## 1. Navigieren Sie zu Entwickler -> Extrinsische

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"extrinsische"} %}{% endroboWikiPicture %}

## 2. Wählen Sie Start -> Start aus der Dropdown-Liste der möglichen Extrinsischen

Wählen Sie auch ein Konto aus, mit dem Sie die Extrinsische einreichen möchten. Füllen Sie das Zielfeld und das Parameterfeld aus.

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"start"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32 Byte", type: "Hinweis"}%} Start unterstützt 32 Byte lange Zeichenfolgen als Befehle ([Quelle](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  daher gibt es hier Raum für Improvisation:
  - Für grundlegende Befehle wie Umschalten können Sie "0x0000000000000000000000000000000000000000000000000000000000000001" oder
  "0x0000000000000000000000000000000000000000000000000000000000000000" verwenden.
  - Für fortgeschrittene Befehle, einschließlich json-ähnlicher, können Sie [IPFS](https://ipfs.tech/) CID verwenden, das in einer
  [korrekten Weise](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) formatiert ist.
{% endroboWikiNote %}

## 3. Transaktion einreichen

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"einreichen"} %}{% endroboWikiPicture %}

## 4. Überprüfen Sie Ihren Start in den Ereignissen

Navigieren Sie dazu zu *Netzwerk -> Explorer* und finden Sie eine Liste von Ereignissen auf der rechten Seite. Klicken Sie auf ein Dreieckssymbol, um es zu erweitern.

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"ereignis"} %}{% endroboWikiPicture %}
