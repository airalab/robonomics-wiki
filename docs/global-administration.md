---
title: Global Administration

contributors: [nakata5321, Fingerling42, LoSk-p]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**This article will show you how to set up a new user to your Home Assistant.**

## Adding Users to Subscription

You cannot use previously created accounts because `OWNER` and `CONTROLLER` provide security, and the first user you created when you first started Home Assistant does not have a Robonomics Parachain account.

1. Create an account on Robonomics parachain, as you did in the [previous article](/docs/sub-activate/).

2. Using `OWNER` account add new user account to the subscription on the `SETUP A SUBSCRIPTION` page in [Robonomics DApp](https://robonomics.app/#/rws-setup). Now in `USERS IN SUBSCRIPTION` section should be three addresses in the access list: `OWNER`, `CONTROLLER` and `USER`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.art/ipfs/QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type:'mp4'}]" />


## RWS Setup JSON File

If the user doesn't have `CONTROLLER` credentials (normally he shouldn't), the administrator should give him a JSON file with the information of the RWS Setup.

### Create RWS Setup JSON

Administrator can create JSON file for his setup in [SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup) page using `Download import for other users` button.

<robo-wiki-picture src="home-assistant/download_rws_setup_json.png" />

### Import RWS Setup

Now with this JSON file user can import RWS setup using `IMPORT SETUP` button.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.art/ipfs/QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type:'mp4'}]" />

## Granting Access to User

On the same page ([SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup)) you can set the password for the new user.

1. Choose the account you've just created at the right sidebar (check that you have chosen the intended account by pressing the profile icon).

2. Enter the `USER`'s address and seed phrase in the required fields.

3. Fill in a password and then confirm the transaction by the `CREATE PASSWORD` button, that will now be without fee due to the subscription.

4. After the registration process, log in to Home Assistant with your user address as login and a newly-created password.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.art/ipfs/Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type:'mp4'}]" />

Now you can use the dapp to control your home through Robonomics, check [**"Get Smart Home Telemetry"**](/docs/smart-home-telemetry/) article.

