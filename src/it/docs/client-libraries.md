---
title: Librerie client
contributors: [PaTara43, ensrationis]
---

Scegli una libreria in base al linguaggio e a ciò che ti serve. Per l'albero dei dispositivi usa `@polkadot/api`, i crate Rust o lo strumento `cps`. Per datalog e RWS da Python usa `robonomics-interface`.

| Libreria | Linguaggio | Albero dei dispositivi | Note |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | Nessun helper | Datalog, RWS, account, cifratura |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | Sì | Client Substrate generico |
| npm `robonomics-interface` | JavaScript | No | Usato da robonomics.app |
| `robonomics-runtime-subxt-api` | Rust | Sì, tipizzato | Binding per il runtime |
| `libcps` e lo strumento `cps` | Rust, riga di comando | Sì, completo | Da [airalab/robins](https://github.com/airalab/robins) |

Tutte si collegano a `wss://polkadot.rpc.robonomics.network/` o al tuo nodo.

## Python: robonomics-interface

La versione attuale è la 3.1.0. È testata su una chain di sviluppo con runtime 52 e con verifiche in sola lettura sulla rete attiva. La versione 3.0 è una riscrittura e non è compatibile con la 2.x: non dipende più da `substrate-interface`. Se passi dalla 2.x, leggi [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md).

Cosa copre:

- Chiavi: ED25519 di default. sr25519, il default dei wallet Polkadot, richiede l'extra `[sr25519]` e `crypto_type=SR25519`. Indirizzi SS58, frasi mnemoniche, importazione dei backup dei wallet.
- Un client asincrono con fallback tra endpoint, e un gemello bloccante per gli script (`RobonomicsSync`).
- Query sullo storage ed extrinsic con eventi ed errori leggibili.
- Helper per Datalog, RWS, System e Balances.
- Cifratura dei messaggi e l'envelope dei report usato da Robonomics Report Service.

Non ci sono helper per l'albero dei dispositivi. Qualsiasi pallet si può comunque chiamare con i generici `compose_call` e `submit`.

Installazione (Python 3.12 o successivo):

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

Un record datalog, secondo il README:

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

Documentazione: [airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/).

## JavaScript

`@polkadot/api` funziona con tutti i pallet, compreso l'albero dei dispositivi. Esempi dal [README del pallet CPS](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage):

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

Il pacchetto npm `robonomics-interface` (JavaScript) è quello che usa robonomics.app. Copre datalog, launch, RWS, digital twin e chiamate di utilità, ma non l'albero dei dispositivi.

## Rust

- `robonomics-runtime-subxt-api`: binding tipizzati per il runtime, comprese le view function dell'albero dei dispositivi.
- `libcps`: una libreria per l'albero dei dispositivi con un light client integrato. Non è pubblicata su crates.io; usala da [airalab/robins](https://github.com/airalab/robins).

<a id="cps-command-line-tool"></a>

## Lo strumento a riga di comando cps

`cps` lavora con l'albero dei dispositivi dal terminale. Può avviare un proprio light client, quindi non ti servono un nodo né un RPC pubblico.

Installalo dalle release nightly di [airalab/robins](https://github.com/airalab/robins/releases) (archivi per Linux e macOS, x86_64 e aarch64), oppure avvialo con Nix:

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

Il README di robins cita anche `cargo install libcps`, ma su crates.io non esiste un crate `libcps`.

Alcuni comandi:

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

La guida completa è nella [documentazione di robins](https://github.com/airalab/robins/tree/master/docs/src/01-cli).

## Legacy

Il wrapper ROS 2 (`robonomics-ros2`) e `robonomics-js` sono legacy e non vengono mantenuti per il runtime attuale.
