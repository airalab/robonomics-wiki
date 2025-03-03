---
title: Altruist Einrichtung
contributors: [tubleronchik]
---

**Diese Anleitung führt Sie durch die Einrichtung und Aktivierung eines Altruist Outdoor-Sensors. Sie verbinden den Sensor mit Wi-Fi, konfigurieren seinen Standort und aktivieren ein Abonnement mit XRT-Token. Zusätzlich werden Anweisungen zur Integration des Sensors in Home Assistant über HACS oder manuelle Installation bereitgestellt.**

{% roboWikiNote {type: "warning"}%} Alle Geräte von Robonomics können auf der offiziellen [Website](https://robonomics.network/devices/) erworben werden.{% endroboWikiNote %}

## Robonomics-Abonnement aktivieren

{% roboWikiNote {type: "okay"} %}Um diesen Schritt abzuschließen, stellen Sie sicher, dass Sie mindestens 2-3 XRT-Token in Ihrem `Robonomics Polkadot`-Konto haben.{% endroboWikiNote %}

1) Navigieren Sie zur Robonomics dApp [Abonnementseite](https://robonomics.app/#/rws-buy). 
2) Klicken Sie auf **Konto** und verbinden Sie Ihr Wallet. Ihre Kontoadresse und Ihr Guthaben werden angezeigt.
Wenn Sie kein Konto haben, folgen Sie [dieser Anleitung](https://wiki.robonomics.network/docs/create-account-in-dapp/), um eines zu erstellen.

{% roboWikiPicture {src:"docs/altruist/altruist_syb_buy.jpg", alt:"Abonnementseite"} %}{% endroboWikiPicture %}

3) Klicken Sie auf `ABONNEMENT KAUFEN` und unterzeichnen Sie die Transaktion. **Warten Sie, bis der Aktivierungsprozess abgeschlossen ist**. 
4) Nach der Aktivierung werden Sie zur **Einrichtungsseite** weitergeleitet, auf der Sie Ihren Abonnementnamen und das Ablaufdatum sehen können.

{% roboWikiPicture {src:"docs/altruist/altruist_setup_page.jpg", alt:"Abonnement-Einrichtungsseite"} %}{% endroboWikiPicture %}

5) **Speichern Sie Ihre Kontoadresse** — Sie benötigen sie während der Sensoreinrichtung. Sie können sie aus dem Abschnitt "OWNER" kopieren oder indem Sie auf Ihren Kontonamen in der oberen rechten Ecke klicken und die Kopiertaste auswählen.

## Sensoreinrichtung

{% roboWikiNote {type: "warning", title: "INFO"}%} Der Sensor kann nur mit einem 2,4-GHz-WLAN-Netzwerk verbunden werden.{% endroboWikiNote %}

1) **Stecken Sie den Sensor** in eine Steckdose.
2) Die Platine erstellt ein WLAN-Netzwerk namens Altruist-xxxxxxxxx. Verbinden Sie sich von Ihrem Telefon oder Computer damit. Sie sollten automatisch aufgefordert werden, das Autorisierungsfenster zu öffnen. 
- Falls nicht, öffnen Sie einen Browser und gehen Sie zu 192.168.4.1.

{% roboWikiPicture {src:"docs/altruist/on_board.png", alt:"altruist-sensor"} %}{% endroboWikiPicture %}

3) **Konfigurieren Sie die WLAN-Einstellungen**:
- Wählen Sie Ihr WLAN-Netzwerk aus der Liste aus oder geben Sie es manuell ein, falls es nicht angezeigt wird.
- Geben Sie das Passwort im Feld "WI-FI SETTINGS" ein.

4) **Geben Sie Ihre Robonomics-Daten ein**:
- Fügen Sie die RWS-Besitzeradresse, die Sie zuvor kopiert haben, in das dafür vorgesehene Feld ein.

5) **Legen Sie den Sensorstandort fest**:
- Geben Sie die Koordinaten des Installationsortes des Sensors ein.
- Sie können Koordinaten mit Online-Karten finden oder eine Adresse in Breitengrad/Längengrad umwandeln, indem Sie [diesen Link](https://www.latlong.net/convert-address-to-lat) verwenden.-long.html)

{% roboWikiNote {type: "warning", title: "WARNUNG"}%}Die Sensor-Koordinaten werden dann auf einer öffentlich zugänglichen Karte angezeigt. Wenn Sie Ihre privaten Informationen nicht anzeigen möchten, geben Sie nahe, aber nicht genaue Koordinaten an.{% endroboWikiNote %}

{% roboWikiPicture {src:"docs/altruist/sensor_setup.png", alt:"altruist-sensor-wifi"} %}{% endroboWikiPicture %}

6) **Kopieren Sie die Altruist "Robonomics Adresse"**:
- Sie finden sie oben auf der Seite. Speichern Sie sie für den letzten Schritt.

