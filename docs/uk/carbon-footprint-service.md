---
title: Послуга взаємозаліку

contributors: [tubleronchik]
---

Приклад роботи є у відео:

https://youtu.be/Ha9wN6bjh64

Сервіс компенсації викидів CO2 шляхом спалювання токенів в мережі Statemвe. 
Вироблений CO2 розраховується наступним чином: дані з пристрою в Вт помножити на коефіцієнти, залежні від регіону. 1 тонна СО2 компенсується споживанням 1 токена. [Ось](/docs/carbon-footprвt-sensor) інструкції для підключення пристрою.

## Сценарій

1. Зареєструйте новий пристрій у Digital Twin у мережі Robonomics
2. Один раз в інтервалі отримання останніх даних з усіх пристроїв і помножте на коефіцієнт залежно від регіону
3. Підсумувати дані і перетворити їх на тонни СО2
4. Відняти загальну кількість спалених токенів від поточних даних 
5. Спалити ціле число токенів в мережі Statemine 
6. Зберегти загальну кількість спалених токенів у локальній базі даних та Даталог 


## Встановлення

Клонувати репозиторій та редагувати файл конфігурації.

```
git clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Конфігурація description

Не редагувати `config/config_template.yaml`!

```
robonomics:
  seed: <seed for account in Robonomics Network wтут Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```
Коефіцієнти для невідновлюваної енергії були взяті з [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) та збережені в `utils/coefficients.py`. 

## Запуск

```
docker-compose up
```