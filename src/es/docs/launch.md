---
title: Lanzamiento
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Otra característica básica de la paracadena de Robonomics es el palet de Lanzamiento. Te permite enviar comandos a las cuentas/cualquier entidad detrás de ellas. Estos comandos incluyen parámetros para especificar la tarea a ejecutar.**

{% roboWikiNote {title:"Nodo de Desarrollo", type: "Advertencia"}%} Por favor, presta atención a que estos y los siguientes tutoriales se demuestran en una instancia local del Nodo de Robonomics. Configura el tuyo con [estas instrucciones](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Navega a Desarrollador -> Extrínsecos

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"extrínsecos"} %}{% endroboWikiPicture %}

## 2. Elige lanzamiento -> lanzamiento de la lista desplegable de extrínsecos posibles

También elige una cuenta con la que desees enviar el extrínseco. Rellena el campo de dirección objetivo y de parámetros.

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"lanzamiento"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32 bytes", type: "nota"}%}   Lanzamiento admite cadenas de 32 bytes de longitud como comandos ([fuente](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  así que hay margen para improvisar aquí:
  - Para comandos básicos como alternar, puedes usar "0x0000000000000000000000000000000000000000000000000000000000000001" o
  "0x0000000000000000000000000000000000000000000000000000000000000000".
  - Para comandos avanzados que incluyen formato similar a JSON, puedes usar [IPFS](https://ipfs.tech/) CID formateado de una
  [manera adecuada](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
{% endroboWikiNote %}

## 3. Enviar transacción

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"enviar"} %}{% endroboWikiPicture %}

## 4. Revisa tu lanzamiento en los eventos

Para esto, navega a *Red -> Explorador* y encuentra una lista de eventos a la derecha. Haz clic en un ícono de triángulo para expandir.

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"evento"} %}{% endroboWikiPicture %}
