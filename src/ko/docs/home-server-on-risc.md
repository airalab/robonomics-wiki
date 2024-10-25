---
title: 홈 서버에서 RISC-V 사용하기

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

**이 기사에서는 RISC-V에서 완전한 오픈 소스 스마트 홈을 설정하는 방법을 안내합니다.**

## 하드웨어 요구 사항

* StarFive VisionFive 2 SBC
* USB-TTL 케이블
* SD 카드

## Ubuntu 설치

### 이미지

이 매뉴얼을 작성하는 시점에서 최신 LTS 릴리스는 [Ubuntu24.04 LTS](https://ubuntu.com/download/risc-v)

[balenaEtcher](https://etcher.balena.io)를 사용하여 SD 카드에 이미지를 작성합니다.

### VisionFive 2에서 SD 카드 부팅

SD 카드에서 부팅하려면 DIP 스위치를 올바른 위치에 놓아야 합니다.

[https://wiki.ubuntu.com/RISC-V/StarFive VisionFive 2](https://wiki.ubuntu.com/RISC-V/StarFive%20VisionFive%202)

{% roboWikiPicture {src:"docs/home-assistant/riscV-dip-switch.png", alt:"riscv_switch"} %}{% endroboWikiPicture %}

SD 카드 부팅을 위해 DIP 스위치를 `0 1`로 설정해야 합니다.

인터넷이 없어 컴퓨터 콘솔에 연결하기 위해 USB-TTL 케이블을 사용해야 했습니다. 케이블을 연결하는 방법은 [여기](https://doc-en.rvspace.org/VisionFive2/Quick_Start_Guide/VisionFive2_QSG/for_maclinux2%20-%20vf2.html)에 안내되어 있습니다.

### 첫 번째 부팅 후

기본적으로 로그인 및 비밀번호는 `ubuntu`입니다. 첫 번째 부팅 후 시스템에서 비밀번호를 변경하라는 메시지가 표시됩니다.

이 이미지는 보드의 버전이 v1.3B인 것을 가정합니다 (보드에 있는 실크프린트 참조). 만약 보드 버전이 v1.2A라면,다음과 같이 진행하십시오:

```bash
echo 'StarFive VisionFive 2 v1.2A' | sudo tee /etc/flash-kernel/machine
sudo flash-kernel $(uname -r)
sudo update-grub
sudo reboot
```

## Yggdrasil 설치

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

# 확인
systemctl status yggdrasil
```

## Home Assistant Core 설치

공식 Home Assiatant 문서에서 [이](https://www.home-assistant.io/installation/linux#install-home-assistant-core) 문서를 따를 것입니다.

### 의존성

```bash
# 시스템 업데이트
sudo apt-get update
sudo apt-get upgrade -y

# HA Core 의존성
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez \
libffi```-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential \
libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev \
libatlas-base-dev

# 다음 패키지들은 자동으로 설치되지 않으므로 수동으로 설치합니다
sudo apt-get install -y libavcodec-dev libavformat-dev libavutil-dev \
libavdevice-dev libavfilter-dev libswscale-dev pkg-config \
cmake libopenblas-dev

# HA Core 설치에서
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s

cd /srv/homeassistant
python3 -m venv .
source bin/activate
python3 -m pip install wheel 

# 그리고 몇 가지 더 필요한 종속성들
python3 -m pip install numpy==1.26.0 PyTurboJPEG==1.7.5
```

### Rust 설치

`homeassistant` 사용자로 계속 작업합니다

{% codeHelper {copy: true}%}

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% endcodeHelper %}

로그아웃하고 다시 로그인하여 `rust` 패키지를 사용할 수 있게 합니다

### HA 설치

이 단계는 많은 종속성이 빌드되기 때문에 시간이 걸릴 수 있습니다.소스

{% codeHelper {copy: true}%}

```bash
pip3 install homeassistant==2024.9.3
```

{% endcodeHelper %}

### HA 시작

`homeassistant` 사용자로 들어가서 venv 내부에서 실행

{% codeHelper {copy: true}%}

```bash
hass
```

{% endcodeHelper %}

Home Assistant가 시작되면 대시보드로 이동하여 `http://[RISC-V IP 주소]:8123/`로 이동합니다.

자동으로 실행되도록 systemd 서비스를 만들어 봅시다. `hass`를 중지하고 서비스 파일을 만듭니다:

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

# 서비스가 실행 중인지 확인
systemctl status homeassistant.service
```

## Mosquitto 설치

```bash
sudo apt install mosquitto mosquitto-clients
```sudo mosquitto_passwd -c /etc/mosquitto/passwd mosquitto
sudo systemctl restart mosquitto

# 서비스 확인
systemctl status mosquitto
```

## Zigbee2MQTT 설치

공식 zigbee2mqtt [매뉴얼](https://www.zigbee2mqtt.io/guide/installation/01_linux.html)에서 참조

이 명령어들은 `ubuntu` 사용자로 실행됩니다:

```bash
# Zigbee 어댑터 위치
ls -l /dev/serial/by-id
# lrwxrwxrwx 1 root root 13 Aug  8 14:51 usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20230803183548-if00 -> ../../ttyACM0

# 의존성 설치
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# 사용자를 dialout 그룹에 추가
sudo adduser ubuntu dialout
```

로그아웃하고 다시 로그인합니다.

```bash
# 레포지토리에서 npm을 설치하는 것이 더 쉽습니다
sudo apt-get install -y npm

# zigbee2mqtt 다운로드 및 빌드
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
npm run build

# 구성 파일 편집
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml
```

mqtt 로그인 및 비밀번호(설정된 경우) 및 zigbee 어댑터 위치를 입력하십시오:

{% codeHelper {copy: true}%}

```yaml
# Home Assistant 통합 (MQTT 디스커버리)
homeassistant: true

# 프론트엔드 활성화, 기본적으로 8080 포트에서 실행
frontend:
  port: 8099
# MQTT 설정
mqtt:
  # zigbee2mqtt MQTT 메시지를 위한 MQTT 기본 주제
  base_topic: zigbee2mqtt
  # MQTT 서버 URL
  server: 'mqtt://localhost'
  # MQTT 서버 인증, 필요한 경우 주석 해제:
  user: mosquitto
  password: risc-v

# 시리얼 설정
serial:
  # CC2531 USB 스니퍼의 위치
  port: /dev/ttyACM0

# 고급 설정
advanced:
  # Zigbee2MQTT가 처음 시작할 때 네트워크 키를 생성하도록 허용
  network_key: GENERATE
  # Zigbee2MQTT가 처음 시작할 때 pan_id를 생성하도록 허용
  pan_id: GENERATE
  # Zigbee2MQTT가 처음 시작할 때 ext_pan_id를 생성하도록 허용
  ext_pan_id: 생성
```

{% endcodeHelper %}

zigbee2MQTT 시작

{% codeHelper {copy: true}%}

```bash
npm start
```


{% endcodeHelper %}

모든 것이 정상이라면 systemd 서비스를 생성합시다:

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
# 또는 Zigbee2MQTT 메시지가 syslog을 채우는 것을 원치 않는 경우 StandardOutput=null을 사용하십시오. 더 많은 옵션은 systemd.exec(5)를 참조하십시오.
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

# 서비스 확인
systemctl status zigbee2mqtt.service
```

zigbee2mqtt 대시보드는 `http://[RISC-V IP 주소]:8099/`에서 찾을 수 있습니다.

## IPFS 설치

다음 명령은 아래에서 실행됩니다.`ubuntu` 사용자:

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

사용자에서 다시 로그인하고 패키지를 빌드하십시오:

```bash
git clone https://github.com/ipfs/kubo.git
cd kubo
make build
sudo mv cmd/ipfs/ipfs /usr/local/bin/
```

첫 실행 전:

```bash
ipfs init
ipfs config profile apply local-discovery
sudo nano /etc/systemd/system/ipfs-daemon.service
```

systemd 서비스를 생성하십시오:

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

# 서비스 확인
systemctl status ipfs-daemon.service
```

## Libp2p 프록시 설치

홈 서버와의 피어링 통신을 위해 libp2p 프록시 패키지가 필요합니다:

```bash
git clone https://github.com/PinoutLTD/libp2p-ws-proxy.git
cd libp2p-ws-proxy
npm install
node src/index.js
```

모든 것이 정상이라면, 서비스를 생성합시다:

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

# 서비스 확인
systemctl status lp2p-proxy.service

```


## Robonomics 통합 설치

> 편의를 위해 미리 빌드된 휠을 제공합니다

```bash
sudo -u homeassistant -H -s
cd
source /srv/homeassistant/bin/activate
git clone https://github.com/PaTara43/py-bindings-wheels-risc-v
cd py-bindings-wheels-risc-v
pip3 install *
```

### HACS 설치

통합을 설치하기 위해 [HACS](https://hacs.xyz/)를 사용할 것입니다. 만약 HACS홈 어시스턴트에는 아직 설치되지 않았습니다. 먼저 [설치](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core)해야 합니다.

### Robonomics 통합 다운로드

이제 홈 어시스턴트에서 HACS로 이동하여 `Robonomics`를 검색합니다:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

열고 오른쪽 하단의 `다운로드`를 클릭합니다. 저장소를 다운로드하는 데 시간이 걸릴 수 있습니다.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

이제 Robonomics 통합 설정을 계속할 수 있습니다.