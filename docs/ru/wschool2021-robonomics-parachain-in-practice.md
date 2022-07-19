---
title: Lesson 4, Robonomics parachain in practice 
locale: 'ru' 
contributors: [akru]
translated: false
---
import Asciinema from '~/components/Asciinema.vue'

Robonomics parachain is not a general purpose parachain on Polkadot ecosystem. The target of Robonomics
is building economy of machines, the parachain in this scope of aims helps to integrate Polkadot ecosystem
with IoT, Smart Cities and Industry 4.0 concepts.

## Requirements

* Docker, please [install it](https://docs.docker.com/engine/install/).
* Polkadot-launch, please [install it](https://github.com/paritytech/polkadot-launch#install) (optionally, if you don't want to use docker).

## Launch the relay

The relay chain is a core of Polkadot, it provides [shared security](https://wiki.polkadot.network/docs/en/learn-security)
for all child parachains and implements message passing mechanics for them. Let's launch local instance of Rococo (polkadot testnet)
relay chain with two robonomics-based parachains as a childs. I'll use prepared [Docker image tag: "winter-school-2"](https://hub.docker.com/layers/robonomics/robonomics/winter-school-2/images/sha256-92f4795262f3ded3e6a153999d2777c4009106a7d37fd29969ebf1c3a262dc85?context=explore) but all source code of examples
available in [Robonomics GitHub](https://github.com/airalab/robonomics/tree/master/scripts/polkadot-launch).
```
docker run -ti --rm --network host robonomics/robonomics:winter-school-2 bash
cd polkadot-launch/
./launch.sh
```

<Asciinema vid="419Jrg22ziFfMFPZlh2WtiLvg"/>

It could take a time, but be partient. As result you should have three chain instances at ports:

* `9944` - local rococo relay chain.
* `9988` - robonomics parachain with `id=100`
* `9989` - robonomics parachain with `id=200`

If you use remote server, you need to create some ssh tunnels on local machine:
```
ssh -f -N -L 9944:127.0.0.1:9944 root@REMOTE_SERVER_IP
ssh -f -N -L 9988:127.0.0.1:9988 root@REMOTE_SERVER_IP
ssh -f -N -L 9989:127.0.0.1:9989 root@REMOTE_SERVER_IP
```
After that, you can use `ws://127.0.0.1:9944` for relaychain, `ws://127.0.0.1:9988`and `ws://127.0.0.1:9989` for parachains in https://parachain.robonomics.network/

![relay](../images/ws_lesson4/upcoming.jpg)

Some time ago parachains should be registered.

![relay2](../images/ws_lesson4/parachains.jpg)

And start to produce blocks.

![relay3](../images/ws_lesson4/parachains2.jpg)

As next step let's create HRMP channel to pass messages between parachains. I'll use `sudo` module call on relay chain page.

![hrmp](../images/ws_lesson4/hrmp.jpg)

When channel created, the XCM calls is available. Let's use `datalogXcm` pallet - a XCM version of `datalog` pallet in first parachain.

![datalogXcmSend](../images/ws_lesson4/datalogXcmSend.jpg)

As result message on second parachain will call `datalog` pallet and write data on chain.

![datalogXcmRecv](../images/ws_lesson4/datalogXcmRecv.jpg)

As result, this example demonstrate how XCM could be used for cross chain usage of standard robonomics pallets.
