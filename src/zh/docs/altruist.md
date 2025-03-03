---
title: Altruist 设置
contributors: [tubleronchik]
---

**本指南将引导您设置和激活 Altruist 户外传感器。您将连接传感器到 Wi-Fi，配置其位置，并使用 XRT 代币激活订阅。此外，还提供了通过 HACS 或手动安装将传感器与 Home Assistant 集成的说明。**

{% roboWikiNote {type: "warning"}%} 所有来自 Robonomics 的设备可以在官方[网站](https://robonomics.network/devices/)上购买。{% endroboWikiNote %}

## 激活 Robonomics 订阅

{% roboWikiNote {type: "okay"} %}完成此步骤，请确保您的 `Robonomics Polkadot` 账户中至少有 2-3 个 XRT 代币。{% endroboWikiNote %}

1) 导航到 Robonomics dApp [订阅页面](https://robonomics.app/#/rws-buy)。 
2) 点击 **账户** 并连接您的钱包。您的账户地址和余额将显示出来。
如果您没有账户，请按照[本指南](https://wiki.robonomics.network/docs/create-account-in-dapp/)创建一个。

{% roboWikiPicture {src:"docs/altruist/altruist_syb_buy.jpg", alt:"订阅页面"} %}{% endroboWikiPicture %}

3) 点击 `购买订阅` 并签署交易。**等待激活过程完成**。 
4) 激活后，您将被重定向到**设置页面**，在这里您可以看到您的订阅名称和到期日期。

{% roboWikiPicture {src:"docs/altruist/altruist_setup_page.jpg", alt:"订阅设置页面"} %}{% endroboWikiPicture %}

5) **保存您的账户地址** — 您将在传感器设置过程中需要它。您可以从“OWNER”部分复制它，或者通过点击右上角的账户名称并选择复制按钮来获取。

## 传感器设置

{% roboWikiNote {type: "warning", title: "信息"}%} 传感器只能连接到2.4GHz的Wi-Fi网络。{% endroboWikiNote %}

1) **将传感器插入**电源插座。
2) 电路板将创建一个名为Altruist-xxxxxxxxx的Wi-Fi网络。从您的手机或电脑连接到它。您应该会自动提示打开授权窗口。
- 如果没有，请打开浏览器并访问192.168.4.1。

{% roboWikiPicture {src:"docs/altruist/on_board.png", alt:"altruist-传感器"} %}{% endroboWikiPicture %}

3) **配置Wi-Fi设置**：
- 从列表中选择您的Wi-Fi网络，如果没有出现，请手动输入。
- 在“WI-FI SETTINGS”字段中输入密码。

4) **输入您的Robonomics详细信息**：
- 将您之前复制的RWS所有者地址粘贴到指定字段中。

5) **设置传感器位置**：
- 输入传感器安装地点的坐标。
- 您可以使用在线地图查找坐标，或使用[此链接](https://www.latlong.net/convert-address-to-lat)将地址转换为纬度/经度。-long.html)

{% roboWikiNote {type: "warning", title: "警告"}%}传感器坐标将显示在公开可用的地图上。如果您不想显示您的私人信息，请写下接近但不精确的坐标。{% endroboWikiNote %}

{% roboWikiPicture {src:"docs/altruist/sensor_setup.png", alt:"altruist-sensor-wifi"} %}{% endroboWikiPicture %}

6) **复制 Altruist "Robonomics 地址"**：
- 您会在页面顶部找到它。保存以便在最后一步使用。

{% roboWikiPicture {src:"docs/altruist/address.jpg", alt:"altruist address"} %}{% endroboWikiPicture %}

7) 点击页面底部的“**保存配置并重启**”。板子将重启并连接到指定的 Wi-Fi 网络。

## Altruist 激活
设置过程的最后一步是将 **Altruist 地址** 添加到您的 **Robonomics 订阅** 中。

1) 返回到 [设置页面](https://robonomics.app/#/rws-setup)。

2) 向下滚动到“**订阅中的用户**”部分。

3) 在“**添加用户**”字段中，粘贴您之前复制的 **Altruist Robonomics 地址**。

{% roboWikiPicture {src:"docs/altruist/add_user.jpg", alt:"add user"} %}{% endroboWikiPicture %}

4) 点击 **加号 (+) 按钮** 并签署消息。

5) 等待操作完成。

就是这样！您的设置现已完成。 🎉

您现在可以在 [Robonomics Sensors Social](https://sensors.social/#) 地图上找到您的 Altruist。 🚀

{% roboWikiPicture {src:"docs/altruist/map.jpg", alt:"传感器地图"} %}{% endroboWikiPicture %}

## Home Assistant

有两种方法可以将 **Altruist** 添加到 **Home Assistant**：

### 选项 1：HACS（推荐）

通过 **HACS** 添加 **Altruist** 是最简单的方法。您可以在[这里](https://hacs.xyz/docs/use/)找到简要的设置指南。

**步骤**：
1) 安装 HACS 后，打开它。

2) 点击右上角的 **三个点**，选择“**Custom repositories**”。

3) 在弹出窗口中，输入以下 URL：

```
https://github.com/airalab/altruist-homeassistant-integration
```
4) 将类型设置为“**Integration**”并点击“**ADD**”。

{% roboWikiPicture {src:"docs/altruist/hacs.jpg", alt:"altruist-add"} %}{% endroboWikiPicture %}

5) 搜索 **Altruist Sensor** 集成。

6) 点击 **Download** 按钮，然后在安装集成后重启 **Home Assistant**。

{% roboWikiPicture {src:"docs/altruist/integration.jpg", alt:"altruist-hacs"} %}{% endroboWikiPicture %}

### 选项 2：手动安装

1) 在 `homeassistant` 用户下，克隆项目仓库：

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/airalab/altruist-homeassistant-integration.git
```

{% endcodeHelper %}

2) 如果您已经有任何自定义集成，请将 `altruist` 文件夹移动到您的 `custom_components` 目录：

{% codeHelper { copy: true}%}

```
cd altruist-homeassistant-integration
mv custom_components/altruist ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

3) 如果您**没有**任何自定义集成，请移动整个 custom_components 目录：

{% codeHelper { copy: true}%}

 ```
cd altruist-homeassistant-integration
mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## 配置

安装并重启 Home Assistant 后，集成将自动检测您网络上的 Altruist。

1) 前往 **设置 → 设备与服务**。

2) 添加 **Altruist 传感器**。

{% roboWikiPicture {src:"docs/altruist/add_altruist.jpg", alt:"discover altruist"} %}{% endroboWikiPicture %}

就是这样！🚀 您的 Altruist 传感器现在已与 Home Assistant 集成。