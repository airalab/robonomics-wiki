# Robonomics IO Datalog

Datalog module allows you to store any string on blockchain

## Requirements

* `robonomics` [executable](https://github.com/airalab/robonomics/releases)
* Account on parachain 

> You can find instructions on how to create an account [here](/docs/rio-launch/#create-an-account)

## Write

Assuming local node is running:

```
% echo "Hello Robonomics" | ./robonomics io write datalog -s 0xb046fc3c322e91e14a61ad4f08a3809ee0de7092e73aa9b3c2b642a0f476d4d6
e3fd721000cf7b848c56ce36958f14f509307369eeb6494659aef633e46623b8
```

where `0xb046fc3c322e91e14a61ad4f08a3809ee0de7092e73aa9b3c2b642a0f476d4d6` is a private key for the account with tokens.
In this example the public key is 5H3iRnX16DH2sb2RLxMM8UhDZTvJjP84EhhKXv3sCiEDq6bH. Let's go to the [Dapp](https://parachain.robonomics.network/)
and see what happened.

In the Dapp go to Developer -> Chain state. In the "selected state query" list choose datalog and below choose your account. Click plus button on the right and you should see the following:

![Robonomics Chain State Datalog](./images/robonomics-dapp-chain-state-datalog.jpg "Robonomics Chain State Datalog")

