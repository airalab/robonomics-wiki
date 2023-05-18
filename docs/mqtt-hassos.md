---
title: MQTT Broker for Home Assistant OS
contributors: [LoSk-p]
tools:
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - Mosquitto Broker Home Assistant Addon 6.1.3
    https://github.com/home-assistant/addons/tree/master/mosquitto
---

**This article describes how to install MQTT broker to Home Assistant OS.**

<robo-wiki-picture src="home-assistant/mqtt_broker_os.png" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmaoaTBu3KqwC8NKRSopmF3KQ5BYL8skEfYJjXypcJNdNL', type:'mp4'}]" />

1. We will use [Mosquitto](https://mosquitto.org/) MQTT broker. In the Add-on Store find the `Mosquitto broker` add-on, press on it and press `INSTALL`. 

2. After installation go to `Configuration` tab and add `USERNAME` and `PASSWORD` for the broker in `Logins` section in the following format:

<code-helper copy additionalLine="Mosquitto Broker Options">

```
- username: 'USERNAME'
  password: 'PASSWORD'
```

</code-helper>

<robo-wiki-note type="warning">
  
  Make sure you save your credentials securely, you will need them in the next steps.
  
</robo-wiki-note>

3. Save the configuration and go to the `Info` tab to start the add-on.

Continue MQTT setup with the [**MQTT Integration Setup**](/docs/mqtt-integration) article.
