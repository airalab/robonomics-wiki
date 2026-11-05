---
title: XRT sur d'autres réseaux
contributors: [nakata5321, ensrationis]
---

Le XRT de production se trouve sur la parachain Robonomics sur Polkadot. Cette page explique ce qu'il advient du XRT sur Kusama et sur Ethereum, et où le XRT existe sur Polkadot Asset Hub.

## Kusama

La parachain Robonomics sur Kusama est arrêtée. Elle a produit son dernier bloc, le n° 12 268 835, le 28 septembre 2026. Une archive de la base de données est disponible sur [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama).

Ce que disent les articles publiés sur le XRT de Kusama :

- Tous les soldes XRT au dernier bloc sont transférés vers Polkadot avec un **bonus de 20 %**.
- Il n'y a **pas de rachat** côté Kusama.
- Un article séparé expliquera où les soldes apparaîtront sur Polkadot et si les détenteurs doivent faire quelque chose.

Surveillez le [blog Robonomics](https://robonomics.network/blog/) pour cet article. Sources : [The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/) et la [page tokenomics](https://robonomics.network/tokenomics/).

## Ethereum

L'ancien jeton XRT sur Ethereum (`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`) est déprécié. Le 5 février 2026, son mécanisme d'émission a été exploité pour frapper des jetons gratuitement. Le XRT sur Polkadot et Kusama n'a pas été touché.

Les détenteurs de l'ancien jeton au moment du snapshot (bloc Ethereum 24 390 081) peuvent migrer :

1. Ouvrez l'application de migration : [airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/).
2. Connectez le portefeuille qui détenait des XRT le 5 février 2026. L'application affiche votre solde au snapshot et le montant avec le bonus.
3. Choisissez une option. Chaque adresse ne peut choisir qu'une fois.
   - **Accept** : recevoir du XRT de production sur Ethereum, soit votre solde au snapshot plus 20 %.
   - **Decline** : rejoindre plutôt le programme de rachat, à un prix de référence de 2,20 $, payé sur 12 à 36 mois et seulement dans la mesure où les fonds de la trésorerie le permettent.

Avant de signer, vérifiez que l'application s'adresse au contrat de réclamation `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c`. Son code source est sur [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts).

Vous recevez du XRT de production sur Ethereum, contrat `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. C'est du XRT transféré 1:1 depuis Polkadot par [Snowbridge](https://app.snowbridge.network/send). Vous pouvez le conserver, l'échanger sur Uniswap ou le transférer vers Polkadot. Il n'existe pas de pont de l'ancien jeton vers le nouveau.

Les articles fixent une fenêtre de 12 mois pour la migration. Les XRT non réclamés à temps ne peuvent être restitués que par un vote de gouvernance on-chain, avec une preuve de propriété. Les conditions exactes sont dans les articles : [Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/) et [Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/).

Questions : le groupe Telegram [XRT Traders](https://t.me/xrt_trade).

## Polkadot Asset Hub

Le XRT existe sur Polkadot Asset Hub comme actif étranger, et il y a un pool d'échange DOT–XRT. Les frais sur Asset Hub peuvent être payés en XRT.

Aucun guide utilisateur n'a encore été publié pour transférer des XRT entre Asset Hub et la parachain Robonomics.
