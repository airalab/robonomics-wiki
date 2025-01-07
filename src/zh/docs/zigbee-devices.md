---
title: Zigbee设备在Zigbee2MQTT中

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.40.1
    https://github.com/Koenkk/zigbee2mqtt

---

**如果在安装过程中插入ZigBee协调器，您可以将ZigBee设备添加到智能家居中。本文将解释如何操作。**

{% roboWikiPicture {src:"docs/home-assistant/zigbee2mqtt.png", alt:"zigbee2mqt"} %}{% endroboWikiPicture %}

## 配对设备

打开浏览器，输入 `http://%PC_IP_ADDRESS%:8099`。您可以使用[Fing移动应用](https://www.fing.com/products)或[nmap CLI工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)找到树莓派的IP地址。如果您在PC上设置了所有内容，请使用 `http://localhost:8099`。

您将看到Zigbee2MQTT的Web界面：


{% roboWikiPicture {src:"docs/home-assistant/z2m-webinterface.jpg", alt:"z2m-webinterface"} %}{% endroboWikiPicture %}


现在是连接您的智能设备的时候了。
首先，在Zigbee2MQTT的Web界面顶部按下 `Permit join (All)` 按钮。

然后，开始配对设备。将设备切换到连接模式的最常见方法是按住其电源按钮或将其开关打开/关闭5次。确保Zigbee2MQTT正在运行。

当设备连接时，您将在Web界面中看到它们：

{% roboWikiPicture {src:"docs/home-assistant/device_connected.jpg", alt:"device_connected"} %}{% endroboWikiPicture %}

现在，您应该在Home Assistant WebUI中看到此传感器。转到 `设置` -> `设备和服务` -> `设备`。

添加完所有传感器后，您可以关闭Zigbee2MQTT的Web界面。