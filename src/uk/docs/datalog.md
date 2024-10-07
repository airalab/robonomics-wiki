---
title: Даталог
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Тепер, коли у вас є певні кошти на вашому рахунку, ви можете надсилати екстранси. Спробуйте спочатку Даталог. Це дозволяє вам постійно зберігати дані в блокчейні. Уявіть розподілене та криптозахищене сховище для ваших даних, ось воно!**

{% roboWikiNote {type: "warning", title: "Dev Node"}%}Зверніть увагу, що цей та наступні навчальні посібники демонструються на локальному екземплярі вузла Robonomics. Налаштуйте свій за допомогою [цієї інструкції](/docs/run-dev-node).
{% endroboWikiNote %}


## 1. Перейдіть до Розробник -> Екстранси

{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. Виберіть datalog -> record зі списку можливих екстрансів

Також виберіть обліковий запис, з яким ви хочете надіслати екстранс. Заповніть поле запису.

{% roboWikiPicture {src:"docs/datalog/record.jpg", alt:"record"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Велика кількість даних"}%} Даталог підтримує рядок з максимальним обсягом 512 байтів. Для зберігання великої кількості даних можна використовувати [IPFS](https://ipfs.tech/).
{% endroboWikiNote %}

## 3. Надішліть транзакцію

Підпишіть та надішліть транзакцію з раніше створеним обліковим записом за допомогою розширення або DApp.

{% roboWikiPicture {src:"docs/datalog/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Видалення"}%} Ви також можете видалити **ВСІ** ваші записи за допомогою виклику *datalog -> erase*.
{% endroboWikiNote %}

## 4. Перегляньте свій даталог у сховищі

Для цього перейдіть до *Розробник -> Стан ланцюжка*, виберіть *datalog -> datalogIndex*, вкажіть ваш обліковий запис та натисніть кнопку "+" для отримання індексів записів вашого облікового запису, а потім досліджуйте той, який вам потрібен, за допомогою *datalog -> datalogItem*.

{% roboWikiPicture {src:"docs/datalog/item.jpg", alt:"item"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Дослідник"}%} Усі події, включаючи записи даталогу, можна побачити у потоці подій у *Досліднику*.
{% endroboWikiNote %}