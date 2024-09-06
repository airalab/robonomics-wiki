---
title: Python-Schnittstelle und Robonomics IO
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Einige Extrinsiken, die in Robonomics-Paletten implementiert sind, sind schwer über die Polkadot-App einzureichen. Darüber hinaus besteht die Notwendigkeit, mit dieser Funktionalität mithilfe von Programmiersprachen zu interagieren. Zu diesem Zweck wurde ein einfaches Python-Tool namens [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface) entwickelt. Es handelt sich um einen Wrapper über das von polkascan gepflegte [py-substrate-interface](https://github.com/polkascan/py-substrate-interface). Im Folgenden finden Sie eine kurze Beschreibung dieses Pakets sowie einige nützliche Links und Beispiele. Auch CLI-Tools werden diskutiert.**

## robonomics-interface

Verfügbar auf [PyPi](https://pypi.org/project/robonomics-interface/) ist das Paket bereit zum Herunterladen und Einrichten.
Es gibt auch eine detaillierte docstring-generierte [Dokumentation](https://multi-agent-io.github.io/robonomics-interface/) verfügbar.

Alles in allem handelt es sich um ein Tool für Entwickler, die über Programmierwerkzeuge mit der Robonomics-Blockchain interagieren möchten. Fast alle Python-Projekte des Robonomics-Teams, die mit der Parachain interagieren, verwenden diese Schnittstelle.

### Installation

Der Installationsprozess erfordert, dass der Benutzer mindestens Python 3.8 installiert hat. Weder `x86`, noch `arm7`, noch `arm8` Architekturen erfordern einen Kompilierungsprozess. Alle Wheels werden von den Abhängigkeitspflegern erstellt und veröffentlicht.

`pip` wird als Installationswerkzeug verwendet:

```bash
$ pip3 install robonomics_interface
```

### Beispielverwendung

Die Hauptidee besteht darin, eine `Account`-Instanz zu erstellen und diese dann zu verwenden, um palettenbezogene Instanzen zu erstellen.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

{% roboWikiNote {title:"Lokaler Knoten", type: "note"}%}
  Es ist auch möglich, benutzerdefinierte Endpunkte zu verwenden (z.B. lokaler Knoten zum Testen):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```
{% endroboWikiNote %}

Extrinsiken können ebenfalls eingereicht werden:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hallo, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # dies ist ein Extrinsik-Hash
```

{% roboWikiNote {title:"Dokumente", type: "note"}%}Wie bereits erwähnt, sind weitere Beispiele auf der [Dokumentationsseite](https://multi-agent-io.github.io/robonomics-interface/) verfügbar. {% endroboWikiNote %}

## CLI-Tool

`robonomics-interface` enthält auch Python `click` CLI-Tools, die für Prototyping- und Schnelltests verwendet werden können. Es wird mit dem Paket installiert und ist im Terminal verfügbar:

```bash
$ robomomics_interface --help

#Verwendung: robonomics_interface [OPTIONEN] BEFEHL [ARGUMENTE]...
#
#Optionen:
#  --help  Diese Nachricht anzeigen und beenden.
#
#Befehle:
#  read   Abonnieren von Datalog-/Startereignissen in der Kette
#  write  Senden verschiedener Extrinsiken (Startbefehle oder Datensätze von Datalogs)
```

Sie können versuchen, es mit einem lokalen Knoten zu verwenden. Die Pipeline-Philosophie wird übernommen:

```bash
$ echo "Hallo, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # dies ist ein Extrinsik-Hash
```