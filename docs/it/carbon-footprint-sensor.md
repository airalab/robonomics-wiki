---
title: Collega il sensore

contributors: [LoSk-p, makyul]
---

L'esempio di lavoro è nel video:

https://youtu.be/jsaFCVAx2sA

## Requisiti

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (o uno dei [supportati](https://www.zigbee2mqtt.io/information/supported_adapters.html))

Il servizio è in esecuzione su Raspberry Pi e contatta la presa intelligente tramite protocollo zigbee.

## Zigbee stick

Se hai JetHome USB JetStick Z2, ha già il firmware necessario, quindi non è necessario flasharlo. Ma se hai un altro adattatore, devi prima flasharlo con il software zigbee2MQTT. Puoi trovare le istruzioni per il tuo dispositivo [qui](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Collega l'adattatore e verifica l'indirizzo dell'adattatore (potrebbe anche essere `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

Potrebbe essere necessario prima accedere alla porta USB. Aggiungi il tuo utente a `dialout` gruppo (funziona per ubuntu, ma il nome del gruppo potrebbe essere diverso su altri sistemi operativi).
Per ubuntu:
```bash
sudo usermod -a -G dialout $USER
```
Per arch:
```bash
sudo usermod -a -G uucp $USER
```
Quindi esci e accedi nuovamente o riavvia il computer.

## Installaazione

Clona il repository:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Configurazione

Vai a `data/configuration.yaml` e imposta `permit_join: true`:

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
Potresti anche voler compilare i campi `server` and `port` con le informazioni corrispondenti. Nel campo `server` utilizza l'IP del `docker0` bridge per stabilire la connessione: 

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
Qui il tuo indirizzo è `172.17.0.1`.

Quindi crea il file config/config.yaml con le seguenti informazioni e imposta la tua posizione (puoi cercare su https://countrycode.org/ per il codice ISO a 3 lettere):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Collega la spina

Prima esecuzione:

```
docker-compose up     
```

Per passare alla modalità di accoppiamento sulla spina, premere a lungo il pulsante di accensione per alcuni secondi fino a quando la luce inizia a lampeggiare rapidamente in blu.

Nei log dovresti vedere ora che il tuo plug ha iniziato a pubblicare su mqtt.


## Dopo l'accoppiamento

Se non vuoi consentire ad altri dispositivi di accoppiarsi con la tua chiavetta, ora dovresti andare su `data/configuration.yaml` and set `permit_join: false`. Restart service (use 'Ctrl+C' and 

```bash
docker-compose up     
```
ancora una volta per inviare le modifiche).

## In esecuzione
All'avvio verrà creato l'account per la spina. 
> Se hai già un account dovresti aggiungere il suo seme al file `config.config.yaml` nella sezione `device_seed`:
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

Dopo aver creato l'account, vedrai l'indirizzo nei log (il seed verrà aggiunto a `config/config.yaml`):
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
Devi trasferire alcuni token a questo account per le commissioni di transazione, puoi farlo su [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts). 

Il servizio vedrà che hai abbastanza token, nei log vedrai:
```
plug               | Balance is OK
```
Il servizio vedrà i messaggi mqtt dalla spina e utilizzerà l'energia in modo sicuro. Ogni ora (puoi modificare il timeout in `config/config.yaml` in `sending_timeout` sezione, il timeout è in secondi) verrà creato un datalog con le seguenti informazioni:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
