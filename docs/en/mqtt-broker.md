---
title: MQTT setup
contributors: [nakata5321, PaTara43]
translated: true
tools:
  - Mosquitto Broker 2.0.11
    https://mosquitto.org/
---

**Being on this page means that you have installed Home Assistant with Robonomics and IPFS and yet don't have any
ZigBee devices connected. To do so, you first need a MQTT broker to be set up and MQTT integration to be configured.**


## Install MQTT broker

There is a quick installation option with a pre-written script:

```shell
curl -O https://raw.githubusercontent.com/LoSk-p/robonomics-hass-utils/main/raspberry_pi/mqtt-install.sh
bash mqtt-install.sh
```

You will be asked to insert **USERNAME** and **PASSWORD** for Broker.

You have installed MQTT broker to your host (it's now running as a `systemd` service). If you had your existing Home Assistant OS, Core or Docker augmented with
Robonomics, proceed directly to [integration configuration](#add-mqtt-integration). If not, and you are setting up a whole
new Home Assistant, activate it with the below-mentioned steps.

## Home Assistant Initial Configuration

Alright, you made it here. The tough part is done.

With Home Assistant installed, it’s time to configure it. Here you will create the owner account of Home Assistant. 
This account will be an administrator and will always be able to change everything. Open web browser and go to 
`http://%RASPBERRY_IP_ADDRESS%:8123`(RASPBERRY_IP_ADDRESS you have found in previous [article](/docs/home-assistant-x-robonomics)).

<robo-wiki-note type="note">Raspberry Pi address may change in time, due router settings</robo-wiki-note>

At the first page, enter a name, username, password and click on “create account”.

<robo-wiki-picture src="home-assistant/username.jpg" alt="create user" />

Next, you can enter a name for your home and set your location and unit system. Click “DETECT” to find your location and set your time zone and unit system based on that location.
If you’d rather not send your location, you can set these values manually.

<robo-wiki-picture src="home-assistant/location.jpg" alt="set location" />

Once you are done, click Next. In this screen, Home Assistant will show any devices that it has discovered on your network.
Don’t be alarmed if you see fewer items than what is shown below; you can always manually add devices later.

<robo-wiki-picture src="home-assistant/add-devices.jpg" alt="additional devices" />

Finally, click Finish. Now you’re brought to the Home Assistant web interface.
This screen will show all of your devices. So let’s get that screen filled up!

## Add MQTT Integration

Now, you should install MQTT client. For this go to `Settings` -> `devices & Services`.

<robo-wiki-picture src="home-assistant/settings.jpg" alt="settings screen" />

And press `ADD INTEGRATION` at the right bottom corner. In the opened window find `MQTT`:

<robo-wiki-picture src="home-assistant/mqtt.jpg" />

Press on it and set up your broker address - `localhost`, port - `1883` 
and your username and password, which you've created earlier, then press `submit`:

<robo-wiki-picture src="home-assistant/mqtt-setup.jpg" />

Then press on three dots on MQTT integration and choose `System Options` and check if automatically adding new devices is enabled:

<robo-wiki-picture src="home-assistant/add-dev.jpg" />


## Connect ZigBee devices to your Home Assistant

Now it's time to add some devices to your smart home. Depending on the hardware you have, pick one of the options:

### Option 1 (with zigbee2MQTT)
* If you have ZigBee adapter [JetHome USB JetStick Z2](https://jethome.ru/z2/)
(or one of [supported](https://www.zigbee2mqtt.io/information/supported_adapters.html)) go [**here.**](/docs/zigbee2-mqtt/)

### Option 2 (with SLS Gateway)
* If you have [Robonomics SLS Gateway](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01) go [**here.**](/docs/sls-setup/)

