---
title: Lancer un nœud de développement
contributors: [LoSk-p, ensrationis]
---

Un nœud de développement est une chaîne Robonomics locale à un seul nœud, pour tester votre code. Les blocs sont produits immédiatement, les comptes de test ont des fonds, et rien ne touche le réseau en service.

Le binaire `robonomics --dev` n'existe plus. Vous compilez le runtime depuis [airalab/robonomics](https://github.com/airalab/robonomics), vous en générez une chain spec, puis vous lancez `polkadot-omni-node`, le nœud générique de Parity, avec cette spec.

## Une seule commande (Nix)

Depuis un clone du dépôt :

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

Le script compile le runtime avec la feature `dev-runtime` si nécessaire, génère une chain spec temporaire et lance `polkadot-omni-node --chain <spec> --dev`.

## Sans Nix

Installez les deux outils avec Cargo, puis lancez le même script :

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## À la main

Pour conserver la chain spec ou modifier les options du nœud, exécutez les étapes vous-même :

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

Il n'y a pas de `--chain dev` intégré : vous passez toujours la spec générée plus `--dev`. Ajoutez `--base-path <dir>` pour conserver l'état de la chaîne entre deux redémarrages.

## Ce que vous obtenez

- RPC et WebSocket sur `ws://127.0.0.1:9944`.
- Identifiant de chaîne `robonomics-dev`, para ID 2000, relay chain `westend-local`, jeton XRT à 9 décimales.
- Des comptes de développement approvisionnés : Alice, Bob, Charlie et les autres clés de test bien connues.
- Alice est Sudo. Sudo n'existe que dans les builds `dev-runtime`, jamais sur le réseau en service.
- Un état vierge à chaque démarrage, sauf si vous définissez `--base-path`.

Connectez [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) à `ws://127.0.0.1:9944` pour explorer. Avec l'outil `cps`, utilisez `ROBONOMICS_WS_URL=ws://127.0.0.1:9944` et `ROBONOMICS_SURI=//Alice`.

## RWS sur une chaîne de développement

Les enchères RWS sont créées par Root. Pour sauter cette étape quand vous testez du code RWS, le dépôt `robonomics-interface` fournit un script `scripts/devchain.sh` qui lance une chaîne de développement avec des enchères RWS déjà présentes dans le genesis.

D'autres options, dont une image Docker, sont décrites dans le [guide du développeur](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain).
