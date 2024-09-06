---
title: 1ギャングスマートスイッチ
contributors: [nakata5321]
---
この記事では、1ギャングスマートスイッチの設定プロセスを紹介します。

{% roboWikiNote {type: "warning"}%}Robonomicsのすべてのデバイスは公式の[ウェブサイト](https://robonomics.network/devices/)で購入できます。{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTWhDu1PdQgR1ZuLuGpEtYG8uMm8eiWLziK1zLupQwU2i', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} ステップ1 — フラッシング {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%}Robonomicsのすべてのデバイスは出荷時にプリフラッシュされています。ただし、すべてのデバイスが開発キットであるため、手順ではデバイスをゼロからフラッシュするオプションもカバーしています。今すぐ行いたくない場合は、[**ステップ2 - アクセスポイント**](/docs/ir-controller/#step2)に進んでください。
{% endroboWikiNote %}

デバイスを箱から取り出し、コンピュータに接続します。次に、[webflasher.robonomics.network](https://webflasher.robonomics.network/)にアクセスします。これがウェブフラッシャーです。

{% roboWikiVideo {videos:[{src: 'QmVWmGSnvGwQ3dQfZC8iM5KHBoGpaWVXXUjNuNesULQrGw', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}注意！ウェブフラッシャーはGoogle ChromeまたはMicrosoft Edgeブラウザーでのみ動作します。{% endroboWikiNote %}

「ファームウェア」のドロップボックスで **"SWS-1G-E-11-23"** オプションを選択し、次に「SELECT CHIP」で **"ESP32"** を選択します。 **"CONNECT"** ボタンを押します。
ポップアップウィンドウが表示され、デバイスが接続されているシリアルポートを選択する必要があります（通常は `/ttyUSB0` です）。次に **"INSTALL SWS-1G-E-11-23"** を選択します。
次のウィンドウでは、**ERASE DEVICE** をチェックして **CLEAR INSTALLATION** を行います。次へ進み、インストールを押します。ファームウェアがスマートスイッチデバイスにアップロードされるまで待ちます。

インストールプロセスが完了したら、Wi-Fi設定ポップアップが表示されます。Wi-Fiの資格情報を入力します。

Wi-Fiの設定が完了したら、**VISIT DEVICE** ボタンを使用してデバイスにアクセスできます。後で、ネットワーク内のIPアドレスを使用してデバイスにアクセスできます。これを見つけるには、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用できます。

**ステップ2 — アクセスポイント**をスキップし、[**ステップ3 — 設定**](/docs/ir-controller/#step3)に進んでください。

{% roboWikiTitle { type:'2', anchor: 'step2'} %} ステップ2 — アクセスポイント {% endroboWikiTitle %}

スマートスイッチを箱から取り出し、電源に接続すると、「robonomics-XXXXXXX」という名前のホットスポットが作成されます。それに接続します。
構成ウィンドウが開くはずです。開かない場合は、Webブラウザーを開いて `192.168.4.1` ページに移動します。

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"image"} %}{% endroboWikiPicture %}

Wi-Fiの資格情報を入力します。その後、スマートスイッチデバイスがWi-Fiネットワークに接続されます。デバイスをネットワーク内のIPアドレスで確認します。これを見つけるには、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用できます。

{% roboWikiTitle { type:'2', anchor: 'step3'} %} ステップ3 — 設定 {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

**"Configuration"**->**"Configure other"**に移動します。**"Template"**に次の文字列を挿入します:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-1L-Switch","GPIO":[1,1,1,1,1,1,1,1,1,576,1,1,1,1,3200,5440,0,1,224,1,0,0,320,1,0,0,0,0,1,1,1,32,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

**"Activate"** と **"MQTT Enable"** のチェックボックスが有効になっていることを確認します。有効でない場合は、有効にして保存ボタンを押します。

メインメニューに戻り、**"Configuration"** -> **"Configure MQTT"**に移動します。
ここでMQTTの資格情報を入力します:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"image"} %}{% endroboWikiPicture %}

これでESPに関する作業は終了です。次のステップはHome Assistantの統合をインストールすることです。

{% roboWikiTitle { type:'2', anchor: 'step4'} %} ステップ4 — 統合の設定 {% endroboWikiTitle %}

この記事では、Home Assistantを使用していることを前提としています。スマートスイッチデバイスをHome Assistantに接続するには、Tasmota統合をインストールする必要があります。

{% roboWikiVideo {videos:[{src: 'QmQw6aA5e7UqT1hZrAV8m1UPq1rWCgLsWcVufuxitQm84p', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

基本的に、Home AssistantはTasmota統合を自動的に検出します。しかし、自動検出されない場合は、手動で追加してください。
以上です。これでスイッチエンティティをダッシュボードに追加できます。

{% roboWikiNote {type: "warning"}%}Robonomicsのすべてのデバイスは公式の[ウェブサイト](https://robonomics.network/devices/)で購入できます。{% endroboWikiNote %}