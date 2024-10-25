---
title: RISC-V上のホームサーバー

contributors: [tubleronchik, PaTara43]
tools:
  - Ubuntu 24.04 LTS
    https://ubuntu.com/download/risc-v
  - Home Assistant 2024.9.3
    https://github.com/home-assistant/core
  - Yggdrasil 0.5.8
    https://github.com/yggdrasil-network/yggdrasil-go
  - IPFS 0.32.0-dev
    https://github.com/ipfs/kubo
  - Mosquitto 2.0.18
    https://mosquitto.org/
  - Zigbee2MQTT 1.40.2
    https://github.com/Koenkk/zigbee2mqtt
  - Libp2p Proxy 1.0.2
    https://github.com/PinoutLTD/libp2p-ws-proxy
  - Robonomics Home Assistant Integration 1.9.2
    https://github.com/airalab/homeassistant-robonomics-integration



---

**この記事では、RISC-V上で完全なオープンソースのスマートホームを構築する方法について説明します。**

## ハードウェア要件

* StarFive VisionFive 2 SBC
* USB-TTLケーブル
* SDカード

## Ubuntuのインストール

### イメージ

このマニュアルを作成する時点では、最新のLTSリリースは[Ubuntu24.04 LTS](https://ubuntu.com/download/risc-v)

SDカードに[balenaEtcher](https://etcher.balena.io)を使用してイメージを書き込みます

### VisionFive 2からSDカードをブート

SDカードからブートするためには、DIPスイッチを正しい位置に設定する必要があります

[https://wiki.ubuntu.com/RISC-V/StarFive VisionFive 2](https://wiki.ubuntu.com/RISC-V/StarFive%20VisionFive%202)

{% roboWikiPicture {src:"docs/home-assistant/riscV-dip-switch.png", alt:"riscv_switch"} %}{% endroboWikiPicture %}

SDカードブートには、DIPスイッチを `0 1` に設定する必要があります

インターネットがなかったため、USB-TTLケーブルを使用してコンピューターのコンソールに接続する必要がありました。ケーブルの接続方法については、[こちらの手順](https://doc-en.rvspace.org/VisionFive2/Quick_Start_Guide/VisionFive2_QSG/for_maclinux2%20-%20vf2.html)をご覧ください

### 初回起動後

デフォルトのログインとパスワードは `ubuntu` です。初回起動後、システムはパスワードの変更を求めます。

このイメージは、ボードのバージョンがv1.3Bであることを前提としています（ボード上のシルクプリントを参照）。ボードのバージョンがv1.2Aの場合、以下の手順に従ってください：

```bash
echo 'StarFive VisionFive 2 v1.2A' | sudo tee /etc/flash-kernel/machine
sudo flash-kernel $(uname -r)
sudo update-grub
sudo reboot
```

## Yggdrasilのインストール

```bash
sudo apt install golang-go

cd ~
git clone https://github.com/yggdrasil-network/yggdrasil-go
cd yggdrasil-go
./build

./yggdrasil -genconf > yggdrasil.conf
sudo cp yggdrasil.conf /etc/yggdrasil.conf

sudo cp {yggdrasil,yggdrasilctl} /usr/bin/
sudo groupadd --system yggdrasil
sudo cp contrib/systemd/yggdrasil.service /etc/systemd/system
sudo systemctl daemon-reload

sudo systemctl enable yggdrasil
sudo systemctl start yggdrasil

# 確認
systemctl status yggdrasil
```

## Home Assistant Coreのインストール

公式Home Assistantドキュメントの[こちら](https://www.home-assistant.io/installation/linux#install-home-assistant-core)の記事に従います

### 依存関係

```bash
# システムを更新
sudo apt-get update
sudo apt-get upgrade -y

# HA Coreの依存関係
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez \
libffi
```-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential \
libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev \
libatlas-base-dev

# 以下のパッケージは自動的にインストールされないため、手動でインストールします
sudo apt-get install -y libavcodec-dev libavformat-dev libavutil-dev \
libavdevice-dev libavfilter-dev libswscale-dev pkg-config \
cmake libopenblas-dev

# HA Coreのインストールから
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s

cd /srv/homeassistant
python3 -m venv .
source bin/activate
python3 -m pip install wheel 

# さらにいくつかの依存関係
python3 -m pip install numpy==1.26.0 PyTurboJPEG==1.7.5
```

### Rustのインストール

`homeassistant`ユーザーで作業を続ける

{% codeHelper {copy: true}%}

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% endcodeHelper %}

ログアウトして再度ログインすると、`rust`パッケージが利用可能になります

### HAのインストール

多くの依存関係がビルドされるため、このステップには時間がかかります。ソース

{% codeHelper {copy: true}%}

```bash
pip3 install homeassistant==2024.9.3
```

{% endcodeHelper %}

### HA ランチ

`homeassistant` ユーザーの下で、venv 内で実行します

{% codeHelper {copy: true}%}

```bash
hass
```

{% endcodeHelper %}

Home Assistant が起動したら、`http://[RISC-V IP ADDRESS]:8123/` に移動します

自動的に実行されるように systemd サービスを作成しましょう。`hass` を停止して、サービスファイルを作成します:

{% codeHelper {copy: true}%}

```bash
sudo nano /etc/systemd/system/homeassistant.service
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```ini
[Unit]
Description=Home Assistant
After=network-online.target

[Service]
Type=simple
User=homeassistant
WorkingDirectory=/home/homeassistant/.homeassistant
ExecStart=/srv/homeassistant/bin/hass -c "/home/homeassistant/.homeassistant"
RestartForceExitStatus=100

[Install]
WantedBy=multi-user.target
```

{% endcodeHelper %}

```bash
sudo systemctl start homeassistant.service
sudo systemctl enable homeassistant.service

# サービスが起動しているか確認
systemctl status homeassistant.service
```

## Mosquitto インストール

```bash
sudo apt install mosquitto mosquitto-clients
```sudo mosquitto_passwd -c /etc/mosquitto/passwd mosquitto
sudo systemctl restart mosquitto

# サービスを確認
systemctl status mosquitto
```

## Zigbee2MQTTのインストール

公式zigbee2mqttの[マニュアル](https://www.zigbee2mqtt.io/guide/installation/01_linux.html)からの参考記事

これらのコマンドは`ubuntu`ユーザーで実行されます：

```bash
# Zigbeeアダプターの場所
ls -l /dev/serial/by-id
# lrwxrwxrwx 1 root root 13 Aug  8 14:51 usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20230803183548-if00 -> ../../ttyACM0

# 依存関係のインストール
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# dialoutグループにユーザーを追加
sudo adduser ubuntu dialout
```

ログアウトしてログインします

```bash
# リポジトリからnpmをインストールするのが簡単です
sudo apt-get install -y npm

# zigbee2mqttのダウンロードとビルド
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
npm run build

# 設定ファイルの編集
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml
```

mqttのログイン情報とパスワード（設定されている場合）およびzigbeeアダプタの場所を入力してください：

{% codeHelper {copy: true}%}

```yaml
# Home Assistantの統合（MQTTディスカバリ）
homeassistant: true

# フロントエンドを有効にする（デフォルトではポート8080で実行）
frontend:
  port: 8099
# MQTTの設定
mqtt:
  # zigbee2mqtt MQTTメッセージのためのMQTTベーストピック
  base_topic: zigbee2mqtt
  # MQTTサーバーのURL
  server: 'mqtt://localhost'
  # MQTTサーバーの認証が必要な場合はコメントを外してください：
  user: mosquitto
  password: risc-v

# シリアル設定
serial:
  # CC2531 USBスニッファーの場所
  port: /dev/ttyACM0

# 高度な設定
advanced:
  # Zigbee2MQTTにネットワークキーを最初の起動時に生成させる
  network_key: GENERATE
  # Zigbee2MQTTにpan_idを最初の起動時に生成させる
  pan_id: GENERATE
  # Zigbee2MQTTにext_pan_idを最初の起動時に生成させる
  ext_pan_id: 生成
```

{% endcodeHelper %}

zigbee2MQTTを起動します

{% codeHelper {copy: true}%}

```bash
npm start
```


{% endcodeHelper %}

すべてが正常であれば、systemdサービスを作成しましょう：

{% codeHelper {copy: true}%}

```bash
sudo nano /etc/systemd/system/zigbee2mqtt.service
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```ini
[Unit]
Description=zigbee2mqtt
After=network.target

[Service]
Environment=NODE_ENV=production
Type=notify
ExecStart=/usr/bin/node index.js
WorkingDirectory=/opt/zigbee2mqtt
StandardOutput=inherit
# もしあなたがZigbee2MQTTのメッセージがsyslogを埋め尽くすのを望まない場合は、StandardOutput=nullを使用してください。その他のオプションについてはsystemd.exec(5)を参照してください。
StandardError=inherit
WatchdogSec=10s
Restart=always
RestartSec=10s
User=ubuntu

[Install]
WantedBy=multi-user.target
```

{% endcodeHelper %}

```bash
sudo systemctl start zigbee2mqtt.service
sudo systemctl enable zigbee2mqtt.service

# サービスを確認
systemctl status zigbee2mqtt.service
```

zigbee2mqttダッシュボードは`http://[RISC-V IP ADDRESS]:8099/`で見つけることができます

## IPFSのインストール

以下のコマンドは以下で実行されます`ubuntu`ユーザー：

```bash
cd
nano .profile
```

```bash
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$GOPATH/bin
```

ユーザーから再ログインしてパッケージをビルドします：

```bash
git clone https://github.com/ipfs/kubo.git
cd kubo
make build
sudo mv cmd/ipfs/ipfs /usr/local/bin/
```

最初の実行前に：

```bash
ipfs init
ipfs config profile apply local-discovery
sudo nano /etc/systemd/system/ipfs-daemon.service
```

systemdサービスを作成します：

```ini
[Unit]
Description=IPFS Daemon Service

[Service]
Type=simple
ExecStart=/usr/local/bin/ipfs daemon --enable-gc --migrate=true
User=ubuntu

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl start ipfs-daemon.service
sudo systemctl enable ipfs-daemon.service

# サービスを確認
systemctl status ipfs-daemon.service
```

## Libp2pプロキシのインストール

ホームサーバーとのピアリング通信にlibp2pプロキシパッケージが必要です：

```bash
git clone https://github.com/PinoutLTD/libp2p-ws-proxy.git
cd libp2p-ws-proxy
npm install
node src/index.js
```

問題がなければ、サービスを作成しましょう：

{% codeHelper {copy: true}%}

```bash
sudo nano /etc/systemd/system/lp2p-proxy.service
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```ini
[Unit]
Description= Libp2p Proxy Service

[Service]
Type=simple
WorkingDirectory=/home/ubuntu/libp2p-ws-proxy/
ExecStart=/usr/bin/node src/index.js
User=ubuntu
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

{% endcodeHelper %}

```bash
sudo systemctl start lp2p-proxy.service
sudo systemctl enable lp2p-proxy.service

# サービスを確認
systemctl status lp2p-proxy.service

```


## Robonomics 統合のインストール

> 便宜のためにホイールを事前にビルドしました

```bash
sudo -u homeassistant -H -s
cd
source /srv/homeassistant/bin/activate
git clone https://github.com/PaTara43/py-bindings-wheels-risc-v
cd py-bindings-wheels-risc-v
pip3 install *
```

### HACS のインストール

[Integration](https://hacs.xyz/) をインストールするために [HACS](https://hacs.xyz/) を使用します。HACSHome Assistantにはまだインストールされていません。まずは[こちら](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core)からインストールしてください。

### Robonomics Integrationのダウンロード

次に、Home AssistantでHACSに移動し、`Robonomics`を検索します：

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

それを開き、右下隅の`Download`をクリックします。リポジトリのダウンロードには時間がかかる場合があります。

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

以上です。これで、Robonomics Integrationの設定を続行できます。