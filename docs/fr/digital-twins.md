---
title: Jumeaux numériques
contributors: [nakata5321, PaTara43]

tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---
  
**Imaginez avoir un appareil ou un système compliqué qui comporte plusieurs modules à entretenir et nécessite quelques comptes pour être utilisé. Pour les regrouper tous au même endroit ou pour coder certaines fonctionnalités avec des comptes séparés ou, par exemple, pour définir différentes sources de données pour différents flux d'informations, le module Jumeau numérique doit être utilisé.**

<robo-wiki-note type="warning" title="Dev Node">

  Veuillez noter que ces tutoriels et les suivants sont démontrés sur une instance locale de Robonomics Node. Configurez le vôtre avec [ces instructions](/docs/run-dev-node).

</robo-wiki-note>

## Aperçu théorique
N'importe quel compte peut créer et gérer un Jumeau numérique. Le Jumeau peut être imaginé comme une sorte de tableau avec le contenu suivant:

| DT id  | Topic Name 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Où:
* **DT id** est un index de Jumeau numérique unique non signé.
* **Topic name** est une donnée hexadécimale `H256` ou ASCII de 32 octets de longueur, identique à [`Lancement`](/docs/launch) paramètre extrinsèque. 
Par exemple: `0x1234....FF` ou `hello.parachain.robonomics.world`.
* **Source** - est une adresse de compte.

<robo-wiki-note type="note" title="Topics">

  Comme discuté précédemment dans l'aperçu de l'extrinsèque de lancement, le `H256` peut être représenté sous la forme d'un CID IPFS encodé (voir
  [outil Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) pour cela).
  Par conséquent, les sujets peuvent également être utilisés comme un stockage de données, par exemple, une description de module d'un Jumeau.

</robo-wiki-note>


## Créer un Jumeau numérique

### 1. Accédez à Developer -> Extrinsics

<robo-wiki-picture src="digital-twin/extrinsics.jpg" />

### 2. Choisissez digitalTwin -> create dans la liste déroulante des extrinsèques possibles

<robo-wiki-picture src="digital-twin/twin-create.jpg" />

Soumettez la transaction. Ici, aucun paramètre n'est nécessaire pour créer un Jumeau. Il se verra attribuer un index et seul le propriétaire du Jumeau numérique pourra désormais ajouter/modifier les sujets du Jumeau.

L'ID du Jumeau peut être trouvé sur la page d'aperçu de l'explorateur.

<robo-wiki-picture src="digital-twin/create-log.jpg" />

## Ajouter un sujet

### Choisissez digitalTwin -> setSource dans la liste déroulante des extrinsèques possibles

<robo-wiki-picture src="digital-twin/set-topic.jpg" />

* `id` - Digital Twin ID, qui a été obtenu sur la page Explorer.
* `topic` - nom du sujet `H256` précédemment discuté. Dans cette image, il s'agit d'une chaîne de 32 symboles.
* `source` - adresse du compte à associer au sujet.

<robo-wiki-note type="note" title="Overwrite">

  Notez que le sujet peut être écrasé par une autre adresse source si nécessaire.

</robo-wiki-note>

Signez et soumettez l'extrinsèque.

## Explore

Vous pouvez trouver toutes les informations sur les Jumeaux numériques existants dans le module de stockage `Developer -> Chain state` `digitalTwin`.

- Nombre total de Jumeaux - `total()`;
- Propriétaire du Jumeau numérique - `owner(u32)`;
- Informations sur les sujets d'un Jumeau numérique - `digitalTwin(u32)`.

<robo-wiki-picture src="digital-twin/chain-state.jpg" />