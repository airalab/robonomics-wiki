---
title: Configuración de integración de Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Integración de Robonomics Home Assistant 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
---

**En este artículo, agregarás Robonomics a Home Assistant. Esto permite que Home Assistant registre datalogs con datos cifrados en Robonomics Parachain y escuche comandos de lanzamiento desde la parachain para controlar dispositivos inteligentes. La integración utiliza IPFS para almacenar datos y enviar hashes de IPFS a funciones de datalog o lanzamiento.**

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. En la interfaz web de Home Assistant, ve a `Configuración` -> `Dispositivos y Servicios` y presiona `AGREGAR INTEGRACIÓN`. Busca `Robonomics`.

2. Haz clic en Robonomics y completa la configuración:

- Agrega la semilla de la cuenta `SUB_CONTROLLER` a la semilla de la cuenta del controlador.
- Agrega la dirección pública de la cuenta `SUB_OWNER` al propietario de la suscripción.
- Establece el intervalo de envío de datos (por defecto es de 10 minutos).
- (Opcional) Puedes agregar credenciales para el servicio de anclaje Pinata u otro gateway personalizado para difundir tus datos de manera más amplia en la red IPFS.

{% roboWikiNote {title:"Nota", type: "Nota"}%} En la sección [Configuración de Pinata](/docs/pinata-setup) puedes encontrar información más detallada sobre cómo usar Pinata.{% endroboWikiNote %}

3. Presiona `ENVIAR` después de terminar la configuración. Si completaste todo correctamente, verás la ventana de éxito.

¡Eso es todo! Has configurado completamente la Integración de Robonomics en Home Assistant. Ahora puedes utilizar todos los Servicios Web de Robonomics. Para obtener más información sobre ellos, ve a la sección ["Uso"](docs/add-user).