---
title: ロボノミクスパラチェーンのアカウントを作成する

contributors: [PaTara43, Fingerling42]
---

**Robonomics Parachain と対話して操作するには、開発者とユーザーは Polkadot / Substrate Portal でアカウントを作成する必要があります。 アカウントはネットワークの基本的な機能を実行します: パブリック ネットワーク アドレス (公開キー)、アドレスと資金へのアクセス制御 (秘密キー)、ネットワークへのトランザクションの送信、トークンとその量の表示など。 ロボノミクス パラチェーンのアカウントを作成する 2 つの主な方法**

## 1. Polkadot{.js}ブラウザ拡張機能を使用する

Polkadot拡張機能は、Robonomicsパラチェーンを含むすべてのPolkadot / Kusamaプロジェクトとのアカウント生成とやり取りを提供します。これはアカウントを管理するための最も安全な方法ではありませんが、セキュリティ/使いやすさのバランスにおいて最も便利な方法です。

## 1.1. ブラウザ拡張機能のインストール

ブラウザ拡張機能は、 [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) そして [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) （クロムベースのブラウザを含む）で利用できます。

![Browser Extension](../images/creating-an-account/1.1-polkadot-extension.png "Browser Extension")

## 1.2. Robonomicsパラチェーンアプリを開く

に移動し、 [RobonomicsパラチェーンアプリをPolkadot / Substrateポータルで開きます。ポータルに初めて入った場合、ブラウザ拡張機能へのアクセスを要求されるので、アクセスを許可してください。](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) アプリを開いたら、左上の角に注目してください。ネットワークの名前、アイコンおよび最後のブロックの番号が表示されます。この領域をクリックすると、テストネットワークやローカルノードを含むすべてのPolkadot / Kusamaネットワークのリストが表示されます。必要なネットワークを選択し、 

アプリを開いたら、左上隅を見てください。 そこには、ネットワークの名前、そのアイコン、最後のブロックの番号が表示されます。 この領域をクリックすると、テスト ネットワークやローカル ノードを含む、すべての Polkadot/Kusama ネットワークのリストが開きます。 必要なネットワークを選択して `Switch`ボタンを押すと、ネットワークを切り替えることができます。 **今すぐ Robonomics Parachain に接続していることを確認してください**。 

![Robonomics Parachain app](../images/creating-an-account/1.2-robonomics-app.png "Robonomics Parachain app")

## 1.3. 拡張機能のメタデータを更新する

アプリは、接続しているチェーンに関する正しい情報を表示するために、拡張機能のメタデータを更新するように要求する可能性が高くなります。 **Settings -> Metadata** に移動し、「 `Update metadata` 」ボタンを押して、ポップアップ ウィンドウで拡張機能による更新を許可します。 

![Updating metadata](../images/creating-an-account/1.3-metadata-update.png "Updating metadata")

## 1.4. 拡張機能でアカウントを作成する 

Polkadot{.js} ブラウザ拡張機能を開きます。 大きなプラス ボタンをクリックするか、右上の小さなプラス アイコンから`Create new account` を選択します。 次のメニューが表示され、12 個の単語とアドレスの形式で生成されたニーモニック シードが表示されます。

![Account creation, step one](../images/creating-an-account/1.4-create-account-step-1.png "Account creation, step one")

シードはアカウントへのキーです。 シードを知っていれば、あなた (またはシードを知っている他の人) がこのアカウントを制御できるようになり、パスワードを忘れた場合でもアカウントを再作成できるようになります。 **安全な場所に保存することが非常に重要です**。デジタル ストレージやコンピュータではなく、できれば紙やその他の非デジタル デバイスに保存してください。 

種子を保存して押してください `Next step`. 次のメニューが表示されます。

![Account creation, step two](../images/creating-an-account/1.5-create-account-step-2.png "Account creation, step two")

- *Network* このアカウントが専用に使用されるネットワークを選択することができます。同じアドレスを複数のネットワークで使用することもできますが、プライバシーのために、使用すネットワークごとに新しいアドレスを作成することをお勧めします。 
ドロップダウンリストからRobonomicsネットワークを選択してください。Robonomicsネットワークが見つからない場合は、おそらくメタデータを更新していないためですので、戻って更新してください。

    - アドレスの形式とアカウントアイコンが変わることに気付くでしょう。これは正常です。異なるネットワーク形式は、同じ公開鍵の他の表現に過ぎません。 

