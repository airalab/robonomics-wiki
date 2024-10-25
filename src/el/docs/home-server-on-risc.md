---
title: Οικιακός Διακομιστής σε RISC-V

contributors: [tubleronchik, PaTara43]
εργαλεία:
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

**Αυτό το άρθρο θα παρέχει οδηγίες για το πώς να δημιουργήσετε έναν πλήρως ανοικτού κώδικα έξυπνο οικιακό σύστημα σε RISC-V.**

## Απαιτήσεις Υλικού

* StarFive VisionFive 2 SBC
* Καλώδιο USB-TTL
* Κάρτα SD

## Εγκατάσταση Ubuntu

### Εικόνα

Τη στιγμή που γράφεται αυτό το εγχειρίδιο, η τελευταία έκδοση LTS του Ubuntu είναι [Ubuntu[24.04 LTS](https://ubuntu.com/download/risc-v)

Γράψτε την εικόνα στην κάρτα SD χρησιμοποιώντας το [balenaEtcher](https://etcher.balena.io) για παράδειγμα

### Εκκίνηση από κάρτα SD στο VisionFive 2

Για να εκκινήσετε από κάρτα SD, πρέπει να τοποθετήσετε τους διακόπτες DIP στις σωστές θέσεις

[https://wiki.ubuntu.com/RISC-V/StarFive VisionFive 2](https://wiki.ubuntu.com/RISC-V/StarFive%20VisionFive%202)

{% roboWikiPicture {src:"docs/home-assistant/riscV-dip-switch.png", alt:"riscv_switch"} %}{% endroboWikiPicture %}

Για την εκκίνηση από την κάρτα SD, πρέπει να ρυθμίσετε τον διακόπτη DIP σε `0 1`

Δεν υπήρχε πρόσβαση στο διαδίκτυο, οπότε χρησιμοποιήσαμε καλώδιο USB-TTL για να συνδεθούμε στην κονσόλα του υπολογιστή. Εδώ υπάρχουν οι [οδηγίες](https://doc-en.rvspace.org/VisionFive2/Quick_Start_Guide/VisionFive2_QSG/for_maclinux2%20-%20vf2.html) για το πώς να συνδέσετε το καλώδιο

### Μετά την Πρώτη Εκκίνηση

Από προεπιλογή, το όνομα χρήστη και ο κωδικός πρόσβασης είναι `ubuntu`. Μετά την πρώτη εκκίνηση, το σύστημα θα σας ζητήσει να αλλάξετε τον κωδικό πρόσβασης.

Η εικόνα υποθέτει ότι χρησιμοποιείτε την έκδοση v1.3B της πλακέτας (δείτε το σχέδιο στην πλακέτα). Αν χρησιμοποιείτε την έκδοση πλακέτας v1.2A,Παρακαλώ συνεχίστε ως εξής:

```bash
echo 'StarFive VisionFive 2 v1.2A' | sudo tee /etc/flash-kernel/machine
sudo flash-kernel $(uname -r)
sudo update-grub
sudo reboot
```

## Εγκατάσταση Yggdrasil

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

# Έλεγχος
systemctl status yggdrasil
```

## Εγκατάσταση Πυρήνα Home Assistant

Θα ακολουθήσουμε [αυτό](https://www.home-assistant.io/installation/linux#install-home-assistant-core) το άρθρο από την επίσημη τεκμηρίωση του Home Assistant

### Εξαρτήσεις

```bash
# Ενημέρωση του συστήματος
sudo apt-get update
sudo apt-get upgrade -y

# Εξαρτήσεις HA Core
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez \
libffi```-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential \
libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev \
libatlas-base-dev

# Τα παρακάτω πακέτα δεν εγκαθίστανται αυτόματα, οπότε τα εγκαθιστούμε χειροκίνητα
sudo apt-get install -y libavcodec-dev libavformat-dev libavutil-dev \
libavdevice-dev libavfilter-dev libswscale-dev pkg-config \
cmake libopenblas-dev

# Από την εγκατάσταση του HA Core
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s

cd /srv/homeassistant
python3 -m venv .
source bin/activate
python3 -m pip install wheel 

# Και μερικές ακόμα εξαρτήσεις
python3 -m pip install numpy==1.26.0 PyTurboJPEG==1.7.5
```

### Εγκατάσταση Rust

Συνεχίστε την εργασία υπό τον χρήστη `homeassistant`

{% codeHelper {copy: true}%}

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% endcodeHelper %}

Αποσυνδεθείτε και συνδεθείτε ξανά για να γίνουν διαθέσιμα τα πακέτα `rust`

### Εγκατάσταση HA

Να είστε υπομονετικοί, αυτό το βήμα θα πάρει χρόνο επειδή πολλές εξαρτήσεις κατασκευάζονται απόπηγή

{% codeHelper {copy: true}%}

```bash
pip3 install homeassistant==2024.9.3
```

{% endcodeHelper %}

### Εκκίνηση HA

Με τον χρήστη `homeassistant` και μέσα στο venv εκτελέστε

{% codeHelper {copy: true}%}

```bash
hass
```

{% endcodeHelper %}

Αφού ξεκινήσει το Home Assistant, μεταβείτε στον πίνακα ελέγχου με `http://[RISC-V IP ADDRESS]:8123/`

Ας δημιουργήσουμε ένα υπηρεσία systemd για να το εκκινεί αυτόματα. Σταματήστε το `hass` και δημιουργήστε ένα αρχείο υπηρεσίας:

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

# Ελέγξτε αν η υπηρεσία λειτουργεί
systemctl status homeassistant.service
```

## Εγκατάσταση Mosquitto

```bash
sudo apt install mosquitto mosquitto-clients
```sudo mosquitto_passwd -c /etc/mosquitto/passwd mosquitto
sudo systemctl restart mosquitto

# Έλεγχος της υπηρεσίας
systemctl status mosquitto
```

## Εγκατάσταση Zigbee2MQTT

Αναφορά άρθρου από το επίσημο εγχειρίδιο του zigbee2mqtt [εδώ](https://www.zigbee2mqtt.io/guide/installation/01_linux.html)

Αυτές οι εντολές εκτελούνται υπό τον χρήστη `ubuntu`:

```bash
# Τοποθεσία προσαρμογέα Zigbee
ls -l /dev/serial/by-id
# lrwxrwxrwx 1 root root 13 Aug  8 14:51 usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20230803183548-if00 -> ../../ttyACM0

# Εγκατάσταση εξαρτήσεων
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# Προσθήκη χρήστη στην ομάδα dialout
sudo adduser ubuntu dialout
```

Αποσύνδεση και σύνδεση ξανά

```bash
# Είναι πιο εύκολο να εγκαταστήσετε το npm από το αποθετήριο
sudo apt-get install -y npm

# Λήψη και κατασκευή του zigbee2mqtt
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
npm run build

# Επεξεργασία αρχείου ρύθμισης
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml
```

Βάλτε τη σύνδεση mqtt και τον κωδικό πρόσβασης (αν έχει οριστεί) και την τοποθεσία του προσαρμογέα zigbee:

{% codeHelper {copy: true}%}

```yaml
# Ενσωμάτωση Home Assistant (ανακάλυψη MQTT)
homeassistant: true

# Ενεργοποίηση του προσωπικού χώρου, λειτουργεί στη θύρα 8080 από προεπιλογή
frontend:
  port: 8099
# Ρυθμίσεις MQTT
mqtt:
  # Βασικό θέμα MQTT για τα μηνύματα MQTT του zigbee2mqtt
  base_topic: zigbee2mqtt
  # URL διακομιστή MQTT
  server: 'mqtt://localhost'
  # Ταυτοποίηση διακομιστή MQTT, ξεσχολιάστε αν απαιτείται:
  user: mosquitto
  password: risc-v

# Ρυθμίσεις σειριακής θύρας
serial:
  # Τοποθεσία του CC2531 USB sniffer
  port: /dev/ttyACM0

# Προηγμένες ρυθμίσεις
advanced:
  # Αφήστε το Zigbee2MQTT να δημιουργήσει ένα κλειδί δικτύου στην πρώτη εκκίνηση
  network_key: GENERATE
  # Αφήστε το Zigbee2MQTT να δημιουργήσει ένα pan_id στην πρώτη εκκίνηση
  pan_id: GENERATE
  # Αφήστε το Zigbee2MQTT να δημιουργήσει ένα ext_pan_id στην πρώτη εκκίνηση
  ext_pan_id: ΔΗΜΙΟΥΡΓΗΣΤΕ
```

{% endcodeHelper %}

Εκκινήστε το zigbee2MQTT

{% codeHelper {copy: true}%}

```bash
npm start
```


{% endcodeHelper %}

Αν όλα είναι εντάξει, ας δημιουργήσουμε ένα υπηρεσία systemd:

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
# Ή χρησιμοποιήστε το StandardOutput=null αν δεν θέλετε τα μηνύματα Zigbee2MQTT να γεμίζουν το syslog, για περισσότερες επιλογές δείτε το systemd.exec(5)
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

# Ελέγξτε την υπηρεσία
systemctl status zigbee2mqtt.service
```

Μπορείτε να βρείτε τον πίνακα ελέγχου του zigbee2mqtt στη διεύθυνση `http://[ΔΙΕΥΘΥΝΣΗ IP RISC-V]:8099/`

## Εγκατάσταση IPFS

Οι παρακάτω εντολές εκτελούνται κάτω από`ubuntu` χρήστης:

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

Επανεισέλθετε από τον χρήστη και κατασκευάστε το πακέτο:

```bash
git clone https://github.com/ipfs/kubo.git
cd kubo
make build
sudo mv cmd/ipfs/ipfs /usr/local/bin/
```

Πριν από την πρώτη εκτέλεση:

```bash
ipfs init
ipfs config profile apply local-discovery
sudo nano /etc/systemd/system/ipfs-daemon.service
```

Δημιουργήστε ένα υπηρεσία systemd:

{% codeHelper {copy: true}%}

```ini
[Unit]
Description=Υπηρεσία Δαίμονα IPFS

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

# Ελέγξτε την υπηρεσία
systemctl status ipfs-daemon.service
```

## Εγκατάσταση Προξενού Libp2p

Θα χρειαστούμε το πακέτο προξενού libp2p για την επικοινωνία με τον κεντρικό διακομιστή:

```bash
git clone https://github.com/PinoutLTD/libp2p-ws-proxy.git
cd libp2p-ws-proxy
npm install
node src/index.js
```

Αν όλα είναι εντάξει, ας δημιουργήσουμε έναν υπηρεσία:

{% codeHelper {copy: true}%}

```bash
sudo nano /etc/systemd/system/lp2p-proxy.service
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```ini
[Unit]
Description= Υπηρεσία Προϊόντος Προώθησης Libp2p

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

# Ελέγξτε την υπηρεσία
systemctl status lp2p-proxy.service

```


## Εγκατάσταση Ενσωμάτωσης Robonomics

> Έχουμε προετοιμάσει τα προγράμματα για ευκολία

```bash
sudo -u homeassistant -H -s
cd
source /srv/homeassistant/bin/activate
git clone https://github.com/PaTara43/py-bindings-wheels-risc-v
cd py-bindings-wheels-risc-v
pip3 install *
```

### Εγκατάσταση HACS

Θα χρησιμοποιήσουμε το [HACS](https://hacs.xyz/) για να εγκαταστήσουμε την ενσωμάτωση. Αν το HACSΔεν έχει εγκατασταθεί ακόμα στο Home Assistant σας, πρέπει πρώτα να το [εγκαταστήσετε](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core).

### Λήψη Ενσωμάτωσης Robonomics

Στη συνέχεια, στο Home Assistant σας, πλοηγηθείτε στο HACS και αναζητήστε το `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Ανοίξτε το και κάντε κλικ στο `Λήψη` στην κάτω δεξιά γωνία. Η λήψη του αποθετηρίου μπορεί να πάρει λίγο χρόνο.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

Αυτό είναι όλο. Τώρα, μπορείτε να συνεχίσετε με τη ρύθμιση της Ενσωμάτωσης Robonomics.