---
title: PTZ-Kamerasteuerung in Home Assistant
contributors: [nakata5321]
---

Dieser Artikel behandelt den Prozess der Einrichtung einer PTZ-Kamera in Home Assistant.
Das ONVIF-Protokoll wird verwendet. Hierfür wird ein lokales Kamerakonto benötigt.

{% roboWikiNote {title:"test", type: "warning"}%} Der Prozess der Einrichtung des lokalen Kamerakontos wird in diesem Artikel nicht behandelt.
{% endroboWikiNote %}


Anforderungen:
- PTZ-Kamera
- Lokales Kamerakonto
- Kamera-IP-Adresse
- Konfiguriertes Home Assistant

## ONVIF-Integration

Beginnen wir mit der Installation der **ONVIF-Integration**.

Gehen Sie zu "Geräte & Dienste" in den "Einstellungen" und drücken Sie die Schaltfläche "INTEGRATION HINZUFÜGEN".
Geben Sie "ONVIF" ein und wählen Sie die Integration aus. Sie sehen dann das nächste Fenster.

{% roboWikiPicture {src:"docs/home-assistant/onvifsetup.jpg", alt:"onvif setup"} %}{% endroboWikiPicture %}

Drücken Sie die Schaltfläche "Senden". Es wird versuchen, automatisch nach Ihrer Kamera zu suchen. Wenn dies erfolgreich ist,
wählen Sie Ihre Kamera aus der Liste aus und füllen Sie die leeren Felder aus.
Andernfalls müssen Sie alle Felder manuell ausfüllen. Sie sehen dann das folgende Fenster.

{% roboWikiPicture {src:"docs/home-assistant/onvifconfig.jpg", alt:"onvif config"} %}{% endroboWikiPicture %}

Füllen Sie die Lücken aus:
- Name - geben Sie Ihrer Kamera einen Namen
- Host - geben Sie die IP-Adresse Ihrer Kamera an
- Port - normalerweise ist es 2020, aber Ihr Kamerahersteller könnte es geändert haben
- Benutzername - geben Sie den Benutzernamen Ihres lokalen Kamerakontos ein
  - Passwort - geben Sie ein Passwort für Ihr lokales Kamerakonto ein

und drücken Sie "Senden". Wählen Sie einen Bereich für Ihre Kamera und klicken Sie auf "Fertig".

## Fügen Sie die Kamerasteuerung zum Dashboard hinzu

Nun, da Sie die Kamera vollständig eingerichtet haben, können Sie deren Stream und Steuerungstasten zum Dashboard hinzufügen.

Gehen Sie zum Dashboard und beginnen Sie mit der Erstellung einer neuen Karte. Wählen Sie die "Bildübersicht".

{% roboWikiPicture {src:"docs/home-assistant/glance.jpg", alt:"glance"} %}{% endroboWikiPicture %}

Füllen Sie die Daten aus:
- Titel - wählen Sie den Titel des Kamerabildes
- Kamera-Entität - wählen Sie eine Kamera-Entität aus der Dropdown-Liste
- Kamerablick - wählen Sie "live", um weniger Verzögerung zu erhalten

Wechseln Sie dann in den "Code-Editor"-Modus, indem Sie die Schaltfläche unten links drücken. Sie sehen dann den folgenden Code:
```shell
camera_view: live
type: picture-glance
title: Küche
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Ersetzen Sie den Inhalt von `entities: []` gemäß dem folgenden Beispiel (`<IHRE_KAMERA_ENTITÄT>` entspricht dem Parameter `camera_image`):

{% codeHelper { copy: true}%}

```
entities:
  - entity: <IHRE_KAMERA_ENTITÄT>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <IHRE_KAMERA_ENTITÄT>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Nach links schwenken
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <IHRE_KAMERA_ENTITÄT>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <IHRE_KAMERA_ENTITÄT>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Nach oben neigen
    icon: 'mdi:arrow-up'
  - entity: <IHRE_KAMERA_ENTITÄT>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <IHRE_KAMERA_ENTITÄT>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Nach unten neigen
    icon: 'mdi:arrow-down'
  - entity: <IHRE_KAMERA_ENTITÄT>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <IHRE_KAMERA_ENTITÄT>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Nach rechts schwenken
    icon: 'mdi:arrow-right'
    show_icon: true
```

{% endcodeHelper %}

Das war's. Jetzt sollten Sie die PTZ-Kamera-Karte auf dem Dashboard zusammen mit den Steuerungstasten sehen.

## Fehlerbehebung
Wenn Sie Home Assistant Core verwenden und keinen Stream von der Kamera sehen, sollten Sie die Integrationen "stream" und "FFMPEG" installieren.
Fügen Sie dazu die Zeichenfolgen `stream: ` und `ffmpeg: ` am Ende der configuration.yaml hinzu.