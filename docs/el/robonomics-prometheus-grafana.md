---
title: Robonomics + Prometheus + Grafana 

contributors: [Vourhey]
---

**Οι παρακάτω οδηγίες παρέχονται από τον [Hubo Bubo](https://github.com/hubobubo)**

**Το αρχικό άρθρο βρίσκεται [εδώ](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Εισαγωγή
Για να παρακολουθείτε και να διατηρείτε καλύτερα τον κόμβο(ους) του Robonomics, είναι καλό να ρυθμίσετε ένα σύστημα παρακολούθησης βασισμένο στον Prometheus Server και το Grafana. Αυτό το έγγραφο θα δείξει πώς να ρυθμίσετε κάθε ένα από αυτά για να παρακολουθείτε πλήρως τον κόμβο σας.

##  Προαπαιτήσεις
* [Ρύθμιση διακομιστή με Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) 
* [Εγκατεστημένος collator του Robonomics parachain](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Βεβαιωθείτε ότι έχετε το robonomics.service να λειτουργεί στη μηχανή σας και η θύρα 9615 είναι προσβάσιμη 

## Βήμα 1 — Δημιουργία Χρηστών Υπηρεσίας

Για λόγους ασφαλείας, θα ξεκινήσουμε δημιουργώντας δύο νέους λογαριασμούς χρηστών, τον prometheus και τον node_exporter. Δημιουργήστε αυτούς τους δύο χρήστες και χρησιμποιήστε τις επιλογές _--no-create-home_ και _--shell /bin/false_ ώστε αυτοί οι χρήστες να μην μπορούν να συνδεθούν στον διακομιστή.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Πριν κατεβάσουμε τα δυαδικά αρχεία του Prometheus, δημιουργήστε τους απαραίτητους φακέλους για την αποθήκευση των αρχείων και των δεδομένων του Prometheus. Ακολουθώντας τις τυπικές συμβάσεις του Linux, θα δημιουργήσουμε έναν φάκελο στο _/etc_ για τα αρχεία ρύθμισης του Prometheus και έναν φάκελο στο _/var/lib_ για τα δεδομένα του.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Τώρα, ορίστε τον χρήστη και την ομάδα για τους νέους φακέλους στον χρήστη prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Βήμα 2 — Λήψη του Prometheus

Πρώτα, κατεβάστε και αποσυμπιέστε την τρέχουσα σταθερή έκδοση του Prometheus στον προσωπικό σας φάκελο. Μπορείτε να βρείτε τα πιο πρόσφατα δυαδικά αρχεία στη [σελίδα λήψης του Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Τώρα, αποσυμπιέστε το κατεβασμένο αρχείο.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Αυτό θα δημιουργήσει έναν φάκελο με το όνομα prometheus-2.21.0.linux-amd64 που περιέχει δύο δυαδικά αρχεία (prometheus και promtool), τους φακέλους _consoles_ και _console_libraries_ που περιέχουν τα αρχεία της διεπαφής ιστού, μια άδεια χρήσης, μια ειδοποίηση και αρκετά παραδείγματα αρχείων.

Αντιγράψτε τα δύο δυαδικά αρχεία στον φάκελο _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Ορίστε τον χρήστη και την ομάδα για τα δυαδικά αρχεία στον χρήστη prometheus που δημιουργήθηκε στο Βήμα 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Αντιγράψτε τους φακέλους consoles και _console_libraries_ στον φάκελο _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Ορίστε τον χρήστη και την ομάδα για τους φακέλους στον χρήστη prometheus. Χρησιμοποιώντας τη σημαία -R θα διασφαλίσει ότι η ιδιοκτησία θα οριστεί και στα αρχεία μέσα στον φάκελο.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Τώρα που έχει εγκατασταθεί ο Prometheus, θα δημιουργήσουμε τα αρχεία ρύθμισης και υπηρεσίας του για την προετοιμασία της πρώτης του εκτέλεσης.

## Βήμα 3 — Ρύθμιση του Prometheus

Στον φάκελο _/etc/prometheus_, χρησιμοποιήστε το nano ή τον αγαπημένο σας επεξεργαστή κειμένου για να δημιουργήσετε ένα αρχείο ρύθμισης με το όνομα _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
Στις γενικές ρυθμίσεις, ορίστε το προεπιλεγμένο διάστημα για τη συλλογή μετρήσεων. Σημειώστε ότι ο Prometheus θα εφαρμόσει αυτές τις ρυθμίσεις σε κάθε εξαγωγέα εκτός αν οι δικές του ρυθμίσεις αντικαταστήσουν τις γενικές.

```
global:
  scrape_interval: 15s

```
Αυτή η τιμή scrape_interval λέει στον Prometheus να συλλέγει μετρήσεις από τους εξαγωγείς του κάθε 15 δευτερόλεπτα, που είναι αρκετά για τους περισσότερους εξαγωγείς.
Τώρα, προσθέστε τον ίδιο τον Prometheus στη λίστα των εξαγωγέων για συλλογή με την ακόλουθη οδηγία scrape_configs:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Ο Prometheus χρησιμοποιεί το _job_name_ για να επισημάνει τους εξαγωγείς σε ερωτήματα και γραφήματα, οπότε βεβαιωθείτε ότι επιλέγετε κάτι περιγραφικό εδώ.

Επιπλέον, καθώς ο Prometheus εξάγει σημαντικά δεδομένα για τον εαυτό του που μπορείτε να χρησιμοποιήσετε για την παρακολούθηση της απόδοσης και την εντοπισμό σφαλμάτων, έχουμε αντικαταστήσει την οδηγία scrape_interval από 15 δευτερόλεπτα σε 5 δευτερόλεπτα για πιο συχνές ενημερώσεις.

Τέλος, ο Prometheus χρησιμοποιεί τις οδηγίες _static_configs_ και _targets_ για να προσδιορίσει πού εκτελούνται οι εξαγωγείς. Εφόσον αυτός ο συγκεκριμένος εξαγωγέας εκτελείται στον ίδιο διακομιστή με τον Prometheus ίδιο, μπορούμε να χρησιμοποιήσουμε το localhost αντί για μια διεύθυνση IP μαζί με την προεπιλεγμένη θύρα, 9090.

Το αρχείο διαμόρφωσής σας πρέπει να φαίνεται πλέον όπως αυτό:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Αποθηκεύστε το αρχείο και κλείστε τον επεξεργαστή κειμένου σας.

Τώρα, ορίστε την ιδιοκτησία χρήστη και ομάδας στο αρχείο διαμόρφωσης στον χρήστη prometheus που δημιουργήθηκε στο Βήμα 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
Με την ολοκλήρωση της διαμόρφωσης, είμαστε έτοιμοι να δοκιμάσουμε τον Prometheus εκτελώντας τον για πρώτη φορά.

## Βήμα 4 — Εκτέλεση του Prometheus

Ξεκινήστε τον Prometheus ως χρήστης _prometheus_, παρέχοντας τη διαδρομή τόσο για το αρχείο διαμόρφωσης όσο και για τον κατάλογο δεδομένων.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

Η έξοδος περιέχει πληροφορίες σχετικά με την πρόοδο φόρτωσης του Prometheus, το αρχείο διαμόρφωσης και τις σχετικές υπηρεσίες. Επιβεβαιώνει επίσης ότι ο Prometheus ακούει στη θύρα _9090_.

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
Εάν λάβετε ένα μήνυμα σφάλματος, ελέγξτε διπλά ότι χρησιμοποιήσατε σύνταξη YAML στο αρχείο διαμόρφωσής σας και στη συνέχεια ακολουθήστε τις οδηγίες που εμφανίζονται στην οθόνη για να επιλύσετε το πρόβλημα.

Τώρα, διακόψτε τον Prometheus πατώντας _CTRL+C_, και στη συνέχεια ανοίξτε ένα νέο αρχείο υπηρεσίας _systemd_.

```
sudo nano /etc/systemd/system/prometheus.service

```
Το αρχείο υπηρεσίας λέει στο _systemd_ να εκτελέσει τον Prometheus ως χρήστη prometheus, με το αρχείο διαμόρφωσης που βρίσκεται στον κατάλογο _/etc/prometheus/prometheus.yml_ και να αποθηκεύει τα δεδομένα του στον κατάλογο _/var/lib/prometheus_. Αντιγράψτε το παρακάτω περιεχόμενο στο αρχείο:

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

Τέλος, αποθηκεύστε το αρχείο και κλείστε τον επεξεργαστή κειμένου σας. Για να χρησιμοποιήσετε τη νεοδημιουργηθείσα υπηρεσία, επαναφορτώστε το systemd.

```
sudo systemctl daemon-reload

```
Τώρα μπορείτε να ξεκινήσετε τον Prometheus χρησιμοποιώντας την παρακάτω εντολή:

```
sudo systemctl start prometheus

```
Για να βεβαιωθείτε ότι ο Prometheus εκτελείται, ελέγξτε την κατάσταση της υπηρεσίας.

```
sudo systemctl status prometheus

```
Η έξοδος σας λέει την κατάσταση του Prometheus, τον αναγνωριστικό της κύριας διεργασίας (PID), τη χρήση μνήμης και άλλα.

Εάν η κατάσταση της υπηρεσίας δεν είναι ενεργή, ακολουθήστε τις οδηίες στην οθόνη και επαναλάβετε τα προηγούμενα βήματα για να επιλύσετε το πρόβλημα πριν συνεχίσετε τον οδηγό.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Όταν είστε έτοιμοι να προχωρήσετε, πατήστε _Q_ για να τερματίσετε την εντολή κατάστασης. Τέλος, ενεργοποιήστε την υπηρεσία για να ξεκινήσει κατά την εκκίνηση.

```
sudo systemctl enable prometheus

```

Τώρα που ο Prometheus είναι ενεργός και λειτουργεί, μπορούμε να εγκαταστήσουμε έναν επιπλέον εξαγωγέα για να δημιουργήσουμε μετρήσεις σχετικά με τους πόρους του διακομιστή μας.

## Βήμα 5 — Λήψη του Node Exporter

Για να επεκτείνουμε το Prometheus πέρα ​​από τις μετρήσεις μόνο για τον εαυτό του, θα εγκαταστήσουμε έναν επιπλέον εξαγωγέα που ονομάζεται Node Exporter. Ο Node Exporter παρέχει λεπτομερείς πληροφορίες σχετικά με το σύστημα, συμπεριλαμβανομένης της χρήσης CPU, δίσκου και μνήμης. Λάβετε την τρέχουσα σταθερή έκδοση του Node Exporter στον κατάλογο του αρχικού σας φακέλου. Μπορείτε να βρείτε τις τελευταίες δυαδικές εκδόσεις στη [σελίδα λήψης του Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Τώρα, αποσυσκευάστε το ληφθέν αρχείο.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Αυτό θα δημιουργήσει έναν κατάλογο με το όνομα _node_exporter-1.0.1.linux-amd64_ που περιέχει ένα δυαδικό αρχείο με το όνομα _node_exporter_, μια άδεια χρήσης και μια ειδοποίηση.

Αντιγράψτε το δυαδικό αρχείο στον κατάλογο _/usr/local/bin_ και ορίστε τον χρήστη και την ομάδα ιδιοκτησίας στον χρήστη node_exporter που δημιουργήσατε στο Βήμα 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Τώρα που έχετε εγκαταστήσει το Node Exporter, ας το δοκιμάσουμε εκτελώντας το πριν δημιουργήσουμε ένα αρχείο υπηρεσίας για να ξεκινά κατά την εκκίνηση.

## Βήμα 6 — Εκτέλεση του Node Exporter

Τα βήματα για την εκτέλεση του Node Exporter είναι παρόμοια με αυτά για την εκτέλεση του ίδιου του Prometheus. Ξεκινήστε δημιουργώντας το αρχείο υπηρεσίας Systemd για το Node Exporter.

```
sudo nano /etc/systemd/system/node_exporter.service

```
Αντιγράψτε το παρακάτω περιεχόμενο στο αρχείο υπηρεσίας:

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

[Εγκατάσταση]
WantedBy=multi-user.target
```

Αποθηκεύστε το αρχείο και κλείστε τον επεξεργαστή κειμένου. Τέλος, επαναφορτώστε το systemd για να χρησιμοποιήσετε τη νεοδημιουργημένη υπηρεσία.

```
sudo systemctl daemon-reload

```
Τώρα μπορείτε να εκτελέσετε το Node Exporter χρησιμοποιώντας την παρακάτω εντολή:

```
sudo systemctl start node_exporter

```
Επαλήθευση that Node Exporter’s running correctly with the status command.

```
sudo systemctl status node_exporter

```
Όπως και πριν, αυτή η έξοδος σας δείχνει την κατάσταση του Node Exporter, τον αναγνωριστικό κύριας διεργασίας (PID), τη χρήση μνήμης και άλλα. Εάν η κατάσταση της υπηρεσίας δεν είναι ενεργή, ακολουθήστε τις οδηγίες στην οθόνη και επαναλάβετε τα προηγούμενα βήματα για να επιλύσετε το πρόβλημα πριν συνεχίσετε.

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
Τέλος, ενεργοποιήστε το Node Exporter για να ξεκινά αυτόματα κατά την εκκίνηση.

```
sudo systemctl enable node_exporter

```
Με το Node Exporter πλήρως διαμορφωμένο και λειτουργούντα όπως αναμένεται, θα πούμε στο Prometheus να ξεκινήσει τη συλλογή των νέων μετρήσεων.

## Βήμα 7 - Διαμόρφωση του Prometheus για την Συλλογή του Node Exporter

Επειδή το Prometheus συλλέγει μόνο εξαγωγείς που έχουν καθοριστεί στ τμήμα scrape_configs του αρχείου διαμόρφωσής του, θα πρέπει να προσθέσουμε μια καταχώριση για το Node Exporter, όπως κάναμε και για τον ίδιο τον Prometheus. Ανοίξτε το αρχείο διαμόρφωσης.

```
sudo nano /etc/prometheus/prometheus.yml

```
Στο τέλος του τμήματος scrape_configs, προσθέστε μια νέα καταχώριση με το όνομα node_exporter.

```
...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
Επειδή αυτός ο εξαγωγέας τρέχει επίσης στον ίδιο διακομιστή με τον ίδιο τον Prometheus, μπορούμε να χρησιμοποιήσουμε το localhost αντί για μια διεύθυνση IP, μαζί με την προεπιλεγμένη θύρα του Node Exporter, 9100. Το σύνολο του αρχείου διαμόρφωσής σας θα πρέπει να φαίνεται όπως ακολούθως:

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
Αποθηκεύστε το αρχείο και κλείστε τον επεξεργαστή κειμένου όταν είστε έτοιμοι να συνεχίσετε. Τέλος, επανεκκινήστε το Prometheus για να τεθούν σε ισχύ οι αλλαγές.

```
sudo systemctl restart prometheus

```
Για μια ακόμα φορά, επαληθεύστε ότι όλα λειτουργούν σωστά με την εντολή κατάστασης.

```
sudo systemctl status prometheus

```
Εάν η κατάσταση της υπηρεσίας δεν είναι ενεργή, ακολουθήστε τις οδηγίες στην οθόνη και επαναλάβετε τα προηγούμενα βήματα πριν προχωρήσετε.

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

Τώρα έχουμε εγκατεστημένο, διαμορφωμένο και λειτουργικό το Prometheus και το Node Exporter.

## Βήμα 8 - Προσθήκη ενσωματωμένου node_exporter στο Robonomic

Αφού εγκαταστήσουμε με επιτυχία το Prometheus και το node_exporter, θα πρέπει να χρησιμοποιήσουμε τον ενσωματωμένο εξαγωγέα prometheus σε κάθε έργο υποστρώματος. Για να το επιτύχουμε αυτό, πρέπει να προσθέσουμε μια επιπλέον καταχώριση στο _/etc/prometheus/prometheus.yml_. 
Ανοίξτε το αρχείο διαμόρφωσης.

```
sudo nano /etc/prometheus/prometheus.yml

```
Στο τέλος του τμήματος scrape_configs, προσθέστε μια νέα καταχώριση με το όνομα robonomic_exporter.

``` 
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
Αποθηκεύστε το αρχείο και βγείτε από τον επεξεργαστή κειμένου. Το συνολικό αρχείο διαμόρφωσής σας θα πρέπει να φαίνεται όπως παρακάτω:

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

Τέλος, επανεκκινήστε το Prometheus για να εφαρμοστούν οι αλλαγές.

```
sudo systemctl restart prometheus

```
Για άλλη μια φορά, βεβαιωθείτε ότι όλα εκτελούνται σωστά με την εντολή status.

```
sudo systemctl status prometheus

```
Τώρα έχουμε εγκατεστημένο, διαμορφωμένο και λειτουργικό το _Prometheus_, το _Node Exporter_ καθώς και το _Robonomic Exporter_. Προχωρήστε τώρα στο Grafana

## Βήμα 9 - Ρύθμιση του Grafana

Το τελευταίο βήμα είναι να συνδέσετε το Prometheus ως πηγή δεδομένων στο Grafana. Για τον σκοπό αυτού του εγχειριδίου, θα χρησιμοποιήσουμε το δωρεάν cloud-based grafana που επιτρέπει έως 5 πίνακες ελέγχου καθώς και τον αφιερωμένο [πίνακα ελέγχου Robonomics](https://grafana.com/grafana/dashboards/13015). Απλά μεταβείτε στο [grafana.com](https://grafana.com/), δημιουργήστε έναν νέο λογαριασμό και συνδεθείτε στη νεοδημιουργημένη παρουσία grafana σας.

Στην αρχή πρέπει να προσθέσουμε στο Grafana μια νέα _**Πηγή Δεδομένων**_ που στην περίπτωσή μας θα είναι ο διακομιστής Prometheus.
Μεταβείτε στην Πηγή Δεδομένων:

>![DataSource](../images/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png)

Κάντε κλικ στο **_Προσθήκη πηγής δεδομένων_**

>![DataSource](../images/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png)

Next επιλέξτε _**Prometheus**_

>![DataSource](../images/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png)

Στη νέα οθόνη, εισαγάγετε τη **_διεύθυνση IP του διακομιστή Prometheus με τη θύρα 9090_**

> ![DataSource](../images/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png)

Έπειτα, πατήστε _**Αποθήκευση & Δοκιμή**_ αν ακολουθήσατε όλα τα βήματα και πρέπει να είστε πράσινοι και έτοιμοι να προχωρήσετε στην εισαγωγή του πίνακα ελέγχου. Στην κύρια σελίδα, κάντε κλικ στο **+** και στη συνέχεια στην **Εισαγωγή**, όπως φαίνεται στην παρακάτω εικόνα:

> ![Import dashboard](../images/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png)

Στη συνέχεια, θα πρέπει να δείτε τη σελίδα Εισαγωγής:

> ![Import page](../images/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png)

Στο πεδίο _Διεύθυνση URL ή αναγνωριστικό πίνακα ελέγχου του Grafana.com_ γράψτε _**13015**_ (καθώς αυτό είναι το αναγνωριστικό του πίνακα ελέγχου Robonomic)

> ![Import Robonomic dashboard](../images/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png)

Μετά τη φόρτωση του εξωτερικού πίνακα ελέγχου, θα δείτε αυτήν την οθόνη:

> ![XRT 13015 dashboard import](../images/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png)

Το τελευταίο βήμα είναι να επιλέξετε την προηγουμένως δημιουργημένη **_Πηγή Δεδομένων_** και να κάνετε κλικ στο _**Εισαγωγή**_

> ![Prometheus as a DataSource](../images/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png)

ΑΥΤΟ ΕΙΝΑΙ! Σε αυτό το σημείο θα πρέπει να δείτε τον εισαγόμενο πίνακα ελέγχου. 


## Αναφορές

* [Πώς να εγκαταστήσετε το Prometheus στο Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Δημιουργία ενός πίνακα ελέγχου παρακολούθησης από το Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Υποστήριξη του Grafana για το Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Παρακολούθηση μετρήσεων του Linux με τον node exporter](https://prometheus.io/docs/guides/node-exporter/)
* [Ερωτήματα στο Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Οπτικοποίηση μετρήσεων του κόμβου](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Εξαγωγέας Prometheus για το Substrate](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Μετρικές κόμβου Polkadot](https://grafana.com/grafana/dashboards/12425)
* [Πίνακας ελέγχου Node Exporter για το Prometheus](https://grafana.com/grafana/dashboards/11074)
* [Μετρικές ROBONOMICS (XRT) του Grafana](https://grafana.com/grafana/dashboards/13015)

