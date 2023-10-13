---
title: 如何购买订阅

contributors: [LoSk-p, PaTara43]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**在区块链交易中支付佣金非常烦人。想象一下，一个物联网设备每5-10分钟发送一次遥测数据。这将使您在一个月内支付相当多的费用。Robonomics Network的一个关键特性是RWS - Robonomics Web Service订阅。每月支付，忘记交易费用！有关理论背景，请参阅[此](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855)文章。**

<robo-wiki-note type="warning" title="Parachain">

  在开始之前，请注意，本教程演示了如何在Robonomics Kusama平行链上购买订阅。您也可以在您的[本地节点](/docs/run-dev-node)上执行相同的步骤。

  开始之前还有一件事。这是一种"困难"的购买订阅的方式。还有一种传统的方式是通过[Robonomics DApp](https://dapp.robonomics.network/#/)来完成。

</robo-wiki-note>

## 竞标拍卖

Robonomics中的订阅是通过拍卖模式出售的。要获得一个订阅，您需要竞标并赢得拍卖（不用担心，很快）。

在`Developer/Chain state`中，您可以看到可用的拍卖。 
选择`rws`和`auctionQueue`，然后点击`+`按钮，您将看到可用拍卖的ID：

![queue](../images/rws/queue.png)

您可以使用`rws` `auction`和拍卖ID（图片中的拍卖ID为79）查看有关任何订阅的信息：

![auction](../images/rws/auction.png)

在拍卖信息中，您可以看到`winner`字段，目前为`null`，表示没有人拥有此订阅，您可以获得它。为此，请转到`Developer/Extrinsic`，选择您的账户和`rws -> bid`。还要设置拍卖ID（79）和要竞标的单位数量（超过1000000000 Wn）：

![bid](../images/rws/bid.png)

提交交易并检查拍卖ID 79的信息（在`链状态`Chain state` `rws -> auction`和ID 79）：

![win](../images/rws/auc_win.png)

现在在`winner`字段中，您将看到您的账地址，这意味着该账户拥有订阅79。拍卖从第一次竞标开始，持续几个区块，因此如果在接下来的几个区块中有人出价比您更多的代币，那个人将成为赢家并获得订阅。

现在您可以添加设备。设备是能够使用此订阅并提交无费用外部交易的账户。
要测试它，请创建一个没有令牌的新帐户并将其添加到设备。

要添加设备，请在`Developer/Extrinsic中选择`rws -> setDevices`。然后点击`Add Item`按钮，并选择最近创建的没有代币的账户：

![set_devices](../images/rws/set_devices.png)

提交交易。现在您可以使用`rws -> devices`Chain state`中检查设备列表。在那里，您将看到您的账户地址，没有代币。选择已购买订阅的账户并点击`+`：

![devices](../images/rws/devices.png)

现在您可以尝试使用订阅[发送启动](/docs/subscription-launch)外部交易。