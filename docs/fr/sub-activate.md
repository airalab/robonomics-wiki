---
title: Activer l'abonnement
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

Dans cet article, vous allez créer des comptes Robonomics parachain et acheter un abonnement IoT. 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


Pour contrôler Home Assistant avec Robonomics, vous avez besoin de 2 comptes sur le parachain Robonomics. Pour l'un des comptes (`sub_owner`), vous allez acheter un abonnement Robonomics. Le deuxième compte (`sub_controller`) contrôlera tous les processus de Home Assistant (comme la télémétrie) et donnera accès à d'autres utilisateurs. Ces comptes assureront la sécurité de votre Home Assistant. 

<robo-wiki-note type="warning" title="WARNING">

Les deux comptes doivent être créés avec le cryptage **ed25519**. Pour cette raison, vous devez créer un compte à l'aide de l'interface utilisateur Polkadot-JS et sélectionner le cryptage requis.

Cette fonctionnalité est désactivée par défaut sur l'interface Polkadot-JS UI. Pour l'activer, accédez à `Settings` -> `General` -> `account options` et sélectionnez `Allow local in-browser account storage` dans le menu déroulant `in-browser account creation`.

</robo-wiki-note>

## Créer des comptes de propriétaire et de contrôleur

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQiJYPYajUJXENX2PzSJMSKGSshyWyPNqugSYxP5eCNvm', type:'mp4'}]" />

1. Rendez-vous sur [l'application Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) sur le portail Polkadot / Substrate. **Vérifiez le coin supérieur gauche pour vous assurer que vous êtes connecté à Robonomics Parachain.**

2. Allez dans `Accounts` -> `Accounts` et cliquez sur le bouton `Add account`. Vous verrez le menu contextuel avec la graine du compte. Il existe deux formes : *Mnemonic* (lisible par l'homme) et *Raw* (une séquence de chiffres et de lettres). 

3. Ouvrez les `Advanced creation options`, changez le type de cryptographie de création de compte en `Edwards - ed25519` et cliquez sur `Next`.


4. Enregistrez la phrase de graine mnémonique en toute sécurité et cliquez sur `Next`.

5. Dans le menu suivant, vous devez définir le nom du compte et le mot de passe. Donnez-lui le nom `sub_owner` pour plus de commodité. Cliquez sur `Next`.

6. Sur la dernière fenêtre, cliquez sur `Save` pour terminer la création du compte. Il générera également des fichiers JSON de sauvegarde que vous devez conserver en sécurité. Vous pourrez utiliser ce fichier ultérieurement pour récupérer votre compte si vous vous souvenez du mot de passe.

7. Répétez ces étapes pour un compte portant le nom `sub_controller`.


## Ajouter des comptes à Polkadot.js

Pour plus de commodité, vous devriez utiliser l'[extension Polkadot.js](https://polkadot.js.org/extension/) et y ajouter ces comptes nouvellement créés. Pour un compte ed25519, vous ne pouvez le faire qu'avec un fichier JSON de sauvegarde. Vous pouvez utiliser les fichiers enregistrés lorsque vous avez créé les comptes.

Vous pouvez obtenir à nouveau ces fichiers en créant une sauvegarde du compte. Cliquez sur les trois points à côté de votre compte, choisissez `Create a backup file for this account` et saisissez votre mot de passe.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmRd7gztUjWkLF4W2XuJwy5aXBwzNV2aPCU6CQQLvUpSNj', type:'mp4'}]" />

1. Ouvrez une extension et cliquez sur le bouton `+` en haut à droite, puis choisissez `Restore account from backup JSON file`.

2. Dans la fenêtre ouverte, téléchargez le fichier JSON, saisissez le mot de passe et cliquez sur `Restore`.

3. Assurez-vous que le réseau Robonomics est sélectionné pour les comptes dans l'extension Polkadot.js. Sur le portail Polkadot / Substrate, accédez à  `Setting` -> `Metadata` et cliquez sur le bouton `Update metadata`. 

4. Confirmez la mise à jour des métadonnées dans la fenêtre contextuelle. Maintenant, l'extension affichera l'étiquette du réseau pour lequel l'adresse est utilisée.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmT5sTNP9t8gpbD4RJJw6ETwG4wiziiChAh2uHHBk9Zsyd', type:'mp4'}]" />

## Activer l'abonnement Robonomics 

<robo-wiki-note type="okay">

Pour cette étape, vous devez disposer d'une quantité suffisante de jetons XRT (minimum 2-3 XRT) sur votre compte `sub_owner`.

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmXrFCajmJgkRDSbshGD3QehjnoyS6jafEPSjHdYkoBHum', type:'mp4'}]" />

1. Rendez-vous sur la page d'abonnement de Robonomics dans [l'application](https://dapp.robonomics.network/#/subscription) et cliquez sur `Connecter un compte` dans la barre latérale droite.

2. Dans le menu contextuel suivant, connectez l'extension Polkadot.js. Vous verrez l'adresse de votre compte avec le solde.

3. Avant d'acheter, vérifiez que vous avez choisi le compte `sub_owner`. Cliquez sur l'icône de profil d'adresse, vous devriez voir le compte `sub_owner` sous le champ `Check owner account`.

4. Enfin, cliquez sur le bouton `SUBMIT` et saisissez le mot de passe de votre compte. Ensuite, attendez que le processus d'activation soit terminé. Vous verrez l'état de votre abonnement après un certain temps.


## Ajouter des comptes à l'abonnement

Vous devez maintenant ajouter un compte `sub_controller` à la **liste d'accès**.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmV1gkwtcXsWv54ov9tuXfcHg7nqs1foM8cRwts4sqnqtX', type:'mp4'}]" />

1. Ouvrez l'extension et cliquez sur l'icône à côté du nom du compte. Cela copiera l'adresse du compte.


2. Collez cette adresse dans le champ `Robonomics parachain address` dans la partie **Gérer l'accès**. Donnez-lui un nom et cliquez sur le bouton `+`. 

3. Répétez les étapes 1 et 2 pour le compte `sub_owner`.

4. Cliquez sur `Save`. Saisissez le mot de passe de votre `sub_owner` dans la fenêtre contextuelle et attendez que le processus d'activation soit terminé.
