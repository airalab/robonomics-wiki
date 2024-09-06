---
title: Cómo enviar extrínsecos desde ESP32
contributors: [LoSk-p]
---

Envía datos extrínsecos en la Red Robonomics en ESP32 utilizando [robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp). Puedes encontrar el código de la demo [aquí](https://github.com/LoSk-p/esp32-datalog-demo).

### Requisitos

* Plataforma Platformio core ([instrucciones de instalación](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)).
* Cualquier cliente serial para tu sistema operativo (`tio` para Linux, por ejemplo). Puedes instalar `tio` con el siguiente comando
```bash
sudo apt install tio
```
### Instalación
Clona el repositorio:
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### Configuración
Crea el archivo `Private.h` en la carpeta `src` con el siguiente contenido:
```
#pragma once

// Configura claves reales y direcciones en lugar de valores ficticios
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
y llénalo con la información de tu cuenta Robonomics y red WiFi. `PRIV_KEY` es la clave privada de tu cuenta Robonomics, `SS58_ADR` es su dirección.

{% roboWikiNote {type: "warning"}%} ¡Esta demo solo funciona para cuentas ED25519!
{% endroboWikiNote %}

Para obtener la clave privada de tu frase semilla de cuenta, puedes usar el script [get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py). Simplemente ejecútalo y sigue las instrucciones:
```bash
python3 get-private-key.py
```

### Subida
Conecta el ESP32 a la computadora usando un cable USB y compila el proyecto:
```bash
cd esp32-datalog-demo
platformio run -t upload
```
Este comando compilará los archivos binarios para ESP y los subirá, por lo que al final verás lo siguiente:
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

### Ejecución

Después de subirlo, reconecta el ESP a la computadora y ejecuta tu cliente Serial (tio con el puerto `/dev/ttyACM0` en este ejemplo):
```bash
tio /dev/ttyACM0
```
Y escribe el texto para el registro extrínseco de Datalog.

Puedes encontrar el puerto en los registros después del comando `platformio run -t upload` en la sección anterior. Busca algo como esto:
```
Auto-detected: /dev/ttyACM0
Uploading .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Serial port /dev/ttyACM0
Connecting.......
```