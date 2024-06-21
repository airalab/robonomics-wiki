---
title: 备份服务

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-在部分中，超时是以秒为单位的，它将创建包含以下信息的数据日志：tegration
---

**在本文中，您将学习如何生成Home Assistant配置的备份，并在需要时进行恢复。为了创建备份，调用一个服务来生成带有配置文件的安全存档。如果存在，该服务还会添加Mosquitto代理和Zigbee2MQTT配置到备份中。然后，该服务将存档添加到IPFS并将结果CID存储在Robonomics数字孪生中。**
## 创建Home Assistant配置的备份

创建备份可以在发生故障时轻松恢复Home Assistant配置。

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type:'mp4'}]" />

<robo-wiki-note type="warning" title="警告">

为了备份和恢复配置，需要使用一个 **自定义IPFS网关** ，如Pinata。如果没有它，您的备份将仅存储在本地IPFS节点上，这可能会阻止您在本地节点故障时恢复Home Assistant配置。

</robo-wiki-note>

1. 在Home Assistant的Web界面中，转到 `Developer Tools` -> `Services`. 搜索 `Robonomics: Save Backup to Robonomics` 并点击 `CALL SERVICE`.

2. 等待直到您看到通知 `Backup was updated in Robonomics` 出现在 `Notification`.

<robo-wiki-note type="warning" title="WARNING">

请勿在加载Home Assistant和Robonomics Integration后立即尝试创建备份或恢复配置。请 **等待约5分钟** 以完成初始设置。

</robo-wiki-note>

服务参数：
- **完整备份**  (default: False) - 将数据库添加到备份中，以便存储实体状态的历史记录.
- **Mosquitto密码文件的路径** (default: `/etc/mosquitto`) - 如果您使用Home Assistant Core或Docker安装方法，并且没有默认的Mosquitto代理路径，您应该更改此参数。 *Home Assistant OS或Superviser不需要*.

## 从备份中恢复Home Assistant配置

为了恢复配置，您需要安装Home Assistant和Robonomics Integration。 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type:'mp4'}]" />

<robo-wiki-note type="warning" title="WARNING">

为了确保在Home Assistant Core和Docker安装方法中成功恢复配置，您需要执行本页末尾所述的其他设置步骤。

</robo-wiki-note>

1. 使用所需的安装方法按照文章中的步骤安装Home Assistant与Robonomics Integration（如果尚未安装） [期望的安装方法](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [设置Robonomics集成](https://wiki.robonomics.network/docs/robonomics-hass-integration)使用您在之前的 Robonomics 配置中使用的 **相同的种子**。 如果您的订阅已结束，[重新激活](https://wiki.robonomics.network/docs/sub-activate).


3. 在 Home Assistant 的 Web 界面中，转到`Developer Tools` -> `Services`。 搜索“Robonomics: Restore from the Backup in Robonomics`，`CALL SERVICE`。 导航到`Overview`页面，检查备份的状态。

4. 恢复后，Home Assistant会自动重启。 如果由于某种原因 Home Assistant 没有重新启动，您可以通过监视 `robonomics.backup` 实体的状态来检查恢复状态。 如果状态为 `restored`，您将需要导航到 `Settings` > `System` 并单击右上角的 `RESTART` 按钮来手动重新启动 Home Assistant。
 
5. 如果您的备份包括Zigbee2MQTT或Mosquitto配置，您需要重新启动这些服务以启用新的配置。您可以通过逐个重新启动服务来手动执行此操作，或者您可以简单地重新启动Home Assistant计算机以确保所有服务都重新启动。

如果您使用的是Home Assistant Core或Docker安装方法，并且没有默认的Mosquitto brocker路径，您应该更改此参数。

Service arguments:
- **Path to mosquitto password file** (default: `/etc/mosquitto`) - 如果您使用的是Home Assistant Core或Docker安装方法，并且没有默认的Mosquitto brocker路径，您应该更改此参数。*Home Assistant OS或Superviser不需要*
- **Zigbee2MQTT 配置的路径**  (default: `/opt/zigbee2mqtt`) - 如果您使用 Home Assistant Core 或 Docker 安装方法并且没有 Zigbee2MQTT 的默认路径，则应更改此参数。 *Home Assistant OS或Superviser不需要*

## 恢复Home Assistant核心安装方法的Mosquitto和Zigbee2MQTT配置

如果备份包含 Mosquitto 或 Zigbee2MQTT 的配置，则在恢复过程中，它们将被放置在默认路径或参数中指定的路径中。 但是，如果您在现有 Home Assistant Core  *(不是从预安装的 Robonomics 映像中)* 安装了 Robonomics 集成，则 `homeassistant` 用户可能无权访问此路径。

因此，要恢复 Mosquitto 和 Zigbee2MQTT 的配置，您需要向用户“homeassistant”授予必要的读取权限：
```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Home Assistant Docker安装方法的备份Mosquitto和Zigbee2MQTT配置

要从 Docker 容器备份 Mosquitto 和 Zigbee2MQTT 配置，您需要为其各自的配置创建卷。 这可以通过使用附加参数运行 Home Assistant 容器来实现：

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

或在 `compose.yaml` 文件中进行更改：

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```
<robo-wiki-note type="note" title="Note">

请注意，Mosquitto 和 Zigbee2MQTT 配置的默认路径分别是 `/etc/mosquitto` 和 `/opt/zigbee2mqtt`。 但是，这些路径可能会根据您的具体设置而有所不同。

</robo-wiki-note>

## 备份按钮

除了使用服务处理备份之外，您还可以使用 Robonomics 集成中的 `button.create_backup` 和`button.restore_from_backup` 按钮来简化流程。 这些按钮使用默认参数调用相应的服务（备份按钮创建没有历史记录的备份）。

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type:'mp4'}]" />

要将按钮添加到仪表板，请按照下列步骤操作：

1. 点击仪表板右上角的三个点。
2. 选择 `Edit Dashboard`.
3. 单击右下角的 `Add Card` 按钮。
4. 选择 `Entities` 卡。
5. 在 `Entities` 字段中，搜索button.create_backup 和button.restore_from_backup 实体。
6. 按 `Save` 将实体添加到卡中。
7. 单击右上角的 `Done` 按钮完成编辑。


