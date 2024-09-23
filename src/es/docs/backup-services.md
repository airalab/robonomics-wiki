---
title: Servicios de Respaldo

colaboradores: [tubleronchik, LoSk-p]
herramientas:
  - Integración de Robonomics Home Assistant 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**En este artículo, aprenderás cómo generar copias de seguridad de la configuración de tu Home Assistant y restaurarla cuando sea necesario. Para crear copias de seguridad, se llama a un servicio que genera un archivo seguro con los archivos de configuración. Además, el servicio agrega la configuración de Mosquitto brocker y Zigbee2MQTT a la copia de seguridad si existen. Luego, este servicio agrega el archivo a IPFS y almacena el CID resultante en Robonomics Digital Twin.**
## Creando una Copia de Seguridad de la Configuración de Home Assistant

Crear una copia de seguridad te permite restaurar fácilmente la configuración de tu Home Assistant en caso de fallo.

{% roboWikiVideo {videos:[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning", title: "ADVERTENCIA"}%}Para hacer una copia de seguridad y restaurar tu configuración, es necesario utilizar una **puerta de enlace IPFS personalizada** como Pinata. Sin ella, tu copia de seguridad se almacenará únicamente en tu nodo IPFS local, lo que puede impedirte restaurar la configuración de tu Home Assistant en caso de fallo del nodo local.
{% endroboWikiNote %}

1. En la interfaz web de Home Assistant, ve a `Herramientas de Desarrollo` -> `Servicios`. Busca `Robonomics: Guardar Copia de Seguridad en Robonomics` y presiona `LLAMAR SERVICIO`.

2. Espera hasta que veas la notificación `La copia de seguridad se actualizó en Robonomics` aparezca en `Notificaciones`.


{% roboWikiNote {type: "warning", title: "ADVERTENCIA"}%} No intentes crear una copia de seguridad o restaurar la configuración inmediatamente después de cargar Home Assistant e Integración de Robonomics. Por favor, **espera aproximadamente 5 minutos** para permitir que la configuración inicial se complete. {% endroboWikiNote %}

Argumentos del servicio:
- **Copia de Seguridad Completa**  (por defecto: Falso) - agrega la base de datos a la copia de seguridad, por lo que también se almacenará el historial de estados de las entidades.
- **Ruta al archivo de contraseña de mosquitto** (por defecto: `/etc/m`osquitto`) - Si utilizaste los métodos de instalación de Home Assistant Core o Docker y no tienes la ruta predeterminada al broker de Mosquitto, debes cambiar este parámetro. *No es necesario para Home Assistant OS o Supervisor*.

## Restaurar la configuración de Home Assistant desde una copia de seguridad

Para restaurar tu configuración, necesitarás tener instalado Home Assistant y la Integración de Robonomics.

{% roboWikiVideo {videos:[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Para garantizar una restauración exitosa de tu configuración en Home Assistant Core y los métodos de instalación de Docker, debes realizar pasos de configuración adicionales según se describe al final de la página.
{% endroboWikiNote %}

1. Instala Home Assistant con la Integración de Robonomics (si aún no está instalada), siguiendo los pasos del artículo para el [método de instalación deseado](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [Configura la Integración de Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration) utilizando **las mismas semillas** que utilizaste en la configuración previa de Robonomics. Si tu suscripción ha caducado, [reactívala](https://wiki.robonomics.network/docs/sub-activate).

3. En la interfaz web de Home Assistant, ve a `Herramientas de Desarrollo` -> `Servicios`. Busca `Robonomics: Restaurar desde la copia de seguridad en Robonomics` y presiona `LLAMAR SERVICIO`. Navega a la página `Resumen` para verificar el estado de tu copia de seguridad.

4. Después de restaurar, Home Assistant se reiniciará automáticamente. Si por alguna razón Home Assistant no se reinicia, puedes verificar el estado de restauración monitoreando el estado de la entidad `robonomics.backup`. Si el estado es `restaurado`, deberás reiniciar manualmente Home Assistant yendo a `Configuración` > `Sistema` y haciendo clic en el botón `REINICIAR` ubicado en la esquina superior derecha.

5. Si tu copia de seguridad incluye la configuración de Zigbee2MQTT o Mosquitto, necesitarás reiniciar estos servicios para habilitar la nueva configuración. Puedes hacer estomanualmente reiniciando los servicios individualmente, o simplemente reiniciar la computadora de Home Assistant para asegurarse de que todos los servicios se reinicien.

Argumentos de servicio:
- **Ruta al archivo de contraseña de mosquitto** (predeterminado: `/etc/mosquitto`) - Si utilizaste los métodos de instalación de Home Assistant Core o Docker y no tienes la ruta predeterminada al broker de Mosquitto, debes cambiar este parámetro. *No es necesario para Home Assistant OS o Supervisor*.
- **Ruta a la configuración de Zigbee2MQTT** (predeterminado: `/opt/zigbee2mqtt`) - Si utilizaste los métodos de instalación de Home Assistant Core o Docker y no tienes la ruta predeterminada a Zigbee2MQTT, debes cambiar este parámetro. *No es necesario para Home Assistant OS o Supervisor*.

## Restaurar la Configuración de Mosquitto y Zigbee2MQTT para el Método de Instalación de Home Assistant Core

Si la copia de seguridad incluye la configuración de Mosquitto o Zigbee2MQTT, durante el proceso de restauración, se colocarán en la ruta predeterminada o en la ruta especificada en los argumentos. Sin embargo, si instalaste la integración de Robonomics en un Home Assistant Core existente *(no desde la imagen preinstalada de Robonomics)*, es posible que el usuario `homeassistant` no tenga acceso a esta ruta.

Por lo tanto, para restaurar la configuración de Mosquitto y Zigbee2MQTT, necesitas otorgar los permisos de lectura necesarios al usuario `homeassistant`:

```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Copia de Seguridad de la Configuración de Mosquitto y Zigbee2MQTT para el Método de Instalación de Home Assistant Docker

Para hacer una copia de seguridad de las configuraciones de Mosquitto y Zigbee2MQTT desde un contenedor Docker, necesitas crear volúmenes para sus respectivas configuraciones. Esto se puede lograr ejecutando tu contenedor de Home Assistant con argumentos adicionales:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MI_ZONA_HORARIA \
  -v /RUTA_A_TU_CONFIGURACIÓN:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

o realiza cambios en tu archivo `compose.yaml`:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
```    imagen: "ghcr.io/home-assistant/home-assistant:estable"
    volúmenes:
      - /RUTA_A_TU_CONFIGURACIÓN:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    reinicio: unless-stopped
    privilegiado: true
    modo_de_red: host
```

{% roboWikiNote {type: "note", title:"Nota"}%}Ten en cuenta que las rutas predeterminadas para las configuraciones de Mosquitto y Zigbee2MQTT son `/etc/mosquitto` y `/opt/zigbee2mqtt`, respectivamente. Sin embargo, estas rutas pueden variar según tu configuración específica.
{% endroboWikiNote %}

## Botones de Respaldo

Además de utilizar servicios para trabajar con respaldos, puedes simplificar el proceso utilizando los botones `button.create_backup` y `button.restore_from_backup` de la integración de Robonomics. Estos botones invocan los servicios respectivos con parámetros predeterminados (el botón de respaldo crea un respaldo sin historial).

{% roboWikiVideo {videos:[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Para agregar botones a tu panel, sigue estos pasos:

1. Haz clic en los tres puntos en la esquina superior derecha del panel.
2. Selecciona `Editar Panel`.
3. Haz clic en el botón `Agregar Tarjeta` en la esquina inferior derecha.
4. Elige la tarjeta `Entidades`.
5. En el campo `Entidades`, busca las entidades button.create_backup y button.restore_from_backup.
6. Presiona `Guardar` para añadir las entidades a la tarjeta.
7. Finaliza la edición haciendo clic en el botón `Listo` en la esquina superior derecha.