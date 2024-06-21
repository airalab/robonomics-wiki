---
title: Subscription Activate
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/robonomics.app
---

In this article, you will create Robonomics parachain accounts and buy an IoT subscription. 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


To control Home Assistant with Robonomics, you need 2 accounts on the Robonomics parachain. For one of the accounts (`OWNER`), you will buy a Robonomics subscription. The second account (`CONTROLLER`) will control all Home Assistant processes (such as telemetry) and will give access to other users. These accounts will provide security for your Home Assistant. 

<robo-wiki-note type="warning" title="WARNING">

Both accounts must be created with **ed25519** encryption. Therefore, you need to create an account using the Polkadot-JS UI and select the required encryption. 

This feature is disabled by default in the Polkadot-JS UI. To enable it, navigate to `Settings` -> `General` -> `account options` and select `Allow local in-browser account storage` in the drop-down menu under `in-browser account creation`.

</robo-wiki-note>

## Create Owner and Controller Accounts

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmajeEV4adqR2DCaBJPZhH6NR74eHaRmvCcbeQtnLm7Kcc', type:'mp4'}]" />

1. Go to [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) on the Polkadot / Substrate Portal. **Check the top left corner to ensure that you are connected to Robonomics Parachain.**

2. Go to `Accounts` -> `Accounts` and press the `Add account` button. You will see the popup menu with account seed. It has two forms: *Mnemonic* (human-readable) and *Raw* (a sequence of digits and letters). 

3. Open `Advanced creation options`, change the crypto type of the account being created to `Edwards - ed25519` and press `Next`.

4. Save the mnemonic seed phrase securely and press `Next`.

5. In the next menu, you need to set the account name and password. For convenience, name it  `OWNER`. Press `Next`.

6. In the final window, click `Save` to complete the account creation. This will also generate a backup JSON-files that you should store safely. You can later use this file to recover your account if you remember the password.

7. Repeat these steps to create an account with the name `CONTROLLER`.


## Add Accounts to Polkadot.js

For convenience, you should use the [Polkadot.js extension](https://polkadot.js.org/extension/) and add these newly created accounts to it. For an ed25519 account, you can do that only with a backup JSON file. You can use the files saved when you created the accounts.

You can get these files again by creating a backup file of the account. Click on the three dots next to your account, choose `Create a backup file for this account` and type in your password.

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmc5LcbLSdVCUubLomUUo5Qxrxb2xaixpwUFqnpj2C9iM5', type:'mp4'}]" />

1. Open the extension and press the `+` button in the top right, then choose `Restore account from backup JSON file`.

2. In the opened window, upload the JSON file, enter the password, and press `Restore`.

3. Make sure the Robonomics network is selected for accounts in the Polkadot.js extension. On on Polkadot / Substrate Portal go to `Settings` -> `Metadata` and click the `Update metadata` button. 

4. Confirm the metadata update in the popup. The extension will now show the label of the network for which the address is used.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmXVhu17Qkx8VkAAVfm5mUBzSTq1BvaAF7MNdXLgZSvZcR', type:'mp4'}]" />

## Activate Robonomics Subscription 

<robo-wiki-note type="okay">

For this step, you must have a sufficient amount of XRT tokens (minimum of 2-3 XRT) in your `OWNER` account.

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type:'mp4'}]" />

1. Go to the Robonomics dApp and navigate to the [subscription page](https://robonomics.app/#/rws-buy). Then, click on `Connect Account` on the right sidebar.

2. In the following popup menu, connect the Polkadot.js extension. You will see your account address along with its balance.

3. Before purchasing, ensure that you have selected the `OWNER` account. Click on the address profile icon, and you should see the `OWNER` account.

4. Finally, click the `BUY SUBSCRIPTION` button and enter the password for your account. Wait until the activation process is completed. You will see the state of your subscription after a while.

## Setup your Subscription

Now you need to setup you subscription by adding the `CONTROLLER` account to it.

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmd5P356UE1yDLAd4uSdq1dERbyp5gk5wpWD3iENNt2mjV', type:'mp4'}]" />

1. Go to the Robonomics dApp and navigate to the [setup a subscription page](https://robonomics.app/#/rws-setup). Navigate to the **GENERAL SETTINGS** section.

2. Remove the seed phrase from the `Controller's seed phrase` field and enter the `CONTROLLER` account seed phrase into.

3. Copy the `CONTROLLER` address: open the extension and click on the icon next to the account name.

4. Paste this address into the `Controller` field and click the `SAVE` button.

## Add Accounts to Subscription

Now, you need to add your `CONTROLLER` account to the **access list**. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type:'mp4'}]" />

1. Go to the Robonomics dApp and navigate to the [setup a subscription page](https://robonomics.app/#/rws-setup). Ensure that you have selected the correct subscription and the `OWNER` account.

2. Copy the `CONTROLLER` address: open the extension and click on the icon next to the account name.

3. Paste this address into the `Polkadot address` field in the **USERS IN SUBSCRIPTION** section and click the `+` button. 

4. Enter the password for your `OWNER` account in the popup window, then wait for the activation process to be completed.
