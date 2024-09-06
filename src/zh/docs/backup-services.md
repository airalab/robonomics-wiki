---
title: 备份服务

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**在本文中，您将学习如何生成Home Assistant配置的备份，并在需要时进行恢复。要创建备份，会调用一个服务，生成一个包含配置文件的安全存档。如果存在，该服务还会将Mosquitto代理和Zigbee2MQTT配置添加到备份中。然后，该服务将存档添加到IPFS，并将生成的CID存储在Robonomics数字孪生中。**
## 创建Home Assistant配置的备份

创建备份可以让您在发生故障时轻松恢复Home Assistant配置。

{% roboWikiVideo {videos:[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning", title: "警告"}%}为了备份和恢复您的配置，必须使用**自定义IPFS网关**，如Pinata。如果没有，您的备份将仅存储在本地IPFS节点上，这可能会阻止您在本地节点故障时恢复Home Assistant配置。
{% endroboWikiNote %}

1. 在Home Assistant的Web界面中，转到`开发者工具` -> `服务`。搜索`Robonomics: Save Backup to Robonomics`并点击`调用服务`。

2. 等待直到在`通知`中出现`备份已在Robonomics中更新`的通知。


{% roboWikiNote {type: "warning", title: "警告"}%}请勿在加载Home Assistant和Robonomics集成后立即尝试创建备份或恢复配置。请**等待约5分钟**，以便完成初始设置。{% endroboWikiNote %}

服务参数:
- **完整备份**（默认值：False）- 将数据库添加到备份中，因此将存储实体状态的历史记录。
- **Mosquitto密码文件路径**（默认值：`/etc/mosquitto`) - 如果您使用的是Home Assistant Core或Docker安装方法，并且没有默认路径到Mosquitto代理，您应该更改此参数。*对于Home Assistant OS或Superviser不需要*。

## 从备份中恢复Home Assistant配置

为了恢复您的配置，您需要安装Home Assistant和Robonomics集成。

{% roboWikiVideo {videos:[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}为了确保在Home Assistant Core和Docker安装方法中成功恢复您的配置，您需要按照页面末尾描述的额外设置步骤进行操作。
{% endroboWikiNote %}

1. 安装带有Robonomics集成的Home Assistant（如果尚未安装），请按照[所需安装方法](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home)中的步骤进行操作。

2. [设置Robonomics集成](https://wiki.robonomics.network/docs/robonomics-hass-integration)，使用**与之前Robonomics配置中相同的种子**。如果您的订阅已结束，请[重新激活](https://wiki.robonomics.network/docs/sub-activate)。

3. 在Home Assistant的Web界面中，转到`Developer Tools` -> `Services`。搜索`Robonomics: Restore from the Backup in Robonomics`并点击`CALL SERVICE`。转到`Overview`页面，检查备份的状态。

4. 恢复后，Home Assistant将自动重新启动。如果由于某种原因Home Assistant没有重新启动，您可以通过监视`robonomics.backup`实体的状态来检查恢复状态。如果状态为`restored`，您需要手动重新启动Home Assistant，方法是转到`Settings` > `System`，然后点击右上角的`RESTART`按钮。

5. 如果您的备份包括Zigbee2MQTT或Mosquitto配置，则需要重新启动这些服务以启用新配置。您可以这样做。通过逐个重新启动服务，或者简单地重新启动Home Assistant计算机来确保所有服务都已重新启动。

服务参数：
- **Mosquitto密码文件路径**（默认值：`/etc/mosquitto`）- 如果您使用Home Assistant Core或Docker安装方法，并且没有默认路径到Mosquitto代理，您应该更改此参数。*对于Home Assistant OS或Superviser不需要*。
- **Zigbee2MQTT配置路径**（默认值：`/opt/zigbee2mqtt`）- 如果您使用Home Assistant Core或Docker安装方法，并且没有默认路径到Zigbee2MQTT，您应该更改此参数。*对于Home Assistant OS或Superviser不需要*。

## 恢复Home Assistant Core安装方法的Mosquitto和Zigbee2MQTT配置

如果备份包括Mosquitto或Zigbee2MQTT的配置，在恢复过程中，它们将被放置在默认路径或参数中指定的路径。但是，如果您在现有的Home Assistant Core中安装了Robonomics集成*(而不是从预安装的Robonomics镜像中安装)*，`homeassistant`用户可能无法访问此路径。

因此，为了恢复Mosquitto和Zigbee2MQTT的配置，您需要授予用户`homeassistant`所需的读取权限：

```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## 备份Home Assistant Docker安装方法的Mosquitto和Zigbee2MQTT配置

要从Docker容器备份Mosquitto和Zigbee2MQTT配置，您需要为它们各自的配置创建卷。这可以通过使用附加参数运行Home Assistant容器来实现：

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

或者在您的`compose.yaml`文件中进行更改：

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
```    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```

{% roboWikiNote {type: "note", title:"注意"}%}请注意，Mosquitto和Zigbee2MQTT配置的默认路径分别为`/etc/mosquitto`和`/opt/zigbee2mqtt`。但是，这些路径可能会根据您的具体设置而有所不同。
{% endroboWikiNote %}

## 备份按钮

除了使用服务来处理备份之外，您还可以通过使用Robonomics集成的`button.create_backup`和`button.restore_from_backup`按钮来简化流程。这些按钮使用默认参数调用相应的服务（备份按钮创建不带历史记录的备份）。

{% roboWikiVideo {videos:[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

要将按钮添加到您的仪表板，请按照以下步骤操作：

1. 单击仪表板右上角的三个点。
2. 选择`编辑仪表板`。
3. 单击右下角的`添加卡片`按钮。
4. 选择`实体`卡片。
5. 在`实体`字段中，搜索`button.create_backup`和`button.restore_from_backup`实体。
6. 按`保存`将实体添加到卡片中。
7. 点击右上角的`完成`按钮完成编辑。