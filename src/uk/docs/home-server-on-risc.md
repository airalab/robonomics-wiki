---
title: Домашній сервер на RISC-V

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

**У цій статті будуть наведені інструкції щодо налаштування повністю відкритого домашнього розумного будинку на RISC-V.**

## Вимоги до апаратного забезпечення

* StarFive VisionFive 2 SBC
* Кабель USB-TTL
* SD-карта

## Встановлення Ubuntu

### Зображення

На момент написання цього посібника останнім релізом LTS було [Ubuntu24.04 LTS](https://ubuntu.com/download/risc-v)

Запишіть зображення на SD-карту, використовуючи [balenaEtcher](https://etcher.balena.io) наприклад

### Завантаження з SD-карти на VisionFive 2

Для завантаження з SD-карти нам потрібно встановити перемикачі DIP у правильні положення

[https://wiki.ubuntu.com/RISC-V/StarFive VisionFive 2](https://wiki.ubuntu.com/RISC-V/StarFive%20VisionFive%202)

{% roboWikiPicture {src:"docs/home-assistant/riscV-dip-switch.png", alt:"riscv_switch"} %}{% endroboWikiPicture %}

Для завантаження з SD-карти потрібно встановити перемикач DIP на `0 1`

Інтернету не було, тому нам довелося використовувати USB-TTL кабель для підключення до консолі комп'ютера. Ось [інструкція](https://doc-en.rvspace.org/VisionFive2/Quick_Start_Guide/VisionFive2_QSG/for_maclinux2%20-%20vf2.html) про те, як підключити кабель

### Після першого завантаження

За замовчуванням логін та пароль - `ubuntu`. Після першого завантаження система попросить вас змінити пароль.

Зображення передбачає, що ви використовуєте версію плати v1.3B (див. надрук на платі). Якщо ви використовуєте версію плати v1.2A,будь ласка, виконайте наступне:

```bash
echo 'StarFive VisionFive 2 v1.2A' | sudo tee /etc/flash-kernel/machine
sudo flash-kernel $(uname -r)
sudo update-grub
sudo reboot
```

## Встановлення Yggdrasil

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

# Перевірка
systemctl status yggdrasil
```

## Встановлення Home Assistant Core

Ми будемо дотримуватися [цієї](https://www.home-assistant.io/installation/linux#install-home-assistant-core) статті з офіційної документації Home Assistant

### Залежності

```bash
# Оновлення системи
sudo apt-get update
sudo apt-get upgrade -y

# Залежності HA Core
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez \
libffi```-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential \
libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev \
libatlas-base-dev

# Наступні пакети не встановлюються автоматично, тому ми встановлюємо їх вручну
sudo apt-get install -y libavcodec-dev libavformat-dev libavutil-dev \
libavdevice-dev libavfilter-dev libswscale-dev pkg-config \
cmake libopenblas-dev

# З установкою HA Core
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s

cd /srv/homeassistant
python3 -m venv .
source bin/activate
python3 -m pip install wheel 

# І ще деякі залежності
python3 -m pip install numpy==1.26.0 PyTurboJPEG==1.7.5
```

### Встановлення Rust

Продовжуйте працювати від імені користувача `homeassistant`

{% codeHelper {copy: true}%}

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% endcodeHelper %}

Вийдіть та увійдіть знову, щоб пакети `rust` стали доступними

### Встановлення HA

Будьте терплячими, цей крок займе час, оскільки будується багато залежностей.джерело

{% codeHelper {copy: true}%}

```bash
pip3 install homeassistant==2024.9.3
```

{% endcodeHelper %}

### Запуск HA

Під користувачем `homeassistant` та всередині venv запустіть

{% codeHelper {copy: true}%}

```bash
hass
```

{% endcodeHelper %}

Після запуску Home Assistant перейдіть на панель приладів за допомогою `http://[RISC-V IP ADDRESS]:8123/`

Давайте створимо службу systemd, щоб запускати його автоматично. Зупиніть `hass` та створіть файл служби:

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

# Перевірте, чи служба працює
systemctl status homeassistant.service
```

## Встановлення Mosquitto

```bash
sudo apt install mosquitto mosquitto-clients
```sudo mosquitto_passwd -c /etc/mosquitto/passwd mosquitto
sudo systemctl restart mosquitto

# Перевірка служби
systemctl status mosquitto
```

## Встановлення Zigbee2MQTT

Посилання на статтю з офіційного посібника zigbee2mqtt [manual](https://www.zigbee2mqtt.io/guide/installation/01_linux.html)

Ці команди виконуються від імені користувача `ubuntu`:

```bash
# Розташування адаптера Zigbee
ls -l /dev/serial/by-id
# lrwxrwxrwx 1 root root 13 Aug  8 14:51 usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20230803183548-if00 -> ../../ttyACM0

# Встановлення залежностей
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# Додати користувача до групи dialout
sudo adduser ubuntu dialout
```

Вийдіть та увійдіть знову

```bash
# Легше встановити npm з репозиторію
sudo apt-get install -y npm

# Завантажити та зібрати zigbee2mqtt
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
npm run build

# Редагування файлу конфігурації
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml
```

Введіть ваш логін та пароль mqtt (якщо встановлено) та розташування адаптера zigbee:

{% codeHelper {copy: true}%}

```yaml
# Інтеграція Home Assistant (виявлення MQTT)
homeassistant: true

# Увімкнути веб-інтерфейс, за замовчуванням працює на порту 8080
frontend:
  port: 8099
# Налаштування MQTT
mqtt:
  # Базова тема MQTT для повідомлень zigbee2mqtt MQTT
  base_topic: zigbee2mqtt
  # URL сервера MQTT
  server: 'mqtt://localhost'
  # Аутентифікація сервера MQTT, розкоментуйте, якщо потрібно:
  user: mosquitto
  password: risc-v

# Налаштування послідовного порту
serial:
  # Розташування CC2531 USB аналізатора
  port: /dev/ttyACM0

# Розширені налаштування
advanced:
  # Дозвольте Zigbee2MQTT генерувати ключ мережі при першому запуску
  network_key: GENERATE
  # Дозвольте Zigbee2MQTT генерувати pan_id при першому запуску
  pan_id: GENERATE
  # Дозвольте Zigbee2MQTT генерувати ext_pan_id при першому запуску
  ext_pan_id: СТВОРИТИ
```

{% endcodeHelper %}

Запустіть zigbee2MQTT

{% codeHelper {copy: true}%}

```bash
npm start
```


{% endcodeHelper %}

Якщо все гаразд, створимо службу systemd:

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
# Або використовуйте StandardOutput=null, якщо ви не хочете, щоб повідомлення Zigbee2MQTT заповнювали syslog, для отримання додаткових параметрів див. systemd.exec(5)
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

# Перевірте службу
systemctl status zigbee2mqtt.service
```

Ви можете знайти панель управління zigbee2mqtt за адресою `http://[RISC-V IP ADDRESS]:8099/`

## Встановлення IPFS

Наступні команди виконуються під`ubuntu` користувач:

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

Перезаходьте з користувача та збудуйте пакет:

```bash
git clone https://github.com/ipfs/kubo.git
cd kubo
make build
sudo mv cmd/ipfs/ipfs /usr/local/bin/
```

Перш ніж запустити вперше:

```bash
ipfs init
ipfs config profile apply local-discovery
sudo nano /etc/systemd/system/ipfs-daemon.service
```

Створіть службу systemd:

{% codeHelper {copy: true}%}

```ini
[Unit]
Description=Служба демона IPFS

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

# Перевірте службу
systemctl status ipfs-daemon.service
```

## Встановлення проксі libp2p

Нам знадобиться наш пакет проксі libp2p для обміну даними з домашнім сервером:

```bash
git clone https://github.com/PinoutLTD/libp2p-ws-proxy.git
cd libp2p-ws-proxy
npm install
node src/index.js
```

Якщо все в порядку, створимо сервіс:

{% codeHelper {copy: true}%}

```bash
sudo nano /etc/systemd/system/lp2p-proxy.service
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```ini
[Unit]
Description= Служба проксі Libp2p

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

# Перевірка сервісу
systemctl status lp2p-proxy.service

```


## Встановлення інтеграції Robonomics

> Ми попередньо побудували колеса для зручності

```bash
sudo -u homeassistant -H -s
cd
source /srv/homeassistant/bin/activate
git clone https://github.com/PaTara43/py-bindings-wheels-risc-v
cd py-bindings-wheels-risc-v
pip3 install *
```

### Встановлення HACS

Ми використаємо [HACS](https://hacs.xyz/) для встановлення інтеграції. Якщо HACSне встановлено на вашому Home Assistant, вам спочатку потрібно [встановити](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core) його.

### Завантаження Інтеграції Robonomics

Далі, у вашому Home Assistant перейдіть до HACS та знайдіть `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Відкрийте його та натисніть `Завантажити` у нижньому правому куті. Завантаження репозиторію може зайняти деякий час.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

Це все. Тепер ви можете продовжити налаштування Інтеграції Robonomics.