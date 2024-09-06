---
title: Оn-chain Government Experiment

---

現在、Polkadotは世界最大のDAOの1つです！オンチェーンガバナンス実験の一環として、エコシステムで多くの興味深いイベントが開催されています。
Robonomicsの開発者は、ハッカソン参加者が、投票、新しい財務要求、エポックの変更など、典型的なスマートホームシステムに関連するイベントを統合することで、Polkadotコミュニティへの浸透レベルを高めることを提案しています。


---

この記事では、Polkadotエコシステム内のイベントの結果として、Robonomics Cloudを介したスマートホーム管理について議論します。以下は、Polkadotネットワークに新しい提案が提出されるとランプが点灯する例です。

{% roboWikiVideo {videos:[{src: 'QmWARwfH8WSEjnWUEFSDn28ya8Xp93qyjmSdGkdkwFntWe', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## 必要条件

- Robonomics統合済みのHome Assistantインスタンスがインストールされていること。インストール方法は[こちら](/docs/install-smart-home)で見つけることができます。
- インタラクション用のPolkadotノードまたはゲートウェイ。例 - `wss://polkadot.api.onfinality.io`
- Robonomicsノードまたはゲートウェイが必要です。
- ED25519形式のアカウントが作成されていること。詳細は[こちら](/docs/sub-activate)で確認できます。
- Robonomicsサブスクリプションのデバイスリストにアカウントが作成されていること。詳細は[こちら](/docs/add-user)で確認できます。
- サブスクリプション所有者およびコントローラーアドレス。

Pythonライブラリ:
- [substrate-interface](https://pypi.org/project/substrate-interface/)
- [IPFS-Toolkit](https://pypi.org/project/IPFS-Toolkit/)
- [robonomics-interface](https://pypi.org/project/robonomics-interface/)

## Polkadotリスナーの作成

まず、Polkadotネットワーク内の新しいイベントを監視するスクリプトを作成する必要があります。この例では、新しいリファレンダムの作成を追跡します。

テストの便宜上、開発モードのローカルPolkadotノードが使用されました。デプロイメントの手順は[こちら](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot#hacking-on-polkadot)で見つけることができます。

公開ノードに接続するには、"POLKAD"を変更してください。"OT_GATEWAY"変数。

コード例:


{% codeHelper {copy: true}%}

```python
from substrateinterface import SubstrateInterface

POLKADOT_GATEWAY = "ws://127.0.0.1:9944"

substrate = SubstrateInterface(
    url=POLKADOT_GATEWAY
)

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Referenda count start:', data.value)
    if update_nr > 0:
        print('Referenda count increased:', data.value)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

このスクリプトは、現在のリファレンダム番号の変更を監視し、最新のリファレンダム番号を表示します。

### テスト

プログラムを実行し、[polkadot.js](https://polkadot.js.org/apps/#/explorer)を開きます。
ローカル開発ノードに切り替えるには、左上のアイコンをクリックしてサイドバーメニューを表示します。 "Development"と"Local Node"を選択し、"Switch"をクリックします。

{% roboWikiPicture {src:"docs/gov-exp/polka_sidemenu.png", alt:"polka_sidemenu"} %}{% endroboWikiPicture %}

ローカルノードに切り替わります。 "Governance" -> "Preimages"タブに移動します。

{% roboWikiPicture {src:"docs/gov-exp/preimage.png", alt:"preimage"} %}{% endroboWikiPicture %}

新しいプリイメージを作成します。ネットワークにコメントを残しましょう。署名してネットワークに送信します。

{% roboWikiPicture {src:"docs/gov-exp/remark.png", alt:"remark"} %}{% endroboWikiPicture %}

そのハッシュが表示されます。それをコピーして、"Governance" -> "Referenda"タブに移動します。 "Submit Proposal"を行います。これはテストネットワークなので、ほとんどの設定可能なフィールドはデフォルトのままにしておくことができます。プリイメージのハッシュを貼り付け、提案に署名します。


{% roboWikiPicture {src:"docs/gov-exp/proposal.png", alt:"proposal"} %}{% endroboWikiPicture %}

ネットワークに送信した後、プログラムは新しい提案を検出し、次のログを出力します:

```
Referenda count start: 0
Referenda count increased: 1## スマートホームへの接続

新しい提案を作成した後、スマートホームとのやり取りを追加する必要があります。

そのためには、以下の情報が必要です:
- サービスのドメイン
- サービス名
- ターゲットエンティティ
- データ - タイプは "dict" である必要があります

これらの情報をどこで見つけるかを見てみましょう。インストールされたHome Assistantインスタンスを開きます。"開発者ツール -> サービス"に移動し、任意のサービスを選択してYAMLモードに切り替えます。スイッチの例を考えてみましょう。

{% roboWikiPicture {src:"docs/gov-exp/service.png", alt:"services"} %}{% endroboWikiPicture %}

"service"キーにはサービスのドメインと名前が含まれています。ドットの前がドメインで、ドットの後がサービス名です。データフィールドも必要です。

ターゲットエンティティを見つけるには、"設定 -> デバイスとサービス -> エンティティ"に移動します。"エンティティID"という列があります - これが必要なターゲットエンティティパラメータです。

これですべてのパラメータがわかったので、スクリプトで何が起こるかを見てみましょう。

スクリプトはローカルIPFSデーモンに接続します。（スマートホームのセットアップ手順に従っていれば、すでにIPFSデーモンが実行されています。）

まず、JSON形式でコマンドを形成します。次に、メッセージはユーザーとコントローラーのキーで暗号化されます。
その後、暗号化されたコマンドはファイルに保存され、IPFSに追加されます。その後、結果のIPFSハッシュがコントローラーのアドレスに対してRobonomicsパラチェーンに `Launch` エクストリンシックを介して送信されます。
コントローラーが起動を受信すると、IPFSからファイルをダウンロードし、それを復号化して指定されたサービスを呼び出します。

完全なコードは以下の通りです:

{% codeHelper { copy: true}%}

```python
import os
import json
import ipfshttpclient2
from substrateinterface import SubstrateInterface
from robonomicsinterface import Account, Launch
from substrateinterface import Keypair, KeypairType
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes, web_3_auth

# polkadot part
POLKADOT_GATEWAY = "<POLKADOT_GATEWAY>" # ws://127.0.0.1:9944
substrate = SubstrateInterface(url=POLKADOT_GATEWAY)

# Robonomics part

# Robonomics credentials
# User address must be inRWS デバイス
# ユーザーアドレスは ED25519 である必要があります
user_seed = "<SEED_PHRASE>"
controller_address = "<CONTROLLER_ADDRESS>"
sub_owner_address = "<OWNER_ADDRESS>"

# コマンド
service_domain = "<DOMAIN>"  # ドメインはサービス名のドットの前にあるものです。例: "switch"
service_name = "<NAME>"  # 名前 - サービス名のドットの後にあるものです。例: "turn_on"
target_entity = "<ENTITY_ID>"  # エンティティID。例: "switch.boiler"
data = {}  # 辞書である必要があります


def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('リファレンダ数の開始:', data.value)

    if update_nr > 0:
        print('リファレンダ数が増加:', data.value)
        # IPFS ハッシュを使用してコントローラーアドレスに起動を送信
        launch = Launch(sender, rws_sub_owner=sub_owner_address)
        res = launch.launch(controller_address, result_ipfs)
        print(f"トランザクション結果: {res}")

def encrypt_message(
        message, sender_keypair: Keypair, recipient_public_key: bytes
) -> str:
    """
    送信者の秘密鍵と受信者の公開鍵でメッセージを暗号化します
    :param message: 暗号化するメッセージ
    :param sender_keypair: 送信者アカウントの Keypair
    :param recipient_public_key: 受信者の公開鍵
    :return: 暗号化されたメッセージ
    """
    encrypted = sender_keypair.encrypt_message(message, recipient_public_key)
    return f"0x{encrypted.hex()}"

# 起動メッセージのフォーマット
data['entity_id'] = target_entity
command = {'platform': service_domain, 'name': service_name, 'params': data}

message = json.dumps(command)
print(f"メッセージ: {message}")
sender = Account(user_seed, crypto_type=KeypairType.ED25519)

# コマンドを暗号化
recipient = Keypair(
    ss58_address=controller_address, crypto_type=KeypairType.ED25519
)
message = encrypt_message(message, sender.keypair, recipient.public_key)
print(f"暗号化されたメッセージ: {message}")
filename = "temporal_file"
with open(filename, "w") as f:
    f.write(message)
with ipfshttpclient2.connect() as client:
    result = client.add(filename, pin=False)```python
result_ipfs  = result["Hash"]
    print(f"IPFS ハッシュ: {result_ipfs}")
    print(f"起動用の IPFS ハッシュ {ipfs_qm_hash_to_32_bytes(result_ipfs)}")

os.remove(filename)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

正しくすべてを行った場合、以下のログが表示されます:
```
Message: {"platform": "switch", "name": "turn_on", "params": {"entity_id": "switch.boiler"}}
Ecrypted message: 0x33356b915e51e4c050180db0c3e39de86e946b6807ea83114978c848d016ab34a812e271dd1e5b40aa8632edd5acf4254090d2c2849daafcc46d2d4a4406a169a04edb4a668a268b3265e96ded0411398e3520fd5b676109752d24f12a7ece976bdc58da6a5b95d3c9e77aa59270bbc86c66c2ffe69ef7b10fae20
IPFS ハッシュ: QmcrqSD3bBYmm4rpaDMUVNQwF8CSi5WWVnwPtuGJdzgWpK
起動用の IPFS ハッシュ 0xd7bf2b46baebf5556ac30fda97d7bf34a71558acdafde694c849521d01ccd8b4
Referenda count start: 0
Referenda count increased: 1
Transaction result: 0xe07d43462d540a7312763349b362318c427ca9a61e7d5bfa3c890e8b1c0294c1
```