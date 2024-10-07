---
title: Instalación de Casa Inteligente
contributors: [nakata5321, PaTara43]
herramientas:
  - Home Assistant 2024.6.2
    https://github.com/home-assistant/core
  - Integración de Robonomics Home Assistant 1.8.6
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.38.0
    https://github.com/Koenkk/zigbee2mqtt
---

**Bienvenido a la guía sobre cómo instalar Home Assistant con integración de Robonomics. Home Assistant es un sistema de automatización del hogar de código abierto que proporciona un centro centralizado para controlar dispositivos inteligentes en la red de tu hogar. Al integrarse con Robonomics, un servicio en la nube descentralizado, puedes mejorar la funcionalidad y seguridad de tu hogar inteligente. En este artículo, proporcionaremos instrucciones paso a paso sobre cómo instalar Home Assistant con Robonomics, dándote la capacidad de automatizar y controlar varios aspectos de tu hogar utilizando una solución segura y descentralizada. ¡Comencemos!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"instalación"} %}{% endroboWikiPicture %}

## Demo

Aquí tienes un ejemplo de una instalación completa de Casa Inteligente con integración de Robonomics. Ten en cuenta que el tiempo requerido puede variar dependiendo de la Conexión a Internet.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Hardware necesario para la instalación

Si aún no has incorporado Home Assistant en tu configuración de hogar inteligente, es importante conocer el equipo que necesitarás para establecer un sistema completo de hogar inteligente desde cero. El equipo de Robonomics recomienda usar Raspberry Pi 4 como servidor de hogar inteligente. **Pero también es posible configurar todo en tu PC.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (mínimo 2 GB de RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Tarjeta SD de 16 GB</b> {% endroboWikiGrid %}{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adaptador Zigbee (Opcional) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Dispositivos inteligentes Zigbee (Opcional) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Escritorio para la configuración</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


## 1. Instalar Pre-requisitos

Robonomics Docker contiene:
- Home Assistant
- IPFS
- Broker MQTT e Integración- Zigbee2MQTT
- proxy libp2p
- Integración de Robonomics

Este artículo mostrará el proceso de instalación en un sistema Ubuntu. Primero, necesitas instalar los siguientes paquetes:

```
sudo apt-get install wget unzip git jq
```

Luego, necesitas instalar Docker en tu PC. Puedes encontrar las instrucciones de instalación en [el sitio web oficial](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Información importante"} %} Agrega tu usuario al grupo de docker para poder iniciar contenedores de docker sin permisos de root. Encuentra las [instrucciones aquí](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

## 2. Configuración

Descarga el repositorio de GitHub y navega dentro de él:

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

Luego, crea un archivo `.env` a partir del `template.env`:

```
cp template.env .env
```

Después, puedes abrir el archivo `.env` y editar los valores predeterminados como:
- ruta al repositorio donde se almacenarán todas las carpetas de configuraciones.
- zona horaria en ["nombre de la base de datos tz"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. Comienzo

Ejecute el script de bash y espere hasta que instale todos los paquetes requeridos:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

El script verificará todas las acciones requeridas que completó en los pasos anteriores y mostrará un error si algo está mal.

Durante el proceso de instalación pueden ocurrir las siguientes situaciones:
- Si decide no utilizar el coordinador Zigbee, verá una línea de diálogo confirmando si desea continuar con la instalación:

{% codeHelper %}

```
este script creará todos los repositorios necesarios y comenzará los contenedores de Docker
No se puede encontrar la ubicación del coordinador Zigbee. Por favor, insértelo y ejecute el script nuevamente. El directorio /dev/serial/by-id/ no existe
¿Desea continuar sin el coordinador Zigbee? No se iniciará el contenedor Zigbee2MQTT.
¿Desea proceder? (Y/n)
```

{% endcodeHelper %}


- Si hay varios dispositivos en su PC que utilizan puertos serie, el script preguntará qué dispositivo desea utilizar:

{% codeHelper %}

```
este script creará todos los repositorios necesarios y comenzará los contenedores de Docker
el coordinador Zigbee está instalado
Tiene más de 1 dispositivo conectado. Por favor, elija uno
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## Post-instalación

Después de que todo haya iniciado, puedes usar el script `update.sh` para actualizar la versión de los paquetes de Docker. Este script descargará nuevas versiones, eliminará las versiones antiguas de los paquetes y reiniciará todo automáticamente, guardando todas tus configuraciones.

Para detener todo, utiliza el script `stop.sh`.

Eso es todo. Continúa con el siguiente artículo.