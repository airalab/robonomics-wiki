---
title: Robonomics + Prometheus + Grafana

contributors: [Vourhey]
---

**Le seguenti istruzioni sono fornite da [Hubo Bubo](https://github.com/hubobubo)**

**L'articolo originale si trova [qui](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Introduzione
Per monitorare e mantenere meglio il/i nodo/i di Robonomics è utile configurare un sistema di monitoraggio basato su Prometheus Server e Grafana. Questo documento mostrerà come configurare ciascuno di essi per monitorare completamente il tuo nodo.

## Prerequisiti
* [Configurazione del server con Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
* [Collatore di parachain di Robonomics installato](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Assicurati di avere robonomics.service funzionante sul tuo computer e che la porta 9615 sia raggiungibile

## Passo 1 — Creazione degli Utenti di Servizio

Per motivi di sicurezza, inizieremo creando due nuovi account utente, prometheus e node_exporter. Crea questi due utenti e utilizza le opzioni _--no-create-home_ e _--shell /bin/false_ in modo che questi utenti non possano accedere al server.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Prima di scaricare i binari di Prometheus, crea le directory necessarie per memorizzare i file e i dati di Prometheus. Seguendo le convenzioni standard di Linux, creeremo una directory in _/etc_ per i file di configurazione di Prometheus e una directory in _/var/lib_ per i suoi dati.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Ora, imposta la proprietà utente e gruppo sulle nuove directory per l'utente prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Passo 2 — Scaricamento di Prometheus

Innanzitutto, scarica e decomprimi la versione stabile attuale di Prometheus nella tua directory home. Puoi trovare gli ultimi binari sulla [pagina di download di Prometheus.](https://prometheus.io/download/)

```wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

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
Imposta la proprietà utente e gruppo sui binari all'utente prometheus creato nel Passaggio 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Copia le directory _consoles_ e _console_libraries_ in _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Imposta la proprietà utente e gruppo sulle directory all'utente prometheus. Utilizzando il flag -R garantirà che la proprietà sia impostata anche sui file all'interno della directory.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Ora che Prometheus è installato, creeremo i suoi file di configurazione e di servizio in preparazione del suo primo avvio.

## Passaggio 3 — Configurazione di Prometheus

Nella directory _/etc/prometheus_, utilizza nano o il tuo editor di testo preferito per creare un file di configurazione chiamato _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
Nelle impostazioni globali, definisci l'intervallo predefinito per il recupero delle metriche. Nota che Prometheus applicherà queste impostazioni a ogni esportatore a meno che le impostazioni proprie di un esportatore individuale non sovrascrivano le impostazioni globali.

```
global:
  scrape_interval: 15s

```
Questo valore di scrape_interval dice a Prometheus di raccogliere metriche dai suoi esportatori ogni 15 secondi, che è abbastanza lungo per la maggior parte degli esportatori.
Ora, aggiungi Prometheus stesso alla lista degli esportatori da cui effettuare lo scraping con la seguente direttiva scrape_configs:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheus utilizza il _job_name_ per etichettare gli esportatori nelle query e nei grafici, quindi assicurati di scegliere qualcosa di descrittivo qui.

E, poiché Prometheus esporta dati importanti su se stesso che puoi utilizzare per monitorare le prestazioni e il debug, abbiamo sovrascritto la direttiva globale scrape_interval da 15 secondi a 5 secondi per aggiornamenti più frequenti.

Infine, Prometheus utilizza le direttive _static_configs_ e _targets_ per determinare dove gli esportatori sono in esecuzione. Poiché questo particolare esportatore è in esecuzione sullo stesso server di Prometheus stesso, possiamo utilizzare localhost invece di un indirizzo IP insieme alla porta predefinita, 9090.

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

Ora, imposta l'utente e il gruppo proprietario sul file di configurazione sull'utente prometheus creato nel Passaggio 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
Con la configurazione completata, siamo pronti per testare Prometheus eseguendolo per la prima volta.

## Passaggio 4 — Esecuzione di Prometheus

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
_output del log_
Sep 14 17:55:53 robonomics systemd[1]: Started Prometheus.
Sep 14 17:5553 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.347Z chiamante=main.go:310 msg="Nessuna conservazione del tempo o della dimensione è stata impostata, quindi viene utilizzata la conservazione predefinita del tempo" durata=15d
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.350Z chiamante=main.go:346 msg="Avvio di Prometheus" versione="(versione=2.21.0, branch=HEAD, revision=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.351Z chiamante=main.go:347 contesto_build="(go=go1.15.2, utente=root@a4d9bea8479e, data=20200911-11:35:02)"
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.351Z chiamante=main.go:348 dettagli_host="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.351Z chiamante=main.go:349 limiti_fd="(soft=1024, hard=4096)"
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.351Z chiamante=main.go:350 limiti_vm="(soft=illimitato, hard=illimitato)"
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.357Z chiamante=main.go:701 msg="Avvio di TSDB ..."
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.368Z chiamante=web.go:523 componente=web msg="Inizio dell'ascolto delle connessioni" indirizzo=0.0.0.0:9090
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.372Z chiamante=head.go:644 componente=tsdb msg="Riproduzione dei chunk mappabili in memoria su disco se presenti"
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.373Z chiamante=head.go:658 componente=tsdb msg="Riproduzione completata dei chunk mappabili in memoria su disco" durata=12.659µs
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.373Z chiamante=head.go:664 componente=tsdb msg="Riproduzione del WAL, potrebbe richiedere del tempo"
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.380Z chiamante=head.go:716 componente=tsdb msg="Segmento WAL caricato" segmento=0 maxSegmento=1
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.381Z chiamante=head.go:716 componente=tsdb msg="Segmento WAL caricato" segmento=1 maxSegmento=1
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.381Z chiamante=head.go:719 componente=tsdb msg="Riproduzione del WAL completata" durata_riproduzione_checkpoint=48.125µs durata_riproduzione_wal=8.253748ms durata_riproduzione_totale=8.343335ms
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.383Z chiamante=main.go:721 tipo_fs=EXT4_SUPER_MAGIC
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.384Z chiamante=main.go:724 msg="TSDB avviato"
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.384Z chiamante=main.go:850 msg="Caricamento del file di configurazione" filename=/etc/prometheus/prometheus.yml
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.384Z chiamante=main.go:881 msg="Completato il caricamento del file di configurazione" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
14 set 17:55:53 robonomics prometheus[29488]: livello=info ts=2020-09-14T15:55:53.384Z chiamante=main.go:673 msg="Il server è pronto a ricevere richieste web."

Se ricevi un messaggio di errore, controlla di aver utilizzato la sintassi YAML nel file di configurazione e segui le istruzioni visualizzate sullo schermo per risolvere il problema.

Ora, interrompi Prometheus premendo _CTRL+C_, e poi apri un nuovo file di servizio _systemd_.

```
sudo nano /etc/systemd/system/prometheus.service

```
Il file di servizio indica a _systemd_ di eseguire Prometheus come utente prometheus, con il file di configurazione situato nella directory _/etc/prometheus/prometheus.yml_ e di memorizzare i dati nella directory _/var/lib/prometheus_. Copia il seguente contenuto nel file:

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
    --web.console.libraries```plaintext
/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

Infine, salva il file e chiudi il tuo editor di testo. Per utilizzare il servizio appena creato, ricarica systemd.

```bash
sudo systemctl daemon-reload
```

Ora puoi avviare Prometheus usando il seguente comando:

```bash
sudo systemctl start prometheus
```

Per verificare che Prometheus sia in esecuzione, controlla lo stato del servizio.

```bash
sudo systemctl status prometheus
```

L'output ti mostra lo stato di Prometheus, l'identificatore del processo principale (PID), l'uso della memoria e altro ancora.

Se lo stato del servizio non è attivo, segui le istruzioni a schermo e ripercorri i passaggi precedenti per risolvere il problema prima di continuare il tutorial.

```plaintext
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Quando sei pronto per continuare, premi _Q_ per uscire dal comando di stato. Infine, abilita il servizio per avviarsi all'avvio.

```bash
sudo systemctl enable prometheus
```

Ora che Prometheus è attivo e in esecuzione, possiamo installare un esportatore aggiuntivo per generare metriche sulle risorse del nostro server.

## Passaggio 5 — Scaricamento di Node Exporter

Per espandere Prometheus oltre le metriche solo su se stesso, installeremo un esportatore aggiuntivo chiamato Node Exporter. Node Exporter fornisce informazioni dettagliate sul sistema, inclusi l'utilizzo della CPU, del disco e della memoria. Scarica la versione stabile attuale di Node Exporter nella tua directory home. Puoi trovare le ultime versioni binarie sulla [pagina di download di Prometheus.](https://prometheus.io/download/)

```bash
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz
```

Ora, decomprimi l'archivio scaricato.

```bash
tar xvf node_exporter-1.0.1
```.linux-amd64.tar.gz

```
Questo creerà una directory chiamata _node_exporter-1.0.1.linux-amd64_ contenente un file binario chiamato _node_exporter_, una licenza e un avviso.

Copia il binario nella directory _/usr/local/bin_ e imposta la proprietà utente e gruppo sull'utente node_exporter che hai creato nel Passaggio 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Ora che hai installato Node Exporter, testiamolo eseguendolo prima di creare un file di servizio in modo che parta all'avvio.

## Passaggio 6 — Esecuzione di Node Exporter

I passaggi per eseguire Node Exporter sono simili a quelli per eseguire Prometheus stesso. Inizia creando il file di servizio Systemd per Node Exporter.

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
Verifica che Node Exporter stia funzionando correttamente con il comando di stato.

```
sudo systemctl status node_exporter

```
Come prima, questo output ti indica lo stato di Node Exporter, l'identificatore del processo principale (PID), l'utilizzo della memoria e altro ancora. Se lo stato del servizio non è attivo, segui i messaggi visualizzati sullo schermo e ripercorri i passaggi precedenti per risolvere il problema prima di continuare.

```
_Output_
* node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:58:25 CEST; 1 day 1h ago
 Main PID: 29612 (node_exporter)
   Compiti: 7 (limite: 4915)
   CGroup: /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd

Infine, abilita Node Exporter per avviarsi all'avvio.

sudo systemctl enable node_exporter

Con Node Exporter completamente configurato e in esecuzione come previsto, diremo a Prometheus di iniziare a raccogliere le nuove metriche.

## Passaggio 7 — Configurare Prometheus per Raccogliere i Dati da Node Exporter

Poiché Prometheus raccoglie solo i dati dagli esportatori definiti nella sezione scrape_configs del suo file di configurazione, dovremo aggiungere una voce per Node Exporter, proprio come abbiamo fatto per Prometheus stesso. Apri il file di configurazione.

sudo nano /etc/prometheus/prometheus.yml

Alla fine del blocco scrape_configs, aggiungi una nuova voce chiamata node_exporter.

...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']

Poiché questo esportatore è in esecuzione sullo stesso server di Prometheus stesso, possiamo utilizzare localhost invece di un indirizzo IP insieme alla porta predefinita di Node Exporter, 9100. L'intero file di configurazione dovrebbe apparire così:

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

Salva il file ed esci dall'editor di testo quando sei pronto per continuare. Infine, riavvia Prometheus per rendere effettive le modifiche.

sudo systemctl restart prometheus

Ancora una volta, verifica che tutto stia funzionando correttamente con il comando di stato.

sudo systemctl status prometheus

Se lo stato del servizio non è impostato su attivo, segui le istruzioni a schermo e ripercorri i passaggi precedenti prima di procedere.

Output
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-09-15 19:06:56 CEST; 2s ago
 Main PID: 19725 (prometheus)
    Tasks: 8 (limite: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Ora abbiamo Prometheus e Node Exporter installati, configurati e in esecuzione.

## Passaggio 8 - Aggiunta di Robonomic build in node_exporter

Dopo aver installato con successo Prometheus e node_exporter, dovremo utilizzare l'esportatore prometheus integrato in ogni progetto di substrato. Per fare ciò, dovremo aggiungere una voce aggiuntiva a _/etc/prometheus/prometheus.yml_.
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
Verifica nuovamente che tutto stia funzionando correttamente con il comando di stato.

```
sudo systemctl status prometheus

```
Ora abbiamo _Prometheus_ e _Node Exporter_ così come _Robonomic Exporter_ installati, configurati e in esecuzione. Ora passiamo a Grafana

## Passaggio 9 - Configurazione di Grafana

L'ultimo passaggio è collegare Prometheus come Sorgente Dati in Grafana. Per lo scopo di questo tutorial utilizzeremo Grafana basato su cloud gratuito che consente di avere fino a 5 dashboard e un [dashboard dedicato a Robonomics](https://grafana.com/grafana/dashboards/13015). Basta andare su [grafana.com](https://grafana.com/) creare un nuovo account e accedere alla tua nuova istanza di Grafana appena creata.

All'inizio dobbiamo aggiungere a Grafana una nuova _**Origine Dati**_ che nel nostro caso sarà il server Prometheus.
Vai su Origine Dati:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png", alt:"Origine Dati"} %}{% endroboWikiPicture %}

Poi clicca su **_Aggiungi origine dati_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png", alt:"Origine Dati"} %}{% endroboWikiPicture %}

Successivamente seleziona _**Prometheus**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png", alt:"Origine Dati"} %}{% endroboWikiPicture %}

Nella nuova schermata inserisci il tuo **_indirizzo IP del server Prometheus con porta 9090_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png", alt:"Origine Dati"} %}{% endroboWikiPicture %}

Dopo di che _**Salva e Testa**_ se hai seguito tutti i passaggi dovresti essere in verde e pronto per importare il cruscotto. Sul sito principale clicca su **+** e poi su **Importa** come mostrato nell'immagine qui sotto:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png", alt:"Importa cruscotto"} %}{% endroboWikiPicture %}

Dovresti quindi vedere la pagina di Importazione:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png", alt:"Pagina di Importazione"} %}{% endroboWikiPicture %}

Nel campo _url o id del cruscotto di Grafana.com_ scrivi _**13015**_ (poiché questo è l'ID del cruscotto Robonomic):

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png", alt:"Import Robonomic dashboard"} %}{% endroboWikiPicture %}

Dopo aver caricato la dashboard esterna, otterrai questa schermata:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png", alt:"Importazione dashboard XRT 13015"} %}{% endroboWikiPicture %}

L'ultimo passo è scegliere la **_Sorgente Dati_** precedentemente creata e fare clic su _**Importa**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png", alt:"Prometheus come Sorgente Dati"} %}{% endroboWikiPicture %}

ECCO FATTO! A questo punto dovresti vedere la dashboard importata.


## Riferimenti

* [Come Installare Prometheus su Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Costruire una Dashboard di Monitoraggio con Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Supporto di Grafana per Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Monitoraggio delle metriche di host Linux con il node exporter](https://prometheus.io/docs/guides/node-exporter/)
* [Interrogare Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Visualizzare le Metriche del Nodo](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Esportatore Prometheus di Substrate](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Metriche del nodo Polkadot](https://grafana.com/grafana/dashboards/12425)
* [Dashboard Node Exporter per Prometheus](https://grafana.com/grafana/dashboards/11074)
* [Metriche Grafana ROBONOMICS (XRT)](https://grafana.com/grafana/dashboards/13015)