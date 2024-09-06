---
title: スマートホームのインストール
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.27.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Home AssistantとRobonomicsの統合をインストールするためのガイドへようこそ。Home Assistantはオープンソースのホームオートメーションシステムで、家庭ネットワーク内のスマートデバイスを制御するための中央ハブを提供します。Robonomicsと統合することで、分散型クラウドサービスを活用して、スマートホームの機能性とセキュリティを向上させることができます。この記事では、Home AssistantとRobonomicsをインストールする手順をステップバイステップで説明し、安全で分散化されたソリューションを使用して、自宅のさまざまな側面を自動化および制御する能力を提供します。さあ、始めましょう！**

## デモ

こちらは完全なスマートホームとRobonomicsの統合インストールの例です。インターネット接続にかかる時間は異なる場合があることに注意してください。

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## インストールに必要なハードウェア

すでにHome Assistantをスマートホームセットアップに組み込んでいない場合、完全なスマートホームシステムを最初から構築するために必要な機器を把握することが重要です。Robonomicsチームは、スマートホームサーバーとしてRaspberry Pi 4の使用を推奨しています。**ただし、すべてをPCでセットアップすることも可能です。**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4（少なくとも2 GB RAM）</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SDカード 16GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbeeアダプタ（オプション） </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbeeスマートデバイス（オプション） </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>セットアップ用デスクトップ</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

## 1. 事前要件のインストール

Robonomics Dockerには以下が含まれています:
- Home Assistant
- IPFS
- MQTTブローカーおよび統合
- Zigbee2MQTT
- libp2pプロキシ
- Robonomics統合

この記事ではUbuntuシステムでのインストールプロセスを示します。まず、次のパッケージをインストールする必要があります:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git
```

{% endcodeHelper %}

次に、PCにDockerをインストールする必要があります。インストール手順は[公式ウェブサイト](https://docs.docker.com/engine/install/)で見つけることができます。

<robo-wiki-note type="warning" title="重要な情報">

  Dockerコンテナをルート権限なしで起動するために、ユーザーをdockerグループに追加してください。[こちらの手順](https://docs.docker.com/engine/install/linux-postinstall/)を参照してください。

</robo-wiki-note>

## 2. 設定

GitHubリポジトリをダウンロードして、その中に移動します:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

次に、`template.env`から`.env`ファイルを作成します:


{% codeHelper {copy: true}%}

```
mv template.env .env
```

{% endcodeHelper %}

その後、`.env`ファイルを開いて、次のようなデフォルト値を編集できます:
- パッケージのバージョン
- すべての構成フォルダが保存されるリポジトリへのパス
- ["tzデータベース名"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)でのタイムゾーン。

## 3. 開始

bashスクリプトを実行し、すべての必要なパッケージがインストールされるまで待ちます:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

スクリプトは、前の手順で完了したすべての必要なアクションを確認し、何か問題がある場合はエラーをスローします。

インストールプロセス中には、次のような状況が発生する可能性があります:
- Zigbeeコーディネータを使用しないことを決定した場合、インストールを続行するかどうかを確認するダイアログ行が表示されます:

{% codeHelper %}

```
このスクリプトはすべての必要なリポジトリを作成し、Dockerコンテナを起動します
Zigbeeコーディネータの場所が見つかりません。 挿入してからスクリプトを再実行してください。ディレクトリ/dev/serial/by-id/が存在しません
Zigbeeコーディネータを使用しないことを続行しますか？ Zigbee2MQTTコンテナは起動しません。
続行しますか？（y/n）
```

{% endcodeHelper %}


- PCにシリアルポートを使用する複数のデバイスがある場合、スクリプトはどのデバイスを使用するか尋ねます:

{% codeHelper %}

```
このスクリプトはすべての必要なリポジトリを作成し、Dockerコンテナを起動します
Zigbeeコーディネータがインストールされています
接続されているデバイスが複数あります。 1つを選択してください
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

以上です。次の記事に進んでください。