{% roboWikiPicture {src:"docs/altruist/address.jpg", alt:"altruist address"} %}{% endroboWikiPicture %}

7) Klicken Sie unten auf der Seite auf "**Konfiguration speichern und neu starten**". Das Board wird neu gestartet und verbindet sich mit dem angegebenen Wi-Fi-Netzwerk.

## Altruist aktivieren
Der letzte Schritt im Einrichtungsprozess besteht darin, die **Altruist-Adresse** zu Ihrem **Robonomics-Abonnement** hinzuzufügen.

1) Gehen Sie zurück zur [Einrichtungsseite](https://robonomics.app/#/rws-setup).

2) Scrollen Sie nach unten zum Abschnitt "**Benutzer im Abonnement**".

3) Fügen Sie im Feld "**Einen Benutzer hinzufügen**" die **Altruist Robonomics Adresse** ein, die Sie zuvor kopiert haben.

{% roboWikiPicture {src:"docs/altruist/add_user.jpg", alt:"add user"} %}{% endroboWikiPicture %}

4) Klicken Sie auf die **Plus (+) Taste** und signieren Sie die Nachricht.

5) Warten Sie, bis der Vorgang abgeschlossen ist.

Das war's! Ihre Einrichtungist jetzt abgeschlossen. 🎉

Sie können Ihren Altruist jetzt auf der [Robonomics Sensors Social](https://sensors.social/#) Karte finden. 🚀

{% roboWikiPicture {src:"docs/altruist/map.jpg", alt:"sensor map"} %}{% endroboWikiPicture %}

## Home Assistant

Es gibt zwei Möglichkeiten, **Altruist** zu **Home Assistant** hinzuzufügen:

### Option 1: HACS (Empfohlen)

Der einfachste Weg, **Altruist** hinzuzufügen, ist über **HACS**. Eine kurze Installationsanleitung finden Sie [hier](https://hacs.xyz/docs/use/).

**Schritte**:
1) Sobald HACS installiert ist, öffnen Sie es.

2) Klicken Sie auf die **drei Punkte** in der oberen rechten Ecke und wählen Sie "**Custom repositories**".

3) Geben Sie im Pop-up-Fenster die folgende URL ein:

```
https://github.com/airalab/altruist-homeassistant-integration
```
4) Setzen Sie den Typ auf "**Integration**" und klicken Sie auf "**ADD**".

{% roboWikiPicture {src:"docs/altruist/hacs.jpg", alt:"altruist-add"} %}{% endroboWikiPicture %}

5) Suchen Sie nach der **Altruist Sensor**-Integration.

6) Klicken Sie auf die **Download**-Schaltfläche und starten Sie **Home Assistant** neu, sobald die Integration installiert ist.

{% roboWikiPicture {src:"docs/altruist/integration.jpg", alt:"altruist-hacs"} %}{% endroboWikiPicture %}

### Option 2: Manuelle Installation

1) Klonen Sie das Projekt-Repository unter dem `homeassistant`-Benutzer:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/airalab/altruist-homeassistant-integration.git
```

{% endcodeHelper %}

2) Wenn Sie bereits benutzerdefinierte Integrationen haben, verschieben Sie den `altruist` Ordner in Ihr `custom_components` Verzeichnis:

{% codeHelper { copy: true}%}

```
cd altruist-homeassistant-integration
mv custom_components/altruist ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

3) Wenn Sie **keine** benutzerdefinierten Integrationen haben, verschieben Sie das gesamte custom_components Verzeichnis:

{% codeHelper { copy: true}%}

 ```
cd altruist-homeassistant-integration
mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Konfiguration

Nach der Installation und dem Neustart von Home Assistant wird die Integration Altruist automatisch in Ihrem Netzwerk erkennen.

1) Gehen Sie zu **Einstellungen → Geräte & Dienste**.

2) Fügen Sie den **Altruist Sensor** hinzu.

{% roboWikiPicture {src:"docs/altruist/add_altruist.jpg", alt:"altruist entdecken"} %}{% endroboWikiPicture %}

Das war's! 🚀 Ihr Altruist Sensor ist jetzt in Home Assistant integriert.