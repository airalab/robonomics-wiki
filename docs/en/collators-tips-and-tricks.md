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

You can use simple launch directly in the command line just for first check for errors.
After that we strongly recommend to launch the Robonomics as a service.

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



## Launch the Robonomics collator as a service

1. Create the user for the service with home directory
    ```
    useradd -m robonomics
    ```

2. Move the Robonomics binary to the */usr/local/bin/* directory. 

3. Create the the systemd service file named *robonomics.service*:
    ```
    nano /etc/systemd/system/robonomics.service
    ```
    And add to it these rows:
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
      --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
      --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
      -- \
      --database=RocksDb \
      --unsafe-pruning \
      --pruning=1000

    [Install]
    WantedBy=multi-user.target
    ```
    Where 
      **%NODE_NAME%** is the node name, and
      **%POLKADOT_ACCOUNT_ADDRESS%** is the account address in the Polkadot ecosystem in SS58 format. Example: *4Ch19e5HAF4PzudmLMVLD2xEyuxYXY4j47CLdsG74ht933Vz*

4. Save this file, then enable and start the service:
    ```
    systemctl enable robonomics.service && systemctl start robonomics.service
    ```

Telemetry url: https://telemetry.parachain.robonomics.network/#/Robonomics

How to check the collator logs: `journalctl -u robonomics.service -f` 

Now the robonomics collator is launched, but Kusama chain syncronization process will take a lot of time, so we recommend to download the actual Kusama snapshot and use it. 


## Using Kusama snapshot for making syncronization faster

We recommend to do it immediately after creating the robonomics service. You can find info about snapshots and usage instructions on this page: https://ksm-rocksdb.polkashots.io/

Here our instruction:

1. Stop the Robonomics service and remove current Kusama database directory:
    ```
    systemctl stop robonomics.service
    rm -rf /home/robonomics/.local/share/robonomics/polkadot/chains/ksmcc3/db/
    ```
    
2. Download the actual snapshot, install 7z, unarchive the downloaded db and remove downloaded archive:
    ```
    wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.7z
    apt install p7zip-full p7zip-rar
    7z x kusama.RocksDb.7z -o/home/robonomics/.local/share/robonomics/polkadot/chains/ksmcc3
    rm -v kusama.RocksDb.7z
    ```
    
3. Set right owner for database folder:
    ``` 
    chown -R robonomics:robonomics home/robonomics/.local/share/robonomics/polkadot/chains/ksmcc3
    ```
4. Start the Robonomics service again:
    ```
    systemctl start robonomics.service
    ```
    
