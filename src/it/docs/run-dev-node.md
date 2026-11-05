---
title: Avviare un nodo di sviluppo
contributors: [LoSk-p, ensrationis]
---

Un nodo di sviluppo è una chain Robonomics locale a nodo singolo per testare il tuo codice. I blocchi vengono prodotti subito, gli account di test hanno fondi e nulla tocca la rete attiva.

Non esiste più un binario `robonomics --dev`. Compili il runtime da [airalab/robonomics](https://github.com/airalab/robonomics), generi da esso una chain spec e avvii con quella spec `polkadot-omni-node`, il nodo generico di Parity.

## Un solo comando (Nix)

Da un clone del repository:

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

Lo script compila il runtime con la feature `dev-runtime` se serve, genera una chain spec temporanea e avvia `polkadot-omni-node --chain <spec> --dev`.

## Senza Nix

Installa i due strumenti con Cargo, poi avvia lo stesso script:

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## A mano

Per conservare la chain spec o cambiare i flag del nodo, esegui i passi tu stesso:

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

Non esiste un `--chain dev` integrato: passi sempre la spec generata più `--dev`. Aggiungi `--base-path <dir>` per conservare lo stato della chain tra un riavvio e l'altro.

## Cosa ottieni

- RPC e WebSocket su `ws://127.0.0.1:9944`.
- Chain id `robonomics-dev`, para ID 2000, relay chain `westend-local`, token XRT con 9 decimali.
- Account di sviluppo con fondi: Alice, Bob, Charlie e le altre chiavi di test note.
- Alice è Sudo. Sudo esiste solo nelle build `dev-runtime`, mai sulla rete attiva.
- Uno stato pulito a ogni avvio, a meno che non imposti `--base-path`.

Collega [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) a `ws://127.0.0.1:9944` per dare un'occhiata. Con lo strumento `cps` usa `ROBONOMICS_WS_URL=ws://127.0.0.1:9944` e `ROBONOMICS_SURI=//Alice`.

## RWS su una chain di sviluppo

Le aste RWS le crea Root. Per saltare questo passo quando testi codice RWS, il repository `robonomics-interface` ha uno script `scripts/devchain.sh` che avvia una chain di sviluppo con le aste RWS già nel genesis.

Altre opzioni, compresa un'immagine Docker, sono nella [developer guide](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain).
