---
title: Cómo enviar un lanzamiento con suscripción

contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="warning" title="Parachain">

  Preste atención que este tutorial demuestra cómo usar una suscripción en la parachain de Robonomics Kusama. También puede realizar todos los mismos pasos en su [nodo local](/docs/run-dev-node).

</robo-wiki-note>

Si su dirección tiene una suscripción activa, entonces cualquier dispositivo configurado con la cuenta secreta de esa cuenta puede enviar extrínsecos sin cargo. 
Intentemos enviar el comando `launch`.

Vaya a la página `Developer/Extrinsics`, luego elija su cuenta (la de la lista de dispositivos) y seleccione `rws -> call(subscriptionId, call)`. Luego, en el campo `subscriptionId`, pegue la dirección del propietario de la suscripción (quien realizó la oferta en la subasta) y en el siguiente campo elija `launch -> launch(robot, param)`. En el campo `robot`, escriba la dirección a la que desea enviar la transacción `launch` e inserte el comando (para obtener una descripción del comando de lanzamiento, consulte [aquí](/docs/launch)). Luego, envíe la transacción: 

![launch](../images/rws/launch.png)


Ahora ve a la página `Network/Explorer` y en el área de `Recent Events` verás dos eventos que creaste: `rws.NewCall` y `launch.NewLaunch`:

![events](../images/rws/events.png)
