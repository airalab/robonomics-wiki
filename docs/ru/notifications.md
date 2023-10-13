---
title: Robonomics Smart Home

contributors: [LoSk-p]
---

Вы можете получать уведомления на свой смартфон с помощью [notify](https://notify.events/). Сначала зарегистрируйтесь там и на `Control Panel` создайте новый канал:

![control_panel](../images/home-assistant/not_control_panel.png)

Добавьте заголовок и нажмите `Save`:

![channel](../images/home-assistant/not_create_chanell.png)

Затем нажмите `Add Source` и выберите `Home Assistant` во вкладке `IoT and Smart Home` tab:

![source](../images/home-assistant/not_add_source.png)

Напишите заголовок и нажмите `Next`:

![source_next](../images/home-assistant/not_add_source_next.png)

Там вы увидите токен, который вам нужно добавить в файл конфигурации для Home Assistant. Сохраните его где-нибудь и нажмите `Done`:

![token](../images/home-assistant/not_token.png)

затем нажмите `Subscribe`, чтобы добавить подписчиков:

![subscribe](../images/home-assistant/not_subscribe.png)

Выберите любого подписчика, которого вы хотите, и следуйте инструкциям.

Теперь вам нужно отредактировать конфигурацию на вашем компьютере с помощью Home Assistant. Откройте файл `configuration.yaml` под пользователем `homeassistant`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

И добавьте эти строки:

```yaml
notify_events:
    token: <your token from notify>
```
Также добавьте новую автоматизацию после строки `automation:`:
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
Эта автоматизация будет отправлять сообщение `Door was changed to on/off` после изменения состояния датчика с идентификатором сущности `binary_sensor.contact_sensor_contact` с `off` на `on`.

И перезапустите Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```