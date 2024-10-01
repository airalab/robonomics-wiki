---
title: Управление PTZ-камерой в Home Assistant
contributors: [nakata5321]
---

Эта статья охватывает процесс настройки PTZ-камеры в Home Assistant.
Будет использоваться протокол ONVIF. Для этого требуется локальная учетная запись камеры.

{% roboWikiNote {type: "warning"}%} Процесс настройки локальной учетной записи камеры не рассматривается в этой статье.
{% endroboWikiNote %}

Требования:
- PTZ-камера
- Локальная учетная запись камеры
- IP-адрес камеры
- Настроенный Home Assistant

## Интеграция ONVIF

Давайте начнем с установки **интеграции ONVIF**.

Перейдите в раздел "Устройства и сервисы" в "Настройках" и нажмите кнопку "ДОБАВИТЬ ИНТЕГРАЦИЮ".
Введите "ONVIF" и выберите интеграцию. Затем откроется следующее окно.

{% roboWikiPicture {src:"docs/home-assistant/onvifsetup.jpg", alt:"onvif setup"} %}{% endroboWikiPicture %}

Нажмите кнопку "Отправить". Система попытается автоматически найти вашу камеру. Если успешно,
выберите свою камеру из списка и заполните пустые поля.
В противном случае вам придется заполнить все поля вручную. Появится следующее окно.

{% roboWikiPicture {src:"docs/home-assistant/onvifconfig.jpg", alt:"onvif config"} %}{% endroboWikiPicture %}

Заполните поля:
- Имя - дайте имя вашей камере
- Хост - укажите IP-адрес вашей камеры
- Порт - обычно это 2020, но ваш поставщик камеры может изменить его
- Имя пользователя - укажите имя пользователя вашей локальной учетной записи камеры
  - Пароль - укажите пароль для вашей локальной учетной записи камеры

и нажмите "Отправить". Выберите область для вашей камеры и нажмите "Готово".

## Добавление управления камерой на панель

Теперь, когда вы полностью настроили камеру, вы можете добавить ее поток и кнопки управления на панель.

Перейдите на панель и начните с создания новой карточки. Выберите "Взгляд на изображение".

{% roboWikiPicture {src:"docs/home-assistant/glance.jpg", alt:"glance"} %}{% endroboWikiPicture %}

Заполните данные:
- Заголовок - выберите заголовок изображения камеры
- Сущность камеры - выберите сущность камеры из выпадающего списка
- Вид камеры - выберите "live", чтобы получить меньшую задержку

Затем переключитесь в режим "Редактор кода", нажав кнопку в левом нижнем углу. Вы увидите следующий код:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Замените содержимое `entities: []` в соответствии с примером ниже (`<YOUR_CAMERA_ENTITY>` такой же, как параметр `camera_image`):

{% codeHelper { copy: true}%}

```
entities:
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Left
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Up
    icon: 'mdi:arrow-up'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Down
    icon: 'mdi:arrow-down'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Right
    icon: 'mdi:arrow-right'
    show_icon: true
```

{% endcodeHelper %}

Вот и все. Теперь вы должны увидеть карточку PTZ-камеры на панели вместе с кнопками управления.

## Устранение неполадок
Если вы используете Home Assistant Core и не видите поток с камеры, вам следует установить интеграции "stream" и "FFMPEG".
Для этого добавьте строки `stream: ` и `ffmpeg: ` в конец configuration.yaml.