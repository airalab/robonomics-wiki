---
title: Цифровые близнецы
contributors: [nakata5321, PaTara43]

tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Представьте, что у вас есть сложное устройство или система, которая имеет несколько модулей для обслуживания и требует нескольких учетных записей для использования. Чтобы держать все это в одном месте или закодировать некоторые функции с отдельными учетными записями или, например, установить разные источники данных для различных информационных потоков, используется модуль Цифрового Близнеца.**

{% roboWikiNote {title:"Dev Node", type: "warning"}%} Обратите внимание, что эти и последующие учебные пособия демонстрируются на локальном экземпляре узла Robonomics. Настройте свой собственный, следуя [этим инструкциям](/docs/run-dev-node).
{% endroboWikiNote %}

## Обзор теории
Любая учетная запись может создавать и управлять Цифровым Близнецом. Близнец можно представить как некоторую таблицу со следующим содержанием:

| ID Близнеца | Название Темы | Источник     |
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Где:
* **ID Близнеца** - это уникальный целочисленный индекс Цифрового Близнеца.
* **Название Темы** - это шестнадцатеричные данные `H256` или ASCII длиной 32 байта, такие же, как параметр экструзии [`Launch`](/docs/launch).
Например: `0x1234....FF` или  `hello.parachain.robonomics.world`.
* **Источник** - это некоторый адрес учетной записи.

{% roboWikiNote {title:"Темы", type: "note"}%} Как уже обсуждалось ранее в обзоре экструзии Launch, `H256` может быть представлен в виде закодированного IPFS CID (см. [Python tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) для этого).
Следовательно, темы могут использоваться как хранилище данных, например, описание модуля Близнеца. {% endroboWikiNote %}


## Создание Цифрового Близнеца

### 1. Перейдите в Разработчик -> Экструзии

{% roboWikiPicture {src:"docs/digital-twin/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. Выберите digitalTwin -> create из выпадающего списка возможных экструзий

{% roboWikiPicture {src:"docs/digital-twin/twin-create.jpg", alt:"twin-create"} %}{% endroboWikiPicture %}

Отправьте транзакцию. Здесь не требуются параметры для создания Близнеца. Ему будет присвоен индекс, и только владелец Цифрового Близнеца сможет добавлять/изменять темы Близнеца отныне.

ID Близнеца можно найти на странице обзора в Explorer.

{% roboWikiPicture {src:"docs/digital-twin/create-log.jpg", alt:"create-log"} %}{% endroboWikiPicture %}

## Добавление Темы

### Выберите digitalTwin -> setSource из выпадающего списка возможных экструзий

{% roboWikiPicture {src:"docs/digital-twin/set-topic.jpg", alt:"set-topic"} %}{% endroboWikiPicture %}

* `id` - ID Цифрового Близнеца, полученный на странице Explorer.
* `topic` - ранее обсуждаемое название темы `H256`. На этой картинке это строка из 32 символов.
* `source` - адрес учетной записи, который будет связан с темой.

{% roboWikiNote {title:"Перезапись", type: "note"}%} Обратите внимание, что тему можно перезаписать другим адресом источника при необходимости.{% endroboWikiNote %}

Подпишите и отправьте экструзию.

## Исследование

Вы можете найти всю информацию о существующих Цифровых Близнецах в хранилище `Developer -> Chain state` модуля `digitalTwin`.

- Общее количество Близнецов - `total()`;
- Владелец Цифрового Близнеца - `owner(u32)`;
- Информация о темах Цифрового Близнеца - `digitalTwin(u32)`.

{% roboWikiPicture {src:"docs/digital-twin/chain-state.jpg", alt:"chain-state"} %}{% endroboWikiPicture %}