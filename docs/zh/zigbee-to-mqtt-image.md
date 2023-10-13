---
title: Zigbee适配器与预安装图像的Zigbee2MQTT

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**在本文中，您将配对智能设备。**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

打开一个网页浏览器，转到`http://%RASPBERRY_IP_ADDRESS%:8099`。您可以使用[Fing移动应用程序](https://www.fing.com/products)或[nmap CLI工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)找到树莓派的IP地址。

您将看到Zigbee2MQTT的Web界面：

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




是时候连接您的智能设备了。 
首先，在Zigbee2MQTT的Web界面顶部按下`Permit join (All)`按钮。 

然后，开始配对设备。将设备切换到连接模式的最常见方法是按住其电源按钮或将其开/关5次。确保Zigbee2MQTT正在运行。

<robo-wiki-picture src="home-assistant/switch-device.gif" />

设备连接后，您将在Web界面中看到它们：

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

现在您应该在Home Assistant WebUI中看到此传感器。转到`Settings` -> `Devices & Services` -> `Devices`：

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

添加完所有传感器后，您可以关闭Zigbee2MQTT的Web界面。
