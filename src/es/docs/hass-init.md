---
title: Inicialización de Home Assistant
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.6.2
    https://github.com/home-assistant/core
---

**Después de instalar Home Assistant, es necesario inicializarlo.**

{% roboWikiPicture {src:"docs/home-assistant/ha_init.png", alt:"ha_init"} %}{% endroboWikiPicture %}

Comienza creando la cuenta de propietario de Home Assistant. Esta cuenta es de administrador y puede realizar cualquier cambio.
Abre un navegador web y ve a `http://%PC_IP_ADDRESS%:8123`. Puedes encontrar la dirección IP de Raspberry Pi usando la [aplicación móvil Fing](https://www.fing.com/products) o la [herramienta de línea de comandos nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).
Si configuraste todo en tu PC, usa `http://localhost:8123`.

{% roboWikiNote {type: "note"}%} La dirección IP puede cambiar con el tiempo debido a la configuración del enrutador {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. En la primera página, ingresa un nombre, nombre de usuario, contraseña y haz clic en el botón `CREAR CUENTA`.

2. En la siguiente pantalla, ingresa un nombre para tu hogar y configura tu ubicación y sistema de unidades. Haz clic en `DETECTAR` para encontrar tu ubicación y configurar tu zona horaria y sistema de unidades en función de esa ubicación. Si no deseas enviar tu ubicación, puedes configurar estos valores manualmente.

3. Después de eso, Home Assistant mostrará los dispositivos que ha descubierto en tu red. No te preocupes si ves menos elementos de los que se muestran a continuación; siempre puedes agregar dispositivos manualmente más tarde. Por ahora, simplemente haz clic en `FINALIZAR` y estarás en la pantalla principal de Home Assistant.

4. Por último, verás la interfaz web de Home Assistant, que mostrará todos tus dispositivos.


## Solución de problemas

1. Si olvidas tu inicio de sesión o contraseña para el usuario local, [consulta este artículo](https://www.home-assistant.io/docs/locked_out/) para restaurar tus credenciales.