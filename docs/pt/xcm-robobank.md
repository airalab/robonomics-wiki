---
title: Substrate Cumulus Parachain Testsuite for cross-chain messaging 
locale: 'pt' 
contributors: [ddulesov, boogerwooger, tubleronchik] 
translated: true 
---


The main goal of this project is the simplification of parachain runtime development, when cross-chain messages are used. 
It allows the development of runtime code with integration tests with high degree of repeatability and simple usage.
It automates building, construction of pre-set network configuration (i.e. 1 relay chain + 2 parachains), setup message-passing channels between parachains and run messaging tests, sending messages, using call to runtime, all constructed and composed in Python.

XCM Testsuite is used for testing the production cycle of Robobank - the set of Substrate pallets, which allow robots to register on external parachains, receive pre-paid orders, execute them and receive payments using external tokens. This allows robots to operate inside the Robonomics network with all required infrastructure, but at the same time, offer their services on any other parachain.

An example video is available on [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)

The main steps in the demo scenario are:
- launch relay chain and two parachains in a pack of 6 processes
- setup XCM message channels between parachains
- register a robot in both parachains
- create an order for this robot in the client parachain (reserving payment for the completion of order)
- send XCM message to the Robonomics parachain
- creating the "mirrored" order record on the Robonomics parachain
- robot accepts the order on the Robonomics parachain
- send XCM message about the order acceptance back to the client parachain
- accept the order on the client parachain (reserving a penalty fee for lack-of-order-completion until the order deadline)
- robot completes the order on the Robonomics parachain
- send XCM message about the order completion to the client parachain
- settle all payments (client payment is transfered to the robot, as well as the unutilized penalty fee)
- close the order1


## Upstream
This project is a fork of the
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
It contains code of the runtime pallets being tested.
As in original node code of the parachains is in "./pallets", "./runtime", "./node" catalogs.

Differences with original "substrate-node-template":
- this collator runtime has HRMP handler module and can handle messages from siblings parachains
- mock test runtime ready-made for internal XCM tests

## Build & Run
Recommended(highly) setup: 
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[NOTE] The first build can take a lot of time, up to several hours on suboptimal machines.

[NOTE] The script works with the FIXED versions (commit hashes) of Polkadot(Rococo) in relay chain and parachains.

[NOTE] By default the script re-creates the same environment every launch, by removing all previous states. This behaviour can be changed in "config.sh" using "PERSISTENT" param.


Run build and setup script.  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

Basic actions of "init.sh" script:
 - read config (file "config.sh" with revision number, initial node keys and identifiers, chaindata persistence param, etc.)
 - setup OS packets, Rust and Python
 - bulds separate binaries for the relay chain and also for both parachains
    - binaries will be generated in ./bin subdirectory. 
 - (optional) removes all previous chain data for all chains
    - disabled if "PERSISTENT=1" is set in "config.sh"
 - runs as separate processes (with separate PIDs and I/O pipes):
    - validators of relay chain (i.e. 4 validators of running a stable Rococo revision)
    - collators for parachain-100 (i.e. single collator for first parachain, that you're developing)
    - collators for parachain-200 (i.e. single collator for second parachain, that you're developing)
 - prints all endpoints, ports to console, allowing you to study any chain using frontend apps (explorer, DApp)
 - keep printing all the output data of all chains to console

[WARNING] After launching, wait until the network is up, make sure that block finalization has started, and that the parachains are registered. These processes should require approximately 5 min (50 blocks x 6 sec).

## Checking that initial setup works 

Use the standard Polkdot frontend and generated "--ws-port" endpoints to connect with each node.
Open [Polkadot application](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/) to monitor the chains. 

### Example:
Localhost, 4 relay chain validators, one parachain-100 collator, one parachain-200 collator:
- [Relay validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)


If everything works, and consensus started off, we can proceed to run our test cases (in a new terminal).

### UMP message passing test
```bash
./scripts/init.sh ump
```
It creates a `Balance.transfer` message in `parachain-100` and passes it to the relay chain.
When the relay chain receives the message it will transfer 15 tokens from `para 100` account to the Charlie acount.


### HRMP message passing test
```bash
./scripts/init.sh ump
```

It creates a `Balance.transfer` message in `parachain-100` and passes it to the `sibling 200` one.
Before that, it endows the`subl 100` account with 1000 tokens and  establish a communication channel between the parachains.
```bash
./scripts/init.sh hrmp
```
Next messages can be sent by running the `hrmpm` subcommand. It doesn't create a channel and so it runs faster.
```bash
./scripts/init.sh hrmpm
```

### More options
```bash
./scripts/init.sh help
```

## Local Testnet

### Create customized chain spec
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

Edit rococo_local.json, replace the balances and authorities parameters with yours.
```json
  "keys": [
    [
      "",
      "",
      {
        "grandpa": "",
        "babe": "",
        "im_online": "",
        "para_validator": "",
        "para_assignment": "",
        "authority_discovery": ""
      }
    ]
```

Polkadot address for //Alice//stash (sr25519 cryptography).
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
Secret Key URI `//Alice//stash` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Polkadot grandpa session key for //Alice (ed25519 cryptography).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Polkadot address for //Alice (sr25519 cryptography).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Convert rococo_local.json to the raw format.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
To use new chain spec replace rococo.json file in ./config/ directory this new one and rerun chain.
```bash
./scripts/init.sh run
```
You can freely edit the code. The above command will rebuild the project and update the collator node before starting.
Cumulus is pre-release software that is still under heavy development.
We are using a specific commit of polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18 mar 2021] (https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)

You can use more recent versions of the software. To do this, change  POLKADOT_COMMIT  in ./scipt/config.sh
to the latest commit of `rococo-v1` branch, delete ./bin/polkadot, and run 
```bash
./scripts/init.sh run
```

Update collator project dependencies 
```bash
cargo update
./scripts/init.sh build
```
Some dependencies probably require new rust toolchain features. This project is based on rust `nightly-2021-01-26`
Update rust toolchain version in ./scripts/config.sh before build.

## Hack parachain
[Add external pallet](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - should it probably be in "learn more"?
## Learn More

Refer to the upstream
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)
to learn more about the structure of this project, the capabilities it encapsulates and the way in
which those capabilities are implemented. You can learn more about
[The Path of Parachain Block](https://polkadot.network/the-path-of-a-parachain-block/) on the
official Polkadot Blog.
[Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)
