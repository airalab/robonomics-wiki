---
title: PythonインターフェースとRobonomics IO
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Robonomicsパレットに実装された一部のエクストリンシックは、Polkadotアプリから提出するのが難しいです。さらに、この機能とやり取りするためにプログラミング言語を使用する必要があります。この目的のために、[robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface)と呼ばれるシンプルなPythonツールが開発されました。これは、polkascan-maintained [py-substrate-interface](https://github.com/polkascan/py-substrate-interface)のラッパーです。以下に、このパッケージの簡単な説明といくつかの便利なリンクと例が示されています。また、CLIツールについても説明されています。**

## robonomics-interface

[PyPi](https://pypi.org/project/robonomics-interface/)で利用可能なパッケージはダウンロードしてセットアップする準備ができています。
詳細なdocstring生成の[ドキュメント](https://multi-agent-io.github.io/robonomics-interface/)も利用可能です。

全体として、これはRobonomicsブロックチェーンとプログラミングツールを介してやり取りしたい開発者向けのツールです。RobonomicsチームのほとんどのPythonプロジェクトは、このインターフェースを使用してパラチェーンとやり取りしています。

### インストール

インストールプロセスには、少なくともPython 3.8がインストールされている必要があります。`x86`、`arm7`、`arm8`のいずれのアーキテクチャもコンパイルプロセスは必要ありません。すべてのホイールは依存関係のメンテナによってビルドされ、公開されています。

インストールツールとして`pip`を使用します:

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

{% roboWikiNote {title:"ローカルノード", type: "note"}%}
  テスト用のローカルノードなど、カスタムエンドポイントを使用することも可能です:

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```
{% endroboWikiNote %}

エクストリンシックを提出することも可能です:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # これはエクストリンシックハッシュです
```

{% roboWikiNote {title:"ドキュメント", type: "note"}%}言われているように、さらに多くの例は[ドキュメント](https://multi-agent-io.github.io/robonomics-interface/)ページで利用可能です。{% endroboWikiNote %}

## CLIツール

`robonomics-interface`には、プロトタイピングやクイックテストの目的で使用するPython `click` CLIツールも含まれています。パッケージとともにインストールされ、ターミナルで使用できます:

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

ローカルノードで使用してみることができます。パイプラインの哲学が採用されています:

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # これはエクストリンシックハッシュです
```