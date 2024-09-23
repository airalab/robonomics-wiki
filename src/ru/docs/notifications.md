---

title: Robonomics Smart Home

contributors: [LoSk-p]

---

Вы можете получать уведомления на свой смартфон с помощью [notify](https://notify.events/). Сначала зарегистрируйтесь там и на `Панели управления` создайте новый канал:

{% roboWikiPicture {src:"docs/home-assistant/not_control_panel.png", alt:"control_panel"} %}{% endroboWikiPicture %}

Добавьте заголовок и нажмите `Сохранить`:

{% roboWikiPicture {src:"docs/home-assistant/not_create_chanell.png", alt:"channel"} %}{% endroboWikiPicture %}

Затем нажмите `Добавить источник` и выберите `Home Assistant` во вкладке `IoT и умный дом`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source.png", alt:"source"} %}{% endroboWikiPicture %}

Напишите заголовок и нажмите `Далее`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source_next.png", alt:"source_next"} %}{% endroboWikiPicture %}

Здесь вы увидите токен, который вам нужно добавить в файл конфигурации для Home Assistant. Сохраните его где-нибудь и нажмите `Готово`:

{% roboWikiPicture {src:"docs/home-assistant/not_token.png", alt:"token"} %}{% endroboWikiPicture %}

затем нажмите `Подписаться`, чтобы добавить подписчиков:

{% roboWikiPicture {src:"docs/home-assistant/not_subscribe.png", alt:"subscribe"} %}{% endroboWikiPicture %}

Выберите любого подписчика и следуйте инструкциям.

Теперь вам нужно отредактировать конфигурацию на вашем компьютере с Home Assistant. Под пользователем `homeassistant` откройте файл `configuration.yaml`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

И добавьте эти строки:


```yaml
notify_events:
    token: <ваш токен из notify>
```
Также добавьте новую автоматизацию после строки `automation:`:

{% codeHelper { copy: true}%}

```yaml
- alias: уведомления
  trigger:
  - entity_id: binary_sensor.contact_sensor_contact
    platform: state
    from: 'off'
    to: 'on'
  action:
  - service: notify.notify
    data:
      message: Дверь была изменена на {{ '{{states("binary_sensor.contact_sensor_contact")}}' }}
```

{% endcodeHelper %}

Эта автоматизация будет отправлять сообщение `Дверь была изменена на вкл/выкл` после того, как датчик с идентификатором сущности `binary_sensor.contact_sensor_contact` изменит состояние с `выкл` на `вкл`.

И перезапустите Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```