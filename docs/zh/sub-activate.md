---
title: 订阅激活
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

在本文中，您将创建Robonomics空投账户并购买物联网订阅。 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


要使用Robonomics控制Home Assistant，您需要在Robonomics空投上拥有2个账户。其中一个账户（`sub_owner`）将购买Robonomics订阅。第二个账户（`sub_controller`）将控制所有Home Assistant进程（如测）并提供其他用户访问权限。这些账户将为您的Home Assistant提供安全保障。 

<robo-wiki-note type="warning" title="WARNING">

这两个帐户都必须使用 **ed25519** 加密创建。 因此，您需要使用 Polkadot-JS UI 创建一个帐户并选择所需的加密。

此功能在Polkadot-JS UI上默认禁用。要启用它，请导航到`Settings` -> `General` -> `account options`，并在下拉菜单`Allow local in-browser account storage`中选择`in-browser account creation`.

</robo-wiki-note>

## 创建所有者和控制者帐户

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQiJYPYajUJXENX2PzSJMSKGSshyWyPNqugSYxP5eCNvm', type:'mp4'}]" />

1. 打开[Robonomics空投应用](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)，进入Polkadot / Substrate Portal。**检查左上角以确保您已连接到Robonomics空投。**

2. 进入`Accounts` -> `Accounts`，点击`Add account`按钮。您将看到带有账户种子的弹出菜单。它有两种形式：*助记词*（可读）和*原始*（一串数字和字母）。 

3. 打开`Advanced creation options`，将创建账户的加密类型更改为“Edwards - ed25519”，然后点击`Next`。


4. 安全保存助记词种子短语，然后点击`Next`。

5. 在下一个菜单中，您需要设置账户名称和密码。为方便起见，给它取名为`sub_owner`。点击`Next`.

6. 在最后一个窗口中，点击`Save`以完成账户创建。它还将生成一个备份JSON文件，您应该安全地存储。如果您记得密码，以后可以使用此文件恢复您的账户。

7. 为名称为`sub_controller`的户重复这些步骤。


## 将账户添加到Polkadot.js

为了方便起见，您应该使用[Polkadot.js扩展](https://polkadot.js.org/extension/)并将这些新创建的账户添加到其中。对于ed25519账户，您只能使用备份的JSON文件来完成。您可以使用创建账户时保存的文件。

您可以通过创建账户的备份文件再次获取这些文件。点击您的账户上的三个点，选择`Create a backup file for this account` ，然后输入密码。

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmRd7gztUjWkLF4W2XuJwy5aXBwzNV2aPCU6CQQLvUpSNj', type:'mp4'}]" />

1. 打开扩展，点击右上角的“+”按钮，然后选择Restore account from backup JSON file`。

2. 在打开的窗口中上传JSON文件，输入密码，然后点击`Restore`.

3. 确保在Polkadot.js扩展中为账户选择了Robonomics网络。在Polkadot / Substrate Portal上，转到`Setting` -> `Metadata` ，然后点击`Update metadata`按钮。 

4. 在弹出窗口中确认元数据更新。现在扩展将显示用于该地址的网络标签。

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmT5sTNP9t8gpbD4RJJw6ETwG4wiziiChAh2uHHBk9Zsyd', type:'mp4'}]" />

## 激活Robonomics订阅 

<robo-wiki-note type="okay">

在此步骤中，您必须在`sub_owner`账户中拥有足够数量的XRT代币（最少2-3个XRT）。

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmXrFCajmJgkRDSbshGD3QehjnoyS6jafEPSjHdYkoBHum', type:'mp4'}]" />

1. 前往Robonomics dapp的[订阅页面](https://dapp.robonomics.network/#/subscription)，然后在右侧边栏点击“连接账户”。

2. 在接下来的弹出菜单中连接Polkadot.js扩展。您将看到带有余额的账户地址。

3. 在购买之前，请检查您选择了`sub_owner`账户。点击地址配置文件图标，您应该在`Check owner account`字段下看到`sub_owner`账户。

4. 最后，点击`SUBMIT`按钮并输入您的账户密码。然后等待激活过程完成。过一段时间后，您将看到订阅的状态。


## 将账户添加到订阅

现在您需要将“sub_controller”帐户添加到**访问列表**。

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmV1gkwtcXsWv54ov9tuXfcHg7nqs1foM8cRwts4sqnqtX', type:'mp4'}]" />

1. 打开扩展，并点击账户名称旁边的图标。它将复制账户地址。


2. 将此地址粘贴到**管理访问**部分的“Robonomics空投地址`Robonomics parachain address` +”按钮。 

3. 重复步骤1和2，为`sub_owner`账户执行。

4. 点击`Save`。在弹出窗口中输入您的`sub_owner`密码，然后等待激活过程完成。
