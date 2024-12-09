---
title: サブスクリプションをアクティブ化
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.7.0
    https://github.com/airalab/robonomics.app
---

**この記事では、Robonomicsパラチェーンアカウントを作成し、IoTサブスクリプションを購入します。**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Home AssistantをRobonomicsで制御するには、Robonomicsパラチェーン上に2つのアカウントが必要です。1つのアカウント（`OWNER`）ではRobonomicsサブスクリプションを購入します。2番目のアカウント（`CONTROLLER`）はHome Assistantのすべてのプロセス（テレメトリなど）を制御し、他のユーザーにアクセス権を与えます。これらのアカウントはHome Assistantのセキュリティを提供します。

アカウントを持っていない場合は、この記事を確認して[OWNERアカウント](/docs/create-account-in-dapp/)を作成してください。コントローラーアカウントはセットアップ中に自動的に作成されます。

この記事では、アカウントを操作するために[Polkadot.js拡張機能](https://polkadot.js.org/extension/)ウォレットが使用されていますが、自分にとって便利な他のウォレットを使用することもできます。

## Robonomicsサブスクリプションをアクティブ化する

{% roboWikiNote {type:"OK"} %}

このステップでは、`OWNER`アカウントに十分な量のXRTトークン（最低2〜3 XRT）が必要です。

{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

1. Robonomics dAppに移動し、[購読ページ](https://robonomics.app/#/rws-buy)に移動します。次に、右サイドバーの`Connect Account`をクリックします。

2. 次のポップアップメニューで、Polkadot.js拡張機能を接続します。アカウントアドレスとその残高が表示されます。

3. 購入する前に、`OWNER`アカウントが選択されていることを確認してください。アドレスプロファイルアイコンをクリックし、`OWNER`アカウントが表示されるはずです。

4. 最後に、`BUY SUBSCRIPTION`ボタンをクリックしてアカウントのパスワードを入力します。アクティベーションプロセスが完了するまでお待ちください。しばらくすると、購読の状態が表示されます。

## サブスクリプションの設定

次に、`CONTROLLER`アカウントを追加してサブスクリプションを設定する必要があります。

{% roboWikiPicture {src:"docs/home-assistant/sub-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

1. Robonomics dAppに移動し、[サブスクリプションページの設定](https://robonomics.app/#/rws-setup)に移動します。**サブスクリプション設定**セクションに移動します。

2. `Controller's seed phrase`フィールドで、新しい`CONTROLLER`アカウントを作成するためにマジックワンドを押します。

3. ポップアップで`CONTROLLER`アカウントのパスワードを作成します。

4. 次のポップアップでは、新しいアカウントのアドレスとニーモニックシードフレーズが表示されます。ニーモニックシードフレーズは後で統合設定に必要になるため、安全に保存してください。さらに、`CONTROLLER`アカウントのJSONファイルがダウンロードされます。ウォレットにインポートすることができます。Polkadot.js拡張機能での方法は[こちら](/docs/create-account-in-dapp/)で見つけることができます。

{% roboWikiPicture {src:"docs/home-assistant/controller-create.jpg", alt:"controller create"} %}{% endroboWikiPicture %}

5. ポップアップを閉じて`SAVE`ボタンをクリックします。

## サブスクリプションにコントローラーアカウントを追加

次に、`CONTROLLER`アカウントを**アクセスリスト**に追加する必要があります。

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls']} %}{% endroboWikiVideo %}

1. RobonomicsのdAppに移動し、[サブスクリプション設定ページ](https://robonomics.app/#/rws-setup)に移動します。正しいサブスクリプションと`OWNER`アカウントが選択されていることを確認してください。

2. `CONTROLLER`アドレスをコピーします：拡張機能を開き、アカウント名の横にあるアイコンをクリックするか、**Subscription settings**セクションからアドレスをコピーします。

3. このアドレスを**USERS IN SUBSCRIPTION**セクションの`Polkadot address`フィールドに貼り付け、`+`ボタンをクリックします。

4. ポップアップウィンドウで`OWNER`アカウントのパスワードを入力し、アクティベーションプロセスが完了するのを待ちます。

以上です。次の記事に進んでください。