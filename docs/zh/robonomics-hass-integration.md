---
title: Robonomics集成设置

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
---

**在本文中，您将向Home Assistant添加Robonomics。这使得Home Assistant能够将加密数据的数据日志记录到Robonomics Parachain，并侦听来自Parachain的启动命令以控制智能设备。集成使用IPFS存储数据并将IPFS哈希发送到数据日志或启动函数。**

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. Home Assistant的Web界面中，转到`Settings` -> `Device & Services`，然后点击`ADD INTEGRATION`。搜索`Robonomics`。

2. 点击Robonomics并填写配置: 

- 将`SUB_CONTROLLER`账户的种子添加到控制器账户种子中。
- 将`SUB_OWNER`账户的公共地址添加到订阅所有者地址中。
- 设置数据发送的间隔（默认为10分钟）。
- （可选）您可以为固定服务Pinata或其他自定义网关添加凭据，以在IPFS网络上更广泛地传播您的数据。

3. 完成配置后，点击`SUBMIT`。如果您填写的内容都正确，您将看到成功窗口。

就是这样！您已经完全设置了Robonomics集成到Home Assistant。现在您可以使用所有的 
Robonomics Web服务。要了解更多信息，请转到["使用"部分](/docs/global-administration)。
