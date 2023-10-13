---
title: 责任
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**要将机器人变成经济主体，需要一种合同工具。认识一下责任 - 实现了跨链账户之间的合同的Robonomics托盘！**

<robo-wiki-note type="warning" title="Dev Node">

  请注意，本教程是在Robonomics节点的本地实例上演示的。按照[这些说明](/docs/run-dev-node)设置您自己的节点。

</robo-wiki-note>

## 理论概述

在以太坊上，责任交互有一个相当复杂的结构。您可以在[这里](/docs/robonomics-how-it-works)了解它。如今，在Kusama上的事情要简单一些！

### 谈判

要签订合同，双方首先需要进行谈判。 这可以通过多种方式完成，包括 [IPFS PubSub ](https://blog.ipfs.tech/25-pubsub/) 或 Robonomics PubSub。 [此处](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub) 提供了使用 Robonomics PubSub 的 Python 代码示例。 

供求是包含合同的两个主要特征的消息：**工作描述**和**价格**。每个特定应用程序的消息格式由用户设计。在谈判过程中，遵循严格的格式规则并不重要。可能的流程如下图所示。

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  请注意，PubSub是一种开放协议，因此不应传输任何敏感数据。为此，您应该使用其他协议。

</robo-wiki-note>


### 签名

当谈判成功结束后，双方都需要签署所谓的协议，即签名。 这是一条包含职位描述和价格的消息**以特定格式**，并使用帐户的私钥签名。 
还有一个[Python工具](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability)。
 - 工作描述称为**技术**。这是一个类似启动的32字节长的字符串，可以是编码的IPFS CID。
 - 价格称为**经济学**。这是一个XRT小数 - 维纳。1维纳= 10**-9 XRT。

<robo-wiki-note type="note" title="32 bytes">

  您可以使用[Python库](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes)以正确的方式格式化IPFS CID。
  使用`sign_liability`函数时，无需转换哈希，它将自动完。

</robo-wiki-note>

以下是咖啡的例子：

1. 任务是一个JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. 其IPFS CID为`QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. 因此，**技术**（转换后的CID）为`0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9` 
4. **经济学**为`1.5 XRT`。

签署后，就可以创建责任了！这可以由其中一方（承诺方或承诺方）或所谓的提供者的第三方账户完成。

## 创建责任

### 准备工作

如前所述，该过程涉及至少两方。在这个例子中，我们使用三方，并为此创建一个独立的提供者。假设谈判已经以某种方式进行。

### 1. 创建三个账户并向它们添加资金

<robo-wiki-picture src="liability/balances.jpg" />

在这里，我们为提供者提供了100 XRT来签署责任外部交易，承诺方获得了2 XRT来支付工作费用。
承诺方没有获得任何资金（除了至少1 mXRT的存在性存款）。

### 1. 导航到 Developer -> Extrinsics

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. 从可能的外部因素的下拉列表中选择 liability -> createte

还要选择要提交外部交易的账户。填写所有参数。

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="Signatures">

  由于这里使用了提供者，无需知道参与者的种子。只需要他们的签名。

</robo-wiki-note>

### 3. 提交交易

<robo-wiki-picture src="liability/submit.jpg" />

### 4. 在事件中查看您的责任

为此，请导航到`Network -> Explorer`并在右侧找到事件列表。单击三角形图标展开。

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  可以使用相同的 [Python 工具](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash) 将哈希值转换为 IPFS CID。

</robo-wiki-note>

### 5. 存储探索

您还可以在存储模块`liability`中探索一责任的特征。

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  `Next Index`存储函数显示最新的责任索引+1，因此即使是`1`，也可以探索到责任`0`。

</robo-wiki-note>

## 报告

假设咖啡已经做好了，现在咖啡机需要以某种方式报告。这就是责任报告的作用。作为劳动的证明，账户在完成现有责任时添加另一个IPFS CID作为报告内容。这再次需要承诺方的签名。

<robo-wiki-note type="note" title="Report signature">

  签名的消息包含现有责任指数和以32字节表示的报告IPFS CID。再次，[Python工具](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report)可以帮助签署报告。

</robo-wiki-note>

继续使用咖啡机的例子：

1. 报告是一个JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. 它的IPFS CID`QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. 所以**有效负载**（转换后的CID）是“0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2”
4. **索引**是`0`，它是现有责任指数。

### 1. 导航到extrinsics，liability -> finalize(report)

填写参数并提交外部。 同样，这可以通过第三方帐户来完成。

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  请注意，承诺人账户不应该是"dead" - 它应该至少有1 mXRT的存在性存款。

</robo-wiki-note>

签署并提交报告。完成后，您可以在事件中探索它。

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. 探索报告

您还可以在存储中观察报告。转到`Developer -> Storage`并从下拉列表中选择`liability`。

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. 检查余额

图片显示现在承诺人已经得到了"工资"。经济关系发生了！

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Verifying">

  目前还没有办法验证工作是否完成，因此一旦承诺人报告，代币将转移到其账户。 
  验证功能将在将来添加。

</robo-wiki-note>