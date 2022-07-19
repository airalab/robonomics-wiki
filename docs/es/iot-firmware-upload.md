---
title: IoT Firmware Upload
locale: 'es' 
# contributors: []
translated: false
---

There are few firmwares for ESP like boards:

* [Ping](https://github.com/airalab/sensors-connectivity/tree/master/boards/esp/ping)
* [TCP](https://github.com/airalab/sensors-connectivity/tree/master/boards/esp/tcp)
* [Mobile GPS](https://github.com/airalab/sensors-connectivity/tree/master/boards/esp/mobile_gps)

There is a script to upload a firmware for each one, called `flash_firmware.py`. It's located in the root of the repository

> **Requirements**
> In order to install all dependencies run in the root of the repository folder:
>
> ```
> pip install -r requirements.txt
> ```
>
> Python3 is required!

Usually in order to upload a firmware to your board follow these steps:

1. Assemble the board and connect it to PC
2. Edit a `config.yaml` in a corresponding folder (e.g. `boards/esp/tcp/config.yaml`)
3. Run `python flash_firmware.py -s PATH_TO_FOLDER -c PATH_TO_CONFIG` where `PATH_TO_FOLDER` is a path to the desired firmware (e.g. `boards/esp/ping`) and `PATH_TO_CONFIG` is a path to the configuration file (e.g. `boards/esp/ping/config.yaml`)

