---
title: Upgrade Your Home Assistant OS
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 9.3
    https://github.com/home-assistant/operating-system/releases
  - Home Assistant 2022.11.4
    https://github.com/home-assistant/core
  - Robonomics integration 1.1.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.17.0
    https://docs.ipfs.tech/
---

**This article contains instructions to upgrade your existing Home Assistant OS with Robonomics integration.**

## Install IPFS Add-on

<robo-wiki-note type="okay">

  Robonomics Integration stores the data using local IPFS daemon, so you need to install it first. There is an [IPFS Add-on for Home Assistant](https://github.com/LoSk-p/ipfs-addon).

</robo-wiki-note>

To install it go to `Settings/Add-ons` and press `Add-on Store` button in the lower right corner.

<robo-wiki-picture src="home-assistant/add-ons.jpg" />


Then press on three dots in the upper right corner and choose `Repositories`. Add there the following link:

```
https://github.com/airalab/ipfs-addon
```
Then press `Add` button:

<robo-wiki-picture src="home-assistant/add-addon-repo.jpg" />

Close the repository manager and refresh the page. Now in the end of the page you can see IPFS Daemon Add-on:

<robo-wiki-picture src="home-assistant/added-addon.jpg" />

Open it and press `Instlall`. After it installed press `Run`:

<robo-wiki-picture src="home-assistant/ipfs-addon-running.jpg" />

## HACS Installation

[Home Assistant Community Store (HACS)](https://hacs.xyz/) allows you to install custom integrations.

Firstly, you need to install add-on that allows you to connect to the Home Assistant device with SSH. In Add-on Store search `ssh`. We recommend to install `SSH & Web Terminal` add-on.

<robo-wiki-picture src="home-assistant/ssh-addons.jpg" />

Choose the add-on and press `Install`. After installation is finished, go to `Configuration` tab and add `password` or `authorized_keys`. Don't forget to save this part of configuration.

<robo-wiki-picture src="home-assistant/ssh-configuration.jpg" />

After that in the `Info` tab press `Start`. If you want to see the addon in the sidebar, don't forget to enable `Show in sidebar`:

<robo-wiki-picture src="home-assistant/ssh-addon-running.jpg" />

Open SSH Add-on and run the following command:

```bash
wget -O - https://get.hacs.xyz | bash -
```

<robo-wiki-picture src="home-assistant/ssh-install-hacs.jpg" />

After that restart Home Assistant (you can do it in `Settings/System`). Now HACS Integration will be available to add in Integrations. Go to `Settings/Devices & Services` and press `Add Integration`, then find HACS:

<robo-wiki-picture src="home-assistant/hacs-integration.jpg" />

Press on it and follow the installation instructions. 

<robo-wiki-note type="warning" title="DISCLAIMER">
  To use HACS you need a Github Account.
</robo-wiki-note>

## Robonomics Integration Installation

Now you can install Robonomics Integration using HACS.

Open HACS and go to `Integrations`. Press on three dots in the upper right corner and choose `Custop Repositories`. In the opened window paste the following link:

```
https://github.com/airalab/homeassistant-robonomics-integration
```

And choose `Integration` category.

<robo-wiki-picture src="home-assistant/hacs-robonomics.jpg" />

Press `Add` and you will see Robonomics in HACS Integrations. Press on it and run `Download` in the lower right corner. After downloading restart Home Assistant.

<robo-wiki-picture src="home-assistant/robonomics-download.jpg" />

Now you have two options:

- If you have not yet used MQTT integration to connect smart devices via Zigbee adapter, go to the [**MQTT Setup**](/docs/mqtt-setup/) article.
- Otherwise, go to the [**IoT Subscription**](/docs/sub-activate) section and start activating the Robonomics subscription.