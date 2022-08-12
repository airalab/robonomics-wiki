---
title: Robonomics integration setup

contributors: [LoSk-p, nakata5321]
translated: false
---

After finishing with [IOT subscription](/docs/iot-sub-setup/) it's time to install **Robonomics integration**. This integration allows Home Assistant to record datalogs with encrypted data from Home Assistant to Robonomics Parachain and listen launch commands from this Parachain to control smart devices. Integration use IPFS to store data and send IPFS hashes to  datalog or launch.

## Configure

Now you can add integration to Home Assistant. In web interface go to `Settings/Device & Services` and press `Add Integration`. Find there `Robonomics`:

<robo-wiki-picture src="home-assistant/add-integration.jpg" />

Click on it and fill the configuration. Here you need to add seed from `SUB_ADMIN` and public address of `SUB_OWNER` accounts (which you previously created).
Also, you can set sending interval, by default it is 10 minutes.

Moreover, you can add your Pinata credentials. It is not necessary, if you will not do it, data will be pinned with your local node and Infura.If you add the credentials files will also be pinned on Pinata to help them spread wider over IPFS.

<robo-wiki-picture src="home-assistant/config.jpg" />

 Fill in everything and press `Submit`. If is, you will see **Success** window. Close it.

## Use DApp

Now it's time to create the first user for your Home Assistant.(It shouldn't be `SUB_OWNER` or `SUB_ADMIN` accounts). Create an account, as we did in the previous [article](/docs/iot-sub-setup/). 
Add this account to the subscription [here](https://dapp.robonomics.network/#/subscription/devices). Now there should be three addresses in the access list - `SUB_OWNER`, `SUB_ADMIN` and `user`.

<robo-wiki-picture src="home-assistant/user.jpg" />

Then go to the Dapp service [**"HomeAssistant Account"**](https://dapp.robonomics.network/#/home-assistant). Choose account, you've just created at the right sidebar.(Find its address in extension).
In the next two raws type in `SUB_OWNER` and `SUB_ADMIN` addresses. Then enter `USER` seed:

<robo-wiki-picture src="home-assistant/acc-pass.jpg" />

Create a password for a new HA user which you have just registered. This will be another one apart from previously created HA Admin user. Type the passport below `Enter password` and click registration. Confirm transaction. 
It’s free now since the accounts are using RWS subscription. After the registration process, you can log in to Home Assistant with your address as `login` and a newly-created password. Go to login page and login:

<robo-wiki-picture src="home-assistant/acc-login.jpg" />

Now you can use `SmartHome Telemetry` DApp to control your home through the Robonomics. Go to the [article](/docs/use-dapp/) to have a try.