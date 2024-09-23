---
title: Energieüberwachung
contributors: [nakata5321]
---
Dieser Artikel zeigt Ihnen den Prozess zur Einrichtung der Energieüberwachung.

{% roboWikiNote {type: "warning"}%} Alle Geräte von Robonomics können auf der offiziellen [Website](https://robonomics.network/devices/) erworben werden.
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Schritt 1 — Flashen {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Alle Geräte von Robonomics werden bereits vorgeflasht geliefert. Da es sich jedoch um Entwicklungs-Kits handelt, werden die Anweisungen die Option des Flashens des Geräts von Grund auf abdecken. Wenn Sie dies jetzt nicht tun möchten, fahren Sie mit [**Schritt 2 - Zugriffspunkt**](/docs/ir-controller/#step2) fort.
{% endroboWikiNote %}

Nehmen Sie das Gerät aus der Verpackung und schließen Sie es an den Computer an. Gehen Sie dann zur Website [webflasher.robonomics.network](https://webflasher.robonomics.network/). Dies ist der Web-Flasher.

{% roboWikiVideo {videos:[{src: 'QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Hinweis! Der Web-Flasher funktioniert nur mit dem Google Chrome- oder Microsoft Edge-Browser.
{% endroboWikiNote %}

Wählen Sie im Dropdown-Menü "Firmware" die Option **"ENERGY MONITOR"** und wählen Sie dann im Dropdown-Menü "SELECT CHIP" **"ESP32-S3"** aus. Drücken Sie die Schaltfläche **"CONNECT"**.
Ein Popup-Fenster wird angezeigt, in dem Sie den seriellen Anschluss auswählen müssen, an den das Gerät angeschlossen ist (normalerweise ist es `/ttyUSB0`). Wählen Sie dann **"INSTALL ENERGY-MONITOR_EN"**.
Im nächsten Fenster können Sie eine **KLARE INSTALLATION** durchführen, indem Sie **ERASE DEVICE** auswählen. Drücken Sie dann auf Weiter und dann auf Installieren. Warten Sie, bis die Firmware auf das Energieüberwachungsgerät hochgeladen ist.

Nach Abschluss des Installationsprozesses wird ein Wi-Fi-Konfigurations-Popup angezeigt. Geben Sie die Wi-Fi-Anmeldeinformationen ein.

Nachdem Sie Wi-Fi eingerichtet haben, können Sie das Gerät über die Schaltfläche **VISIT DEVICE** besuchen. Später können Sie das Gerät über seine IP-Adresse im Netzwerk besuchen. Um diese zu finden, können Sie die [Fing Mobile App](https://www.fing.com/products) oder das [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden.

Überspringen Sie **Schritt 2 — Zugriffspunkt** und gehen Sie zu [**Schritt 3 — Konfiguration**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Schritt 2 — Zugriffspunkt {% endroboWikiTitle %}

Wenn Sie den Energie-Monitor aus der Verpackung nehmen und an die Stromversorgung anschließen, wird ein Hotspot mit dem Namen "robonomics-XXXXXXX" erstellt. Verbinden Sie sich damit. Ein Konfigurationsfenster sollte sich öffnen. Wenn nicht, öffnen Sie einen Webbrowser und gehen Sie zur Seite `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Geben Sie die Wi-Fi-Anmeldeinformationen ein. Danach wird das Energieüberwachungsgerät mit dem Wi-Fi-Netzwerk verbunden. Überprüfen Sie das Gerät über seine IP-Adresse im Netzwerk. Um diese zu finden, können Sie die [Fing Mobile App](https://www.fing.com/products) oder das [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden.

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Schritt 3 — Konfiguration {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Gehen Sie zu **"Konfiguration"** -> **"Andere konfigurieren"**. Fügen Sie im Feld **"Vorlage"** Folgendes ein:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```

{% endcodeHelper %}

Vergewissern Sie sich, dass die Kontrollkästchen **"Aktivieren"** und **"MQTT aktivieren"** aktiviert sind. Wenn nicht, aktivieren Sie sie und drücken Sie die Schaltfläche Speichern.

Gehen Sie zurück zum "Hauptmenü" und gehen Sie zu **"Konfiguration"** -> **"MQTT konfigurieren"**.
Geben Sie hier Ihre MQTT-Anmeldeinformationen ein:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

Das war es vorerst mit ESP. Der nächste Schritt ist die Installation der Home Assistant-Integration.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Schritt 4 — Integration einrichten {% endroboWikiTitle %}

In diesem Artikel wird davon ausgegangen, dass Sie Home Assistant haben. Um das Energieüberwachungsgerät mit Home Assistant zu verbinden, müssen Sie die "Tasmota"-Integration installieren.

{% roboWikiVideo {videos:[{src: 'QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Grundsätzlich wird Home Assistant die "Tasmota"-Integration automatisch erkennen. Wenn nicht, fügen Sie sie manuell hinzu.

{% roboWikiPicture {src:"docs/energymeter/HA.jpg", alt:"energymeter-ha"} %}{% endroboWikiPicture %}

Das war es. Jetzt können Sie Energie-Entitäten zum Dashboard hinzufügen.

{% roboWikiNote {type: "warning"}%} Alle Geräte von Robonomics können auf der offiziellen [Website](https://robonomics.network/devices/) erworben werden.
{% endroboWikiNote %}