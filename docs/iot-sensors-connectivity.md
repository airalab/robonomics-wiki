# IoT Sensors Connectivity

Robonomics Network allows you to communicate with any sensor you wish and get data from the sensor all around the world. This data can be transfered to different distenations.

At this page you'll find step-by-step instruction to connect a ESP board to the connectivity server provided by AiraLab.

## Requirements

* ESP8266/ESP32 like board with WiFi

## 1. Get the software

### On Windows

Install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

Install Ubuntu via Windows Store:

![Windows Store](./images/windows_store.jpg "Windows Store")

and clone the [package](https://github.com/airalab/sensors-connectivity)

```
git clone https://github.com/airalab/sensors-connectivity
```

The next step is to install python and dependencies:

```
sudo apt update && sudo apt install python3-pip
cd sensors-connectivity
pip3 install -r requirements.txt
```

### On Ubuntu

```
sudo apt update && sudo apt install python3-pip git
git clone https://github.com/airalab/sensors-connectivity
cd sensors-connectivity
pip3 install -r requirements.txt
```

### On NixOS

```
git clone https://github.com/airalab/sensors-connectivity
cd sensors-connectivity
nix build -f release.nix
source result/setup.bash
```

## Flash Firmware

Let's start from a ping firmware. Plug a ESP like board in. Edit firmware's configuration file `sensors-connectivity/boards/esp/ESP_PING/config.my`:

```yaml
stassid:                # put your wifi name
stapsk:                 # wifi password
host: "34.90.113.108"   # leave it for now
port: 31313             # leave it for now
geo:                    # put your "latitude,longitude"
```

Then from firmware's root folder run the script:

```
cd boards/esp/ESP_PING
./flash_firmware.py
```

The board should be ready. 

