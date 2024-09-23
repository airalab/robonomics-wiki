---
title: Actualiza tu Home Assistant Docker o Core para sistemas operativos tipo Unix
contributors: [PaTara43]
tools:
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Integración Robonomics Home Assistant 1.8.5-beta
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.2
    https://github.com/Multi-Agent-io/robonomics-interface/
  - HACS 1.34.0
    https://hacs.xyz/docs/setup/download



---

**Este artículo contiene instrucciones para actualizar tu Home Assistant Docker o Core existente (en un sistema operativo tipo Unix) con la integración de Robonomics.**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"DESCARGO DE RESPONSABILIDAD", type: "warning"}%}
  1. Se asume que Docker está instalado correctamente.
  2. Se asume que se utilizan las imágenes y contenedores predeterminados de Docker de Home Assistant o Home Assistant Core.
  3. IPFS y Libp2p-ws-proxy se instalarán como contenedores de Docker.
{% endroboWikiNote %}


## Instalación

Descarga el script de instalación y ejecútalo en la terminal:

{% codeHelper { additionalLine: "nombre_usuario_rasppi@nombre_host_rasppi"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

Comprobará si Docker está instalado correctamente. Luego, intentará encontrar IPFS y sugerirá revisar la configuración si IPFS está instalado. Si no se encuentra IPFS, el script instalará tanto IPFS como el Proxy Libp2p-ws. Verás la siguiente salida:

{% codeHelper { additionalLine: "nombre_usuario_rasppi@nombre_host_rasppi"}%}

```shell
Docker instalado
$El usuario pertenece al grupo docker.
Comprobando si IPFS está instalado... Puede tardar unos minutos. Por favor, espera
<...>
 ✔ Contenedor ipfs-daemon      Iniciado
 ✔ Contenedor lipb2p-ws-proxy  Iniciado
¡Todo listo!
``` install_integration_core.sh
```

{% endcodeHelper %}

Si IPFS ya está instalado, verás la siguiente salida:
```shell
Docker instalado
$El usuario pertenece al grupo docker.
Comprobando si IPFS está instalado... Puede tardar unos minutos. Por favor, espera
Se ha encontrado una instancia de IPFS. Asegúrate de que tu configuración esté correctamente establecida con los siguientes ajustes:
      - 'Gateway': '/ip4/0.0.0.0/tcp/8080'
      - Los puertos 4001, 5001 y 8080 están disponibles.
      Además, agrega los siguientes nodos de inicio:
      1. '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8'
      2. '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
      3. '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      ¿Tu configuración está establecida correctamente? [sí/No]:

```
En este caso, necesitas ajustar tu archivo de configuración de IPFS y confirmarlo.

{% roboWikiNote {title:"¡Atención!", type: "warning"}%} ¡La configuración adecuada de IPFS es importante; no te saltes este paso!{% endroboWikiNote %}

## Descargar Integración Robonomics

Utilizaremos [HACS](https://hacs.xyz/) para instalar la integración. Si HACS aún no está instalado en tu Home Assistant, primero necesitas [instalarlo](https://hacs.xyz/docs/setup/download/).

Luego, en tu Home Assistant, ve a HACS y busca `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Ábrelo y haz clic en `Descargar` en la esquina inferior derecha. La descarga del repositorio puede tardar un tiempo.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

Eso es todo. Continúa con el siguiente artículo.