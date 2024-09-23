---
title: Wie man Extrinsic von ESP32 sendet

contributors: [LoSk-p]
---

Senden Sie Datalog-Extrinsic im Robonomics-Netzwerk auf ESP32 mit [robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp). Den Code des Demos finden Sie [hier](https://github.com/LoSk-p/esp32-datalog-demo).

### Anforderungen

* Platformio-Kern ([Installationsanweisungen](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)).
* Ein beliebiger serieller Client für Ihr Betriebssystem (`tio` für Linux, zum Beispiel). Sie können `tio` mit folgendem Befehl installieren
```bash
sudo apt install tio
```
### Installation
Klonen Sie das Repository:
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### Konfiguration
Erstellen Sie die Datei `Private.h` im Ordner `src` mit folgendem Inhalt:
```
#pragma once

// Legen Sie echte Schlüssel und Adressen anstelle von Dummy-Werten fest
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
und füllen Sie sie mit den Informationen über Ihr Robonomics-Konto und Ihr WLAN-Netzwerk. `PRIV_KEY` ist der private Schlüssel Ihres Robonomics-Kontos, `SS58_ADR` ist dessen Adresse.

{% roboWikiNote {type: "warning"}%} Dieser Demo funktioniert nur für ED25519-Konten!
{% endroboWikiNote %}


Um den privaten Schlüssel aus Ihrer Kontosamenphrase zu erhalten, können Sie das Skript [get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py) verwenden. Führen Sie es einfach aus und befolgen Sie die Anweisungen:
```bash
python3 get-private-key.py
```

### Hochladen
Verbinden Sie ESP32 über das USB-Kabel mit dem Computer und erstellen Sie das Projekt:
```bash
cd esp32-datalog-demo
platformio run -t upload
```
Dieser Befehl erstellt Binärdateien für ESP und lädt sie hoch, sodass Sie am Ende Folgendes sehen werden
```
Writing at 0x000b9def... (84 %)
Writing at 0x000bf4c2... (87 %)
Writing at 0x000c56bf... (90 %)
Writing at 0x000cc6df... (93 %)
Writing at 0x000d1dec... (96 %)
Writing at 0x000d71b0... (100 %)
Wrote 836160 bytes (538555 compressed) at 0x00010000 in 12.2 seconds (effective 548.7 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
=========================== [SUCCESS] Took 24.08 seconds ===========================
```

### Ausführen

Nach dem Hochladen verbinden Sie ESP erneut mit dem Computer und starten Sie Ihren seriellen Client (tio mit dem Port `/dev/ttyACM0` in diesem Beispiel):
```bash
tio /dev/ttyACM0
```
Und schreiben Sie den Text für den Datalog-Extrinsic.

Den Port finden Sie in den Protokollen nach dem Befehl `platformio run -t upload` im vorherigen Abschnitt. Suchen Sie nach etwas Ähnlichem wie:
```
Auto-detected: /dev/ttyACM0
Uploading .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Serial port /dev/ttyACM0
Connecting.......
```