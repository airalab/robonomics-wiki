---
title: Robonomics SLS Шлюз

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**У цій статті ви налаштуєте Robonomics SLS Шлюз. Ви встановите необхідне програмне забезпечення для шлюзу, налаштуєте його та підключите його до Home Assistant.**

<robo-wiki-picture src="home-assistant/sls_gateway.png" />

## Прошивка

Спочатку вам потрібно встановити прошивку мікроконтролера шлюзу. Підготуйте шлюз, встановивши перемикачі `1` та `3` в нижній частині SLS Шлюзу в положення `ON`, інші повинні бути `OFF`.

<robo-wiki-picture src="home-assistant/sls-gateway-13.gif" />

Підключіть шлюз до Raspberry Pi за допомогою порту USB type-C на шлюзі.

<robo-wiki-picture src="home-assistant/sls-rpi.gif" />

Клонуйте репозиторій з прошивкою на Raspberry Pi:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

</code-helper>

Перейдіть до `robonomics-hass-utils/esp_firmware/linux`. Щоб прошити SLS шлюз, вам потрібно запустити скрипти `Clear` та `Flash_16mb`.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

</code-helper>

### Усунення неполадок

Якщо у вас виникають проблеми з оновленням прошивки шлюзу, вам потрібно виконати додаткові кроки:

1. Переконайтеся, що встановлено модуль pySerial:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
pip install pyserial
```
</code-helper>

2. Надайте своєму користувачеві права доступу до USB-порту та перезавантажте комп'ютер:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```
</code-helper>

3. У деяких випадках необхідно змінити налаштування пропускної здатності в скрипті для оновлення прошивки. Відкрийте скрипт `Flash_16mb.sh` за допомогою редактора `nano` та змініть параметр baud з `921600` на менше значення (наприклад, `115200`).

## Конфігурація

1. Відключіть SLS Шлюз від комп'ютера. Встановіть перемикачі на задній панелі шлюзу в правильне положення. Перемикачі `5` (RX Zigbee до ESP) та `6` (TX Zigbee до ESP) повинні бути в положенні `ON`, інші повинні бути `OFF`. 

<robo-wiki-picture src="home-assistant/sls-gateway-56.gif" />

2. Підключіть кабель живлення типу C. Індикаторне світло в центрі повинно загорітися зеленим.

<robo-wiki-picture src="home-assistant/sls-gateway-connect.gif" />

3. При першому запуску шлюз буде починати роздавати Wi-Fi з SSID `zgw****`. Підключіться до цієї мережі. Майте на увазі, що сигнал може бути досить слабким, тому краще тримати SLS шлюз ближче до комп'ютера. 

<robo-wiki-picture src="home-assistant/sls-gateway-wifi.gif" />

4. Якщо підключення вдале, відкриється веб-інтерфейс (або ви можете знайти його за адресою 192.168.1.1). 

5. Ви побачите сторінку `Wi-Fi Settings`. Виберіть свою Wi-Fi та введіть пароль. Натисніть кнопку `Apply`. Шлюз перезавантажиться та підключиться до вашої Wi-Fi мережі. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type:'mp4'}]" />

6. Знайдіть локальну IP-адресу SLS шлюзу для доступу до веб-інтерфейсу. Щоб знайти його, ви можете використовувати [мобільний додаток Fing](https://www.fing.com/products) або [інструмент командного рядка nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Ім'я шлюзу повинно виглядати так: `zgw****`. Відкрийте веб-інтерфейс шлюзу, вставивши IP-адресу шлюзу в браузер.

7. Перейдіть до `Setting` -> `Hardware` та переконайтеся, що налаштування виглядають так, як на зображенні. Виправте налаштування за потреби та натисніть кнопку `Save`:

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type:'mp4'}]" />

Таблиця з необхідними значеннями:

| Field                    | Value              |
|--------------------------|:-------------------|
| Zigbee module            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Service Button Pin       | 33 (pullUP - true) |
| Number addressable leds  | 0                  |
| Led Red (or addr)        | 21                 |
| Led Green                | 5                  |
| Led Blue                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Потім перезавантажте шлюз. Виберіть `Actions` -> `Reboot system` в правому верхньому куті.

9. Переконайтеся, що шлюз працює належним чином у вікні інформації Zigbee. DeviceState повинен бути `OK`.

10. Налаштуйте автоматичне додавання пристроїв до Home Assistant. Перейдіть до `Zigbee` -> `Config`, потім виберіть `Home Assistant MQTT Discovery` та `Clear States`. Збережіть зміни та знову **перезавантажте** SLS шлюз.

<robo-wiki-note type="warning">

Якщо у вас вже є активний SLS шлюз у вашому будинку, і ви зараз налаштовуєте ще один, то вони будуть конфліктувати один з одним. Щоб вирішити цю проблему, вам потрібно змінити канал на новому пристрої. Для цього перейдіть до `Zigbee` -> `Config` та змініть канал на інший (наприклад, канал 15).

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZ', type:'mp4'}]" />

## Парування SLS з MQTT

Після налаштування SLS Шлюзу вам потрібно підключити SLS Шлюз до Home Assistant. Відкрийте веб-інтерфейс SLS Шлюзу та перейдіть до `Settings/Link` -> `MQTT Setup`:


Додайте адресу вашого брокера (адреса Raspberry Pi з Home Assistant у локальній мережі, ви можете знайти її за допомогою [мобільного додатку Fing](https://www.fing.com/products) або [інструменту командного рядка nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), порт (за замовчуванням `1883`), ім'я користувача та пароль брокера (які ви створили раніше) та назву теми (ви можете вибрати будь-яку). Також, IP-адреса Raspberry Pi повинна бути статичною. Натисніть `Enable` та `Retain states`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdNKDqwwy87VQEDDVsX5kpaDQm9wKKPEJUNJnhnjx6e5y', type:'mp4'}]" />

Збережіть зміни. Тепер пристрої будуть автоматично відображатися в Home Assistant.

## Підключення пристроїв

Підключіть ваші пристрої, перейшовши до розділу `Zigbee` -> `Join`. Поставте ваші сенсори в режим парування, найпоширеніший спосіб переключити пристрій в режим підключення - утримувати його кнопку живлення або включати / вимикати його 5 разів. Натисніть кнопку `Enable Join`, щоб почати пошук пристроїв Zigbee. Ви побачите активні сенсори.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type:'mp4'}]" />


Тепер ви можете перейти до розділу [**Підписка на IoT**](/docs/sub-activate) та почати активувати підписку Robonomics.
