---
title: DApp Usage

contributors: [nakata5321]
translated: true
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - Dapp Robonomics Network 
    https://github.com/airalab/dapp.robonomics.network
  - Home Assistant 2022.8.2
    https://github.com/home-assistant/core
  - Robonomics integration 1.1.0
    https://github.com/airalab/homeassistant-robonomics-integration
---

After finishing with ["Robonomics integration setup"](/docs/add-smart-device-to-robonomics/), all options of our DApp will be available for you.
For now, you can get telemetry of all your sensors and send **launch** to device. Let's start with telemetry.

## SmartHome Telemetry

Go to DApp and  choose ["SmartHome Telemetry"](https://dapp.robonomics.network/#/smarthome-telemetry) service. You should see the next:

<robo-wiki-picture src="home-assistant/telemetry-start.jpg" />

First, choose the `SUB_OWNER` account in the first drop-down list at the top of page. In the "Controller" field 
find the address of `SUB_CONTROLLER` from the drop-down list.
Insert the **Seed phrase** to encrypt data.

Next, in the "Get telemetry" block choose a timestamp from the drop-down list and press the "download telemetry" button.

<robo-wiki-picture src="home-assistant/datalog-time.jpg" />

Telemetry downloading could take some time. After finishing, you will see the information from your sensors:

<robo-wiki-picture src="home-assistant/telemetry.jpg" />

That's all.


<!---
## Launch devices

Go back and  choose service ["SmartHome Telemetry"](https://dapp.robonomics.network/#/services). You will forward to DApp website. In first login give permission to website to use polkadot{.js} extension. You will see next:

<robo-wiki-picture src="home-assistant/telemetry-start.jpg" />

Find address of your `user` account and press blue button:

<robo-wiki-picture src="home-assistant/datalog-start.jpg" />

And you will see popup "Launch" window:

<robo-wiki-picture src="home-assistant/launch-window.jpg" />

Launch command calls HomeAssistant service, first two fields are **service name** - "Platform" and **service function** - "Name". Let's find them.

For this go to your Home Assistant interface in browser -> `Developer tools` -> `SERVICES` and turn on `YAML mode`.

<robo-wiki-picture src="home-assistant/ha-services.jpg" />

Find a service you need using a search field or choose from a drop-down list there.

<robo-wiki-picture src="home-assistant/ha-light.jpg" />

Let's find a `light` service. You will see available functions(`turn_on`, `turn_off`, `toggle`). Choose `turn_on` function.

<robo-wiki-picture src="home-assistant/ha-light-on.jpg" />

On the picture you see **service name** - `light` and **service function** - `turn_on`. Write these statements to popup window of DApp.

<robo-wiki-picture src="home-assistant/light-window.jpg" />

Next you need to find the sensor ID. For this go to `Overview` on the HA page. Find sensor, which you want to turn on(in this example it is the light) and press on it. 

<robo-wiki-picture src="home-assistant/light-name.jpg" />

You will see a popup window and with a "settings" button on it the top-right corner. Press on it. The popup window will change. In the new window you will find required `entity_id`:

<robo-wiki-picture src="home-assistant/entity-ha.jpg" />

Copy it and paste to field in our dapp:

<robo-wiki-picture src="home-assistant/dapp-entity.jpg" />

Finally, press `SEND` button and sign transaction with your password. Wait until transaction is in block and check your light. It should be turned on (sometimes it takes a bit more time).

Congratulations, You have fully installed and set up Your Home Assistant with Robonomics!
-->
