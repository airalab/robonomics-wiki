---
title: Server domestico su RISC-V

contributors: [tubleronchik, PaTara43]
strumenti:
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

**Questo articolo fornirà le istruzioni su come configurare una casa intelligente completamente open-source su RISC-V.**

## Requisiti hardware

* StarFive VisionFive 2 SBC
* Cavo USB-TTL
* Scheda SD

## Installazione di Ubuntu

### Immagine

Al momento della stesura di questo manuale, l'ultima versione LTS è [Ubuntu24.04 LTS](https://ubuntu.com/download/risc-v)

Scrivi l'immagine sulla scheda SD utilizzando [balenaEtcher](https://etcher.balena.io) ad esempio

### Avvio da scheda SD su VisionFive 2

Per avviare da scheda SD è necessario posizionare gli interruttori DIP nelle posizioni corrette

[https://wiki.ubuntu.com/RISC-V/StarFive VisionFive 2](https://wiki.ubuntu.com/RISC-V/StarFive%20VisionFive%202)

{% roboWikiPicture {src:"docs/home-assistant/riscV-dip-switch.png", alt:"riscv_switch"} %}{% endroboWikiPicture %}

Per l'avvio dalla scheda SD è necessario impostare l'interruttore DIP su `0 1`

Non c'era connessione a Internet, quindi abbiamo dovuto utilizzare un cavo USB-TTL per collegarci alla console del computer. Ecco le [istruzioni](https://doc-en.rvspace.org/VisionFive2/Quick_Start_Guide/VisionFive2_QSG/for_maclinux2%20-%20vf2.html) su come collegare il cavo

### Dopo il Primo Avvio

Di default, il login e la password sono `ubuntu`. Dopo il primo avvio, il sistema ti chiederà di cambiare la password.

L'immagine presuppone che tu stia utilizzando la versione v1.3B della scheda (vedi stampa sulla scheda). Se stai utilizzando la versione della scheda v1.2A,Per favore procedi come segue:

```bash
echo 'StarFive VisionFive 2 v1.2A' | sudo tee /etc/flash-kernel/machine
sudo flash-kernel $(uname -r)
sudo update-grub
sudo reboot
```

## Installazione di Yggdrasil

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

# Controllo
systemctl status yggdrasil
```

## Installazione di Home Assistant Core

Seguiremo [questo](https://www.home-assistant.io/installation/linux#install-home-assistant-core) articolo dalla documentazione ufficiale di Home Assistant

### Dipendenze

```bash
# Aggiorna il sistema
sudo apt-get update
sudo apt-get upgrade -y

# Dipendenze di HA Core
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez \
libffi```-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential \
libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev \
libatlas-base-dev

# I seguenti pacchetti non vengono installati automaticamente, quindi li installiamo manualmente
sudo apt-get install -y libavcodec-dev libavformat-dev libavutil-dev \
libavdevice-dev libavfilter-dev libswscale-dev pkg-config \
cmake libopenblas-dev

# Dall'installazione di HA Core
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s

cd /srv/homeassistant
python3 -m venv .
source bin/activate
python3 -m pip install wheel 

# E alcune dipendenze aggiuntive
python3 -m pip install numpy==1.26.0 PyTurboJPEG==1.7.5
```

### Installazione di Rust

Continua a lavorare con l'utente `homeassistant`

{% codeHelper {copy: true}%}

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% endcodeHelper %}

Disconnettersi e riconnettersi per rendere disponibili i pacchetti `rust`

### Installazione di HA

Sii paziente, questo passaggio richiederà del tempo poiché molte dipendenze vengono costruite dasorgente

{% codeHelper {copy: true}%}

```bash
pip3 install homeassistant==2024.9.3
```

{% endcodeHelper %}

### Avvio di HA

Sotto l'utente `homeassistant` e all'interno di venv eseguire

{% codeHelper {copy: true}%}

```bash
hass
```

{% endcodeHelper %}

Dopo che Home Assistant è avviato, vai alla dashboard con `http://[INDIRIZZO IP RISC-V]:8123/`

Creiamo un servizio systemd per farlo partire automaticamente. Arresta `hass` e crea un file di servizio:

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

# Controlla che il servizio sia attivo ed in esecuzione
systemctl status homeassistant.service
```

## Installazione di Mosquitto

```bash
sudo apt install mosquitto mosquitto-clients
```sudo mosquitto_passwd -c /etc/mosquitto/passwd mosquitto
sudo systemctl restart mosquitto

# Controlla il servizio
systemctl status mosquitto
```

## Installazione di Zigbee2MQTT

