---
title: Interface Python et Robonomics IO
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Certaines extrinsèques implémentées dans les palettes Robonomics sont difficiles à soumettre depuis l'application Polkadot. De plus, il est 
nécessaire d'interagir avec cette fonctionnalité en utilisant des langages de programmation. Dans ce but, un outil Python simple a été développé
appelé [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). C'est un emballage entretenu par Polkascan
[py-substrate-interface](https://github.com/polkascan/py-substrate-interface). Voici une brève description de ce package
et quelques liens et exemples utiles. De plus, les outils CLI sont discutés.**

## robonomics-interface

Disponible sur [PyPi](https://pypi.org/project/robonomics-interface/), le package est prêt à être téléchargé et installé.
Une documentation détaillée générée par docstring est également disponible.

En fin de compte, il s'agit d'un outil destiné aux développeurs souhaitant interagir avec la blockchain Robonomics via des outils de programmation. Presque 
tous les projets Python de l'équipe Robonomics qui interagissent avec la parachain utilisent cette interface.

### Installation

Le processus d'installation nécessite que l'utilisateur ait au moins Python 3.8 installé. Ni `x86`, ni `arm7`, ni `arm8`
architectures ne nécessitent de processus de compilation. Toutes les roues sont construites et publiées par les mainteneurs des dépendances.

`pip` est utilisé comme outil d'installation :

```bash
$ pip3 install robonomics_interface
```

### Utilisation d'exemple

L'idée principale est de créer une instance `Account` puis de l'utiliser pour créer des instances dédiées aux palettes.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  Il est également possible d'utiliser des points de terminaison personnalisés (par exemple, un nœud local pour les tests) :

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

Il est également possible de soumettre des extrinsèques :

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  Comme mentionné précédemment, plus d'exemples sont disponibles sur la page de la [documentation](https://multi-agent-io.github.io/robonomics-interface/).

</robo-wiki-note>

## CLI tool

`robonomics-interface` contient également des outils CLI Python `click` à utiliser pour des fins de prototypage et de tests rapides. Il est installé
avec le package et disponible dans le Terminal :

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

Vous pouvez essayer de l'utiliser avec un nœud local. La philosophie de pipeline est adoptée :

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```