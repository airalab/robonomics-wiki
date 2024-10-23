---
title: À propos de l'enveloppe Robonomics ROS 2
contributors: [Fingerling42]
outils:   
  - Ubuntu 22.04.4
    https://releases.ubuntu.com/jammy/
  - ROS 2 Humble
    https://docs.ros.org/en/humble/Installation.html
  - IPFS Kubo 0.26.0
    https://docs.ipfs.tech/install/command-line/
  - Python 3.10.12
    https://www.python.org/downloads/
---

**Dans cet article, vous découvrirez le package Robonomics ROS 2 Wrapper, qui vous permet d'utiliser toutes les fonctionnalités de la parachain Robonomics pour n'importe quel robot compatible avec ROS 2.**

L'idée du package est d'envelopper l'API de la parachain Robonomics fournie par [robonomics-interface](https://github.com/airalab/robonomics-interface) dans des nœuds de ROS 2. L'objectif est de fournir aux développeurs ROS 2 un moyen pratique d'intégrer leurs robots ou appareils avec les fonctionnalités de la parachain. La logique derrière l'intégration d'un appareil robotique est qu'une adresse unique est créée pour lui dans la parachain Robonomics, qui est utilisée pour contrôler l'appareil ou recevoir sa télémétrie.

Les fonctionnalités disponibles incluent :

* **Fonction de lancement** — lancer un appareil pour exécuter n'importe quelle commande avec un ensemble spécifié de paramètres transmis sous forme de chaîne ou de fichier.
* **Fonction de journalisation** — publier des données de l'appareiltélémétrie sous forme de hachage vers la parachain.
* **Utilisation de l'abonnement Robonomics** — la capacité d'envoyer des transactions sans frais.
* **Stockage sécurisé de fichiers** — pour emballer et déballer des données, on utilise le [Système de Fichiers InterPlanétaire](https://ipfs.tech/), qui permet d'accéder aux fichiers par leur hachage unique. Pour une utilisation pratique d'IPFS, le support [Pinata](https://www.pinata.cloud/) est inclus, ce qui permet d'épingler des fichiers IPFS pour un téléchargement rapide.
* **Chiffrement et déchiffrement de fichiers** — protection des fichiers avec un chiffrement à clé publique.

Actuellement, l'enveloppe est disponible dans [l'implémentation Python](https://github.com/airalab/robonomics-ros2/).

## Architecture de l'Enveloppe

Architecturalement, l'enveloppe se compose d'un nœud travailleur (avec les sujets et services nécessaires) et d'une classe de nœud de base qui peut être utilisée pour vos robots spécifiques.

{% roboWikiPicture {src:"docs/robotics/robonomics-ros2-wrapper.png", alt:"Architecture de l'Enveloppe ROS 2"} %}{% endroboWikiPicture %}

* `robonomics_ros2_pubsub` — un nœud unique pour chaque robot qui sert de point d'entrée vers Web3. Il enveloppe les services pour l'envoi de journaux de données et la réception de lancements via Robonomics et permet de télécharger/téléverser des fichiers vers IPFS. Ce nœud est configuré par un fichier spécial, qui est décrit ci-dessous. L'affiliation d'un nœud à un robot spécifique peut êtrespécifié via l'espace de noms ROS.
* `robonomics_ros2_robot_handler` — un nœud spécifique au robot basé sur une classe de base `basic_robonomics_handler` pour coordonner la publication/abonnement et le robot. Il traite les lancements et décide quand envoyer des journaux de données pour contrôler le robot.

## Installation de l'enveloppe

Pour travailler avec l wrapper, vous avez besoin des logiciels suivants :

* Distribution du système d'exploitation Linux (généralement, Ubuntu)
* Distribution ROS 2
* Nœud IPFS
* Python 3 (pour l'implémentation Python de l'enveloppe)

Veuillez suivre le guide d'installation disponible [ici](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#getting-started) et vérifier les versions nécessaires des logiciels. Après avoir téléchargé les composants requis, vous devrez [construire](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#installation-and-building) l'enveloppe en tant que package ROS 2 habituel en utilisant l'utilitaire `colcon`.

## Configuration des connexions au cloud Web3

Avant de démarrer l'enveloppe, vous devez configurer comment votre robot se connectera au cloud Robonomics décentralisé et aux services Web3 de support. Pour ce faire, vous devez modifier le fichier d'une configuration appelé `robonomics_pubsub_params_template.yaml`, qui doit être unique pour chaque robot lancé qui doit accéder à Robonomics.

Le fichier contient les champs de configuration suivants :

| Champ                 | Description                                                                                                |
|-----------------------|------------------------------------------------------------------------------------------------------------|
| account_seed          | Graine de compte de la parachain Robonomics                                                                |
| crypto_type           | Type de votre compte, `ED25519` ou `SR25519`                                                               |
| remote_node_url       | URL du nœud Robonomics, par défaut `wss://kusama.rpc.robonomics.network`, pour un nœud local `ws://127.0.0.1:9944`|
| rws_owner_address     | Adresse du propriétaire de l'abonnement Robonomics à utiliser pour le module RWS                           |
| ipfs_dir_path         | Chemin du répertoire contenant les fichiers IPFS                                                          |
| ipfs_gateway          | Passerelle IPFS pour télécharger des fichiers, par exemple `https://ipfs.io`                               |
| pinata_api_key        | Clé API de [Pinata](https://www.pinata.cloud/) pour le service de mise en cache IPFS                       |
| pinata_api_secret_key | Clé API secrète de [Pinata](https://www.pinata.cloud/) pour le service de mise en cache IPFS              |

Pour créer un compte sur la parachain Robonomics, veuillez suivre [le guide suivant](https://wiki.robonomics.network/docs/create-account-in-dapp/) sur notre wiki. Veuillez faire attention au type de compte que vous créez, car les comptes de type SR25519 ne peuvent pas utiliser le chiffrement de fichiers.

{% roboWikiNote {type: "warning", title: "Avertissement"}%}

  La phrase de récupération est une information sensible qui permet à quiconque deUtilisez votre compte. Assurez-vous de ne pas télécharger de fichier de configuration avec sur GitHub ou ailleurs.
{% endroboWikiNote %}

Faites attention au champ `remote_node_url`, car il vous permet de choisir comment vous connecter exactement à la parachain Robonomics, y compris localement. Vous pouvez déployer votre instance Robonomics locale pour les tests et le développement. Les instructions sur la façon de le faire sont disponibles dans [cet article](https://wiki.robonomics.network/docs/run-dev-node/) sur notre wiki.

Si vous avez un abonnement Robonomics qui vous permet d'envoyer des transactions sans frais, veuillez insérer l'adresse du propriétaire de l'abonnement dans le champ `rws_owner_address`. N'oubliez pas que votre compte doit être ajouté à votre abonnement. Les instructions sur la façon d'activer votre abonnement Robonomics sont disponibles dans deux guides : via [l'application Robonomics](https://wiki.robonomics.network/docs/sub-activate/) avec une interface conviviale ou via [le portail Robonomics Substrate](https://wiki.robonomics.network/docs/get-subscription/).

Le paramètre `ipfs_gateway` vous permet de spécifier la passerelle par laquelle les fichiers IPFS seront téléchargés. Il peut s'agir de [passerelles publiques](https://ipfs.github.io/public-gateway-checker/) ou de passerelles privées spécialisées (par exemple, celles obtenues sur Pinata)