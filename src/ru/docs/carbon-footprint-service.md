---
title: Сервис компенсации

contributors: [tubleronchik]
---

Пример работы представлен в видео:

https://youtu.be/Ha9wN6bjh64

Сервис компенсации углеродного следа путем сжигания токенов в сети Statemine. Вычисление производимого CO2 происходит следующим образом: данные с устройства в Вт умножаются на коэффициенты, зависящие от региона. 1 тонна CO2 компенсируется потреблением 1 токена. [Здесь](/docs/carbon-footprint-sensor) инструкции по подключению устройства.

## Сценарий

1. Зарегистрировать новое устройство в Цифровом близнеце в сети Robonomics
2. Регулярно получать последние данные со всех устройств и умножать их на коэффициент, зависящий от региона
3. Суммировать данные и преобразовывать их в тонны CO2
4. Вычесть общее количество сжигаемых токенов из текущих данных
5. Сжечь целое количество токенов в сети Statemine
6. Сохранить общее количество сжигаемых токенов в локальной базе данных и Datalog

## Установка

Клонировать репозиторий и отредактировать файл конфигурации.

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Описание конфигурации

Не редактируйте `config/config_template.yaml`!

```
robonomics:
  seed: <seed для аккаунта в сети Robonomics, где будет создан Цифровой близнец>
statemine:
  seed: <seed для учетной записи администратора с зелеными токенами в сети Statemine>
  endpoint: <конечная точка statemine>
  token_id: <id токена, который будет сожжен>
  ss58_format: <формат адреса в Polkadot (для сети Statemine - 2)>

service:
  interval: <как часто будут собираться данные с устройств>
```

Коэффициенты для невозобновляемой энергии взяты из [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) и хранятся в `utils/coefficients.py`.

## Запуск

```
docker-compose up
```