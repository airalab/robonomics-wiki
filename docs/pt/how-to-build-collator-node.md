---
title: Como construir um nó de colator a partir do código-fonte
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---

<robo-wiki-note type="note" title="Note">
  No screencast e nas capturas de tela deste artigo, usamos a versão 1.4.0 do Robonomics. Você precisa usar os mesmos comandos, mas substituir a versão do Robonomics pela atual.
</robo-wiki-note>

## O que é um colator

Colator é parte da parachain do Robonomics. Esse tipo de nó cria novos blocos para a cadeia..

>Os colatores mantêm as parachains coletando transações de parachain dos usuários e produzindo provas de transição de estado para os validadores da Relay Chain. Em outras palavras, os colatores mantêm as parachains agregando transações de parachain em candidatos a blocos de parachain e produzindo provas de transição de estado para os validadores com base nesses blocos.

Você pode aprender mais sobre colator na página relacionada da [Polkadot wiki](https://wiki.polkadot.network/docs/learn-collator)

No parachain Robonomics, cada agrupador recebe recompensas (**0,000380520 XRT**) para cada bloco construído, se esse bloco tiver sido selado à cadeia.
Além disso, o agrupador recebe **taxas de transação de 50%** deste bloco.

## Processo de construção

https://youtu.be/wnAtD7w0Pxk

Certifique-se de ter o Rust e o software de suporte instalados. O instalador do Rust irá perguntar sobre as opções de instalação atuais, você deve escolher a opção `1) Prosseguir com a instalação (padrão)`.


```
  curl https://sh.rustup.rs -sSf | sh
  # on Windows download and run rustup-init.exe
  # from https://rustup.rs instead
  source $HOME/.cargo/env
```
![Instalar Rust](../images/how-to-build-collator-node/install_rust.jpg)


Instalar the required nightly toolchain and wasm target.
Os comandos a seguir são válidos para o Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```
![Install nightly](../images/how-to-build-collator-node/install_nightly.jpg)


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
Você também precisará instalar os seguintes pacotes:

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
Agora você pode instalar o nó do robonomics a partir da fonte git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```
![Start build Robonomics](../images/how-to-build-collator-node/start_build_robonomics.jpg)
![End build Robonomics](../images/how-to-build-collator-node/end_build_robonomics.jpg)


Após este comando, o binário compilado do robonomics estará no diretório `~/.cargo/bin`.

O próximo passo é como iniciar o nó colator. Você pode ler sobre isso no artigo ["Como iniciar o colator do Robonomics"](/docs/how-to-launch-the-robonomics-collator).