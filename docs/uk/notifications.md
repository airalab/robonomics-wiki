---
title: Robonomics Smart Home

contributors: [LoSk-p]
---

Ви можете отримувати сповіщення на свій смартфон за допомогою [notify](https://notify.events/). Спочатку зареєструйтесь там і на `Control Panel` створіть новий канал:

![control_panel](../images/home-assistant/not_control_panel.png)

Додайте заголовок і натисніть `Save`:

![channel](../images/home-assistant/not_create_chanell.png)

Потім натисніть `Add Source` і виберіть `Home Assistant` в закладці `IoT and Smart Home`:

![source](../images/home-assistant/not_add_source.png)

Напишіть заголовок і натисніть `Next`:

![source_next](../images/home-assistant/not_add_source_next.png)

Там ви побачите токен, який вам потрібно додати до файлу конфігурації для Home Assistant. Збережіть його десь і натисніть `Done`:

![token](../images/home-assistant/not_token.png)

потім натисніть `Subscribe`, щоб додати підписників:

![subscribe](../images/home-assistant/not_subscribe.png)

Виберіть будь-якого підписника, якого ви хочете, і дотримуйтесь інструкцій.

Тепер вам потрібно відредагувати конфігурацію на своєму комп'ютері з Home Assistant. Відкрийте файл `configuration.yaml` під користувачем `homeassistant`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

І додайте ці рядки:

```yaml
notify_events:
    token: <your token from notify>
```
Також додайте нову автоматизацію після рядка `automation:`:
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
Ця автоматизація надсилатиме повідомлення `Door was changed to on/off`, коли датчик з ідентифікатором сутності `binary_sensor.contact_sensor_contact` змінює стан з `off` на `on`.

І перезапустіть Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```