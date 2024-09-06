---
title: Robonomics Video Service
contributors: [nakata5321]
---

Dieser Artikel zeigt, wie Sie eine IP-Kamera mit Home Assistant verbinden und Videos an den Robonomics-Webdienst senden.

Um eine Kamera mit Home Assistant zu verbinden, müssen Sie die IP-Adresse kennen und ein lokales Kamerakonto erstellen, um sich mit dem RTSP-Stream zu verbinden.

{% roboWikiNote {type: "warning"}%} Da dies für jede Kamera anders durchgeführt wird, wird dieser Prozess in diesem Artikel nicht berücksichtigt.
{% endroboWikiNote %}

Anforderungen:
- IP-Kamera
- Konfiguriertes lokales Kamerakonto
- IP-Adresse der Kamera
- Konfiguriertes Home Assistant

{% roboWikiNote {type: "warning"}%} Dieser Artikel geht davon aus, dass Sie eine allgemeine IP-Kamera ohne RTZ (Drehen, Neigen, Zoomen) Optionen haben. Wenn Sie eine RTZ-Kamera haben, überprüfen Sie den Artikel ["RTZ-Kamera"](docs/ptz-camera). Und kommen Sie dann zurück zu einem zweiten Schritt hier. {% endroboWikiNote %}

## Kamera verbinden

Zuerst müssen Sie die URL für den RTSP-Stream der Kamera herausfinden.
Versuchen Sie dazu, die folgende Abfrage im Internet einzugeben: "<KAMERA_NAME> RTSP-Stream".
Die Stream-URL muss mit `rtsp://<IP-Adresse>...` beginnen.

In diesem Artikel wird eine "Tapo"-Kamera verwendet und der Stream-Pfad lautet `rtsp://<IP-Adresse>/stream1`.

Öffnen Sie Home Assistant und gehen Sie zu "Einstellungen"-> "Geräte & Dienste". Drücken Sie die Schaltfläche "INTEGRATION HINZUFÜGEN" und
beginnen Sie mit der Eingabe der Integration "Generische Kamera". Wählen Sie sie aus.

{% roboWikiPicture {src:"docs/home-assistant/generic.jpg", alt:"hass"} %}{% endroboWikiPicture %}

Geben Sie im Konfigurationsfenster die folgenden Informationen ein:
- Stream-Quell-URL - Die URL des RTSP-Streams der Kamera
- Benutzername - geben Sie den Benutzernamen Ihres lokalen Kamerakontos ein
- Passwort - geben Sie das Passwort für Ihr lokales Kamerakonto ein

{% roboWikiPicture {src:"docs/home-assistant/genericconf.jpg", alt:"genericconf"} %}{% endroboWikiPicture %}

Scrollen Sie in den Einstellungen nach unten und drücken Sie die Schaltfläche "Senden".

Aktivieren Sie im Vorschaufenster das Kontrollkästchen "Dieses Bild sieht gut aus." und drücken Sie die Schaltfläche "Senden". Dann - "Fertig".

{% roboWikiPicture {src:"docs/home-assistant/preview-camera.jpg", alt:"preview-camera"} %}{% endroboWikiPicture %}

### Zur Dashboard hinzufügen

Zusätzlich können Sie den Stream zu Ihrem Dashboard hinzufügen. Gehen Sie dazu zum Dashboard und erstellen Sie eine neue Karte "Bildübersicht". Weitere Schritte:
- Geben Sie den gewünschten "Titel" ein
- Löschen Sie die Daten aus "Bildpfad"
- Wählen Sie die Kamera im "Kamera-Entität"
- Wählen Sie im "Kamerablick" "live", damit es weniger Verzögerung gibt

Und speichern Sie es.
{% roboWikiPicture {src:"docs/home-assistant/camera_picture_glance.jpg", alt:"camera_picture_glance"} %}{% endroboWikiPicture %}


## Überprüfen des Medienordners

