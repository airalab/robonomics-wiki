---
title: Subscription Activate
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

In this article you will create Robonomics parachain accounts and buy IoT subscription. 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


To control Home Assistant with Robonomics, you need 2 accounts on the Robonomics parachain. For one of the accounts (`sub_owner`), you will buy a Robonomics subscription. Second account (`sub_controller`) will control all Home Assistant processes (such as telemetry) and will give access to other users. These accounts will provide security for your Home Assistant. 

<robo-wiki-note type="warning" title="WARNING">

Both accounts must be created with **ed25519** encryption. Because of this, you need to create an account using the Polkadot-JS UI and select the required encryption. 

This feature is disabled by default on the Polkadot-JS UI. To enable it, navigate to `Settings` -> `General` -> `account options` and select `Allow local in-browser account storage` in the drop-down menu `in-browser account creation`.

</robo-wiki-note>

## Create Owner and Controller Accounts

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmQiJYPYajUJXENX2PzSJMSKGSshyWyPNqugSYxP5eCNvm', type:'mp4'}]" />

1. Go to [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) on Polkadot / Substrate Portal. **Check the top left corner to ensure that you are connected to Robonomics Parachain.**

2. Go to `Accounts` -> `Accounts` and press `Add account` button. You will see the popup menu with account seed. It has two forms: *Mnemonic* (human-readable) and *Raw* (a sequence of digits and letters). 

3. Open `Advanced creation options`, change the crypto type of creating account to `Edwards - ed25519` and press `Next`.


4. Save the mnemonic seed phrase securely and press `Next`.

5. In the next menu, you need to set the account name and password. Give it a name `sub_owner` for convenience. Press `Next`.

6. On the last window click `Save` to finish account creation. It will also generate a backup JSON-files that you should safely store. You can later use this file to recover your account if you remember the password.

7. Repeat these steps for an account with the name `sub_controller`.


## Add Accounts to Polkadot.js

For convenience, you should use the [Polkadot.js extension](https://polkadot.js.org/extension/) and add these newly created accounts to it. For an ed25519 account you can do that only with a backup JSON file. You can use the files saved when you created the accounts.

You can get these files again by creating a backup file of the account. Press on three dots on your account, choose `Create a backup file for this account` and type in your password.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmRd7gztUjWkLF4W2XuJwy5aXBwzNV2aPCU6CQQLvUpSNj', type:'mp4'}]" />

1. Open an extension and press `+` button on the top right, then choose `Restore account from backup JSON file`.

2. In an opened window upload the JSON file, enter the password and press `Restore`.

3. Make sure the Robonomics network is selected for accounts in the Polkadot.js extension. On on Polkadot / Substrate Portal go to `Setting` -> `Metadata` and click on the `Update metadata` button. 

4. Confirm the metadata update in the popup. Now the extension will show the label of the network for which the address is used.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmT5sTNP9t8gpbD4RJJw6ETwG4wiziiChAh2uHHBk9Zsyd', type:'mp4'}]" />

## Activate Robonomics Subscription 

<robo-wiki-note type="okay">

For this step, you must have a sufficient amount of XRT tokens (minimum 2-3 XRTs) in your `sub_owner` account.

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmXrFCajmJgkRDSbshGD3QehjnoyS6jafEPSjHdYkoBHum', type:'mp4'}]" />

1. Go to Robonomics dapp to the [subscription page](https://dapp.robonomics.network/#/subscription) and press connect account on the right sidebar.

2. In the following popup menu connect Polkadot.js extension. You will see your account address with balance.

3. Before purchasing, check that you chose the `sub_owner` account. Press the address profile icon, you should see the `sub_owner` account under the `Check owner account` field.

4. Finally, press the `SUBMIT` button and enter the password for your account. After that wait until the activation process is completed. You will see the state of your subscription after a while.


## Add Accounts to Subscription

Now you need to add a `sub_controller` account to the **access list**. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmV1gkwtcXsWv54ov9tuXfcHg7nqs1foM8cRwts4sqnqtX', type:'mp4'}]" />

1. Open extension and click on the icon near the account name. It will copy the account address.


2. Paste this address to the `Robonomics parachain address` field in the **Manage access** part. Give it a name and press the `+` button. 

3. Repeat steps 1 and 2 for `sub_owner` account.

3. Press `Save`. Enter your `sub_owner` password in the popup window and wait until the activation process is completed.
