---
title: ソースからコレーターノードをビルドする方法
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---

<robo-wiki-note type="note" title="Note">
  この記事のスクリーンキャストとスクリーンショットでは、Robonomicsのバージョン1.4.0を使用しました。同じコマンドを使用する必要がありますが、Robonomicsのバージョンを現在のバージョンに置き換えてください。
</robo-wiki-note>

## コレーターとは何ですか

コレーターはRobonomicsパラチェーンの一部です。このノードタイプはチェーンの新しいブロックを作成します.

>コレーターは、ユーザーからのパラチェーントランザクションを収集し、リレーチェーンのバリデーターに対して状態遷移の証明を生成することで、パラチェーンを維持します。言い換えれば、コレーターはパラチェーントランザクションをパラチェーンブロック候補に集約し、それらのブロックに基づいてバリデーターに対して状態遷移の証明を生成することで、パラチェーンを維持します。

関連する[Polkadot wikiページ](https://wiki.polkadot.network/docs/learn-collator)でコレーターについて詳しく学ぶことができます

ロボノミクス パラチェーンでは、ブロックがチェーンに封印されていた場合、すべての照合者は構築したブロックごとに報酬 (**0.000380520 XRT**) を受け取ります。
また、照合者はこのブロックから **50% の取引手数料**を受け取ります。

## ビルドプロセス

https://youtu.be/wnAtD7w0Pxk

Rustとサポートソフトウェアがインストールされていることを確認してください。Rustインストーラーは現在のインストールオプションについて尋ねますが、`1) インストールを続行します（デフォルト）`オプションを選択する必要があります。


```
  curl https://sh.rustup.rs -sSf | sh
  # on Windows download and run rustup-init.exe
  # from https://rustup.rs instead
  source $HOME/.cargo/env
```
![インストール Rust](../images/how-to-build-collator-node/install_rust.jpg)


必要なナイトリーツールチェーンとwasmターゲットをインストールします。
次のコマンドはRobonomics v2.6.0に対して有効です。

```
  rustup install nightly-2022-08-05
```
![Install nightly](../images/how-to-build-collator-node/install_nightly.jpg)


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
次に、次のパッケージをインストールする必要があります。

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
今、gitソースからrobonomicsノードをインストールできます。

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```
![Start build Robonomics](../images/how-to-build-collator-node/start_build_robonomics.jpg)
![End build Robonomics](../images/how-to-build-collator-node/end_build_robonomics.jpg)


このコマンドの後、コンパイルされたrobonomicsバイナリは`~/.cargo/bin`ディレクトリにあります。

次のステップは、コレーターノードの起動方法です。["Robonomicsコレーターの起動方法"](/docs/how-to-launch-the-robonomics-collator)の記事で詳しく説明しています。