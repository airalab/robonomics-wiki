---
title: Utiliser robonomics.app
contributors: [vol4tim, positivecrash, ensrationis]
---

[robonomics.app](https://robonomics.app) est l'application web de Robonomics. Elle permet d'acheter un abonnement, de connecter Home Assistant, de piloter votre maison depuis n'importe quel navigateur et de consulter l'arbre des appareils et les données des capteurs. Cette page la parcourt écran par écran.

Il vous faut une extension de portefeuille Polkadot avec un compte sur Robonomics. Pour acheter quoi que ce soit ou envoyer une transaction, le compte a besoin d'un peu de XRT. Voir [Premiers pas](/docs/getting-started/).

## Connecter votre portefeuille

Le bouton du portefeuille se trouve en haut à droite. Choisissez un compte dans votre extension et autorisez le site à l'utiliser. Le même bouton change de réseau. Utilisez Polkadot.

## Acheter un abonnement

**Buy/renew a subscription** dans le menu.

- La page affiche le prix, le délai d'activation (environ deux minutes) et le nombre d'abonnements disponibles en ce moment.
- Votre solde doit couvrir le prix plus de petits frais.
- Une seule transaction enchérit sur une enchère libre et ajoute votre compte à l'abonnement.
- S'il n'y a plus d'abonnements disponibles, de nouveaux n'ouvrent qu'après un vote de gouvernance. Voir [Pallets historiques](/docs/legacy-pallets/#current-state).

L'abonnement permet aux comptes qui y sont inscrits d'envoyer des transactions sans frais. C'est ce qu'utilise Home Assistant pour communiquer avec la chaîne. Détails : [Abonnements RWS](/docs/legacy-pallets/#rws-subscriptions).

## Ajouter un setup

Un setup, c'est votre maison telle que l'application la voit : un abonnement et les comptes qui y sont liés. **New setup** dans le menu propose trois façons d'en ajouter un :

- **Par l'adresse du propriétaire.** Collez l'adresse qui détient l'abonnement. L'application trouve l'abonnement et affiche sa date de fin, même s'il a déjà expiré.
- **Avec l'extension.** Choisissez le compte du propriétaire dans votre portefeuille au lieu de le saisir.
- **Depuis un fichier.** Importez une sauvegarde exportée plus tôt.

La liste des setups n'existe que dans votre navigateur. Retirer un setup de l'application le retire de cette liste, et rien ne change on-chain.

## Your setup

**Your setup** affiche un abonnement :

- **Active until.** La date de fin, en rouge une fois dépassée.
- **Owner.** Le compte qui détient l'abonnement.
- **Controller.** Le compte que votre Home Assistant utilise pour écrire sur la chaîne. L'intégration Home Assistant le crée ; vous le collez ici.
- **Users.** Les comptes autorisés à piloter la maison. Ajouter ou retirer un utilisateur est une transaction du propriétaire.
- **Subscription backup.** Exporte le setup dans un fichier. Pour passer à un autre navigateur ou appareil, importez ce fichier dans **New setup**.

## Appareils et pilotage

**Devices & Control** ouvre votre tableau de bord Home Assistant dans le navigateur.

- Choisissez un utilisateur et saisissez sa phrase clé. L'application s'en sert pour déchiffrer les données de Home Assistant. Elle reste dans le navigateur.
- Ne cochez **Keep me signed in** que sur un appareil de confiance.
- L'application se connecte directement à Home Assistant, en pair à pair. Quand une connexion directe est impossible, elle passe par un relais. Les données restent chiffrées de bout en bout.

Pour que cette page fonctionne, Home Assistant a besoin de l'intégration Robonomics. [Connecter des appareils](/docs/connect-devices/#home-assistant) indique quelles intégrations existent et à quel point elles sont à jour.

## Arbre des appareils

**Device tree** dans le menu affiche l'[arbre des appareils](/docs/device-tree/) de Robonomics 5.0.

- La page d'accueil liste les nœuds racines et leurs propriétaires.
- Ouvrez un nœud par son numéro ou par le compte de son appareil.
- La page d'un nœud affiche le chemin jusqu'à la racine, le propriétaire, le compte de l'appareil, `meta` et `payload` (JSON et texte sont affichés comme du texte), les enfants et les entrées d'accès.
- Avec un compte connecté, vous pouvez créer un nœud racine, ajouter des enfants aux nœuds qui vous appartiennent et modifier `meta` et `payload` là où vous êtes propriétaire ou avez l'accès `Write`. Tout le contenu de l'arbre est public.

## Datalog

**Send your first record** sur la page d'accueil ouvre la page Datalog.

- Saisissez jusqu'à 512 octets et envoyez. Les frais sont bien inférieurs à 0,001 XRT.
- En dessous, vous voyez les enregistrements de n'importe quel compte, les plus récents d'abord. La chaîne garde les 128 derniers enregistrements par compte.

Datalog est un [pallet historique](/docs/legacy-pallets/#datalog). C'est un bon premier test. Pour les appareils, utilisez l'arbre des appareils.

## Capteurs et jumeaux numériques

- **Altruist.** Ouvrez `robonomics.app/#/altruist/<sensor address>` pour voir les mesures du capteur enregistrées on-chain : particules fines, bruit, température, humidité, et pression en hPa sur son propre axe. Voir [Altruist et sensors.social](/docs/altruist/).
- **Suivi d'énergie.** Ouvrez `robonomics.app/#/energy-monitor/<address>` pour faire de même avec un moniteur d'énergie.
- **Jumeau numérique.** Liste vos jumeaux et les comptes derrière chaque sujet. Voir [DigitalTwin](/docs/legacy-pallets/#digitaltwin).

Si une adresse n'a pas de mesures, la page l'indique au lieu de charger indéfiniment.

## En cas de problème

- **L'application se connecte au mauvais réseau.** L'application retient une adresse de réseau transmise un jour dans un lien. Ouvrez une fois `https://robonomics.app/?rpc=wss://polkadot.rpc.robonomics.network/` pour revenir au bon réseau.
- **Un lien Uniswap affiche un autre jeton.** Le XRT de production sur Ethereum est `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. L'ancien jeton `0x7dE9…1cb7` n'est pas le XRT de production. Voir [XRT sur d'autres réseaux](/docs/xrt-migration/).
- **Le controller ou un utilisateur n'est pas enregistré, ou un abonnement Kusama ne peut pas être géré.** C'est un problème connu, suivi dans les [issues de robonomics.app](https://github.com/airalab/robonomics.app/issues) #213 et #223.
- **Tout le reste.** Ouvrez une issue sur [github.com/airalab/robonomics.app](https://github.com/airalab/robonomics.app/issues). Indiquez la version du build affichée dans la console du navigateur. Elle s'affiche au démarrage de l'application.
