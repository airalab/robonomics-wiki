---
title: PythonインターフェースとロボノミクスIO
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**ロボノミクス パレットに実装されている一部の外部機能は、Polkadot アプリから送信するのが困難です。 さらに、プログラミング言語を使用してこの機能を操作する必要があります。 この目的のために、[robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface) と呼ばれる単純な Python ツールが開発されました。 これは、polkascan が保守する [py-substrate-interface](https://github.com/polkascan/py-substrate-interface) のラッパーです。 以下に、このパッケージの簡単な説明と、いくつかの役立つリンクと例を示します。 CLI ツールについても説明します。**

## robonomics-interface

[PyPi](https://pypi.org/project/robonomics-interface/)パッケージがダウンロードおよびセットアップできる状態で利用可能です。
詳細なドキュメント生成された[ドキュメンテーション](https://multi-agent-io.github.io/robonomics-interface/)も利用可能です。

全体として、これはプログラミングツールを介してRobonomicsブロックチェーンと対話したい開発者向けのツールです。RobonomicsチームのほとんどのPythonプロジェクトは、このインターフェースを使用してパラチェーンと対話します。

### インストール

インストールプロセスには、少なくともPython 3.8がインストールされている必要があります。`x86`、`arm7`、`arm8`のいずれのアーキテクチャもコンパイルプロセスを必要としません。すべてのホイールは依存関係のメンテナによってビルドおよび公開されます

インストールツールとして`pip`を使用しま：

```bash
$ pip3 install robonomics_interface
```

### 使用例

主なアイデアは、`Account`インスタンスを作成し、それを使用してパレット専用のインスタンスを作成することです。


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  カスタムエンドポイント（たとえば、テスト用のローカルノード）を使用することも可能です:

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

エクストリンシックも提出することが可能です:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  前述のように、より多くの例は[ドキュメンテーション](https://multi-agent-io.github.io/robonomics-interface/)ページで利用可能です。

</robo-wiki-note>

## CLI tool

`robonomics-interface`には、プロトタイピングやクイックテストの目的で使用するためのPython `click` CLIツールも含まれています。パッケージとともにインストールされ、ターミナルで利用できます：

```bash
$ robomomics_interface --help

#Usage: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Options:
#  --help  Show this message and exit.
#
#Commands:
#  read   Subscribe to datalog/launch events in the chain
#  write  Send various extrinsics (launch commands or record datalogs)
```

ローカルノードでそれを使用してみることもできます。パイプラインの哲学が採用されています：

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```