---
title: Imagen preinstalada para Raspberry Pi
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.0
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.21.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt
  - Yggdrasil 0.4.7
    https://github.com/yggdrasil-network/yggdrasil-go/
---

**Bienvenido a la guía de instalación de Home Assistant con integración de Robonomics en una Raspberry Pi. Home Assistant es un sistema de automatización del hogar de código abierto que proporciona un centro centralizado para controlar dispositivos inteligentes en su red doméstica. Al integrarse con Robonomics, un servicio en la nube descentralizado, puede mejorar la funcionalidad y seguridad de su hogar inteligente. En este artículo, proporcionaremos instrucciones paso a paso sobre cómo instalar Home Assistant con Robonomics en una Raspberry Pi, lo que le permitirá automatizar y controlar varios aspectos de su hogar utilizando una solución segura y descentralizada. ¡Comencemos!**

## Hardware que necesitas para la instalación

Si aún no has incorporado Home Assistant en tu configuración de hogar inteligente, es importante que conozcas el equipo que necesitarás para establecer un sistema completo de hogar inteligente desde cero.

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>Raspberry Pi 4 (at least 2 GB RAM)</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_3.png" /> 
      <b>SD card 16Gb+</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_7.png" /> 
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"><b>Zigbee smart devices</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. Descarga la imagen preinstalada de Robonomics

La imagen preinstalada de Robonomics contiene:
- Home Assistant Core
- IPFS
- Broker y Integración MQTT
- Zigbee2MQTT
- Robonomics Integration

<robo-wiki-button label="Download image (~528 Mb)" link="QmeDPrNYLQKFCZgPmxyxDWSAXSjSaw7Dx46d9p3JSGM1hA?filename=robonomics_rpi.xz&download=true" />

<robo-wiki-note type="warning" title="For advanced users">

Puedes verificar el código fuente y descargar la última versión de la imagen en [GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)

</robo-wiki-note>


## 2. Configura la imagen

Instala [Raspberry Pi Imager](https://www.raspberrypi.com/software/) en tu computadora. Luego, inserta la tarjeta SD.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


Ejecute el programa Raspberry Pi Imager. Elija la imagen requerida como sistema operativo y asegúrese de seleccionar su tarjeta SD en el menú desplegable de almacenamiento.
En la configuración:
- Establece un nombre de usuario y contraseña (guarda el nombre de usuario predeterminado "pi" para que sea fácil de recordar),  
- proporciona el nombre y la contraseña de tu Wi-Fi, 
- elige tu país de la lista desplegable
y luego `Escribe` la imagen. 
                   
<robo-wiki-note type="note">Guarda el nombre de usuario y la contraseña cuidadosamente, ya que se necesitarán en caso de problemas.</robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" cover="covers/cover-1.png" />

Puedes encontrar códigos de país [aquí](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

## 3. Primer arranque

**Expulsa de forma segura la tarjeta SD**, insértala en la Raspberry Pi. Luego **inserta el adaptador Zigbee** en la Raspberry Pi.

<robo-wiki-note type="warning">¡Es importante insertar el adaptador Zigbee antes del primer inicio de la Raspberry Pi! 
Es necesario para la autoconfiguración de la red Zigbee.</robo-wiki-note>

**Si tienes el [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) (que tiene todo el firmware necesario), simplemente puedes seguir estas instrucciones. Sin embargo, si tienes otro adaptador, lo primero que debes hacer es flashearlo con el software Zigbee2MQTT. Puedes encontrar instrucciones para tu dispositivo [aquí](https://www.zigbee2mqtt.io/information/supported_adapters.html).**

A continuación, conecta el cable de alimentación a tu dispositivo. Debería conectarse a tu red Wi-Fi. 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Una vez que tu Raspberry Pi esté conectada, el LED rojo se encenderá y el LED verde parpadeará durante un tiempo. Espere hasta 5 minutos para que Raspberry Pi se inicie y se registre en la red.

Ahora encuentra la dirección IP de la Raspberry Pi. Puedes usar la aplicación móvil [Fing](https://www.fing.com/products) o 
la herramienta de línea de comandos [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Encuentra el nombre `robots-home` (el nombre opcional podría ser `Home(homeassistant)`) 
de la máquina host en la lista de direcciones IP. 

En este ejemplo, la dirección es `192.168.43.56`. 

Para verificar que todo funciona, abre un navegador web e ingresa a la página web `http://%RASPBERRY_IP_ADDRESS%:8123`. En este ejemplo, será `192.168.43.56:8123`.
Si todo está bien, verás la interfaz web de Home Assistant. Si la página web no se abre, espera hasta 5 minutos para que la Raspberry Pi se inicie y vuelve a intentarlo. 

<robo-wiki-video loop controls :videos="[{src: 'QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## Solución de problemas

1. Para cambiar la configuración de Wi-Fi más tarde, debes iniciar sesión en tu Raspberry Pi a través del comando `ssh`. Para ello, abre la terminal en tu computadora
y escribe el comando `ssh` con tu nombre de usuario, que creaste en el paso "Configuración de la imagen" (el predeterminado es "pi"). 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

y luego usa el comando `sudo raspi-config`. Encuentra más información sobre este comando en [el sitio oficial.](https://www.raspberrypi.com/documentation/computers/configuration.html)
