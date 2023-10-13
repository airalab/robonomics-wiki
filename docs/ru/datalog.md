---
title: Datalog
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Теперь, когда у вас есть некоторые средства на вашем счету, вы можете отправлять экстрансики. Первым, что можно попробовать, является Datalog. Он позволяет сохранять данные в блокчейне постоянно. Представьте себе распределенное и крипто-защищенное хранилище для ваших данных, и это оно!**

<robo-wiki-note type="warning" title="Dev Node">

  Обратите внимание, что эти и следующие учебники демонстрируются на локальном экземпляре Robonomics Node. Настройте свой с помощью [этих инструкций](/docs/run-dev-node).

</robo-wiki-note>

## 1. Перейдите в Developer -> Extrinsics

<robo-wiki-picture src="datalog/extrinsics.jpg" />

## 2. Выберите datalog -> record из выпадающего списка возможных экстрансиков

Также выберите учетную запись, с которой вы хотите отправить экстрансик. Заполните поле записи.

<robo-wiki-picture src="datalog/record.jpg" />

<robo-wiki-note type="note" title="Large amount of data">

  Datalog поддерживает строку с максимальным размером 512 байт. Для хранения большого объема данных можно использовать [IPFS](https://ipfs.tech/).

</robo-wiki-note>

## 3. Отправьте транзакцию

Подпишите и отправьте транзакцию с учетной записью, созданной ранее с помощью расширения или DApp.

<robo-wiki-picture src="datalog/submit.jpg" />

<robo-wiki-note type="note" title="Erase">

  Вы также можете стереть **ВСЕ** ваши записи с помощью вызова *datalog -> erase*.

</robo-wiki-note>

## 4. Просмотрите свой datalog в хранилище

Для этого перейдите в *Developer -> Chain state*,, выберите *datalog -> datalogIndex*, укажите вашу учетную запись и нажмите кнопку "+", чтобы получить индексы записей вашей учетной записи, а затем изучите нужную с помощью *datalog -> datalogItem*.

<robo-wiki-picture src="datalog/item.jpg" />

<robo-wiki-note type="note" title="Исследуйтеr">

  Все события, включая запись datalog, можно увидеть в потоке событий в *Explorer*.

</robo-wiki-note>