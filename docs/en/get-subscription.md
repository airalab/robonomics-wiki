---
title: How to Buy a Subscription

contributors: [LoSk-p, PaTara43]
translated: true
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Paying commissions for transactions in blockchain is annoying. Imagine an IoT device which sends telemetry every 5-10 
minutes. This will make you pay quite a lot through month. One of the key features of Robonomics Network is RWS - Robonomics
Web Service subscription. Pay monthly and forget about transaction cost! For theoretical background refer to 
[this](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) article.**

<robo-wiki-note type="warning" title="Parachain">

  Pay attention that this tutorial demonstrates buying a subscription on Robonomics Kusama parachain. You can also perform
  all the same steps on your [local node](/docs/run-dev-node).

  One more thing before start. This is a "hard" way of buying a subscription. There is a conventional way to do this through
  [Robonomics DApp](https://dapp.robonomics.network/#/).

</robo-wiki-note>

## Bid an Auction

The subscriptions in Robonomics are sold with an auction model. To get one, you need to bid an auction and win it (no worries, it's fast).

In `Developer/Chain state` you can see available auctions. 
Choose `rws` and `auctionQueue` and press `+` button, you will see IDs of available auctions:

![queue](../images/rws/queue.png)

You can see an information about any subscription with `rws` `auction` and ID of auction (the auction's ID in the picture is 79):

![auction](../images/rws/auction.png)

In the information about the auction you can see `winner` field, at the moment it is `null` so nobody has this subscription
and you can get it. For that go to `Developer/Extrinsic`, choose your account and `rws -> bid`. Also set auction ID (79) and 
the amount of units to bid (more than 1000000000 Wn):

![bid](../images/rws/bid.png)

Submit the transaction and check the information about the auction with ID 79 (in `Chain state` choose `rws -> auction` and ID 79):

![win](../images/rws/auc_win.png)

Now in `winner` field you will see your account address, it means that this account has the subscription 79. An auction
starts with the first bid and lasts a few blocks, so if somebody bids more tokens than you in the next few blocks this one 
will be the winner and will take the subscription.

Now you can add devices. Devices are accounts that are able to use this subscription and submit extrinsics with no fee.
To test it create a new account with no tokens and add it to devices. 

To add devices choose `rws -> setDevices` in `Developer/Extrinsic`. Then press `Add Item` button and choose recently
created account with no tokens:

![set_devices](../images/rws/set_devices.png)

Submit the transaction. Now you can check the list of devices in `Chain state` with `rws -> devices`. There you will
see the address of your account without tokens. Choose the account that has bought the subscription and press `+`:

![devices](../images/rws/devices.png)

Now you can try to [send launch](/docs/subscription-launch) extrinsic using the subscription.