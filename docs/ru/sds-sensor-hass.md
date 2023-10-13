---
title: Как добавить датчик SDS011 в Home Assistant

contributors: [tubleronchik]
---

В этой статье объясняется, как подключить датчик качества воздуха SDS с помощью прошивки [Luftdaten](https://github.com/opendata-stuttgart/sensors-software) и [Robonomics](https://github.com/airalab/sensors-software) к Home Assistant.

## Установка 
Доступны два варианта установки:

### Вариант 1: HACS

Самый простой способ добавить локальный датчик Luftdaten - это через HACS. [Здесь](https://hacs.xyz/docs/setup/download/) вы можете найти краткое объяснение о том, как настроить HACS.

После установки HACS перейдите в HACS -> Интеграции и найдите интеграцию `Local Luftdaten Sensor`. Нажмите кнопку загрузки и перезапустите Home Assistant после загрузки интеграции.
<robo-wiki-picture src="sds-hacs.png"/>

### Вариант 2: Ручная установка

Под пользователем homeassistant склонируйте репозиторий проекта:

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

Если у вас уже есть какие-либо пользовательские интеграции, скопируйте `custom_components/local_luftdaten/` в вашу директорию `custom_components`. Например:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```
</code-helper>
Если у вас нет пользовательских интеграций, скопируйте всю директорию `custom_components` в директорию конфигурации вашего Home Assistant. Например:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```
</code-helper>

## Настройка

Создайте новую запись датчика в вашем `configuration.yaml` и настройте имя хоста или IP-адрес. Чтобы найти локальный IP-адрес вашего датчика, вы можете использовать [мобильное приложение Fing](https://www.fing.com/products) или [инструмент командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Имя может быть любым.

|Parameter              |Type    | Necessity    | Description
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | required     | IP address of the sensor
|`scan_interval`        | number | default: 180 | Frequency (in seconds) between updates
|`name`                 | string | required     | Name of the sensor
|`monitored_conditions` | list   | required     | List of the monitored sensors

<code-helper copy>

  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Air quality sensor
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```
</code-helper>

> Список всех поддерживаемых датчиков можно найти в [репозитории](https://github.com/lichtteil/local_luftdaten).

Перезапустите Home Assistant.
После этого вы можете добавить датчик на вашу панель инструментов. Имя сущности будет таким же, как имя, которое вы добавили в `configuration.yaml`.
<robo-wiki-picture src="sds-configuration-card.png"/>