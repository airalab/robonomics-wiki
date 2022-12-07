---
title: MQTT Broker for Home Assistant OS
contributors: [LoSk-p]
tools:
  - Home Assistant 2022.11.4
    https://github.com/home-assistant/core
---

**This article describes how to install MQTT broker to Home Assistant OS.**

We will use [Mosquitto](https://mosquitto.org/) MQTT broker. In the Add-on Store find the `Mosquitto broker` add-on:

<robo-wiki-picture src="home-assistant/mosquitto-addon.jpg" />

Press on it and press `Install`. After installation go to `Configuration` tab and add `USERNAME` and `PASSWORD` for the broker in `Logins` section in the following format:

<code-helper copy additionalLine="Mosquitto Broker Options">

```
- username: USERNAME
  password: PASSWORD
```

</code-helper>

<robo-wiki-note type="warning">
  
  Make sure you save your credentials securely, you will need them in the next steps.
  
</robo-wiki-note>

<robo-wiki-picture src="home-assistant/mosquitto-addon-conf.jpg" />

Save the configuration and go to the `Info` tab to start the add-on.

<robo-wiki-picture src="home-assistant/mosquitto-addon-start.jpg" />

Continue MQTT setup with the [**MQTT Integration Setup**](/docs/mqtt-integration) article.