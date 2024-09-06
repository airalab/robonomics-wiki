---
title: Інтерфейс Python та Robonomics IO
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Деякі екструзії, реалізовані в палітрах Robonomics, важко надіслати з додатка Polkadot. Більше того, є потреба взаємодіяти з цією функціональністю за допомогою мов програмування. Для цієї мети було розроблено простий інструмент на Python під назвою [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). Це обгортка над підтримуваною polkascan [py-substrate-interface](https://github.com/polkascan/py-substrate-interface). Нижче наведено короткий опис цього пакету та деякі корисні посилання та приклади. Також розглянуто інструменти командного рядка.**

## robonomics-interface

Доступний на [PyPi](https://pypi.org/project/robonomics-interface/) пакет готовий до завантаження та налаштування.
Також є детальна згенерована з docstring [документація](https://multi-agent-io.github.io/robonomics-interface/).

Загалом, це інструмент для розробників, які бажають взаємодіяти з блокчейном Robonomics за допомогою програмних інструментів. Майже всі проекти на Python команди Robonomics, які взаємодіють з паралелізмом, використовують цей інтерфейс.

### Встановлення

Процес встановлення передбачає, що у користувача вже встановлено принаймні Python 3.8. Ні `x86`, ні `arm7`, ні `arm8`
архітектури не потребують процесу компіляції. Усі колеса побудовані та опубліковані утримувачами залежностей.

Для встановлення використовується `pip`:

```bash
$ pip3 install robonomics_interface
```

### Приклад використання

Основна ідея полягає в створенні екземпляра `Account`, а потім використанні його для створення екземплярів, присвячених палітрам.

```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

{% roboWikiNote {title:"Локальний вузол", type: "note"}%}
  Також можна використовувати власні кінцеві точки (наприклад, локальний вузол для тестування):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```
{% endroboWikiNote %}

Екструзії також можна надіслати:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Привіт, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # це хеш екструзії
```

{% roboWikiNote {title:"Документація", type: "note"}%}Як вже було сказано, більше прикладів доступно на сторінці [документації](https://multi-agent-io.github.io/robonomics-interface/). {% endroboWikiNote %}

## Інструмент командного рядка

`robonomics-interface` також містить інструменти командного рядка Python `click`, які можна використовувати для прототипування та швидких тестів. Він встановлюється
разом з пакетом і доступний у терміналі:

```bash
$ robomomics_interface --help

#Використання: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Опції:
#  --help  Показати це повідомлення та вийти.
#
#Команди:
#  read   Підписатися на події datalog/launch у ланцюжку
#  write  Надіслати різні екструзії (команди запуску або записи журналів даних)
```

Ви можете спробувати використовувати його з локальним вузлом. Прийнята філософія конвеєра:

```bash
$ echo "Привіт, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # це хеш екструзії
```