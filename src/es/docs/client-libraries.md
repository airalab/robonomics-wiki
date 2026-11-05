---
title: Bibliotecas cliente
contributors: [PaTara43, ensrationis]
---

Elige una biblioteca según el lenguaje y lo que necesites. Para el árbol de dispositivos, usa `@polkadot/api`, los crates de Rust o la herramienta `cps`. Para datalog y RWS desde Python, usa `robonomics-interface`.

| Biblioteca | Lenguaje | Árbol de dispositivos | Notas |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | Sin funciones propias | Datalog, RWS, cuentas, cifrado |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | Sí | Cliente genérico de Substrate |
| npm `robonomics-interface` | JavaScript | No | Lo usa robonomics.app |
| `robonomics-runtime-subxt-api` | Rust | Sí, tipado | Bindings para el runtime |
| `libcps` y la herramienta `cps` | Rust, línea de comandos | Sí, completo | De [airalab/robins](https://github.com/airalab/robins) |

Todas se conectan a `wss://polkadot.rpc.robonomics.network/` o a tu propio nodo.

## Python: robonomics-interface

La versión actual es la 3.1.0. Está probada en una cadena de desarrollo con el runtime 52 y con comprobaciones de solo lectura en la red en funcionamiento. La versión 3.0 es una reescritura y no es compatible con la 2.x: ya no depende de `substrate-interface`. Si vienes de la 2.x, lee [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md).

Qué cubre:

- Claves: ED25519 por defecto. sr25519, el formato por defecto de los monederos de Polkadot, necesita el extra `[sr25519]` y `crypto_type=SR25519`. Direcciones SS58, mnemónicos, importación de copias de seguridad de monederos.
- Un cliente asíncrono con conmutación entre endpoints, y su equivalente bloqueante para scripts (`RobonomicsSync`).
- Consultas de almacenamiento y extrinsics con eventos y errores legibles.
- Funciones propias para Datalog, RWS, System y Balances.
- Cifrado de mensajes y el sobre de informe que usa el Robonomics Report Service.

No tiene funciones propias para el árbol de dispositivos. Aun así, cualquier pallet se puede llamar con las funciones genéricas `compose_call` y `submit`.

Instalación (Python 3.12 o posterior):

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

Un registro de datalog, según el README:

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

Documentación: [airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/).

## JavaScript

`@polkadot/api` funciona con todos los pallets, incluido el árbol de dispositivos. Ejemplos del [README del pallet CPS](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage):

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

El paquete npm `robonomics-interface` (JavaScript) es el que usa robonomics.app. Cubre datalog, launch, RWS, digital twin y llamadas de utilidad, pero no el árbol de dispositivos.

## Rust

- `robonomics-runtime-subxt-api`: bindings tipados para el runtime, incluidas las funciones de vista del árbol de dispositivos.
- `libcps`: una biblioteca para el árbol de dispositivos con un cliente ligero integrado. No está publicada en crates.io; úsala desde [airalab/robins](https://github.com/airalab/robins).

<div id="cps-command-line-tool"></div>

## Herramienta de línea de comandos cps

`cps` trabaja con el árbol de dispositivos desde una terminal. Puede ejecutar su propio cliente ligero, así que no necesitas un nodo ni un RPC público.

Instálala desde las versiones nightly de [airalab/robins](https://github.com/airalab/robins/releases) (archivos para Linux y macOS, x86_64 y aarch64), o ejecútala con Nix:

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

El README de robins también menciona `cargo install libcps`, pero no existe ningún crate `libcps` en crates.io.

Algunos comandos:

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

La guía completa está en la [documentación de robins](https://github.com/airalab/robins/tree/master/docs/src/01-cli).

## Heredado

El wrapper de ROS 2 (`robonomics-ros2`) y `robonomics-js` son heredados y no se mantienen para el runtime actual.
