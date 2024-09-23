---
title: サブスクリプションの購入方法

contributors: [LoSk-p, PaTara43]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**ブロックチェーン上の取引手数料を支払うのは面倒です。IoTデバイスが5〜10分ごとにテレメトリを送信すると想像してみてください。これにより、毎月かなりの金額がかかります。Robonomics Networkの主要な機能の1つは、RWS（Robonomics Web Service）のサブスクリプションです。毎月支払い、取引コストを忘れましょう！理論的な背景については、[こちら](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855)の記事を参照してください。**


{% roboWikiNote {title:"パラチェーン", type: "warning"}%}   このチュートリアルでは、Robonomics Kusamaパラチェーンでのサブスクリプションの購入方法を説明しています。[ローカルノード](/docs/run-dev-node)でも同じ手順を実行できます。
始める前にもう1つ。サブスクリプションの購入には「難しい」方法があります。[Robonomics DApp](https://dapp.robonomics.network/#/)を介しても同じ手順を実行できます。
{% endroboWikiNote %}

## オークションに入札する

Robonomicsのサブスクリプションはオークションモデルで販売されています。サブスクリプションを取得するには、オークションに入札して勝利する必要があります（心配はいりません、速いです）。

`Developer/Chain state`で利用可能なオークションを確認できます。
`rws`と`auctionQueue`を選択し、`+`ボタンを押すと、利用可能なオークションのIDが表示されます：

{% roboWikiPicture {src:"docs/rws/queue.png", alt:"queue"} %}{% endroboWikiPicture %}

`rws` `auction`およびオークションのID（画像のオークションIDは79です）で、任意のサブスクリプションの情報を確認できます：

{% roboWikiPicture {src:"docs/rws/auction.png", alt:"auction"} %}{% endroboWikiPicture %}

オークションの情報には`winner`フィールドが表示されます。現時点では`null`なので、誰もこのサブスクリプションを持っておらず、あなたが取得できます。そのためには、`Developer/Extrinsic`に移動し、アカウントを選択して`rws -> bid`を選択します。また、オークションID（79）と入札する単位の金額（1000000000 Wn以上）を設定します：

{% roboWikiPicture {src:"docs/rws/bid.png", alt:"bid"} %}{% endroboWikiPicture %}

取引を送信し、ID 79のオークションの情報を確認します（`Chain state`で`rws -> auction`およびID 79を選択）：

{% roboWikiPicture {src:"docs/rws/auc_win.png", alt:"auc_win"} %}{% endroboWikiPicture %}

これで`winner`フィールドにアカウントアドレスが表示され、このアカウントがサブスクリプション79を持っていることを意味します。オークションは最初の入札から始まり、数ブロック続きます。したがって、次の数ブロックで他の誰かがあなたよりも多くのトークンを入札した場合、その人が勝者となり、サブスクリプションを取得します。

これでデバイスを追加できます。デバイスはこのサブスクリプションを使用し、手数料なしでextrinsicsを送信できるアカウントです。
テストするために、トークンを持たない新しいアカウントを作成し、デバイスに追加します。

デバイスを追加するには、`Developer/Extrinsic`で`rws -> setDevices`を選択します。次に`Add Item`ボタンを押し、トークンを持たない最近作成したアカウントを選択します：

{% roboWikiPicture {src:"docs/rws/set_devices.png", alt:"set_devices"} %}{% endroboWikiPicture %}

取引を送信します。これで`Chain state`で`rws -> devices`を選択してデバイスのリストを確認できます。そこにはトークンを持たないアカウントのアドレスが表示されます。サブスクリプションを購入したアカウントを選択し、`+`を押します：

{% roboWikiPicture {src:"docs/rws/devices.png", alt:"devices"} %}{% endroboWikiPicture %}

これで、このサブスクリプションを使用して[起動を送信](/docs/subscription-launch)することができます。