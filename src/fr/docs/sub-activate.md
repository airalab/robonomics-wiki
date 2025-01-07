---
title: Activation d'abonnement
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.8.2
    https://github.com/airalab/robonomics.app
---

**Dans cet article, vous allez créer des comptes parachain Robonomics et acheter un abonnement IoT.**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Pour contrôler Home Assistant avec Robonomics, vous avez besoin de 2 comptes sur la parachain Robonomics. Pour l'un des comptes (`OWNER`), vous achèterez un abonnement Robonomics. Le deuxième compte (`CONTROLLER`) contrôlera tous les processus de Home Assistant (comme la télémétrie) et donnera accès à d'autres utilisateurs. Ces comptes assureront la sécurité de votre Home Assistant.

Si vous n'avez pas de compte, consultez cet article et créez [le compte OWNER](/docs/create-account-in-dapp/). Le compte Controller sera créé automatiquement lors de la configuration.

Dans l'article, un portefeuille [extension Polkadot.js](https://polkadot.js.org/extension/) est utilisé pour travailler avec les comptes, mais vous pouvez utiliser un autre portefeuille qui vous convient.

## Activer l'abonnement Robonomics

{% roboWikiNote {type:"ok"} %}

Pour cette étape, vous devez disposer d'une quantité suffisante de jetons XRT (minimum de 2 à 3 XRT) sur votre compte `OWNER`.

{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Allez sur l'application Robonomics et accédez à la [page d'abonnement](https://robonomics.app/#/rws-buy). Ensuite, cliquez sur `Connect Account` dans la barre latérale droite.

2. Dans le menu contextuel suivant, connectez l'extension Polkadot.js. Vous verrez l'adresse de votre compte ainsi que son solde.

3. Avant d'acheter, assurez-vous d'avoir sélectionné le compte `OWNER`. Cliquez sur l'icône de profil d'adresse, et vous devriez voir le compte `OWNER`.

4. Enfin, cliquez sur le bouton `ACHETER UN ABONNEMENT` et saisissez le mot de passe de votre compte. Attendez que le processus d'activation soit terminé. Vous verrez l'état de votre abonnement après un certain temps.

## Configurez votre abonnement

Maintenant, vous devez configurer votre abonnement en ajoutant le compte `CONTROLLER` à celui-ci.

{% roboWikiPicture {src:"docs/home-assistant/sub-download-backup.png",alt: "sub_setup"} %}{% endroboWikiPicture %}

1. Accédez à l'application Robonomics et rendez-vous sur la [page de configuration d'un abonnement](https://robonomics.app/#/rws-setup). Naviguez jusqu'à la section **Paramètres d'abonnement**.

2. Cliquez sur `TÉLÉCHARGER LA SAUVEGARDE` et sélectionnez l'option `POUR LE SERVEUR`.

{% roboWikiNote {type: "warning", title: "Informations importantes" }%} Cette action créera un nouveau contrôleur pour votre abonnement. N'oubliez pas de l'ajouter à l'abonnement. {% endroboWikiNote %}

3. Dans la fenêtre contextuelle, créez un mot de passe pour le compte `CONTRÔLEUR`.

{% roboWikiPicture {src:"docs/home-assistant/server-new-settings.png", alt:"créer un contrôleur"} %}{% endroboWikiPicture %}

4. Dans la fenêtre contextuelle suivante, vous verrez l'adresse de votre nouveau compte et la phrase mnémonique de récupération. Conservez la phrase mnémonique en toute sécurité. Dans le dossier de téléchargements, vous trouverez deux fichiers JSON : le premier fichier est nommé `Controller-<adresse>.json`, où `<adresse>` est l'adresse de votre contrôleur nouvellement généré. Le deuxième fichier est nommé `robonomics.app-settings-<nom-de-l'abonnement>-serveur.json`, où `<nom-de-l'abonnement>` est le nom de votre abonnement. Conservez ces fichiers en toute sécurité, car ils seront nécessaires ultérieurement pour la configuration de l'intégration. De plus, vous pouvez importer votre contrôleur.compte dans votre portefeuille. Les instructions pour l'importer dans l'extension Polkadot.js peuvent être trouvées [ici](/docs/create-account-in-dapp/).

{% roboWikiPicture {src:"docs/home-assistant/controller-acc.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

5. (Facultatif) Vous pouvez ajouter des informations d'identification pour le service d'épinglage Pinata ou un autre portail personnalisé pour diffuser vos données plus largement sur le réseau IPFS.

{% roboWikiNote {title:"Note", type: "Note"}%} Dans la section [Configuration de Pinata](/docs/pinata-setup), vous trouverez des informations plus détaillées sur l'utilisation de Pinata.{% endroboWikiNote %}

6. Fermez la fenêtre contextuelle et cliquez sur le bouton `ENREGISTRER`.

{% roboWikiPicture {src:"docs/home-assistant/save-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

## Ajouter un compte de contrôleur à l'abonnement

Maintenant, vous devez ajouter votre compte `CONTROLLER` à la **liste d'accès**.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls']} %}{% endroboWikiVideo %}

1. Allez sur l'application Robonomics etAccédez à la [page de configuration d'un abonnement](https://robonomics.app/#/rws-setup). Assurez-vous d'avoir sélectionné le bon abonnement et le compte `OWNER`.

2. Copiez l'adresse du `CONTROLLER` : ouvrez l'extension et cliquez sur l'icône à côté du nom du compte ou copiez l'adresse depuis la section **Paramètres d'abonnement**.

3. Collez cette adresse dans le champ `Adresse Polkadot` de la section **UTILISATEURS DANS L'ABONNEMENT** et cliquez sur le bouton `+`.

4. Entrez le mot de passe de votre compte `OWNER` dans la fenêtre contextuelle, puis attendez que le processus d'activation soit terminé.

C'est tout. Passez à l'article suivant.