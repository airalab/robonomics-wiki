---

title: Robonomics智能家居

contributors: [LoSk-p]

---

您可以通过[notify](https://notify.events/)在智能手机上接收通知。首先在那里注册，在`控制面板`上创建新通道：

{% roboWikiPicture {src:"docs/home-assistant/not_control_panel.png", alt:"control_panel"} %}{% endroboWikiPicture %}

添加标题并点击`保存`：

{% roboWikiPicture {src:"docs/home-assistant/not_create_chanell.png", alt:"channel"} %}{% endroboWikiPicture %}

然后点击`添加来源`，在`IoT和智能家居`选项卡中选择`Home Assistant`：

{% roboWikiPicture {src:"docs/home-assistant/not_add_source.png", alt:"source"} %}{% endroboWikiPicture %}

填写标题并点击`下一步`：

{% roboWikiPicture {src:"docs/home-assistant/not_add_source_next.png", alt:"source_next"} %}{% endroboWikiPicture %}

在那里您将看到您需要添加到Home Assistant配置文件中的令牌。将其保存在某处，然后点击`完成`：

{% roboWikiPicture {src:"docs/home-assistant/not_token.png", alt:"token"} %}{% endroboWikiPicture %}

然后点击`订阅`以添加订阅者：

{% roboWikiPicture {src:"docs/home-assistant/not_subscribe.png", alt:"subscribe"} %}{% endroboWikiPicture %}

选择您想要的订阅者并按照说明操作。

现在您需要在计算机上使用Home Assistant编辑配置。在`homeassistant`用户下打开`configuration.yaml`文件：

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

并添加以下行：

```yaml
notify_events:
    token: <来自notify的您的令牌>
```

在`automation:`行之后还要添加新的自动化：

{% codeHelper { copy: true}%}

```yaml
- alias: 通知
  trigger:
  - entity_id: binary_sensor.contact_sensor_contact
    platform: state
    from: 'off'
    to: 'on'
  action:
  - service: notify.notify
    data:
      message: 门已更改为{{ '{{states("binary_sensor.contact_sensor_contact")}}' }}
```

{% endcodeHelper %}

此自动化将在实体ID为`binary_sensor.contact_sensor_contact`的传感器状态从`off`更改为`on`时发送消息`门已更改为on/off`。

然后重新启动Home Assistant：
```bash
systemctl restart home-assistant@homeassistant.service
```