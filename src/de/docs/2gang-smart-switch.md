---
title: 2 Gang Smart Switch
contributors: [nakata5321]
---
Dieser Artikel zeigt Ihnen den Prozess zum Einrichten des 2 Gang Smart Switch.

{% roboWikiNote {type: "warning"}%}Alle Geräte von Robonomics können auf der offiziellen [Website](https://robonomics.network/devices/) erworben werden.
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmQiq21yPEJbysPgvv35uJmG9rHQqbUSySu8za8BqA1kcZ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Schritt 1 — Flashen {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%}Alle Geräte von Robonomics werden bereits vorgeflasht geliefert. Da es sich jedoch um Entwicklerkits handelt, werden die Anweisungen die Option des Flashens des Geräts von Grund auf abdecken. Wenn Sie dies jetzt nicht tun möchten, fahren Sie mit [**Schritt 2 - Access Point**](/docs/ir-controller/#step2) fort.
{% endroboWikiNote %}

Nehmen Sie das Gerät aus der Verpackung und schließen Sie es an den Computer an. Gehen Sie dann zur Website [webflasher.robonomics.network](https://webflasher.robonomics.network/). Dies ist der Web-Flasher.

{% roboWikiVideo {videos:[{src: 'QQmZ6kYAusdjH3Yq7L9UzorZdfXAa4awD1twp5SB5z57z9R', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Hinweis! Der Web-Flasher funktioniert nur mit dem Google Chrome- oder Microsoft Edge-Browser.{% endroboWikiNote %}

Wählen Sie im Dropdown-Menü "Firmware" die Option **"SWS-2G-E-11-23"** und wählen Sie dann im Dropdown-Menü "SELECT CHIP" **"ESP32"** aus. Drücken Sie die Schaltfläche **"CONNECT"**.
Ein Popup-Fenster wird angezeigt, in dem Sie den seriellen Anschluss auswählen müssen, an den das Gerät angeschlossen ist (normalerweise ist es `/ttyUSB0`). Wählen Sie dann **"INSTALL SWS-2G-E-11-23"**.
Im nächsten Fenster können Sie eine **KLARE INSTALLATION** durchführen, indem Sie **ERASE DEVICE** auswählen. Drücken Sie auf Weiter und dann auf Installieren. Warten Sie, bis die Firmware auf das Smart-Switch-Gerät hochgeladen ist.

Nach Abschluss des Installationsprozesses wird ein Popup zur Wi-Fi-Konfiguration angezeigt. Geben Sie die Wi-Fi-Anmeldeinformationen ein.

Nachdem Sie Wi-Fi eingerichtet haben, können Sie über die Schaltfläche **VISIT DEVICE** auf das Gerät zugreifen. Später können Sie über die IP-Adresse des Geräts im Netzwerk darauf zugreifen. Um sie zu finden, können Sie die [Fing Mobile App](https://www.fing.com/products) oder das [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden.

Überspringen Sie **Schritt 2 — Access Point** und gehen Sie zu [**Schritt 3 — Konfiguration**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Schritt 2 — Access Point {% endroboWikiTitle %}

Wenn Sie den Smart Switch aus der Verpackung nehmen und an die Stromversorgung anschließen, wird er einen Hotspot mit dem Namen "robonomics-XXXXXXX" erstellen. Verbinden Sie sich damit.
Ein Konfigurationsfenster sollte sich öffnen. Wenn nicht, öffnen Sie einen Webbrowser und gehen Sie zur Seite `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"image"} %}{% endroboWikiPicture %}

Geben Sie die Wi-Fi-Anmeldeinformationen ein. Danach wird das Smart-Switch-Gerät mit dem Wi-Fi-Netzwerk verbunden. Überprüfen Sie das Gerät über seine IP-Adresse im Netzwerk. Um sie zu finden, können Sie die [Fing Mobile App](https://www.fing.com/products) oder das [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden.

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Schritt 3 — Konfiguration {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

Gehen Sie zu **"Konfiguration"** -> **"Andere konfigurieren"**. Fügen Sie im Feld **"Vorlage"** Folgendes ein:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-2L-Switch","GPIO":[1,1,1,1,1,1,1,1,1,576,1,1,1,1,3200,5440,0,224,225,0,0,320,1,321,0,0,0,0,33,1,32,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Vergewissern Sie sich, dass die Kontrollkästchen **"Aktivieren"** und **"MQTT aktivieren"** aktiviert sind. Wenn nicht, aktivieren Sie sie und drücken Sie die Schaltfläche Speichern.

Gehen Sie zurück zum Hauptmenü und gehen Sie zu **"Konfiguration"** -> **"MQTT konfigurieren"**.
Geben Sie hier Ihre MQTT-Anmeldeinformationen ein:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"image"} %}{% endroboWikiPicture %}

Das war es vorerst mit ESP. Der nächste Schritt besteht darin, die Home Assistant-Integration zu installieren.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Schritt 4 — Integration einrichten {% endroboWikiTitle %}

In diesem Artikel wird davon ausgegangen, dass Sie Home Assistant haben. Um das Smart Switch-Gerät mit Home Assistant zu verbinden, müssen Sie die Tasmota-Integration installieren.

{% roboWikiVideo {videos:[{src: 'QmXLSLSFJKrrEtQXVQbpeFAvsKFSgW15J9ZFaSH1pteMXR', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Grundsätzlich wird Home Assistant die Tasmota-Integration automatisch erkennen. Wenn nicht, fügen Sie sie manuell hinzu.
Das war es. Jetzt können Sie die Schalter-Entität zum Dashboard hinzufügen.

{% roboWikiNote {type: "warning"}%}Alle Geräte von Robonomics können auf der offiziellen [Website](https://robonomics.network/devices/) erworben werden.
{% endroboWikiNote %}