---
title: Πώς να εκκινήσετε τον συλλέκτη Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---


{% roboWikiNote {title:"σημείωση", type: "σημείωση"}%} Στο screencast και στις στιγμιότυπες οθόνης αυτού του άρθρου, χρησιμοποιήσαμε την έκδοση 1.4.0 του Robonomics. Πρέπει να χρησιμοποιήσετε τις ίδιες εντολές, αλλά να αντικαταστήσετε την έκδοση του Robonomics με την τρέχουσα.{% endroboWikiNote %}

https://youtu.be/wUTDDLDbzTg

Προς το παρόν, το δίκτυο Robonomics διατηρείται κυρίως από τους αρχικούς προγραμματιστές, αλλά οποιοσδήποτε μπορεί να υποστηρίξει το έργο. Κάθε επιπλέον πλήρες κόμβο της αλυσίδας βοηθάει να γίνει πιο βιώσιμο και ανθεκτικό στα σφάλματα. Τα δυαδικά αρχεία κόμβου Robonomics είναι διαθέσιμα στα [αντικείμενα κυκλοφορίας](https://github.com/airalab/robonomics/releases) ή μπορεί να [δημιουργηθεί από την πηγή](/docs/how-to-build-collator-node/).

## Τι είναι ένας συλλέκτης

Ένας Συλλέκτης είναι μέρος της παρακαταθηκών Robonomics. Αυτός ο τύπος κόμβου δημιουργεί νέα τμήματα για την αλυσίδα Robonomics.

>Οι Συλλέκτες διατηρούν τις παρακαταθήκες συλλέγοντας συναλλαγές παρακαταθηκών από χρήστες και παράγοντας αποδείξεις μετάβασης κατάστασης για τους επικυρωτές της Αλυσίδας Ρελέ. Με άλλα λόγια, οι συλλέκτες διατηρούν τις παρακαταθήκες συγκεντρώνοντας συναλλαγές παρακαταθηκών σε υποψήφια τμήματα παρακαταθηκών και παράγοντας αποδείξεις μετάβασης κατάστασης για τους επικυρωτές βάσει αυτών των τμημάτων.

Μπορείτε να μάθετε περισσότερα για τους συλλέκτες στη σχετική [σελίδα wiki του Polkadot](https://wiki.polkadot.network/docs/learn-collator)

Στην παρακαταθήκη Robonomics, κάθε συλλέκτης λαμβάνει ανταμοιβές (**0.001598184 XRT**) για κάθε τμήμα που δημιουργεί ο συλλέκτης (οι ανταμοιβές συμβαίνουν όταν τα τμήματα σφραγίζονται στην αλυσίδα).
Επίσης, ο συλλέκτης που δημιουργεί το τμήμα λαμβάνει **50% των προμηθειών συναλλαγών** που περιέχονται στο τμήμα που δημιουργούν.

## Απαιτήσεις

Συνιστάται να εκκινήσετε ένα συλλέκτη χρησιμοποιώντας τις **τυπικές απαιτήσεις υλικού** για τους [επικυρωτές Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ x86-64 συμβατό.
+ Intel Ice Lake, ή νεότερο (σειρά Xeon ή Core); AMD Zen3, ή νεότερο (EPYC ή Ryzen).
+ 4 φυσικοί πυρήνες @ 3.4GHz.
+ Απενεργοποιημένη πολυνηματοποίηση (Hyper-Threading στην Intel, SMT στην AMD).
+ Αποθήκευση - Ένα NVMe SSD των 1 TB (Καθώς πρέπει να έχει λογικό μέγεθος για να αντιμετωπίσει την αύξηση της αλυσίδας μπλοκ).
+ Μνήμη - 32 GB DDR4 ECC


Σε αυτό το άρθρο χρησιμοποιούμε τις επόμενες προδιαγραφές:
+ 4 vCPU
+ 700 GB χώρου NVMe για τις βάσεις δεδομένων του συλλέκτη. Απαιτείται η δυνατότητα επέκτασης αυτού του χώρου δίσκου.
+ 8GB RAM


## Σημαντικές πληροφορίες
1. Χρησιμοποιούμε μερικές μεταβλητές σε αυτές τις οδηγίες και θα πρέπει να αντικαταστήσετε τις τιμές για τις δικές σας σε όλες τις εντολές:
    + **%NODE_NAME%** είναι το όνομα του κόμβου. Παράδειγμα: *my-robonomics-kusama-collator*
    + **%BASE_PATH%** είναι η διαδρομή προς τοποθετημένο όγκο. Παράδειγμα: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** είναι η διεύθυνση λογαριασμού στο οικοσύστημα του Polkadot σε μορφή SS58. Παράδειγμα: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Σημειώστε ότι πρέπει να συμπεριλάβετε το *--state-cache-size=0* στην εκκίνηση της υπηρεσίας του συλλέκτη. Αυτή η παράμετρος είναι σημαντική για τη σταθερότητα του συλλέκτη.
Μπορείτε να δείτε περισσότερες πληροφορίες στο σχετικό [θέμα](https://github.com/airalab/robonomics/issues/234) στο github.

## Εκκίνηση εύκολα ενός συλλέκτη Robonomics

Μπορείτε εύκολα να εκκινήσετε ένα συλλέκτη απευθείας από τη γραμμή εντολών για να ελέγξετε για σφάλματα.
Μετά από αυτό, συνιστάται ανεπιφύλακτα να εκκινήσετε τον συλλέκτη Robonomics ως υπηρεσία (δείτε το επόμενο βήμα).

```
root@robokusama-collator-screencast:~# robonomics \
  --parachain-id=2048 \
  --name="%NODE_NAME%" \
  --validator \
  --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
  --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
  --base-path="%BASE_PATH%" \
  --state-cache-size=0 \
  -- \
  --database=RocksDb
```


## Εκκίνηση του συλλέκτη Robonomics ως υπηρεσία

1. Δημιουργήστε τον χρήστη για την υπηρεσία με κατάλογο αρχικού καταλόγου
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Κατεβάστε, εξαγάγετε και μετακινήστε το δυαδικό αρχείο Robonomics στον κατάλογο */usr/local/bin/*. Θα πρέπει να αντικαταστήσετε το *$ROBONOMICS_VERSION* με την τρέχουσα έκδοση του Robonomics στις εντολές σε αυτήν την ενότητα. Μπορείτε να βρείτε την τρέχουσα έκδοση στη [σελίδα κυκλοφορίας του αποθετηρίου Robonomics στο github](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```

	 		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_binary.png", alt:"Λήψη δυαδικού Robonomics 1.4.0"} %}{% endroboWikiPicture %}


3. Δημιουργήστε το αρχείο υπηρεσίας systemd με το όνομα *robonomics.service*:
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    Και προσθέστε τις παρακάτω γραμμές στο αρχείο υπηρεσίας:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
      --parachain-id=2048 \
      --name="%NODE_NAME%" \
      --validator \
      --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
      --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
      --base-path="%BASE_PATH%" \
      --state-cache-size=0 \
      --execution=Wasm \
      -- \
      --database=RocksDb \
      --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/nano_robonomics_service.png", alt:"Δημιουργία αρχείου υπηρεσίας Robonomics"} %}{% endroboWikiPicture %}


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Αποθηκεύστε αυτό το αρχείο, στη συνέχειαama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png", alt:"Λήψη στιγμιότυπου Kusama"} %}{% endroboWikiPicture %}

    Μπορείτε να αφαιρέσετε το ληφθέν αρχείο μετά την επιτυχή αποσυμπίεση:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Ρύθμιση της σωστής ιδιοκτησίας για τον φάκελο της βάσης δεδομένων:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Εκκίνηση της υπηρεσίας Robonomics ξανά:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. Έλεγχος των αρχείων καταγραφής της υπηρεσίας:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/finish_journalctl.png", alt:"Έλεγχος αρχείων καταγραφής υπηρεσίας"} %}{% endroboWikiPicture %}

## Αντιμετώπιση προβλημάτων
### Σφάλμα: "Σφάλμα βάσης δεδομένων κατάστασης: Εισήχθησαν πολλά αδελφικά μπλοκ"
Για να διορθώσετε αυτό το σφάλμα, μπορείτε απλά να εκκινήσετε τον συλλέκτη σας σε λειτουργία αρχείου:

1) Πρώτα, πρέπει να σταματήσετε την υπηρεσία Robonomics:

    root@robokusama-collator-screencast:~# systemctl stop robonomics.service


2) Στη συνέχεια, προσθέστε την παράμετρο `--state-pruning=archive` στο τμήμα parachain του αρχείου υπηρεσίας. Παράδειγμα του επεξεργασμένου αρχείου υπηρεσίας:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
    --parachain-id=2048 \
    --name="%NODE_NAME%" \
    --validator \
    --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    --base-path="%BASE_PATH%" \
    --state-cache-size=0 \
    --execution=Wasm \
    --state-pruning=archive \
    -- \
    --database=RocksDb \
    --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

3) Επαναφόρτωση της διαμόρφωσης του διαχειριστή systemd:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) Αφαίρεση της υπάρχουσας βάσης δεδομένων parachain:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Έναρξη της υπηρεσίας robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    Μετά από αυτό, πρέπει να περιμένετε για τον συγχρονισμό της βάσης δεδομένων parachain.

### Σφάλμα: "δεν είναι δυνατή η δημιουργία μονάδας: οι ρυθμίσεις συλλογής δεν είναι συμβατές με τον τοπικό φορέα"
Αυτό το σφάλμα σχετίζεται με τις παραμέτρους εικονικοποίησης. Χρειάζεται να χρησιμοποιήσετε τον τύπο "host-model" του εμούλαριστου επεξεργαστή. Μπορείτε να το ρυθμίσετε αυτό στον φορέα εικονικοποίησης.

Ωστόσο, αν αντιμετωπίσετε αυτό το σφάλμα σε οποιονδήποτε φορέα φιλοξενίας, πρέπει να ζητήσετε από την τεχνική υποστήριξη να σας βοηθήσει με αυτό το πρόβλημα μόνο.