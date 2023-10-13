---
title: Activar suscripción
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

En este artículo crearás cuentas de parachain de Robonomics y comprarás una suscripción de IoT. 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


Para controlar Home Assistant con Robonomics, necesitas 2 cuentas en la parachain de Robonomics. Para una de las cuentas (`sub_owner`), comprarás una suscripción de Robonomics. La segunda cuenta (`sub_controller`) controlará todos los procesos de Home Assistant (como la telemetría) y dará acceso a otros usuarios. Estas cuentas proporcionarán seguridad para tu Home Assistant. 

<robo-wiki-note type="warning" title="WARNING">

Ambas cuentas deben crearse con cifrado **ed25519**. Debido a esto, debe crear una cuenta utilizando la interfaz de usuario de Polkadot-JS y seleccionar el cifrado requerido. 

Esta función está desactivada de forma predeterminada en la interfaz de usuario de Polkadot-JS. Para habilitarla, ve a `Settings` -> `General` -> `account options` y selecciona `Allow local in-browser account storage` en el menú desplegable `creación de cuentas en el navegador`.

</robo-wiki-note>

## Crear cuentas de propietario y controlador

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmQiJYPYajUJXENX2PzSJMSKGSshyWyPNqugSYxP5eCNvm', type:'mp4'}]" />

1. Ve a la [aplicación de Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) en el Portal de Polkadot / Substrate. **Verifica la esquina superior izquierda para asegurarte de que estás conectado a Robonomics Parachain.**

2. Ve a `Accounts` -> `Accounts` y presiona el botón `Add account`. Verás un menú emergente con la semilla de la cuenta. Tiene dos formas: *Mnemonic* (legible por humanos) y *Raw* (una secuencia de dígitos y letras). 

3. Abre `Advanced creation options`, cambia el tipo de criptografía para crear la cuenta a `Edwards - ed25519` y presiona `Next`.


4. Guarda de forma segura la frase de recuperación de la semilla mnemotécnica y presiona `Next`.

5. En el siguiente menú, debes establecer el nombre de la cuenta y la contraseña. Dale el nombre `sub_owner` por conveniencia. Presiona `Next`.

6. En la última ventana, haz clic en `Save` para finalizar la creación de la cuenta. También generará archivos JSON de respaldo que debes guardar de forma segura. Más adelante podrás usar este archivo para recuperar tu cuenta si recuerdas la contraseña.

7. Repite estos pasos para una cuenta con el nombre `sub_controller`.


## Agregar cuentas a Polkadot.js

Para mayor comodidad, debes usar la [extensión de Polkadot.js](https://polkadot.js.org/extension/) y agregar estas cuentas recién creadas a ella. Para una cuenta ed25519, solo puedes hacerlo con un archivo JSON de respaldo. Puedes usar los archivos guardados cuando creaste las cuentas.

Puedes obtener estos archivos nuevamente creando un archivo de respaldo de la cuenta. Haz clic en los tres puntos de tu cuenta, elige `Create a backup file for this account` e ingresa tu contraseña.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmRd7gztUjWkLF4W2XuJwy5aXBwzNV2aPCU6CQQLvUpSNj', type:'mp4'}]" />

1. Abre la extensión y haz clic en el botón `+` en la esquina superior derecha, luego elige `Restore account from backup JSON file`.

2. En la ventana abierta, carga el archivo JSON, ingresa la contraseña y presiona `Restore`.

3. Asegúrate de que la red de Robonomics esté seleccionada para las cuentas en la extensión de Polkadot.js. En el Portal de Polkadot / Substrate, ve a `Setting` -> `Metadata`  y haz clic en el botón `Update metadata`.

4. Confirma la actualización de metadatos en el cuadro emergente. Ahora la extensión mostrará la etiqueta de la red para la cual se utiliza la dirección.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmT5sTNP9t8gpbD4RJJw6ETwG4wiziiChAh2uHHBk9Zsyd', type:'mp4'}]" />

## Activar suscripción de Robonomics 

<robo-wiki-note type="okay">

Para este paso, debes tener una cantidad suficiente de tokens XRT (mínimo 2-3 XRT) en tu cuenta `sub_owner`.

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmXrFCajmJgkRDSbshGD3QehjnoyS6jafEPSjHdYkoBHum', type:'mp4'}]" />

1. Ve a la dapp de Robonomics a la [página de suscripción](https://dapp.robonomics.network/#/subscription) y presiona conectar cuenta en la barra lateral derecha.

2. En el menú emergente siguiente, conecta la extensión Polkadot.js. Verás tu dirección de cuenta con saldo.

3. Antes de comprar, verifica que hayas elegido la cuenta `sub_owner`. Presiona el icono de perfil de la dirección, deberías ver la cuenta `sub_owner` en el campo  `Check owner account`.

4. Finalmente, presiona el botón `SUBMIT` e ingresa la contraseña de tu cuenta. Después espera hasta que se complete el proceso de activación. Verás el estado de tu suscripción después de un tiempo.


## Agregar cuentas a la suscripción

Ahora necesita agregar una cuenta `sub_controller` a la **lista de acceso**.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmV1gkwtcXsWv54ov9tuXfcHg7nqs1foM8cRwts4sqnqtX', type:'mp4'}]" />

1. Abre la extensión y haz clic en el icono junto al nombre de la cuenta. Se copiará la dirección de la cuenta.


2. Pega esta dirección en el campo `Robonomics parachain address` en la parte **Gestionar acceso**. Dale un nombre y presiona el botón `+`. 

3. Repite los pasos 1 y 2 para la cuenta `sub_owner`.

4. Presiona `Save`. Ingresa la contraseña de tu `sub_owner` en la ventana emergente y espera hasta que se complete el proceso de activación.
