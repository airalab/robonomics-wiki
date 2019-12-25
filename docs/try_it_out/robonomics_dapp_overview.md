# Robonomics DApp Overview

![Robonomics DApp](../img/try_it_out/dapp_overview/dapp.png "Robonomics DApp")

Let's have a look at the bottom table "Robonomics Telemetry"

Every time an instance of AIRA is launched it broadcasts a piece of information about itself.

Have a brief look at the [previous](aira_installation.md) page to understand where `IPNS` and `Address Eth` came from

### IPNS

You can treat it as a unique identifier of your instance in IPFS network. Under that name AIRA publishes metadata about itself

### Address Eth

By default AIRA generates a new Ethereum address for you (it's [possible](../aira/faq.md#how-to-change-ethereum-address-of-aira) to generate new one)

It's mainly used to sign all the outcoming messages

### Lighthouse

In Robonomics Network an agent must choose a lighthouse to work on. By default it's `airalab.lighthouse.5.robonomics.eth`.

You can choose existing one or create your own on [Lighthouses](https://dapp.robonomics.network/#/lighthouse) page.

### Peers

The amount of IPFS pubsub [peers](../aira/faq.md#how-to-check-the-quantity-of-ipfs-peers)

### Date

The date and time of last update

### Network

Robonomics Network officially works in Ethereum Mainnet.
There is also [Sidechain](https://github.com/airalab/airalab-sidechain) which is mostly for testing purpose.


