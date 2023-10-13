---
title: Crear cuenta para Robonomics Parachain

contributors: [PaTara43, Fingerling42]
---

**Para interactuar y operar con Robonomics Parachain, los desarrolladores y usuarios deben crear una cuenta en el Portal Polkadot/Substrate. La cuenta realiza funciones básicas para la red: su dirección de red pública (la clave pública), el control de acceso a la dirección y a los fondos (la clave privada), enviar transacciones a la red, mostrar sus tokens y su monto, etc. A continuación se detallan Hay dos formas principales de crear una cuenta para Robonomics Parachain.**

## 1. Usando la Extensión del Navegador Polkadot{.js}

La Extensión de Polkadot proporciona un mecanismo para generar la cuenta e interactuar con todos los proyectos de Polkadot / Kusama, incluido Robonomics Parachain. Esta no es la forma más segura de administrar su cuenta, pero es la más conveniente en términos de seguridad / usabilidad.

## 1.1. Instalar la Extensión del Navegador

La extensión del navegador está disponible para [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) and [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (además de los navegadores basados en Chromium).

![Browser Extension](../images/creating-an-account/1.1-polkadot-extension.png "Browser Extension")

## 1.2. Abrir la Aplicación Robonomics Parachain

Ve a [Aplicación Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) en el Portal Polkadot / Substrate. Si es la primera vez que ingresa al portal, solicitará acceso a la extensión del navegador, así que permita el acceso. 

Una vez que hayas abierto la aplicación, mira la esquina superior izquierda. Allí se muestran el nombre de la red, su icono y el número del último bloque. Al hacer clic en esta área se abrirá una lista de todas las redes de Polkadot/Kusama, incluidas las redes de prueba y los nodos locales. Puede cambiar entre redes seleccionando la requerida y presionando el botón `Switch`. **Asegúrese de estar conectado a Robonomics Parachain ahora**. 

![Robonomics Parachain app](../images/creating-an-account/1.2-robonomics-app.png "Robonomics Parachain app")

## 1.3. Actualizar los Metadatos de la Extensión

Es muy probable que la aplicación le solicite actualizar los metadatos de la extensión para mostrar la información correcta sobre la cadena a la que está conectado. Vaya a **Settings -> Metadata**, presione el botón `Update metadata` y luego, en la ventana emergente, permita que la extensión lo haga. 

![Updating metadata](../images/creating-an-account/1.3-metadata-update.png "Updating metadata")

## 1.4. Crear Cuenta en la Extensión

Abra la extensión del navegador Polkadot{.js}. Haga clic en el botón grande de suma o seleccione `Create new account` desde el pequeño icono de suma en la esquina superior derecha. Debería ver el siguiente menú, con una semilla mnemotécnica generada en forma de doce palabras y la dirección. 

![Account creation, step one](../images/creating-an-account/1.4-create-account-step-1.png "Account creation, step one")

La semilla es su clave para la cuenta. Conocer la semilla le permite a usted (o a cualquier otra persona que conozca la semilla) tomar el control de esta cuenta e incluso volver a crearla si olvida la contraseña. **Es muy importante almacenarla de manera segura**, preferiblemente en papel u otro dispositivo no digital, no en almacenamiento digital o en una computadora. 

Guardar la semilla y presionar `Next step`. Deberías ver el siguiente menú.

![Account creation, step two](../images/creating-an-account/1.5-create-account-step-2.png "Account creation, step two")

- *Network* te permite elegir en qué redes se utilizará exclusivamente esta cuenta. Puedes usar la misma dirección en múltiples redes, sin embargo, por razones de privacidad, se recomienda crear una nueva dirección para cada red que uses. 
Selecciona la red de Robonomics de la lista desplegable. Si no puedes encontrar la red de Robonomics, es probable que no hayas actualizado los metadatos, vuelve atrás y hazlo.

    - Notarás que el formato de la dirección y el ícono de la cuenta cambiarán, esto es normal. Los diferentes formatos de red son simplemente otras representaciones de la misma clave pública. 

- *Name* es solo el nombre de la cuenta para tu uso exclusivo. No se almacena en la cadena de bloques y no será visible para otros usuarios. 

- *Password* se utiliza para cifrar la información de tu cuenta. Deberás volver a ingresarla al firmar transacciones en el portal. Crea una y recuérdala.

Como resultado, después de crear una cuenta, la verás en la lista de cuentas en la extensión Polkadot{.js}. Al hacer clic en los tres puntos, puedes cambiar el nombre de la cuenta, exportarla, eliminarla de la extensión y cambiar la red utilizada para la cuenta. 

Además, la cuenta aparecerá en el menú **Accounts -> Accounts** del portal, donde se anotará que fue inyectada usando la extensión.

![Successful account creation](../images/creating-an-account/1.6-account-injected.png "Successful account creation")


## 2. Directamente en la aplicación Robonomics Parachain

Puedes utilizar la interfaz de usuario en el Portal Polkadot / Substrate para crear una cuenta. Puede ser utilizada para desarrollo y pruebas. 

## 2.1. Abrir la aplicación Robonomics Parachain

Ve a [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) en el Portal Polkadot / Substrate. **Verifica en la esquina superior izquierda que estás conectado a Robonomics Parachain**.  

Ve a **Accounts -> Accounts** y presione el botón `Add account`.

![Robonomics Parachain App](../images/creating-an-account/2.1-robonomics-app-main-view.png "Robonomics Parachain App")

## 2.2. Crear cuenta

Deberías ver el siguiente menú emergente con la semilla de la cuenta. 

![Generating account seed](../images/creating-an-account/2.2-robonomics-app-seed.png "Generating account seed")

Tiene dos formas: *Mnemonic* (legible por humanos) y *Raw* (una secuencia de dígitos y letras). Guarde la frase de recuperación de forma segura y presione `Next`.

> También puede cambiar el tipo de criptomoneda para crear una cuenta, para ello abra `Advanced creation options` y elija el tipo (`ed25519` en la imagen).

![ed25519 crypto type account](../images/creating-an-account/ed-account.jpg)

En el siguiente menú, debe establecer el nombre de la cuenta y la contraseña, similar a las instrucciones de la extensión descritas anteriormente.

![Generating account name and password](../images/creating-an-account/2.3-robonomics-app-name-pass.png "Generating account name and password")

Haciendo clic en el botón `Next` lo llevará a la última ventana. Haga clic en `Save` para finalizar la creación de la cuenta. También generará archivos JSON de respaldo que debe guardar de forma segura. Más tarde puede usar este archivo para recuperar su cuenta si recuerda la contraseña.

![Successful account creation](../images/creating-an-account/2.4-robonomics-app-account-created.png "Successful account creation")

## 2.3 Agregar cuenta ed25519 a la extensión de Polkadot

Es posible que necesite agregar la cuenta creada a la extensión de Polkadot.js (para la cuenta ed25519 solo puede hacerlo con el archivo JSON de respaldo). Para ello, necesita crear un archivo de respaldo de la cuenta. Presione en los tres puntos de su cuenta y elija `Create a backup file for this account` y escriba su contraseña.

![Backup file](../images/creating-an-account/backup-file.jpg)

Luego abra una extensión y presione el botón `+` en la parte superior derecha, luego elija `Restore account from backup JSON file`.

![Restore backup in extension](../images/creating-an-account/extention-add-backup.jpg)

En la ventana abierta, suelte el archivo guardado, ingrese la contraseña y presione `Restore`.

![Restore backup in extension 2](../images/creating-an-account/file-backup.jpg)

## 3. Cuenta creada exitosamente 

Ahora puede operar completamente con su cuenta recién creada. Envíe y reciba tokens, mensajes, escriba datalog y más. Siéntase libre de explorar todas las funciones de la aplicación. Para copiar la dirección de su cuenta, simplemente haga clic en su icono, la dirección se copiará al portapapeles. 

Si desea obtener más información sobre las cuentas de Polkadot / Kusama y formas adicionales de crearlas, puede encontrar más información [aquí](https://wiki.polkadot.network/docs/learn-accounts) e [aquí](https://wiki.polkadot.network/docs/learn-account-generation).
