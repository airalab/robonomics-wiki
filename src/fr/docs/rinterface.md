---
title: Interface Python et Robonomics IO
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Certains extrinsèques implémentés dans les palettes Robonomics sont difficiles à soumettre depuis l'application Polkadot. De plus, il est nécessaire d'interagir avec cette fonctionnalité en utilisant des langages de programmation. Dans ce but, un outil Python simple a été développé appelé [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). C'est un wrapper sur [py-substrate-interface](https://github.com/polkascan/py-substrate-interface) maintenu par polkascan. Ci-dessous se trouve une brève description de ce package ainsi que quelques liens et exemples utiles. Les outils CLI sont également discutés.**

## robonomics-interface

Disponible sur le [package PyPi](https://pypi.org/project/robonomics-interface/), le package est prêt à être téléchargé et installé.
Une [documentation](https://multi-agent-io.github.io/robonomics-interface/) détaillée générée par docstring est également disponible.

Dans l'ensemble, il s'agit d'un outil pour les développeurs qui souhaitent interagir avec la blockchain Robonomics via des outils de programmation. Presque tous les projets Python de l'équipe Robonomics qui interagissent avec la parachain utilisent cette interface.

### Installation

Le processus d'installation nécessite que l'utilisateur ait au moins Python 3.8 installé. Aucune des architectures `x86`, `arm7`, ou `arm8` ne nécessite de processus de compilation. Toutes les roues sont construites et publiées par les mainteneurs des dépendances.

`pip` est utilisé comme outil d'installation :

```bash
$ pip3 install robonomics_interface
```

### Utilisation d'exemple

L'idée principale est de créer une instance `Account` et ensuite l'utiliser pour créer des instances dédiées aux palettes.

```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

{% roboWikiNote {title:"Nœud local", type: "note"}%}
  Il est également possible d'utiliser des points de terminaison personnalisés (par exemple, un nœud local pour les tests) :

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```
{% endroboWikiNote %}

Les extrinsèques peuvent également être soumis :

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="un deux trois quatre cinq six sept huit neuf dix onze douze")
datalog_ = Datalog(account)
datalog_.record("Bonjour, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # ceci est un hash extrinsèque
```

{% roboWikiNote {title:"Docs", type: "note"}%}Comme mentionné précédemment, plus d'exemples sont disponibles sur la page de [documentation](https://multi-agent-io.github.io/robonomics-interface/). {% endroboWikiNote %}

## Outil CLI

`robonomics-interface` contient également des outils CLI Python `click` à utiliser pour des prototypages et des tests rapides. Il est installé avec le package et disponible dans le Terminal :

```bash
$ robomomics_interface --help

#Usage: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Options:
#  --help  Afficher ce message et quitter.
#
#Commands:
#  read   S'abonner aux événements datalog/launch dans la chaîne
#  write  Envoyer divers extrinsèques (commandes de lancement ou enregistrement de datalogs)
```

Vous pouvez essayer de l'utiliser avec un nœud local. La philosophie de pipeline est adoptée :

```bash
$ echo "Bonjour, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # ceci est un hash extrinsèque
```