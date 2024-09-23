---
title: Aktualisieren Sie Ihr Home Assistant Docker oder Core für Unix-ähnliche Betriebssysteme
contributors: [PaTara43]
tools:
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Robonomics Home Assistant Integration 1.8.5-beta
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.2
    https://github.com/Multi-Agent-io/robonomics-interface/
  - HACS 1.34.0
    https://hacs.xyz/docs/setup/download



---

**Dieser Artikel enthält Anweisungen zum Aktualisieren Ihres vorhandenen Home Assistant Docker oder Core (auf einem Unix-ähnlichen Betriebssystem) mit der Robonomics-Integration.**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"HAFTUNGSAUSSCHLUSS", type: "warning"}%}
  1. Es wird davon ausgegangen, dass Docker ordnungsgemäß installiert ist.
  2. Es wird davon ausgegangen, dass Standard-Docker-Images und Container von Home Assistant oder Home Assitant Core verwendet werden.
  3. IPFS und Libp2p-ws-proxy werden als Docker-Container installiert.
{% endroboWikiNote %}


## Installation

Laden Sie das Installationsskript herunter und führen Sie es im Terminal aus:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

Es wird überprüft, ob Docker ordnungsgemäß installiert ist. Anschließend wird versucht, IPFS zu finden und es wird empfohlen, die Konfiguration zu überprüfen, wenn IPFS installiert ist. Wenn IPFS nicht gefunden wird, installiert das Skript sowohl IPFS als auch den Libp2p-ws-Proxy. Sie sehen die folgende Ausgabe:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
Docker installiert
$Benutzer gehört zur Docker-Gruppe.
Überprüfung, ob IPFS installiert ist... Es kann einige Minuten dauern. Bitte warten
<...>
 ✔ Container ipfs-daemon      gestartet
 ✔ Container lipb2p-ws-proxy  gestartet
Alles eingerichtet!
``` install_integration_core.sh
```

{% endcodeHelper %}

Wenn IPFS bereits installiert ist, sehen Sie die folgende Ausgabe:
```shell
Docker installiert
$Benutzer gehört zur Docker-Gruppe.
Überprüfung, ob IPFS installiert ist... Es kann einige Minuten dauern. Bitte warten
IPFS-Instanz wurde gefunden. Stellen Sie sicher, dass Ihre Konfiguration mit den folgenden Einstellungen korrekt eingerichtet ist:
      - 'Gateway': '/ip4/0.0.0.0/tcp/8080'
      - Ports 4001, 5001 und 8080 sind verfügbar.
      Fügen Sie außerdem die folgenden Bootstrap-Knoten hinzu:
      1. '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8'
      2. '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
      3. '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      Ist Ihre Konfiguration korrekt eingerichtet? [ja/Nein]:

```
In diesem Fall müssen Sie Ihre IPFS-Konfigurationsdatei anpassen und bestätigen.

{% roboWikiNote {title:"Achtung!", type: "warning"}%} Eine ordnungsgemäße Konfiguration von IPFS ist wichtig; überspringen Sie diesen Schritt nicht!{% endroboWikiNote %}

## Robonomics-Integration herunterladen

Wir werden [HACS](https://hacs.xyz/) verwenden, um die Integration zu installieren. Wenn HACS noch nicht auf Ihrem Home Assistant installiert ist, müssen Sie es zuerst [installieren](https://hacs.xyz/docs/setup/download/).

Navigieren Sie dann in Ihrem Home Assistant zu HACS und suchen Sie nach `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Öffnen Sie es und klicken Sie unten rechts auf `Herunterladen`. Das Herunterladen des Repositorys kann einige Zeit in Anspruch nehmen.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

Das war's. Fahren Sie mit dem nächsten Artikel fort.