---
title: Setup SLS Gateway

contributors: [LoSk-p, Fingerling42]
translated: true
---

After installing [MQTT broker](/docs/mqtt-broker/) to the Raspberry Pi, you can now set up the Robonomics SLS Gateway. All the next steps are to be performed on PC. 

## Firmware

First you need to flash the gateway. For this:

1. Set to `ON` switches 1 and 3 at the bottom part of SLS Gateway, others must be `OFF`.
2. Connect gateway to your computer via USB type-C port on the gateway.

Then clone the repository with firmware:

```bash
git clone https://github.com/LoSk-p/robonomics-hass-utils.git
```

And go to `robonomics-hass-utils/esp_firmware`. There you should navigate to a folder, which name depends on your OS: 
`windows`, `linux` or `Mac`. To flash the SLS gateway you need to run `Clear` and `Flash_16mb` scripts.

The following example is for Linux. First, add permissions:

```bash
cd linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

## Setup

1. Set the switches on the back of the gateway are properly positioned. Switches 5 (RX Zigbee to ESP) and 6 (TX Zigbee to ESP) must be in the `ON` position, the others must be `OFF`. 

2. Connect the type C power cable. The indicator light in the center should turn green.

3. On the first startup, the gateway will start sharing Wi-Fi with the SSID `zgw****`. Connect to this network. Keep in mind that the signal may be quite weak, so it is better to keep the SLS Gateway closer to your computer. 

4. If the connection is successful, the web interface will open (or you can find it on 192.168.1.1). 
5. Go to `WI-FI` page and insert your Wi-Fi credentials by entering the user / pass and press `Save` button. After that  press `Reboot` button. The gateway will restart and connect to your WI-Fi network. 

<robo-wiki-picture src="home-assistant/sls-wifi.jpg" />

6. Find the local IP of the SLS gateway to access the web interface. For that you can use [Fing app](https://www.fing.com/products). Also, you can use ```arp -a``` in your terminal or:

```bash
nmap -sn 192.168.xxx.0/24
```
where ```ххх``` is your IP address in the local network.
The resulting link should look like this: http://192.168.xxx.xxx.

7. Go to `Setting` -> `Hardware` and make sure that the settings look like this. Correct the settings if necessary and  click `Save` button:

<robo-wiki-picture src="home-assistant/sls-hardware.jpg" />

Here is the table with required values:

| Field                   | Value              |
|-------------------------|:-------------------|
 |Zigbee module            | TI                 |
| Zigbee UART RX          | 22                 |
| Zigbee UART TX          | 23                 |
| Button Mode             | 33 (pullUP - true) |
| Number addressable leds | 0                  |
| Led Red (or addr)       | 21                 |
| Led Green               | 5                  |
| Led Blue                | 27                 |
| I2C SDA                 | 255                |
| I2C SCL                 | 255                |

8. Then reboot the gateway. Choose `Actions` -> `Reboot system` at the right top corner.

9. Configure automatically adding devices to Home Assistant. Go to `Zigbee` -> `Config` then tick `Home Assistant MQTT Discovery` and `Clear States`. Then `Save` button and again **reboot** SLS gateway:

<robo-wiki-picture src="home-assistant/sls-hass.jpg" />

10. Connect your devices by going to `Zigbee` -> `Join`. Press the `Enable Join` button to start searching Zigbee devices. Put your sensors in pairing mode. You will see active sensors. 

After connecting all sensors to the SLS Gateway, it's time to connect SLS Gateway to Home assistant with the following [guide](/docs/sls-gateway-connect).