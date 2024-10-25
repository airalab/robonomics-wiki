---
title: Serveur domestique sur RISC-V

contributeurs: [tubleronchik, PaTara43]
outils:
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

**Cet article fournira des instructions sur la configuration d'une maison intelligente entièrement open source sur RISC-V.**

## Exigences matérielles

* StarFive VisionFive 2 SBC
* Câble USB-TTL
* Carte SD

## Installation d'Ubuntu

### Image

Au moment de la rédaction de ce manuel, la dernière version LTS d'[Ubuntu24.04 LTS](https://ubuntu.com/download/risc-v)

Écrivez l'image sur la carte SD en utilisant [balenaEtcher](https://etcher.balena.io) par exemple

### Démarrer à partir de la carte SD sur VisionFive 2

Pour démarrer à partir de la carte SD, nous devons placer les commutateurs DIP dans les bonnes positions

[https://wiki.ubuntu.com/RISC-V/StarFive VisionFive 2](https://wiki.ubuntu.com/RISC-V/StarFive%20VisionFive%202)

{% roboWikiPicture {src:"docs/home-assistant/riscV-dip-switch.png", alt:"riscv_switch"} %}{% endroboWikiPicture %}

Pour le démarrage à partir de la carte SD, nous devons régler le commutateur DIP sur `0 1`

Il n'y avait pas d'accès à Internet, nous avons donc dû utiliser un câble USB-TTL pour se connecter à la console de l'ordinateur. Voici les [instructions](https://doc-en.rvspace.org/VisionFive2/Quick_Start_Guide/VisionFive2_QSG/for_maclinux2%20-%20vf2.html) sur comment connecter le câble

### Après le premier démarrage

Par défaut, le nom d'utilisateur et le mot de passe sont `ubuntu`. Après le premier démarrage, le système vous demandera de changer le mot de passe.

L'image suppose que vous utilisez la version v1.3B de la carte (voir l'inscription sur la carte). Si vous utilisez la version v1.2A de la carte,Veuillez procéder comme suit :

```bash
echo 'StarFive VisionFive 2 v1.2A' | sudo tee /etc/flash-kernel/machine
sudo flash-kernel $(uname -r)
sudo update-grub
sudo reboot
```

## Installation de Yggdrasil

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

# Vérification
systemctl status yggdrasil
```

## Installation de Home Assistant Core

Nous suivrons [cet article](https://www.home-assistant.io/installation/linux#install-home-assistant-core) de la documentation officielle de Home Assistant

### Dépendances

```bash
# Mettre à jour le système
sudo apt-get update
sudo apt-get upgrade -y

# Dépendances de HA Core
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez \
libffi```-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential \
libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev \
libatlas-base-dev

# Les packages suivants ne sont pas installés automatiquement, nous les installons manuellement
sudo apt-get install -y libavcodec-dev libavformat-dev libavutil-dev \
libavdevice-dev libavfilter-dev libswscale-dev pkg-config \
cmake libopenblas-dev

# À partir de l'installation de HA Core
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s

cd /srv/homeassistant
python3 -m venv .
source bin/activate
python3 -m pip install wheel 

# Et quelques dépendances supplémentaires
python3 -m pip install numpy==1.26.0 PyTurboJPEG==1.7.5
```

### Installation de Rust

Continuez à travailler sous l'utilisateur `homeassistant`

{% codeHelper {copy: true}%}

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% endcodeHelper %}

Déconnectez-vous et reconnectez-vous pour rendre les packages `rust` disponibles

### Installation de HA

Soyez patient, cette étape prendra du temps car de nombreuses dépendances sont construites à partir desource

{% codeHelper {copy: true}%}

```bash
pip3 install homeassistant==2024.9.3
```

{% endcodeHelper %}

### Lancement de HA

Sous l'utilisateur `homeassistant` et à l'intérieur de l'environnement virtuel, exécutez

{% codeHelper {copy: true}%}

```bash
hass
```

{% endcodeHelper %}

Une fois Home Assistant démarré, accédez au tableau de bord avec `http://[ADRESSE IP DE RISC-V]:8123/`

Créons un service systemd pour le lancer automatiquement. Arrêtez `hass` et créez un fichier de service :

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

# Vérifiez que le service est en cours d'exécution
systemctl status homeassistant.service
```

## Installation de Mosquitto

```bash
sudo apt install mosquitto mosquitto-clients
```sudo mosquitto_passwd -c /etc/mosquitto/passwd mosquitto
sudo systemctl restart mosquitto

# Vérifier le service
systemctl status mosquitto
```

## Installation de Zigbee2MQTT

