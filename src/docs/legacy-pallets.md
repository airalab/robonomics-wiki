---
title: Legacy pallets
contributors: [PaTara43, nakata5321, LoSk-p, ensrationis]
---

Five pallets from earlier Robonomics versions are still in the runtime: Datalog, Launch, RWS, DigitalTwin and Liability. The [node README](https://github.com/airalab/robonomics#readme) marks them as deprecated: "following pallets will be removed in near future". No removal date has been announced.

They still work on chain today, and some apps and integrations use them. For new projects, start with the [device tree](/docs/device-tree/).

| Pallet | What it does | Successor |
|---|---|---|
| Datalog | Stores short records under your account | Device tree; 5.0 storage is planned |
| Launch | Sends a signed command to a device account | — |
| RWS | Subscriptions for fee-free transactions | 5.0 subscriptions (in progress) |
| DigitalTwin | Maps topics of a digital twin to accounts | Device tree |
| Liability | Agreements between parties with a report at the end | — |

## Datalog

Datalog keeps short records on chain under your account. Each record gets a timestamp.

- `record(record)` adds a record of up to 512 bytes.
- `erase()` deletes all your records.
- Each account keeps its **last 127 records**. Older ones are overwritten. (The window has 128 slots, and one slot is always kept free.)
- For bigger data, put it on IPFS and record the CID.
- Read with the storage queries `datalog.datalogIndex(account)`, which gives the first and last slot, and `datalog.datalogItem([account, slot])`. The event is `NewRecord`.
- There is no deposit, only the normal fee. At the time of writing a full 512-byte record costs about 0.0006 XRT.
- With an RWS subscription a record can be sent without a fee, through `rws.call`.

Who uses it today: the Robonomics Report Service for Home Assistant, sensors.social connectivity agents, and the Altruist and energy-monitor charts in robonomics.app.

A walkthrough of a first record is in [Getting started](/docs/getting-started/#4-send-your-first-record).

## Launch

Launch sends a signed command to a device.

- `launch(robot, param)`: `robot` is the device account, `param` is 32 bytes. A common convention is to put the digest of an IPFS CID there.
- The device watches for `NewLaunch(sender, robot, param)` events with its address.
- Anyone can send a launch to any address. The device must check who the sender is.
- The pallet also writes `param` to one global `Goal` value, which every launch from anyone overwrites. Use the events, not this storage value.
- The fee is about the same as a short datalog record. With an RWS subscription it can be sent without a fee.

robonomics.app uses Launch to control Home Assistant, and the old ROS 2 wrapper used it to start robots.

## RWS subscriptions

RWS (Robonomics Web Services) gives an account fee-free transactions.

- Two kinds: `Daily { days }` and `Lifetime { tps }`.
- A device listed in the subscription sends calls through `rws.call(subscription_owner, call)` and pays no fee. Free capacity builds up over time. For a Daily subscription it builds up at 10,000 µTPS, the equivalent of 0.01 simple transfers per second.
- `set_devices(devices)` lists up to 32 device accounts that may use the subscription. It replaces the whole list. Only a listed device can use `rws.call`.
- `transfer(target)` moves your subscription to an account that has none.

### How a subscription is obtained

- Subscriptions are sold at auction. `bid(index, amount)`: the first bid must be more than 1 XRT. Bids are reserved. Auctions with a bid close every 10 blocks. The winning bid is burned and the subscription is registered.
- The **Buy a subscription** page in [robonomics.app](https://robonomics.app) bids on a free auction and adds your own account as a device in one transaction. You need a balance above the price plus 0.01 XRT. The app refuses if there is no free auction.

### Current state

- New auctions can only be started by Root. Since there is no Sudo, every new batch of auctions needs a Root referendum. Free auctions may run out until one passes.
- Subscriptions issued by the oracle (for example from the RWS tokens on Ethereum, a 2021 experiment) are not connected: the oracle account is not set. The tokenomics page says RWS will be connected to the production network after the Kusama XRT balances move to Polkadot, first for non-commercial projects such as sensors.social.
- The successor is the 5.0 Subscription. With it a device will be able to use the network without holding XRT itself. It is in progress and not in the runtime yet.

## DigitalTwin

A digital twin is a list of topics, each linked to an account that provides data for it.

- `create()` creates a twin.
- `set_source(id, topic, source)` links a 32-byte topic to a source account.
- `remove_source(id)` removes the source.

The [device tree](/docs/device-tree/) replaces it.

## Liability

Liability records signed agreements between parties.

- `create(agreement)` records a signed agreement. Its technical part points to IPFS.
- `finalize(report)` closes it with a report.

The pallet also includes a simple market for such agreements. No successor has been announced.
