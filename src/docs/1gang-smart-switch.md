---
title: 1 Gang Smart Switch
contributors: [nakata5321]
---
This article will show you the process of setting up the 1 Gang Smart Switch.

{% roboWikiNote {type: "warning"}%}All devices from Robonomics can be purchased on the official [website](https://robonomics.network/devices/).{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTWhDu1PdQgR1ZuLuGpEtYG8uMm8eiWLziK1zLupQwU2i', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Step 1 — Flashing {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%}All devices from Robonomics come pre-flashed out of the box. However, since all devices are development kits, the instructions will cover the option of flashing the device from scratch. If you do not wish to do this now, proceed to [**Step 2 - Access Point**](/docs/ir-controller/#step2).
{% endroboWikiNote %}


Take the device from the box and connect it to the computer. Then go to the website [webflasher.robonomics.network](https://webflasher.robonomics.network/). This is the web flasher.

{% roboWikiVideo {videos:[{src: 'QmVWmGSnvGwQ3dQfZC8iM5KHBoGpaWVXXUjNuNesULQrGw', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Note! Web flasher is working only with Google Chrome or Microsoft Edge browser.{% endroboWikiNote %}

In "Firmware" drop-box choose **"SWS-1G-E-11-23"** option and next in "SELECT CHIP" choose **"ESP32"**. Press **"CONNECT"** button.
A popup window will appear where you should select the serial port to which the device is connected (usually it's `/ttyUSB0`). Then choose **"INSTALL SWS-1G-E-11-23"**.
On next window, you can make **CLEAR INSTALLATION** by check **ERASE DEVICE**. Press Next and then Install. Wait until firmware to upload to Smart switch device.

After finishing the installation process, a Wi-Fi configuration popup will appear. Provide Wi-Fi credentials.

After setting up Wi-Fi, you can visit the device via **VISIT DEVICE** button. Later, you can visit device via it's IP address in the network. To find it you can use [Fing mobile app](https://www.fing.com/products) or
[nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Skip **Step 2 — Access Point** and go to [**Step 3 — Configuration**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Step 2 — Access Point {% endroboWikiTitle %}

If you take the Smart switch from the box and connect it to the power supply, it will create a hotspot with the name "robonomics-XXXXXXX". Connect to it.
A configuration window should open. If not, open a web-browser and go to `192.168.4.1` page.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"image"} %}{% endroboWikiPicture %}

Provide Wi-Fi credentials. After that, the Smart switch device will connect to Wi-Fi network. Check the device via it's IP address in the network. To find it you can use [Fing mobile app](https://www.fing.com/products) or
[nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Step 3 — Configuration {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

Go to **"Configuration"**->**"Configure other"**. In **"Template"** string insert next:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-1L-Switch","GPIO":[1,1,1,1,1,1,1,1,1,576,1,1,1,1,3200,5440,0,1,224,1,0,0,320,1,0,0,0,0,1,1,1,32,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}


Verify that checkbox **"Activate"** and **"MQTT Enable"** is enabled. If not, enable it and press Save button.

Return to the main menu and go to **"Configuration"** -> **"Configure MQTT"**.
Provide your MQTT credentials here:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"image"} %}{% endroboWikiPicture %}

That's all with ESP for now. The next step is to install the Home Assistant integration.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Step 4 — Integration setup {% endroboWikiTitle %}

This article assumes, that you have Home Assistant. To connect Smart Switch device to Home Assistant, you need to install Tasmota integration.

{% roboWikiVideo {videos:[{src: 'QmQw6aA5e7UqT1hZrAV8m1UPq1rWCgLsWcVufuxitQm84p', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Basically, Home Assistant will discover Tasmota integration automatically. But if not, add it manually.
That's all. Now you can add switch entity to the dashboard.


{% roboWikiNote {type: "warning"}%}All devices from Robonomics can be purchased on the official [website](https://robonomics.network/devices/).
{% endroboWikiNote %}