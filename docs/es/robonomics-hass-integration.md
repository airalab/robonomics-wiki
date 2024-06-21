---
title: Configuración de integración de Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
---

**En este artículo, agregarás Robonomics a Home Assistant. Esto permite que Home Assistant registre registros de datos con datos cifrados en Robonomics Parachain y escuche comandos de lanzamiento desde el parachain para controlar dispositivos inteligentes. La integración utiliza IPFS para almacenar datos y enviar hashes de IPFS a funciones de registro de datos o lanzamiento.**

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. En la interfaz web de Home Assistant, ve a `Settings` -> `Device & Services` y presiona `ADD INTEGRATION`. Busca `Robonomics`.

2. Haz clic en Robonomics y completa la configuración: 

- Agrega la semilla de la cuenta `SUB_CONTROLLER` a la semilla de la cuenta del controlador.
- Agrega la dirección pública de la cuenta `SUB_OWNER` a la dirección del propietario de la suscripción.
- Establece el intervalo de envío de datos (por defecto es de 10 minutos).
- (Opcional) Puedes agregar credenciales para el servicio de anclaje Pinata u otro gateway personalizado para difundir tus datos de manera más amplia en la red IPFS.

3. Presiona `SUBMIT` después de terminar la configuración. Si completaste todo correctamente, verás la ventana de éxito.

¡Eso es todo! Has configurado completamente la integración de Robonomics en Home Assistant. Ahora puedes usar todos los 
Servicios web de Robonomics. Para obtener más información sobre ellos, ve a la sección ["Uso"](/docs/global-administration).
