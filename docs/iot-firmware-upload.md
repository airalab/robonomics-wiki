# IoT Firmware Upload

There are few firmwares for ESP like boards:

* [Ping](https://github.com/airalab/sensors-connectivity/tree/master/boards/esp/ping)
* [TCP](https://github.com/airalab/sensors-connectivity/tree/master/boards/esp/tcp)
* [Mobile GPS](https://github.com/airalab/sensors-connectivity/tree/master/boards/esp/mobile_gps)

There is a script to upload a firmware for each one, called `flash_firmware.py`.

Usually in order to upload a firmware to your board follow these steps:

1. Assemble the board and connect it to PC
2. Enter a firmware's directory, e.g. `esp/ping`
3. Edit `config.yaml` file according to your WiFi, pins, geo position
4. Run `./flash_firmware.py`
