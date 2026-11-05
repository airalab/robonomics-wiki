---
title: Primeros pasos
contributors: [Vourhey, positivecrash, ensrationis]
---

Esta página te lleva desde cero hasta tu primer registro en la red Robonomics. Necesitas un navegador, una extensión de monedero y un poco de XRT.

## 1. Crear una cuenta

1. Instala la [extensión Polkadot.js](https://polkadot.js.org/extension/) u otro monedero de Polkadot que pueda trabajar con una red personalizada.
2. Crea una cuenta en el monedero. Apunta la frase de recuperación y guárdala fuera de línea.
3. La misma cuenta funciona en Robonomics. Robonomics muestra las direcciones en su propio formato (prefijo SS58 32), así que allí tu dirección empieza por `4`.

Una cuenta solo existe on-chain cuando tiene al menos el depósito existencial, 0,000001 XRT.

## 2. Conseguir XRT

Necesitas muy poco. En el momento de escribir esto, un registro de datalog cuesta mucho menos de 0,001 XRT en comisiones.

Dónde se negocia XRT hoy:

- **Uniswap en Ethereum.** El XRT de producción en Ethereum es XRT puenteado desde Polkadot a través de Snowbridge. Su contrato es `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. [Intercambiar en Uniswap](https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x1f752250f518e419f2f03804e25728c5c6dff73f). [Snowbridge](https://app.snowbridge.network/send) mueve tokens entre Ethereum y Polkadot.
- **Polkadot Asset Hub.** XRT existe en Asset Hub, y allí hay un pool de intercambio DOT–XRT.

Mover XRT desde Asset Hub a tu cuenta en la parachain de Robonomics es una transferencia entre cadenas. Todavía no se ha publicado una guía paso a paso. Si te atascas, pregunta en el grupo de Telegram [XRT Traders](https://t.me/xrt_trade).

{% roboWikiNote {type: "warning", title: "Enlaces antiguos"}%} Algunas páginas antiguas todavía enlazan a exchanges que ya no listan XRT y al token heredado de Ethereum `0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`. El token heredado no es XRT de producción. {% endroboWikiNote %}

## 3. Conectar Polkadot.js Apps

Abre [Polkadot.js Apps con el RPC de Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer). Se conecta al endpoint público `wss://polkadot.rpc.robonomics.network/`. Autoriza el sitio en tu extensión de monedero para que aparezca tu cuenta.

Para ver bloques, cuentas y transferencias también puedes usar el explorador de bloques [scan.robonomics.network](https://scan.robonomics.network).

<div id="4-send-your-first-record"></div>

## 4. Enviar tu primer registro

El primer paso más sencillo es un registro de datalog: un dato breve guardado on-chain bajo tu cuenta.

1. En Polkadot.js Apps, abre **Developer → Extrinsics**.
2. Elige tu cuenta y después `datalog` y `record`.
3. Introduce tus datos, hasta 512 bytes. Vale con texto plano.
4. Envía la transacción y fírmala en el monedero.

Para leerlo, abre **Developer → Chain state**, elige `datalog` y `datalogIndex` y consulta tu cuenta. Verás qué posiciones contienen tus registros. Después consulta `datalogItem` con tu cuenta y un número de posición. Cada registro lleva una marca de tiempo.

Datalog es uno de los [pallets heredados](/docs/legacy-pallets/#datalog). Sigue funcionando y sirve como primera prueba, pero los proyectos nuevos deberían usar el árbol de dispositivos.

## 5. Siguiente paso: describir tus dispositivos

El núcleo de Robonomics es el árbol de dispositivos. Creas un nodo para tu instalación, añades nodos para sus partes y dispositivos, y decides quién puede actualizarlos. Consulta [Árbol de dispositivos (CPS)](/docs/device-tree/) y después [Conectar dispositivos](/docs/connect-devices/).
