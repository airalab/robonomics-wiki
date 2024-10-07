---
title: Energy Monitoring
contributors: [nakata5321]
---
This article will show you the process of setting up the Energy Monitoring.

{% roboWikiNote {type: "warning"}%} All devices from Robonomics can be purchased on the official [website](https://robonomics.network/devices/).
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Step 1 — Flashing {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} All devices from Robonomics come pre-flashed out of the box. However, since all devices are development kits, the instructions will cover the option of flashing the device from scratch. If you do not wish to do this now, proceed to [**Step 2 - Access Point**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

Take the device from the box and connect it to the computer. Then go to the website [webflasher.robonomics.network](https://webflasher.robonomics.network/). This is the web flasher.

{% roboWikiVideo {videos:[{src: 'QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Note! Web flasher is working only with Google Chrome or Microsoft Edge browser.
{% endroboWikiNote %}

In "Firmware" drop-box choose **"ENERGY MONITOR"** option and next in "SELECT CHIP" choose **"ESP32-S3"**. Press **"CONNECT"** button.
A popup window will appear where you should select the serial port to which the device is connected (usually it's `/ttyUSB0`). Then choose **"INSTALL ENERGY-MONITOR_EN"**.
On next window, you can make **CLEAR INSTALLATION** by check **ERASE DEVICE**. Press Next and then Install. Wait until firmware to upload to Energy Monitoring device.

After finishing the installation process Wi-Fi configuration popup will appear. Provide Wi-Fi credentials.

After setting up Wi-Fi you can visit device via **VISIT DEVICE** button. Later you can visit device via it's IP address in the network. To find it you can use [Fing mobile app](https://www.fing.com/products) or
[nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Skip **Step 2 — Access Point** and go to [**Step 3 — Configuration**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Step 2 — Access Point {% endroboWikiTitle %}

If you take Energy monitor from the box and connect it to the power supply, it will create hotspot with name "robonomics-XXXXXXX". Connect to it. Configuration window should open. If not, open web-browser and go to `192.168.4.1` page.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Provide Wi-Fi credentials. After that, the Energy Monitoring device will connect to the Wi-Fi network. Check the device via it's IP address in the network. To find it you can use [Fing mobile app](https://www.fing.com/products) or
[nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Step 3 — Configuration {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Go to **"Configuration"**->**"Configure other"**. In **"Template"** string insert next:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```

{% endcodeHelper %}

Verify that checkbox **"Activate"** and **"MQTT Enable"** is enabled. If not, enable it and press Save button.

Return to "main menu" and go to **"Configuration"** -> **"Configure MQTT"**.
Provide your MQTT credentials here:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

That's all with ESP for now. The next step is to install the Home Assistant integration.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Step 4 — Integration setup {% endroboWikiTitle %}

This article assumes, that you have Home Assistant. To connect Energy Monitoring device to Home Assistant, you need to install "Tasmota" integration.

{% roboWikiVideo {videos:[{src: 'QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Basically, Home Assistant will discover "Tasmota" integration automatically. But if not, add it manually.

{% roboWikiPicture {src:"docs/energymeter/HA.jpg", alt:"energymeter-ha"} %}{% endroboWikiPicture %}

That's all. Now you can add energy entities to the dashboard.

{% roboWikiNote {type: "warning"}%} All devices from Robonomics can be purchased on the official [website](https://robonomics.network/devices/).
{% endroboWikiNote %}