Articolo di riferimento dal manuale ufficiale di zigbee2mqtt [manual](https://www.zigbee2mqtt.io/guide/installation/01_linux.html)

Questi comandi vengono eseguiti con l'utente `ubuntu`:

```bash
# Posizione dell'adattatore Zigbee
ls -l /dev/serial/by-id
# lrwxrwxrwx 1 root root 13 Aug  8 14:51 usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20230803183548-if00 -> ../../ttyACM0

# Installa le dipendenze
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# Aggiungi l'utente al gruppo dialout
sudo adduser ubuntu dialout
```

Disconnettersi e riconnettersi

```bash
# È più semplice installare npm dal repository
sudo apt-get install -y npm

# Scarica e compila zigbee2mqtt
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
npm run build

# Modifica del file di configurazione
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml
```

Inserisci il tuo login e password mqtt (se impostato) e la posizione dell'adattatore zigbee:

{% codeHelper {copy: true}%}

```yaml
# Integrazione con Home Assistant (scoperta MQTT)
homeassistant: true

# Abilita il frontend, in esecuzione sulla porta 8080 di default
frontend:
  port: 8099
# Impostazioni MQTT
mqtt:
  # Argomento base MQTT per i messaggi MQTT di zigbee2mqtt
  base_topic: zigbee2mqtt
  # URL del server MQTT
  server: 'mqtt://localhost'
  # Autenticazione del server MQTT, decommenta se necessario:
  user: mosquitto
  password: risc-v

# Impostazioni seriali
serial:
  # Posizione del sniffer USB CC2531
  port: /dev/ttyACM0

# Impostazioni avanzate
advanced:
  # Permetti a Zigbee2MQTT di generare una chiave di rete al primo avvio
  network_key: GENERATE
  # Permetti a Zigbee2MQTT di generare un pan_id al primo avvio
  pan_id: GENERATE
  # Permetti a Zigbee2MQTT di generare un ext_pan_id al primo avvio
  ext_pan_id: GENERATE
```

{% endcodeHelper %}

Avvia zigbee2MQTT

{% codeHelper {copy: true}%}

```bash
npm start
```

{% endcodeHelper %}

Se tutto è a posto, creiamo un servizio systemd:

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
# Oppure usa StandardOutput=null se non vuoi che i messaggi di Zigbee2MQTT riempiano il syslog, per ulteriori opzioni vedi systemd.exec(5)
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

# Controlla il servizio
systemctl status zigbee2mqtt.service
```

Puoi trovare il cruscotto di zigbee2mqtt all'indirizzo `http://[INDIRIZZO IP RISC-V]:8099/`

## Installazione di IPFS

I seguenti comandi vengono eseguiti sotto`ubuntu` utente:

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

Rilogin dall'utente e costruisci il pacchetto:

```bash
git clone https://github.com/ipfs/kubo.git
cd kubo
make build
sudo mv cmd/ipfs/ipfs /usr/local/bin/
```

Prima del primo avvio:

```bash
ipfs init
ipfs config profile apply local-discovery
sudo nano /etc/systemd/system/ipfs-daemon.service
```

Crea un servizio systemd:

{% codeHelper {copy: true}%}

```ini
[Unit]
Description=Servizio Daemon IPFS

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

# Controlla il servizio
systemctl status ipfs-daemon.service
```

## Installazione del Proxy Libp2p

Avremo bisogno del nostro pacchetto proxy libp2p per la comunicazione di peer con il server domestico:

```bash
git clone https://github.com/PinoutLTD/libp2p-ws-proxy.git
cd libp2p-ws-proxy
npm install
node src/index.js
```

Se tutto è a posto, creiamo un servizio:

{% codeHelper {copy: true}%}

```bash
sudo nano /etc/systemd/system/lp2p-proxy.service
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```ini
[Unit]
Description= Servizio Proxy Libp2p

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

# Controlla il servizio
systemctl status lp2p-proxy.service

```


## Installazione dell'Integrazione Robonomics

> Abbiamo precompilato i pacchetti per comodità

```bash
sudo -u homeassistant -H -s
cd
source /srv/homeassistant/bin/activate
git clone https://github.com/PaTara43/py-bindings-wheels-risc-v
cd py-bindings-wheels-risc-v
pip3 install *
```

### Installa HACS

Utilizzeremo [HACS](https://hacs.xyz/) per installare l'integrazione. Se HACSnon è ancora installato sul tuo Home Assistant, è necessario [installarlo](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core) prima.

### Scarica l'Integrazione Robonomics

Successivamente, nel tuo Home Assistant, vai su HACS e cerca `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Aprilo e clicca su `Download` nell'angolo in basso a destra. Il download del repository potrebbe richiedere del tempo.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

E questo è tutto. Ora puoi continuare con la configurazione dell'Integrazione Robonomics.