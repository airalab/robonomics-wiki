---
title: Lesson 5, コネクティビティ 
locale: 'ja' 
contributors: [KiichiSugihara]
translated: true
---

## 複数のパイとしてのIoT

* Device Software
    * FreeRTOS
    * ESP/Arduino
    * シングルボードコンピュータ (RPi、LattePandaなど)
* Connectivity
    * IoT Hub
    * IoT Manager
* Analytics Services
    * AWS
    * Google Cloud IoT Core
    * ThingsBoard

ふつう、ほとんどの方はセンサーやサーバーには興味がなく、データ分析に興味があります。それを手に入れるためには、どのデバイスを使うか、どのように連携するか、どこに接続するかを決める必要があります


## Device Software

家庭用のウェザーステーションを例に考えてみましょう。大気汚染（SDS011）、温度、湿度（BME）のデータを収集する必要があります。ESP8266マイクロコントローラは、このタスクを処理することができます。

必要なもの:

* センサーからのデータを正しく読み取ることができる
* 固有の識別子を持つこと
* データを既知のサーバに転送する
* データのデジタル署名を行う（オプション）

現在のファームウェアは[こちら](https://github.com/LoSk-p/sensors-software/tree/366b19bf447a5fc19220ef89eab0f2440f8db1c2)
からご覧いただけます。

## Connectivityって何?

IoTの世界で、Connectivityとは、さまざまなIoTデバイスをインターネットに接続し、データを送信したり、デバイスを制御したりすることを指します。

よく知られているアーキテクチャのソリューションは、大きく3つのグループに分けられます。

* 完全に分散化されたもの。たとえば、デバイスをメッシュネットワークで接続する。ハードウェア要件が高いため、広域ネットワークには適さない
* 集中型。たとえば、AWSなど。単一のエントリーポイントと接続の容易さを提供するが、サーバーに問題が発生した場合の障害リスクが高い
* ハイブリッド。たとえば、 [Robonomics Connectivity](https://github.com/airalab/sensors-connectivity)。ローカルネットワーク上のデバイスにアドレスを提供し、分散したIPFSメッセージチャネルにデータを公開する

## AWS と Robonomics Connectivityの比較

| 管理サービス 	| AWS                               	|               Robonomics              	|
|---------------------	|-----------------------------------	|---------------------------------------	|
| トランザクションのタイプ    	| テクニカル                         	| テクニカル、経済的                	|
| セキュリティ            	| IT会社によるクラウド管理          	| Polkadot ,Ethereum                 	|
| プロトコル            	| HTTPS, MQTT                       	| IPFS, Robonomics                      	|
| エコシステム           	| private                           	| shared                                	|
| DeFiへのアクセス      	| No                                	| Yes                                   	|
| コスト               	| Pushing data - $1-2 a sensor      	| Pushing data - $0                     	|
|                     	| Shadow         - from $10 a month 	| Digital Twin    - $0,01 a transaction 	|

## Aira上にConnectivityをインストール

https://www.youtube.com/watch?v=JbBNMHAzJKM

### 必要なもの

* [VirtualBox 6.1](https://www.virtualbox.org/wiki/Downloads)以上
* [Aira OS ova image](https://static.aira.life/ova/airaos-21.03_robonomics-winter-school.ova)

[この記事を参考に](/docs/aira-installation-on-vb/)AiraのイメージをVirtualBoxに取り込みます。

SSHでの[接続設定](/docs/aira-connecting-via-ssh/)

すべての準備が整い、SSHでのログインに成功したら、メインパッケージをクローンしてビルドしましょう。
```
git clone https://github.com/airalab/sensors-connectivity
cd sensors-connectivity
git checkout v0.9
nix build -f release.nix
```


それでは、後で使えるようにデフォルトの設定ファイルのコピーを作成しましょう。すべてのオプションについて知りたい方は[こちらの記事](/docs/configuration-options-description/) をご覧ください。次に、パッケージを `roslaunch` で起動します。
```
cp config/default.json config/my.json
source result/setup.zsh
roslaunch sensors_connectivity agent.launch config:=$PWD/config/my.json
```

## センサーをコネクティビティに接続

https://www.youtube.com/watch?v=yxqxBk-6bpI

### 必要なもの

* [Nova SDS011](https://aqicn.org/sensor/sds011) センサー
* [Yarn Packet Manager](https://yarnpkg.com/getting-started/install)

それでは、実際にセンサーを接続し、USBポートを仮想マシンに転送し、マップを設定して、自分の測定結果を見てみましょう。

まず、Aira OSが起動している場合は停止し、対応するUSBデバイスを追加します。

![VB USB Forwarding](../images/vb_forward_usb.jpg)

仮想マシンを起動し、SSHで接続し、仮想マシンのUSBデバイスに合わせて`comstation/port`オプションを設定します。また、`comstation`を有効にして、緯度と経度を設定します。最終的に `config/my.json` は以下のようになります。

```
{
   "general":{
      "publish_interval":30
   },
   "comstation":{
      "enable":true,
      "port":"/dev/ttyUSB0",
      "work_period":0,
      "geo":"59.944917,30.294558",
      "public_key":""
   },
   "httpstation":{
      "enable":false,
      "port":8001
   },
   "mqttstation": {
      "enable": false,
      "host": "connectivity.robonomics.network",
      "port": 1883
   },
   "luftdaten":{
      "enable":false
   },
   "robonomics":{
      "enable":true,
      "ipfs_provider":"/ip4/127.0.0.1/tcp/5001/http",
      "ipfs_topic":"airalab.lighthouse.5.robonomics.eth"
   },
   "datalog":{
      "enable":false,
      "path":"",
      "suri":"",
      "remote":"wss://substrate.ipci.io",
      "dump_interval":3600,
      "temporal_username":"",
      "temporal_password":""
   },
   "dev":{
      "sentry":""
   }
}
```

> 本物のセンサーがない場合は、`sensers-connectivity/utils/virtual-sensor.py` スクリプトを使ってエミュレートすることができます。
>
> 設定ファイルを以下のように変更することで、`HTTPStation`を有効にし、`COMStation`を無効にします。

> ```
> {
>    "general":{
>       "publish_interval":30
>    },
>    "comstation":{
>       "enable":false,
>       "port":"/dev/ttyUSB0",
>       "work_period":0,
>       "geo":"59.944917,30.294558",
>       "public_key":""
>    },
>    "httpstation":{
>       "enable":true,
>       "port":8001
>    },
>    ...
> }
> ```
>
> そして、VM内の専用端末で`utils/virtual-sensor.py`を起動します。

ファイルを保存し、`sensers-connectivity`フォルダからconnectivityを起動します。
```
source result/setup.zsh
roslaunch sensors_connectivity agent.launch config:=$PWD/config/my.json
```

コンソール出力に最初の測定値が表示されます。

VMの中であなたのIPFS IDを探します。イメージを起動した直後、または `ipfs id` コマンドで表示されます。これは後で必要になります。

それでは、マップの独自のインスタンスをセットアップしましょう。ラップトップ（VMではない）で[このリポジトリ](https://github.com/airalab/sensors.robonomics.network)をクローンし、アプリをビルドします。
```
git clone https://github.com/airalab/sensors.robonomics.network
cd sensors.robonomics.network
yarn install
```

`src/agents.json` ファイルを編集し、IPFS ID を入力します。たとえば、以下のようになります。
```
[
  "12D3KooWSCFAD3Lpew1HijniE6oFTuo4jsMwHzF87wNnXkpCRYWn"
]
```

マップを起動します。

```
yarn serve
```

[http://localhost:8080/](http://localhost:8080/)または yarn が教えてくれたアドレスに行き、センサーを探します。

## 実践編

### 軌道 1. ESP + SDS011 センサーを点滅させる

必要なもの:

* ESP8266
* 少なくともこの中から1つのセンサー SDS011, BME280, HTU21D

[このインストラクション](https://wiki.robonomics.network/docs/connect-sensor-to-robonomics/) を使って、センサーをRobonomics Connectivityに接続します。

センサーが[地図](https://sensors.robonomics.network/#/)上に表示されることを確認します。 

### 軌道 2. Connectivityの起動

必要なもの:

* ROS
* Python
* Nix (optional)

[sensors-connectivity](https://github.com/airalab/sensors-connectivity#get-a-package-and-build)の構築と起動

> ビルド方法、インストール方法は [こちら](https://wiki.robonomics.network/docs/iot-sensors-connectivity/) 設定方法は [こちら](https://wiki.robonomics.network/docs/configuration-options-description/)

パッケージの全体像です。

```
    station1 \                        / feeder1
    station2 -  sensors-connectivity  - feeder2
    station3 /                        \ feeder3
```

たとえば、乱数発生器などの新しいステーションや、画面に文字列を表示するなどの新しいフィーダーを実装することが提案されています。

 `IStation` のInterfaceは[こちら](https://github.com/airalab/sensors-connectivity/blob/master/src/stations/istation.py#L73).

 `IFeeder` のInterfaceは[こちら](https://github.com/airalab/sensors-connectivity/blob/master/src/feeders/ifeeder.py#L5)

