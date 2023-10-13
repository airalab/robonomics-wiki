---
title: Wie man einen Robonomics Dev Node ausführt
contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Um Ihre Anwendungen auf Robonomics zu testen, möchten Sie sie möglicherweise im Entwicklungsmodus ausführen. Dieser Artikel zeigt Schritt für Schritt
Anweisungen, wie Sie Ihre eigene lokale Testinstanz von Robonomics erhalten.**


## Node-Binärdatei erhalten

1. Zuerst benötigen Sie eine Binärdatei. Laden Sie das Archiv mit dieser von der neuesten [Version](https://github.com/airalab/robonomics/releases) herunter.

2. Navigieren Sie zum Archivordner, entpacken Sie die Binärdatei und ändern Sie die Berechtigungen:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## Ausführen

Führen Sie den Node mit folgendem Befehl aus:

```bash
./robonomics --dev
```
Sie sehen die folgende Ausgabe:

![robonomics](../images/dev-node/robonomics.png)

<robo-wiki-note type="note" title="From Scratch">

  Wenn Sie vorhandene Blöcke löschen möchten, können Sie dies tun, indem Sie RocksDB unter `/tmp/substrate******/chains/dev/db/full` entfernen.
  Ersetzen Sie `******` durch einen entsprechenden in den Protokollen angezeigten Bezeichner.

  Wenn Sie den Node jedes Mal von Grund auf starten möchten, verwenden Sie die Option `--tmp`.

</robo-wiki-note>

## Verbinden

Jetzt können Sie sich über das [Polkadot-Portal](https://polkadot.js.org/apps/#/explorer) mit Ihrem lokalen Node verbinden.

Ändern Sie das Netzwerk in der oberen linken Ecke auf `Local Node` und klicken Sie auf `Switch`.

![switch](../images/dev-node/portal.png)

Willkommen zur lokalen Instanz von Robonomics!

![local_node](../images/dev-node/dev-portal.png)


