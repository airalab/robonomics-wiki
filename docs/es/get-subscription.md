---
title: Cómo comprar una suscripción

contributors: [LoSk-p, PaTara43]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Pagar comisiones por transacciones en blockchain es molesto. Imagina un dispositivo IoT que envía telemetría cada 5-10 minutos. Esto te hará pagar bastante durante el mes. Una de las características clave de Robonomics Network es RWS - Suscripción al Servicio Web de Robonomics. ¡Paga mensualmente y olvídate del costo de las transacciones! Para obtener información teórica, consulta [este](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) artículo.**

<robo-wiki-note type="warning" title="Parachain">

  Presta atención a que este tutorial demuestra cómo comprar una suscripción en la parachain de Robonomics Kusama. También puedes realizar todos los mismos pasos en tu [nodo local](/docs/run-dev-node).

  Una cosa más antes de comenzar. Esta es una forma "difícil" de comprar una suscripción. Existe una forma convencional de hacerlo a través de [Robonomics DApp](https://dapp.robonomics.network/#/).

</robo-wiki-note>

## Pujar en una subasta

Las suscripciones en Robonomics se venden con un modelo de subasta. Para obtener una, debes pujar en una subasta y ganarla (no te preocupes, es rápido).

En `Developer/Chain state` puedes ver las subastas disponibles. 
Elige `rws` y `auctionQueue` y presiona el botón `+`, verás los IDs de las subastas disponibles:

![queue](../images/rws/queue.png)

Puedes ver información sobre cualquier suscripción con `rws` `auction` e ID de la subasta (el ID de la subasta en la imagen es 79):

![auction](../images/rws/auction.png)

En la información sobre la subasta puedes ver el campo `winner`, en este momento es `null`, lo que significa que nadie tiene esta suscripción y tú puedes obtenerla. Para eso, ve a `Developer/Extrinsic`, elige tu cuenta y `rws -> bid`. También establece el ID de la subasta (79) y la cantidad de unidades a pujar (más de 1000000000 Wn):

![bid](../images/rws/bid.png)

Envía la transacción y verifica la información sobre la subasta con ID 79 (en `Chain state` elige `rws -> auction` e ID 79):

![win](../images/rws/auc_win.png)

Ahora en el campo `winner` verás la dirección de tu cuenta, lo que significa que esta cuenta tiene la suscripción 79. Una subasta comienza con la primera puja y dura unos pocos bloques, por lo que si alguien puja más tokens que tú en los siguientes bloques, esa persona será la ganadora y se llevará la suscripción.

Ahora puedes agregar dispositivos. Los dispositivos son cuentas que pueden usar esta suscripción y enviar extrinsics sin cargo.
To test it create a new account with no tokens and add it to devices. 

Para agregar dispositivos, elige `rws -> setDevices` en `Developer/Extrinsic`. Luego presiona el botón `Add Item` y elige la cuenta recién creada sin tokens:

![set_devices](../images/rws/set_devices.png)

Envía la transacción. Ahora puedes verificar la lista de dispositivos en `Chain state` con `rws -> devices`. Allí verás la dirección de tu cuenta sin tokens. Elige la cuenta que ha comprado la suscripción y presiona `+`:

![devices](../images/rws/devices.png)

Ahora puedes intentar [enviar un lanzamiento](/docs/subscription-launch) extrinsic usando la suscripción.