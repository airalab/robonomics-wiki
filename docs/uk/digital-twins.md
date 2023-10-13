---
title: Цифрові двійники
contributors: [nakata5321, PaTara43]

tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---
  
**Уявіть собі складний пристрій або систему, яка має кілька модулів для підтримки і вимагає кількох облікових записів для використання. Щоб тримати всіх їх в однму місці або кодувати деяку функціональність з окремими обліковими записами або, наприклад, встановлювати різні джерела даних для різних потоків інформації, використовується модуль Цифрової Двійника.**

<robo-wiki-note type="warning" title="Dev Node">

  Будь ласка, зверніть увагу, що ці та наступні посібники демонструються на локальному екземплярі вузла Robonomics. Налаштуйте свій за допомогою [цієї інструкції](/docs/run-dev-node).

</robo-wiki-note>

## Огляд теорії
Будь-який обліковий запис може створювати та керувати Цифровим Двійником. Двійник можна уявити як своєрідну таблицю з таким вмістом:

| DT id  | Topic Name 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Де:
* **DT id** є непідписаним цілим числом унікальний індекс Цифрового Двійника.
* **Topic name** є шістнадцятковим `H256` або ASCII-даними довжиною 32 байти, таким самим, як [`Запуск`](/docs/launch) зовнішній параметр. 
Наприклад: `0x1234....FF` або `hello.parachain.robonomics.world`.
* **Source** - є деякою адресою облікового запису.

<robo-wiki-note type="note" title="Topics">

  Як вже обговорювалося раніше в огляді зовнішніх витягів запуску, `H256` може бути представлений у вигляді закодованого IPFS CID (див.
  [Python-інструмент](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) для цього).
  Тому теми також можут використовуватися як засоби зберігання даних, наприклад, опис модуля Twin.

</robo-wiki-note>


## Створити цифровий близнюк

### 1. Перейдіть до РDeveloper -> Extrinsics

<robo-wiki-picture src="digital-twin/extrinsics.jpg" />

### 2. Виберіть digitalTwin -> create зі списку можливих витягів

<robo-wiki-picture src="digital-twin/twin-create.jpg" />

Надішліть транзакцію. Тут не потрібні параметри для створення Twin. Зараз власник Цифрового близняка зможе додавати/змінювати теми близняка.

Ідентифікатор Twin можна знайти на сторінці огляду Досліджуватиr.

<robo-wiki-picture src="digital-twin/create-log.jpg" />

## Додати тему

### Виберіть digitalTwin -> setSource зі списку можливих витягів

<robo-wiki-picture src="digital-twin/set-topic.jpg" />

* `id` - Digital Twin ID, отриманий на сторінці Explorer.
* `topic` - раніше обговорюване ім'я теми `H256`. На цьому зображенні це рядок з 32 символами.
* `source` - адреса облікового запису, яка буде пов'язана з темою.

<robo-wiki-note type="note" title="Overwrite">

  Зверніть увагу, що тему можна перезаписати іншою джерелом адреси, якщо потрібно.

</robo-wiki-note>

Підпишіть та надішліть витяг.

## Explore

Ви можете знайти всю інформацію про існуючі Цифрові близнюки в сховищі модуля `digitalTwin` в розділі `Developer -> Chain state`

- Загальна кількість близнюків - `total()`;
- Власник Цифрового близняка - `owner(u32)`;
- Інформація про теми Цифрового близняка - `digitalTwin(u32)`.

<robo-wiki-picture src="digital-twin/chain-state.jpg" />