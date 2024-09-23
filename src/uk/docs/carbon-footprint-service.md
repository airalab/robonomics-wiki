---
title: Послуга компенсації

contributors: [tubleronchik]
---

Приклад роботи можна переглянути у відео:

https://youtu.be/Ha9wN6bjh64

Послуга компенсації викидів CO2 шляхом спалювання токенів в мережі Statemine. Вироблений CO2 розраховується наступним чином: дані з пристрою у Вт множаться на коефіцієнти, що залежать від регіону. 1 тонна CO2 компенсується споживанням 1 токена. [Тут](/docs/carbon-footprint-sensor) інструкції щодо підключення пристрою.

## Сценарій

1. Зареєструйте новий пристрій у Цифровому близнюку в мережі Robonomics.
2. Один раз за інтервал отримайте останні дані з усіх пристроїв та помножте на коефіцієнт, залежно від регіону.
3. Підсумуйте дані та перетворіть їх на тонни CO2.
4. Відніміть загальну кількість спалених токенів від поточних даних.
5. Спаліть ціле число токенів у мережі Statemine.
6. Збережіть загальну кількість спалених токенів у локальній базі даних та Datalog.

## Встановлення

Клонуйте репозиторій та відредагуйте файл конфігурації.

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Опис конфігурації

Не редагуйте `config/config_template.yaml`!

```
robonomics:
  seed: <seed для облікового запису в мережі Robonomics, де буде створено Цифровий близнюк>
statemine:
  seed: <seed для облікового запису адміністратора з зеленими токенами в мережі Statemine>
  endpoint: <кінцева точка statemine>
  token_id: <ідентифікатор токена, який буде спалено>
  ss58_format: <формат адреси в Polkadot (для мережі Statemine - 2)>

service:
  interval: <як часто дані з пристроїв будуть збиратися>
```

Коефіцієнти для невідновлюваної енергії були взяті з [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) та зберігаються в `utils/coefficients.py`.

## Запуск

```
docker-compose up
```