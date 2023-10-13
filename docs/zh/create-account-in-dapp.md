---
title: Create Account for Robonomics Paracha在部分中，超时是以秒为单位的，它将创建包含以下信息的数据日志： 

contributors: [PaTara43, Fingerling42]
---

**为了与 Robonomics 平行链进行交互和操作，开发者和用户需要在 Polkadot / Substrate 门户上创建一个帐户。 该账户执行网络的基本功能：您的公共网络地址（公钥）、对地址和资金的访问控制（私钥）、向网络发送交易、显示您的代币及其金额等。以下是 创建 Robonomics 平行链帐户的两种主要方法.**

## 1. 使用Polkadot{.js}浏览器扩展

Polkadot扩展提供了一种生成账户并与所有Polkadot / Kusama项目（包括Robonomics Parachain）进行交互的机制。这不是管理您的账户的最安全方式，但在安全性/易用性平衡方面是最方便的。

## 1.1. 安装浏览器扩展

浏览器扩展适用于 [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) 和 [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) （以及基于Chromium的浏览器）。

![Browser Extension](../images/creating-an-account/1.1-polkadot-extension.png "Browser Extension")

## 1.2. 打开Robonomics Parachain应用

转到 [在Polkadot / Substrate门户上打开Robonomics Parachain应用。如果这是您第一次进入门户，它将请求访问浏览器扩展，请允许访问。](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) 打开应用后，请查看左上角。那里显示了网络的名称、图标和最后一个区块的编号。单击该区域将打开所有Polkadot / Kusama网络的列表，包括测试网络和本地节点。您可以通过选择所需网络并按下 

打开应用程序后，请查看左上角。 那里显示网络的名称、图标和最后一个区块的编号。 单击该区域将打开所有 Polkadot / Kusama 网络的列表，包括测试网络和本地节点。 您可以通过选择所需的网络并按 `Switch` 按钮来切换网络。 **确保您现在已连接到 Robonomics 平行链**。

![Robonomics Parachain app](../images/creating-an-account/1.2-robonomics-app.png "Robonomics Parachain app")

## 1.3. 更新扩展元数据

该应用程序很可能会要求您更新扩展程序的元数据，以显示有关您所连接的链的正确信息。 转到 **Settings -> Metadata**，按 `Update metadata` 按钮，然后在弹出窗口中允许扩展程序执行此操作。

![Updating metadata](../images/creating-an-account/1.3-metadata-update.png "Updating metadata")

## 1.4。 在扩展中创建帐户

打开 Polkadot{.js} 浏览器扩展。 单击大加号按钮或从右上角的小加号图标中选择 `Create new account` 。 您应该看到以下菜单，其中包含生成的十二个单词形式的助记词种子和地址。

![Account creation, step one](../images/creating-an-account/1.4-create-account-step-1.png "Account creation, step one")

种子是您帐户的密钥。 知道种子后，您（或任何知道种子的人）就可以控制该帐户，甚至在您忘记密码时重新创建它。 **将其安全地存储在某个地方** 非常重要，最好是在纸质或其他非数字设备上，而不是在数字存储或计算机上。

保存种子并按下 `Next step`. 您应该看到以下菜单。

![Account creation, step two](../images/creating-an-account/1.5-create-account-step-2.png "Account creation, step two")

- *Network* 允许您选择此帐户将专门用于哪个网络。您可以在多个网络上使用相同的地址，但出于隐私原因，建议您为每个使用的网络创建一个新地址。 
从下拉列表中选择Robonomics网络。如果您找不到Robonomics网络，么很可能您没有更新元数据，请返回并进行更新。

    - 您会注意到地址和帐户图标的格式会发生变化-这是正常的。不同的网络格式只是同一公钥的其他表示形式。 

- *Name* 只是帐户的名称，仅供您使用。它不会存储在区块链上，其他用户也无法看到它。 

- *Password* 用于加密帐户信息。在门户上签署交易时，您需要重新输入它。创建一个并记住它。

因此，在创建帐户后，您将在Polkadot{.js}扩展的帐户列表中看到它。通过点击三个点，您可以重命名帐户，导出它，从扩展中删除它并更改用于该帐户的网络。 

此外，该帐户将显示在门户上的  **Accounts -> Accounts** 菜单中，其中会注意到它是使用扩展程序注入的。

![Successful account creation](../images/creating-an-account/1.6-account-injected.png "Successful account creation")

## 2. 直接在 Robonomics 平行链应用程序上

您可以使用 Polkadot / Substrate 门户上的用户界面来创建帐户。 它可用于开发和测试。


## 2.1. 打开 Robonomics 平行链应用程序

去 [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)  在 Polkadot / Substrate Portal 上。 **检查左上角是否已连接到 Robonomics 平行链**.

去 **Accounts -> Accounts**  然后按 `Add account` 按钮。

![Robonomics Parachain App](../images/creating-an-account/2.1-robonomics-app-main-view.png "Robonomics Parachain App")

## 2.2. 创建账户

您应该会看到以下带有帐户种子的弹出菜单。

![Generating account seed](../images/creating-an-account/2.2-robonomics-app-seed.png "Generating account seed")

它有两种形式： *Mnemonic* （可读的）和 *Raw* （一串数字和字母）。安全地保存种子短语并按下 `Next`.

> 您还可以更改创建帐户的加密类型，打开 `Advanced creation options` 并选择类型 (`ed25519` 在图片上).

![ed25519 crypto type account](../images/creating-an-account/ed-account.jpg)

在下一个菜单中，您需要设置帐户名称和密码，与上述扩展说明类似。

![Generating account name and password](../images/creating-an-account/2.3-robonomics-app-name-pass.png "Generating account name and password")

点击 `Next` 按钮带您进入最后一个窗口。点击 `Save` 完成帐户创建。它还将生成一个备份JSON文件，您应该安全地存储。如果您记得密码，以后可以使用此文件恢复您的帐户。

![Successful account creation](../images/creating-an-account/2.4-robonomics-app-account-created.png "Successful account creation")

## 2.3 将ed25519帐户添加到Polkadot扩展

您可能需要将创建的帐户添加到Polkadot.js扩展（对于ed25519帐户，您只能使用备份的JSON文件进行操作）。为此，您需要创建帐户的备份文件。点击您的帐户上的三个点，选择 `Create a backup file for this account` 并输入您的密码。

![Backup file](../images/creating-an-account/backup-file.jpg)

然后打开扩展并按下右上角的 `+` 按钮，然后选择 `Restore account from backup JSON file`.

![Restore backup in extension](../images/creating-an-account/extention-add-backup.jpg)

在打开的窗口中放入保存的文件，输入密码并按下 `Restore`.

![Restore backup in extension 2](../images/creating-an-account/file-backup.jpg)

## 3. 帐户创建成功 

现在您可以完全操作您新创建的帐户。发送和接收代币，消息，编写数据日志等。随意探索应用程序的所有功能。要复制您的帐户地址，只需点击其图标，地址将被复制到剪贴板。 

如果您想了解有关Polkadot / Kusama帐户以及创建它们的其他方法的更多信息，可以找到更多信息 [这里](https://wiki.polkadot.network/docs/learn-accounts) 和 [h这里](https://wiki.polkadot.network/docs/learn-account-generation).
