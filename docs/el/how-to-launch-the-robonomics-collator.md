---
title: Πώς να ξεκινήσετε τον συλλέκτη Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="note" title="Note">
  Στο συνεχόμενο βίντεο και στις στιγμιότυπες οθόνης αυτού του άρθρου, χρησιμοποιήσαμε την έκδοση 1.4.0 του Robonomics. Θα πρέπει να χρησιμοποιήσετε τις ίδιες εντολές, αλλά να αντικαταστήσετε την έκδοση του Robonomics με την τρέχουσα.
</robo-wiki-note>

https://youtu.be/wUTDDLDbzTg

Αυτήν τη στιγμή, το δίκτυο Robonomics διατηρείται κυρίως από τους αρχικούς προγραμματιστές, αλλά οποιοσδήποτε μπορεί να υποστηρίξει το έργο. Κάθε πιπλέον πλήρης κόμβος της αλυσίδας μπλοκ βοηθά να γίνει πιο βιώσιμο και ανθεκτικό σε σφάλματα. Οι δυαδικοί κόμβοι του Robonomics είναι διαθέσιμοι στο [release](https://github.com/airalab/robonomics/releases) assets ή μπορεί να δημιουργηθεί [από την πηγή](/docs/how-to-build-collator-node/).

## Τι είναι ένας συλλέκτης

Ένας Συλλέκτης είναι μέρος του Robonomics parachain. Αυτός ο τύπος κόμβου δημιουργεί νέα μπλοκ για την αλυσίδα Robonomics.

>Οι συλλέκτες διατηρούν τα parachains συλλέγοντας συναλλαγές parachain από χρήστες και παράγοντας αποδείξεις μετάβασης κατάστασης για τους επικυρωτές της Relay Chain. Με άλλα λόγια, οι συλλέκτες διατηρούν τα parachains συγκεντρώνοντας συναλλαγές parachain σε υποψήφια μπλοκ parachain και παράγοντας αποδείξεις μετάβασης κατάστασης για τους επικυρωτές βάσει αυτών των μπλοκ.

Μπορείτε να μάθετε περισσότερα για τους συλλέκτες στη σχετική [σελίδα του wiki του Polkadot](https://wiki.polkadot.network/docs/learn-collator)

Στην parachain Robonomics, κάθε ταξινομητής λαμβάνει ανταμοιβές (**0,001598184 XRT**) για κάθε μπλοκ που δημιουργεί ο ταξινομητής (οι ανταμοιβές εμφανίζονται όταν τα μπλοκ σφραγίζονται στην αλυσίδα).
Επίσης, ο συλλέκτης που δημιουργεί το μπλοκ λαμβάνει **50% των προμηθειών συναλλαγών** που περιέχονται στο μπλοκ που δημιουργούν.

## Απαιτήσεις

Συνιστάται να ξεκινήσετε έναν συλλέκτη χρησιμοποιώντας τις **τυπικές απαιτήσεις υλικού** για τους [επικυρωτές του Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ Συμβατό με x86-64.
+ Intel Ice Lake, ή νεότερο (Xeon ή Core σειρά); AMD Zen3, ή νεότερο (EPYC ή Ryzen).
+ 4 φυσικοί πυρήνες @ 3.4GHz.
+ Απενεργοποιημένη ταυτόχρονη πολυνηματοποίηση (Hyper-Threading στην Intel, SMT στην AMD).
+ Αποθήκευση - Ένας NVMe SSD 1 TB (Καθώς πρέπει να έχει λογικό μέγεθος για να αντιμετωπίσει την ανάπτυξη της αλυσίδας μπλοκ).
+ Μνήμη - 32 GB DDR4 ECC


Σε αυτό το άρθρο χρησιμοποιούμε τις επόμενες προδιαγραφές:
+ 4 vCPU
+ 700 GB χώρου NVMe για τις βάσεις δεδομένων του συλλέκτη. Απαιτείται η δυνατότητα επέκτασης αυτού του χώρου δίσκου.
+ 8GB RAM


## Σημαντικές πληροφορίες
1. Χρησιμοποιούμε μερικές μεταβλητές σε αυτές τις οδηγίες και θα πρέπει να αντικαταστήσετε τις τιμές με τις δικές σας σε όλες τις εντολές:
    + **%NODE_NAME%** είναι το όνομα του κόμβου. Παράδειγμα: *my-robonomics-kusama-collator*
    + **%BASE_PATH%** είναι η διαδρομή προς τοποθετημένο όγκο. Παράδειγμα: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** είναι η διεύθυνση λογαριασμού στο οικοσύστημα του Polkadot σε μορφή SS58. Παράδειγμα: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Σημειώστε ότι πρέπει να περιλαμβάνετε το *--state-cache-size=0* στην εκκίνηση της υπηρεσίας του συλλέκτη. Αυτή η παράμετρος είναι σημαντική για την σταθερότητα του συλλέκτη.
Μπορείτε να δείτε περισσότερες πληροφορίες στο σχετικό [θέμα](https://github.com/airalab/robonomics/issues/234) στο github.

## Πρώτη φορά εύκολα ξεκινήστε έναν συλλέκτη Robonomics

Μπορείτε εύκολα να ξεκινήσετε έναν συλλέκτη απευθείας από τη γραμμή εντολών για να ελέγξετε για σφάλματα.
Μετά από αυτό, συνιστάται ιδιαίτερα να ξεκινήσετε τον συλλέκτη Robonomics ως υπηρεσία (δείτε το επόμενο βήμα).

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


## Ξεκινήστε τον συλλέκτη Robonomics ως υπηρεσία

1. Δημιουργήστε τον χρήστη για την υπηρεσία με τον κατάλογο αρχικού καταλόγου
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Κατεβάστε, αποσυμπιέστε και μετακινήστε το δυαδικό του Robonomics στον κατάλογο */usr/local/bin/*. Θα πρέπει να αντικαταστήσετε το *$ROBONOMICS_VERSION* με την τρέχουσα έκδοση του Robonomics στις εντολές σε αυτήν την ενότητα. Μπορείτε να βρείτε την τρέχουσα έκδοση στη [σελίδα Κυκλοφορίας του αποθετηρίου Robonomics στο github](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```
   ![Download Robonomics 1.4.0 binary](../images/how-to-launch-the-robonomics-collator/wget_binary.png)


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

    ![Create Robonomics service file](../images/how-to-launch-the-robonomics-collator/nano_robonomics_service.png)


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Αποθηκεύστε αυτό το αρχείο, και στη συνέχεια ενεργοποιήστε και ξεκινήστε την υπηρεσία:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service 
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

Διεύθυνση URL τηλεμετρίας: https://telemetry.parachain.robonomics.network/#/Robonomics

Τα αρχεία καταγραφής συλλαγτών μπορούν να παρακολουθούνται με: `journalctl -u robonomics.service -f`

Μόλις εκκινηθεί ο συλλέκτης Robonomics, θα αρχίσει να συγχρονίζεται με την αλυσίδα αναμετάδοσης Kusama, αυτό μπορεί να διαρκέσει σημαντικό χρόνο, ανάλογα με την ταχύτητα του δικτύου σας και τις προδιαγραφές του συστήματός σας, γι' αυτό σας συνιστούμε να κάνετε λήψη ενός στιγμιότυπου Kusama.


## Επιτάχυνση της διαδικασίας συγχρονισμού χρησιμοποιώντας ένα στιγμιότυπο Kusama

Συνιστούμε να το κάνετε αμέσως μετά τη δημιουργία και την έναρξη της υπηρεσίας Robonomics. Μπορείτε να βρείτε περισσότερες πληροφορίες σχετικά με τα στιγμιότυπα και τις οδηγίες χρήσης στην ακόλουθη σελίδα: https://ksm-rocksdb.polkashots.io/

Οδηγίες:

1. Διακόψτε την υπηρεσία Robonomics και αφαιρέστε τον τρέχοντα κατάλογο βάσης δεδομένων Kusama:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Κατεβάστε το πραγματικό στιγμιότυπο και αποσυμπιέστε το:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```
    ![Download Kusama snapshot](../images/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png)

    Μπορείτε να αφαιρέσετε το ληφθέν αρχείο μετά την επιτυχή αποσυσκευασία:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Ορίστε τη σωστή κυριότητα για τον φάκελο της βάσης δεδομένων:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Ξεκινήστε ξανά την υπηρεσία Robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. Ελέγξτε τα αρχεία καταγραφής της υπηρεσίας:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```    
    ![Check service logs](../images/how-to-launch-the-robonomics-collator/finish_journalctl.png)

## Επίλυση Προβλημάτων
### Σφάλμα: "State Database error: Too many sibling blocks inserted"
Για να διορθώσετε αυτό το σφάλμα, μπορείτε απλώς να εκκινήσετε τον ταξινομητή σας σε λειτουργία αρχειοθέτησης:

1) Πρώτα, χρειάζεται να διακόψετε την υπηεσία Robonomics: 
    
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

3) Επαναφορτώστε τη διαμόρφωση του διαχειριστή systemd:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) Αφαιρέστε την υπάρχουσα βάση δεδομένων parachain:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Ξεκινήστε την υπηρεσία robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    Μετά από αυτό, χρειάζεται να περιμένετε για τον συγχρονισμό της βάσης δεδομένων parahain.

### Σφάλμα: "cannot create module: compilation settings are not compatible with the native host"
Αυτό το σφάλμα σχετίζεται με τις παραμέτρους εικονικοποίησης. Χρειάζεται να χρησιμοποιήσετε τον τύπο "host-model" του εμούλαριστου επεξεργαστή. Μπορείτε να ρυθμίσετε αυτό στον κεντρικό υπολογιστή εικονικοποίησης.

Ωστόσο, αν αντιμετωπίσετε αυτό το σφάλμα σε οποιοδήποτε φιλοξενούμενο, χρειάζεται να ζητήσετε υποστήριξη από την τεχνική υποστήριξη για αυτό το πρόβλημα μόνο.
