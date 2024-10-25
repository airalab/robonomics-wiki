---
title: Servidor Doméstico em RISC-V

contribuidores: [tubleronchik, PaTara43]
ferramentas:
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
  - Integração do Robonomics Home Assistant 1.9.2
    https://github.com/airalab/homeassistant-robonomics-integration



---

**Este artigo fornecerá instruções sobre como configurar uma casa inteligente totalmente de código aberto em RISC-V.**

## Requisitos de Hardware

* StarFive VisionFive 2 SBC
* Cabo USB-TTL
* Cartão SD

## Instalação do Ubuntu

### Imagem

No momento da redação deste manual, a última versão LTS é [Ubuntu24.04 LTS](https://ubuntu.com/download/risc-v)

Escreva a imagem no cartão SD usando [balenaEtcher](https://etcher.balena.io) por exemplo

### Inicialize a partir do cartão SD no VisionFive 2

Para inicializar a partir do cartão SD, precisamos colocar os interruptores DIP nas posições corretas

[https://wiki.ubuntu.com/RISC-V/StarFive VisionFive 2](https://wiki.ubuntu.com/RISC-V/StarFive%20VisionFive%202)

{% roboWikiPicture {src:"docs/home-assistant/riscV-dip-switch.png", alt:"riscv_switch"} %}{% endroboWikiPicture %}

Para a inicialização do cartão SD, precisamos definir o interruptor DIP para `0 1`

Não havia internet, então tivemos que usar um cabo USB-TTL para conectar ao console do computador. Aqui está a [instrução](https://doc-en.rvspace.org/VisionFive2/Quick_Start_Guide/VisionFive2_QSG/for_maclinux2%20-%20vf2.html) sobre como conectar o cabo

### Após a Primeira Inicialização

Por padrão, o login e a senha são `ubuntu`. Após a primeira inicialização, o sistema solicitará que você altere a senha.

A imagem pressupõe que você está usando a versão v1.3B da placa (consulte a serigrafia na placa). Se estiver usando a versão da placa v1.2A,Por favor, siga os passos abaixo:

```bash
echo 'StarFive VisionFive 2 v1.2A' | sudo tee /etc/flash-kernel/machine
sudo flash-kernel $(uname -r)
sudo update-grub
sudo reboot
```

## Instalação do Yggdrasil

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

# Verificação
systemctl status yggdrasil
```

## Instalação do Home Assistant Core

Vamos seguir [este](https://www.home-assistant.io/installation/linux#install-home-assistant-core) artigo da documentação oficial do Home Assistant

### Dependências

```bash
# Atualizar o sistema
sudo apt-get update
sudo apt-get upgrade -y

# Dependências do HA Core
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez \
libffi
```-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential \
libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev \
libatlas-base-dev

# Os seguintes pacotes não são instalados automaticamente, então instalamos manualmente
sudo apt-get install -y libavcodec-dev libavformat-dev libavutil-dev \
libavdevice-dev libavfilter-dev libswscale-dev pkg-config \
cmake libopenblas-dev

# Da instalação do HA Core
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s

cd /srv/homeassistant
python3 -m venv .
source bin/activate
python3 -m pip install wheel 

# E mais algumas dependências
python3 -m pip install numpy==1.26.0 PyTurboJPEG==1.7.5
```

### Instalação do Rust

Continue trabalhando sob o usuário `homeassistant`

{% codeHelper {copy: true}%}

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% endcodeHelper %}

Faça logout e login novamente para tornar os pacotes `rust` disponíveis

### Instalação do HA

Seja paciente, esta etapa levará tempo porque muitas dependências estão sendo construídas a partir deorigem

{% codeHelper {copy: true}%}

```bash
pip3 install homeassistant==2024.9.3
```

{% endcodeHelper %}

### Lançamento do HA

Sob o usuário `homeassistant` e dentro do venv, execute

{% codeHelper {copy: true}%}

```bash
hass
```

{% endcodeHelper %}

Depois que o Home Assistant iniciar, acesse o painel com `http://[ENDEREÇO IP DO RISC-V]:8123/`

Vamos criar um serviço systemd para executá-lo automaticamente. Pare o `hass` e crie um arquivo de serviço:

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

# Verifique se o serviço está em execução
systemctl status homeassistant.service
```

## Instalação do Mosquitto

```bash
sudo apt install mosquitto mosquitto-clients
```sudo mosquitto_passwd -c /etc/mosquitto/passwd mosquitto
sudo systemctl restart mosquitto

# Verificar o serviço
systemctl status mosquitto
```

## Instalação do Zigbee2MQTT

Artigo de referência do manual oficial do zigbee2mqtt [manual](https://www.zigbee2mqtt.io/guide/installation/01_linux.html)

Estes comandos são executados sob o usuário `ubuntu`:

```bash
# Localização do adaptador Zigbee
ls -l /dev/serial/by-id
# lrwxrwxrwx 1 root root 13 Aug  8 14:51 usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20230803183548-if00 -> ../../ttyACM0

# Instalar dependências
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# Adicionar usuário ao grupo dialout
sudo adduser ubuntu dialout
```

Sair e entrar novamente

```bash
# É mais fácil instalar o npm do repositório
sudo apt-get install -y npm

# Baixar e compilar o zigbee2mqtt
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
npm run build

# Editar arquivo de configuração
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml
```

Coloque seu login e senha mqtt (se definido) e a localização do adaptador zigbee:

{% codeHelper {copy: true}%}

```yaml
# Integração com Home Assistant (descoberta MQTT)
homeassistant: true

# Habilitar o frontend, que roda na porta 8080 por padrão
frontend:
  port: 8099
# Configurações MQTT
mqtt:
  # Tópico base MQTT para mensagens MQTT do zigbee2mqtt
  base_topic: zigbee2mqtt
  # URL do servidor MQTT
  server: 'mqtt://localhost'
  # Autenticação do servidor MQTT, descomente se necessário:
  user: mosquitto
  password: risc-v

# Configurações seriais
serial:
  # Localização do sniffer USB CC2531
  port: /dev/ttyACM0

# Configurações avançadas
advanced:
  # Permitir que o Zigbee2MQTT gere uma chave de rede na primeira inicialização
  network_key: GENERATE
  # Permitir que o Zigbee2MQTT gere um pan_id na primeira inicialização
  pan_id: GENERATE
  # Permitir que o Zigbee2MQTT gere um ext_pan_id na primeira inicialização
  ext_pan_id: GERAR
```

{% endcodeHelper %}

Inicie o zigbee2MQTT

{% codeHelper {copy: true}%}

```bash
npm start
```

{% endcodeHelper %}

Se tudo estiver correto, vamos criar um serviço systemd:

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
# Ou use StandardOutput=null se não quiser que as mensagens do Zigbee2MQTT preencham o syslog, para mais opções, consulte systemd.exec(5)
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

# Verifique o serviço
systemctl status zigbee2mqtt.service
```

Você pode encontrar o painel zigbee2mqtt em `http://[ENDEREÇO IP DO RISC-V]:8099/`

## Instalação do IPFS

Os seguintes comandos são executados sob`ubuntu` usuário:

```bash
cd
nano .profile
```

```bash
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$GOPATH/bin
```

Faça login novamente como usuário e construa o pacote:

```bash
git clone https://github.com/ipfs/kubo.git
cd kubo
make build
sudo mv cmd/ipfs/ipfs /usr/local/bin/
```

Antes da primeira execução:

```bash
ipfs init
ipfs config profile apply local-discovery
sudo nano /etc/systemd/system/ipfs-daemon.service
```

Crie um serviço systemd:

```ini
[Unit]
Description=Serviço de Daemon IPFS

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

# Verifique o serviço
systemctl status ipfs-daemon.service
```

## Instalação do Proxy Libp2p

Vamos precisar do nosso pacote de proxy libp2p para comunicação de pares com o servidor doméstico:

```bash
git clone https://github.com/PinoutLTD/libp2p-ws-proxy.git
cd libp2p-ws-proxy
npm install
node src/index.js
```

Se tudo estiver correto, vamos criar um serviço:

{% codeHelper {copy: true}%}

```bash
sudo nano /etc/systemd/system/lp2p-proxy.service
```

{% endcodeHelper %}

{% codeHelper {copy: true}%}

```ini
[Unit]
Description= Serviço de Proxy Libp2p

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

# Verifique o serviço
systemctl status lp2p-proxy.service

```


## Instalação da Integração Robonomics

> Nós pré-construímos os pacotes para conveniência

```bash
sudo -u homeassistant -H -s
cd
source /srv/homeassistant/bin/activate
git clone https://github.com/PaTara43/py-bindings-wheels-risc-v
cd py-bindings-wheels-risc-v
pip3 install *
```

### Instalar HACS

Vamos usar [HACS](https://hacs.xyz/) para instalar a integração. Se o HACSainda não está instalado no seu Home Assistant, você precisa [instalá-lo](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core) primeiro.

### Baixar a Integração Robonomics

Em seguida, no seu Home Assistant, navegue até o HACS e procure por `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Abra e clique em `Download` no canto inferior direito. O download do repositório pode levar algum tempo.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

É isso. Agora, você pode continuar a configurar a Integração Robonomics.