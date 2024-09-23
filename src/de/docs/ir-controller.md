---
title: IR-Fernbedienung
contributors: [nakata5321]
---
Dieser Artikel zeigt Ihnen den Prozess zum Einrichten der IR-Fernbedienung.

{% roboWikiNote {type: "warning"}%} Alle Geräte von Robonomics können auf der offiziellen [Website](https://robonomics.network/devices/) erworben werden. {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmUpSdy3oQbU7dx59sE3MMdL1kr6E2TKsPA5kmFeKHTgF4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Schritt 1 — Flashen {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Alle Geräte von Robonomics werden bereits vorgeflasht geliefert. Da es sich jedoch bei allen Geräten um Entwicklungs-Kits handelt, werden die Anweisungen die Option des Flashens des Geräts von Grund auf abdecken. Wenn Sie dies jetzt nicht tun möchten, fahren Sie mit [**Schritt 2 - Access Point**](/docs/ir-controller/#step2) fort. {% endroboWikiNote %}

Nehmen Sie das Gerät aus der Verpackung und schließen Sie es an den Computer an. Gehen Sie dann zur Website [webflasher.robonomics.network](https://webflasher.robonomics.network/). Dies ist der Web-Flasher.

{% roboWikiVideo {videos:[{src: 'QmT6CDmmF8yahM1WTCwmAZBcrYUh6xxXpmvuboiYe42rEQ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Hinweis! Der Web-Flasher funktioniert nur mit dem Google Chrome- oder Microsoft Edge-Browser. {% endroboWikiNote %}

Wählen Sie im Dropdown-Menü "Firmware" die Option **"IR REMOTE"** und wählen Sie dann im Dropdown-Menü "SELECT CHIP" **"ESP32"** aus. Drücken Sie die Schaltfläche **"CONNECT"**.
Ein Popup-Fenster wird angezeigt, in dem Sie den seriellen Anschluss auswählen müssen, an den das Gerät angeschlossen ist (normalerweise ist es `/ttyUSB0`). Wählen Sie dann **"INSTALL IR-REMOTE_DE"**.
Im nächsten Fenster können Sie eine **KLARE INSTALLATION** durchführen, indem Sie **ERASE DEVICE** auswählen. Drücken Sie auf Weiter und dann auf Installieren. Warten Sie, bis die Firmware auf den IR-Controller hochgeladen ist.

Nach Abschluss des Installationsprozesses wird ein Popup-Fenster zur Wi-Fi-Konfiguration angezeigt. Dort haben Sie folgende Optionen:

1) Sie können Wi-Fi-Anmeldeinformationen angeben, **Schritt 2 - Access Point** überspringen und zu [**Schritt 3 - Konfiguration**](/docs/ir-controller/#step3) gehen.

{% roboWikiVideo {videos:[{src: 'QmVbCvncuEZFVDpxnpD3VyE4LCx8TN6xKCVs4MkrJGhGDx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Nachdem Sie Wi-Fi eingerichtet haben, können Sie das Gerät über die Schaltfläche **VISIT DEVICE** besuchen. Später können Sie das Gerät über seine IP-Adresse im Netzwerk besuchen. Um diese zu finden, können Sie die [Fing Mobile App](https://www.fing.com/products) oder das
[nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden.

2) Oder trennen Sie das Gerät vom Computer und schließen Sie es an die Stromversorgung an. Die IR-Fernbedienung wird gestartet und ein Wi-Fi-Hotspot erstellt. Um die IR-Fernbedienung über den Hotspot mit Ihrem Heim-WLAN zu verbinden, befolgen Sie die Anweisungen in Schritt 2.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Schritt 2 — Access Point {% endroboWikiTitle %}

Wenn Sie die IR-Fernbedienung aus der Verpackung nehmen und an die Stromversorgung anschließen, wird ein Hotspot mit dem Namen "tasmota-XXXXXXX" erstellt. Verbinden Sie sich damit. Ein Konfigurationsfenster sollte sich öffnen. Falls nicht, öffnen Sie einen Webbrowser und gehen Sie zur Seite `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Geben Sie die Wi-Fi-Anmeldeinformationen ein. Danach wird die IR-Fernbedienung mit dem Wi-Fi-Netzwerk verbunden. Überprüfen Sie das Gerät über seine IP-Adresse im Netzwerk. Um diese zu finden, können Sie die [Fing Mobile App](https://www.fing.com/products) oder das
[nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden.

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Schritt 3 — Konfiguration {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Gehen Sie zu **"Konfiguration"**->**"Andere konfigurieren"**. Fügen Sie im Feld **"Vorlage"** Folgendes ein:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics IR-Fernbedienung","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Vergewissern Sie sich, dass das Kontrollkästchen **"Aktivieren"** und **"MQTT aktivieren"** aktiviert ist. Wenn nicht, aktivieren Sie es und drücken Sie die Schaltfläche Speichern.

Gehen Sie zurück zum **"Hauptmenü"** und gehen Sie zu **"Konfiguration"** -> **"MQTT konfigurieren"**.
Geben Sie hier Ihre MQTT-Anmeldeinformationen ein:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

Das war es vorerst mit ESP. Der nächste Schritt besteht darin, die Home Assistant-Integration zu installieren.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Schritt 4 — Integration einrichten {% endroboWikiTitle %}

In diesem Artikel wird davon ausgegangen, dass Sie Home Assistant und HACS haben. Gehen Sie zu HACS und fügen Sie ein benutzerdefiniertes Repository hinzu.

{% roboWikiVideo {videos:[{src: 'QmSqvGpq5q9tHUsi45VkycQamR2o2hoDcyAgiz2dp279eF', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Drücken Sie dazu die drei Punkte in der oberen rechten Ecke, wählen Sie **BENUTZERDEFINIERTE REPOSITORIES**
und fügen Sie diese URL ein: `https://github.com/hristo-atanasov/Tasmota-IRHVAC`. Wählen Sie in der Kategorie "Integration". Finden Sie es dann in der Suche und installieren Sie es. Vergessen Sie nicht, Home Assistant danach neu zu starten.

Öffnen Sie die Protokolle der IR-Fernbedienung. Gehen Sie dazu zur entsprechenden lokalen URL oder öffnen Sie erneut [webflasher.robonomics.network](https://webflasher.robonomics.network/) und wählen Sie "Tasmota IR" und "ESP32". Drücken Sie "Verbinden" und wählen Sie den Port aus.
Drücken Sie **VISIT DEVICE**, und Sie sehen die Hauptseite des Geräts. Gehen Sie zu "Konsolen" -> "Konsole".

Richten Sie Ihre IR-Fernbedienung (z. B. von einer Klimaanlage) auf die Robonomics IR-Fernbedienung und drücken Sie die Tasten auf der Fernbedienung. Sie erhalten folgendes Protokoll in der Konsole:
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Protocol":"MITSUBISHI112","Bits":112,"Data":"0x23CB260100A003060D00000000CB","Repeat":0,"IRHVAC":{"Vendor":"MITSUBISHI112","Model":-1,"Mode":"Cool","Power":"Off","Celsius":"On","Temp":25,"FanSpeed":"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":"Off","Filter":"Off","Clean":"Off","Beep":"Off","Sleep":-1}}}
```
Sie benötigen Informationen zum Thema `IRHVAC`.

Öffnen Sie die `configuration.yaml`-Datei Ihrer Home Assistant-Instanz und fügen Sie Folgendes ein:

{% codeHelper { copy: true}%}

```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Ein beliebiger Name hier>"
    command_topic: "cmnd/<Ihr_tasmota_Gerät>/irhvac"
    # Wählen Sie eine der folgenden Optionen:
    # Der Status wird aktualisiert, wenn das Tasmota-Gerät ein IR-Signal empfängt (einschließlich eigener Übertragung und Originalfernbedienung)
    # nützlich, wenn eine normale Fernbedienung neben dem Tasmota-Gerät verwendet wird, möglicherweise weniger zuverlässig als die zweite Option.
    state_topic: "tele/<Ihr_tasmota_Gerät>/RESULT"
    # Der Status wird aktualisiert, wenn das Tasmota-Gerät die IR-Übertragung abschließt, sollte ziemlich zuverlässig sein.
    #state_topic: "stat/<Ihr_tasmota_Gerät>/ERGEBNIS"
    # Kommentieren Sie dies aus, wenn Ihr 'verfügbares Thema' des Tasmota-IR-Geräts unterschiedlich ist (wenn das Gerät in HA deaktiviert ist)
    #availability_topic: "tele/<Ihr_tasmota_gerät>/LWT"
    temperature_sensor: <Temperatursensor im Raum> - # erforderlich, um die Temperatur in einem Raum zu messen. z.B. sensor.kitchen_temperature
    humidity_sensor: None #optional - Standard None (z.B. sensor.kitchen_humidity)
    power_sensor: None #optional - Standard None (z.B. binary_sensor.kitchen_ac_power)
    vendor: "<Ihr Lieferant hier>" #finden Sie Ihren Lieferanten in den Protokollen.
    min_temp: 16 #optional - Standard 16 Ganzzahlwert
    max_temp: 32 #optional - Standard 32 Ganzzahlwert
    target_temp: 26 #optional - Standard 26 Ganzzahlwert
    initial_operation_mode: "off" # optional - Standard "off" Zeichenfolgenwert (einer der "supported_modes")
    away_temp: 24 #optional - Standard 24 Ganzzahlwert
    precision: 1 #optional - Standard 1 Ganzzahl- oder Fließkommawert. Kann auf 1, 0,5 oder 0,1 eingestellt werden
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only" # Verwenden Sie "fan_only", auch wenn Tasmota "Mode":"Fan" anzeigt
      - "auto"
      - "off" #Schaltet die Klimaanlage aus - sollte in Anführungszeichen stehen
      # Einige Geräte haben "auto" und "fan_only" vertauscht
      # Wenn die folgenden zwei Zeilen auskommentiert sind, sollten "auto" und "fan" auskommentiert sein
      #- "auto_fan_only" #wenn die Fernbedienung Fan anzeigt, aber Tasmota sagt Auto
      #- "fan_only_auto" #wenn die Fernbedienung Auto anzeigt, aber Tasmota sagt Fan
    supported_fan_speeds:
      # Einige Geräte sagen max, aber es ist hoch, und auto ist max
      # Wenn Sie die folgenden beiden Zeilen auskommentieren, müssen Sie high und max auskommentieren
      # - "auto_max" #würde zu max werden
      # - "max_high" #würde zu hoch werden
      #- "on"
      #- "off"
      #- "low"
      - "medium"
      - "high"
      #- "middle"
      #- "focus"
      #- "diffuse"
      - "min"
      - "max"
      #- "auto"
    supported_swing_list:
      - "off"
      - "vertical" #von oben nach unten
      # - "horizontal" # Von links nach rechts
      # - "both"
    default_quiet_mode: "Off" #optional - Standard "Off" Zeichenfolgenwert
    default_turbo_mode: "Off" #optional - Standard "Off" Zeichenfolgenwert
    default_econo_mode: "Off" #optional - Standard "Off" Zeichenfolgenwert
    hvac_model: "-1" #optional - Standard "1" Zeichenfolgenwert
    celsius_mode: "On" #optional - Standard "On" Zeichenfolgenwert
    default_light_mode: "Off" #optional - Standard "Off" Zeichenfolgenwert
    default_filter_mode: "Off" #optional - Standard "Off" Zeichenfolgenwert
    default_clean_mode: "Off" #optional - Standard "Off" Zeichenfolgenwert
    default_beep_mode: "Off" #optional - Standard "Off" Zeichenfolgenwert
    default_sleep_mode: "-1" #optional - Standard "-1" Zeichenfolgenwert
    default_swingv: "high" #optional - Standard "" Zeichenfolgenwert
    default_swingh: "left" #optional - Standard "" Zeichenfolgenwert
    keep_mode_when_off: True #optional - Standard False boolescher Wert: Muss für MITSUBISHI_AC, ECOCLIM usw. True sein
    toggle_list: #optional - Standard []
      # Die umgeschaltete Eigenschaft ist eine Einstellung, die den Ein-Zustand nicht beibehält.
      # Setzen Sie dies, wenn Ihre Klimaanlagen-Eigenschaften eine Umschaltfunktion haben.
      #- Beep
      #- Clean
      #- Econo
      #- Filter
      #- Light
      #- Quiet
      #- Sleep
      #- SwingH
      #- SwingV
      #- Turbo
```

{% endcodeHelper %}

Ändern Sie alle erforderlichen Aussagen im eingefügten Teil mit Werten aus der Konsolennachricht. Als Ergebnis sollte ein Teil Ihrer Konfigurationsdatei ähnlich aussehen wie in diesem Beispiel
(im Beispiel wurde eine nicht verwendete Aussage gelöscht):
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "Bangkok Klimasteuerung"
    unique_id : "Bangkok Testklima"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #optional - Standard 16 Ganzzahlwert
    max_temp: 31 #optional - Standard 32 Ganzzahlwert
    target_temp: 25 #optional - Standard 26 Ganzzahlwert
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # Verwenden Sie "fan_only", auch wenn Tasmota "Mode":"Fan" anzeigt
      - "auto"
      - "off" #Schaltet die Klimaanlage aus - sollte in Anführungszeichen stehen
      # Einige Geräte haben "auto" und "fan_only" vertauscht
      # Wenn die folgenden zwei Zeilen auskommentiert sind, sollten "auto" und "fan" auskommentiert sein
      #- "auto_fan_only" #wenn die Fernbedienung Fan anzeigt, aber Tasmota sagt Auto
      #- "fan_only_auto" #wenn die Fernbedienung Auto anzeigt, aber Tasmota sagt Fan
    supported_fan_speeds:
      # Einige Geräte sagen max, aber es ist hoch, und auto ist max
      # Wenn Sie die folgenden beiden Zeilen auskommentieren, müssen Sie high und max auskommentieren
      # - "auto_max" #würde zu max werden
      # - "max_high" #würde zu hoch werden
      - "low"
      - "medium"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #von oben nach unten

    hvac_model: "-1" #optional - Standard "1" Zeichenfolgenwert

    keep_mode_when_off: True #optional - Standard False boolescher Wert: Muss für MITSUBISHI_AC, ECOCLIM usw. True sein

```

Speichern Sie `configuration.yaml` und starten Sie Home Assistant neu.
Nach dem Neustart können Sie in der Benutzeroberfläche eine neue Thermostatkarte hinzufügen und das neu integrierte Gerät auswählen.

{% roboWikiPicture {src:"docs/ir-controller/thermo.jpg", alt:"thermo"} %}{% endroboWikiPicture %}

Wenn Sie Probleme mit dem GUI-Modus haben, wechseln Sie zum "CODE-EDITOR" und schreiben Sie Folgendes:
```
type: thermostat
entity: climate.<Ihr Klimaname>
```

{% roboWikiNote { type: "warning"}%} Alle Geräte von Robonomics können auf der offiziellen [Website](https://robonomics.network/devices/) erworben werden. {% endroboWikiNote %}