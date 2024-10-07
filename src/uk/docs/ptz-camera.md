---
title: Керування камерою PTZ в Home Assistant
contributors: [nakata5321]
---

Ця стаття охоплює процес налаштування камери PTZ в Home Assistant.
Буде використано протокол ONVIF. Для цього потрібен локальний обліковий запис камери.

{% roboWikiNote {type: "warning"}%} Процес налаштування локального облікового запису камери не розглядається в цій статті.
{% endroboWikiNote %}


Вимоги:
- Камера PTZ
- Локальний обліковий запис камери
- IP-адреса камери
- Налаштований Home Assistant

## Інтеграція ONVIF

Почнемо з встановлення **інтеграції ONVIF**.

Перейдіть до "Пристрої та сервіси" в "Налаштуваннях" та натисніть кнопку "ДОДАТИ ІНТЕГРАЦІЮ".
Введіть "ONVIF" та оберіть інтеграцію. Ви побачите наступне вікно.

{% roboWikiPicture {src:"docs/home-assistant/onvifsetup.jpg", alt:"onvif setup"} %}{% endroboWikiPicture %}

Натисніть кнопку "Submit". Він спробує автоматично знайти вашу камеру. Якщо вдалося,
оберіть вашу камеру зі списку та заповніть порожні поля.
У протилежному випадку вам доведеться заповнити всі поля вручну. Ви побачите наступне вікно.

{% roboWikiPicture {src:"docs/home-assistant/onvifconfig.jpg", alt:"onvif config"} %}{% endroboWikiPicture %}

Заповніть прогалини:
- Назва - дайте назву своїй камері
- Хост - вкажіть IP-адресу вашої камери
- Порт - зазвичай це 2020, але ваш постачальник камер може змінити його
- Ім'я користувача - введіть ім'я користувача вашого локального облікового запису камери
  - Пароль - введіть пароль для вашого локального облікового запису камери

та натисніть "Submit". Оберіть область для вашої камери та натисніть "Finish".

## Додавання керування камерою на панель приладів

Тепер, коли ви повністю налаштували камеру, ви можете додати її потік та кнопки керування на панель приладів.

Перейдіть на панель приладів та почніть з створення нової картки. Оберіть "Зображення на перший погляд".

{% roboWikiPicture {src:"docs/home-assistant/glance.jpg", alt:"glance"} %}{% endroboWikiPicture %}

Заповніть дані:
- Назва - оберіть назву зображення камери
- Сутність камери - оберіть сутність камери зі списку
- Вид камери - оберіть "живий" для меншої затримки

Далі перейдіть у режим "Редактор коду", натиснувши кнопку у нижньому лівому куті. Ви побачите наступний код:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Замініть вміст `entities: []` відповідно до прикладу нижче (`<YOUR_CAMERA_ENTITY>` такий самий, як параметр `camera_image`):

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

Це все. Тепер ви повинні побачити картку камери PTZ на панелі приладів разом із кнопками керування.

## Усунення неполадок
Якщо ви використовуєте Home Assistant Core і не бачите потік з камери, вам слід встановити інтеграції "stream" та "FFMPEG".
Для цього вам слід додати рядки `stream: ` та `ffmpeg: ` в кінець configuration.yaml.