---
title: Как подключить датчик SDS011

contributors: [tubleronchik]
---

**Вот пошаговое руководство о том, как подключить ваш датчик к сети датчиков Robonomics и Home Assistant. Наши датчики используют прошивку Robonomics, которая является улучшенной версией прошивки sensor.community. Она включает дополнительные датчики и имеет измененный механизм отправки данных.**

{% roboWikiNote {type: "warning"}%} Все устройства от Robonomics можно приобрести на официальном [сайте](https://robonomics.network/devices/).
{% endroboWikiNote %}


## Настройка

1. Подключите датчик к розетке для питания.
2. Плата создаст сеть Wi-Fi с именем `RobonomicsSensor-xxxxxxxxx`. Подключитесь к ней с телефона или компьютера: вы увидите окно авторизации (если нет, откройте браузер и перейдите по адресу `192.168.4.1`).
3. Выберите свою Wi-Fi сеть из списка (или введите ее вручную, если ее нет в списке) и заполните поле пароля.
{% roboWikiNote {type: "warning", title: "INFO"}%} Датчик может быть подключен только к сети Wi-Fi с частотой 2,4 ГГц. {% endroboWikiNote %}
{% roboWikiPicture {src:"docs/sds-sensor-wifi.png", alt:"sds-sensor-wifi"} %}{% endroboWikiPicture %}
4. Укажите координаты места, где будет установлен датчик. Вы можете получить их с любых карт или получить по адресу, используя [эту ссылку.](https://www.latlong.net/convert-address-to-lat-long.html)
{% roboWikiNote {type: "warning", title: "WARNING"}%} Координаты датчика будут отображены на общедоступной карте. Если вы не хотите показывать свою личную информацию, укажите близкие, но не точные координаты.
{% endroboWikiNote %}
5. Нажмите на `Сохранить конфигурацию и перезагрузить`. Плата перезагрузится и подключится к указанной Wi-Fi сети.
6. Откройте [карту датчиков Robonomics](https://sensors.robonomics.network/#/) и найдите место, где установлен ваш датчик. Через несколько минут вы сможете увидеть свой датчик с данными на карте.
{% roboWikiPicture {src:"docs/sds-sensor-map.png", alt:"sds-sensor-map"} %}ensor-map"} %}{% endroboWikiPicture %}

## Домашний помощник

Доступно два варианта установки:

### Вариант 1: HACS

Самый простой способ добавить локальный датчик Luftdaten - через HACS. [Здесь](https://hacs.xyz/docs/setup/download/) вы можете найти краткое объяснение о том, как настроить HACS.

После установки HACS перейдите в HACS -> Интеграции и найдите интеграцию `Local Luftdaten Sensor`. Нажмите на кнопку загрузки и перезапустите Home Assistant после загрузки интеграции.
{% roboWikiPicture {src:"docs/sds-hacs.png", alt:"sds-hacs"} %}{% endroboWikiPicture %}

### Вариант 2: Ручная установка

Под пользователем `homeassistant` склонируйте репозиторий проекта:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
```

{% endcodeHelper %}

</code-helper>

Если у вас уже есть какие-либо пользовательские интеграции, скопируйте `custom_components/local_luftdaten/` в ваш каталог `custom_components`, например:

{% codeHelper { copy: true}%}

```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

Если у вас нет пользовательских интеграций, скопируйте весь каталог `custom_components` в каталог конфигурации Home Assistant. Например:

{% codeHelper { copy: true}%}

 ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Настройка

Создайте новую запись датчика в вашем `configuration.yaml` и настройте имя хоста или IP-адрес. Чтобы найти локальный IP-адрес вашего датчика, вы можете использовать [мобильное приложение Fing](https://www.fing.com/products) или [инструмент командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Имя может быть любым.

|Параметр              |Тип     | Обязательность | Описание
|:----------------------|:-------|:------------ |:------------
|`host`                 | строка | обязательно   | IP-адрес датчика
|`scan_interval`        | число  | по умолчанию: 180 | Частота (в секундах) между обновлениями
|`name`                 | строка | обязательно    | Название датчика
|`monitored_conditions` | список   | обязательно     | Список отслеживаемых датчиков


{% codeHelper { copy: true}%}


  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Датчик качества воздуха
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```

{% endcodeHelper %}

> Список всех поддерживаемых датчиков можно найти в [репозитории](https://github.com/lichtteil/local_luftdaten).

Перезапустите Home Assistant.
После этого вы сможете добавить датчик на свой дашборд. Название сущности будет таким же, как вы добавили в `configuration.yaml`.

{% roboWikiPicture {src:"docs/sds-configuration-card.png", alt:"sds-configuration-car"} %}{% endroboWikiPicture %}