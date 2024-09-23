---

title: Robonomics Smart Home

contributors: [LoSk-p]

---

You can receive notifications on your smartphone with [notify](https://notify.events/). Girstly register there and on `Control Panel` create new channel:

{% roboWikiPicture {src:"docs/home-assistant/not_control_panel.png", alt:"control_panel"} %}{% endroboWikiPicture %}

Add title and press `Save`:

{% roboWikiPicture {src:"docs/home-assistant/not_create_chanell.png", alt:"channel"} %}{% endroboWikiPicture %}

Then press `Add Source` and choose `Home Assistant` in `IoT and Smart Home` tab:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source.png", alt:"source"} %}{% endroboWikiPicture %}

Write title and press `Next`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source_next.png", alt:"source_next"} %}{% endroboWikiPicture %}

There you will see the token which you need to add to your configuration file for home Assistant. Save it somewhere and press `Done`:

{% roboWikiPicture {src:"docs/home-assistant/not_token.png", alt:"token"} %}{% endroboWikiPicture %}

then press `Subscribe` to add subscribers:

{% roboWikiPicture {src:"docs/home-assistant/not_subscribe.png", alt:"subscribe"} %}{% endroboWikiPicture %}

Choose whatever subscriber you want and follow the instructions.

Now you need to edit configuration on your computer with Home Assistant. Under `homeassistant` user open `configuration.yaml` file:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

And add theese lines:


```yaml
notify_events:
    token: <your token from notify>
```
Also add new automation after `automation:` line:

{% codeHelper { copy: true}%}

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
      message: Door was changed to {{ '{{states("binary_sensor.contact_sensor_contact")}}' }}
```

{% endcodeHelper %}

This automation will send message `Door was changed to on/off` after sensor with entity id `binary_sensor.contact_sensor_contact` change state from `off` to `on`.

And restart Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```