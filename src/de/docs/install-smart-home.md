---
title: Smart Home Installation
contributors: [nakata5321, PaTara43]
tools:
  - Home-assistant-web3-build 0.0.5
    https://github.com/airalab/home-assistant-web3-build
  - Home Assistant 2024.11.3
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.40.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Willkommen zum Leitfaden zur Installation von Home Assistant mit Robonomics-Integration. Home Assistant ist ein Open-Source-Heimautomatisierungssystem, das eine zentrale Steuerungszentrale für die Steuerung intelligenter Geräte in Ihrem Heimnetzwerk bietet. Durch die Integration mit Robonomics, einem dezentralen Cloud-Dienst, können Sie die Funktionalität und Sicherheit Ihres Smart Homes verbessern. In diesem Artikel werden wir schrittweise Anleitungen zur Installation von Home Assistant mit Robonomics bereitstellen, um Ihnen die Möglichkeit zu geben, verschiedene Aspekte Ihres Zuhauses mithilfe einer sicheren und dezentralen Lösung zu automatisieren und zu steuern. Lass uns anfangen!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"installation"} %}{% endroboWikiPicture %}

## Demo

Hierist ein Beispiel für eine vollständige Smart Home- und Robonomics-Integration. Beachten Sie, dass die benötigte Zeit je nach Internetverbindung variieren kann.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Hardware, die Sie für die Installation benötigen

Wenn Sie Home Assistant noch nicht in Ihr Smart Home-Setup integriert haben, ist es wichtig, sich über die Ausrüstung im Klaren zu sein, die Sie benötigen, um ein vollständiges Smart-Home-System von Grund auf aufzubauen. Das Robonomics-Team empfiehlt die Verwendung von Raspberry Pi 4 als Smart-Home-Server.

{% roboWikiGridWrapper {columns: '2', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (mindestens 2 GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD-Karte16 GB</b> {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
    {% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
     <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee Smart-Geräte (optional) </b> </a>  {% endroboWikiGrid %}
    {% roboWikiGrid %}     {% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
    <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee-Adapter (optional) </b> </a>  {% endroboWikiGrid %}
    
{% endroboWikiGridWrapper %}


## 1. Installieren Sie die Vorbedingungen


{% roboWikiNote {type: "warning", title: "Wichtige Informationen" }%} Alle diese Schritte sollten auf einem Raspberry Pi 4 mit Ubuntu-System durchgeführt werden. {% endroboWikiNote %}

Robonomics Docker enthält:
- Home Assistant
- IPFS
- MQTT-Broker und Integration- Zigbee2MQTT
- libp2p-Proxy
- Robonomics-Integration

Zuerst müssen Sie die folgenden Pakete installieren:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

Dann müssen Sie Docker auf Ihrem Raspberry Pi 4 installieren. Installationsanweisungen finden Sie auf [der offiziellen Website](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Wichtige Information"}%} Fügen Sie Ihren Benutzer zur Docker-Gruppe hinzu, um Docker-Container ohne Root-Berechtigungen starten zu können. Finden Sie [hier Anweisungen](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

## 2. Konfigurieren

Laden Sie das GitHub-Repository herunter und navigieren Sie darin:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Erstellen Sie dann eine `.env`-Datei aus der `template.env`:


{% codeHelper {copy: true}%}

```
cp template.env .env
```

{% endcodeHelper %}

Danach können Sie die `.env`-Datei öffnen und die Standardwerte bearbeiten, wie z. B.:
- den Pfad zum Repository, in dem alle Konfigurationsordner gespeichert werden.
- Zeitzone in ["tz-Datenbankname"](https://en.wikipedia.org/wiki/List_of_tDatenbank-Zeitzonen).

## 3. Start

Führen Sie das Bash-Skript aus und warten Sie, bis alle erforderlichen Pakete installiert sind:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Das Skript überprüft alle erforderlichen Aktionen, die in den vorherigen Schritten abgeschlossen wurden, und zeigt einen Fehler an, wenn etwas nicht korrekt ist.

Während des Installationsprozesses können folgende Situationen auftreten:
- Wenn Sie sich entscheiden, den Zigbee-Koordinator nicht zu verwenden, wird eine Dialogzeile angezeigt, die bestätigt, ob die Installation fortgesetzt werden soll:

{% codeHelper %}

```
Dieses Skript erstellt alle erforderlichen Repositories und startet Docker-Container
Kann den Standort des Zigbee-Koordinators nicht finden. Bitte fügen Sie ihn ein und führen Sie das Skript erneut aus. Das Verzeichnis /dev/serial/by-id/ existiert nicht
Möchten Sie ohne Zigbee-Koordinator fortfahren? Der Zigbee2MQTT-Container wird nicht gestartet.
Möchten Sie fortfahren? (J/n)
```

{% endcodeHelper %}


- Wenn auf Ihrem Raspberry Pi 4 mehrere Geräte serielle Anschlüsse verwenden, wird das Skript fragen, welches Gerät verwendet werden soll:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/seriell/nach-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## Nach der Installation

Nachdem alles gestartet ist, können Sie das `update.sh`-Skript verwenden, um die Version der Docker-Pakete zu aktualisieren:
{% codeHelper {copy: true}%}

```
bash update.sh
```

{% endcodeHelper %} 
Dieses Skript lädt neue Versionen herunter, löscht alte Versionen von Paketen und startet alles automatisch neu, wobei alle Konfigurationen gespeichert werden.

Um alles zu stoppen, verwenden Sie das `stop.sh`-Skript:
{% codeHelper {copy: true}%}

```
bash stop.sh
```

{% endcodeHelper %}


Das war alles. Fahren Sie mit dem nächsten Artikel fort.