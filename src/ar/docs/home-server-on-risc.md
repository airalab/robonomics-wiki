---
title: خادم المنزل على RISC-V

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

**سيقدم هذا المقال تعليمات حول كيفية إعداد منزل ذكي مفتوح المصدر بالكامل على RISC-V.**

## متطلبات الأجهزة

* StarFive VisionFive 2 SBC
* كابل USB-TTL
* بطاقة SD

## تثبيت Ubuntu

### الصورة

في الوقت الحالي لكتابة هذا الدليل، آخر إصدار LTS هو [Ubuntu24.04 LTS](https://ubuntu.com/download/risc-v)

اكتب الصورة على بطاقة SD باستخدام [balenaEtcher](https://etcher.balena.io) على سبيل المثال

### الإقلاع من بطاقة SD على VisionFive 2

من أجل الإقلاع من بطاقة SD، نحتاج إلى وضع مفاتيح DIP في الأوضاع الصحيحة

[https://wiki.ubuntu.com/RISC-V/StarFive VisionFive 2](https://wiki.ubuntu.com/RISC-V/StarFive%20VisionFive%202)

{% roboWikiPicture {src:"docs/home-assistant/riscV-dip-switch.png", alt:"riscv_switch"} %}{% endroboWikiPicture %}

لإقلاع من بطاقة SD، نحتاج إلى ضبط مفتاح DIP على `0 1`

لم يكن هناك اتصال بالإنترنت لذا كان علينا استخدام كبل USB-TTL للاتصال بواجهة التحكم في الكمبيوتر. إليكم [التعليمات](https://doc-en.rvspace.org/VisionFive2/Quick_Start_Guide/VisionFive2_QSG/for_maclinux2%20-%20vf2.html) حول كيفية توصيل الكبل

### بعد الإقلاع الأول

بشكل افتراضي، اسم المستخدم وكلمة المرور هما `ubuntu`. بعد الإقلاع الأول، سيطلب النظام منك تغيير كلمة المرور.

تفترض الصورة أنك تستخدم الإصدار v1.3B من اللوحة (انظر إلى الطباعة الحريرية على اللوحة). إذا كنت تستخدم إصدار اللوحة v1.2A،الرجاء المتابعة على النحو التالي:

```bash
echo 'StarFive VisionFive 2 v1.2A' | sudo tee /etc/flash-kernel/machine
sudo flash-kernel $(uname -r)
sudo update-grub
sudo reboot
```

## تثبيت Yggdrasil

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

# التحقق
systemctl status yggdrasil
```

## تثبيت Home Assistant Core

سنتبع [هذا](https://www.home-assistant.io/installation/linux#install-home-assistant-core) المقال من توثيق Home Assistant الرسمي

### التبعيات

```bash
# تحديث النظام
sudo apt-get update
sudo apt-get upgrade -y

# تبعيات HA Core
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez \
libffi
```- dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential \
libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev \
libatlas-base-dev

# الحزم التالية لا تُثبت تلقائيًا لذا نقوم بتثبيتها يدويًا
sudo apt-get install -y libavcodec-dev libavformat-dev libavutil-dev \
libavdevice-dev libavfilter-dev libswscale-dev pkg-config \
cmake libopenblas-dev

# من تثبيت HA Core
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s

cd /srv/homeassistant
python3 -m venv .
source bin/activate
python3 -m pip install wheel 

# وبعض التبعيات الإضافية
python3 -m pip install numpy==1.26.0 PyTurboJPEG==1.7.5
```

### تثبيت Rust

تابع العمل تحت مستخدم `homeassistant`

{% codeHelper {copy: true}%}

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% endcodeHelper %}

قم بتسجيل الخروج ثم تسجيل الدخول مرة أخرى لجعل حزم `rust` متاحة

### تثبيت HA

كن صبورًا، سيستغرق هذا الخطوة وقتًا لأن العديد من التبعيات تُبنى من الصفرالمصدر

{% codeHelper {copy: true}%}

```bash
pip3 install homeassistant==2024.9.3
```

{% endcodeHelper %}

### تشغيل HA

تحت مستخدم `homeassistant` وداخل venv قم بتشغيل

{% codeHelper {copy: true}%}

```bash
hass
```

{% endcodeHelper %}

بعد بدء تشغيل Home Assistant، انتقل إلى لوحة التحكم باستخدام `http://[عنوان IP RISC-V]:8123/`

لنقم بإنشاء خدمة systemd لتشغيله تلقائيًا. قم بإيقاف `hass` وإنشاء ملف خدمة:

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

# تحقق من أن الخدمة قيد التشغيل
systemctl status homeassistant.service
```

## تثبيت Mosquitto

```bash
sudo apt install mosquitto mosquitto-clients
```sudo mosquitto_passwd -c /etc/mosquitto/passwd mosquitto
sudo systemctl restart mosquitto

# تحقق من الخدمة
systemctl status mosquitto
```

## تثبيت Zigbee2MQTT

مقال الإحالة من دليل zigbee2mqtt الرسمي [هنا](https://www.zigbee2mqtt.io/guide/installation/01_linux.html)

تُشغّل هذه الأوامر تحت مستخدم `ubuntu`:

```bash
# موقع محول Zigbee
ls -l /dev/serial/by-id
# lrwxrwxrwx 1 root root 13 Aug  8 14:51 usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20230803183548-if00 -> ../../ttyACM0

# تثبيت التبعيات
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# إضافة المستخدم إلى مجموعة dialout
sudo adduser ubuntu dialout
```

قم بتسجيل الخروج وتسجيل الدخول

```bash
# من الأسهل تثبيت npm من المستودع
sudo apt-get install -y npm

# تنزيل وبناء zigbee2mqtt
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
npm run build

# تحرير ملف التكوين
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml
```

ضع تسجيل الدخول الخاص بـ mqtt وكلمة المرور (إذا تم تعيينها) وموقع محول zigbee:

{% codeHelper {copy: true}%}

```yaml
# تكامل Home Assistant (اكتشاف MQTT)
homeassistant: true

# تمكين الواجهة الأمامية، تعمل على المنفذ 8080 افتراضيًا
frontend:
  port: 8099
# إعدادات MQTT
mqtt:
  # الموضوع الأساسي لرسائل MQTT zigbee2mqtt
  base_topic: zigbee2mqtt
  # عنوان URL لخادم MQTT
  server: 'mqtt://localhost'
  # المصادقة على خادم MQTT، قم بفك التعليق إذا كانت مطلوبة:
  user: mosquitto
  password: risc-v

# إعدادات التسلسل
serial:
  # موقع جهاز استقبال USB CC2531
  port: /dev/ttyACM0

# إعدادات متقدمة
advanced:
  # السماح لـ Zigbee2MQTT بتوليد مفتاح شبكة في البداية
  network_key: GENERATE
  # السماح لـ Zigbee2MQTT بتوليد pan_id في البداية
  pan_id: GENERATE
  # السماح لـ Zigbee2MQTT بتوليد ext_pan_id في البداية
  ext_pan_id: GENERATE
```

{% endcodeHelper %}

قم بتشغيل zigbee2MQTT

{% codeHelper {copy: true}%}

```bash
npm start
```

{% endcodeHelper %}

إذا كان كل شيء على ما يرام، دعنا نقوم بإنشاء خدمة systemd:

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
# أو استخدم StandardOutput=null إذا لم ترغب في ملء syslog برسائل Zigbee2MQTT، لمزيد من الخيارات انظر إلى systemd.exec(5)
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

# تحقق من الخدمة
systemctl status zigbee2mqtt.service
```

يمكنك العثور على لوحة تحكم zigbee2mqtt على `http://[RISC-V IP ADDRESS]:8099/`

## تثبيت IPFS

يتم تشغيل الأوامر التالية تحت`مستخدم ubuntu`:

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

أعد تسجيل الدخول من المستخدم وقم ببناء الحزمة:

```bash
git clone https://github.com/ipfs/kubo.git
cd kubo
make build
sudo mv cmd/ipfs/ipfs /usr/local/bin/
```

قبل التشغيل الأول:

```bash
ipfs init
ipfs config profile apply local-discovery
sudo nano /etc/systemd/system/ipfs-daemon.service
```

إنشاء خدمة systemd:

{% codeHelper {copy: true}%}

```ini
[Unit]
Description=خدمة ديمون IPFS

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

# تحقق من الخدمة
systemctl status ipfs-daemon.service
```

## تثبيت بروكسي Libp2p

سنحتاج إلى حزمة بروكسي libp2p الخاصة بنا للتواصل مع خادم المنزل:

```bash
git clone https://github.com/PinoutLTD/libp2p-ws-proxy.git
cd libp2p-ws-proxy
npm install
node src/index.js
```

إذا كان كل شيء على ما يرام، دعنا نقوم بإنشاء خدمة:

{% codeHelper {copy: true}%}

```bash
sudo nano /etc/systemd/system/lp2p-proxy.service
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```ini
[Unit]
Description= خدمة الوكيل Libp2p

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

# تحقق من الخدمة
systemctl status lp2p-proxy.service

```


## تثبيت دمج Robonomics

> لقد قمنا ببناء العجلات مسبقًا للراحة

```bash
sudo -u homeassistant -H -s
cd
source /srv/homeassistant/bin/activate
git clone https://github.com/PaTara43/py-bindings-wheels-risc-v
cd py-bindings-wheels-risc-v
pip3 install *
```

### تثبيت HACS

سنستخدم [HACS](https://hacs.xyz/) لتثبيت الدمج. إذا كان HACSلم يتم تثبيته على Home Assistant الخاص بك بعد، تحتاج إلى [تثبيته](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core) أولاً.

### تنزيل تكامل Robonomics

بعد ذلك، في Home Assistant الخاص بك، انتقل إلى HACS وابحث عن `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

افتحه وانقر على `تنزيل` في الزاوية السفلية اليمنى. قد يستغرق تنزيل المستودع بعض الوقت.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

هذا كل شيء. الآن، يمكنك متابعة إعداد تكامل Robonomics.