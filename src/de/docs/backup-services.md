---
title: Backup-Services

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In diesem Artikel erfahren Sie, wie Sie Backups Ihrer Home Assistant-Konfiguration erstellen und diese bei Bedarf wiederherstellen können. Um Backups zu erstellen, wird ein Dienst aufgerufen, der ein sicheres Archiv mit Konfigurationsdateien generiert. Der Dienst fügt außerdem die Mosquitto-Broker- und Zigbee2MQTT-Konfiguration zum Backup hinzu, falls vorhanden. Anschließend fügt dieser Dienst das Archiv zu IPFS hinzu und speichert die resultierende CID im Robonomics Digital Twin.**
## Erstellen eines Backups der Home Assistant-Konfiguration

Durch das Erstellen eines Backups können Sie Ihre Home Assistant-Konfiguration im Falle eines Ausfalls einfach wiederherstellen.

{% roboWikiVideo {videos:[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning", title: "WARNUNG"}%}Um Ihre Konfiguration zu sichern und wiederherzustellen, ist es erforderlich, ein **benutzerdefiniertes IPFS-Gateway** wie Pinata zu verwenden. Ohne dies wird Ihr Backup ausschließlich auf Ihrem lokalen IPFS-Node gespeichert, was Sie möglicherweise daran hindert, Ihre Home Assistant-Konfiguration im Falle eines Ausfalls des lokalen Nodes wiederherzustellen.
{% endroboWikiNote %}

1. Gehen Sie im Webinterface von Home Assistant zu `Entwicklerwerkzeuge` -> `Dienste`. Suchen Sie nach `Robonomics: Backup in Robonomics speichern` und klicken Sie auf `DIENST AUFRUFEN`.

2. Warten Sie, bis Sie die Benachrichtigung `Backup wurde in Robonomics aktualisiert` im `Benachrichtigungsfeld` sehen.

{% roboWikiNote {type: "warning", title: "WARNUNG"}%}Versuchen Sie nicht, unmittelbar nach dem Laden von Home Assistant und Robonomics Integration ein Backup zu erstellen oder die Konfiguration wiederherzustellen. Bitte **warten Sie etwa 5 Minuten**, um die anfängliche Einrichtung abzuschließen. {% endroboWikiNote %}

Dienstargumente:
- **Vollständiges Backup** (Standard: False) - fügen Sie die Datenbank zum Backup hinzu, sodass auch der Verlauf der Entitätszustände gespeichert wird.
- **Pfad zur Mosquitto-Passwortdatei** (Standard: `/etc/mosquitto`) - Wenn Sie die Home Assistant Core- oder Docker-Installationsmethoden verwendet haben und keinen Standardpfad zum Mosquitto-Broker haben, sollten Sie diesen Parameter ändern. *Nicht erforderlich für Home Assistant OS oder Supervisor*.

## Wiederherstellen der Home Assistant-Konfiguration aus dem Backup

Um Ihre Konfiguration wiederherzustellen, benötigen Sie eine installierte Home Assistant- und Robonomics-Integration.

{% roboWikiVideo {videos:[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Um eine erfolgreiche Wiederherstellung Ihrer Konfiguration in den Home Assistant Core- und Docker-Installationsmethoden sicherzustellen, müssen Sie zusätzliche Einrichtungsschritte durchführen, wie am Ende der Seite beschrieben.
{% endroboWikiNote %}

1. Installieren Sie Home Assistant mit Robonomics-Integration (falls noch nicht installiert), indem Sie den Schritten aus dem Artikel für die [gewünschte Installationsmethode](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home) folgen.

2. [Richten Sie die Robonomics-Integration ein](https://wiki.robonomics.network/docs/robonomics-hass-integration) und verwenden Sie **die gleichen Seeds**, die Sie in der vorherigen Robonomics-Konfiguration verwendet haben. Wenn Ihr Abonnement abgelaufen ist, [reaktivieren Sie es](https://wiki.robonomics.network/docs/sub-activate).

3. Gehen Sie im Webinterface von Home Assistant zu `Entwicklerwerkzeuge` -> `Dienste`. Suchen Sie nach `Robonomics: Aus dem Backup in Robonomics wiederherstellen` und klicken Sie auf `DIENST AUFRUFEN`. Navigieren Sie zur `Übersichts`-Seite, um den Status Ihres Backups zu überprüfen.

4. Nach der Wiederherstellung wird Home Assistant automatisch neu gestartet. Wenn Home Assistant aus irgendeinem Grund nicht neu startet, können Sie den Wiederherstellungsstatus überwachen, indem Sie den Status der Entität `robonomics.backup` überwachen. Wenn der Status `wiederhergestellt` ist, müssen Sie Home Assistant manuell neu starten, indem Sie zu `Einstellungen` > `System` navigieren und auf die `NEUSTART`-Schaltfläche in der oberen rechten Ecke klicken.

5. Wenn Ihr Backup die Zigbee2MQTT- oder Mosquitto-Konfiguration enthält, müssen Sie diese Dienste neu starten, um die neue Konfiguration zu aktivieren. Dies können Sie tun.Manuell, indem Sie die Dienste einzeln neu starten, oder Sie können einfach den Home Assistant-Computer neu starten, um sicherzustellen, dass alle Dienste neu gestartet werden.

Dienstargumente:
- **Pfad zur Mosquitto-Passwortdatei** (Standard: `/etc/mosquitto`) - Wenn Sie die Installationsmethoden Home Assistant Core oder Docker verwendet haben und keinen Standardpfad zum Mosquitto-Broker haben, sollten Sie diesen Parameter ändern. *Nicht erforderlich für Home Assistant OS oder Supervisor*.
- **Pfad zur Zigbee2MQTT-Konfiguration** (Standard: `/opt/zigbee2mqtt`) - Wenn Sie die Installationsmethoden Home Assistant Core oder Docker verwendet haben und keinen Standardpfad zu Zigbee2MQTT haben, sollten Sie diesen Parameter ändern. *Nicht erforderlich für Home Assistant OS oder Supervisor*.

## Wiederherstellen der Mosquitto- und Zigbee2MQTT-Konfiguration für die Home Assistant Core-Installationsmethode

Wenn das Backup die Konfiguration für Mosquitto oder Zigbee2MQTT enthält, werden sie während des Wiederherstellungsprozesses im Standardpfad oder im in den Argumenten angegebenen Pfad platziert. Wenn Sie jedoch die Robonomics-Integration in einem vorhandenen Home Assistant Core installiert haben *(nicht aus dem vorinstallierten Robonomics-Image)*, hat der Benutzer `homeassistant` möglicherweise keinen Zugriff auf diesen Pfad.

Um die Konfiguration von Mosquitto und Zigbee2MQTT wiederherzustellen, müssen Sie dem Benutzer `homeassistant` die erforderlichen Leseberechtigungen gewähren:

```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Sichern der Mosquitto- und Zigbee2MQTT-Konfiguration für die Home Assistant Docker-Installationsmethode

Um die Mosquitto- und Zigbee2MQTT-Konfigurationen aus einem Docker-Container zu sichern, müssen Sie Volumes für ihre jeweiligen Konfigurationen erstellen. Dies kann erreicht werden, indem Sie Ihren Home Assistant-Container mit zusätzlichen Argumenten ausführen:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MEINE_ZEITZONE \
  -v /PFAD_ZU_IHRER_KONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

oder Änderungen in Ihrer `compose.yaml`-Datei vornehmen:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
```    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PFAD_ZU_IHRER_KONFIGURATION:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```

{% roboWikiNote {type: "note", title:"Hinweis"}%}Bitte beachten Sie, dass die Standardpfade für die Mosquitto- und Zigbee2MQTT-Konfigurationen jeweils `/etc/mosquitto` und `/opt/zigbee2mqtt` sind. Diese Pfade können jedoch je nach Ihrer spezifischen Konfiguration variieren.
{% endroboWikiNote %}

## Backup-Schaltflächen

Zusätzlich zur Verwendung von Diensten zur Arbeit mit Backups können Sie den Prozess vereinfachen, indem Sie die Schaltflächen `button.create_backup` und `button.restore_from_backup` aus der Robonomics-Integration verwenden. Diese Schaltflächen rufen die entsprechenden Dienste mit Standardparametern auf (die Backup-Schaltfläche erstellt ein Backup ohne Historie).

{% roboWikiVideo {videos:[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Um Schaltflächen zu Ihrem Dashboard hinzuzufügen, befolgen Sie diese Schritte:

1. Klicken Sie auf die drei Punkte in der oberen rechten Ecke des Dashboards.
2. Wählen Sie `Dashboard bearbeiten`.
3. Klicken Sie auf die Schaltfläche `Karte hinzufügen` in der unteren rechten Ecke.
4. Wählen Sie die Karte `Entitäten`.
5. Suchen Sie in dem Feld `Entitäten` nach den Entitäten button.create_backup und button.restore_from_backup.
6. Drücken Sie `Speichern`, um die Entitäten zur Karte hinzuzufügen.
7. Beenden Sie die Bearbeitung, indem Sie auf die Schaltfläche `Fertig` in der oberen rechten Ecke klicken.