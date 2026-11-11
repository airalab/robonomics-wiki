---
title: Usar robonomics.app
contributors: [vol4tim, positivecrash, ensrationis]
---

[robonomics.app](https://robonomics.app) es la aplicación web de Robonomics. Con ella compras una suscripción, conectas Home Assistant, controlas tu casa desde cualquier navegador y consultas el árbol de dispositivos y los datos de los sensores. Esta página la recorre pantalla por pantalla.

Necesitas una extensión de monedero de Polkadot con una cuenta en Robonomics. Para comprar algo o enviar una transacción, la cuenta necesita un poco de XRT. Consulta [Primeros pasos](/docs/getting-started/).

## Conectar el monedero

El botón del monedero está arriba a la derecha. Elige una cuenta de tu extensión y permite que el sitio la use. El mismo botón cambia la red. Usa Polkadot.

## Comprar una suscripción

**Buy/renew a subscription** en el menú.

- La página muestra el precio, el tiempo de activación (unos dos minutos) y cuántas suscripciones hay disponibles ahora mismo.
- Tu saldo tiene que cubrir el precio más una pequeña comisión.
- Una sola transacción puja en una subasta libre y añade tu cuenta a la suscripción.
- Si no hay suscripciones disponibles, solo se abren nuevas después de una votación de gobernanza. Consulta [Pallets heredados](/docs/legacy-pallets/#current-state).

La suscripción permite a las cuentas incluidas en ella enviar transacciones sin comisión. Es lo que usa Home Assistant para comunicarse con la cadena. Detalles: [Suscripciones RWS](/docs/legacy-pallets/#rws-subscriptions).

## Añadir un setup

Un setup es tu casa tal como la ve la aplicación: una suscripción y las cuentas vinculadas a ella. **New setup** en el menú ofrece tres formas de añadir uno:

- **Por la dirección del propietario.** Pega la dirección que tiene la suscripción. La aplicación encuentra la suscripción y muestra su fecha de fin, aunque ya haya caducado.
- **Con la extensión.** Elige la cuenta del propietario en tu monedero en lugar de escribirla.
- **Desde un archivo.** Sube una copia de seguridad que exportaste antes.

La lista de setups se guarda solo en tu navegador. Quitar un setup de la aplicación lo quita de esa lista, y no cambia nada on-chain.

## Your setup

**Your setup** muestra una suscripción:

- **Active until.** La fecha de fin, en rojo cuando ya ha pasado.
- **Owner.** La cuenta que tiene la suscripción.
- **Controller.** La cuenta que usa tu Home Assistant para escribir en la cadena. La crea la integración de Home Assistant; tú la pegas aquí.
- **Users.** Las cuentas que pueden controlar la casa. Añadir o quitar un usuario es una transacción del propietario.
- **Subscription backup.** Exporta el setup a un archivo. Para pasar a otro navegador o dispositivo, sube ese archivo en **New setup**.

## Dispositivos y control

**Devices & Control** abre tu panel de Home Assistant en el navegador.

- Elige un usuario e introduce su frase clave. La aplicación la usa para descifrar los datos de Home Assistant. Se queda en el navegador.
- Marca **Keep me signed in** solo en un dispositivo de confianza.
- La aplicación se conecta a Home Assistant directamente, de igual a igual. Cuando no es posible una conexión directa, pasa por un relay. Los datos van cifrados todo el camino.

Para que esta página funcione, Home Assistant necesita la integración de Robonomics. En [Conectar dispositivos](/docs/connect-devices/#home-assistant) se indica qué integraciones existen y lo actualizadas que están.

## Árbol de dispositivos

**Device tree** en el menú muestra el [árbol de dispositivos](/docs/device-tree/) de Robonomics 5.0.

- La página de inicio lista los nodos raíz y sus propietarios.
- Abre un nodo por su número o por la cuenta de su dispositivo.
- La página de un nodo muestra la ruta hasta la raíz, el propietario, la cuenta del dispositivo, `meta` y `payload` (JSON y texto se muestran como texto), los hijos y las entradas de acceso.
- Con una cuenta conectada puedes crear un nodo raíz, añadir hijos a los nodos que son tuyos y editar `meta` y `payload` donde eres el propietario o tienes acceso `Write`. Todo lo que hay en el árbol es público.

## Datalog

**Send your first record** en la página de inicio abre la página de Datalog.

- Escribe hasta 512 bytes y envía. La comisión es muy inferior a 0,001 XRT.
- Debajo ves los registros de cualquier cuenta, los más recientes primero. La cadena guarda los últimos 128 registros por cuenta.

Datalog es un [pallet heredado](/docs/legacy-pallets/#datalog). Sirve como primera prueba. Para dispositivos, usa el árbol de dispositivos.

## Sensores y gemelos digitales

- **Altruist.** Abre `robonomics.app/#/altruist/<sensor address>` para ver las lecturas del sensor registradas on-chain: partículas, ruido, temperatura, humedad y presión en hPa en su propio eje. Consulta [Altruist y sensors.social](/docs/altruist/).
- **Monitor de energía.** Abre `robonomics.app/#/energy-monitor/<address>` para ver lo mismo de un monitor de energía.
- **Gemelo digital.** Lista tus gemelos y las cuentas detrás de cada tema. Consulta [DigitalTwin](/docs/legacy-pallets/#digitaltwin).

Si una dirección no tiene lecturas, la página lo indica en lugar de quedarse cargando.

## Si algo falla

- **La aplicación se conecta a la red equivocada.** La aplicación recuerda una dirección de red que se pasó una vez en un enlace. Abre una vez `https://robonomics.app/?rpc=wss://polkadot.rpc.robonomics.network/` para volver.
- **Un enlace de Uniswap muestra otro token.** El XRT de producción en Ethereum es `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. El token antiguo `0x7dE9…1cb7` no es XRT de producción. Consulta [XRT en otras redes](/docs/xrt-migration/).
- **No se puede gestionar una suscripción de Kusama.** Robonomics en Kusama se ha detenido, así que la app solo trabaja con suscripciones en Polkadot. Consulta [XRT en otras redes](/docs/xrt-migration/).
- **Cualquier otra cosa.** Abre un issue en [github.com/airalab/robonomics.app](https://github.com/airalab/robonomics.app/issues). Añade la versión de compilación que aparece en la consola del navegador. Se imprime al arrancar la aplicación.
