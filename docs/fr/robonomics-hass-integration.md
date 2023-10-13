---
title: Configuration de l'intégration Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Dans cet article, vous ajouterez Robonomics à Home Assistant. Cela permet à Home Assistant d'enregistrer des journaux de données avec des données chiffrées sur Robonomics Parachain et d'écouter les commandes de lancement du parachain pour contrôler les appareils intelligents. L'intégration utilise IPFS pour stocker les données et envoyer des hachages IPFS aux fonctions de journalisation ou de lancement.**

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. Dans l'interface web de Home Assistant, allez dans `Settings` -> `Device & Services`  et cliquez sur `ADD INTEGRATION`. Recherchez `Robonomics`.

2. Cliquez sur Robonomics et remplissez la configuration : 

- Ajoutez la graine du compte `SUB_CONTROLLER` à la graine du compte du contrôleur.
- Ajoutez l'adresse publique du compte `SUB_OWNER` à l'adresse du propriétaire de l'abonnement.
- Définissez l'intervalle d'envoi des données (par défaut, il est de 10 minutes).
- (Facultatif) Vous pouvez ajouter des informations d'identification pour le service de mise en mémoire tampon Pinata ou une autre passerelle personnalisée pour diffuser vos données plus largement sur le réseau IPFS.

3. Cliquez sur `SUBMIT` après avoir terminé la configuration. Si vous avez rempli correctement toutes les informations, vous verrez la fenêtre de réussite.

C'est tout ! Vous avez entièrement configuré l'intégration Robonomics dans Home Assistant. Maintenant, vous pouvez utiliser tous les 
services Web Robonomics. Pour en savoir plus à leur sujet, rendez-vous dans la section ["Utilisation"](/docs/global-administration).
