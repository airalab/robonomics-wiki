---
title: Run a dev node
contributors: [LoSk-p, ensrationis]
---

A dev node is a local, single-node Robonomics chain for testing your code. Blocks are produced at once, test accounts have funds, and nothing touches the live network.

There is no `robonomics --dev` binary any more. You build the runtime from [airalab/robonomics](https://github.com/airalab/robonomics), generate a chain spec from it, and run Parity's generic `polkadot-omni-node` with that spec.

## One command (Nix)

From a clone of the repository:

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

The script builds the runtime with the `dev-runtime` feature if needed, generates a temporary chain spec, and starts `polkadot-omni-node --chain <spec> --dev`.

## Without Nix

Install the two tools with Cargo, then run the same script:

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## By hand

To keep the chain spec or change node flags, run the steps yourself:

{% codeHelper {copy: true} %}

```bash
cargo build --release -p robonomics-runtime --features dev-runtime

chain-spec-builder -c ./chain_spec.json create \
  -n "Robonomics Dev" -i robonomics-dev -t development \
  -r ./target/release/wbuild/robonomics-runtime/robonomics_runtime.compact.compressed.wasm \
  --para-id 2000 --relay-chain westend-local \
  --properties tokenSymbol=XRT,tokenDecimals=9 \
  named-preset development

polkadot-omni-node --chain ./chain_spec.json --dev
```

{% endcodeHelper %}

There is no built-in `--chain dev`: you always pass the generated spec plus `--dev`. Add `--base-path <dir>` to keep the chain state between restarts.

## What you get

- RPC and WebSocket on `ws://127.0.0.1:9944`.
- Chain id `robonomics-dev`, para ID 2000, relay chain `westend-local`, token XRT with 9 decimals.
- Pre-funded dev accounts: Alice, Bob, Charlie and the other well-known test keys.
- Alice is Sudo. Sudo exists only in `dev-runtime` builds, never on the live network.
- A fresh state on every start, unless you set `--base-path`.

Connect [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) to `ws://127.0.0.1:9944` to look around. With the `cps` tool, use `ROBONOMICS_WS_URL=ws://127.0.0.1:9944` and `ROBONOMICS_SURI=//Alice`.

## RWS on a dev chain

RWS auctions are created by Root. To skip that step when you test RWS code, the `robonomics-interface` repository has a `scripts/devchain.sh` that starts a dev chain with RWS auctions already in genesis.

More options, including a Docker image, are in the [developer guide](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain).
