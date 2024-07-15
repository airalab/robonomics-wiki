---
title: Create Account for Robonomics Parachain

contributors: [PaTara43, Fingerling42]
---

**In order to interact and operate with Robonomics Parachain, developers and users need to create an account on the Polkadot / Substrate Portal. The account performs basic functions for the network: your public network address(the public key), the access control to the address and funds (the private key), sending transactions to the network, showing your tokens and their amount, etc. Below are two main ways to create an account for Robonomics Parachain.**

## 1. Using Polkadot{.js} Browser Extension

The Polkadot Extension provides a mechanism to generate the account and interact with all Polkadot / Kusama projects including Robonomics Parachain. This is not the safest way to manage your account, but it is the most convenient in terms of security / usability balance.

## 1.1. Install Browser Extension

The browser extension is available for [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) and [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (plus Chromium-based browsers).

{% roboWikiPicture {src:"docs/creating-an-account/1.1-polkadot-extension.png", alt:"Browser Extension"} %}{% endroboWikiPicture %}

## 1.2. Open Robonomics Parachain App

Go to [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) on Polkadot / Substrate Portal. If this is the first time you entered the portal, it will request access to the browser extension, so allow access.

Once you've opened the app, take a look at the top left corner. The name of the network, its icon and the number of the last block are displayed there. Clicking on this area will open a list of all Polkadot / Kusama networks, including test networks and local nodes. You can switch between networks by selecting the required one and pressing the `Switch` button. **Make sure you are connected to Robonomics Parachain now**.

{% roboWikiPicture {src:"docs/creating-an-account/1.2-robonomics-app.png", alt:"Robonomics Parachain app"} %}{% endroboWikiPicture %}

## 1.3. Update Extension Metadata and In-Browser Account Creation

It is very likely that the app will ask you to update the metadata for the extension to display the correct information about the chain you are connected to. Go to **Settings -> Metadata**, press `Update metadata` button and then, in the pop-up window, allow the extension to do it.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-metadata-update.png", alt:"Updating metadata"} %}{% endroboWikiPicture %}

By default, the web application only works with external accounts. To allow creating new accounts directly in the browser go to **Settings -> General -> Account options -> in-browser account creation**, choose `Allow local in-browser account storage` and press `Save` button.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-in-browser-account-creation.png", alt:"Updating account creation in Browser"} %}{% endroboWikiPicture %}

## 1.4. Create Account in Extension

Open the Polkadot{.js} browser extension. Click the big plus button or select `Create new account` from the small plus icon in the top right. You should see the following menu, with generated mnemonic seed in the form of twelve words and the address.

{% roboWikiPicture {src:"docs/creating-an-account/1.4-create-account-step-1.png", alt:"Account creation, step one"} %}{% endroboWikiPicture %}

The seed is your key to the account. Knowing the seed allows you (or anyone else who knows the seed) to get control on this account and even re-create it, if you forget the password. **It's very important to store it somewhere securely**, preferably on paper or other non-digital device, not in digital storage or on a computer.

Save the seed and press `Next step`. You should see the following menu.

{% roboWikiPicture {src:"docs/creating-an-account/1.5-create-account-step-2.png", alt:"Account creation, step two"} %}{% endroboWikiPicture %}


- *Network* allows you to choose which of the networks this account will be exclusively used for. You can use the same address on multiple networks, however, for privacy reasons, it is recommended that you create a new address for each network you use.
Select the Robonomics network from the drop-down list. If you could not find the Robonomics network, then most likely you did not update the metadata, go back and do it.

	`You will notice that the format of the address and the account icon will change — this is normal. Different network formats are merely other representations of the same public key.`

- *Name* is just account's name for your use only. It is not stored on the blockchain and will not be visible to other users.

- *Password* is used to encrypt your account's information. You will need to re-enter it when signing transactions on the portal. Create one and remember it.

As a result, after creating an account, you will see it in the list of accounts in Polkadot{.js} extension. By clicking on three dots, you can rename the account, export it, remove it from the extension and change the network used for the account.

Also, the account will appear in the **Accounts -> Accounts** menu on the portal, where it will be noted that it was injected using the extension.

{% roboWikiPicture {src:"docs/creating-an-account/1.6-account-injected.png", alt:"Successful account creation"} %}{% endroboWikiPicture %}


## 2. Directly on Robonomics Parachain App

You can use the user interface on the Polkadot / Substrate Portal to create an account. It could be used for development and tests.

## 2.1. Open Robonomics Parachain App

Go to [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) on Polkadot / Substrate Portal. **Check at the top left corner that you are connected to Robonomics Parachain**.

Go to **Accounts -> Accounts** and press `Add account` button.

{% roboWikiPicture {src:"docs/creating-an-account/2.1-robonomics-app-main-view.png", alt:"Robonomics Parachain App"} %}{% endroboWikiPicture %}

## 2.2. Create Account

You should see the following popup menu with account seed.

{% roboWikiPicture {src:"docs/creating-an-account/2.2-robonomics-app-seed.png", alt:"Generating account seed"} %}{% endroboWikiPicture %}

It has two forms: *Mnemonic* (human-readable) and *Raw* (a sequence of digits and letters). Save the seed phrase securely and press `Next`.

> Also you can change the crypto type of creating account, for that open `Advanced creation options` and choose the type (`ed25519` on the picture).

{% roboWikiPicture {src:"docs/creating-an-account/ed-account.jpg", alt:"ed25519 crypto type account"} %}{% endroboWikiPicture %}

In the next menu, you need to set the account name and password, similar to the extension instructions described above.


{% roboWikiPicture {src:"docs/creating-an-account/2.3-robonomics-app-name-pass.png", alt:"Generating account name and password"} %}{% endroboWikiPicture %}

Clicking on the `Next` button will take you to the last window. Click `Save` to finish account creation. It will also generate a backup JSON-files that you should safely store. You can later use this file to recover your account if you remember the password.

{% roboWikiPicture {src:"docs/creating-an-account/2.4-robonomics-app-account-created.png", alt:"Successful account creation"} %}{% endroboWikiPicture %}

## 2.3 Add ed25519 account to Polkadot extension

You may need to add created account to Polkadot.js extension (for ed25519 account you can do that only with backup JSON file). For that you need to create backup file of the account. Press on three dots on your account and choose `Create a backup file for this account` and write your password.

{% roboWikiPicture {src:"docs/creating-an-account/backup-file.jpg", alt:"Backup file"} %}{% endroboWikiPicture %}

Then open an extension and press `+` button on the top right, then choose `Restore account from backup JSON file`.

{% roboWikiPicture {src:"docs/creating-an-account/extention-add-backup.jpg", alt:"Restore backup in extension"} %}{% endroboWikiPicture %}

In opened window drop saved file, enter the password and press `Restore`.

{% roboWikiPicture {src:"docs/creating-an-account/file-backup.jpg", alt:"Restore backup in extension 2"} %}{% endroboWikiPicture %}

## 3. Account Сreated Successfully

Now you can fully operate with your fresh-created account. Send and receive tokens, messages, write datalog and more. Feel free to explore all the features of app. To copy your account's address simply click on its icon, address will be copied to clipboard.

If you would like to know more about Polkadot / Kusama accounts and additional ways to create them, more information can be found [here](https://wiki.polkadot.network/docs/learn-accounts) and [here](https://wiki.polkadot.network/docs/learn-account-generation).
