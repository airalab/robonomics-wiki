---
title: Robonomics SLS Gateway

contributors: [LoSk-p, Fingerling42, nakata5321]
translated: false
---

**After installing [MQTT broker](/docs/mqtt-and-hass-setup/) on the Raspberry Pi, you can now set up the Robonomics SLS Gateway.**

## Firmware

First you need to flash the gateway. For this:

1. Set switches 1 and 3 at the bottom part of SLS Gateway to `ON`, others must be `OFF`.

<robo-wiki-picture src="home-assistant/sls-gateway-13.gif" />

2. Connect gateway to your Raspberry Pi via USB type-C port on the gateway.

<robo-wiki-picture src="home-assistant/sls-rpi.gif" />

Then clone the repository with firmware to you the Raspberry Pi:

```bash
ubuntu@your-rpi:~$
git clone https://github.com/airalab/robonomics-hass-utils.git
```

Next go `robonomics-hass-utils/esp_firmware`. and navigate to a folder, which name depends on your OS: 
`windows`, `linux` or `Mac`. To flash the SLS gateway you need to run `Clear` and `Flash_16mb` scripts.

The following example is for Linux. First, add permissions:

```bash
ubuntu@your-rpi:~$
cd robonomics-hass-utils/esp_firmware
cd linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

## Configuration

1. Set the switches on the back of the gateway are properly positioned. Switches 5 (RX Zigbee to ESP) and 6 (TX Zigbee to ESP) must be in the `ON` position, the others must be `OFF`. 

<robo-wiki-picture src="home-assistant/sls-gateway-56.gif" />

2. Connect the type C power cable. The indicator light in the center should turn green.

<robo-wiki-picture src="home-assistant/sls-gateway-connect.gif" />

3. On the first startup, the gateway will start sharing Wi-Fi with the SSID `zgw****`. Connect to this network. Keep in mind that the signal may be quite weak, so it is better to keep the SLS Gateway closer to your computer. 

<robo-wiki-picture src="home-assistant/sls-gateway-wifi.gif" />

4. If the connection is successful, the web interface will open (or you can find it on 192.168.1.1). 
5. You will see `WI-FI Settings` page. Press to your Wi-Fi and enter the password. Press `Apply` button. The gateway will restart and connect to your WI-Fi network. 

<robo-wiki-picture src="home-assistant/wi-fi-connect.jpg" />

6. Find the local IP of the SLS gateway to access the web interface. For that you can use [Fing app](https://www.fing.com/products). 
Also, you can use [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) in your terminal.

7. Go to `Setting` -> `Hardware` and make sure that the settings look like this. Correct the settings if necessary and click `Save` button:

<robo-wiki-picture src="home-assistant/sls-hardware.jpg" />

Here is the table with required values:

| Field                    | Value              |
|--------------------------|:-------------------|
| Zigbee module            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
 | Zigbee BSL Pin           | 19                |
| Button Mode              | 33 (pullUP - true) |
| Number addressable leds  | 0                  |
| Led Red (or addr)        | 21                 |
| Led Green                | 5                  |
| Led Blue                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Then reboot the gateway. Choose `Actions` -> `Reboot system` at the right top corner.

9. Configure automatically adding devices to Home Assistant. Go to `Zigbee` -> `Config` then click `Home Assistant MQTT Discovery` and `Clear States`. Then `Save` button and again **reboot** SLS gateway:

<robo-wiki-note type="warning">
If you already have an active SLS gateway  or a similar device in your home, 
and you are now configuring another SLS gateway, then they will conflict with each other. 
To solve this problem you need change channel on the new device in field "channel". 
</robo-wiki-note>

<robo-wiki-picture src="home-assistant/sls-hass.jpg" />

10. Connect your devices by going to `Zigbee` -> `Join`. Press the `Enable Join` button to start searching Zigbee devices. The most common way to switch a device to connect mode is to hold its power button. For lamps one may switch them on|off
for 5 times. 

<robo-wiki-picture src="home-assistant/switch-device.gif" />


## Pairing SLS to MQTT

After connecting all sensors to the SLS Gateway, it's time to connect SLS Gateway to Home Assistant.
On your SLS Gateway web interface go to `Settings/Link` -> `MQTT Setup`:

<robo-wiki-picture src="home-assistant/sls-mqtt-menu.jpg" />

And add your broker address (address of the Raspberry Pi with Home Assistant in local network, you can find it in Fing [app](https://www.fing.com/products) 
or with `ip a` command on your RPi), port (default is 1883) and your broker username and password (which you have created earlier). 
Also write the topic name (you can choose any).

<robo-wiki-note type="okay">Don't forget to click `Enable` and `Retain states`.</robo-wiki-note>

<robo-wiki-note type="warning">Paspberry Pi IP address must be static.</robo-wiki-note>

<robo-wiki-picture src="home-assistant/sls-mqtt1.jpg" />

Save changes. Now devices will be automatically shown in Home Assistant.

That's all. Proceed to ["IOT subscription setup"](/docs/sub-activate/) to create Robonomics Parachain accounts and 
activate subscription to use Robonomics integration.