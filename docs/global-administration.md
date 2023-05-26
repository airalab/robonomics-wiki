---
title: Global Administration

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

**This article will show you how to set up a new user to your Home Assistant.**

## Adding Users to Subscription

You cannot use previously created accounts because `SUB_OWNER` and `SUB_CONTROLLER` provide security, and the first user you created when you first started Home Assistant does not have a Robonomics Parachain account.

1. Create an account on Robonomics parachain, as you did in the [previous article](/docs/sub-activate/).

2. Using `SUB_OWNER` account add new user account to the subscription in the [dapp](https://dapp.robonomics.network/#/subscription/devices). Now there should be three addresses in the access list: `SUB_OWNER`, `SUB_CONTROLLER` and `USER`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmSxzram7CF4SXpVgEyv98XetjYsxNFQY2GY4PfyhJak7H', type:'mp4'}]" />


## Granting Access to User

1. Go to the dapp service called [Home Assistant Account](https://dapp.robonomics.network/#/home-assistant). Choose the account you've just created at the right sidebar (check that you have chosen the intended account by pressing the profile icon).

2. Enter the `USER` seed in the required field. Add `SUB_OWNER` and `SUB_CONTROLLER` addresses in the administrator credits fields. If everything is correct, you will see verification status `VERIFIED`.

3. Create a password for a new user which you have just registered and then confirm the transaction, that will now be without fee due to the subscription. Later you can restore the password in the Restore tab.

4. After the registration process, log in to Home Assistant with your user address as login and a newly-created password.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmW2TXuwCYXzgcRfEUx4imZU5ZerEzkuD5P53u9g2WnxDh', type:'mp4'}]" />

Now you can use the dapp to control your home through Robonomics, check [**"Get Smart Home Telemetry"**](/docs/smart-home-telemetry/) article.
