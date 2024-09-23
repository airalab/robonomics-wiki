---
title: 1组智能开关
contributors: [nakata5321]
---
本文将向您展示设置1组智能开关的过程。

{% roboWikiNote {type: "warning"}%}您可以在官方[网站](https://robonomics.network/devices/)上购买Robonomics的所有设备。{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTWhDu1PdQgR1ZuLuGpEtYG8uMm8eiWLziK1zLupQwU2i', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} 步骤1 — 刷写固件 {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%}所有来自Robonomics的设备都是预先刷写的。然而，由于所有设备都是开发套件，本说明将涵盖从头开始刷写设备的选项。如果您现在不想这样做，请继续前往[**步骤2 - 接入点**](/docs/ir-controller/#step2)。
{% endroboWikiNote %}

从包装盒中取出设备并将其连接到计算机。然后访问网站[webflasher.robonomics.network](https://webflasher.robonomics.network/)。这是Web刷写工具。

{% roboWikiVideo {videos:[{src: 'QmVWmGSnvGwQ3dQfZC8iM5KHBoGpaWVXXUjNuNesULQrGw', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}注意！Web刷写工具仅适用于Google Chrome或Microsoft Edge浏览器。{% endroboWikiNote %}

在“固件”下拉框中选择**"SWS-1G-E-11-23"**选项，然后在“选择芯片”中选择**"ESP32"**。点击**"连接"**按钮。
将弹出一个窗口，您应该选择设备连接的串行端口（通常为`/ttyUSB0`）。然后选择**"INSTALL SWS-1G-E-11-23"**。
在下一个窗口中，您可以通过勾选**ERASE DEVICE**来进行**CLEAR INSTALLATION**。点击下一步，然后安装。等待固件上传到智能开关设备。

安装完成后，将出现一个Wi-Fi配置弹出窗口。提供Wi-Fi凭据。

设置完Wi-Fi后，您可以通过**访问设备**按钮访问设备。稍后，您可以通过网络中的IP地址访问设备。您可以使用[Fing移动应用](https://www.fing.com/products)或[nmap CLI工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)来查找它。

跳过**步骤2 — 接入点**，前往[**步骤3 — 配置**](/docs/ir-controller/#step3)。

{% roboWikiTitle { type:'2', anchor: 'step2'} %} 步骤2 — 接入点 {% endroboWikiTitle %}

如果您从包装盒中取出智能开关并将其连接到电源，它将创建一个名为"robonomics-XXXXXXX"的热点。连接到它。
应该会打开一个配置窗口。如果没有，请打开一个网络浏览器，转到`192.168.4.1`页面。

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"image"} %}{% endroboWikiPicture %}

提供Wi-Fi凭据。之后，智能开关设备将连接到Wi-Fi网络。通过网络中的IP地址检查设备。您可以使用[Fing移动应用](https://www.fing.com/products)或[nmap CLI工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)来查找它。

{% roboWikiTitle { type:'2', anchor: 'step3'} %} 步骤3 — 配置 {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

转到**"配置"**->**"配置其他"**。在**"模板"**字符串中插入以下内容：

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-1L-Switch","GPIO":[1,1,1,1,1,1,1,1,1,576,1,1,1,1,3200,5440,0,1,224,1,0,0,320,1,0,0,0,0,1,1,1,32,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

验证复选框**"Activate"**和**"MQTT Enable"**是否已启用。如果没有，请启用它并点击保存按钮。

返回主菜单，转到**"配置"** -> **"配置MQTT"**。
在这里提供您的MQTT凭据：

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"image"} %}{% endroboWikiPicture %}

目前关于ESP就是这些。下一步是安装Home Assistant集成。

{% roboWikiTitle { type:'2', anchor: 'step4'} %} 步骤4 — 集成设置 {% endroboWikiTitle %}

本文假设您已经安装了Home Assistant。要将智能开关设备连接到Home Assistant，您需要安装Tasmota集成。

{% roboWikiVideo {videos:[{src: 'QmQw6aA5e7UqT1hZrAV8m1UPq1rWCgLsWcVufuxitQm84p', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

基本上，Home Assistant将自动发现Tasmota集成。但如果没有，可以手动添加。
就是这样。现在您可以将开关实体添加到仪表板。

{% roboWikiNote {type: "warning"}%}您可以在官方[网站](https://robonomics.network/devices/)上购买Robonomics的所有设备。
{% endroboWikiNote %}