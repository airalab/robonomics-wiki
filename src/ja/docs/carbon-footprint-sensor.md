---
title: センサーを接続する

contributors: [LoSk-p, makyul]
---

作業例は次のビデオで確認できます：

https://youtu.be/jsaFCVAx2sA

## 必要なもの

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbeeアダプター [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/)（または[supported](https://www.zigbee2mqtt.io/information/supported_adapters.html)のいずれか）

サービスはRaspberry Piで実行され、Zigbeeプロトコルを介してスマートプラグに接続します。

## Zigbeeスティック

JetHome USB JetStick Z2をお持ちの場合、必要なファームウェアがすでに搭載されているため、フラッシュする必要はありません。ただし、他のアダプターをお持ちの場合は、まずzigbee2MQTTソフトウェアでフラッシュする必要があります。お使いのデバイスに関する手順は[こちら](https://www.zigbee2mqtt.io/information/supported_adapters.html)で見つけることができます。

アダプターを接続し、アダプターアドレスを確認します（`/dev/ttyUSB1`の場合もあります）：
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

最初にUSBポートへのアクセス権を取得する必要があるかもしれません。`dialout`グループにユーザーを追加します（ubuntuでは機能しますが、他のOSではグループ名が異なる場合があります）。
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

`data/configuration.yaml`に移動し、`permit_join: true`に設定します：

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
また、`server`と`port`のフィールドに対応する情報を入力する必要があります。`server`フィールドでは、接続を確立するために`docker0`ブリッジのIPを使用します：

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
ここでのアドレスは`172.17.0.1`です。

次に、次の情報を含むファイル`config/config.yaml`を作成し、場所を設定します（3文字のISOコードについてはhttps://countrycode.org/を参照できます）：

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## プラグを接続する

最初に実行します：

```
docker-compose up     
```

プラグのペアリングモードに切り替えるには、電源ボタンを数秒間長押しして、ライトが急速に青く点滅するまで待ちます。

ログには、今やプラグがmqttにパブリッシュし始めたことが表示されるはずです。

## ペアリング後

他のデバイスがスティックとペアリングできないようにしたい場合は、`data/configuration.yaml`に移動し、`permit_join: false`に設定します。サービスを再起動します（変更を適用するには 'Ctrl+C' を使用し、再度以下を実行します）：

```bash
docker-compose up     
```

## 実行
最初にプラグのアカウントが作成されます。
> すでにアカウントをお持ちの場合は、`config.config.yaml`ファイルの`device_seed`セクションにそのシードを追加する必要があります：
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

アカウントが作成されると、ログにアドレスが表示されます（シードは`config/config.yaml`に追加されます）：
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
このアカウントにトランザクション手数料用のトークンを送金する必要があります。これは[Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts)で行うことができます。

サービスはトークンが十分にあることを確認し、ログには次のように表示されます：
```
plug               | Balance is OK
```
サービスはプラグからのmqttメッセージを受信し、電力使用量を安全に管理します。毎時（`config/config.yaml`の`sending_timeout`セクションでタイムアウトを変更できます、タイムアウトは秒単位です）に、次の情報を含むデータログが作成されます：
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```