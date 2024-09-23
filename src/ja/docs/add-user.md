---
title: ユーザーの追加

contributors: [nakata5321, Fingerling42, LoSk-p]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**この記事では、Home Assistantに新しいユーザーを設定する方法を紹介します。**

## サブスクリプションへのユーザーの追加

以前に作成したアカウントは使用できません。なぜなら、`OWNER`と`CONTROLLER`がセキュリティを提供し、最初にHome Assistantを起動したときに作成した最初のユーザーにはRobonomics Parachainアカウントがないからです。

{% roboWikiVideo {videos:[{src: 'QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. [前の記事](/docs/sub-activate/)で行ったようにRobonomicsパラチェーンにアカウントを作成します。

2. `OWNER`アカウントを使用して、[Robonomics DApp](https://robonomics.app/#/rws-setup)の`SETUP A SUBSCRIPTION`ページでサブスクリプションに新しいユーザーアカウントを追加します。これにより、`USERS IN SUBSCRIPTION`セクションにはアクセスリストに3つのアドレスが表示されます：`OWNER`、`CONTROLLER`、`USER`。


## RWSセットアップJSONファイル

まず、ユーザーはRWSセットアップの情報が記載されたJSONファイルを取得する必要があります。

### RWSセットアップJSONの作成

管理者は、[SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup)ページで`Download import for other users`ボタンを使用して、自分のセットアップのためのJSONファイルを作成できます。

{% roboWikiPicture {src:"docs/home-assistant/download_rws_setup_json.png", alt:"image"} %}{% endroboWikiPicture %}

### RWSセットアップのインポート

このJSONファイルを使用して、ユーザーは`IMPORT SETUP`ボタンを使用してRWSセットアップをインポートできます。

{% roboWikiVideo {videos:[{src: 'QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## ユーザーへのアクセス権の付与

同じページ（[SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup)）で、新しいユーザーのためのパスワードを設定できます。

{% roboWikiVideo {videos:[{src: 'Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 右側のサイドバーで作成したアカウントを選択します（意図したアカウントを選択したことをプロフィールアイコンを押して確認してください）。

2. 必要なフィールドに`USER`のアドレスとシードフレーズを入力します。

3. パスワードを入力し、その後`CREATE PASSWORD`ボタンを押してトランザクションを確認します。これにより、サブスクリプションのため手数料がかからなくなります。

4. 登録プロセスの後、ユーザーアドレスと新しく作成したパスワードを使用してHome Assistantにログインできます。

これで、Robonomicsを介して自宅を制御するためにDappを使用できるようになりました。[**"Get Smart Home Telemetry"**](/docs/smart-home-telemetry/)記事をチェックしてください。