---
title: Virtual Devices

contributors: [nakata5321]
---

**This article will tell you how to create virtual devices in a smart home, so you can see what the actual platform looks like.**

## Install integration

To use virtual devices you need to install ["demo" integration](https://www.home-assistant.io/integrations/demo/). 
To do this, you should add next string to your configuration file:

Go to configuration folder, which you provide due configuration process. 
In this folder you will find folder with name "homeassistant". go inside it. 
Open `configuration.yaml` file with text editor under **root** user and insert next string in it:

<code-helper copy>

```
...
# Example configuration.yaml entry
demo:
...
```

</code-helper>

After that restart Home Assistant via web interface. When smart home will start, you can find all virtual devices in "demo"
entities. Find it in `Settings -> Devices & services -> Demo`. All this entities you can add to your dashboard.

<robo-wiki-picture src="home-assistant/demo-entities.png" />
