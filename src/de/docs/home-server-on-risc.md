---
title: Heimserver auf RISC-V

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

**Dieser Artikel wird Anleitungen dazu geben, wie man ein vollständig Open-Source Smart Home auf RISC-V einrichtet.**

## Hardware-Anforderungen

* StarFive VisionFive 2 SBC
* USB-TTL-Kabel
* SD-Karte

## Ubuntu-Installation

### Image

Zum Zeitpunkt der Erstellung dieses Handbuchs ist die letzte LTS-Version [Ubuntu24.04 LTS](https://ubuntu.com/download/risc-v)

Schreiben Sie das Bild auf die SD-Karte mit [balenaEtcher](https://etcher.balena.io) zum Beispiel

### Booten von der SD-Karte auf VisionFive 2

Um von der SD-Karte zu booten, müssen wir die DIP-Schalter in die richtige Position bringen

[https://wiki.ubuntu.com/RISC-V/StarFive VisionFive 2](https://wiki.ubuntu.com/RISC-V/StarFive%20VisionFive%202)

{% roboWikiPicture {src:"docs/home-assistant/riscV-dip-switch.png", alt:"riscv_switch"} %}{% endroboWikiPicture %}

Für das Booten von der SD-Karte müssen wir den DIP-Schalter auf `0 1` setzen

Es gab kein Internet, also mussten wir ein USB-TTL-Kabel verwenden, um eine Verbindung zur Konsole des Computers herzustellen. Hier sind die [Anweisungen](https://doc-en.rvspace.org/VisionFive2/Quick_Start_Guide/VisionFive2_QSG/for_maclinux2%20-%20vf2.html) zum Anschließen des Kabels

### Nach dem ersten Boot

Standardmäßig sind der Benutzername und das Passwort `ubuntu`. Nach dem ersten Boot wird das System Sie auffordern, das Passwort zu ändern.

Das Bild geht davon aus, dass Sie die Version v1.3B des Boards verwenden (siehe Silkprint auf dem Board). Wenn Sie die Boardversion v1.2A verwenden,Bitte fahren Sie wie folgt fort:

```bash
echo 'StarFive VisionFive 2 v1.2A' | sudo tee /etc/flash-kernel/machine
sudo flash-kernel $(uname -r)
sudo update-grub
sudo reboot
```

## Yggdrasil Installation

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

# Überprüfen
systemctl status yggdrasil
```

## Home Assistant Core Installation

Wir werden [diesem](https://www.home-assistant.io/installation/linux#install-home-assistant-core) Artikel aus der offiziellen Home Assistant-Dokumentation folgen

### Abhängigkeiten

```bash
# System aktualisieren
sudo apt-get update
sudo apt-get upgrade -y

# HA Core-Abhängigkeiten
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez \
libffi```-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential \
libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev \
libatlas-base-dev

# Die folgenden Pakete werden nicht automatisch installiert, daher installieren wir sie manuell
sudo apt-get install -y libavcodec-dev libavformat-dev libavutil-dev \
libavdevice-dev libavfilter-dev libswscale-dev pkg-config \
cmake libopenblas-dev

# Aus der HA Core-Installation
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s

cd /srv/homeassistant
python3 -m venv .
source bin/activate
python3 -m pip install wheel 

# Und einige weitere Abhängigkeiten
python3 -m pip install numpy==1.26.0 PyTurboJPEG==1.7.5
```

### Rust-Installation

Arbeiten Sie weiterhin unter dem Benutzer `homeassistant`

{% codeHelper {copy: true}%}

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% endcodeHelper %}

Abmelden und erneut anmelden, um die `rust`-Pakete verfügbar zu machen

### HA-Installation

Seien Sie geduldig, dieser Schritt wird einige Zeit dauern, da viele Abhängigkeiten erstellt werden.Quelle

{% codeHelper {copy: true}%}

```bash
pip3 install homeassistant==2024.9.3
```

{% endcodeHelper %}

### HA Start

Unter dem Benutzer `homeassistant` und innerhalb des venv ausführen

{% codeHelper {copy: true}%}

```bash
hass
```

{% endcodeHelper %}

Nach dem Start von Home Assistant gehen Sie mit `http://[RISC-V IP-ADRESSE]:8123/` zum Dashboard.

Erstellen wir einen systemd-Dienst, um ihn automatisch auszuführen. Stoppen Sie `hass` und erstellen Sie eine Service-Datei:

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

# Überprüfen Sie, ob der Dienst aktiv und ausgeführt wird
systemctl status homeassistant.service
```

## Mosquitto-Installation

```bash
sudo apt install mosquitto mosquitto-clients
```sudo mosquitto_passwd -c /etc/mosquitto/passwd mosquitto
sudo systemctl restart mosquitto

# Überprüfen Sie den Dienst
systemctl status mosquitto
```

## Zigbee2MQTT Installation

Referenzartikel aus dem offiziellen Zigbee2MQTT [Handbuch](https://www.zigbee2mqtt.io/guide/installation/01_linux.html)

Diese Befehle werden unter dem Benutzer `ubuntu` ausgeführt:

```bash
# Zigbee-Adapterstandort
ls -l /dev/serial/by-id
# lrwxrwxrwx 1 root root 13 Aug  8 14:51 usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20230803183548-if00 -> ../../ttyACM0

# Abhängigkeiten installieren
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# Benutzer zur Dialout-Gruppe hinzufügen
sudo adduser ubuntu dialout
```

Abmelden und wieder anmelden

```bash
# Es ist einfacher, npm aus dem Repository zu installieren
sudo apt-get install -y npm

# Zigbee2MQTT herunterladen und erstellen
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
npm run build

# Bearbeiten der Konfigurationsdatei
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml
```

Geben Sie Ihren MQTT-Benutzernamen und Ihr Passwort (falls festgelegt) sowie den Standort des Zigbee-Adapters ein:

{% codeHelper {copy: true}%}

```yaml
# Home Assistant-Integration (MQTT-Entdeckung)
homeassistant: true

# Aktivieren des Frontends, standardmäßig auf Port 8080
frontend:
  port: 8099
# MQTT-Einstellungen
mqtt:
  # MQTT-Basisthema für zigbee2mqtt MQTT-Nachrichten
  base_topic: zigbee2mqtt
  # MQTT-Server-URL
  server: 'mqtt://localhost'
  # MQTT-Server-Authentifizierung, auskommentieren, wenn erforderlich:
  user: mosquitto
  password: risc-v

# Serielle Einstellungen
serial:
  # Standort des CC2531 USB-Sniffers
  port: /dev/ttyACM0

# Erweiterte Einstellungen
advanced:
  # Lassen Sie Zigbee2MQTT beim ersten Start einen Netzwerkschlüssel generieren
  network_key: GENERATE
  # Lassen Sie Zigbee2MQTT beim ersten Start eine pan_id generieren
  pan_id: GENERATE
  # Lassen Sie Zigbee2MQTT beim ersten Start eine ext_pan_id generieren
  ext_pan_id: GENERATE
```

{% endcodeHelper %}

Starten Sie zigbee2MQTT

{% codeHelper {copy: true}%}

```bash
npm start
```


{% endcodeHelper %}

Wenn alles in Ordnung ist, erstellen wir einen systemd-Dienst:

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
# Oder verwenden Sie StandardOutput=null, wenn Sie nicht möchten, dass Zigbee2MQTT-Nachrichten das Syslog füllen. Weitere Optionen finden Sie unter systemd.exec(5)
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

# Überprüfen Sie den Dienst
systemctl status zigbee2mqtt.service
```

Sie finden das zigbee2mqtt-Dashboard unter `http://[RISC-V IP-ADRESSE]:8099/`

## IPFS-Installation

Die folgenden Befehle werden unter`ubuntu` Benutzer:

```bash
cd
nano .profile
```

```bash
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$GOPATH/bin
```

Melden Sie sich als Benutzer ab und erstellen Sie das Paket:

```bash
git clone https://github.com/ipfs/kubo.git
cd kubo
make build
sudo mv cmd/ipfs/ipfs /usr/local/bin/
```

Vor dem ersten Start:

```bash
ipfs init
ipfs config profile apply local-discovery
sudo nano /etc/systemd/system/ipfs-daemon.service
```

Erstellen Sie einen systemd-Dienst:

```ini
[Unit]
Description=IPFS-Dämon-Dienst

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

# Überprüfen Sie den Dienst
systemctl status ipfs-daemon.service
```

## Libp2p-Proxy-Installation

Wir benötigen unser Libp2p-Proxy-Paket für die Peer-Kommunikation mit dem Heimserver:

```bash
git clone https://github.com/PinoutLTD/libp2p-ws-proxy.git
cd libp2p-ws-proxy
npm install
node src/index.js
```

Wenn alles in Ordnung ist, erstellen wir einen Dienst:

{% codeHelper {copy: true}%}

```bash
sudo nano /etc/systemd/system/lp2p-proxy.service
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```ini
[Unit]
Description= Libp2p-Proxy-Dienst

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

# Überprüfen des Dienstes
systemctl status lp2p-proxy.service

```


## Robonomics-Integration Installation

> Wir haben die Wheels für Ihre Bequemlichkeit bereits vorgefertigt

```bash
sudo -u homeassistant -H -s
cd
source /srv/homeassistant/bin/activate
git clone https://github.com/PaTara43/py-bindings-wheels-risc-v
cd py-bindings-wheels-risc-v
pip3 install *
```

### HACS installieren

Wir werden [HACS](https://hacs.xyz/) verwenden, um die Integration zu installieren. Wenn HACSist noch nicht auf Ihrem Home Assistant installiert, Sie müssen es zuerst [installieren](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core).

### Robonomics-Integration herunterladen

Navigieren Sie als nächstes in Ihrem Home Assistant zu HACS und suchen Sie nach `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Öffnen Sie es und klicken Sie in der unteren rechten Ecke auf `Herunterladen`. Das Herunterladen des Repositorys kann einige Zeit in Anspruch nehmen.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

Das war's. Jetzt können Sie mit der Einrichtung der Robonomics-Integration fortfahren.