---
title: 在Robonomics门户上为您的账户添加资金

contributors: [Houman]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**成功在Robonomics门户上创建账户后，现在是时候为它们添加资金，以便您能够发起交易。**

{% roboWikiNote {title: '开发节点', type: "warning"} %}请注意，这篇以及后续的教程是在Robonomics节点的本地实例上演示的。请按照[这些说明](/docs/run-dev-node)设置您自己的节点。
{% endroboWikiNote %}

## 1. 在Robonomics门户上导航至账户部分

{% roboWikiPicture {src:"docs/creating-an-account/portal-top-left.jpg", alt:"accounts"} %}{% endroboWikiPicture %}

## 2. 选择要从中转账资金的账户

在开发模式下，存在几个账户，每个账户都有价值10000单位的资金，可以用来向开发网络中创建的其他账户转账。这些账户旁边有扳手标志 <img src="/assets/images/docs/adding-funds/wrench.png" alt="扳手标志" width="20"/>。

{% roboWikiPicture {src:"docs/adding-funds/accounts-for-sending.svg", alt:"Accounts-for-sending", caption: "Accounts-for-sending"} %}{% endroboWikiPicture %}

- 点击要从中转账资金的账户的“发送”按钮，例如BOB

## 3. 选择要转账资金的账户
点击“发送”按钮后，将弹出“发送资金窗口”。在弹出的窗口中：

- 从可用账户列表中选择要发送资金的账户。
- 输入您要发送的单位数量。
- 点击“进行转账”

{% roboWikiPicture {src:"docs/adding-funds/send-funds.png", alt:"Transfer-Funds", caption: "Transfer-Funds"} %}{% endroboWikiPicture %}

## 4. 授权交易

在前一阶段点击“进行转账”后，将弹出“授权交易窗口”。<br/>
查看交易详情，最后点击“签名并提交”按钮。

{% roboWikiPicture {src:"docs/adding-funds/sign-transaction.png", alt:"sign-transaction", caption: "sign-transaction"} %}{% endroboWikiPicture %}

在这个例子中，我们从“BOB”向“EMPLOYER”转移了500单位的资金。您可以看到EMPLOYER的账户，最初没有任何资金，现在有了500单位的资金。

{% roboWikiPicture {src:"docs/adding-funds/funds-added.svg", alt:"funds-added", caption: "funds-added"} %}{% endroboWikiPicture %}

**确保您在游乐场中要使用的账户中有足够的资金。**