---
title: Administration globale

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

**Cet article vous montrera comment configurer un nouvel utilisateur pour votre Home Assistant.**

## Ajout d'utilisateurs à l'abonnement

Vous ne pouvez pas utiliser des comptes déjà créés car `SUB_OWNER` et `SUB_CONTROLLER` fournissent une sécurité, et le premier utilisateur que vous avez créé lorsque vous avez commencé Home Assistant n'a pas de compte Robonomics Parachain.

1. Créez un compte sur Robonomics parachain, comme vous l'avez fait dans l'[article précédent](/docs/sub-activate/).

2. Utilisez le compte `SUB_OWNER` pour ajouter un nouveau compte utilisateur à l'abonnement dans le [dapp](https://dapp.robonomics.network/#/subscription/devices). Maintenant, il devrait y avoir trois adresses dans la liste d'accès : `SUB_OWNER`, `SUB_CONTROLLER` et `USER`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSxzram7CF4SXpVgEyv98XetjYsxNFQY2GY4PfyhJak7H', type:'mp4'}]" />


## Accorder l'accès à l'utilisateur

1. Accédez au service dapp appelé [Home Assistant Account](https://dapp.robonomics.network/#/home-assistant). Choisissez le compte que vous venez de créer dans la barre latérale droite (vérifiez que vous avez choisi le compte souhaité en appuyant sur l'icône de profil).

2. Entrez la clé `USER` dans le champ requis. Ajoutez les adresses `SUB_OWNER` et `SUB_CONTROLLER` dans les champs de crédits administrateurs. Si tout est correct, vous verrez l'état de vérification `VÉRIFIÉ`.

3. Créez un mot de passe pour un nouvel utilisateur que vous venez d'enregistrer, puis confirmez la transaction, qui sera maintenant sans frais en raison de l'abonnement. Plus tard, vous pourrez restaurer le mot de passe dans l'onglet Restaurer.

4. Après le processus d'inscription, connectez-vous à Home Assistant avec votre adresse utilisateur comme identifiant et un mot de passe nouvellement créé.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmW2TXuwCYXzgcRfEUx4imZU5ZerEzkuD5P53u9g2WnxDh', type:'mp4'}]" />

Maintenant, vous pouvez utiliser le dapp pour contrôler votre maison via Robonomics, consultez l'article [**"Obtenir la télémétrie de la maison intelligente"**](/docs/smart-home-telemetry/).

## Dépannage

1. Si vous oubliez un mot de passe pour Home Assistant depuis votre compte Robonomics, [vérifiez le Dapp.](https://dapp.robonomics.network/#/home-assistant)
Accédez à la partie "Your Home Assistant password" et choisissez l'onglet "Restore".
