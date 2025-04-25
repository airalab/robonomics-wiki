---
title: Altruist セットアップ
contributors: [tubleronchik]
---

**このガイドでは、Altruist Outdoor センサーのセットアップとアクティベーションの手順を説明します。センサーをWi-Fiに接続し、その位置を設定し、XRTトークンを使用してサブスクリプションをアクティベートします。さらに、HACSまたは手動インストールを介してHome Assistantとセンサーを統合するための手順も提供されています。**

{% roboWikiNote {type: "warning"}%} Robonomicsのすべてのデバイスは、公式[ウェブサイト](https://robonomics.network/devices/)で購入できます。{% endroboWikiNote %}

## Robonomics サブスクリプションのアクティベート

{% roboWikiNote {type: "okay"} %}このステップを完了するには、`Robonomics Polkadot`アカウントに少なくとも2〜3 XRTトークンがあることを確認してください。{% endroboWikiNote %}

1) Robonomics dAppの[サブスクリプションページ](https://robonomics.app/#/rws-buy)に移動します。
2) **アカウント**をクリックしてウォレットを接続します。アカウントアドレスと残高が表示されます。
アカウントをお持ちでない場合は、[このガイド](https://wiki.robonomics.network/docs/create-account-in-dapp/)に従って作成してください。

{% roboWikiPicture {src:"docs/altruist/altruist_syb_buy.jpg", alt:"サブスクリプションページ"} %}{% endroboWikiPicture %}

3) `BUY SUBSCRIPTION`をクリックしてトランザクションに署名します。**アクティベーションプロセスが完了するのを待ちます**。
4) アクティベートが完了すると、**セットアップページ**にリダイレクトされ、サブスクリプション名と有効期限が表示されます。

{% roboWikiPicture {src:"docs/altruist/altruist_setup_page.jpg", alt:"サブスクリプション設定ページ"} %}{% endroboWikiPicture %}

5) **アカウントアドレスを保存する** — センサーのセットアップ時に必要です。「OWNER」セクションからコピーするか、右上のアカウント名をクリックしてコピーを選択してください。

## センサーのセットアップ

{% roboWikiNote {type: "warning", title: "INFO"}%} センサーは2.4GHzのWi-Fiネットワークにのみ接続できます。{% endroboWikiNote %}

1) **センサーを電源ソケットに接続する**。
2) ボードはAltruist-xxxxxxxxxという名前のWi-Fiネットワークを作成します。携帯電話またはコンピュータから接続してください。自動的に認証ウィンドウが開くように促されます。
- そうでない場合は、ブラウザを開いて192.168.4.1にアクセスしてください。

{% roboWikiPicture {src:"docs/altruist/networks.png", alt:"altruist-sensor", small: true} %}{% endroboWikiPicture %}

3) **Wi-Fi設定を構成する**:
- リストからWi-Fiネットワークを選択するか、表示されない場合は手動で入力してください。
- 「WI-FI SETTINGS」フィールドにパスワードを入力してください。
- 同じネットワーク上に複数のAltruistデバイスがある場合は、ローカルホスト名を変更してください。WiFiを設定した後、このホスト名を使用してセンサーに接続できます。

{% roboWikiPicture {src:"docs/altruist/wifi_creds.png", alt:"altruist-sensor", small: true} %}{% endroboWikiPicture %}

4) **設定を保存する**
- `設定を保存して再起動`ボタンをクリックし、センサーがWiFiに接続するのを待ちます。接続されると、新しいIPアドレスが表示されますので、それをコピーしてください。これは、セットアップ後にセンサーに接続するための代替方法です。

{% roboWikiPicture {src:"docs/altruist/connected.png", alt:"altruist-sensor", small: true} %}{% endroboWikiPicture %}

5) **Robonomicsの詳細を入力する**:
- http://altruist.local でAltruistのウェブインターフェースを開きます（カスタムのローカルホスト名を変更した場合は、`.local`を付けて使用してください）。次に、`設定`ページに移動します。
- `Robonomics`セクションで、先ほどコピーしたRWSオーナーアドレスを指定されたフィールドに貼り付けます。

