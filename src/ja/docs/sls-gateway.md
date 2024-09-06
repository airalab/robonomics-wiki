---
title: Robonomics SLS Gateway

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**この記事では、Robonomics SLS Gatewayのセットアップ方法について説明します。ゲートウェイ用の必要なソフトウェアをインストールし、構成し、Home Assistantに接続します。**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"sls gateway"} %}{% endroboWikiPicture %}

## ファームウェア

まず、ゲートウェイのマイクロコントローラーファームウェアをインストールする必要があります。SLS Gatewayの下部にあるスイッチ`1`と`3`を`ON`に設定して、他のスイッチは`OFF`にしてください。

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"sls gateway 13"} %}{% endroboWikiPicture %}

ゲートウェイをRaspberry PiにUSB Type-Cポートを介して接続します。

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

ファームウェアのリポジトリをRaspberry Piにクローンします：

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

{% endcodeHelper %}

`robonomics-hass-utils/esp_firmware/linux`に移動します。SLSゲートウェイをフラッシュするには、`Clear`と`Flash_16mb`スクリプトを実行する必要があります。

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### トラブルシューティング

ゲートウェイファームウェアの更新に問題がある場合は、追加の手順を実行する必要があります:

1. pySerialモジュールがインストールされていることを確認してください:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}

2. ユーザーにUSBポートへのアクセス権を付与し、コンピューターを再起動してください:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}

3. 一部の場合、ファームウェアを更新するためにスクリプトで帯域幅設定を変更する必要があります。`nano`エディターで`Flash_16mb.sh`スクリプトを開き、baudパラメータを`921600`から小さな値（例えば`115200`）に変更してください。

## 設定

1. コンピューターからSLSゲートウェイを切断します。ゲートウェイの背面のスイッチを適切な位置に設定します。スイッチ`5`（RX Zigbee to ESP）と`6`（TX Zigbee to ESP）は`ON`の位置になければならず、他のスイッチは`OFF`に設定してください。

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. Type-C電源ケーブルを接続します。中央のインジケーターライトが緑色に点灯するはずです。

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. 初回起動時に、ゲートウェイはSSIDが`zgw****`のWi-Fiを共有し始めます。このネットワークに接続してください。信号がかなり弱い可能性があるため、SLSゲートウェイをコンピューターに近づける方が良いでしょう。

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. 接続が成功すると、Webインターフェースが開きます（または192.168.** **で見つけることができます）。1.1 アドレス）。

5. `Wi-Fi Settings` ページが表示されます。Wi-Fi を選択し、パスワードを入力してください。`Apply` ボタンを押します。ゲートウェイは再起動し、Wi-Fi ネットワークに接続されます。

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. SLS ゲートウェイのローカル IP アドレスを見つけて、Web インターフェースにアクセスします。これを見つけるには、[Fing モバイルアプリ](https://www.fing.com/products) または [nmap CLI ツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) を使用できます。ゲートウェイの名前は次のようになります：`zgw****`。ゲートウェイ IP をブラウザに貼り付けて、ゲートウェイの Web インターフェースを開きます。

7. `Setting` -> `Hardware` に移動し、設定が画像のようになっていることを確認してください。必要に応じて設定を修正し、`Save` ボタンをクリックしてください：

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

必要な値を持つテーブル：

| フィールド                  | 値                 |
|--------------------------|:-------------------|
| Zigbeeモジュール            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST ピン           | 18                 |
| Zigbee BSL ピン           | 19                 |
| サービスボタン ピン       | 33 (pullUP - true) |
| アドレス指定可能なLEDの数  | 0                  |
| 赤色LED (またはアドレス)   | 21                 |
| 緑色LED                  | 5                  |
| 青色LED                  | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. ゲートウェイを再起動します。右上隅の `Actions` -> `Reboot system` を選択します。

9. Zigbee情報ウィンドウでゲートウェイが正常に動作していることを確認してください。DeviceStateは `OK` である必要があります。

10. Home Assistantにデバイスを自動的に追加するように構成します。`Zigbee` -> `Config` に移動し、`Home Assistant MQTT Discovery` と `Clear States` を選択します。変更を保存し、再度 **SLSゲートウェイを再起動** します。

{% roboWikiNote {type: "warning"}%} すでに自宅にアクティブなSLSゲートウェイがある場合、そして今別の設定をしている場合新しいデバイスを追加すると、他のデバイスと競合する可能性があります。この問題を解決するには、新しいデバイスのチャンネルを変更する必要があります。これを行うには、`Zigbee` -> `Config` に移動し、別のチャンネルに変更します（例：チャンネル15）。{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

## SLSをMQTTにペアリングする

SLSゲートウェイを構成した後、SLSゲートウェイをHome Assistantに接続する必要があります。SLSゲートウェイのWebインターフェースを開き、`Settings/Link` -> `MQTT Setup`に移動します：

ブローカーアドレスを追加します（ローカルネットワーク内のHome Assistantを実行しているRaspberry Piのアドレス、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)で見つけることができます）、ポート（デフォルトは`1883`）、ブローカーのユーザー名とパスワード（以前に作成したもの）、およびトピック名（任意の名前を選択できます）。また、Raspberry PiのIPアドレスは静的である必要があります。`Enable`と`Retain states`をクリックします。.

変更を保存します。これでデバイスが自動的にHome Assistantに表示されます。

## デバイスを接続する

デバイスを接続するには、`Zigbee` -> `Join` に移動してデバイスを接続します。ペアリングモードにセンサーを設定し、デバイスを接続モードに切り替える最も一般的な方法は、電源ボタンを押し続けるか、5回オン/オフすることです。`Enable Join` ボタンを押して Zigbee デバイスの検索を開始します。アクティブなセンサーが表示されます。

{% roboWikiVideo {videos:[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

これで [**IoT サブスクリプション**](/docs/sub-activate) セクションに移動して Robonomics サブスクリプションのアクティブ化を開始できます。