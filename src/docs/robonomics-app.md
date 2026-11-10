---
title: Using robonomics.app
contributors: [vol4tim, positivecrash, ensrationis]
---

[robonomics.app](https://robonomics.app) is the web app for Robonomics. With it you buy a subscription, connect Home Assistant, control your home from any browser, and look at the device tree and sensor data. This page walks through it screen by screen.

You need a Polkadot wallet extension with an account on Robonomics. To buy anything or send a transaction, the account needs a little XRT. See [Getting started](/docs/getting-started/).

## Connect your wallet

The wallet button is at the top right. Pick an account from your extension and allow the site to use it. The same button switches the network. Use Polkadot.

## Buy a subscription

**Buy/renew a subscription** in the menu.

- The page shows the price, the activation time (about two minutes) and how many subscriptions are available right now.
- Your balance has to cover the price plus a small fee.
- One transaction bids on a free auction and adds your account to the subscription.
- If no subscriptions are available, new ones open only after a governance vote. See [Legacy pallets](/docs/legacy-pallets/#current-state).

The subscription lets the accounts listed in it send transactions without fees. That is what Home Assistant uses to talk to the chain. Details: [RWS subscriptions](/docs/legacy-pallets/#rws-subscriptions).

## Add a setup

A setup is your home as the app sees it: a subscription and the accounts tied to it. **New setup** in the menu has three ways to add one:

- **By the owner's address.** Paste the address that holds the subscription. The app finds the subscription and shows its end date, even if it has already expired.
- **With the extension.** Pick the owner account from your wallet instead of typing it.
- **From a file.** Upload a backup that you exported earlier.

The list of setups lives in your browser only. Removing a setup from the app removes it from that list, and nothing changes on chain.

## Your setup

**Your setup** shows one subscription:

- **Active until.** The end date, in red once it has passed.
- **Owner.** The account that holds the subscription.
- **Controller.** The account your Home Assistant uses to write to the chain. The Home Assistant integration creates it; you paste it here.
- **Users.** The accounts that may control the home. Adding or removing a user is a transaction from the owner.
- **Subscription backup.** Exports the setup to a file. To move to another browser or device, upload that file under **New setup**.

## Devices and control

**Devices & Control** opens your Home Assistant dashboard in the browser.

- Choose a user and enter that user's key phrase. The app uses it to decrypt the data from Home Assistant. It stays in the browser.
- Tick **Keep me signed in** only on a device you trust.
- The app connects to Home Assistant directly, peer to peer. When a direct connection is not possible, it goes through a relay. The data is encrypted the whole way.

For this page to work, Home Assistant needs the Robonomics integration. [Connect devices](/docs/connect-devices/#home-assistant) says which integrations exist and how current they are.

## Device tree

**Device tree** in the menu shows the [device tree](/docs/device-tree/) of Robonomics 5.0.

- The start page lists the root nodes and their owners.
- Open a node by its number, or by the account of its device.
- A node page shows the path to the root, the owner, the device account, the `meta` and `payload` (JSON and text are shown as text), the children and the access entries.
- With a connected account you can create a root node, add children to nodes you own, and edit `meta` and `payload` where you are the owner or have `Write` access. Everything in the tree is public.

## Datalog

**Send your first record** on the home page opens the Datalog page.

- Type up to 512 bytes and send. The fee is well under 0.001 XRT.
- Below it you see the records of any account, newest first. The chain keeps the latest 128 records per account.

Datalog is a [legacy pallet](/docs/legacy-pallets/#datalog). It is a good first test. For devices, use the device tree.

## Sensors and digital twins

- **Altruist.** Open `robonomics.app/#/altruist/<sensor address>` to see the sensor's readings recorded on chain: particulate matter, noise, temperature, humidity, and pressure in hPa on its own axis. See [Altruist and sensors.social](/docs/altruist/).
- **Energy monitor.** Open `robonomics.app/#/energy-monitor/<address>` to do the same for an energy monitor.
- **Digital twin.** Lists your twins and the accounts behind each topic. See [DigitalTwin](/docs/legacy-pallets/#digitaltwin).

If an address has no readings, the page says so instead of loading forever.

## If something goes wrong

- **The app connects to the wrong network.** The app remembers a network address that was once given in a link. Open `https://robonomics.app/?rpc=wss://polkadot.rpc.robonomics.network/` once to switch back.
- **A Uniswap link shows a different token.** Production XRT on Ethereum is `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. The old token `0x7dE9…1cb7` is not production XRT. See [XRT on other networks](/docs/xrt-migration/).
- **The controller or a user is not saved, or a Kusama subscription cannot be managed.** This is a known issue, tracked in [robonomics.app issues](https://github.com/airalab/robonomics.app/issues) #213 and #223.
- **Anything else.** Open an issue at [github.com/airalab/robonomics.app](https://github.com/airalab/robonomics.app/issues). Add the build version from the browser console. It is printed when the app starts.
