---
title: Robonomics SLS 网关

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**在本文中，您将设置 Robonomics SLS 网关。您将安装网关所需的软件，配置它并将其连接到 Home Assistant。**

<robo-wiki-picture src="home-assistant/sls_gateway.png" />

## 固件

首先，您需要安装网关的微控制器固件。通过将 SLS 网关底部的开关 `1` 和 `3` 设置为 `ON`，其他开关必须设置为 `OFF` 来准备网关。

<robo-wiki-picture src="home-assistant/sls-gateway-13.gif" />

通过网关上的 USB Type-C 端口将网关连接到您的 Raspberry Pi。

<robo-wiki-picture src="home-assistant/sls-rpi.gif" />

将固件的存储库克隆到您的 Raspberry Pi 上：

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

</code-helper>

转到 `robonomics-hass-utils/esp_firmware/linux`。要刷新 SLS 网关，您需要运行 `Clear` 和 `Flash_16mb` 脚本。

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

</code-helper>

### 故障排除

如果您在更新网关固件时遇到问题，您需要采取其他步骤：

1. 确保您已安装 pySerial 模块：

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
pip install pyserial
```
</code-helper>

2. 为您的用户授予对 USB 端口的访问权限并重新启动计算机：

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```
</code-helper>

3. 在某些情况下，需要更改脚本中的带宽设置以更新固件。使用 `nano` 编辑器打开 `Flash_16mb.sh` 脚本，并将波特率参数从 `921600` 更改为较小的值（例如 `115200`）。

## 配置

1. 从计算机断开 SLS 网关。将网关背面的开关设置为正确的位置。开关 `5`（RX Zigbee 到 ESP）和 `6`（TX Zigbee 到 ESP）必须处于 `ON` 位置，其他开关必须设置为 `OFF`。 

<robo-wiki-picture src="home-assistant/sls-gateway-56.gif" />

2. 连接 Type-C 电源电缆。中心的指示灯应变为绿色。

<robo-wiki-picture src="home-assistant/sls-gateway-connect.gif" />

3. 在首次启动时，网关将开始共享 Wi-Fi，SSID 为 `zgw****`。连接到此网络。请注意，信号可能相当弱，因此最好将 SLS 网关靠近您的计算机。 

<robo-wiki-picture src="home-assistant/sls-gateway-wifi.gif" />

4. 如果连接成功，将打开 Web 界面（或您可以在 192.168.1.1 地址上找到它）。 

5. 您将看到 `Wi-Fi Settings` 页。选择您的 Wi-Fi 并输入密码。按下 `Apply` 按钮。网关将重新启动并连接到您的 Wi-Fi 网络。 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type:'mp4'}]" />

6. 找到 SLS 网关的本地 IP 以访问 Web 界面。您可以使用 [Fing 移动应用](https://www.fing.com/products) 或 [nmap CLI 工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) 来查找它。网关名称应该类似于 `zgw****`。通过将网关 IP 粘贴到浏览器中，打开网关的 Web 界面。

7. 转到 `Setting` -> `Hardware`，确保设置与图像上的设置相同。如有必要，请更正设置并单击 `Save` 按钮：

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type:'mp4'}]" />

所需值的表格：

| Field                    | Value              |
|--------------------------|:-------------------|
| Zigbee module            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Service Button Pin       | 33 (pullUP - true) |
| Number addressable leds  | 0                  |
| Led Red (or addr)        | 21                 |
| Led Green                | 5                  |
| Led Blue                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. 然后重新启动网关。在右上角选择 `Actions` -> `Reboot system`。

9. 确保网关在 Zigbee 信息窗口中正常工作。DeviceState 应为 `OK`。

10. 自动配置将设备添加到 Home Assistant。转到 `Zigbee` -> `Config`，然后选择 `Home Assistant MQTT Discovery` 和 `Clear States`。保存更改，然后再次 **重新启动** SLS 网关。

<robo-wiki-note type="warning">

如果您家中已经有一个活动的 SLS 网关，并且您现在正在配置另一个网关，则它们将互相冲突。要解决此问题，您需要更改新设备上的信道。为此，请转到 `Zigbee` -> `Config` 并将信道更改为其他信道（例如信道 15）。

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZ', type:'mp4'}]" />

## 将 SLS 配对到 MQTT

在配置 SLS 网关之后，您需要将 SLS 网关连接到 Home Assistant。打开 SLS 网关的 Web 界面，然后转到 `Settings/Link` -> `MQTT Setup`：


添加您的代理地址（本地网络中具有 Home Assistant 的 Raspberry Pi 的地址，您可以使用 [Fing 移动应用](https://www.fing.com/products) 或 [nmap CLI 工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) 找到它），端口（默认为 `1883`），代理用户名和密码（您之前创建的）以及主题名称（您可以选择任何）。此外，树莓派的 IP 地址必须是静态的。单击 `Enable` 和 `Retain states`。

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdNKDqwwy87VQEDDVsX5kpaDQm9wKKPEJUNJnhnjx6e5y', type:'mp4'}]" />

保存更改。现在设备将自动显示在 Home Assistant 中。

## 连接设备

通过转到`Zigbee` -> `Join`来连接您的设备。将您的传感器置于配对模式下，将设备切换到连接模式的最常见方法是按住其电源按钮或将其开/关5次。按下`Enable Join`按钮开始搜索Zigbee设备。您将看到活动传感器。

<robo-wiki-picture src="home-assistant/switch-device.gif" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type:'mp4'}]" />


现在您可以转到[**IoT订阅**](/docs/sub-activate)部分并开始激活Robonomics订阅。
