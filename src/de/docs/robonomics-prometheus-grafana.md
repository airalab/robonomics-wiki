---
title: Robonomics + Prometheus + Grafana

contributors: [Vourhey]
---

**Die folgende Anleitung stammt von [Hubo Bubo](https://github.com/hubobubo)**

**Der Originalartikel befindet sich [hier](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Einführung
Um Robonomics-Knoten besser zu überwachen und zu warten, ist es gut, ein Monitoring auf Basis des Prometheus-Servers und von Grafana einzurichten. Dieses Dokument zeigt, wie man jedes davon konfiguriert, um Ihren Knoten vollständig zu überwachen.

## Voraussetzungen
* [Servereinrichtung mit Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
* [Robonomics-Parachain-Collator installiert](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Stellen Sie sicher, dass robonomics.service auf Ihrem Rechner läuft und der Port 9615 erreichbar ist

## Schritt 1 — Erstellen von Benutzerkonten

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
Legen Sie nun die Benutzer- und Gruppenbesitzrechte auf den neuen Verzeichnissen auf den Benutzer prometheus fest.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Schritt 2 — Herunterladen von Prometheus

Laden Sie zunächst die aktuelle stabile Version von Prometheus herunter und entpacken Sie sie in Ihr Home-Verzeichnis. Die neuesten Binärdateien finden Sie auf der [Prometheus-Downloadseite.](https://prometheus.io/download/)

```wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Jetzt das heruntergeladene Archiv entpacken.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Dadurch wird ein Verzeichnis namens prometheus-2.21.0.linux-amd64 erstellt, das zwei ausführbare Dateien (prometheus und promtool), Verzeichnisse _consoles_ und _console_libraries_ mit den Dateien der Webschnittstelle, eine Lizenz, einen Hinweis und mehrere Beispieldateien enthält.

Kopieren Sie die beiden ausführbaren Dateien in das Verzeichnis _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Legen Sie die Benutzer- und Gruppenberechtigungen für die ausführbaren Dateien auf den in Schritt 1 erstellten Benutzer prometheus fest.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Kopieren Sie die Verzeichnisse _consoles_ und _console_libraries_ nach _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Legen Sie die Benutzer- und Gruppenberechtigungen für die Verzeichnisse auf den Benutzer prometheus fest. Mit der Option -R wird sichergestellt, dass die Berechtigungen auch für die Dateien im Verzeichnis gesetzt werden.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Jetzt, da Prometheus installiert ist, werden wir seine Konfigurations- und Dienstdateien erstellen, um ihn für seinen ersten Start vorzubereiten.

## Schritt 3 — Konfiguration von Prometheus

Im Verzeichnis _/etc/prometheus_ verwenden Sie nano oder Ihren bevorzugten Texteditor, um eine Konfigurationsdatei mit dem Namen _prometheus.yml_ zu erstellen.

```
sudo nano /etc/prometheus/prometheus.yml

```
Definieren Sie in den globalen Einstellungen das Standardintervall für das Abrufen von Metriken. Beachten Sie, dass Prometheus diese Einstellungen auf jeden Exporter anwendet, es sei denn, die eigenen Einstellungen eines einzelnen Exporters überschreiben die globalen Einstellungen.

```
global:
  scrape_interval: 15s

```
Dieser scrape_interval-Wert teilt Prometheus mit, dass Metriken von seinen Exportern alle 15 Sekunden gesammelt werden sollen, was für die meisten Exporteure ausreichend ist.
Fügen Sie nun Prometheus selbst zur Liste der Exporteure hinzu, von denen mit der folgenden scrape_configs-Anweisung gescraped werden soll:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheus verwendet den _job_name_, um Exporteure in Abfragen und auf Diagrammen zu kennzeichnen. Wählen Sie also hier etwas Beschreibendes aus.

Und da Prometheus wichtige Daten über sich selbst exportiert, die Sie zur Überwachung der Leistung und zur Fehlerbehebung verwenden können, haben wir die globale scrape_interval-Anweisung von 15 Sekunden auf 5 Sekunden für häufigere Aktualisierungen überschrieben.

Schließlich verwendet Prometheus die Anweisungen _static_configs_ und _targets_, um festzustellen, wo Exporteure ausgeführt werden. Da dieser bestimmte Exporteur auf demselben Server wie Prometheus selbst läuft, können wir localhost anstelle einer IP-Adresse zusammen mit dem Standardport 9090 verwenden.

Ihre Konfigurationsdatei sollte jetzt so aussehen:

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

Legen Sie nun die Benutzer- und Gruppenberechtigungen für die Konfigurationsdatei auf den in Schritt 1 erstellten Benutzer prometheus fest.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
Mit der Konfiguration abgeschlossen, sind wir bereit, Prometheus zum ersten Mal zu testen.

## Schritt 4 — Prometheus ausführen

Starten Sie Prometheus als Benutzer _prometheus_, indem Sie den Pfad sowohl zur Konfigurationsdatei als auch zum Datenverzeichnis angeben.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

Die Ausgabe enthält Informationen über den Ladevorgang von Prometheus, die Konfigurationsdatei und die zugehörigen Dienste. Es bestätigt auch, dass Prometheus auf Port _9090_ lauscht.

```
_log output_
Sep 14 17:55:53 robonomics systemd[1]: Started Prometheus.
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="Es wurde keine Zeit- oder Größenretention festgelegt, daher wird die Standardzeitretention verwendet" Dauer=15d
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="Starte Prometheus" Version="(Version=2.21.0, Branch=HEAD, Revision=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2, Benutzer=root@a4d9bea8479e, Datum=20200911-11:35:02)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Do Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(soft=1024, hard=4096)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(soft=unbegrenzt, hard=unbegrenzt)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="Starte TSDB ..."2020-09-14T15:55:53.368Z Anrufer=web.go:523 Komponente=web msg="Beginne mit dem Empfang von Verbindungen" Adresse=0.0.0.0:9090
14. Sep 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.372Z Anrufer=head.go:644 Komponente=tsdb msg="Wiedergabe von auf Festplatte gespeicherten Speicherbereichen, falls vorhanden"
14. Sep 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z Anrufer=head.go:658 Komponente=tsdb msg="Wiedergabe von auf Festplatte gespeicherten Speicherbereichen abgeschlossen" Dauer=12.659µs
14. Sep 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z Anrufer=head.go:664 Komponente=tsdb msg="Wiedergabe des Write-Ahead-Logs, dies kann eine Weile dauern"
14. Sep 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.380Z Anrufer=head.go:716 Komponente=tsdb msg="Write-Ahead-Log-Segment geladen" Segment=0 MaxSegment=1
14. Sep 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z Anrufer=head.go:716 Komponente=tsdb msg="Write-Ahead-Log-Segment geladen" Segment=1 MaxSegment=1
14. Sep 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z Anrufer=head.go:719 Komponente=tsdb msg="WAL-Wiedergabe abgeschlossen" Checkpoint_Replay_Dauer=48.125µs WAL_Wiedergabe_Dauer=8.253748ms Gesamte_Wiedergabe_Dauer=8.343335ms
14. Sep 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.383Z Anrufer=main.go:721 fs_type=EXT4_SUPER_MAGIC
14. Sep 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="TSDB gestartet"
14. Sep 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="Lade Konfigurationsdatei" Dateiname=/etc/prometheus/prometheus.yml
14. Sep 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="Laden der Konfigurationsdatei abgeschlossen" Dateiname=/etc/prometheus/prometheus.yml Gesamtdauer=908.135µs Remote-Speicher=6.693µs Web-Handler=819ns Abfrage-Engine=1.383µs Abruf=400.232µs Abruf_sd=41.679µs Benachrichtigung=1.1µs Benachrichtigung_sd=1.847µs Regeln=1.522µs
14. Sep 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="Server ist bereit, Webanfragen zu empfangen."

Wenn Sie eine Fehlermeldung erhalten, überprüfen Sie, ob Sie die YAML-Syntax in Ihrer Konfigurationsdatei verwendet haben, und befolgen Sie dann die Bildschirmanweisungen, um das Problem zu lösen.

Halten Sie nun Prometheus an, indem Sie _STRG+C_ drücken, und öffnen Sie dann eine neue _systemd_-Dienstdatei.

```
sudo nano /etc/systemd/system/prometheus.service

```
Die Dienstdatei gibt _systemd_ an, Prometheus als Benutzer prometheus auszuführen, wobei die Konfigurationsdatei im Verzeichnis _/etc/prometheus/prometheus.yml_ liegt und seine Daten im Verzeichnis _/var/lib/prometheus_ gespeichert werden. Kopieren Sie den folgenden Inhalt in die Datei:

```
[Unit]
Beschreibung=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
Benutzer=prometheus
Gruppe=prometheus
Typ=einfach
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

Speichern Sie die Datei und schließen Sie Ihren Texteditor. Um den neu erstellten Dienst zu verwenden, laden Sie systemd neu.

```
sudo systemctl daemon-reload

```
Sie können nun Prometheus mit folgendem Befehl starten:

```
sudo systemctl start prometheus

```
Um sicherzustellen, dass Prometheus läuft, überprüfen Sie den Status des Dienstes.

```
sudo systemctl status prometheus

```
Die Ausgabe zeigt Ihnen den Status von Prometheus, die Hauptprozess-ID (PID), den Speicherverbrauch und mehr.

Wenn der Status des Dienstes nicht aktiv ist, befolgen Sie die Bildschirmanweisungen und gehen Sie die vorherigen Schritte erneut durch, um das Problem zu lösen, bevor Sie das Tutorial fortsetzen.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Wenn Sie bereit sind, weiterzumachen, drücken Sie _Q_, um den Statusbefehl zu beenden. Aktivieren Sie abschließend den Dienst, um ihn beim Booten zu starten.

```
sudo systemctl enable prometheus

```

Jetzt, da Prometheus läuft, können wir einen zusätzlichen Exporter installieren, um Metriken über die Ressourcen unseres Servers zu generieren.

## Schritt 5 — Herunterladen des Node Exporters

Um Prometheus über Metriken nur über sich selbst hinaus zu erweitern, installieren wir einen zusätzlichen Exporter namens Node Exporter. Node Exporter liefert detaillierte Informationen über das System, einschließlich CPU-, Festplatten- und Speicherauslastung. Laden Sie die aktuelle stabile Version des Node Exporters in Ihr Home-Verzeichnis herunter. Die neuesten Binärdateien finden Sie auf der [Prometheus-Downloadseite.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Entpacken Sie nun das heruntergeladene Archiv.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Dies erstellt ein Verzeichnis namens _node_exporter-1.0.1.linux-amd64_, das eine ausführbare Datei namens _node_exporter_, eine Lizenz und einen Hinweis enthält.

Kopieren Sie die ausführbare Datei in das Verzeichnis _/usr/local/bin_ und setzen Sie den Benutzer- und Gruppenbesitz auf den node_exporter-Benutzer, den Sie in Schritt 1 erstellt haben.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Jetzt, da Sie Node Exporter installiert haben, testen Sie es, indem Sie es ausführen, bevor Sie eine Dienstdatei dafür erstellen, damit es beim Booten startet.

## Schritt 6 — Node Exporter ausführen

Die Schritte zum Ausführen von Node Exporter ähneln denen zum Ausführen von Prometheus selbst. Beginnen Sie damit, die Systemd-Dienstdatei für Node Exporter zu erstellen.

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
Sie können Node Exporter jetzt mit folgendem Befehl ausführen:

```
sudo systemctl start node_exporter

```
Überprüfen Sie, ob Node Exporter ordnungsgemäß läuft, indem Sie den Status-Befehl verwenden.

```
sudo systemctl status node_exporter

```
Wie zuvor zeigt Ihnen diese Ausgabe den Status von Node Exporter, die Hauptprozess-ID (PID), den Speicherverbrauch und mehr an. Wenn der Status des Dienstes nicht aktiv ist, folgen Sie den Bildschirmanweisungen und verfolgen Sie die vorherigen Schritte zurück, um das Problem zu lösen, bevor Sie fortfahren.

```
_Ausgabe_
* node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:58:25 CEST; 1 day 1h ago
 Main PID: 29612 (node_exporter)Aufgaben: 7 (Limit: 4915)
   CGroup: /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd

Zuletzt Node Exporter aktivieren, um beim Booten zu starten.

sudo systemctl enable node_exporter

Nachdem Node Exporter vollständig konfiguriert und wie erwartet läuft, sagen wir Prometheus, die neuen Metriken zu scannen.

## Schritt 7 — Konfigurieren von Prometheus zum Scannen von Node Exporter

Da Prometheus nur Exporteure scannt, die im scrape_configs-Abschnitt seiner Konfigurationsdatei definiert sind, müssen wir einen Eintrag für Node Exporter hinzufügen, genauso wie wir es für Prometheus selbst getan haben. Öffnen Sie die Konfigurationsdatei.

sudo nano /etc/prometheus/prometheus.yml

Am Ende des scrape_configs-Blocks fügen Sie einen neuen Eintrag namens node_exporter hinzu.

...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']

Da dieser Exporteur auch auf demselben Server wie Prometheus selbst läuft, können wir erneut localhost anstelle einer IP-Adresse verwenden, zusammen mit dem Standardport von Node Exporter, 9100. Ihre gesamte Konfigurationsdatei sollte so aussehen:

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

Speichern Sie die Datei und beenden Sie Ihren Texteditor, wenn Sie bereit sind, fortzufahren. Starten Sie schließlich Prometheus neu, um die Änderungen wirksam zu machen.

sudo systemctl restart prometheus

Überprüfen Sie erneut mit dem Befehl status, ob alles korrekt läuft.

sudo systemctl status prometheus

Wenn der Status des Dienstes nicht auf aktiv gesetzt ist, befolgen Sie die Bildschirmanweisungen und verfolgen Sie Ihre vorherigen Schritte, bevor Sie fortfahren.

Ausgabe
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-09-15 19:06:56 CEST; 2s ago
 Main PID: 19725 (prometheus)
    Tasks: 8 (Limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Wir haben jetzt Prometheus und Node Exporter installiert, konfiguriert und laufen.

## Schritt 8 - Hinzufügen des integrierten Node Exporters von Robonomic

Nach erfolgreicher Installation von Prometheus und Node Exporter müssen wir den integrierten Prometheus-Exporter in jedem Substrate-Projekt verwenden. Um dies zu erreichen, müssen wir einen zusätzlichen Eintrag in _/etc/prometheus/prometheus.yml_ hinzufügen.
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
Speichern Sie die Datei und verlassen Sie Ihren Texteditor. Ihre gesamte Konfigurationsdatei sollte wie folgt aussehen:

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
Überprüfen Sie erneut mit dem Statusbefehl, ob alles korrekt läuft.

```
sudo systemctl status prometheus

```
Wir haben jetzt _Prometheus_ und _Node Exporter_ sowie _Robonomic Exporter_ installiert, konfiguriert und laufen. Gehen Sie nun zu Grafana über.

## Schritt 9 - Einrichten von Grafana

Der letzte Schritt besteht darin, Prometheus als Datenquelle in Grafana zu verbinden. Für dieses Tutorial verwenden wir eine kostenlose cloudbasierte Grafana, die bis zu 5 Dashboards sowie ein dediziertes [Robonomics-Dashboard](https://grafana.com/grafana/dashboards/13015). Gehen Sie einfach zu [grafana.com](https://grafana.com/), erstellen Sie ein neues Konto und melden Sie sich bei Ihrer neu erstellten Grafana-Instanz an.

Zu Beginn müssen wir Grafana eine neue _**Datenquelle**_ hinzufügen, die in unserem Fall der Prometheus-Server sein wird.
Gehen Sie zu Datenquelle:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png", alt:"Datenquelle"} %}{% endroboWikiPicture %}

Klicken Sie dann auf **_Datenquelle hinzufügen_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png", alt:"Datenquelle"} %}{% endroboWikiPicture %}

Wählen Sie als Nächstes _**Prometheus**_ aus

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png", alt:"Datenquelle"} %}{% endroboWikiPicture %}

Geben Sie auf dem neuen Bildschirm Ihre **_IP-Adresse des Prometheus-Servers mit Port 9090_** ein

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png", alt:"Datenquelle"} %}{% endroboWikiPicture %}

Nachdem Sie das getan haben, klicken Sie auf _**Speichern & Testen**_. Wenn Sie alle Schritte ausgeführt haben, sollte alles grün sein und Sie sind bereit, das Dashboard zu importieren. Klicken Sie auf der Hauptseite auf **+** und dann auf **Import**, wie im Bild unten gezeigt:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png", alt:"Dashboard importieren"} %}{% endroboWikiPicture %}

Dann sollten Sie die Importseite sehen:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png", alt:"Importseite"} %}{% endroboWikiPicture %}

Geben Sie in der _Grafana.com-Dashboard-URL oder -ID_ _**13015**_ ein (da dies die ID des Robonomic-Dashboards ist):

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png", alt:"Import Robonomic dashboard"} %}{% endroboWikiPicture %}

Nach dem Laden des externen Dashboards erhalten Sie diesen Bildschirm:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png", alt:"XRT 13015 Dashboard-Import"} %}{% endroboWikiPicture %}

Der letzte Schritt besteht darin, die zuvor erstellte **_Datenquelle_** auszuwählen und auf _**Importieren**_ zu klicken.

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png", alt:"Prometheus als Datenquelle"} %}{% endroboWikiPicture %}

DAS IST ES! Zu diesem Zeitpunkt sollten Sie das importierte Dashboard sehen.


## Referenzen

* [Anleitung zur Installation von Prometheus auf Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Erstellen eines Überwachungsdashboards mit Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Grafana-Unterstützung für Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Überwachung von Linux-Hostmetriken mit dem Node Exporter](https://prometheus.io/docs/guides/node-exporter/)
* [Abfragen von Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Visualisierung von Knotenmetriken](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Substrate Prometheus Exporter](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [Polkadot-Dashboard](https://github.com/w3f/polkadot-dashboard)
* [Polkadot-Knotenmetrik](https://grafana.com/grafana/dashboards/12425)
* [Node Exporter für Prometheus-Dashboard](https://grafana.com/grafana/dashboards/11074)
* [Grafana ROBONOMICS (XRT) Metriken](https://grafana.com/grafana/dashboards/13015)