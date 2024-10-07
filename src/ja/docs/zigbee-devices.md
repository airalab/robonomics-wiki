---
title: Zigbee2MQTT での Zigbee デバイス

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.38.0
    https://github.com/Koenkk/zigbee2mqtt/

---

**インストールプロセス中に ZigBee コーディネーターを挿入すると、スマートホームに ZigBee デバイスを追加できます。この記事では、その方法を説明します。**

{% roboWikiPicture {src:"docs/home-assistant/zigbee2mqtt.png", alt:"zigbee2mqt"} %}{% endroboWikiPicture %}

## デバイスのペアリング

ウェブブラウザを開き、`http://%PC_IP_ADDRESS%:8099` に移動します。Raspberry Pi の IP アドレスは、[Fing モバイルアプリ](https://www.fing.com/products) または [nmap CLI ツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) を使用して見つけることができます。すべてを PC でセットアップした場合は `http://localhost:8099` を使用します。

Zigbee2MQTT のウェブインターフェースが表示されます:


{% roboWikiPicture {src:"docs/home-assistant/z2m-webinterface.jpg", alt:"z2m-webinterface"} %}{% endroboWikiPicture %}


スマートデバイスを接続する準備が整いました。
まず、Zigbee2MQTT のウェブインターフェースの上部にある `Permit join (All)` ボタンを押します。

次に、デバイスをペアリングします。デバイスを接続モードに切り替える最も一般的な方法は、電源ボタンを押し続けるか、5回オン/オフすることです。Zigbee2MQTT が実行されていることを確認してください。

デバイスが接続されると、ウェブインターフェースに表示されます:

{% roboWikiPicture {src:"docs/home-assistant/device_connected.jpg", alt:"device_connected"} %}{% endroboWikiPicture %}

これで、Home Assistant WebUI でこのセンサーが表示されるはずです。`Settings` -> `Devices & Services` -> `Devices` に移動します。

すべてのセンサーを追加したら、Zigbee2MQTT のウェブインターフェースを閉じることができます。