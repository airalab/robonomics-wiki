---
title: サブスクリプションを有効にする
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

この記事では、Robonomicsパラチェーンアカウントを作成し、IoTサブスクリプションを購入します。 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


Robonomicsを使用してHome Assistantを制御するには、Robonomicsパラチェーン上に2つのアカウントが必要です。1つのアカウント（`sub_owner`）ではRobonomicsのサブスクリプションを購入します。2番目のアカウント（`sub_controller`）ではHome Assistantのすべてのプロセス（テレメトリなど）を制御し、他のユーザーにアクセスを提供します。これらのアカウントはHome Assistantのセキュリティを提供します。 

<robo-wiki-note type="warning" title="WARNING">

どちらのアカウントも **ed25519** 暗号化を使用して作成する必要があります。 このため、Polkadot-JS UI を使用してアカウントを作成し、必要な暗号化を選択する必要があります。 

この機能はPolkadot-JS UIではデフォルトで無効になっています。有効にするには、`Settings` -> `General` -> `account options` に移動し、 `Allow local in-browser account storage` をドロップダウンメニュー`in-browser account creation` で選択します。

</robo-wiki-note>

## 所有者アカウントとコントローラーアカウントを作成する

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQiJYPYajUJXENX2PzSJMSKGSshyWyPNqugSYxP5eCNvm', type:'mp4'}]" />

1. [Robonomics Parachainアプリ](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)にアクセスします。**左上隅を確認して、Robonomics Parachainに接続されていることを確認してください。**

2. `Accounts` -> `Accounts` に移動し、`Add account` ボタンを押します。 アカウント シードを含むポップアップ メニューが表示されます。 これには、*Mnemonic* (人間が読める形式) と *Raw* (一連の数字と文字) の 2 つの形式があります。 

3. `Advanced creation options`を開き、アカウントの暗号タイプを`Edwards - ed25519`に変更し、`Next`を押します。


4. ニーモニックシードフレーズを安全に保存し、`Next`を押します。

5. 次のメニューで、アカウント名とパスワードを設定する必要があります。便宜のために`sub_owner`という名前を付けます。`Next`を押します。

6. 最後のウィンドウで`保存`をクリックしてアカウントの作成を完了します。また、バックアップのJSONファイルも生成されますので、安全に保存してください。パスワードを覚えている場合は、後でこのファイルを使用してアカウントを回復することができます。

7. `sub_controller`という名前のアカウントについても、これらの手順を繰り返します。


## Polkadot.jsにアカウントを追加する

便利のために、[Polkadot.js拡張機能](https://polkadot.js.org/extension/)を使用して、これらの新しく作成されたアカウントを追加する必要があります。ed25519アカウントの場合、バックアップJSONファイルのみを使用して行うことができます。アカウントを作成したときに保存したファイルを使用できます。

アカウントのバックアップファイを作成するには、アカウント上の3つのドットを押し、`Create a backup file for this account` を選択し、パスワードを入力します。

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmRd7gztUjWkLF4W2XuJwy5aXBwzNV2aPCU6CQQLvUpSNj', type:'mp4'}]" />

1. 拡張機能を開き、右上の`+`ボタンを押し、`Restore account from backup JSON file` を選択します。

2. 開いたウィンドウでJSONファイルをアップロードし、パスワードを入力して `Restore` を押します。

3. Polkadot.js拡張機能のアカウントにRobonomicsネットワークが選択されていることを確認してください。Polkadot / Substrate Portalで`Setting` -> `Metadata` に移動し、`Update metadata` ボタンをクリックします。 

4. ポップアップでメタデータの更新を確認します。これで、拡張機能はアドレスが使用されるネットワークのラベルを表示します。

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmT5sTNP9t8gpbD4RJJw6ETwG4wiziiChAh2uHHBk9Zsyd', type:'mp4'}]" />

## Robonomicsサブスクリプションを有効にする 

<robo-wiki-note type="okay">

この手順では、`sub_owner`アカウントに十分な量のXRTトークン（最小2-3 XRT）が必要です。

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmXrFCajmJgkRDSbshGD3QehjnoyS6jafEPSjHdYkoBHum', type:'mp4'}]" />

1. RobonomicsのDappにアクセスし、[サブスクリプションページ](https://dapp.robonomics.network/#/subscription)に移動し、右サイドバーの「アカウントに接続」を押します。

2. 次のップアップメニューでPolkadot.js拡張機能に接続します。アカウントアドレスと残高が表示されます。

3. 購入する前に、`sub_owner`アカウントを選択したことを確認してください。アドレスプロファイルアイコンを押すと、`Check owner account` フィールドの下に`sub_owner`アカウントが表示されるはずです。

4. 最後に、「SUBMIT」ボタンを押し、アカウントのパスワードを入力します。その後、アクティベーションプロセスが完了するまで待ちます。しばらくすると、サブスクリプションの状態が表示されます。


## サブスクリプションにアカウントを追加する

次に、`sub_controller` アカウントを **アクセス リスト** に追加する必要があります。

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmV1gkwtcXsWv54ov9tuXfcHg7nqs1foM8cRwts4sqnqtX', type:'mp4'}]" />

1. 拡張機能を開き、アカウント名の近くのアイコンをクリックします。これにより、アカウントアドレスがコピーされます。


2. このアドレスを**アクセスの管理**部分の`Robonomics parachain address` フィールドに貼り付けます。名前を付けて、「+」ボタンを押します。 

3. `sub_owner`アカウントについても、手順1と2を繰り返します。

4. `Save`を押します。ポップアップウィンドウで`sub_owner`のパスワードを入力し、アクティベーションロセスが完了するまで待ちます。
