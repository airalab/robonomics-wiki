---
title: XRT et gouvernance
contributors: [Leemo94, ensrationis]
---

XRT est le jeton du réseau Robonomics. Il sert à payer le cloud et à voter sur l'évolution du réseau. Cette page traite des deux.

## À quoi sert le XRT

- **Frais.** Chaque transaction paie des frais en XRT. Tous les frais et pourboires vont dans la cagnotte des collators.
- **Abonnements.** Les abonnements actuels (RWS) s'obtiennent aux enchères, et l'offre gagnante est brûlée. Voir [Pallets historiques](/docs/legacy-pallets/#rws-subscriptions).
- **Votes.** Les détenteurs de XRT tranchent les référendums.
- **Caution de collator.** Un candidat collator bloque des XRT en caution. Voir [Faire tourner un collator](/docs/run-collator/).

## Unités et offre

- Le XRT a 9 décimales. 1 XRT = 1 000 Glushkov (mXRT) = 1 000 000 Coase (µXRT).
- Le dépôt existentiel est de 1 Coase, soit 0,000001 XRT.
- Le runtime frappe 0,0042 XRT pour l'auteur de chaque bloc, en récompense de collator. La tokenomics limite l'émission pour les collators à 25 000 XRT par an au maximum.
- La tokenomics plafonne l'offre à 5 100 000 XRT. La répartition et le cycle de vie du jeton sont décrits sur la [page tokenomics](https://robonomics.network/tokenomics/).

Le XRT existe aussi sur Ethereum et sur Polkadot Asset Hub. Voir [XRT sur d'autres réseaux](/docs/xrt-migration/).

## Gouvernance

Robonomics utilise l'OpenGov standard de Polkadot. Il n'y a pas de clé Sudo : depuis le runtime 52 (octobre 2026), toute modification privilégiée, y compris une mise à jour du runtime, exige un référendum. Sudo lui-même a été supprimé par référendum. Il n'y a ni conseil, ni fellowship, ni track de trésorerie.

Un référendum est adopté quand deux seuils sont atteints en même temps :

- **Approval** : la part de « aye » parmi les votes exprimés.
- **Support** : la part de tous les XRT qui ont voté « aye ».

Les deux partent haut et baissent au cours de la période de décision. Quand un référendum est adopté et le reste pendant sa période de confirmation, l'appel est exécuté.

### Tracks

| | Root | Whitelisted Caller |
|---|---|---|
| Usage | Mises à jour du runtime et tout autre appel privilégié : caution et limites des collators, enchères RWS, configuration | Une voie rapide pour un appel précis que la Core Team a mis sur liste blanche |
| Référendums en décision simultanément | 1 | 10 |
| Dépôt de décision | 5 000 XRT | 1 XRT |
| Période de préparation | 12 heures | 5 minutes |
| Période de décision | 14 jours | 3 jours |
| Période de confirmation | 24 heures | 20 minutes |
| Délai minimal d'exécution | 1 heure | 5 minutes |
| Approval | 90 % → 51 % sur la période de décision | 99 % → 80 % |
| Support | 50 % → 15 % | 2 % → 1 % |

Ce sont les valeurs du runtime actuel. Les modifier demande un référendum Root.

### Autres dépôts

- **Dépôt de soumission :** 10 XRT. N'importe quel compte peut soumettre un référendum.
- **Dépôt de preimage :** 100 XRT plus 0,00001 XRT par octet de l'appel. Le code du runtime indique que ces valeurs sont provisoires, elles peuvent donc changer.
- Un référendum qui n'est pas entré en décision dans les 14 jours expire.

### Core Team et liste blanche

La Core Team est un petit collectif de 7 membres au plus. Seul un référendum Root peut modifier sa composition.

La liste blanche fonctionne ainsi :

1. La Core Team vote pour mettre sur liste blanche le hash d'un appel précis. Au moins la moitié de tous les membres doit être d'accord. Une motion de la Core Team dure 3 jours.
2. La mise sur liste blanche n'exécute rien. L'appel a toujours besoin d'un référendum sur le track Whitelisted Caller.
3. Un appel qui n'est pas sur liste blanche ne peut pas passer par la voie rapide. Il peut toujours passer par le track Root.

Il y a donc deux façons de faire une modification privilégiée : un référendum Root, ou un appel sur liste blanche suivi d'un référendum rapide. Les deux se terminent par un vote des détenteurs de XRT.

<div id="how-to-propose-a-change"></div>

## Proposer une modification

Les étapes publiées par l'équipe :

1. Décrivez l'idée dans une issue sur [airalab/robonomics](https://github.com/airalab/robonomics/issues).
2. Soumettez un référendum dans Polkadot.js Apps, dans la section Governance, connecté au réseau Robonomics.
3. Informez-en la communauté.

Ce qui se passe on-chain :

1. L'appel est stocké sous forme de preimage (dépôt de preimage).
2. Le référendum est soumis sur un track (dépôt de soumission de 10 XRT).
3. Quelqu'un place le dépôt de décision : 5 000 XRT sur Root, 1 XRT sur Whitelisted Caller. N'importe qui peut le placer.
4. Le référendum entre en décision après la période de préparation, dès que le dépôt de décision est en place et que le track a une place libre. Le vote le tranche ensuite pendant la période de décision.

## Voter

- Gardez vos XRT dans votre propre portefeuille sur le réseau Robonomics. Les jetons détenus sur une plateforme d'échange ne peuvent pas voter.
- Votez avec conviction : plus vous bloquez vos XRT longtemps, plus votre vote pèse.

| Blocage | Poids du vote |
|---|---|
| Aucun blocage | 0,1× |
| 7 jours | 1× |
| 14 jours | 2× |
| 28 jours | 3× |
| 56 jours | 4× |
| 112 jours | 5× |
| 224 jours | 6× |

- Au lieu de voter vous-même, vous pouvez déléguer votre pouvoir de vote à un autre compte.

Les référendums en cours et passés sont visibles dans Polkadot.js Apps, dans la section Governance, une fois connecté au [RPC Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer).

## Pour aller plus loin

- [Robonomics 5.0: handing the keys to XRT holders](https://robonomics.network/blog/robonomics-5-0-governance/)
- [Sudo is gone: the Robonomics cloud is now run by its community](https://robonomics.network/blog/robonomics-5-0-sudo-removed/)
- [Discussion sur le forum à propos du modèle à deux tracks](https://forum.polkadot.network/t/robonomics-replacing-sudo-with-a-two-track-opengov-sized-for-a-small-community/18719)
