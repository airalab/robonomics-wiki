---
title: 如何通过订阅发送启动命令

contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="warning" title="Parachain">

  请注意，本教程演示了在Robonomics Kusama平行链上使用订阅。您也可以在您的[本地节点](/docs/run-dev-node)上执行相同的步骤。

</robo-wiki-note>

如果您的地址有一个活跃的订阅，那么使用该账户的密钥设置的任何设备都可以免费发送外部交易。 
让我们尝试发送`launch`命令。

转到`Developer/Extrinsics`页面，然后选择您的账户（设备列表中的账户）并选择`rws -> call(subscriptionId, call)`。 
然后在`subscriptionId`字段中粘贴订阅的所有者地址（竞拍者的地址），在下一个字段中选择`launch -> launch(robot, param)`。在`robot`字段中输入您想要发送`launch`交易的地址，并插入命令（有关启动命令的描述，请参阅[此处](/docs/launch)）。然后提交交易：

![launch](../images/rws/launch.png)


现在转到`Network/Explorer`页面，在`Recent Events`区域中，您将看到您创建的两个事件：`rws.NewCall`和`launch.NewLaunch`：

![events](../images/rws/events.png)
