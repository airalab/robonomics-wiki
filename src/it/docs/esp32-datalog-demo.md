---
title: Come Inviare Extrinsic da ESP32
contributors: [LoSk-p]
---

Invia Datalog extrinsic nella Rete Robonomics su ESP32 utilizzando [robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp). Il codice della demo lo puoi trovare [qui](https://github.com/LoSk-p/esp32-datalog-demo).

### Requisiti

* Platformio core ([istruzioni di installazione](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)).
* Qualsiasi client seriale per il tuo sistema operativo (`tio` per Linux, ad esempio). Puoi installare `tio` con il seguente comando
```bash
sudo apt install tio
```
### Installazione
Clona il repository:
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### Configurazione
Crea il file `Private.h` nella cartella `src` con il seguente contenuto:
```
#pragma once

// Imposta chiavi reali e indirizzi anziché valori fittizi
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
e riempilo con le informazioni sul tuo account Robonomics e sulla rete WiFi. `PRIV_KEY` è la chiave privata del tuo account Robonomics, `SS58_ADR` è il suo indirizzo.

{% roboWikiNote {type: "warning"}%} Questa demo funziona solo per gli account ED25519!
{% endroboWikiNote %}

Per ottenere la chiave privata dalla frase seed del tuo account, puoi utilizzare lo script [get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py). Esegui lo script e segui le istruzioni:
```bash
python3 get-private-key.py
```

### Caricamento
Collega l'ESP32 al computer tramite cavo USB e compila il progetto:
```bash
cd esp32-datalog-demo
platformio run -t upload
```
Questo comando compilerà i file binari per esp e li caricherà, quindi alla fine vedrai quanto segue:
```
Scrittura a 0x000b9def... (84 %)
Scrittura a 0x000bf4c2... (87 %)
Scrittura a 0x000c56bf... (90 %)
Scrittura a 0x000cc6df... (93 %)
Scrittura a 0x000d1dec... (96 %)
Scrittura a 0x000d71b0... (100 %)
Scritti 836160 byte (538555 compressi) a 0x00010000 in 12.2 secondi (efficace 548.7 kbit/s)...
Hash dei dati verificato.

Uscita...
Reset tramite pin RTS...
=========================== [SUCCESSO] Richiesti 24.08 secondi ===========================
```

### Esecuzione

Dopo il caricamento, ricollega l'ESP al computer e avvia il tuo client seriale (tio con la porta `/dev/ttyACM0` in questo esempio):
```bash
tio /dev/ttyACM0
```
E scrivi il testo per l'extrinsic di registrazione del Datalog.

Puoi trovare la porta nei log dopo il comando `platformio run -t upload` nella sezione precedente. Cerca qualcosa del genere:
```
Auto-detect: /dev/ttyACM0
Caricamento .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Porta seriale /dev/ttyACM0
Connessione.......
```