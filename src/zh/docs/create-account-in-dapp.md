---
title: 为 Robonomics Parachain 创建账户

contributors: [PaTara43, Fingerling42]
---

**为了与 Robonomics Parachain 进行交互和操作，开发人员和用户需要在 Polkadot / Substrate 门户上创建一个账户。该账户执行网络的基本功能：您的公共网络地址（公钥）、地址和资金的访问控制（私钥）、向网络发送交易、显示您的代币及其数量等。以下是为 Robonomics Parachain 创建账户的两种主要方式。**

## 1. 使用 Polkadot{.js} 浏览器扩展

Polkadot 扩展提供了一种生成账户并与所有 Polkadot / Kusama 项目（包括 Robonomics Parachain）进行交互的机制。这并不是管理您的账户最安全的方式，但在安全性和可用性平衡方面是最方便的。

## 1.1. 安装浏览器扩展

浏览器扩展适用于 [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) 和 [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en)（以及基于 Chromium 的浏览器）。

{% roboWikiPicture {src:"docs/creating-an-account/1.1-polkadot-extension.png", alt:"浏览器扩展"} %}{% endroboWikiPicture %}

## 1.2. 打开 Robonomics Parachain 应用

前往 [Robonomics Parachain 应用](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) 在 Polkadot / Substrate 门户上。如果这是您第一次进入门户，它将请求访问浏览器扩展，请允许访问。

一旦您打开了应用程序，请查看左上角。那里显示了网络的名称、其图标和最后一个区块的编号。单击此区域将打开所有 Polkadot / Kusama 网络的列表，包括测试网络和本地节点。您可以通过选择所需的网络并按下 `Switch` 按钮来在网络之间切换。 **确保您现在已连接到Robonomics Parachain**。

{% roboWikiPicture {src:"docs/creating-an-account/1.2-robonomics-app.png", alt:"Robonomics Parachain app"} %}{% endroboWikiPicture %}

## 1.3. 更新扩展元数据和浏览器内账户创建

很可能应用程序会要求您更新扩展的元数据，以显示您连接到的链的正确信息。转到**设置 -> 元数据**，点击`更新元数据`按钮，然后在弹出窗口中允许扩展执行此操作。

{% roboWikiPicture {src:"docs/creating-an-account/1.3-metadata-update.png", alt:"更新元数据"} %}{% endroboWikiPicture %}

默认情况下，Web应用程序仅与外部账户配合使用。要允许直接在浏览器中创建新账户，请转到**设置 -> 通用 -> 账户选项 -> 浏览器内账户创建**，选择`允许本地浏览器内账户存储`，然后点击`保存`按钮。

{% roboWikiPicture {src:"docs/creating-an-account/1.3-in-browser-account-creation.png", alt:"在浏览器中更新账户创建"} %}{% endroboWikiPicture %}

## 1.4. 在扩展中创建账户

打开Polkadot{.js}浏览器扩展。点击大加号按钮或从右上角的小加号图标中选择`创建新账户`。您应该看到以下菜单，其中包含以十二个单词形式生成的助记词种子和地址。

{% roboWikiPicture {src:"docs/creating-an-account/1.4-create-account-step-1.png", alt:"账户创建，第一步"} %}{% endroboWikiPicture %}

种子是您账户的关键。知道种子可以让您（或任何其他知道种子的人）控制此账户，甚至在忘记密码时重新创建它。**将其安全存储在某个地方非常重要**，最好是在纸上或其他非数字设备上，而不是在数字存储设备或计算机上。

保存种子并点击`下一步`。您应该看到以下菜单。

{% roboWikiPicture {src:"docs/creating-an-account/1.5-create-account-step-2.png", alt:"账户创建，第二步"} %}{% endroboWikiPicture %}


- *网络* 允许您选择此帐户将专门用于哪个网络。您可以在多个网络上使用相同的地址，但出于隐私原因，建议您为每个使用的网络创建一个新地址。
从下拉列表中选择Robonomics网络。如果找不到Robonomics网络，那么很可能是您没有更新元数据，请返回并执行更新。

	`您会注意到地址的格式和帐户图标会发生变化 — 这是正常的。不同网络格式只是同一公钥的其他表示。`

