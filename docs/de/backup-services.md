---
title: Backup-Dienste

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In diesem Artikel erfahren Sie, wie Sie Backups Ihrer Home Assistant-Konfiguration erstellen und diese bei Bedarf wiederherstellen können. Um Backups zu erstellen, wird ein Dienst aufgerufen, der ein sichiers Archiv mit Konfigurationsdateien generiert. Der Dienst fügt außerdem die Mosquitto-Broker- und Zigbee2MQTT-Konfiguration zum Backup hinzu, sofern vorhsind. Diese Pfade können jedoch je nach Ihrer spezifischen Konfiguration variieren.en. Anschließend wird das Archiv zu IPFS hinzugefügt und die resultierende CID im Robonomics Digital Twin gespeichert.**

## Erstellen eines Backups der Home Assistant-Konfiguration

Durch das Erstellen eines Backups können Sie Ihre Home Assistant-Konfiguration bei einem Ausfall problemlos wiederherstellen.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type:'mp4'}]" />

<robo-wiki-note type="warning" title="WARNUNG">

Um Ihre Konfiguration zu sichern und wiederherzustellen, ist es erforderlich, einen **benutzerdefinierten IPFS-Gateway** wie Pinata zu verwenden. Ohne dies wird Ihr Backup ausschließlich auf Ihrem lokalen IPFS-Knoten gespeichert, was Sie daran hindern kann, Ihre Home Assistant-Konfiguration im Falle eines Ausfalls des lokalen Knotens wiederherzustellen.

</robo-wiki-note>

1. Gehen Sie in der Web-Oberfläche von Home Assistant zu `Developer Tools` -> `Services`. Suchen Sie nach `Robonomics: Save Backup to Robonomics` und klicken Sie auf `CALL SERVICE`.

2. Warten Sie, bis die Benachrichtigung `Backup was updated in Robonomics` in `Notification`.

<robo-wiki-note type="warning" title="WARNUNG">

Versuchen Sie nicht, sofort nach dem Laden von Home Assistant und Robonomics Integration ein Backup zu erstellen oder die Konfiguration wiederherzustellen. Bitte **warten Sie etwa 5 Minuten** um die anfängliche Einrichtung abzuschließen.

</robo-wiki-note>

Dienstargumente:
- **Vollständiges Backup**  (default: False) - fügt die Datenbank dem Backup hinzu, sodass der Verlauf der Entitätszustände ebenfalls gespeichert wird.
- **Pfad zur Mosquitto-Passwortdatei** (default: `/etc/mosquitto`) - Wenn Sie die Home Assistant Core- oder Docker-Installierenierenationsmethoden verwendet haben und keinen Standardpfad zum Mosquitto-Broker haben, sollten Sie diesen Parameter ändern. *Für Home Assistant OS oder Superviser nicht erforderlich*.

## Wiederherstellen der Home Assistant-Konfiguration aus dem Backup

Um Ihre Konfiguration wiederherzustellen, benötigen Sie eine installierte Home Assistant- und Robonomics-Integration. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type:'mp4'}]" />

<robo-wiki-note type="warning" title="WARNUNG">

Um eine erfolgreiche Wiederherstellung Ihrer Konfiguration in Home Assistant Core und Docker-Installationsmethoden zu gewährleisten, müssen Sie zusätzliche Einrichtungsschritte durchführen, wie am Ende der Seite beschrieben.

</robo-wiki-note>

