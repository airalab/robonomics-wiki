---
title: Керування камерою PTZ в Home Assistant
contributors: [nakata5321]
---

Ця стаття охоплює процес налаштування PTZ-камери в Home Assistant. 
Буде використано протокол ONVIF. Для цього потрібен локальний обліковий запис камери.

<robo-wiki-note type="warning">
Процес налаштування локального облікового запису камери не розглядається в цій статті.
</robo-wiki-note>

Вимоги:
- Камера PTZ
- Локальний обліковий запис камери
- IP-адреса камери
- Налаштований Home Assistant

## Інтеграція ONVIF

Почнемо з встановлення **інтеграції ONVIF**. 

Перейдіть до ""Devices & Services" в "Settings" та натисніть кнопку "ADD INTEGRATION".
Введіть "ONVIF" та виберіть інтеграцію. Ви побачите наступне вікно.

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

Натисніть кнопку "Submit". Вона спробує автоматично знайти вашу камеру. Якщо вдалося, 
виберіть свою камеру зі списку та заповніть порожні поля. 
В іншому випадку вам потрібно буде заповнити всі поля вручну. Ви побачите наступне вікно.

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

Заповніть прогалини:
- Name - надайте назву своїй камері
- Host - вкажіть IP-адресу вашої камери
- Port - зазвичай це 2020 рік, але ваш постачальник камер може змінити це
- Username - введіть ім'я користувача вашого локального облікового запису камери
  - Password - введіть пароль для вашого локального облікового запису камери

та натисніть "Submit". Виберіть область для вашої камери та натисніть "Finish".

## Додайте керування камерою до панелі інструментів

Тепер, коли ви повністю налаштували камеру, ви можете додати її потік та кнопки керування до панелі інструментів.

Перейдіть до панелі інструментів та почніть з створення нової картки. Виберіть "Picture Glance".

 <robo-wiki-picture src="home-assistant/glance.jpg" />

Заповніть дані:
- Title - виберіть заголовок зображення камери
- Camera Entity - виберіть сутність камери зі списку
- Camera View - виберіть "live" для отримання меншої затримки

Далі, перейдіть до режиму "Code Editor", натиснувши кнопку внизу лівого боку. Ви побачите наступний код:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Замініть вміст `entities: []` згідно з прикладом нижче (`<YOUR_CAMERA_ENTITY>` такий самий, як параметр `camera_image`):

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

Це все. Тепер ви повинні побачити картку камери PTZ на панелі інструментів разом з кнопками керування.

## Усунення неполадок
Якщо ви використовуєте Home Assistant Core і не бачите потоку з камери, вам слід встановити інтеграції "stream" та "FFMPEG". 
Для цього вам потрібно додати рядки `stream: ` та `ffmpeg: ` в кінець configuration.yaml.