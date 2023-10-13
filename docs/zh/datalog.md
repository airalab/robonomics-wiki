---
title: 数据记录
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**现在您的帐户上已有一些资金，您可以提交外部信息。 第一个尝试的是数据记录。 它允许您将数据持久存储在区块链中。 想象一下您的数据的分布式且受加密保护的存储，就是这样！**

<robo-wiki-note type="warning" title="Dev Node">

  请注意，本教程和后续教程是在 Robonomics Node 的本地实例上演示的。 设置你的 [这些说明](/docs/run-dev-node).

</robo-wiki-note>

## 1. 导航至  Developer -> Extrinsics

<robo-wiki-picture src="datalog/extrinsics.jpg" />

## 从可能的外部因素的下拉列表中选择 datalog->record

另请选择您要用于提交外部信息的帐户。 填写记录字段。

<robo-wiki-picture src="datalog/record.jpg" />

<robo-wiki-note type="note" title="Large amount of data">

  Datalog 支持最大 512 字节的字符串。 为了存储大量数据，人们可能会使用 [IPFS](https://ipfs.tech/).

</robo-wiki-note>

## 3.提交交易

使用之前使用扩展程序或 DApp 创建的帐户签署并提交交易。

<robo-wiki-picture src="datalog/submit.jpg" />

<robo-wiki-note type="note" title="Erase">

  您还可以通过 *datalog ->erase* 调用删除**所有**记录。

</robo-wiki-note>

## 4. Review your datalog in the storage

为此，导航至 *Developer -> Chain state*，选择 *datalog -> datalogIndex*，指定您的帐户并按 “+”按钮获取您帐户记录的索引，然后通过 *datalog -> datalogItem* 探索您需要的索引。

<robo-wiki-picture src="datalog/item.jpg" />

<robo-wiki-note type="note" title="探索r">

  所有事件（包括数据记录记录）都可以在 *探索r* 的事件流中看到。

</robo-wiki-note>