1. Installieren Sie Home Assisntant mit Robonomics Integration (falls noch nicht installiert), indem Sie den Schritten aus dem Artikel für die [gewünschte Installationsmethode](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [Richten Sie die Robonomics-Integration ein](https://wiki.robonomics.network/docs/robonomics-hass-integration) unter Verwendung der gleichen Seeds **die Sie in der vorherigen Robonomics-Konfiguration verwendet haben. Wenn Ihr Abonnement abgelaufen ist,** reaktivieren Sie es [3. Gehen Sie in der Web-Oberfläche von Home Assistant zu](https://wiki.robonomics.network/docs/sub-activate).

Navigieren Sie zur `Developer Tools` -> `Services`. Suchen `Robonomics: Restore from the Backup in Robonomics` and drücken Sie die `CALL SERVICE`. Seite, um den Status Ihres Backups zu überprüfen. `Overview` Seite, um den Status Ihres Backups zu überprüfen.

4. Nach der Wiederherstellung wird Home Assistant automatisch neu gestartet. Wenn aus irgendeinem Grund Home Assistant nicht neu startet, können Sie den Wiederherstellungsstatus überwachen, indem Sie den Zustand der `robonomics.backup` Entity überwachen. Wenn der Status `restored` ist, müssen Sie Home Assistant manuell neu starten, indem Sie zu `Settings` > `System` und klicken Sie auf `RESTART` Schaltfläche in der oberen rechten Ecke klicken.

5. Wenn Ihr Backup die Konfiguration von Zigbee2MQTT oder Mosquitto enthält, müssen Sie diese Dienste neu starten, um die neue Konfiguration zu aktivieren. Sie können dies manuell tun, indem Sie die Dienste einzeln neu starten, oder Sie können einfach den Home Assistant-Computer neu starten, um sicherzustellen, dass alle Dienste neu gestartet werden.

Service-Argumente:
- **Pfad zur Mosquito-Passwortdatei** (default: `/etc/mosquitto`) - Pfad zur Zigbee2MQTT-Konfiguration *Für Home Assistant OS oder Superviser nicht erforderlich*.
- **Pfad zur Zigbee2MQTT-Konfiguration**  (default: `/opt/zigbee2mqtt`) - Wenn Sie die Home Assistant Core- oder Docker-Installationsmethoden verwendet haben und keinen Standardpfad zu Zigbee2MQTT haben, sollten Sie diesen Parameter ändern. *Für Home Assistant OS oder Superviser nicht erforderlich*.


## Wiederherstellen der Mosquitto- und Zigbee2MQTT-Konfiguration für die Home Assistant Core-Installationsmethode

Wenn das Backup die Konfiguration für Mosquitto oder Zigbee2MQTT enthält, werden sie während des Wiederherstellungsprozesses im Standardpfad oder im in den Argumenten angegebenen Pfad abgelegt. Wenn Sie jedoch die Robonomics-Integration in einem vorhandenen Home Assistant Core installiert haben *(nicht aus dem vorinstallierten Robonomics-Image)*, `homeassistant` kann der Benutzer möglicherweise keinen Zugriff auf diesen Pfad haben.

(nicht aus dem vorinstallierten Robonomics-Image) *kann der Benutzer möglicherweise keinen Zugriff auf diesen Pfad haben.*, the `homeassistant` Um die Konfiguration von Mosquitto und Zigbee2MQTT wiederherzustellen, müssen Sie dem Benutzer die erforderlichen Leseberechtigungen gewähren

Um die Konfiguration von Mosquitto und Zigbee2MQTT wiederherzustellen, müssen Sie dem Benutzer die erforderlichen Leseberechtigungen gewähren `homeassistant`:
```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Backup der Mosquitto- und Zigbee2MQTT-Konfiguration für die Home Assistant Docker-Installationsmethode

Um die Mosquitto- und Zigbee2MQTT-Konfigurationen aus einem Docker-Container zu sichern, müssen Sie Volumes für ihre jeweiligen Konfigurationen erstellen. Dies kann erreicht werden, indem Sie Ihren Home Assistant-Container mit zusätzlichen Argumenten ausführen:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

oder Änderungen in Ihrer `compose.yaml` File.

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```
<robo-wiki-note type="note" title="Note">

Bitte beachten Sie, dass die Standardpfade für die Mosquitto- und Zigbee2MQTT-Konfigurationen `/etc/mosquitto` und `/opt/zigbee2mqtt` sind. Diese Pfade können jedoch je nach Ihrer spezifischen Konfiguration variieren.

</robo-wiki-note>

## Backup-Schaltflächen

Zusätzlich zur Verwendung von Diensten zur Arbeit mit Backups können Sie den Vorgang vereinfachen, indem Sie die `button.create_backup` und  `button.restore_from_backup` Schaltflächen aus der Robonomics-Integration verwenden. Diese Schaltflächen rufen die entsprechenden Dienste mit den Standardparametern auf (die Backup-Schaltfläche erstellt ein Backup ohne Verlauf).

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type:'mp4'}]" />

Um Schaltflächen zu Ihrem Dashboard hinzuzufügen, befolgen Sie diese Schritte:

1. Klicken Sie auf die drei Punkte in der oberen rechten Ecke des Dashboards.
2. Wählen Sie `Edit Dashboard`.
3. Klicken Sie auf die `Add Card` Schaltfläche in der unteren rechten Ecke.
4. Wählen Sie die `Entities` 
5. Im Feld `Entities` suchen Sie nach den Entitäten button.create_backup und button.restore_from_backup.
6. Drücken Sie `Save`um die Entitäten zur Karte hinzuzufügen. 
7. Beenden Sie die Bearbeitung, indem Sie auf die Schaltfläche in der oberen rechten Ecke klicken `Done` Schaltfläche in der oberen rechten Ecke.