---
title: Configuration de l'intégration Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
outils:
  - Intégration Robonomics Home Assistant 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Dans cet article, vous allez ajouter Robonomics à Home Assistant. Cela permet à Home Assistant d'enregistrer des journaux de données avec des données chiffrées sur Robonomics Parachain et d'écouter les commandes de lancement du parachain pour contrôler les appareils intelligents. L'intégration utilise IPFS pour stocker les données et envoyer les hachages IPFS aux fonctions de journalisation ou de lancement.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

Tout d'abord, vous devez créer une configuration pour votre tableau de bord. Pour cela, ouvrez votre tableau de bord Home Assistant et dans le coin supérieur droit, appuyez sur le bouton "Modifier le tableau de bord" (un crayon).
Dans la fenêtre contextuelle ouverte, cliquez sur l'icône des trois points et sélectionnez le bouton "Prendre le contrôle" :

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

Appuyez une fois de plus sur "Prendre le contrôle" :

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

Maintenant, vous pouvez installer l'intégration Robonomics. Pour ce faire, suivez ces étapes :
 

1. Dans l'interface web de Home Assistant, allez dans `Paramètres` -> `Appareils et services` et appuyez sur `AJOUTER UNE INTÉGRATION`. Recherchez `Robonomics`.

2. Cliquez sur Robonomics, téléchargez votre fichier de configuration (nommé `robonomics.app-settings-<nom-de-l'abonnement>-serveur.json`, où `<nom-de-l'abonnement>` est le nom de votre abonnement), et saisissez le mot de passe du compte `CONTROLLER`. Les instructions sur la création du fichier de configuration peuvent être trouvées [ici](/docs/sub-activate/?topic=smart-home#setup-your-subscription).

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"controller create"} %}{% endroboWikiPicture %}

3. Optionnel : Vous pouvez choisir le réseau à utiliser.

4. Appuyez sur `SOUMETTRE` après avoir terminé la configuration. Si vous avez rempli correctement toutes les informations, vous verrez la fenêtre de succès. 

{% roboWikiNote {type: "okay", title: "" }%} L'installation peut prendre environ 10 à 15 minutes, selon votre connexion internet. {% endroboWikiNote %}

C'est tout ! Vous avez entièrement configuré l'intégration Robonomics dans Home Assistant. Maintenant, vous pouvez utiliser tous les services Web Robonomics. Pour en savoir plus à leur sujet, rendez-vous dans la section ["Utilisation"](/docs/add-user).