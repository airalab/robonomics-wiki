---
title: Comment envoyer un lancement avec abonnement

contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"Parachain", type: "warning"}%}Faites attention, ce tutoriel montre comment utiliser un abonnement sur la parachain Robonomics Kusama. Vous pouvez également effectuer les mêmes étapes sur votre [nœud local](/docs/run-dev-node). {% endroboWikiNote %}


Si votre adresse a un abonnement actif, alors tous les appareils configurés avec le secret de ce compte peuvent envoyer des extrinsèques sans frais.
Essayons d'envoyer la commande `lancement`.

Allez sur la page `Développeur/Extrinsèques`, puis choisissez votre compte (celui de la liste des appareils) et sélectionnez `rws -> call(subscriptionId, call)`.
Ensuite, dans le champ `subscriptionId`, collez l'adresse du propriétaire de l'abonnement (celui qui a remporté l'enchère) et dans le champ suivant
choisissez `lancement -> lancement(robot, param)`. Dans le champ `robot`, saisissez l'adresse à laquelle vous souhaitez envoyer la transaction `lancement`
et insérez la commande (pour une description de la commande de lancement, consultez [ici](/docs/launch)). Ensuite, soumettez la transaction :

{% roboWikiPicture {src:"docs/rws/launch.png", alt:"lancement"} %}{% endroboWikiPicture %}


Maintenant, allez sur la page `Réseau/Explorateur`, et dans la zone `Événements récents`, vous verrez deux événements que vous avez créés : `rws.NewCall` et `lancement.NewLaunch`

{% roboWikiPicture {src:"docs/rws/events.png", alt:"événements"} %}{% endroboWikiPicture %}