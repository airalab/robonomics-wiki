---
title: Lanzamiento
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Otra característica básica de la parachain de Robonomics es el palet de Lanzamiento. Te permite enviar comandos a las cuentas/cualquier entidad detrás de ellas. Estos comandos incluyen parámetros para especificar la tarea a ejecutar.**

<robo-wiki-note type="warning" title="Dev Node">

  Por favor, presta atención a que estos tutoriales se demuestran en una instancia local de Robonomics Node. Configura la tuya con [estas instrucciones](/docs/run-dev-node).

</robo-wiki-note>

## 1. Navegue hasta Developer -> Extrinsics

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. Elige launch -> launch de la lista desplegable de posibles extrínsecos

También elige una cuenta con la que quieras enviar el extrínseco. Rellena el campo de dirección objetivo y el campo de parámetros.

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  Launch admite cadenas de 32 bytes de largo como comandos ([fuente](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  así que aquí hay espacio para improvisar:
  - Para comandos básicos como alternar, puede usar "0x000000000000000000000000000000000000000000000000000000000000001" o
  "0x00000000000000000000000000000000000000000000000000000000000000000".
  - Para comandos avanzados, incluidos los de tipo json, puede utilizar [IPFS](https://ipfs.tech/) CID formateado en un
  [forma correcta](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).

</robo-wiki-note>

## 3. Enviar transacción

<robo-wiki-picture src="launch/submit.jpg" />

## 4. Revisa tu lanzamiento en los eventos

Para esto, navega a *Network -> Explorer* y encuentra una lista de eventos a la derecha. Haz clic en un icono de triángulo para expandirlo.

<robo-wiki-picture src="launch/event.jpg" />
