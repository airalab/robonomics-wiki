---
title: 升级您的Home Assistant Docker或Core（适用于类Unix操作系统）
contributors: [PaTara43]
tools:
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Robonomics Home Assistant Integration 1.8.5-beta
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.2
    https://github.com/Multi-Agent-io/robonomics-interface/
  - HACS 1.34.0
    https://hacs.xyz/docs/setup/download



---

**本文包含升级现有Home Assistant Docker或Core（在类Unix操作系统上）与Robonomics集成的说明。**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"免责声明", type: "warning"}%}
  1. 假定Docker已正确安装。
  2. 假定使用Home Assistant或Home Assitant Core的默认Docker镜像和容器。
  3. 将安装IPFS和Libp2p-ws-proxy作为Docker容器。
{% endroboWikiNote %}


## 安装

下载安装脚本并在终端中运行：

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

它将检查Docker是否正确安装。然后，它将尝试查找IPFS并建议检查IPFS是否安装。如果未找到IPFS，脚本将安装IPFS和Libp2p-ws代理。您将看到以下输出：

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
Docker已安装
$用户属于docker组。
检查IPFS是否安装...可能需要几分钟。请稍候
<...>
 ✔ 容器ipfs-daemon      已启动
 ✔ 容器lipb2p-ws-proxy  已启动
一切准备就绪！
``` install_integration_core.sh
```

{% endcodeHelper %}

如果IPFS已安装，您将看到以下输出：
```shell
Docker已安装
$用户属于docker组。
检查IPFS是否安装...可能需要几分钟。请稍候
已找到IPFS实例。确保您的配置已正确设置以下设置：
      - '网关': '/ip4/0.0.0.0/tcp/8080'
      - 端口4001、5001和8080可用。
      还需添加以下引导节点：
      1. '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8'
      2. '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
      3. '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      您的配置是否已正确设置？[是/否]:

```
在这种情况下，您需要调整您的IPFS配置文件并确认。

{% roboWikiNote {title:"注意！", type: "warning"}%} IPFS的正确配置很重要；不要跳过此步骤！{% endroboWikiNote %}

## 下载Robonomics集成

我们将使用[HACS](https://hacs.xyz/)来安装集成。如果您的Home Assistant上尚未安装HACS，您需要首先[安装](https://hacs.xyz/docs/setup/download/)它。

接下来，在您的Home Assistant中，转到HACS并搜索`Robonomics`：

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

打开它并点击右下角的`下载`。下载存储库可能需要一些时间。

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

就是这样。继续阅读下一篇文章。