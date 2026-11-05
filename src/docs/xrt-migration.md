---
title: XRT on other networks
contributors: [nakata5321, ensrationis]
---

Production XRT lives on the Robonomics parachain on Polkadot. This page explains what happens to XRT on Kusama and Ethereum, and where XRT exists on Polkadot Asset Hub.

## Kusama

The Robonomics parachain on Kusama has stopped. It produced its final block, #12,268,835, on 28 September 2026. A database archive is at [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama).

What the published posts say about Kusama XRT:

- All XRT balances at the final block move to Polkadot with a **+20% bonus**.
- There is **no buyback** on the Kusama side.
- Where the balances show up on Polkadot, and whether holders need to do anything, will be explained in a separate post.

Watch the [Robonomics blog](https://robonomics.network/blog/) for that post. Sources: [The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/) and the [tokenomics page](https://robonomics.network/tokenomics/).

## Ethereum

The old XRT token on Ethereum (`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`) is deprecated. On 5 February 2026 its emission mechanism was exploited for free minting. XRT on Polkadot and Kusama was not affected.

Holders of the old token at the snapshot (Ethereum block 24,390,081) can migrate:

1. Open the migration app: [airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/).
2. Connect the wallet that held XRT on 5 February 2026. The app shows your snapshot balance and the amount with the bonus.
3. Choose one option. Each address can choose once.
   - **Accept**: receive production XRT on Ethereum, your snapshot balance plus 20%.
   - **Decline**: join the buyback program instead, at a $2.20 reference price, paid over 12–36 months and only as treasury funds allow.

Before you sign, check that the app talks to the claim contract `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c`. Its source is at [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts).

What you receive is production XRT on Ethereum, contract `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. It is XRT bridged 1:1 from Polkadot through [Snowbridge](https://app.snowbridge.network/send). You can hold it, trade it on Uniswap, or bridge it to Polkadot. There is no bridge from the old token to the new one.

The posts set a 12-month window for the migration. XRT not claimed in time can be restored only by an on-chain governance vote with proof of ownership. Read the exact terms in the posts: [Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/) and [Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/).

Questions: the [XRT Traders](https://t.me/xrt_trade) Telegram group.

## Polkadot Asset Hub

XRT exists on Polkadot Asset Hub as a foreign asset, and there is a DOT–XRT swap pool. Fees on Asset Hub can be paid in XRT.

No user guide for moving XRT between Asset Hub and the Robonomics parachain has been published yet.
