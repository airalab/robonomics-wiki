---
title: Client-Bibliotheken
contributors: [PaTara43, ensrationis]
---

Wählen Sie eine Bibliothek nach Sprache und nach dem, was Sie brauchen. Für den Gerätebaum nehmen Sie `@polkadot/api`, die Rust-Crates oder das Tool `cps`. Für Datalog und RWS aus Python nehmen Sie `robonomics-interface`.

| Bibliothek | Sprache | Gerätebaum | Hinweise |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | Keine Helfer | Datalog, RWS, Konten, Verschlüsselung |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | Ja | Generischer Substrate-Client |
| npm `robonomics-interface` | JavaScript | Nein | Wird von robonomics.app genutzt |
| `robonomics-runtime-subxt-api` | Rust | Ja, typisiert | Bindings für die Runtime |
| `libcps` und das Tool `cps` | Rust, Kommandozeile | Ja, vollständig | Aus [airalab/robins](https://github.com/airalab/robins) |

Alle verbinden sich mit `wss://polkadot.rpc.robonomics.network/` oder mit Ihrem eigenen Node.

## Python: robonomics-interface

Die aktuelle Version ist 3.1.0. Sie ist auf einer Entwicklungs-Chain mit Runtime 52 getestet und mit reinen Lesetests im Live-Netzwerk. Version 3.0 ist eine Neuentwicklung und nicht kompatibel mit 2.x: Sie hängt nicht mehr von `substrate-interface` ab. Wenn Sie von 2.x umsteigen, lesen Sie [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md).

Was sie abdeckt:

- Schlüssel: standardmäßig ED25519. Für sr25519, den Standard von Polkadot-Wallets, braucht es das Extra `[sr25519]` und `crypto_type=SR25519`. SS58-Adressen, Mnemonics, Import von Wallet-Backups.
- Einen asynchronen Client mit Fallback zwischen Endpunkten und ein blockierendes Gegenstück für Skripte (`RobonomicsSync`).
- Storage-Abfragen und Extrinsics mit Events und lesbaren Fehlermeldungen.
- Helfer für Datalog, RWS, System und Balances.
- Nachrichtenverschlüsselung und den Bericht-Umschlag, den der Robonomics Report Service nutzt.

Helfer für den Gerätebaum gibt es nicht. Jedes Pallet lässt sich aber mit den generischen `compose_call` und `submit` aufrufen.

Installation (Python 3.12 oder neuer):

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

Ein Datalog-Eintrag nach dem README:

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

Dokumentation: [airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/).

## JavaScript

`@polkadot/api` funktioniert mit jedem Pallet, auch mit dem Gerätebaum. Beispiele aus dem [README des CPS-Pallets](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage):

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

Das npm-Paket `robonomics-interface` (JavaScript) nutzt robonomics.app. Es deckt Datalog, Launch, RWS, Digital Twin und Utility-Aufrufe ab, aber nicht den Gerätebaum.

## Rust

- `robonomics-runtime-subxt-api`: typisierte Bindings für die Runtime, einschließlich der View-Funktionen des Gerätebaums.
- `libcps`: eine Bibliothek für den Gerätebaum mit eingebettetem Light Client. Sie ist nicht auf crates.io veröffentlicht; nutzen Sie sie aus [airalab/robins](https://github.com/airalab/robins).

<div id="cps-command-line-tool"></div>

## Kommandozeilentool cps

`cps` arbeitet im Terminal mit dem Gerätebaum. Es kann einen eigenen Light Client starten, Sie brauchen also weder einen Node noch einen öffentlichen RPC.

Installieren Sie es aus den Nightly-Releases von [airalab/robins](https://github.com/airalab/robins/releases) (Archive für Linux und macOS, x86_64 und aarch64), oder starten Sie es mit Nix:

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

Das README von robins nennt auch `cargo install libcps`, aber auf crates.io gibt es kein Crate `libcps`.

Einige Befehle:

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

Die vollständige Anleitung steht in der [Dokumentation von robins](https://github.com/airalab/robins/tree/master/docs/src/01-cli).

## Legacy

Der ROS-2-Wrapper (`robonomics-ros2`) und `robonomics-js` sind Legacy und werden für die aktuelle Runtime nicht gepflegt.
