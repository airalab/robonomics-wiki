---
title: 如何购买订阅

contributors: [LoSk-p, PaTara43]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**在区块链上支付交易手续费很烦人。想象一下，一个物联网设备每5-10分钟发送一次遥测数据。这将使您在一个月内支付相当多的费用。Robonomics Network的一个关键特性是RWS - Robonomics Web Service订阅。每月支付费用，忘记交易成本！有关理论背景，请参考[此](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855)文章。**


{% roboWikiNote {title:"平行链", type: "warning"}%}   请注意，本教程演示了在Robonomics Kusama平行链上购买订阅。您也可以在您的[本地节点](/docs/run-dev-node)上执行所有相同的步骤。
开始之前还有一件事。这是一种“困难”的购买订阅方式。您也可以通过[Robonomics DApp](https://dapp.robonomics.network/#/)以传统方式进行操作。
{% endroboWikiNote %}

## 竞标拍卖

Robonomics中的订阅是通过拍卖模型出售的。要获得一个，您需要参与竞标拍卖并赢得它（别担心，很快）。

在`Developer/Chain state`中，您可以看到可用的拍卖。
选择`rws`和`auctionQueue`，然后点击`+`按钮，您将看到可用拍卖的ID：

{% roboWikiPicture {src:"docs/rws/queue.png", alt:"queue"} %}{% endroboWikiPicture %}

您可以通过`rws` `auction`和拍卖ID查看有关任何订阅的信息（图片中的拍卖ID为79）：

{% roboWikiPicture {src:"docs/rws/auction.png", alt:"auction"} %}{% endroboWikiPicture %}

在有关拍卖的信息中，您可以看到`winner`字段，目前为`null`，因此没有人拥有此订阅，您可以获得它。为此，请转到`Developer/Extrinsic`，选择您的账户和`rws -> bid`。还要设置拍卖ID（79）和要竞标的单位数量（超过1000000000 Wn）：

{% roboWikiPicture {src:"docs/rws/bid.png", alt:"bid"} %}{% endroboWikiPicture %}

提交交易，并检查ID为79的拍卖的信息（在`Chain state`中选择`rws -> auction`和ID 79）：

{% roboWikiPicture {src:"docs/rws/auc_win.png", alt:"auc_win"} %}{% endroboWikiPicture %}

现在，在`winner`字段中，您将看到您的账户地址，这意味着此账户拥有订阅79。拍卖从第一次竞标开始，持续几个区块，因此如果在接下来的几个区块中有人出价比您多，那么这个人将成为赢家并获得订阅。

现在您可以添加设备。设备是能够使用此订阅并提交无费用extrinsics的账户。
要测试，请创建一个没有代币的新账户，并将其添加到设备中。

要添加设备，请在`Developer/Extrinsic`中选择`rws -> setDevices`。然后点击`Add Item`按钮，并选择最近创建的没有代币的账户：

{% roboWikiPicture {src:"docs/rws/set_devices.png", alt:"set_devices"} %}{% endroboWikiPicture %}

提交交易。现在您可以通过`rws -> devices`在`Chain state`中检查设备列表。在那里，您将看到没有代币的账户地址。选择已购买订阅的账户，并点击`+`：

{% roboWikiPicture {src:"docs/rws/devices.png", alt:"devices"} %}{% endroboWikiPicture %}

现在，您可以尝试使用订阅[发送启动](/docs/subscription-launch) extrinsic。