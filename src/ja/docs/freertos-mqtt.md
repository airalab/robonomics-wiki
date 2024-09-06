---
title: Amazon FreeRTOS デバイスを MQTT を介して Robonomics に接続する

contributors: [khssnv]
---

ここでは、[Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) を実行するマイクロコントローラーが MQTT を介して Robonomics ネットワークに接続されるデモンストレーションを行います。プロジェクトのソースコードについては、[このリポジトリ](http://github.com/khssnv/freertos_mqtt_robonomics_example) をご確認ください。

私たちは、ESP32 DevKitC という[ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/)を使用し、FreeRTOSディストリビューションとMQTT実装は、使用されているマイクロコントローラーのベンダーである[Espressif IoT Development Framework](https://github.com/espressif/esp-idf)によって提供されています。

また、デモンストレーション用に[PMS-3003](http://www.plantower.com/en/content/?107.html)センサーも使用しています。このセンサーは、空気中の微粒子の存在を測定し、空気の品質を推定するために使用できます。

空気の品質はこの記事のトピックではありませんが、WHOのウェブサイトで詳細を確認できます: [Ambient (outdoor) air pollution](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health)。システムの目標は、センサーの測定値をAiralabのRobonomicsネットワークに公開することです。

## ハードウェアのセットアップ

PMS3003のTXD PIN5をESP32 DevKitCのIO17に接続して、UARTで測定値を転送します。
また、両デバイスには電源と共通の接地が必要です。

{% roboWikiPicture {src:"docs/freertos-mqtt/wiring.png", alt:"Wiring Diagram"} %}{% endroboWikiPicture %}

## データフロー

センサーの測定値をRobonomicsネットワークに配信するために、ファームウェアレベルでは、センサーからデータを取得し（今回はUARTを使用）、それを MQTT / TCP で AIRA インスタンスに渡すことが目標です。

{% roboWikiPicture {src:"docs/freertos-mqtt/send.svg", alt:"Sending"} %}{% endroboWikiPicture %}

この例では、パブリックIPアドレスとドメイン名が割り当てられた AIRA インスタンスのクラウド展開を使用しています。
AIRA インスタンスでは、`mosquitto` MQTT ブローカーをセットアップし、`/freertos_mqtt_robonomics_example/98:F4`にサブスクライブします。:AB:72:23:C4` MQTTからメッセージを取得するためのトピック。

その後、パイプを使用してメッセージを `robonomics io` ライターに渡します。

{% roboWikiPicture {src:"docs/freertos-mqtt/recv.svg", alt:"Receiving"} %}{% endroboWikiPicture %}

これでデータがRobonomics Networkに利用可能になり、再度 `robonomics io` で読むことができます。

## ファームウェア

私たちは[ESP-MQTTサンプルアプリケーション（TCPトランスポート）](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp)をベースにしています。

UART接続、SNTP時刻同期、定期的なMQTTパブリッシャールーチンのために `main/app_main.c` を変更しました。

プロジェクトを再現しようとしていて、ESP IDFベースのプロジェクトが初めての場合は、まず、[EspressifのESP-IDFプログラミングガイド](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step)の導入に従って、ファームウェアの操作（構成、ビルド、`idf.py`ツールを使用したアップロードなど）に慣れるようにしてください。

### Wi-Fiの設定

クラウドに展開されたAIRAインスタンスと通信するために、マイクロコントローラーにはインターネット接続が必要です。
これにはESP32のWi-Fiを使用します。
EspressifはオンボードWi-Fiを構成するためのユーティリティを提供しています。
この例では、Ubuntu 20.04 GNU/Linuxの開発環境を使用しています。
Wi-Fiを構成するには、プロジェクトフォルダに移動してSDK構成ツールを実行します。

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

次に、`Example Connection Configuration`セクションでWi-FiアクセスポイントのSSIDとパスワードを設定します。

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-wi-fi.png", alt:"Menuconfig Wi-Fi"} %}{% endroboWikiPicture %}

### MQTTエンドポイントの設定

MQTTを設定するには2つのことがあります。
1つ目はMQTTブローカーアドレスです。
SDK構成ツールで設定可能です。

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

`Example Configuration`セクションで`Broker URL`を設定します。

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-mqtt.png", alt:"Menuconfig MQTT"} %}{% endroboWikiPicture %}

2つ目はMQTTトピックです。.
プロジェクト名の接頭辞に続いて、ESP32 MACアドレスを使用してファームウェアに設定しました。
特定のマイクロチップには、`/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` が与えられます。

## MQTTからRobonomicsへ

まず、MQTTでデータを受信しているかどうかを確認しましょう。
Mosquitto MQTTブローカーのトピックデバイスを購読できます。

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

ここでは、`mosquitto_sub` ユーティリティを使用するために `mosquitto` パッケージを環境に取り込んでいます。
次に、ファームウェアで設定されたトピックに購読します。
これで、AIRAが正しくMQTT経由でデータを受信していることがわかります。
次に、これらのメッセージをRobonomics Networkにパイプします。

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

ここでは、`robonomics` ユーティリティを使用して pubsub チャンネル `/freertos_mqtt_robonomics_example` にメッセージを公開します。
少なくとも1つの接続が確立されるように `bootnodes` を指定します。

これで、同じ pubsub チャンネルからこれらのメッセージを読み取ります。

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  新しいピアが接続されました: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: ピアのためのメッシュリンクが追加されました: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") in topic: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## 使用した元のリソース

* ESP32 DevKitCのピン配置は、GoJimmyのブログから取得 https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* PSM3003のデータ構造とデコーダは、OpenAirProjectから取得 https://github.com/openairproject/sensor-esp32

**皆様、ありがとうございました！**