---
title: 全球管理

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

**本文将向您展示如何为您的Home Assistant设置新用户。**

## 将用户添加到订阅

您不能使用先前创建的帐户，因为`SUB_OWNER`和`SUB_CONTROLLER`提供了安全性，而您在首次启动Home Assistant时创建的第一个用户没有Robonomics Parachain帐户。

1. 在Robonomics Parachain上创建一个帐户，就像您在[上一篇文章](/docs/sub-activate/)中所做的那样。

2. 使用`SUB_OWNER`帐户将新用户帐户添加到[dapp](https://dapp.robonomics.network/#/subscription/devices)的订阅中。现在访问列表中应该有三个地址：`SUB_OWNER`，`SUB_CONTROLLER`和`USER`。

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSxzram7CF4SXpVgEyv98XetjYsxNFQY2GY4PfyhJak7H', type:'mp4'}]" />


## 授予用户访问权限

1. 转到名为[Home Assistant Account](https://dapp.robonomics.network/#/home-assistant)的dapp服务。在右侧边栏中选择您刚刚创建的帐户（通过按下个人资料图标来检查您选择的帐户是否正确）。

2. 在所需字段中输入`USER`种子。在管理员信用字段中添加`SUB_OWNER`和`SUB_CONTROLLER`地址。如果一切正确，您将看到验证状态为`已验证`。

3. 为您刚刚注册的新用户创建一个密码，然后确认交易，由于订阅，此交易现在将不收取费用。稍后，您可以在恢复选项卡中恢复密码。

4. 在注册过程完成后，使用您的用户地址作为登录名和新创建的密码登录Home Assistant。

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmW2TXuwCYXzgcRfEUx4imZU5ZerEzkuD5P53u9g2WnxDh', type:'mp4'}]" />

现在您可以使用dapp通过Robonomics控制您的家庭，查看[**"获取智能家居遥测"**](/docs/smart-home-telemetry/)文章。

## 故障排除

1. 如果您忘记了 Robonomics 帐户的 Home Assistant 密码，请[检查 Dapp。](https://dapp.robonomics.network/#/home-assistant)
转到"Your Home Assistant password"部分，选择"Restore"选项卡。
