---
title: Altruist Einrichtung
contributors: [tubleronchik]
---

**Diese Anleitung führt Sie durch die Einrichtung und Aktivierung eines Altruist Outdoor-Sensors. Sie verbinden den Sensor mit Wi-Fi, konfigurieren seinen Standort und aktivieren ein Abonnement mit XRT-Token. Zusätzlich werden Anweisungen zur Integration des Sensors mit Home Assistant über HACS oder manuelle Installation bereitgestellt.**

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

{% roboWikiPicture {src:"docs/altruist/networks.png", alt:"altruist-sensor", small: true} %}{% endroboWikiPicture %}

3) **Konfigurieren Sie die WLAN-Einstellungen**:
- Wählen Sie Ihr WLAN-Netzwerk aus der Liste aus oder geben Sie es manuell ein, falls es nicht angezeigt wird.
- Geben Sie das Passwort im Feld "WI-FI SETTINGS" ein.
- Wenn Sie mehrere Altruist-Geräte im selben Netzwerk haben, ändern Sie den lokalen Hostnamen. Nach der Einrichtung des WLANs können Sie über diesen Hostnamen eine Verbindung zu Ihrem Sensor herstellen.

{% roboWikiPicture {src:"docs/altruist/wifi_creds.png", alt:"altruist-sensor", small: true} %}{% endroboWikiPicture %}

4) **Konfiguration speichern**
- Klicken Sie auf die Schaltfläche `Konfiguration speichern und neu starten` und warten Sie, bis der Sensor eine Verbindung zum WLAN herstellt. Sobald die Verbindung hergestellt ist, wird die neue IP-Adresse angezeigt – kopieren Sie diese, da dies eine alternative Möglichkeit ist, nach der Einrichtung eine Verbindung zu Ihren Sensoren herzustellen.

{% roboWikiPicture {src:"docs/altruist/connected.png", alt:"altruist-sensor", small: true} %}{% endroboWikiPicture %}

5) **Geben Sie Ihre Robonomics-Daten ein**:
- Öffnen Sie die Altruist-Weboberfläche unter http://altruist.local (oder verwenden Sie Ihren benutzerdefinierten lokalen Hostnamen, gefolgt von `.local`, wenn Sie ihn geändert haben). Navigieren Sie dann zur Seite `Konfiguration`.
- Fügen Sie im Abschnitt `Robonomics` die zuvor kopierte RWS-Besitzeradresse in das dafür vorgesehene Feld ein.

6) **Legen Sie den Standort des Sensors fest**:
- Geben Sie im Abschnitt `GPS & Temperaturkorrektur` die Koordinaten des Installationsortes des Sensors ein.
- Sie können Koordinaten mithilfe von Online-Karten finden oder eine Adresse in Breitengrad/Längengrad umwandeln, indem Sie [diesen Link](https://www.latlong.net/convert-address-to-lat-long.html) verwenden.

{% roboWikiNote {type: "warning", title: "WARNUNG"}%}Die Sensor-Koordinaten werden dann auf einer öffentlich zugänglichen Karte angezeigt. Wenn Sie Ihre privaten Informationen nicht anzeigen möchten, geben Sie nahe, aber nicht genaue Koordinaten an.{% endroboWikiNote %}

{% roboWikiPicture {src:"docs/altruist/robo-gps.png", alt:"altruist-sensor-wifi", small: true} %}{% endroboWikiPicture %}

7) **Kopieren Sie die Altruist "Robonomics-Adresse"**:
- Sie finden es oben auf der Seite. Speichern Sie es für den letzten Schritt.

{% roboWikiPicture {src:"docs/altruist/address.jpg", alt:"altruist address", small: true} %}{% endroboWikiPicture %}

8) Klicken Sie unten auf der Seite auf "**Konfiguration speichern und neu starten**". Das Board wird neu gestartet.

## Altruist aktivieren
Der letzte Schritt im Einrichtungsprozess besteht darin, die **Altruist-Adresse** zu Ihrem **Robonomics-Abonnement** hinzuzufügen.

1) Gehen Sie zurück zur [Setup-Seite](https://robonomics.app/#/rws-setup).

2) Scrollen Sie nach unten zum Abschnitt "**Benutzer im Abonnement**".

3) Fügen Sie im Feld "**Benutzer hinzufügen**" die **Altruist Robonomics-Adresse** ein, die Sie zuvor kopiert haben.

{% roboWikiPicture {src:"docs/altruist/add_user.jpg", alt:"add user"} %}{% endroboWikiPicture %}

4) Klicken Sie auf die **Plus (+) Taste** und signieren Sie die Nachricht.

5) Warten Sie, bis der Vorgang abgeschlossen ist.

Das war's! Ihre Einrichtung ist nun abgeschlossen. 🎉

Sie können Ihren Altruist jetzt auf der [Robonomics Sensors Social](https://sensors.social/#) Karte finden. 🚀

{% roboWikiPicture {src:"docs/altruist/map.jpg", alt:"sensor map"} %}{% endroboWikiPicture %}

## Home Assistant

Es gibt zwei Möglichkeiten, **Altruist** zu **Home Assistant** hinzuzufügen:

### Option 1: HACS (Empfohlen)

Der einfachste Weg, **Altruist** hinzuzufügen, ist über **HACS**.Du kannst eine kurze Installationsanleitung [hier](https://hacs.xyz/docs/use/) finden.

**Schritte**:
1) Sobald HACS installiert ist, öffne es.

2) Klicke auf die **drei Punkte** in der oberen rechten Ecke und wähle "**Custom repositories**".

3) Gib im Pop-up-Fenster die folgende URL ein:

```
https://github.com/airalab/altruist-homeassistant-integration
```
4) Setze den Typ auf "**Integration**" und klicke auf "**ADD**".

{% roboWikiPicture {src:"docs/altruist/hacs.jpg", alt:"altruist-add"} %}{% endroboWikiPicture %}

5) Suche nach der **Altruist Sensor** Integration.

6) Klicke auf den **Download**-Button und starte **Home Assistant** neu, sobald die Integration installiert ist.

{% roboWikiPicture {src:"docs/altruist/integration.jpg", alt:"altruist-hacs"} %}{% endroboWikiPicture %}

### Option 2: Manuelle Installation

1) Klone das Projekt-Repository unter dem `homeassistant` Benutzer:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/airalab/altruist-homeassistant-integration.git
```

{% endcodeHelper %}

2) Wenn du bereits benutzerdefinierte Integrationen hast, verschiebe den `altruist` Ordner in dein `custom_components` Verzeichnis:

{% codeHelper { copy: true}%}

```
cd altruist-homeassistant-integration
mv custom_components/altruist ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

3) Wenn du **keine** benutzerdefinierten Integrationen hast, verschiebe das gesamte custom_components Verzeichnis:

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

{% roboWikiPicture {src:"docs/altruist/add_altruist.jpg", alt:"discover altruist"} %}{% endroboWikiPicture %}

Das war's! 🚀 Ihr Altruist Sensor ist jetzt in Home Assistant integriert.