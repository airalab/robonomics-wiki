---
title: Robonomics Video Service
contributors: [nakata5321]
---

Dieser Artikel zeigt, wie Sie eine IP-Kamera zu Home Assistant hinzufügen und Videos an den Robonomics Web Service senden können.

Um eine Kamera mit Home Assistant zu verbinden, müssen Sie ihre IP-Adresse kennen und ein lokales Kamerakonto erstellen, um den RTSP-Stream zu verbinden.

<robo-wiki-note type="warning">
Da dies für jede Kamera unterschiedlich erfolgt, wird dieser Prozess in diesem Artikel nicht behandelt.
</robo-wiki-note>

Anforderungen:
- IP-Kamera
- Konfiguriertes lokales Kamerakonto
- IP-Adresse der Kamera
- Konfiguriertes Home Assistant

<robo-wiki-note type="note">

Dieser Artikel geht davon aus, dass Sie eine allgemeine IP-Kamera ohne RTZ (Drehen, Neigen, Zoomen) Optionen haben. 
Wenn Sie eine RTZ-Kamera haben, überprüfen Sie den ["RTZ-Kamera"-Artikel](/docs/ptz-camera). Und dann kommen Sie zurück zum zweiten Schritt hier.

</robo-wiki-note>

## Verbinden Sie die Kamera

Zunächst müssen Sie die URL für den RTSP-Stream der Kamera herausfinden. 
Geben Sie dazu den folgenden Befehl im Internet ein: "<KAMERA_NAME> RTSP-Stream".
Die Stream-URL muss mit `rtsp://<IP_Adresse>...` beginnen. 

In diesem Artikel wird eine "Tapo"-Kamera verwendet und der Stream-Pfad lautet `rtsp://<IP_Adresse>/stream1`.

Öffnen Sie Home Assistant und gehen Sie zu  "Settings"-> "Devices & Services".. Drücken Sie die Schaltfläche "ADD INTEGRATION" und
beginnen Sie mit der Eingabe der Integration "Generic Camera". Wählen Sie sie aus.

 <robo-wiki-picture src="home-assistant/generic.jpg" />

Geben Sie im Konfigurationsfenster die folgenden Informationen ein:
- Stream Source URL - Die URL des RTSP-Streams der Kamera
- Username - geben Sie einen Benutzernamen für Ihr lokales Kamerakonto ein
- Password - geben Sie ein Passwort für Ihr lokales Kamerakonto ein

<robo-wiki-picture src="home-assistant/genericconf.jpg" />

Scrollen Sie nach unten zu den Einstellungen und drücken Sie die Schaltfläche "Submit".

Aktivieren Sie im Vorschaufenster das Kontrollkästchen "This image looks good." und drücken Sie die Schaltfläche "Submit". Dann - "Finish".

<robo-wiki-picture src="home-assistant/preview-camera.jpg" />

### Zum Dashboard hinzufügen

Darüber hinaus können Sie den Stream zu Ihrem Dashboard hinzufügen. Gehen Sie dazu zum Dashboard und erstellen Sie eine neue Karte 
"Bildübersicht". Weitere Schritte:
- geben Sie den gewünschten "Titel" ein
- löschen Sie die Daten aus "Image path"
- 2ählen Sie die Kamera in „Camera Entity“ aus.
- wählen Sie in der "Camera view" "live", damit es weniger Verzögerung gibt

Und speichern Sie es.
<robo-wiki-picture src="home-assistant/camera_picture_glance.jpg" />

## Überprüfen Sie den Medienordner

Bevor das Video an den Robonomics-Videodienst gesendet wird, muss es in einem Ordner gespeichert werden und Home Assistant muss Zugriff auf diesen Ordner haben. 
Die einfachste Option in diesem Fall ist die Verwendung eines Medienpakets, in dem Home Assistant alle Medien speichert.

- Wenn Sie HAOS oder ein vorinstalliertes Image verwenden, hat Ihr Home Assistant bereits einen Medienordner.
- Wenn Sie Home Assistant Core verwenden, sollten Sie zum `.homeassistant`-Ordner gehen und darin einen `media`-Ordner erstellen.
- Wenn Sie Home Assistant Docker verwenden, fügen Sie der Docker-Befehlszeile die Zeile ` -v /PFAD_ZU_IHREM_MEDIA:/media \` hinzu.

Um zu überprüfen, ob alles richtig eingerichtet ist, gehen Sie zu “Media” -> “local media”  in Ihrem Home Assistant. 
Sie sollten einen leeren Ordner sehen (keine Fehler):

<robo-wiki-picture src="home-assistant/media-folder.jpg" />

## Serviceaufruf

Um ein Video an Robonomics zu senden, sollten Sie einen dedizierten Service in Home Assistant aufrufen. 
In diesem Artikel wird dies manuell gemacht, aber Sie können dafür eine Automatisierung erstellen.

Gehen Sie dazu zu "Developer tools" -> "Services" und suchen Sie "Robonomics: Save recording to Robonomics ".

<robo-wiki-picture src="home-assistant/robonomics-service.jpg" />

Wählen Sie in "Targets" Ihre Kamera-Entität aus.
Geben Sie in "Path to save the recording" einen absoluten Pfad zum Ordner an,
in dem Home Assistant das Video speichern kann:
- Für vorinstalliertes Image - `/home/homeassistant/.homeassistant/media`;
- Für HA OS oder Home Assistant Docker- `/media`;
- Für Home Assistant Core - Pfad zum zuvor erstellten Medienordner.

Zusätzlich können Sie die Aufnahmedauer wählen. 

Füllen Sie die Daten aus und rufen Sie den Service mit der Schaltfläche "CALL SERVICE" auf.

## DAPP

Um das resultierende Video anzuzeigen, gehen Sie zu [Robonomics DAPP](https://vol4tim.github.io/videostream/).

<robo-wiki-picture src="home-assistant/video-dapp.jpg" />

Fügen Sie die Kontoadresse Ihres Controllers ein und klicken Sie auf die Schaltfläche unten. Warten Sie auf den "Search for Twins"-Prozess. 
Als Ergebnis erhalten Sie eine IPFS CID mit allen aufgezeichneten Videos.

<robo-wiki-picture src="home-assistant/video-ipfs.jpg" />

Wählen Sie anschließend das Controller-Konto (oder ein anderes) aus der Dropdown-Liste aus und signieren Sie eine Nachricht zur Autorisierung in
dem Web3 IPFS-Gateway, um alle Videos herunterzuladen. Als Ergebnis erhalten Sie alle Videos, die von Ihrem Smart Home aufgezeichnet wurden.

<robo-wiki-picture src="home-assistant/show-videos.jpg" />

Da alle Videos im Ordner mit dem Controller-Schlüssel verschlüsselt sind, müssen Sie ihn einfügen, um die Videos zu entschlüsseln.
Danach wird die Wiedergabetaste für das Video aktiviert. Klicken Sie darauf, um das Video herunterzuladen.

<robo-wiki-picture src="home-assistant/video-seed.jpg" />






