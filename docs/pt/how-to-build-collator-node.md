---
title: How to build collator node from source 
locale: 'pt' 
contributors: [dergudzon, Leemo94]
translated: false
---

https://youtu.be/wnAtD7w0Pxk

Ensure you have Rust and the support software installed. The Rust installer will ask you about current installation options, you should choose the `1) Proceed with installation (default)` option.


```
  curl https://sh.rustup.rs -sSf | sh
  # on Windows download and run rustup-init.exe
  # from https://rustup.rs instead
  source $HOME/.cargo/env
```
![Install Rust](../images/how-to-build-collator-node/install_rust.jpg)


Install the required nightly toolchain and wasm target.
Next commands actual for Robonomics v1.4.0:

```
  rustup install nightly-2021-11-02
```
![Install nightly](../images/how-to-build-collator-node/install_nightly.jpg)


```
  rustup default nightly-2021-11-02
  rustup target add wasm32-unknown-unknown --toolchain nightly-2021-11-02
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
  cargo install --force --git https://github.com/airalab/robonomics --tag v1.4.0 robonomics-node
```
![Start build Robonomics](../images/how-to-build-collator-node/start_build_robonomics.jpg)
![End build Robonomics](../images/how-to-build-collator-node/end_build_robonomics.jpg)


After this command the compiled robonomics binary will be in `~/.cargo/bin` directory.

The next step is how to launch the collator node. You can read about it in the ["How to launch the Robonomics collator"](/docs/how-to-launch-the-robonomics-collator) article.