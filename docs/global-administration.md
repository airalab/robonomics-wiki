---
title: Global Administration

contributors: [nakata5321, Fingerling42]
translated: true
---

**This article will show you how to set up a new user to your Home Assistant.**

## Adding Users to Subscription

You cannot use previously created accounts because `SUB_OWNER` and `SUB_CONTROLLER` provide security, and the first user you created when you first started Home Assistant does not have a Robonomics Parachain account.

1. Create an account on Robonomics parachain, as you did in the [previous article](/docs/sub-activate/).

2. Using `SUB_OWNER` account add new user account to the subscription in the [dapp](https://dapp.robonomics.network/#/subscription/devices). Now there should be three addresses in the access list: `SUB_OWNER`, `SUB_CONTROLLER` and `USER`.

<robo-wiki-youtube loop autoplay link="https://www.youtube.com/watch?v=_nxc6bMJPD0" />


## Granting Access to User

1. Go to the dapp service called [Home Assistant Account](https://dapp.robonomics.network/#/home-assistant). Choose the account you've just created at the right sidebar (check that you have chosen the intended account by pressing the profile icon).

2. Enter the `USER` seed in the required field. Add `SUB_OWNER` and `SUB_CONTROLLER` addresses in the administrator credits fields. If everything is correct, you will see verification status `VERIFIED`.

3. Create a password for a new user which you have just registered and then confirm the transaction, that will now be without fee due to the subscription. Later you can restore the password in the Restore tab.

4. After the registration process, log in to Home Assistant with your user address as login and a newly-created password.

<robo-wiki-youtube autoplay link="https://youtu.be/5s4-S_z4VYE" />

Now you can use the dapp to control your home through Robonomics, check [**"Get Smart Home Telemetry"**](/docs/smart-home-telemetry/) article.

## Creating Home Assistant Configuration's Backup

Creating a backup allows you to easily restore your Home Assistant configuration in the event of a failure.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.art/ipfs/QmYg8pHNMYfA5Pz31f34qmJY84Ek54mm8k9zVZ7Qvp1B9m', type:'mp4'}]" />

<robo-wiki-note type="warning" title="WARNING">
In order to restore your configuration, it is necessary to use a custom IPFS gateway such as Pinata. Without it, your backup will be stored solely on your local IPFS node, which may prevent you from restoring your Home Assistant configuration in the event of a local node failure.
</robo-wiki-note>

1. In the web interface of Home Assistant go to `Developer Tools` -> `Services`. Search for `Robonomics: Save Backup to Robonomics` and press `CALL SERVICE`.

2. Wait until you see the notification `Backup was updated in Robonomics` appear in `Notification`.

## Restoring Home Assistant Configuration from Backup

In order to restore your configuration, you will need to install Home Assistant and Robonomics Integration.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.art/ipfs/QmS6DrWW9YUxwTozLJ5SzKqnyBJLHJcx8X9nFnESEdgY1i', type:'mp4'}]" />

1. Install [Home Assisntant with Robonomics](https://wiki.robonomics.network/docs/robonomics-smart-home-overview#how-to-install-home-assistant-with-robonomics) and confgire it, following the steps from the article.

2.  [Set up Robonomics Integration](https://wiki.robonomics.network/docs/robonomics-hass-integration) using the same seeds you used previously. If you subscription has been finished, [activate it](https://wiki.robonomics.network/docs/sub-activate).

3. In the web interface of Home Assistant go to `Developer Tools` -> `Services`. Search for `Robonomics: Restore from the Backup in Robonomics` and press `CALL SERVICE`. Navigate to the `Overview` page, to check the status of your backup, .

4. Once Home Assistant has finished restarting, your configuration will be restored. If the status changes to `restored` but Home Assistant does not automatically restart, you need to manually restart it by navigating to `Settings` > `System` and clicking on the `RESTART` button in the upper right corner.