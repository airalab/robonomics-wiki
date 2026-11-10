---
title: Pallets heredados
contributors: [PaTara43, nakata5321, LoSk-p, ensrationis]
---

Cinco pallets de versiones anteriores de Robonomics siguen en el runtime: Datalog, Launch, RWS, DigitalTwin y Liability. El [README del nodo](https://github.com/airalab/robonomics#readme) los marca como obsoletos: «following pallets will be removed in near future». No se ha anunciado una fecha de retirada.

Hoy siguen funcionando on-chain, y algunas aplicaciones e integraciones los usan. Para proyectos nuevos, empieza por el [árbol de dispositivos](/docs/device-tree/).

| Pallet | Qué hace | Sucesor |
|---|---|---|
| Datalog | Guarda registros breves bajo tu cuenta | Árbol de dispositivos; el almacenamiento de 5.0 está planificado |
| Launch | Envía un comando firmado a la cuenta de un dispositivo | — |
| RWS | Suscripciones para transacciones sin comisión | Suscripciones de 5.0 (en desarrollo) |
| DigitalTwin | Asocia los temas de un gemelo digital a cuentas | Árbol de dispositivos |
| Liability | Acuerdos entre partes con un informe al final | — |

## Datalog

Datalog guarda registros breves on-chain bajo tu cuenta. Cada registro lleva una marca de tiempo.

- `record(record)` añade un registro de hasta 512 bytes.
- `erase()` borra todos tus registros.
- Cada cuenta conserva sus **últimos 127 registros**. Los más antiguos se sobrescriben. (La ventana tiene 128 posiciones, y una siempre queda libre.)
- Para datos más grandes, súbelos a IPFS y registra el CID.
- Se leen con las consultas de almacenamiento `datalog.datalogIndex(account)`, que da la primera y la última posición, y `datalog.datalogItem([account, slot])`. El evento es `NewRecord`.
- No hay depósito, solo la comisión normal. En el momento de escribir esto, un registro completo de 512 bytes cuesta unos 0,0006 XRT.
- Con una suscripción RWS, un registro se puede enviar sin comisión a través de `rws.call`.

Quién lo usa hoy: el Robonomics Report Service para Home Assistant, los agentes de conectividad de sensors.social y los gráficos de Altruist y del monitor de energía en robonomics.app.

En [Primeros pasos](/docs/getting-started/#4-send-your-first-record) hay una guía para enviar un primer registro.

## Launch

Launch envía un comando firmado a un dispositivo.

- `launch(robot, param)`: `robot` es la cuenta del dispositivo y `param` son 32 bytes. Una convención habitual es poner ahí el digest de un CID de IPFS.
- El dispositivo escucha los eventos `NewLaunch(sender, robot, param)` con su dirección.
- Cualquiera puede enviar un launch a cualquier dirección. El dispositivo tiene que comprobar quién es el remitente.
- El pallet también escribe `param` en un único valor global `Goal`, que cada launch de cualquiera sobrescribe. Usa los eventos, no este valor de almacenamiento.
- La comisión es más o menos la de un registro corto de datalog. Con una suscripción RWS se puede enviar sin comisión.

robonomics.app usa Launch para controlar Home Assistant, y el antiguo wrapper de ROS 2 lo usaba para arrancar robots.

<div id="rws-subscriptions"></div>

## Suscripciones RWS

RWS (Robonomics Web Services) da a una cuenta transacciones sin comisión.

- Dos tipos: `Daily { days }` y `Lifetime { tps }`.
- Un dispositivo incluido en la suscripción envía llamadas a través de `rws.call(subscription_owner, call)` y no paga comisión. La capacidad gratuita se acumula con el tiempo. En una suscripción Daily se acumula a 10 000 µTPS, lo equivalente a 0,01 transferencias simples por segundo.
- `set_devices(devices)` indica hasta 32 cuentas de dispositivo que pueden usar la suscripción. Reemplaza la lista entera. Solo un dispositivo de la lista puede usar `rws.call`.
- `transfer(target)` traspasa tu suscripción a una cuenta que no tenga ninguna.

### Cómo se obtiene una suscripción

- Las suscripciones se venden en subasta. `bid(index, amount)`: la primera puja debe superar 1 XRT. Las pujas quedan reservadas. Las subastas con alguna puja se cierran cada 10 bloques. La puja ganadora se quema y la suscripción queda registrada.
- La página **Buy a subscription** de [robonomics.app](https://robonomics.app) puja en una subasta libre y añade tu propia cuenta como dispositivo en una sola transacción. Necesitas un saldo superior al precio más 0,01 XRT. La aplicación se niega si no hay ninguna subasta libre.

<div id="current-state"></div>

### Estado actual

- Solo Root puede iniciar subastas nuevas. Como no hay Sudo, cada nueva tanda de subastas necesita un referéndum Root. Las subastas libres pueden agotarse hasta que se apruebe uno.
- Las suscripciones emitidas por el oráculo (por ejemplo, a partir de los tokens RWS en Ethereum, un experimento de 2021) no están conectadas: la cuenta del oráculo no está configurada. La página de tokenómica dice que RWS se conectará a la red de producción cuando los saldos de XRT de Kusama pasen a Polkadot, primero para proyectos no comerciales como sensors.social.
- El sucesor es la Subscription de 5.0. Con ella, un dispositivo podrá usar la red sin tener XRT propio. Está en desarrollo y todavía no está en el runtime.

## DigitalTwin

Un gemelo digital es una lista de temas, cada uno vinculado a una cuenta que aporta sus datos.

- `create()` crea un gemelo.
- `set_source(id, topic, source)` vincula un tema de 32 bytes a una cuenta de origen.
- `remove_source(id)` elimina el origen.

El [árbol de dispositivos](/docs/device-tree/) lo reemplaza.

## Liability

Liability registra acuerdos firmados entre partes.

- `create(agreement)` registra un acuerdo firmado. Su parte técnica apunta a IPFS.
- `finalize(report)` lo cierra con un informe.

El pallet también incluye un mercado sencillo para este tipo de acuerdos. No se ha anunciado ningún sucesor.
