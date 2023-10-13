---
title: サブスクリプションの購入方法

contributors: [LoSk-p, PaTara43]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**ブロックチェーン上の取引に手数料を支払うのは面倒です。IoTデバイスが5〜10分ごとにテレメトリを送信することを想像してみてください。これにより、毎月かなりの費用がかかります。Robonomics Networkの主な特の1つは、RWS（Robonomics Web Service）サブスクリプションです。毎月支払い、取引コストを忘れましょう！理論的な背景については、[こちら](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855)の記事を参照してください。**

<robo-wiki-note type="warning" title="Parachain">

  始める前に注意してください。このチュートリアルでは、Robonomics Kusamaパラチェーンでのサブスクリプションの購入方法を示しています。同じ手順を[ローカルノード](/docs/run-dev-node)でも実行できます。

  始める前にもう一つ。サブスクリプションを購入するための「困難な」方法です。[Robonomics DApp](https://dapp.robonomics.network/#/)を介して通常の方法で行うこともできます。

</robo-wiki-note>

## オークションに入札する

Robonomicsのサブスクリプションはオークションモデルで販売されています。サブスクリプションを入手するには、オークションに入札して勝つ必要があります（心配しないで、すばやいです）。

`Developer/Chain state`で利用可能なオークションを確認できます。 
`rws`と`auctionQueue`を選択し、`+`ボタンを押すと、利用可能なオークションのIDが表示されます。

![queue](../images/rws/queue.png)

オークションの情報は`rws` `auction`とオークションのIDで確認できます（画像のオークションのIDは79です）。

![auction](../images/rws/auction.png)

オークションの情報では、`winner`フィールドを見ることができます。現時点では`null`なので、誰もこのサブスクリプションを持っていません。入手することができます。そのためには、`Developer/Extrinsic`に移動し、アカウントと`rws -> bid`を選択します。また、オークションID（79）と入札する単位の量（1000000000 Wn以上）を設定します。

![bid](../images/rws/bid.png)

トランザクションを送信し、ID 79のオークションの情報を確認します（`Chain state`で`rws -> auction`とID 79を選択します）。

![win](../images/rws/auc_win.png)

今、`winner`フィールドにはあなたのアカウントアドレスが表示されます。これは、このアカウントがサブスクリプション79を持っていることを意味します。オークションは最初の入札で始まり、数ブロック続きます。次の数ブロックであなたよりも多くのトークンを入札する人が勝者となり、サブスクリプションを取得します。

これでデバイスを追加できます。デバイスは、このサブスクリプションを使用してエクストリンシックを手数料なしで送信できるアカウントす。
テストするには、トークンなしで新しいアカウントを作成し、デバイスに追加します。 

デバイスを追加するには、`Developer/Extrinsic`で`rws -> setDevices`を選択します。その後、`Add Item`ボタンを押して、トークンを持たない最近作成されたアカウントを選択します。

![set_devices](../images/rws/set_devices.png)

トランザクションを送信します。これで、`Chain state`の`rws -> devices`でデバイスのリストを確認できます。そこには、トークンを持たないアカウントのアドレスが表示されます。サブスクリプションを購入したアカウントを選択し、`+`を押します。

![devices](../images/rws/devices.png)

これで、サブスクリプションを使用して[起動を送信](/docs/subscription-launch)することができます。