6) **センサーの位置を設定する**:
- `GPS & 温度補正`セクションで、センサーの設置場所の座標を入力します。
- オンラインマップを使用して座標を見つけるか、[このリンク](https://www.latlong.net/convert-address-to-lat-long.html)を使用して住所を緯度/経度に変換できます。

{% roboWikiNote {type: "warning", title: "警告"}%}センサーの座標は公開されている地図に表示されます。プライベート情報を表示したくない場合は、正確ではないが近い座標を記入してください。{% endroboWikiNote %}

{% roboWikiPicture {src:"docs/altruist/robo-gps.png", alt:"altruist-sensor-wifi", small: true} %}{% endroboWikiPicture %}

7) **Altruistの「Robonomicsアドレス」をコピーする**:
- ページの上部にあります。最終ステップのために保存してください。

{% roboWikiPicture {src:"docs/altruist/address.jpg", alt:"altruist address",  small: true} %}{% endroboWikiPicture %}

8) ページの下部にある "**設定を保存して再起動**" をクリックします。ボードが再起動します。

## Altruist の有効化
セットアッププロセスの最終ステップは、**Altruist アドレス**を**Robonomics サブスクリプション**に追加することです。

1) [セットアップページ](https://robonomics.app/#/rws-setup)に戻ります。

2) "**サブスクリプションのユーザー**" セクションまでスクロールします。

3) "**ユーザーを追加**" フィールドに、先ほどコピーした**Altruist Robonomics アドレス**を貼り付けます。

{% roboWikiPicture {src:"docs/altruist/add_user.jpg", alt:"add user"} %}{% endroboWikiPicture %}

4) **プラス (+) ボタン**をクリックし、メッセージに署名します。

5) 操作が完了するのを待ちます。

これで完了です！セットアップが完了しました。🎉

[Robonomics Sensors Social](https://sensors.social/#) マップで Altruist を見つけることができます。🚀

{% roboWikiPicture {src:"docs/altruist/map.jpg", alt:"sensor map"} %}{% endroboWikiPicture %}

## Home Assistant

**Altruist** を **Home Assistant** に追加する方法は2つあります：

### オプション 1: HACS (推奨)

**Altruist** を追加する最も簡単な方法は、**HACS** を通じて行うことです。[こちら](https://hacs.xyz/docs/use/)に簡単なセットアップガイドがあります。

**手順**:
1) HACSをインストールしたら、開きます。

2) 右上の**三つの点**をクリックし、"**Custom repositories**"を選択します。

3) ポップアップウィンドウで、次のURLを入力します:

```
https://github.com/airalab/altruist-homeassistant-integration
```
4) タイプを"**Integration**"に設定し、"**ADD**"をクリックします。

{% roboWikiPicture {src:"docs/altruist/hacs.jpg", alt:"altruist-add"} %}{% endroboWikiPicture %}

5) **Altruist Sensor**インテグレーションを検索します。

6) **ダウンロード**ボタンをクリックし、インテグレーションがインストールされたら**Home Assistant**を再起動します。

{% roboWikiPicture {src:"docs/altruist/integration.jpg", alt:"altruist-hacs"} %}{% endroboWikiPicture %}

### オプション2: 手動インストール

1) `homeassistant`ユーザーの下で、プロジェクトリポジトリをクローンします:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/airalab/altruist-homeassistant-integration.git
```

{% endcodeHelper %}

2) すでにカスタムインテグレーションがある場合は、`altruist`フォルダを`custom_components`ディレクトリに移動します:

{% codeHelper { copy: true}%}

```
cd altruist-homeassistant-integration
mv custom_components/altruist ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

3) カスタムインテグレーションが**ない**場合は、全体を移動します。 custom_components ディレクトリ:

{% codeHelper { copy: true}%}

 ```
cd altruist-homeassistant-integration
mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## 設定

インストールとHome Assistantの再起動後、ネットワーク上のAltruistが自動的に検出されます。

1) **設定 → デバイス & サービス** に移動します。

2) **Altruist センサー** を追加します。

{% roboWikiPicture {src:"docs/altruist/add_altruist.jpg", alt:"discover altruist"} %}{% endroboWikiPicture %}

これで完了です！🚀 Altruist センサーがHome Assistantに統合されました。