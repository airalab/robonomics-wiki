---
title: Comment envoyer une extrinsèque depuis ESP32

contributors: [LoSk-p]
---

Envoyez une extrinsèque de Datalog sur le réseau Robonomics sur ESP32 en utilisant [robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp). Vous pouvez trouver le code de la démo [ici](https://github.com/LoSk-p/esp32-datalog-demo).

### Exigences

* Plateforme coreio ([instructions d'installation](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)).
* Tout client série pour votre système d'exploitation (`tio` pour Linux, par exemple). Vous pouvez installer `tio` avec la commande suivante
```bash
sudo apt install tio
```
### Installation
Clonez le dépôt :
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### Configuration
Créez le fichier `Private.h` dans le dossier `src` avec le contenu suivant :
```
#pragma once

// Configurez de vraies clés et adresses au lieu de valeurs fictives
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
et remplissez-le avec les informations concernant votre compte Robonomics et votre réseau WiFi. `PRIV_KEY` est la clé privée de votre compte Robonomics, `SS58_ADR` est son adresse.

{% roboWikiNote {type: "warning"}%} Cette démo fonctionne uniquement pour les comptes ED25519 !
{% endroboWikiNote %}

Pour obtenir la clé privée à partir de la phrase de récupération de votre compte, vous pouvez utiliser le script [get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py). Exécutez-le et suivez les instructions :
```bash
python3 get-private-key.py
```

### Téléversement
Connectez l'ESP32 à l'ordinateur à l'aide d'un câble USB et compilez le projet :
```bash
cd esp32-datalog-demo
platformio run -t upload
```
Cette commande va compiler les fichiers binaires pour l'ESP et les téléverser, vous verrez à la fin :
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

### Exécution

Après le téléversement, reconnectez l'ESP à l'ordinateur et exécutez votre client série (tio avec le port `/dev/ttyACM0` dans cet exemple) :
```bash
tio /dev/ttyACM0
```
Et écrivez le texte pour l'extrinsèque d'enregistrement de Datalog.

Vous pouvez trouver le port dans les journaux après la commande `platformio run -t upload` dans la section précédente. Recherchez quelque chose comme ceci :
```
Auto-detected: /dev/ttyACM0
Uploading .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Serial port /dev/ttyACM0
Connecting.......
```