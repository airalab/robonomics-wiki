---
title: Домашний сервер на RISC-V

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

**Эта статья предоставит инструкцию по настройке полностью открытого умного дома на RISC-V.**

## Требования к аппаратному обеспечению

* StarFive VisionFive 2 SBC
* USB-TTL-кабель
* SD-карта

## Установка Ubuntu

### Образ

На момент написания этого руководства последним выпуском LTS является [Ubuntu24.04 LTS](https://ubuntu.com/download/risc-v)

Запишите образ на SD-карту, используя [balenaEtcher](https://etcher.balena.io) например

### Загрузка с SD-карты на VisionFive 2

Для загрузки с SD-карты нам нужно установить DIP-переключатели в правильные положения

[https://wiki.ubuntu.com/RISC-V/StarFive VisionFive 2](https://wiki.ubuntu.com/RISC-V/StarFive%20VisionFive%202)

{% roboWikiPicture {src:"docs/home-assistant/riscV-dip-switch.png", alt:"riscv_switch"} %}{% endroboWikiPicture %}

Для загрузки с SD-карты необходимо установить DIP-переключатель в `0 1`

Интернета не было, поэтому нам пришлось использовать кабель USB-TTL для подключения к консоли компьютера. Вот [инструкция](https://doc-en.rvspace.org/VisionFive2/Quick_Start_Guide/VisionFive2_QSG/for_maclinux2%20-%20vf2.html) о том, как подключить кабель

### После первой загрузки

По умолчанию логин и пароль - `ubuntu`. После первой загрузки система попросит вас изменить пароль.

Образ предполагает, что вы используете версию платы v1.3B (см. надпись на плате). Если вы используете версию платы v1.2A,Пожалуйста, выполните следующие действия:

```bash
echo 'StarFive VisionFive 2 v1.2A' | sudo tee /etc/flash-kernel/machine
sudo flash-kernel $(uname -r)
sudo update-grub
sudo reboot
```

## Установка Yggdrasil

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

# Проверка
systemctl status yggdrasil
```

## Установка Home Assistant Core

Мы будем следовать [этой](https://www.home-assistant.io/installation/linux#install-home-assistant-core) статье из официальной документации Home Assistant

### Зависимости

```bash
# Обновление системы
sudo apt-get update
sudo apt-get upgrade -y

# Зависимости HA Core
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez \
libffi
```-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential \
libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev \
libatlas-base-dev

# Следующие пакеты не устанавливаются автоматически, поэтому мы устанавливаем их вручную
sudo apt-get install -y libavcodec-dev libavformat-dev libavutil-dev \
libavdevice-dev libavfilter-dev libswscale-dev pkg-config \
cmake libopenblas-dev

# Из установки HA Core
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s

cd /srv/homeassistant
python3 -m venv .
source bin/activate
python3 -m pip install wheel 

# И еще некоторые зависимости
python3 -m pip install numpy==1.26.0 PyTurboJPEG==1.7.5
```

### Установка Rust

Продолжайте работать от имени пользователя `homeassistant`

{% codeHelper {copy: true}%}

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% endcodeHelper %}

Выйдите и войдите снова, чтобы сделать пакеты `rust` доступными

### Установка HA

Будьте терпеливы, этот шаг займет время, так как много зависимостей собирается изначально.исходный код

{% codeHelper {copy: true}%}

```bash
pip3 install homeassistant==2024.9.3
```

{% endcodeHelper %}

### Запуск HA

Под пользователем `homeassistant` и внутри venv запустите

{% codeHelper {copy: true}%}

```bash
hass
```

{% endcodeHelper %}

После запуска Home Assistant перейдите на панель управления по адресу `http://[RISC-V IP ADDRESS]:8123/`

Давайте создадим службу systemd, чтобы она запускалась автоматически. Остановите `hass` и создайте файл службы:

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

# Проверьте, что служба запущена и работает
systemctl status homeassistant.service
```

## Установка Mosquitto

```bash
sudo apt install mosquitto mosquitto-clients
```sudo mosquitto_passwd -c /etc/mosquitto/passwd mosquitto
sudo systemctl restart mosquitto

# Проверить службу
systemctl status mosquitto
```

## Установка Zigbee2MQTT

Ссылка на статью из официального руководства zigbee2mqtt [manual](https://www.zigbee2mqtt.io/guide/installation/01_linux.html)

Эти команды выполняются от имени пользователя `ubuntu`:

```bash
# Расположение адаптера Zigbee
ls -l /dev/serial/by-id
# lrwxrwxrwx 1 root root 13 Aug  8 14:51 usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20230803183548-if00 -> ../../ttyACM0

# Установить зависимости
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# Добавить пользователя в группу dialout
sudo adduser ubuntu dialout
```

Выйти и войти снова

```bash
# Установить npm из репозитория
sudo apt-get install -y npm

# Скачать и собрать zigbee2mqtt
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
npm run build

# Редактирование файла конфигурации
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml
```

Укажите свой логин и пароль mqtt (если установлены) и местоположение адаптера zigbee:

{% codeHelper {copy: true}%}

```yaml
# Интеграция с Home Assistant (обнаружение MQTT)
homeassistant: true

# Включение веб-интерфейса, по умолчанию работает на порту 8080
frontend:
  port: 8099
# Настройки MQTT
mqtt:
  # Базовая тема MQTT для сообщений zigbee2mqtt
  base_topic: zigbee2mqtt
  # URL сервера MQTT
  server: 'mqtt://localhost'
  # Аутентификация на сервере MQTT, раскомментируйте, если необходимо:
  user: mosquitto
  password: risc-v

# Настройки последовательного порта
serial:
  # Местоположение CC2531 USB сниффера
  port: /dev/ttyACM0

# Расширенные настройки
advanced:
  # Позвольте Zigbee2MQTT сгенерировать сетевой ключ при первом запуске
  network_key: GENERATE
  # Позвольте Zigbee2MQTT сгенерировать pan_id при первом запуске
  pan_id: GENERATE
  # Позвольте Zigbee2MQTT сгенерировать ext_pan_id при первом запуске
  ext_pan_id: СОЗДАТЬ
```

{% endcodeHelper %}

Запустите zigbee2MQTT

{% codeHelper {copy: true}%}

```bash
npm start
```

{% endcodeHelper %}

Если все в порядке, давайте создадим службу systemd:

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
# Или используйте StandardOutput=null, если вы не хотите, чтобы сообщения Zigbee2MQTT заполняли syslog, для получения дополнительных параметров см. systemd.exec(5)
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

# Проверьте службу
systemctl status zigbee2mqtt.service
```

Вы можете найти панель управления zigbee2mqtt по адресу `http://[RISC-V IP ADDRESS]:8099/`

## Установка IPFS

Следующие команды выполняются под`ubuntu` пользователь:

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

Перезайдите от пользователя и соберите пакет:

```bash
git clone https://github.com/ipfs/kubo.git
cd kubo
make build
sudo mv cmd/ipfs/ipfs /usr/local/bin/
```

Перед первым запуском:

```bash
ipfs init
ipfs config profile apply local-discovery
sudo nano /etc/systemd/system/ipfs-daemon.service
```

Создайте службу systemd:

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

# Проверьте службу
systemctl status ipfs-daemon.service
```

## Установка прокси Libp2p

Нам понадобится наш пакет прокси libp2p для обмена данными с домашним сервером:

```bash
git clone https://github.com/PinoutLTD/libp2p-ws-proxy.git
cd libp2p-ws-proxy
npm install
node src/index.js
```

Если всё в порядке, давайте создадим сервис:

{% codeHelper {copy: true}%}

```bash
sudo nano /etc/systemd/system/lp2p-proxy.service
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```ini
[Unit]
Description= Служба прокси Libp2p

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

# Проверка службы
systemctl status lp2p-proxy.service

```


## Установка интеграции Robonomics

> Мы предварительно создали пакеты для удобства

```bash
sudo -u homeassistant -H -s
cd
source /srv/homeassistant/bin/activate
git clone https://github.com/PaTara43/py-bindings-wheels-risc-v
cd py-bindings-wheels-risc-v
pip3 install *
```

### Установка HACS

Мы будем использовать [HACS](https://hacs.xyz/) для установки интеграции. Если HACSне установлен на вашем Home Assistant, вам сначала нужно [установить](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core) его.

### Загрузка интеграции Robonomics

Затем в вашем Home Assistant перейдите в HACS и найдите `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Откройте его и нажмите `Скачать` в правом нижнем углу. Загрузка репозитория может занять некоторое время.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

Вот и все. Теперь вы можете продолжить настройку интеграции Robonomics.