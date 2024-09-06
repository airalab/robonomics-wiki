---
title: Agregar Usuario

contributors: [nakata5321, Fingerling42, LoSk-p]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**Este artículo te mostrará cómo configurar un nuevo usuario en tu Asistente de Hogar.**

## Agregar Usuarios a la Suscripción

No puedes usar cuentas creadas previamente porque `OWNER` y `CONTROLLER` proporcionan seguridad, y el primer usuario que creaste al iniciar por primera vez el Asistente de Hogar no tiene una cuenta en la Parachain de Robonomics.

{% roboWikiVideo {videos:[{src: 'QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Crea una cuenta en la Parachain de Robonomics, como lo hiciste en el [artículo anterior](/docs/sub-activate/).

2. Utilizando la cuenta `OWNER`, agrega la nueva cuenta de usuario a la suscripción en la página `CONFIGURAR UNA SUSCRIPCIÓN` en [Robonomics DApp](https://robonomics.app/#/rws-setup). Ahora en la sección `USUARIOS EN LA SUSCRIPCIÓN` deberían haber tres direcciones en la lista de acceso: `OWNER`, `CONTROLLER` y `USUARIO`.


## Archivo JSON de Configuración de RWS

En primer lugar, el usuario debe obtener el archivo JSON con la información de la Configuración de RWS.

### Crear JSON de Configuración de RWS

El administrador puede crear un archivo JSON para su configuración en la página [CONFIGURAR UNA SUSCRIPCIÓN](https://robonomics.app/#/rws-setup) utilizando el botón `Descargar importación para otros usuarios`.

{% roboWikiPicture {src:"docs/home-assistant/download_rws_setup_json.png", alt:"imagen"} %}{% endroboWikiPicture %}

### Importar Configuración de RWS

Ahora, con este archivo JSON, el usuario puede importar la configuración de RWS utilizando el botón `IMPORTAR CONFIGURACIÓN`.

{% roboWikiVideo {videos:[{src: 'QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Conceder Acceso al Usuario

En la misma página ([CONFIGURAR UNA SUSCRIPCIÓN](https://robonomics.app/#/rws-setup)) puedes establecer la contraseña para el nuevo usuario.

{% roboWikiVideo {videos:[{src: 'Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Elige la cuenta que acabas de crear en la barra lateral derecha (verifica que has seleccionado la cuenta deseada presionando el ícono de perfil).

2. Ingresa la dirección y frase semilla del `USUARIO` en los campos requeridos.

3. Ingresa una contraseña y luego confirma la transacción con el botón `CREAR CONTRASEÑA`, que ahora será sin cargo debido a la suscripción.

4. Después del proceso de registro, inicia sesión en el Asistente de Hogar con la dirección de tu usuario como inicio de sesión y la contraseña recién creada.

Ahora puedes usar la aplicación para controlar tu hogar a través de Robonomics, consulta el artículo [**"Obtener Telemetría de Casa Inteligente"**](/docs/smart-home-telemetry/).