---
title: Crear cuenta para Robonomics Parachain

contributors: [PaTara43, Fingerling42]
---

**Para interactuar y operar con Robonomics Parachain, los desarrolladores y usuarios necesitan crear una cuenta en el Portal de Polkadot / Substrate. La cuenta realiza funciones básicas para la red: tu dirección pública en la red (la clave pública), el control de acceso a la dirección y fondos (la clave privada), enviar transacciones a la red, mostrar tus tokens y su cantidad, etc. A continuación se presentan dos formas principales de crear una cuenta para Robonomics Parachain.**

## 1. Usando la Extensión del Navegador Polkadot{.js}

La Extensión de Polkadot proporciona un mecanismo para generar la cuenta e interactuar con todos los proyectos de Polkadot / Kusama, incluido Robonomics Parachain. Esta no es la forma más segura de gestionar tu cuenta, pero es la más conveniente en términos de equilibrio entre seguridad y usabilidad.

## 1.1. Instalar la Extensión del Navegador

La extensión del navegador está disponible para [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) y [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (además de los navegadores basados en Chromium).

{% roboWikiPicture {src:"docs/creating-an-account/1.1-polkadot-extension.png", alt:"Extensión del Navegador"} %}{% endroboWikiPicture %}

## 1.2. Abrir la Aplicación de Robonomics Parachain

Ve a la [aplicación de Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) en el Portal de Polkadot / Substrate. Si es la primera vez que entras en el portal, solicitará acceso a la extensión del navegador, así que permite el acceso.

Una vez que hayas abierto la aplicación, echa un vistazo a la esquina superior izquierda. Allí se muestra el nombre de la red, su icono y el número del último bloque. Al hacer clic en esta área se abrirá una lista de todas las redes de Polkadot / Kusama, incluidas las redes de prueba y los nodos locales. Puedes cambiar entre redes seleccionando la que necesitas y presionando el botón `Cambiar`. **Asegúrate de que**Estás conectado a Robonomics Parachain ahora**.

{% roboWikiPicture {src:"docs/creating-an-account/1.2-robonomics-app.png", alt:"Aplicación de Robonomics Parachain"} %}{% endroboWikiPicture %}

## 1.3. Actualizar metadatos de la extensión y creación de cuenta en el navegador

Es muy probable que la aplicación te pida actualizar los metadatos de la extensión para mostrar la información correcta sobre la cadena a la que estás conectado. Ve a **Configuración -> Metadatos**, presiona el botón `Actualizar metadatos` y luego, en la ventana emergente, permite que la extensión lo haga.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-metadata-update.png", alt:"Actualización de metadatos"} %}{% endroboWikiPicture %}

Por defecto, la aplicación web solo funciona con cuentas externas. Para permitir la creación de nuevas cuentas directamente en el navegador, ve a **Configuración -> General -> Opciones de cuenta -> creación de cuenta en el navegador**, elige `Permitir almacenamiento local de cuentas en el navegador` y presiona el botón `Guardar`.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-in-browser-account-creation.png", alt:"Actualización de creación de cuenta en el navegador"} %}{% endroboWikiPicture %}

## 1.4. Crear cuenta en la extensión

Abre la extensión del navegador Polkadot{.js}. Haz clic en el gran botón de suma o selecciona `Crear nueva cuenta` desde el pequeño icono de suma en la esquina superior derecha. Deberías ver el siguiente menú, con una semilla mnemotécnica generada en forma de doce palabras y la dirección.

{% roboWikiPicture {src:"docs/creating-an-account/1.4-create-account-step-1.png", alt:"Creación de cuenta, paso uno"} %}{% endroboWikiPicture %}

La semilla es tu clave para la cuenta. Saber la semilla te permite (o a cualquier otra persona que la conozca) tomar el control de esta cuenta e incluso volver a crearla si olvidas la contraseña. **Es muy importante almacenarla de forma segura**, preferiblemente en papel u otro dispositivo no digital, no en almacenamiento digital o en una computadora.

Guarda la semilla y presiona `Siguiente paso`. Deberías ver el siguiente menú.

{% roboWikiPicture {src:"docs/creating-an-account/1.5-create-account-step-2.png", alt:"Creación de cuenta, paso dos"} %}{% endroboWikiPicture %}


- *Red* te permite elegir en qué redes se utilizará exclusivamente esta cuenta. Puedes usar la misma dirección en múltiples redes, sin embargo, por razones de privacidad, se recomienda crear una nueva dirección para cada red que utilices.
Selecciona la red de Robonomics en la lista desplegable. Si no encuentras la red de Robonomics, es probable que no hayas actualizado los metadatos, vuelve atrás y hazlo.

	`Notarás que el formato de la dirección y el icono de la cuenta cambiarán, esto es normal. Los diferentes formatos de red son simplemente otras representaciones de la misma clave pública.`

- *Nombre* es solo el nombre de la cuenta para tu uso personal. No se almacena en la cadena de bloques y no será visible para otros usuarios.

- *Contraseña* se utiliza para cifrar la información de tu cuenta. Necesitarás volver a introducirla al firmar transacciones en el portal. Crea una y recuérdala.

Como resultado, después de crear una cuenta, la verás en la lista de cuentas en la extensión de Polkadot{.js}. Al hacer clic en los tres puntos, puedes cambiar el nombre de la cuenta, exportarla, eliminarla de la extensión y cambiar la red utilizada para la cuenta.

Además, la cuenta aparecerá en el menú **Cuentas -> Cuentas** en el portal, donde se indicará que fue inyectada utilizando la extensión.

{% roboWikiPicture {src:"docs/creating-an-account/1.6-account-injected.png", alt:"Creación exitosa de cuenta"} %}{% endroboWikiPicture %}


## 2. Directamente en la aplicación Robonomics Parachain

Puedes utilizar la interfaz de usuario en el Portal de Polkadot / Substrate para crear una cuenta. Puede ser utilizada para desarrollo y pruebas.

## 2.1. Abrir la aplicación Robonomics Parachain

Ve a la [aplicación Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) en el Portal de Polkadot / Substrate. **Verifica en la esquina superior izquierda que estás conectado a Robonomics Parachain**.

Ve a **Cuentas -> Cuentas** y presiona el botón `Agregar cuenta`.

{% roboWikiPicture {src:"docs/creating-an-account/2.1-robonomics-app-main-view.png", alt:"Aplicación Robonomics Parachain"} %}{% endroboWikiPicture %}

## 2.2. Crear cuenta

Deberías ver el siguiente menú emergente con la semilla de la cuenta.

{% roboWikiPicture {src:"docs/creating-an-account/2.2-robonomics-app-seed.png", alt:"Generando semilla de cuenta"} %}{% endroboWikiPicture %}

Tiene dos formas: *Mnemonic* (legible por humanos) y *Raw* (una secuencia de dígitos y letras). Guarda la frase semilla de forma segura y presiona `Siguiente`.

> También puedes cambiar el tipo de criptomoneda para crear la cuenta, para ello abre `Opciones avanzadas de creación` y elige el tipo (`ed25519` en la imagen).

{% roboWikiPicture {src:"docs/creating-an-account/ed-account.jpg", alt:"Cuenta de tipo criptográfico ed25519"} %}{% endroboWikiPicture %}

En el siguiente menú, necesitas establecer el nombre de la cuenta y la contraseña, similar a las instrucciones de extensión descritas anteriormente.

{% roboWikiPicture {src:"docs/creating-an-account/2.3-robonomics-app-name-pass.png", alt:"Generando nombre de cuenta y contraseña"} %}{% endroboWikiPicture %}

Al hacer clic en el botón `Siguiente`, te llevará a la última ventana. Haz clic en `Guardar` para finalizar la creación de la cuenta. También generará archivos JSON de respaldo que debes almacenar de forma segura. Más adelante, puedes usar este archivo para recuperar tu cuenta si recuerdas la contraseña.

{% roboWikiPicture {src:"docs/creating-an-account/2.4-robonomics-app-account-created.png", alt:"Creación exitosa de la cuenta"} %}{% endroboWikiPicture %}

## 2.3 Agregar cuenta ed25519 a la extensión de Polkadot

Es posible que necesites agregar la cuenta creada a la extensión de Polkadot.js (para la cuenta ed25519 solo puedes hacerlo con el archivo JSON de respaldo). Para ello, necesitas crear un archivo de respaldo de la cuenta. Haz clic en los tres puntos de tu cuenta y elige `Crear un archivo de respaldo para esta cuenta` y escribe tu contraseña.

{% roboWikiPicture {src:"docs/creating-an-account/backup-file.jpg", alt:"Archivo de respaldo"} %}{% endroboWikiPicture %}

Luego abre la extensión y presiona el botón `+` en la esquina superior derecha, luego elige `Restaurar cuenta desde archivo JSON de respaldo`.

{% roboWikiPicture {src:"docs/creating-an-account/extention-add-backup.jpg", alt:"Restaurar respaldo en la extensión"} %}{% endroboWikiPicture %}

En la ventana abierta, suelta el archivo guardado, ingresa la contraseña y presiona `Restaurar`.

{% roboWikiPicture {src:"docs/creating-an-account/file-backup.jpg", alt:"Restaurar copia de seguridad en extensión 2"} %}{% endroboWikiPicture %}

## 3. Cuenta Creada Exitosamente

Ahora puedes operar completamente con tu cuenta recién creada. Envía y recibe tokens, mensajes, escribe datalogs y más. Siéntete libre de explorar todas las funciones de la aplicación. Para copiar la dirección de tu cuenta, simplemente haz clic en su ícono, la dirección se copiará al portapapeles.

Si deseas obtener más información sobre las cuentas de Polkadot / Kusama y formas adicionales de crearlas, puedes encontrar más información [aquí](https://wiki.polkadot.network/docs/learn-accounts) y [aquí](https://wiki.polkadot.network/docs/learn-account-generation).