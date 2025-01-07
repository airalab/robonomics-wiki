---
title: Activar Suscripción
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.8.2
    https://github.com/airalab/robonomics.app
---

**En este artículo, crearás cuentas de parachain de Robonomics y comprarás una suscripción de IoT.**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Para controlar Home Assistant con Robonomics, necesitarás 2 cuentas en la parachain de Robonomics. Para una de las cuentas (`PROPIETARIO`), comprarás una suscripción de Robonomics. La segunda cuenta (`CONTROLADOR`) controlará todos los procesos de Home Assistant (como la telemetría) y dará acceso a otros usuarios. Estas cuentas proporcionarán seguridad para tu Home Assistant.

Si no tienes una cuenta, consulta este artículo y crea [la cuenta de PROPIETARIO](/docs/create-account-in-dapp/). La cuenta de Controlador se creará automáticamente durante la configuración.

En el artículo, se utiliza una billetera de [extensión Polkadot.js](https://polkadot.js.org/extension/) para trabajar con las cuentas, pero puedes usar otra billetera que te resulte conveniente.

## Activar Suscripción de Robonomics

{% roboWikiNote {type:"de acuerdo"}%}

Para este paso, debes tener una cantidad suficiente de tokens XRT (mínimo de 2-3 XRT) en tu cuenta `OWNER`.

{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Ve a la aplicación Robonomics y navega hasta la [página de suscripción](https://robonomics.app/#/rws-buy). Luego, haz clic en `Conectar cuenta` en la barra lateral derecha.

2. En el menú emergente siguiente, conecta la extensión Polkadot.js. Verás la dirección de tu cuenta junto con su saldo.

3. Antes de comprar, asegúrate de haber seleccionado la cuenta `OWNER`. Haz clic en el icono de perfil de dirección y deberías ver la cuenta `OWNER`.

4. Por último, haz clic en el botón `COMPRAR SUSCRIPCIÓN` e ingresa la contraseña de tu cuenta. Espera hasta que se complete el proceso de activación. Verás el estado de tu suscripción después de un tiempo.

## Configura tu suscripción

Ahora necesitas configurar tu suscripción agregando la cuenta `CONTROLLER` a ella.

{% roboWikiPicture {src:"docs/home-assistant/sub-download-backup.png",alt:"sub_setup"} %}{% endroboWikiPicture %}

1. Ve al dApp de Robonomics y navega hasta la [página de configuración de suscripción](https://robonomics.app/#/rws-setup). Dirígete a la sección de **Configuración de suscripción**.

2. Haz clic en `DESCARGAR RESPALDO` y selecciona la opción `PARA EL SERVIDOR`.

{% roboWikiNote {type: "warning", title: "Información importante" }%} Esta acción creará un nuevo controlador para tu suscripción. No olvides agregarlo a la suscripción. {% endroboWikiNote %}

3. En la ventana emergente, crea una contraseña para la cuenta `CONTROLADOR`.

{% roboWikiPicture {src:"docs/home-assistant/server-new-settings.png", alt:"crear controlador"} %}{% endroboWikiPicture %}

4. En la siguiente ventana emergente, verás la dirección de tu nueva cuenta y la frase mnemotécnica de semilla. Guarda la frase mnemotécnica de semilla de forma segura. En la carpeta de descargas, encontrarás dos archivos JSON: el primer archivo se llama `Controller-<dirección>.json`, donde `<dirección>` es la dirección de tu controlador recién generado. El segundo archivo se llama `robonomics.app-settings-<nombre-de-suscripción>-server.json`, donde `<nombre-de-suscripción>` es el nombre de tu suscripción. Guarda estos archivos de forma segura, ya que serán necesarios más adelante para la configuración de integración. Además, puedes importar tu controlador.cuenta en tu billetera. Las instrucciones para importarla en la extensión Polkadot.js se pueden encontrar [aquí](/docs/create-account-in-dapp/).

{% roboWikiPicture {src:"docs/home-assistant/controller-acc.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

5. (Opcional) Puedes agregar credenciales para el servicio de anclaje Pinata u otro gateway personalizado para difundir tus datos de manera más amplia en la red IPFS.

{% roboWikiNote {title:"Nota", type: "Nota"}%} En la sección de [Configuración de Pinata](/docs/pinata-setup) puedes encontrar información más detallada sobre cómo usar Pinata.{% endroboWikiNote %}

6. Cierra la ventana emergente y haz clic en el botón `GUARDAR`.

{% roboWikiPicture {src:"docs/home-assistant/save-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

## Agregar Cuenta del Controlador a la Suscripción

Ahora, necesitas agregar tu cuenta `CONTROLADOR` a la **lista de acceso**.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls']} %}{% endroboWikiVideo %}

1. Ve a la aplicación Robonomics yDirígete a la [página de configuración de suscripción](https://robonomics.app/#/rws-setup). Asegúrate de haber seleccionado la suscripción correcta y la cuenta `OWNER`.

2. Copia la dirección del `CONTROLLER`: abre la extensión y haz clic en el icono junto al nombre de la cuenta o copia la dirección de la sección **Configuración de suscripción**.

3. Pega esta dirección en el campo `Dirección de Polkadot` en la sección **USUARIOS EN LA SUSCRIPCIÓN** y haz clic en el botón `+`.

4. Ingresa la contraseña de tu cuenta `OWNER` en la ventana emergente, luego espera a que se complete el proceso de activación.

Eso es todo. Ve al siguiente artículo.