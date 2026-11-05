---
title: Ejecutar un nodo de desarrollo
contributors: [LoSk-p, ensrationis]
---

Un nodo de desarrollo es una cadena Robonomics local, de un solo nodo, para probar tu código. Los bloques se producen al instante, las cuentas de prueba tienen fondos y nada toca la red en funcionamiento.

Ya no existe el binario `robonomics --dev`. Compilas el runtime desde [airalab/robonomics](https://github.com/airalab/robonomics), generas con él una chain spec y ejecutas `polkadot-omni-node`, el nodo genérico de Parity, con esa spec.

## Un solo comando (Nix)

Desde un clon del repositorio:

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

El script compila el runtime con la feature `dev-runtime` si hace falta, genera una chain spec temporal y arranca `polkadot-omni-node --chain <spec> --dev`.

## Sin Nix

Instala las dos herramientas con Cargo y ejecuta el mismo script:

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## A mano

Para conservar la chain spec o cambiar las opciones del nodo, ejecuta tú los pasos:

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

No hay un `--chain dev` integrado: siempre pasas la spec generada más `--dev`. Añade `--base-path <dir>` para conservar el estado de la cadena entre reinicios.

## Qué obtienes

- RPC y WebSocket en `ws://127.0.0.1:9944`.
- ID de cadena `robonomics-dev`, para ID 2000, relay chain `westend-local`, token XRT con 9 decimales.
- Cuentas de desarrollo con fondos: Alice, Bob, Charlie y las demás claves de prueba conocidas.
- Alice es Sudo. Sudo solo existe en las compilaciones `dev-runtime`, nunca en la red en funcionamiento.
- Un estado limpio en cada arranque, salvo que indiques `--base-path`.

Conecta [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) a `ws://127.0.0.1:9944` para explorar. Con la herramienta `cps`, usa `ROBONOMICS_WS_URL=ws://127.0.0.1:9944` y `ROBONOMICS_SURI=//Alice`.

## RWS en una cadena de desarrollo

Las subastas RWS las crea Root. Para saltarte ese paso al probar código de RWS, el repositorio `robonomics-interface` incluye un script `scripts/devchain.sh` que arranca una cadena de desarrollo con subastas RWS ya incluidas en el génesis.

Hay más opciones, entre ellas una imagen de Docker, en la [guía para desarrolladores](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain).
