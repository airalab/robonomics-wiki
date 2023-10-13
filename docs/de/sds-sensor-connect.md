---
title: Wie man den SDS011 Sensor anschließt

contributors: [tubleronchik]
---

** Hier ist eine Schritt-für-Schritt-Anleitung, wie Sie Ihren Sensor mit dem Robonomics Sensors Network verbinden können. Unsere Sensoren verwenden die Robonomics-Firmware, die eine verbesserte Version der sensor.community-Firmware ist. Sie enthält zusätzliche Sensoren und hat einen modifizierten Datenübertragungsmechanismus. **

1. Stecken Sie den Sensor in die Steckdose, um ihn mit Strom zu versorgen.
2. Das Board erstellt ein Wi-Fi-Netzwerk mit dem Namen `RobonomicsSensor-xxxxxxxxx`. Verbinden Sie sich von Ihrem Telefon oder Computer damit: Sie sehen das Autorisierungsfenster (falls nicht, öffnen Sie den Browser und gehen Sie zu `192.168.4.1`).
3. Wählen Sie Ihr Wi-Fi-Netzwerk aus der Liste aus (oder geben Sie es selbst ein, wenn es nicht auf der Liste steht) und füllen Sie das Passwortfeld aus.
<robo-wiki-note type="okay" title="INFO">
Der Sensor kann nur mit einem 2,4-GHz-WLAN-Netzwerk verbunden werden.
</robo-wiki-note> 
<robo-wiki-picture src="sds-sensor-wifi.png"/>
4. Geben Sie die Koordinaten des Ortes ein, an dem der Sensor installiert wird. Sie können sie von beliebigen Karten erhalten oder sie über die Adresse mit [diesem Link](https://www.latlong.net/convert-address-to-lat-long.html) erhalten.
<robo-wiki-note type="warning" title="WARNING">
Die Sensor-Koordinaten werden dann auf einer öffentlich verfügbaren Karte angezeigt. Wenn Sie Ihre privaten Informationen nicht anzeigen möchten, geben Sie eine nahe, aber nicht genaue Koordinate ein.
</robo-wiki-note> 
5. Klicken Sie auf `Save configuration and restart`. Das Board wird neu starten und sich mit dem angegebenen Wi-Fi-Netzwerk verbinden.
6. Öffnen Sie [Robonomics Sensors Map](https://sensors.robonomics.network/#/) und finden Sie Ihren Installationsort des Sensors. In ein paar Minuten können Sie Ihren Sensor mit Daten auf der Karte sehen.
<robo-wiki-picture src="sds-sensor-map.png"/>

