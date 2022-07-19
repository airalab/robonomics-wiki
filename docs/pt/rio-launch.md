---
title: Robonomics IO Launch
locale: 'pt' 
contributors: [Vourhey, PaTara43]
translated: true
---

A simple way to turn on and off an IoT device or a robot. Basically sending "ON" will result in `true` state for a device, anything else will result in `false`.

For the examples the development network is used. Check [this](/docs/robonomics-test-network-manual/) out to set it up for yourself.

## Requirements

* `robonomics` [executable](https://github.com/airalab/robonomics/releases)
* Accounts on parachain

You can find instructions on how to create an account [here](/docs/create-account-in-dapp)

## Usage

To see the result of transaction first of all run `read` part:

```
% ./robonomics io read launch
```

Now let's turn a robot on:

```
% echo "ON" | ./robonomics io write launch -r 5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL -s 0xb046fc3c322e91e14a61ad4f08a3809ee0de7092e73aa9b3c2b642a0f476d4d6
```

Then you should see in the first terminal window:

```
% ./robonomics io read launch
5H3iRnX16DH2sb2RLxMM8UhDZTvJjP84EhhKXv3sCiEDq6bH >> 5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL : true
```

Let's describe all the accounts and options above.

* `-r 5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL` means robot's address
* `-s 0xb046fc3c322e91e14a61ad4f08a3809ee0de7092e73aa9b3c2b642a0f476d4d6` private key of the account to launch from (must have tokens for a transaction)
* `5H3iRnX16DH2sb2RLxMM8UhDZTvJjP84EhhKXv3sCiEDq6bH` address that launches a robot
* `true` turn it on

If we pass anything else but "ON" the state becomes `false`

## Remote
If your local node is configured differently from defaults or you have a remote node, it's possible to specify it with `--remote` option

```
% echo "ON" | ./robonomics io write launch -r 5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL -s 0xb046fc3c322e91e14a61ad4f08a3809ee0de7092e73aa9b3c2b642a0f476d4d6 --remote https://ipfs.infura.io:5001/
```

and

```
% ./robonomics io read launch --remote https://ipfs.infura.io:5001/
```
