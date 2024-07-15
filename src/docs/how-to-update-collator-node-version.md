---
title: How to Update Robonomics Collator Node Version

contributors: [Leemo94]
---

It is recommended to have read the following articles prior to reading this post: ["How to Build Collator Node"](/docs/how-to-build-collator-node) & ["How to Launch the Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator).

This article contains the commands required to update a Robonomics collator node (running on Ubuntu), and also gives an example afterwards.

## **Required Commands**

0. Before you begin, it is recommended that you are logged in as `root`, if not, then I would recommend that you use:


{% codeHelper { copy: true} %}

```shell
sudo su -
```

{% endcodeHelper %}

1. Stop the Robonomics service:

{% codeHelper { copy: true} %}

```shell
systemctl stop robonomics.service
```

{% endcodeHelper %}


2. Remove previous version of Robonomics (make sure you are in the correct directory):

{% codeHelper { copy: true} %}

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

{% endcodeHelper %}

3. Get the [latest release](https://github.com/airalab/robonomics/releases) version of Robonomics:


{% codeHelper { copy: true}%}

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

{% endcodeHelper %}


4. Extract the file:

{% codeHelper { copy: true}%}

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

{% endcodeHelper %}


5. Move the file:

{% codeHelper { copy: true}%}

```shell
mv robonomics /usr/local/bin/
```

{% endcodeHelper %}

{% roboWikiNote {type: "note"}%} You need to move this file to the correct directory which you installed the Robonomics node {% endroboWikiNote %}

6. Start Robonomics:

{% codeHelper { copy: true}%}

```shell
systemctl start robonomics.service
```

{% endcodeHelper %}

Example for upgrading collator node to Robonomics v1.8.4:

{% codeHelper %}

```shell
sudo su -
cd /home/admin
systemctl stop robonomics.service
rm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz
wget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
tar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
mv robonomics /usr/local/bin/
systemctl start robonomics.service

```

{% endcodeHelper %}


## **Changing Kusama Relay Chain Database with No Base Path Set**

There are times where certain snapshots of the Kusama Relay Chain cause your node to have errors. This will often cause your node to stop working. Example error caused by a corrupt Relay Chain database:


{% codeHelper %}

```shell
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] GRANDPA voter error: could not complete a round on disk: Database
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Essential task `grandpa-voter` failed. Shutting down service.
Dec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Service(Other("Essential task failed."))
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
ec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Service(Client(Backend("Invalid argument: Column families not opened: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0")))
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
```

{% endcodeHelper %}


In order to fix this error, you should remove your existing Kusama Relay Chain database (likely RocksDb) and replace it with another Db such as ParityDb. Execute the following commands:

1. Find the directory of Robonomics node and check the files:

{% codeHelper %}

```shell
cd /home/robonomics/
ls -a
```

{% endcodeHelper %}


2. Confirm that you see the polkadot directory, and then navigate to the chains directory:


{% codeHelper %}

```shell
cd /polkadot/chains/
ls -a
```

{% endcodeHelper %}

3. Delete the `ksmcc3` directory:


{% codeHelper {copy: true} %}

```shell
rm -r ksmcc3
```

{% endcodeHelper %}


4. Make a new `ksmcc3` directory.

{% codeHelper {copy: true} %}

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

{% endcodeHelper %}

5. Now you need to download a new snapshot. This example uses a heavily pruned relay chain snapshot, but you can swap it for any snapshot you prefer.


{% codeHelper {copy: true} %}

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

{% endcodeHelper %}

6. Whilst the snapshot is downloading, open a new session and edit your service file:

{% codeHelper {copy: true} %}

```shell
sudo nano /etc/systemd/system/robonomics.service
```

{% endcodeHelper %}

Modify lines within the service file which relate to the database and pruning:


{% codeHelper {copy: true} %}

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

{% endcodeHelper %}


Use `Ctrl + S` and then `Ctrl + X` to save and exit the service file.

7. Now you need to reload your daemon.

{% codeHelper {copy: true} %}

```shell
systemctl daemon-reload
```

{% endcodeHelper %}


8. By this time, in your other session, hopefully the new Db has downloaded, so extract the file:

{% codeHelper {copy: true} %}

```shell
tar -xvzf ksm_pruned.tar.gz
```

{% endcodeHelper %}


9. After the unpacking is completed, execute the following:

{% codeHelper {copy: true} %}

```shell
chown -R robonomics:robonomics paritydb
```

{% endcodeHelper %}

10. Now you can start the service, monitor it for any errors, and check that it is peering on both the relay chain and the parachain:

{% codeHelper {copy: true} %}

```shell
systemctl start robonomics && journalctl -fu robonomics
```

{% endcodeHelper %}