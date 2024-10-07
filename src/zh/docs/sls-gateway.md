---
title: Robonomics SLS 网关

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS 固件 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**在本文中，您将设置 Robonomics SLS 网关。您将安装网关所需的软件，配置它并将其连接到 Home Assistant。**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"sls gateway"} %}{% endroboWikiPicture %}

## 固件

首先，您需要安装网关的微控制器固件。通过将 SLS 网关底部的开关 `1` 和 `3` 设置为 `ON`，其他开关必须设置为 `OFF` 来准备网关。

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"sls gateway 13"} %}{% endroboWikiPicture %}

通过网关上的 USB Type-C 端口将网关连接到您的 Raspberry Pi。

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

将固件存储库克隆到您的 Raspberry Pi：

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

{% endcodeHelper %}

前往 `robonomics-hass-utils/esp_firmware/linux`。要刷新SLS网关，您需要运行 `Clear` 和 `Flash_16mb` 脚本。

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### 故障排除

如果您在更新网关固件时遇到问题，您需要采取额外步骤：

1. 确保已安装 pySerial 模块：

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}

2. 授予用户对USB端口的访问权限并重新启动计算机：

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}


3. 在某些情况下，需要更改脚本中的带宽设置以更新固件。使用 `nano` 编辑器打开 `Flash_16mb.sh` 脚本并将波特率参数从 `921600` 更改为较小的值（例如 `115200`）。

## 配置

1. 从计算机断开 SLS 网关的连接。将网关背面的开关设置到正确的位置。开关 `5`（RX Zigbee 到 ESP）和 `6`（TX Zigbee 到 ESP）必须处于 `ON` 位置，其他开关必须处于 `OFF` 位置。

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. 连接 Type-C 电源线。中心的指示灯应该变成绿色。

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. 在第一次启动时，网关将开始共享 Wi-Fi，SSID 为 `zgw****`。连接到这个网络。请注意信号可能会相当弱，因此最好将 SLS 网关靠近您的计算机。

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. 如果连接成功，Web 界面将打开（或者您可以在 192.168.** 上找到它。1.1 地址）。

5. 您将看到 `Wi-Fi 设置` 页面。选择您的 Wi-Fi 并输入密码。按下 `应用` 按钮。网关将重新启动并连接到您的 Wi-Fi 网络。

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. 查找 SLS 网关的本地 IP 以访问 Web 界面。您可以使用 [Fing 移动应用](https://www.fing.com/products) 或 [nmap CLI 工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) 来查找。网关名称应该类似于 `zgw****`。通过将网关 IP 粘贴到浏览器中打开网关的 Web 界面。

7. 转到 `设置` -> `硬件`，确保设置看起来像图片上的那样。如有必要，请更正设置并单击 `保存` 按钮：

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

需要的值的表格：

| 字段                    | 值                |
|--------------------------|:-------------------|
| Zigbee 模块              | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST 引脚          | 18                 |
| Zigbee BSL 引脚          | 19                 |
| 服务按钮引脚             | 33 (上拉 - true)    |
| 可寻址 LED 数量         | 0                  |
| 红色 LED (或地址)        | 21                 |
| 绿色 LED                | 5                  |
| 蓝色 LED                | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. 然后重新启动网关。在右上角选择 `操作` -> `重新启动系统`。

9. 确保网关在 Zigbee 信息窗口中正常工作。DeviceState 应为 `OK`。

10. 配置自动将设备添加到 Home Assistant。转到 `Zigbee` -> `配置`，然后选择 `Home Assistant MQTT Discovery` 和 `Clear States`。保存更改，然后再次**重新启动** SLS 网关。

{% roboWikiNote {type: "warning"}%} 如果您家中已经有一个活动的 SLS 网关，并且现在正在配置另一个如果您尝试将两个 Zigbee 网络设备连接到同一个 MQTT 代理，它们将发生冲突。要解决这个问题，您需要在新设备上更改频道。要做到这一点，请转到 `Zigbee` -> `Config` 并将频道更改为另一个频道（例如频道 15）。{% endroboWikiNote %}

## 将 SLS 配对到 MQTT

在配置 SLS 网关之后，您需要将 SLS 网关连接到 Home Assistant。打开 SLS 网关的 Web 界面，转到 `Settings/Link` -> `MQTT Setup`：

添加您的代理地址（本地网络中带有 Home Assistant 的 Raspberry Pi 的地址，您可以使用 [Fing 移动应用](https://www.fing.com/products) 或 [nmap CLI 工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) 找到它），端口（默认为 `1883`），代理用户名和密码（您之前创建的），以及主题名称（您可以选择任何名称）。此外，Raspberry Pi 的 IP 地址必须是静态的。点击 `Enable` 和 `Retain states`。保存更改。现在设备将自动显示在Home Assistant中。

## 连接设备

通过转到 `Zigbee` -> `加入` 来连接您的设备。将您的传感器置于配对模式，将设备切换到连接模式的最常见方法是按住其电源按钮或将其开关打开/关闭5次。按下 `启用加入` 按钮开始搜索Zigbee设备。您将看到活动传感器。

{% roboWikiVideo {videos:[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

现在您可以转到 [**IoT 订阅**](/docs/sub-activate) 部分并开始激活Robonomics订阅。