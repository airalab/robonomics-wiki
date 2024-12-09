---
title: Activar suscripción
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.7.0
    https://github.com/airalab/robonomics.app
---

**En este artículo, creará cuentas de parachain de Robonomics y comprará una suscripción a IoT.**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Para controlar Home Assistant con Robonomics, necesitará 2 cuentas en la parachain de Robonomics. Para una de las cuentas (`PROPIETARIO`), comprará una suscripción a Robonomics. La segunda cuenta (`CONTROLADOR`) controlará todos los procesos de Home Assistant (como la telemetría) y dará acceso a otros usuarios. Estas cuentas proporcionarán seguridad para su Home Assistant.

Si no tiene una cuenta, consulte este artículo y cree [la cuenta de PROPIETARIO](/docs/create-account-in-dapp/). La cuenta de Controlador se creará automáticamente durante la configuración.

En el artículo, se utiliza una billetera de extensión [Polkadot.js](https://polkadot.js.org/extension/) para trabajar con las cuentas, pero puede utilizar otra billetera que le resulte conveniente.

## Activar la suscripción a Robonomics

{% roboWikiNote {type:"de acuerdo"}%}

Para este paso, debes tener una cantidad suficiente de tokens XRT (mínimo de 2-3 XRT) en tu cuenta `OWNER`.

{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

1. Ve a la aplicación Robonomics y navega hasta la [página de suscripción](https://robonomics.app/#/rws-buy). Luego, haz clic en `Conectar cuenta` en la barra lateral derecha.

2. En el menú emergente siguiente, conecta la extensión Polkadot.js. Verás la dirección de tu cuenta junto con su saldo.

3. Antes de comprar, asegúrate de haber seleccionado la cuenta `OWNER`. Haz clic en el icono del perfil de la dirección y deberías ver la cuenta `OWNER`.

4. Por último, haz clic en el botón `COMPRAR SUSCRIPCIÓN` e ingresa la contraseña de tu cuenta. Espera hasta que se complete el proceso de activación. Verás el estado de tu suscripción después de un tiempo.

## Configura tu suscripción

Ahora necesitas configurar tu suscripción agregando la cuenta `CONTROLLER` a ella.

{% roboWikiPicture {src:"docs/home-assistant/sub-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

1. Ve a la aplicación Robonomics y navega hasta la [página de configuración de una suscripción](https://robonomics.app/#/rws-setup). Dirígete a la sección de **Configuración de suscripción**.

2. En el campo de `Frase semilla del controlador`, presiona la varita mágica para crear una nueva cuenta de `CONTROLADOR`.

3. En el cuadro emergente, crea una contraseña para la cuenta de `CONTROLADOR`.

4. En el siguiente cuadro emergente, verás la dirección de tu nueva cuenta y la frase semilla mnemotécnica. Guarda la frase semilla mnemotécnica de forma segura porque la necesitarás más adelante para la configuración de integración. Además, se descargará un archivo JSON con la cuenta de `CONTROLADOR`. Puedes importarlo a tu billetera. Cómo hacerlo para la extensión Polkadot.js se puede encontrar [aquí](/docs/create-account-in-dapp/).

{% roboWikiPicture {src:"docs/home-assistant/controller-create.jpg", alt:"controller create"} %}{% endroboWikiPicture %}

5. Cierra el cuadro emergente y haz clic en el botón `GUARDAR`.

## Agregar cuenta de controlador a la suscripción

Ahora, necesitas agregar tu cuenta de `CONTROLADOR` a la **lista de acceso**. 

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls']} %}{% endroboWikiVideo %}

Ve a la aplicación Robonomics y navega hasta la [página de configuración de suscripción](https://robonomics.app/#/rws-setup). Asegúrate de haber seleccionado la suscripción correcta y la cuenta `OWNER`.

2. Copia la dirección del `CONTROLLER`: abre la extensión y haz clic en el icono junto al nombre de la cuenta o copia la dirección de la sección **Configuración de suscripción**.

3. Pega esta dirección en el campo `Dirección de Polkadot` en la sección **USUARIOS EN LA SUSCRIPCIÓN** y haz clic en el botón `+`.

4. Ingresa la contraseña de tu cuenta `OWNER` en la ventana emergente, luego espera a que se complete el proceso de activación.

Eso es todo. Ve al siguiente artículo.