---
title: Wie man den SDS011 Sensor anschließt

contributors: [tubleronchik]
---

**Hier ist eine schrittweise Anleitung, wie Sie Ihren Sensor mit dem Robonomics Sensors Network und Home Assistant verbinden können. Unsere Sensoren verwenden die Robonomics-Firmware, die eine verbesserte Version der sensor.community-Firmware ist. Sie enthält zusätzliche Sensoren und verfügt über einen modifizierten Datenübertragungsmechanismus.**

{% roboWikiNote {type: "warning"}%} Alle Geräte von Robonomics können auf der offiziellen [Website](https://robonomics.network/devices/) erworben werden.
{% endroboWikiNote %}


## Einrichtung

1. Stecken Sie den Sensor in die Steckdose, um ihn mit Strom zu versorgen.
2. Das Board erstellt ein Wi-Fi-Netzwerk mit dem Namen `RobonomicsSensor-xxxxxxxxx`. Verbinden Sie sich von Ihrem Telefon oder Computer damit: Sie sehen das Autorisierungsfenster (falls nicht, öffnen Sie den Browser und gehen Sie zu `192.168.4.1`).
3. Wählen Sie Ihr Wi-Fi-Netzwerk aus der Liste aus (oder geben Sie es selbst ein, wenn es nicht auf der Liste steht) und füllen Sie das Passwortfeld aus.
{% roboWikiNote {type: "warning", title: "INFO"}%} Der Sensor kann nur mit einem 2,4-GHz-Wi-Fi-Netzwerk verbunden werden. {% endroboWikiNote %}
{% roboWikiPicture {src:"docs/sds-sensor-wifi.png", alt:"sds-sensor-wifi"} %}{% endroboWikiPicture %}
4. Schreiben Sie die Koordinaten des Ortes, an dem der Sensor installiert wird. Sie können sie von beliebigen Karten erhalten oder sie von der Adresse unter Verwendung dieses [Links](https://www.latlong.net/convert-address-to-lat-long.html) erhalten.
{% roboWikiNote {type: "warning", title: "WARNING"}%} Die Sensor-Koordinaten werden dann auf einer öffentlich zugänglichen Karte angezeigt. Wenn Sie Ihre privaten Informationen nicht anzeigen möchten, schreiben Sie nahe, aber nicht exakte Koordinaten.
{% endroboWikiNote %}
5. Klicken Sie auf `Konfiguration speichern und neu starten`. Das Board wird neu starten und sich mit dem angegebenen Wi-Fi-Netzwerk verbinden.
6. Öffnen Sie die [Robonomics Sensors Map](https://sensors.robonomics.network/#/) und finden Sie Ihren Standort, an dem Sie den Sensor installiert haben. In ein paar Minuten können Sie Ihren Sensor mit Daten auf der Karte sehen.
{% roboWikiPicture {src:"docs/sds-sensor-map.png", alt:"sds-sensor-map"} %}```de
ensor-map"} %}{% endroboWikiPicture %}

## Home Assistant

Es gibt zwei Installationsmöglichkeiten:

### Option 1: HACS

Der einfachste Weg, einen Local Luftdaten Sensor hinzuzufügen, ist über HACS. [Hier](https://hacs.xyz/docs/setup/download/) finden Sie eine kurze Erklärung, wie Sie HACS einrichten können.

Sobald HACS installiert ist, navigieren Sie zu HACS -> Integrations und suchen nach der `Local Luftdaten Sensor` Integration. Klicken Sie auf die Download-Schaltfläche und starten Sie Home Assistant neu, sobald die Integration heruntergeladen wurde.
{% roboWikiPicture {src:"docs/sds-hacs.png", alt:"sds-hacs"} %}{% endroboWikiPicture %}

### Option 2: Manuelle Installation

Unter dem Benutzer `homeassistant` klonen Sie das Projekt-Repository:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
```

{% endcodeHelper %}

</code-helper>

Wenn Sie bereits benutzerdefinierte Integrationen haben, kopieren Sie den `custom_components/local_luftdaten/` in Ihr `custom_components` Verzeichnis. Zum Beispiel:

{% codeHelper { copy: true}%}

```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

Wenn Sie keine benutzerdefinierten Integrationen haben, kopieren Sie das gesamte `custom_components` Verzeichnis in Ihr Home Assistant Konfigurationsverzeichnis. Zum Beispiel:

{% codeHelper { copy: true}%}

 ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Konfiguration

Erstellen Sie einen neuen Sensoreintrag in Ihrer `configuration.yaml` und passen Sie den Hostnamen oder die IP-Adresse an. Um die lokale IP-Adresse Ihres Sensors zu finden, können Sie die [Fing Mobile App](https://www.fing.com/products) oder das [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden. Der Name kann beliebig sein.

|Parameter              |Typ     | Notwendigkeit | Beschreibung
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | erforderlich  | IP-Adresse des Sensors
|`scan_interval`        | number | Standard: 180 | Häufigkeit (in Sekunden) zwischen Aktualisierungen
|`name`                 | string | erforderlich    | Name des Sensors
|`monitored_conditions` | Liste   | erforderlich     | Liste der überwachten Sensoren


{% codeHelper { copy: true}%}


  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Luftqualitätssensor
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_Temperatur
        - HTU21D_Feuchtigkeit
        - Signal
  ```

{% endcodeHelper %}

> Eine Liste aller unterstützten Sensoren finden Sie im [Repository](https://github.com/lichtteil/local_luftdaten).

Starten Sie Ihr Home Assistant neu.
Danach können Sie einen Sensor zu Ihrem Dashboard hinzufügen. Der Name der Entität wird der Name sein, den Sie zu `configuration.yaml` hinzugefügt haben.

{% roboWikiPicture {src:"docs/sds-configuration-card.png", alt:"sds-configuration-car"} %}{% endroboWikiPicture %}