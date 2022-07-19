---
title: Robonomics Integration Configuration
locale: 'ko' 
contributors: [LoSk-p]
translated: false
---

Integration allow Home Assistant to record datalogs with encrypted data from Home Assistant and listen launch commands to control smart devices. Integration use IPFS to store data and send IPFS hash in datalog or launch.

## Configure

Now you can add integration to Home Assistant. In web interface go to `Settings/Device & Services` and press `Add Integration`. Find there `Robonomics`:

<robo-wiki-picture src="home-assistant/add-integration.jpg" />

Click on it and fill the configuration. Here you need to add seed from `SUB_ADMIN` snd `SUB_OWNER` accounts (it must be ED25519 type, so don't forget to check the boxes under your seeds). You can find the instructions on how to create the account with ED25519 type [here](https://wiki.robonomics.network/docs/ko/create-account-in-dapp/#2-directly-on-robonomics-parachain-app) Also you can set sending interval, by default it is 10 minutes.

Moreover, you can add your Pinata credentials. It is not nessessary, if you will not do it, data will be pinned with your local node and Infura. If you add it, files also will be pinned in Pinata, it may help to faster access it.

<robo-wiki-picture src="home-assistant/cobfiguration.jpg" />

## Use DApp

Now you can use `SmartHome Telemetry` DApp to control your home through the Robonomics. You can find it in [Robonomics services](https://dapp.robonomics.network/#/services). Both accounts `SUB_ADMIN` and `SUB_OWNER` must be [added](https://wiki.robonomics.network/docs/ko/create-account-in-dapp/#2.3-add-ed25519-account-to-polkadot-extention) to the [Polkadot extention](https://polkadot.js.org/extension/).
