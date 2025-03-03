---
title: サブスクリプションの更新
contributors: [tubleronchik]
---

**このガイドは、Altruistの機能に不可欠なサブスクリプションの更新手順を説明します。**

## オーナーアカウントのインポート

ブラウザ拡張機能は、[FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) および [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en)（およびChromiumベースのブラウザ）で利用可能です。

{% roboWikiPicture {src:"docs/creating-an-account/1.1-polkadot-extension.png", alt:"ブラウザ拡張機能"} %}{% endroboWikiPicture %}

拡張機能を開き、右上の `+` ボタンをクリックします。その後、`既存のシードからアカウントをインポート` を選択します。

{% roboWikiPicture {src:"docs/creating-an-account/extention-add-backup.jpg", alt:"拡張機能にシードをインポート"} %}{% endroboWikiPicture %}

表示されるウィンドウで、Altruistセンサーの指示に従って提供されたシードを入力します。次に進み、アカウント名（例：`OWNER`）を設定し、パスワードを作成します。最後に、`提供されたシードでアカウントを追加` をクリックします。

## Robonomicsサブスクリプションの更新

{% roboWikiNote {type: "okay"} %}このステップを完了するには、`Robonomics Polkadot` アカウントに少なくとも2〜3 XRTトークンが必要です。{% endroboWikiNote %}

1) Robonomics dAppの[サブスクリプションページ](https://robonomics.app/#/rws-buy)に移動します。
2) **アカウント** をクリックしてウォレットを接続します。アカウントアドレスと残高が表示されます。

{% roboWikiPicture {src:"docs/altruist/renew_sub.jpg", alt:"サブスクリプションページ"} %}{% endroboWikiPicture %}

3) `RENEW SUBSCRIPTION` をクリックしてトランザクションに署名します。**アクティベーションプロセスが完了するまで待ちます**。
4) アクティベートされると、**セットアップページ** にリダイレクトされ、サブスクリプション名と有効期限が表示されます。

{% roboWikiPicture {src:"docs/altruist/sub_renewed.jpg", alt:"サブスクリプションセットアップページ"} %}{% endroboWikiPicture %}