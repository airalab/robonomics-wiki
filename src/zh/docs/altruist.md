---
title: Altruist 与 sensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

Altruist 是一款开源环境传感器。它的读数会进入一个开放数据集，任何人都可以在 [sensors.social](https://sensors.social) 上查看。

## 传感器

- 有室外版（Urban）、室内版（Insight）和一个套件版。
- 传感器会对每次测量签名，因此读数在传输途中无法被伪造。
- 读数可以通过 Wi-Fi 传输；没有 Wi-Fi 的地方，也可以通过 LoRa 无线电和 Meshtastic 网状网络传输。
- 所有者可以选择加密读数。加密后，只有所有者能用自己的密钥在 sensors.social 上看到它们。

Altruist 传感器由 Pinout Limited 生产。可以在 [cyberpunks.shop](https://cyberpunks.shop/) 和欧盟的 Amazon 上购买。安装和支持信息见那里的产品页面和 [pinout.cloud](https://pinout.cloud)。

## sensors.social

[sensors.social](https://sensors.social) 是一张独立空气质量传感器的地图。它显示 100 多个传感器的读数，还有自己的博客发布项目新闻。

如果想在局域网内的 Home Assistant 中使用传感器，可以用 [Altruist 集成](https://github.com/airalab/altruist-homeassistant-integration)。

## 源代码

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware)：固件。
- [airalab/webflasher](https://github.com/airalab/webflasher)：在浏览器中刷写固件。
- [airalab/sensors.social](https://github.com/airalab/sensors.social)：地图。
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)：收集测量数据的服务。
