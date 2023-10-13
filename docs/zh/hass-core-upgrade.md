---
title: 升级您的Home Assistant Core
contributors: [PaTara43, makyul]
tools:   
  - Ubuntu Server 22.04.2 LTS for RaspPi
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2023.1.7
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.2.0
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.17.0
    https://docs.ipfs.tech/
---

**本文包含使用Robonomics集成升级现有Home Assistant Core的说明。**

<robo-wiki-picture src="home-assistant/ha_core.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. 假设您的Home Assistant Core的安装是按照[官方说明](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-core)完成的，并且存在一个<u>homeassistant</u>用户和`venv`环境。如果不是这种情况，请按照下面的说明进行操作，**但相应地编辑脚本**。
  2. IPFS将作为一个<u>systemd</u>服务安装和运行在主机上。
  3. 假设您已安装[Python3.9](https://www.python.org/downloads/)或更高版本。

</robo-wiki-note>

## 安装

下载安装脚本并在终端中运行它：

<code-helper additionalLine="rasppi_username@rasppi_hostname">

  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

</code-helper>

您将看到以下输出：

<code-helper additionalLine="rasppi_username@rasppi_hostname">


```shell
<...>
https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_ipfs_arc_dependent.sh
<...>
IPFS daemon installed and launched, use ipfs-daemon.service to manage.
<...>
A    robonomics/utils.py
Checked out revision 125.
Integration downloaded!
```

</code-helper>

在过程中，您将被要求确认重新启动几个服务。使用`tab`进行导航，选择`yes`选项。
  
<robo-wiki-note type="note" title="Error: `custom_components` exists">

  您可能会看到一个错误，如`mkdir: can't create directory 'custom_components': File exists`。这意味着您已经安装了一些自定义组件的文件夹。只需忽略此消息。

</robo-wiki-note>
  
完成后，重新启动您的Home Assistant。

## 核实

检查IPFS服务是否正在运行：

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
systemctl status ipfs-daemon.service 
```

</code-helper>

您将看到以下输出：

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```
● ipfs-daemon.service - IPFS Daemon Service
     Loaded: loaded (/etc/systemd/system/ipfs-daemon.service; enabled; preset: enabled)
     Active: active (running) since Thu 2022-11-03 11:30:39 UTC; 14min ago
   Main PID: 4400 (ipfs)
      Tasks: 12 (limit: 4416)
     Memory: 141.9M
        CPU: 3min 5.031s
     CGroup: /system.slice/ipfs-daemon.service
             └─4400 /usr/local/bin/ipfs daemon
```

</code-helper>
