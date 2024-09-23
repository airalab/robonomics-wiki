---
title: Wie man einen Robonomics Dev-Knoten ausführt
contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Wenn Sie Ihre Anwendungen auf Robonomics testen möchten, möchten Sie sie möglicherweise im Entwicklungsmodus ausführen. Dieser Artikel zeigt Schritt-für-Schritt-Anleitungen, wie Sie Ihre eigene lokale Testinstanz von Robonomics erhalten.**


## Node-Binary erhalten

1. Zuerst benötigen Sie eine Binärdatei. Laden Sie das Archiv damit aus dem neuesten [Release](https://github.com/airalab/robonomics/releases) herunter.

2. Navigieren Sie zum Archivordner, entpacken Sie die Binärdatei und ändern Sie die Berechtigungen:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## Ausführen

Führen Sie den Knoten aus mit:

```bash
./robonomics --dev
```
Sie werden die folgende Ausgabe sehen:

{% roboWikiPicture {src:"docs/dev-node/robonomics.png", alt:"robonomics"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Von Grund auf neu", type: "note"}%} Wenn Sie vorhandene Blöcke löschen möchten, können Sie dies tun, indem Sie RocksDB unter `/tmp/substrate******/chains/dev/db/full` entfernen.
Ersetzen Sie `******` durch einen entsprechenden Bezeichner, der beim Start in den Protokollen angezeigt wird.

Wenn Sie den Knoten jedes Mal von Grund auf neu starten möchten, verwenden Sie die `--tmp`-Flagge.
{% endroboWikiNote %}


## Verbinden

Jetzt können Sie sich über das [Polkadot-Portal](https://polkadot.js.org/apps/#/explorer) mit Ihrem lokalen Knoten verbinden.

Ändern Sie das Netzwerk in der oberen linken Ecke auf `Lokaler Knoten` und drücken Sie `Wechseln`.

{% roboWikiPicture {src:"docs/dev-node/portal.png", alt:"switch"} %}{% endroboWikiPicture %}

Willkommen zur lokalen Instanz von Robonomics!

{% roboWikiPicture {src:"docs/dev-node/dev-portal.png", alt:"local node"} %}{% endroboWikiPicture %}