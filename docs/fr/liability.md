---
title: Responsabilité
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Pour transformer les robots en agents économiques, il faut un outil de contrat pour cela. Découvrez Responsabilité - Robonomics pallet qui met en œuvre des contrats entre les comptes parachain!**

<robo-wiki-note type="warning" title="Dev Node">

  Veuillez noter que ce tutoriel est présenté sur une instance locale de Robonomics Node. Configurez la vôtre avec [ces instructions](/docs/run-dev-node).

</robo-wiki-note>

## Aperçu de la théorie

Sur Ethereum, il y avait une structure assez compliquée d'interaction de responsabilité. Vous pouvez vous familiariser avec celle-ci [ici](/docs/robonomics-how-it-works). De nos jours, les choses sont un peu plus faciles avec Kusama!

### Négociations

Pour signer un contrat, les deux parties doivent d’abord négocier. Cela peut être effectué de plusieurs manières, notamment [IPFS PubSub](https://blog.ipfs.tech/25-pubsub/) ou Robonomics PubSub. Un exemple de code Python utilisant Robonomics PubSub est
présenté [ici](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

L'offre et la demande sont des messages contenant deux caractéristiques principales d'un contrat: **description du travail** et **prix**. Le format du message doit être conçu par l'utilisateur pour chaque application spécifique. Il n'est pas si important dans le processus de négociation de suivre une règle de format strict. Le flux possible est présenté dans l'image ci-dessous.

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  Notez que PubSub est un protocole ouvert, donc aucune donnée sensible ne doit être transférée. Pour cela, vous devez utiliser d'autres protocoles.

</robo-wiki-note>


### Signatures

Une fois les négociations terminées avec succès, chaque partie doit signer son soi-disant accord appelé signature. C'est un
message contenant la description du poste et le prix **dans un format spécifique** signé avec une clé privée du compte. Il y a un
[Outil Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) pour cela également.
 - La description du travail est appelée **technics**. Il s'agit d'une chaîne de 32 octets de longueur similaire à un lancement qui peut être un CID IPFS encodé.
 - Le prix est appelé **économie**. Il s'agit d'un décimal XRT - Weiner. 1 Weiner = 10**-9 XRT.

<robo-wiki-note type="note" title="32 bytes">

  On peut obtenir un [CID IPFS](https://ipfs.tech/) formaté de manière appropriée avec la [bibliothèque Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
  Lors de l'utilisation de la fonction `sign_liability`, il n'est pas nécessaire de transformer le hachage, cela se fera automatiquement.

</robo-wiki-note>

En suivant l'exemple du café:

1. La tâche est un JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. Son CID IPFS est `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Donc les **techniques** (CID transformé) sont `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9` 
4. **L'économie** est `1,5 XRT`.

Une fois signé, il est temps de créer une responsabilité! Cela peut être fait par l'une des parties (soit le promettant, soit le promettant) ou par un compte tiers d'un fournisseur.

## Créer une responsabilité

### Préparatifs

Comme cela a été mentionné précédemment, au moins deux parties sont impliquées dans le processus. Pour cet exemple, utilisons trois parties et créons un fournisseur séparé pour cela. Supposons que les négociations aient déjà eu lieu d'une manière ou d'une autre.

### 1. Créez trois comptes et ajoutez des fonds à ceux-ci

<robo-wiki-picture src="liability/balances.jpg" />

Ici, nous avons fourni au fournisseur 100 XRT pour signer les extrinsèques de responsabilité, le promettant a reçu 2 XRT pour payer le travail.
Le promettant n'a reçu aucun fonds (à l'exception d'un dépôt existentiel d'au moins 1 mXRT).

### 1. Accédez à Developer -> Extrinsics

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. Choisissez la liability -> create-la dans la liste déroulante des extrinsèques possibles

Choisissez également le compte avec lequel vous souhaitez soumettre l'extrinsèque. Remplissez tous les paramètres.

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="Signatures">

  Étant donné que le fournisseur est utilisé ici, il n'est pas nécessaire de connaître les graines des participants. Seules leurs signatures sont nécessaires.

</robo-wiki-note>

### 3. Soumettez la transaction

<robo-wiki-picture src="liability/submit.jpg" />

### 4. Examinez votre responsabilité dans les événements

Pour cela, accédez à `Network -> Explorer` et trouvez une liste d'événements à droite. Cliquez sur une icône de triangle pour l'agrandir.

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  Le hachage peut être transformé en un CID IPFS avec le même [outil Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).

</robo-wiki-note>

### 5. Exploration du stockage

Vous pouvez également explorer certaines caractéristiques des responsabilités dans le module de stockage `liability`.

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  La fonction de stockage `Next Index` montre le dernier index de responsabilité +1, donc même si c'est `1`, la responsabilité `0` est explorée.

</robo-wiki-note>

## Rapports

Imaginez qu'un café a été préparé et que la machine à café doit le signaler d'une manière ou d'une autre. C'est là que les rapports de responsabilité entrent en jeu. En tant que preuve de travail, le compte ajoute un autre CID IPFS en tant que contenu du rapport lors de la finalisation de la responsabilité existante. Cela nécessite à nouveau une signature du promettant.

<robo-wiki-note type="note" title="Report signature">

  Le message signé contient l'indice de responsabilité existant et l'identifiant IPFS du rapport encodé en représentation de 32 octets. Une fois de plus, l'outil Python peut aider à signer le rapport.

</robo-wiki-note>

En restant avec l'exemple de la machine à café:

1. Le rapport est un JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. Son identifiant IPFS est `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Ainsi, la **charge utile** (CID transformé) est `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2` 
4. **L'indice** est `0`, c'est l'indice de responsabilité existant.

### 1. Accédez aux extrinsics, liability -> finalize(report)

Fill in the parameters and submit extrinsic. Again, this may be done by a 3rd-party account. 

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  Faites attention à ce que le compte prometteur ne soit pas "mort" - il doit avoir un dépôt existentiel d'au moins 1 mXRT.

</robo-wiki-note>

Signez et soumettez le rapport. Une fois terminé, vous pouvez l'explorer dans les événements.

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. Explorer les rapports

Vous pouvez également observer le rapport dans le stockage. Allez à `Developer -> Storage` et choisissez `liability` dans la liste déroulante.

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. Vérifier les soldes

Sur l'image, il est montré que le prometteur a maintenant reçu le "salaire". La relation économique s'est produite!

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Verifying">

  Pour l'instant, il n'y a aucun moyen de vérifier si le travail est terminé, donc dès que le prometteur fait un rapport, les jetons sont transférés sur son compte. 
  La fonction de vérification sera ajoutée à l'avenir.

</robo-wiki-note>