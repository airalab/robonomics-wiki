---
title: Servidor doméstico en RISC-V

colaboradores: [tubleronchik, PaTara43]
herramientas:
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
  - Integración de Robonomics Home Assistant 1.9.2
    https://github.com/airalab/homeassistant-robonomics-integration



---

**Este artículo proporcionará instrucciones sobre cómo configurar un hogar inteligente completamente de código abierto en RISC-V.**

## Requisitos de hardware

* StarFive VisionFive 2 SBC
* Cable USB-TTL
* Tarjeta SD

## Instalación de Ubuntu

### Imagen

En el momento de escribir este manual, la última versión LTS es [Ubuntu24.04 LTS](https://ubuntu.com/download/risc-v)

Escriba la imagen en la tarjeta SD utilizando [balenaEtcher](https://etcher.balena.io) por ejemplo

### Iniciar desde la tarjeta SD en VisionFive 2

Para iniciar desde la tarjeta SD, necesitamos colocar los interruptores DIP en las posiciones correctas

[https://wiki.ubuntu.com/RISC-V/StarFive VisionFive 2](https://wiki.ubuntu.com/RISC-V/StarFive%20VisionFive%202)

{% roboWikiPicture {src:"docs/home-assistant/riscV-dip-switch.png", alt:"riscv_switch"} %}{% endroboWikiPicture %}

Para el arranque desde la tarjeta SD, necesitamos configurar el interruptor DIP en `0 1`

No había internet, así que tuvimos que usar un cable USB-TTL para conectar la consola de la computadora. Aquí está la [instrucción](https://doc-en.rvspace.org/VisionFive2/Quick_Start_Guide/VisionFive2_QSG/for_maclinux2%20-%20vf2.html) sobre cómo conectar el cable

### Después del primer arranque

Por defecto, el inicio de sesión y la contraseña son `ubuntu`. Después del primer arranque, el sistema te pedirá que cambies la contraseña.

La imagen asume que estás utilizando la versión v1.3B de la placa (consulta la serigrafía en la placa). Si estás utilizando la versión v1.2A de la placa,Por favor, proceda de la siguiente manera:

```bash
echo 'StarFive VisionFive 2 v1.2A' | sudo tee /etc/flash-kernel/machine
sudo flash-kernel $(uname -r)
sudo update-grub
sudo reboot
```

## Instalación de Yggdrasil

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

# Verificar
systemctl status yggdrasil
```

## Instalación de Home Assistant Core

Seguiremos [este](https://www.home-assistant.io/installation/linux#install-home-assistant-core) artículo de la documentación oficial de Home Assistant

### Dependencias

```bash
# Actualizar el sistema
sudo apt-get update
sudo apt-get upgrade -y

# Dependencias de HA Core
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez \
libffi```-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential \
libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev \
libatlas-base-dev

# Los siguientes paquetes no se instalan automáticamente, así que los instalamos manualmente
sudo apt-get install -y libavcodec-dev libavformat-dev libavutil-dev \
libavdevice-dev libavfilter-dev libswscale-dev pkg-config \
cmake libopenblas-dev

# Desde la instalación de HA Core
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s

cd /srv/homeassistant
python3 -m venv .
source bin/activate
python3 -m pip install wheel 

# Y algunas dependencias más
python3 -m pip install numpy==1.26.0 PyTurboJPEG==1.7.5
```

### Instalación de Rust

Continúa trabajando bajo el usuario `homeassistant`

{% codeHelper {copy: true}%}

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% endcodeHelper %}

Cierra sesión y vuelve a iniciar sesión para que los paquetes de `rust` estén disponibles

### Instalación de HA

Ten paciencia, este paso llevará tiempo porque se compilan muchas dependencias.origen

{% codeHelper {copy: true}%}

```bash
pip3 install homeassistant==2024.9.3
```

{% endcodeHelper %}

### Inicio de HA

Bajo el usuario `homeassistant` y dentro del entorno virtual, ejecuta

{% codeHelper {copy: true}%}

```bash
hass
```

{% endcodeHelper %}

Una vez que Home Assistant se inicie, ve al panel con `http://[DIRECCIÓN IP DE RISC-V]:8123/`

Creemos un servicio systemd para que se ejecute automáticamente. Detén `hass` y crea un archivo de servicio:

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

# Verifica que el servicio esté en funcionamiento
systemctl status homeassistant.service
```

## Instalación de Mosquitto

```bash
sudo apt install mosquitto mosquitto-clients
```sudo mosquitto_passwd -c /etc/mosquitto/passwd mosquitto
sudo systemctl restart mosquitto

# Verificar el servicio
systemctl status mosquitto
```

## Instalación de Zigbee2MQTT

Artículo de referencia del manual oficial de zigbee2mqtt [manual](https://www.zigbee2mqtt.io/guide/installation/01_linux.html)

Estos comandos se ejecutan bajo el usuario `ubuntu`:

```bash
# Ubicación del adaptador Zigbee
ls -l /dev/serial/by-id
# lrwxrwxrwx 1 root root 13 Aug  8 14:51 usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20230803183548-if00 -> ../../ttyACM0

# Instalar dependencias
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# Agregar usuario al grupo dialout
sudo adduser ubuntu dialout
```

Cerrar sesión e iniciar sesión

```bash
# Es más fácil instalar npm desde el repositorio
sudo apt-get install -y npm

# Descargar y compilar zigbee2mqtt
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
npm run build

# Editar archivo de configuración
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml
```

Coloque su inicio de sesión y contraseña de mqtt (si está configurado) y la ubicación del adaptador zigbee:

{% codeHelper {copy: true}%}

```yaml
# Integración con Home Assistant (descubrimiento MQTT)
homeassistant: true

# Habilitar el frontend, se ejecuta en el puerto 8080 de forma predeterminada
frontend:
  port: 8099
# Configuraciones MQTT
mqtt:
  # Tema base MQTT para mensajes MQTT de zigbee2mqtt
  base_topic: zigbee2mqtt
  # URL del servidor MQTT
  server: 'mqtt://localhost'
  # Autenticación del servidor MQTT, descomente si es necesario:
  user: mosquitto
  password: risc-v

# Configuraciones seriales
serial:
  # Ubicación del sniffer USB CC2531
  port: /dev/ttyACM0

# Configuraciones avanzadas
advanced:
  # Permitir que Zigbee2MQTT genere una clave de red en el primer inicio
  network_key: GENERATE
  # Permitir que Zigbee2MQTT genere un pan_id en el primer inicio
  pan_id: GENERATE
  # Permitir que Zigbee2MQTT genere un ext_pan_id en el primer inicio
  ext_pan_id: GENERATE
```

{% endcodeHelper %}

Iniciar zigbee2MQTT

{% codeHelper {copy: true}%}

```bash
npm start
```


{% endcodeHelper %}

Si todo está bien, creemos un servicio de systemd:

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
# O use StandardOutput=null si no desea que los mensajes de Zigbee2MQTT llenen el syslog, para más opciones consulte systemd.exec(5)
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

# Verificar el servicio
systemctl status zigbee2mqtt.service
```

Puede encontrar el panel de control de zigbee2mqtt en `http://[DIRECCIÓN IP DE RISC-V]:8099/`

## Instalación de IPFS

Los siguientes comandos se ejecutan bajo`ubuntu` usuario:

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

Vuelva a iniciar sesión desde el usuario y construya el paquete:

```bash
git clone https://github.com/ipfs/kubo.git
cd kubo
make build
sudo mv cmd/ipfs/ipfs /usr/local/bin/
```

Antes de la primera ejecución:

```bash
ipfs init
ipfs config profile apply local-discovery
sudo nano /etc/systemd/system/ipfs-daemon.service
```

Cree un servicio systemd:

{% codeHelper {copy: true}%}

```ini
[Unit]
Description=Servicio del Demonio IPFS

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

# Verifique el servicio
systemctl status ipfs-daemon.service
```

## Instalación del Proxy Libp2p

Necesitaremos nuestro paquete de proxy libp2p para la comunicación de emparejamiento con el servidor doméstico:

```bash
git clone https://github.com/PinoutLTD/libp2p-ws-proxy.git
cd libp2p-ws-proxy
npm install
node src/index.js
```

Si todo está bien, creemos un servicio:

{% codeHelper {copy: true}%}

```bash
sudo nano /etc/systemd/system/lp2p-proxy.service
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```ini
[Unit]
Description= Servicio de Proxy Libp2p

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

# Verificar el servicio
systemctl status lp2p-proxy.service

```


## Instalación de Integración Robonomics

> Hemos precompilado las ruedas para mayor comodidad

```bash
sudo -u homeassistant -H -s
cd
source /srv/homeassistant/bin/activate
git clone https://github.com/PaTara43/py-bindings-wheels-risc-v
cd py-bindings-wheels-risc-v
pip3 install *
```

### Instalar HACS

Utilizaremos [HACS](https://hacs.xyz/) para instalar la integración. Si HACSno está instalado en su Home Assistant todavía, necesita [instalarlo](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core) primero.

### Descargar la Integración de Robonomics

A continuación, en su Home Assistant, vaya a HACS y busque `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Ábralo y haga clic en `Descargar` en la esquina inferior derecha. La descarga del repositorio puede llevar algún tiempo.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

Eso es todo. Ahora puede continuar con la configuración de la Integración de Robonomics.