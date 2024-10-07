---
title: Datalog
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Maintenant que vous avez des fonds sur votre compte, vous pouvez soumettre des extrinsèques. Le premier à essayer est un Datalog. Il vous permet de stocker des données de manière persistante dans la blockchain. Imaginez un stockage distribué et cryptoprotégé pour vos données, et c'est ça !**

{% roboWikiNote {type: "warning", title: "Nœud de développement"}%}Veuillez noter que ce tutoriel et les suivants sont démontrés sur une instance locale du nœud Robonomics. Configurez le vôtre avec [ces instructions](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Accédez à Développeur -> Extrinsèques

{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. Choisissez datalog -> record dans la liste déroulante des extrinsèques possibles

Choisissez également le compte avec lequel vous souhaitez soumettre l'extrinsèque. Remplissez le champ record.

{% roboWikiPicture {src:"docs/datalog/record.jpg", alt:"record"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Grande quantité de données"}%} Datalog prend en charge une chaîne de caractères d'un maximum de 512 octets. Pour stocker une grande quantité de données, on peut utiliser [IPFS](https://ipfs.tech/).
{% endroboWikiNote %}

## 3. Soumettre la transaction

Signez et soumettez la transaction avec un compte créé précédemment à l'aide de l'extension ou de l'application décentralisée.

{% roboWikiPicture {src:"docs/datalog/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Effacer"}%} Vous pouvez également effacer **TOUTES** vos enregistrements avec l'appel *datalog -> erase*.
{% endroboWikiNote %}

## 4. Vérifiez votre datalog dans le stockage

Pour cela, accédez à *Développeur -> État de la chaîne*, sélectionnez *datalog -> datalogIndex*, spécifiez votre compte et appuyez sur le bouton "+" pour obtenir les index des enregistrements de votre compte, puis explorez celui dont vous avez besoin avec *datalog -> datalogItem*.

{% roboWikiPicture {src:"docs/datalog/item.jpg", alt:"item"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Explorateur"}%} Tous les événements, y compris l'enregistrement datalog, peuvent être consultés dans le flux d'événements de l'*Explorateur*.
{% endroboWikiNote %}