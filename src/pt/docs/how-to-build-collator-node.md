---
title: Como construir um nó collator a partir da fonte
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Cadeia de ferramentas Rust nightly-2022-08-05
---


{% roboWikiNote {title:"Nota", type: "nota"}%} No screencast e nas capturas de tela deste artigo, usamos a versão 1.4.0 do Robonomics. Você precisa usar os mesmos comandos, mas substituir a versão do Robonomics pela atual.{% endroboWikiNote %}

## O que é um collator

Collator é parte da parachain Robonomics. Este tipo de nó cria novos blocos para a cadeia.

>Collators mantêm parachains coletando transações de parachain dos usuários e produzindo provas de transição de estado para os validadores da Relay Chain. Em outras palavras, collators mantêm parachains agregando transações de parachain em candidatos a blocos de parachain e produzindo provas de transição de estado para os validadores com base nesses blocos.

Você pode aprender mais sobre collator na página wiki relacionada do [Polkadot](https://wiki.polkadot.network/docs/learn-collator)

Na parachain Robonomics, cada collator recebe recompensas (**0.000380520 XRT**) para cada bloco que constrói, se esse bloco foi selado na cadeia.
Além disso, o collator recebe **50% das taxas de transação** deste bloco.

## Processo de construção

https://youtu.be/wnAtD7w0Pxk

Certifique-se de ter o Rust e o software de suporte instalados. O instalador do Rust irá perguntar sobre as opções de instalação atuais, você deve escolher a opção `1) Prosseguir com a instalação (padrão)`.


```
  curl https://sh.rustup.rs -sSf | sh
  # no Windows, baixe e execute rustup-init.exe
  # de https://rustup.rs em vez disso
  source $HOME/.cargo/env
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_rust.jpg", alt:"instalar rust"} %}{% endroboWikiPicture %}


Instale a cadeia de ferramentas nightly e o alvo wasm necessários.
Os comandos a seguir são atuais para o Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_nightly.jpg", alt:"instalar nightly"} %}{% endroboWikiPicture %}


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
    # Instalar git https://git-scm.com/download/win
    # Instalar LLVM
    # Baixar e instalar os binários pré-compilados do Windows
    # do LLVM de http://releases.llvm.org/download.html
  ```
Agora você pode instalar o nó robonomics a partir da fonte git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/start_build_robonomics.jpg", alt:"Iniciar a construção do Robonomics"} %}{% endroboWikiPicture %}
{% roboWikiPicture {src:"docs/how-to-build-collator-node/end_build_robonomics.jpg", alt:"Finalizar a construção do Robonomics"} %}{% endroboWikiPicture %}


Após este comando, o binário robonomics compilado estará no diretório `~/.cargo/bin`.

O próximo passo é como iniciar o nó collator. Você pode ler sobre isso no artigo ["Como iniciar o collator Robonomics"](/docs/how-to-launch-the-robonomics-collator).