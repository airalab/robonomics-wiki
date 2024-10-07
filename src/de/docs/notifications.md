---

title: Robonomics Smart Home

contributors: [LoSk-p]

---

Sie können Benachrichtigungen auf Ihrem Smartphone mit [notify](https://notify.events/) erhalten. Registrieren Sie sich zunächst dort und erstellen Sie im `Control Panel` einen neuen Kanal:

{% roboWikiPicture {src:"docs/home-assistant/not_control_panel.png", alt:"control_panel"} %}{% endroboWikiPicture %}

Fügen Sie einen Titel hinzu und klicken Sie auf `Speichern`:

{% roboWikiPicture {src:"docs/home-assistant/not_create_chanell.png", alt:"channel"} %}{% endroboWikiPicture %}

Klicken Sie dann auf `Quelle hinzufügen` und wählen Sie `Home Assistant` im Tab `IoT und Smart Home` aus:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source.png", alt:"source"} %}{% endroboWikiPicture %}

Geben Sie einen Titel ein und klicken Sie auf `Weiter`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source_next.png", alt:"source_next"} %}{% endroboWikiPicture %}

Dort sehen Sie den Token, den Sie zu Ihrer Konfigurationsdatei für Home Assistant hinzufügen müssen. Speichern Sie ihn an einem sicheren Ort und klicken Sie auf `Fertig`:

{% roboWikiPicture {src:"docs/home-assistant/not_token.png", alt:"token"} %}{% endroboWikiPicture %}

Klicken Sie dann auf `Abonnieren`, um Abonnenten hinzuzufügen:

{% roboWikiPicture {src:"docs/home-assistant/not_subscribe.png", alt:"subscribe"} %}{% endroboWikiPicture %}

Wählen Sie den gewünschten Abonnenten aus und befolgen Sie die Anweisungen.

Jetzt müssen Sie die Konfiguration auf Ihrem Computer mit Home Assistant bearbeiten. Öffnen Sie unter dem Benutzer `homeassistant` die Datei `configuration.yaml`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

Und fügen Sie diese Zeilen hinzu:


```yaml
notify_events:
    token: <Ihr Token von notify>
```
Fügen Sie auch eine neue Automation nach der Zeile `automation:` hinzu:

{% codeHelper { copy: true}%}

```yaml
- alias: Benachrichtigungen
  trigger:
  - entity_id: binary_sensor.contact_sensor_contact
    platform: state
    from: 'off'
    to: 'on'
  action:
  - service: notify.notify
    data:
      message: Tür wurde auf {{ '{{states("binary_sensor.contact_sensor_contact")}}' }} geändert
```

{% endcodeHelper %}

Diese Automation sendet die Nachricht `Tür wurde auf on/off geändert`, nachdem der Sensor mit der Entitäts-ID `binary_sensor.contact_sensor_contact` den Zustand von `off` auf `on` geändert hat.

Und starten Sie Home Assistant neu:
```bash
systemctl restart home-assistant@homeassistant.service
```