---
title: Управление PTZ-камерой в Home Assistant
contributors: [nakata5321]
---

В этой статье рассматривается процесс настройки PTZ-камеры в Home Assistant. 
Будет использоваться протокол ONVIF. Для этого требуется локальная учетная запись камеры.

<robo-wiki-note type="warning">
Процесс настройки локальной учетной записи камеры не рассматривается в этой статье.
</robo-wiki-note>

Требования:
- PTZ-камера
- Локальная учетная запись камеры
- IP-адрес камеры
- Настроенный Home Assistant

## Интеграция ONVIF

Давайте начнем с установки **интеграции ONVIF**. 

Перейдите в раздел "Devices & Services" в "Settings" и нажмите кнопку "ADD INTEGRATION".
Введите "ONVIF" и выберите интеграцию. Вы увидите следующее окно.

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

Нажмите кнопку "Submit". Она попытается автоматически найти вашу камеру. Если успешно, 
выберите свою камеру из списка и заполните пустые поля. 
В противном случае вам придется заполнить все поля вручную. Вы увидите следующее окно.

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

Заполните пробелы:
- Name - дайте имя вашей камере
- Host - укажите IP-адрес вашей камеры
- Port - обычно это 2020 год, но ваш поставщик камеры может изменить его
- Username - напишите имя пользователя вашей локальной учетной записи камеры
- Password - напишите пароль для вашей локальной учетной записи камеры

и нажмите "Submit". Выберите область для вашей камеры и нажмите "Завершить".

## Добавьте управление камерой на панель инструментов

Теперь, когда вы полностью настроили камеру, вы можете добавить ее поток и кнопки управления на панель инструментов.

Перейдите на панель инструментов и начните с создания новой карты. Выберите "Picture Glance".

 <robo-wiki-picture src="home-assistant/glance.jpg" />

Заполните данные:
- Title - выберите заголовок изображения камеры
- Camera Entity - выберите сущность камеры из выпадающего списка
- Camera View - выберите "live", чтобы получить меньшую задержку

Затем переключитесь в режим "Code Editor", нажав кнопку в левом нижнем углу. Вы увидите следующий код:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Замените содержимое `entities: []` в соответствии с примером ниже (`<YOUR_CAMERA_ENTITY>` такой же, как параметр `camera_image`):

<code-helper copy>

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

</code-helper>

Вот и все. Теперь вы должны увидеть карту PTZ-камеры на панели инструментов вместе с кнопками управления.

## Устранение неполадок
Если вы используете Ядро Home Assistant и не видите поток с камеры, вам следует установить интеграции `stream` и `FFMPEG`. 
Для этого вам нужно добавить строки `stream: ` и `ffmpeg: ` в конец configuration.yaml.