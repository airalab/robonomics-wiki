---
title: Robonomics SLS ゲートウェイ

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS ファームウェア 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**この記事では、Robonomics SLS ゲートウェイをセットアップします。ゲートウェイに必要なソフトウェアをインストールし、設定し、Home Assistant に接続します。**

<robo-wiki-picture src="home-assistant/sls_gateway.png" />

## Firmware

まず、ゲートウェイのマイクロコンローラーファームウェアをインストールする必要があります。SLS ゲートウェイの下部のスイッチ `1` と `3` を `ON` に設定して、他のスイッチは `OFF` にします。

<robo-wiki-picture src="home-assistant/sls-gateway-13.gif" />

ゲートウェイを Raspberry Pi に USB タイプ-C ポートで接続します。

<robo-wiki-picture src="home-assistant/sls-rpi.gif" />

ファームウェアのリポジトリを Raspberry Pi にクローンします:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

</code-helper>

`robonomics-hass-utils/esp_firmware/linux` に移動します。SLS ゲートウェイをフラッシュするには、`Clear` と `Flash_16mb` スクリプトを実行する必要があります。

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

</code-helper>

### トラブルシューティング

ゲートウェイのファームウェアの更新に問題がある場合は、追加の手順が必要です:

1. pySerial モジュールがインストールされていることを確認してください。

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
pip install pyserial
```
</code-helper>

2. ユーザーに USB ポートへのアクセス権限を与え、コンピューターを再起動してください。

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```
</code-helper>

3. 一部の場合、ファームウェアを更新するためにスクリプトの帯域幅設定を変更する必要があります。`Flash_16mb.sh` スクリプトを `nano` エディタで開き、baud パラメータを `921600` から小さい値（例: `115200`）に変更します。

## 設定

1. SLS ゲートウェイをコンピューターから切断します。ゲートウェイの背面のスイッチを適切な位置に設定します。スイッチ `5`（RX Zigbee to ESP）と `6`（TX Zigbee to ESP）は `ON` の位置にする必要があります。他のスイッチは `OFF` にします。 

<robo-wiki-picture src="home-assistant/sls-gateway-56.gif" />

2. タイプ-C 電源ケーブルを接続します。中央のインジケーターライトが緑になるはずです。

<robo-wiki-picture src="home-assistant/sls-gateway-connect.gif" />

3. 初回起動時に、ゲートウェイは Wi-Fi を SSID `zgw****` で共有します。このネットワークに接続します。信号がかなり弱い場合があるため、SLS ゲートウェイをコンピューターに近づける方が良いです。 

<robo-wiki-picture src="home-assistant/sls-gateway-wifi.gif" />

4. 接続が成功した場合、Web インターフェースが開きます（または 192.168.1.1 アドレスで見つけることができます）。 

5. `Wi-Fi Settings` ページが表示されます。Wi-Fi を選択し、パスワードを入力します。`Apply` ボタンを押します。ゲートウェイは再起動し、Wi-Fi ネットワークに接続します。 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type:'mp4'}]" />

6. SLS ゲートウェイのローカル IP を見つけて、Web インターフェースにアクセスします。[Fing モバイルアプリ](https://www.fing.com/products) または [nmap CLI ツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) を使用して見つけることができます。ゲートウェイの名前は次のようになります: `zgw****`。ゲートウェイの IP をブラウザに貼り付けて、ゲートウェイの Web インターフェースを開きます。

7. `Setting` -> `Hardware` に移動し、設定が画像のようになっていることを確認します。必要に応じて設定を修正し、`Save` ボタンをクリックします:

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type:'mp4'}]" />

必要な値のテーブル:

| Field                    | Value              |
|--------------------------|:-------------------|
| Zigbee module            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Service Button Pin       | 33 (pullUP - true) |
| Number addressable leds  | 0                  |
| Led Red (or addr)        | 21                 |
| Led Green                | 5                  |
| Led Blue                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. 次に、ゲートウェイを再起動します。右上隅の `Actions` -> `Reboot system` を選択します。

9. Zigbee 情報ウィンドウでゲートウェイが正常に動作していることを確認してください。DeviceState は `OK` である必要があります。

10. Home Assistant へのデバイスの自動追加を設定します。`Zigbee` -> `Config` に移動し、`Home Assistant MQTT Discovery` と `Clear States` を選択します。変更を保存し、再度 **ゲートウェイを再起動** します。

<robo-wiki-note type="warning">

自宅に既にアクティブな SLS ゲートウェイがあり、別のゲートウェイを設定している場合、それらは互いに競合します。この問題を解決するには、新しいデバイスでチャンネルを変更する必要があります。`Zigbee` -> `Config` に移動し、チャンネルを別のチャンネルに変更します（例: ャンネル 15）。

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZ', type:'mp4'}]" />

## SLS を MQTT にペアリングする

SLS ゲートウェイの設定が完了したら、SLS ゲートウェイを Home Assistant に接続する必要があります。SLS ゲートウェイの Web インターフェースを開き、`Settings/Link` -> `MQTT Setup` に移動します:


ブローカーアドレス（ローカルネットワーク内の Home Assistant を実行している Raspberry Pi のアドレス、[Fing モバイルアプリ](https://www.fing.com/products) または [nmap CLI ツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) で見つけることができます）、ポート（デフォルトは `1883`）、ブローカーのユーザー名とパスワード（以前に作成したもの）、トピック名（任意の名前を選択できます）を追加します。また、Raspberry Pi の IP アドレスは静的である必要があります。`Enable` と `Retain states` をクリックします。

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdNKDqwwy87VQEDDVsX5kpaDQm9wKKPEJUNJnhnjx6e5y', type:'mp4'}]" />

変更を保存します。これでデバイスが自動的に Home Assistant に表示されます。

## デバイスを接続します

デバイスを接続するには、`Zigbee` -> `Join`に移動してください。ペアリングモードにセンサーを設定します。デバイスを接続モードに切り替える最も一般的な方法は、電源ボタンを長押しするか、5回オン/オフすることです。`Enable Join`ボタを押して、Zigbeeデバイスの検索を開始します。アクティブなセンサーが表示されます。

<robo-wiki-picture src="home-assistant/switch-device.gif" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type:'mp4'}]" />


[**IoTサブスクリプション**](/docs/sub-activate)セクションに移動し、Robonomicsサブスクリプションのアクティベートを開始できます。
