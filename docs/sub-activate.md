---
title: Subscription Activate
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Dapp Robonomics Network 
    https://github.com/airalab/dapp.robonomics.network
---

In this article you will create Robonomics parachain accounts and buy IoT subscription. 

To control Home Assistant with Robonomics, you need 2 accounts on the Robonomics parachain. For one of the accounts (`SUB_OWNER`), you will buy a Robonomics subscription. Second account (`SUB_CONTROLLER`) will control all Home Assistant processes (such as telemetry) and will give access to other users. These accounts will provide security for your Home Assistant. 

Both accounts must be created with **ed25519** encryption. 

## Create Owner and Controller Accounts

Go to [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) on Polkadot / Substrate Portal. **Check the top left corner to ensure that you are connected to Robonomics Parachain.**

Go to `Accounts` -> `Accounts` and press `Add account` button. 

<robo-wiki-picture src="home-assistant/add-account.jpg" />

You should see the following popup menu with account seed:

<robo-wiki-picture src="home-assistant/mnemonic.jpg" />

It has two forms: *Mnemonic* (human-readable) and *Raw* (a sequence of digits and letters). Save the mnemonic seed phrase securely and press `Next`.

<robo-wiki-note type="warning">

Open `Advanced creation options`, change the crypto type of creating account to `Edwards - ed25519` and press `Next`.

</robo-wiki-note>

<robo-wiki-picture src="home-assistant/edw.jpg" />

In the next menu, you need to set the account name and password. Give it a name SUB_OWNER for convenience.

<robo-wiki-picture src="home-assistant/name.jpg" />

Clicking on the `Next` button will take you to the last window. Click `Save` to finish account creation. It will also generate a backup JSON-files that you should safely store. You can later use this file to recover your account if you remember the password.

<robo-wiki-picture src="home-assistant/done.jpg" />

<robo-wiki-note type="note">

Repeat these steps for an account with the name `SUB_CONTROLLER`.

</robo-wiki-note>

## Add Accounts to Polkadot.js

For convenience, you should use the [Polkadot.js extension](https://polkadot.js.org/extension/) and add these newly created accounts to it. For an ed25519 account you can do that only with a backup JSON file. You can use the files saved when you created the accounts.

You can get these files again by creating a backup file of the account. Press on three dots on your account, choose `Create a backup file for this account` and type in your password.

<robo-wiki-picture src="creating-an-account/backup-file.jpg" />

Open an extension and press `+` button on the top right, then choose `Restore account from backup JSON file`.

<robo-wiki-picture src="creating-an-account/extention-add-backup.jpg" />

In an opened window upload the JSON file, enter the password and press `Restore`.

<robo-wiki-picture src="creating-an-account/file-backup.jpg" />

## Activate Robonomics Subscription 

<robo-wiki-note type="okay">

For this step, you must have a sufficient amount of XRT tokens (minimum 2-3 XRTs) in your `SUB_OWNER` account.

</robo-wiki-note>

Go to Robonomics dapp to the [subscription page](https://dapp.robonomics.network/#/subscription) and press connect account on the right sidebar.

<robo-wiki-picture src="home-assistant/dapp.jpg" />

In the following popup menu connect Polkadot.js extension. You will see your account address with balance.

<robo-wiki-picture src="home-assistant/connect.jpg" />

Before purchasing, check that you chose the `SUB_OWNER` account. Press the address profile icon, you should see the `SUB_OWNER` account under the `Check owner account` field.

<robo-wiki-picture src="home-assistant/check.jpg" />

Finally, press the `SUBMIT` button and enter the password for your account. After that wait until the activation process is completed. You will see the state of your subscription after a while.

<robo-wiki-picture src="home-assistant/subscription.jpg" />

## Add Accounts to Subscription

You need to add a `SUB_CONTROLLER` account to the **access list**. Open extension and click on the icon near the account name. It will copy the account address.

<robo-wiki-picture src="home-assistant/sub-admin.jpg" />

Paste this address to the `Robonomics parachain address` field in the **Manage access** part.

<robo-wiki-picture src="home-assistant/access.jpg" />

Give it a name and press the `+` button. Enter your `SUB_OWNER` password in the popup window and wait until the activation process is completed.

<robo-wiki-note type="note">

Repeat these steps for `SUB_OWNER` account.

</robo-wiki-note>

After that, go to the article ["Robonomics Integration Setup"](/docs/robonomics-integration-setup/) article.