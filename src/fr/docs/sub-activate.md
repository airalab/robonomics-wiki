---
title: Activation d'abonnement
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp
    https://github.com/airalab/robonomics.app
---

Dans cet article, vous allez créer des comptes parachain Robonomics et acheter un abonnement IoT.

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Pour contrôler Home Assistant avec Robonomics, vous avez besoin de 2 comptes sur la parachain Robonomics. Pour l'un des comptes (`OWNER`), vous achèterez un abonnement Robonomics. Le deuxième compte (`CONTROLLER`) contrôlera tous les processus de Home Assistant (comme la télémétrie) et donnera accès à d'autres utilisateurs. Ces comptes assureront la sécurité de votre Home Assistant.

{% roboWikiNote {title:"AVERTISSEMENT", type: "warning"}%}
Les deux comptes doivent être créés avec le cryptage **ed25519**. Par conséquent, vous devez créer un compte en utilisant l'interface Polkadot-JS et sélectionner le cryptage requis.

Cette fonctionnalité est désactivée par défaut dans l'interface Polkadot-JS. Pour l'activer, accédez à `Paramètres` -> `Général` -> `options de compte` et sélectionnez `Autoriser le stockage local des comptes dans le navigateur` dans le menu déroulant sous `création de compte dans le navigateur`.
{% endroboWikiNote %}

## Créer des comptes Owner et Controller

{% roboWikiVideo {videos:[{src: 'QmajeEV4adqR2DCaBJPZhH6NR74eHaRmvCcbeQtnLm7Kcc', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Allez sur l'application Robonomics Parachain (https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) sur le Portail Polkadot / Substrate. **Vérifiez le coin supérieur gauche pour vous assurer que vous êtes connecté à Robonomics Parachain.**

2. Allez sur `Comptes` -> `Comptes` et appuyez sur le bouton `Ajouter un compte`. Vous verrez le menu contextuel avec la graine du compte. Il adeux formulaires : * Mnémonique * (lisible par l'homme) et * Brut * (une séquence de chiffres et de lettres).

3. Ouvrez les `Options de création avancées`, changez le type de cryptographie du compte en cours de création en `Edwards - ed25519` et appuyez sur `Suivant`.

4. Enregistrez la phrase mnémonique de manière sécurisée et appuyez sur `Suivant`.

5. Dans le menu suivant, vous devez définir le nom du compte et le mot de passe. Pour plus de commodité, nommez-le `OWNER`. Appuyez sur `Suivant`.

6. Dans la fenêtre finale, cliquez sur `Enregistrer` pour terminer la création du compte. Cela générera également des fichiers JSON de sauvegarde que vous devez conserver en sécurité. Vous pourrez ensuite utiliser ce fichier pour récupérer votre compte si vous vous souvenez du mot de passe.

7. Répétez ces étapes pour créer un compte avec le nom `CONTROLLER`.


## Ajouter des comptes à Polkadot.js

Pour plus de commodité, vous devriez utiliser l'[extension Polkadot.js](https://polkadot.js.org/extension/) et ajouter ces comptes nouvellement créés. Pour un compte ed25519, vous ne pouvez le faire qu'avec un fichier JSON de sauvegarde. Vous pouvez utiliser les fichiers enregistrés lors de la création des comptes.

Vous pouvez obtenir à nouveau ces fichiers en créant un fichier de sauvegarde du compte. Cliquez sur les trois points à côté de votre compte, choisissez `Créer un fichier de sauvegarde pour ce compte` et saisissez votre mot de passe.

{% roboWikiVideo {videos:[{src: 'Qmc5LcbLSdVCUubLomUUo5Qxrxb2xaixpwUFqnpj2C9iM5', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Ouvrez l'extension et appuyez sur le bouton `+` en haut à droite, puis choisissez `Restaurer le compte à partir d'un fichier JSON de sauvegarde`.

2. Dans la fenêtre ouverte, téléchargez le fichier JSON, saisissez le mot de passe et appuyez sur `Restaurer`.

3. Assurez-vous que le réseau Robonomics est sélectionné pour les comptes dans l'extension Polkadot.js. Sur le portail Polkadot / Substrate, allez dans `Paramètres` -> `Métadonnées` et cliquez sur le bouton `Mettre à jour les métadonnées`.

4. Confirmez la mise à jour des métadonnées dans la fenêtre contextuelle. L'extension affichera désormais le libellé du réseau pour lequel l'adresse est utilisée.

{% roboWikiVideo {videos:[{src: 'QmXVhu17Qkx8VkAAVfm5mUBzSTq1BvaAF7MNdXLgZSvZcR', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Activer l'abonnement Robonomics

{% roboWikiNote {type: "okay"}%} Pour cette étape, vous devez disposer d'une quantité suffisante de jetons XRT (minimum de 2 à 3 XRT) dans votre compte `OWNER`. {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Allez sur l'application Robonomics et accédez à la [page d'abonnement](https://robonomics.app/#/rws-buy). Ensuite, cliquez sur `Connect Account` dans la barre latérale droite.

2. Dans le menu contextuel suivant, connectez l'extension Polkadot.js. Vous verrez l'adresse de votre compte ainsi que son solde.

3. Avant d'acheter, assurez-vous d'avoir sélectionné le compte `OWNER`. Cliquez sur l'icône de profil d'adresse, et vous devriez voir le compte `OWNER`.

4. Enfin, cliquez sur le bouton `ACHETER UN ABONNEMENT` et saisissez le mot de passe de votre compte. Attendez que le processus d'activation soit terminé. Vous verrez l'état de votre abonnement après un certain temps.

## Configuration de votre abonnement

Maintenant, vous devez configurer votre abonnement en ajoutant le compte `CONTROLLER` à celui-ci.

{% roboWikiVideo {videos:[{src: 'Qmd5P356UE1yDLAd4uSdq1dERbyp5gk5wpWD3iENNt2mjV', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Allez sur l'application Robonomics et accédez à la [page de configuration d'un abonnement](https://robonomics.app/#/rws-setup). Naviguez jusqu'à la section **PARAMÈTRES GÉNÉRAUX**.

2. Supprimez la phrase de récupération du `Controller` du champ `Phrase de récupération du contrôleur` et saisissez la phrase de récupération du compte `CONTROLLER`.

3. Copiez l'adresse du `CONTROLLER` : ouvrez l'extension et cliquez sur l'icône à côtéle nom du compte.

4. Collez cette adresse dans le champ `Contrôleur` et cliquez sur le bouton `ENREGISTRER`.

## Ajouter des comptes à l'abonnement

Maintenant, vous devez ajouter votre compte `CONTRÔLEUR` à la **liste d'accès**.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Allez sur l'application Robonomics et accédez à la [page de configuration d'un abonnement](https://robonomics.app/#/rws-setup). Assurez-vous d'avoir sélectionné le bon abonnement et le compte `PROPRIÉTAIRE`.

2. Copiez l'adresse du `CONTRÔLEUR` : ouvrez l'extension et cliquez sur l'icône à côté du nom du compte.

3. Collez cette adresse dans le champ `Adresse Polkadot` de la section **UTILISATEURS DANS L'ABONNEMENT** et cliquez sur le bouton `+`.

4. Entrez le mot de passe de votre compte `PROPRIÉTAIRE` dans la fenêtre contextuelle, puis attendez que le processus d'activation soit terminé.