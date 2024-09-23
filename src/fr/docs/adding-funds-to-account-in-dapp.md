---
title: Ajouter des fonds à votre compte sur le portail Robonomics

contributors: [Houman]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Après avoir créé avec succès vos comptes sur le portail Robonomics, il est temps d'y ajouter des fonds afin de pouvoir initier des transactions.**

{% roboWikiNote {title: 'Nœud de développement', type: "warning"} %}Veuillez noter que ce tutoriel et les suivants sont démontrés sur une instance locale du nœud Robonomics. Configurez le vôtre avec [ces instructions](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Accédez à la section Comptes sur le portail Robonomics

{% roboWikiPicture {src:"docs/creating-an-account/portal-top-left.jpg", alt:"comptes"} %}{% endroboWikiPicture %}

## 2. Choisissez le compte à partir duquel vous souhaitez transférer des fonds

En mode développement, il existe plusieurs comptes, avec une valeur de 10000 unités de fonds chacun, qui peuvent être utilisés pour transférer des fonds vers d'autres comptes créés dans le réseau de développement. Ces comptes sont indiqués par des icônes de clé anglaise <img src="/assets/images/docs/adding-funds/wrench.png" alt="icône de clé anglaise" width="20"/> à côté d'eux.

{% roboWikiPicture {src:"docs/adding-funds/accounts-for-sending.svg", alt:"Comptes-pour-envoi", caption: "Comptes-pour-envoi"} %}{% endroboWikiPicture %}

- Cliquez sur le bouton "envoyer" du compte à partir duquel vous souhaitez transférer des fonds, par exemple BOB

## 3. Choisissez le compte vers lequel vous souhaitez transférer des fonds
Après avoir cliqué sur le bouton "envoyer", vous serez invité avec la "fenêtre d'envoi de fonds". Dans la fenêtre affichée :

- Dans la liste des comptes disponibles, choisissez le compte vers lequel vous souhaitez envoyer des fonds.
- Entrez le nombre d'unités que vous souhaitez envoyer.
- Appuyez sur "effectuer le transfert"

{% roboWikiPicture {src:"docs/adding-funds/send-funds.png", alt:"Transfert-de-fonds", caption: "Transfert-de-fonds"} %}{% endroboWikiPicture %}

## 4. Autorisez la transaction

Après avoir appuyé sur "effectuer le transfert" à l'étape précédente, vous serez invité avec la "fenêtre d'autorisation de transaction".<br/>
Vérifiez les détails de la transaction et cliquez enfin sur le bouton "signer et soumettre".

{% roboWikiPicture {src:"docs/adding-funds/sign-transaction.png", alt:"signer-transaction", caption: "signer-transaction"} %}{% endroboWikiPicture %}

Dans cet exemple, nous avons transféré 500 unités de fonds de "BOB" à "EMPLOYEUR". Vous pouvez voir que le compte de l'EMPLOYEUR, qui n'avait initialement aucun fonds, a maintenant 500 unités de fonds.

{% roboWikiPicture {src:"docs/adding-funds/funds-added.svg", alt:"fonds-ajoutés", caption: "fonds-ajoutés"} %}{% endroboWikiPicture %}

**Assurez-vous d'avoir suffisamment de fonds dans les comptes que vous souhaitez utiliser dans l'application.**