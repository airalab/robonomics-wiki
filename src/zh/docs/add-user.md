---
title: 添加用户

contributors: [nakata5321, Fingerling42, LoSk-p]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**本文将向您展示如何向您的Home Assistant添加新用户。**

## 添加用户到订阅

您不能使用先前创建的帐户，因为`OWNER`和`CONTROLLER`提供了安全性，而您在首次启动Home Assistant时创建的第一个用户没有Robonomics Parachain帐户。

{% roboWikiVideo {videos:[{src: 'QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 在Robonomics Parachain上创建一个帐户，就像您在[上一篇文章](/docs/sub-activate/)中所做的那样。

2. 使用`OWNER`帐户在[Robonomics DApp](https://robonomics.app/#/rws-setup)的`SETUP A SUBSCRIPTION`页面上将新用户帐户添加到订阅。现在在`USERS IN SUBSCRIPTION`部分应该有三个地址在访问列表中：`OWNER`，`CONTROLLER`和`USER`。


## RWS设置JSON文件

首先，用户应该获取包含RWS设置信息的JSON文件。

### 创建RWS设置JSON

管理员可以在[SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup)页面使用`Download import for other users`按钮为他的设置创建JSON文件。

{% roboWikiPicture {src:"docs/home-assistant/download_rws_setup_json.png", alt:"image"} %}{% endroboWikiPicture %}

### 导入RWS设置

现在，用户可以使用此JSON文件使用`IMPORT SETUP`按钮导入RWS设置。

{% roboWikiVideo {videos:[{src: 'QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## 授予用户访问权限

在同一页面（[SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup)）上，您可以为新用户设置密码。

{% roboWikiVideo {videos:[{src: 'Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 在右侧边栏选择您刚刚创建的帐户（通过按下个人资料图标来确认您选择了预期的帐户）。

2. 在必填字段中输入`USER`的地址和种子短语。

3. 填写密码，然后通过`CREATE PASSWORD`按钮确认交易，由于订阅，现在不会收取任何费用。

4. 注册过程完成后，使用您的用户地址作为登录名和新创建的密码登录到Home Assistant。

现在您可以使用该DApp通过Robonomics控制您的家，查看[**"获取智能家居遥测"**](/docs/smart-home-telemetry/)文章。