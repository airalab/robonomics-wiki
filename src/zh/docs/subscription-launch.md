---
title: 如何使用订阅发送启动

contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"平行链", type: "warning"}%}请注意，本教程演示了如何在Robonomics Kusama平行链上使用订阅。您也可以在您的[本地节点](/docs/run-dev-node)上执行相同的步骤。{% endroboWikiNote %}

如果您的地址有一个活跃的订阅，那么使用该帐户的秘钥设置的任何设备都可以免费发送外部交易。
让我们尝试发送`launch`命令。

转到`Developer/Extrinsics`页面，然后选择您的帐户（设备列表中的一个）并选择`rws -> call(subscriptionId, call)`。
然后在`subscriptionId`字段中粘贴订阅的所有者地址（出价拍卖的人）并在下一个字段中选择`launch -> launch(robot, param)`。在`robot`字段中输入您要发送`launch`交易的地址，并插入命令（有关启动命令的描述，请参阅[此处](/docs/launch)）。然后提交交易：

{% roboWikiPicture {src:"docs/rws/launch.png", alt:"launch"} %}{% endroboWikiPicture %}

现在转到`Network/Explorer`页面，在`最近事件`区域中，您将看到您创建的两个事件；`rws.NewCall`和`launch.NewLaunch`

{% roboWikiPicture {src:"docs/rws/events.png", alt:"events"} %}{% endroboWikiPicture %}