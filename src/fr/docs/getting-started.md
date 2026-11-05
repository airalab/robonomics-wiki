---
title: Premiers pas
contributors: [Vourhey, positivecrash, ensrationis]
---

Cette page vous mène de zéro à votre premier enregistrement sur le réseau Robonomics. Il vous faut un navigateur, une extension de portefeuille et un peu de XRT.

## 1. Créer un compte

1. Installez l'[extension Polkadot.js](https://polkadot.js.org/extension/) ou un autre portefeuille Polkadot qui sait se connecter à un réseau personnalisé.
2. Créez un compte dans le portefeuille. Notez la phrase de récupération et gardez-la hors ligne.
3. Le même compte fonctionne sur Robonomics. Robonomics affiche les adresses dans son propre format (préfixe SS58 32), donc votre adresse y commence par `4`.

Un compte n'existe on-chain que s'il détient au moins le dépôt existentiel, soit 0,000001 XRT.

## 2. Obtenir des XRT

Il en faut très peu. Au moment de la rédaction, un enregistrement datalog coûte bien moins de 0,001 XRT de frais.

Où s'échange le XRT aujourd'hui :

- **Uniswap sur Ethereum.** Le XRT de production sur Ethereum est du XRT transféré depuis Polkadot par Snowbridge. Son contrat est `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. [Échanger sur Uniswap](https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x1f752250f518e419f2f03804e25728c5c6dff73f). [Snowbridge](https://app.snowbridge.network/send) transfère les jetons entre Ethereum et Polkadot.
- **Polkadot Asset Hub.** Le XRT existe sur Asset Hub, avec un pool d'échange DOT–XRT.

Envoyer des XRT depuis Asset Hub vers votre compte sur la parachain Robonomics est un transfert cross-chain. Aucun guide pas à pas n'a encore été publié. Si vous êtes bloqué, posez la question dans le groupe Telegram [XRT Traders](https://t.me/xrt_trade).

{% roboWikiNote {type: "warning", title: "Anciens liens"}%} Certaines pages anciennes renvoient encore vers des plateformes d'échange qui ne listent plus le XRT, et vers l'ancien jeton Ethereum `0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`. L'ancien jeton n'est pas le XRT de production. {% endroboWikiNote %}

## 3. Se connecter à Polkadot.js Apps

Ouvrez [Polkadot.js Apps avec le RPC Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer). L'application se connecte au point d'accès public `wss://polkadot.rpc.robonomics.network/`. Autorisez le site dans votre extension de portefeuille pour que votre compte apparaisse.

Pour consulter les blocs, les comptes et les transferts, vous pouvez aussi utiliser l'explorateur de blocs [scan.robonomics.network](https://scan.robonomics.network).

<div id="4-send-your-first-record"></div>

## 4. Envoyer votre premier enregistrement

Le premier pas le plus simple est un enregistrement datalog : une courte donnée stockée on-chain sous votre compte.

1. Dans Polkadot.js Apps, ouvrez **Developer → Extrinsics**.
2. Choisissez votre compte, puis `datalog` et `record`.
3. Saisissez vos données, jusqu'à 512 octets. Du texte brut convient.
4. Envoyez la transaction et signez-la dans le portefeuille.

Pour la relire, ouvrez **Developer → Chain state**, choisissez `datalog` et `datalogIndex`, puis interrogez votre compte. Vous voyez quels emplacements contiennent vos enregistrements. Interrogez ensuite `datalogItem` avec votre compte et un numéro d'emplacement. Chaque enregistrement est horodaté.

Datalog fait partie des [pallets historiques](/docs/legacy-pallets/#datalog). Il fonctionne toujours et convient bien pour un premier test, mais les nouveaux projets devraient utiliser l'arbre des appareils.

## 5. Ensuite : décrire vos appareils

Le cœur de Robonomics est l'arbre des appareils. Vous créez un nœud pour votre installation, ajoutez des nœuds pour ses parties et ses appareils, et décidez qui peut les mettre à jour. Voir [Arbre des appareils (CPS)](/docs/device-tree/), puis [Connecter des appareils](/docs/connect-devices/).
