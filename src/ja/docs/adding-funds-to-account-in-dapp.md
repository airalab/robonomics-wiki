---
title: Robonomicsポータルでアカウントに資金を追加する方法

contributors: [Houman]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Robonomicsポータルでアカウントを作成した後、取引を開始できるように資金を追加する時が来ました。**

{% roboWikiNote {title: 'Dev Node', type: "warning"} %}これと後続のチュートリアルは、Robonomics Nodeのローカルインスタンスでデモンストレーションされています。[これらの手順](/docs/run-dev-node)に従って自分のものをセットアップしてください。
{% endroboWikiNote %}

## 1. Robonomicsポータルのアカウントセクションに移動する

{% roboWikiPicture {src:"docs/creating-an-account/portal-top-left.jpg", alt:"accounts"} %}{% endroboWikiPicture %}

## 2. 資金を送金したいアカウントを選択する

開発モードでは、それぞれに10000ユニットの資金がある複数のアカウントが存在し、これらのアカウントを使用して開発ネットワークで作成された他のアカウントに資金を送金できます。これらのアカウントは、横にレンチのサイン <img src="/assets/images/docs/adding-funds/wrench.png" alt="wrench sign" width="20"/> が付いています。

{% roboWikiPicture {src:"docs/adding-funds/accounts-for-sending.svg", alt:"Accounts-for-sending", caption: "Accounts-for-sending"} %}{% endroboWikiPicture %}

- 例えばBOBのアカウントから資金を送金したい場合は、そのアカウントの「送信」ボタンをクリックします

## 3. 資金を送金したいアカウントを選択する
「送信」ボタンをクリックすると、「資金送金ウィンドウ」が表示されます。表示されたウィンドウで：

- 利用可能なアカウントのリストから、資金を送金したいアカウントを選択します。
- 送金したいユニット数を入力します。
- 「送金を作成」を押します

{% roboWikiPicture {src:"docs/adding-funds/send-funds.png", alt:"Transfer-Funds", caption: "Transfer-Funds"} %}{% endroboWikiPicture %}

## 4. 取引を承認する

前の段階で「送金を作成」を押すと、「取引承認ウィンドウ」が表示されます。<br/>
取引の詳細を確認し、最終的に「署名して送信」ボタンをクリックします。

{% roboWikiPicture {src:"docs/adding-funds/sign-transaction.png", alt:"sign-transaction", caption: "sign-transaction"} %}{% endroboWikiPicture %}

この例では、「BOB」から「EMPLOYER」に500ユニットの資金を送金しました。最初は資金がなかったEMPLOYERのアカウントには、現在500ユニットの資金があることがわかります。

{% roboWikiPicture {src:"docs/adding-funds/funds-added.svg", alt:"funds-added", caption: "funds-added"} %}{% endroboWikiPicture %}

**プレイグラウンドで使用するアカウントに十分な資金があることを確認してください。**