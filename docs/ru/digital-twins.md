---
title: Цифровые двойники
contributors: [nakata5321, PaTara43]

tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---
  
**Представьте, что у вас есть сложное устройство или система, которая имеет несколько модулей для обслуживания и требует нескольких учетных записей для использования. Чтобы хранить все это в одном месте или кодировать некоторую функциональность с отдельными учетными записями или, например, устанавливать разные источники datalog для разных информационных потоков, используется модуль Digital Twin.**

<robo-wiki-note type="warning" title="Dev Node">

  Обратите внимание, что эти и следующие учебники демонстрируются на локальном экземпляре узла Robonomics. Настройте свой с помощью [этих инструкций](/docs/run-dev-node).

</robo-wiki-note>

## Обзор теории
Любая учетная запись может создавать и управлять Digital Twin. Twin можно представить как своего рода таблицу со следующим содержимым:

| DT id  | Topic Name 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Где:
* **DT id** - это беззнаковый целочисленный уникальный индекс Digital Twin.
* **Topic name** is a hex `H256` or ASCII data of 32 bytes length, same as [`Запуск`](/docs/launch) extrinsic parameter. 
Например: `0x1234....FF` или `hello.parachain.robonomics.world`.
* **Source** - это некоторый адрес учетной записи.

<robo-wiki-note type="note" title="Topics">

  Как обсуждалось ранее во внешнем обзоре Запуска, `H256` может быть представлен как закодированный CID IPFS (см. [Инструмент Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) for that). для этого).
  Поэтому топики могут использоваться и как хранилище данных, например, описание модуля Twin.

</robo-wiki-note>


## Создание Digital Twin

### 1. Перейдите в Разработчик -> Экстрансики

<robo-wiki-picture src="digital-twin/extrinsics.jpg" />

### 2. Выберите digitalTwin -> create из выпадающего списка возможных экстрансиков

<robo-wiki-picture src="digital-twin/twin-create.jpg" />

Отправьте транзакцию. Здесь не требуются параметры для создания Twin. Теперь только владелец Digital Twin может добавлять/изменять темы Twin.

ID Twin можно найти на странице обзора Explorer.

<robo-wiki-picture src="digital-twin/create-log.jpg" />

## Добавление темы

### Выберите digitalTwin -> setSource из выпадающего списка возможных экстрансиков

<robo-wiki-picture src="digital-twin/set-topic.jpg" />

* `id` - ID Digital Twin, полученный на странице Explorer.
* `topic` - ранее обсуждаемое имя темы `H256`. На этой картинке это строка из 32 символов.
* `source` - адрес учетной записи, связанный с темой.

<robo-wiki-note type="note" title="Overwrite">

  Обратите внимание, что тема может быть перезаписана другим адресом источника при необходимости.

</robo-wiki-note>

Подпишите и отправьте экстрансик.

## Explore

Вы можете найти всю информацию о существующих Цифровые двойники в хранилище `Developer -> Chain state` модуля хранения `digitalTwin`.

- Общее количество Twins - `total()`;
- Владелец Digital Twin - `owner(u32)`;
- Информация о темах Digital Twin - `digitalTwin(u32)`.

<robo-wiki-picture src="digital-twin/chain-state.jpg" />