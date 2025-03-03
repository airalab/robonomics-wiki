---
title: Configuration de l'Altruist
contributors: [tubleronchik]
---

**Ce guide vous guide à travers la configuration et l'activation d'un capteur Altruist Outdoor. Vous connecterez le capteur au Wi-Fi, configurerez son emplacement et activerez un abonnement en utilisant des jetons XRT. De plus, des instructions pour intégrer le capteur avec Home Assistant via HACS ou une installation manuelle sont fournies.**

{% roboWikiNote {type: "warning"}%} Tous les appareils de Robonomics peuvent être achetés sur le [site officiel](https://robonomics.network/devices/).{% endroboWikiNote %}

## Activer l'abonnement Robonomics

{% roboWikiNote {type: "okay"} %}Pour compléter cette étape, assurez-vous d'avoir au moins 2-3 jetons XRT dans votre compte `Robonomics Polkadot`.{% endroboWikiNote %}

1) Accédez à la [page d'abonnement](https://robonomics.app/#/rws-buy) de l'application Robonomics. 
2) Cliquez sur **Compte** et connectez votre portefeuille. Votre adresse de compte et votre solde seront affichés.
Si vous n'avez pas de compte, suivez [ce guide](https://wiki.robonomics.network/docs/create-account-in-dapp/) pour en créer un.

{% roboWikiPicture {src:"docs/altruist/altruist_syb_buy.jpg", alt:"page d'abonnement"} %}{% endroboWikiPicture %}

3) Cliquez sur `ACHETER UN ABONNEMENT` et signez la transaction. **Attendez que le processus d'activation soit terminé**. 
4) Une fois activé, vous serez redirigé vers la **page de configuration**, où vous pourrez voir le nom de votre abonnement et sa date d'expiration.

{% roboWikiPicture {src:"docs/altruist/altruist_setup_page.jpg", alt:"page de configuration de l'abonnement"} %}{% endroboWikiPicture %}

5) **Enregistrez l'adresse de votre compte** — vous en aurez besoin lors de la configuration du capteur. Vous pouvez la copier depuis la section "PROPRIÉTAIRE" ou en cliquant sur le nom de votre compte dans le coin supérieur droit et en sélectionnant le bouton de copie.

## Configuration du capteur

{% roboWikiNote {type: "warning", title: "INFO"}%} Le capteur ne peut être connecté qu'à un réseau Wi-Fi 2,4 GHz.{% endroboWikiNote %}

1) **Branchez le capteur** à une prise électrique.
2) La carte créera un réseau Wi-Fi nommé Altruist-xxxxxxxxx. Connectez-vous à celui-ci depuis votre téléphone ou votre ordinateur. Vous devriez être automatiquement invité à ouvrir la fenêtre d'autorisation. 
- Si ce n'est pas le cas, ouvrez un navigateur et allez à 192.168.4.1.

{% roboWikiPicture {src:"docs/altruist/on_board.png", alt:"altruist-capteur"} %}{% endroboWikiPicture %}

3) **Configurez les paramètres Wi-Fi** :
- Sélectionnez votre réseau Wi-Fi dans la liste ou entrez-le manuellement s'il n'apparaît pas.
- Entrez le mot de passe dans le champ "PARAMÈTRES WI-FI".

4) **Entrez vos détails Robonomics** :
- Collez l'adresse du propriétaire RWS que vous avez copiée précédemment dans le champ désigné. 

5) **Définissez l'emplacement du capteur** :
- Entrez les coordonnées du site d'installation du capteur.
- Vous pouvez trouver les coordonnées en utilisant des cartes en ligne ou convertir une adresse en latitude/longitude en utilisant [ce lien.](https://www.latlong.net/convert-address-to-lat-long.html)

{% roboWikiNote {type: "warning", title: "AVERTISSEMENT"}%}Les coordonnées du capteur seront ensuite affichées sur une carte accessible au public. Si vous ne souhaitez pas montrer vos informations privées, indiquez des coordonnées proches, mais pas exactes.{% endroboWikiNote %}

{% roboWikiPicture {src:"docs/altruist/sensor_setup.png", alt:"altruist-sensor-wifi"} %}{% endroboWikiPicture %}

6) **Copiez l'"Adresse Robonomics" d'Altruist** :
- Vous la trouverez en haut de la page. Enregistrez-la pour l'étape finale.

