---
title: Lesson 4, Robonomics Parachain in Practice 
locale: 'pt' 
contributors: [akru]
translated: true
---
import Asciinema from '~/components/Asciinema.vue'

At the moment, Robonomics, in addition to the Ethereum network, also operates on the basis of the Polkadot ecosystem, which has greater scalability through the use of sharded blockchains. To do this, the ecosystem uses a [sharded model](https://wiki.polkadot.network/docs/getting-started), with the following elements:

![Polkadot base scheme](../images/ws_lesson4/polkadot-base-scheme.png "Polkadot base scheme (from Polkadot Wiki)")

* relay chain — central blockchain used by others for basic coordination of work;
* parachains — data structures (usually also blockchains) used for specific applications; Robonomics operates as a parachain;
* validators — nodes that create blocks in the relay chain and also verify new block candidates from parachains for inclusion to the shared state of Polkadot;
* collators — nodes that maintain a parachain by collecting its transactions and producing new block candidates to pass to validators;
* Cross-Consensus Messaging Format (XCM) — format that allows parachains to send messages of any type to each other.

The goal of this lesson is to get to know the basic elements of the Polkadot ecosystem and understand how they interact with each other. To do this, you will run your local relay chain and several Robonomics-based parachains.

## Requirements

* Docker, please [install it](https://docs.docker.com/engine/install/).
* Polkadot-launch, please [install it](https://github.com/paritytech/polkadot-launch#install) (optionally, if you don't want to use docker).

## Launch the relay

Run a local instance of Rococo (polkadot testnet) relay chain with two Robonomics-based parachains as the children. 
<!-- I'll use prepared [Docker image tag: "winter-school-2"](https://hub.docker.com/layers/robonomics/robonomics/winter-school-2/images/sha256-92f4795262f3ded3e6a153999d2777c4009106a7d37fd29969ebf1c3a262dc85?context=explore) but all source code of examples
available in [Robonomics GitHub](https://github.com/airalab/robonomics/tree/master/scripts/polkadot-launch). -->

First, pull version 2 of WinterSchool Docker using the command below:

```
docker pull robonomics/robonomics:winter-school-2
```
Now run the docker using the command below:

```
docker run -ti --rm --network host robonomics/robonomics:winter-school-2 bash
cd polkadot-launch/
./launch.sh
```

Depending on the specs of your machine, it can take up to several minutes, but be patient. As a result, you should have three chain instances.

The video below is a walk through the previous steps. Refer to the video if you would have problems with the chain instances.
<Asciinema vid="419Jrg22ziFfMFPZlh2WtiLvg"/>

Once the instances are created, you can access them by their IDs. In our case, the IDs are as the following: 

* `9944` - local Rococo relay chain. (https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer)
* `9988` - robonomics parachain with `id=100` (https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9988#/explorer)
* `9989` - robonomics parachain with `id=200` (https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9989#/explorer)

<!-- If you use remote server, you need to create some ssh tunnels on local machine:
```
ssh -f -N -L 9944:127.0.0.1:9944 root@REMOTE_SERVER_IP
ssh -f -N -L 9988:127.0.0.1:9988 root@REMOTE_SERVER_IP
ssh -f -N -L 9989:127.0.0.1:9989 root@REMOTE_SERVER_IP
```
After that, you can use `ws://127.0.0.1:9944` for relay chain, `ws://127.0.0.1:9988`and `ws://127.0.0.1:9989` for parachains in https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer

<!-- ![relay](../images/ws_lesson4/upcoming.jpg)

Some time ago parachains should be registered.

![relay2](../images/ws_lesson4/parachains.jpg)

And start to produce blocks.

![relay3](../images/ws_lesson4/parachains2.jpg) -->

As the next step, let's create an HRMP channel to pass messages between parachains. We would use `sudo` module to call on relay chain page. To do this, Open Rocco relay chain(https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) and switch to local node from the top left. Then, go to `Developer->Sudo`, fill in parts as shown in figure below and click on `Submit Sudo`.

![hrmp](../images/ws_lesson4/hrmp.jpg)

When the channel is created, the XCM calls would become available. Let's use `datalogXcm` pallet - a XCM version of `datalog` pallet in first parachain (9988).

In the next step, switch to the first parachain(https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9988#/explorer). Find `Settings->Developer`, paste the following configurations, and click on `Save`.

```
{
    "Address": "AccountId",
    "LookupSource": "AccountId",
    "AccountInfo": "AccountInfoWithDualRefCount"
}
```

After saving the configurations, find `Extrinsics` under the `Developer` tab. Fill in the parts as shown in figure below and click on `Submit Transaction`. Wait for transaction to be finalized.

![datalogXcmSend](../images/ws_lesson4/datalogXcmSend.jpg)

As a result of the above operation, the message on second parachain will call `datalog` pallet and write data onto the chain.

To view the message, go to the other parachain (https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9989#/explorer).

You should be able to see that your message has been sent from the first parachain (9998) to the second one (9999). The message will appear in the `Explorer` tab under `recent events`.

![datalogXcmRecv](../images/ws_lesson4/datalogXcmRecv.jpg)

This example demonstrated that how XCM could be used for cross chain usage of standard Robonomics pallets.
