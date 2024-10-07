---
title: Запуск
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Ще одна базова функція підпалітки Robonomics - це палітка запуску. Вона дозволяє відправляти команди на рахунки/будь-які сутності за ними. Ці команди включають параметр для вказання завдання, яке має бути виконане.**

{% roboWikiNote {title:"Dev Node", type: "Warning"}%} Будь ласка, зверніть увагу, що ці та наступні посібники демонструються на локальному екземплярі вузла Robonomics. Налаштуйте свій за допомогою [цієї інструкції](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Перейдіть до Розробник -> Екстрансіки

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. Виберіть запуск -> запуск зі списку можливих екстрансіксів

Також виберіть рахунок, на який ви хочете відправити екстрансікс. Заповніть поле цільової адреси та параметрів.

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"launch"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32 байти", type: "note"}%}   Запуск підтримує рядки довжиною 32 байти як команди ([джерело](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  тому тут є місце для імпровізації:
  - Для базових команд, наприклад, перемикання, можна використовувати "0x0000000000000000000000000000000000000000000000000000000000000001" або
  "0x0000000000000000000000000000000000000000000000000000000000000000".
  - Для складних команд, включаючи схожі на json, можна використовувати [IPFS](https://ipfs.tech/) CID у відповідному форматі
  [правильним чином](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
{% endroboWikiNote %}

## 3. Відправити транзакцію

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

## 4. Перегляньте свій запуск у подіях

Для цього перейдіть до *Мережа -> Дослідник* та знайдіть список подій справа. Клацніть на трикутник, щоб розгорнути.

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"event"} %}{% endroboWikiPicture %}
