---
title: Додавання користувача

contributors: [nakata5321, Fingerling42, LoSk-p]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**У цій статті ви дізнаєтеся, як додати нового користувача до вашого додатку Home Assistant.**

## Додавання користувачів до підписки

Ви не можете використовувати раніше створені облікові записи, оскільки `OWNER` та `CONTROLLER` забезпечують безпеку, і перший користувач, якого ви створили під час першого запуску Home Assistant, не має облікового запису Robonomics Parachain.

{% roboWikiVideo {videos:[{src: 'QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Створіть обліковий запис на паралельному ланцюжку Robonomics, як ви це робили у [попередній статті](/docs/sub-activate/).

2. Використовуючи обліковий запис `OWNER`, додайте новий обліковий запис користувача до підписки на сторінці `SETUP A SUBSCRIPTION` в [Robonomics DApp](https://robonomics.app/#/rws-setup). Тепер у розділі `USERS IN SUBSCRIPTION` повинно бути три адреси у списку доступу: `OWNER`, `CONTROLLER` та `USER`.


## JSON-файл налаштування RWS

Спочатку користувач повинен отримати JSON-файл із інформацією налаштування RWS.

### Створення JSON-файлу налаштування RWS

Адміністратор може створити JSON-файл для свого налаштування на сторінці [SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup), використовуючи кнопку `Download import for other users`.

{% roboWikiPicture {src:"docs/home-assistant/download_rws_setup_json.png", alt:"image"} %}{% endroboWikiPicture %}

### Імпорт налаштування RWS

Тепер з цим JSON-файлом користувач може імпортувати налаштування RWS, використовуючи кнопку `IMPORT SETUP`.

{% roboWikiVideo {videos:[{src: 'QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Надання доступу користувачу

На тій же сторінці ([SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup)) ви можете встановити пароль для нового користувача.

{% roboWikiVideo {videos:[{src: 'Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Виберіть обліковий запис, який ви щойно створили, на правій бічній панелі (переконайтеся, що ви вибрали потрібний обліковий запис, натиснувши на значок профілю).

2. Введіть адресу та фразу-сід користувача `USER` у відповідні поля.

3. Введіть пароль, а потім підтвердіть транзакцію кнопкою `CREATE PASSWORD`, яка тепер буде безкоштовною через підписку.

4. Після процесу реєстрації увійдіть до Home Assistant за допомогою адреси вашого користувача як логіну та нового створеного пароля.

Тепер ви можете використовувати додаток для управління вашим будинком через Robonomics, перегляньте статтю [**"Get Smart Home Telemetry"**](/docs/smart-home-telemetry/).