---
title: Client libraries
contributors: [PaTara43, ensrationis]
---

Pick a library by language and by what you need. For the device tree, use `@polkadot/api`, the Rust crates or the `cps` tool. For datalog and RWS from Python, use `robonomics-interface`.

| Library | Language | Device tree | Notes |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | No helpers | Datalog, RWS, accounts, encryption |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | Yes | Generic Substrate client |
| npm `robonomics-interface` | JavaScript | No | Used by robonomics.app |
| `robonomics-runtime-subxt-api` | Rust | Yes, typed | Bindings for the runtime |
| `libcps` and the `cps` tool | Rust, command line | Yes, full | From [airalab/robins](https://github.com/airalab/robins) |

All of them connect to `wss://polkadot.rpc.robonomics.network/` or to your own node.

## Python: robonomics-interface

The current version is 3.1.0. It is tested on a runtime 52 development chain and with read-only checks on the live network. Version 3.0 is a rewrite and is not compatible with 2.x: it no longer depends on `substrate-interface`. If you move from 2.x, read [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md).

What it covers:

- Keys: ED25519 by default. sr25519, the default of Polkadot wallets, needs the `[sr25519]` extra and `crypto_type=SR25519`. SS58 addresses, mnemonics, wallet backup import.
- An async client with fallback between endpoints, and a blocking twin for scripts (`RobonomicsSync`).
- Storage queries and extrinsics with events and readable errors.
- Helpers for Datalog, RWS, System and Balances.
- Message encryption and the report envelope used by the Robonomics Report Service.

There are no helpers for the device tree. Any pallet can still be called with the generic `compose_call` and `submit`.

Install (Python 3.12 or newer):

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

A datalog record, following the README:

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

Documentation: [airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/).

## JavaScript

`@polkadot/api` works with every pallet, the device tree included. Examples from the [CPS pallet README](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage):

```javascript
// Read a node.
const info = await api.query.cps.nodes(nodeId);   // parent and Scope pointer
const meta = await api.query.cps.meta(nodeId);
const payload = await api.query.cps.payload(nodeId);

// Create a root node and a child.
await api.tx.cps.createNode(null, meta, payload, null).signAndSend(owner);
await api.tx.cps.createNode(parentId, meta, payload, null).signAndSend(owner);

// Let another account write to one node.
await api.tx.cps.grantAccess(nodeId, principal, 'Write', 'Node').signAndSend(owner);

// View functions (need a @polkadot/api version with view-function support).
const scope = await api.view.cps.resolveScope(nodeId);
```

The npm package `robonomics-interface` (JavaScript) is what robonomics.app uses. It covers datalog, launch, RWS, digital twin and utility calls, but not the device tree.

## Rust

- `robonomics-runtime-subxt-api`: typed bindings for the runtime, including the device-tree view functions.
- `libcps`: a library for the device tree with an embedded light client. It is not published on crates.io; use it from [airalab/robins](https://github.com/airalab/robins).

## cps command-line tool

`cps` works with the device tree from a terminal. It can run its own light client, so you do not need a node or a public RPC.

Install it from the nightly releases of [airalab/robins](https://github.com/airalab/robins/releases) (archives for Linux and macOS, x86_64 and aarch64), or run it with Nix:

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

The robins README also mentions `cargo install libcps`, but there is no `libcps` crate on crates.io.

A few commands:

```bash
cps lc &                        # start the embedded light client on 127.0.0.1:9944
cps status                      # where am I connected
cps tree <NODE_ID> --depth 2    # look at a tree

export ROBONOMICS_SURI='<your seed phrase>'   # signs writes; keep it secret
cps create --meta '{"type":"building","name":"HQ"}' --payload '{"status":"online"}'
cps create --parent <NODE_ID> --meta '{"type":"room"}' --payload '{"temp":"22C"}'
cps meta set <NODE_ID> '{"type":"room","name":"Lab"}'
cps payload set <NODE_ID> 'temp=24C'
cps delete <NODE_ID>
```

The full guide is in the [robins documentation](https://github.com/airalab/robins/tree/master/docs/src/01-cli).

## Legacy

The ROS 2 wrapper (`robonomics-ros2`) and `robonomics-js` are legacy and not maintained for the current runtime.
