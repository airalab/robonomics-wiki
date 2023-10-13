---
title: Lancement
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Une autre fonctionnalité de base de Robonomics parachain est la palette de lancement. Elle vous permet d'envoyer des commandes aux comptes/entités qui se trouvent derrière eux. Ces commandes comprennent un paramètre pour spécifier la tâche à exécuter.**

<robo-wiki-note type="warning" title="Dev Node">

  Veuillez noter que ce tutoriel et les suivants sont démontrés sur une instance locale de Robonomics Node. Configurez le vôtre avec [ces instructions](/docs/run-dev-node).

</robo-wiki-note>

## 1. Accédez à Developer -> Extrinsics

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. Choisissez launch -> launch dans la liste déroulante des extrinsèques possibles

Choisissez également un compte avec lequel vous souhaitez soumettre l'extrinsèque. Remplissez le champ de l'adresse cible et du paramètre.

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  Launch prend en charge les chaînes de 32 octets en tant que commandes ([source](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  il y a donc de la place pour improviser ici :
  - Pour les commandes de base comme le basculement, vous pouvez utiliser "0x00000000000000000000000000000000000000000000000000000000000000001" ou
  "0x0000000000000000000000000000000000000000000000000000000000000000000".
  - Pour les commandes avancées, notamment de type json, vous pouvez utiliser [IPFS](https://ipfs.tech/) CID formaté dans un
  [de la bonne manière](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).

</robo-wiki-note>

## 3. Soumettre la transaction

<robo-wiki-picture src="launch/submit.jpg" />

## 4. Vérifiez votre lancement dans les événements

Pour cela, accédez à *Network -> Explorer* et trouvez une liste d'événements à droite. Cliquez sur une icône de triangle pour l'agrandir.

<robo-wiki-picture src="launch/event.jpg" />
