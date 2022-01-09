---
title: Collators tips and tricks
contributors: [dergudzon]
translated: false
---

Currently the Robonomics network is maintained by developers, but anyone can support the project. Every additional full node of the blockchain helps it to be more sustainable and fault tolerant. Robonomics node binaries are available in [release](https://github.com/airalab/robonomics/releases) assets or it could be [build from source](/docs/how-to-build-collator-node/).

## Requirements

**Minimum hardware requirements** for collators:
+ 4-cores CPU
+ 160GB NVMe
+ 8GB RAM

But we recommend to launch collator using the **standard hardware requirements** for [Polkadot validators](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ CPU - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz.
+ Storage - A NVMe solid state drive. Should be reasonably sized to deal with the blockchain growth. Currently the Kusama db uses around 90GB of space. Starting around 160GB-200GB will be sufficient for the first six months of Robonomics, but it will need to be re-evaluated every six months.
+ Memory - 64GB ECC


## Easily launching a Robonomics collator

You can simply launch a collator directly in the command line to check for errors.
After that we strongly recommend to launch the Robonomics collator as a service.

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

2. Download, extract and move the Robonomics binary to the */usr/local/bin/* directory.. 
   ```
   wget https://github.com/airalab/robonomics/releases/download/v1.4.0/robonomics-1.4.0-ubuntu-x86_64.tar.gz
   tar -xf robonomics-1.4.0-ubuntu-x86_64.tar.gz
   mv robonomics /usr/local/bin/
   ```

3. Create the the systemd service file named *robonomics.service*:
    ```
    nano /etc/systemd/system/robonomics.service
    ```
    And add the following lines in the service file:
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

Collators logs can be monitored with : `journalctl -u robonomics.service -f` 

Now the robonomics collator is launched it will sync with the Kusama Relay Chain, this can take up quite some time depending on your networkspeed and system specficiation, so we recommend to download the a Kusama snapshot and use it. 


## Speeding up the sync process using a Kusama snapshot

We recommend to do this immediately after you've created and started the robonomics service. You can find more info about snapshots and usage instructions on the followin page: https://ksm-rocksdb.polkashots.io/

Instructions:

1. Stop the Robonomics service and remove the current Kusama database directory:
    ```
    systemctl stop robonomics.service
    rm -rf /home/robonomics/.local/share/robonomics/polkadot/chains/ksmcc3/db/
    ```
    
2. Download the actual snapshot, install 7z, extract and remove the downloaded archive:
    ```
    wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.7z
    apt install p7zip-full p7zip-rar
    7z x kusama.RocksDb.7z -o/home/robonomics/.local/share/robonomics/polkadot/chains/ksmcc3
    rm -v kusama.RocksDb.7z
    ```
    
3. Setting the right ownership for the database folder:
    ``` 
    chown -R robonomics:robonomics home/robonomics/.local/share/robonomics/polkadot/chains/ksmcc3
    ```
4. Start the Robonomics service again:
    ```
    systemctl start robonomics.service
    ```
    
