---
title: エネルギーモニタリング
contributors: [nakata5321]
---
この記事では、エネルギーモニタリングの設定プロセスを紹介します。

{% roboWikiNote {type: "warning"}%} Robonomicsのすべてのデバイスは公式の[ウェブサイト](https://robonomics.network/devices/)で購入できます。
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} ステップ1 — フラッシング {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Robonomicsのすべてのデバイスは出荷時にプリフラッシュされています。ただし、すべてのデバイスが開発キットであるため、手順ではデバイスをゼロからフラッシュするオプションもカバーしています。今すぐ行いたくない場合は、[**ステップ2 - アクセスポイント**](/docs/ir-controller/#step2)に進んでください。
{% endroboWikiNote %}

デバイスを箱から取り出し、コンピューターに接続します。次に、[webflasher.robonomics.network](https://webflasher.robonomics.network/)にアクセスします。これがウェブフラッシャーです。

{% roboWikiVideo {videos:[{src: 'QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} 注意！ウェブフラッシャーはGoogle ChromeまたはMicrosoft Edgeブラウザーでのみ動作します。
{% endroboWikiNote %}

「ファームウェア」のドロップボックスで **"ENERGY MONITOR"** オプションを選択し、次に「SELECT CHIP」で **"ESP32-S3"** を選択します。 **"CONNECT"** ボタンを押します。
ポップアップウィンドウが表示され、デバイスが接続されているシリアルポートを選択する必要があります（通常は `/ttyUSB0` です）。次に **"INSTALL ENERGY-MONITOR_EN"** を選択します。
次のウィンドウでは、**ERASE DEVICE** をチェックして **CLEAR INSTALLATION** を行うことができます。次へ進み、インストールを押します。エネルギーモニタリングデバイスにファームウェアがアップロードされるまで待ちます。

インストールプロセスが完了したら、Wi-Fi設定ポップアップが表示されます。Wi-Fiの資格情報を入力します。

Wi-Fiの設定が完了したら、「VISIT DEVICE」ボタンを使用してデバイスにアクセスできます。後でネットワーク内のIPアドレスを使用してデバイスにアクセスできます。それを見つけるには、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用できます。

**ステップ2 — アクセスポイント**をスキップして、[**ステップ3 — 設定**](/docs/ir-controller/#step3)に進んでください。

{% roboWikiTitle { type:'2', anchor: 'step2'} %} ステップ2 — アクセスポイント {% endroboWikiTitle %}

エネルギーモニタを箱から取り出し、電源に接続すると、"robonomics-XXXXXXX"という名前のホットスポットが作成されます。それに接続します。設定ウィンドウが開くはずです。開かない場合は、Webブラウザーを開いて `192.168.4.1` ページに移動します。

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Wi-Fiの資格情報を入力します。その後、エネルギーモニタリングデバイスがWi-Fiネットワークに接続されます。デバイスをネットワーク内のIPアドレスで確認します。それを見つけるには、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用できます。

{% roboWikiTitle { type:'2', anchor: 'step3'} %} ステップ3 — 設定 {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

**"Configuration"**->**"Configure other"**に移動します。**"Template"**の文字列に次の内容を挿入します:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```

{% endcodeHelper %}

**"Activate"** と **"MQTT Enable"** のチェックボックスが有効になっていることを確認します。無効の場合は有効にして保存ボタンを押します。

「メインメニュー」に戻り、**"Configuration"** -> **"Configure MQTT"**に移動します。
MQTTの資格情報をここに入力します:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

これでESPに関する作業は終了です。次のステップはHome Assistantの統合をインストールすることです。

{% roboWikiTitle { type:'2', anchor: 'step4'} %} ステップ4 — 統合の設定 {% endroboWikiTitle %}

この記事では、Home Assistantを使用していることを前提としています。エネルギーモニタリングデバイスをHome Assistantに接続するには、「Tasmota」統合をインストールする必要があります。

{% roboWikiVideo {videos:[{src: 'QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

基本的に、Home Assistantは「Tasmota」統合を自動的に検出します。しかし、自動検出されない場合は、手動で追加してください。

{% roboWikiPicture {src:"docs/energymeter/HA.jpg", alt:"energymeter-ha"} %}{% endroboWikiPicture %}

以上です。これでダッシュボードにエネルギーエンティティを追加できます。

{% roboWikiNote {type: "warning"}%} Robonomicsのすべてのデバイスは公式の[ウェブサイト](https://robonomics.network/devices/)で購入できます。
{% endroboWikiNote %}