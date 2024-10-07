---
title: 如何连接 SDS011 传感器

contributors: [tubleronchik]
---

**以下是如何将您的传感器连接到 Robonomics 传感器网络和 Home Assistant 的逐步指南。我们的传感器使用 Robonomics 固件，这是 sensor.community 固件的增强版本。它包括额外的传感器，并具有修改后的数据发送机制。**

{% roboWikiNote {type: "warning"}%} 所有来自 Robonomics 的设备都可以在官方[网站](https://robonomics.network/devices/)上购买。
{% endroboWikiNote %}


## 设置

1. 将传感器插入插座以供电。
2. 该板将创建一个名为 `RobonomicsSensor-xxxxxxxxx` 的 Wi-Fi 网络。从您的手机或计算机连接到该网络：您将看到授权窗口（如果没有，请打开浏览器并转到 `192.168.4.1`）。
3. 从列表中选择您的 Wi-Fi 网络（如果列表中没有，请自行填写），并填写密码字段。
{% roboWikiNote {type: "warning", title: "INFO"}%} 传感器只能连接到 2.4GHz 的 Wi-Fi 网络。 {% endroboWikiNote %}
{% roboWikiPicture {src:"docs/sds-sensor-wifi.png", alt:"sds-sensor-wifi"} %}{% endroboWikiPicture %}
4. 写下传感器将安装的位置的坐标。您可以从任何地图获取它们，或者使用[此链接](https://www.latlong.net/convert-address-to-lat-long.html)从地址获取。
{% roboWikiNote {type: "warning", title: "WARNING"}%} 然后传感器坐标将显示在一个公开可用的地图上。如果您不想显示您的私人信息，请写下接近但不是确切的坐标。
{% endroboWikiNote %}
5. 点击 `保存配置并重新启动`。板将重新启动并连接到指定的 Wi-Fi 网络。
6. 打开[Robonomics 传感器地图](https://sensors.robonomics.network/#/)，找到您安装传感器的位置。几分钟后，您将能够在地图上看到您的传感器及其数据。
{% roboWikiPicture {src:"docs/sds-sensor-map.png", alt:"sds-sensor-map"} %}ensor-map"} %}{% endroboWikiPicture %}

## Home Assistant

有两种安装选项可供选择：

### 选项 1：HACS

通过HACS添加本地Luftdaten传感器是最简单的方法。您可以在[这里](https://hacs.xyz/docs/setup/download/)找到关于如何设置HACS的简要说明。

安装了HACS后，转到HACS -> 集成，并搜索`Local Luftdaten Sensor`集成。单击下载按钮，一旦集成下载完成，重新启动Home Assistant。
{% roboWikiPicture {src:"docs/sds-hacs.png", alt:"sds-hacs"} %}{% endroboWikiPicture %}

### 选项 2：手动安装

在`homeassistant`用户下，克隆项目存储库：

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
```

{% endcodeHelper %}

如果您已经有任何自定义集成，请将`custom_components/local_luftdaten/`复制到您的`custom_components`目录，例如：

{% codeHelper { copy: true}%}

```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

如果您没有任何自定义集成，请将整个`custom_components`目录复制到您的Home Assistant配置目录。例如：

{% codeHelper { copy: true}%}

 ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## 配置

在您的`configuration.yaml`中创建一个新的传感器条目，并调整主机名或IP地址。要找到传感器的本地IP地址，您可以使用[Fing移动应用](https://www.fing.com/products)或[nmap CLI工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)。名称可以是任意的。

|参数              |类型    | 必需性    | 描述
|:----------------------|:-------|:------------ |:------------
|`host`                 | 字符串 | 必需     | 传感器的IP地址
|`scan_interval`        | 数字 | 默认值: 180 | 更新之间的频率（以秒为单位）
|`name`                 | 字符串 | 必需    | 传感器名称
|`monitored_conditions` | 列表   | 必需     | 监测传感器的列表


{% codeHelper { copy: true}%}


  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: 空气质量传感器
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```

{% endcodeHelper %}

> 可在[存储库](https://github.com/lichtteil/local_luftdaten)中找到所有支持的传感器列表。

重新启动您的Home Assistant。
之后，您可以将传感器添加到您的仪表板中。实体的名称将是您添加到`configuration.yaml`中的名称。

{% roboWikiPicture {src:"docs/sds-configuration-card.png", alt:"sds-configuration-car"} %}{% endroboWikiPicture %}