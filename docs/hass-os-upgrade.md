---
title: Upgrade Your Home Assistant OS
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.31.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.4.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**This article contains instructions to upgrade your existing Home Assistant OS with Robonomics integration.**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## Install IPFS Add-on


Robonomics Integration stores the data using local IPFS daemon, so you need to install it first. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. There is an [IPFS Add-on for Home Assistant](https://github.com/airalab/ipfs-addon). To install it go to `Settings` -> `Add-ons` and press the `ADD-ON STORE` button in the lower right corner.

2. Press on three dots in the upper right corner and choose `Repositories`. Add there the following link:

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. Press `ADD` button.

4. Close the repository manager and refresh the page. Now in the end of the page you can see IPFS Daemon Add-on.

5. Open the addon and press `INSTALL`. After installation press `START`.

## Install HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) allows you to install custom integrations.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. Before start, you need to install add-on for connecting to the Home Assistant device with SSH. In Add-on Store search `ssh`. We recommend to install `SSH & Web Terminal` add-on.

<robo-wiki-note type="warning" title="Warning">

  If the SSH addon is not found, try enabling Advanced Mode in your user profile settings. To do this, click on the profile icon in the lower left corner, and find the Advanced Mode option.

</robo-wiki-note>

2. Choose the add-on and press `INSTALL`. After installation is finished, go to `Configuration` tab and add `password` or `authorized_keys`. Don't forget to save this part of configuration.

3. In the `Info` tab press `START`. If you want to see the addon in the sidebar, don't forget to enable `Show in sidebar`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. Open SSH Add-on and run the following command:

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. Restart Home Assistant (you can do it in `Settings`->`System`). 

6. Now HACS Integration will be available to add in the `Integrations` menu. Go to `Settings`->`Devices & Services`, press `Add Integration` and find HACS.

<robo-wiki-note type="warning" title="Warning">

  To use HACS you need a Github Account.

</robo-wiki-note>

7. Click on it and follow the installation instructions. 

## Install Robonomics Integration

Now you can install Robonomics Integration using HACS.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.live/ipfs/QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

Open HACS from the sidebar menu and navigate to `Integrations`. Click on `Explore & Download Repositories`, then search for `Robonomics` and click on the `Download` button located in the lower right corner. Once the download is complete, restart Home Assistant.