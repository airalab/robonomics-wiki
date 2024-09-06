---
title: Lancement
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Une autre fonctionnalité de base de la parachain Robonomics est le paquet de lancement. Il vous permet d'envoyer des commandes aux comptes/entités qui les soutiennent. Ces commandes comprennent des paramètres pour spécifier la tâche à exécuter.**

{% roboWikiNote {title:"Nœud de développement", type: "Avertissement"}%} Veuillez noter que ce tutoriel et les suivants sont démontrés sur une instance locale du nœud Robonomics. Configurez le vôtre avec [ces instructions](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Accédez à Développeur -> Extrinsèques

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"extrinsèques"} %}{% endroboWikiPicture %}

## 2. Choisissez lancer -> lancer dans la liste déroulante des extrinsèques possibles

Choisissez également un compte avec lequel vous souhaitez soumettre l'extrinsèque. Remplissez le champ d'adresse cible et de paramètres.

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"lancer"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32 octets", type: "note"}%}   Le lancement prend en charge des chaînes de 32 octets de long en tant que commandes ([source](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  donc il y a de la place pour l'improvisation ici :
  - Pour des commandes de base comme le basculement, vous pouvez utiliser "0x0000000000000000000000000000000000000000000000000000000000000001" ou
  "0x0000000000000000000000000000000000000000000000000000000000000000".
  - Pour des commandes avancées incluant du JSON, vous pouvez utiliser [IPFS](https://ipfs.tech/) CID formaté de manière
  [appropriée](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
{% endroboWikiNote %}

## 3. Soumettre la transaction

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"soumettre"} %}{% endroboWikiPicture %}

## 4. Vérifiez votre lancement dans les événements

Pour cela, accédez à *Réseau -> Explorateur* et trouvez une liste d'événements sur la droite. Cliquez sur une icône de triangle pour développer.

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"événement"} %}{% endroboWikiPicture %}
