---
title: アルトルイストのセットアップ
contributors: [tubleronchik]
---

**このガイドでは、アルトルイストアウトドアセンサーの設定とアクティベーションの手順を説明します。センサーをWi-Fiに接続し、その位置を設定し、XRTトークンを使用してサブスクリプションをアクティベートします。さらに、HACSまたは手動インストールを介してHome Assistantとセンサーを統合する手順も提供されています。**

{% roboWikiNote {type: "warning"}%} Robonomicsのすべてのデバイスは公式[ウェブサイト](https://robonomics.network/devices/)で購入できます。{% endroboWikiNote %}

## Robonomicsサブスクリプションのアクティベート

{% roboWikiNote {type: "okay"} %}このステップを完了するには、`Robonomics Polkadot`アカウントに少なくとも2〜3 XRTトークンがあることを確認してください。{% endroboWikiNote %}

1) Robonomics dAppの[サブスクリプションページ](https://robonomics.app/#/rws-buy)に移動します。
2) **アカウント**をクリックしてウォレットを接続します。アカウントアドレスと残高が表示されます。
アカウントを持っていない場合は、[このガイド](https://wiki.robonomics.network/docs/create-account-in-dapp/)に従って作成してください。

{% roboWikiPicture {src:"docs/altruist/altruist_syb_buy.jpg", alt:"サブスクリプションページ"} %}{% endroboWikiPicture %}

3) `BUY SUBSCRIPTION`をクリックしてトランザクションに署名します。**アクティベーションプロセスが完了するのを待ちます**。
4) アクティベートが完了すると、**セットアップページ**にリダイレクトされ、サブスクリプション名と有効期限が表示されます。

{% roboWikiPicture {src:"docs/altruist/altruist_setup_page.jpg", alt:"サブスクリプション設定ページ"} %}{% endroboWikiPicture %}

5) **アカウントアドレスを保存する** — センサーのセットアップ時に必要です。「OWNER」セクションからコピーするか、右上のアカウント名をクリックしてコピーを選択してください。

## センサーのセットアップ

{% roboWikiNote {type: "warning", title: "INFO"}%} センサーは2.4GHzのWi-Fiネットワークにのみ接続できます。{% endroboWikiNote %}

1) **センサーを電源ソケットに接続する**。
2) ボードはAltruist-xxxxxxxxxという名前のWi-Fiネットワークを作成します。スマートフォンまたはコンピュータから接続してください。自動的に認証ウィンドウが開くはずです。
- 開かない場合は、ブラウザを開いて192.168.4.1にアクセスしてください。

{% roboWikiPicture {src:"docs/altruist/on_board.png", alt:"altruist-sensor"} %}{% endroboWikiPicture %}

3) **Wi-Fi設定を構成する**:
- リストからWi-Fiネットワークを選択するか、表示されない場合は手動で入力してください。
- 「WI-FI SETTINGS」フィールドにパスワードを入力してください。

4) **Robonomicsの詳細を入力する**:
- 先ほどコピーしたRWSオーナーアドレスを指定されたフィールドに貼り付けてください。

5) **センサーの位置を設定する**:
- センサーの設置場所の座標を入力してください。
- オンラインマップを使用して座標を見つけるか、[このリンク](https://www.latlong.net/convert-address-to-lat)を使用して住所を緯度/経度に変換できます。-long.html)

{% roboWikiNote {type: "warning", title: "警告"}%}センサーの座標は、公開されている地図上に表示されます。プライベート情報を表示したくない場合は、正確ではなく近い座標を記入してください。{% endroboWikiNote %}

{% roboWikiPicture {src:"docs/altruist/sensor_setup.png", alt:"altruist-sensor-wifi"} %}{% endroboWikiPicture %}

6) **Altruistの「Robonomicsアドレス」をコピー**:
- ページの上部に表示されます。最終ステップのために保存してください。

{% roboWikiPicture {src:"docs/altruist/address.jpg", alt:"altruist address"} %}{% endroboWikiPicture %}

7) ページの下部にある「**設定を保存して再起動**」をクリックします。ボードは再起動し、指定されたWi-Fiネットワークに接続します。

## Altruistの有効化
セットアッププロセスの最終ステップは、**Altruistアドレス**を**Robonomicsサブスクリプション**に追加することです。

1) [セットアップページ](https://robonomics.app/#/rws-setup)に戻ります。

2) 「**サブスクリプションのユーザー**」セクションまでスクロールします。

3) 「**ユーザーを追加**」フィールドに、先ほどコピーした**Altruist Robonomicsアドレス**を貼り付けます。

{% roboWikiPicture {src:"docs/altruist/add_user.jpg", alt:"add user"} %}{% endroboWikiPicture %}

4) **プラス（+）ボタン**をクリックし、メッセージに署名します。

5) 操作が完了するのを待ちます。

これで完了です！セットアップが完了しました。は完了しました。🎉

[Robonomics Sensors Social](https://sensors.social/#) マップであなたのAltruistを見つけることができます。🚀

{% roboWikiPicture {src:"docs/altruist/map.jpg", alt:"センサーマップ"} %}{% endroboWikiPicture %}

## Home Assistant

**Altruist**を**Home Assistant**に追加する方法は2つあります：

### オプション1: HACS (推奨)

**Altruist**を追加する最も簡単な方法は**HACS**を通じてです。簡単なセットアップガイドは[こちら](https://hacs.xyz/docs/use/)で見つけることができます。

**手順**:
1) HACSがインストールされたら、それを開きます。

2) 右上の**三つの点**をクリックし、"**Custom repositories**"を選択します。

3) ポップアップウィンドウで、次のURLを入力します：

```
https://github.com/airalab/altruist-homeassistant-integration
```
4) タイプを"**Integration**"に設定し、"**ADD**"をクリックします。

{% roboWikiPicture {src:"docs/altruist/hacs.jpg", alt:"altruist-add"} %}{% endroboWikiPicture %}

5) **Altruist Sensor**インテグレーションを検索します。

6) **ダウンロード**ボタンをクリックし、インテグレーションがインストールされたら**Home Assistant**を再起動します。

{% roboWikiPicture {src:"docs/altruist/integration.jpg", alt:"altruist-hacs"} %}{% endroboWikiPicture %}

### オプション2: 手動インストール

1) `homeassistant`ユーザーの下で、プロジェクトリポジトリをクローンします：

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/airalab/altruist-homeassistant-integration.git
```

{% endcodeHelper %}

2) すでにカスタム統合がある場合は、`altruist` フォルダを `custom_components` ディレクトリに移動します:

{% codeHelper { copy: true}%}

```
cd altruist-homeassistant-integration
mv custom_components/altruist ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

3) カスタム統合が**ない**場合は、カスタムコンポーネントディレクトリ全体を移動します:

{% codeHelper { copy: true}%}

 ```
cd altruist-homeassistant-integration
mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## 設定

インストールとHome Assistantの再起動後、ネットワーク上のAltruistが自動的に検出されます。

1) **設定 → デバイスとサービス** に移動します。

2) **Altruistセンサー** を追加します。

{% roboWikiPicture {src:"docs/altruist/add_altruist.jpg", alt:"discover altruist"} %}{% endroboWikiPicture %}

これで完了です！🚀 あなたのAltruistセンサーはHome Assistantと統合されました。