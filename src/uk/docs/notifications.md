---

title: Робономіка Розумний Дім

contributors: [LoSk-p]

---

Ви можете отримувати сповіщення на свій смартфон за допомогою [notify](https://notify.events/). Спочатку зареєструйтеся там і на `Панелі керування` створіть новий канал:

{% roboWikiPicture {src:"docs/home-assistant/not_control_panel.png", alt:"control_panel"} %}{% endroboWikiPicture %}

Додайте заголовок і натисніть `Зберегти`:

{% roboWikiPicture {src:"docs/home-assistant/not_create_chanell.png", alt:"channel"} %}{% endroboWikiPicture %}

Потім натисніть `Додати джерело` і виберіть `Home Assistant` вкладці `IoT та Розумний Дім`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source.png", alt:"source"} %}{% endroboWikiPicture %}

Напишіть заголовок і натисніть `Далі`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source_next.png", alt:"source_next"} %}{% endroboWikiPicture %}

Тут ви побачите токен, який вам потрібно додати до файлу конфігурації для Home Assistant. Збережіть його десь і натисніть `Готово`:

{% roboWikiPicture {src:"docs/home-assistant/not_token.png", alt:"token"} %}{% endroboWikiPicture %}

потім натисніть `Підписатися`, щоб додати підписників:

{% roboWikiPicture {src:"docs/home-assistant/not_subscribe.png", alt:"subscribe"} %}{% endroboWikiPicture %}

Виберіть будь-якого підписника, якого ви хочете, і слідуйте інструкціям.

Тепер вам потрібно відредагувати конфігурацію на вашому комп'ютері з Home Assistant. Під користувачем `homeassistant` відкрийте файл `configuration.yaml`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

І додайте ці рядки:


```yaml
notify_events:
    token: <ваш токен від notify>
```
Також додайте нову автоматизацію після рядка `automation:`:

{% codeHelper { copy: true}%}

```yaml
- alias: сповіщення
  trigger:
  - entity_id: binary_sensor.contact_sensor_contact
    platform: state
    from: 'off'
    to: 'on'
  action:
  - service: notify.notify
    data:
      message: Двері були відкриті {{ '{{states("binary_sensor.contact_sensor_contact")}}' }}
```

{% endcodeHelper %}

Ця автоматизація надсилатиме повідомлення `Двері були відкриті увімкнено/вимкнено` після того, як датчик з ідентифікатором сутності `binary_sensor.contact_sensor_contact` змінить стан з `вимкнено` на `увімкнено`.

І перезапустіть Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```