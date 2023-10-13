---
title: サブスクリプションを使用して起動を送信する方法

contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="warning" title="Parachain">

  このチュートリアルでは、Robonomics Kusamaパラチェーンでサブスクリプションを使用する方法を示しています。同じ手順を[ローカルノード](/docs/run-dev-node)でも実行できます。

</robo-wiki-note>

アドレスにアクィブなサブスクリプションがある場合、そのアカウントのシークレットで設定されたデバイスは手数料なしでエクストリンシックを送信できます。 
`launch`コマンドを送信してみましょう。

`Developer/Extrinsics`ページに移動し、アカウント（デバイスリストからのアカウント）を選択し、`rws -> call(subscriptionId, call)`を選択します。 
次に、`subscriptionId`フィールドにサブスクリプションの所有者アドレス（オークションに入札したアドレス）を貼り付け、次のフィールドで`launch -> launch(robot, param)`を選択します。`robot`フィールドには`launch`トランザクションを送信したいアドレスを入力し、コマンドを挿入します（起動コマンドの説明については[こちら](/docs/launch)を参照してください）。その後、トランザクションを送信します。

![launch](../images/rws/launch.png)


今、`Network/Explorer`ページに移動し、`Recent Events`エリアに作成した2つのイベント、`rws.NewCall`と`launch.NewLaunch`が表示されます。

![events](../images/rws/events.png)
