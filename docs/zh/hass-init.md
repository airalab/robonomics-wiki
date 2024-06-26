---
title: Home Assistant 初始化
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
---

**安装 Home Assistant 后，需要进行初始化。**

<robo-wiki-picture src="home-assistant/ha_init.png" />

您正在开始创建 Home Assistant 的所有者账户。该账户是管理员账户，可以进行任何更改。打开浏览器，转到 `http://%RASPBERRY_IP_ADDRESS%:8123`。您可以使用 [Fing 移动应用](https://www.fing.com/products) 或 [nmap CLI 工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) 找到 Raspberry Pi 的 IP 地址。

<robo-wiki-note type="note">由于路由器设置的原因，树莓派的地址可能会随时间变化。</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type:'mp4'}]" />

1. 在第一页上，输入名称、用户名、密码，然后点击`CREATE ACCOUNT`按钮。

2. 在下一个屏幕上，为您的家庭设置一个名称，并设置您的位置和单位系统。点击`DETECT`以找到您的位置，并根据该位置设置您的时区和单位系统。如果您不想发送您的位置，您可以手动设置这些值。

3. 然后，Home Assistant 将显示在您的网络上发现的任何设备。如果您看到的项目比下面显示的少，不要担心；您随时可以手动添加设备。现在，只需点击`FINISH`，您将进入主 Home Assistant 屏幕。

4. 最后，您将看到 Home Assistant 的 Web 界面，其中将显示您的所有设备。 


## 故障排除

1. 如果您忘记了本地用户的登录名或密码，请[查看此文章](https://www.home-assistant.io/docs/locked_out/)以恢复您的凭据。
