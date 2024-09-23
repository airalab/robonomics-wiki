---
title: Comment construire un nœud collator à partir de la source
contributors: [dergudzon, Leemo94]
outils:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Chaîne d'outils Rust nightly-2022-08-05
---


{% roboWikiNote {title:"Remarque", type: "note"}%} Dans la vidéo et les captures d'écran de cet article, nous avons utilisé la version 1.4.0 de Robonomics. Vous devez utiliser les mêmes commandes, mais remplacer la version de Robonomics par la version actuelle.{% endroboWikiNote %}

## Qu'est-ce qu'un collator

Le collator fait partie de la parachain Robonomics. Ce type de nœud crée de nouveaux blocs pour la chaîne.

>Les collators maintiennent les parachains en collectant les transactions de parachain des utilisateurs et en produisant des preuves de transition d'état pour les validateurs de la chaîne de relais. En d'autres termes, les collators maintiennent les parachains en agrégeant les transactions de parachain en candidats de blocs de parachain et en produisant des preuves de transition d'état pour les validateurs basées sur ces blocs.

Vous pouvez en apprendre davantage sur le collator sur la page wiki de Polkadot associée [ici](https://wiki.polkadot.network/docs/learn-collator)

Dans la parachain Robonomics, chaque collator reçoit des récompenses (**0.000380520 XRT**) pour chaque bloc qu'il construit, si ce bloc est scellé dans la chaîne.
De plus, le collator reçoit **50% des frais de transaction** de ce bloc.

## Processus de construction

https://youtu.be/wnAtD7w0Pxk

Assurez-vous d'avoir Rust et les logiciels de support installés. L'installateur Rust vous demandera des options d'installation actuelles, vous devriez choisir l'option `1) Procéder à l'installation (par défaut)`.


```
  curl https://sh.rustup.rs -sSf | sh
  # sur Windows, téléchargez et exécutez rustup-init.exe
  # depuis https://rustup.rs à la place
  source $HOME/.cargo/env
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_rust.jpg", alt:"installer rust"} %}{% endroboWikiPicture %}


Installez la chaîne d'outils nightly requise et la cible wasm.
Les commandes suivantes sont actuelles pour Robonomics v2.6.0 :

```
  rustup install nightly-2022-08-05
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_nightly.jpg", alt:"installer nightly"} %}{% endroboWikiPicture %}


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
Vous devrez également installer les packages suivants :

  1. Linux :

  ```
    sudo apt install cmake git clang libclang-dev
  ```
  2. Mac :

  ```
    brew install cmake pkg-config git llvm
  ```
  3. Windows (PowerShell) :

  ```
    # Installer git https://git-scm.com/download/win
    # Installer LLVM
    # Télécharger et installer les binaires précompilés Windows
    # de LLVM depuis http://releases.llvm.org/download.html
  ```
Maintenant, vous pouvez installer le nœud robonomics à partir de la source git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/start_build_robonomics.jpg", alt:"Démarrer la construction de Robonomics"} %}{% endroboWikiPicture %}
{% roboWikiPicture {src:"docs/how-to-build-collator-node/end_build_robonomics.jpg", alt:"Terminer la construction de Robonomics"} %}{% endroboWikiPicture %}


Après cette commande, le binaire robonomics compilé se trouvera dans le répertoire `~/.cargo/bin`.

La prochaine étape consiste à lancer le nœud collator. Vous pouvez en savoir plus à ce sujet dans l'article ["Comment lancer le collator Robonomics"](/docs/how-to-launch-the-robonomics-collator).