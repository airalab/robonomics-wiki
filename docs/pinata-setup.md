---
title: Pinata Setup

contributors: [tubleronchik, LoSk-p]
tools:   
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**This article guides you through the process of configuring [Pinata](https://www.pinata.cloud/) for pinning files from Robonomics integration. This improves the accessibility of backup and telemetry files.**

To be able to pin your files on Pinata, first you need to create an account. Then, navigare to the `API Keys` section and create a new key with the following permissions:

1. `pinFileToIPFS`
2. `unpin`

<robo-wiki-picture src="home-assistant/pinata-permissions.jpg"/>

Then, copy `API Key` and `API Secret` and keep it private.

<robo-wiki-picture src="home-assistant/pinata-key.jpg"/>

If you have already set up the Robonomics integration, navigate to `Settings` -> `Devices & Services` and press `configure` in Robonomics integration. Enter you Pinata credentials. 

<robo-wiki-picture src="home-assistant/robonomics-reconfigure-pinata.jpg"/>
