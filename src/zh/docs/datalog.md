---
title: Datalog
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**现在您的帐户上有一些资金，您可以提交外部交易。首先尝试的是Datalog。它允许您在区块链中持久存储数据。想象一下，这是一个分布式和加密保护的数据存储！**

{% roboWikiNote {type: "warning", title: "Dev Node"}%}请注意，这个以及以下的教程是在Robonomics Node的本地实例上演示的。请按照[这些说明](/docs/run-dev-node)设置您自己的节点。
{% endroboWikiNote %}


## 1. 导航至开发者 -> 外部交易

{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. 从可能的外部交易的下拉列表中选择datalog -> record

还要选择要使用的帐户提交外部交易。填写记录字段。

{% roboWikiPicture {src:"docs/datalog/record.jpg", alt:"record"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "大量数据"}%} Datalog支持最多512字节的字符串。要存储大量数据，可以使用[IPFS](https://ipfs.tech/)。
{% endroboWikiNote %}

## 3. 提交交易

使用之前使用扩展程序或DApp创建的帐户签署并提交交易。

{% roboWikiPicture {src:"docs/datalog/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "擦除"}%} 您也可以通过*datalog -> erase*调用擦除**所有**记录。
{% endroboWikiNote %}

## 4. 查看存储中的datalog

为此，导航至*开发者 -> 链状态*，选择*datalog -> datalogIndex*，指定您的帐户并按下“+”按钮以获取您帐户记录的索引，然后使用*datalog -> datalogItem*浏览您需要的记录。

{% roboWikiPicture {src:"docs/datalog/item.jpg", alt:"item"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "浏览器"}%} 所有事件，包括datalog记录，都可以在*浏览器*中的事件流中看到。
{% endroboWikiNote %}