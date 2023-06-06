---
title: Backup Services

contributors: [tubleronchik]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In this article, you will learn how to generate backups of your Home Assistant configuration and restore it when needed. To create backups, a service is called that generates a secure archive with configuration files. This service then adds the archive to IPFS and stores the resulting CID in Robonomics Digital Twin.**
## Creating Home Assistant Configuration's Backup

Creating a backup allows you to easily restore your Home Assistant configuration in the event of a failure.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmVo91dLaAYgFDM1vrL2PYfAffM6SGGC59ZERbfHR44tqW', type:'mp4'}]" />

<robo-wiki-note type="warning" title="WARNING">
In order to restore your configuration, it is necessary to use a custom IPFS gateway such as Pinata. Without it, your backup will be stored solely on your local IPFS node, which may prevent you from restoring your Home Assistant configuration in the event of a local node failure.
</robo-wiki-note>

1. In the web interface of Home Assistant go to `Developer Tools` -> `Services`. Search for `Robonomics: Save Backup to Robonomics` and press `CALL SERVICE`.

2. Wait until you see the notification `Backup was updated in Robonomics` appear in `Notification`.

## Restoring Home Assistant Configuration from Backup

In order to restore your configuration, you will need to install Home Assistant and Robonomics Integration.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmWmnmkXUcPXsAnQzwN3UEuki2GMYnQDx3vhgjEypCU8aR', type:'mp4'}]" />

1. Install [Home Assisntant with Robonomics](https://wiki.robonomics.network/docs/robonomics-smart-home-overview#how-to-install-home-assistant-with-robonomics) and confgire it, following the steps from the article.

2.  [Set up Robonomics Integration](https://wiki.robonomics.network/docs/robonomics-hass-integration) using the same seeds you used previously. If you subscription has been finished, [activate it](https://wiki.robonomics.network/docs/sub-activate).

3. In the web interface of Home Assistant go to `Developer Tools` -> `Services`. Search for `Robonomics: Restore from the Backup in Robonomics` and press `CALL SERVICE`. Navigate to the `Overview` page, to check the status of your backup, .

4. Once Home Assistant has finished restarting, your configuration will be restored. If the status changes to `restored` but Home Assistant does not automatically restart, you need to manually restart it by navigating to `Settings` > `System` and clicking on the `RESTART` button in the upper right corner.
