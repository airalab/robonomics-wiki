---
title: Cómo enviar un lanzamiento con suscripción

contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"Parachain", type: "warning"}%}Presta atención, este tutorial demuestra cómo usar una suscripción en la parachain de Robonomics Kusama. También puedes realizar los mismos pasos en tu [nodo local](/docs/run-dev-node). {% endroboWikiNote %}


Si tu dirección tiene una suscripción activa, entonces cualquier dispositivo configurado con la clave de esa cuenta puede enviar extrínsecos sin cargo.
Intentemos enviar el comando `lanzamiento`.

Ve a la página `Desarrollador/Extrínsecos`, luego elige tu cuenta (la de la lista de dispositivos) y selecciona `rws -> call(subscriptionId, call)`.
Luego, en el campo `subscriptionId`, pega la dirección del propietario de la suscripción (quien pujó en la subasta) y en el siguiente campo
elige `lanzamiento -> lanzamiento(robot, param)`. En el campo `robot`, escribe la dirección a la que deseas enviar la transacción de `lanzamiento`
e inserta el comando (para ver la descripción del comando de lanzamiento, consulta [aquí](/docs/launch)). Luego envía la transacción:

{% roboWikiPicture {src:"docs/rws/launch.png", alt:"lanzamiento"} %}{% endroboWikiPicture %}


Ahora ve a la página `Red/Explorador`, y en el área de `Eventos Recientes` verás dos eventos que creaste; `rws.NewCall` y `lanzamiento.NewLaunch`

{% roboWikiPicture {src:"docs/rws/events.png", alt:"eventos"} %}{% endroboWikiPicture %}