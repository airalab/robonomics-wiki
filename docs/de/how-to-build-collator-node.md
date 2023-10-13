---
title: Wie man einen Collator-Knoten aus dem Quellcode erstellt
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---

<robo-wiki-note type="note" title="Note">
  In der Screencast und den Screenshots dieses Artikels haben wir Version 1.4.0 von Robonomics verwendet. Sie müssen dieselben Befehle verwenden, aber die Version von Robonomics durch die aktuelle ersetzen.
</robo-wiki-note>

## Was ist ein Collator

Collator ist Teil der Robonomics-Parachain. Dieser Knotentyp erstellt neue Blöcke für die Kette..

>Collators pflegen Parachains, indem sie Parachain-Transaktionen von Benutzern sammeln und Zustandsübergangsproben für Relay Chain-Validatoren erstellen. Mit anderen Worten, Collators pflegen Parachains, indem sie Parachain-Transaktionen zu Parachain-Blockkandidaten aggregieren und Zustandsübergangsproben für Validatoren basierend auf diesen Blöcken erstellen.

Weitere Informationen zum Collator finden Sie auf der entsprechenden [Polkadot-Wiki-Seite](https://wiki.polkadot.network/docs/learn-collator).

In der Robonomics-Parachain erhält jeder Collator Belohnungen (**0,000380520 XRT**) für jeden Block, den er erstellt hat, wenn dieser Block an die Kette gebunden war.
Außerdem erhält der Zusammensteller **50 % Transaktionsgebühren** aus diesem Block.

## Bauprozess

https://youtu.be/wnAtD7w0Pxk

Stellen Sie sicher, dass Sie Rust und die erforderliche Support-Software installiert haben. Der Rust-Installer fragt Sie nach den aktuellen Installationsoptionen. Sie sollten die Option `1) Mit der Installation fortfahren (Standard)` wählen.


```
  curl https://sh.rustup.rs -sSf | sh
  # on Windows download and run rustup-init.exe
  # from https://rustup.rs instead
  source $HOME/.cargo/env
```
![Installierenieren Rust](../images/how-to-build-collator-node/install_rust.jpg)


Installieren Sie die erforderliche Nightly-Toolchain und das wasm-Ziel.
Die nächsten Befehle gelten für Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```
![Install nightly](../images/how-to-build-collator-node/install_nightly.jpg)


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
    # Install git https://git-scm.com/download/win
    # Install LLVM
    # Download and install the Pre Build Windows binaries
    # of LLVM  from http://releases.llvm.org/download.html
  ```
Jetzt können Sie den Robonomics-Knoten aus der Git-Quelle installieren.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```
![Start build Robonomics](../images/how-to-build-collator-node/start_build_robonomics.jpg)
![End build Robonomics](../images/how-to-build-collator-node/end_build_robonomics.jpg)


Nach diesem Befehl befindet sich die kompilierte Robonomics-Binärdatei im Verzeichnis `~/.cargo/bin`.

Der nächste Schritt besteht darin, den Collator-Knoten zu starten. Informationen dazu finden Sie in dem Artikel ["Wie man den Robonomics-Collator startet"](/docs/how-to-launch-the-robonomics-collator).