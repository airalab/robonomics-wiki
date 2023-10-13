---
title: Ajouter des fonds à votre compte sur le portail Robonomics

contributors: [Houman]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Après avoir créé avec succès vos comptes sur le portail Robonomics, il est temps d'y ajouter des fonds afdans de pouvoir initier des transactions.**

<robo-wiki-note type="warning" title="Dev Node">

Veuillez noter que ces tutoriels, ainsi que les suivants, sont démontrés sur une instance locale de Robonomics Node. Configurez la vôtre avec [ces instructions](/docs/run-dev-node).

</robo-wiki-note>

## 1. Accédez à la section Comptes sur le portail Robonomics 

![Accounts](../images/creating-an-account/portal-top-left.jpg "Accounts")

## 2. Choisissez le compte à partir duquel vous souhaitez transférer des fonds

En mode développement, il existe plusieurs comptes, avec 10000 unités de fonds chacun, qui peuvent être utilisés pour transférer des fonds vers d'autres comptes créés dans le réseau de développement. Ces comptes sont indiqués par des icônes de clé anglaise <img alt="wrench sign" src="../images/adding-funds/wrench.png" width="20" /> à côté d'eux.

![Accounts-for-sending](../images/adding-funds/accounts-for-sending.svg "Accounts-for-sending")

- Cliquez sur le bouton "envoyer" du compte à partir duquel vous souhaitez transférer des fonds, par exemple BOB

## 3. Choisissez le compte dans lequel vous souhaitez transférer des fonds
Après avoir cliqué sur le bouton "envoyer", vous serez invité avec la fenêtre "envoyer des fonds". Dans la fenêtre affichée :

- Choisissez le compte dans la liste des comptes disponibles vers lequel vous souhaitez envoyer des fonds.
- Saisissez le nombre d'unités que vous souhaitez envoyer.
- Appuyez sur "effectuer le transfert"

![Transfer-Funds](../images/adding-funds/send-funds.png "Transfer-Funds")

## 4. Autorisez la transaction

Après avoir appuyé sur "effectuer le transfert" à l'étape précédente, vous serez invité avec la fenêtre "autoriser la transaction".<br/>
Vérifiez les détails de la transaction et cliquez enfin sur le bouton "signer et soumettre".

![sign-transaction](../images/adding-funds/sign-transaction.png "sign-transaction")
Dans cet exemple, nous avons transféré 500 unités de fonds de "BOB" à "EMPLOYER". Vous pouvez voir que le compte de EMPLOYER, qui n'avait initialement aucun fonds, dispose maintenant de 500 unités de fonds.

![funds-added](../images/adding-funds/funds-added.svg "funds-added")

**Assurez-vous d'avoir suffisamment de fonds dans les comptes que vous souhaitez utiliser dans l'aire de jeu.**