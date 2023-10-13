---
title: Comment envoyer un lancement avec abonnement

contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="warning" title="Parachain">

  Faites attention, ce tutoriel démontre l'utilisation d'un abonnement sur la parachain Robonomics Kusama. Vous pouvez également effectuer toutes les mêmes étapes sur votre [nœud local](/docs/run-dev-node).

</robo-wiki-note>

Si votre adresse dispose d'un abonnement actif, alors tous les appareils configurés avec le secret de ce compte peuvent envoyer des extrinsèques sans frais. 
Essayons d'envoyer la commande `launch`.

Allez sur la page `Developer/Extrinsics`, puis choisissez votre compte (celui de la liste des appareils) et sélectionnez `rws -> call(subscriptionId, call)`.  
Ensuite, dans le champ `subscriptionId`, collez l'adresse du propriétaire de l'abonnement (celui qui a fait une offre lors de l'enchère) et dans le champ suivant, choisissez `launch -> launch(robot, param)`. Dans le champ `robot`, saisissez l'adresse à laquelle vous souhaitez envoyer la transaction `launch` et insérez la commande (pour la description de la commande de lancement, consultez [ici](/docs/launch)). Ensuite, soumettez la transaction:

![launch](../images/rws/launch.png)


Maintenant, allez sur la page `Network/Explorer`, et dans la zone `Recent Events`, vous verrez deux événements que vous avez créés : `rws.NewCall` et `launch.NewLaunch`:

![events](../images/rws/events.png)
