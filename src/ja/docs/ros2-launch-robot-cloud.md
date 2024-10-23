---
title: クラウドからロボットを起動
contributors: [Fingerling42]
tools:   
  - Robonomics ROS 2 Wrapper 3.1.0
    https://github.com/airalab/robonomics-ros2/releases
---

**この記事では、さまざまな例を通じてROS 2でRobonomicsの起動機能を使用する方法を学びます**

デバイスにコマンドを送信するRobonomicsパラチェーンの主要な機能は、起動外的です。この機能を使用すると、パラチェーン内の指定されたアドレスにパラメータ（32バイトの長い16進数値の形式で）を含む文字列を送信できます。通常、文字列は、コマンドを実行するために必要なパラメータを持つファイルを指すIPFSハッシュを表します。起動機能の詳細については、[この記事](https://wiki.robonomics.network/docs/launch/)を参照してください。

Robonomics ROS 2 Wrapperでは、起動機能はコマンドを送信するためのサービスとコマンドを受信するためのトピックとして実装されています。

## 起動の送信

`robonomics/send_launch`と呼ばれるサービスは、次のように見えます:

{% codeHelper { additionalLine: "RobonomicsROS2SendLaunch.srv"}%}

```YAML
string  param                   # アップロードするIPFSに必要なパラメータを持つパラメータ文字列またはファイル名
string  target_address          # 起動をトリガーするアドレス
bool    is_file         True    # 起動パラメータですファイルをIPFSにアップロードする必要があるか（デフォルトはTrueですか）？
bool    encrypt_status  True    # パラメータファイルを指定されたアドレスで暗号化する必要があるかを確認します。デフォルトはTrueです
---
string  launch_hash             # ランチトランザクションのハッシュ
```

{% endcodeHelper %}

このサービスは、リクエストの一部として次のパラメータを受け入れます：コマンドパラメータ（単純な文字列またはコマンドパラメータを含むファイルの名前）、Robonomicsパラチェーン内のターゲットアドレス、および2つのフラグ：1つはパラメータがファイルであるかどうかを示し、もう1つはファイルを暗号化するかどうかを指定します（両方ともデフォルトでtrueに設定されています）。ファイルはIPFSにアップロードされ、そのハッシュがランチパラメータとして渡されます。したがって、ファイルは`robonomics_ros2_pubsub`ノードの構成ファイルで指定されたIPFSファイル用のディレクトリに配置する必要があります。

デフォルトでは、ファイルはランチの受信者の公開アドレスを使用して暗号化されます。適用される暗号化メソッドは、Curve25519楕円曲線暗号に基づく公開鍵暗号化です。現在の実装では、暗号化はED25519（エドワーズ）タイプのアカウントアドレスのみサポートされています（これについては[この記事](http://localhost:8080/docs/create-account-in-dapp/#22-create-account)で詳しく読むことができます）。

ランチを送信した後、サービスはトランザクションハッシュを返します。

## ランチの受信

受信launchesは、対応するトピックの形式で構成されています。技術的には、ノードはrobonomics-interface機能を利用して自身のアドレスの状態にサブスクライブし、`NewLaunch`イベントが現れるのを待ちます。イベントが発生すると、ノードは`robonomics/received_launch`トピックにメッセージを公開します。メッセージの形式は以下の通りです：

{% codeHelper { additionalLine: "RobonomicsROS2ReceivedLaunch.msg"}%}

```YAML
string  launch_sender_address   # ランチコマンドを送信したアカウントのアドレス
string  param                   # パラメータまたはパラメータが含まれたファイルの名前を持つ文字列
```

{% endcodeHelper %}

メッセージフィールドには、ランチが送信されたアドレスとパラメータ自体が含まれます。単純な文字列またはIPFSからダウンロードされ、IPFS作業ディレクトリに配置されたパラメータを持つファイルの名前です。ファイルが暗号化されている場合、このプロセス中に復号化されます。


## Turtlesimを使用した例

次に、[Turtlesim](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html)を例として使用したlaunch機能の使用方法を示します。Turtlesimは、ROS 2を学ぶために設計された軽量シミュレータです。次のコマンドを使用してインストールできます：

{% codeHelper { copy: true}%}

```shell
sudo apt install ros-$ROS_DISTRO-turtlesim
```

{% endcodeHelper %}

Robonomics ROS 2 Wrapperパッケージには、Turtlesim用に特別に適応された`turtlesim_robonomics`という事前構築されたパッケージが含まれています。このパッケージを使用すると、ラッパーのすべての機能をテストできます。試してみて、実行してみましょう。

{% roboWikiNote {type: "warning", title: "警告"}%}

  取引を行うためには、アカウントに十分な残高があるか、アクティブなサブスクリプションがあることを確認してください。

{% endroboWikiNote %}

1. まず、`config/robonomics_pubsub_params_template.yaml`テンプレートを使用して、`turtlesim_robonomics`のpubsubインスタンスのための構成ファイルを作成します。 Robonomicsの資格情報（アカウントシード、暗号タイプ、サブスクリプション所有者のアドレス）を適切なフィールドに入力します。また、IPFSファイルのディレクトリを指定します。完了したら、ファイル名を変更してください。例えば、`first_pubsub_params.yaml`とします。

2. IPFSデーモンを起動します：

{% codeHelper { copy: true}%}

```shell
ipfs daemon
```

{% endcodeHelper %}

3. 以下のROS 2のlaunchファイルを実行します。これにより、Turtlesim自体、Turtlesim用のラッパー実装、およびRobonomics pubsubがすべて必要なノードを起動します：

{% codeHelper { copy: true}%}

```shell
ros2 launch turtlesim_robonomics turtlesim_robonomics_launch.py pubsub_params_path:=./first_pubsub_params
```.yaml ネームスペース：='turtlesim1'
```

{% endcodeHelper %}

タートルとともにシミュレータが表示され、コンソールにはIPFS ID、IPFSファイルが保存されているディレクトリへのパス、Robonomicsアドレス、その他関連情報が表示されます。

### PolkadotポータルからTurtlesimを起動する

1. Turtlesimは`/cmd_vel`トピックを介して制御されるため、対応するメッセージを準備し、それらをファイルに含めて起動パラメータとして使用する必要があります。便宜上、これらのメッセージはJSONファイルに準備されています。ファイル（たとえば、`turtle_cmd_vel.json`）を作成し、以下を貼り付けます：

  {% codeHelper { copy: true}%}

  ```json
  [
    {
       "linear": {
          "x": 5.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 1.5
       }
    },
    {
       "linear": {
          "x": 2.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 2.5
       }
```    }
  ]
  ```

  {% endcodeHelper %}

  このJSONの例では、亀に2回移動するように命令します。

2. 次に、ファイルをIPFSにアップロードする必要があります。方法は何でも選択できますが、この例ではIPFS Kuboを使用します。JSONファイルがあるディレクトリでターミナルを開き、次のコマンドを使用してIPFSにアップロードします：

  {% codeHelper { copy: true}%}

  ```shell
  ipfs add turtle_cmd_vel.json
  ```

  {% endcodeHelper %}

  ファイルのIPFSハッシュが表示されます。後で使用するために保存しておいてください。

3. ローンチを送信する前に、IPFSハッシュを32バイトの長さの文字列に変換する必要があります。これはいくつかのPythonコマンドを使用して行うことができます。ターミナルを開き、Python 3インタプリタを起動し、次のコマンドを実行します：

  {% codeHelper { copy: true}%}

  ```python
  from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes
  ipfs_qm_hash_to_32_bytes('IPFS_FILE_HASH')
  ```

  {% endcodeHelper %}

  後で使用するために生成された文字列を保存してください。

4. Robonomics [Polkadot/Substrate portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/extrinsics) を開き、ナビゲートします。**開発者**→**エクストリンシックス**タブに移動します。エクストリンシックス`launch`→`launch(robot, param)`を選択します。`robot`フィールドには、ロボットのアドレスを挿入し、`param`フィールドには変換されたIPFSハッシュを含む文字列を挿入します。トランザクションを送信します。


5. Turtlesimシミュレータに移動します。トランザクションを正常に送信した後、亀は移動を開始するはずです。


### ROS 2コマンドラインツールからTurtlesimを起動

1. 他のROS 2パブサブノードからTurtlesimに起動を送信してみましょう。まず、異なるRobonomicsの資格情報と別のIPFSディレクトリを持つ別の構成ファイル（例：`second_pubsub_params.yaml`）を作成します。

2. 別のターミナルで、新しい構成ファイルを使用して`robonomics_ros2_pubsub`ノードを実行します：

  {% codeHelper { copy: true}%}

  ```shell
  ros2 run robonomics_ros2_pubsub robonomics_ros2_pubsub --ros-args -r __ns:=/test -p pubsub_params_path:=./second_pubsub_params.yaml
  ```

  {% endcodeHelper %}

3. 新しいパブサブのIPFSディレクトリにTurtlesimのコマンドを含むJSONファイル（`turtle_cmd_vel.json`）を配置します。

4. ランチを送信する前に、`turtlesim_robonomics`がどのように受信するかを観察するためのモニタリングを設定しましょう。データが到着したことを確認するために、対応するトピックにサブスクライブするために別のターミナルで次のコマンドを実行します：

{% codeHelper { copy: true}%}

```shell
ros2 topic echo /turtlesim1/robonomics/received_launch
```

{% endcodeHelper %}

{% roboWikiNote {type: "warning", title: "Launch Param as String"}%}
デフォルトでは、起動ハンドラはファイルのIPFSハッシュをパラメータとして期待しています。パブサブがパラメータを通常の文字列として処理する必要がある場合は、対応するROS 2ノードパラメータ `launch_is_ipfs` を `True` から `False` に変更する必要があります。これは `ros2 param set` コマンドを使用して行います。
{% endroboWikiNote %}

5. ROS 2サービスを呼び出して起動を送信する必要があります。別のターミナルで次のコマンドを使用します：

{% codeHelper { copy: true}%}

```shell
ros2 service call /test/robonomics/send_launch robonomics_ros2_interfaces/srv/RobonomicsROS2SendLaunch {"param: 'turtle_cmd_vel.json', target_address: 'YOUR_TURTLESIM_ADDRESS'"}
```

{% endcodeHelper %}

起動の提出の詳細が表示されるパブサブログが表示されます。

6.Turtlesimシミュレータに移動します。トランザクションの送信が成功した後、亀は動き始めるはずです。

### 他のノードからTurtlesimを起動

1. さて、到着を待ち、それをTurtlesimに転送するテストノードを作成してみましょう。準備が整ったテストパッケージ `test_robot_robonomics` を使用できます。このパッケージをROS 2のワークスペースにコピーします。

2. 任意のテキストエディタで `test_robot_robonomics/test_robot_robonomics/test_robot_robonomics_node.py` にあるノードファイルを開き、`__init__` 関数の後に以下のコードを追加します:

  {% codeHelper { copy: true}%}

   ```python
   def launch_file_subscriber_callback(self, msg) -> None:
       super().launch_file_subscriber_callback(msg)

       transaction_hash = self.send_launch_request(self.param, target_address='YOUR_TURTLESIM_ADDRESS', is_file=True, encrypt_status=True)

       self.get_logger().info('Sent launch to the turtle with hash: %s ' % str(transaction_hash))
   ```

   {% endcodeHelper %}

   この関数は、まず受信した起動を処理し、そのパラメータを使用して新しい起動をTurtlesimに送信します。

3. `colcon` を使用してパッケージをビルドし、そのセットアップファイルをソースにします。

4. テストパッケージのROS 2の起動ファイルを、2番目のパブサブ資格情報を使用して実行します:

  {% codeHelper { copy: true}%}
  
  ```shell
  ros2 launch test_robot_robonomics test_robot_robonomics_launch.py pubsub_params_path:=./second_pubsub_params.yaml namespace:='test'
  ```

  {% endcodeHelper %}

5. 今、例えばPolkadot/Substrateポータルを介して、`turtle_cmd_vel.json`パラメータを持つランチをテストノードのアドレスに送信します。 これを行う前に、Turtlesimがまだ実行されていることを確認してください。 テストノードはランチを受信し、同じパラメータで新しいランチを送信し、Turtlesimの亀が動き始めるはずです。
