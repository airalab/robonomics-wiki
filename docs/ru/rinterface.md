---
title: Python-интерфейс и Robonomics IO
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Некоторые экстрансики, реализованные в палетах Robonomics, сложно отправить из приложения Polkadot. Более того, есть 
необходимость взаимодействия с этой функциональностью с использованием языков программирования. Для этой цели был разработан простой инструмент на Python
называемый [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). Это обертка над поддерживаемым polkascan 
[py-substrate-interface](https://github.com/polkascan/py-substrate-interface). Ниже приведено краткое описание этого пакета
и некоторые полезные ссылки и примеры. Также обсуждаются инструменты командной строки.**

## robonomics-interface

Доступно на [PyPi](https://pypi.org/project/robonomics-interface/) готовый пакет для загрузки и установки.
Также имеется подробная сгенерированная из docstring [документация](https://multi-agent-io.github.io/robonomics-interface/).

В целом, это инструмент для разработчиков, которые хотят взаимодействовать с блокчейном Robonomics с помощью программных инструментов. Почти 
все проекты на Python команды Robonomics, которые взаимодействуют с парачейном, используют этот интерфейс.

### Установка

Процесс установки требует наличия у пользователя установленного Python 3.8 или выше. Ни `x86`, ни `arm7`, ни `arm8`
архитектуры не требуют процесса компиляции. Все пакеты собраны и опубликованы разработчиками зависимостей.

В качестве инструмента установки используется `pip`:

```bash
$ pip3 install robonomics_interface
```

### Пример использования

Основная идея заключается в создании экземпляра `Account` и использовании его для создания экземпляров, связанных с палетами.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  Также возможно использование пользовательских конечных точек (например, локального узла для тестирования):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

Также возможно отправлять экстрансики:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  Как уже было сказано, больше примеров доступно на странице [документации](https://multi-agent-io.github.io/robonomics-interface/).

</robo-wiki-note>

## Инструмент командной строки

`robonomics-interface` также содержит инструменты командной строки Python `click`, которые можно использовать для прототипирования и быстрых тестов. Он устанавливается
вместе с пакетом и доступен в терминале:

```bash
$ robomomics_interface --help

#Usage: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Options:
#  --help  Show this message and exit.
#
#Commands:
#  read   Subscribe to datalog/launch events in the chain
#  write  Send various extrinsics (launch commands or record datalogs)
```

Вы можете попробовать использовать его с локальным узлом. Принят философия конвейера.

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```