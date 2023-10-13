---
title: Відповідальність
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Щоб перетворити роботів на економічних агентів, потрібен інструмент договору. Знайомтеся з Liability - палеткою Robonomics, яка реалізує контракти між рахунками парачейну!**

<robo-wiki-note type="warning" title="Dev Node">

  Зверніть увагу, що цей посібник демонструється на локальному екземплярі Robonomics Node. Налаштуйте свій за допомогою [цієї інструкції](/docs/run-dev-node).

</robo-wiki-note>

## Огляд теорії

На Ethereum існувала досить складна структура взаємодії відповідальності. Ви можете ознайомитися з нею [тут](/docs/robonomics-how-it-works). Зараз речі трохи спрощені з Kusama!

### Переговори

Для підписання контракту сторони повинні спочатку домовитися. Це можна зробити кількома способами, зокрема [IPFS PubSub ](https://blog.ipfs.tech/25-pubsub/) або Robonomics PubSub. Зразок коду Python із використанням Robonomics PubSub представлено [тут](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub). 

Пропозиція та попит - це повідомлення, що містять дві основні характеристики контракту: **опис роботи** та **ціна**. Формат повідомлення повинен бути розроблений користувачем для кожної конкретної програми. У процесі переговорів необов'язково дотримуватися жорсткого правила формату. Можливий потік представлений на наступному малюнку.

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  Зверніть увагу, що PubSub - це відкритий протокол, тому немає потреби передавати конфіденційні дані. Для цього слід використовувати інші протоколи.

</robo-wiki-note>


### Підписи

Після успішного завершення переговорів кожна сторона повинна підписати свою так звану угоду, яка називається підписом. Це повідомлення, що містить опис роботи та ціну **в певному форматі**, підписане закритим ключем облікового запису. Для цього також існує [Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability).
 - Опис роботи називається **технікою**. Це рядок довжиною 32 байти, який може бути закодованим IPFS CID.
 - Ціна називається **економікою**. Це десяткове число XRT - Вейнер. 1 Вейнер = 10**-9 XRT.

<robo-wiki-note type="note" title="32 bytes">

  Можна отримати [IPFS](https://ipfs.tech/) CID у правильному форматі за допомогою [бібліотеки Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
  При використанні функції `sign_liability` немає потреби перетворювати хеш, це буде зроблено автоматично.

</robo-wiki-note>

За прикладом з кавою:

1. Завдання - це JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. Його IPFS CID - `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Таким чином, **техніка** (перетворений CID) - `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9` 
4. **Економіка** - `1.5 XRT`.

Після підписання настав час створити відповідальність! Це може зробити одна зі сторін (або обіцяючий, або обіцяний) або обліковий запис третьої сторони, так званого постачальника.

## Створити відповідальність

### Підготовка

Як вже зазначалося раніше, у процесі задіяні принаймні дві сторони. Для цього прикладу використовуємо три і створимо окремого постачальника. Припустимо, що переговори вже відбулися якимось чином.

### 1. Створіть три облікові заиси та додайте кошти на них

<robo-wiki-picture src="liability/balances.jpg" />

Тут ми надали постачальнику 100 XRT для підписування екстриксів відповідальності, обіцяючому було надано 2 XRT для оплати роботи.
Обіцяний не отримав жодних коштів (крім існуючого депозиту, що становить принаймні 1 мXRT).

### 1. Перейдіть до Developer -> Extrinsics

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. Виберіть liability -> create зі списку можливих екстриксів

Також виберіть обліковий запис, з яким ви хочете подати екстрикс. Заповніть всі параметри.

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="Signatures">

  Оскільки тут використовується постачальник, не потрібно знати насіння учасників. Потрібні лише їх підписи.

</robo-wiki-note>

### 3. Відправити транзакцію

<robo-wiki-picture src="liability/submit.jpg" />

### 4. Перегляньте свою відповідальність у подіях

Для цього перейдіть до `Network -> Explorer` та знайдіть список подій справа. Клацніть на трикутник, щоб розгорнути.

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  Хеш можна перетворити на IPFS CID за допомогою того самого [інструмента Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).

</robo-wiki-note>

### 5. Дослідження сховища

Ви також можете досліджуват деякі характеристики відповідальностей у модулі сховища `liability`.

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  Функція сховища `Next Index` показує останній індекс відповідальності +1, тому навіть якщо він дорівнює `1`, відповідальність `0` досліджується.

</robo-wiki-note>

## Звіти

Уявіть, що кава була приготована, і тепер кавоварка повинна якось про це повідомити. Ось де з'являються звіти про відповідальність. Як доказ праці, рахунок додає ще один IPFS CID як зміст звіту при завершенні існуючої відповідальності. Це знову вимагає підпису обіцяючого.

<robo-wiki-note type="note" title="Report signature">

  Підписане повідомлення містить індекс існуючого зобов'язання та код IPFS CID звіту, закодований у 32-байтовому представленні. Ще раз, [інструмент Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) може допомогти підписати звіт.

</robo-wiki-note>

Продовжуючи приклад з кавоваркою:

1. Звіт - це JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. Його IPFS CID - `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Таким чином, **корисне навантаження** (трансформований CID) є `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. **Індекс** - `0`, це існуючий індекс зобов'язання.

### 1. Перейдіть до extrinsics, liability -> finalize(report)

Заповніть параметри та надішліть зовнішній. Знову ж таки, це можна зробити за допомогою стороннього облікового запису.

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  Зверніть увагу, що рахунок обіцяючого не повинен бути "мертвим" - він повинен мати існуючий депозит не менше 1 мXRT.

</robo-wiki-note>

Підпишіть та надішліть звіт. Після завершення ви можете дослідити його в подіях.

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. Досліджуйте звіти

Ви також можете спостерігати за звітом у сховищі. Перейдіть до `Developer -> Storage` та виберіть `liability` зі списку.

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. Перевірте баланси

На зображенні показано, що тепер обіцяючий отримав "зарплату". Економічні відносини стали можливими!

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Verifying">

  Наразі немає способу перевірити, що робота виконана, тому як тільки обіцяючий повідомляє, токени перекладаються на його рахунок. 
  Функцію перевірки планується додати у майбутньому.

</robo-wiki-note>