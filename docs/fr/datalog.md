---
title: Datalogue
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Maintenant que vous avez des fonds sur votre compte, vous pouvez soumettre des extrinsèques. Le premier à essayer est un Datalog. Il vous permet de stocker des données de manière persistante dans la blockchain. Imaginez un stockage distribué et cryptoprotégé pour vos données, et c'est ça !**

<robo-wiki-note type="warning" title="Dev Node">

Veuillez noter que ces tutoriels et les suivants sont démontrés sur une instance locale de Robonomics Node. Configurez le vôtre avec [ces instructions](/docs/run-dev-node).

</robo-wiki-note>

## 1. Accédez à Developer -> Extrinsics

<robo-wiki-picture src="datalog/extrinsics.jpg" />

## 2. Choisissez  datalog -> record  dans la liste déroulante des extrinsèques possibles

Choisissez également un compte avec lequel vous souhaitez soumettre l'extrinsèque. Remplissez le champ d'enregistrement.

<robo-wiki-picture src="datalog/record.jpg" />

<robo-wiki-note type="note" title="Large amount of data">

  Datalogue prend en charge une chaîne de caractères d'un maximum de 512 octets. Pour stocker une grande quantité de données, vous pouvez utiliser [IPFS](https://ipfs.tech/).

</robo-wiki-note>

## 3. Soumettre la transaction

Signez et soumettez la transaction avec un compte créé précédemment à l'aide de l'extension ou de l'application décentralisée.

<robo-wiki-picture src="datalog/submit.jpg" />

<robo-wiki-note type="note" title="Erase">

  Vous pouvez également effacer **TOUTES** vos données avec *datalog -> erase* appel.

</robo-wiki-note>

## 4. Vérifiez votre datalogue dans le stockage

Pour cela, accédez à *Developer -> Chain state*, sélectionnez *datalog -> datalogIndex*, spécifiez votre compte et appuyez sur le 
"+" bouton pour obtenir les index des enregistrements de votre compte, puis explorez celui dont vous avez besoin avec *datalog -> datalogItem*.

<robo-wiki-picture src="datalog/item.jpg" />

<robo-wiki-note type="note" title="Explorerr">

  Tous les événements, y compris l'enregistrement du datalogue, peuvent être consultés dans le flux d'événements de l'*Explorer*.

</robo-wiki-note>