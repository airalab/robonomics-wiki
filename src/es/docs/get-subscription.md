---
title: Cómo Comprar una Suscripción

contributors: [LoSk-p, PaTara43]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Pagar comisiones por transacciones en blockchain es molesto. Imagina un dispositivo IoT que envía telemetría cada 5-10 minutos. Esto te hará pagar bastante a lo largo del mes. Una de las características clave de la Red Robonomics es la suscripción al Servicio Web Robonomics (RWS). ¡Paga mensualmente y olvídate del costo de las transacciones! Para obtener información teórica, consulta [este](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) artículo.**


{% roboWikiNote {title:"Parachain", type: "warning"}%}   Presta atención, este tutorial muestra cómo comprar una suscripción en la parachain de Robonomics Kusama. También puedes seguir los mismos pasos en tu [nodo local](/docs/run-dev-node).
Antes de comenzar, hay una forma "difícil" de comprar una suscripción. Existe una forma convencional de hacerlo a través de [Robonomics DApp](https://dapp.robonomics.network/#/).
{% endroboWikiNote %}

## Ofertar en una Subasta

Las suscripciones en Robonomics se venden mediante un modelo de subasta. Para obtener una, necesitas ofertar en una subasta y ganarla (no te preocupes, es rápido).

En `Desarrollador/Estado de la cadena` puedes ver las subastas disponibles.
Elige `rws` y `auctionQueue` y presiona el botón `+`, verás los IDs de las subastas disponibles:

{% roboWikiPicture {src:"docs/rws/queue.png", alt:"queue"} %}{% endroboWikiPicture %}

Puedes ver información sobre cualquier suscripción con `rws` `auction` e ID de la subasta (el ID de la subasta en la imagen es 79):

{% roboWikiPicture {src:"docs/rws/auction.png", alt:"auction"} %}{% endroboWikiPicture %}

En la información sobre la subasta puedes ver el campo `winner`, por el momento es `null`, lo que significa que nadie tiene esta suscripción y tú puedes obtenerla. Para hacerlo, ve a `Desarrollador/Extrínseco`, elige tu cuenta y `rws -> bid`. También establece el ID de la subasta (79) y la cantidad de unidades a ofertar (más de 1000000000 Wn):

{% roboWikiPicture {src:"docs/rws/bid.png", alt:"bid"} %}{% endroboWikiPicture %}

Envía la transacción y verifica la información sobre la subasta con ID 79 (en `Estado de la cadena` elige `rws -> auction` e ID 79):

{% roboWikiPicture {src:"docs/rws/auc_win.png", alt:"auc_win"} %}{% endroboWikiPicture %}

Ahora en el campo `winner` verás la dirección de tu cuenta, lo que significa que esta cuenta tiene la suscripción 79. Una subasta comienza con la primera oferta y dura unos cuantos bloques, así que si alguien ofrece más tokens que tú en los siguientes bloques, esa persona será la ganadora y se llevará la suscripción.

Ahora puedes agregar dispositivos. Los dispositivos son cuentas que pueden usar esta suscripción y enviar extrínsecos sin cargo.
Para probarlo, crea una nueva cuenta sin tokens y agrégala como dispositivo.

Para agregar dispositivos, elige `rws -> setDevices` en `Desarrollador/Extrínseco`. Luego presiona el botón `Agregar elemento` y elige la cuenta recién creada sin tokens:

{% roboWikiPicture {src:"docs/rws/set_devices.png", alt:"set_devices"} %}{% endroboWikiPicture %}

Envía la transacción. Ahora puedes verificar la lista de dispositivos en `Estado de la cadena` con `rws -> devices`. Allí verás la dirección de tu cuenta sin tokens. Elige la cuenta que ha comprado la suscripción y presiona `+`:

{% roboWikiPicture {src:"docs/rws/devices.png", alt:"devices"} %}{% endroboWikiPicture %}

Ahora puedes intentar [enviar un lanzamiento](/docs/subscription-launch) extrínseco utilizando la suscripción.