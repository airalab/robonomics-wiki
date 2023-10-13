---
title: Python-Schnittstelle und Robonomics IO
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Einige Extrinsiken, die in Robonomics-Paletten implementiert sind, können nicht über die Polkadot-App übermittelt werden. Darüber hinaus besteht 
die Notwendigkeit, mithilfe von Programmiersprachen mit dieser Funktionalität zu interagieren. Zu diesem Zweck wurde ein einfaches Python-Tool entwickelt
namens [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). Es ist ein Wrapper über Polkascan-gepflegt
[py-substrate-interface](https://github.com/polkascan/py-substrate-interface).Nachfolgend finden Sie eine kurze Beschreibung dieses Pakets
und einige nützliche Links und Beispiele. Auch CLI-Tools werden diskutiert.**

## robonomics-interface

Auf [PyPi](https://pypi.org/project/robonomics-interface/) steht ein Paket zum Download und zur Einrichtung bereit.
Es gibt auch eine detaillierte durch Docstring generierte [Dokumentation](https://multi-agent-io.github.io/robonomics-interface/) zur Verfügung.

Alles in allem handelt es sich um ein Werkzeug für Entwickler, die über Programmierungstools mit der Robonomics-Blockchain interagieren möchten. Fast 
alle Python-Projekte des Robonomics-Teams, die mit der Parachain interagieren, verwenden diese Schnittstelle.

### Installieren

Der Installationsprozess erfordert, dass der Benutzer mindestens Python 3.8 installiert hat. Weder `x86`, noch `arm7`, noch `arm8`
Architekturen erfordern einen Kompilierungsprozess. Alle Wheels werden von den Abhängigkeitsverwaltern erstellt und veröffentlicht.

`pip` wird als Installationswerkzeug verwendet:

```bash
$ pip3 install robonomics_interface
```

### Beispielverwendung

Die Hauptidee besteht darin, eine `Account`-Instanz zu erstellen und sie dann zu verwenden, um palettenbezogene Instanzen zu erstellen.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  Es ist auch möglich, benutzerdefinierte Endpunkte zu verwenden (z. B. einen lokalen Knoten zum Testen):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

Extrinsiken können ebenfalls übermittelt werden:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  Wie bereits erwähnt, sind weitere Beispiele auf der [Dokumentationsseite](https://multi-agent-io.github.io/robonomics-interface/) verfügbar.

</robo-wiki-note>

## CLI tool

`robonomics-interface` enthält auch ein Python `click` CLI-Tool, das für Prototyping und schnelle Tests verwendet werden kann. Es wird
mit dem Paket installiert und im Terminal verfügbar:

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

Sie können es mit einem lokalen Knoten ausprobieren. Die Pipeline-Philosophie wird übernommen:

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```