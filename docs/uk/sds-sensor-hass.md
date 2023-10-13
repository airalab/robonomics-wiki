---
title: Як додати датчик SDS011 до Home Assistant

contributors: [tubleronchik]
---

У цій статті пояснюється, як підключити датчик якості повітря SDS до [Luftdaten](https://github.com/opendata-stuttgart/sensors-software) та [Robonomics](https://github.com/airalab/sensors-software) Прошивка до Home Assistant.

## Установка 
Існує два варіанти установки:

### Варіант 1: HACS

Найпростіший спосіб додати локальний датчик Luftdaten - це через HACS. [Тут](https://hacs.xyz/docs/setup/download/) ви можете знайти коротке пояснення, як налаштувати HACS.

Після встановлення HACS перейдіть до HACS -> Інтеграції та знайдіть інтеграцію `Local Luftdaten Sensor`. Натисніть кнопку завантаження та перезапустіть Home Assistant після завантаження інтеграції.
<robo-wiki-picture src="sds-hacs.png"/>

### Варіант 2: Ручна установка

Під користувачем homeassistant клонуйте репозиторій проекту:

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

Якщо у вас вже є будь-які власні інтеграції, скопіюйте `custom_components/local_luftdaten/` до вашого каталогу `custom_components`, наприклад:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```
</code-helper>
Якщо у вас немає жодних власних інтеграцій, скопіюйте весь каталог `custom_components` до каталогу конфігурації вашого Home Assistant, наприклад:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```
</code-helper>

## Конфігурація

Створіть новий запис датчика у вашому `configuration.yaml` та налаштуйте ім'я хоста або IP-адресу. Щоб знайти локальну IP-адресу вашого датчика, ви можете використовувати [мобільний додаток Fing](https://www.fing.com/products) або [інструмент командного рядка nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Ім'я може бути будь-яким.

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

> Список всіх підтримуваних датчиків можна знайти у [репозиторії](https://github.com/lichtteil/local_luftdaten).

Перезапустіть Home Assistant.
Після цього ви можете додати датчик до своєї панелі керування. Ім'я сутності буде ім'ям, яке ви додали до `configuration.yaml`.
<robo-wiki-picture src="sds-configuration-card.png"/>