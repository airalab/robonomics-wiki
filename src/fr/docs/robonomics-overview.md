---
title: Aperçu
contributors: [ensrationis]
---

Robonomics est un cloud pour appareils sur Polkadot. Vous y gardez une description de vos appareils et leur état actuel, vous y écrivez des mesures et vous envoyez des commandes. Vous payez en XRT, le jeton du réseau. Aucune entreprise ne gère seule ce cloud : des collators indépendants le font tourner, et les détenteurs de XRT le gouvernent par des votes on-chain.

## Les briques principales

- **Arbre des appareils (CPS).** Un arbre de nœuds qui décrit votre installation : un bâtiment, ses pièces, les appareils qu'elles contiennent. Chaque nœud contient une courte description et l'état actuel. Le propriétaire décide qui peut écrire dans quelle partie de l'arbre. C'est aujourd'hui le cœur de Robonomics. Voir [Arbre des appareils (CPS)](/docs/device-tree/).
- **XRT.** Le jeton. Il sert à payer les frais de transaction et les abonnements, et les détenteurs de XRT votent avec. Voir [XRT et gouvernance](/docs/xrt-and-governance/).
- **Gouvernance.** OpenGov standard de Polkadot, avec deux tracks. Il n'y a pas de clé Sudo : toute modification privilégiée, y compris une mise à jour du runtime, passe par un référendum.
- **Collators.** Les serveurs qui produisent les blocs. N'importe qui peut devenir candidat en bloquant des XRT en caution. Voir [Faire tourner un collator](/docs/run-collator/).

Des briques plus anciennes (Datalog, Launch, abonnements RWS, Digital Twin, Liability) fonctionnent toujours, mais elles sont dépréciées. Voir [Pallets historiques](/docs/legacy-pallets/).

## Le réseau

| | |
|---|---|
| Réseau | Parachain Robonomics sur Polkadot |
| Para ID | 3388 |
| Jeton | XRT, 9 décimales |
| Format d'adresse | Préfixe SS58 32 (les adresses commencent par `4`) |
| Temps de bloc | 6 secondes (cible) |
| RPC public | `wss://polkadot.rpc.robonomics.network/` |
| Explorateur de blocs | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [ouvrir avec le RPC Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

Polkadot est le seul réseau Robonomics en service. La parachain sur Kusama est arrêtée. Voir [XRT sur d'autres réseaux](/docs/xrt-migration/).

## Ce qui est en construction

Robonomics 5.0 construit le cloud par couches. La gouvernance et l'arbre des appareils, avec Scope et Access, sont en service. Les abonnements sont en cours de développement : un appareil pourra utiliser le réseau sans détenir lui-même de XRT. Le stockage et le calcul sont prévus, mais il n'y a pas encore de code pour eux.

Pour en savoir plus, lisez l'article de blog [Robonomics 5.0, part one](https://robonomics.network/blog/robonomics-5-0-runtime-first/) et la [feuille de route 5.0](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md).

## Logiciels et mainteneurs

Tous les logiciels Robonomics sont open source :

- [airalab/robonomics](https://github.com/airalab/robonomics) : le runtime et ses pallets.
- [airalab/robins](https://github.com/airalab/robins) : des outils, dont l'outil en ligne de commande `cps` et des passerelles pour appareils.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface) : la bibliothèque Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app) : l'application web [robonomics.app](https://robonomics.app).

Il n'existe pas de programme de nœud propre à Robonomics. Les collators font tourner `polkadot-omni-node`, le nœud générique de Parity, avec la chain spec de Robonomics.

Les sites web de Robonomics, y compris ce wiki, sont exploités par Akagi Engineering Co., Ltd. (Japon). Les actualités et les notes de version sont sur le [blog Robonomics](https://robonomics.network/blog/).
