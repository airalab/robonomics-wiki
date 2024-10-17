---
title: Launch of Robonomics Collator
contributors: [dergudzon, Leemo94, Fingerling42]
tools:
  - Ubuntu 22.04.4
    https://releases.ubuntu.com/22.04/
  - Robonomics 3.2.0
    https://github.com/airalab/robonomics
---

**Anyone can maintain the Robonomics Network infrastructure. Every additional full node of the blockchain helps it to become more sustainable and fault-tolerant. Binaries of the Robonomics node are available in [release](https://github.com/airalab/robonomics/releases) assets, or it can be [built from source](/docs/how-to-build-collator-node/).**

*Screencast with the launch of the collator for version 1.4.0:*

https://youtu.be/wUTDDLDbzTg

## What is a Collator

A Collator is part of the Robonomics parachain. This type of node creates new blocks for the Robonomics chain on Polkadot and Kusama.

 {% roboWikiNote {type: "okay"}%}

 Collators maintain parachains by collecting parachain transactions from users and producing state transition proofs for Relay Chain validators. In other words, collators maintain parachains by aggregating parachain transactions into parachain block candidates and producing state transition proofs for validators based on those blocks.

 {% endroboWikiNote %}  

You can learn more about collators on the related [Polkadot wiki page](https://wiki.polkadot.network/docs/learn-collator).

In both Polkadot and Kusama parachains of Robonomics, every collator earns a reward of (**0.001598184 XRT**) for each block that they build (rewards are granted when blocks are sealed to the chain). You can check the reward amount by using the Polkadot portal: go to **Developer** -> **Chain state** -> **Constants** and make a query for `lighthouse` -> `blockReward`. Additionally, the collator that builds the block receives **50% of transaction fees** contained within the block they create.

## Requirements

It is recommended that you launch a collator using the **standard hardware requirements** for [Polkadot validators](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):

- x86-64 compatible
- Intel Ice Lake, or newer (Xeon or Core series); AMD Zen3, or newer (EPYC or Ryzen)
- 8 physical cores @ 3.4GHz
- simultaneous multithreading disabled (Hyper-Threading on Intel, SMT on AMD)
- storage — an NVMe SSD of 1 TB (reasonably sized to handle blockchain growth)
- memory — 32 GB DDR4 ECC

The minimum requirements used for this article:

- 2 CPU or vCPU
- 700 GB of NVMe space for the collator's databases with the ability to expand disk space
- 8 GB RAM

## Preliminary Information

1. We use some variables in these instructions, and you'll need to replace the placeholder values with your own in all commands:

   - **%CHAIN_NAME%** — name of the relay chain in which the parachain is connected, `polkadot` or `kusama`
   - **%NODE_NAME%** — the node name, e.g., `my-robonomics-kusama-collator`
   - **%BASE_PATH%** — the path to the mounted volume on storage, e.g., */mnt/HC_Volume_16056435/*
   - **%ROBONOMICS_ACCOUNT_ADDRESS%** — the account address in the Polkadot ecosystem in SS58 format, e.g., `4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu`


2. Note that you need to include `--trie-cache-size=0` in the collator's service launch. This parameter is important for the stability of the collator.

## Easy to Start Collator for the First Time

You can easily launch a collator directly in the command line to check for errors. Do not forget to specify the network you want to connect to in the `--chain` argument.

{% codeHelper { copy: true}%}

```shell
robonomics \
  --chain=%CHAIN_NAME% \
  --name="%NODE_NAME%" \
  --collator \
  --lighthouse-account="%ROBONOMICS_ACCOUNT_ADDRESS%" \
  --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
  --base-path="%BASE_PATH%" \
  --trie-cache-size=0 \
  -- \
  --chain=%CHAIN_NAME%
  --sync=warp
```

{% endcodeHelper %}

After doing this, it is strongly recommended to launch the Robonomics collator as a service (see the next step).

## Launch the Robonomics Collator as a Systemd Service

1. Create a user for the service with a home directory:

  {% codeHelper { copy: true}%}

  ```shell
  sudo useradd -m robonomics
  ```

  {% endcodeHelper %}

2. Download, extract, and move the Robonomics binary to the `/usr/local/bin/` directory. You can find the current version of the Robonomics node on the releases page of the [Robonomics repository](https://github.com/airalab/robonomics/releases):

  {% codeHelper { copy: true}%}

  ```shell
  wget %ROBONOMICS_NODE_LINK%
  tar -xvzf %ROBONOMICS_NODE_ARCHVIE%
  sudo mv robonomics /usr/local/bin/
  ```
  {% endcodeHelper %}

3. Create the systemd service file named `robonomics.service`:

  {% codeHelper { copy: true}%}

  ```shell
  sudo nano /etc/systemd/system/robonomics.service
  ```

  {% endcodeHelper %}

  And add the following lines in the service file:

  {% codeHelper { copy: true}%}

  ```
  [Unit]
  Description=robonomics
  After=network.target

  [Service]
  User=robonomics
  Group=robonomics
  Type=simple
  Restart=on-failure

  ExecStart=/usr/local/bin/robonomics \
    --chain=%CHAIN_NAME% \
    --name="%NODE_NAME%" \
    --collator \
    --lighthouse-account="%ROBONOMICS_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    --base-path="%BASE_PATH%" \
    --trie-cache-size=0 \
    -- \
    --chain=%CHAIN_NAME%
    --sync=warp

  [Install]
  WantedBy=multi-user.target
  ```

  {% endcodeHelper %}

  {% roboWikiNote {type: "okay", title: "Sync Argument"}%}

  Note the `--sync` argument — it specifies the blockchain syncing mode. By default, it is set to `full`, which means downloading all blocks and starting to build the database from scratch. This process can take a few days, depending on network speed. The `warp` sync option is more convenient; in this mode, the node will first download the finality proofs, making it ready to validate while it continues downloading the remaining blocks in the background.

  {% endroboWikiNote %}  

4. Give the created user access to the database directory:

  {% codeHelper { copy: true}%}

  ```shell
  sudo chown -R robonomics:robonomics %BASE_PATH%
  ```

  {% endcodeHelper %}

5. Save this file, then enable and start the service:

  {% codeHelper { copy: true}%}

  ```shell
  sudo systemctl enable robonomics.service
  sudo systemctl start robonomics.service
  ```

  {% endcodeHelper %}

  Collator logs can be monitored with:

  {% codeHelper { copy: true}%}

  ```
  journalctl -u robonomics.service -f
  ```

  {% endcodeHelper %}

Your node should start and show up in the telemetry stats: https://telemetry.parachain.robonomics.network

Once the Robonomics collator is launched, it will begin to sync with the Relay Chain. This process can take a considerable amount of time, depending on your network speed and system specifications, so we recommend downloading a snapshot.


## Troubleshooting

### Error: "State Database error: Too many sibling blocks inserted"

To fix this error, you can launch your collator in archive mode.

1. First, stop the Robonomics service:

  {% codeHelper { copy: true}%}

  ```
  sudo systemctl stop robonomics.service
  ```

  {% endcodeHelper %}


2. Then add the parameter `--state-pruning=archive` to the parachain part of the service file. Example of the edited service file:

  {% codeHelper { copy: true}%}

  ```
  [Unit]
  Description=robonomics
  After=network.target

  [Service]
  User=robonomics
  Group=robonomics
  Type=simple
  Restart=on-failure

  ExecStart=/usr/local/bin/robonomics \
    --chain=%CHAIN_NAME% \
    --name="%NODE_NAME%" \
    --collator \
    --lighthouse-account="%ROBONOMICS_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    --base-path="%BASE_PATH%" \
    --trie-cache-size=0 \
    --state-pruning=archive
    -- \
    --chain=%CHAIN_NAME%
    --sync=warp

  [Install]
  WantedBy=multi-user.target
  ```

  {% endcodeHelper %}


3. Reload the systemd manager configuration:

  {% codeHelper { copy: true}%}

  ```
  sudo systemctl daemon-reload
  ```

  {% endcodeHelper %}

4. Remove the existing parachain database:

  {% codeHelper { copy: true}%}

  ```
  sudo rm -rf %BASE_PATH%/chains/robonomics/db/
  ```

  {% endcodeHelper %}

5. Start the Robonomics service:

  {% codeHelper { copy: true}%}

  ```
  sudo systemctl start robonomics.service
  ```

  {% endcodeHelper %}

After that, wait for the synchronization of the parachain database.

### Error: "cannot create module: compilation settings are not compatible with the native host"

This error is related to virtualization parameters. You need to use the "host-model" type for the emulated processor. You can set this up on the virtualization host.

If you encounter this error on any hosting service, you need to contact technical support about this issue.

### Error: "Can't use warp sync mode with a partially synced database. Reverting to full sync mode."

This error occurs if you first started the node in full mode and then switched to warp. To fix it, remove database from %BASE_PATH% completely and restart the node in warp mode.
