---
title: How to Run Robonomics Dev Node

contributors: [LoSk-p]
translated: true
---

For testing your applications on Robonomics you may want to need to run it in the dev mode.

https://youtu.be/04GsVkZ7aVg

## Run

1. First, you need a binary file, download the archive with it from the latest [release](https://github.com/airalab/robonomics/releases).

2. Unpack it and change permissions:

```bash
tar xf robonomics-1.7.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

3. And run in the dev mode:

```bash
./robonomics --dev
```
You will see the following output:

![robonomics](../images/dev-node/robonomics.png)

## Connect

Now you can connect to your local node through the [Polkadot Portal](https://polkadot.js.org/apps/#/explorer).

Change the network to `Local Node` in the upper left corner and press `Switch`.

![local_node](../images/dev-node/portal.png)
