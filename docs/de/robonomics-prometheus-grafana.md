---
title: Robonomics + Prometheus + Grafana 

contributors: [Vourhey]
---

**Die folgende Anleitung stammt von [Hubo Bubo](https://github.com/hubobubo)**

**Der Originalartikel befindet sich [hier](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-Metriken-mit-Prometheus-und-Grafana)**

## Einführung
Um Robonomics-Knoten besser überwachen und warten zu können, ist es ratsam, eine Überwachung auf Basis von Prometheus Server und Grafana einzurichten. Dieses Dokument zeigt, wie Sie jedes einzelne davon konfigurieren können, um Ihren Knoten vollständig zu überwachen.

##  Voraussetzungen
* [Servereinrichtung mit Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) 
* [Robonomics-Parachain-Collator installiert](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Stellen Sie sicher, dass robonomics.service auf Ihrem Gerät funktioniert und Port 9615 erreichbar ist. 

## Schritt 1 - Erstellen von Service-Benutzern

Aus Sicherheitsgründen beginnen wir damit, zwei neue Benutzerkonten, prometheus und node_exporter, zu erstellen. Erstellen Sie diese beiden Benutzer und verwenden Sie die Optionen _--no-create-home_ und _--shell /bin/false_, damit sich diese Benutzer nicht am Server anmelden können.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Bevor wir die Prometheus-Binärdateien herunterladen, erstellen wir die erforderlichen Verzeichnisse zum Speichern der Dateien und Daten von Prometheus. Gemäß den Standardkonventionen von Linux erstellen wir ein Verzeichnis in _/etc_ für die Konfigurationsdateien von Prometheus und ein Verzeichnis in _/var/lib_ für seine Daten.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Legen Sie nun den Benutzer- und Gruppenbesitz auf den neuen Verzeichnissen auf den Benutzer prometheus fest.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Schritt 2 - Herunterladen von Prometheus

Laden Sie zunächst die aktuelle stabile Version von Prometheus herunter und entpacken Sie sie in Ihr Home-Verzeichnis. Die neuesten Binärdateien finden Sie auf der [Prometheus-Downloadseite.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Entpacken Sie nun das heruntergeladene Archiv.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Dies erstellt ein Verzeichnis namens prometheus-2.21.0.linux-amd64, das zwei Binärdateien (prometheus und promtool), die Verzeichnisse _consoles_ und _console_libraries_ mit den Dateien der Web-Benutzeroberfläche, eine Lizenz, einen Hinweis und mehrere Beispieldateien enthält.

Kopieren Sie die beiden Binärdateien in das Verzeichnis _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Legen Sie den Benutzer- und Gruppenbesitz auf den Binärdateien auf den in Schritt 1 erstellten Benutzer prometheus fest.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Kopieren Sie die Verzeichnisse consoles und _console_libraries_ nach _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Legen Sie den Benutzer- und Gruppenbesitz auf den Verzeichnissen auf den Benutzer prometheus fest. Mit der Option -R wird sichergestellt, dass der Besitz auch auf die Dateien innerhalb des Verzeichnisses angewendet wird.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Jetzt, da Prometheus installiert ist, erstellen wir seine Konfigurations- und Service-Dateien zur Vorbereitung des ersten Starts.

## Schritt 3 - Konfigurieren von Prometheus

Erstellen Sie im Verzeichnis _/etc/prometheus_ mit nano oder Ihrem bevorzugten Texteditor eine Konfigurationsdatei namens _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
Definieren Sie in den globalen Einstellungen das Standardintervall zum Abrufen von Metriken. Beachten Sie, dass Prometheus diese Einstellungen auf jeden Exporter anwendet, es sei denn, die eigenen Einstellungen des Exporters überschreiben die globalen Einstellungen.

```
global:
  scrape_interval: 15s

```
Dieser Wert für scrape_interval gibt an, dass Prometheus Metriken von seinen Exportern alle 15 Sekunden sammeln soll, was für die meisten Exporter ausreichend ist.
Fügen Sie nun Prometheus selbst zur Liste der Exporter hinzu, von denen gescraped werden soll, mit der folgenden scrape_configs-Anweisung:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheus verwendet den _job_name_, um Exporter in Abfragen und auf Diagrammen zu kennzeichnen. Stellen Sie also sicher, dass Sie hier etwas Beschreibendes auswählen.

Und da Prometheus wichtige Daten über sich selbst exportiert, die Sie zur Überwachung der Leistung und zur Fehlerbehebung verwenden können, haben wir die globale scrape_interval-Direktive von 15 Sekunden auf 5 Sekunden überschrieben, um häufigere Aktualisierungen zu ermöglichen.

Schließlich verwendet Prometheus die Direktiven _static_configs_ und _targets_, um festzustellen, wo Exporter ausgeführt werden. Da dieser Exporter auf demselben Server wie Prometheus selbst läuft, können wir localhost anstelle einer IP-Adresse zusammen mit dem Standardport 9090 verwenden.

Ihre Konfigurationsdatei sollte jetzt wie folgt aussehen:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Speichern Sie die Datei und beenden Sie Ihren Texteditor.

Legen Sie nun die Benutzer- und Gruppenbesitzrechte für die Konfigurationsdatei auf den in Schritt 1 erstellten prometheus-Benutzer fest.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
Mit der Konfiguration abgeschlossen sind wir bereit, Prometheus zum ersten Mal auszuführen.

## Schritt 4 - Prometheus ausführen

Starten Sie Prometheus als Benutzer _prometheus_ und geben Sie den Pfad zur Konfigurationsdatei und zum Datenverzeichnis an.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

Die Ausgabe enthält Informationen zum Ladevorgang von Prometheus, zur Konfigurationsdatei und zu verwandten Diensten. Sie bestätigt auch, dass Prometheus auf Port _9090_ lauscht.

```
_log output_
Sep 14 17:55:53 robonomics systemd[1]: Started Prometheus.
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="No time or size retention was set so using the default time retention" duration=15d
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="Starting Prometheus" version="(version=2.21.0, branch=HEAD, revision=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2, user=root@a4d9bea8479e, date=20200911-11:35:02)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(soft=1024, hard=4096)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(soft=unlimited, hard=unlimited)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="Starting TSDB ..."
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.368Z caller=web.go:523 component=web msg="Start listening for connections" address=0.0.0.0:9090
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.372Z caller=head.go:644 component=tsdb msg="Replaying on-disk memory mappable chunks if any"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:658 component=tsdb msg="On-disk memory mappable chunks replay completed" duration=12.659µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:664 component=tsdb msg="Replaying WAL, this may take a while"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.380Z caller=head.go:716 component=tsdb msg="WAL segment loaded" segment=0 maxSegment=1
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:716 component=tsdb msg="WAL segment loaded" segment=1 maxSegment=1
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:719 component=tsdb msg="WAL replay completed" checkpoint_replay_duration=48.125µs wal_replay_duration=8.253748ms total_replay_duration=8.343335ms
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.383Z caller=main.go:721 fs_type=EXT4_SUPER_MAGIC
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="TSDB started"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="Loading configuration file" filename=/etc/prometheus/prometheus.yml
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="Completed loading of configuration file" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="Server is ready to receive web requests."
```
Wenn Sie eine Fehlermeldung erhalten, überprüfen Sie, ob Sie die YAML-Syntax in Ihrer Konfigurationsdatei verwendet haben, und befolgen Sie dann die Bildschirmanweisungen zur Behebung des Problems.

Halten Sie nun Prometheus an, indem Sie _STRG+C_ drücken, und öffnen Sie dann eine neue _systemd_-Service-Datei.

```
sudo nano /etc/systemd/system/prometheus.service

```
Die Service-Datei gibt _systemd_ an, Prometheus als Benutzer prometheus auszuführen, wobei die Konfigurationsdatei im Verzeichnis _/etc/prometheus/prometheus.yml_ und die Daten im Verzeichnis _/var/lib/prometheus_ gespeichert werden sollen. Kopieren Sie den folgenden Inhalt in die Datei:

```
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

Speichern Sie die Datei schließlich und schließen Sie Ihren Texteditor. Um den neu erstellten Service zu verwenden, laden Sie systemd neu.

```
sudo systemctl daemon-reload

```
Sie können Prometheus jetzt mit dem folgenden Befehl starten:

```
sudo systemctl start prometheus

```
Um sicherzustellen, dass Prometheus läuft, überprüfen Sie den Status des Dienstes.

```
sudo systemctl status prometheus

```
Die Ausgabe gibt Ihnen Informationen über den Status von Prometheus, die Hauptprozesskennung (PID), den Speicherverbrauch und mehr.

Wenn der Status des Dienstes nicht aktiv ist, befolgen Sie die Anweisungen auf dem Bildschirm und gehen Sie die vorherigen Schritte erneut durch, um das Problem zu beheben, bevor Sie das Tutorial fortsetzen.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Wenn Sie bereit sind, fahren Sie fort, indem Sie _Q_ drücken, um den Statusbefehl zu beenden. Aktivieren Sie abschließend den Dienst, um beim Start zu starten.

```
sudo systemctl enable prometheus

```

Jetzt, da Prometheus läuft, können wir einen zusätzlichen Exporter installieren, um Metriken über die Ressourcen unseres Servers zu generieren.

## Schritt 5 - Herunterladen des Node Exporters

Um Prometheus über Metriken nur über sich selbst hinaus zu erweitern, installieren wir einen zusätzlichen Exporter namens Node Exporter. Node Exporter liefert detaillierte Informationen über das System, einschließlich CPU-, Festplatten- und Speichernutzung. Laden Sie die aktuelle stabile Version von Node Exporter in Ihr Home-Verzeichnis herunter. Die neuesten Binärdateien finden Sie auf der [Prometheus-Downloadseite.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Entpacken Sie nun das heruntergeladene Archiv.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Dadurch wird ein Verzeichnis namens _node_exporter-1.0.1.linux-amd64_ erstellt, das eine Binärdatei namens _node_exporter_, eine Lizenz und einen Hinweis enthält.

Kopieren Sie die Binärdatei in das Verzeichnis _/usr/local/bin_ und setzen Sie die Benutzer- und Gruppenbesitzrechte auf den node_exporter-Benutzer, den Sie in Schritt 1 erstellt haben.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Jetzt, da Sie Node Exporter installiert haben, testen wir es, indem wir es ausführen, bevor wir eine Dienstdatei dafür erstellen, damit es beim Starten gestartet wird.

## Schritt 6 - Ausführen des Node Exporters

Die Schritte zum Ausführen des Node Exporters ähneln denen zum Ausführen von Prometheus selbst. Beginnen Sie damit, die Systemd-Dienstdatei für den Node Exporter zu erstellen.

```
sudo nano /etc/systemd/system/node_exporter.service

```
Kopieren Sie den folgenden Inhalt in die Dienstdatei:

```
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter --collector.systemd

[Install]
WantedBy=multi-user.target
```

Speichern Sie die Datei und schließen Sie Ihren Texteditor. Aktualisieren Sie schließlich systemd, um den neu erstellten Dienst zu verwenden.

```
sudo systemctl daemon-reload

```
Sie können Node Exporter jetzt mit dem folgenden Befehl ausführen:

```
sudo systemctl start node_exporter

```
Überprüfen that Node Exporter’s running correctly with the status command.

```
sudo systemctl status node_exporter

```
Wie zuvor gibt Ihnen diese Ausgabe Informationen über den Status von Node Exporter, die Hauptprozess-ID (PID), den Speicherverbrauch und mehr. Wenn der Status des Dienstes nicht aktiv ist, folgen Sie den Bildschirmanweisungen und gehen Sie die vorherigen Schritte erneut durch, um das Problem zu beheben, bevor Sie fortfahren.

```
_Output_
* node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:58:25 CEST; 1 day 1h ago
 Main PID: 29612 (node_exporter)
    Tasks: 7 (limit: 4915)
   CGroup: /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd
```
Schließlich aktivieren Sie Node Exporter, um beim Start zu starten.

```
sudo systemctl enable node_exporter

```
Nachdem Node Exporter vollständig konfiguriert und wie erwartet ausgeführt wird, teilen wir Prometheus mit, dass es die neuen Metriken abrufen soll.

## Schritt 7 - Konfigurieren von Prometheus zum Abrufen von Node Exporter

Da Prometheus nur Exporter abruft, die in der scrape_configs-Sektion seiner Konfigurationsdatei definiert sind, müssen wir einen Eintrag für Node Exporter hinzufügen, genau wie wir es für Prometheus selbst getan haben. Öffnen Sie die Konfigurationsdatei.

```
sudo nano /etc/prometheus/prometheus.yml

```
Fügen Sie am Ende des scrape_configs-Blocks einen neuen Eintrag namens node_exporter hinzu.

```
...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
Da dieser Exporter auch auf demselben Server wie Prometheus selbst läuft, können wir erneut localhost anstelle einer IP-Adresse verwenden, zusammen mit dem Standardport von Node Exporter, 9100. Ihre gesamte Konfigurationsdatei sollte wie folgt aussehen:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
Speichern Sie die Datei und beenden Sie Ihren Texteditor, wenn Sie bereit sind, fortzufahren. Starten Sie schließlich Prometheus neu, um die Änderungen wirksam zu machen.

```
sudo systemctl restart prometheus

```
Überprüfen Sie erneut mit dem Befehl status, ob alles korrekt ausgeführt wird.

```
sudo systemctl status prometheus

```
Wenn der Status des Dienstes nicht auf aktiv gesetzt ist, folgen Sie den Bildschirmanweisungen und gehen Sie Ihre vorherigen Schritte erneut durch, bevor Sie fortfahren.

```
Output
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-09-15 19:06:56 CEST; 2s ago
 Main PID: 19725 (prometheus)
    Tasks: 8 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Wir haben jetzt Prometheus und Node Exporter installiert, konfiguriert und laufen lassen.

## Schritt 8 - Hinzufügen des Robonomic-Builds in node_exporter

Nach erfolgreicher Installation von Prometheus und node_exporter müssen wir den integrierten Prometheus-Exporter in jedem Substratprojekt verwenden. Um dies zu erreichen, müssen wir einen zusätzlichen Eintrag zu _/etc/prometheus/prometheus.yml_ hinzufügen.. 
Öffnen Sie die Konfigurationsdatei.

```
sudo nano /etc/prometheus/prometheus.yml

```
Fügen Sie am Ende des scrape_configs-Blocks einen neuen Eintrag namens robonomic_exporter hinzu.

``` 
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
Speichern Sie die Datei und beenden Sie Ihren Texteditor. Ihre gesamte Konfigurationsdatei sollte wie folgt aussehen:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```

Starten Sie schließlich Prometheus neu, um die Änderungen wirksam zu machen.

```
sudo systemctl restart prometheus

```
Überprüfen Sie noch einmal mit dem Statusbefehl, ob alles korrekt läuft.

```
sudo systemctl status prometheus

```
Wir haben jetzt _Prometheus_ und _Node Exporter_ sowie _Robonomic Exporter_ installiert, konfiguriert und laufen. Gehen Sie nun zu Grafana

## Schritt 9 - Einrichten von Grafana

Der letzte Schritt besteht darin, Prometheus als Datenquelle in Grafana zu verbinden. Für dieses Tutorial verwenden wir eine kostenlose Cloud-basierte Grafana, die bis zu 5 Dashboards sowie ein dediziertes [Robonomics-Dashboard](https://grafana.com/grafana/dashboards/13015) ermöglicht. Gehen Sie einfach zu [grafana.com](https://grafana.com/), erstellen Sie ein neues Konto und melden Sie sich bei Ihrer neu erstellten Grafana-Instanz an.

Zu Beginn müssen wir Grafana eine neue _**Datenquelle**_ hinzufügen, die in unserem Fall der Prometheus-Server sein wird.
Gehen Sie zu Datenquelle:

>![DataSource](../images/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png)

Klicken Sie dann auf **_Datenquelle hinzufügen_**

>![DataSource](../images/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png)

Next auswählen _**Prometheus**_

>![DataSource](../images/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png)

Geben Sie im neuen Bildschirm Ihre **_Prometheus-Server-IP-Adresse mit Port 9090_** ein

> ![DataSource](../images/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png)

Danach _**Speichern & Testen**_, wenn Sie alle Schritte durchgeführt haben, sollte alles grün sein und bereit sein, das Dashboard zu importieren. Klicken Sie auf der Hauptseite auf **+** und dann auf **Importieren**, wie im Bild unten gezeigt:

> ![Import dashboard](../images/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png)

Dann sollten Sie die Importseite sehen:

> ![Import page](../images/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png)

Geben Sie in der _Grafana.com Dashboard-URL oder ID_ _**13015**_ ein (da dies die ID des Robonomic-Dashboards ist)

> ![Import Robonomic dashboard](../images/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png)

Nach dem Laden des externen Dashboards erhalten Sie diesen Bildschirm:

> ![XRT 13015 dashboard import](../images/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png)

Der letzte Schritt besteht darin, die zuvor erstellte **_Datenquelle_** auszuwählen und auf _**Importieren**_ zu klicken

> ![Prometheus as a DataSource](../images/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png)

DAS IST ES! An diesem Punkt sollten Sie das importierte Dashboard sehen. 


## Referenzen

* [Anleitung zur Installation von Prometheus auf Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Erstellen eines Überwachungsdashboards mit Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Grafana-Unterstützung für Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Überwachung von Linux-Hostmetriken mit dem Node Exporter](https://prometheus.io/docs/guides/node-exporter/)
* [Abfragen von Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Visualisierung von Knotenmetriken](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Substrate Prometheus Exporter](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Polkadot-Knotenmetrik](https://grafana.com/grafana/dashboards/12425)
* [Node Exporter für Prometheus Dashboard](https://grafana.com/grafana/dashboards/11074)
* [Grafana ROBONOMICS (XRT) Metriken](https://grafana.com/grafana/dashboards/13015)

