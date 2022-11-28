---
title: Feecc Аналитика для разработчиков
contributors: [timofeev41]
tools:
  - Feecc Analytics backend
    https://github.com/Multi-Agent-io/feecc-analytics-backend
---

В этом руководстве поговорим о разработке сервисов на базе бекенда Feecc Analytics

> Предполагается, что вы уже разобрались с запуском бекенда системы Feecc Аналитика. Если еще нет, обратитесь
> к [этому руководству](/docs/en/feecc-system-deploy-feecc-analytics.md)

## Основная информация

Проект написан на языке Python (фреймворк FastAPI). В качестве дополнительной базы данных используется MongoDB, для
неизменяемости и валидации данных IPFS и Robonomics Datalog

Хотите внести свой вклад? PR соответствующие
всем [guidelines](https://github.com/Multi-Agent-io/contribution-guidelines) приветствуются.

## Основные эндпоинты (по группам)

Тут описаны исключительно эндпоинты (и группы эндпоинтов), содержащие необычное поведение. Для ознакомления с
остальными, обратитесь к Swagger по адресу бекенда добавив к нему `/docs`.

### Работа с сертификатами: /api/v1/passports

#### GET /

Эндпоинт для получения списка сертификатов выпущенных изделий

Аргументы:

- `page` - номер страницы
- `items` - количество элементов на странице
- `sort_by_date` - сортировка по дате выпуска (`asc`/`desc`)
- `status` - статус сертификата (`production`, `built`, `revision`, `approved`, `finalized`)
- `name` - строка для фильтрации по названию изделия, short_url, uuid
- `date` - строка для фильтрации по дате выпуска (в формате datetime)
- `types` - строка для фильтрации по типу изделия. Возможна фильтрация по множественным типам, но в
  формате: `"[type1,type2,type3...typeN]"`

Получаемые данные:

- `status_code` - статус запроса
- `detail` - детали ответа
- `count` - общее количество сертификатов, соответствующих параметрам фильтрации
- `data` - список сертификатов в формате:

  ```json
  {
    schema_id: str,
    uuid: str,
    internal_id: str,
    passport_short_url: str/null,
    passport_ipfs_cid: str/null,
    is_in_db: bool/null,
    featured_in_int_id: str/null,
    biography: Array/null,
    components_internal_ids: Array<str>/null,
    model: str/null,
    date: datetime,
    type: str/null,
    parential_unit: str/null,
    serial_number: str/null,
    status: str/null,
    txn_hash: str/null
  }
  ```

#### GET /types

Получение списка всех типов изделий

Получаемые данные:

- `status_code` - статус запроса
- `detail` - детали ответа
- `types` - список всех типов изделий

#### POST /

Эндпоинт для создания нового сертификата

Аргументы:

- `passport` - сертификат в формате

  ```json
  {
    schema_id: str,
    uuid: str,
    internal_id: str,
    passport_short_url: str/null,
    passport_ipfs_cid: str/null,
    is_in_db: bool/null,
    featured_in_int_id: str/null,
    biography: Array/null,
    components_internal_ids: Array<str>/null,
    model: str/null,
    date: datetime,
    type: str/null,
    parential_unit: str/null,
    serial_number: str/null,
    status: str/null,
    txn_hash: str/null
  }
  ```

#### DELETE /{internal_id}

Удаление сертификата из системы по внутреннему номеру

Аргументы:

- `internal_id` - внутренний номер сертификата в формате EAN13

#### GET /{internal_id}

Получение данных сертификата из системы по внутреннему номеру

Аргументы:

- `internal_id` - внутренний номер сертификата в формате EAN13

Получаемые данные:

- `status_code` - статус запроса
- `detail` - детали ответа
- `passport` - данные сертификата в формате:

  ```json
  {
    schema_id: str,
    uuid: str,
    internal_id: str,
    passport_short_url: str/null,
    passport_ipfs_cid: str/null,
    is_in_db: bool/null,
    featured_in_int_id: str/null,
    biography: Array/null,
    components_internal_ids: Array<str>/null,
    model: str/null,
    date: datetime,
    type: str/null,
    parential_unit: str/null,
    serial_number: str/null,
    status: str/null,
    txn_hash: str/null
  }
  ```

#### POST /{internal_id}/serial

Обновление серийного номера и статуса сертификата по внутреннему номеру

Аргументы:

- `internal_id` - внутренний номер сертификата в формате EAN13
- `serial_number` - серийный номер

#### POST /{internal_id}/revision

Endpoint для отправки текущего сертификата на доработку по выбранным производственным этапам.
Будут созданы пустые копии этих этапов. Статус сертификата изменится на "revision".

Аргументы:

- `internal_id` - внутренний номер сертификата в формате EAN13
- `stages_ids` - array id каждого этапа, который нуждается в доработке

#### POST /{internal_id}/revision/cancel

Endpoint для отмены доработки для выбранных этапов.
Если это единственный этап, отправленный на доработку, текущий сертификат изменит свой статус на "built", в противном
случае статус не поменяется

Аргументы:

- `internal_id` - внутренний номер сертификата в формате EAN13
- `stage_id` - id этапа, доработку которого нужно отменить

### Работа с ОТК: /api/v1/tcd

#### GET /protocols

Эндпоинт для получения списка протоколов ОТК

Аргументы:

- `page` - номер страницы
- `items` - количество элементов на странице
- `sort_by_date` - сортировка по дате выпуска (`asc`/`desc`)
- `status` - статус протокола ("Первая стадия испытаний пройдена", "Вторая стадия испытаний пройдена", "Протокол
  утверждён")
- `name` - строка для фильтрации по названию протокола или серийному номеру (той части, которая находится в системе)
- `date` - строка для фильтрации по дате создания (в формате datetime)

#### GET /protocols/types

Эндпоинт для получения списка возможных статусов протоколов

Получаемые данные:

- `status_code` - статус запроса
- `detail` - детали ответа
- `data` - список всех статусов

#### GET /protocols/pending

Эндпоинт для получения номеров протоколов, которые нуждаются в утверждении (протоколы, выпущенные более 2-х дней назад и
не имеющие статуса "протокол утвержден")

Получаемые данные:

- `status_code` - статус запроса
- `detail` - детали ответа
- `count` - количество протоколов, нуждающихся в утверждении
- `pending` - список id всех протоколов, нуждающихся в утверждении

#### POST /protocols/{internal_id}/approve

Эндпоинт для утверждения протокола (если устройство точно прошло ВСЕ проверки), отправки сертификата в ipfs и robonomics
datalog (если включена опция `USE_DATALOG` и указан путь до `Feecc IPFS Gateway`)

Аргументы:

- `internal_id` - внутренний номер сертификата (не протокола)

#### DELETE /protocols/{internal_id}

Эндпоинт для удаления протокола. Если вы хотите изменить уже утвержденный протокол, необходимо удалить старый

Аргументы:

- `internal_id` - внутренний номер сертификата

