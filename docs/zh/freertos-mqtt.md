---
title: 通过MQTT将Amazon FreeRTOS设备连接到Robonomics

contributors: [khssnv]
---

这是一个演示，演示了如何通过MQTT将运行[Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/)的微控制器连接到Robonomics网络。请查看[此存储库](http://github.com/khssnv/freertos_mqtt_robonomics_example)以获取项目源代码。

我们使用[ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/)与由[Espressif IoT Development Framework](https://github.com/espressif/esp-idf)提供的FreeRTOS分发和MQTT实现，而Espressif是所使用的微控制器的供应商。

还有一个[PMS-3003](http://www.plantower.com/en/content/?107.html)传感器用于演示目的。传感器测量空气中的颗粒物含量，人们可以使用它来估计空气质量。

空气质量不是本文的主题，您可以在世界卫生组织的网站上找到更多相关信息：[环境（室外）空气污染](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health)。该系统的目标是将传感器测量结果发布到Airalab的Robonomics网络。

## 硬件设置

我们将PMS3003的TXD引脚5连接到ESP32 DevKitC的IO17以通过UART传输测量数据。
两个设备都需要电源和公共地。

![Wiring Diagram](../images/freertos-mqtt/wiring.png)

## 数据流

为了将传感器测量结果传递到Robonomics网络，在固件级别上，我们的目标是通过传感器支持的嵌入式通信协议（在我们的案例中为UART）获取数据，并通过MQTT / TCP将其传递给AIRA实例。

![Sending](../images/freertos-mqtt/send.svg)

在我们的示例中，我们使用公共IP地址和域名分配的AIRA云部署。
在AIRA实例上，我们设置`mosquitto` MQTT代理并订`/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4`主题以获取来自MQTT的消息。

然后我们通过管道将消息传递给`robonomics io`写入器。

![Receiving](../images/freertos-mqtt/recv.svg)

现在数据在Robonomics网络中可用，我们可以再次使用`robonomics io`读取它。

## 固件

我们使用[带有TCP传输的ESP-MQTT示例应用程序](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp)作为基础。

我们只修改`main/app_main.c`以进行与传感器的UART连接、SNTP时间同步和定期MQTT发布例程。

如果您尝试重复该项目，并且这是您的第一个基于ESP IDF的项目，请首先按照[Espressif的ESP-IDF编程指南](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step)介绍来熟悉固件操作，如配置、构建和使用`idf.py`工具上传。

### Wi-Fi配置

为了与部署在云中的AIRA实例通信，我们的微控制器需要互联网连接。
我们使用ESP32的Wi-Fi进行连接。
Espressif提供了配置板载Wi-Fi的工具。
在我们的示例中，我们使用带有Ubuntu 20.04 GNU/Linux的开发环境。
要配置Wi-Fi，我们进入项目文件夹并运行SDK配置工具。

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

然后我们在`Example 连接ion 配置`部分设置Wi-Fi接入点的SSID和密码。

![Menuconfig Wi-Fi](../images/freertos-mqtt/menuconfig-wi-fi.png)

### MQTT端点配置

有两个要配置的MQTT事项。
第一个是MQTT代理地址。
可以使用SDK配置工具进行配置。

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

在`Example 配置`部分设置`Broker URL`。

![Menuconfig MQTT](../images/freertos-mqtt/menuconfig-mqtt.png)

第二个事项是MQTT主题。
我们在固件中设置它，使用项目名称前缀后跟我们的ESP32 MAC地址。
对于我们特定的微芯片，它给出了`/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4`。

## 从MQTT到Robonomics

首先让我们检查我们是否通过MQTT接收到数据。
我们可以订阅我们的Mosquitto MQTT代理主题设备发布到。

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

在这里，我们将`mosquitto`软件包引入我们的环境中，以使用`mosquitto_sub`实用程序。
然后，我们订阅固件中设置的主题。
我们得到了我们的测量结果，这意味着AIRA通过MQTT正确接收数据。
现在让我们将这些消息传输到Robonomics网络。

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

在这里，我们使用`robonomics`实用程序在pubsub频道`/freertos_mqtt_robonomics_example`中发布消息。
我们指定`bootnodes`以确保至少建立一个连接。

现在我们正在从同一个pubsub频道中读取这些消息。

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  New peer connected: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Mesh link added for peer: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") in topic: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## 使用的原始资源

* ESP32 DevKitC引脚图来自GoJimmy的博客 https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* PSM3003数据结构和解码器来自OpenAirProject https://github.com/openairproject/sensor-esp32

**谢谢大家！**
