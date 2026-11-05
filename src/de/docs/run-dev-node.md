---
title: Dev-Node betreiben
contributors: [LoSk-p, ensrationis]
---

Ein Dev-Node ist eine lokale Robonomics-Chain mit einem einzigen Node, auf der Sie Ihren Code testen. Blöcke entstehen sofort, Testkonten haben Guthaben, und das Live-Netzwerk bleibt unberührt.

Ein Binary `robonomics --dev` gibt es nicht mehr. Sie bauen die Runtime aus [airalab/robonomics](https://github.com/airalab/robonomics), erzeugen daraus eine Chain-Spec und starten den generischen `polkadot-omni-node` von Parity mit dieser Spec.

## Ein Befehl (Nix)

In einem Klon des Repositorys:

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

Das Skript baut die Runtime bei Bedarf mit dem Feature `dev-runtime`, erzeugt eine temporäre Chain-Spec und startet `polkadot-omni-node --chain <spec> --dev`.

## Ohne Nix

Installieren Sie die beiden Werkzeuge mit Cargo und starten Sie dann dasselbe Skript:

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## Von Hand

Wenn Sie die Chain-Spec behalten oder Node-Flags ändern wollen, führen Sie die Schritte selbst aus:

{% codeHelper {copy: true} %}

```bash
cargo build --release -p robonomics-runtime --features dev-runtime

chain-spec-builder -c ./chain_spec.json create \
  -n "Robonomics Dev" -i robonomics-dev -t development \
  -r ./target/release/wbuild/robonomics-runtime/robonomics_runtime.compact.compressed.wasm \
  --para-id 2000 --relay-chain westend-local \
  --properties tokenSymbol=XRT,tokenDecimals=9 \
  named-preset development

polkadot-omni-node --chain ./chain_spec.json --dev
```

{% endcodeHelper %}

Ein eingebautes `--chain dev` gibt es nicht: Sie übergeben immer die erzeugte Spec plus `--dev`. Mit `--base-path <dir>` bleibt der Zustand der Chain über Neustarts erhalten.

## Was Sie bekommen

- RPC und WebSocket unter `ws://127.0.0.1:9944`.
- Chain-ID `robonomics-dev`, Para ID 2000, Relay-Chain `westend-local`, Token XRT mit 9 Dezimalstellen.
- Dev-Konten mit Guthaben: Alice, Bob, Charlie und die anderen bekannten Testschlüssel.
- Alice ist Sudo. Sudo gibt es nur in `dev-runtime`-Builds, nie im Live-Netzwerk.
- Bei jedem Start ein frischer Zustand, außer Sie setzen `--base-path`.

Verbinden Sie [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) mit `ws://127.0.0.1:9944`, um sich umzusehen. Für das Tool `cps` setzen Sie `ROBONOMICS_WS_URL=ws://127.0.0.1:9944` und `ROBONOMICS_SURI=//Alice`.

## RWS auf einer Dev-Chain

RWS-Auktionen legt Root an. Damit Sie diesen Schritt beim Testen von RWS-Code überspringen können, enthält das Repository `robonomics-interface` ein Skript `scripts/devchain.sh`, das eine Dev-Chain mit RWS-Auktionen bereits im Genesis startet.

Weitere Optionen, darunter ein Docker-Image, finden Sie im [Developer Guide](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain).
