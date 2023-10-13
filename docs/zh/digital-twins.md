---
title: 数字孪生
contributors: [nakata5321, PaTara43]

tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---
  
**想象一下拥有一个复杂的设备或系统，它有几个模块需要维护，并且需要几个帐户来使用。为了将它们都放在一个地方或使用单独的帐户对某些功能进行编码，或者例如为不同的信息流设置不同的数据日志源，需要使用数字孪生模块。**

<robo-wiki-note type="warning" title="Dev Node">

  请注意，这些教程是在Robonomics节点的本地实例上演示的。按照以下说明设置您自己的节点： [这些说明](/docs/run-dev-node).

</robo-wiki-note>

## 理论概述
任何帐户都可以创建和管理数字孪生。孪生可以想象成一个带有以下内容的表格：

| DT id  | Topic Name 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


其中：
* **DT id** 是无符号整数唯一的数字孪生索引。
* **Topic name** 是一个32字节长度的十六进制`H256`或ASCII数据，与 [`启动`](/docs/launch) 外部参数相同。 
例如：`0x1234....FF` 或 `hello.parachain.robonomics.world`。
* **Source** - 是某个帐户地址。

<robo-wiki-note type="note" title="Topics">

  正如之前在启动外部概述中讨论的那样，`H256` 可以表示为编码的IPFS CID（参见
  [Python工具](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) ）。
  因此，主题也可以用作一些数据存储，例如孪生的模块描述。

</robo-wiki-note>


## 创建数字孪生

### 1. 导航到开 Developer -> Extrinsics

<robo-wiki-picture src="digital-twin/extrinsics.jpg" />

### 2. 从可能的外部下拉列表中选择 digitalTwin -> create

<robo-wiki-picture src="digital-twin/twin-create.jpg" />

提交交易。在这里，创建孪生不需要任何参数。它将被授予一个索引，只有数字孪生的所有者才能从现在开始添加/修改孪生的主题。

孪生ID可以在浏览器概述页面找到。

<robo-wiki-picture src="digital-twin/create-log.jpg" />

## 添加主题

### 从可能的外部下拉列表中选择 digitalTwin->setSource

<robo-wiki-picture src="digital-twin/set-topic.jpg" />

* `id` - Digital Twin ID，已在Explorer页面获取。
* `topic` - 之前讨论的`H256`主题名称。在这张图片中，它是一个由32个符号组成的字符串。
* `source` - 要与主题关联的帐户地址。

<robo-wiki-note type="note" title="Overwrite">

  请注意，如果需要，主题可以被另一个源地址覆盖。

</robo-wiki-note>

签署并提交外部事务。

## Explore

您可以在`开发者->链状态`存储模块`digitalTwin`中找到有关现有数字孪生的所有信息。

- 孪生的总数 - `total()`;
- 数字孪生所有者 - `owner(u32)`;
- 有关数字孪生主题的信息 - `digitalTwin(u32)`.

<robo-wiki-picture src="digital-twin/chain-state.jpg" />