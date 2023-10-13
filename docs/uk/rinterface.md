---
title: Python інтерфейс та Robonomics IO
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Деякі екстрикси, реалізовані в палетах Robonomics, важко подати з додатка Polkadot. Більше того, є 
потреба взаємодіяти з цим функціоналом за допомогою мов програмування. Для цієї цілі було розроблено простий інструмент на Python
під назвою [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). Це обгортка, яка підтримується polkascan
[py-substrate-interface](https://github.com/polkascan/py-substrate-interface). Нижче наведено короткий опис цього пакету
та кілька корисних посилань і прикладів. Також обговорюються інструменти командного рядка.**

## robonomics-interface

Доступний на [PyPi](https://pypi.org/project/robonomics-interface/) пакет готовий до завантаження та налаштування.
Існує детальна згенерована з docstring [документація](https://multi-agent-io.github.io/robonomics-interface/).

В цілому, це інструмент для розробників, які бажають взаємодіяти з блокчейном Robonomics за допомогою програмних інструментів. Майже 
всі проекти на Python команди Robonomics, які взаємодіють з паралельним ланцюжком, використовують цей інтерфейс.

### Установка

Процес установки вимагає наявності у користувача Python 3.8 або вищ. Ні `x86`, ні `arm7`, ні `arm8`
архітектури не потребують процесу компіляції. Усі пакети залежностей побудовані та опубліковані розробниками залежностей.

`pip` використовується як інструмент установки:

```bash
$ pip3 install robonomics_interface
```

### Приклад використання

Основна ідея полягає в створенні екземпляру `Account`, а потім використанні його для створення екземплярів, присвячених палетам.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  Також можливо використовувати власні кінцеві точки (наприклад, локальний вузол для тестування):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

Також можливо подати екстрикси:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  Як вже було сказано, більше прикладів доступно на сторінці [документації](https://multi-agent-io.github.io/robonomics-interface/).

</robo-wiki-note>

## CLI tool

`robonomics-interface` також містить інструменти командного рядка Python `click`, які можна використовувати для прототипування та швидких тестів. Вони встановлюються
разом з пакетом і доступні в терміналі:

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

Ви можете спробувати використовувати його з локальним вузлом. Використовується філософія конвеєра.

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```