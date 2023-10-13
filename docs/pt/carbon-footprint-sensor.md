---
title: Conectar sensor

contributors: [LoSk-p, makyul]
---

Exemplo de trabalho está no vídeo:

https://youtu.be/jsaFCVAx2sA

## Requisitos

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (ou um dos [suportado](https://www.zigbee2mqtt.io/emformation/supported_adapters.html))

O serviço está sendo executado no Raspberry Pi e entre em contato com o plugue inteligente via protocolo zigbee.

## Zigbee stick

Se você tiver o JetHome USB JetStick Z2, ele já possui o firmware necessário, portanto, não é necessário atualizá-lo. Mas se você tiver outro adaptador, primeiro você precisa atualizá-lo com o software zigbee2MQTT. Você pode encontrar instruções para o seu dispositivo [aqui](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Conecte o adaptador e verifique o endereço do adaptador (também pode ser `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

Talvez seja necessário obter acesso à porta USB primeiro. Adicione seu usuário a `dialout` grupo (funciona para o ubuntu, mas o nome do grupo pode ser diferente em outros sistemas operacionais).
Para ubuntu:
```bash
sudo usermod -a -G dialout $USER
```
Para arch:
```bash
sudo usermod -a -G uucp $USER
```
Em seguida, faça logout e login ou reinicie o computador.

## Instalação

Clone o repositório:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Configuração

Vá para `data/configuration.yaml` e defina `permit_join: true`:

```
# Home Assistant integration (MQTT discovery)
homeassistant: false

# allow new devices to join
permit_join: true

# MQTT settings
mqtt:
  # MQTT base topic for zigbee2mqtt MQTT messages
  base_topic: zigbee2mqtt
  # MQTT server URL
  server: 'mqtt://172.17.0.1'
  # MQTT server authentication, uncomment if required:
  # user: my_user
  # password: my_password

# Serial settings
serial:
  # Location of CC2531 USB sniffer
  port: /dev/ttyUSB0
```
Também pode ser necessário preencher os campos `server` and `port` com informações correspondentes. No campo `server` use o IP da `docker0` ponte para estabelecer a conexão: 

```bash
$ ip a                                                 127
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

...

5: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 02:42:0d:ff:5f:a3 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:dff:feff:5fa3/64 scope link 
       valid_lft forever preferred_lft forever
```
Aqui seu endereço é `172.17.0.1`.

Em seguida, crie o arquivo config/config.yaml com as seguintes informações e defina sua localização (você pode consultar https://countrycode.org/ para o código ISO de 3 letras):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Conectar Plug

Primeira execução:

```
docker-compose up     
```

Para mudar para o modo de emparelhamento no plugue, pressione longamente o botão liga / desliga por alguns segundos até que a luz azul comece a piscar rapidamente.

Nos logs você deverá ver agora que seu plug começou a ser publicado no mqtt.

## Após o emparelhamento

Se você não quiser permitir que outros dispositivos se conectem ao seu adaptador, agora você deve ir para `data/configuration.yaml` e definir `permit_join: false`. Reinicie o serviço (use 'Ctrl+C' e

```bash
docker-compose up     
```
mais uma vez para enviar as alterações).

## Executando
No primeiro início, a conta para a tomada será criada. 
> Se você já possui uma conta, você deve adicionar sua semente a `config.config.yaml` farquivo na seção `device_seed` :
>
> ```
> location: RUS
> service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
> twin_id: 5
> sending_timeout: 3600
> broker_address: "172.17.0.1"
> broker_port: 1883
> device_seed: <device_seed>
>```

Após criar a conta, você verá o endereço nos logs (a semente será adicionada a `config/config.yaml`):
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
Você precisa transferir alguns tokens para esta conta para taxas de transação, você pode fazer isso em [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts). 

O serviço verá que você tem tokens suficientes, nos logs você verá:
```
plug               | Balance is OK
```
O serviço verá mensagens mqtt da tomada e garantirá o uso seguro de energia. A cada hora (você pode alterar o tempo limite em `config/config.yaml` em `sending_timeout` seção, o tempo limite está em segundos) ele criará um registro de dados com as seguintes informações:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
