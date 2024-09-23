---
title: Come creare un nodo collator da sorgente
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Catena degli strumenti Rust nightly-2022-08-05
---


{% roboWikiNote {title:"Nota", type: "nota"}%} Nel video e negli screenshot di questo articolo, abbiamo utilizzato la versione 1.4.0 di Robonomics. È necessario utilizzare gli stessi comandi, ma sostituire la versione di Robonomics con quella attuale.{% endroboWikiNote %}

## Cos'è un collator

Il collator fa parte della parachain di Robonomics. Questo tipo di nodi crea nuovi blocchi per la catena.

>I collator mantengono le parachain raccogliendo le transazioni delle parachain dagli utenti e producendo prove di transizione di stato per i validatori della Relay Chain. In altre parole, i collator mantengono le parachain aggregando le transazioni delle parachain in candidati blocchi delle parachain e producendo prove di transizione di stato per i validatori basate su quei blocchi.

Puoi saperne di più sul collator nella relativa [pagina wiki di Polkadot](https://wiki.polkadot.network/docs/learn-collator)

Nella parachain di Robonomics, ogni collator riceve ricompense (**0.000380520 XRT**) per ogni blocco costruito, se questo blocco è stato sigillato nella catena.
Inoltre, il collator riceve il **50% delle commissioni sulle transazioni** di questo blocco.

## Processo di costruzione

https://youtu.be/wnAtD7w0Pxk

Assicurati di avere Rust e il software di supporto installati. L'installatore di Rust ti chiederà informazioni sulle opzioni di installazione attuali, dovresti scegliere l'opzione `1) Procedi con l'installazione (predefinito)`.


```
  curl https://sh.rustup.rs -sSf | sh
  # su Windows scarica ed esegui rustup-init.exe
  # da https://rustup.rs invece
  source $HOME/.cargo/env
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_rust.jpg", alt:"installa rust"} %}{% endroboWikiPicture %}


Installa la catena degli strumenti nightly richiesta e il target wasm.
I comandi successivi sono attuali per Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_nightly.jpg", alt:"installa nightly"} %}{% endroboWikiPicture %}


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
Dovrai anche installare i seguenti pacchetti:

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
    # Installa git https://git-scm.com/download/win
    # Installa LLVM
    # Scarica e installa i binari precompilati per Windows
    # di LLVM da http://releases.llvm.org/download.html
  ```
Ora puoi installare il nodo robonomics dalla sorgente git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/start_build_robonomics.jpg", alt:"Inizia a costruire Robonomics"} %}{% endroboWikiPicture %}
{% roboWikiPicture {src:"docs/how-to-build-collator-node/end_build_robonomics.jpg", alt:"Fine della costruzione di Robonomics"} %}{% endroboWikiPicture %}


Dopo questo comando, il binario robonomics compilato sarà nella directory `~/.cargo/bin`.

Il passo successivo è come avviare il nodo collator. Puoi leggere al riguardo nell'articolo ["Come avviare il collator Robonomics"](/docs/how-to-launch-the-robonomics-collator).