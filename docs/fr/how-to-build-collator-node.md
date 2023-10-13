---
title: Comment construire un nœud de collecteur à partir de la source
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---

<robo-wiki-note type="note" title="Note">
  Dans la vidéo et les captures d'écran de cet article, nous avons utilisé la version 1.4.0 de Robonomics. Vous devez utiliser les mêmes commandes, mais remplacer la version de Robonomics par la version actuelle.
</robo-wiki-note>

## Qu'est-ce qu'un collecteur

Le collecteur fait partie de la parachain Robonomics. Ce type de nœud crée de nouveaux blocs pour la chaîne..

>Les collecteurs maintiennent les parachains en collectant les transactions de parachain des utilisateurs et en produisant des preuves de transition d'état pour les validateurs de la chaîne de relais. En d'autres termes, les collecteurs maintiennent les parachains en agrégeant les transactions de parachain en candidats de bloc de parachain et en produisant des preuves de transition d'état pour les validateurs basées sur ces blocs.

Vous pouvez en savoir plus sur le collecteur sur la page wiki [Polkadot](https://wiki.polkadot.network/docs/learn-collator) associée.

Dans la parachain Robonomics, chaque assembleur reçoit des récompenses (**0,000380520 XRT**) pour chaque bloc qu'il a construit, si ce bloc a été scellé à la chaîne.
L'assembleur bénéficie également de **50 % de frais de transaction** sur ce bloc.

## Processus de construction

https://youtu.be/wnAtD7w0Pxk

Assurez-vous d'avoir Rust et les logiciels de support installés. L'installateur Rust vous demandera des options d'installation actuelles, vous devez choisir l'option `1) Continuer l'installation (par défaut)`.


```
  curl https://sh.rustup.rs -sSf | sh
  # on Windows download and run rustup-init.exe
  # from https://rustup.rs instead
  source $HOME/.cargo/env
```
![Installer Rust](../images/how-to-build-collator-node/install_rust.jpg)


Installez la chaîne d'outils nocturne requise et la cible wasm.
Les commandes suivantes sont valables pour Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```
![Install nightly](../images/how-to-build-collator-node/install_nightly.jpg)


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
Vous devrez également installer les packages suivants:

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
Maintenant, vous pouvez installer le nœud robonomics à partir de la source git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```
![Start build Robonomics](../images/how-to-build-collator-node/start_build_robonomics.jpg)
![End build Robonomics](../images/how-to-build-collator-node/end_build_robonomics.jpg)


Après cette commande, le binaire robonomics compilé se trouvera dans le répertoire `~/.cargo/bin`.

L'étape suivante consiste à lancer le nœud collecteur. Vous pouvez en lire plus à ce sujet dans l'article ["Comment lancer le collecteur Robonomics"](/docs/how-to-launch-the-robonomics-collator).