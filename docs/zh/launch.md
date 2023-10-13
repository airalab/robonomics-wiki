---
title: 启动
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Another basic feature of Robonomics parachain is the 启动 pallet. It allows you to send commands to the accounts/any entities behind them. These commands include parameter to specify the task to be executed.**

<robo-wiki-note type="warning" title="Dev Node">

  请注意，此教程及其后续教程是在Robonomics节点的本地实例上演示的。请按照[这些说明](/docs/run-dev-node)设置您自己的节点。

</robo-wiki-note>

## 1. 1. 导航到 Developer -> Extrinsics

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. 从可能的外部变量的下拉列表中选择 launch -> launch

还要选择要提交外部操作的账户。填写目标地址和参数字段。

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  Launch 支持 32 字节长的字符串作为命令（[来源](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)），
  所以这里有一个即兴创作的空间：
  - 对于切换等基本命令，您可以使用“0x0000000000000000000000000000000000000000000000000000000000000001”或
  “0x0000000000000000000000000000000000000000000000000000000000000000”。
  - 对于包括 json 之类的高级命令，您可以使用 [IPFS](https://ipfs.tech/) CID 格式
  [正确的方法](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes)。

</robo-wiki-note>

## 3. 提交交易

<robo-wiki-picture src="launch/submit.jpg" />

## 4. 在事件中查看您的启动

为此，导航到*Network -> Explorer*，在右侧找到事件列表。点击三角形图标展开。

<robo-wiki-picture src="launch/event.jpg" />
