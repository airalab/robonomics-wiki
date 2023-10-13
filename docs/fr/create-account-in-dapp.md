---
title: Créer un compte pour Robonomics Parachain

contributors: [PaTara43, Fingerling42]
---

**Afin d'interagir et de fonctionner avec Robonomics Parachain, les développeurs et les utilisateurs doivent créer un compte sur le portail Polkadot / Substrate. Le compte remplit les fonctions de base du réseau : votre adresse de réseau public (la clé publique), le contrôle d'accès à l'adresse et aux fonds (la clé privée), l'envoi de transactions au réseau, l'affichage de vos tokens et de leur montant, etc. Vous trouverez ci-dessous deux façons principales de créer un compte pour Robonomics Parachain**

## 1. Utilisation de l'extension de navigateur Polkadot{.js}

L'extension Polkadot offre un mécanisme pour générer le compte et interagir avec tous les projets Polkadot / Kusama, y compris Robonomics Parachain. Ce n'est pas la manière la plus sûre de gérer votre compte, mais c'est la plus pratique en termes d'équilibre sécurité / facilité d'utilisation.

## 1.1. Installerer l'extension de navigateur

L'extension de navigateur est disponible pour [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) et [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (ainsi que les navigateurs basés sur Chromium).

![Browser Extension](../images/creating-an-account/1.1-polkadot-extension.png "Browser Extension")

## 1.2. Ouvrir l'application Robonomics Parachain

