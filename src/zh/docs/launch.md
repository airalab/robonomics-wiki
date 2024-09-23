---
title: 启动
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Robonomics平行链的另一个基本功能是启动面板。它允许您向账户/其背后的任何实体发送命令。这些命令包括指定要执行的任务的参数。**

{% roboWikiNote {title:"开发节点", type: "警告"}%} 请注意，这个以及以下的教程是在Robonomics节点的本地实例上演示的。请按照[这些说明](/docs/run-dev-node)设置您自己的节点。
{% endroboWikiNote %}

## 1. 导航至开发者 -> 外部调用

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"外部调用"} %}{% endroboWikiPicture %}

## 2. 从可能的外部调用下拉列表中选择launch -> launch

还要选择要提交外部调用的账户。填写目标地址和参数字段。

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"启动"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32字节", type: "注"}%}  启动支持32字节长的字符串作为命令（[来源](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)），
  因此在这里有改进的空间：
  - 对于像切换这样的基本命令，您可以使用"0x0000000000000000000000000000000000000000000000000000000000000001"或
  "0x0000000000000000000000000000000000000000000000000000000000000000"。
  - 对于包括类似json的高级命令，您可以使用[IPFS](https://ipfs.tech/) CID格式化的
  [正确方式](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes)。
{% endroboWikiNote %}

## 3. 提交交易

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"提交"} %}{% endroboWikiPicture %}

## 4. 在事件中查看您的启动

为此，请导航至*网络 -> 浏览器*，在右侧找到事件列表。单击三角形图标展开。

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"事件"} %}{% endroboWikiPicture %}
