---
title: Запуск
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Еще одна основная функция Robonomics parachain - это паллет Launch. Он позволяет отправлять команды на учетные записи/любые сущности, стоящие за ними. Эти команды включают параметр, определяющий задачу, которую нужно выполнить.**

<robo-wiki-note type="warning" title="Dev Node">

  Обратите внимание, что эти и следующие учебники демонстрируются на локальном экземпляре узла Robonomics. Настройте свой с помощью [этих инструкций](/docs/run-dev-node).

</robo-wiki-note>

## 1. Перейдите в Developer -> Extrinsics

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. Выберите launch -> launch из выпадающего списка возможных экстрансиксов

Также выберите учетную запись, с которой вы хотите отправить экстрансикс. Заполните поле целевого адреса и параметров.

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  Launch поддерживает команды длиной 32 байта в виде строк ([источник](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  поэтому здесь есть место для импровизации:
  - Для базовых команд, таких как переключение, вы можете использовать "0x0000000000000000000000000000000000000000000000000000000000000001" или
  "0x0000000000000000000000000000000000000000000000000000000000000000".
  - Для расширенных команд, включая json-подобные, вы можете использовать [IPFS](https://ipfs.tech/) CID, отформатированный в 
  [правильном формате](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).

</robo-wiki-note>

## 3. Отправьте транзакцию

<robo-wiki-picture src="launch/submit.jpg" />

## 4. Просмотрите свой запуск в событиях

Для этого перейдите в *Сеть -> Проводник* и справа найдите список событий. Нажмите значок треугольника, чтобы развернуть его.

<robo-wiki-picture src="launch/event.jpg" />
