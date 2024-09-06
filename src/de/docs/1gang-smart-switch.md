---
title: 1 Gang Smart Switch
contributors: [nakata5321]
---
Dieser Artikel zeigt Ihnen den Prozess zur Einrichtung des 1 Gang Smart Switch.

{% roboWikiNote {type: "warning"}%}Alle Geräte von Robonomics können auf der offiziellen [Website](https://robonomics.network/devices/) erworben werden.{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTWhDu1PdQgR1ZuLuGpEtYG8uMm8eiWLziK1zLupQwU2i', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Schritt 1 — Flashen {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%}Alle Geräte von Robonomics werden bereits vorgeflasht geliefert. Da es sich jedoch um Entwicklungs-Kits handelt, werden die Anweisungen die Option des Flashens des Geräts von Grund auf abdecken. Wenn Sie dies jetzt nicht tun möchten, fahren Sie mit [**Schritt 2 - Zugriffspunkt**](/docs/ir-controller/#step2) fort.
{% endroboWikiNote %}

Nehmen Sie das Gerät aus der Verpackung und schließen Sie es an den Computer an. Gehen Sie dann zur Website [webflasher.robonomics.network](https://webflasher.robonomics.network/). Dies ist der Web-Flasher.

{% roboWikiVideo {videos:[{src: 'QmVWmGSnvGwQ3dQfZC8iM5KHBoGpaWVXXUjNuNesULQrGw', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Hinweis! Der Web-Flasher funktioniert nur mit dem Google Chrome- oder Microsoft Edge-Browser.{% endroboWikiNote %}

Wählen Sie im Dropdown-Menü "Firmware" die Option **"SWS-1G-E-11-23"** und wählen Sie dann im Dropdown-Menü "SELECT CHIP" **"ESP32"** aus. Drücken Sie die Schaltfläche **"CONNECT"**.
Ein Popup-Fenster wird angezeigt, in dem Sie den seriellen Anschluss auswählen müssen, an den das Gerät angeschlossen ist (normalerweise ist es `/ttyUSB0`). Wählen Sie dann **"INSTALL SWS-1G-E-11-23"**.
Im nächsten Fenster können Sie eine **KLARE INSTALLATION** durchführen, indem Sie **ERASE DEVICE** auswählen. Drücken Sie auf Weiter und dann auf Installieren. Warten Sie, bis die Firmware auf das Smart-Switch-Gerät hochgeladen ist.

Nach Abschluss des Installationsprozesses wird ein Popup zur Wi-Fi-Konfiguration angezeigt. Geben Sie die Wi-Fi-Anmeldeinformationen ein.

Nachdem Sie Wi-Fi eingerichtet haben, können Sie über die Schaltfläche **"VISIT DEVICE"** auf das Gerät zugreifen. Später können Sie das Gerät über seine IP-Adresse im Netzwerk besuchen. Um diese zu finden, können Sie die [Fing Mobile App](https://www.fing.com/products) oder das [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden.

Überspringen Sie **Schritt 2 — Zugriffspunkt** und gehen Sie zu [**Schritt 3 — Konfiguration**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Schritt 2 — Zugriffspunkt {% endroboWikiTitle %}

Wenn Sie den Smart Switch aus der Verpackung nehmen und an die Stromversorgung anschließen, wird er einen Hotspot mit dem Namen "robonomics-XXXXXXX" erstellen. Verbinden Sie sich damit.
Ein Konfigurationsfenster sollte sich öffnen. Falls nicht, öffnen Sie einen Webbrowser und gehen Sie zur Seite `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"Bild"} %}{% endroboWikiPicture %}

Geben Sie die Wi-Fi-Anmeldeinformationen ein. Danach wird das Smart-Switch-Gerät mit dem Wi-Fi-Netzwerk verbunden. Überprüfen Sie das Gerät über seine IP-Adresse im Netzwerk. Um diese zu finden, können Sie die [Fing Mobile App](https://www.fing.com/products) oder das [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden.

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Schritt 3 — Konfiguration {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

Gehen Sie zu **"Konfiguration"** -> **"Andere konfigurieren"**. Fügen Sie im Feld **"Vorlage"** Folgendes ein:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-1L-Switch","GPIO":[1,1,1,1,1,1,1,1,1,576,1,1,1,1,3200,5440,0,1,224,1,0,0,320,1,0,0,0,0,1,1,1,32,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Stellen Sie sicher, dass die Kontrollkästchen **"Aktivieren"** und **"MQTT aktivieren"** aktiviert sind. Wenn nicht, aktivieren Sie sie und drücken Sie die Schaltfläche Speichern.

Gehen Sie zurück zum Hauptmenü und gehen Sie zu **"Konfiguration"** -> **"MQTT konfigurieren"**.
Geben Sie hier Ihre MQTT-Anmeldeinformationen ein:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"Bild"} %}{% endroboWikiPicture %}

Das war es vorerst mit ESP. Der nächste Schritt ist die Installation der Home Assistant-Integration.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Schritt 4 — Integration einrichten {% endroboWikiTitle %}

In diesem Artikel wird davon ausgegangen, dass Sie Home Assistant haben. Um das Smart Switch-Gerät mit Home Assistant zu verbinden, müssen Sie die Tasmota-Integration installieren.

{% roboWikiVideo {videos:[{src: 'QmQw6aA5e7UqT1hZrAV8m1UPq1rWCgLsWcVufuxitQm84p', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Grundsätzlich wird Home Assistant die Tasmota-Integration automatisch erkennen. Falls nicht, fügen Sie sie manuell hinzu.
Das war es. Jetzt können Sie die Schalter-Entität zum Dashboard hinzufügen.

{% roboWikiNote {type: "warning"}%}Alle Geräte von Robonomics können auf der offiziellen [Website](https://robonomics.network/devices/) erworben werden.{% endroboWikiNote %}