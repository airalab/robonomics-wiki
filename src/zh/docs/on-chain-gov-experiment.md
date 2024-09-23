---
title: Оn-chain Government Experiment

---

目前，Polkadot是世界上最大的DAO之一！作为链上治理实验的一部分，生态系统中正在发生许多有趣的事件。Robonomics开发人员建议黑客马拉松参与者通过将与投票、新财政请求、时代变化等事件相关的活动整合到典型的智能家居系统中，提高Polkadot社区的融入度。

---

本文讨论了通过Robonomics Cloud对Polkadot生态系统中的任何事件进行智能家居管理。以下是一个示例，当Polkadot网络提交新的公投时，灯可以被打开。

{% roboWikiVideo {videos:[{src: 'QmWARwfH8WSEjnWUEFSDn28ya8Xp93qyjmSdGkdkwFntWe', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## 需求

- 安装了带有Robonomics集成的Home Assistant实例。安装方法可以在[这里](/docs/install-smart-home)找到。
- 用于交互的Polkadot节点或网关。例如 - `wss://polkadot.api.onfinality.io`
- 用于交互的Robonomics节点或网关。
- 以ED25519格式创建的帐户。有关信息，请参阅[这里](/docs/sub-activate)。
- 在Robonomics订阅的设备列表中创建了帐户。了解更多信息，请参阅[这里](/docs/add-user)。
- 订阅所有者和控制器地址。

Python库：
- [substrate-interface](https://pypi.org/project/substrate-interface/)
- [IPFS-Toolkit](https://pypi.org/project/IPFS-Toolkit/)
- [robonomics-interface](https://pypi.org/project/robonomics-interface/)

## 创建Polkadot监听器

首先，您需要创建一个脚本，用于监听Polkadot网络中的新事件。在示例中，我们将跟踪新公投的创建。

为了方便测试，使用了本地处于开发模式的Polkadot节点。您可以在[此处找到部署手册](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot#hacking-on-polkadot)。

要连接到公共节点，请更改“POLKAD”"OT_GATEWAY"变量。

示例代码：

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

此脚本将监听当前公投编号的变化，并显示最新公投的编号。

### 测试

运行程序并打开[polkadot.js](https://polkadot.js.org/apps/#/explorer)。
要切换到本地开发节点，请单击左上角的图标，将显示侧边栏菜单。选择底部的“Development”和“Local Node”，然后单击“Switch”。

{% roboWikiPicture {src:"docs/gov-exp/polka_sidemenu.png", alt:"polka_sidemenu"} %}{% endroboWikiPicture %}

您将切换到本地节点。转到“Governance” -> “Preimages”选项卡。

{% roboWikiPicture {src:"docs/gov-exp/preimage.png", alt:"preimage"} %}{% endroboWikiPicture %}

创建一个新的预映像。让我们在网络中留下一条备注。签名并将其发送到网络。

{% roboWikiPicture {src:"docs/gov-exp/remark.png", alt:"remark"} %}{% endroboWikiPicture %}

您将收到其哈希值。复制它并转到“Governance” -> “Referenda”选项卡。执行“提交提案”。由于这是一个测试网络，大多数可配置字段可以保持默认设置。粘贴预映像哈希并签署提案。

{% roboWikiPicture {src:"docs/gov-exp/proposal.png", alt:"proposal"} %}{% endroboWikiPicture %}

将其发送到网络后，程序将检测到新提案并输出以下日志：

```
Referenda count start: 0
Referenda count increased: 1## 连接到智能家居

现在，在创建新提案后，我们需要与智能家居进行交互。

为此，我们需要了解以下内容：
- 服务域
- 服务名称
- 目标实体
- 数据 - 应为类型“dict”

让我们看看如何找到它们。打开已安装的Home Assistant实例。转到“开发人员工具 -> 服务”，选择任何服务并切换到YAML模式。让我们以开关为例。

{% roboWikiPicture {src:"docs/gov-exp/service.png", alt:"services"} %}{% endroboWikiPicture %}

“service”键包含服务域和名称。点之前的所有内容是域，点之后的所有内容是服务名称。还需要数据字段。

要找到目标实体，请转到“设置 -> 设备和服务 -> 实体”。将有一列带有“实体ID”的列 - 这是所需的目标实体参数。

现在我们知道了所有参数，让我们看看脚本中会发生什么。

脚本将连接到本地IPFS守护程序。（如果您遵循了智能家居设置说明，您已经运行了IPFS守护程序。）

首先，我们将以JSON格式形成一个命令。接下来，消息将使用用户和控制器的密钥加密。
然后，加密的命令将保存到文件并添加到IPFS。之后，将生成的IPFS哈希通过外部`Launch`发送到Robonomics平行链，发送到控制器的地址。
当控制器接收到启动时，它将从IPFS下载文件，解密文件，并调用内部指定的服务。

完整代码如下：

{% codeHelper { copy: true}%}

```python
import os
import json
import ipfshttpclient2
from substrateinterface import SubstrateInterface
from robonomicsinterface import Account, Launch
from substrateinterface import Keypair, KeypairType
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes, web_3_auth

# polkadot部分
POLKADOT_GATEWAY = "<POLKADOT_GATEWAY>" # ws://127.0.0.1:9944
substrate = SubstrateInterface(url=POLKADOT_GATEWAY)

# Robonomics部分

# Robonomics凭证
# 用户地址必须在RWS设备
# 用户地址必须是ED25519
user_seed = "<SEED_PHRASE>"
controller_address = "<CONTROLLER_ADDRESS>"
sub_owner_address = "<OWNER_ADDRESS>"

# 命令
service_domain = "<DOMAIN>"  # 域是服务名称中点之前的部分。例如，“switch”
service_name = "<NAME>"  # 名称 - 是服务名称中点之后的部分。例如，“turn_on”
target_entity = "<ENTITY_ID>"  # 实体ID。例如，“switch.boiler”
data = {}  # 必须是字典


def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Referenda count start:', data.value)

    if update_nr > 0:
        print('Referenda count increased:', data.value)
        # 向控制器地址发送启动指令和IPFS哈希
        launch = Launch(sender, rws_sub_owner=sub_owner_address)
        res = launch.launch(controller_address, result_ipfs)
        print(f"交易结果: {res}")

def encrypt_message(
        message, sender_keypair: Keypair, recipient_public_key: bytes
) -> str:
    """
    使用发送者私钥和接收者公钥加密消息
    :param message: 要加密的消息
    :param sender_keypair: 发送者账户Keypair
    :param recipient_public_key: 接收者公钥
    :return: 加密后的消息
    """
    encrypted = sender_keypair.encrypt_message(message, recipient_public_key)
    return f"0x{encrypted.hex()}"


# 格式化启动消息
data['entity_id'] = target_entity
command = {'platform': service_domain, 'name': service_name, 'params': data}

message = json.dumps(command)
print(f"消息: {message}")
sender = Account(user_seed, crypto_type=KeypairType.ED25519)

# 加密命令
recipient = Keypair(
    ss58_address=controller_address, crypto_type=KeypairType.ED25519
)
message = encrypt_message(message, sender.keypair, recipient.public_key)
print(f"加密消息: {message}")
filename = "temporal_file"
with open(filename, "w") as f:
    f.write(message)
with ipfshttpclient2.connect() as client:
    result = client.add(filename, pin=False)```python
result_ipfs  = result["Hash"]
    print(f"IPFS哈希: {result_ipfs}")
    print(f"启动的IPFS哈希 {ipfs_qm_hash_to_32_bytes(result_ipfs)}")

os.remove(filename)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

如果一切正确，您将看到以下日志：
```
消息: {"platform": "switch", "name": "turn_on", "params": {"entity_id": "switch.boiler"}}
加密消息: 0x33356b915e51e4c050180db0c3e39de86e946b6807ea83114978c848d016ab34a812e271dd1e5b40aa8632edd5acf4254090d2c2849daafcc46d2d4a4406a169a04edb4a668a268b3265e96ded0411398e3520fd5b676109752d24f12a7ece976bdc58da6a5b95d3c9e77aa59270bbc86c66c2ffe69ef7b10fae20
IPFS哈希: QmcrqSD3bBYmm4rpaDMUVNQwF8CSi5WWVnwPtuGJdzgWpK
启动的IPFS哈希 0xd7bf2b46baebf5556ac30fda97d7bf34a71558acdafde694c849521d01ccd8b4
公投计数开始: 0
公投计数增加: 1
交易结果: 0xe07d43462d540a7312763349b362318c427ca9a61e7d5bfa3c890e8b1c0294c1
```