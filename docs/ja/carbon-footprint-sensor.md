---
title: センサーを接続する

contributors: [LoSk-p, makyul]
---

作業の例は次のビデオにあります：

https://youtu.be/jsaFCVAx2sA

## 要件

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (または [サポートされている](https://www.zigbee2mqtt.io/オフセットサービスformation/supported_adapters.html))

サービスは Raspberry Pi で実行されており、zigbee プロトコル経由でスマート プラグに接続します。

## ジグビースティック

JetHome USB JetStick Z2 をお持ちの場合は、必要なファームウェアがすでに含まれているため、フラッシュする必要はありません。 ただし、別のアダプタがある場合は、まず zigbee2MQTT ソフトウェアでフラッシュする必要があります。 お使いのデバイスの手順は [こちら](https://www.zigbee2mqtt.io/information/supported_adapters.html) でご覧いただけます。

アダプターを接続し、アダプターのアドレスを確認します (`「/dev/ttyUSB1」` の場合もあります)。
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

最初に USB ポートにアクセスする必要がある場合があります。 ユーザーを `「dialout」` グループに追加します (ubuntu では機能しますが、グループ名は他の OS では異なる場合があります)。

ubuntuの場合：
```bash
sudo usermod -a -G dialout $USER
```
archの場合：
```bash
sudo usermod -a -G uucp $USER
```
その後、ログアウトしてログインするか、コンピューターを再起動します。

## インストール

リポジトリをクローンします：

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## 設定

に移動し、 `data/configuration.yaml` を設定します。また、対応する情報でフィールドを入力することもできます。 `permit_join: true`:

```
# Home Assistant integration (MQTT discovery)
homeassistant: false

# allow new devices to join
permit_join: true

# MQTT settings
mqtt:
  # MQTT base topic for zigbee2mqtt MQTT messages
  base_topic: zigbee2mqtt
  # MQTT server URL
  server: 'mqtt://172.17.0.1'
  # MQTT server authentication, uncomment if required:
  # user: my_user
  # password: my_password

# Serial settings
serial:
  # Location of CC2531 USB sniffer
  port: /dev/ttyUSB0
```
フィールドでは、接続を確立するために `server` and `port` ブリッジのIPを使用します： `server` ここではあなたのアドレスは `docker0`. 

```bash
$ ip a                                                 127
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

...

5: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 02:42:0d:ff:5f:a3 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:dff:feff:5fa3/64 scope link 
       valid_lft forever preferred_lft forever
```
こちらがあなたの住所です `172.17.0.1`.

次に、次の情報を含むconfig/config.yamlファイルを作成し、場所を設定します（3文字のISOコードについてはhttps://countrycode.org/を参照できます）： 

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## プラグを接続する

最初の実行：

```
docker-compose up     
```

プラグのペアリング モードに切り替えるには、ライトが青色に速く点滅し始めるまで、電源ボタンを数秒間長押しします。

ログには、プラグが mqtt への公開を開始したことが表示されます。


## ペアリング後

他のデバイスをスティックとペアリングさせたくない場合は、「data/configuration.yaml」に移動して「permit_join: false」を設定する必要があります。 サービスを再起動します ( `「Ctrl+C」` を使用し、 

```bash
docker-compose up     
```
もう一度変更を送信してください)。

## ランニング
最初にプラグイン用のアカウントが作成されます。
> すでにアカウントをお持ちの場合は、そのシードを `device_seed` セクションの `config.config.yaml` ファイルに追加する必要があります。
>
> ```
> location: RUS
> service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
> twin_id: 5
> sending_timeout: 3600
> broker_address: "172.17.0.1"
> broker_port: 1883
> device_seed: <device_seed>
>```

アカウントを作成すると、ログにアドレスが表示されます (シードは `config/config.yaml` に追加されます)。
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
取引手数料のためにいくつかのトークンをこのアカウントに送金する必要があります [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts). 

サービスは十分なトークンがあることを確認し、ログに次のように表示されます:
```
plug               | Balance is OK
```
サービスは、プラグからの mqtt メッセージと安全な電力使用量を確認します。 1 時間ごとに (` 「sending_timeout」`  セクションの `「config/config.yaml」` でタイムアウトを変更できます。タイムアウトは秒単位です)、次の情報を含むデータログが作成されます。
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
