---
title: XRT y gobernanza
contributors: [Leemo94, ensrationis]
---

XRT es el token de la red Robonomics. Con él pagas la nube y votas sobre cómo cambia la red. Esta página trata ambas cosas.

## Para qué se usa XRT

- **Comisiones.** Cada transacción paga una comisión en XRT. Todas las comisiones y propinas van al fondo de los collators.
- **Suscripciones.** Las suscripciones actuales (RWS) se ganan en subasta, y la puja ganadora se quema. Consulta [Pallets heredados](/docs/legacy-pallets/#rws-subscriptions).
- **Votos.** Los poseedores de XRT deciden los referendos.
- **Fianza de collator.** Un candidato a collator deposita XRT como fianza. Consulta [Ejecutar un collator](/docs/run-collator/).

## Unidades y suministro

- XRT tiene 9 decimales. 1 XRT = 1000 Glushkov (mXRT) = 1 000 000 Coase (µXRT).
- El depósito existencial es 1 Coase, es decir, 0,000001 XRT.
- El runtime emite 0,0042 XRT para el autor de cada bloque como recompensa de collator. La tokenómica limita la emisión para collators a un máximo de 25 000 XRT al año.
- La tokenómica fija un suministro máximo de 5 100 000 XRT. La distribución y el ciclo de vida del token están en la [página de tokenómica](https://robonomics.network/tokenomics/).

XRT también existe en Ethereum y en Polkadot Asset Hub. Consulta [XRT en otras redes](/docs/xrt-migration/).

## Gobernanza

Robonomics usa el OpenGov estándar de Polkadot. No hay clave Sudo: desde el runtime 52 (octubre de 2026), todo cambio privilegiado, incluidas las actualizaciones del runtime, necesita un referéndum. El propio Sudo se eliminó mediante un referéndum. No hay consejo, ni fellowship, ni track de tesorería.

Un referéndum se aprueba cuando se cumplen dos umbrales a la vez:

- **Approval**: la proporción de votos «aye» entre los votos emitidos.
- **Support**: la proporción de todo el XRT que votó «aye».

Ambos empiezan altos y bajan a lo largo del periodo de decisión. Cuando un referéndum se aprueba y se mantiene durante su periodo de confirmación, la llamada se ejecuta.

### Tracks

| | Root | Whitelisted Caller |
|---|---|---|
| Uso | Actualizaciones del runtime y cualquier otra llamada privilegiada: fianza y límites de los collators, subastas RWS, configuración | Una vía rápida para una llamada concreta que el Core Team ha puesto en la lista blanca |
| Referendos en decisión a la vez | 1 | 10 |
| Depósito de decisión | 5000 XRT | 1 XRT |
| Periodo de preparación | 12 horas | 5 minutos |
| Periodo de decisión | 14 días | 3 días |
| Periodo de confirmación | 24 horas | 20 minutos |
| Retraso mínimo de ejecución | 1 hora | 5 minutos |
| Approval | 90 % → 51 % a lo largo del periodo de decisión | 99 % → 80 % |
| Support | 50 % → 15 % | 2 % → 1 % |

Son los valores del runtime actual. Cambiarlos requiere un referéndum Root.

### Otros depósitos

- **Depósito de envío:** 10 XRT. Cualquier cuenta puede enviar un referéndum.
- **Depósito de preimagen:** 100 XRT más 0,00001 XRT por byte de la llamada. El código del runtime marca estos valores como provisionales, así que pueden cambiar.
- Un referéndum que no empieza su decisión en 14 días caduca.

### Core Team y lista blanca

El Core Team es un colectivo pequeño de 7 miembros como máximo. Solo un referéndum Root puede cambiar su composición.

La lista blanca funciona así:

1. El Core Team vota para poner en la lista blanca el hash de una llamada exacta. Debe estar de acuerdo al menos la mitad de todos los miembros. Una moción del Core Team dura 3 días.
2. Ponerla en la lista blanca no ejecuta nada. La llamada sigue necesitando un referéndum en el track Whitelisted Caller.
3. Una llamada que no está en la lista blanca no puede pasar por la vía rápida. Puede seguir pasando por el track Root.

Así que hay dos maneras de hacer un cambio privilegiado: un referéndum Root, o una llamada en la lista blanca más un referéndum rápido. Ambas terminan en una votación de los poseedores de XRT.

<div id="how-to-propose-a-change"></div>

## Cómo proponer un cambio

Los pasos que publicó el equipo:

1. Describe la idea en un issue en [airalab/robonomics](https://github.com/airalab/robonomics/issues).
2. Envía un referéndum en Polkadot.js Apps, en la sección Governance, conectado a la red Robonomics.
3. Cuéntaselo a la comunidad.

Lo que pasa on-chain:

1. La llamada se guarda como preimagen (depósito de preimagen).
2. El referéndum se envía a un track (depósito de envío de 10 XRT).
3. Alguien coloca el depósito de decisión: 5000 XRT en Root, 1 XRT en Whitelisted Caller. Cualquiera puede colocarlo.
4. El referéndum entra en decisión tras el periodo de preparación, una vez colocado el depósito de decisión y cuando el track tiene un hueco libre. Después la votación lo decide dentro del periodo de decisión.

## Cómo votar

- Guarda tu XRT en tu propio monedero en la red Robonomics. Los tokens que están en un exchange no pueden votar.
- Vota con convicción: bloquea tu XRT más tiempo para dar más peso a tu voto.

| Bloqueo | Peso del voto |
|---|---|
| Sin bloqueo | 0,1× |
| 7 días | 1× |
| 14 días | 2× |
| 28 días | 3× |
| 56 días | 4× |
| 112 días | 5× |
| 224 días | 6× |

- En lugar de votar tú, puedes delegar tu poder de voto en otra cuenta.

Los referendos abiertos y pasados están en Polkadot.js Apps, en la sección Governance, cuando está conectado al [RPC de Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer).

## Más información

- [Robonomics 5.0: handing the keys to XRT holders](https://robonomics.network/blog/robonomics-5-0-governance/)
- [Sudo is gone: the Robonomics cloud is now run by its community](https://robonomics.network/blog/robonomics-5-0-sudo-removed/)
- [Debate en el foro sobre el diseño de dos tracks](https://forum.polkadot.network/t/robonomics-replacing-sudo-with-a-two-track-opengov-sized-for-a-small-community/18719)
