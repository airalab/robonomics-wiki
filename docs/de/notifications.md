---
title: Robonomics Smart Home

contributors: [LoSk-p]
---

Sie können Benachrichtigungen auf Ihrem Smartphone mit [notify](https://notify.events/) erhalten. Registrieren Sie sich zunächst dort und erstellen Sie auf dem `Control Panel` einen neuen Kanal:

![control_panel](../images/home-assistant/not_control_panel.png)

Geben Sie einen Titel ein und klicken Sie auf `Save`:

![channel](../images/home-assistant/not_create_chanell.png)

Klicken Sie dann auf `Add Source` und wählen Sie `Home Assistant` im Tab `IoT and Smart Home` aus:

![source](../images/home-assistant/not_add_source.png)

Geben Sie einen Titel ein und klicken Sie auf `Next`:

![source_next](../images/home-assistant/not_add_source_next.png)

Dort sehen Sie den Token, den Sie zu Ihrer Konfigurationsdatei für Home Assistant hinzufügen müssen. Speichern Sie ihn an einem sicheren Ort und klicken Sie auf `Done`:

![token](../images/home-assistant/not_token.png)

Klicken Sie dann auf `Subscribe`, um Abonnenten hinzuzufügen:

![subscribe](../images/home-assistant/not_subscribe.png)

Wählen Sie den gewünschten Abonnenten aus und befolgen Sie die Anweisungen.

Jetzt müssen Sie die Konfiguration auf Ihrem Computer mit Home Assistant bearbeiten. Öffnen Sie unter dem Benutzer `homeassistant` die Datei `configuration.yaml`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

Fügen Sie diese Zeilen hinzu:

```yaml
notify_events:
    token: <your token from notify>
```
Fügen Sie auch nach der Zeile `automation:` eine neue Automatisierung hinzu:
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
Diese Automatisierung sendet die Nachricht `Door was changed to on/off`, nachdem sich der Sensor mit der Entitäts-ID `binary_sensor.contact_sensor_contact` vom Zustand `off` auf `on` geändert hat.

Und starten Sie Home Assistant neu:
```bash
systemctl restart home-assistant@homeassistant.service
```