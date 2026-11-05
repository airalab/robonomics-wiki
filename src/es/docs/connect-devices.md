---
title: Conectar dispositivos
contributors: [Fingerling42, nakata5321, ensrationis]
---

Hay dos formas de llevar dispositivos a Robonomics: a través de Home Assistant, o directamente, con cualquier dispositivo que pueda firmar una transacción o hablar con una pasarela.

El hardware listo para usar y la instalación de hogar inteligente los ofrece Pinout Limited. Consulta [pinout.cloud](https://pinout.cloud) para ver productos y servicios.

## Home Assistant

Hay tres integraciones para Home Assistant. Hacen cosas distintas y no están igual de actualizadas.

| Integración | Qué hace | Estado |
|---|---|---|
| [Robonomics Report Service](https://github.com/PinoutLTD/rrs-ha-integration) (Pinout) | Vigila Home Assistant en busca de problemas. Cifra un informe de error, lo sube a IPFS y registra su CID on-chain. El informe se convierte en un ticket de soporte para tu integrador. También envía una señal diaria de actividad. | Mantenida. Se publica como pre-release. Requiere Home Assistant 2026.3.1 o posterior; se instala desde HACS como repositorio personalizado. |
| [Robonomics integration](https://github.com/airalab/homeassistant-robonomics-integration) (airalab) | Acceso remoto a Home Assistant mediante transacciones cifradas con una suscripción RWS, además de usuarios y copias de seguridad. | Desactualizada. La última versión es la 2.2.1, de octubre de 2025. Usa el antiguo `robonomics-interface` 1.6.3, necesita un nodo IPFS local y sus endpoints por defecto siguen apuntando a Kusama, que se ha detenido. Se puede elegir un endpoint de Polkadot. No se ha probado con el runtime actual. |
| [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration) (airalab) | Lee un sensor Altruist por la red local. No usa la cadena. | Pequeña, solo local. |

La integración Robonomics de airalab depende de las suscripciones RWS. Consulta su estado actual en [Pallets heredados](/docs/legacy-pallets/#rws-subscriptions).

## Cualquier dispositivo

Estas son las piezas para conectar tu propio dispositivo.

1. **Dale al dispositivo su propia cuenta.** La clave se queda en el dispositivo.
2. **Paga sus transacciones.** O bien envías a la cuenta un poco de XRT (en el momento de escribir esto, un registro de datalog cuesta una fracción de milésima de XRT), o bien la añades a una suscripción RWS con `rws.set_devices` (hasta 32 dispositivos) y envías sus transacciones a través de `rws.call`.
3. **Describe la instalación en el árbol de dispositivos.** Crea un nodo para el sitio y nodos para sus dispositivos. Vincula la cuenta del dispositivo a su nodo como identidad del nodo. Concede `Write` a una pasarela si es la pasarela quien escribe por el dispositivo. Consulta [Árbol de dispositivos (CPS)](/docs/device-tree/).
4. **Escribe datos.** Pon el estado actual en el `payload` del nodo (hasta 8 KiB), o escribe registros con `datalog.record` (hasta 512 bytes, [heredado](/docs/legacy-pallets/#datalog)). Sube los datos más grandes a IPFS y escribe su CID.
5. **Envía comandos, si hace falta.** La llamada heredada `launch` envía un evento de comando firmado a la cuenta de un dispositivo. Consulta [Launch](/docs/legacy-pallets/#launch).

Bibliotecas para cada paso: `robonomics-interface` en Python, `@polkadot/api` en JavaScript y `libcps` en Rust junto con la herramienta `cps`. Consulta [Bibliotecas cliente](/docs/client-libraries/).

### Pasarelas para dispositivos pequeños

No todos los dispositivos pueden hablar con la cadena. Estas pasarelas de código abierto hacen de intermediarias:

- **edge** ([airalab/robins](https://github.com/airalab/robins)): recibe mensajes firmados por HTTP y Meshtastic y los reenvía por libp2p GossipSub.
- **mqtt-bridge** ([airalab/robins](https://github.com/airalab/robins)): convierte mensajes MQTT en actualizaciones del árbol de dispositivos.
- **sensors-connectivity** ([airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)): recoge mediciones firmadas de sensores y las pasa a IPFS pubsub y a la parachain. Da servicio a los sensores de [sensors.social](https://sensors.social).

Los nodos relé públicos y su estado están en [pubsub.robonomics.network](https://pubsub.robonomics.network).
