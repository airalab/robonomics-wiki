---
title: Home Assistant初始化
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.5.4
    https://github.com/home-assistant/core
---

**安装Home Assistant后，需要进行初始化。**

{% roboWikiPicture {src:"docs/home-assistant/ha_init.png", alt:"ha_init"} %}{% endroboWikiPicture %}

您将开始创建Home Assistant的所有者账户。此账户是管理员，可以进行任何更改。
打开网络浏览器，转到 `http://%PC_IP_ADDRESS%:8123`。您可以使用[Fing移动应用](https://www.fing.com/products)或[nmap CLI工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)找到树莓派的IP地址。
如果您在PC上设置了所有内容，请使用 `http://localhost:8123`。

{% roboWikiNote {type: "note"}%} IP地址可能会因为路由器设置而发生变化 {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 在第一页上，输入姓名、用户名、密码，然后点击 `CREATE ACCOUNT` 按钮。

2. 在下一个屏幕上，为您的家庭输入名称，并设置您的位置和单位制度。点击 `DETECT` 来查找您的位置，并根据该位置设置您的时区和单位制度。如果您不想发送您的位置信息，您可以手动设置这些值。

3. 之后，Home Assistant将显示在您的网络上发现的任何设备。如果您看到的项目比下面显示的少，不要担心；您随时可以稍后手动添加设备。现在，只需点击 `FINISH`，您将进入主Home Assistant屏幕。

4. 最后，您将看到Home Assistant的Web界面，其中将显示所有您的设备。


## 故障排除

1. 如果您忘记了本地用户的登录名或密码，请[查看此文章](https://www.home-assistant.io/docs/locked_out/)以恢复您的凭据。