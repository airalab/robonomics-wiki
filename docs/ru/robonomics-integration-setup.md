---
title: Robonomics integration setup

contributors: [LoSk-p, nakata5321]
translated: false
---

After finishing with [IOT subscription](/docs/sub-activate/) it's time to install **Robonomics integration**. This integration allows Home Assistant to record datalogs with encrypted data from Home Assistant to Robonomics Parachain and listen launch commands from this Parachain to control smart devices. Integration use IPFS to store data and send IPFS hashes to  datalog or launch.

## Configure

Now you can add integration to Home Assistant. In web interface go to `Settings/Device & Services` and press `Add Integration`. Find there `Robonomics`:

<robo-wiki-picture src="home-assistant/add-integration.jpg" />

Click on it and fill the configuration. Here you need to add seed from `SUB_CONTROLLER` and public address of `SUB_OWNER` accounts (which you previously created).
Also, you can set sending interval, by default it is 10 minutes.

Moreover, you can add your Pinata credentials. It is not necessary, if you will not do it, data will be pinned with your local node and Infura.If you add the credentials files will also be pinned on Pinata to help them spread wider over IPFS.

<robo-wiki-picture src="home-assistant/config.jpg" />

 Fill in everything and press `Submit`. If is, you will see **Success** window. Close it.

Congratulations! You fully set up and configurate Home Assistant with robonomics integration. Now go to "Use" chapter to start
working with your upgraded smart home.