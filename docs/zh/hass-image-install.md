---
title: 树莓派预装镜像
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.0
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.21.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt
  - Yggdrasil 0.4.7
    https://github.com/yggdrasil-network/yggdrasil-go/
---

**欢迎使用树莓派上安装Home Assistant与Robonomics集成的指南。Home Assistant是一个开源的家庭自动化系统，为您的家庭网络中的智能设备提供了一个集中控制中心。通过与Robonomics集成，一个去中心化的云服务，您可以增强您的智能家居的能和安全性。在本文中，我们将提供逐步指南，教您如何在树莓派上安装Home Assistant与Robonomics，使您能够使用安全和去中心化的解决方案自动化和控制家庭的各个方面。让我们开始吧！**

## 安装所需的硬件

如果您还没有将Home Assistant纳入您的智能家居设置中，了解您需要建立一个完整的智能家居系统所需的设备是很重要的。

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>Raspberry Pi 4 (at least 2 GB RAM)</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_3.png" /> 
      <b>SD card 16Gb+</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_7.png" /> 
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"><b>Zigbee smart devices</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. 下载Robonomics预装镜像

Robonomics预装镜像包含：
- Home Assistant Core
- IPFS
- MQTT代理和集成
- Zigbee2MQTT
- Robonomics Integration

<robo-wiki-button label="Download image (~528 Mb)" link="QmeDPrNYLQKFCZgPmxyxDWSAXSjSaw7Dx46d9p3JSGM1hA?filename=robonomics_rpi.xz&download=true" />

<robo-wiki-note type="warning" title="For advanced users">

您可以在[GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)上检查源代码并下载最新版本的镜像

</robo-wiki-note>


## 2. 配置镜像

在您的计算机上安装[Raspberry Pi Imager](https://www.raspberrypi.com/software/)。然后，插入SD卡。

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


运行 Raspberry Pi 成像器程序。 选择所需的映像作为操作系统，并确保从存储下拉菜单中选择您的 SD 卡。
在设置中：
- 设置用户名和密码（保存默认用户名"pi"以便记忆），  
- 提供您的Wi-Fi名称和密码， 
- 从下拉列表中选择您的国家
然后`写入`镜像。 
                   
<robo-wiki-note type="note">仔细保存用户名和密码，因为在故障排除时将需要这些凭据</robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" cover="covers/cover-1.png" />

您可以在[这里](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)找到国家代码。

## 3. 首次启动

**安全地弹出SD卡**，将其插入树莓派。然后**插入Zigbee适配器**到树莓派。

<robo-wiki-note type="warning">在首次启动树莓派之前入Zigbee适配器非常重要！ 
这是为了自动配置Zigbee网络所需的。</robo-wiki-note>

**如果您有[JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en)（具有所有必要的固件），您可以直接按照这些说明进行操作。然而，如果您有另一个适配器，您首先需要使用Zigbee2MQTT软件对其进行刷写。您可以在[这里](https://www.zigbee2mqtt.io/information/supported_adapters.html)找到有关您的设备的说明。**

接下来，将电源线连接到您的设备。它应该连接到您的Wi-Fi网络。 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

连接 Raspberry Pi 后，红色 LED 将亮起，绿色 LED 将闪烁一段时间。 最多等待 5 分钟，以便 Raspberry Pi 启动并在网络上注册。

现在找到树莓派的IP地址。您可以使用[Fing移动应用](https://www.fing.com/products)或 
[nmap CLI工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)来查找。找到`robots-home`（可选名称可能是`Home(homeassistant)`） 
主机机器在IP列表中的名称。 

在这个例子中，地址是`192.168.43.56`。 

要检查一切是否正常工作，请打开Web浏览器并转到网页`http://%RASPBERRY_IP_ADDRESS%:8123`。在这个例子中，它将是`192.168.43.56:8123`。
如果一切正常，您将看到Home Assistant的Web界面。如果网页无法打开，请等待最多5分钟让树莓派启动，然后重试。 

<robo-wiki-video loop controls :videos="[{src: 'QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## 故障排除

1. 要在以后更改Wi-Fi设置，您应该通过`ssh`命令登录到您的树莓派。为此，在您的计算机上打开终端
并使用您在"配置镜像"步骤中创建的用户名输入ssh命令（默认为"pi"）。 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

然后使用命令`sudo raspi-config`。在[官方网站](https://www.raspberrypi.com/documentation/computers/configuration.html)上找到有关此命令的更多信息。
