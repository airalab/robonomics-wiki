---
title: Getting started
contributors: [Vourhey, positivecrash, ensrationis]
---

This page takes you from nothing to your first record on the Robonomics network. You need a browser, a wallet extension and a small amount of XRT.

## 1. Create an account

1. Install the [Polkadot.js extension](https://polkadot.js.org/extension/) or another Polkadot wallet that can work with a custom network.
2. Create an account in the wallet. Write the recovery phrase down and keep it offline.
3. The same account works on Robonomics. Robonomics shows addresses in its own format (SS58 prefix 32), so your address there starts with `4`.

An account exists on chain only once it holds at least the existential deposit, 0.000001 XRT.

## 2. Get XRT

You need very little. At the time of writing, a datalog record costs well under 0.001 XRT in fees.

Where XRT is traded today:

- **Uniswap on Ethereum.** Production XRT on Ethereum is XRT bridged from Polkadot through Snowbridge. Its contract is `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. [Swap on Uniswap](https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x1f752250f518e419f2f03804e25728c5c6dff73f). [Snowbridge](https://app.snowbridge.network/send) moves tokens between Ethereum and Polkadot.
- **Polkadot Asset Hub.** XRT exists on Asset Hub, and there is a DOT–XRT swap pool there.

Moving XRT from Asset Hub to your account on the Robonomics parachain is a cross-chain transfer. No step-by-step guide for it has been published yet. If you get stuck, ask in the [XRT Traders](https://t.me/xrt_trade) Telegram group.

{% roboWikiNote {type: "warning", title: "Old links"}%} Some older pages still link to exchanges that no longer list XRT, and to the legacy Ethereum token `0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`. The legacy token is not production XRT. {% endroboWikiNote %}

## 3. Connect Polkadot.js Apps

Open [Polkadot.js Apps with the Robonomics RPC](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer). It connects to the public endpoint `wss://polkadot.rpc.robonomics.network/`. Allow the site in your wallet extension so that your account appears.

To look at blocks, accounts and transfers, you can also use the block explorer at [scan.robonomics.network](https://scan.robonomics.network).

## 4. Send your first record

The simplest first step is a datalog record: a short piece of data stored on chain under your account.

1. In Polkadot.js Apps, open **Developer → Extrinsics**.
2. Choose your account, then `datalog` and `record`.
3. Enter your data, up to 512 bytes. Plain text is fine.
4. Submit the transaction and sign it in the wallet.

To read it back, open **Developer → Chain state**, choose `datalog` and `datalogIndex`, and query your account. It shows which slots hold your records. Then query `datalogItem` with your account and a slot number. Each record comes with a timestamp.

Datalog is one of the [legacy pallets](/docs/legacy-pallets/#datalog). It still works and is a good first test, but new projects should use the device tree.

## 5. Next: describe your devices

The core of Robonomics is the device tree. You create a node for your installation, add nodes for its parts and devices, and decide who may update them. See [Device tree (CPS)](/docs/device-tree/), then [Connect devices](/docs/connect-devices/).
