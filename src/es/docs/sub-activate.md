---
title: Activar Suscripción
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp
    https://github.com/airalab/robonomics.app
---

En este artículo, crearás cuentas de parachain de Robonomics y comprarás una suscripción de IoT.

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Para controlar Home Assistant con Robonomics, necesitas 2 cuentas en la parachain de Robonomics. Para una de las cuentas (`PROPIETARIO`), comprarás una suscripción de Robonomics. La segunda cuenta (`CONTROLADOR`) controlará todos los procesos de Home Assistant (como la telemetría) y dará acceso a otros usuarios. Estas cuentas proporcionarán seguridad para tu Home Assistant.

{% roboWikiNote {title:"ADVERTENCIA", type: "warning"}%}
Ambas cuentas deben crearse con cifrado **ed25519**. Por lo tanto, necesitas crear una cuenta utilizando la interfaz de Polkadot-JS y seleccionar el cifrado requerido.

Esta función está desactivada de forma predeterminada en la interfaz de Polkadot-JS. Para habilitarla, ve a `Configuración` -> `General` -> `opciones de cuenta` y selecciona `Permitir almacenamiento local de cuentas en el navegador` en el menú desplegable bajo `creación de cuenta en el navegador`.
{% endroboWikiNote %}

## Crear Cuentas de Propietario y Controlador

{% roboWikiVideo {videos:[{src: 'QmajeEV4adqR2DCaBJPZhH6NR74eHaRmvCcbeQtnLm7Kcc', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Ve a la [aplicación de la Parachain de Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) en el Portal de Polkadot / Substrate. **Verifica en la esquina superior izquierda para asegurarte de que estás conectado a la Parachain de Robonomics.**

2. Ve a `Cuentas` -> `Cuentas` y presiona el botón `Agregar cuenta`. Verás un menú emergente con la semilla de la cuenta. Tienedos formas: *Mnemónico* (legible por humanos) y *Crudo* (una secuencia de dígitos y letras).

3. Abre `Opciones avanzadas de creación`, cambia el tipo de criptografía de la cuenta que se está creando a `Edwards - ed25519` y presiona `Siguiente`.

4. Guarda la frase semilla mnemotécnica de forma segura y presiona `Siguiente`.

5. En el siguiente menú, necesitas establecer el nombre de la cuenta y la contraseña. Para mayor comodidad, nómbrala `PROPIETARIO`. Presiona `Siguiente`.

6. En la ventana final, haz clic en `Guardar` para completar la creación de la cuenta. Esto también generará archivos JSON de respaldo que debes almacenar de forma segura. Más adelante, puedes usar este archivo para recuperar tu cuenta si recuerdas la contraseña.

7. Repite estos pasos para crear una cuenta con el nombre `CONTROLADOR`.


## Agregar cuentas a Polkadot.js

Para mayor comodidad, deberías usar la [extensión Polkadot.js](https://polkadot.js.org/extension/) y agregar estas cuentas recién creadas a ella. Para una cuenta ed25519, solo puedes hacerlo con un archivo JSON de respaldo. Puedes usar los archivos guardados al crear las cuentas.

Puedes obtener estos archivos nuevamente creando un archivo de respaldo de la cuenta. Haz clic en los tres puntos junto a tu cuenta, elige `Crear un archivo de respaldo para esta cuenta` e ingresa tu contraseña.

{% roboWikiVideo {videos:[{src: 'Qmc5LcbLSdVCUubLomUUo5Qxrxb2xaixpwUFqnpj2C9iM5', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Abre la extensión y presiona el botón `+` en la esquina superior derecha, luego elige `Restaurar cuenta desde archivo JSON de respaldo`.

2. En la ventana abierta, carga el archivo JSON, ingresa la contraseña y presiona `Restaurar`.

3. Asegúrate de que la red Robonomics esté seleccionada para las cuentas en la extensión Polkadot.js. En el Portal de Polkadot / Substrate, ve a `Configuración` -> `Metadatos` y haz clic en el botón `Actualizar metadatos`.

4. Confirma la actualización de metadatos en el popup. La extensión ahora mostrará la etiqueta de la red para la cual se utiliza la dirección.

{% roboWikiVideo {videos:[{src: 'QmXVhu17Qkx8VkAAVfm5mUBzSTq1BvaAF7MNdXLgZSvZcR', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Activar la Suscripción a Robonomics

{% roboWikiNote {tipo: "okay"}%} Para este paso, debes tener una cantidad suficiente de tokens XRT (mínimo de 2-3 XRT) en tu cuenta `OWNER`. {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', tipo: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Ve a la aplicación Robonomics y dirígete a la [página de suscripción](https://robonomics.app/#/rws-buy). Luego, haz clic en `Conectar Cuenta` en la barra lateral derecha.

2. En el menú emergente siguiente, conecta la extensión Polkadot.js. Verás la dirección de tu cuenta junto con su saldo.

3. Antes de comprar, asegúrate de haber seleccionado la cuenta `OWNER`. Haz clic en el icono del perfil de la dirección y deberías ver la cuenta `OWNER`.

4. Finalmente, haz clic en el botón `COMPRAR SUSCRIPCIÓN` e ingresa la contraseña de tu cuenta. Espera hasta que se complete el proceso de activación. Verás el estado de tu suscripción después de un tiempo.

## Configura tu Suscripción

Ahora necesitas configurar tu suscripción agregando la cuenta `CONTROLLER` a ella.

{% roboWikiVideo {videos:[{src: 'Qmd5P356UE1yDLAd4uSdq1dERbyp5gk5wpWD3iENNt2mjV', tipo: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Ve a la aplicación Robonomics y dirígete a la [página de configuración de suscripción](https://robonomics.app/#/rws-setup). Navega a la sección **CONFIGURACIÓN GENERAL**.

2. Elimina la frase semilla del campo `Frase semilla del Controlador` y entra la frase semilla de la cuenta `CONTROLLER`.

3. Copia la dirección `CONTROLLER`: abre la extensión y haz clic en el icono junto ael nombre de la cuenta.

4. Pegue esta dirección en el campo `Controller` y haga clic en el botón `GUARDAR`.

## Agregar cuentas a la suscripción

Ahora, necesitas agregar tu cuenta `CONTROLLER` a la **lista de acceso**.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Ve a la aplicación Robonomics y navega hasta la [página de configuración de suscripción](https://robonomics.app/#/rws-setup). Asegúrate de haber seleccionado la suscripción correcta y la cuenta `OWNER`.

2. Copia la dirección `CONTROLLER`: abre la extensión y haz clic en el icono junto al nombre de la cuenta.

3. Pegue esta dirección en el campo `Dirección de Polkadot` en la sección **USUARIOS EN LA SUSCRIPCIÓN** y haz clic en el botón `+`.

4. Ingresa la contraseña de tu cuenta `OWNER` en la ventana emergente, luego espera a que se complete el proceso de activación.