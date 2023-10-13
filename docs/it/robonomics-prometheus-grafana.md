---
title: Robonomics + Prometheus + Grafana 

contributors: [Vourhey]
---

**L'istruzione seguente è fornita da [Hubo Bubo](https://github.com/hubobubo)**

**L'articolo originale si trova [qui](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Introduzione
Per monitorare e mantenere meglio il/i nodo/i Robonomics, è bene configurare un monitoraggio basato su Prometheus Server e Grafana. Questo documento mostrerà come configurare ciascuno di essi per monitorare completamente il tuo nodo.

##  Prerequisiti
* [Configurazione del server con Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) 
* [Collator parachain Robonomics installato](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Assicurati che robonomics.service funzioni sulla tua macchina e che la porta 9615 sia raggiungibile 

## Passo 1 - Creazione degli utenti di servizio

Per motivi di sicurezza, inizieremo creando due nuovi account utente, prometheus e node_exporter. Crea questi due utenti e utilizza le opzioni _--no-create-home_ e _--shell /bin/false_ in modo che questi utenti non possano accedere al server.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Prima di scaricare i binari di Prometheus, crea le directory necessarie per archiviare i file e i dati di Prometheus. Seguendo le convenzioni standard di Linux, creeremo una directory in _/etc_ per i file di configurazione di Prometheus e una directory in _/var/lib_ per i suoi dati.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Ora, imposta la proprietà dell'utente e del gruppo sulle nuove directory per l'utente prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Passo 2 - Download di Prometheus

Innanzitutto, scarica e decomprimi la versione stabile corrente di Prometheus nella tua directory home. Puoi trovare gli ultimi binari sulla [pagina di download di Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Ora, decomprimi l'archivio scaricato.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Questo creerà una directory chiamata prometheus-2.21.0.linux-amd64 contenente due file binari (prometheus e promtool), le directory _consoles_ e _console_libraries_ contenenti i file dell'interfaccia web, una licenza, un avviso e diversi file di esempio.

Copia i due binari nella directory _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Imposta la proprietà dell'utente e del gruppo sui binari per l'utente prometheus creato nel Passo 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Copia le directory consoles e _console_libraries_ in _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Imposta la proprietà dell'utente e del gruppo sulle directory per l'utente prometheus. Utilizzando l'opzione -R garantirai che la proprietà venga impostata anche sui file all'interno della directory.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Ora che Prometheus è installato, creeremo i suoi file di configurazione e di servizio in preparazione del suo primo avvio.

## Passo 3 - Configurazione di Prometheus

Nella directory _/etc/prometheus_, utilizza nano o il tuo editor di testo preferito per creare un file di configurazione chiamato _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
Nelle impostazioni globali, definisci l'intervallo predefinito per il recupero delle metriche. Nota che Prometheus applicherà queste impostazioni a ogni esportatore a meno che le impostazioni proprie dell'esportatore stesso non sovrascrivano le impostazioni globali.

```
global:
  scrape_interval: 15s

```
Questo valore di scrape_interval indica a Prometheus di raccogliere le metriche dai suoi esportatori ogni 15 secondi, che è sufficientemente lungo per la maggior parte degli esportatori.
Ora, aggiungi Prometheus stesso all'elenco degli esportatori da cui effettuare il recupero con la seguente direttiva scrape_configs:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheus utilizza il _job_name_ per etichettare gli esportatori nelle query e sui grafici, quindi assicurati di scegliere qualcosa di descrittivo qui.

E poiché Prometheus esporta dati importanti su se stesso che puoi utilizzare per monitorare le prestazioni e il debug, abbiamo sovrascritto la direttiva globale scrape_interval da 15 secondi a 5 secondi per aggiornamenti più frequenti.

Infine, Prometheus utilizza le direttive _static_configs_ e _targets_ per determinare dove vengono eseguiti gli esportatori. Poiché questo particolare esportatore viene eseguito sullo stesso server di Prometheus stesso, possiamo utilizzare localhost invece di un indirizzo IP insieme alla porta predefinita, 9090.

Il tuo file di configurazione dovrebbe ora apparire così:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Salva il file ed esci dal tuo editor di testo.

Ora, imposta la proprietà dell'utente e del gruppo sul file di configurazione per l'utente prometheus creato nel Passo 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
Con la configurazione completata, siamo pronti per testare Prometheus eseguendolo per la prima volta.

## Passo 4 - Esecuzione di Prometheus

Avvia Prometheus come utente _prometheus_, fornendo il percorso sia al file di configurazione che alla directory dei dati.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

L'output contiene informazioni sul progresso di caricamento di Prometheus, il file di configurazione e i servizi correlati. Conferma anche che Prometheus è in ascolto sulla porta _9090_.

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
Se ricevi un messaggio di errore, controlla due volte di aver utilizzato la sintassi YAML nel tuo file di configurazione e segui le istruzioni visualizzate per risolvere il problema.

Ora, interrompi Prometheus premendo _CTRL+C_, e poi apri un nuovo file di servizio _systemd_.

```
sudo nano /etc/systemd/system/prometheus.service

```
Il file di servizio dice a _systemd_ di eseguire Prometheus come utente prometheus, con il file di configurazione situato nella directory _/etc/prometheus/prometheus.yml_ e di memorizzare i dati nella directory _/var/lib/prometheus_. Copia il seguente contenuto nel file:

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

Infine, salva il file e chiudi il tuo editor di testo. Per utilizzare il servizio appena creato, ricarica systemd.

```
sudo systemctl daemon-reload

```
Ora puoi avviare Prometheus utilizzando il seguente comando:

```
sudo systemctl start prometheus

```
Per assicurarti che Prometheus sia in esecuzione, controlla lo stato del servizio.

```
sudo systemctl status prometheus

```
L'output ti indica lo stato di Prometheus, l'identificatore del processo principale (PID), l'utilizzo della memoria e altro ancora.

Se lo stato del servizio non è attivo, segui le istruzioni visualizzate e ripercorri i passaggi precedenti per risolvere il problema prima di continuare il tutorial.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Quando sei pronto per passare avanti, premi _Q_ per uscire dal comando di stato. Infine, abilita il servizio per l'avvio automatico.

```
sudo systemctl enable prometheus

```

Ora che Prometheus è in esecuzione, possiamo installare un exporter aggiuntivo per generare metriche sulle risorse del nostro server.

## Passaggio 5 — Download di Node Exporter

Per espandere Prometheus oltre le sole metriche su se stesso, installeremo un exporter aggiuntivo chiamato Node Exporter. Node Exporter fornisce informazioni dettagliate sul sistema, inclusi l'utilizzo della CPU, del disco e della memoria. Scarica la versione stabile più recente di Node Exporter nella tua directory home. Puoi trovare le ultime versioni binarie sulla [pagina di download di Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Ora, decomprimi l'archivio scaricato.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Questo creerà una directory chiamata _node_exporter-1.0.1.linux-amd64_ contenente un file binario chiamato _node_exporter_, una licenza e una nota.

Copia il binario nella directory _/usr/local/bin_ e imposta l'utente e il gruppo di proprietà sull'utente node_exporter che hai creato nel Passaggio 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Ora che hai installato Node Exporter, testiamolo eseguendolo prima di creare un file di servizio in modo che parta all'avvio.

## Passaggio 6 — Esecuzione di Node Exporter

I passaggi per l'esecuzione di Node Exporter sono simili a quelli per l'esecuzione di Prometheus stesso. Inizia creando il file di servizio Systemd per Node Exporter.

```
sudo nano /etc/systemd/system/node_exporter.service

```
Copia il seguente contenuto nel file di servizio:

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

Salva il file e chiudi il tuo editor di testo. Infine, ricarica systemd per utilizzare il servizio appena creato.

```
sudo systemctl daemon-reload

```
Ora puoi eseguire Node Exporter utilizzando il seguente comando:

```
sudo systemctl start node_exporter

```
Verifica that Node Exporter’s running correctly with the status command.

```
sudo systemctl status node_exporter

```
Come prima, questo output ti indica lo stato di Node Exporter, l'identificatore del processo principale (PID), l'utilizzo della memoria e altro ancora. Se lo stato del servizio non è attivo, segui i messaggi visualizzati e ripercorri i passaggi precedenti per risolvere il problema prima di continuare.

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
Infine, abilita Node Exporter per l'avvio automatico.

```
sudo systemctl enable node_exporter

```
Con Node Exporter completamente configurato e in esecuzione come previsto, diremo a Prometheus di iniziare a raccogliere le nuove metriche.

## Passaggio 7 — Configurazione di Prometheus per raccogliere Node Exporter

Poiché Prometheus raccoglie solo exporter definiti nella sezione scrape_configs del suo file di configurazione, dovremo aggiungere una voce per Node Exporter, proprio come abbiamo fatto per Prometheus stesso. Apri il file di configurazione.

```
sudo nano /etc/prometheus/prometheus.yml

```
Alla fine del blocco scrape_configs, aggiungi una nuova voce chiamata node_exporter.

```
...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
Poiché questo exporter viene eseguito anche sullo stesso server di Prometheus stesso, possiamo utilizzare localhost invece di un indirizzo IP insieme alla porta predefinita di Node Exporter, 9100. L'intero file di configurazione dovrebbe apparire così:

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
Salva il file ed esci dal tuo editor di testo quando sei pronto a continuare. Infine, riavvia Prometheus per mettere in atto le modifiche.

```
sudo systemctl restart prometheus

```
Ancora una volta, verifica che tutto funzioni correttamente con il comando di stato.

```
sudo systemctl status prometheus

```
Se lo stato del servizio non è impostato su attivo, segui le istruzioni visualizzate e ripercorri i passaggi precedenti prima di procedere.

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

Ora abbiamo installato, configurato ed eseguito Prometheus e Node Exporter.

## Passaggio 8 - Aggiunta di Robonomic build in node_exporter

Dopo aver installato correttamente Prometheus e node_exporter, dovremo utilizzare l'exporter integrato di Prometheus in ogni progetto di substrato. Per fare ciò, dobbiamo aggiungere una voce aggiuntiva a _/etc/prometheus/prometheus.yml_. 
Apri il file di configurazione.

```
sudo nano /etc/prometheus/prometheus.yml

```
Alla fine del blocco scrape_configs, aggiungi una nuova voce chiamata robonomic_exporter.

``` 
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
Salva il file ed esci dal tuo editor di testo. L'intero file di configurazione dovrebbe apparire così:

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

Infine, riavvia Prometheus per rendere effettive le modifiche.

```
sudo systemctl restart prometheus

```
Ancora una volta, verifica che tutto funzioni correttamente con il comando di stato.

```
sudo systemctl status prometheus

```
Ora abbiamo Prometheus, Node Exporter e Robonomic Exporter installati, configurati e in esecuzione. Ora passa a Grafana.

## Passo 9 - Configurazione di Grafana

Ultimo passo: collegare Prometheus come origine dati in Grafana. Per questo tutorial utilizzeremo una versione cloud gratuita di Grafana che consente di avere fino a 5 dashboard e una dashboard dedicata a Robonomics. Vai semplicemente su grafana.com, crea un nuovo account e accedi alla tua istanza di Grafana appena creata.

All'inizio dobbiamo aggiungere a Grafana una nuova **origine dati** che nel nostro caso sarà il server Prometheus.
Vai su Origine dati:

>![DataSource](../images/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png)

Quindi clicca su **Aggiungi origine dati**

>![DataSource](../images/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png)

Next seleziona _**Prometheus**_

>![DataSource](../images/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png)

Nella nuova schermata inserisci l'**indirizzo IP del server Prometheus con la porta 9090**

> ![DataSource](../images/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png)

Dopo di che, clicca su **Salva e testa**. Se hai seguito tutti i passaggi, dovresti vedere il colore verde e essere pronto per importare la dashboard. Sulla pagina principale clicca su **+** e poi su **Importa** come mostrato nell'immagine qui sotto:

> ![Import dashboard](../images/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png)

Successivamente dovresti vedere la pagina di importazione:

> ![Import page](../images/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png)

Nel campo _URL o ID della dashboard di Grafana.com_ scrivi **13015** (questo è l'ID della dashboard di Robonomic)

> ![Import Robonomic dashboard](../images/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png)

Dopo aver caricato la dashboard esterna, vedrai questa schermata:

> ![XRT 13015 dashboard import](../images/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png)

L'ultimo passo è scegliere la **Origine dati** precedentemente creata e cliccare su **Importa**

> ![Prometheus as a DataSource](../images/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png)

Ecco fatto! A questo punto dovresti vedere la dashboard importata. 


## Riferimenti

* [Come installare Prometheus su Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Creare una dashboard di monitoraggio con Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Supporto di Grafana per Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Monitoraggio delle metriche di un host Linux con il node exporter](https://prometheus.io/docs/guides/node-exporter/)
* [Interrogare Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Visualizzare le metriche del nodo](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Exporter di Prometheus per Substrate](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Metriche del nodo Polkadot](https://grafana.com/grafana/dashboards/12425)
* [Node Exporter per Prometheus Dashboard](https://grafana.com/grafana/dashboards/11074)
* [Metriche ROBONOMICS (XRT) di Grafana](https://grafana.com/grafana/dashboards/13015)

