---
title: 设置Robonomics集成

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
---

**在本文中，您将向Home Assistant添加Robonomics。这使得Home Assistant能够记录带有加密数据的数据日志到Robonomics Parachain，并监听来自Parachain的启动命令以控制智能设备。集成使用IPFS存储数据，并将IPFS哈希发送到数据日志或启动功能。**

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 在Home Assistant的Web界面中，转到`设置` -> `设备和服务`，然后点击`添加集成`。搜索`Robonomics`。

2. 点击Robonomics并填写配置信息：

- 将`SUB_CONTROLLER`账户的种子添加到控制器账户种子中。
- 将`SUB_OWNER`账户的公共地址添加到订阅所有者地址中。
- 设置数据发送间隔（默认为10分钟）。
- （可选）您可以添加凭据以将数据固定到Pinata或其他自定义网关，以在IPFS网络中更广泛地传播您的数据。

{% roboWikiNote {title:"注意", type: "Note"}%} 在[Pinata设置部分](/docs/pinata-setup)中，您可以找到有关使用Pinata的更详细信息。{% endroboWikiNote %}

3. 在完成配置后，点击`提交`。如果您填写的信息都正确，您将看到成功窗口。

就是这样！您已经完全设置了Robonomics集成到Home Assistant中。现在您可以使用所有Robonomics Web服务。要了解更多信息，请转到["使用"部分](/docs/add-user)。