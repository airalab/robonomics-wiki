---
title: Overview
contributors: [ensrationis]
---

Robonomics is a cloud for devices on Polkadot. You keep a description of your devices and their current state in the cloud, write measurements, and send commands. You pay for it in XRT, the network's token. No single company runs the cloud: independent collators run it, and XRT holders govern it with on-chain votes.

## Main parts

- **Device tree (CPS).** A tree of nodes that describes your installation: a building, its rooms, the devices in them. Each node holds a short description and the current state. The owner decides who may write to which part of the tree. This is the core of Robonomics today. See [Device tree (CPS)](/docs/device-tree/).
- **XRT.** The token. It pays transaction fees and subscriptions, and XRT holders vote with it. See [XRT and governance](/docs/xrt-and-governance/).
- **Governance.** Standard Polkadot OpenGov with two tracks. There is no Sudo key: every privileged change, including runtime upgrades, goes through a referendum.
- **Collators.** The servers that produce blocks. Anyone can become a candidate by bonding XRT. See [Run a collator](/docs/run-collator/).

Older building blocks (Datalog, Launch, RWS subscriptions, Digital Twin, Liability) still work, but they are deprecated. See [Legacy pallets](/docs/legacy-pallets/).

## The network

| | |
|---|---|
| Network | Robonomics parachain on Polkadot |
| Para ID | 3388 |
| Token | XRT, 9 decimals |
| Address format | SS58 prefix 32 (addresses start with `4`) |
| Block time | 6 seconds (target) |
| Public RPC | `wss://polkadot.rpc.robonomics.network/` |
| Block explorer | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [open with the Robonomics RPC](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

Polkadot is the only live Robonomics network. The parachain on Kusama has stopped. See [XRT on other networks](/docs/xrt-migration/).

## What is being built

Robonomics 5.0 adds the cloud in layers. Governance and the device tree with Scope and Access are live. Subscriptions are in progress: a device will be able to use the network without holding XRT itself. Storage and compute are planned; there is no code for them yet.

Read more in the blog post [Robonomics 5.0, part one](https://robonomics.network/blog/robonomics-5-0-runtime-first/) and in the [5.0 roadmap](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md).

## Software and maintainers

All Robonomics software is open source:

- [airalab/robonomics](https://github.com/airalab/robonomics): the runtime and its pallets.
- [airalab/robins](https://github.com/airalab/robins): tools, including the `cps` command-line tool and gateways for devices.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): the Python library.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): the web app at [robonomics.app](https://robonomics.app).

There is no separate Robonomics node program. Collators run Parity's generic `polkadot-omni-node` with the Robonomics chain spec.

The Robonomics websites, including this wiki, are operated by Akagi Engineering Co., Ltd. (Japan). News and release notes are on the [Robonomics blog](https://robonomics.network/blog/).
