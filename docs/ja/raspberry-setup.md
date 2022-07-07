---
title: Raspberry Pi Setup
contributors: [LoSk-p, dergudzon, Leemo94]
translated: false
cover_image: "../docsCovers/ja/raspberry-setup.png"
---

For all methods from ["Overview"](./home-assistant-begin.md), the first thing you need to do is setup a Raspberry Pi.

## Preinstalled image
The easiest way is use our prepared image. You can download it [here.]() Then read "RPi Imager part" and install image.

### RPi Imager
Install [Raspberry Pi Imager](https://www.raspberrypi.com/software/) on your computer. Then, insert the SD card and run the Imager program. Select required image as the operating system and ensure to select your SD card from the storage dropdown, and then press `write`.

<robo-wiki-picture src="home-assistant/pi.jpg" alt="RPI installer" />

Open the SD card's storage from your computer and navigate inside the root folder of the card. The name of the folder should be something similar to `system-boot`.

Find the file named `network-config` and open it in a text editor. Copy the below text and paste it into the file:
```
version: 2
ethernets: 
  eth0:
    dhcp4: true
    optional: true
wifis:
  wlan0:
    dhcp4: true
    optional: true
    access-points:
      "YOUR_WIFI_NAME":
        password: "YOUR_WIFI_PASSWORD"
```
<robo-wiki-note type="warning">Make sure that you input your actual wifi name and your wifi password.</robo-wiki-note>

Then you need to save the file, and insert the SD card to the Raspberry Pi and turn it on. It must connect to your wi-fi network. 

Now you need to find its address. To find address you can use [Fing app](https://www.fing.com/products). 
Also you can find address nmap tool.
First, install nmap. For ubuntu:
```shell
sudo apt-get install nmap
```
Then find your address in the local network with:
```bash
ip a
```
It must look like `192.168.xx.xx` or `172.xx.xx.xx`.

Then scan the network with your address and zero in the end (also you can use `arp -a`):

```bash 
$ sudo nmap -sP 192.168.xx.0/24
Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-26 13:50 CEST
Nmap scan report for _gateway (192.168.43.1)
Host is up (0.015s latency).
MAC Address: 8E:F5:A3:DB:03:27 (Unknown)
Nmap scan report for ubuntu (192.168.43.56)
Host is up (0.049s latency).
MAC Address: DC:A6:32:02:46:50 (Raspberry Pi Trading)
Nmap scan report for LAPTOP-27UBLNO7 (192.168.43.234)
Host is up (0.00057s latency).
MAC Address: 7C:B2:7D:9E:95:DA (Intel Corporate)
Nmap scan report for ed-vm (192.168.43.138)
Host is up.
Nmap done: 256 IP addresses (4 hosts up) scanned in 2.07 seconds
```

In this example we can see that the Raspberry Pi's address is `192.168.43.56`. Now you can connect to it over ssh:
```bash
ssh ubuntu@192.168.43.56
```
<robo-wiki-note type="note">Password is "ubuntu-hass".</robo-wiki-note>

## Manually Installation
If It's necessary, you can create PRi image manually. 
For this you should choose **64-bit Ubuntu Server 22.04 LTS or newer** in RPi imager and then repeat "RPi Imager part". The required image you can find in RPi imager program.

### Home Assistant installation
Now we need to install Home Assistant to the Raspberry Pi. Detailed instructions can be found [here](https://www.home-assistant.io/installation/linux#install-home-assistant-core). You need to install `Home Assistant Core`. It's actual version is 2022.6.7  and instruction assumes that we already have installed Python 3.9 or newer.

Update your system and install necessary packages:
```bash
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install -y python3 python3-dev python3-venv python3-pip libffi-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential libopenjp2-7 libtiff5 tzdata libcurl4-openssl-dev
```

Create user `homeassistant` and the directory for homeassistant core:
```bash
sudo useradd -rm homeassistant
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
```

Next up is to create and change to a virtual environment for Home Assistant Core. This will be done as the homeassistant account.
```bash
sudo -u homeassistant -H -s
cd /srv/homeassistant
python3.9 -m venv .
source bin/activate
```
<robo-wiki-picture src="home-assistant/terminal1.jpg" alt="terminal image" />


Then install required Python packages:
```bash
python3 -m pip install wheel
pip3 install homeassistant==2022.6.2
```

Start Home Assistant Core for the first time. This will complete the installation for you, automatically creating the `.homeassistant `configuration directory in the `/home/homeassistant` directory, and installing any basic dependencies:
```bash
hass
```

You can now reach your installation via the web interface on `http://%RASPBERRY_IP_ADDRESS%:8123`. 
In this example: `http://192.168.43.56:8123`

> You don't need to connect you raspberry to the screen, you can open Web UI from any computer connected to your local network

Create user and finish setup (first setup is described [here](https://www.home-assistant.io/getting-started/onboarding/) in more details), then stop Home Assistant with `Ctrl+C`.

### MQTT instalation

After finishing with Home Assistant installation you have to install MQTT broker. Go back  under `ubuntu` login.
```bash
(homeassistant) homeassistant@ubuntu:/srv/homeassistant/python_scripts$ exit
```
Then install [Mosquitto Brocker](https://mosquitto.org/):

```bash
sudo apt update -y && sudo apt install mosquitto mosquitto-clients -y
```
Configure username (you can use any username you want) and password (you will be asked to enter the password after the command):
```bash
sudo mosquitto_passwd -c /etc/mosquitto/passwd <username>
```
<robo-wiki-note type="note">Default user and password is - user/pass.</robo-wiki-note>

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

And check the brocker status:
```bash
systemctl status mosquitto
```

<robo-wiki-picture src="home-assistant/mosquitto.jpg" alt="Broker status" />

### IPFS installation
Also we need [IPFS](https://ipfs.io/) for working with robonomics. For today the latest release of IPFS is 0.13.1.
```shell
https://dist.ipfs.io/go-ipfs/v0.13.1/go-ipfs_v0.13.1_linux-arm.tar.gz
tar -xvzf go-ipfs_v0.13.1_linux-arm.tar.gz
cd go-ipfs
sudo bash install.sh
ipfs init
```

### Systemd services

If you don'tr want to start Home assistant manually everytime - let's create systemd service.

Create new service for home assistant start: 

```bash
ubuntu@ubuntu:~$ sudo nano /etc/systemd/system/home-assistant@homeassistant.service 
```

Paste the following:

```
[Unit]
Description=Home Assistant
After=network-online.target
[Service]
Type=simple
User=%i
WorkingDirectory=/srv/%i/
ExecStart=/srv/homeassistant/bin/hass -c "/home/%i/.homeassistant"
Environment="PATH=/srv/%i/bin"

[Install]
WantedBy=multi-user.target
```
After that enable and start service:
```bash
sudo systemctl enable home-assistant@homeassistant.service
sudo systemctl start home-assistant@homeassistant.service
```

After that you can connect your devices:
- [Connection with zigbee2MQTT](/docs/zigbee2-mqtt/)
- [Setup SLS Gateway](/docs/sls-setup) and [connect it to Home Assistant](/docs/sls-gateway-connect)
- [Connection through Xiaomi Gateway](/docs/xiaomi-gateway/)
- [Connect Vacuum Cleaner](/docs/vacuum-connect/)