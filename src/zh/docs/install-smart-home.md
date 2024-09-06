---
title: 智能家居安装
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.27.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt
---

**欢迎来到安装带有Robonomics集成的Home Assistant指南。Home Assistant是一个开源的家庭自动化系统，提供了一个集中控制智能设备的中心枢纽，通过与Robonomics集成，一个去中心化的云服务，您可以增强智能家居的功能和安全性。在本文中，我们将提供逐步指导，教您如何安装带有Robonomics的Home Assistant，让您能够使用安全且去中心化的解决方案自动化和控制家中的各个方面。让我们开始吧！**

## 演示

这是一个完整的智能家居和Robonomics集成安装的示例。请注意，所需时间可能会因互联网连接而异。

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## 安装所需硬件

如果您尚未将Home Assistant纳入智能家居设置中，了解您需要建立完整智能家居系统所需的设备是很重要的。Robonomics团队建议使用树莓派4作为智能家居服务器。**但也可以在您的PC上设置所有内容。**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>树莓派4（至少2GB RAM）</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD卡16GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee适配器（可选） </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee智能设备（可选） </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>用于设置的台式机</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

## 1. 安装前提条件

Robonomics Docker包含：
- Home Assistant
- IPFS
- MQTT代理和集成
- Zigbee2MQTT
- libp2p代理
- Robonomics集成

本文将展示在Ubuntu系统上的安装过程。首先，您需要安装以下软件包：


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git
```

{% endcodeHelper %}

然后您需要在PC上安装Docker。安装说明请参阅[官方网站](https://docs.docker.com/engine/install/)。

<robo-wiki-note type="warning" title="重要信息">

  将您的用户添加到docker组，以便无需root权限即可启动docker容器。请在[此处找到说明](https://docs.docker.com/engine/install/linux-postinstall/)。

</robo-wiki-note>

## 2. 配置

下载GitHub存储库并进入其中：


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

然后，从`template.env`创建一个`.env`文件：


{% codeHelper {copy: true}%}

```
mv template.env .env
```

{% endcodeHelper %}

然后，您可以打开`.env`文件并编辑默认值，例如：
- 软件包的版本
- 存储所有配置文件夹的存储库路径。
- ["tz数据库名称"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)中的时区。

## 3. 启动

运行bash脚本并等待直到安装所有必需的软件包：

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

该脚本将检查您在前面步骤中完成的所有必需操作，并在出现问题时抛出错误。

在安装过程中可能会出现以下情况：
- 如果您决定不使用Zigbee协调器，您将看到一个对话框行，确认是否继续安装：

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
Cannot find zigbee coordinator location. Please insert it and run script again. The directory /dev/serial/by-id/ does not exist
Do you want to continue without zigbee coordinator? It will not start Zigbee2MQTT container.
Do you want to proceed? (y/n)
```

{% endcodeHelper %}


- 如果您的PC上有多个使用串口的设备，脚本将询问要使用哪个设备：

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

就这些。继续阅读下一篇文章。