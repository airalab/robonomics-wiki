---
title: Відповідальність
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Щоб перетворити роботів на економічних агентів, потрібен інструмент угод. Познайомтеся з Liability - палітрою Robonomics, яка реалізує контракти між акаунтами парачейну!**

{% roboWikiNote {title:"Dev Node", type: "warning"}%} Будь ласка, зверніть увагу, що цей посібник демонструється на локальному екземплярі вузла Robonomics. Налаштуйте свій за допомогою [цієї інструкції](/docs/run-dev-node).
{% endroboWikiNote %}

## Огляд теорії

На Ethereum була досить складна структура взаємодії відповідальності. Ви можете ознайомитися з нею [тут](/docs/robonomics-how-it-works). В наші дні речі трохи спрощені з Kusama!

### Переговори

Для підписання контракту обидві сторони повинні спочатку провести переговори. Це може бути зроблено кількома способами, включаючи [IPFS PubSub](https://blog.ipfs.tech/25-pubsub/) або Robonomics PubSub. Приклад коду Python, який використовує Robonomics PubSub, представлений [тут](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

Пропозиція та попит - це повідомлення, що містять дві основні характеристики контракту: **опис роботи** та **ціна**. Формат повідомлення повинен бути розроблений користувачем для кожного конкретного застосування. У процесі переговорів не обов'язково дотримуватися жорсткого правила формату. Можливий хід подій представлений на малюнку нижче.

{% roboWikiPicture {src:"docs/liability/negotiations.jpg", alt:"negotiations"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"PubSub", type: "warning"}%} Зверніть увагу, що PubSub - це відкритий протокол, тому ніякі конфіденційні дані не повинні передаватися. Для цього варто використовувати інші протоколи.
{% endroboWikiNote %}

### Підписи

Коли переговори успішно завершені, кожна сторона повинна підписати свою так звану угоду, яку називають підписом. Це повідомлення, що містить опис роботи та ціну **у конкретному форматі**, підписане приватним ключем акаунта. Існує [інструмент на Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) для цього також.
 - Опис роботи називається **техніка**. Це рядок довжиною 32 байти, який може бути закодованим IPFS CID.
 - Ціна називається **економіка**. Це десятковий XRT - Вейнер. 1 Вейнер = 10**-9 XRT.

{% roboWikiNote {title:"32 байти", type: "note"}%} Можна отримати [IPFS](https://ipfs.tech/) CID, відформатований належним чином за допомогою [Python бібліотеки](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
При використанні функції `sign_liability` не потрібно перетворювати хеш, це буде зроблено автоматично.{% endroboWikiNote %}

Поширюючи приклад з кавою:

1. Завдання у форматі JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. Його IPFS CID - `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Таким чином **техніка** (перетворений CID) - `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`
4. **Економіка** - `1.5 XRT`.

Коли підписано, час створити відповідальність! Це може бути зроблено однією зі сторін (або обіцянками, або обіцянками) або третьою стороною акаунта, так званим постачальником.

## Створення Відповідальності

### Підготовка

Як було зазначено раніше, у процесі залучено принаймні дві сторони. Для цього прикладу використаємо три та створимо окремого постачальника. Припустимо, що переговори вже відбулися якось.

### 1. Створіть три акаунти та додайте кошти на них

{% roboWikiPicture {src:"docs/liability/balances.jpg", alt:"balances"} %}{% endroboWikiPicture %}

Тут ми надали постачальнику 100 XRT для підписання екстрактів відповідальності, обіцянцю було надано 2 XRT для оплати роботи.
Обіцянцю не було надано жодних коштів (крім існуючого депозиту в розмірі принаймні 1 мXRT).

### 1. Перейдіть до Розробник -> Екстракти

{% roboWikiPicture {src:"docs/liability/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. Виберіть відповідальність -> створити зі списку можливих екстрактів

Також виберіть акаунт, з яким ви хочете надіслати екстракт. Заповніть всі параметри.

{% roboWikiPicture {src:"docs/liability/create.jpg", alt:"create"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Підписи", type: "note"}%} Оскільки тут використовується постачальник, не потрібно знати насіння учасників. Потрібні лише їх підписи.
{% endroboWikiNote %}

### 3. Надішліть транзакцію

{% roboWikiPicture {src:"docs/liability/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

### 4. Перегляньте вашу відповідальність в подіях

Для цього перейдіть до `Мережа -> Дослідник` та знайдіть список подій справа. Клацніть на іконку трикутника, щоб розгорнути.

{% roboWikiPicture {src:"docs/liability/new-liability.jpg", alt:"new-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Хеш", type: "note"}%} Хеш можна перетворити на IPFS CID за допомогою того ж [Python інструменту](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).
{% endroboWikiNote %}

### 5. Дослідження сховища

Ви також можете дослідити деякі характеристики відповідальностей у модулі сховища `liability`.

{% roboWikiPicture {src:"docs/liability/storage-liability.jpg", alt:"storage-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Наступний індекс", type: "note"}%} Функція сховища `Наступний індекс` показує останній індекс відповідальності +1, тому навіть якщо це `1`, вивчається відповідальність `0`.
{% endroboWikiNote %}

## Звіти

Уявіть, що каву зроблено, і тепер кавоварка повинна якось про це повідомити. Ось де входять звіти про відповідальність. Як доказ праці, акаунт додає ще один IPFS CID як вміст звіту при завершенні існуючої відповідальності. Це знову вимагає підпису обіцянця.

{% roboWikiNote {title:"Підпис звіту", type: "note"}%} Підписане повідомлення містить існуючий індекс відповідальності та IPFS CID звіту, закодований у 32-байтовому представленні. Ще раз, [Python інструмент](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) може допомогти підписати звіт.
{% endroboWikiNote %}

Продовжуючи приклад з кавоваркою:

1. Звіт у форматі JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. Його IPFS CID - `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Таким чином **навантаження** (перетворений CID) - `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. **Індекс** - `0`, це існуючий індекс відповідальності.

### 1. Перейдіть до екстрактів, відповідальність -> завершити (звіт)

Заповніть параметри та надішліть екстракт. Це також може бути зроблено третьою стороною.

{% roboWikiPicture {src:"docs/liability/report.jpg", alt:"report"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Існуючий депозит", type: "warning"}%} Зверніть увагу, що акаунт обіцянця не повинен бути "мертвим" - він повинен мати існуючий депозит в розмірі принаймні 1 мXRT.
{% endroboWikiNote %}

Підпишіть та надішліть звіт. Коли ви закінчите, ви можете дослідити його в подіях.

{% roboWikiPicture {src:"docs/liability/new-report.jpg", alt:"new-report"} %}{% endroboWikiPicture %}

### 2. Дослідження звітів

Ви також можете спостерігати за звітом у сховищі. Перейдіть до `Розробник -> Сховище` та виберіть `відповідальність` зі списку випадаючих списків.

{% roboWikiPicture {src:"docs/liability/storage-report.jpg", alt:"storage-report"} %}{% endroboWikiPicture %}

### 3. Перевірка балансів

На зображенні показано, що зараз поручник отримав "зарплату". Економічний зв'язок відбувся!

{% roboWikiPicture {src:"docs/liability/balances-2.jpg", alt:"balances-2"} %} {% endroboWikiPicture %}

{% roboWikiNote {title:"Перевірка", type: "note"}%} Наразі немає способу перевірити, що робота виконана, тому як тільки поручник повідомляє, токени переказуються на його рахунок. Функція перевірки буде додана у майбутньому.
{% endroboWikiNote %}