- *名称* 只是您自己使用的帐户名称。它不会存储在区块链上，其他用户也看不到。

- *密码* 用于加密您的帐户信息。在门户上签署交易时，您需要重新输入密码。创建一个密码并记住它。

因此，在创建帐户后，您将在Polkadot{.js}扩展的帐户列表中看到它。通过单击三个点，您可以重命名帐户、导出帐户、从扩展中删除帐户以及更改用于该帐户的网络。

此外，该帐户将出现在门户的**帐户 -> 帐户**菜单中，其中将指出它是使用扩展注入的。

{% roboWikiPicture {src:"docs/creating-an-account/1.6-account-injected.png", alt:"成功创建帐户"} %}{% endroboWikiPicture %}


## 2. 直接在Robonomics Parachain应用程序上

您可以使用Polkadot / Substrate门户上的用户界面来创建帐户。这可用于开发和测试。

## 2.1. 打开Robonomics Parachain应用程序

转到[Robonomics Parachain应用程序](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)，在Polkadot / Substrate门户上。**请检查左上角，确保您已连接到Robonomics Parachain**。

转到**帐户 -> 帐户**，然后点击`添加帐户`按钮。

{% roboWikiPicture {src:"docs/creating-an-account/2.1-robonomics-app-main-view.png", alt:"Robonomics Parachain应用程序"} %}{% endroboWikiPicture %}

## 2.2. 创建账户

您应该看到带有账户种子的以下弹出菜单。

{% roboWikiPicture {src:"docs/creating-an-account/2.2-robonomics-app-seed.png", alt:"生成账户种子"} %}{% endroboWikiPicture %}

它有两种形式：*助记词*（人类可读）和*原始*（一串数字和字母）。安全地保存种子短语并按`下一步`。

> 您还可以更改创建账户的加密类型，打开`高级创建选项`并选择类型（图片中为`ed25519`）。

{% roboWikiPicture {src:"docs/creating-an-account/ed-account.jpg", alt:"ed25519加密类型账户"} %}{% endroboWikiPicture %}

在下一个菜单中，您需要设置账户名称和密码，类似于上面描述的扩展说明。

{% roboWikiPicture {src:"docs/creating-an-account/2.3-robonomics-app-name-pass.png", alt:"生成账户名称和密码"} %}{% endroboWikiPicture %}

点击`下一步`按钮将带您到最后一个窗口。点击`保存`完成账户创建。它还将生成一个备份JSON文件，您应该安全地存储。以后您可以使用此文件来恢复您的账户，如果您记得密码的话。

{% roboWikiPicture {src:"docs/creating-an-account/2.4-robonomics-app-account-created.png", alt:"成功创建账户"} %}{% endroboWikiPicture %}

## 2.3 将ed25519账户添加到Polkadot扩展

您可能需要将创建的账户添加到Polkadot.js扩展（对于ed25519账户，您只能使用备份JSON文件来完成）。为此，您需要创建账户的备份文件。点击账户上的三个点，选择`为此账户创建备份文件`并输入您的密码。

{% roboWikiPicture {src:"docs/creating-an-account/backup-file.jpg", alt:"备份文件"} %}{% endroboWikiPicture %}

然后打开扩展，点击右上角的`+`按钮，然后选择`从备份JSON文件恢复账户`。

{% roboWikiPicture {src:"docs/creating-an-account/extention-add-backup.jpg", alt:"在扩展中恢复备份"} %}{% endroboWikiPicture %}

在打开的窗口中放入已保存的文件，输入密码，然后按`恢复`。

{% roboWikiPicture {src:"docs/creating-an-account/file-backup.jpg", alt:"在扩展程序中恢复备份 2"} %}{% endroboWikiPicture %}

## 3. 账户创建成功

现在您可以完全操作您新创建的账户。发送和接收代币、消息，编写数据日志等。随意探索应用程序的所有功能。要复制您的账户地址，只需点击其图标，地址将被复制到剪贴板。

如果您想了解更多关于 Polkadot / Kusama 账户以及其他创建方式的信息，可以在[这里](https://wiki.polkadot.network/docs/learn-accounts)和[这里](https://wiki.polkadot.network/docs/learn-account-generation)找到更多信息。