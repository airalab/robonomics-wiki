---
title: 2 Gang Smart Switch
contributors: [nakata5321]
---
この記事では、2つのギャングスマートスイッチの設定プロセスを紹介します。

{% roboWikiNote {type: "warning"}%}Robonomicsのすべてのデバイスは公式の[ウェブサイト](https://robonomics.network/devices/)で購入できます。
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmQiq21yPEJbysPgvv35uJmG9rHQqbUSySu8za8BqA1kcZ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} ステップ1 — フラッシング {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%}Robonomicsのすべてのデバイスは出荷時にプリフラッシュされています。ただし、すべてのデバイスが開発キットであるため、手順ではデバイスをゼロからフラッシュするオプションもカバーしています。今すぐこれを行いたくない場合は、[**ステップ2 - アクセスポイント**](/docs/ir-controller/#step2)に進んでください。
{% endroboWikiNote %}

デバイスを箱から取り出してコンピューターに接続します。次に、[webflasher.robonomics.network](https://webflasher.robonomics.network/)のウェブフラッシャーにアクセスします。

{% roboWikiVideo {videos:[{src: 'QQmZ6kYAusdjH3Yq7L9UzorZdfXAa4awD1twp5SB5z57z9R', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}注意！ウェブフラッシャーはGoogle ChromeまたはMicrosoft Edgeブラウザーでのみ動作します。
{% endroboWikiNote %}

「ファームウェア」のドロップボックスで**"SWS-2G-E-11-23"**オプションを選択し、「SELECT CHIP」で**"ESP32"**を選択します。**"CONNECT"**ボタンを押します。
ポップアップウィンドウが表示され、デバイスが接続されているシリアルポートを選択する必要があります（通常は`/ttyUSB0`です）。次に**"INSTALL SWS-2G-E-11-23"**を選択します。
次のウィンドウでは、**ERASE DEVICE**をチェックして**CLEAR INSTALLATION**を行うことができます。次に「次へ」を押し、インストールします。ファームウェアがスマートスイッチデバイスにアップロードされるまで待ちます。

インストールプロセスが完了したら、Wi-Fi構成ポップアップが表示されます。Wi-Fiの資格情報を入力します。

Wi-Fiの設定が完了したら、「VISIT DEVICE」ボタンを使用してデバイスにアクセスできます。後で、ネットワーク内のIPアドレスを使用してデバイスにアクセスできます。これを見つけるには、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用できます。

**ステップ2 — アクセスポイント**をスキップして、[**ステップ3 — 構成**](/docs/ir-controller/#step3)に進んでください。

{% roboWikiTitle { type:'2', anchor: 'step2'} %} ステップ2 — アクセスポイント {% endroboWikiTitle %}

スマートスイッチを箱から取り出して電源に接続すると、「robonomics-XXXXXXX」という名前のホットスポットが作成されます。これに接続します。
構成ウィンドウが開くはずです。開かない場合は、Webブラウザーを開いて`192.168.4.1`ページに移動します。

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"image"} %}{% endroboWikiPicture %}

Wi-Fiの資格情報を入力します。その後、スマートスイッチデバイスがWi-Fiネットワークに接続されます。デバイスをネットワーク内のIPアドレスで確認します。これを見つけるには、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用できます。

{% roboWikiTitle { type:'2', anchor: 'step3'} %} ステップ3 — 構成 {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

**"Configuration"**->**"Configure other"**に移動します。**"Template"**文字列に次を挿入します:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-2L-Switch","GPIO":[1,1,1,1,1,1,1,1,1,576,1,1,1,1,3200,5440,0,224,225,0,0,320,1,321,0,0,0,0,33,1,32,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

**"Activate"**と**"MQTT Enable"**のチェックボックスが有効になっていることを確認します。有効でない場合は、有効にして保存ボタンを押します。

メインメニューに戻り、**"Configuration"** -> **"Configure MQTT"**に移動します。
ここでMQTTの資格情報を入力します:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"image"} %}{% endroboWikiPicture %}

これでESPに関するすべてが終了です。次のステップは、Home Assistantの統合をインストールすることです。

{% roboWikiTitle { type:'2', anchor: 'step4'} %} ステップ4 — 統合の設定 {% endroboWikiTitle %}

この記事では、Home Assistantを使用していることを前提としています。スマートスイッチデバイスをHome Assistantに接続するには、Tasmota統合をインストールする必要があります。

{% roboWikiVideo {videos:[{src: 'QmXLSLSFJKrrEtQXVQbpeFAvsKFSgW15J9ZFaSH1pteMXR', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

基本的に、Home AssistantはTasmota統合を自動的に検出します。しかし、自動検出されない場合は、手動で追加してください。
以上です。これで、スイッチエンティティをダッシュボードに追加できます。

{% roboWikiNote {type: "warning"}%}Robonomicsのすべてのデバイスは公式の[ウェブサイト](https://robonomics.network/devices/)で購入できます。
{% endroboWikiNote %}