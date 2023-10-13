---
title: Servicios de respaldo

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**En este artículo, aprenderás cómo generar respaldos de la configuración de tu Home Assistant y restaurarla cuyo sea necesario. Para crear respaldos, se llama a un servicio que genera un archivo seguro con los archivos de configuración. Además, el servicio agrega la configuración de Mosquitto brocker y Zigbee2MQTT al respaldo si existen. Luego, este servicio agrega el archivo a IPFS y almacena el CID resultante en Robonomics Digital Twin.**
## Creación de respaldo de la configuración de Home Assistant

Crear un respaldo te permite restaurar fácilmente la configuración de tu Home Assistant en caso de una falla.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type:'mp4'}]" />

<robo-wiki-note type="warning" title="ADVERTENCIA">

Para respaldar y restaurar tu configuración, es necesario utilizar una **puerta de enlace IPFS personalizada** como Pinata. Sin ella, tu respaldo se almacenará únicamente en tu nodo IPFS local, lo que puede impedirte restaurar la configuración de tu Home Assistant en caso de una falla del nodo local.

</robo-wiki-note>

1. En la interfaz web de Home Assistant, ve a `Developer Tools` -> `Services`. Buscar `Robonomics: Save Backup to Robonomics` y presiona `CALL SERVICE`.

2. Espera hasta que veas la notificación `Backup was updated in Robonomics` aparecer en `Notification`.

<robo-wiki-note type="warning" title="ADVERTENCIA">

No intentes crear un respaldo o restaurar la configuración inmediatamente después de cargar Home Assistant y Robonomics Integration. Por favor, **espera aproximadamente 5 minutos** para permitir que la configuración inicial se complete.

</robo-wiki-note>

Argumentos del servicio:
- **Respaldo completo**  (default: False) - agrega la base de datos al respaldo, por lo que también se almacenará el historial de estados de las entidades.
- **Ruta al archivo de contraseña de mosquitto** (default: `/etc/mosquitto`) - Si utilizaste los métodos de instalación de Home Assistant Core o Docker y no tienes la ruta predeterminada al Mosquitto brocker, debes cambiar este parámetro. *No es necesario para Home Assistant OS o Superviser*.

## Restauración de la configuración de Home Assistant desde un respaldo

Para restaurar tu configuración, necesitarás tener instalado Home Assistant y Robonomics Integration. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type:'mp4'}]" />

<robo-wiki-note type="warning" title="ADVERTENCIA">

Para asegurar una restauración exitosa de tu configuración en Home Assistant Core y los métodos de instalación de Docker, debes realizar pasos de configuración adicionales como se describe al final de la página.

</robo-wiki-note>

1. Instala Home Assisntant con Robonomics Integration (si aún no está instalado), siguiendo los pasos del artículo para el [método de instalación deseado](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [Configuración de integración de Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration) usando **las mismas semillas** que utilizaste en la configuración anterior de Robonomics. Si tu suscripción ha finalizado, [reactívala](https://wiki.robonomics.network/docs/sub-activate).

3. En la interfaz web de Home Assistant ve a `Developer Tools` -> `Services`. Search for `Robonomics: Restore from the Backup in Robonomics` and presione el botón `CALL SERVICE`. Navega hasta la `Overview` page, to check the status of your backup, .

4. Después de restaurar, Home Assistant se reiniciará automáticamente. Si por alguna razón Home Assistant no se reinicia, puedes verificar el estado de restauración monitoreando el estado de la `robonomics.backup` entidad. Si el estado es `restored` necesitarás reiniciar manualmente Home Assistant navegando a `Settings` > `System` y haciendo clic en el `RESTART` botón ubicado en la esquina superior derecha.

5. Si tu respaldo incluye la configuración de Zigbee2MQTT o Mosquitto, necesitarás reiniciar estos servicios para habilitar la nueva configuración. Puedes hacer esto manualmente reiniciando los servicios individualmente, o simplemente reiniciando la computadora de Home Assistant para asegurarte de que todos los servicios se reinicien.

Argumentos del servicio:
- **Ruta al archivo de contraseña de Mosquito** (default: `/etc/mosquitto`) - Si utilizaste los métodos de instalación de Home Assistant Core o Docker y no tienes la ruta predeterminada al broker de Mosquitto, debes cambiar este parámetro. *Not needed for Home Assistant OS or Superviser*.
- **Ruta de configuración de Zigbee2MQTT**  (default: `/opt/zigbee2mqtt`) - Si utilizaste los métodos de instalación de Home Assistant Core o Docker y no tienes la ruta predeterminada a Zigbee2MQTT, debes cambiar este parámetro. *Not needed for Home Assistant OS or Superviser*.

## Restaurar la configuración de Mosquitto y Zigbee2MQTT para el método de instalación de Home Assistant Core

Si el respaldo incluye la configuración de Mosquitto o Zigbee2MQTT, durante el proceso de restauración, se colocarán en la ruta predeterminada o en la ruta especificada en los argumentos. Sin embargo, si instalaste la integración de Robonomics en un Home Assistant Core existente *(no desde la imagen preinstalada de Robonomics)*, `homeassistant` el usuario puede no tener acceso a esta ruta.

Por lo tanto, para restaurar la configuración de Mosquitto y Zigbee2MQTT, necesitas otorgar los permisos de lectura necesarios al usuario `homeassistant`:
```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Respaldo de la configuración de Mosquitto y Zigbee2MQTT para el método de instalación de Home Assistant Docker

Para respaldar las configuraciones de Mosquitto y Zigbee2MQTT desde un contenedor Docker, necesitas crear volúmenes para sus respectivas configuraciones. Esto se puede lograr ejecutando tu contenedor de Home Assistant con argumentos adicionales:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

o hacer cambios en tu `compose.yaml` archivo:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```
<robo-wiki-note type="note" title="Note">

Ten en cuenta que las rutas predeterminadas para las configuraciones de Mosquitto y Zigbee2MQTT son `/etc/mosquitto` and `/opt/zigbee2mqtt`, respectivamente. Sin embargo, estas rutas pueden variar dependiendo de tu configuración específica.

</robo-wiki-note>

## Botones de respaldo

Además de utilizar servicios para trabajar con respaldos, puedes simplificar el proceso utilizando los `button.create_backup` and `button.restore_from_backup` botones de la integración de Robonomics. Estos botones invocan los servicios respectivos con parámetros predeterminados (el botón de respaldo crea un respaldo sin historial).

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type:'mp4'}]" />

Para agregar botones a tu panel de control, sigue estos pasos:

1. Haz clic en los tres puntos en la esquina superior derecha del panel de control.
2. Selecciona `Edit Dashboard`.
3. Haz clic en el `Add Card` botón en la esquina inferior derecha.
4. Choose the `Entities` tarjeta.
5. En el campo `Entities` busca las entidades button.create_backup y button.restore_from_backup.
6. Presiona `Save` para agregar las entidades a la tarjeta.
7. Finaliza la edición haciendo clic en el `Done` botón en la esquina superior derecha.