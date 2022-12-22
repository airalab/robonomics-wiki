---
title: Robonomics integration setup

contributors: [LoSk-p, nakata5321, Fingerling42]
---

**In this article, you will add Robonomics to Home Assistant. This allows Home Assistant to record datalogs with encrypted data to Robonomics Parachain and listen for launch commands from the parachain to control smart devices. Integration uses IPFS to store data and send IPFS hashes to datalog or launch functions.**

<robo-wiki-picture src="home-assistant/integration-setup.png" />

In the web interface of Home Assistant go to `Settings` -> `Device & Services` and press `ADD INTEGRATION`. Search for `Robonomics`.

<robo-wiki-picture src="home-assistant/add-integration.jpg" />

Click on Robonomics and fill in the configuration: 

- Add seed from the `SUB_CONTROLLER` account to controller account seed.
- Add the public address of the `SUB_OWNER` account to the subscription owner address.
- Set the interval of data sending (by default it is 10 minutes).
- (Optional) You can add credentials for pinning service Pinata to spread your data wider over the IPFS network.

<robo-wiki-picture src="home-assistant/config.jpg" />

Press `SUBMIT` after finishing the configuration. If you filled in everything correctly, you will see the success window.

Congratulations! You have fully installed and configured Home Assistant with Robonomics integration. Now go to [**"Use"**](/docs/global-administration) section to start working with your upgraded smart home.