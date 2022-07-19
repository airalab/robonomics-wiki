---
title: Substrate Cumulus Parachain Testsuite for cross-chain messaging 
locale: 'ko' 
contributors: [ddulesov, boogerwooger, tubleronchik] 
translated: false 
---


Main goal of this project is simplification of parachain runtime development, when cross-chain messages are used. 
Allows to develop runtime code with integration tests with high repeatablility and simple usage.
Automates building, construction of pre-set network configuration (f.e. 1 relay chain + 2 parachains), setup message-passing channels between parachains and running tests, sending messages, using call to runtime, constructed and composed in Python.

XCM Testsuite is used for testing production cycle for Robobank - the set of Substrate pallets, allowing robots to register in external parachains, receive pre-paid orders, execute them and receive payments using external tokens. This allows robots to operate inside Robonomics network with all needed infrastructure, but, in the same time, offer their services in any external parachain.

Video example is available on [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)

The demo scenary main steps are:
- launch relay chain and two parachains in pack of 6 processes
- setup XCM messages channels between parachains
- register a robot in both parachains
- create order for this robot in client parachain (reserving payment for completion of order)
- send XCM message to Robonomica
- creating "mirrored" order record in Robonomica parachain
- accept order by robot in Robonomica
- send XCM message about order acceptance back to client parachain
- accept order in client parachain (reserving penalty fee for no-completion of order until deadline)
- complete order by robot in Robonomica
- send XCM message about order completion to client parachain
- settle all payments (client payment is transfered to robot, as well as penalty fee)
- close order


## Upstream
This project is a fork of the
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
Contains code of runtime pallets being tested.
As in original node code of parachains is in "./pallets", "./runtime", "./node" catalogs.

Differences with original "substrate-node-template":
- this collator runtime has HRMP handler module and can handle messages from siblings parachains
- mock test runtime ready-made for internal XCM tests

## Build & Run
Recommended(highly) setup: 
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[NOTE] First build can take a lot of time, up to several hours on weak machines

[NOTE] Script works with FIXED versions (commit hashes) of Polkadot(Rococo) in relay chain and parachains

[NOTE] By default script re-creates same environment every launch, by removing all previous states. this behaviour can be changed in "config.sh" using "PERSISTENT" param


Run build and setup script.  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

Basic actions of "init.sh" script:
 - read config (file "config.sh" with revision number, initial node keys and identifiers, chaindata persistence param, etc)
 - setup OS packets, Rust and Python
 - bulds separate binaries for relay chain and for both parachains
    - binaries will be generated in ./bin subdirectory. 
 - (optional) removes all previous chain data for all chains
    - disabled if "PERSISTENT=1" is set in "config.sh"
 - runs as separate processes (with separate PIDs and I/O pipes):
    - validators of relay chain (f.e. 4 validators of some stable Rococo revision)
    - collators for parachain-100 (f.e. single collator for first parachain, that you're developing)
    - collators for parachain-200 (f.e. single collator for second parachain, that you're developing)
 - prints all endpoints, ports to console, allowing to study any chain using frontend apps (explorer, DApp)
 - keep printing all output of all chains to console

[WARNING] After launch, wait until a network is up, make sure that blocks finalization started, and parachains are registered. These processes require approximately 5 min (50 blocks x 6 sec ).

## Checking if all works 

Use standard Polkdot frontend and generated "--ws-port" endpoints to connect with each node.
Open [Polkadot application](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/) to monitor the chains. 

### Example:
Localhost, 4 relay chain validators, one parachain-100 collator, one parachain-200 collator:
- [Relay validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)


If everything works, consensus started off, we can proceed to run test cases (in a new terminal)

### UMP message passing test
```bash
./scripts/init.sh ump
```
It creates `Balance.transfer` message in `parachain-100` and passes it to relay.
When relay receives message it will transfer 15 tokens from `para 100` account to the Charlie's.


### HRMP message passing test
```bash
./scripts/init.sh ump
```

It creates `Balance.transfer` message in `parachain-100` and passes it to `sibling 200` one.
Before that, it endows `subl 100` account with 1000 tokens and  establish a channel between the parachains.
```bash
./scripts/init.sh hrmp
```
Next messages can be sent by running `hrmpm` subcommand. It doesn't create a channel and so it runs faster.
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

Edit rococo_local.json, replace balances and authorities with yours.
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
You can freely edit code. The above command will rebuild project and update collator node before start.
Cumulus is pre-release software that is still under heavy development.
We are using a specific commit of polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18 mar 2021] (https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)

You can use more recent version of software. For this change  POLKADOT_COMMIT  in ./scipt/config.sh
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