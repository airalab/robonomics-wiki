---
title: 将 Amazon FreeRTOS 设备通过 MQTT 连接到 Robonomics

contributors: [khssnv]
---

这里演示了如何将运行 [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) 的微控制器通过 MQTT 连接到 Robonomics 网络。请查看 [此存储库](http://github.com/khssnv/freertos_mqtt_robonomics_example) 获取项目源代码。

我们使用带有 FreeRTOS 发行版和由 [Espressif IoT Development Framework](https://github.com/espressif/esp-idf) 提供的 MQTT 实现的 [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/)，而 Espressif 是所使用的微控制器的供应商。

此外，还有一个 [PMS-3003](http://www.plantower.com/en/content/?107.html) 传感器用于演示。传感器测量空气中颗粒物的存在，可以用来估计空气质量。

空气质量不是本文的主题，您可以在世界卫生组织的网站上找到更多信息：[环境（室外）空气污染](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health)。系统的目标是将传感器测量结果发布到 Airalab 的 Robonomics 网络。

## 硬件设置

我们将 PMS3003 TXD PIN5 连接到 ESP32 DevKitC IO17 以通过 UART 传输测量数据。
同时，两个设备都需要电源和公共地。

{% roboWikiPicture {src:"docs/freertos-mqtt/wiring.png", alt:"接线图"} %}{% endroboWikiPicture %}

## 数据流

为了将传感器测量结果传递到 Robonomics 网络，在固件级别，我们的目标是通过传感器支持的嵌入式通信协议（在我们的情况下为 UART）获取数据，并通过 MQTT / TCP 将其传递给 AIRA 实例。

{% roboWikiPicture {src:"docs/freertos-mqtt/send.svg", alt:"发送"} %}{% endroboWikiPicture %}

在我们的示例中，我们使用 AIRA 云部署，可通过公共 IP 地址和分配的域名访问。
在 AIRA 实例上，我们设置了 `mosquitto` MQTT 代理，并订阅 `/freertos_mqtt_robonomics_example/98:F4`。:AB:72:23:C4` 主题以从 MQTT 获取消息。

然后我们通过管道将消息传递给 `robonomics io` 写入器。

{% roboWikiPicture {src:"docs/freertos-mqtt/recv.svg", alt:"接收"} %}{% endroboWikiPicture %}

现在数据可在 Robonomics Network 中使用，我们可以再次使用 `robonomics io` 读取它。

## 固件

我们使用 [ESP-MQTT 基于 TCP 传输的示例应用程序](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) 作为基础。

我们仅修改 `main/app_main.c` 以进行与传感器的 UART 连接、SNTP 时间同步和定期 MQTT 发布例程。

如果您尝试重复此项目，并且这是您的第一个 ESP IDF 项目，请首先按照 [Espressif 的 ESP-IDF 编程指南](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step) 介绍，以熟悉固件操作，如配置、使用 `idf.py` 工具进行构建和上传。

### Wi-Fi 配置

为了与部署在云中的 AIRA 实例通信，我们的微控制器需要互联网连接。
我们使用 ESP32 的 Wi-Fi 来实现。
Espressif 提供了配置板载 Wi-Fi 的实用程序。
在我们的示例中，我们使用带有 Ubuntu 20.04 GNU/Linux 的开发环境。
要配置 Wi-Fi，我们转到项目文件夹并运行 SDK 配置工具。

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

然后在 `Example Connection Configuration` 部分设置 Wi-Fi 接入点 SSID 和密码。

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-wi-fi.png", alt:"Menuconfig Wi-Fi"} %}{% endroboWikiPicture %}

### MQTT 端点配置

有两件事需要配置 MQTT。
第一是 MQTT 代理地址。
可以使用 SDK 配置工具进行配置。

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

在 `Example Configuration` 部分设置 `Broker URL`。

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-mqtt.png", alt:"Menuconfig MQTT"} %}{% endroboWikiPicture %}

第二件事是 MQTT 主题我们将其设置在固件中，使用项目名称前缀后跟我们的ESP32 MAC地址。
对于我们特定的微芯片，它给出了`/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4`。

## 从MQTT到Robonomics

首先让我们检查我们是否通过MQTT接收到数据。
我们可以订阅我们的Mosquitto MQTT代理主题设备发布到。

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

在这里，我们将`mosquitto`软件包引入我们的环境以使用`mosquitto_sub`实用程序。
然后我们订阅在固件中设置的主题。
我们得到了我们的测量数据，这意味着AIRA正确地通过MQTT接收数据。
现在让我们将这些消息传输到Robonomics网络。

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

在这里，我们使用`robonomics`实用程序将消息发布到pubsub频道`/freertos_mqtt_robonomics_example`。
我们指定`bootnodes`以确保至少建立一个连接。

现在我们从同一pubsub频道中读取这些消息。

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  生成随机对等体ID：12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  订阅主题：_robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  订阅主题：/freertos_mqtt_robonomics_exampleomics_example
2021-03-27 15:15:56  新对等体已连接：PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT：为对等体添加了网格链接：PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")，主题为：TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855，PM1=3，PM2.5=4，PM10=3
```

## 使用的原始资源

* 来自GoJimmy的博客的ESP32 DevKitC引脚布局 https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* 来自OpenAirProject的PSM3003数据结构和解码器 https://github.com/openairproject/sensor-esp32

**谢谢大家！**