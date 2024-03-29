---
title: Verbinden Sie ein Amazon FreeRTOS-Gerät über MQTT mit Robonomics

contributors: [khssnv]
---

Hier ist die Demonstration, wie ein Mikrocontroller, der [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) ausführt, über MQTT mit dem Robonomics-Netzwerk verbunden werden kann. Bitte überprüfen Sie [dieses Repository](http://github.com/khssnv/freertos_mqtt_robonomics_example) für den Quellcode des Projekts.

Wir verwenden [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) mit der FreeRTOS-Distribution und der MQTT-Implementierung von [Espressif IoT Development Framework](https://github.com/espressif/esp-idf), während Espressif ein Anbieter des verwendeten Mikrocontrollers ist.

Es gibt auch einen [PMS-3003](http://www.plantower.com/en/content/?107.html) Sensor zu Demonstrationszwecken. Der Sensor misst das Vorhandensein von Partikeln in der Luft und man kann ihn verwenden, um die Luftqualität abzuschätzen.

Die Luftqualität ist kein Thema des Artikels, weitere Informationen dazu finden Sie auf der Website der WHO: [Ambient (outdoor) air pollution](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). Das Ziel des Systems ist es, Sensormessungen im Robonomics-Netzwerk zu veröffentlichen.

## Hardware-Setup

Wir verbinden PMS3003 TXD PIN5 mit ESP32 DevKitC IO17, um Messungen über UART zu übertragen.
Beide Geräte benötigen auch Strom und eine gemeinsame Masse.

![Wiring Diagram](../images/freertos-mqtt/wiring.png)

## Datenfluss

Um Sensormessungen an das Robonomics-Netzwerk zu übermitteln, ist unser Ziel auf Firmware-Ebene, Daten von einem Sensor über das eingebettete Kommunikationsprotokoll, das er unterstützt (UART in unserem Fall), zu erhalten und an eine AIRA-Instanz über MQTT / TCP zu übergeben.

![Sending](../images/freertos-mqtt/send.svg)

In unserem Beispiel verwenden wir die AIRA-Cloud-Bereitstellung, die über eine öffentliche IP-Adresse und einen zugewiesenen Domainnamen verfügbar ist.
Auf der AIRA-Instanz richten wir den `mosquitto` MQTT-Broker ein und abonnieren den Topic `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4`, um Nachrichten von MQTT zu erhalten.

Dann leiten wir die Nachrichten an den `robonomics io`-Writer weiter.

![Receiving](../images/freertos-mqtt/recv.svg)

Jetzt sind die Daten im Robonomics-Netzwerk verfügbar und wir können sie erneut mit `robonomics io` lesen.

## Firmware

Wir verwenden die [ESP-MQTT-Beispielanwendung mit TCP-Transport](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) als Basis.

Wir ändern nur `main/app_main.c` für die UART-Verbindung zum Sensor, die SNTP-Zeitsynchronisation und die periodische MQTT-Publisher-Routine.

Wenn Sie versuchen, das Projekt zu wiederholen und es Ihr erstes ESP-IDF-basiertes Projekt ist, folgen Sie bitte zunächst der [ESP-IDF-Programmieranleitung von Espressif](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step), um sich mit Firmware-Operationen wie Konfiguration, Build und Upload mit dem `idf.py`-Tool vertraut zu machen.

### Wi-Fi-Konfiguration

Um mit der in der Cloud bereitgestellten AIRA-Instanz zu kommunizieren, benötigt unser Mikrocontroller eine Internetverbindung.
Wir verwenden das Wi-Fi des ESP32 dafür.
Espressif stellt Dienstprogramme zur Konfiguration des Onboard-Wi-Fi zur Verfügung.
In unserem Beispiel verwenden wir eine Entwicklungsumgebung mit Ubuntu 20.04 GNU/Linux.
Um Wi-Fi zu konfigurieren, gehen wir zum Projektordner und starten das SDK-Konfigurationstool.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Dann setzen wir den SSID und das Passwort des Wi-Fi-Zugangspunkts in der `Example Verbindenion Konfiguration`-Sektion.

![Menuconfig Wi-Fi](../images/freertos-mqtt/menuconfig-wi-fi.png)

### MQTT-Endpunkt-Konfiguration

Es gibt zwei Dinge, die für MQTT konfiguriert werden müssen.
Das erste ist die Adresse des MQTT-Brokers.
Es ist mit dem SDK-Konfigurationstool konfigurierbar.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Setzen Sie `Broker URL` in der `Example Konfiguration`-Sektion.

![Menuconfig MQTT](../images/freertos-mqtt/menuconfig-mqtt.png)

Das zweite ist das MQTT-Topic.
Wir setzen es in der Firmware mit dem Projektnamen-Prefix gefolgt von unserer ESP32-MAC-Adresse.
Das ergibt `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` für unseren bestimmten Mikrochip.

## Von MQTT zu Robonomics

Zuerst überprüfen wir, ob wir Daten per MQTT empfangen.
Wir können uns für unseren Mosquitto MQTT-Broker-Topic anmelden, auf das das Gerät veröffentlicht.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Hier bringen wir das `mosquitto`-Paket in unsere Umgebung, um das `mosquitto_sub`-Dienstprogramm zu verwenden.
Dann abonnieren wir das Thema, das in der Firmware festgelegt ist.
Wir haben unsere Messungen erhalten, das bedeutet, dass AIRA die Daten über MQTT korrekt empfängt.
Jetzt lassen Sie uns diese Nachrichten an das Robonomics-Netzwerk weiterleiten.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Hier verwenden wir das `robonomics`-Dienstprogramm, um Nachrichten im Pubsub-Kanal `/freertos_mqtt_robonomics_example` zu veröffentlichen.
Wir geben `bootnodes` an, um sicherzustellen, dass mindestens eine Verbindung hergestellt wird.

Jetzt lesen wir diese Nachrichten aus demselben Pubsub-Kanal.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  New peer connected: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Mesh link added for peer: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") in topic: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Verwendete ursprüngliche Ressourcen

* ESP32 DevKitC-Pinbelegung von GoJimmys Blog https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* PSM3003-Datenstruktur und Decoder von OpenAirProject https://github.com/openairproject/sensor-esp32

**Vielen Dank an alle!**
