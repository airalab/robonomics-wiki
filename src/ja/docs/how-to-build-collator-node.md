---
title: ソースからコレーターノードを構築する方法
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rustツールチェーン nightly-2022-08-05
---


{% roboWikiNote {title:"ノート", type: "note"}%} この記事のスクリーンキャストとスクリーンショットでは、Robonomicsのバージョン1.4.0を使用しています。同じコマンドを使用しますが、Robonomicsのバージョンを最新のものに置き換える必要があります。{% endroboWikiNote %}

## コレーターとは

コレーターはRobonomicsパラチェーンの一部です。このノードタイプはチェーンの新しいブロックを作成します。

> コレーターは、ユーザーからのパラチェーントランザクションを収集し、リレーチェーンのバリデーターに対して状態遷移の証明を生成することで、パラチェーンを維持します。言い換えると、コレーターはパラチェーンを維持し、パラチェーントランザクションをパラチェーンブロック候補に集約し、それらのブロックに基づいてバリデーターに対して状態遷移の証明を生成します。

コレーターについて詳しくは、関連する[Polkadot wikiページ](https://wiki.polkadot.network/docs/learn-collator)をご覧ください。

Robonomicsパラチェーンでは、各コレーターがブロックを構築するたびに報酬（**0.000380520 XRT**）を受け取ります。このブロックがチェーンに封印された場合、コレーターはこのブロックから**トランザクション手数料の50％**を受け取ります。

## 構築プロセス

https://youtu.be/wnAtD7w0Pxk

Rustとサポートソフトウェアがインストールされていることを確認してください。Rustインストーラーは現在のインストールオプションについて尋ねますが、`1) Proceed with installation (default)`オプションを選択する必要があります。


```
  curl https://sh.rustup.rs -sSf | sh
  # Windowsの場合は、https://rustup.rs からrustup-init.exeをダウンロードして実行してください
  source $HOME/.cargo/env
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_rust.jpg", alt:"install rust"} %}{% endroboWikiPicture %}


必要なnightlyツールチェーンとwasmターゲットをインストールします。
次のコマンドはRobonomics v2.6.0向けです:

```
  rustup install nightly-2022-08-05
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_nightly.jpg", alt:"install nightly"} %}{% endroboWikiPicture %}


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
次に、次のパッケージをインストールする必要があります:

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
    # gitをインストール https://git-scm.com/download/win
    # LLVMをインストール
    # LLVMのPre Build Windowsバイナリをダウンロードしてインストール
    # http://releases.llvm.org/download.html
  ```
これで、gitソースからrobonomicsノードをインストールできます。

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/start_build_robonomics.jpg", alt:"Start build Robonomics"} %}{% endroboWikiPicture %}
{% roboWikiPicture {src:"docs/how-to-build-collator-node/end_build_robonomics.jpg", alt:"End build Robonomics"} %}{% endroboWikiPicture %}


このコマンドを実行すると、コンパイルされたrobonomicsバイナリが`~/.cargo/bin`ディレクトリに保存されます。

次のステップは、コレーターノードを起動する方法です。["Robonomicsコレーターを起動する方法"](/docs/how-to-launch-the-robonomics-collator)の記事で詳細を読むことができます。