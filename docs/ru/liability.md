---
title: Liability
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Чтобы превратить роботов в экономические агенты, нужен инструмент контракта. Знакомьтесь с Liability - паллет Robonomics, реализующий
контракты между учетными записями parachain!**

<robo-wiki-note type="warning" title="Dev Node">

  Обратите внимание, что этот учебник демонстрируется на локальном экземпляре Robonomics Node. Настройте свой с помощью [этих инструкций](/docs/run-dev-node).

</robo-wiki-note>

## Обзор теории

На Ethereum была довольно сложная структура взаимодействия с ответственностью. Вы можете ознакомиться с ней 
[здесь](/docs/robonomics-how-it-works). В наши дни с Kusama все немного проще!

### Переговоры

Для подписания контракта стороны должны сначала провести переговоры. Это может быть сделано несколькими способами, включая 
[IPFS PubSub](https://blog.ipfs.tech/25-pubsub/) или Robonomics PubSub. Пример кода на Python с использованием Robonomics PubSub 
представлен [здесь](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub). 

Предложение и спрос - это сообщения, содержащие две основные характеристики контракта: **описание работы** и **цена**. Формат сообщения
должен быть разработан пользователем для каждого конкретного приложения. Важно не соблюдать строгое правило формата в процессе переговоров.
Возможный ход представлен на рисунке ниже.

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  Обратите внимание, что PubSub - это открытый протокол, поэтому нельзя передавать конфиденциальные данные. Для этого следует использовать другие протоколы.

</robo-wiki-note>


### Signatures

Когда переговоры успешно завершены, каждая сторона должна подписать свое так называемое соглашение, названное подписью. Это 
сообщение, содержащее описание работы и цену **в определенном формате**, подписанное с помощью закрытого ключа учетной записи. Для этого есть 
[инструмент на Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability).
 - Описание работы называется **техника**. Это строка длиной 32 байта, похожая на запуск, которая может быть закодирована в IPFS CID.
 - Цена называется **экономика**. Это десятичное число XRT - Вейнер. 1 Вейнер = 10**-9 XRT.

<robo-wiki-note type="note" title="32 bytes">

  Вы можете получить [IPFS](https://ipfs.tech/) CID, отформатированный правильно, с помощью [библиотеки на Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
  При использовании функции `sign_liability` нет необходимости преобразовывать хеш, это будет сделано автоматически.

</robo-wiki-note>

Следуя примеру с кофе:

1. Задача - это JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. Его IPFS CID - `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Таким образом, **техника** (преобразованный CID) - `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9` 
4. **Экономика** составляет `1.5 XRT`.

Когда подписано, пришло время создать обязательство! Это может быть сделано одной из сторон (либо обещающей стороной, либо обещателем), либо 
3-ей стороной, так называемым поставщиком.

## Создать обязательство

### Подготовка

Как уже упоминалось ранее, в процессе участвуют как минимум две стороны. В этом примере давайте используем три и создадим
отдельного поставщика для этого. Предположим, что переговоры уже состоялись каким-то образом.

### 1. Создайте три аккаунта и добавьте на них средства

<robo-wiki-picture src="liability/balances.jpg" />

Здесь мы предоставили поставщику 100 XRT для подписи внешних обязательств, обещающей стороне было предоставлено 2 XRT для оплаты работы.
Обещатель не получил никаких средств (за исключением существенного депозита не менее 1 мXRT).

### 1. Перейдите в Developer -> Extrinsics

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. Выберите liability -> create из выпадающего списка возможных внешних обязательств

Также выберите аккаунт, с которым вы хотите отправить extrinsic. Заполните все параметры.

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="Signatures">

  Поскольку здесь используется поставщик, нет необходимости знать семена участников. Необходимы только их подписи.

</robo-wiki-note>

### 3. Отправьте транзакцию

<robo-wiki-picture src="liability/submit.jpg" />

### 4. Просмотрите свое обязательство в событиях

Для этого перейдите в `Network -> Explorer`  и найдите список событий справа. Нажмите на треугольник, чтобы развернуть его.

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  Хэш может быть преобразован в IPFS CID с тем же 
  [Python tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).

</robo-wiki-note>

### 5. Исследование хранения

Вы также можете изучить некоторые характеристики обязательств в модуле хранения `liability`.

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  Функция хранения `Next Index` показывает последний индекс обязательства +1, поэтому, даже если это `1`, обязательство `0` исследуется.

</robo-wiki-note>

## Отчеты

Представьте себе, что кофе был приготовлен, и теперь кофеварке нужно somehow сообщить об этом. Вот где появляются отчеты об обязательствах
. В качестве доказательства труда аккаунт добавляет еще один IPFS CID в качестве содержимого отчета при завершении существующего
обязательства. Для этого также требуется подпись обещателя.

<robo-wiki-note type="note" title="Report signature">

  Подписанное сообщение содержит существующий индекс обязательства и IPFS CID отчета, закодированный в 32-байтовом представлении. Опять же,
  [инструмент Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) может помочь подписать отчет.

</robo-wiki-note>

Продолжая пример с кофеваркой:

1. Отчет - это JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. Его IPFS CID - `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Таким образом, **payload** (преобразованный CID) — это `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2` 
4. **Индекс** - `0`, это существующий индекс обязательства.

### 1. Перейдите к extrinsics, liability -> finalize(report)

Заполните параметры и отправьте внешнее обязательство. Опять же, это может быть сделано 3-ей стороной. 

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  Обратите внимание, что учетная запись обещателя не должна быть "мертвой" - у нее должен быть существенный депозит не менее 1 мXRT.

</robo-wiki-note>

Подпишите и отправьте отчет. После выполнения вы можете изучить его в событиях.

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. Исследуйте reports

Вы также можете наблюдать отчет в хранилище. Перейдите в `Developer -> Storage` и выберите `liability` из выпадающего списка.

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. Проверьте балансы

На картинке показано, что теперь обещатель получил "зарплату". Произошли экономические отношения!

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Проверка">

  На данный момент нет способа проверить, выполнена ли работа, поэтому как только обещатель сообщает, токены переводятся на его счет.
  Функция проверки будет добавлена в будущем.

</robo-wiki-note>