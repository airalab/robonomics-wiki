---
title: XRT en otras redes
contributors: [nakata5321, ensrationis]
---

El XRT de producción vive en la parachain de Robonomics en Polkadot. Esta página explica qué pasa con el XRT en Kusama y en Ethereum, y dónde existe XRT en Polkadot Asset Hub.

## Kusama

La parachain de Robonomics en Kusama se ha detenido. Produjo su último bloque, el #12 268 835, el 28 de septiembre de 2026. Hay un archivo de la base de datos en [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama).

Lo que dicen las publicaciones sobre el XRT de Kusama:

- Todos los saldos de XRT en el último bloque pasan a Polkadot con un **bono del 20 %**.
- **No hay recompra** en el lado de Kusama.
- Dónde aparecerán los saldos en Polkadot, y si los poseedores tienen que hacer algo, se explicará en otra publicación.

Sigue el [blog de Robonomics](https://robonomics.network/blog/) para esa publicación. Fuentes: [The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/) y la [página de tokenómica](https://robonomics.network/tokenomics/).

## Ethereum

El antiguo token XRT en Ethereum (`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`) está obsoleto. El 5 de febrero de 2026 se explotó su mecanismo de emisión para acuñar tokens gratis. El XRT en Polkadot y Kusama no se vio afectado.

Quienes tenían el token antiguo en el momento del snapshot (bloque 24 390 081 de Ethereum) pueden migrar:

1. Abre la aplicación de migración: [airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/).
2. Conecta el monedero que tenía XRT el 5 de febrero de 2026. La aplicación muestra tu saldo del snapshot y la cantidad con el bono.
3. Elige una opción. Cada dirección solo puede elegir una vez.
   - **Accept**: recibir XRT de producción en Ethereum, tu saldo del snapshot más un 20 %.
   - **Decline**: entrar en el programa de recompra, a un precio de referencia de 2,20 USD, pagado a lo largo de 12–36 meses y solo en la medida en que lo permitan los fondos de la tesorería.

Antes de firmar, comprueba que la aplicación se comunica con el contrato de reclamación `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c`. Su código fuente está en [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts).

Lo que recibes es XRT de producción en Ethereum, contrato `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. Es XRT puenteado 1:1 desde Polkadot a través de [Snowbridge](https://app.snowbridge.network/send). Puedes guardarlo, negociarlo en Uniswap o puentearlo a Polkadot. No hay puente del token antiguo al nuevo.

Las publicaciones fijan un plazo de 12 meses para la migración. El XRT no reclamado a tiempo solo se puede recuperar mediante una votación de gobernanza on-chain con prueba de propiedad. Lee las condiciones exactas en las publicaciones: [Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/) y [Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/).

Dudas: en el grupo de Telegram [XRT Traders](https://t.me/xrt_trade).

## Polkadot Asset Hub

XRT existe en Polkadot Asset Hub como activo extranjero, y hay un pool de intercambio DOT–XRT. Las comisiones en Asset Hub se pueden pagar en XRT.

Todavía no se ha publicado una guía para mover XRT entre Asset Hub y la parachain de Robonomics.
