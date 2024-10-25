---
title: 在 RISC-V 上搭建家用服务器

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

**本文将提供在 RISC-V 上搭建完全开源智能家居的指南。**

## 硬件要求

* StarFive VisionFive 2 SBC
* USB-TTL 电缆
* SD 卡

## Ubuntu 安装

### 镜像

在编写本手册时，最新的 LTS 版本是 [Ubuntu[24.04 LTS](https://ubuntu.com/download/risc-v)

使用[balenaEtcher](https://etcher.balena.io)将镜像写入SD卡，例如

### 从VisionFive 2的SD卡启动

为了从SD卡启动，我们需要将DIP开关放在正确的位置

[https://wiki.ubuntu.com/RISC-V/StarFive VisionFive 2](https://wiki.ubuntu.com/RISC-V/StarFive%20VisionFive%202)

{% roboWikiPicture {src:"docs/home-assistant/riscV-dip-switch.png", alt:"riscv_switch"} %}{% endroboWikiPicture %}

对于SD卡启动，我们需要将DIP开关设置为 `0 1`

由于没有互联网，我们不得不使用USB-TTL电缆连接到计算机的控制台。这里是如何连接电缆的[说明](https://doc-en.rvspace.org/VisionFive2/Quick_Start_Guide/VisionFive2_QSG/for_maclinux2%20-%20vf2.html)

### 第一次启动后

默认登录名和密码为 `ubuntu`。第一次启动后，系统会要求您更改密码。

该镜像假定您正在使用板卡的v1.3B版本（请参考板卡上的丝印）。如果您使用的是v1.2A版本的板卡，请按以下步骤操作：

```bash
echo 'StarFive VisionFive 2 v1.2A' | sudo tee /etc/flash-kernel/machine
sudo flash-kernel $(uname -r)
sudo update-grub
sudo reboot
```

## Yggdrasil安装

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

# 检查
systemctl status yggdrasil
```

## Home Assistant Core安装

我们将遵循官方Home Assistant文档中的[此](https://www.home-assistant.io/installation/linux#install-home-assistant-core)文章

### 依赖项

```bash
# 更新系统
sudo apt-get update
sudo apt-get upgrade -y

# HA Core依赖项
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez \
libffi
```-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential \
libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev \
libatlas-base-dev

# 以下软件包不会自动安装，因此我们需要手动安装
sudo apt-get install -y libavcodec-dev libavformat-dev libavutil-dev \
libavdevice-dev libavfilter-dev libswscale-dev pkg-config \
cmake libopenblas-dev

# 从HA Core安装开始
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s

cd /srv/homeassistant
python3 -m venv .
source bin/activate
python3 -m pip install wheel 

# 还有一些其他依赖项
python3 -m pip install numpy==1.26.0 PyTurboJPEG==1.7.5
```

### Rust安装

继续在`homeassistant`用户下工作

{% codeHelper {copy: true}%}

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% endcodeHelper %}

注销并重新登录以使`rust`软件包可用

### HA安装

请耐心等待，这一步需要时间，因为有很多依赖项需要构建。来源

```bash
pip3 install homeassistant==2024.9.3
```

### HA启动

在`homeassistant`用户下，进入虚拟环境运行

```bash
hass
```

Home Assistant启动后，使用`http://[RISC-V IP ADDRESS]:8123/`访问仪表板

让我们创建一个systemd服务，使其自动运行。停止`hass`并创建一个服务文件：

```bash
sudo nano /etc/systemd/system/homeassistant.service
```

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

```bash
sudo systemctl start homeassistant.service
sudo systemctl enable homeassistant.service

# 检查服务是否正在运行
systemctl status homeassistant.service
```

## 安装Mosquitto

```bash
sudo apt install mosquitto mosquitto-clients
```sudo mosquitto_passwd -c /etc/mosquitto/passwd mosquitto
sudo systemctl restart mosquitto

# 检查服务状态
systemctl status mosquitto
```

## Zigbee2MQTT 安装

参考官方 zigbee2mqtt [手册](https://www.zigbee2mqtt.io/guide/installation/01_linux.html)

这些命令在 `ubuntu` 用户下运行：

```bash
# Zigbee 适配器位置
ls -l /dev/serial/by-id
# lrwxrwxrwx 1 root root 13 Aug  8 14:51 usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20230803183548-if00 -> ../../ttyACM0

# 安装依赖项
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# 将用户添加到 dialout 组
sudo adduser ubuntu dialout
```

注销并登录

```bash
# 从仓库安装 npm 更容易
sudo apt-get install -y npm

# 下载并构建 zigbee2mqtt
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
npm run build

# 编辑配置文件
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml
```

在配置文件中输入您的 mqtt 登录和密码（如果设置了）以及 zigbee 适配器位置：

{% codeHelper {copy: true}%}

```yaml
# Home Assistant 集成（MQTT 发现）
homeassistant: true

# 启用前端，默认端口为 8080
frontend:
  port: 8099
# MQTT 设置
mqtt:
  # zigbee2mqtt MQTT 消息的 MQTT 基本主题
  base_topic: zigbee2mqtt
  # MQTT 服务器 URL
  server: 'mqtt://localhost'
  # MQTT 服务器身份验证，如果需要请取消注释：
  user: mosquitto
  password: risc-v

# 串口设置
serial:
  # CC2531 USB sniffer 的位置
  port: /dev/ttyACM0

# 高级设置
advanced:
  # 让 Zigbee2MQTT 在第一次启动时生成网络密钥
  network_key: GENERATE
  # 让 Zigbee2MQTT 在第一次启动时生成 pan_id
  pan_id: GENERATE
  # 让 Zigbee2MQTT 在第一次启动时生成 ext_pan_id_pan_id: 生成

```

{% endcodeHelper %}

启动 zigbee2MQTT

{% codeHelper {copy: true}%}

```bash
npm start
```


{% endcodeHelper %}

如果一切正常，让我们创建一个 systemd 服务：

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
# Or use StandardOutput=null if you don't want Zigbee2MQTT messages filling syslog, for more options see systemd.exec(5)
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

# 检查服务
systemctl status zigbee2mqtt.service
```

您可以在 `http://[RISC-V IP ADDRESS]:8099/` 找到 zigbee2mqtt 仪表板

## IPFS 安装

以下命令在`ubuntu` 用户：

{% codeHelper {copy: true}%}

```bash
cd
nano .profile
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```bash
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$GOPATH/bin
```

{% endcodeHelper %}

重新登录用户并构建软件包：

```bash
git clone https://github.com/ipfs/kubo.git
cd kubo
make build
sudo mv cmd/ipfs/ipfs /usr/local/bin/
```

首次运行前：

```bash
ipfs init
ipfs config profile apply local-discovery
sudo nano /etc/systemd/system/ipfs-daemon.service
```

创建一个 systemd 服务：

{% codeHelper {copy: true}%}

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

{% endcodeHelper %}

```bash
sudo systemctl start ipfs-daemon.service
sudo systemctl enable ipfs-daemon.service

# 检查服务状态
systemctl status ipfs-daemon.service
```

## 安装 Libp2p 代理

我们需要 libp2p 代理软件包以便与家庭服务器进行对等通信：

```bash
git clone https://github.com/PinoutLTD/libp2p-ws-proxy.git
cd libp2p-ws-proxy
npm install
node src/index.js
```

如果一切正常，让我们创建一个服务：

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

# 检查服务
systemctl status lp2p-proxy.service

```


## Robonomics 集成安装

> 我们为方便起见预先构建了轮子

```bash
sudo -u homeassistant -H -s
cd
source /srv/homeassistant/bin/activate
git clone https://github.com/PaTara43/py-bindings-wheels-risc-v
cd py-bindings-wheels-risc-v
pip3 install *
```

### 安装 HACS

我们将使用[HACS](https://hacs.xyz/)来安装集成。如果 HACS尚未安装在您的Home Assistant上，您需要[安装](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core)它。

### 下载Robonomics集成

接下来，在您的Home Assistant中，转到HACS并搜索`Robonomics`：

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

打开它，然后点击右下角的`下载`。下载存储库可能需要一些时间。

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

就是这样。现在，您可以继续设置Robonomics集成。