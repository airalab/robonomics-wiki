---
title: Configuration de l'intégration Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Intégration Robonomics Home Assistant 1.8.6
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Dans cet article, vous allez ajouter Robonomics à Home Assistant. Cela permet à Home Assistant d'enregistrer des journaux de données avec des données chiffrées sur Robonomics Parachain et d'écouter les commandes de lancement du parachain pour contrôler les appareils intelligents. L'intégration utilise IPFS pour stocker les données et envoyer les hachages IPFS aux fonctions de journalisation ou de lancement.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: "configuration de l'intégration"}%} {% endroboWikiPicture %}

Tout d'abord, vous devez créer une configuration pour votre tableau de bord. Pour cela, ouvrez votre tableau de bord Home Assistant et dans le coin supérieur droit, appuyez sur le bouton "Modifier le tableau de bord" (un crayon).
Dans la fenêtre contextuelle ouverte, cliquez sur l'icône des trois points et sélectionnez le bouton "Prendre le contrôle" :

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: "configuration de l'intégration"} %} {% endroboWikiPicture %}

Appuyez une fois de plus sur "Prendre le contrôle" :

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: "configuration de l'intégration"}%} {% endroboWikiPicture %}

Maintenant, vous pouvez installer l'intégration Robonomics. Pour ce faire, suivez ces étapes :

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Dans l'interface web de Home Assistant, allez dans `Paramètres` -> `Appareils et services` et appuyez sur `AJOUTER UNE INTÉGRATION`. Recherchez `Robonomics`.

2. Cliquez sur Robonomics et remplissez la configuration :

- Ajoutez la graine du compte `SUB_CONTROLLER` à la graine du compte du contrôleur.
- Ajoutez l'adresse publique du compte `SUB_OWNER` à l'adresse du propriétaire de l'abonnement.
- Définissez l'intervalle d'envoi des données (par défaut, il est de 10 minutes).
- (Facultatif) Vous pouvez ajouter des identifiants pour le service de mise en mémoire tampon Pinata ou un autre portail personnalisé pour diffuser vos données plus largement sur le réseau IPFS.

{% roboWikiNote {title:"Remarque", type: "Note"}%} Dans la section [Configuration de Pinata](/docs/pinata-setup), vous trouverez des informations plus détaillées sur l'utilisation de Pinata.{% endroboWikiNote %}

3. Appuyez sur `SOUMETTRE` après avoir terminé la configuration. Si vous avez tout rempli correctement, vous verrez la fenêtre de succès.

C'est tout ! Vous avez entièrement configuré l'intégration Robonomics dans Home Assistant. Maintenant, vous pouvez utiliser tous les services Web Robonomics. Pour en savoir plus à leur sujet, rendez-vous dans la section ["Utilisation"](/docs/add-user).