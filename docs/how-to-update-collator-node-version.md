---
title: How to Update Robonomics Collator Node Version

contributors: [Leemo94]
---

It is recommended to have read the following articles prior to reading this post: ["How to Build Collator Node"](/docs/how-to-build-collator-node) & ["How to Launch the Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator).

This article contains the commands required to update a Robonomics collator node (running on Ubuntu), and also gives an example afterwards.

## **Required Commands**

0. Before you begin, it is recommended that you are logged in as `root`, if not, then I would recommend that you use:

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. Stop the Robonomics service:

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. Remove previous version of Robonomics (make sure you are in the correct directory):

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. Get the [latest release](https://github.com/airalab/robonomics/releases) version of Robonomics:

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. Extract the file:

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. Move the file:

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

You need to move this file to the correct directory which you installed the Robonomics node)

</robo-wiki-note>

6. Start Robonomics:

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

Example for upgrading collator node to Robonomics v1.8.4:

<code-helper>

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
</code-helper>

## **Changing Kusama Relay Chain Database with No Base Path Set**

There are times where certain snapshots of the Kusama Relay Chain cause your node to have errors. This will often cause your node to stop working. Example error caused by a corrupt Relay Chain database:

<code-helper>

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
</code-helper>

In order to fix this error, you should remove your existing Kusama Relay Chain database (likely RocksDb) and replace it with another Db such as ParityDb. Execute the following commands:

1. Find the directory of Robonomics node and check the files:

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. Confirm that you see the polkadot directory, and then navigate to the chains directory:

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3. Delete the `ksmcc3` directory:

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. Make a new `ksmcc3` directory.

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. Now you need to download a new snapshot. This example uses a heavily pruned relay chain snapshot, but you can swap it for any snapshot you prefer.

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. Whilst the snapshot is downloading, open a new session and edit your service file:


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

Modify lines within the service file which relate to the database and pruning:

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
Use `Ctrl + S` and then `Ctrl + X` to save and exit the service file.

7. Now you need to reload your daemon.

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. By this time, in your other session, hopefully the new Db has downloaded, so extract the file:

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. After the unpacking is completed, execute the following:

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. Now you can start the service, monitor it for any errors, and check that it is peering on both the relay chain and the parachain:


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>