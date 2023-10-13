---
title: Zigbee2MQTTを使用したZigbeeアダプターのプリインストールイメージ

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**この記事では、スマートデバイスをペアリングします。**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

ウェブブラウザを開き、`http://%RASPBERRY_IP_ADDRESS%:8099`にアクセスします。Raspberry PiのIPアドレスは、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用して見つけることができます。

Zigbee2MQTTのウェブインターフェースが表示されます：

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




スマートデバイスを接続する時間です。 
まず、Zigbee2MQTTのウェブインターフェースの上部にある`Permit join (All)`ボタンを押します。 

次に、デバイスをペアリングします。デバイスを接続モードに切り替える最も一般的な方法は、電源ボタンを長押しするか、5回オン/オフすることです。Zigbee2MQTTが実行されていることを確認してください。

<robo-wiki-picture src="home-assistant/switch-device.gif" />

デバイスが接続されると、ウェブインターフェースに表示されます：

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

これでHome Assistant WebUIでこのセンサーが表示されるはずです。`Settings` -> `Devices & Services` -> `Devices`に移動します：

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

すべてのセンサーを追加した後、Zigbee2MQTTのウェブインターフェースを閉じることができます。
