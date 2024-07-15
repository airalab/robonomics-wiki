---
title: Adding funds to your account on Robonomics Portal

contributors: [Houman]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**After successfully creating your accounts on Robonomics portal, it is time to add funds to them so that you would be able to initiate transactions.**

{% roboWikiNote {title: 'Dev Node', type: "warning"} %}Please pay attention that this and following tutorials are demonstrated on a local instance of Robonomics Node. Set up yours with [these instructions](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Navigate to Accounts section on Robonomics portal

{% roboWikiPicture {src:"docs/creating-an-account/portal-top-left.jpg", alt:"accounts"} %}{% endroboWikiPicture %}

## 2. Choose the account you want to transfer funds from

In the development mode, there exist several accounts, with 10000 Units worth of funds each, that can be used to transfer funds to other accounts created in the development network. These accounts are indicated by wrench signs <img src="/assets/images/docs/adding-funds/wrench.png" alt="wrench sign" width="20"/> next to them.

{% roboWikiPicture {src:"docs/adding-funds/accounts-for-sending.svg", alt:"Accounts-for-sending", caption: "Accounts-for-sending"} %}{% endroboWikiPicture %}

- Click on the "send" button of the account you want to transfer funds from, for example BOB

## 3. Choose the account you want to transfer funds into
After clicking on the "send" button, you would be prompted with the "send funds window". In the prompted window:

- From the list of available accounts, choose the account you want to send funds into.
- Enter the number of Units you want to send.
- Press "make transfer"

{% roboWikiPicture {src:"docs/adding-funds/send-funds.png", alt:"Transfer-Funds", caption: "Transfer-Funds"} %}{% endroboWikiPicture %}


## 4. Authorize the transaction

After pressing "make transfer" in the previous stage, you would be prompted with "authorize transaction window".<br/>
Review the details of the transaction and finally click on "sign and submit" button.

{% roboWikiPicture {src:"docs/adding-funds/sign-transaction.png", alt:"sign-transaction", caption: "sign-transaction"} %}{% endroboWikiPicture %}

In this example, we transferred 500 units of funds from "BOB" to "EMPLOYER". You can see that EMPLOYER's account, which initially did not have any funds, has 500 Units of fund now.

{% roboWikiPicture {src:"docs/adding-funds/funds-added.svg", alt:"funds-added", caption: "funds-added"} %}{% endroboWikiPicture %}

**Make sure that you have enough funds in the accounts you want to use in the playground.**