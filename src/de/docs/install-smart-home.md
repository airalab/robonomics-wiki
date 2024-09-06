---
title: Smart Home Installation
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.27.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Willkommen zum Leitfaden zur Installation von Home Assistant mit Robonomics-Integration. Home Assistant ist ein Open-Source-Heimautomatisierungssystem, das eine zentrale Anlaufstelle für die Steuerung intelligenter Geräte in Ihrem Heimnetzwerk bietet. Durch die Integration mit Robonomics, einem dezentralen Cloud-Service, können Sie die Funktionalität und Sicherheit Ihres Smart Homes verbessern. In diesem Artikel werden wir schrittweise Anleitungen zur Installation von Home Assistant mit Robonomics bereitstellen, um Ihnen die Möglichkeit zu geben, verschiedene Aspekte Ihres Zuhauses mithilfe einer sicheren und dezentralen Lösung zu automatisieren und zu steuern. Lassen Sie uns beginnen!**

## Demo

Hier ist ein Beispiel für eine vollständige Installation der Smart Home- und Robonomics-Integration. Beachten Sie, dass die benötigte Zeit je nach Internetverbindung variieren kann.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Benötigte Hardware für die Installation

Wenn Sie Home Assistant noch nicht in Ihr Smart Home-Setup integriert haben, ist es wichtig, sich über die Ausrüstung im Klaren zu sein, die Sie benötigen, um ein vollständiges Smart-Home-System von Grund auf aufzubauen. Das Robonomics-Team empfiehlt die Verwendung von Raspberry Pi 4 als Smart-Home-Server. **Es ist jedoch möglich, alles auf Ihrem PC einzurichten.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (mindestens 2 GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD-Karte 16 GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee-Adapter (optional) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee-Smart-Geräte (optional) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Desktop für die Einrichtung</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


## 1. Installieren Sie die Vorbedingungen

Robonomics Docker enthält:
- Home Assistant
- IPFS
- MQTT-Broker und Integration
- Zigbee2MQTT
- libp2p-Proxy
- Robonomics-Integration

In diesem Artikel wird der Installationsprozess auf einem Ubuntu-System gezeigt. Zuerst müssen Sie die folgenden Pakete installieren:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git
```

{% endcodeHelper %}

Dann müssen Sie Docker auf dem PC installieren. Installationsanweisungen finden Sie auf [der offiziellen Website](https://docs.docker.com/engine/install/).

<robo-wiki-note type="warning" title="Wichtige Informationen">

  Fügen Sie Ihren Benutzer zur Docker-Gruppe hinzu, um Docker-Container ohne Root-Berechtigungen starten zu können. Finden Sie [hier Anweisungen](https://docs.docker.com/engine/install/linux-postinstall/).

</robo-wiki-note>

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
mv template.env .env
```

{% endcodeHelper %}

Danach können Sie die `.env`-Datei öffnen und Standardwerte wie:
- Versionen der Pakete
- Pfad zum Repository, in dem alle Konfigurationsordner gespeichert werden.
- Zeitzone in ["tz-Datenbankname"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) bearbeiten.

## 3. Starten

Führen Sie das Bash-Skript aus und warten Sie, bis alle erforderlichen Pakete installiert sind:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Das Skript überprüft alle erforderlichen Aktionen, die Sie in den vorherigen Schritten abgeschlossen haben, und gibt einen Fehler aus, wenn etwas nicht stimmt.

Während des Installationsprozesses können folgende Situationen auftreten:
- Wenn Sie sich entscheiden, den Zigbee-Koordinator nicht zu verwenden, sehen Sie eine Dialogzeile, die bestätigt, ob die Installation fortgesetzt werden soll:

{% codeHelper %}

```
Dieses Skript erstellt alle erforderlichen Repositories und startet Docker-Container
Kann den Standort des Zigbee-Koordinators nicht finden. Bitte fügen Sie ihn ein und führen Sie das Skript erneut aus. Das Verzeichnis /dev/serial/by-id/ existiert nicht
Möchten Sie ohne Zigbee-Koordinator fortfahren? Der Zigbee2MQTT-Container wird nicht gestartet.
Möchten Sie fortfahren? (j/n)
```

{% endcodeHelper %}


- Wenn auf Ihrem PC mehrere Geräte serielle Anschlüsse verwenden, wird das Skript fragen, welches Gerät verwendet werden soll:

{% codeHelper %}

```
Dieses Skript erstellt alle erforderlichen Repositories und startet Docker-Container
Der Zigbee-Koordinator ist installiert
Sie haben mehr als 1 verbundene Geräte. Bitte wählen Sie eines aus
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

Das war's. Fahren Sie mit dem nächsten Artikel fort.