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


2. Note that you need to include *--state-cache-size=0* in the collator's service launch. This parameter is important for the stability of the collator.
You can see more info in the related [issue](https://github.com/airalab/robonomics/issues/234) on github.

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


## Speeding Up the Sync using Snapshots

Snapshots are compressed backups of the database directory of a Polkadot or Kusama node. If you download an up-to-date database snapshot, your node will be up and running more quickly—typically within an hour or a few hours, depending on network speed.

We recommend using it immediately after you've created and started the Robonomics service. You can find more info about snapshots and their usage instructions on [the page on the Polkadot wiki](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#database-snapshot-services).

In this example, we will use the service https://snapshots.polkadot.io:

1. Stop the Robonomics service and remove the current relay database directory.

  {% codeHelper { copy: true}%}

  ```shell
  sudo systemctl stop robonomics.service
  sudo rm -rf %BASE_PATH%/polkadot/chains/%CHAIN_NAME%/db/
  ```

  {% endcodeHelper %}

2. Download the latest snapshot using [rclone](https://rclone.org/downloads/) and extract it. Note the database type (`rocksdb` or `paritydb`):

  {% roboWikiNote {type: "warning", title: "DB Pruning"}%}

  Please note that the database is available in two variants: archive and pruned. The archive database retains the full history of blocks (and requires significant storage), while the pruned version keeps only the state of the past 256 or 1000 blocks.

  {% endroboWikiNote %}

  {% codeHelper { copy: true}%}

  ```shell
  export SNAPSHOT_URL="https://snapshots.polkadot.io/[snapshot_name]/[date]"
  export PATH_TO_DB_FOLDER="%BASE_PATH%/polkadot/chains/%CHAIN_NAME%/db/"
  rclone copyurl $SNAPSHOT_URL/files.txt files.txt
  sudo rclone copy --progress --transfers 20 --http-url $SNAPSHOT_URL --no-traverse --http-no-head --disable-http2 --inplace --no-gzip-encoding --size-only --retries 6 --retries-sleep 10s --files-from files.txt :http: $PATH_TO_DB_FOLDER
  rm files.txt
  ```

  {% endcodeHelper %}

3. Set the correct ownership for the database folder.

  {% codeHelper { copy: true}%}

  ```shell
  sudo chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/%CHAIN_NAME%
  ```

  {% endcodeHelper %}

4. Add additional arguments to the Systemd service:

  {% codeHelper { copy: true}%}

  ```shell
  sudo nano /etc/systemd/system/robonomics.service
  ```

  {% endcodeHelper %}

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
    --database=%DATABASE_TYPE%
    --state-pruning=#256 or 1000, if you used pruned DB

  [Install]
  WantedBy=multi-user.target
  ```

  {% endcodeHelper %}

5. Start the Robonomics service again and check the service logs:

  ```shell
  sudo systemctl start robonomics.service
  journalctl -u robonomics.service -f
  ```

## Troubleshooting

### Error: "State Database error: Too many sibling blocks inserted"


For fix this error you can just launch your collator in archive mode:

1) First, need to stop the Robonomics service:

    root@robokusama-collator-screencast:~# systemctl stop robonomics.service


2) Then add the parameter `--state-pruning=archive` to the parachain part of the service file. Example of the edited service file:
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
    --parachain-id=2048 \
    --name="%NODE_NAME%" \
    --validator \
    --lighthouse-account="%ROBONOMICS_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    --base-path="%BASE_PATH%" \
    --state-cache-size=0 \
    --execution=Wasm \
    --state-pruning=archive \
    -- \
    --database=RocksDb \
    --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

3) Reload the systemd manager configuration:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) Remove the exists parachain database:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Start the robonomics service:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    After that need to wait for the synchronization of the parahain database.

### Error: "cannot create module: compilation settings are not compatible with the native host"

This error related to the virtualization parameters. Need to use "host-model" type of the emulated processor. You can set up this on the virtualisation host.

But, if you catch this error on any hosting, you need to ask the technical support about this problem only.
