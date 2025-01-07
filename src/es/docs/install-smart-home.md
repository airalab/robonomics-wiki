---
title: Instalación de Casa Inteligente
contributors: [nakata5321, PaTara43]
herramientas:
  - Home-assistant-web3-build 0.0.5
    https://github.com/airalab/home-assistant-web3-build
  - Home Assistant 2024.11.3
    https://github.com/home-assistant/core
  - Integración de Robonomics Home Assistant 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.40.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Bienvenido a la guía de instalación de Home Assistant con integración de Robonomics. Home Assistant es un sistema de automatización del hogar de código abierto que proporciona un centro centralizado para controlar dispositivos inteligentes en la red de tu hogar. Al integrarse con Robonomics, un servicio en la nube descentralizado, puedes mejorar la funcionalidad y seguridad de tu hogar inteligente. En este artículo, proporcionaremos instrucciones paso a paso sobre cómo instalar Home Assistant con Robonomics, dándote la capacidad de automatizar y controlar varios aspectos de tu hogar utilizando una solución segura y descentralizada. ¡Empecemos!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"instalación"} %}{% endroboWikiPicture %}

## Demo

Aquíes un ejemplo de una instalación completa de integración de Smart Home y Robonomics. Ten en cuenta que el tiempo requerido puede variar dependiendo de la conexión a Internet.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Hardware necesario para la instalación

Si aún no has incorporado Home Assistant en tu configuración de Smart Home, es importante tener en cuenta el equipo que necesitarás para establecer un sistema completo de Smart Home desde cero. El equipo de Robonomics recomienda usar Raspberry Pi 4 como servidor de Smart Home.

{% roboWikiGridWrapper {columns: '2', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (al menos 2 GB de RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Tarjeta SD16 GB</b> {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
    {% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
     <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Dispositivos inteligentes Zigbee (opcionalmente) </b> </a>  {% endroboWikiGrid %}
    {% roboWikiGrid %}     {% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
    <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adaptador Zigbee (opcionalmente) </b> </a>  {% endroboWikiGrid %}
    
{% endroboWikiGridWrapper %}


## 1. Instalar pre-requisitos


{% roboWikiNote {type: "warning", title: "Información importante" }%} Todos estos pasos deben realizarse en Raspberry Pi 4 con el sistema Ubuntu. {% endroboWikiNote %}

Robonomics Docker contiene:
- Home Assistant
- IPFS
- Broker y Integración MQTT- Zigbee2MQTT
- proxy libp2p
- Integración de Robonomics

Primero, necesitas instalar los siguientes paquetes:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

Luego, necesitas instalar Docker en tu Raspberry Pi 4. Puedes encontrar las instrucciones de instalación en [el sitio web oficial](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Información importante" }%} Agrega tu usuario al grupo docker para poder iniciar contenedores de Docker sin permisos de root. Encuentra las [instrucciones aquí](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

## 2. Configurar

Descarga el repositorio de GitHub y navega dentro de él:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Luego, crea un archivo `.env` a partir de `template.env`:


{% codeHelper {copy: true}%}

```
cp template.env .env
```

{% endcodeHelper %}

Después, puedes abrir el archivo `.env` y editar los valores predeterminados, como:
- la ruta al repositorio donde se almacenarán todas las carpetas de configuraciones.
- zona horaria en ["nombre de la base de datos tz"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. Comienzo

Ejecute el script de bash y espere hasta que instale todos los paquetes necesarios:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

El script verificará que todas las acciones requeridas se completen en los pasos anteriores y mostrará un error si algo está incorrecto.

Durante el proceso de instalación pueden ocurrir las siguientes situaciones:
- Si decide no usar el coordinador Zigbee, verá una línea de diálogo confirmando si desea continuar con la instalación:

{% codeHelper %}

```
este script creará todos los repositorios necesarios y comenzará los contenedores de Docker
No se puede encontrar la ubicación del coordinador Zigbee. Por favor, insértelo y ejecute el script nuevamente. El directorio /dev/serial/by-id/ no existe
¿Desea continuar sin el coordinador Zigbee? No se iniciará el contenedor Zigbee2MQTT.
¿Desea proceder? (Y/n)
```

{% endcodeHelper %}


- Si hay varios dispositivos en su Raspberry Pi 4 que utilizan puertos serie, el script preguntará qué dispositivo desea utilizar:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## Post-instalación

Después de que todo haya comenzado, puedes usar el script `update.sh` para actualizar la versión de los paquetes de Docker:
{% codeHelper {copy: true}%}

```
bash update.sh
```

{% endcodeHelper %} 
Este script descargará nuevas versiones, eliminará las versiones antiguas de los paquetes y reiniciará todo automáticamente, guardando todas tus configuraciones.

Para detener todo, utiliza el script `stop.sh`:
{% codeHelper {copy: true}%}

```
bash stop.sh
```

{% endcodeHelper %}

Eso es todo. Continúa con el siguiente artículo.