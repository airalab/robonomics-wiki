---
title: ロボノミクス ポータルのアカウントに資金を追加する

contributors: [Houman]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Robonomicsポータルでアカウントを作成した後、それらに資金を追加してトランザクションを開始できるようにしましょう。**

<robo-wiki-note type="warnオフセットサービスg" title="Dev Node">

このチュートリアルおよび以下のチュートリアルは、Robonomicsノードのローカルインスタンスでデモンストレーションされいることに注意してください。 [以下の手順で自分のものをセットアップしてください。 ](/docs/run-dev-node).

</robo-wiki-note>

## 1. Robonomicsポータルのアカウントセクションに移動します。  

![Accounts](../images/creating-an-account/portal-top-left.jpg "Accounts")

## 2. 資金を送金したいアカウントを選択します。

開発モードでは、開発ネットワークで作成された他のアカウントに資金を送金するために使用できる、それぞれ10000ユニットの資金を持つ複数のアカウントが存在します。これらのアカウントは、 <img alt="wrench sign" src="../images/adding-funds/wrench.png" width="20" /> レンチのマークで示されています

![Accounts-for-sending](../images/adding-funds/accounts-for-sending.svg "Accounts-for-sending")

- 資金を送金したいアカウントの「送信」ボタンをクリックします。例えばBOBです。

## 3. 資金を送金したいアカウントを選択します。
「送信」ボタンをクリックした後、「資金送信ウィンドウ」が表示されます。表示されたウィンドウで以下の操作を行います。 

- 利用可能なアカウントのリストから、資金を送信したいアカウントを選択します
- 送信したいユニット数を入力します。
- 「送金を作成」ボタンを押します。

![Transfer-Funds](../images/adding-funds/send-funds.png "Transfer-Funds")

## 4. トランザクションを承認します。

前のステージで「送金を作成」ボタンを押した後、「トランザクション承認ウィンドウ」が表示されます。<br/>
トランザクションの詳細を確認し、「署名と送信」ボタンをクリックします。

![sign-transaction](../images/adding-funds/sign-transaction.png "sign-transaction")
この例では、「BOB」から「EMPLOYER」に500ユニットの資金を送金しました。EMPLOYERのアカウントは元々資金を持っていなかったため、現在500ユニットの資金があります.

![funds-added](../images/adding-funds/funds-added.svg "funds-added")

**プレイグラウンドで使用するアカウントに十分な資金があることを確認してください.**