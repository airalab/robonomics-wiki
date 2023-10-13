---
title: 如何连接SDS011传感器

contributors: [tubleronchik]
---

** 这是一个逐步指南，介绍如何将您的传感器连接到Robonomics传感器网络。我们的传感器使用Robonomics固件，这是传感器.community固件的增强版本。它包括额外的传感器并具有修改后的数据发送机制。 **

1. 将传感器插入插座以供。
2. 该板将创建一个名为`RobonomicsSensor-xxxxxxxxx`的Wi-Fi网络。从您的手机或计算机连接到它：您将看到授权窗口（如果没有，请打开浏览器并转到`192.168.4.1`）。
3. 从列表中选择您的Wi-Fi网络（如果不在列表中，请自行填写）并填写密码字段。
<robo-wiki-note type="okay" title="INFO">
传感器只能连接到 2.4GHz Wi-Fi 网络。
</robo-wiki-note> 
<robo-wiki-picture src="sds-sensor-wifi.png"/>
4. 编写传感器将安装的位置的坐标。您可以从任何地图获取它们，或者使用[此链接](https://www.latlong.net/convert-address-to-lat-long.html)从地址获取它们。
<robo-wiki-note type="warning" title="WARNING">
传感器坐标将显示在公开可用的地图上。如果您不想显示您的私人信息，请写入接近但不精确的坐标。
</robo-wiki-note> 
5. 点击`Save configuration and restart`。板将重新启动并连接到指定的Wi-Fi网络。
6. 打开[Robonomics传感器地图](https://sensors.robonomics.network/#/)，找到您安装传感器的位置。几分钟后，您将能够在地图上看到带有数据的传感器。
<robo-wiki-picture src="sds-sensor-map.png"/>

