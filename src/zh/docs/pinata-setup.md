---
title: Pinata设置

contributors: [tubleronchik, LoSk-p]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**本文指导您如何配置 [Pinata](https://www.pinata.cloud/) 来固定来自Robonomics集成的文件。这将提高备份和遥测文件的可访问性。**

要能够在Pinata上固定您的文件，首先需要创建一个帐户。然后，转到`API Keys`部分，并创建一个具有以下权限的新密钥：

1. `pinFileToIPFS`
2. `unpin`

{% roboWikiPicture {src:"docs/home-assistant/pinata-permissions.jpg", alt:"pinata-permissions"} %}{% endroboWikiPicture %}

然后，复制`API Key`和`API Secret`并保持私密。

{% roboWikiPicture {src:"docs/home-assistant/pinata-key.jpg", alt:"pinata-key"} %}{% endroboWikiPicture %}

如果您已经设置了Robonomics集成，请转到`Settings` -> `Devices & Services`，然后在Robonomics集成中按`configure`。输入您的Pinata凭据。

{% roboWikiPicture {src:"docs/home-assistant/robonomics-reconfigure-pinata.jpg", alt:"robonomics-reconfigure-pinata"} %}{% endroboWikiPicture %}