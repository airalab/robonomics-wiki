---
title: 设置Robonomics集成

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**在本文中，您将向Home Assistant添加Robonomics。这使得Home Assistant能够记录带有加密数据的数据日志到Robonomics Parachain，并监听来自Parachain的启动命令以控制智能设备。集成使用IPFS存储数据并将IPFS哈希发送到数据日志或启动功能。**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

首先，您需要为您的仪表板创建配置。打开您的Home Assistant仪表板，在右上角点击“编辑仪表板”按钮（一个铅笔）。
在弹出的窗口中，点击三个点图标，然后选择“Take Control”按钮：

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

再次点击“Take Control”：

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

现在，您可以安装Robonomics集成。请按照以下步骤操作：

1. 在Home Assistant的Web界面中，转到`设置` -> `设备和服务`，然后点击`添加集成`。搜索`Robonomics`。

2. 点击Robonomics，上传您的设置文件（命名为`robonomics.app-settings-<subscirption-name>-server.json`，其中`<subscirption-name>`是您订阅的名称），并输入`CONTROLLER`账户的密码。有关如何创建设置文件的说明，请参阅[此处](/docs/sub-activate/?topic=smart-home#setup-your-subscription)。

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"controller create"} %}{% endroboWikiPicture %}

3. 可选：您可以选择要使用的网络。

4. 完成配置后，点击`提交`。如果您填写的内容都正确，您将看到成功窗口。

{% roboWikiNote {type: "okay", title: "" }%} 安装可能需要大约10-15分钟，具体取决于您的互联网连接。 {% endroboWikiNote %}

就是这样！您已经完全设置了Robonomics集成到Home Assistant中。现在您可以使用所有Robonomics Web服务。要了解更多信息，请转到["使用"部分](/docs/add-user)。