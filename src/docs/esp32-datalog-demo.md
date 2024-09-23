---
title: How to Send Extrinsic from ESP32

contributors: [LoSk-p]
---

Send Datalog extrinsic in Robonomics Network on ESP32 using [robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp). The code of the demo you can find [here](https://github.com/LoSk-p/esp32-datalog-demo).

### Requirements

* Platformio core ([installation instructions](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)).
* Any serial client for your OS (`tio` for Linux, for example). You can install `tio` with the following command
```bash
sudo apt install tio
```
### Installation
Clone the repo:
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### Configuration
Create file `Private.h` in `src` folder with the following content:
```
#pragma once

// Set up real keys and addresses instead of dummy values
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
and fill it with the information about your Robonomics account and WiFi Network. `PRIV_KEY` is the private key of your Robonomics account, `SS58_ADR` is its address.

{% roboWikiNote {type: "warning"}%} This demo works only for ED25519 accounts!
{% endroboWikiNote %}


To get the private key from your account seed phrase you can use [get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py) script. Just run it and follow instructions:
```bash
python3 get-private-key.py
```

### Upload
Connect ESP32 to the computer using USB cable and build the project:
```bash
cd esp32-datalog-demo
platformio run -t upload
```
This command will build binary files for esp and upload them, so in the end you will see following
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

### Run

After uploading reconnect ESP to the computer aand run your Serial Client (tio with the port `/dev/ttyACM0` in this example):
```bash
tio /dev/ttyACM0
```
And write the text for Datalog record extrinsic.

You can find out the port in the logs arter `platformio run -t upload` command in the previous section. Look for something like this:
```
Auto-detected: /dev/ttyACM0
Uploading .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Serial port /dev/ttyACM0
Connecting.......
```