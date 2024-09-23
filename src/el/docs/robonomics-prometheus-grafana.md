---
title: Robonomics + Prometheus + Grafana

contributors: [Vourhey]
---

**Οι ακόλουθες οδηγίες παρέχονται από τον [Hubo Bubo](https://github.com/hubobubo)**

**Το αρχικό άρθρο βρίσκεται [εδώ](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Εισαγωγή
Για να είναι δυνατή η καλύτερη παρακολούθηση και συντήρηση των κόμβων Robonomics, είναι καλό να δημιουργήσετε ένα σύστημα παρακολούθησης βασισμένο στον Prometheus Server και το Grafana. Αυτό το έγγραφο θα δείξει πώς να διαμορφώσετε κάθε ένα από αυτά για να παρακολουθείτε πλήρως τον κόμβο σας.

## Προαπαιτήσεις
* [Ρύθμιση Διακομιστή με Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
* [Εγκατάσταση collator του Robonomics parachain](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Βεβαιωθείτε ότι η υπηρεσία robonomics.service λειτουργεί στη μηχανή σας και η θύρα 9615 είναι προσβάσιμη

## Βήμα 1 — Δημιουργία Χρηστών Υπηρεσίας

Για λόγους ασφαλείας, θα ξεκινήσουμε δημιουργώντας δύο νέους λογαριασμούς χρηστών, τον prometheus και τον node_exporter. Δημιουργήστε αυτούς τους δύο χρήστες και χρησιμοποιήστε τις επιλογές _--no-create-home_ και _--shell /bin/false_ ώστε αυτοί οι χρήστες να μην μπορούν να συνδεθούν στον διακομιστή.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Πριν κατεβάσουμε τα δυαδικά αρχεία του Prometheus, δημιουργήστε τις απαραίτητες καταλήξεις για την αποθήκευση των αρχείων και των δεδομένων του Prometheus. Σύμφωνα με τις τυπικές συμβάσεις του Linux, θα δημιουργήσουμε έναν κατάλογο στο _/etc_ για τα αρχεία ρυθμίσεων του Prometheus και έναν κατάλογο στο _/var/lib_ για τα δεδομένα του.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Τώρα, ορίστε την ιδιοκτησία χρήστη και ομάδας στους νέους καταλόγους στον χρήστη prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Βήμα 2 — Λήψη του Prometheus

Κατεβάστε και αποσυμπιέστε πρώτα την τρέχουσα σταθερή έκδοση του Prometheus στον κατάλογο του home σας. Μπορείτε να βρείτε τα πιο πρόσφατα δυαδικά αρχεία στη [σελίδα λήψης του Prometheus.](https://prometheus.io/download/)

```wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Τώρα, αποσυμπιέστε το κατεβασμένο αρχείο.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Αυτό θα δημιουργήσει έναν κατάλογο με το όνομα prometheus-2.21.0.linux-amd64 που περιέχει δύο δυαδικά αρχεία (prometheus και promtool), καθώς και κατάλογους _consoles_ και _console_libraries_ που περιέχουν τα αρχεία της διεπαφής ιστού, μια άδεια χρήσης, μια ανακοίνωση και αρκετά παραδείγματα αρχείων.

Αντιγράψτε τα δύο δυαδικά αρχεία στον κατάλογο _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Ορίστε την ιδιοκτησία χρήστη και ομάδας στα δυαδικά αρχεία στον χρήστη prometheus που δημιουργήθηκε στο Βήμα 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Αντιγράψτε τους καταλόγους consoles και _console_libraries_ στον κατάλογο _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Ορίστε την ιδιοκτησία χρήστη και ομάδας στους καταλόγους στον χρήστη prometheus. Χρησιμοποιώντας τη σημαία -R θα διασφαλίσει ότι η ιδιοκτησία θα οριστεί και στα αρχεία μέσα στον κατάλογο.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Τώρα που εγκαταστάθηκε το Prometheus, θα δημιουργήσουμε τα αρχεία διαμόρφωσης και υπηρεσίας του σε προετοιμασία για την πρώτη του εκτέλεση.

## Βήμα 3 — Διαμόρφωση του Prometheus

Στον κατάλογο _/etc/prometheus_, χρησιμοποιήστε το nano ή το αγαπημένο σας επεξεργαστή κειμένου για να δημιουργήσετε ένα αρχείο διαμόρφωσης με το όνομα _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
Στις γενικές ρυθμίσεις, ορίστε το προεπιλεγμένο διάστημα για τη συλλογή μετρήσεων. Σημειώστε ότι το Prometheus θα εφαρμόσει αυτές τις ρυθμίσεις σε κάθε εξαγωγέα εκτός εάν οι δικές του ρυθμίσεις αντικαταστήσουν τις γενικές.15s

```
Η τιμή scrape_interval αυτή λέει στο Prometheus να συλλέγει μετρήσεις από τους εξαγωγείς του κάθε 15 δευτερόλεπτα, το οποίο είναι αρκετά μεγάλο χρονικό διάστημα για τους περισσότερους εξαγωγείς.
Τώρα, προσθέστε τον ίδιο τον Prometheus στη λίστα των εξαγωγέων από τους οποίους θα γίνει η συλλογή με την ακόλουθη οδηγία scrape_configs:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Ο Prometheus χρησιμοποιεί το _job_name_ για να επισημάνει τους εξαγωγείς σε ερωτήσεις και γραφήματα, οπότε βεβαιωθείτε ότι επιλέγετε κάτι περιγραφικό εδώ.

Επιπλέον, καθώς ο Prometheus εξάγει σημαντικά δεδομένα για τον εαυτό του που μπορείτε να χρησιμοποιήσετε για την παρακολούθηση της απόδοσης και την αποσφαλμάτωση, έχουμε αντικαταστήσει τη γενική οδηγία scrape_interval από 15 δευτερόλεπτα σε 5 δευτερόλεπτα για πιο συχνές ενημερώσεις.

Τέλος, ο Prometheus χρησιμοποιεί τις οδηγίες _static_configs_ και _targets_ για να καθορίσει πού εκτελούνται οι εξαγωγείς. Δεδομένου ότι αυτός ο συγκεκριμένος εξαγωγέας εκτελείται στον ίδιο διακομιστή με τον ίδιο τον Prometheus, μπορούμε να χρησιμοποιήσουμε το localhost αντί για μια διεύθυνση IP μαζί με την προεπιλεγμένη θύρα, 9090.

Το αρχείο διαμόρφωσής σας θα πρέπει τώρα να φαίνεται κάπως έτσι:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Αποθηκεύστε το αρχείο και βγείτε από τον επεξεργαστή κειμένου σας.

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
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="Δεν ορίστηκε χρόνος ή μέγεθος διατήρησης, οπότε χρησιμοποιείται η προεπιλεγμένη διατήρηση χρόνου" διάρκεια=15d
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="Έναρξη Prometheus" έκδοση="(έκδοση=2.21.0, κλαδί=HEAD, αναθεώρηση=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2, χρήστης=root@a4d9bea8479e, ημερομηνία=20200911-11:35:02)"
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(μαλακό=1024, σκληρό=4096)"
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(μαλακό=απεριόριστο, σκληρό=απεριόριστο)"
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="Έναρξη TSDB ..."14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.368Z caller=web.go:523 component=web msg="Έναρξη ακρόασης για συνδέσεις" address=0.0.0.0:9090
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.372Z caller=head.go:644 component=tsdb msg="Επαναφορά τμημάτων μνήμης σε δίσκο αν υπάρχουν"
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:658 component=tsdb msg="Η επανάληψη τμημάτων μνήμης σε δίσκο ολοκληρώθηκε" διάρκεια=12.659µs
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:664 component=tsdb msg="Επανάληψη WAL, αυτό μπορεί να πάρει λίγο χρόνο"
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.380Z caller=head.go:716 component=tsdb msg="Φορτώθηκε τμήμα WAL" τμήμα=0 maxSegment=1
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:716 component=tsdb msg="Φορτώθηκε τμήμα WAL" τμήμα=1 maxSegment=1
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:719 component=tsdb msg="Η επανάληψη WAL ολοκληρώθηκε" διάρκεια_επανάληψης_σημείου_ελέγχου=48.125µs διάρκεια_επανάληψης_wal=8.253748ms συνολική_διάρκεια_επανάληψης=8.343335ms
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.383Z caller=main.go:721 fs_type=EXT4_SUPER_MAGIC53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="Η TSDB ξεκίνησε"
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="Φόρτωση αρχείου ρυθμίσεων" filename=/etc/prometheus/prometheus.yml
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="Ολοκληρώθηκε η φόρτωση του αρχείου ρυθμίσεων" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
Σεπ 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="Ο διακομιστής είναι έτοιμος να λάβει αιτήσεις web."

```
Αν λάβετε μήνυμα σφάλματος, ελέγξτε διπλά ότι χρησιμοποιήσατε σύνταξη YAML στο αρχείο ρυθμίσεων σας και ακολουθήστε τις οδηγίες στην οθόνη για να επιλύσετε το πρόβλημα.

Τώρα, διακόψτε το Prometheus πατώντας _CTRL+C_, και στη συνέχεια ανοίξτε ένα νέο αρχείο υπηρεσίας _systemd_.

```
sudo nano /etc/systemd/system/prometheus.service

```
Το αρχείο υπηρεσίας δηλώνει στο _systemd_ να εκτελέσει το Prometheus ως τον χρήστη prometheus, με το αρχείο ρυθμίσεων που βρίσκεται στον κατάλογο _/etc/prometheus/prometheus.yml_ και να αποθηκεύσει τα δεδομένα του στον κατάλογο _/var/lib/prometheus_. Αντιγράψτε το παρακάτω περιεχόμενο στο αρχείο:

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

[Εγκατάσταση]
WantedBy=multi-user.target
```

Τέλος, αποθηκεύστε το αρχείο και κλείστε τον επεξεργαστή κειμένου σας. Για να χρησιμοποιήσετε τη νεοδημιουργημένη υπηρεσία, επαναφορτώστε το systemd.

```
sudo systemctl daemon-reload

```
Τώρα μπορείτε να ξεκινήσετε το Prometheus χρησιμοποιώντας την ακόλουθη εντολή:

```
sudo systemctl start prometheus

```
Για να βεβαιωθείτε ότι το Prometheus λειτουργεί, ελέγξτε την κατάσταση της υπηρεσίας.

```
sudo systemctl status prometheus

```
Η έξοδος σάς δείχνει την κατάσταση του Prometheus, τον κύριο αναγνωριστικό διεργασίας (PID), τη χρήση μνήμης και άλλα.

Αν η κατάσταση της υπηρεσίας δεν είναι ενεργή, ακολουθήστε τις οδηγίες στην οθόνη και επαναλάβετε τα προηγούμενα βήματα για να λύσετε το πρόβλημα πριν συνεχίσετε το εγχειρίδιο.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Όταν είστε έτοιμοι να προχωρήσετε, πατήστε _Q_ για να βγείτε από την εντολή κατάστασης. Τέλος, ενεργοποιήστε την υπηρεσία για να ξεκινά αυτόματα κατά την εκκίνηση.

```
sudo systemctl enable prometheus

```

Τώρα που το Prometheus λειτουργεί, μπορούμε να εγκαταστήσουμε έναν επιπλέον εξαγωγέα για να δημιουργήσουμε μετρήσεις σχετικά με τους πόρους του διακομιστή μας.

## Βήμα 5 — Λήψη του Node Exporter

Για να επεκτείνουμε το Prometheus πέρα ​​από μετρήσεις μόνο για τον εαυτό του, θα εγκαταστήσουμε έναν επιπλέον εξαγωγέα που ονομάζεται Node Exporter. Ο Node Exporter παρέχει λεπτομερείς πληροφορίες για το σύστημα, συμπεριλαμβανομένης της χρήσης CPU, δίσκου και μνήμης. Λήψτε την τρέχουσα σταθερή έκδοση του Node Exporter στον κατάλογο του αρχικού σας φακέλου. Μπορείτε να βρείτε τις τελευταίες δυαδικές εκδόσεις στη [σελίδα λήψης του Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Τώρα, αποσυμπιέστε το ληφθέν αρχείο.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Αυτό θα δημιουργήσει έναν κατάλογο με το όνομα _node_exporter-1.0.1.linux-amd64_ που περιέχει ένα δυαδικό αρχείο με το όνομα _node_exporter_, μια άδεια χρήσης και μια ειδοποίηση.

Αντιγράψτε το δυαδικό αρχείο στον κατάλογο _/usr/local/bin_ και ορίστε την ιδιοκτησία χρήστη και ομάδας στον χρήστη node_exporter που δημιουργήσατε στο Βήμα 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Τώρα που έχετε εγκαταστήσει το Node Exporter, ας το δοκιμάσουμε εκτελώντας το πριν δημιουργήσουμε ένα αρχείο υπηρεσίας για να ξεκινά αυτόματα κατά την εκκίνηση.

## Βήμα 6 — Εκτέλεση του Node Exporter

Τα βήματα για την εκτέλεση του Node Exporter είναι παρόμοια με αυτά για την εκτέλεση του Prometheus ίδιο του. Ξεκινήστε δημιουργώντας το αρχείο υπηρεσίας Systemd για το Node Exporter.

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

[Install]
WantedBy=multi-user.target
```

Αποθηκεύστε το αρχείο και κλείστε τον επεξεργαστή κειμένου. Τέλος, επαναφορτώστε το systemd για να χρησιμοποιήσετε τη νεοδημιουργημένη υπηρεσία.

```
sudo systemctl daemon-reload

```
Μπορείτε τώρα να εκτελέσετε το Node Exporter χρησιμοποιώντας την ακόλουθη εντολή:

```
sudo systemctl start node_exporter

```
Επιβεβαιώστε ότι το Node Exporter λειτουργεί σωστά με την εντολή κατάστασης.

```
sudo systemctl status node_exporter

```
Όπως και πριν, αυτή η έξοδος σάς δείχνει την κατάσταση του Node Exporter, τον κύριο αναγνωριστικό διεργασίας (PID), τη χρήση μνήμης και άλλα. Αν η κατάσταση της υπηρεσίας δεν είναι ενεργή, ακολουθήστε τα μηνύματα στην οθόνη και επαναλάβετε τα προηγούμενα βήματα για να λύσετε το πρόβλημα πριν συνεχίσετε.

```
_Έξοδος_
* node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:58:25 CEST; 1 day 1h ago
 Main PID: 29612 (node_exporter)Εργασίες: 7 (όριο: 4915)
   CGroup: /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd

Τέλος, ενεργοποιήστε το Node Exporter για να ξεκινά αυτόματα κατά την εκκίνηση.

sudo systemctl enable node_exporter

Με το Node Exporter πλήρως ρυθμισμένο και να λειτουργεί όπως αναμένεται, θα πούμε στο Prometheus να ξεκινήσει τη συλλογή των νέων μετρικών.

## Βήμα 7 — Ρύθμιση του Prometheus για τη Συλλογή του Node Exporter

Διότι το Prometheus συλλέγει μόνο τους εξαγωγείς που έχουν οριστεί στο τμήμα scrape_configs του αρχείου ρυθμίσεών του, θα πρέπει να προσθέσουμε μια καταχώριση για το Node Exporter, όπως κάναμε για τον ίδιο τον Prometheus. Ανοίξτε το αρχείο ρυθμίσεων.

sudo nano /etc/prometheus/prometheus.yml

Στο τέλος του τμήματος scrape_configs, προσθέστε μια νέα καταχώριση με το όνομα node_exporter.

...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']

Διότι αυτός ο εξαγωγέας τρέχει επίσης στον ίδιο διακομιστή με τον ίδιο τον Prometheus, μπορούμε να χρησιμοποιήσουμε το localhost αντί για διεύθυνση IP ξανά μαζί με την προεπιλεγμένη θύρα του Node Exporter, 9100. Το σύνολο του αρχείου ρυθμίσεων σας θα πρέπει να μοιάζει με αυτό:

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

Αποθηκεύστε το αρχείο και βγείτε από τον επεξεργαστή κειμένου όταν είστε έτοιμοι να συνεχίσετε. Τέλος, επανεκκινήστε τον Prometheus για να τεθούν σε ισχύ οι αλλαγές.

sudo systemctl restart prometheus

Για μια ακόμη φορά, επαληθεύστε ότι όλα λειτουργούν σωστά με την εντολή κατάστασης.

sudo systemctl status prometheus

Αν η κατάσταση της υπηρεσίας δεν έχει οριστεί σε ενεργή, ακολουθήστε τις οδηγίες στην οθόνη και επαναλάβετε τα προηγούμενα βήματά σας πριν συνεχίσετε.

Έξοδος
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-09-15 19:06:56 CEST; 2s ago
 Main PID: 19725 (prometheus)
    Tasks: 8 (όριο: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Τώρα έχουμε εγκαταστήσει, διαμορφώσει και εκτελούμε το Prometheus και το Node Exporter.

## Βήμα 8 - Προσθήκη Robonomic build στον node_exporter

Αφού εγκαταστήσαμε με επιτυχία το Prometheus και το node_exporter, θα πρέπει να χρησιμοποιήσουμε τον ενσωματωμένο εξαγωγέα του Prometheus σε κάθε έργο υποστρώματος. Για να γίνει αυτό, πρέπει να προσθέσουμε μια επιπλέον καταχώριση στο _/etc/prometheus/prometheus.yml_.
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
Αποθηκεύστε το αρχείο και βγείτε από τον επεξεργαστή κειμένου. Το σύνολο του αρχείου διαμόρφωσης θα πρέπει να μοιάζει με αυτό:

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

Τέλος, επανεκκινήστε το Prometheus για να τεθούν σε ισχύ οι αλλαγές.

```
sudo systemctl restart prometheus

```
Για μια ακόμη φορά, επαληθεύστε ότι όλα λειτουργούν σωστά με την εντολή κατάστασης.

```
sudo systemctl status prometheus

```
Τώρα έχουμε εγκαταστήσει, διαμορφώσει και εκτελέσει το _Prometheus_ και το _Node Exporter_ καθώς και το _Robonomic Exporter_. Τώρα προχωρήστε στο Grafana

## Βήμα 9 - Δημιουργία του Grafana

Το τελευταίο βήμα είναι να συνδέσετε το Prometheus ως πηγή δεδομένων στο Grafana. Για το σκοπό αυτού του εγχειρήματος θα χρησιμοποιήσουμε το δωρεάν cloud-based Grafana που επιτρέπει έως και 5 πίνακες ελέγχου καθώς και αφιερωμένο [Robonomics dashboard](https://grafana.com/grafana/dashboards/13015). Απλά μεταβείτε στο [grafana.com](https://grafana.com/) δημιουργήστε νέο λογαριασμό και συνδεθείτε στη νεοδημιουργημένη σας περίπτωση Grafana.

Στην αρχή πρέπει να προσθέσουμε στη Grafana νέα _**Πηγή Δεδομένων**_ η οποία στην περίπτωσή μας θα είναι ο διακομιστής Prometheus.
Μεταβείτε στην Πηγή Δεδομένων:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

Στη συνέχεια κάντε κλικ στο **_Προσθήκη πηγής δεδομένων_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

Στη συνέχεια επιλέξτε _**Prometheus**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

Στη νέα οθόνη βάλτε τη διεύθυνση IP του **_διακομιστή Prometheus με τη θύρα 9090_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

Μετά από αυτό _**Αποθήκευση & Δοκιμή**_ αν κάνατε όλα τα βήματα πρέπει να είστε πράσινοι και έτοιμοι για εισαγωγή πίνακα ελέγχου. Στην κύρια σελίδα κάντε κλικ στο **+** και στη συνέχεια **Εισαγωγή** όπως φαίνεται στην εικόνα παρακάτω:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png", alt:"Import dashboard"} %}{% endroboWikiPicture %}

Στη συνέχεια θα πρέπει να δείτε τη σελίδα Εισαγωγής:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png", alt:"Import page"} %}{% endroboWikiPicture %}

Στο _Grafana.com dashboard url ή id_ γράψτε _**13015**_ (καθώς αυτό είναι το ID του πίνακα ελέγχου Robonomic)

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png", alt:"Import Robonomic dashboard"} %}{% endroboWikiPicture %}

Μετά τη φόρτωση εξωτερικού πίνακα ελέγχου, θα δείτε αυτήν την οθόνη:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png", alt:"Εισαγωγή πίνακα ελέγχου XRT 13015"} %}{% endroboWikiPicture %}

Το τελευταίο βήμα είναι να επιλέξετε την προηγουμένως δημιουργημένη **_Πηγή Δεδομένων_** και να κάνετε κλικ στο _**Εισαγωγή**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png", alt:"Prometheus ως πηγή δεδομένων"} %}{% endroboWikiPicture %}

ΑΥΤΟ ΕΙΝΑΙ! Σε αυτό το σημείο θα πρέπει να δείτε τον εισαγμένο πίνακα ελέγχου.


## Αναφορές

* [Πώς να εγκαταστήσετε το Prometheus στο Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Δημιουργία ενός πίνακα ελέγχου με το Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Υποστήριξη Grafana για το Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Παρακολούθηση μετρήσεων Linux χρησιμοποιώντας το node exporter](https://prometheus.io/docs/guides/node-exporter/)
* [Ερωτήματα στο Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Οπτικοποίηση μετρήσεων κόμβου](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Εξαγωγέας Prometheus για το Substrate](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Μετρική κόμβου Polkadot](https://grafana.com/grafana/dashboards/12425)
* [Πίνακας ελέγχου Node Exporter για το Prometheus](https://grafana.com/grafana/dashboards/11074)
* [Μετρήσεις Grafana ROBONOMICS (XRT)](https://grafana.com/grafana/dashboards/13015)