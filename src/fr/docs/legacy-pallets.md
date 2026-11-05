---
title: Pallets historiques
contributors: [PaTara43, nakata5321, LoSk-p, ensrationis]
---

Cinq pallets issus des versions précédentes de Robonomics sont toujours dans le runtime : Datalog, Launch, RWS, DigitalTwin et Liability. Le [README du nœud](https://github.com/airalab/robonomics#readme) les marque comme dépréciés : « following pallets will be removed in near future ». Aucune date de retrait n'a été annoncée.

Ils fonctionnent toujours on-chain, et certaines applications et intégrations les utilisent. Pour un nouveau projet, commencez par l'[arbre des appareils](/docs/device-tree/).

| Pallet | Rôle | Successeur |
|---|---|---|
| Datalog | Stocke de courts enregistrements sous votre compte | Arbre des appareils ; le stockage 5.0 est prévu |
| Launch | Envoie une commande signée à un compte d'appareil | — |
| RWS | Abonnements pour des transactions sans frais | Abonnements 5.0 (en cours) |
| DigitalTwin | Associe les sujets d'un jumeau numérique à des comptes | Arbre des appareils |
| Liability | Accords entre parties, avec un rapport à la fin | — |

## Datalog

Datalog garde de courts enregistrements on-chain sous votre compte. Chaque enregistrement est horodaté.

- `record(record)` ajoute un enregistrement de 512 octets au plus.
- `erase()` supprime tous vos enregistrements.
- Chaque compte garde ses **127 derniers enregistrements**. Les plus anciens sont écrasés. (La fenêtre compte 128 emplacements, et l'un d'eux reste toujours libre.)
- Pour des données plus volumineuses, placez-les sur IPFS et enregistrez le CID.
- La lecture passe par les requêtes de stockage `datalog.datalogIndex(account)`, qui donne le premier et le dernier emplacement, et `datalog.datalogItem([account, slot])`. L'événement est `NewRecord`.
- Il n'y a pas de dépôt, seulement les frais normaux. Au moment de la rédaction, un enregistrement complet de 512 octets coûte environ 0,0006 XRT.
- Avec un abonnement RWS, un enregistrement peut être envoyé sans frais, via `rws.call`.

Qui l'utilise aujourd'hui : le Robonomics Report Service pour Home Assistant, les agents de connectivité de sensors.social, et les graphiques Altruist et de suivi d'énergie dans robonomics.app.

Un pas-à-pas pour un premier enregistrement se trouve dans [Premiers pas](/docs/getting-started/#4-send-your-first-record).

## Launch

Launch envoie une commande signée à un appareil.

- `launch(robot, param)` : `robot` est le compte de l'appareil, `param` fait 32 octets. Une convention courante est d'y placer le condensé d'un CID IPFS.
- L'appareil surveille les événements `NewLaunch(sender, robot, param)` qui portent son adresse.
- N'importe qui peut envoyer un launch à n'importe quelle adresse. L'appareil doit vérifier qui est l'expéditeur.
- Le pallet écrit aussi `param` dans une valeur globale unique `Goal`, que chaque launch, de qui que ce soit, écrase. Utilisez les événements, pas cette valeur de stockage.
- Les frais sont à peu près ceux d'un court enregistrement datalog. Avec un abonnement RWS, l'envoi peut se faire sans frais.

robonomics.app utilise Launch pour piloter Home Assistant, et l'ancien wrapper ROS 2 s'en servait pour démarrer des robots.

<div id="rws-subscriptions"></div>

## Abonnements RWS

RWS (Robonomics Web Services) donne à un compte des transactions sans frais.

- Deux types : `Daily { days }` et `Lifetime { tps }`.
- Un appareil inscrit dans l'abonnement envoie ses appels via `rws.call(subscription_owner, call)` et ne paie pas de frais. La capacité gratuite s'accumule avec le temps. Pour un abonnement Daily, elle s'accumule à 10 000 µTPS, soit l'équivalent de 0,01 transfert simple par seconde.
- `set_devices(devices)` liste jusqu'à 32 comptes d'appareils autorisés à utiliser l'abonnement. La liste entière est remplacée. Seul un appareil listé peut utiliser `rws.call`.
- `transfer(target)` transfère votre abonnement à un compte qui n'en a pas.

### Obtenir un abonnement

- Les abonnements sont vendus aux enchères. `bid(index, amount)` : la première offre doit dépasser 1 XRT. Les offres sont réservées. Les enchères qui ont reçu une offre se clôturent tous les 10 blocs. L'offre gagnante est brûlée et l'abonnement enregistré.
- La page **Buy a subscription** de [robonomics.app](https://robonomics.app) enchérit sur une enchère libre et ajoute votre propre compte comme appareil, en une seule transaction. Il vous faut un solde supérieur au prix plus 0,01 XRT. L'application refuse s'il n'y a pas d'enchère libre.

### État actuel

- Seul Root peut lancer de nouvelles enchères. Comme il n'y a pas de Sudo, chaque nouvelle série d'enchères demande un référendum Root. Les enchères libres peuvent s'épuiser d'ici là.
- Les abonnements émis par l'oracle (par exemple à partir des jetons RWS sur Ethereum, une expérience de 2021) ne sont pas connectés : le compte de l'oracle n'est pas défini. D'après la page tokenomics, RWS sera connecté au réseau de production une fois les soldes XRT de Kusama transférés vers Polkadot, d'abord pour des projets non commerciaux comme sensors.social.
- Le successeur est la Subscription de 5.0. Avec elle, un appareil pourra utiliser le réseau sans détenir lui-même de XRT. Elle est en cours de développement et pas encore dans le runtime.

## DigitalTwin

Un jumeau numérique est une liste de sujets, chacun lié à un compte qui fournit les données correspondantes.

- `create()` crée un jumeau.
- `set_source(id, topic, source)` lie un sujet de 32 octets à un compte source.
- `remove_source(id)` supprime la source.

L'[arbre des appareils](/docs/device-tree/) le remplace.

## Liability

Liability enregistre des accords signés entre parties.

- `create(agreement)` enregistre un accord signé. Sa partie technique pointe vers IPFS.
- `finalize(report)` le clôture avec un rapport.

Le pallet comprend aussi un marché simple pour ce type d'accords. Aucun successeur n'a été annoncé.
