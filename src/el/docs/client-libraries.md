---
title: Βιβλιοθήκες πελάτη
contributors: [PaTara43, ensrationis]
---

Διαλέξτε βιβλιοθήκη ανάλογα με τη γλώσσα και με το τι χρειάζεστε. Για το δέντρο συσκευών, χρησιμοποιήστε το `@polkadot/api`, τα Rust crates ή το εργαλείο `cps`. Για datalog και RWS από Python, χρησιμοποιήστε το `robonomics-interface`.

| Βιβλιοθήκη | Γλώσσα | Δέντρο συσκευών | Σημειώσεις |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | Χωρίς helpers | Datalog, RWS, λογαριασμοί, κρυπτογράφηση |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | Ναι | Γενικός client για Substrate |
| npm `robonomics-interface` | JavaScript | Όχι | Χρησιμοποιείται από το robonomics.app |
| `robonomics-runtime-subxt-api` | Rust | Ναι, typed | Bindings για το runtime |
| `libcps` και το εργαλείο `cps` | Rust, γραμμή εντολών | Ναι, πλήρως | Από το [airalab/robins](https://github.com/airalab/robins) |

Όλες συνδέονται στο `wss://polkadot.rpc.robonomics.network/` ή στον δικό σας κόμβο.

## Python: robonomics-interface

Η τρέχουσα έκδοση είναι η 3.1.0. Έχει δοκιμαστεί σε αλυσίδα ανάπτυξης με runtime 52 και με ελέγχους μόνο ανάγνωσης στο ενεργό δίκτυο. Η έκδοση 3.0 είναι ξαναγραμμένη από την αρχή και δεν είναι συμβατή με την 2.x: δεν εξαρτάται πια από το `substrate-interface`. Αν μεταβαίνετε από την 2.x, διαβάστε το [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md).

Τι καλύπτει:

- Κλειδιά: ED25519 από προεπιλογή. Το sr25519, η προεπιλογή των wallets του Polkadot, χρειάζεται το extra `[sr25519]` και `crypto_type=SR25519`. Διευθύνσεις SS58, mnemonics, εισαγωγή αντιγράφων ασφαλείας wallet.
- Έναν ασύγχρονο client με fallback μεταξύ endpoints, και ένα blocking αντίστοιχο για scripts (`RobonomicsSync`).
- Ερωτήματα storage και extrinsics με events και κατανοητά μηνύματα σφάλματος.
- Helpers για Datalog, RWS, System και Balances.
- Κρυπτογράφηση μηνυμάτων και τον φάκελο αναφορών (report envelope) που χρησιμοποιεί το Robonomics Report Service.

Δεν υπάρχουν helpers για το δέντρο συσκευών. Οποιοδήποτε pallet μπορεί πάντως να κληθεί με τα γενικά `compose_call` και `submit`.

Εγκατάσταση (Python 3.12 ή νεότερη):

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

Μια εγγραφή datalog, σύμφωνα με το README:

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

Τεκμηρίωση: [airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/).

## JavaScript

Το `@polkadot/api` λειτουργεί με κάθε pallet, μαζί και με το δέντρο συσκευών. Παραδείγματα από το [README του pallet CPS](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage):

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

Το πακέτο npm `robonomics-interface` (JavaScript) είναι αυτό που χρησιμοποιεί το robonomics.app. Καλύπτει datalog, launch, RWS, digital twin και βοηθητικές κλήσεις, αλλά όχι το δέντρο συσκευών.

## Rust

- `robonomics-runtime-subxt-api`: typed bindings για το runtime, μαζί με τις view functions του δέντρου συσκευών.
- `libcps`: βιβλιοθήκη για το δέντρο συσκευών με ενσωματωμένο light client. Δεν είναι δημοσιευμένη στο crates.io· χρησιμοποιήστε την από το [airalab/robins](https://github.com/airalab/robins).

<a id="cps-command-line-tool"></a>

## Το εργαλείο γραμμής εντολών cps

Το `cps` δουλεύει με το δέντρο συσκευών από το τερματικό. Μπορεί να τρέξει δικό του light client, οπότε δεν χρειάζεστε κόμβο ούτε δημόσιο RPC.

Εγκαταστήστε το από τις nightly εκδόσεις του [airalab/robins](https://github.com/airalab/robins/releases) (αρχεία για Linux και macOS, x86_64 και aarch64), ή τρέξτε το με Nix:

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

Το README του robins αναφέρει επίσης το `cargo install libcps`, αλλά δεν υπάρχει crate `libcps` στο crates.io.

Μερικές εντολές:

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

Ο πλήρης οδηγός βρίσκεται στην [τεκμηρίωση του robins](https://github.com/airalab/robins/tree/master/docs/src/01-cli).

## Παλαιά εργαλεία

Ο wrapper του ROS 2 (`robonomics-ros2`) και το `robonomics-js` είναι παλαιά και δεν συντηρούνται για το τρέχον runtime.
