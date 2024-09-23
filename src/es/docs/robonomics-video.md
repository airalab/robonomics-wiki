---
title: Servicio de Video Robonomics
contributors: [nakata5321]
---

Este artículo muestra cómo agregar una cámara IP a Home Assistant y enviar videos al Servicio Web de Robonomics.

Para conectar una cámara a Home Assistant, necesitas conocer su dirección IP y crear una cuenta de cámara local para conectarte al flujo RTSP.

{% roboWikiNote {type: "warning"}%} Dado que esto se hace de manera diferente para cada cámara, este proceso no se considera en este artículo.
{% endroboWikiNote %}

Requisitos:
- Cámara IP
- Cuenta de cámara local configurada
- Dirección IP de la cámara
- Home Assistant configurado

{% roboWikiNote {type: "warning"}%} Este artículo asume que tienes una cámara IP general sin opciones de RTZ (rotar, inclinar, hacer zoom). Si tienes una cámara RTZ, consulta el artículo de ["cámara RTZ"](docs/ptz-camera). Y luego regresa al segundo paso aquí. {% endroboWikiNote %}

## Conectar la Cámara

Primero, necesitas averiguar la URL para el flujo RTSP de la cámara.
Para hacerlo, intenta ingresar la siguiente consulta en Internet: "<NOMBRE_DE_LA_CÁMARA> flujo RTSP".
La URL del flujo debe comenzar con `rtsp://<Dirección_IP>...`.

Este artículo utiliza una cámara "Tapo" y la ruta del flujo es `rtsp://<Dirección_IP>/stream1`.

Abre Home Assistant y ve a "Configuración" -> "Dispositivos y Servicios". Presiona el botón "AGREGAR INTEGRACIÓN" y
comienza a escribir "Cámara Genérica" en la integración. Selecciónala.

{% roboWikiPicture {src:"docs/home-assistant/generic.jpg", alt:"hass"} %}{% endroboWikiPicture %}

En la ventana de configuración proporciona la siguiente información:
- URL de la Fuente del Flujo - La URL del flujo RTSP de la cámara
- Nombre de Usuario - escribe el nombre de usuario de tu cuenta de cámara local
- Contraseña - escribe la contraseña de tu cuenta de cámara local

{% roboWikiPicture {src:"docs/home-assistant/genericconf.jpg", alt:"genericconf"} %}{% endroboWikiPicture %}

Desplázate hacia abajo en la configuración y presiona el botón "Enviar".

En la ventana de vista previa, activa la casilla "Esta imagen se ve bien." y presiona el botón "Enviar". Luego - "Finalizar".

{% roboWikiPicture {src:"docs/home-assistant/preview-camera.jpg", alt:"preview-camera"}%}{% endroboWikiPicture %}

### Agregar al tablero

Además, puedes agregar el flujo a tu tablero. Para hacerlo, ve al tablero y crea una nueva tarjeta "Vista de imagen". Sigue estos pasos:
- Ingresa el "Título" que desees
- Elimina los datos de "Ruta de la imagen"
- Selecciona la cámara en "Entidad de la cámara"
- En "Vista de la cámara", selecciona "en vivo" para que haya menos retraso

Y guárdalo.
{% roboWikiPicture {src:"docs/home-assistant/camera_picture_glance.jpg", alt:"camera_picture_glance"} %}{% endroboWikiPicture %}

## Verificar carpeta de medios

Antes de enviar el video al Servicio de Video de Robonomics, el video debe guardarse en una carpeta y Home Assistant debe tener acceso a esta carpeta.
La opción más sencilla en este caso es utilizar un paquete de medios, en el cual Home Assistant almacena todos los medios.

- Si utilizas HAOS o una imagen preinstalada, tu Home Assistant **ya tiene una carpeta de medios**.
- Si utilizas Home Assistant Core, debes ir a la carpeta `.homeassistant` y crear una carpeta `media` en ella.
- Si utilizas Home Assistant Docker, agrega la línea ` -v /RUTA_A_TUS_MEDIOS:/media \` al comando de Docker.

Para verificar que todo se configuró correctamente, ve a la pestaña "Medios" -> "medios locales" en tu Home Assistant.
Deberías ver una carpeta vacía (sin errores):

{% roboWikiPicture {src:"docs/home-assistant/media-folder.jpg", alt:"media-folder"} %}{% endroboWikiPicture %}

## Llamada de servicio

Para enviar un video a Robonomics, debes llamar a un servicio dedicado en Home Assistant.
En este artículo se hace manualmente, pero puedes crear una automatización para ello.

Para hacerlo, ve a "Herramientas de desarrollador" -> "Servicios" y busca "Robonomics: Guardar grabación en Robonomics".

{% roboWikiPicture {src:"docs/home-assistant/robonomics-service.jpg", alt:"robonomics-service"} %}{% endroboWikiPicture %}

En "Destinos" elige la entidad de tu cámara.
En "Ruta para guardar la grabación" debes proporcionar una ruta absoluta a la carpeta donde Home Assistant puede guardar el video:
- Para la imagen preinstalada - `/home/homeassistant/.homeassistant/media`;
- Para HA OS o Home Assistant Docker - `/media``;
- Para Home Assistant Core - Ruta a la carpeta de medios creada previamente.

Además, puedes elegir la Duración de la grabación.

Completa los datos y llama al servicio con el botón "LLAMAR SERVICIO".

## DAPP

Para ver el video resultante, ve a [Robonomics DAPP](https://vol4tim.github.io/videostream/).

{% roboWikiPicture {src:"docs/home-assistant/video-dapp.jpg", alt:"video-dapp"} %}{% endroboWikiPicture %}

Pega la dirección de la cuenta de tu controlador y haz clic en el botón de abajo. Espera el proceso de "Buscar Gemelos".
Como resultado, obtendrás un CID de IPFS con todos los videos grabados.

{% roboWikiPicture {src:"docs/home-assistant/video-ipfs.jpg", alt:"video-ipfs"} %}{% endroboWikiPicture %}

A continuación, selecciona la cuenta del controlador (o cualquier otra) de la lista desplegable y firma un mensaje para autorización en
la puerta de enlace Web3 IPFS para descargar todos los videos. Como resultado, obtendrás todos los videos grabados por tu hogar inteligente.

{% roboWikiPicture {src:"docs/home-assistant/show-videos.jpg", alt:"show-videos"} %}{% endroboWikiPicture %}

Dado que todos los videos en la carpeta están encriptados con la clave del controlador, necesitas insertarla para descifrar los videos.
Después de eso, se activa el botón de reproducción de video. Haz clic en él para descargar el video.

{% roboWikiPicture {src:"docs/home-assistant/video-seed.jpg", alt:"video-seed"} %}{% endroboWikiPicture %}