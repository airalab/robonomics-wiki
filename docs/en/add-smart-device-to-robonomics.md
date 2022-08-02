---
title: Robonomics integration setup

contributors: [LoSk-p, nakata5321]
translated: true
---

After finishing with [IOT subscription](/docs/iot-sub-setup/) it's time to install **Robonomics integration**. Integration allow Home Assistant to record datalogs with encrypted data from Home Assistant and listen launch commands to control smart devices. Integration use IPFS to store data and send IPFS hash in datalog or launch.

## Configure

Now you can add integration to Home Assistant. In web interface go to `Settings/Device & Services` and press `Add Integration`. Find there `Robonomics`:

<robo-wiki-picture src="home-assistant/add-integration.jpg" />

Click on it and fill the configuration. Here you need to add seed from `SUB_ADMIN` snd `SUB_OWNER` accounts (which you've just created. they are ED25519 type, so don't forget to check the boxes under your seeds).
 Also you can set sending interval, by default it is 10 minutes.

Moreover, you can add your Pinata credentials. It is not necessary, if you will not do it, data will be pinned with your local node and Infura. If you add it, files also will be pinned in Pinata, it may help to faster access it.

<robo-wiki-picture src="home-assistant/cobfiguration.jpg" />

 Fill in everything and press `Submit`. If everything correct, you will see **Success** window. Close it.

## Use DApp

Now it's time to create the first user for your Home Assistant.(It's shouldn't be `SUB_OWNER` or `SUB_ADMIN` accounts). Create account, as we did in previous [article](/docs/iot-sub-setup/). 
Add this account to subscription [here](https://dapp.robonomics.network/#/subscription/devices). Now in access lsit should be three addresses - `SUB_OWNER`, `SUB_ADMIN` and `user`.

<robo-wiki-picture src="home-assistant/user.jpg" />

Then go to our Dapp to service [**"HomeAssistant Account"**](https://dapp.robonomics.network/#/home-assistant). Choose account, you've just created at the right sidebar.(You can find it address in extension).
In next two raws insert `SUB_OWNER` and `SUB_ADMIN` addresses. Then write `USER` seed:

<robo-wiki-picture src="home-assistant/acc-pass.jpg" />

And Press `DECRYPT PASSWORD`. You will get login and password for your Home Assistant. Go to login page and login:

<robo-wiki-picture src="home-assistant/acc-login.jpg" />

Now you can use `SmartHome Telemetry` DApp to control your home through the Robonomics. Go to the [article](/docs/use-dapp/).