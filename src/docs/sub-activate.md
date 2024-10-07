---
title: Subscription Activate
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.7.0
    https://github.com/airalab/robonomics.app
---

**In this article, you will create Robonomics parachain accounts and buy an IoT subscription.**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

To control Home Assistant with Robonomics, you need 2 accounts on the Robonomics parachain. For one of the accounts (`OWNER`), you will buy a Robonomics subscription. The second account (`CONTROLLER`) will control all Home Assistant processes (such as telemetry) and will give access to other users. These accounts will provide security for your Home Assistant.

If you don’t have an account, check this article and create [the OWNER account](/docs/create-account-in-dapp/). The Controller account will be created automatically during setup.

In the article, a [Polkadot.js extension](https://polkadot.js.org/extension/) wallet is used for working with accounts, but you can use another wallet that is convenient for you.

## Activate Robonomics Subscription 

{% roboWikiNote {type: "okay"} %}

For this step, you must have a sufficient amount of XRT tokens (minimum of 2-3 XRT) in your `OWNER` account.

{% endroboWikiNote %}


{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['autoplay, loop, controls'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

1. Go to the Robonomics dApp and navigate to the [subscription page](https://robonomics.app/#/rws-buy). Then, click on `Connect Account` on the right sidebar.

2. In the following popup menu, connect the Polkadot.js extension. You will see your account address along with its balance.

3. Before purchasing, ensure that you have selected the `OWNER` account. Click on the address profile icon, and you should see the `OWNER` account.

4. Finally, click the `BUY SUBSCRIPTION` button and enter the password for your account. Wait until the activation process is completed. You will see the state of your subscription after a while.

## Setup your Subscription

Now you need to setup you subscription by adding the `CONTROLLER` account to it.

{% roboWikiPicture {src:"docs/home-assistant/sub-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

1. Go to the Robonomics dApp and navigate to the [setup a subscription page](https://robonomics.app/#/rws-setup). Navigate to the **Subscription settings** section.

2. In the `Controller's seed phrase` field press magic wand to create new `CONTROLLER` account.

3. In the pop-up create password for the `CONTROLLER` account.

4. On the next pop-up, you will see the address of your new account and the mnemonic seed phrase. Save the mnemonic seed phrase securely because you will need it later 
for integration setup. Additionally, the JSON file with the `CONTROLLER` account will be downloaded. You can import it to your wallet. 
How to do it for Polkadot.js extension can be found [here](/docs/create-account-in-dapp/).

{% roboWikiPicture {src:"docs/home-assistant/controller-create.jpg", alt:"controller create"} %}{% endroboWikiPicture %}

5. Close pop-up and click the `SAVE` button.

## Add Controller Account to Subscription

Now, you need to add your `CONTROLLER` account to the **access list**. 

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay, loop, controls']} %}{% endroboWikiVideo %}

1. Go to the Robonomics dApp and navigate to the [setup a subscription page](https://robonomics.app/#/rws-setup). Ensure that you have selected the correct subscription and the `OWNER` account.

2. Copy the `CONTROLLER` address: open the extension and click on the icon next to the account name or copy the address from **Subscription settings** section.

3. Paste this address into the `Polkadot address` field in the **USERS IN SUBSCRIPTION** section and click the `+` button. 

4. Enter the password for your `OWNER` account in the popup window, then wait for the activation process to be completed.

That's all. Go to the next article.
