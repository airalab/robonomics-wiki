---
title: Сервис компенсации выбросов 

contributors: [tubleronchik]
---

Пример работы есть в видео:

https://youtu.be/Ha9wN6bjh64

Сервис для компенсации выбросов CO2 путем сжигания токенов в сети Statemine.
Расчет произведенного CO2 производится следующим образом: данные с устройства в Вт умножаются на коэффициенты, зависящие от региона. 1 тонна CO2 компенсируется потреблением 1 токена. [Здесь](/docs/carbon-footprint-sensor) находятся инструкции по подключению устройства.

## Сценарий

1. Регистрация нового устройства в цифровом двойнике в сети Robonomics 
2. Раз в интервал получение последних данных со всех устройств и их умножение на коэффициент, зависящий от региона
3. Суммирование данных и преобразование их в тонны CO2
4. Вычитание общего количества сгорающих токенов из текущих данных 
5. Сжигание целого числа токенов в сети Statemine 
6. Сохранение общего количества сгорающих токенов в локальной базе данных и Datalog 


## Установка

Клонирование репозитория и редактирование файла конфигурации.

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Конфигурация description

Не редактируйте `config/config_template.yaml`!

```
robonomics:
  seed: <seed for account in Robonomics Network where Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```
Коэффициенты для нерегенеративной энергии были взяты из [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) и сохранены в `utils/coefficients.py`. 

## Запуск

```
docker-compose up
```