---
title: Arbre des appareils (CPS)
contributors: [ensrationis]
---

L'arbre des appareils décrit votre installation dans le cloud Robonomics : un site, ses pièces, les appareils qu'elles contiennent. Chaque élément est un nœud. La chaîne conserve la structure de l'installation et le dernier état de chaque nœud. Elle n'est pas faite pour stocker de gros volumes de données.

Dans le runtime, l'arbre des appareils est le pallet `CPS` (systèmes cyber-physiques). Référence technique complète : [README du pallet CPS](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md).

## Nœuds

- Chaque nœud a un numéro (`NodeId`). Les numéros augmentent un par un et ne sont jamais réutilisés.
- Un nœud peut avoir un parent. Un nœud sans parent est un nœud racine.
- Un nœud contient deux champs, tous deux facultatifs :
  - `meta` : une description qui change rarement, jusqu'à 1 Kio.
  - `payload` : l'état actuel, jusqu'à 8 Kio.
- Les deux champs sont de simples octets. Vous choisissez le format, par exemple JSON.
- Le parent d'un nœud ne change jamais. Pour déplacer un nœud, créez-en un nouveau et supprimez l'ancien.
- Un nœud peut avoir au plus 100 enfants. Seul un nœud sans enfants peut être supprimé.

<!-- -->

{% roboWikiNote {type: "warning", title: "Les données sont publiques"}%} Tout le contenu de l'arbre des appareils est lisible par n'importe qui. Chiffrez les données avant de les écrire si elles doivent rester privées. L'outil `cps` de [airalab/robins](https://github.com/airalab/robins) peut chiffrer pour vous. {% endroboWikiNote %}

## Scope

Un Scope est la partie de l'arbre qui appartient à un compte.

- Quand vous créez un nœud racine, vous créez aussi un Scope, et il vous appartient.
- Chaque nœud appartient à la racine de Scope la plus proche au-dessus de lui, ou à son propre Scope s'il est lui-même une racine de Scope.
- Vous pouvez faire d'un nœud de votre arbre la racine d'un nouveau Scope imbriqué. Un Scope imbriqué est une frontière stricte : le propriétaire extérieur et les droits d'accès extérieurs n'ont aucun effet à l'intérieur. Une exception : le propriétaire du Scope qui l'entoure directement peut le remplacer.
- Le propriétaire d'un Scope ne change jamais. Pour céder un Scope, on le remplace : un compte autorisé à créer un Scope sur son nœud racine appelle `create_scope`. Cela donne un nouvel identifiant de Scope, l'appelant en devient propriétaire, et toutes les anciennes entrées d'accès sont supprimées.
- Un Scope a au plus 32 nœuds de profondeur, comptés d'un nœud jusqu'à sa racine de Scope. L'arbre entier peut être plus profond.
- Un Scope ne disparaît que lorsque son nœud racine est supprimé.

## Accès

Le propriétaire d'un Scope peut tout faire à l'intérieur. Les autres comptes ont besoin d'une entrée d'accès, que seul le propriétaire peut accorder.

| Droit | Permet |
|---|---|
| `Write` | `set_meta` et `set_payload` |
| `CreateScope` | `create_scope` |

