---
title: 能源监控
contributors: [nakata5321]
---
本文将向您展示设置能源监控的过程。

{% roboWikiNote {type: "warning"}%} 所有来自Robonomics的设备都可以在官方[网站](https://robonomics.network/devices/)上购买。
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} 步骤1 — 刷写 {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} 所有来自Robonomics的设备都是预先刷写的。但是，由于所有设备都是开发套件，说明将涵盖从头开始刷写设备的选项。如果您现在不想这样做，请继续到[**步骤2 - 接入点**](/docs/ir-controller/#step2)。
{% endroboWikiNote %}

从包装盒中取出设备并将其连接到计算机。然后转到[webflasher.robonomics.network](https://webflasher.robonomics.network/)网站。这是Web刷写工具。

{% roboWikiVideo {videos:[{src: 'QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} 注意！Web刷写工具仅适用于Google Chrome或Microsoft Edge浏览器。
{% endroboWikiNote %}

在“固件”下拉框中选择**“ENERGY MONITOR”**选项，然后在“选择芯片”中选择**“ESP32-S3”**。按下**“连接”**按钮。
将弹出一个窗口，您应该选择设备连接的串行端口（通常是`/ttyUSB0`）。然后选择**“INSTALL ENERGY-MONITOR_EN”**。
在下一个窗口中，您可以通过勾选**ERASE DEVICE**来进行**CLEAR INSTALLATION**。然后按下“下一步”和“安装”。等待固件上传到能源监控设备。

安装完成后，将出现Wi-Fi配置弹出窗口。提供Wi-Fi凭据。

设置完Wi-Fi后，您可以通过**VISIT DEVICE**按钮访问设备。稍后，您可以通过网络中的IP地址访问设备。要找到它，您可以使用[Fing移动应用](https://www.fing.com/products)或[nmap CLI工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)。

跳过**步骤2 — 接入点**，前往[**步骤3 — 配置**](/docs/ir-controller/#step3)。

{% roboWikiTitle { type:'2', anchor: 'step2'} %} 步骤2 — 接入点 {% endroboWikiTitle %}

如果您从包装盒中取出能源监控器并将其连接到电源，它将创建一个名为“robonomics-XXXXXXX”的热点。连接到该热点。配置窗口应该会打开。如果没有打开，请打开Web浏览器并转到`192.168.4.1`页面。

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

提供Wi-Fi凭据。之后，能源监控设备将连接到Wi-Fi网络。通过网络中的IP地址检查设备。要找到它，您可以使用[Fing移动应用](https://www.fing.com/products)或[nmap CLI工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)。

{% roboWikiTitle { type:'2', anchor: 'step3'} %} 步骤3 — 配置 {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

转到**“配置”**->**“配置其他”**。在**“模板”**字符串中插入以下内容：

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```

{% endcodeHelper %}

验证复选框**“激活”**和**“启用MQTT”**是否已启用。如果没有，请启用它并按下保存按钮。

返回到“主菜单”，然后转到**“配置”** -> **“配置MQTT”**。
在此处提供您的MQTT凭据：

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

目前ESP的操作就到这里。下一步是安装Home Assistant集成。

{% roboWikiTitle { type:'2', anchor: 'step4'} %} 步骤4 — 集成设置 {% endroboWikiTitle %}

本文假设您已经安装了Home Assistant。要将能源监控设备连接到Home Assistant，您需要安装“Tasmota”集成。

{% roboWikiVideo {videos:[{src: 'QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

基本上，Home Assistant将自动发现“Tasmota”集成。但如果没有，可以手动添加。

{% roboWikiPicture {src:"docs/energymeter/HA.jpg", alt:"energymeter-ha"} %}{% endroboWikiPicture %}

就这样。现在您可以将能源实体添加到仪表板。

{% roboWikiNote {type: "warning"}%} 所有来自Robonomics的设备都可以在官方[网站](https://robonomics.network/devices/)上购买。
{% endroboWikiNote %}