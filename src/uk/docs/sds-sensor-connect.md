---
title: Як підключити датчик SDS011

contributors: [tubleronchik]
---

**Ось пошаговий посібник з підключення датчика до мережі сенсорів Robonomics та додатку Home Assistant. Наші датчики використовують прошивку Robonomics, яка є покращеною версією прошивки sensor.community. Вона включає додаткові сенсори та має змінений механізм відправлення даних.**

{% roboWikiNote {type: "warning"}%} Усі пристрої від Robonomics можна придбати на офіційному [веб-сайті](https://robonomics.network/devices/).
{% endroboWikiNote %}


## Налаштування

1. Підключіть датчик до розетки для живлення.
2. Плата створить мережу Wi-Fi під назвою `RobonomicsSensor-xxxxxxxxx`. Підключіться до неї зі свого телефону або комп'ютера: ви побачите вікно авторизації (якщо ні, відкрийте браузер і перейдіть за адресою `192.168.4.1`).
3. Виберіть свою Wi-Fi мережу зі списку (або введіть її вручну, якщо її немає у списку) та заповніть поле пароля.
{% roboWikiNote {type: "warning", title: "INFO"}%} Датчик може бути підключений лише до мережі Wi-Fi з частотою 2,4 ГГц. {% endroboWikiNote %}
{% roboWikiPicture {src:"docs/sds-sensor-wifi.png", alt:"sds-sensor-wifi"} %}{% endroboWikiPicture %}
4. Вкажіть координати місця, де буде встановлений датчик. Ви можете отримати їх з будь-яких карт або отримати за адресою за допомогою [цього посилання.](https://www.latlong.net/convert-address-to-lat-long.html)
{% roboWikiNote {type: "warning", title: "WARNING"}%} Координати датчика потім будуть відображені на загальнодоступній карті. Якщо ви не хочете показувати свою приватну інформацію, вкажіть близькі, але не точні координати.
{% endroboWikiNote %}
5. Натисніть на `Зберегти конфігурацію та перезавантажити`. Плата перезавантажиться та підключиться до вказаної мережі Wi-Fi.
6. Відкрийте [карту сенсорів Robonomics](https://sensors.robonomics.network/#/) та знайдіть місце, де ви встановили датчик. Через кілька хвилин ви зможете побачити свій датчик з даними на карті.
{% roboWikiPicture {src:"docs/sds-sensor-map.png", alt:"sds-sensor-map"} %}ensor-map"} %}{% endroboWikiPicture %}

## Домашній помічник

Існують два варіанти установки:

### Варіант 1: HACS

Найпростіший спосіб додати локальний датчик Luftdaten - через HACS. [Тут](https://hacs.xyz/docs/setup/download/) ви можете знайти короткий пояснення щодо налаштування HACS.

Після встановлення HACS перейдіть до HACS -> Інтеграції та знайдіть інтеграцію `Local Luftdaten Sensor`. Натисніть на кнопку завантаження та перезапустіть Домашнього помічника, як тільки інтеграція буде завантажена.
{% roboWikiPicture {src:"docs/sds-hacs.png", alt:"sds-hacs"} %}{% endroboWikiPicture %}

### Варіант 2: Ручна установка

Під користувачем `homeassistant` склонуйте репозиторій проекту:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
```

{% endcodeHelper %}

</code-helper>

Якщо у вас вже є які-небудь власні інтеграції, скопіюйте `custom_components/local_luftdaten/` до вашого каталогу `custom_components`, наприклад:

{% codeHelper { copy: true}%}

```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

Якщо у вас немає жодних власних інтеграцій, скопіюйте весь каталог `custom_components` до каталогу конфігурації вашого Домашнього помічника. Наприклад:

{% codeHelper { copy: true}%}

 ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Налаштування

Створіть новий запис датчика у вашому `configuration.yaml` та налаштуйте ім'я хоста або IP-адресу. Щоб знайти локальну IP-адресу вашого датчика, ви можете використовувати [мобільний додаток Fing](https://www.fing.com/products) або [інструмент командного рядка nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Ім'я може бути будь-яким.

|Параметр              |Тип     | Обов'язковість | Опис
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | обов'язковий   | IP-адреса датчика
|`scan_interval`        | number | за замовчуванням: 180 | Частота (у секундах) між оновленнями
|`name`                 | string | обов'язковий   | Назва датчика
|`monitored_conditions` | список   | обов'язково     | Список відстежуваних датчиків


{% codeHelper { copy: true}%}


  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Датчик якості повітря
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```

{% endcodeHelper %}

> Список всіх підтримуваних датчиків можна знайти у [репозиторії](https://github.com/lichtteil/local_luftdaten).

Перезапустіть свій додаток Home Assistant.
Після цього ви зможете додати датчик на свою панель. Назва сутності буде такою, як ви додали у `configuration.yaml`.

{% roboWikiPicture {src:"docs/sds-configuration-card.png", alt:"sds-configuration-car"} %}{% endroboWikiPicture %}