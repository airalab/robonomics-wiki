---
title: How to Run Robonomics Dev Node
contributors: [LoSk-p]
translated: false
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**For testing your applications on Robonomics you may want to run it in the dev mode. This article shows step-by-step
instructions how to get your own local testing instance of Robonomics.**


## Get Node Binary

1. First, you need a binary file, download the archive with it from the latest [release](https://github.com/airalab/robonomics/releases).

2. Navigate to the archive folder, unpack the binary and change permissions:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## Run

Run the node with:

```bash
./robonomics --dev
```
You will see the following output:

![robonomics](../images/dev-node/robonomics.png)

<robo-wiki-note type="note" title="From Scratch">

  If you want to purge existing blocks you may do this with removing RocksDB at `/tmp/substrate******/chains/dev/db/full`.
  Replace `******` with a corresponding identifier displayed in logs on launch.

  If you want to start the node from scratch every time use `--tmp` flag.

</robo-wiki-note>

## Connect

Now you can connect to your local node through the [Polkadot Portal](https://polkadot.js.org/apps/#/explorer).

Change the network to `Local Node` in the upper left corner and press `Switch`.

![switch](../images/dev-node/portal.png)

Welcome to the local instance of Robonomics!

![local_node](../images/dev-node/dev-portal.png)


