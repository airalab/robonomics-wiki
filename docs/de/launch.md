---
title: Start
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Eine weitere grundlegende Funktion der Robonomics-Parachain ist das Start-Paket. Es ermöglicht Ihnen, Befehle an die Konten/Entitäten dahinter zu senden. Diese Befehle enthalten Parameter, um die auszuführende Aufgabe zu spezifizieren.**

<robo-wiki-note type="warning" title="Dev Node">

  Bitte beachten Sie, dass diese und die folgenden Anleitungen an einer lokalen Instanz des Robonomics-Knotens demonstriert werden. Richten Sie Ihren eigenen mit [diesen Anweisungen](/docs/run-dev-node) ein.

</robo-wiki-note>

## 1. Navigieren Sie zu Developer -> Extrinsics

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. Wählen Sie launch -> launch Sie aus der Dropdown-Liste der möglichen Extrinsischen Funktionen

Wählen Sie auch ein Konto aus, mit dem Sie das Extrinsische senden möchten. Füllen Sie das Zielfeld und das Parameterfeld aus.

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  Launch unterstützt 32 Byte lange Zeichenfolgen als Befehle ([Quelle](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)), Hier gibt es also Raum zum Improvisieren:
  - Für grundlegende Befehle wie das Umschalten können Sie „0x00000000000000000000000000000000000000000000000000000000000000001“ oder verwenden „0x000000000000000000000000000000000000000000000000000000000000000“.
  – Für erweiterte Befehle, einschließlich JSON-ähnlicher Befehle, können Sie [IPFS](https://ipfs.tech/) CID im Format a verwenden
  [richtiger Weg](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).

</robo-wiki-note>

## 3. Übermitteln Sie die Transaktion

<robo-wiki-picture src="launch/submit.jpg" />

## 4. Überprüfen Sie Ihren Start in den Ereignissen

Dazu navigieren Sie zu *Network -> Explorer* und finden eine Liste der Ereignisse auf der rechten Seite. Klicken Sie auf ein Dreieckssymbol, um es zu erweitern.

<robo-wiki-picture src="launch/event.jpg" />
