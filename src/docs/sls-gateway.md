---
title: Robonomics SLS Gateway

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**In this article you will set up Robonomics SLS Gateway. You will install the required software for the gateway, configure it and connect it to Home Assistant.**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"sls gateway"} %}{% endroboWikiPicture %}

## Firmware

First you need to install microcontroller firmware of the gateway. Prepare the gateway by setting switches `1` and `3` at the bottom part of SLS Gateway to `ON`, others must be `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"sls gateway 13"} %}{% endroboWikiPicture %}

Connect gateway to your Raspberry Pi via USB type-C port on the gateway.

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

Clone the repository with firmware to your Raspberry Pi:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

{% endcodeHelper %}

Go to `robonomics-hass-utils/esp_firmware/linux`. To flash the SLS gateway you need to run `Clear` and `Flash_16mb` scripts.

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### Troubleshooting

If you are experiencing problems updating the gateway firmware, you need to take additional steps:

1. Make sure you have the pySerial module installed:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}

2. Give your user access rights to the USB port and reboot computer:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}


3. In some cases, it is necessary to change the bandwidth setting in the script to update the firmware. Open the `Flash_16mb.sh` script with the `nano` editor and change the baud parameter from `921600` to a smaller value (for example, `115200`).

## Configuration

1. Disconnect SLS Gateway from rhe computer. Set the switches on the back of the gateway to the proper position. Switches `5` (RX Zigbee to ESP) and `6` (TX Zigbee to ESP) must be in the `ON` position, the others must be `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. Connect the type-C power cable. The indicator light in the center should turn green.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. On the first startup, the gateway will start sharing Wi-Fi with the SSID `zgw****`. Connect to this network. Keep in mind that the signal may be quite weak, so it is better to keep the SLS gateway closer to your computer.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. If the connection is successful, the web interface will open (or you can find it on 192.168.1.1 address).

5. You will see `Wi-Fi Settings` page. Select your Wi-Fi and enter the password. Press `Apply` button. The gateway will restart and connect to your Wi-Fi network.

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. Find the local IP of the SLS gateway to access the web interface. To find it you can use [Fing mobile app](https://www.fing.com/products) or [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). The gateway name should look like this: `zgw****`. Open the web interface of the gateway by pasting the gateway IP into a browser.

7. Go to `Setting` -> `Hardware` and make sure that the settings look like on the image. Correct the settings if necessary and click `Save` button:

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

The table with required values:

| Field                    | Value              |
|--------------------------|:-------------------|
| Zigbee module            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Service Button Pin       | 33 (pullUP - true) |
| Number addressable leds  | 0                  |
| Led Red (or addr)        | 21                 |
| Led Green                | 5                  |
| Led Blue                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Then reboot the gateway. Choose `Actions` -> `Reboot system` at the right top corner.

9. Make sure that the gateway works properly in the Zigbee info window. DeviceState should be `OK`.

10. Configure automatically adding devices to Home Assistant. Go to `Zigbee` -> `Config` then choose `Home Assistant MQTT Discovery` and `Clear States`. Save changes and again **reboot** SLS gateway.

{% roboWikiNote {type: "warning"}%} If you already have an active SLS gateway in your home, and you are now configuring another one, then they will conflict with each other. To solve this problem you need to change the channel on the new device. To do this, go to `Zigbee` -> `Config` and change the channel to another one (e.g. channel 15). {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

## Pairing SLS to MQTT

After configuring the SLS Gateway, you need to connect SLS Gateway to Home Assistant. Open SLS Gateway web interface and go to `Settings/Link` -> `MQTT Setup`:


Add your broker address (address of the Raspberry Pi with Home Assistant in local network, you can find it with [Fing mobile app](https://www.fing.com/products) or [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), port (default is `1883`) your broker username and password (which you have created earlier) and the topic name (you can choose any). Also, the Raspberry Pi IP address must be static. Click on `Enable` and `Retain states`.


Save changes. Now devices will be automatically shown in Home Assistant.

## Connect Devices

Connect your devices by going to `Zigbee` -> `Join`. Put your sensors in pairing mode, the most common way to switch a device to connect mode is to hold its power button or switch them on/off for 5 times. Press the `Enable Join` button to start searching Zigbee devices. You will see active sensors.

{% roboWikiVideo {videos:[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}


Now you can go to the [**IoT Subscription**](/docs/sub-activate) section and start activating the Robonomics subscription.
