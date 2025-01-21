---
title: Virtual Devices

contributors: [nakata5321]
---

**If you don't have physical devices, this article will explain you how to create virtual devices in a smart home, so you can see what the actual platform looks like.**

{% roboWikiPicture {src:"docs/home-assistant/virtual-sensors.png", alt:"virtual sensor"} %}{% endroboWikiPicture %}

## Install integration

{% roboWikiNote {type: "warning", title: "Important Information" }%} This article will be useful to you if you do not have any devices that can be connected to a smart home. To go through further tutorials on this wiki, you will need at least virtual devices. {% endroboWikiNote %}

To use virtual devices you need to install ["demo" integration](https://www.home-assistant.io/integrations/demo/). To do this, you should edit your configuration file.

Go to the configuration folder, which you provided during the configuration process. In this folder, you will find a folder named "homeassistant". Go inside it. Open the `configuration.yaml` file with a text editor under the **root** user and insert the following line into it:

{% codeHelper { copy: true}%}

```
...
# Example configuration.yaml entry
demo:
...
```

{% endcodeHelper %}


After that, restart Home Assistant via web interface. When the smart home restarts, you can find all virtual devices in the "demo" entities. Find them in `Settings -> Devices & services -> Demo`. All these entities can be added to your dashboard.

{% roboWikiPicture {src:"docs/home-assistant/demo-entities.png", alt:"demo-entities"} %}{% endroboWikiPicture %}
