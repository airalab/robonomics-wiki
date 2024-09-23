---
title: Créer un compte pour Robonomics Parachain

contributors: [PaTara43, Fingerling42]
---

**Pour interagir et opérer avec Robonomics Parachain, les développeurs et les utilisateurs doivent créer un compte sur le portail Polkadot / Substrate. Le compte effectue des fonctions de base pour le réseau : votre adresse publique sur le réseau (la clé publique), le contrôle d'accès à l'adresse et aux fonds (la clé privée), l'envoi de transactions au réseau, l'affichage de vos jetons et de leur montant, etc. Voici les deux principales façons de créer un compte pour Robonomics Parachain.**

## 1. Utilisation de l'extension de navigateur Polkadot{.js}

L'extension Polkadot fournit un mécanisme pour générer le compte et interagir avec tous les projets Polkadot / Kusama, y compris Robonomics Parachain. Ce n'est pas la manière la plus sûre de gérer votre compte, mais c'est la plus pratique en termes d'équilibre sécurité/utilisabilité.

## 1.1. Installer l'extension de navigateur

L'extension de navigateur est disponible pour [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) et [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (ainsi que pour les navigateurs basés sur Chromium).

{% roboWikiPicture {src:"docs/creating-an-account/1.1-polkadot-extension.png", alt:"Extension de navigateur"} %}{% endroboWikiPicture %}

## 1.2. Ouvrir l'application Robonomics Parachain

Rendez-vous sur l'[application Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) sur le portail Polkadot / Substrate. Si c'est la première fois que vous entrez dans le portail, il demandera l'accès à l'extension de navigateur, alors autorisez l'accès.

Une fois que vous avez ouvert l'application, jetez un œil dans le coin supérieur gauche. Le nom du réseau, son icône et le numéro du dernier bloc y sont affichés. En cliquant sur cette zone, une liste de tous les réseaux Polkadot / Kusama, y compris les réseaux de test et les nœuds locaux, s'ouvrira. Vous pouvez passer d'un réseau à un autre en sélectionnant celui requis et en appuyant sur le bouton `Switch`. **Assurez-vous de**Sont maintenant connectés à Robonomics Parachain**.

{% roboWikiPicture {src:"docs/creating-an-account/1.2-robonomics-app.png", alt:"Application Robonomics Parachain"} %}{% endroboWikiPicture %}

## 1.3. Mettre à jour les métadonnées de l'extension et créer un compte dans le navigateur

Il est très probable que l'application vous demande de mettre à jour les métadonnées de l'extension pour afficher les informations correctes sur la chaîne à laquelle vous êtes connecté. Allez dans **Paramètres -> Métadonnées**, appuyez sur le bouton `Mettre à jour les métadonnées` et ensuite, dans la fenêtre contextuelle, autorisez l'extension à le faire.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-metadata-update.png", alt:"Mise à jour des métadonnées"} %}{% endroboWikiPicture %}

Par défaut, l'application web ne fonctionne qu'avec des comptes externes. Pour permettre la création de nouveaux comptes directement dans le navigateur, allez dans **Paramètres -> Général -> Options de compte -> création de compte dans le navigateur**, choisissez `Autoriser le stockage local des comptes dans le navigateur` et appuyez sur le bouton `Enregistrer`.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-in-browser-account-creation.png", alt:"Mise à jour de la création de compte dans le navigateur"} %}{% endroboWikiPicture %}

## 1.4. Créer un compte dans l'extension

Ouvrez l'extension de navigateur Polkadot{.js}. Cliquez sur le gros bouton plus ou sélectionnez `Créer un nouveau compte` à partir de la petite icône plus en haut à droite. Vous devriez voir le menu suivant, avec une graine mnémonique générée sous forme de douze mots et l'adresse.

{% roboWikiPicture {src:"docs/creating-an-account/1.4-create-account-step-1.png", alt:"Création de compte, étape un"} %}{% endroboWikiPicture %}

La graine est votre clé pour le compte. Connaître la graine vous permet (ou à toute personne qui la connaît) de contrôler ce compte et même de le recréer, si vous oubliez le mot de passe. **Il est très important de la stocker en lieu sûr**, de préférence sur papier ou sur un autre support non numérique, pas dans un stockage numérique ou sur un ordinateur.

Sauvegardez la graine et appuyez sur `Étape suivante`. Vous devriez voir le menu suivant.

{% roboWikiPicture {src:"docs/creating-an-account/1.5-create-account-step-2.png", alt:"Création de compte, étape deux"} %}{% endroboWikiPicture %}


- *Réseau* vous permet de choisir sur quel réseau ce compte sera exclusivement utilisé. Vous pouvez utiliser la même adresse sur plusieurs réseaux, cependant, pour des raisons de confidentialité, il est recommandé de créer une nouvelle adresse pour chaque réseau que vous utilisez.
Sélectionnez le réseau Robonomics dans la liste déroulante. Si vous ne trouvez pas le réseau Robonomics, il est probable que vous n'ayez pas mis à jour les métadonnées, revenez en arrière et faites-le.

    `Vous remarquerez que le format de l'adresse et l'icône du compte changeront - c'est normal. Les différents formats de réseau ne sont que d'autres représentations de la même clé publique.`

- *Nom* est juste le nom du compte pour votre usage personnel. Il n'est pas stocké sur la blockchain et ne sera pas visible par les autres utilisateurs.

