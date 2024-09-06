---
title: Додавання коштів на ваш обліковий запис на порталі Robonomics

contributors: [Houman]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Після успішного створення облікових записів на порталі Robonomics настав час додати кошти на них, щоб ви могли ініціювати транзакції.**

{% roboWikiNote {title: 'Dev Node', type: "warning"} %}Зверніть увагу, що цей та наступні посібники демонструються на локальному екземплярі вузла Robonomics. Налаштуйте свій за допомогою [цієї інструкції](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Перейдіть до розділу Облікові записи на порталі Robonomics

{% roboWikiPicture {src:"docs/creating-an-account/portal-top-left.jpg", alt:"accounts"} %}{% endroboWikiPicture %}

## 2. Виберіть обліковий запис, з якого ви хочете переказати кошти

У режимі розробки існує кілька облікових записів, кожен з яких має 10000 одиниць коштів, які можна використовувати для переказу коштів на інші облікові записи, створені в мережі розробки. Ці облікові записи позначені знаками гайки <img src="/assets/images/docs/adding-funds/wrench.png" alt="wrench sign" width="20"/> поруч з ними.

{% roboWikiPicture {src:"docs/adding-funds/accounts-for-sending.svg", alt:"Accounts-for-sending", caption: "Accounts-for-sending"} %}{% endroboWikiPicture %}

- Клацніть на кнопку "send" облікового запису, з якого ви хочете переказати кошти, наприклад, BOB

## 3. Виберіть обліковий запис, на який ви хочете переказати кошти
Після клацання на кнопку "send", вас буде запросено вікном "send funds". У відкритому вікні:

- Зі списку доступних облікових записів виберіть обліковий запис, на який ви хочете переказати кошти.
- Введіть кількість одиниць, які ви хочете відправити.
- Натисніть "make transfer"

{% roboWikiPicture {src:"docs/adding-funds/send-funds.png", alt:"Transfer-Funds", caption: "Transfer-Funds"} %}{% endroboWikiPicture %}


## 4. Підтвердіть транзакцію

Після натискання "make transfer" на попередньому етапі, вас буде запросено вікном "authorize transaction".<br/>
Перегляньте деталі транзакції і, нарешті, клацніть кнопку "sign and submit".

{% roboWikiPicture {src:"docs/adding-funds/sign-transaction.png", alt:"sign-transaction", caption: "sign-transaction"} %}{% endroboWikiPicture %}

У цьому прикладі ми переказали 500 одиниць коштів з "BOB" на "EMPLOYER". Ви можете побачити, що обліковий запис EMPLOYER, який спочатку не мав жодних коштів, тепер має 500 одиниць коштів.

{% roboWikiPicture {src:"docs/adding-funds/funds-added.svg", alt:"funds-added", caption: "funds-added"} %}{% endroboWikiPicture %}

**Переконайтеся, що у вас є достатньо коштів на облікових записах, які ви хочете використовувати в ігровому майданчику.**