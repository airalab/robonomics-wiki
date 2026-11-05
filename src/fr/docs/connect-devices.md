---
title: Connecter des appareils
contributors: [Fingerling42, nakata5321, ensrationis]
---

Il y a deux façons d'intégrer des appareils à Robonomics : par Home Assistant, ou directement, avec tout appareil capable de signer une transaction ou de communiquer avec une passerelle.

Le matériel prêt à l'emploi et l'installation domotique sont proposés par Pinout Limited. Consultez [pinout.cloud](https://pinout.cloud) pour les produits et services.

## Home Assistant

Il existe trois intégrations Home Assistant. Elles ne font pas la même chose, et elles ne sont pas toutes à jour.

| Intégration | Rôle | État |
|---|---|---|
| [Robonomics Report Service](https://github.com/PinoutLTD/rrs-ha-integration) (Pinout) | Surveille les problèmes dans Home Assistant. Elle chiffre un rapport d'erreur, l'envoie sur IPFS et enregistre son CID on-chain. Le rapport devient un ticket de support chez votre intégrateur. Elle envoie aussi un signal de vie quotidien. | Maintenue. Publiée en préversions. Nécessite Home Assistant 2026.3.1 ou plus récent ; s'installe via HACS comme dépôt personnalisé. |
| [Robonomics integration](https://github.com/airalab/homeassistant-robonomics-integration) (airalab) | Accès à distance à Home Assistant par des transactions chiffrées sous abonnement RWS, plus utilisateurs et sauvegardes. | Plus maintenue. La dernière version est la 2.2.1 d'octobre 2025. Elle utilise l'ancien `robonomics-interface` 1.6.3, nécessite un nœud IPFS local, et ses points d'accès par défaut pointent encore vers Kusama, qui est arrêté. On peut choisir un point d'accès Polkadot. Elle n'a pas été vérifiée avec le runtime actuel. |
| [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration) (airalab) | Lit un capteur Altruist sur le réseau local. Elle n'utilise pas la chaîne. | Petite, locale uniquement. |

L'intégration Robonomics d'airalab dépend des abonnements RWS. Voir [Pallets historiques](/docs/legacy-pallets/#rws-subscriptions) pour leur état actuel.

## N'importe quel appareil

Voici les briques pour connecter votre propre appareil.

1. **Donnez à l'appareil son propre compte.** La clé reste sur l'appareil.
2. **Payez ses transactions.** Envoyez au compte un peu de XRT (au moment de la rédaction, un enregistrement datalog coûte une fraction de millième de XRT), ou ajoutez-le à un abonnement RWS avec `rws.set_devices` (jusqu'à 32 appareils) et envoyez ses transactions via `rws.call`.
3. **Décrivez l'installation dans l'arbre des appareils.** Créez un nœud pour le site et des nœuds pour ses appareils. Liez le compte de l'appareil à son nœud comme identité du nœud. Accordez `Write` à une passerelle si c'est elle qui écrit pour l'appareil. Voir [Arbre des appareils (CPS)](/docs/device-tree/).
4. **Écrivez les données.** Placez l'état actuel dans le `payload` du nœud (jusqu'à 8 Kio), ou écrivez des enregistrements avec `datalog.record` (jusqu'à 512 octets, [historique](/docs/legacy-pallets/#datalog)). Placez les données plus volumineuses sur IPFS et écrivez leur CID.
5. **Envoyez des commandes, si besoin.** L'appel historique `launch` envoie un événement de commande signé à un compte d'appareil. Voir [Launch](/docs/legacy-pallets/#launch).

Bibliothèques pour chaque étape : Python `robonomics-interface`, JavaScript `@polkadot/api`, et Rust `libcps` avec l'outil `cps`. Voir [Bibliothèques clientes](/docs/client-libraries/).

### Passerelles pour petits appareils

Tous les appareils ne peuvent pas communiquer avec la chaîne. Ces passerelles open source font l'intermédiaire :

- **edge** ([airalab/robins](https://github.com/airalab/robins)) : reçoit des messages signés par HTTP et Meshtastic et les relaie via libp2p GossipSub.
- **mqtt-bridge** ([airalab/robins](https://github.com/airalab/robins)) : transforme les messages MQTT en mises à jour de l'arbre des appareils.
- **sensors-connectivity** ([airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)) : collecte les mesures signées des capteurs et les transmet à IPFS pubsub et à la parachain. Il dessert les capteurs de [sensors.social](https://sensors.social).

Les nœuds relais publics et leur état sont visibles sur [pubsub.robonomics.network](https://pubsub.robonomics.network).
