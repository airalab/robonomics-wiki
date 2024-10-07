---
title: Responsabilité
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Pour transformer les robots en agents économiques, il faut un outil de contrat pour cela. Découvrez Responsabilité - la palette Robonomics mettant en œuvre des contrats entre les comptes parachain!**

{% roboWikiNote {title:"Nœud de développement", type: "warning"}%} Veuillez noter que ce tutoriel est démontré sur une instance locale de Robonomics Node. Configurez le vôtre avec [ces instructions](/docs/run-dev-node).
{% endroboWikiNote %}

## Aperçu théorique

Sur Ethereum, il y avait une structure assez compliquée d'interaction de responsabilité. Vous pouvez vous familiariser avec cela
[ici](/docs/robonomics-how-it-works). De nos jours, les choses sont un peu plus simples avec Kusama!

### Négociations

Pour signer un contrat, les deux parties doivent d'abord négocier. Cela peut se faire de plusieurs façons, y compris
[IPFS PubSub ](https://blog.ipfs.tech/25-pubsub/) ou Robonomics PubSub. Un exemple de code Python utilisant Robonomics PubSub est
présenté [ici](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

L'offre et la demande sont des messages contenant deux caractéristiques principales d'un contrat : **description du travail** et **prix**. Le format du message doit être conçu par l'utilisateur pour chaque application spécifique. Il n'est pas si important dans le processus de négociation de suivre
une règle de format stricte. Le flux possible est présenté dans l'image ci-dessous.

{% roboWikiPicture {src:"docs/liability/negotiations.jpg", alt:"négociations"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"PubSub", type: "warning"}%} Notez que PubSub est un protocole ouvert, donc aucune donnée sensible ne doit être transférée. Pour cela, vous devriez utiliser d'autres protocoles.
{% endroboWikiNote %}

### Signatures

Lorsque les négociations sont terminées avec succès, chaque partie doit signer son accord appelé une signature. C'est un
message contenant la description du travail et le prix **dans un format spécifique** signé avec une clé privée du compte. Il existe un
[outil Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) pour cela également.
 - La description du travail est appelée **techniques**. Il s'agit d'une chaîne de 32 octets de longueur semblable à un lancement qui peut être un CID IPFS encodé.
 - Le prix est appelé **économie**. Il s'agit d'un décimal XRT - Weiner. 1 Weiner = 10**-9 XRT.

{% roboWikiNote {title:"32 octets", type: "note"}%} On peut obtenir un CID [IPFS](https://ipfs.tech/) formaté de manière appropriée avec la [bibliothèque Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
Lors de l'utilisation de la fonction `sign_liability`, pas besoin de transformer le hash, cela se fera automatiquement.{% endroboWikiNote %}

Prenons l'exemple du café :

1. La tâche est un JSON
```json
{"task": "make_espresso", "description": "Faire une tasse d'espresso"}
```
2. Son CID IPFS est `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Ainsi, les **techniques** (CID transformé) sont `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`
4. L'**économie** est `1.5 XRT`.

Une fois signé, il est temps de créer une responsabilité ! Cela peut être fait par l'une des parties (soit le promettant ou le promettant) ou par un
compte tiers d'un fournisseur appelé ainsi.

## Créer une responsabilité

### Préparatifs

Comme mentionné précédemment, au moins deux parties sont impliquées dans le processus. Pour cet exemple, utilisons trois et créons
un fournisseur séparé pour cela. Supposons que les négociations aient déjà eu lieu d'une manière ou d'une autre.

### 1. Créer trois comptes et y ajouter des fonds

{% roboWikiPicture {src:"docs/liability/balances.jpg", alt:"soldes"} %}{% endroboWikiPicture %}

Ici, nous avons fourni au fournisseur 100 XRT pour signer les extrinsèques de responsabilité, le promettant a reçu 2 XRT pour payer le travail.
Le promettant n'a reçu aucun fonds (à l'exception d'un dépôt existentiel d'au moins 1 mXRT).

### 1. Accéder à Développeur -> Extrinsèques

{% roboWikiPicture {src:"docs/liability/extrinsics.jpg", alt:"extrinsèques"} %}{% endroboWikiPicture %}

### 2. Choisissez responsabilité -> créer dans la liste déroulante des extrinsèques possibles

Choisissez également le compte avec lequel vous souhaitez soumettre l'extrinsèque. Remplissez tous les paramètres.

{% roboWikiPicture {src:"docs/liability/create.jpg", alt:"créer"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Signatures", type: "note"}%} Comme un fournisseur est utilisé ici, pas besoin de connaître les graines des participants. Seules leurs signatures sont nécessaires.
{% endroboWikiNote %}

### 3. Soumettre la transaction

{% roboWikiPicture {src:"docs/liability/submit.jpg", alt:"soumettre"} %}{% endroboWikiPicture %}

### 4. Examiner votre responsabilité dans les événements

Pour cela, accédez à `Réseau -> Explorateur` et trouvez une liste d'événements sur la droite. Cliquez sur l'icône en forme de triangle pour développer.

{% roboWikiPicture {src:"docs/liability/new-liability.jpg", alt:"nouvelle-responsabilité"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Hash", type: "note"}%} Le hash peut être transformé en un CID IPFS avec le même [outil Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).
{% endroboWikiNote %}

### 5. Exploration du stockage

Vous pouvez également explorer certaines caractéristiques des responsabilités dans le module de stockage `responsabilité`.

{% roboWikiPicture {src:"docs/liability/storage-liability.jpg", alt:"stockage-responsabilité"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Index suivant", type: "note"}%} La fonction de stockage `Index suivant` montre le dernier index de responsabilité +1, donc même si c'est `1`, la responsabilité `0` est explorée.
{% endroboWikiNote %}

## Rapports

Imaginez qu'un café a été préparé et que la machine à café doit maintenant le signaler d'une manière ou d'une autre. C'est là que les rapports de responsabilité
entrent en jeu. Comme preuve de travail, le compte ajoute un autre CID IPFS en tant que contenu du rapport lors de la finalisation de la responsabilité existante. Cela nécessite à nouveau une signature du promettant.

{% roboWikiNote {title:"Signature du rapport", type: "note"}%} Le message signé contient l'index de responsabilité existant et le CID IPFS du rapport encodé en représentation de 32 octets. Une fois de plus, l'[outil Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) peut aider à signer le rapport.
{% endroboWikiNote %}

Poursuivant avec l'exemple de la machine à café :

1. Le rapport est un JSON
```json
{"report": "Café préparé ! Temps d'exécution - 80 secondes."}
```
2. Son CID IPFS est `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Ainsi, la **charge utile** (CID transformé) est `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. L'**Index** est `0`, c'est l'index de responsabilité existant.

### 1. Accéder aux extrinsèques, responsabilité -> finaliser (rapport)

Remplissez les paramètres et soumettez l'extrinsèque. Encore une fois, cela peut être fait par un compte tiers.

{% roboWikiPicture {src:"docs/liability/report.jpg", alt:"rapport"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Dépôt existentiel", type: "warning"}%} Faites attention à ce que le compte promettant ne soit pas "mort" - il doit avoir le dépôt existentiel d'au moins 1 mXRT.
{% endroboWikiNote %}

Signez et soumettez le rapport. Une fois terminé, vous pouvez l'explorer dans les événements.

{% roboWikiPicture {src:"docs/liability/new-report.jpg", alt:"nouveau-rapport"} %}{% endroboWikiPicture %}

### 2. Explorer les rapports

Vous pouvez également observer le rapport dans le stockage. Allez à `Développeur -> Stockage` et choisissez `responsabilité` dans la liste déroulante.

{% roboWikiPicture {src:"docs/liability/storage-report.jpg", alt:"stockage-rapport"} %}{% endroboWikiPicture %}

### 3. Vérifier les soldes

Sur l'image, il est montré que le promettant a maintenant reçu le "salaire". Une relation économique s'est établie !

{% roboWikiPicture {src:"docs/liability/balances-2.jpg", alt:"balances-2"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Vérification", type: "note"}%} Pour l'instant, il n'y a aucun moyen de vérifier si le travail est effectué, donc dès que le promettant le signale, les jetons sont transférés sur son compte.
La fonction de vérification sera ajoutée à l'avenir.
{% endroboWikiNote %}