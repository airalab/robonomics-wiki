---
title: Запуск
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Ще одна основна функція палети Robonomics - це палета запуску. Вона дозволяє відправляти команди на рахунки/будь-які сутності, що стоять за ними. Ці команди включають параметр, що вказує завдання, яке має бути виконане.**

<robo-wiki-note type="warning" title="Dev Node">

  Зверніть увагу, що ці та наступні посібники демонструються на локальному екземплярі вузла Robonomics. Налаштуйте свій за допомогою [цієї інструкції](/docs/run-dev-node).

</robo-wiki-note>

## 1. Перейдіть до Developer -> Extrinsics

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. Виберіть launch -> launch зі списку можливих екстриксів

Також виберіть рахунок, з яким ви хочете відправити екстрикс. Заповніть поле цільової адреси та параметрів.

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  Launch підтримує рядки довжиною 32 байти як команди ([джерело](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)), 
  тож тут є місце для імпровізації:
  - Для основних команд, таких як перемикання, ви можете використовувати "0x0000000000000000000000000000000000000000000000000000000000000001" або "0x00000000000000000000000000000000000000000000000000000000000000000".
  - - Для розширених команд, включаючи json-подібні, ви можете використовувати [IPFS](https://ipfs.tech/) CID у форматі
  [правильний спосіб](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).

</robo-wiki-note>

## 3. Відправити транзакцію

<robo-wiki-picture src="launch/submit.jpg" />

## 4. Перегляньте свій запуск у подіях

Для цього перейдіть до *Network -> Explorer* і знайдіть список подій праворуч. Натисніть піктограму трикутника, щоб розгорнути.

<robo-wiki-picture src="launch/event.jpg" />
