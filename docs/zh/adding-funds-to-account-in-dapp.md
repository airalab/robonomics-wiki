---
title: 在 Robonomics 门户上向您的账户添加资金
contributors: [Houman]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**在成功创建您的Robonomics门户帐户之后，现在是时候为它们添加资金，以便您能够发起交易了。**

<robo-wiki-note type="warn在部分中，超时是以秒为单位的，它将创建包含以下信息的数据日志：g" title="Dev Node">

请注意，此教程及其后续教程是在Robonomics节点的本地实例上演示的。请按照以下说明设置您[自己的实例](/docs/run-dev-node).

</robo-wiki-note>

## 。1. 在Robonomics门户的“帐户”部分导航。 

![Accounts](../images/creating-an-account/portal-top-left.jpg "Accounts")

## 2. 择您想要从中转移资金的帐户 

在开发模式下，存在几个帐户，每个帐户都有10000个单位的资金，可以用于向开发网络中创建的其他帐户转移资金。这些帐户旁边有扳手标志。  <img alt="wrench sign" src="../images/adding-funds/wrench.png" width="20" /> 

![Accounts-for-sending](../images/adding-funds/accounts-for-sending.svg "Accounts-for-sending")

- 点击您想要从中转移资金的帐户的“发送”按钮，例如BOB。

## 3. 选择您想要将资金转移到的帐户。
点击“发送”按钮后，您将收到“发送资金窗口”的提示。在提示窗口中：

- 从可用帐户列表中选择您想要发送资金的帐户。
- 输入您想要发送的单位数量。
- 按下“进行转账”。

![Transfer-Funds](../images/adding-funds/send-funds.png "Transfer-Funds")

## 4. 授权交易。

在前一阶段按下“进行转账”后，您将收到“授权交易窗口”的提示。<br/>
查看交易的详细信息，最后点击“签名并提交”按钮。

![sign-transaction](../images/adding-funds/sign-transaction.png "sign-transaction")

在此示例中，我们将500个单位的资金从“BOB”转移到“EMPLOYER”。您可以看到EMPLOYER的帐户最初没有任何资金，现在有500个单位的资金。

![funds-added](../images/adding-funds/funds-added.svg "funds-added")

**确保您在游乐场中要使用的帐户中有足够的资金。.**