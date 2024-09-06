---
title: サブスクリプションをアクティブ化
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp
    https://github.com/airalab/robonomics.app
---

この記事では、Robonomicsパラチェーンアカウントを作成し、IoTサブスクリプションを購入します。

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Home AssistantをRobonomicsで制御するには、Robonomicsパラチェーン上に2つのアカウントが必要です。1つのアカウント（`OWNER`）ではRobonomicsサブスクリプションを購入します。2番目のアカウント（`CONTROLLER`）はHome Assistantのすべてのプロセス（テレメトリなど）を制御し、他のユーザーにアクセスを提供します。これらのアカウントはHome Assistantのセキュリティを提供します。

{% roboWikiNote {title:"警告", type: "warning"}%}
両方のアカウントは**ed25519**暗号化で作成する必要があります。そのため、Polkadot-JS UIを使用してアカウントを作成し、必要な暗号化を選択する必要があります。

この機能はPolkadot-JS UIではデフォルトで無効になっています。有効にするには、`Settings` -> `General` -> `account options`に移動し、`in-browser account creation`のドロップダウンメニューで`Allow local in-browser account storage`を選択してください。
{% endroboWikiNote %}

## オーナーおよびコントローラーアカウントの作成

{% roboWikiVideo {videos:[{src: 'QmajeEV4adqR2DCaBJPZhH6NR74eHaRmvCcbeQtnLm7Kcc', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. [Robonomics Parachainアプリ](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)にアクセスします。**左上隅を確認して、Robonomics Parachainに接続されていることを確認してください。**

2. `Accounts` -> `Accounts`に移動し、`Add account`ボタンを押します。アカウントシードが記載されたポップアップメニューが表示されます。それには2つの形式があります：*ニーモニック*（人間が読める形式）と*Raw*（数字と文字のシーケンス）。

3. `高度な作成オプション`を開き、作成中のアカウントの暗号タイプを`Edwards - ed25519`に変更して`次へ`を押します。

4. ニーモニックシードフレーズを安全に保存して`次へ`を押します。

5. 次のメニューで、アカウント名とパスワードを設定する必要があります。便宜上、`OWNER`と名前を付けて`次へ`を押します。

6. 最終ウィンドウで`保存`をクリックしてアカウントの作成を完了します。これにより、安全に保存する必要があるバックアップJSONファイルも生成されます。後でパスワードを思い出した場合には、このファイルを使用してアカウントを回復できます。

7. `CONTROLLER`という名前のアカウントを作成するには、これらの手順を繰り返します。


## Polkadot.jsにアカウントを追加

便宜上、[Polkadot.js拡張機能](https://polkadot.js.org/extension/)を使用して、これらの新しく作成されたアカウントを追加することをお勧めします。ed25519アカウントの場合、バックアップJSONファイルのみを使用してこれを行うことができます。アカウントを作成したときに保存したファイルを使用できます。

アカウントのバックアップファイルを作成してこれらのファイルを再取得することができます。アカウントの横にある3つの点をクリックし、`このアカウントのバックアップファイルを作成`を選択し、パスワードを入力します。

{% roboWikiVideo {videos:[{src: 'Qmc5LcbLSdVCUubLomUUo5Qxrxb2xaixpwUFqnpj2C9iM5', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 拡張機能を開き、右上の`+`ボタンを押し、`バックアップJSONファイルからアカウントを復元`を選択します。

2. 開いたウィンドウで、JSONファイルをアップロードし、パスワードを入力して`復元`を押します。

3. Polkadot.js拡張機能のアカウントにRobonomicsネットワークが選択されていることを確認してください。Polkadot / Substrate Portalで`設定` -> `メタデータ`に移動し、`メタデータを更新`ボタンをクリックします。

4. ポップアップでメタデータの更新を確認します。拡張機能は、アドレスが使用されているネットワークのラベルを表示します。## Robonomicsサブスクリプションをアクティブ化

{% roboWikiNote {type: "okay"}%} このステップでは、`OWNER`アカウントにXRTトークン（最低2〜3 XRT）を十分に保有している必要があります。 {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Robonomics dAppに移動し、[サブスクリプションページ](https://robonomics.app/#/rws-buy)に移動します。次に、右サイドバーの`Connect Account`をクリックします。

2. 次のポップアップメニューで、Polkadot.js拡張機能を接続します。アカウントアドレスとその残高が表示されます。

3. 購入する前に、`OWNER`アカウントが選択されていることを確認してください。アドレスプロファイルアイコンをクリックすると、`OWNER`アカウントが表示されます。

4. 最後に、`BUY SUBSCRIPTION`ボタンをクリックしてアカウントのパスワードを入力します。アクティベーションプロセスが完了するまでお待ちください。しばらくすると、サブスクリプションの状態が表示されます。

## サブスクリプションの設定

次に、`CONTROLLER`アカウントを追加してサブスクリプションを設定する必要があります。

{% roboWikiVideo {videos:[{src: 'Qmd5P356UE1yDLAd4uSdq1dERbyp5gk5wpWD3iENNt2mjV', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Robonomics dAppに移動し、[サブスクリプションページを設定](https://robonomics.app/#/rws-setup)します。**GENERAL SETTINGS**セクションに移動します。

2. `Controller's seed phrase`フィールドからシードフレーズを削除し、`CONTROLLER`アカウントのシードフレーズを入力します。

3. `CONTROLLER`アドレスをコピーします：拡張機能を開いて、アイコンをクリックします。アカウント名。

4. このアドレスを`Controller`フィールドに貼り付け、`SAVE`ボタンをクリックします。

## サブスクリプションにアカウントを追加

次に、`CONTROLLER`アカウントを**アクセスリスト**に追加する必要があります。

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Robonomics dAppに移動し、[サブスクリプションの設定ページ](https://robonomics.app/#/rws-setup)に移動します。正しいサブスクリプションと`OWNER`アカウントを選択していることを確認してください。

2. `CONTROLLER`アドレスをコピーします：拡張機能を開き、アカウント名の横にあるアイコンをクリックします。

3. このアドレスを**サブスクリプションのユーザー**セクションの`Polkadot address`フィールドに貼り付け、`+`ボタンをクリックします。

4. ポップアップウィンドウで`OWNER`アカウントのパスワードを入力し、アクティベーションプロセスが完了するのを待ちます。