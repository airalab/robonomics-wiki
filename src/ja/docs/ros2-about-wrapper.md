---
title: Robonomics ROS 2 Wrapperについて
contributors: [Fingerling42]
tools:   
  - Ubuntu 22.04.4
    https://releases.ubuntu.com/jammy/
  - ROS 2 Humble
    https://docs.ros.org/en/humble/Installation.html
  - IPFS Kubo 0.26.0
    https://docs.ipfs.tech/install/command-line/
  - Python 3.10.12
    https://www.python.org/downloads/
---

**この記事では、Robonomics ROS 2 Wrapperパッケージについて学びます。このパッケージは、Robonomicsパラチェーンのすべての機能をROS 2互換のロボットで使用できるようにします。**

このパッケージのアイデアは、[robonomics-interface](https://github.com/airalab/robonomics-interface)が提供するRobonomicsパラチェーンAPIをROS 2のノードにラップすることです。目標は、ROS 2開発者にロボットやデバイスをパラチェーンの機能と簡単に統合する方法を提供することです。ロボットデバイスの統合の背後にあるロジックは、Robonomicsパラチェーンでそのデバイス用に一意のアドレスが作成され、そのデバイスを制御したりテレメトリを受信したりするために使用されることです。

利用可能な機能には次のものがあります：

* **Launch function** — 指定されたパラメータを文字列またはファイルとして渡して任意のコマンドを実行するデバイスを起動します。
* **Datalog function** — デバイスを公開しますハッシュ形式のテレメトリをパラチェーンに送信します。
* **Robonomicsサブスクリプションの使用** — 手数料なしでトランザクションを送信する機能。
* **安全なファイルストレージ** — データのパッキングおよびアンパッキングには、ファイルに一意のハッシュでアクセスできるようにする[InterPlanetary File System](https://ipfs.tech/)が使用されます。IPFSの便利な使用のために、[Pinata](https://www.pinata.cloud/)のサポートが含まれており、IPFSファイルを高速にダウンロードするためにピン留めできます。
* **ファイルの暗号化と復号** — ファイルの公開鍵暗号化による保護。

現在、このラッパーは[Pythonの実装](https://github.com/airalab/robonomics-ros2/)で利用可能です。

## ラッパーアーキテクチャ

アーキテクチャ的には、ラッパーはワーカーノード（必要なトピックとサービスを備えたもの）と、特定のロボットに使用できる基本ノードクラスで構成されています。

{% roboWikiPicture {src:"docs/robotics/robonomics-ros2-wrapper.png", alt:"ROS 2 Wrapper Architecture"} %}{% endroboWikiPicture %}

* `robonomics_ros2_pubsub` — Robonomicsを介してデータログを送信し、ローンチを受信するためのサービスをラップし、IPFSへのファイルのダウンロード/アップロードを可能にする各ロボット用のユニークなノードです。このノードは、以下で説明されている特別なファイルによって構成されます。ノードが特定のロボットと関連付けられることができます。ROSネームスペースを介して指定されます。
* `robonomics_ros2_robot_handler` — ロボット固有のノードで、pubsubとロボットを調整するための基本クラス `basic_robonomics_handler` に基づいています。ロボットの制御のためにデータログを送信するタイミングを決定し、起動を処理します。

## ラッパーのインストール

ラッパーを使用するには、次のソフトウェアが必要です:

* Linux OSディストリビューション（通常、Ubuntu）
* ROS 2ディストリビューション
* IPFSノード
* Python 3（ラッパーのPython実装用）

インストールガイドに従って、[こちら](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#getting-started) で利用可能なソフトウェアの必要なバージョンを確認してください。必要なコンポーネントをダウンロードした後、`colcon` ユーティリティを使用して、ラッパーを通常のROS 2パッケージとしてビルドする必要があります。

## Web3クラウドへの接続の構成

ラッパーを開始する前に、ロボットが分散型RobonomicsクラウドおよびWeb3サービスをサポートする方法を設定する必要があります。これを行うには、`robonomics_pubsub_params_template.yaml` という構成ファイルを編集する必要があります。このファイルは、Robonomicsにアクセスする必要がある各起動されたロボットごとに一意である必要があります。

ファイルには、次の構成フィールドが含まれています:

| フィールド                 | 説明                                                                                                |
|-----------------------|------------------------------------------------------------------------------------------------------------|
| account_seed          | Robonomicsパラチェーンのアカウントシード                                                                     |
| crypto_type           | アカウントのタイプ、`ED25519`または`SR25519`                                                               |
| remote_node_url       | RobonomicsノードのURL、デフォルトは`wss://kusama.rpc.robonomics.network`、ローカルノードの場合は`ws://127.0.0.1:9944`|
| rws_owner_address     | RWSモジュールを使用するRobonomicsサブスクリプション所有者のアドレス                                       |
| ipfs_dir_path         | IPFSファイルを含むディレクトリのパス                                                                       |
| ipfs_gateway          | ファイルをダウンロードするIPFSゲートウェイ、例：`https://ipfs.io`                                         |
| pinata_api_key        | IPFSのための[Pinata](https://www.pinata.cloud/)ピニングサービスのAPIキー                                   |
| pinata_api_secret_key | IPFSのための[Pinata](https://www.pinata.cloud/)ピニングサービスの秘密APIキー                             |

Robonomicsパラチェーンでアカウントを作成するには、当社のウィキにある[次のガイド](https://wiki.robonomics.network/docs/create-account-in-dapp/)をご利用ください。作成するアカウントのタイプに注意してください。SR25519タイプのアカウントはファイルの暗号化を使用できません。

{% roboWikiNote {type: "warning", title: "警告"}%}

  シードフレーズは誰でもアカウントにアクセスできるようにする機密情報です。アカウントを使用してください。GitHubや他の場所に構成ファイルをアップロードしないように注意してください。
{% endroboWikiNote %}

`remote_node_url` フィールドに注意してください。これにより、Robonomicsパラチェーンにどのように接続するかを選択できます。ローカルを含む、Robonomicsのインスタンスをテストや開発のために展開することができます。これについての手順は、[この記事](https://wiki.robonomics.network/docs/run-dev-node/) でご覧いただけます。

手数料なしでトランザクションを送信できるRobonomicsサブスクリプションをお持ちの場合は、`rws_owner_address` フィールドにサブスクリプション所有者のアドレスを挿入してください。アカウントがサブスクリプションに追加されている必要があることを忘れないでください。Robonomicsサブスクリプションをアクティブ化する手順については、2つのガイドでご利用いただけます：[Robonomics dapp](https://wiki.robonomics.network/docs/sub-activate/) を使用したユーザーフレンドリーなインターフェースを介して、または [Robonomics Substrate portal](https://wiki.robonomics.network/docs/get-subscription/) を介して。

`ipfs_gateway` パラメーターを使用すると、IPFSファイルがダウンロードされるゲートウェイを指定できます。これには、[public gateways](https://ipfs.github.io/public-gateway-checker/) や専門のプライベートゲートウェイ（たとえば、Pinataで取得したもの）が含まれます。