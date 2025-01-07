---
title: Configuración de integración de Robonomics

contribuyentes: [LoSk-p, nakata5321, Fingerling42]
herramientas:
  - Integración de Robonomics Home Assistant 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**En este artículo, agregarás Robonomics a Home Assistant. Esto permite que Home Assistant registre datalogs con datos cifrados en Robonomics Parachain y escuche comandos de lanzamiento desde la parachain para controlar dispositivos inteligentes. La integración utiliza IPFS para almacenar datos y enviar hashes de IPFS a funciones de datalog o lanzamiento.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'configuración de integración'}%} {% endroboWikiPicture %}

En primer lugar, necesitas crear una configuración para tu panel de control. Para ello, abre tu panel de control de Home Assistant y en la esquina superior derecha presiona el botón "Editar panel" (un lápiz).
En el pop-up abierto, haz clic en el ícono de tres puntos y selecciona el botón "Tomar control":

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'configuración de integración'}%} {% endroboWikiPicture %}

Presiona "Tomar control" una vez más:

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'configuración de integración'}%} {% endroboWikiPicture %}

Ahora puedes instalar la integración de Robonomics. Para hacerlo, sigue estos pasos:
 

1. En la interfaz web de Home Assistant ve a `Configuración` -> `Dispositivos y Servicios` y presiona `AGREGAR INTEGRACIÓN`. Busca `Robonomics`.

2. Haz clic en Robonomics, carga tu archivo de configuración (llamado `robonomics.app-settings-<nombre-de-suscripción>-servidor.json`, donde `<nombre-de-suscripción>` es el nombre de tu suscripción), e ingresa la contraseña para la cuenta `CONTROLADOR`. Las instrucciones sobre cómo crear el archivo de configuración se pueden encontrar [aquí](/docs/sub-activate/?topic=smart-home#setup-your-subscription).

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"crear controlador"} %}{% endroboWikiPicture %}

3. Opcional: Puedes elegir qué red utilizar.

4. Presiona `ENVIAR` después de terminar la configuración. Si completaste todo correctamente, verás la ventana de éxito. 

{% roboWikiNote {type: "okay", title: "" }%} La instalación puede tardar aproximadamente de 10 a 15 minutos, dependiendo de tu conexión a internet. {% endroboWikiNote %}

¡Eso es todo! Has configurado completamente la Integración de Robonomics en Home Assistant. Ahora puedes utilizar todos los Servicios Web de Robonomics. Para obtener más información sobre ellos, ve a la sección ["Uso"](/docs/add-user).