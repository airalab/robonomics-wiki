---
title: Запуск
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Еще одной основной функцией паллета Robonomics является паллет Launch. Он позволяет отправлять команды учетным записям/любым сущностям за ними. Эти команды включают параметр для указания задачи, которую необходимо выполнить.**

{% roboWikiNote {title:"Dev Node", type: "Warning"}%} Обратите внимание, что эти и последующие учебные пособия демонстрируются на локальном экземпляре узла Robonomics. Настройте свой с помощью [этих инструкций](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Перейдите в Разработчик -> Экстранксы

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. Выберите launch -> launch из выпадающего списка возможных экстранксов

Также выберите учетную запись, с которой вы хотите отправить экстранкс. Заполните поле целевого адреса и параметр.

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"launch"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32 байта", type: "note"}%}   Launch поддерживает строки длиной 32 байта в качестве команд ([источник](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  поэтому здесь есть место для творчества:
  - Для базовых команд, например, переключения, вы можете использовать "0x0000000000000000000000000000000000000000000000000000000000000001" или
  "0x0000000000000000000000000000000000000000000000000000000000000000".
  - Для продвинутых команд, включая похожие на JSON, вы можете использовать [IPFS](https://ipfs.tech/) CID в формате,
  [правильным образом](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
{% endroboWikiNote %}

## 3. Отправьте транзакцию

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

## 4. Просмотрите ваш запуск в событиях

Для этого перейдите в *Сеть -> Обозреватель* и найдите список событий справа. Нажмите на значок треугольника, чтобы развернуть.

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"event"} %}{% endroboWikiPicture %}
