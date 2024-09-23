---
title: Robonomics Parachainのアカウントを作成する

contributors: [PaTara43, Fingerling42]
---

**Robonomics Parachainとやり取りし、操作するためには、開発者やユーザーはPolkadot / Substrate Portalでアカウントを作成する必要があります。アカウントは、ネットワークのために基本的な機能を提供します: あなたの公開ネットワークアドレス（公開鍵）、アドレスと資金へのアクセス制御（秘密鍵）、ネットワークへのトランザクションの送信、トークンとその量の表示などです。以下に、Robonomics Parachainのアカウントを作成する主な方法が2つ示されています。**

## 1. Polkadot{.js}ブラウザ拡張機能を使用する

Polkadot Extensionは、アカウントを生成し、Robonomics Parachainを含むすべてのPolkadot / Kusamaプロジェクトとやり取りする仕組みを提供します。これはアカウントを管理する最も安全な方法ではありませんが、セキュリティと使いやすさのバランスにおいて最も便利な方法です。

## 1.1. ブラウザ拡張機能をインストールする

ブラウザ拡張機能は[FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension)および[Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en)（およびChromiumベースのブラウザ）で利用可能です。

{% roboWikiPicture {src:"docs/creating-an-account/1.1-polkadot-extension.png", alt:"Browser Extension"} %}{% endroboWikiPicture %}

## 1.2. Robonomics Parachainアプリを開く

Polkadot / Substrate Portalの[Robonomics Parachainアプリ](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)に移動します。ポータルに初めて入った場合、ブラウザ拡張機能へのアクセスを要求されるので、アクセスを許可してください。

アプリを開いたら、左上隅を見てみてください。ネットワークの名前、そのアイコン、および最後のブロックの番号が表示されています。この領域をクリックすると、すべてのPolkadot / Kusamaネットワークのリストが表示されます。テストネットワークやローカルノードを含むネットワーク間を切り替えるには、必要なネットワークを選択して`Switch`ボタンを押します。 **必ず、Robonomics Parachainに接続されました**。

{% roboWikiPicture {src:"docs/creating-an-account/1.2-robonomics-app.png", alt:"Robonomics Parachain app"} %}{% endroboWikiPicture %}

## 1.3. 拡張機能メタデータとブラウザ内アカウント作成の更新

アプリが、接続しているチェーンに関する正しい情報を表示するために、拡張機能のメタデータを更新するよう求める可能性が非常に高いです。**Settings -> Metadata**に移動し、`Update metadata`ボタンを押し、その後、ポップアップウィンドウで拡張機能が更新を許可するようにします。

{% roboWikiPicture {src:"docs/creating-an-account/1.3-metadata-update.png", alt:"Updating metadata"} %}{% endroboWikiPicture %}

デフォルトでは、Webアプリケーションは外部アカウントのみで動作します。ブラウザ内で新しいアカウントを作成することを許可するには、**Settings -> General -> Account options -> in-browser account creation**に移動し、`Allow local in-browser account storage`を選択し、`Save`ボタンを押します。

{% roboWikiPicture {src:"docs/creating-an-account/1.3-in-browser-account-creation.png", alt:"Updating account creation in Browser"} %}{% endroboWikiPicture %}

## 1.4. 拡張機能でアカウントを作成

Polkadot{.js}ブラウザ拡張機能を開きます。大きなプラスボタンをクリックするか、右上の小さなプラスアイコンから`Create new account`を選択します。以下のメニューが表示され、12語の形式で生成されたニーモニックシードとアドレスが表示されます。

{% roboWikiPicture {src:"docs/creating-an-account/1.4-create-account-step-1.png", alt:"Account creation, step one"} %}{% endroboWikiPicture %}

シードはアカウントへの鍵です。シードを知っていると（またはシードを知っている他の誰かが）、このアカウントを制御したり、パスワードを忘れた場合に再作成したりすることができます。**安全な場所に保存することが非常に重要です**。可能であれば、紙や他の非デジタルデバイスに保存し、デジタルストレージやコンピュータに保存しないようにします。

シードを保存して`Next step`を押します。以下のメニューが表示されます。

{% roboWikiPicture {src:"docs/creating-an-account/1.5-create-account-step-2.png", alt:"Account creation, step two"} %}{% endroboWikiPicture %}


- *ネットワーク* このアカウントを独占的に使用するネットワークを選択できます。同じアドレスを複数のネットワークで使用することもできますが、プライバシー上の理由から、使用する各ネットワークごとに新しいアドレスを作成することが推奨されています。
ドロップダウンリストからRobonomicsネットワークを選択します。Robonomicsネットワークが見つからない場合は、おそらくメタデータを更新していない可能性が高いため、戻って更新してください。

	`アドレスの形式とアカウントアイコンが変わることに気づくでしょう — これは正常です。異なるネットワーク形式は、単なる同じ公開鍵の別の表現に過ぎません。`