Bevor das Video an den Robonomics Video Service gesendet wird, muss das Video in einem Ordner gespeichert werden, auf den Home Assistant zugreifen kann.
Die einfachste Option in diesem Fall ist die Verwendung eines Medienpakets, in dem Home Assistant alle Medien speichert.

- Wenn Sie HAOS oder ein vorinstalliertes Image verwenden, hat Ihr Home Assistant bereits einen Medienordner.
- Wenn Sie Home Assistant Core verwenden, sollten Sie zum Ordner `.homeassistant` gehen und darin einen Ordner `media` erstellen.
- Wenn Sie Home Assistant Docker verwenden, fügen Sie der Docker-Befehlszeile die Zeile ` -v /PFAD_ZU_IHREM_MEDIA:/media \` hinzu.

Um zu überprüfen, ob alles richtig eingerichtet wurde, gehen Sie zum Tab "Medien" -> "lokale Medien" in Ihrem Home Assistant.
Sie sollten einen leeren Ordner sehen (keine Fehler):

{% roboWikiPicture {src:"docs/home-assistant/media-folder.jpg", alt:"media-folder"} %}{% endroboWikiPicture %}

## Service-Aufruf

Um ein Video an Robonomics zu senden, sollten Sie einen dedizierten Service in Home Assistant aufrufen.
In diesem Artikel wird dies manuell durchgeführt, aber Sie können dafür eine Automatisierung erstellen.

Gehen Sie dazu zu "Entwicklerwerkzeuge" -> "Dienste" und suchen Sie "Robonomics: Aufnahme in Robonomics speichern".

{% roboWikiPicture {src:"docs/home-assistant/robonomics-service.jpg", alt:"robonomics-service"} %}{% endroboWikiPicture %}

Wählen Sie in "Ziele" Ihre Kamera-Entität aus.
Geben Sie im Feld "Pfad zum Speichern der Aufnahme" einen absoluten Pfad zum Ordner an, in dem Home Assistant das Video speichern kann:
- Für das vorinstallierte Image - `/home/homeassistant/.homeassistant/media`;
- Für HA OS oder Home Assistant Docker - `/media``;
- Für Home Assistant Core - Pfad zum zuvor erstellten Medienordner.

Zusätzlich können Sie die Aufnahmedauer wählen.

Füllen Sie die Daten aus und rufen Sie den Service mit der Schaltfläche "SERVICE AUFRUFEN" auf.

## DAPP

Um das resultierende Video anzusehen, gehen Sie zu [Robonomics DAPP](https://vol4tim.github.io/videostream/).

{% roboWikiPicture {src:"docs/home-assistant/video-dapp.jpg", alt:"video-dapp"} %}{% endroboWikiPicture %}

Fügen Sie die Kontoadresse Ihres Controllers ein und klicken Sie auf die Schaltfläche unten. Warten Sie auf den Prozess "Nach Zwillingen suchen".
Als Ergebnis erhalten Sie eine IPFS-CID mit allen aufgezeichneten Videos.

{% roboWikiPicture {src:"docs/home-assistant/video-ipfs.jpg", alt:"video-ipfs"} %}{% endroboWikiPicture %}

Wählen Sie als Nächstes das Controller-Konto (oder ein anderes) aus der Dropdown-Liste aus und signieren Sie eine Nachricht zur Autorisierung im
Web3 IPFS-Gateway, um alle Videos herunterzuladen. Als Ergebnis erhalten Sie alle Videos, die von Ihrem Smart Home aufgezeichnet wurden.

{% roboWikiPicture {src:"docs/home-assistant/show-videos.jpg", alt:"show-videos"} %}{% endroboWikiPicture %}

Da alle Videos im Ordner mit dem Controller-Schlüssel verschlüsselt sind, müssen Sie diesen einfügen, um die Videos zu entschlüsseln.
Danach wird die Schaltfläche für die Videowiedergabe aktiviert. Klicken Sie darauf, um das Video herunterzuladen.

{% roboWikiPicture {src:"docs/home-assistant/video-seed.jpg", alt:"video-seed"} %}{% endroboWikiPicture %}

