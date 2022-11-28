---
title: Global Administration

contributors: [nakata5321]
translated: true
---

This article will provide you to how to set up a new user to your Home Assistant.

## Use DApp

Now it's time to create a new user for your Home Assistant. People, who uses Home Assistant, shouldn't use `SUB_OWNER` or `SUB_CONTROLLER` accounts, because,
as said [earlier](/docs/sub-activate/) they provide security. Also, you can't use user, 
which you created af first start of Home Assistant, because this user don't have account in Robonomics Parachain.

Let's create an account, as we did in the previous [article](/docs/sub-activate/). 
Add this account to the subscription [here](https://dapp.robonomics.network/#/subscription/devices). Now there should be three addresses in the access list - `SUB_OWNER`, `SUB_CONTROLLER` and `user`.

<robo-wiki-picture src="home-assistant/user.jpg" />

Then go to the Dapp service [**"HomeAssistant Account"**](https://dapp.robonomics.network/#/home-assistant). Choose account, 
you've just created at the right sidebar (check that you have chosen the intended account by pressing the profile icon).
Then enter the `USER` seed in the required field. In the next two raws type in `SUB_OWNER` and `SUB_CONTROLLER` addresses:

<robo-wiki-picture src="home-assistant/acc-pass.jpg" />

If everything right, you will see ** 3. Verification status ** - `Verified`.

Create a password for a new HA user which you have just registered. Type the passport below `Your Home Assistant password` and click "create password". Confirm transaction. (Later you can restore it in "restore" tab.)

<robo-wiki-picture src="home-assistant/password.jpg" />

It’s free now since the accounts are using RWS subscription. After the registration process, you can log in to Home Assistant with your address as `login` and a newly-created password. Go to login page and login:

<robo-wiki-picture src="home-assistant/acc-login.jpg" />

That's all. 

Check ["SmartHome Telemetry"](/docs/use-dapp/) article to get data about your home through the Robonomics.