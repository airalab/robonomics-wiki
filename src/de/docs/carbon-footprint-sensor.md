---
title: Sensor verbinden

contributors: [LoSk-p, makyul]
---

Beispiel für die Arbeit im Video:

https://youtu.be/jsaFCVAx2sA

## Anforderungen

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbee-Adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (oder einer der [unterstützten](https://www.zigbee2mqtt.io/information/supported_adapters.html))

Der Dienst läuft auf dem Raspberry Pi und kommuniziert über das Zigbee-Protokoll mit dem Smart Plug.

## Zigbee-Stick

Wenn Sie den JetHome USB JetStick Z2 haben, verfügt er bereits über die erforderliche Firmware, sodass Sie ihn nicht flashen müssen. Wenn Sie jedoch einen anderen Adapter haben, müssen Sie ihn zunächst mit der zigbee2MQTT-Software flashen. Anweisungen für Ihr Gerät finden Sie [hier](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Schließen Sie den Adapter an und überprüfen Sie die Adapteradresse (es kann auch `/dev/ttyUSB1` sein):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

Möglicherweise müssen Sie zunächst Zugriff auf den USB-Port erhalten. Fügen Sie Ihren Benutzer der Gruppe `dialout` hinzu (funktioniert für Ubuntu, aber der Gruppenname kann auf anderen Betriebssystemen unterschiedlich sein).
Für Ubuntu:
```bash
sudo usermod -a -G dialout $USER
```
Für Arch:
```bash
sudo usermod -a -G uucp $USER
```
Melden Sie sich dann ab und wieder an oder starten Sie den Computer neu.

## Installation

Klonen Sie das Repository:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Konfiguration

Gehen Sie zu `data/configuration.yaml` und setzen Sie `permit_join: true`:

```
# Home Assistant-Integration (MQTT-Entdeckung)
homeassistant: false

# Erlauben Sie neuen Geräten beizutreten
permit_join: true

# MQTT-Einstellungen
mqtt:
  # MQTT-Basisthema für zigbee2mqtt MQTT-Nachrichten
  base_topic: zigbee2mqtt
  # MQTT-Server-URL
  server: 'mqtt://172.17.0.1'
  # MQTT-Server-Authentifizierung, auskommentieren, wenn erforderlich:
  # user: my_user
  # password: my_password

# Serielle Einstellungen
serial:
  # Standort des CC2531 USB-Sniffers
  port: /dev/ttyUSB0
```
Sie möchten möglicherweise auch die Felder `server` und `port` mit den entsprechenden Informationen ausfüllen. Verwenden Sie im Feld `server` die IP der `docker0`-Bridge, um die Verbindung herzustellen:

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

Erstellen Sie dann die Datei config/config.yaml mit den folgenden Informationen und setzen Sie Ihren Standort (Sie können auf https://countrycode.org/ nach dem 3-Buchstaben-ISO-Code suchen):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Stecker anschließen

Zuerst ausführen:

```
docker-compose up     
```

Um in den Pairing-Modus am Stecker zu wechseln, drücken Sie lange auf die Ein-/Aus-Taste, bis das Licht schnell blau blinkt. 

In den Protokollen sollten Sie jetzt sehen, dass Ihr Stecker beginnt, über MQTT zu veröffentlichen. 


## Nach dem Pairing

Wenn Sie nicht möchten, dass andere Geräte mit Ihrem Stick gepaart werden, sollten Sie jetzt zu `data/configuration.yaml` gehen und `permit_join: false` setzen. Starten Sie den Dienst neu (verwenden Sie 'Strg+C' und 

```bash
docker-compose up     
```
erneut, um die Änderungen zu übernehmen).

## Ausführung
Beim ersten Start wird das Konto für den Stecker erstellt. 
> Wenn Sie bereits ein Konto haben, fügen Sie dessen Seed in den Abschnitt `device_seed` der Datei `config.config.yaml` ein:
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

Nachdem das Konto erstellt wurde, sehen Sie die Adresse in den Protokollen (der Seed wird zu `config/config.yaml` hinzugefügt):
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
Sie müssen einige Token auf dieses Konto für Transaktionsgebühren übertragen, dies können Sie auf dem [Robonomics-Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts) tun. 

Der Dienst wird sehen, dass Sie genügend Token haben, in den Protokollen sehen Sie:
```
plug               | Balance is OK
```
Der Dienst wird MQTT-Nachrichten vom Stecker sehen und den Stromverbrauch speichern. Alle Stunden (Sie können den Timeout in `config/config.yaml` im Abschnitt `sending_timeout` ändern, der Timeout erfolgt in Sekunden) wird ein Datalog mit folgenden Informationen erstellt:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```