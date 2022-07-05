---
title: Add Robonomics Integration
contributors: [LoSk-p]
translated: false
cover_image: "../docsCovers/ru/add-smart-device-to-robonomics.png"
---

Integration allow Home Assistant to record datalogs with encrypted data from Home Assistant and listen launch commands to control smart devices. Integration use IPFS to store data and send IPFS hash in datalog or launch.

## Add custom integration

On your raspberry pi with Home Assistant log in homeassistant user:
```bash 
sudo -u homeassistant -H -s
```
And install python package:
```bash
source /srv/homeassistant/bin/activate
pip install http3
```

Then go to `.homeassistant` directory:
```bash
cd /home/homeassistant/.homeassistant
```
Create directory `custom_components` and clone there the repository with the integration:

```bash
mkdir custom_components
cd custom_components
git clone https://github.com/LoSk-p/robonomics_smart_home.git
```

Then you need to install IPFS node to your raspberry. For that use `install_ipfs.sh` script:

```bash
su ubuntu
cd ~
wget https://raw.githubusercontent.com/LoSk-p/robonomics_smart_home/main/install_ipfs.sh
sudo chmod +x install_ipfs.sh
./install_ipfs.sh
```

## Configure

Now you can add integration to Home Assistant. First, restart it:

```bash
systemctl restart home-assistant@homeassistant.service
```
Then in web interface go to `Settings/Device & Services` and press `Add Integration`. Find there `Robonomics`:

![integration](/docs/images/home-assistant/add-integration.png)

Click on it and fill the configuration. Here you need to add seed from `SUB_ADMIN` snd `SUB_OWNER` accounts and check the boxes if you created accounts with ED25519 type (it is better if you did that). Also you can set sending interval, by default it is 10 minutes.

Moreover, you can add your Pinata credentials. It is not nessessary, if you will not do it, data will be pinned with your local node and Infura. If you add it, files also will be pinned in Pinata, it may help to faster access it.

![configuration](/docs/images/home-assistant/configuration.png)

## Use DApp

Now you can use [Smarthome DApp](https://vol4tim.github.io/account-manager/#/) to control your home through the Robonomics. Both accounts `SUB_ADMIN` and `SUB_OWNER` must be added to the [Polcadot extention](https://polkadot.js.org/extension/).

In `Account` field choose your account with subscription. In the picture account `4FzqML6URZ5KWtk5MoQmrykkaRNvVuzYEGva77ytG1XA3Hus` is `SUB_ADMIN` (to read telemetry mark a ster on it):
![dapp-start](/docs/images/home-assistant/dapp-start.png)

### See data

Now we can se the data from our home. Press on `SUB_ADMIN` account and you will see list of datalogs:

![dapp-datalog](/docs/images/home-assistant/dapp-datalog.png)

Press `read` on the last datalog and wait while IPFS file is reading. After that write your secret key or mnemonic seed from `SUB_ADMIN` account and press decrypt. You will see the data:

![dapp-data](/docs/images/home-assistant/dapp-data.png)

### Control device

To control devices go back to main page and press send button near `SUB_ADMIN` account. Here you can control any controllable device from Home Assistant. You need to know its entity id and and the service you want to call. Entity ids you can find in Home Assistant in `Settings/Devices & Services/Entities` and service `Developer Tool/Services`. The platform is the part of entity id before the dot. For example lets turn off shapes, it has entity id `light.shapes_9275`, so the platform is `light` and we can use service `turn_off`.

![dapp-command](/docs/images/home-assistant/dapp-command.png)

You can send encrypted command or not encrypted. To send encryptrd command just tick `crypto` before send message and write you secret key from sending account.