- *Mot de passe* est utilisé pour chiffrer les informations de votre compte. Vous devrez le saisir à nouveau lors de la signature des transactions sur le portail. Créez-en un et souvenez-vous-en.

En conséquence, après avoir créé un compte, vous le verrez dans la liste des comptes dans l'extension Polkadot{.js}. En cliquant sur les trois points, vous pourrez renommer le compte, l'exporter, le supprimer de l'extension et changer le réseau utilisé pour le compte.

De plus, le compte apparaîtra dans le menu **Comptes -> Comptes** sur le portail, où il sera noté qu'il a été injecté à l'aide de l'extension.

{% roboWikiPicture {src:"docs/creating-an-account/1.6-account-injected.png", alt:"Création de compte réussie"} %}{% endroboWikiPicture %}

## 2. Directement sur l'application Robonomics Parachain

Vous pouvez utiliser l'interface utilisateur sur le portail Polkadot / Substrate pour créer un compte. Cela pourrait être utilisé pour le développement et les tests.

## 2.1. Ouvrir l'application Robonomics Parachain

Allez sur [l'application Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) sur le portail Polkadot / Substrate. **Vérifiez en haut à gauche que vous êtes connecté à Robonomics Parachain**.

Allez dans **Comptes -> Comptes** et appuyez sur le bouton `Ajouter un compte`.

{% roboWikiPicture {src:"docs/creating-an-account/2.1-robonomics-app-main-view.png", alt:"Application Robonomics Parachain"} %}{% endroboWikiPicture %}

## 2.2. Créer un compte

Vous devriez voir le menu contextuel suivant avec la graine du compte.

{% roboWikiPicture {src:"docs/creating-an-account/2.2-robonomics-app-seed.png", alt:"Générer la graine du compte"} %}{% endroboWikiPicture %}

Il existe deux formes : *Mnémonique* (lisible par l'homme) et *Brut* (une séquence de chiffres et de lettres). Enregistrez la phrase de la graine en toute sécurité et appuyez sur `Suivant`.

> Vous pouvez également changer le type de cryptographie de création de compte, pour cela ouvrez les `Options de création avancées` et choisissez le type (`ed25519` sur l'image).

{% roboWikiPicture {src:"docs/creating-an-account/ed-account.jpg", alt:"Compte de type cryptographique ed25519"} %}{% endroboWikiPicture %}

Dans le menu suivant, vous devez définir le nom du compte et le mot de passe, de manière similaire aux instructions de l'extension décrites ci-dessus.

{% roboWikiPicture {src:"docs/creating-an-account/2.3-robonomics-app-name-pass.png", alt:"Générer le nom du compte et le mot de passe"} %}{% endroboWikiPicture %}

En cliquant sur le bouton `Suivant`, vous serez dirigé vers la dernière fenêtre. Cliquez sur `Enregistrer` pour terminer la création du compte. Cela générera également des fichiers JSON de sauvegarde que vous devriez stocker en toute sécurité. Vous pourrez utiliser ce fichier ultérieurement pour récupérer votre compte si vous vous souvenez du mot de passe.

{% roboWikiPicture {src:"docs/creating-an-account/2.4-robonomics-app-account-created.png", alt:"Création de compte réussie"} %}{% endroboWikiPicture %}

## 2.3 Ajouter un compte ed25519 à l'extension Polkadot

Vous devrez peut-être ajouter le compte créé à l'extension Polkadot.js (pour un compte ed25519, vous ne pouvez le faire qu'avec le fichier JSON de sauvegarde). Pour cela, vous devez créer un fichier de sauvegarde du compte. Cliquez sur les trois points de votre compte et choisissez `Créer un fichier de sauvegarde pour ce compte` et saisissez votre mot de passe.

{% roboWikiPicture {src:"docs/creating-an-account/backup-file.jpg", alt:"Fichier de sauvegarde"} %}{% endroboWikiPicture %}

Ensuite, ouvrez une extension et appuyez sur le bouton `+` en haut à droite, puis choisissez `Restaurer le compte à partir du fichier JSON de sauvegarde`.

{% roboWikiPicture {src:"docs/creating-an-account/extention-add-backup.jpg", alt:"Restaurer la sauvegarde dans l'extension"} %}{% endroboWikiPicture %}

Dans la fenêtre ouverte, déposez le fichier enregistré, saisissez le mot de passe et appuyez sur `Restaurer`.

{% roboWikiPicture {src:"docs/creating-an-account/file-backup.jpg", alt:"Restaurer la sauvegarde dans l'extension 2"} %}{% endroboWikiPicture %}

## 3. Compte créé avec succès

Vous pouvez désormais utiliser pleinement votre compte fraîchement créé. Envoyez et recevez des jetons, des messages, écrivez des datalogs et bien plus encore. N'hésitez pas à explorer toutes les fonctionnalités de l'application. Pour copier l'adresse de votre compte, il vous suffit de cliquer sur son icône, l'adresse sera copiée dans le presse-papiers.

Si vous souhaitez en savoir plus sur les comptes Polkadot / Kusama et d'autres moyens de les créer, vous trouverez plus d'informations [ici](https://wiki.polkadot.network/docs/learn-accounts) et [ici](https://wiki.polkadot.network/docs/learn-account-generation).