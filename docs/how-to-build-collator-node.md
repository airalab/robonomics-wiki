---
title: How to build collator node from source
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---

<robo-wiki-note type="note" title="Note">
  In the screencast and screenshots of this article, we used version 1.4.0 of Robonomics. You need to use the same commands, but replace the version of Robonomics with the current one.
</robo-wiki-note>

## What is a collator

Collator is part of the Robonomics parachain. This nodes type creates new blocks for chain.

>Collators maintain parachains by collecting parachain transactions from users and producing state transition proofs for Relay Chain validators. In other words, collators maintain parachains by aggregating parachain transactions into parachain block candidates and producing state transition proofs for validators based on those blocks.

You can learn more about collator on the related [Polkadot wiki page](https://wiki.polkadot.network/docs/learn-collator)

In the Robonomics parachain every collator get rewards (**0.000380520 XRT**) for every block it built, if this block was sealed to the chain. 
Also collator get **50% transactions fees** from this block.

## Building process

https://youtu.be/wnAtD7w0Pxk

Ensure you have Rust and the support software installed. The Rust installer will ask you about current installation options, you should choose the `1) Proceed with installation (default)` option.


```
  curl https://sh.rustup.rs -sSf | sh
  # on Windows download and run rustup-init.exe
  # from https://rustup.rs instead
  source $HOME/.cargo/env
```
![Install Rust](./images/how-to-build-collator-node/install_rust.jpg)


Install the required nightly toolchain and wasm target.
Next commands actual for Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```
![Install nightly](./images/how-to-build-collator-node/install_nightly.jpg)


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
You will also need to install the following packages:

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
Now you can install the robonomics node from git source.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```
![Start build Robonomics](./images/how-to-build-collator-node/start_build_robonomics.jpg)
![End build Robonomics](./images/how-to-build-collator-node/end_build_robonomics.jpg)


After this command the compiled robonomics binary will be in `~/.cargo/bin` directory.

The next step is how to launch the collator node. You can read about it in the ["How to launch the Robonomics collator"](/docs/how-to-launch-the-robonomics-collator) article.