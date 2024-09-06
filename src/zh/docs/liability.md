---
title: 责任
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**要将机器人转变为经济主体，需要一种合同工具。认识一下责任 - Robonomics托盘，实现了平行链账户之间的合同！**

{% roboWikiNote {title:"开发节点", type: "warning"}%} 请注意，本教程是在Robonomics节点的本地实例上演示的。请按照[这些说明](/docs/run-dev-node)设置您自己的节点。
{% endroboWikiNote %}

## 理论概述

在以太坊时代，责任互动结构相当复杂。您可以在[这里](/docs/robonomics-how-it-works)了解更多。如今，在Kusama上，情况变得简单了一些！

### 协商

要签署合同，双方需要先进行协商。这可以通过多种方式完成，包括[IPFS PubSub](https://blog.ipfs.tech/25-pubsub/)或Robonomics PubSub。使用Robonomics PubSub的Python代码示例在[这里](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub)。

提供和需求是包含合同的两个主要特征的消息：**工作描述**和**价格**。每个特定应用程序的消息格式由用户设计。在协商过程中遵循严格的格式规则并不重要。下图展示了可能的流程。

{% roboWikiPicture {src:"docs/liability/negotiations.jpg", alt:"negotiations"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"PubSub", type: "warning"}%} 请注意，PubSub是一个开放协议，因此不应传输敏感数据。为此，您应该使用其他协议。
{% endroboWikiNote %}

### 签名

当协商成功结束后，每一方都需要签署所谓的协议，即签名。这是一个包含工作描述和价格的消息，**以特定格式**签名，使用账户的私钥。也有一个[Python工具](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability)可供使用。
 - 工作描述称为**技术**。这是一个类似于32字节长的字符串，可以是编码的IPFS CID。
 - 价格称为**经济**。这是一个XRT小数 - Weiner。1 Weiner = 10**-9 XRT。

{% roboWikiNote {title:"32字节", type: "note"}%} 可以使用[IPFS](https://ipfs.tech/) CID的Python库以正确的方式格式化获得。在使用`sign_liability`函数时，无需转换哈希，它将自动完成。{% endroboWikiNote %}

继续咖啡的例子：

1. 任务是一个JSON
```json
{"task": "make_espresso", "description": "制作一杯浓缩咖啡"}
```
2. 其IPFS CID为`QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. 因此**技术**（转换后的CID）为`0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`
4. **经济**为`1.5 XRT`。

签署后，就可以创建责任了！这可以由一方（承诺方或许诺方）或所谓的提供者的第三方账户完成。

## 创建责任

### 准备工作

如前所述，至少需要两方参与该过程。在这个例子中，让我们使用三方，并为此创建一个独立的提供者。假设协商已经以某种方式进行。

### 1. 创建三个账户并向其添加资金

{% roboWikiPicture {src:"docs/liability/balances.jpg", alt:"balances"} %}{% endroboWikiPicture %}

在这里，我们为提供者提供了100 XRT以签署责任外部交易，承诺方获得了2 XRT以支付工作报酬。除了至少1 mXRT的存在性存款外，许诺方没有获得任何资金。

### 1. 转到开发者 -> 外部交易

{% roboWikiPicture {src:"docs/liability/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. 从可能的外部交易下拉列表中选择责任 -> 创建

还要选择要提交外部交易的账户。填写所有参数。

{% roboWikiPicture {src:"docs/liability/create.jpg", alt:"create"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"签名", type: "note"}%} 由于这里使用了提供者，无需知道参与者的种子。只需要他们的签名。{% endroboWikiNote %}

### 3. 提交交易

{% roboWikiPicture {src:"docs/liability/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

### 4. 在事件中查看您的责任

为此，请转到`网络 -> 浏览器`，找到右侧的事件列表。单击三角形图标展开。

{% roboWikiPicture {src:"docs/liability/new-liability.jpg", alt:"new-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"哈希", type: "note"}%} 可以使用相同的[Python工具](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash)将哈希转换为IPFS CID。{% endroboWikiNote %}

### 5. 探索存储

您还可以在存储模块`liability`中探索责任的一些特征。

{% roboWikiPicture {src:"docs/liability/storage-liability.jpg", alt:"storage-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"下一个索引", type: "note"}%} `Next Index`存储函数显示最新的责任索引+1，因此即使是`1`，也可以探索到责任`0`。{% endroboWikiNote %}

## 报告

假设咖啡已经做好了，现在咖啡机需要以某种方式报告。这就是责任报告出现的场景。作为劳动证明，账户在完成现有责任时添加另一个IPFS CID作为报告内容。这再次需要许诺方的签名。

{% roboWikiNote {title:"报告签名", type: "note"}%} 签署的消息包含现有责任索引和以32字节表示的报告IPFS CID。再次，[Python工具](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report)可以帮助签署报告。{% endroboWikiNote %}

继续咖啡机的例子：

1. 报告是一个JSON
```json
{"report": "咖啡已制作！执行时间 - 80秒。"}
```
2. 其IPFS CID为`QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. 因此**有效载荷**（转换后的CID）为`0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. **索引**为`0`，这是现有责任索引。

### 1. 转到外部交易，责任 -> 完成（报告）

填写参数并提交外部交易。同样，这可以由第三方账户完成。

{% roboWikiPicture {src:"docs/liability/report.jpg", alt:"report"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"存在性存款", type: "warning"}%} 请注意，许诺方账户不应该是“死的” - 它应该有至少1 mXRT的存在性存款。{% endroboWikiNote %}

签署并提交报告。完成后，您可以在事件中查看它。

{% roboWikiPicture {src:"docs/liability/new-report.jpg", alt:"new-report"} %}{% endroboWikiPicture %}

### 2. 探索报告

您还可以在存储中观察报告。转到`开发者 -> 存储`，并从下拉列表中选择`liability`。

{% roboWikiPicture {src:"docs/liability/storage-report.jpg", alt:"storage-report"} %}{% endroboWikiPicture %}

### 3. 检查余额

从图片中可以看到，现在承诺人已经获得了"工资"。经济关系已经发生！

{% roboWikiPicture {src:"docs/liability/balances-2.jpg", alt:"balances-2"} %} {% endroboWikiPicture %}

{% roboWikiNote {title:"验证", type: "note"}%} 目前还没有办法验证工作是否已完成，因此一旦承诺人报告，令牌就会转移到其账户。
验证功能将在未来添加。
{% endroboWikiNote %}