---
title: 如何将SDS011传感器添加到Home Assistant

contributors: [tubleronchik]
---

本文介绍了如何将SDS空气质量传感器与[Luftdaten](https://github.com/opendata-stuttgart/sensors-software)和[Robonomics](https://github.com/airalab/sensors-software)固件连接到Home Assistant。

## 安装 
有两种安装选项可用：

### 选项1：HACS

通过HACS加本地Luftdaten传感器是最简单的方法。[这里](https://hacs.xyz/docs/setup/download/)可以找到有关如何设置HACS的简要说明。

安装HACS后，导航到HACS->集成并搜索“Local Luftdaten Sensor”集成。单击下载按钮，下载完成后重新启动Home Assistant。
<robo-wiki-picture src="sds-hacs.png"/>

### 选项2：手动安装

在homeassistant用户下，克隆项目存储库：

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

如果您已经有任何自定义集成，请将`custom_components/local_luftdaten/`复制到您的`custom_components`目录中，例如：

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```
</code-helper>
如果您没有任何自定义集成，请将整个`custom_components`目录复制到您的Home Assistant配置目录中，例如：

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```
</code-helper>

## 配置

在您的`configuration.yaml`中创建一个新的传感器条目，并调整主机名或IP地址。要找到传感器的本地IP地址，您可以使用[Fing移动应用程序](https://www.fing.com/products)或[nmap CLI工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)。名称可以是任何名称。

|Parameter              |Type    | Necessity    | Description
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | required     | IP address of the sensor
|`scan_interval`        | number | default: 180 | Frequency (in seconds) between updates
|`name`                 | string | required     | Name of the sensor
|`monitored_conditions` | list   | required     | List of the monitored sensors

<code-helper copy>

  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Air quality sensor
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```
</code-helper>

> 所有支持的传感器列表可以在[存储库](https://github.com/lichtteil/local_luftdaten)中找到。

重新启动您的Home Assistant。
之后，您可以将传感器添加到您的仪表板。实体的名称将是您添加到`configuration.yaml`中的名称。
<robo-wiki-picture src="sds-configuration-card.png"/>