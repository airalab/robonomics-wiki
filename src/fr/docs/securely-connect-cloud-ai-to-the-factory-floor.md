---
title: Connectez de manière sécurisée l'IA cloud au sol de l'usine
contributors: [vitl2907]
---

Les technologies Robonomics peuvent déjà résoudre les défis auxquels l'Industrie 4.0 est confrontée et sont déjà appliquées à des scénarios réels dans l'environnement industriel.

Un grand nombre d'entreprises d'IA développent des solutions pour optimiser les processus sur le sol de l'usine, permettant aux usines de produire plus à moindre coût. Cependant, la plupart des usines hésitent à connecter leur infrastructure directement au cloud, car cela entraîne des risques potentiels en matière de cybersécurité, pouvant entraîner des pertes de plusieurs millions de dollars voire la perte de vies humaines.

[MerkleBot](https://merklebot.com) a utilisé le [Réseau Robonomics](https://robonomics.network) pour créer une solution permettant aux clients industriels de connecter leur usine à l'IA basée sur le cloud de manière sécurisée.

Cet article est rédigé à la suite d'une expérience que nous avons menée avec [Veracity Protocol](https://www.veracityprotocol.org/) qui utilise des algorithmes pour créer une protection non invasive de tout objet physique basée sur les photographies d'un appareil mobile.

Ce cas d'utilisation montre le processus de numérisation des pièces industrielles à l'aide d'un bras robotique.

[Vidéo de démonstration](https://youtu.be/8AL70LFVX5w)

## Processus étape par étape

### DApp en tant qu'interface utilisateur

{% roboWikiPicture {src:"docs/google-play-store.gif", alt:"/google-play-store"} %}{% endroboWikiPicture %}

DApp agit en tant qu'interface utilisateur pour l'opérateur. Il est utilisé pour demander le lancement du robot afin de collecter les photographies et son but est de permettre une communication sécurisée entre l'environnement de l'usine et l'IA basée sur le cloud.

### Lancement du robot

{% roboWikiPicture {src:"docs/Veracity_Protocol_Transaction.gif", alt:"/Veracity_Protocol_Transaction"} %}{% endroboWikiPicture %}

L'opérateur lance la numérisation robotique en signant la transaction dans la DApp. Cette étape garantit que le processus sur le sol de l'usine ne peut commencer que sur la base de la transaction dans la blockchain publique.

Le robot reçoit une commande de la blockchain via le Réseau Robonomics et commence la numérisation. Les technologies du Réseau Robonomics nous permettent de combler l'écart entre l'objectif commercial et l'opération robotique.

### Collecte de données et envoi à l'IA basée sur le cloud

Dans la DApp, l'opérateur voit la confirmation et le robot commence à numériser les éléments placés sur la table, comme dans ce cas d'utilisation, ou directement sur la ligne de production de l'usine si nécessaire.

{% roboWikiPicture {src:"docs/Veracity_Protocol_Launch.gif", alt:"/Veracity_Protocol_Launch"} %}{% endroboWikiPicture %}

Lorsque le robot collecte les données, il les stocke localement et les rend disponibles à l'IA basée sur le cloud via le protocole IPFS. En cryptant les données et en organisant l'échange de données via une transaction blockchain également, nous pouvons autoriser l'accès à l'IA basée sur le cloud tout en veillant à ce que les données restent sécurisées et en place.

Le mécanisme de sécurité intégré à Robonomics basé sur la sécurité partagée des blockchains publiques permet d'obtenir le niveau de sécurité qui est prohibitif pour la plupart des usines à organiser seules.

### Création de passeport numérique

Lorsque l'IA basée sur le cloud analyse les données, le fichier journal et les recommandations sont enregistrés automatiquement en tant que [Passeport Numérique](https://wiki.robonomics.network/docs/create-digital-identity-run-by-ethereum/). Chaque opération et numérisation peuvent être retracées car l'enregistrement blockchain contient le hachage de tous ces fichiers via le protocole IPFS.

## Commentaires sur le cas d'utilisation

Dans ce cas d'utilisation, le bras industriel Universal Robot UR3 a été utilisé. Mais grâce au support de Robonomics pour ROS, la plupart des principaux manipulateurs industriels peuvent être utilisés et connectés à l'IA basée sur le cloud de manière sécurisée, y compris KUKA, Fanuc et Yaskawa.

Si vous souhaitez en savoir plus sur le déploiement et l'intégration sécurisée d'instruments d'IA basés sur le cloud, veuillez [nous contacter](mailto:v@merklebot.com)