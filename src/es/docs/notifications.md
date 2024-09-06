---

title: Robonomics Smart Home

contributors: [LoSk-p]

---

Puedes recibir notificaciones en tu teléfono inteligente con [notify](https://notify.events/). Primero regístrate allí y en el `Panel de Control` crea un nuevo canal:

{% roboWikiPicture {src:"docs/home-assistant/not_control_panel.png", alt:"control_panel"} %}{% endroboWikiPicture %}

Agrega un título y presiona `Guardar`:

{% roboWikiPicture {src:"docs/home-assistant/not_create_chanell.png", alt:"channel"} %}{% endroboWikiPicture %}

Luego presiona `Agregar Fuente` y elige `Home Assistant` en la pestaña `IoT y Hogar Inteligente`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source.png", alt:"source"} %}{% endroboWikiPicture %}

Escribe un título y presiona `Siguiente`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source_next.png", alt:"source_next"} %}{% endroboWikiPicture %}

Allí verás el token que necesitas agregar a tu archivo de configuración para Home Assistant. Guárdalo en algún lugar y presiona `Listo`:

{% roboWikiPicture {src:"docs/home-assistant/not_token.png", alt:"token"} %}{% endroboWikiPicture %}

luego presiona `Suscribirse` para agregar suscriptores:

{% roboWikiPicture {src:"docs/home-assistant/not_subscribe.png", alt:"subscribe"} %}{% endroboWikiPicture %}

Elige el suscriptor que desees y sigue las instrucciones.

Ahora necesitas editar la configuración en tu computadora con Home Assistant. Bajo el usuario `homeassistant`, abre el archivo `configuration.yaml`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

Y agrega estas líneas:


```yaml
notify_events:
    token: <tu token de notify>
```
También agrega una nueva automatización después de la línea `automation:`:

{% codeHelper { copy: true}%}

```yaml
- alias: notificaciones
  trigger:
  - entity_id: binary_sensor.contact_sensor_contact
    platform: state
    from: 'off'
    to: 'on'
  action:
  - service: notify.notify
    data:
      message: La puerta cambió a {{ '{{states("binary_sensor.contact_sensor_contact")}}' }}
```

{% endcodeHelper %}

Esta automatización enviará el mensaje `La puerta cambió a on/off` después de que el sensor con la identificación de entidad `binary_sensor.contact_sensor_contact` cambie de estado de `off` a `on`.

Y reinicia Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```