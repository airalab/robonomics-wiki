---
title: IOT subscription setup
contributors: [nakata5321]
translated: true
---

After setting up [Zigbee2MQTT stick](/docs/zigbee2-mqtt/), It is time to create Robonomics Parachain accounts and buy subscription. 

To control Home Assistant with Robonomics, You will need 2 accounts in Robonomics parachain. 
To the one of accounts you will buy the Robonomics subscription. Let's call it `SUB_OWNER`. 
Second account  will manage all Home Assistant processes such as telemetry and give access to other users. 
Let's call it `SUB_ADMIN`. This accounts will provide security of your Home Assistant.

Other important thing is that both accounts must be created with ***ed25519*** encryption. How to create accounts and buy robonomics subscription see below. 

## Create Owner and Controller accounts

First, let's create A Robonomics account.

Go to [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) on Polkadot / Substrate Portal. **Check the top left corner to ensure that you are connected to Robonomics Parachain**.  

Go to **Accounts -> Accounts** and press `Add account` button. 

<robo-wiki-picture src="home-assistant/add-account.jpg" />

You should see the following popup menu with account seed. 

<robo-wiki-picture src="home-assistant/mnemonic.jpg" />

It has two forms: *Mnemonic* (human-readable) and *Raw* (a sequence of digits and letters). Save the mnemonic seed phrase securely and press `Next`.

<robo-wiki-note type="warning">
Then open `Advanced creation options` and change the crypto type of creating account to `Edwards - ed25519`.
</robo-wiki-note>

<robo-wiki-picture src="home-assistant/edw.jpg" />

In the next menu, you need to set the account name and password, similar to the extension instructions described above. give it a name - `sub_owner`.

<robo-wiki-picture src="home-assistant/name.jpg" />

Clicking on the `Next` button will take you to the last window. Click `Save` to finish account creation. It will also generate a backup JSON-files that you should safely store. You can later use this file to recover your account if you remember the password.

<robo-wiki-picture src="home-assistant/done.jpg" />

<robo-wiki-note type="note">The same way create account with name `sub_admin` </robo-wiki-note>

## Add accounts to extension

You need to add created account to [Polkadot.js extension](https://polkadot.js.org/extension/) (for ed25519 account you can do that only with backup JSON file). 
For that you need to create backup file of the account(or use a file saved when created the account). Press on three dots on your account and choose `Create a backup file for this account` and type in your password.

![Backup file](../images/creating-an-account/backup-file.jpg)

Then open an extension and press `+` button on the top right, then choose `Restore account from backup JSON file`.

![Restore backup in extension](../images/creating-an-account/extention-add-backup.jpg)

In an opened window upload the JSON file, enter the password and press `Restore`.

![Restore backup in extension 2](../images/creating-an-account/file-backup.jpg)

## Buy Robonomics subscription 

Now it's time to buy a subscription. 

<robo-wiki-note type="okay"> To buy subscription you should have XRT on `SUB_OWNER` account. </robo-wiki-note>

Go to our DaPP to subscription [page](https://dapp.robonomics.network/#/subscription) and press `add account` at right sidebar.

<robo-wiki-picture src="home-assistant/dapp.jpg" />

In the following popup menu connect `Polkadot{.js}` extension. Now you will see your account address with balance:

<robo-wiki-picture src="home-assistant/connect.jpg" />

**Let's buy a subscription!** 

<robo-wiki-note type="warning">First, check which address connected to dapp.</robo-wiki-note>

For this press address profile icon:

<robo-wiki-picture src="home-assistant/check.jpg" />

Under `Check owner account` field should be `SUB_owner`.
   


Press `submit` button and enter `password` for your account. After that wait until activation process is completed.
You will see state of your subscription:

<robo-wiki-picture src="home-assistant/subscription.jpg" />

## Add accounts to subscription

Add `SUB_ADMIN` account to **access list**. For this open extension and click on icon near account name. It will copy account address.

<robo-wiki-picture src="home-assistant/sub-admin.jpg" />

and parse this address to `Robonomics parachain address` in **Manage access** part:

<robo-wiki-picture src="home-assistant/access.jpg" />

Give it a name and press "+" button. Enter your `SUB_OWNER` password in popup window and wait activation process is completed. 

<robo-wiki-note type="okay">Do the same thing for `SUB_OWNER` account.</robo-wiki-note>

That's all. Now got to the next article ["Robonomics integration setup"](/docs/add-smart-device-to-robonomics/)