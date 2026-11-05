---
title: Connect devices
contributors: [Fingerling42, nakata5321, ensrationis]
---

There are two ways to bring devices into Robonomics: through Home Assistant, or directly, with any device that can sign a transaction or talk to a gateway.

Ready-made hardware and smart home installation come from Pinout Limited. See [pinout.cloud](https://pinout.cloud) for products and services.

## Home Assistant

There are three Home Assistant integrations. They do different things, and they are not equally current.

| Integration | What it does | State |
|---|---|---|
| [Robonomics Report Service](https://github.com/PinoutLTD/rrs-ha-integration) (Pinout) | Watches Home Assistant for problems. It encrypts an error report, uploads it to IPFS and records its CID on chain. The report becomes a support ticket at your integrator. It also sends a daily heartbeat. | Maintained. Released as pre-releases. Needs Home Assistant 2026.3.1 or newer; install through HACS as a custom repository. |
| [Robonomics integration](https://github.com/airalab/homeassistant-robonomics-integration) (airalab) | Remote access to Home Assistant through encrypted transactions under an RWS subscription, plus users and backups. | Stale. The last release is 2.2.1 from October 2025. It uses the old `robonomics-interface` 1.6.3, needs a local IPFS node, and its default endpoints still point to Kusama, which has stopped. A Polkadot endpoint can be chosen. It has not been checked against the current runtime. |
| [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration) (airalab) | Reads an Altruist sensor over the local network. It does not use the chain. | Small, local only. |

The airalab Robonomics integration depends on RWS subscriptions. See [Legacy pallets](/docs/legacy-pallets/#rws-subscriptions) for their current state.

## Any device

These are the building blocks for connecting your own device.

1. **Give the device its own account.** The key stays on the device.
2. **Pay for its transactions.** Either send the account a little XRT (a datalog record costs a fraction of a thousandth of an XRT at the time of writing), or add it to an RWS subscription with `rws.set_devices` (up to 32 devices) and send its transactions through `rws.call`.
3. **Describe the installation in the device tree.** Create a node for the site and nodes for its devices. Bind the device account to its node as the node's identity. Grant `Write` to a gateway if the gateway writes for the device. See [Device tree (CPS)](/docs/device-tree/).
4. **Write data.** Put the current state in the node's `payload` (up to 8 KiB), or write records with `datalog.record` (up to 512 bytes, [legacy](/docs/legacy-pallets/#datalog)). Put bigger data on IPFS and write its CID.
5. **Send commands, if needed.** The legacy `launch` call sends a signed command event to a device account. See [Launch](/docs/legacy-pallets/#launch).

Libraries for each step: Python `robonomics-interface`, JavaScript `@polkadot/api`, and Rust `libcps` with the `cps` tool. See [Client libraries](/docs/client-libraries/).

### Gateways for small devices

Not every device can talk to the chain. These open-source gateways sit in between:

- **edge** ([airalab/robins](https://github.com/airalab/robins)): takes signed messages over HTTP and Meshtastic and passes them on over libp2p GossipSub.
- **mqtt-bridge** ([airalab/robins](https://github.com/airalab/robins)): turns MQTT messages into device-tree updates.
- **sensors-connectivity** ([airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)): collects signed sensor measurements and passes them to IPFS pubsub and the parachain. It serves the sensors on [sensors.social](https://sensors.social).

The public relay nodes and their status are at [pubsub.robonomics.network](https://pubsub.robonomics.network).