- Une entrée s'applique dans l'un de deux modes : `Node` (un seul nœud) ou `Subtree` (le nœud et tout ce qui se trouve en dessous, sauf à l'intérieur des Scopes imbriqués).
- Un Scope contient au plus 32 entrées d'accès.
- Créer des enfants, supprimer des nœuds, accorder ou retirer un accès ne peut pas être délégué. Seul le propriétaire peut le faire.

D'autres droits (pour les transactions, le stockage et le calcul) sont prévus dans la feuille de route 5.0. Ils ne sont pas encore dans le runtime.

## Comptes de nœud

Un nœud peut être lié à un compte, son identité. C'est généralement la clé propre de l'appareil. Un compte ne peut être l'identité que d'un seul nœud, ce qui permet de retrouver un nœud à partir du compte de son appareil.

- Seul le propriétaire du Scope peut définir ou effacer une identité. L'accès `Write` ne suffit pas.
- Si l'identité n'est pas l'appelant, le compte d'identité doit signer un permis. Le permis est l'encodage SCALE de `(b"robonomics:cps:node-identity:v1", genesis_hash, scope_id, valid_until)`, signé comme octets bruts sans enveloppe `<Bytes>`.
- Un permis est valable au plus un jour (14 400 blocs). Il n'est pas consommé : il fonctionne dans son Scope jusqu'à son expiration. Remplacer le Scope invalide les anciens permis.
- Un nouveau nœud racine n'accepte comme identité que le compte de l'appelant lui-même.
- Supprimer un nœud supprime son identité.

## Appels

Polkadot.js affiche ces noms en camelCase, par exemple `cps.createNode`.

| Appel | Arguments | Qui peut l'appeler |
|---|---|---|
| `create_node` | `parent_id` (facultatif), `meta` (facultatif), `payload` (facultatif), `identity` (facultatif : un compte et, si besoin, un permis) | Nœud racine : n'importe quel compte, qui devient propriétaire du Scope. Nœud enfant : le propriétaire du Scope du parent. |
| `set_meta` | `node_id`, `meta` (`None` le supprime) | Titulaire de `Write` |
| `set_payload` | `node_id`, `payload` (`None` le supprime) | Titulaire de `Write` |
| `delete_node` | `node_id` | Propriétaire du Scope. Le nœud ne doit pas avoir d'enfants. Supprimer une racine de Scope supprime le Scope et ses entrées d'accès. |
| `create_scope` | `node_id` | Titulaire de `CreateScope`. À la racine d'un Scope imbriqué, également le propriétaire du Scope qui l'entoure. |
| `grant_access` | `node_id`, `principal`, `capability` (`Write` ou `CreateScope`), `mode` (`Node` ou `Subtree`) | Propriétaire du Scope |
| `revoke_access` | `node_id`, `principal`, `capability` | Propriétaire du Scope |
| `set_identity` | `node`, `identity`, `permit` (facultatif) | Propriétaire du Scope |
| `clear_identity` | `node` | Propriétaire du Scope |

Événements : `NodeCreated`, `MetaSet`, `PayloadSet`, `NodeDeleted`, `ScopeCreated`, `ScopeDeleted`, `AccessGranted`, `AccessRevoked`, `IdentitySet`, `IdentityCleared`.

## Lire l'arbre

- Les lectures simples sont des requêtes de stockage : `cps.nodes`, `cps.meta`, `cps.payload`, `cps.children`.
- Le pallet a aussi des fonctions de vue (elles nécessitent les métadonnées V16, que la chaîne fournit) :
  - par numéro de nœud : `resolve_scope`, `has_capability`, `identity_of`, `node_by_identity` ;
  - par compte d'appareil : `parent`, `children`, `meta`, `payload`, `scope_of`, `address_capability`. Elles échouent avec `MissingProjectedIdentity` si un nœud du résultat n'a pas d'identité.
- En JavaScript, les fonctions de vue sont `api.view.cps.*`, ce qui demande une version de `@polkadot/api` qui les prend en charge. En Rust, elles se trouvent dans le crate typé `robonomics-runtime-subxt-api`.

## Limites et frais

| Limite | Valeur |
|---|---|
| Taille de `meta` | 1 024 octets |
| Taille de `payload` | 8 192 octets |
| Profondeur d'un Scope | 32 nœuds |
| Enfants par nœud | 100 |
| Entrées d'accès par Scope | 32 |
| Durée de validité d'un permis d'identité | 1 jour (14 400 blocs) |

Ce sont des constantes du runtime. Les modifier demande une mise à jour du runtime.

L'arbre des appareils ne demande aucun dépôt de stockage. Vous payez les frais de transaction normaux, qui augmentent avec la taille des données. Par exemple, au moment de la rédaction, un nœud racine avec 100 octets de `meta` et 100 octets de `payload` coûte environ 0,0003 XRT.

## Outils

- L'outil en ligne de commande `cps` et la bibliothèque Rust `libcps` couvrent tout l'arbre des appareils. Voir [Bibliothèques clientes](/docs/client-libraries/#cps-command-line-tool).
- Tout client capable d'envoyer des extrinsics fonctionne aussi, par exemple `@polkadot/api`.
- Pour les appareils qui ne peuvent pas communiquer directement avec la chaîne, voir [Connecter des appareils](/docs/connect-devices/).

## La suite

Avec les abonnements (5.0, en cours), le propriétaire d'un Scope pourra payer les transactions des appareils de l'arbre. Un capteur pourra ainsi écrire sans détenir lui-même de XRT. Ce n'est pas encore dans le runtime.
