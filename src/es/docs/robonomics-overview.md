---
title: Visión general
contributors: [ensrationis]
---

Robonomics es una nube para dispositivos sobre Polkadot. En la nube guardas una descripción de tus dispositivos y su estado actual, escribes mediciones y envías comandos. Pagas con XRT, el token de la red. Ninguna empresa controla la nube por sí sola: la operan collators independientes, y los poseedores de XRT la gobiernan con votaciones on-chain.

## Piezas principales

- **Árbol de dispositivos (CPS).** Un árbol de nodos que describe tu instalación: un edificio, sus salas y los dispositivos que hay en ellas. Cada nodo guarda una descripción breve y el estado actual. El propietario decide quién puede escribir en cada parte del árbol. Hoy es el núcleo de Robonomics. Consulta [Árbol de dispositivos (CPS)](/docs/device-tree/).
- **XRT.** El token. Sirve para pagar comisiones de transacción y suscripciones, y los poseedores de XRT votan con él. Consulta [XRT y gobernanza](/docs/xrt-and-governance/).
- **Gobernanza.** OpenGov estándar de Polkadot con dos tracks. No hay clave Sudo: todo cambio privilegiado, incluidas las actualizaciones del runtime, pasa por un referéndum.
- **Collators.** Los servidores que producen bloques. Cualquiera puede ser candidato depositando XRT como fianza. Consulta [Ejecutar un collator](/docs/run-collator/).

Las piezas más antiguas (Datalog, Launch, suscripciones RWS, Digital Twin, Liability) siguen funcionando, pero están obsoletas. Consulta [Pallets heredados](/docs/legacy-pallets/).

## La red

| | |
|---|---|
| Red | Parachain de Robonomics en Polkadot |
| Para ID | 3388 |
| Token | XRT, 9 decimales |
| Formato de dirección | Prefijo SS58 32 (las direcciones empiezan por `4`) |
| Tiempo de bloque | 6 segundos (objetivo) |
| RPC público | `wss://polkadot.rpc.robonomics.network/` |
| Explorador de bloques | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [abrir con el RPC de Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

Polkadot es la única red de Robonomics en funcionamiento. La parachain en Kusama se ha detenido. Consulta [XRT en otras redes](/docs/xrt-migration/).

## Qué se está construyendo

Robonomics 5.0 construye la nube por capas. La gobernanza y el árbol de dispositivos con Scope y Access ya están en funcionamiento. Las suscripciones están en desarrollo: un dispositivo podrá usar la red sin tener XRT propio. El almacenamiento y el cómputo están planificados; todavía no hay código para ellos.

Más información en la entrada del blog [Robonomics 5.0, part one](https://robonomics.network/blog/robonomics-5-0-runtime-first/) y en la [hoja de ruta de 5.0](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md).

## Software y mantenedores

Todo el software de Robonomics es de código abierto:

- [airalab/robonomics](https://github.com/airalab/robonomics): el runtime y sus pallets.
- [airalab/robins](https://github.com/airalab/robins): herramientas, entre ellas la herramienta de línea de comandos `cps` y pasarelas para dispositivos.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): la biblioteca de Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): la aplicación web en [robonomics.app](https://robonomics.app).

No existe un programa de nodo propio de Robonomics. Los collators ejecutan `polkadot-omni-node`, el nodo genérico de Parity, con la chain spec de Robonomics.

Los sitios web de Robonomics, incluida esta wiki, los opera Akagi Engineering Co., Ltd. (Japón). Las noticias y las notas de versión están en el [blog de Robonomics](https://robonomics.network/blog/).
