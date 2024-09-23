---
title: サブスクリプションを使用してローンチを送信する方法

contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"パラチェーン", type: "warning"}%}このチュートリアルでは、Robonomics Kusamaパラチェーンでサブスクリプションを使用する方法を示しています。[ローカルノード](/docs/run-dev-node)でも同じ手順を実行できます。{% endroboWikiNote %}

アクティブなサブスクリプションを持つアドレスの場合、そのアカウントのシークレットで設定されたデバイスは手数料なしでエクストリンシックを送信できます。
`launch`コマンドを送信してみましょう。

`Developer/Extrinsics`ページに移動し、アカウント（デバイスリストからの1つ）を選択し、`rws -> call(subscriptionId, call)`を選択します。
次に、`subscriptionId`フィールドにサブスクリプションの所有者アドレス（オークションに入札した人）を貼り付け、次のフィールドに
`launch -> launch(robot, param)`を選択します。`robot`フィールドには`launch`トランザクションを送信したいアドレスを入力し、コマンドを挿入します（launchコマンドの説明については[こちら](/docs/launch)を参照してください）。その後、トランザクションを送信します：

{% roboWikiPicture {src:"docs/rws/launch.png", alt:"launch"} %}{% endroboWikiPicture %}

次に、`Network/Explorer`ページに移動し、`Recent Events`エリアに作成した2つのイベント、`rws.NewCall`と`launch.NewLaunch`が表示されます。

{% roboWikiPicture {src:"docs/rws/events.png", alt:"events"} %}{% endroboWikiPicture %}