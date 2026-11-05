---
title: Bibliothèques clientes
contributors: [PaTara43, ensrationis]
---

Choisissez une bibliothèque selon le langage et selon votre besoin. Pour l'arbre des appareils, utilisez `@polkadot/api`, les crates Rust ou l'outil `cps`. Pour datalog et RWS en Python, utilisez `robonomics-interface`.

| Bibliothèque | Langage | Arbre des appareils | Remarques |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | Pas de fonctions dédiées | Datalog, RWS, comptes, chiffrement |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | Oui | Client Substrate générique |
| npm `robonomics-interface` | JavaScript | Non | Utilisé par robonomics.app |
| `robonomics-runtime-subxt-api` | Rust | Oui, typé | Bindings pour le runtime |
| `libcps` et l'outil `cps` | Rust, ligne de commande | Oui, complet | Dans [airalab/robins](https://github.com/airalab/robins) |

Toutes se connectent à `wss://polkadot.rpc.robonomics.network/` ou à votre propre nœud.

## Python : robonomics-interface

La version actuelle est la 3.1.0. Elle est testée sur une chaîne de développement en runtime 52, et par des vérifications en lecture seule sur le réseau en service. La version 3.0 est une réécriture et n'est pas compatible avec la 2.x : elle ne dépend plus de `substrate-interface`. Si vous migrez depuis la 2.x, lisez [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md).

Ce qu'elle couvre :

- Clés : ED25519 par défaut. sr25519, le format par défaut des portefeuilles Polkadot, nécessite l'extra `[sr25519]` et `crypto_type=SR25519`. Adresses SS58, phrases mnémoniques, import de sauvegardes de portefeuille.
- Un client asynchrone avec repli entre points d'accès, et son équivalent bloquant pour les scripts (`RobonomicsSync`).
- Requêtes de stockage et extrinsics, avec événements et erreurs lisibles.
- Des fonctions dédiées pour Datalog, RWS, System et Balances.
- Le chiffrement des messages et l'enveloppe de rapport utilisée par le Robonomics Report Service.

Il n'y a pas de fonctions dédiées pour l'arbre des appareils. N'importe quel pallet peut tout de même être appelé avec les fonctions génériques `compose_call` et `submit`.

Installation (Python 3.12 ou plus récent) :

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

Un enregistrement datalog, d'après le README :

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

Documentation : [airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/).

## JavaScript

`@polkadot/api` fonctionne avec tous les pallets, y compris l'arbre des appareils. Exemples tirés du [README du pallet CPS](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage) :

```javascript
// Read a node.
const info = await api.query.cps.nodes(nodeId);   // parent and Scope pointer
const meta = await api.query.cps.meta(nodeId);
const payload = await api.query.cps.payload(nodeId);

// Create a root node and a child.
await api.tx.cps.createNode(null, meta, payload, null).signAndSend(owner);
await api.tx.cps.createNode(parentId, meta, payload, null).signAndSend(owner);

// Let another account write to one node.
await api.tx.cps.grantAccess(nodeId, principal, 'Write', 'Node').signAndSend(owner);

// View functions (need a @polkadot/api version with view-function support).
const scope = await api.view.cps.resolveScope(nodeId);
```

Le paquet npm `robonomics-interface` (JavaScript) est celui qu'utilise robonomics.app. Il couvre datalog, launch, RWS, digital twin et les appels utilitaires, mais pas l'arbre des appareils.

## Rust

- `robonomics-runtime-subxt-api` : bindings typés pour le runtime, y compris les fonctions de vue de l'arbre des appareils.
- `libcps` : une bibliothèque pour l'arbre des appareils avec un client léger intégré. Elle n'est pas publiée sur crates.io ; utilisez-la depuis [airalab/robins](https://github.com/airalab/robins).

<div id="cps-command-line-tool"></div>

## L'outil en ligne de commande cps

`cps` permet de travailler avec l'arbre des appareils depuis un terminal. Il peut lancer son propre client léger, vous n'avez donc besoin ni d'un nœud ni d'un RPC public.

Installez-le depuis les versions nightly de [airalab/robins](https://github.com/airalab/robins/releases) (archives pour Linux et macOS, x86_64 et aarch64), ou lancez-le avec Nix :

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

Le README de robins mentionne aussi `cargo install libcps`, mais il n'existe pas de crate `libcps` sur crates.io.

Quelques commandes :

```bash
cps lc &                        # start the embedded light client on 127.0.0.1:9944
cps status                      # where am I connected
cps tree <NODE_ID> --depth 2    # look at a tree

export ROBONOMICS_SURI='<your seed phrase>'   # signs writes; keep it secret
cps create --meta '{"type":"building","name":"HQ"}' --payload '{"status":"online"}'
cps create --parent <NODE_ID> --meta '{"type":"room"}' --payload '{"temp":"22C"}'
cps meta set <NODE_ID> '{"type":"room","name":"Lab"}'
cps payload set <NODE_ID> 'temp=24C'
cps delete <NODE_ID>
```

Le guide complet se trouve dans la [documentation de robins](https://github.com/airalab/robins/tree/master/docs/src/01-cli).

## Historique

Le wrapper ROS 2 (`robonomics-ros2`) et `robonomics-js` sont des outils historiques, non maintenus pour le runtime actuel.
