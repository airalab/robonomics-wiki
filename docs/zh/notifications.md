---
title: Robonomics智能家居

contributors: [LoSk-p]
---

您可以通过[notify](https://notify.events/)在智能手机上接收通知。首先在那里注册并在`Control Panel`上创建新通道：

![control_panel](../images/home-assistant/not_control_panel.png)

添加标题并按`Save`：

![channel](../images/home-assistant/not_create_chanell.png)

然后按`Add Source`并在`IoT and Smart Home`选项卡中选择`Home Assistant`：

![source](../images/home-assistant/not_add_source.png)

编写标题并按`Next`：

![source_next](../images/home-assistant/not_add_source_next.png)

在那里您将看到您需要添加到Home Assistant配置文件中的令牌。将其保存在某个地方并按`Done`：

![token](../images/home-assistant/not_token.png)

然后按`Subscribe`以添加订阅者：

![subscribe](../images/home-assistant/not_subscribe.png)

选择您想要的任何订阅者并按照说明操作。

现在您需要在计算机上使用Home Assistant编辑配置。在`homeassistant`用户下打开`configuration.yaml`文件：

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

并添加以下行：

```yaml
notify_events:
    token: <your token from notify>
```
在`automation:`行之后还要添加新的自动化：
```yaml
- alias: notifications
  trigger:
  - entity_id: binary_sensor.contact_sensor_contact
    platform: state
    from: 'off'
    to: 'on'
  action:
  - service: notify.notify
    data:
      message: Door was changed to {{ states("binary_sensor.contact_sensor_contact") }}
```
此自动化将在传感器实体ID`binary_sensor.contact_sensor_contact`状态从`off`更改为`on`时发送消息`Door was changed to on/off`。

然后重新启动Home Assistant：
```bash
systemctl restart home-assistant@homeassistant.service
```