---
title: Robonomics Smart Home

contributors: [LoSk-p]
---

Puedes recibir notificaciones en tu smartphone con [notify](https://notify.events/). Primero regístrate allí y en el `Control Panel` crea un nuevo canal:

![control_panel](../images/home-assistant/not_control_panel.png)

Agrega un título y presiona `Save`:

![channel](../images/home-assistant/not_create_chanell.png)

Luego presiona `Add Source` y elige `Home Assistant` en la pestaña `IoT y Smart Home`:

![source](../images/home-assistant/not_add_source.png)

Escribe un título y presiona `Next`:

![source_next](../images/home-assistant/not_add_source_next.png)

Allí verás el token que necesitas agregar a tu archivo de configuración para Home Assistant. Guárdalo en algún lugar y presiona `Done`:

![token](../images/home-assistant/not_token.png)

luego presiona `Subscribe` para agregar suscriptores:

![subscribe](../images/home-assistant/not_subscribe.png)

Elige el suscriptor que desees y sigue las instrucciones.

Ahora necesitas editar la configuración en tu computadora con Home Assistant. Bajo el usuario `homeassistant`, abre el archivo `configuration.yaml`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

Y agrega estas líneas:

```yaml
notify_events:
    token: <your token from notify>
```
También agrega una nueva automatización después de la línea `automation:`:
```yaml
- alias: notifications
  trigger:
  - entity_id: binary_sensor.contact_sensor_contact
    platform: state
    from: 'off'
    to: 'on'
  action:
  - service: notify.notify
    data:
      message: Door was changed to {{ states("binary_sensor.contact_sensor_contact") }}
```
Esta automatización enviará el mensaje `Door was changed to on/off` después de que el sensor con ID de entidad `binary_sensor.contact_sensor_contact` cambie de estado de `apagado` a `encendido`.

Y reinicia Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```