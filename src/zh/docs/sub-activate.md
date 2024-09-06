---
title: Subscription Activate
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp
    https://github.com/airalab/robonomics.app
---

在本文中，您将创建Robonomics平行链账户并购买IoT订阅。

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

要使用Robonomics控制Home Assistant，您需要在Robonomics平行链上拥有2个账户。对于其中一个账户（`OWNER`），您将购买Robonomics订阅。第二个账户（`CONTROLLER`）将控制所有Home Assistant流程（例如遥测），并允许其他用户访问。这些账户将为您的Home Assistant提供安全保障。

{% roboWikiNote {title:"警告", type: "warning"}%}
两个账户必须使用**ed25519**加密创建。因此，您需要使用Polkadot-JS UI创建一个账户，并选择所需的加密方式。

Polkadot-JS UI中默认禁用了此功能。要启用它，请转到`设置` -> `常规` -> `账户选项`，并在`浏览器中账户存储`下拉菜单中选择`允许本地浏览器中账户存储`。
{% endroboWikiNote %}

## 创建所有者和控制器账户

{% roboWikiVideo {videos:[{src: 'QmajeEV4adqR2DCaBJPZhH6NR74eHaRmvCcbeQtnLm7Kcc', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 打开[Robonomics Parachain应用](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)，在Polkadot / Substrate门户上。**检查左上角以确保您已连接到Robonomics Parachain。**

2. 转到`账户` -> `账户`，然后点击`添加账户`按钮。您将看到带有账户种子的弹出菜单。两种形式：*助记词*（人类可读）和*原始*（一串数字和字母）。

3. 打开`高级创建选项`，将要创建的账户的加密类型更改为`Edwards - ed25519`，然后点击`下一步`。

4. 安全地保存助记词种子短语，然后点击`下一步`。

5. 在下一个菜单中，您需要设置账户名称和密码。为了方便起见，将其命名为`OWNER`。点击`下一步`。

6. 在最后的窗口中，点击`保存`以完成账户创建。这也将生成一个备份 JSON 文件，您应该安全地存储。稍后，您可以使用此文件来恢复您的账户，如果您记得密码的话。

7. 重复这些步骤，创建一个名为`CONTROLLER`的账户。


## 将账户添加到 Polkadot.js

为了方便起见，您应该使用[Polkadot.js 扩展](https://polkadot.js.org/extension/)，并将这些新创建的账户添加到其中。对于 ed25519 账户，您只能使用备份 JSON 文件来完成。您可以使用创建账户时保存的文件。

您可以通过创建账户的备份文件再次获取这些文件。点击账户旁边的三个点，选择`为此账户创建备份文件`，然后输入密码。

{% roboWikiVideo {videos:[{src: 'Qmc5LcbLSdVCUubLomUUo5Qxrxb2xaixpwUFqnpj2C9iM5', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 打开扩展程序，点击右上角的`+`按钮，然后选择`从备份 JSON 文件恢复账户`。

2. 在打开的窗口中，上传 JSON 文件，输入密码，然后点击`恢复`。

3. 确保在 Polkadot.js 扩展中为 Robonomics 网络选择了账户。在 Polkadot / Substrate 门户上，转到`设置` -> `元数据`，然后点击`更新元数据`按钮。

4. 在弹出窗口中确认元数据更新。扩展程序现在将显示用于地址的网络标签。## 激活Robonomics订阅

{% roboWikiNote {type: "okay"}%} 在这一步中，您必须在您的`OWNER`账户中拥有足够数量的XRT代币（至少2-3个XRT）。 {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 前往Robonomics dApp并导航至[订阅页面](https://robonomics.app/#/rws-buy)。然后，在右侧边栏上点击`连接账户`。

2. 在弹出菜单中，连接Polkadot.js扩展。您将看到您的账户地址以及其余额。

3. 在购买之前，请确保您已选择`OWNER`账户。点击地址配置文件图标，您应该看到`OWNER`账户。

4. 最后，点击`购买订阅`按钮并输入您的账户密码。等待激活过程完成。一段时间后，您将看到您的订阅状态。

## 设置您的订阅

现在您需要通过将`CONTROLLER`账户添加到其中来设置您的订阅。

{% roboWikiVideo {videos:[{src: 'Qmd5P356UE1yDLAd4uSdq1dERbyp5gk5wpWD3iENNt2mjV', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 前往Robonomics dApp并导航至[设置订阅页面](https://robonomics.app/#/rws-setup)。导航至**常规设置**部分。

2. 从`控制器的种子短语`字段中删除种子短语，并输入`CONTROLLER`账户的种子短语。

3. 复制`CONTROLLER`地址：打开扩展并点击旁边的图标帐户名称。

4. 将此地址粘贴到“控制器”字段中，然后单击“保存”按钮。

## 将帐户添加到订阅

现在，您需要将您的“控制器”帐户添加到**访问列表**中。

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 转到Robonomics dApp，并导航至[设置订阅页面](https://robonomics.app/#/rws-setup)。确保已选择正确的订阅和“所有者”帐户。

2. 复制“控制器”地址：打开扩展程序，然后单击帐户名称旁边的图标。

3. 将此地址粘贴到**订阅中的用户**部分的“Polkadot地址”字段中，然后单击“+”按钮。

4. 在弹出窗口中为您的“所有者”帐户输入密码，然后等待激活过程完成。