---

title: Actualiza tu Home Assistant OS
contributors: [LoSk-p]
tools:
  - Home Assistant OS 12.1 para RaspPi
    https://github.com/home-assistant/operating-system
  - Home Assistant Core 2024.5.1
    https://github.com/home-assistant/core
  - HACS 1.34.0
    https://github.com/hacs/integration/
  - Integración de Robonomics para Home Assistant 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - Complemento de IPFS para Home Assistant 1.3.2
    https://github.com/PinoutLTD/ipfs-addon
  - Complemento de Proxy Libp2p <-> WS 0.0.1
    https://github.com/PinoutLTD/addon-libp2p-ws-proxy

---

**Este artículo contiene instrucciones para actualizar tu Home Assistant OS existente con la integración de Robonomics.**


{% roboWikiPicture {src:"docs/home-assistant/homeassistant_os.png", alt:"homeassistant_os"} %}{% endroboWikiPicture %}

## Instalar HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) te permite instalar integraciones personalizadas.

{% roboWikiVideo {videos:[{src: 'mYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Antes de comenzar, necesitas instalar un complemento para conectarte al dispositivo Home Assistant con SSH. En la tienda de complementos, busca `ssh`. Recomendamos instalar el complemento `SSH & Web Terminal`.

{% roboWikiNote {title:"Advertencia", type: "warning"}%} Si no encuentras el complemento SSH, intenta habilitar el Modo Avanzado en la configuración de tu perfil de usuario. Para hacerlo, haz clic en el ícono de perfil en la esquina inferior izquierda y busca la opción de Modo Avanzado.{% endroboWikiNote %}

2. Elige el complemento y presiona `INSTALAR`. Después de que la instalación haya finalizado, ve a la pestaña `Configuración` y agrega una `contraseña` o `authorized_keys`. No olvides guardar esta parte de la configuración.

3. En la pestaña `Información`, presiona `INICIAR`. Si deseas ver el complemento en la barra lateral, no olvides habilitar `Mostrar en la barra lateral`.

{% roboWikiVideo {videos:[{src: 'QmYfLWdLH3jTU2uQhr1pzZFsjUNSZ8wtbtEsCdpvmyn4YH', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

4. Abre el complemento SSH y ejecuta el siguiente comando:

{% codeHelper { additionalLine: "Línea de Comandos de Home Assistant", copy: true}%}

```bash
wget -O - https://get.hacs.xyz | bash -
```

{% endcodeHelper %}

5. Reinicia Home Assistant (puedes hacerlo en `Configuración`->`Sistema`).

6. Ahora la Integración de HACS estará disponible para agregar en el menú `Integraciones`. Ve a `Configuración`->`Dispositivos y Servicios`, presiona `Agregar Integración` y busca HACS.

{% roboWikiNote {title:"Advertencia", type: "warning"}%} Para usar HACS necesitas una cuenta de Github.{% endroboWikiNote %}

7. Haz clic en él y sigue las instrucciones de instalación.

## Instalar los Complementos de IPFS Daemon y Libp2p - WS Proxy

La Integración de Robonomics almacena los datos utilizando un daemon IPFS local y también utiliza Libp2p para el control remoto, por lo que primero necesitas instalarlo. Puedes agregar el repositorio de Complementos de Robonomics usando este botón

[![Abre tu instancia de Home Assistant y muestra el diálogo para agregar un complemento con una URL de repositorio específica prellenada.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPinoutLTD%2Frobonomics-addons)

O manualmente siguiendo los siguientes pasos:

{% roboWikiVideo {videos:[{src: 'QmZgXme4HSrBwDKekBEy5svpQNVWywrvmN7Zthfa27Gu2H', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Existe un [Repositorio de Complementos de Robonomics](https://github.com/PinoutLTD/robonomics-addons). Para instalarlo ve a `Configuración` -> `Complementos` y presiona el botón `TIENDA DE COMPLEMENTOS` en la esquina inferior derecha.

2. Presiona en los tres puntos en la esquina superior derecha y elige `Repositorios`. Agrega allí el siguiente enlace:

{% codeHelper { copy: true}%}

```
https://github.com/PinoutLTD/robonomics-addons
```

{% endcodeHelper %}

3. Presiona el botón `AÑADIR`.

4. Cierra el administrador de repositorios y actualiza la página. Ahora al final de la página podrás ver los Complementos de Robonomics.

Ahora puedes instalar ambos complementos. Ábrelos y presiona `INSTALAR`. Después de la instalación, presiona `INICIAR`.

## Instalar la Integración de Robonomics

Ahora puedes instalar la Integración de Robonomics usando HACS.

{% roboWikiVideo {videos:[{src: 'QmSsCYxp7xJ22RZEx3FtJBFfGASu1t4rmqhf78xasnMwt4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Abre HACS desde el menú lateral y busca `Robonomics`. Luego haz clic en el botón `Descargar` ubicado en la esquina inferior derecha. Una vez que la descarga esté completa, reinicia Home Assistant.