---
title: Ajouter un utilisateur

contributors: [nakata5321, Fingerling42, LoSk-p]
outils:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**Cet article vous montrera comment configurer un nouvel utilisateur sur votre Home Assistant.**

## Ajout d'utilisateurs à l'abonnement

Vous ne pouvez pas utiliser des comptes précédemment créés car le `PROPRIÉTAIRE` et le `CONTRÔLEUR` assurent la sécurité, et le premier utilisateur que vous avez créé lorsque vous avez démarré Home Assistant n'a pas de compte Robonomics Parachain.

{% roboWikiVideo {videos:[{src: 'QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Créez un compte sur la parachain Robonomics, comme vous l'avez fait dans l'[article précédent](/docs/sub-activate/).

2. En utilisant le compte `PROPRIÉTAIRE`, ajoutez un nouveau compte utilisateur à l'abonnement sur la page `CONFIGURER UN ABONNEMENT` dans [Robonomics DApp](https://robonomics.app/#/rws-setup). Maintenant, dans la section `UTILISATEURS DANS L'ABONNEMENT`, il devrait y avoir trois adresses dans la liste d'accès : `PROPRIÉTAIRE`, `CONTRÔLEUR` et `UTILISATEUR`.


## Fichier JSON de configuration RWS

Tout d'abord, l'utilisateur doit obtenir le fichier JSON avec les informations de la configuration RWS.

### Créer un fichier JSON de configuration RWS

L'administrateur peut créer un fichier JSON pour sa configuration dans la page [CONFIGURER UN ABONNEMENT](https://robonomics.app/#/rws-setup) en utilisant le bouton `Télécharger l'import pour d'autres utilisateurs`.

{% roboWikiPicture {src:"docs/home-assistant/download_rws_setup_json.png", alt:"image"} %}{% endroboWikiPicture %}

### Importer la configuration RWS

Maintenant, avec ce fichier JSON, l'utilisateur peut importer la configuration RWS en utilisant le bouton `IMPORTER LA CONFIGURATION`.

{% roboWikiVideo {videos:[{src: 'QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Accorder l'accès à l'utilisateur

Sur la même page ([CONFIGURER UN ABONNEMENT](https://robonomics.app/#/rws-setup)), vous pouvez définir le mot de passe pour le nouvel utilisateur.

{% roboWikiVideo {videos:[{src: 'Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Choisissez le compte que vous venez de créer dans la barre latérale droite (vérifiez que vous avez choisi le compte prévu en appuyant sur l'icône de profil).

2. Entrez l'adresse et la phrase de récupération du `UTILISATEUR` dans les champs requis.

3. Entrez un mot de passe, puis confirmez la transaction en cliquant sur le bouton `CRÉER UN MOT DE PASSE`, qui sera désormais sans frais en raison de l'abonnement.

4. Après le processus d'inscription, connectez-vous à Home Assistant avec l'adresse de votre utilisateur comme identifiant et un mot de passe nouvellement créé.

Maintenant, vous pouvez utiliser l'application pour contrôler votre maison via Robonomics, consultez l'article [**"Obtenir la télémétrie de la maison intelligente"**](/docs/smart-home-telemetry/).