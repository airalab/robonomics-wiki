---
title: Ответственность
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Чтобы превратить роботов в экономических агентов, необходим инструмент для заключения контрактов. Познакомьтесь с Liability - паллетом Robonomics, реализующим контракты между аккаунтами парачейна!**

{% roboWikiNote {title:"Dev Node", type: "warning"}%}   Обратите внимание, что этот учебник демонстрируется на локальном экземпляре узла Robonomics. Настройте свой с помощью [этих инструкций](/docs/run-dev-node).
{% endroboWikiNote %}

## Обзор теории

На Ethereum была довольно сложная структура взаимодействия по ответственности. Вы можете ознакомиться с ней
[здесь](/docs/robonomics-how-it-works). В наши дни вещи немного упростились с Kusama!

### Переговоры

Для подписания контракта обе стороны должны сначала провести переговоры. Это можно сделать несколькими способами, включая
[IPFS PubSub ](https://blog.ipfs.tech/25-pubsub/) или Robonomics PubSub. Пример кода на Python с использованием Robonomics PubSub представлен [здесь](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

Предложение и спрос - это сообщения, содержащие две основные характеристики контракта: **описание работы** и **цену**. Формат сообщения
должен быть разработан пользователем для каждого конкретного приложения. Важно не слишком строго придерживаться формата в процессе переговоров. Возможный ход событий представлен на рисунке ниже.

{% roboWikiPicture {src:"docs/liability/negotiations.jpg", alt:"negotiations"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"PubSub", type: "warning"}%} Обратите внимание, что PubSub - это открытый протокол, поэтому нельзя передавать конфиденциальные данные. Для этого следует использовать другие протоколы.
{% endroboWikiNote %}

### Подписи

Когда переговоры успешно завершены, каждая сторона должна подписать свое так называемое соглашение, названное подписью. Это
сообщение, содержащее описание работы и цену **в определенном формате**, подписанное с помощью закрытого ключа аккаунта. Также есть
[инструмент на Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) для этого.
 - Описание работы называется **техника**. Это строка длиной 32 байта, которая может быть закодированным IPFS CID.
 - Цена называется **экономика**. Это десятичное число XRT - Вейнер. 1 Вейнер = 10**-9 XRT.

{% roboWikiNote {title:"32 байта", type: "note"}%} Можно получить [IPFS](https://ipfs.tech/) CID, отформатированный правильным образом с помощью [библиотеки на Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
При использовании функции `sign_liability` нет необходимости преобразовывать хеш, это будет сделано автоматически.{% endroboWikiNote %}

Продолжая пример с кофемашиной:

1. Задача в формате JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. Ее IPFS CID - `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Таким образом, **техника** (преобразованный CID) - `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`
4. **Экономика** - `1.5 XRT`.

Когда подписано, пришло время создать обязательство! Это может сделать одна из сторон (либо обещающая, либо обязующаяся) или
аккаунт третьей стороны, так называемый провайдер.

## Создание обязательства

### Подготовка

Как уже упоминалось ранее, в процессе участвуют как минимум две стороны. Для этого примера давайте использовать три и создадим
отдельного провайдера. Предположим, что переговоры уже как-то состоялись.

### 1. Создайте три аккаунта и добавьте средства на них

{% roboWikiPicture {src:"docs/liability/balances.jpg", alt:"balances"} %}{% endroboWikiPicture %}

Здесь мы предоставили провайдеру 100 XRT для подписи экструзий обязательств, обещающей стороне было выделено 2 XRT для оплаты работы.
Обязующей стороне не были предоставлены средства (за исключением существенного депозита в размере не менее 1 мXRT).

### 1. Перейдите в Разработчик -> Экструзии

{% roboWikiPicture {src:"docs/liability/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. Выберите обязательство -> создать из выпадающего списка возможных экструзий

Также выберите аккаунт, с которым вы хотите отправить экструзию. Заполните все параметры.

{% roboWikiPicture {src:"docs/liability/create.jpg", alt:"create"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Подписи", type: "note"}%} Поскольку здесь используется провайдер, нет необходимости знать семена участников. Нужны только их подписи.
{% endroboWikiNote %}

### 3. Отправьте транзакцию

{% roboWikiPicture {src:"docs/liability/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

### 4. Просмотрите ваше обязательство в событиях

Для этого перейдите в `Сеть -> Обозреватель` и найдите список событий справа. Нажмите на треугольник, чтобы развернуть.

{% roboWikiPicture {src:"docs/liability/new-liability.jpg", alt:"new-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Хеш", type: "note"}%} Хеш можно преобразовать в IPFS CID с помощью того же [инструмента на Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).
{% endroboWikiNote %}

### 5. Исследование хранилища

Вы также можете изучить некоторые характеристики обязательств в модуле хранения `liability`.

{% roboWikiPicture {src:"docs/liability/storage-liability.jpg", alt:"storage-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Следующий индекс", type: "note"}%} Функция хранения `Следующий индекс` показывает последний индекс обязательства +1, поэтому, даже если это `1`, обязательство `0` исследуется.
{% endroboWikiNote %}

## Отчеты

Представьте, что кофе приготовлен, и теперь кофемашине нужно как-то сообщить об этом. В этом момент в игру вступают отчеты об ответственности.
В качестве доказательства труда аккаунт добавляет еще один IPFS CID в качестве содержимого отчета при завершении существующего обязательства. Для этого снова требуется подпись обязующей стороны.

{% roboWikiNote {title:"Подпись отчета", type: "note"}%} Подписанное сообщение содержит существующий индекс обязательства и IPFS CID отчета, закодированный в представлении 32 байта. Опять же, [инструмент на Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) может помочь подписать отчет.
{% endroboWikiNote %}

Продолжая пример с кофемашиной:

1. Отчет в формате JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. Его IPFS CID - `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Таким образом, **полезная нагрузка** (преобразованный CID) - `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. **Индекс** - `0`, это существующий индекс обязательства.

### 1. Перейдите к экструзиям, обязательство -> завершить(отчет)

Заполните параметры и отправьте экструзию. Опять же, это может сделать аккаунт третьей стороны.

{% roboWikiPicture {src:"docs/liability/report.jpg", alt:"report"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Существенный депозит", type: "warning"}%} Обратите внимание, что у обязующего аккаунта не должно быть "мертвых" средств - у него должен быть существенный депозит в размере не менее 1 мXRT.
{% endroboWikiNote %}

Подпишите и отправьте отчет. Когда это будет сделано, вы сможете изучить его в событиях.

{% roboWikiPicture {src:"docs/liability/new-report.jpg", alt:"new-report"} %}{% endroboWikiPicture %}

### 2. Изучение отчетов

Вы также можете наблюдать отчет в хранилище. Перейдите в `Разработчик -> Хранилище` и выберите `liability` из выпадающего списка.

{% roboWikiPicture {src:"docs/liability/storage-report.jpg", alt:"storage-report"} %}{% endroboWikiPicture %}

### 3. Проверка балансов

На картинке показано, что сейчас должник получил "зарплату". Экономические отношения произошли!

{% roboWikiPicture {src:"docs/liability/balances-2.jpg", alt:"balances-2"} %} {% endroboWikiPicture %}

{% roboWikiNote {title:"Проверка", type: "note"}%} На данный момент нет способа проверить, что работа выполнена, поэтому как только должник сообщит, токены будут переведены на его счет. Функция проверки будет добавлена в будущем.
{% endroboWikiNote %}