---
title: 虚拟设备

contributors: [nakata5321]
---

**本文将告诉您如何在智能家居中创建虚拟设备，以便您可以看到实际平台的外观。**

{% roboWikiPicture {src:"docs/home-assistant/virtual-sensors.png", alt:"虚拟传感器"} %}{% endroboWikiPicture %}

## 安装集成

要使用虚拟设备，您需要安装["演示"集成](https://www.home-assistant.io/integrations/demo/)。
要做到这一点，您应该编辑您的配置文件。

转到配置文件夹，这是您在配置过程中提供的。在这个文件夹中，您会找到一个名为"homeassistant"的文件夹。进入其中。使用文本编辑器以**root**用户身份打开`configuration.yaml`文件，并将以下行插入其中：

{% codeHelper { copy: true}%}

```
...
# 示例 configuration.yaml 条目
demo:
...
```

{% endcodeHelper %}


之后，通过Web界面重新启动Home Assistant。当智能家居重新启动时，您可以在"演示"实体中找到所有虚拟设备。
在`设置 -> 设备和服务 -> 演示`中找到它们。所有这些实体都可以添加到您的仪表板中。

{% roboWikiPicture {src:"docs/home-assistant/demo-entities.png", alt:"演示实体"} %}{% endroboWikiPicture %}
