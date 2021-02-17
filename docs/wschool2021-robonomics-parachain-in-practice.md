import Asciinema from '~/components/Asciinema.vue'

# Robonomics parachain in practice

Robonomics parachain is not a general purpose parachain on Polkadot ecosystem. The target of Robonomics
is building economy of machines, the parachain in this scope of aims helps to integrate Polkadot ecosystem
with IoT, Smart Cities and Industry 4.0 concepts.

This lesson requirements:
* Docker, please [install it](https://docs.docker.com/engine/install/).
* Polkadot-launch, please [install it](https://github.com/paritytech/polkadot-launch#install).

## Launch the relay

The relay chain is a core of Polkadot, it provides [shared security](https://wiki.polkadot.network/docs/en/learn-security)
for all child parachains and implements message passing mechanics for them. Let's launch local instance of Rococo (polkadot testnet)
relay chain with two robonomics-based parachains as a childs. I'll use prepared [Docker image]() but all source code of examples
available in [Robonomics GitHub](https://github.com/airalab/robonomics/tree/master/scripts/polkadot-launch).

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
After that, you can use `ws://127.0.0.1:9944`, `ws://127.0.0.1:9988`and `ws://127.0.0.1:9989` in https://parachain.robonomics.network/

![relay](https://ipfs.io/ipfs/QmR9Tj86yPkrXQsSwereJwqDxsZgkAdySB16G4SMHrhpBu/upcoming.png)

Some time ago parachains should be registered.

![relay2](https://ipfs.io/ipfs/QmR9Tj86yPkrXQsSwereJwqDxsZgkAdySB16G4SMHrhpBu/parachains.png)

And start to produce blocks.

![relay3](https://ipfs.io/ipfs/QmR9Tj86yPkrXQsSwereJwqDxsZgkAdySB16G4SMHrhpBu/parachains2.png)

As next step let's create HRMP channel to pass messages between parachains. I'll use `sudo` module call on relay chain page.

![hrmp](https://ipfs.io/ipfs/QmR9Tj86yPkrXQsSwereJwqDxsZgkAdySB16G4SMHrhpBu/hrmp.png)

When channel created, the XCM calls is available. Let's use `datalogXcm` pallet - a XCM version of `datalog` pallet.

![datalogXcmSend](https://ipfs.io/ipfs/QmR9Tj86yPkrXQsSwereJwqDxsZgkAdySB16G4SMHrhpBu/datalogXcmSend.png)

As result message on second parachain will call `datalog` pallet and write data on chain.

![datalogXcmRecv](https://ipfs.io/ipfs/QmR9Tj86yPkrXQsSwereJwqDxsZgkAdySB16G4SMHrhpBu/datalogXcmRecv.png)

As result, this example demonstrate how XCM could be used for cross chain usage of standard robonomics pallets.
