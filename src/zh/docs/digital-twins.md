---
title: 数字孪生
contributors: [nakata5321, PaTara43]

tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---

**想象一下拥有一个复杂的设备或系统，它有几个模块需要维护，并且需要几个账户来使用。为了将它们集中在一个地方或者使用不同的账户对某些功能进行编码，或者例如为不同的信息流设置不同的数据日志来源，需要使用数字孪生模块。**

{% roboWikiNote {title:"开发节点", type: "warning"}%} 请注意，这些以及以下的教程是在 Robonomics 节点的本地实例上演示的。请按照[这些说明](/docs/run-dev-node)设置您自己的节点。
{% endroboWikiNote %}

## 理论概述
任何账户都可以创建和管理数字孪生。孪生可以想象成一个带有以下内容的表格：

| 数字孪生 ID  | 主题名称 	| 来源    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


其中：
* **数字孪生 ID** 是无符号整数唯一的数字孪生索引。
* **主题名称** 是一个长度为32字节的十六进制 `H256` 或 ASCII 数据，与 [`Launch`](/docs/launch) extrinsic 参数相同。
例如：`0x1234....FF` 或 `hello.parachain.robonomics.world`。
* **来源** - 是某个账户地址。

{% roboWikiNote {title:"主题", type: "note"}%} 正如之前在 Launch extrinsic 概述中讨论过的，`H256` 可以表示为编码的 IPFS CID（参见[Python 工具](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes)）。
因此，主题也可以用作一些数据存储，比如，一个孪生的模块描述。{% endroboWikiNote %}

## 创建数字孪生

### 1. 转到开发者 -> Extrinsics

{% roboWikiPicture {src:"docs/digital-twin/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. 从可能的 extrinsics 下拉列表中选择 digitalTwin -> create

{% roboWikiPicture {src:"docs/digital-twin/twin-create.jpg", alt:"twin-create"} %}{% endroboWikiPicture %}

提交交易。在这里，创建孪生不需要任何参数。从现在开始，只有数字孪生所有者能够添加/修改孪生的主题。

孪生 ID 可以在 Explorer 概述页面找到。

{% roboWikiPicture {src:"docs/digital-twin/create-log.jpg", alt:"create-log"} %}{% endroboWikiPicture %}

## 添加主题

### 从可能的 extrinsics 下拉列表中选择 digitalTwin -> setSource

{% roboWikiPicture {src:"docs/digital-twin/set-topic.jpg", alt:"set-topic"} %}{% endroboWikiPicture %}

* `id` - 在 Explorer 页面上获得的数字孪生 ID。
* `topic` - 先前讨论的 `H256` 主题名称。在这张图片中是一个32个符号的字符串。
* `source` - 与主题关联的账户地址。

{% roboWikiNote {title:"覆盖", type: "note"}%} 请注意，如果需要，主题可以被另一个来源地址覆盖。{% endroboWikiNote %}

签名并提交 extrinsic。

## 探索

您可以在 `开发者 -> Chain state` 存储模块 `digitalTwin` 中找到关于现有数字孪生的所有信息。

- 孪生的总数 - `total()`;
- 数字孪生所有者 - `owner(u32)`;
- 数字孪生的主题信息 - `digitalTwin(u32)`。

{% roboWikiPicture {src:"docs/digital-twin/chain-state.jpg", alt:"chain-state"} %}{% endroboWikiPicture %}