{% roboWikiPicture {src:"docs/altruist/address.jpg", alt:"adresse altruist"} %}{% endroboWikiPicture %}

7) Cliquez sur "**Enregistrer la configuration et redémarrer**" en bas de la page. La carte redémarrera et se connectera au réseau Wi-Fi spécifié.

## Activation d'Altruist
La dernière étape du processus de configuration consiste à ajouter l'**adresse Altruist** à votre **Abonnement Robonomics**.

1) Retournez à la [page de configuration](https://robonomics.app/#/rws-setup).

2) Faites défiler jusqu'à la section "**Utilisateurs dans l'abonnement**".

3) Dans le champ "**Ajouter un utilisateur**", collez l'**adresse Robonomics Altruist** que vous avez copiée précédemment.

{% roboWikiPicture {src:"docs/altruist/add_user.jpg", alt:"ajouter un utilisateur"} %}{% endroboWikiPicture %}

4) Cliquez sur le **bouton plus (+)** et signez le message.

5) Attendez que l'opération soit terminée.

C'est tout ! Votre configurationest maintenant terminé. 🎉

Vous pouvez maintenant trouver votre Altruiste sur la carte [Robonomics Sensors Social](https://sensors.social/#). 🚀

{% roboWikiPicture {src:"docs/altruist/map.jpg", alt:"carte des capteurs"} %}{% endroboWikiPicture %}

## Home Assistant

Il existe deux façons d'ajouter **Altruiste** à **Home Assistant** :

### Option 1 : HACS (Recommandé)

La façon la plus simple d'ajouter **Altruiste** est via **HACS**. Vous pouvez trouver un guide d'installation rapide [ici](https://hacs.xyz/docs/use/)

**Étapes** :
1) Une fois HACS installé, ouvrez-le.

2) Cliquez sur les **trois points** dans le coin supérieur droit et sélectionnez "**Dépôts personnalisés**".

3) Dans la fenêtre pop-up, entrez l'URL suivante :

```
https://github.com/airalab/altruist-homeassistant-integration
```
4) Définissez le type sur "**Intégration**" et cliquez sur "**AJOUTER**".

{% roboWikiPicture {src:"docs/altruist/hacs.jpg", alt:"ajout altruiste"} %}{% endroboWikiPicture %}

5) Recherchez l'intégration **Altruist Sensor**.

6) Cliquez sur le bouton **Télécharger**, puis redémarrez **Home Assistant** une fois l'intégration installée.

{% roboWikiPicture {src:"docs/altruist/integration.jpg", alt:"altruiste-hacs"} %}{% endroboWikiPicture %}

### Option 2 : Installation manuelle

1) Sous l'utilisateur `homeassistant`, clonez le dépôt du projet :

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/airalab/altruist-homeassistant-integration.git
```

{% endcodeHelper %}

2) Si vous avez déjà des intégrations personnalisées, déplacez le dossier `altruist` dans votre répertoire `custom_components` :

{% codeHelper { copy: true}%}

```
cd altruist-homeassistant-integration
mv custom_components/altruist ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

3) Si vous **n'avez pas** d'intégrations personnalisées, déplacez l'intégralité du répertoire custom_components :

{% codeHelper { copy: true}%}

 ```
cd altruist-homeassistant-integration
mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Configuration

Après l'installation et le redémarrage de Home Assistant, l'intégration détectera automatiquement Altruist sur votre réseau.

1) Allez dans **Paramètres → Appareils & Services**.

2) Ajoutez le **Capteur Altruist**.

{% roboWikiPicture {src:"docs/altruist/add_altruist.jpg", alt:"découvrir altruist"} %}{% endroboWikiPicture %}

C'est tout ! 🚀 Votre Capteur Altruist est maintenant intégré à Home Assistant.