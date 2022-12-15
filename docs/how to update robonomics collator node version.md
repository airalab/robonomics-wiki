---
title: How to update robonomics collator node version

contributors: [Leemo94]
---

It is recommended to have read the following articles prior to reading this post. ["how-to-build-collator-node"](https://github.com/airalab/robonomics-wiki/blob/master/docs/en/how-to-build-collator-node.md) & ["how-to-launch-the-robonomics-collator"](https://github.com/airalab/robonomics-wiki/blob/master/docs/en/how-to-launch-the-robonomics-collator.md).

This article contains the commands required to update a Robonomics collator node (running on Ubuntu), and also gives an example afterwards.

# **Required Commands**

*Before you begin, it is recommended that you are logged in as Root, if not, then I would recommend that you use:*

``sudo su -``

1. Stop the robonomics service

``systemctl stop robonomics.service``

2. Remove previous version of Robonomics (make sure you are in the correct directory)

``rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz``

3. Get the latest release version of Robonomics

``wget https://github.com/airalab/robonomics/releases/vX.X.X/.....``

4. tar -xf new file

``tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz``

5. Move the file

``mv robonomics /usr/local/bin/``

*(note, you need to move this file to the correct directory which you installed the Robonomics node)*

6. Start Robonomics

``systemctl start robonomics.service``

# **Example when upgrading collator node to Robonomics v1.8.4**

``sudo su -`` - log in to root environment

``cd /home/admin`` - navigate to the correct directory (your directory may be different)

``systemctl stop robonomics.service`` - stop Robonomics

``rm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz`` - remove previous version

``wget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz`` - download latest release version (in this example v1.8.3)

``tar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz`` - extract files

``mv robonomics /usr/local/bin/`` - move files to desired location

``systemctl start robonomics.service`` start Robonomics service

Note: releases of Robonomics can be found here: https://github.com/airalab/robonomics/releases/ 

# **Changing Kusama Relay Chain Db with no base path set**

There are times where certain snapshots of the Kusama Relay Chain cause your node to have errors. This will often cause your node to stop working. 

Example error caused by a corrupt Relay Chain Db:

``Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] GRANDPA voter error: could not complete a round on disk: Database``

``Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Essential task `grandpa-voter` failed. Shutting down service.``

``Dec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Service(Other("Essential task failed."))``

``Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE``

``Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.``

``Dec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Service(Client(Backend("Invalid argument: Column families not opened: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0")))``

``Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE``

``Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.``

In order to fix this error, you should remove your existing Kusama Relay Chain Db (likely RocksDb) and replace it with another Db such as ParityDb.

``cd /home/robonomics/``

``ls -a``

Confirm that you see the polkadot directory, and then navigate to the chains directory.

``cd /polkadot/chains/``

``ls -a``

Delete the ksmcc3 directory.

``rm -r ksmcc3``

Make a new ksmcc3 directory.

``mkdir ksmcc3``

``chown -R robonomics:robonomics ksmcc3``

``cd ksmcc3``

Now you need to download a new snapshot. This example uses a heavily pruned relay chain snapshot, but you can swap it for any snapshot you prefer.

``wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz``

Whilst the snapshot is downloading, open a new session and edit your service file.

``sudo nano /etc/systemd/system/robonomics.service``

Modify lines within the service file which relate to the database and pruning.

  ``--database=paritydb \``
  
  ``--state-pruning=100 \``
  
  ``--blocks-pruning=100 \``
  
  ``--execution=Wasm``
  
Ctrl + S and then Ctrl + X to save and exit the service file.

Now you need to reload your daemon.

``systemctl daemon-reload``

By this time, in your other session, hopefully the new Db has downloaded, so use the following command on the file.

``tar -xvzf ksm_pruned.tar.gz``

Then after the unpacking is completed.

``chown -R robonomics:robonomics paritydb``

Now you can start the service, monitor it for any errors, and check that it is peering on both the relay chain and the parachain.

``systemctl start robonomics && journalctl -fu robonomics``
