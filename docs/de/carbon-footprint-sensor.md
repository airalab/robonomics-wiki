---
title: Sensor verbinden

contributors: [LoSk-p, makyul]
---

Beispiel für die Arbeit ist im Video:

https://youtu.be/jsaFCVAx2sA

## Anforderungen

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (oder eine von [unterstützt](https://www.zigbee2mqtt.io/information/supported_adapters.html))

Der Dienst läuft auf Raspberry Pi und kontaktiert den Smart Plug über das ZigBee-Protokoll.

## Zigbee-Stick

Wenn Sie den JetHome USB JetStick Z2 haben, verfügt er bereits über die erforderliche Firmware, sodass Sie ihn nicht flashen müssen. Wenn Sie jedoch einen anderen Adapter haben, müssen Sie ihn zuerst mit der zigbee2MQTT-Software flashen. Anweisungen für Ihr Gerät finden Sie [hier](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Verbinden Sie den Adapter und überprüfen Sie die Adapteradresse (es kann auch sein `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

Möglicherweise müssen Sie zuerst Zugriff auf den USB-Anschluss erhalten. Fügen Sie Ihren Benutzer hinzu `dialout` Gruppe (funktioniert für Ubuntu, aber der Name der Gruppe kann auf anderen Betriebssystemen unterschiedlich sein).

Für Ubuntu:
```bash
sudo usermod -a -G dialout $USER
```

Für Arch:
```bash
sudo usermod -a -G uucp $USER
```
Melden Sie sich dann ab und wieder an oder starten Sie den Computer neu.

## Installierenierenation

Klonen Sie das Repository:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Konfiguration

Gehe zu `data/configuration.yaml` und setze `permit_join: true`:

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
Möglicherweise möchten Sie auch die Felder `server` and `port` mit entsprechenden Informationen ausfüllen. Im `server` Feld verwenden Sie die IP der `docker0` Bridge, um die Verbindung herzustellen: 

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
Hier ist Ihre Adresse `172.17.0.1`.

Erstellen Sie dann die Datei config/config.yaml mit folgenden Informationen und setzen Sie Ihren Standort (Sie können unter https://countrycode.org/ nach dem 3-Buchstaben-ISO-Code suchen):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Stecker verbinden

Erster Start:

```
docker-compose up     
```

Um in den Pairing-Modus am Stecker zu wechseln, drücken Sie einige Sekunden lang die Ein-/Aus-Taste, bis das Licht schnell blau zu blinken beginnt.

In den Protokollen sollten Sie nun sehen, dass Ihr Plug mit der Veröffentlichung in mqtt begonnen hat.


## Nach dem Pairing

Wenn Sie nicht möchten, dass andere Geräte sich mit Ihrem Stick verbinden können, sollten Sie jetzt erneut zu `data/configuration.yaml` und set `permit_join: false`. Restart service (use 'Ctrl+C' und 

```bash
docker-compose up     
```
gehen um die Änderungen zu übermitteln).

## Laufen
Beim ersten Start wird das Konto für den Stecker erstellt. 
> Wenn Sie bereits ein Konto haben, sollten Sie dessen Seed hinzufügen `config.config.yaml` Datei in `device_seed` Abschnitt:
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

Nachdem das Konto erstellt wurde, sehen Sie die Adresse in den Protokollen (der Seed wird hinzugefügt, um `config/config.yaml`):
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
Sie müssen einige Token auf dieses Konto übertragen, um Transaktionsgebühren zu bezahlen. Sie können dies auf der [Robonomics-Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts). 

Der Dienst erkennt, dass Sie genügend Token haben. In den Protokollen sehen Sie:
```
plug               | Balance is OK
```
Der Dienst empfängt MQTT-Nachrichten vom Stecker und überwacht den Stromverbrauch. Alle Stunden (Sie können den Timeout in `config/config.yaml` in `sending_timeout` Abschnitt ändern, der Timeout erfolgt in Sekunden) wird ein Datenprotokoll mit folgenden Informationen erstellt:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
