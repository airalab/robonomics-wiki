---
title: Configuración de Altruist
contributors: [tubleronchik]
---

**Esta guía te guía a través de la configuración y activación de un sensor Altruist Outdoor. Conectarás el sensor a Wi-Fi, configurarás su ubicación y activarás una suscripción usando tokens XRT. Además, se proporcionan instrucciones para integrar el sensor con Home Assistant a través de HACS o instalación manual.**

{% roboWikiNote {type: "warning"}%} Todos los dispositivos de Robonomics se pueden comprar en el [sitio web](https://robonomics.network/devices/) oficial.{% endroboWikiNote %}

## Activar Suscripción de Robonomics

{% roboWikiNote {type: "okay"} %}Para completar este paso, asegúrate de tener al menos 2-3 tokens XRT en tu cuenta de `Robonomics Polkadot`.{% endroboWikiNote %}

1) Navega a la [página de suscripción](https://robonomics.app/#/rws-buy) de la dApp de Robonomics. 
2) Haz clic en **Cuenta** y conecta tu billetera. Se mostrarán la dirección de tu cuenta y el saldo.
Si no tienes una cuenta, sigue [esta guía](https://wiki.robonomics.network/docs/create-account-in-dapp/) para crear una.

{% roboWikiPicture {src:"docs/altruist/altruist_syb_buy.jpg", alt:"página de suscripción"} %}{% endroboWikiPicture %}

3) Haz clic en `COMPRAR SUSCRIPCIÓN` y firma la transacción. **Espera a que se complete el proceso de activación**. 
4) Una vez activado, serás redirigido a la **página de configuración**, donde podrás ver el nombre de tu suscripción y la fecha de expiración.

{% roboWikiPicture {src:"docs/altruist/altruist_setup_page.jpg", alt:"página de configuración de suscripción"} %}{% endroboWikiPicture %}

5) **Guarda la dirección de tu cuenta** — la necesitarás durante la configuración del sensor. Puedes copiarla desde la sección "OWNER" o haciendo clic en el nombre de tu cuenta en la esquina superior derecha y seleccionando el botón de copiar.

## Configuración del Sensor

{% roboWikiNote {type: "warning", title: "INFO"}%} El sensor solo se puede conectar a una red Wi-Fi de 2.4GHz.{% endroboWikiNote %}

1) **Conecta el sensor** a una toma de corriente.
2) La placa creará una red Wi-Fi llamada Altruist-xxxxxxxxx. Conéctate a ella desde tu teléfono o computadora. Deberías recibir automáticamente un aviso para abrir la ventana de autorización.
- Si no, abre un navegador y ve a 192.168.4.1.

{% roboWikiPicture {src:"docs/altruist/on_board.png", alt:"sensor-altruista"} %}{% endroboWikiPicture %}

3) **Configura los ajustes de Wi-Fi**:
- Selecciona tu red Wi-Fi de la lista o ingrésala manualmente si no aparece.
- Introduce la contraseña en el campo "WI-FI SETTINGS".

4) **Introduce tus detalles de Robonomics**:
- Pega la Dirección del Propietario RWS que copiaste anteriormente en el campo designado.

5) **Establece la ubicación del sensor**:
- Introduce las coordenadas del sitio de instalación del sensor.
- Puedes encontrar las coordenadas usando mapas en línea o convertir una dirección a latitud/longitud usando [este enlace.](https://www.latlong.net/convert-address-to-lat)-long.html)

{% roboWikiNote {type: "warning", title: "ADVERTENCIA"}%}Las coordenadas del sensor se mostrarán en un mapa disponible públicamente. Si no desea mostrar su información privada, escriba coordenadas cercanas, pero no exactas.{% endroboWikiNote %}

{% roboWikiPicture {src:"docs/altruist/sensor_setup.png", alt:"altruist-sensor-wifi"} %}{% endroboWikiPicture %}

6) **Copia la "Dirección Robonomics" de Altruist**:
- La encontrarás en la parte superior de la página. Guárdala para el paso final.

{% roboWikiPicture {src:"docs/altruist/address.jpg", alt:"dirección altruist"} %}{% endroboWikiPicture %}

7) Haz clic en "**Guardar configuración y reiniciar**" en la parte inferior de la página. La placa se reiniciará y se conectará a la red Wi-Fi especificada.

## Activar Altruist
El paso final en el proceso de configuración es agregar la **dirección de Altruist** a tu **Suscripción de Robonomics**.

1) Regresa a la [página de Configuración](https://robonomics.app/#/rws-setup).

2) Desplázate hacia abajo hasta la sección "**Usuarios en suscripción**".

3) En el campo "**Agregar un usuario**", pega la **dirección Robonomics de Altruist** que copiaste anteriormente.

{% roboWikiPicture {src:"docs/altruist/add_user.jpg", alt:"agregar usuario"} %}{% endroboWikiPicture %}

4) Haz clic en el **botón más (+)** y firma el mensaje.

5) Espera a que la operación se complete.

¡Eso es todo! Tu configuración está completo. 🎉

Ahora puedes encontrar tu Altruist en el mapa de [Robonomics Sensors Social](https://sensors.social/#). 🚀

{% roboWikiPicture {src:"docs/altruist/map.jpg", alt:"mapa de sensores"} %}{% endroboWikiPicture %}

## Home Assistant

Hay dos maneras de agregar **Altruist** a **Home Assistant**:

### Opción 1: HACS (Recomendado)

La forma más fácil de agregar **Altruist** es a través de **HACS**. Puedes encontrar una breve guía de configuración [aquí](https://hacs.xyz/docs/use/)

**Pasos**:
1) Una vez que HACS esté instalado, ábrelo.

2) Haz clic en los **tres puntos** en la esquina superior derecha y selecciona "**Custom repositories**".

3) En la ventana emergente, ingresa la siguiente URL:

```
https://github.com/airalab/altruist-homeassistant-integration
```
4) Establece el tipo en "**Integration**" y haz clic en "**ADD**".

{% roboWikiPicture {src:"docs/altruist/hacs.jpg", alt:"altruist-add"} %}{% endroboWikiPicture %}

5) Busca la integración **Altruist Sensor**.

6) Haz clic en el botón **Download**, luego reinicia **Home Assistant** una vez que la integración esté instalada.

{% roboWikiPicture {src:"docs/altruist/integration.jpg", alt:"altruist-hacs"} %}{% endroboWikiPicture %}

### Opción 2: Instalación Manual

1) Bajo el usuario `homeassistant`, clona el repositorio del proyecto:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/airalab/altruist-homeassistant-integration.git
```

{% endcodeHelper %}

2) Si ya tienes alguna integración personalizada, mueve la carpeta `altruist` a tu directorio `custom_components`:

{% codeHelper { copy: true}%}

```
cd altruist-homeassistant-integration
mv custom_components/altruist ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

3) Si **no** tienes ninguna integración personalizada, mueve todo el directorio custom_components:

{% codeHelper { copy: true}%}

 ```
cd altruist-homeassistant-integration
mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Configuración

Después de la instalación y reiniciar Home Assistant, la integración detectará automáticamente Altruist en tu red.

1) Ve a **Configuración → Dispositivos y Servicios**.

2) Añade el **Sensor Altruist**.

{% roboWikiPicture {src:"docs/altruist/add_altruist.jpg", alt:"descubrir altruist"} %}{% endroboWikiPicture %}

¡Eso es todo! 🚀 Tu Sensor Altruist ahora está integrado con Home Assistant.