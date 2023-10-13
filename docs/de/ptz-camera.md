---
title: PTZ-Kamerasteuerung in Home Assistant
contributors: [nakata5321]
---

Dieser Artikel behandelt den Prozess der Einrichtung einer PTZ-Kamera in Home Assistant. 
Es wird das ONVIF-Protokoll verwendet. Dafür wird ein lokales Kamerakonto benötigt.

<robo-wiki-note type="warning">
Der Prozess zur Einrichtung des lokalen Kamerakontos wird in diesem Artikel nicht behandelt.
</robo-wiki-note>

Anforderungen:
- PTZ-Kamera
- Lokales Kamerakonto
- Kamera-IP-Adresse
- Konfiguriertes Home Assistant

## ONVIF-Integration

Beginnen wir mit der Installation der **ONVIF-Integration**. 

Gehe zu "Devices & Services" in den "Settings" und drücke den "ADD INTEGRATION"-Button.
Gib "ONVIF" ein und wähle die Integration aus. Du wirst das nächste Fenster sehen.

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

Drücke den "Sudmit"-Button. Es wird versuchen, automatisch nach deiner Kamera zu suchen. Wenn erfolgreich, 
wähle deine Kamera aus der Liste aus und fülle leere Felder aus. 
Andernfalls musst du alle Felder manuell ausfüllen. Du wirst das folgende Fenster sehen.

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

Fülle die Lücken aus:
- Name - gib deiner Kamera einen Namen
- Host - gib die IP-Adresse deiner Kamera an
- Port - meistens ist es 2020, aber dein Kamerahersteller kann es ändern
- Username - schreibe den Benutzernamen deines Kamera-Lokalkontos
  - Password - schreibe ein Passwort für dein Kamera-Lokalkonto

und drücke "Sudmit". Wähle einen Bereich für deine Kamera aus und klicke auf "Finish".

## Füge die Kamerasteuerung zum Dashboard hinzu

Jetzt, da du die Kamera vollständig eingerichtet hast, kannst du ihren Stream und die Steuerungstasten zum Dashboard hinzufügen.

Gehe zum Dashboard und erstelle eine neue Karte. Wähle die "Picture Glance" aus.

 <robo-wiki-picture src="home-assistant/glance.jpg" />

Fülle die Daten aus:
- Title - wähle einen Titel für das Kamerabild
- Camera Entity - wähle eine Kamera-Entität aus der Dropdown-Liste
- Camera View - wähle "live", um weniger Verzögerung zu erhalten

Wechsle dann in den "Code-Editor"-Modus, indem du den Button unten links drückst. Du wirst den folgenden Code sehen:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Ersetze den Inhalt von `entities: []` gemäß dem folgenden Beispiel (`<DEINE_KAMERA_ENTITÄT>` entspricht dem `camera_image`-Parameter):

<code-helper copy>

```
entities:
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Left
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Up
    icon: 'mdi:arrow-up'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Down
    icon: 'mdi:arrow-down'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Right
    icon: 'mdi:arrow-right'
    show_icon: true
```

</code-helper>

Das ist alles. Jetzt solltest du die PTZ-Kamerakarte auf dem Dashboard zusammen mit den Steuerungstasten sehen..

## Fehlerbehebung
Wenn Sie Home Assistant Core verwenden und keinen Stream von der Kamera sehen, sollten Sie die Integrationen "stream" und "FFMPEG" installieren. 
Um dies zu tun, solltest du die Zeichenfolgen `stream: ` und `ffmpeg: ` am Ende der configuration.yaml hinzufügen.