---
title: MQTT setup
contributors: [nakata5321]
translated: false
tools:
  - Mosquitto Broker 2.0.11
    https://mosquitto.org/
---

After finishing with [Raspberry Pi Setup](/docs/raspberry-setup/), next step is install MQTT Broker. To install it you can use our bash script or install it manually.

## Install with script

First, to install MQTT Broker with script you need to download it:

```shell
wget https://github.com/LoSk-p/robonomics-hass-utils/blob/main/raspberry_pi/mqtt-install.sh
```

then start the script:

```shell
bash mqtt-install.sh
```

He will ask you to insert **USERNAME** and **PASSWORD** for Broker.
After finishing, you can go to the next part - "[Home Assistant](#home-assistant)"

## Manual Installation

Alternatively, you could install all by hangs.

First, install [Mosquitto Broker](https://mosquitto.org/):

```bash
sudo apt update -y && sudo apt install mosquitto mosquitto-clients -y
```

Configure username (you can use any username you want) and password (you will be asked to enter the password after the command):

```bash
sudo mosquitto_passwd -c /etc/mosquitto/passwd <username>
```

Then edit configuration file:

```bash
sudo nano /etc/mosquitto/mosquitto.conf
```

Add the following at the end of the file:

```
listener 1883
allow_anonymous false
password_file /etc/mosquitto/passwd
```

Then restart the service:

```bash
sudo systemctl restart mosquitto
```

And check the Broker status:

```bash
systemctl status mosquitto
```

<robo-wiki-picture src="home-assistant/mosquitto.jpg" alt="Broker status" />


<robo-wiki-title :type="3" anchor="home-assistant"> 
  Home Assistant
</robo-wiki-title>

Alright, you made it here. The tough part is done.

With Home Assistant installed, it’s time to configure it. Here you will create the owner account of Home Assistant. 
This account will be an administrator and will always be able to change everything. Enter a name, username, password and click on “create account”.

<robo-wiki-picture src="home-assistant/username.jpg" alt="create user" />

Next, you can enter a name for your home and set your location and unit system. Click “DETECT” to find your location and set your time zone and unit system based on that location.
If you’d rather not send your location, you can set these values manually.

<robo-wiki-picture src="home-assistant/location.jpg" alt="set location" />

Once you are done, click Next. In this screen, Home Assistant will show any devices that it has discovered on your network.
Don’t be alarmed if you see fewer items than what is shown below; you can always manually add devices later.

<robo-wiki-picture src="home-assistant/add-devices.jpg" alt="additional devices" />

Finally, click Finish. Now you’re brought to the Home Assistant web interface.
This screen will show all of your devices. So let’s get that screen filled up!

Now, you should install MQTT client. For this go to `Settings` -> `devices & Services`.

<robo-wiki-picture src="home-assistant/settings.jpg" alt="settings screen" />

And press `ADD INTEGRATION` at the right bottom corner. In the opened window find `MQTT`:

<robo-wiki-picture src="home-assistant/mqtt.jpg" />

Press on it and set up your broker address `(localhost)`, port `(1883)` 
and your username and password, which you've created earlier, then press `submit`:

<robo-wiki-picture src="home-assistant/mqtt-setup.jpg" />

Then press on three dots on MQTT integration and choose `System Options` and check if automatically adding new devices is enabled:

<robo-wiki-picture src="home-assistant/add-dev.jpg" />


After finishing, you can go to the next article:

### Method 1 (with zigbee2MQTT)
* If you have Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (or one of [supported](https://www.zigbee2mqtt.io/information/supported_adapters.html)) go [**here.**](/docs/zigbee2-mqtt/)

### Method 2 (with SLS Gateway)
* If you have [Robonomics SLS Gateway](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01) go [**here.**](/docs/sls-setup/)