- *Name* は、アカウントの名前であり、あなた自身のためだけのものです。ブロックチェーンには保存されず、他のユーザーには表示されません。 

- *Password* は、アカウントの情報を暗号化するために使用されます。ポータルでトランザクションに署名する際に再入力する必要があります。作成して覚えておいてください。

その結果、アカウントを作成した後、Polkadot{.js}拡張機能のアカウントリストに表示されます。3つの点をクリックすることで、アカウントの名前を変更したり、エクスポートしたり、拡張機能から削除したり、アカウントに使用するネットワークを変更したりすることができす。 

また、アカウントはポータルの **Accounts -> Accounts**  メニューに表示され、拡張機能を使用して挿入されたことがわかります。

![Successful account creation](../images/creating-an-account/1.6-account-injected.png "Successful account creation")


## ア2. ロボノミクスパラチェーンアプリ上で直接

Polkadot / Substrate Portal のユーザー インターフェイスを使用してアカウントを作成できます。 開発やテストに使用できます。

## 2.1. ロボノミクスパラチェーンアプリを開く

に行く [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) Polkadot / Substrate Portal で。 **左上隅で、ロボノミクス パラチェーンに接続されていることを確認してください**。

に行く **Accounts -> Accounts** そして`Add account` ボタンを押してください。

![Robonomics Parachain App](../images/creating-an-account/2.1-robonomics-app-main-view.png "Robonomics Parachain App")

## 2.2. アカウントを作成する

アカウント シードを含む次のポップアップ メニューが表示されるはずです。

![Generating account seed](../images/creating-an-account/2.2-robonomics-app-seed.png "Generating account seed")

それには2つの形式があります： *Mnemonic* （人が読める形式）と *Raw* （数字と文字のシーケンス）。シードフレーズを安全に保存し、 `Next`.

> ボタンを押してください。また、アカウントの作成に使用する暗号通貨のタイプを変更することもできます。そのたには、 `Advanced creation options` を開いて、 (`ed25519` を選択してください。).

![ed25519 crypto type account](../images/creating-an-account/ed-account.jpg)

次のメニューでは、アカウント名とパスワードを設定する必要があります。これは、拡張機能の指示に記載されている手順と同様です。

![Generating account name and password](../images/creating-an-account/2.3-robonomics-app-name-pass.png "Generating account name and password")

`Next` ボタンをクリックすると、最後のウィンドウに移動します。 `Click` をクリックしてアカウントの作成を完了します。 また、安全に保存する必要があるバックアップ JSON ファイルも生成されます。 パスワードを覚えている場合は、後でこのファイルを使用してアカウントを回復できます。

![Successful account creation](../images/creating-an-account/2.4-robonomics-app-account-created.png "Successful account creation")

## 2.3 ed25519アカウントをPolkadot拡張機能に追加する

作成したアカウントを Polkadot.js 拡張機能に追加する必要がある場合があります (ed25519 アカウントの場合は、バックアップ JSON ファイルでのみ追加できます)。 そのためには、アカウントのバックアップファイルを作成する必要があります。 アカウントの 3 つの点を押して、「このアカウントのバックアップ ファイルを作成する」を選択し、パスワードを入力します。

![Backup file](../images/creating-an-account/backup-file.jpg)

次に、拡張機能を開いて右上の「+」ボタンを押し、 `Restore account from backup JSON file` を選択します。

![Restore backup in extension](../images/creating-an-account/extention-add-backup.jpg)

 開いたウィンドウで保存したファイルをドロップし、パスワードを入力して`Restore`を押します。

![Restore backup in extension 2](../images/creating-an-account/file-backup.jpg)

## 3. アカウントの作成に成功しました 

これで新しく作成したアカウントをフルに操作することができます。トークンの送受信、メッセージの送信、データログの書き込みなどが可能です。アプリのすべての機能を自由に探索してください。アカウントのアドレスをコピーするには、そのアイコンをクリックするだけで、アドレスがクリップボードにコピーされます。 

Polkadot/Kusamaアカウントについてさらに詳しく知りたい場合や、それらを作成するための追加の方法については、詳細な情報が見つかります [ここ](https://wiki.polkadot.network/docs/learn-accounts) と [ここ](https://wiki.polkadot.network/docs/learn-account-generation).
