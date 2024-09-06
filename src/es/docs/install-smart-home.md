---
title: Instalación de Casa Inteligente
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Integración de Robonomics Home Assistant 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.27.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Bienvenido a la guía de instalación de Home Assistant con integración de Robonomics. Home Assistant es un sistema de automatización del hogar de código abierto que proporciona un centro centralizado para controlar dispositivos inteligentes en la red de tu hogar. Al integrarse con Robonomics, un servicio en la nube descentralizado, puedes mejorar la funcionalidad y seguridad de tu hogar inteligente. En este artículo, proporcionaremos instrucciones paso a paso sobre cómo instalar Home Assistant con Robonomics, dándote la capacidad de automatizar y controlar varios aspectos de tu hogar utilizando una solución segura y descentralizada. ¡Comencemos!**

## Demo

Aquí tienes un ejemplo de una instalación completa de Casa Inteligente y la integración de Robonomics. Ten en cuenta que el tiempo requerido puede variar según la conexión a Internet.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Hardware necesario para la instalación

Si aún no has incorporado Home Assistant en tu configuración de hogar inteligente, es importante conocer el equipo que necesitarás para establecer un sistema completo de hogar inteligente desde cero. El equipo de Robonomics recomienda usar Raspberry Pi 4 como servidor de hogar inteligente. **Pero también es posible configurar todo en tu PC.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (mínimo 2 GB de RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Tarjeta SD de 16 GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adaptador Zigbee (Opcional) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Dispositivos inteligentes Zigbee (Opcional) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Escritorio para la configuración</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

## 1. Instalar Pre-requisitos

Docker de Robonomics contiene:
- Home Assistant
- IPFS
- Broker y Integración MQTT
- Zigbee2MQTT
- Proxy libp2p
- Integración de Robonomics

Este artículo mostrará el proceso de instalación en un sistema Ubuntu. Primero necesitas instalar los siguientes paquetes:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git
```

{% endcodeHelper %}

Luego necesitas instalar Docker en tu PC. Encuentra las instrucciones de instalación en [el sitio web oficial](https://docs.docker.com/engine/install/).

<robo-wiki-note type="warning" title="Información importante">

  Agrega tu usuario al grupo de docker para iniciar contenedores de docker sin permisos de root. Encuentra [instrucciones aquí](https://docs.docker.com/engine/install/linux-postinstall/).

</robo-wiki-note>

## 2. Configurar

Descarga el repositorio de GitHub y navega dentro de él:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Luego, crea un archivo `.env` a partir del `template.env`:


{% codeHelper {copy: true}%}

```
mv template.env .env
```

{% endcodeHelper %}

Después de eso, puedes abrir el archivo `.env` y editar los valores predeterminados como:
- Versiones de paquetes
- Ruta al repositorio donde se almacenarán todas las carpetas de configuraciones.
- Zona horaria en ["nombre de la base de datos tz"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. Iniciar

Ejecuta el script bash y espera hasta que instale todos los paquetes necesarios:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

El script verificará todas las acciones requeridas que completaste en los pasos anteriores y mostrará un error si algo está mal.

Durante el proceso de instalación pueden ocurrir las siguientes situaciones:
- Si decides no usar el coordinador Zigbee, verás una línea de diálogo confirmando si deseas continuar con la instalación:

{% codeHelper %}

```
este script creará todos los repositorios necesarios y iniciará los contenedores de docker
No se puede encontrar la ubicación del coordinador Zigbee. Por favor, insértalo y ejecuta el script nuevamente. El directorio /dev/serial/by-id/ no existe
¿Quieres continuar sin el coordinador Zigbee? No se iniciará el contenedor Zigbee2MQTT.
¿Deseas continuar? (s/n)
```

{% endcodeHelper %}


- Si hay varios dispositivos en tu PC que utilizan puertos serie, el script preguntará qué dispositivo usar:

{% codeHelper %}

```
este script creará todos los repositorios necesarios y iniciará los contenedores de docker
el coordinador Zigbee está instalado
Tienes más de 1 dispositivo conectado. Por favor, elige uno
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

Eso es todo. Continúa con el siguiente artículo.