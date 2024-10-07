---
title: Интерфейс Python и Robonomics IO
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Некоторые экстрансики, реализованные в палитрах Robonomics, сложно отправить из приложения Polkadot. Более того, есть необходимость взаимодействовать с этой функциональностью с использованием языков программирования. Для этой цели был разработан простой инструмент на Python под названием [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). Это оболочка над поддерживаемым polkascan [py-substrate-interface](https://github.com/polkascan/py-substrate-interface). Ниже приведено краткое описание этого пакета, а также некоторые полезные ссылки и примеры. Также обсуждаются инструменты командной строки.**

## robonomics-interface

Доступен в пакете [PyPi](https://pypi.org/project/robonomics-interface/) готовый к загрузке и установке.
Также доступна подробная сгенерированная из docstring [документация](https://multi-agent-io.github.io/robonomics-interface/).

В общем, это инструмент для разработчиков, которые хотят взаимодействовать с блокчейном Robonomics с помощью программных инструментов. Почти все проекты на Python команды Robonomics, взаимодействующие с парачейном, используют этот интерфейс.

### Установка

Для установки требуется, чтобы у пользователя был установлен Python 3.8 как минимум. Ни `x86`, ни `arm7`, ни `arm8`
архитектуры не требуют процесса компиляции. Все пакеты уже собраны и опубликованы сопровождающими зависимостями.

Для установки используется `pip`:

```bash
$ pip3 install robonomics_interface
```

### Пример использования

Основная идея заключается в создании экземпляра `Account`, а затем использовании его для создания экземпляров, посвященных палитрам.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

{% roboWikiNote {title:"Локальный узел", type: "note"}%}
  Также можно использовать пользовательские конечные точки (например, локальный узел для тестирования):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```
{% endroboWikiNote %}

Также возможно отправлять экстрансики:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # это хэш экстрансика
```

{% roboWikiNote {title:"Документация", type: "note"}%}Как уже было сказано, больше примеров доступно на странице [документации](https://multi-agent-io.github.io/robonomics-interface/). {% endroboWikiNote %}

## Инструмент командной строки

`robonomics-interface` также содержит инструменты командной строки Python `click`, которые можно использовать для прототипирования и быстрых тестов. Он устанавливается
вместе с пакетом и доступен в терминале:

```bash
$ robomomics_interface --help

#Использование: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Опции:
#  --help  Показать это сообщение и выйти.
#
#Команды:
#  read   Подписаться на события datalog/launch в цепочке
#  write  Отправить различные экстрансики (команды запуска или запись журналов данных)
```

Можно попробовать использовать его с локальным узлом. Принята философия конвейера:

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # это хэш экстрансика
```