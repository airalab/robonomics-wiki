---
title: Conectar sensor

contributors: [LoSk-p, makyul]
---

Ejemplo de trabajo está en el video:

https://youtu.be/jsaFCVAx2sA

## Requisitos

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (o uno de [soportado](https://www.zigbee2mqtt.io/enformation/supported_adapters.html))

Service is running on Raspberry Pi y contact the smart plug via zigbee protocol.

## Zigbee stick

Si tienes el JetHome USB JetStick Z2, ya tiene el firmware necesario, por lo que no necesitas flashearlo. Pero si tienes otro adaptador, primero debes flashearlo con el software zigbee2MQTT. Puedes encontrar instrucciones para tu dispositivo [aquí](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Conecta el adaptador y verifica la dirección del adaptador (también puede ser `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

Es posible que primero necesites acceder al puerto USB. Añade tu usuario a `dialout` grupo (funciona para ubuntu, pero el nombre del grupo puede ser diferente en otros sistemas operativos).

Para ubuntu:
```bash
sudo usermod -a -G dialout $USER
```
Para arch:
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

Ve a `data/configuration.yaml` y configura `permit_join: true`:

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
También es posible que desees completar los campos `server` and `port` con la información correspondiente. En el campo `server` utiliza la IP del `docker0` puente para establecer la conexión: 

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

Luego crea el archivo config/config.yaml con la siguiente información y configura tu ubicación (puedes consultar https://countrycode.org/ para el código ISO de 3 letras):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Conectar enchufe

Primer inicio:

```
docker-compose up     
```

Para cambiar al modo de emparejamiento en el enchufe, mantenga presionado el botón de encendido durante unos segundos hasta que la luz comience a parpadear en azul rápidamente.

En los registros debería ver ahora que su complemento comenzó a publicarse en mqtt.


## Después de emparejar

Si no quieres permitir que otros dispositivos se emparejen con tu adaptador, ahora debes ir a `data/configuration.yaml` y establecer `permit_join: false`. Restart service (use 'Ctrl+C' y

```bash
docker-compose up     
```
una vez más para enviar los cambios).

## Ejecución
En el primer inicio se creará una cuenta para el enchufe. 
> Si ya tiene una cuenta, debe agregar su semilla al archivo `config.config.yaml` en la sección `device_seed`:
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
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
Necesitas transferir algunos tokens a esta cuenta para las tarifas de transacción, puedes hacerlo en [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts). 

El servicio verá que tienes suficientes tokens, en los registros verás:
```
plug               | Balance is OK
```
El servicio verá los mensajes mqtt del enchufe y garantizará un uso seguro de la energía. Cada hora (puedes cambiar el tiempo de espera en `config/config.yaml` in `sending_timeout` sección, el tiempo de espera está en segundos) creará un registro de datos con la siguiente información:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
