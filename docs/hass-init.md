---
title: Home Assistant Init
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

**With Home Assistant installed, it’s time to configure it.**

## Configuration

Here you will create the owner account of Home Assistant. 
This account will be an administrator and will always be able to change everything. Open web browser and go to 
`http://%RASPBERRY_IP_ADDRESS%:8123`(RASPBERRY_IP_ADDRESS you have found in previous [article](/docs/hass-install-image)).

<robo-wiki-note type="note">Raspberry Pi address may change in time, due router settings</robo-wiki-note>

At the first page, enter a name, username, password and click on “create account”.

<robo-wiki-picture src="home-assistant/username.jpg" alt="create user" />


Next, you can enter a name for your home and set your location and unit system. Click “DETECT” to find your location and set your time zone and unit system based on that location.
If you’d rather not send your location, you can set these values manually.

<robo-wiki-picture src="home-assistant/location.jpg" alt="set location" />

Once you are done, click Next. In this screen, Home Assistant will show any devices that it has discovered on your network.
Don’t be alarmed if you see fewer items than what is shown below; you can always manually add devices later.

<robo-wiki-picture src="home-assistant/add-devices.jpg" alt="additional devices" />

Finally, click Finish. Now you’re brought to the Home Assistant web interface.
This screen will show all of your devices. So let’s get that screen filled up! Proceed to [MQTT setup](/docs/mqtt-setup)
to add MQTT integration and then - new devices!.