Allez à [L'application Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) sur le portail Polkadot / Substrate. Si c'est la première fois que vous entrez dans le portail, il demandera l'accès à l'extension de navigateur, donc autorisez l'accès. 

Une fois que vous avez ouvert l'application, jetez un œil au coin supérieur gauche. Le nom du réseau, son icône et le numéro du dernier bloc y sont affichés. En cliquant sur cette zone, vous ouvrirez une liste de tous les réseaux Polkadot/Kusama, y compris les réseaux de test et les nœuds locaux. Vous pouvez basculer entre les réseaux en sélectionnant celui requis et en appuyant sur le bouton `Switch`. **Assurez-vous d'être connecté à Robonomics Parachain maintenant**. 

![Robonomics Parachain app](../images/creating-an-account/1.2-robonomics-app.png "Robonomics Parachain app")

## 1.3. Mettre à jour les métadonnées de l'extension

Il est très probable que l'application vous demande de mettre à jour les métadonnées de l'extension pour afficher les informations correctes sur la chaîne à laquelle vous êtes connecté. Allez sur **Settings -> Metadata**, appuyez sur le bouton `Update metadata` et ensuite, dans la fenêtre contextuelle, autorisez l'extension à le faire. 

![Updating metadata](../images/creating-an-account/1.3-metadata-update.png "Updating metadata")

## 1.4. Créer un compte dans l'extension

Ouvrez l'extension de navigateur Polkadot{.js}. Cliquez sur le gros bouton plus ou sélectionnez `Create new account` à partir de la petite icône plus en haut à droite. Vous devriez voir le menu suivant, avec une graine mnémonique générée sous la forme de douze mots et l'adresse. 

![Account creation, step one](../images/creating-an-account/1.4-create-account-step-1.png "Account creation, step one")

La graine est votre clé pour le compte. Connaître la graine vous permet (ou à toute autre personne qui connaît la graine) de prendre le contrôle de ce compte et même de le recréer, si vous oubliez le mot de passe. **Il est très important de la stocker en lieu sûr**, de préférence sur papier ou sur un autre support non numérique, pas dans un stockage numérique ou sur un ordinateur. 

Enregistrez la graine et appuyez sur `Next step`. Vous devriez voir le menu suivant.

![Account creation, step two](../images/creating-an-account/1.5-create-account-step-2.png "Account creation, step two")

- *Network* vous permet de choisir sur quel réseau ce compte sera exclusivement utilisé. Vous pouvez utiliser la même adresse sur plusieurs réseaux, cependant, pour des raisons de confidentialité, il est recommandé de créer une nouvelle adresse pour chaque réseau que vous utilisez. 
Sélectionnez le réseau Robonomics dans la liste déroulante. Si vous ne trouvez pas le réseau Robonomics, il est probable que vous n'ayez pas mis à jour les métadonnées, revenez en arrière et faites-le.

    - Vous remarquerez que le format de l'adresse et l'icône du compte changeront - c'est normal. Les formats de réseau différents ne sont que d'autres représentations de la même clé publique. 

- *Name* n'est que le nom du compte à usage personnel. Il n'est pas stocké sur la blockchain et ne sera pas visible par les autres utilisateurs. 

- *Password* est utilisé pour chiffrer les informations de votre compte. Vous devrez le saisir à nouveau lors de la signature des transactions sur le portail. Créez-en un et souvenez-vous-en.

En conséquence, après avoir créé un compte, vous le verrez dans la liste des comptes dans l'extension Polkadot{.js}. En cliquant sur les trois points, vous pouvez renommer le compte, l'exporter, le supprimer de l'extension et changer le réseau utilisé pour le compte. 

De plus, le compte apparaîtra dans le menu  **Accounts -> Accounts** du portail, où il sera noté qu'il a été injecté à l'aide de l'extension.

![Successful account creation](../images/creating-an-account/1.6-account-injected.png "Successful account creation")

## 2. Directement sur l'application Robonomics Parachain

Vous pouvez utiliser l'interface utilisateur sur le portail Polkadot / Substrate pour créer un compte. Il peut être utilisé pour le développement et les tests. 

## 2.1. Ouvrez l'application Robonomics Parachain

Aller à [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) sur le portail Polkadot / Substrate. **Vérifiez en haut à gauche que vous êtes connecté à Robonomics Parachain**.  

Aller à **Accounts -> Accounts** et appuyez sur le bouton`Add account`.

![Robonomics Parachain App](../images/creating-an-account/2.1-robonomics-app-main-view.png "Robonomics Parachain App")

## 2.2. Créer un compte

Vous devriez voir le menu contextuel suivant avec la graine du compte. 

![Generating account seed](../images/creating-an-account/2.2-robonomics-app-seed.png "Generating account seed")

Il a deux formes: *Mnemonic* (lisible par l'homme) et *Raw* (une séquence de chiffres et de lettres). Sauvegardez la phrase de récupération en toute sécurité et appuyez sur `Next`.

> Vous pouvez également changer le type de cryptographie pour la création de compte, pour cela ouvrez `Advanced creation options` et choisissez le type (`ed25519` sur l'image).

![ed25519 crypto type account](../images/creating-an-account/ed-account.jpg)

Dans le menu suivant, vous devez définir le nom du compte et le mot de passe, de manière similaire aux instructions de l'extension décrites ci-dessus.

![Generating account name and password](../images/creating-an-account/2.3-robonomics-app-name-pass.png "Generating account name and password")

En cliquant sur le bouton `Next` vous amènera à la dernière fenêtre. Cliquez sur `Save` pour terminer la création du compte. Il générera également des fichiers JSON de sauvegarde que vous devez conserver en toute sécurité. Vous pouvez ensuite utiliser ce fichier pour récupérer votre compte si vous vous souvenez du mot de passe.

![Successful account creation](../images/creating-an-account/2.4-robonomics-app-account-created.png "Successful account creation")

## 2.3 Ajouter un compte ed25519 à l'extension Polkadot

Vous devrez peut-être ajouter le compte créé à l'extension Polkadot.js (pour un compte ed25519, vous ne pouvez le faire qu'avec le fichier JSON de sauvegarde). Pour cela, vous devez créer une sauvegarde du compte. Appuyez sur les trois points sur votre compte et choisissez `Create a backup file for this account` et écrivez votre mot de passe.

![Backup file](../images/creating-an-account/backup-file.jpg)

Ensuite, ouvrez une extension et appuyez sur le bouton `+` en haut à droite, puis choisissez `Restore account from backup JSON file`.

![Restore backup in extension](../images/creating-an-account/extention-add-backup.jpg)

Dans la fenêtre ouverte, déposez le fichier enregistré, saisissez le mot de passe et appuyez sur `Restore`.

![Restore backup in extension 2](../images/creating-an-account/file-backup.jpg)

## 3. Compte créé avec succès 

Maintenant, vous pouvez pleinement utiliser votre compte fraîchement créé. Envoyez et recevez des jetons, des messages, écrivez des journaux de données et plus encore. N'hésitez pas à explorer toutes les fonctionnalités de l'application. Pour copier l'adresse de votre compte, cliquez simplement sur son icône, l'adresse sera copiée dans le presse-papiers. 

Si vous souhaitez en savoir plus sur les comptes Polkadot / Kusama et les autres moyens de les créer, vous trouverez plus d'informations [ici](https://wiki.polkadot.network/docs/learn-accounts) et [ici](https://wiki.polkadot.network/docs/learn-account-generation).
