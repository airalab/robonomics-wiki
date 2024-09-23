---
title: 订阅激活
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.7.0
    https://github.com/airalab/robonomics.app
---

**在本文中，您将创建Robonomics平行链账户并购买IoT订阅。**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

要使用Robonomics控制Home Assistant，您需要在Robonomics平行链上拥有2个账户。对于其中一个账户（`OWNER`），您将购买Robonomics订阅。第二个账户（`CONTROLLER`）将控制所有Home Assistant流程（例如遥测），并将授予其他用户访问权限。这些账户将为您的Home Assistant提供安全保障。

如果您还没有账户，请查看本文并创建[OWNER账户](/docs/create-account-in-dapp/)。控制器账户将在设置过程中自动创建。

在本文中，使用[Polkadot.js扩展](https://polkadot.js.org/extension/)钱包来处理账户，但您也可以使用其他方便的钱包。

## 激活Robonomics订阅

{% roboWikiNote {type:"好的"}%}

在这一步中，您必须在您的`OWNER`账户中拥有足够数量的XRT代币（至少2-3个XRT）。

{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['autoplay, loop, controls'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

1. 前往Robonomics dApp并导航至[订阅页面](https://robonomics.app/#/rws-buy)。然后，在右侧边栏上点击`连接账户`。

2. 在弹出菜单中连接Polkadot.js扩展。您将看到您的账户地址以及其余额。

3. 在购买之前，请确保已选择`OWNER`账户。点击地址概要图标，您应该看到`OWNER`账户。

4. 最后，点击`购买订阅`按钮并输入您的账户密码。等待激活过程完成。一段时间后，您将看到您的订阅状态。

## 设置您的订阅

现在您需要通过将`CONTROLLER`账户添加到其中来设置您的订阅。

{% roboWikiPicture {src:"docs/home-assistant/sub-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

1. 前往Robonomics dApp并导航至[设置订阅页面](https://robonomics.app/#/rws-setup)。导航至**订阅设置**部分。

2. 在`控制器的种子短语`字段中，点击魔术棒以创建新的`控制器`账户。

3. 在弹出窗口中为`控制器`账户创建密码。

4. 在下一个弹出窗口中，您将看到您的新账户地址和助记种子短语。请安全地保存助记种子短语，因为您稍后需要用于集成设置。此外，将下载带有`控制器`账户的JSON文件。您可以将其导入到您的钱包中。如何在Polkadot.js扩展中执行此操作，请参阅[此处](/docs/create-account-in-dapp/)。

{% roboWikiPicture {src:"docs/home-assistant/controller-create.jpg", alt:"controller create"} %}{% endroboWikiPicture %}

5. 关闭弹出窗口并点击`保存`按钮。

## 将控制器账户添加到订阅

现在，您需要将您的`控制器`账户添加到**访问列表**中。

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay, loop, controls']} %}{% endroboWikiVideo %}

1. 前往Robonomics dApp，并导航至[设置订阅页面](https://robonomics.app/#/rws-setup)。确保已选择正确的订阅和`OWNER`账户。

2. 复制`CONTROLLER`地址：打开扩展程序，点击账户名称旁边的图标或从**订阅设置**部分复制地址。

3. 将此地址粘贴到**订阅用户**部分的`Polkadot地址`字段中，然后点击`+`按钮。

4. 在弹出窗口中为您的`OWNER`账户输入密码，然后等待激活过程完成。

就这样。继续下一篇文章。