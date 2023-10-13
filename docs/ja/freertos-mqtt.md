---
title: Amazon FreeRTOSデバイスをMQTTでRobonomicsに接続する

contributors: [khssnv]
---

[Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/)を実行するマイクロコントローラーが、MQTTを介してRobonomicsネットワークに接続されるデモンストレーションです。プロジェクトのソースコードにつては、[このリポジトリ](http://github.com/khssnv/freertos_mqtt_robonomics_example)をご確認ください。

私たちは、FreeRTOSディストリビューションとMQTT実装を提供する[Espressif IoT Development Framework](https://github.com/espressif/esp-idf)を使用して、[ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/)を使用しています。Espressifは使用されるマイクロコントローラーのベンダーです。

デモンストレーションの目的で[PMS-3003](http://www.plantower.com/en/content/?107.html)センサーもあります。このセンサーは、大気中の微粒子の存在を測定し、空気の品質を推定するために使用することができます。

空気の品質はこの記事のテーマではありませんが、WHOのウェブサイトで詳細を確認できます：[Ambient (outdoor) air pollution](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health)。システムの目標は、センサーの測定値をAiralabのRobonomicsネットワークに公開することです。

## ハードウェアのセットアップ

PMS3003のTXD PIN5をESP32 DevKitC IO17に接続して、UARTで測定値を転送します。
また、両方のデバイスには電源と共通のグラウンドが必要です。

![Wiring Diagram](../images/freertos-mqtt/wiring.png)

## データフロー

センサーの測定値をRobonomicsネットワークに配信するために、ファームウェアレベルでの目標は、センサーからデータを取得することです。埋め込み通信プロトコル（私たちの場合はUART）を介してAIRAインスタンスに渡します。

![Sending](../images/freertos-mqtt/send.svg)

この例では、パブリックIPアドレスとドメイン名が割り当てられたAIRAクラウド展開を使用しています。
AIRAインスタンスでは、`mosquitto` MQTTブローカーをセットアップし、`/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4`トピックにサブスクライブしてMQTTからメッセージを取得します。

その後、メッセージをパイプを介して`robonomics io`ライターに渡します。

![Receiving](../images/freertos-mqtt/recv.svg)

これでデータがRobonomicsネットワークで利用可能になり、再び`robonomics io`で読み取ることができます。

## ファームウェア

[ESP-MQTTサンプルアプリケーション（TCPトランスポート）](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp)をベースにしています。

UART接続、SNTP時刻同期、定期的なMQTTパブリッシャールーチンのために、`main/app_main.c`のみを変更します。

プロジェクトを繰り返し実行しようとしている場合、およびこれが最初のESP IDFベースのプロジェクトである場合は、まず[EspressifのESP-IDFプログラミングガイド](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step)の導入に従って、設定、ビルド、`idf.py`ツールを使用したアップロードなどのファームウェア操作に慣れるようにしてください。

### Wi-Fiの設定

クラウドに展開されたAIRAインスタンスと通信するために、マイクロコントローラーにはインターネット接続が必要です。
それにはESP32のWi-Fiを使用します。
EspressifはオンボードWi-Fiを設定するためのユーティリティを提供しています。
この例では、Ubuntu 20.04 GNU/Linuxを使用した開発環境を使用しています。
Wi-Fiを設定するには、プロジェクトフォルダに移動し、SDK設定ツールを実行します。

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

次に、`Example 接続ion 設定`セクションでWi-FiアクセスポイントのSSIDとパスワードを設定します。

![Menuconfig Wi-Fi](../images/freertos-mqtt/menuconfig-wi-fi.png)

### MQTTエンドポイントの設定

MQTTの設定には2つの項目があります。
1つ目はMQTTブローカーアドレスです。
SDKの設定ツールで設定可能です。

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

`Example 設定`セクションで`Broker URL`を設定します。

![Menuconfig MQTT](../images/freertos-mqtt/menuconfig-mqtt.png)

2つ目はMQTTトピックです。
プロジェクト名の接頭辞に続くESP32のMACアドレスでファームウェアに設定します。
これにより、特定のマイクロチップに対して`/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4`が与えられます。

## MQTTからRobonomicsへ

まず、MQTTでデータを受信しているか確認しましょう。
Mosquitto MQTTブローカートピックにデバイスがパブリッシュするためにサブスクライブできます。

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

ここでは、`mosquitto`パッケージを環境に取り込んで`mosquitto_sub`ユーティリティを使用します。
次に、ファームウェアで設定されたトピックにサブスクライブします。
データを受信できたので、AIRAは正しくMQTTでデータを受信しています。
さて、これらのメッセージをRobonomicsネットワークにパイプしましょう。

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

ここでは、`robonomics`ユーティリティを使用してpubsubチャンネル`/freertos_mqtt_robonomics_example`にメッセージをパブリッシュします。
少なくとも1つの接続が確立されるように、`bootnodes`を指定します。

これで、同じpubsubチャンネルからこれらのメッセージを読み取ることができます。

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  New peer connected: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Mesh link added for peer: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") in topic: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## 使用された元のリソース

* GoJimmyのブログからのESP32 DevKitCピン配置 https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* OpenAirProjectからのPSM3003データ構造とデコーダー https://github.com/openairproject/sensor-esp32

**皆さん、ありがとうございました！**
