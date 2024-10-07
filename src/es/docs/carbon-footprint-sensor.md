---
title: Conectar sensor

contributors: [LoSk-p, makyul]
---

Ejemplo de trabajo en el video:

https://youtu.be/jsaFCVAx2sA

## Requisitos

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Adaptador Zigbee [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (o uno de los [compatibles](https://www.zigbee2mqtt.io/information/supported_adapters.html))

El servicio se ejecuta en Raspberry Pi y se comunica con el enchufe inteligente a través del protocolo zigbee.

## Adaptador Zigbee

Si tienes el JetHome USB JetStick Z2, ya tiene el firmware necesario, por lo que no necesitas flashearlo. Pero si tienes otro adaptador, primero necesitas flashearlo con el software zigbee2MQTT. Puedes encontrar instrucciones para tu dispositivo [aquí](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Conecta el adaptador y verifica la dirección del adaptador (también puede ser `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

Es posible que necesites acceder al puerto USB primero. Agrega tu usuario al grupo `dialout` (funciona para Ubuntu, pero el nombre del grupo puede ser diferente en otros sistemas operativos).
Para Ubuntu:
```bash
sudo usermod -a -G dialout $USER
```
Para Arch:
```bash
sudo usermod -a -G uucp $USER
```
Luego cierra sesión e inicia sesión nuevamente o reinicia la computadora.

## Instalación

Clona el repositorio:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Configuración

Ve a `data/configuration.yaml` y establece `permit_join: true`:

```
# Integración con Home Assistant (descubrimiento MQTT)
homeassistant: false

# permitir que se unan nuevos dispositivos
permit_join: true

# Configuración MQTT
mqtt:
  # Tema base MQTT para mensajes MQTT de zigbee2mqtt
  base_topic: zigbee2mqtt
  # URL del servidor MQTT
  server: 'mqtt://172.17.0.1'
  # Autenticación del servidor MQTT, descomenta si es necesario:
  # user: my_user
  # password: my_password

# Configuración serial
serial:
  # Ubicación del sniffer USB CC2531
  port: /dev/ttyUSB0
```
También es posible que desees completar los campos `server` y `port` con la información correspondiente. En el campo `server`, utiliza la IP del puente `docker0` para establecer la conexión:

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
Aquí tu dirección es `172.17.0.1`.

Luego crea el archivo config/config.yaml con la siguiente información y establece tu ubicación (puedes consultar en https://countrycode.org/ para el código ISO de 3 letras):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Conectar el enchufe

Primero ejecuta:

```
docker-compose up     
```

Para cambiar al modo de emparejamiento en el enchufe, mantén presionado el botón de encendido durante unos segundos hasta que la luz comience a parpadear rápidamente en azul.

En los registros, ahora deberías ver que tu enchufe ha comenzado a publicar en MQTT.

## Después del emparejamiento

Si no deseas permitir que otros dispositivos se emparejen con tu adaptador, ahora debes ir a `data/configuration.yaml` y establecer `permit_join: false`. Reinicia el servicio (usa 'Ctrl+C' y 

```bash
docker-compose up     
```
una vez más para aplicar los cambios).

## Ejecución
Al iniciar por primera vez, se creará una cuenta para el enchufe.
> Si ya tienes una cuenta, debes agregar su semilla al archivo `config.config.yaml` en la sección `device_seed`:
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

Después de crear la cuenta, verás la dirección en los registros (la semilla se agregará a `config/config.yaml`):
```
plug               | Cuenta generada con dirección: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
Debes transferir algunos tokens a esta cuenta para las tarifas de transacción, puedes hacerlo en [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts). 

El servicio verá que tienes suficientes tokens, en los registros verás:
```
plug               | El saldo es suficiente
```
El servicio verá los mensajes MQTT del enchufe y registrará el uso de energía. Cada hora (puedes cambiar el tiempo de espera en `config/config.yaml` en la sección `sending_timeout`, el tiempo de espera está en segundos) creará un registro de datos con la siguiente información:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```