- *名前* はアカウントの名前であり、あなた専用のものです。ブロックチェーンに保存されず、他のユーザーには表示されません。

- *パスワード* はアカウント情報を暗号化するために使用されます。ポータルで取引に署名する際に再入力が必要になります。パスワードを作成して覚えておいてください。

アカウントを作成した後、Polkadot{.js}拡張機能のアカウントリストに表示されます。3つの点をクリックすると、アカウントの名前を変更したり、エクスポートしたり、拡張機能から削除したり、アカウントで使用するネットワークを変更したりできます。

また、アカウントはポータルの**アカウント -> アカウント**メニューに表示され、拡張機能を使用して注入されたことが記載されます。

{% roboWikiPicture {src:"docs/creating-an-account/1.6-account-injected.png", alt:"アカウントの作成に成功"} %}{% endroboWikiPicture %}


## 2. Robonomics Parachainアプリで直接

Polkadot / Substrate Portal上のユーザーインターフェースを使用してアカウントを作成することができます。開発やテストに使用できます。

## 2.1. Robonomics Parachainアプリを開く

[Robonomics Parachainアプリ](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) にアクセスして、Polkadot / Substrate Portal上でRobonomics Parachainに接続されていることを左上隅で確認してください。

**アカウント -> アカウント**に移動し、`Add account`ボタンを押します。

{% roboWikiPicture {src:"docs/creating-an-account/2.1-robonomics-app-main-view.png", alt:"Robonomics Parachainアプリ"} %}{% endroboWikiPicture %}

## 2.2. アカウントを作成する

アカウントシードが表示されるポップアップメニューが表示されます。

{% roboWikiPicture {src:"docs/creating-an-account/2.2-robonomics-app-seed.png", alt:"アカウントシードの生成"} %}{% endroboWikiPicture %}

それには2つの形式があります: *ニーモニック*（人間が読める形式）と*Raw*（数字と文字のシーケンス）。シードフレーズを安全に保存して`次へ`を押してください。

> また、アカウントの作成時に暗号タイプを変更することもできます。そのためには`高度な作成オプション`を開き、タイプを選択してください（画像では`ed25519`）。

{% roboWikiPicture {src:"docs/creating-an-account/ed-account.jpg", alt:"ed25519 暗号タイプのアカウント"} %}{% endroboWikiPicture %}

次のメニューでは、アカウント名とパスワードを設定する必要があります。これは上記の拡張機能の手順と同様です。


{% roboWikiPicture {src:"docs/creating-an-account/2.3-robonomics-app-name-pass.png", alt:"アカウント名とパスワードの生成"} %}{% endroboWikiPicture %}

`次へ`ボタンをクリックすると、最後のウィンドウに移動します。`保存`をクリックしてアカウントの作成を完了します。これにより、安全に保存する必要があるバックアップJSONファイルも生成されます。後でこのファイルを使用してアカウントを復元できますが、その際にはパスワードを覚えている必要があります。

{% roboWikiPicture {src:"docs/creating-an-account/2.4-robonomics-app-account-created.png", alt:"アカウントの作成に成功"} %}{% endroboWikiPicture %}

## 2.3 ed25519アカウントをPolkadot拡張機能に追加する

作成したアカウントをPolkadot.js拡張機能に追加する必要があります（ed25519アカウントの場合、バックアップJSONファイルを使用してのみ可能です）。そのためには、アカウントのバックアップファイルを作成する必要があります。アカウント上の3つの点をクリックし、`このアカウントのバックアップファイルを作成`を選択し、パスワードを入力してください。

{% roboWikiPicture {src:"docs/creating-an-account/backup-file.jpg", alt:"バックアップファイル"} %}{% endroboWikiPicture %}

その後、拡張機能を開き、右上の`+`ボタンを押し、`バックアップJSONファイルからアカウントを復元`を選択してください。

{% roboWikiPicture {src:"docs/creating-an-account/extention-add-backup.jpg", alt:"拡張機能でのバックアップの復元"} %}{% endroboWikiPicture %}

開いたウィンドウに保存したファイルをドロップし、パスワードを入力して `Restore` を押してください。

{% roboWikiPicture {src:"docs/creating-an-account/file-backup.jpg", alt:"Restore backup in extension 2"} %}{% endroboWikiPicture %}

## 3. アカウントが正常に作成されました

これで新しく作成したアカウントをフルに操作できるようになりました。 トークンを送受信したり、メッセージを送ったり、データログを書いたりすることができます。 アプリのすべての機能を自由に探索してください。 アカウントのアドレスをコピーしたい場合は、そのアイコンをクリックするだけで、アドレスがクリップボードにコピーされます。

Polkadot / Kusama アカウントやそれらを作成する追加の方法について詳しく知りたい場合は、[こちら](https://wiki.polkadot.network/docs/learn-accounts) および [こちら](https://wiki.polkadot.network/docs/learn-account-generation) で詳細情報を見つけることができます。