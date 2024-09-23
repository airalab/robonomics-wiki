---
title: Datalog
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Теперь, когда у вас есть некоторые средства на вашем счету, вы можете отправлять экстранзакции. Первая, которую можно попробовать, - это Datalog. Он позволяет сохранять данные в блокчейне постоянно. Представьте себе распределенное и криптозащищенное хранилище для ваших данных, и вот оно!**

{% roboWikiNote {type: "warning", title: "Dev Node"}%}Обратите внимание, что эти и последующие учебные пособия демонстрируются на локальном экземпляре узла Robonomics. Настройте свой собственный, следуя [этим инструкциям](/docs/run-dev-node).
{% endroboWikiNote %}


## 1. Перейдите в Разработчик -> Экстранзакции

{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. Выберите datalog -> record из выпадающего списка возможных экстранзакций

Также выберите учетную запись, с которой вы хотите отправить экстранзакцию. Заполните поле записи.

{% roboWikiPicture {src:"docs/datalog/record.jpg", alt:"record"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Большое количество данных"}%} Datalog поддерживает строку с максимальным размером 512 байт. Для хранения большого объема данных можно использовать [IPFS](https://ipfs.tech/).
{% endroboWikiNote %}

## 3. Отправьте транзакцию

Подпишите и отправьте транзакцию с учетной записью, созданной ранее с помощью расширения или DApp.

{% roboWikiPicture {src:"docs/datalog/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Стереть"}%} Вы также можете стереть **ВСЕ** ваши записи с помощью вызова *datalog -> erase*.
{% endroboWikiNote %}

## 4. Просмотрите свой datalog в хранилище

Для этого перейдите в *Разработчик -> Состояние цепи*, выберите *datalog -> datalogIndex*, укажите вашу учетную запись и нажмите кнопку "+", чтобы получить индексы записей вашей учетной записи, а затем изучите нужную вам с помощью *datalog -> datalogItem*.

{% roboWikiPicture {src:"docs/datalog/item.jpg", alt:"item"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Обозреватель"}%} Все события, включая запись datalog, можно увидеть в потоке событий в *Обозревателе*.
{% endroboWikiNote %}