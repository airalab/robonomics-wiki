---
title: Wie man einen Collator-Knoten aus dem Quellcode erstellt
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust-Toolchain nightly-2022-08-05
---


{% roboWikiNote {title:"Hinweis", type: "note"}%} In der Screencast und den Screenshots dieses Artikels haben wir die Version 1.4.0 von Robonomics verwendet. Sie müssen dieselben Befehle verwenden, aber die Version von Robonomics durch die aktuelle ersetzen.{% endroboWikiNote %}

## Was ist ein Collator

Ein Collator ist Teil der Robonomics-Parachain. Diese Knotenart erstellt neue Blöcke für die Kette.

>Collatoren pflegen Parachains, indem sie Parachain-Transaktionen von Benutzern sammeln und Zustandsübergangs-Nachweise für Relay-Chain-Validatoren erstellen. Mit anderen Worten, Collatoren pflegen Parachains, indem sie Parachain-Transaktionen zu Parachain-Blockkandidaten zusammenfassen und auf der Grundlage dieser Blöcke Zustandsübergangsnachweise für Validatoren erstellen.

Weitere Informationen zum Collator finden Sie auf der entsprechenden [Polkadot-Wikiseite](https://wiki.polkadot.network/docs/learn-collator)

In der Robonomics-Parachain erhält jeder Collator Belohnungen (**0,000380520 XRT**) für jeden von ihm erstellten Block, wenn dieser Block an die Kette angehängt wurde.
Außerdem erhält der Collator **50 % der Transaktionsgebühren** aus diesem Block.

## Bauprozess

https://youtu.be/wnAtD7w0Pxk

Stellen Sie sicher, dass Sie Rust und die erforderliche Software installiert haben. Der Rust-Installer wird Sie nach den aktuellen Installationsoptionen fragen. Wählen Sie die Option `1) Proceed with installation (default)`.

```
  curl https://sh.rustup.rs -sSf | sh
  # Unter Windows laden Sie rustup-init.exe herunter und führen Sie es aus
  # von https://rustup.rs stattdessen
  source $HOME/.cargo/env
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_rust.jpg", alt:"Rust installieren"} %}{% endroboWikiPicture %}

Installieren Sie die erforderliche Nightly-Toolchain und das Wasm-Ziel.
Die folgenden Befehle sind für Robonomics v2.6.0 aktuell:

```
  rustup install nightly-2022-08-05
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_nightly.jpg", alt:"Nightly installieren"} %}{% endroboWikiPicture %}

```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
Sie müssen auch die folgenden Pakete installieren:

  1. Linux:

  ```
    sudo apt install cmake git clang libclang-dev
  ```
  2. Mac:

  ```
    brew install cmake pkg-config git llvm
  ```
  3. Windows (PowerShell):

  ```
    # Installieren Sie git von https://git-scm.com/download/win
    # Installieren Sie LLVM
    # Laden Sie die Pre-Build-Windows-Binärdateien herunter und installieren Sie sie
    # von LLVM von http://releases.llvm.org/download.html
  ```
Nun können Sie den Robonomics-Knoten aus dem Git-Quellcode installieren.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/start_build_robonomics.jpg", alt:"Robonomics-Bau starten"} %}{% endroboWikiPicture %}
{% roboWikiPicture {src:"docs/how-to-build-collator-node/end_build_robonomics.jpg", alt:"Robonomics-Bau beenden"} %}{% endroboWikiPicture %}

Nach diesem Befehl befindet sich die kompilierte Robonomics-Binärdatei im Verzeichnis `~/.cargo/bin`.

Der nächste Schritt ist das Starten des Collator-Knotens. Informationen dazu finden Sie im Artikel ["Wie man den Robonomics-Collator startet"](/docs/how-to-launch-the-robonomics-collator).