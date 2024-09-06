---
title: Configuration de l'intégration de Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Intégration Robonomics Home Assistant 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Dans cet article, vous allez ajouter Robonomics à Home Assistant. Cela permet à Home Assistant d'enregistrer des journaux de données avec des données chiffrées sur Robonomics Parachain et d'écouter les commandes de lancement du parachain pour contrôler les appareils intelligents. L'intégration utilise IPFS pour stocker les données et envoyer les hachages IPFS aux fonctions de journalisation ou de lancement.**

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Dans l'interface web de Home Assistant, allez dans `Paramètres` -> `Appareils et services` et appuyez sur `AJOUTER UNE INTÉGRATION`. Recherchez `Robonomics`.

2. Cliquez sur Robonomics et remplissez la configuration :

- Ajoutez la graine du compte `SUB_CONTROLLER` au compte du contrôleur.
- Ajoutez l'adresse publique du compte `SUB_OWNER` au propriétaire de l'abonnement.
- Définissez l'intervalle d'envoi des données (par défaut, il est de 10 minutes).
- (Facultatif) Vous pouvez ajouter des identifiants pour le service de mise en mémoire tampon Pinata ou un autre portail personnalisé pour diffuser vos données plus largement sur le réseau IPFS.

{% roboWikiNote {title:"Remarque", type: "Note"}%} Dans la section [Configuration de Pinata](/docs/pinata-setup), vous trouverez des informations plus détaillées sur l'utilisation de Pinata.{% endroboWikiNote %}

3. Appuyez sur `SOUMETTRE` après avoir terminé la configuration. Si vous avez tout rempli correctement, vous verrez la fenêtre de succès.

C'est tout ! Vous avez entièrement configuré l'intégration de Robonomics dans Home Assistant. Maintenant, vous pouvez utiliser tous les services Web Robonomics. Pour en savoir plus à leur sujet, rendez-vous dans la section ["Utilisation"](docs/add-user).