---
title: Jumeaux Numériques
contributors: [nakata5321, PaTara43]

outils:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Imaginez avoir un appareil ou un système complexe qui comporte plusieurs modules à entretenir et nécessite quelques comptes pour être utilisé. Pour regrouper tous ces éléments en un seul endroit, ou pour encoder certaines fonctionnalités avec des comptes séparés, ou encore pour définir différentes sources de données pour différents flux d'informations, le module Jumeaux Numériques est utilisé.**

{% roboWikiNote {title:"Nœud de Développement", type: "warning"}%} Veuillez noter que ces tutoriels et les suivants sont démontrés sur une instance locale de Robonomics Node. Configurez le vôtre avec [ces instructions](/docs/run-dev-node).
{% endroboWikiNote %}

## Aperçu théorique
N'importe quel compte peut créer et gérer un Jumeau Numérique. Le Jumeau peut être imaginé comme une sorte de tableau avec les contenus suivants :

| ID Jumeau  | Nom du Sujet 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Où :
* **ID Jumeau** est un index de Jumeau Numérique unique en tant qu'entier non signé.
* **Nom du Sujet** est une donnée hexadécimale `H256` ou ASCII de 32 octets de longueur, identique au paramètre extrinsèque [`Launch`](/docs/launch).
Par exemple : `0x1234....FF` ou  `hello.parachain.robonomics.world`.
* **Source** - est une adresse de compte.

{% roboWikiNote {title:"Sujets", type: "note"}%} Comme discuté précédemment dans l'aperçu de l'extrinsèque de Lancement, le `H256` peut être représenté comme un CID IPFS encodé (voir [outil Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) pour cela).
Par conséquent, les sujets peuvent également être utilisés comme un stockage de données, par exemple, une description de module d'un Jumeau. {% endroboWikiNote %}


## Créer un Jumeau Numérique

### 1. Accédez à Développeur -> Extrinsèques

{% roboWikiPicture {src:"docs/digital-twin/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. Choisissez digitalTwin -> create dans la liste déroulante des extrinsèques possibles

{% roboWikiPicture {src:"docs/digital-twin/twin-create.jpg", alt:"twin-create"} %}{% endroboWikiPicture %}

Soumettez la transaction. Ici, aucun paramètre n'est nécessaire pour créer un Jumeau. Il se verra attribuer un index et seul le propriétaire du Jumeau Numérique pourra désormais ajouter/modifier les sujets du Jumeau.

L'ID du Jumeau peut être trouvé sur la page d'aperçu de l'Explorateur.

{% roboWikiPicture {src:"docs/digital-twin/create-log.jpg", alt:"create-log"} %}{% endroboWikiPicture %}

## Ajouter un Sujet

### Choisissez digitalTwin -> setSource dans la liste déroulante des extrinsèques possibles

{% roboWikiPicture {src:"docs/digital-twin/set-topic.jpg", alt:"set-topic"} %}{% endroboWikiPicture %}

* `id` - ID du Jumeau Numérique, obtenu sur la page de l'Explorateur.
* `sujet` - nom de sujet `H256` discuté précédemment. Sur cette image, il s'agit d'une chaîne de 32 symboles.
* `source` - adresse de compte à associer au sujet.

{% roboWikiNote {title:"Écraser", type: "note"}%} Notez que le sujet peut être écrasé avec une autre adresse source si nécessaire.{% endroboWikiNote %}

Signez et soumettez l'extrinsèque.

## Explorer

Vous pouvez trouver toutes les informations sur les Jumeaux Numériques existants dans le module de stockage `digitalTwin` de `Développeur -> État de la chaîne`.

- Nombre total de Jumeaux - `total()`;
- Propriétaire du Jumeau Numérique - `owner(u32)`;
- Informations sur les sujets d'un Jumeau Numérique - `digitalTwin(u32)`.

{% roboWikiPicture {src:"docs/digital-twin/chain-state.jpg", alt:"chain-state"} %}{% endroboWikiPicture %}