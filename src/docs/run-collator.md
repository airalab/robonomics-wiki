---
title: Run a collator
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

Collators produce the blocks of the Robonomics parachain. This guide sets up a collator on a Linux server, registers it on chain and explains how it earns.

The source of this guide is the [collator guide](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md) in the runtime repository.

## What you need

- A server: 8 CPU cores, 64 GB RAM, 2 TB NVMe. Such a server costs about $120–150 a month.
- Disk: the parachain and the Polkadot relay chain together take about 1.1 TB and keep growing. Plan for at least 2 TB.
- An account on Robonomics with more than 32 XRT free balance.

## 1. Install the node

There is no Robonomics node binary. A collator runs Parity's generic `polkadot-omni-node` with the Robonomics chain spec. The guide assumes a `robonomics` user with home `/var/lib/robonomics/` and base path `/var/lib/robonomics/base/`.

Download `polkadot-omni-node` from the [Polkadot SDK releases](https://github.com/paritytech/polkadot-sdk/releases). Use the latest `polkadot-stable*` release; the commands below use `polkadot-stable2609`.

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

Download the chain spec:

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. Generate the network key

The collator does not start without a network key:

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

The key is written to `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519`. Back it up.

## 3. Start the node

Recommended `ExecStart` for a systemd service:

{% codeHelper {copy: true} %}

```
ExecStart=/usr/local/bin/polkadot-omni-node \
  --name "YOUR_NODE_NAME" \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json \
  --base-path /var/lib/robonomics/base/ \
  --collator \
  --sync warp \
  --telemetry-url "wss://telemetry.parachain.robonomics.network/submit/ 0" \
  -- \
  --sync warp
```

{% endcodeHelper %}

- The first `--sync warp` is for the parachain. The one after `--` is for the embedded relay chain. Without it, the relay chain can take weeks to sync.
- The chain spec has no telemetry endpoint, so telemetry is enabled with `--telemetry-url`.

## 4. Generate session keys

Session keys are Aura (sr25519) keys. Start the node temporarily with `--rpc-methods unsafe`, then call `author_rotateKeysWithOwner` with your collator account:

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

The result has two fields: `keys` and `proof`. Save both. Check that the node holds the keys:

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Then remove `--rpc-methods unsafe` and restart the node.

## 5. Register on chain

Send these extrinsics from your collator account, for example in [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics):

1. `session.setKeys(keys, proof)` with the two values from the previous step. Do not pass an empty proof: the proof binds the keys to your account.
2. `collatorSelection.registerAsCandidate()`. This bonds **32 XRT**.

Your node joins the set after a session change. A session is 3,600 blocks in the runtime, about 6 hours at 6-second blocks.

Check your candidacy on chain, not only by the node's health: look at `collatorSelection.candidateList` and `collatorSelection.invulnerables` in **Developer → Chain state**.

The bond and the limits on candidates are runtime settings. Changing them needs a Root referendum. See [XRT and governance](/docs/xrt-and-governance/).

## How rewards work

A collator earns in two ways:

1. **Block reward.** A fixed 0.0042 XRT is minted directly to the author of every block. It has been in place since runtime 43.
2. **Fees and tips.** All fees and tips go to the collator pot. The author of a block receives a share of the pot.

The block reward is set to cover a server with a margin:

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

The inputs are a $2,040-a-year server, 7 collators, a 30% margin and an XRT price of $1. The reward is revisited by runtime upgrade when the inputs change.

Your income depends on your share of the blocks: the more collators there are, the fewer blocks each one authors. Background and measurements: [Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/).