Article de référence du manuel officiel de zigbee2mqtt [manuel](https://www.zigbee2mqtt.io/guide/installation/01_linux.html)

Ces commandes sont exécutées sous l'utilisateur `ubuntu` :

```bash
# Emplacement de l'adaptateur Zigbee
ls -l /dev/serial/by-id
# lrwxrwxrwx 1 root root 13 Aug  8 14:51 usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20230803183548-if00 -> ../../ttyACM0

# Installer les dépendances
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# Ajouter l'utilisateur au groupe dialout
sudo adduser ubuntu dialout
```

Déconnectez-vous et reconnectez-vous

```bash
# Il est plus facile d'installer npm depuis le dépôt
sudo apt-get install -y npm

# Télécharger et construire zigbee2mqtt
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
npm run build

# Modifier le fichier de configuration
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml
```

Mettez votre identifiant et mot de passe mqtt (si défini) et l'emplacement de l'adaptateur zigbee :

{% codeHelper {copy: true}%}

```yaml
# Intégration Home Assistant (découverte MQTT)
homeassistant: true

# Activer l'interface, fonctionne par défaut sur le port 8080
frontend:
  port: 8099
# Paramètres MQTT
mqtt:
  # Sujet de base MQTT pour les messages MQTT zigbee2mqtt
  base_topic: zigbee2mqtt
  # URL du serveur MQTT
  server: 'mqtt://localhost'
  # Authentification du serveur MQTT, décommentez si nécessaire :
  user: mosquitto
  password: risc-v

# Paramètres série
serial:
  # Emplacement du sniffer USB CC2531
  port: /dev/ttyACM0

# Paramètres avancés
advanced:
  # Laisser Zigbee2MQTT générer une clé de réseau au premier démarrage
  network_key: GENERATE
  # Laisser Zigbee2MQTT générer un pan_id au premier démarrage
  pan_id: GENERATE
  # Laisser Zigbee2MQTT générer un ext_pan_id au premier démarrage
  ext_pan_id: GÉNÉRER
```

{% endcodeHelper %}

Lancer zigbee2MQTT

{% codeHelper {copy: true}%}

```bash
npm start
```

{% endcodeHelper %}

Si tout est en ordre, créons un service systemd :

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
# Ou utilisez StandardOutput=null si vous ne voulez pas que les messages Zigbee2MQTT remplissent le syslog, pour plus d'options, consultez systemd.exec(5)
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

# Vérifiez le service
systemctl status zigbee2mqtt.service
```

Vous pouvez trouver le tableau de bord zigbee2mqtt à `http://[ADRESSE IP RISC-V]:8099/`

## Installation d'IPFS

Les commandes suivantes sont exécutées sous`ubuntu` utilisateur:

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

Reconnectez-vous en tant qu'utilisateur et construisez le package:

```bash
git clone https://github.com/ipfs/kubo.git
cd kubo
make build
sudo mv cmd/ipfs/ipfs /usr/local/bin/
```

Avant le premier lancement:

```bash
ipfs init
ipfs config profile apply local-discovery
sudo nano /etc/systemd/system/ipfs-daemon.service
```

Créez un service systemd:

{% codeHelper {copy: true}%}

```ini
[Unit]
Description=Service du démon IPFS

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

# Vérifiez le service
systemctl status ipfs-daemon.service
```

## Installation du proxy Libp2p

Nous aurons besoin de notre package proxy libp2p pour la communication de pair à pair avec le serveur domestique:

```bash
git clone https://github.com/PinoutLTD/libp2p-ws-proxy.git
cd libp2p-ws-proxy
npm install
node src/index.js
```

Si tout est en ordre, créons un service :

{% codeHelper {copy: true}%}

```bash
sudo nano /etc/systemd/system/lp2p-proxy.service
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```ini
[Unit]
Description= Service de proxy Libp2p

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

# Vérifier le service
systemctl status lp2p-proxy.service

```


## Installation de l'intégration Robonomics

> Nous avons préconstruit les roues pour plus de commodité

```bash
sudo -u homeassistant -H -s
cd
source /srv/homeassistant/bin/activate
git clone https://github.com/PaTara43/py-bindings-wheels-risc-v
cd py-bindings-wheels-risc-v
pip3 install *
```

### Installer HACS

Nous utiliserons [HACS](https://hacs.xyz/) pour installer l'intégration. Si HACSn'est pas encore installé sur votre Home Assistant, vous devez [l'installer](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core) d'abord.

### Télécharger l'intégration Robonomics

Ensuite, dans votre Home Assistant, accédez à HACS et recherchez `Robonomics` :

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Ouvrez-le et cliquez sur `Télécharger` dans le coin inférieur droit. Le téléchargement du référentiel peut prendre un certain temps.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

C'est tout. Maintenant, vous pouvez continuer à configurer l'intégration Robonomics.