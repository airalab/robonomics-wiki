---
title: Даталог
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Тепер, коли у вас є деякі кошти на вашому рахунку, ви можете надсилати екстрикси. Спробуйте спочатку Datalog. Він дозволяє зберігати дані в блокчейні постійно. Уявіть собі розподілене т криптозахищене сховище для ваших даних, і ось воно!**

<robo-wiki-note type="warning" title="Dev Node">

Будь ласка, зверніть увагу, що ці та наступні посібники демонструються на локальному екземплярі вузла Robonomics. Налаштуйте свій за допомогою [цієї інструкції](/docs/run-dev-node).

</robo-wiki-note>

## 1. Перейдіть до  Developer -> Extrinsics

<robo-wiki-picture src="datalog/extrinsics.jpg" />

## 2. Виберіть datalog -> record зі списку можливих екстриксів

Також виберіть обліковий запис, з яким ви хочете відправити екстрикс. Заповніть поле запису.

<robo-wiki-picture src="datalog/record.jpg" />

<robo-wiki-note type="note" title="Large amount of data">

  Даталог підтримує рядок з максимальною довжиною 512 байтів. Для зберігання великої кількості даних можна використовувати [IPFS](https://ipfs.tech/).

</robo-wiki-note>

## 3. Відправити транзакцію

Підпишіть та відправте транзакцію з обліковим записом, створеним раніше за допомогою розширення або DApp.

<robo-wiki-picture src="datalog/submit.jpg" />

<robo-wiki-note type="note" title="Erase">

  Ви також можете видалити **ВСІ** ваші записи за допомогою *datalog -> erase* виклику.

</robo-wiki-note>

## 4. Перегляньте свій даталог у сховищі

Для цього перейдіть до *Developer -> Chain state*, виберіть *datalog -> datalogIndex*, вкажіть свій обліковий запис та натисніть кнопку 
"+" щоб отримати індекси записів вашого облікового запису, а потім досліджуйте потрібний з них за допомогою *datalog -> datalogItem*.

<robo-wiki-picture src="datalog/item.jpg" />

<robo-wiki-note type="note" title="Досліджуватиr">

  Всі події, включаючи записи даталогу, можна побачити в потоці подій у *Explorer*.

</robo-wiki-note>