---
title: Collators tips and tricks
contributors: [dergudzon]
translated: false
---

Currently Robonomics is maintained by developers but anyone can support the project. Every additional full node of blockchain helps it to be more sustainable and fault tolerant. Robonomics node binaries is available in [release](https://github.com/airalab/robonomics/releases) assets or it could be [build from source](/docs/how-to-build-collator-node/).

## Requirements

**Minimum hardware requirements** for collator:
+ 4-cores CPU
+ 160GB NVMe
+ 8GB RAM

But we recommend to launch collator using the **standard hardware requirements** for polkadot validators:
+ CPU - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz.
+ Storage - A NVMe solid state drive. Should be reasonably sized to deal with blockchain growth. In the moment just Kusama db used around 90GB space. Starting around 160GB-200GB will be okay for the first six months of Robonomics, but will need to be re-evaluated every six months.
+ Memory - 64GB ECC


## Simple launch the Robonomics collator

Launch command:

```
  robonomics \
    --parachain-id=2048 \
    --name="%NODE_NAME%" \
    --validator \
    --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    -- \
    --database=RocksDb \
    --unsafe-pruning \
    --pruning=1000
```
Where **%NODE_NAME%** is the node name, and
      **%POLKADOT_ACCOUNT_ADDRESS%** is the account address in the Polkadot ecosystem in SS58 format. Example: *4Ch19e5HAF4PzudmLMVLD2xEyuxYXY4j47CLdsG74ht933Vz*

Telemetry: https://telemetry.parachain.robonomics.network/#/Robonomics
