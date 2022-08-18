---
title: Развертывание "Feecc Аналитика"
 
contributors: [timofeev41]
translated: false
---

В этом руководстве поговорим о развертывании системы Feecc Analytics.

Для запуска потребуется установленный `git` и `docker-compose` (версии 3 и выше)

## Запуск backend системы аналитики

### Исходный код

Выполните `git clone https://github.com/Multi-Agent-io/feecc-analytics-backend`

Для доступа к бета-версии смените ветку на `development`

### Конфигурация

Измените файл `.env` любым текстовым редактором

Параметры в `.env`:

* `MONGO_CONNECTION_URL` - URL базы данных MongoDB в формате `mongodb://<username:password>@<host>:<port>/<defaultauthdb>`

* `MONGO_DATABASE_NAME` - название базы данных, которая будет использоваться для чтения и записи данных

* `SECRET_KEY` - секретный ключ, по которому происходит хеширование данных

* `IPFS_GATEWAY_HOST` - URL IPFS Gateway

* `USE_DATALOG` - Отправлять ли данные в Robonomics Datalog (True/False)

* `ROBONOMICS_SEED` - Seed-фраза кошелька Robonomics в сети Kusama

### Запуск приложения

Выполните `docker-compose up --build` для запуска бекенда системы аналитики.

Если какие-то параметры не были заполнены (или были заполнены неправильно) система выдаст ошибку, в таком случае проверьте корректность заполнения файла `.env`

### Проверка работоспособности

Для проверки перейдите по адресу `localhost:5002/docs`. 

Если все сделано правильно, то вы увидите страницу (генерируемую Swagger) со всеми эндпоинтами системы Feecc Analytics. Теперь вы готовы к запуску фронтенда.

## Запуск frontend системы аналитики

### Исходный код

Выполните `git clone https://github.com/Multi-Agent-io/feecc-analytics-frontend`

Для доступа к бета-версии смените ветку на `dev`

### Конфигурация

Измените файл `src/config.json` любым текстовым редактором

Параметры:

* `base_url` - адрес Feecc Analytics Backend (в формате `хх.хх.хх.хх:port`)

### Запуск приложения

Выполните `docker-compose up --build`

### Проверка работоспособности

Для проверки работоспособности перейдите по адресу `localhost:8081/docs`

