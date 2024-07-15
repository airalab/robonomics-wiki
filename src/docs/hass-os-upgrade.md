---

title: Upgrade Your Home Assistant OS
contributors: [LoSk-p]
tools:
  - Home Assistant OS 12.1 for RaspPi
    https://github.com/home-assistant/operating-system
  - Home Assistant Core 2024.5.1
    https://github.com/home-assistant/core
  - HACS 1.34.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.3.2
    https://github.com/PinoutLTD/ipfs-addon
  - Libp2p <-> WS Proxy Add-on 0.0.1
    https://github.com/PinoutLTD/addon-libp2p-ws-proxy

---

**This article contains instructions to upgrade your existing Home Assistant OS with Robonomics integration.**


{% roboWikiPicture {src:"docs/home-assistant/homeassistant_os.png", alt:"homeassistant_os"} %}{% endroboWikiPicture %}

## Install HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) allows you to install custom integrations.

{% roboWikiVideo {videos:[{src: 'mYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Before start, you need to install add-on for connecting to the Home Assistant device with SSH. In Add-on Store search `ssh`. We recommend to install `SSH & Web Terminal` add-on.

{% roboWikiNote {title:"Warning", type: "warning"}%} If the SSH addon is not found, try enabling Advanced Mode in your user profile settings. To do this, click on the profile icon in the lower left corner, and find the Advanced Mode option.{% endroboWikiNote %}

2. Choose the add-on and press `INSTALL`. After installation is finished, go to `Configuration` tab and add `password` or `authorized_keys`. Don't forget to save this part of configuration.

3. In the `Info` tab press `START`. If you want to see the addon in the sidebar, don't forget to enable `Show in sidebar`.

{% roboWikiVideo {videos:[{src: 'QmYfLWdLH3jTU2uQhr1pzZFsjUNSZ8wtbtEsCdpvmyn4YH', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

4. Open SSH Add-on and run the following command:

{% codeHelper { additionalLine: "Home Assistant Command Line", copy: true}%}

```bash
wget -O - https://get.hacs.xyz | bash -
```

{% endcodeHelper %}

5. Restart Home Assistant (you can do it in `Settings`->`System`).

6. Now HACS Integration will be available to add in the `Integrations` menu. Go to `Settings`->`Devices & Services`, press `Add Integration` and find HACS.

{% roboWikiNote {title:"Warning", type: "warning"}%} To use HACS you need a Github Account.{% endroboWikiNote %}

7. Click on it and follow the installation instructions.

## Install IPFS Daemon and Libp2p - WS Proxy Add-Ons

Robonomics Integration stores the data using local IPFS daemon and also use Libp2p for remote control, so you need to install it first. You can add the Robonomics Add-Ons repository using this button

[![Open your Home Assistant instance and show the add add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPinoutLTD%2Frobonomics-addons)

Or manually using the following steps:

{% roboWikiVideo {videos:[{src: 'QmZgXme4HSrBwDKekBEy5svpQNVWywrvmN7Zthfa27Gu2H', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. There is an [Robonomics Addons Repository](https://github.com/PinoutLTD/robonomics-addons). To install it go to `Settings` -> `Add-Ons` and press the `ADD-ON STORE` button in the lower right corner.

2. Press on three dots in the upper right corner and choose `Repositories`. Add there the following link:

{% codeHelper { copy: true}%}

```
https://github.com/PinoutLTD/robonomics-addons
```

{% endcodeHelper %}

3. Press `ADD` button.

4. Close the repository manager and refresh the page. Now in the end of the page you can see Robonomics Add-Ons.

Now you can install both addons. Open them and press `INSTALL`. After installation press `START`.

## Install Robonomics Integration

Now you can install Robonomics Integration using HACS.

{% roboWikiVideo {videos:[{src: 'QmSsCYxp7xJ22RZEx3FtJBFfGASu1t4rmqhf78xasnMwt4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Open HACS from the sidebar menu and search for `Robonomics`. Then click on the `Download` button located in the lower right corner. Once the download is complete, restart Home Assistant.