---
title: Robonomics SLS Шлюз

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Прошивка 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**У цій статті ви налаштуєте Robonomics SLS Шлюз. Ви встановите необхідне програмне забезпечення для шлюзу, налаштуєте його та підключите його до Home Assistant.**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"sls gateway"} %}{% endroboWikiPicture %}

## Прошивка

Спочатку вам потрібно встановити прошивку мікроконтролера шлюзу. Підготуйте шлюз, встановивши перемикачі `1` та `3` в нижній частині SLS Шлюзу на позицію `ON`, інші повинні бути `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"sls gateway 13"} %}{% endroboWikiPicture %}

Підключіть шлюз до вашого Raspberry Pi через порт USB type-C на шлюзі.

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

Клонуйте репозиторій з прошивкою на ваш Raspberry Pi:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

{% endcodeHelper %}

Перейдіть до `robonomics-hass-utils/esp_firmware/linux`. Для прошивки шлюзу SLS вам потрібно виконати скрипти `Clear` та `Flash_16mb`.

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### Усунення неполадок

Якщо у вас виникають проблеми з оновленням прошивки шлюзу, вам потрібно виконати додаткові кроки:

1. Переконайтеся, що встановлений модуль pySerial:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}

2. Надайте вашому користувачеві права доступу до USB-порту та перезавантажте комп'ютер:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}

3. У деяких випадках необхідно змінити налаштування пропускної здатності в скрипті для оновлення прошивки. Відкрийте скрипт `Flash_16mb.sh` за допомогою редактора `nano` ізмініть параметр baud з `921600` на менше значення (наприклад, `115200`).

## Конфігурація

1. Від'єднайте SLS-шлюз від комп'ютера. Встановіть перемикачі на задній панелі шлюзу в правильне положення. Перемикачі `5` (RX Zigbee до ESP) та `6` (TX Zigbee до ESP) повинні бути в положенні `ON`, інші повинні бути `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. Підключіть кабель живлення типу C. Індикаторне світло в центрі повинно загорітися зеленим.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. Під час першого запуску шлюз почне роздавати Wi-Fi з SSID `zgw****`. Підключіться до цієї мережі. Пам'ятайте, що сигнал може бути досить слабким, тому краще тримати SLS-шлюз ближче до вашого комп'ютера.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. Якщо підключення вдале, відкриється веб-інтерфейс (або ви можете знайти його за адресою 192.168.1.1 адреса).

5. Ви побачите сторінку `Налаштування Wi-Fi`. Виберіть свою Wi-Fi мережу та введіть пароль. Натисніть кнопку `Застосувати`. Шлюз перезавантажиться та підключиться до вашої Wi-Fi мережі.

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. Знайдіть локальну IP-адресу шлюзу SLS, щоб отримати доступ до веб-інтерфейсу. Щоб знайти її, ви можете використовувати [мобільний додаток Fing](https://www.fing.com/products) або [інструмент командного рядка nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Назва шлюзу повинна виглядати приблизно так: `zgw****`. Відкрийте веб-інтерфейс шлюзу, вставивши IP-адресу шлюзу у браузер.

7. Перейдіть до `Налаштування` -> `Апаратне забезпечення` та переконайтеся, що налаштування виглядають так, як на зображенні. Виправте налаштування за необхідності та натисніть кнопку `Зберегти`:

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

Таблиця з обов'язковими значеннями:

| Поле                     | Значення           |
|--------------------------|:-------------------|
| Модуль Zigbee            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Пін кнопки служби        | 33 (pullUP - true) |
| Кількість адресованих світлодіодів | 0                  |
| Світлодіод червоний (або адреса) | 21                 |
| Світлодіод зелений        | 5                  |
| Світлодіод синій          | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Після цього перезавантажте шлюз. Виберіть `Дії` -> `Перезавантажити систему` у правому верхньому куті.

9. Переконайтеся, що шлюз працює належним чином у вікні інформації Zigbee. Стан пристрою повинен бути `OK`.

10. Налаштуйте автоматичне додавання пристроїв до Home Assistant. Перейдіть до `Zigbee` -> `Конфігурація`, потім виберіть `Відкриття MQTT Home Assistant` та `Очистити стани`. Збережіть зміни та знову **перезавантажте** шлюз SLS.

{% roboWikiNote {type: "warning"}%} Якщо у вас вже є активний шлюз SLS вдома, і ви зараз налаштовуєте іншийякщо ви підключите два пристрої до одного каналу, вони будуть конфліктувати один з одним. Щоб вирішити цю проблему, вам потрібно змінити канал на новому пристрої. Для цього перейдіть до `Zigbee` -> `Config` та змініть канал на інший (наприклад, канал 15). {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

## Парування SLS з MQTT

Після налаштування Шлюзу SLS, вам потрібно підключити Шлюз SLS до Home Assistant. Відкрийте веб-інтерфейс Шлюзу SLS та перейдіть до `Settings/Link` -> `MQTT Setup`:


Додайте адресу вашого брокера (адреса Raspberry Pi з Home Assistant у локальній мережі, ви можете знайти її за допомогою [мобільного додатка Fing](https://www.fing.com/products) або [інструменту командного рядка nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), порт (за замовчуванням `1883`), ім'я користувача та пароль брокера (які ви створили раніше) та назву теми (ви можете вибрати будь-яку). Також IP-адреса Raspberry Pi повинна бути статичною. Натисніть на `Enable` та `Retain states`.

Збережіть зміни. Тепер пристрої будуть автоматично відображатися в Home Assistant.

## Підключення пристроїв

Підключіть свої пристрої, перейшовши до `Zigbee` -> `Join`. Поставте свої сенсори в режим парування, найпоширеніший спосіб перевести пристрій в режим підключення - утримуйте його кнопку живлення або вимикайте/вмикаєте його 5 разів. Натисніть кнопку `Enable Join`, щоб почати пошук пристроїв Zigbee. Ви побачите активні сенсори.

{% roboWikiVideo {videos:[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

Тепер ви можете перейти до розділу [**Підписка на Інтернет речей**](/docs/sub-activate) та почати активацію підписки Robonomics.