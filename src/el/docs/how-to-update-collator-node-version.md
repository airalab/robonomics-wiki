---
title: Πώς να Ενημερώσετε την Έκδοση του Κόμβου Collator του Robonomics

contributors: [Leemo94]
---

Συνιστάται να έχετε διαβάσει τα παρακάτω άρθρα πριν από την ανάγνωση αυτής της ανάρτησης: ["Πώς να Κατασκευάσετε τον Κόμβο Collator"](/docs/how-to-build-collator-node) & ["Πώς να Ξεκινήσετε τον Κόμβο Robonomics"](/docs/how-to-launch-the-robonomics-collator).

Αυτό το άρθρο περιέχει τις εντολές που απαιτούνται για την ενημέρωση ενός κόμβου collator του Robonomics (που τρέχει σε Ubuntu), καθώς και ένα παράδειγμα μετά.

## **Απαιτούμενες Εντολές**

0. Πριν ξεκινήσετε, συνιστάται να έχετε συνδεθεί ως `root`, αν όχι, τότε θα σας συνιστούσα να χρησιμοποιήσετε:

```shell
sudo su -
```

1. Διακόψτε την υπηρεσία Robonomics:

```shell
systemctl stop robonomics.service
```

2. Αφαιρέστε την προηγούμενη έκδοση του Robonomics (βεβαιωθείτε ότι βρίσκεστε στον σωστό κατάλογο):

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

3. Λάβετε την [τελευταία έκδοση](https://github.com/airalab/robonomics/releases) του Robonomics:

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

4. Αποσυμπιέστε το αρχείο:

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

5. Μετακινήστε το αρχείο:

```shell
mv robonomics /usr/local/bin/
```

{% roboWikiNote {type: "note"}%} Πρέπει να μετακινήσετε αυτό το αρχείο στον σωστό κατάλογο όπου εγκαταστήσατε τον κόμβο Robonomics {% endroboWikiNote %}

6. Εκκινήστε το Robonomics:

```shell
systemctl start robonomics.service
```

Παράδειγμα για αναβάθμιση του κόμβου collator σε Robonomics v1.8.4:

```shell
sudo su -
cd /home/admin
systemctl stop robonomics.service
rm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz
wget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
tar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
mv robonomics /usr/local/bin/
systemctl start robonomics.service
```

## **Αλλαγή της Βάσης Δεδομένων της Αλυσίδας Ρελέ Kusama χωρίς Ορισμένη Βάση Δεδομένων**

Υπάρχουν καταστάσεις όπου συγκεκριμένα αποσπάσματα της Αλυσίδας Ρελέ Kusama προκαλούν σφάλματα στον κόμβο σας. Αυτό συνήθως οδηγεί στον τερματισμό του κόμβου σας. Παράδειγμα σφάλματος που προκαλείται από κατεστραμμένη βάση δεδομένων της Αλυσίδας Ρελέ:

```shell
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] GRANDPA voter error: could not complete a round on disk: Database
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Essential task `grandpa-voter` failed. Shutting down service.
Dec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Service(Other("Essential task failed."))
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
ec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Service(Client(Backend("Invalid argument: Column families not opened: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0")))
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
```

Για να διορθώσετε αυτό το σφάλμα, πρέπει να αφαιρέσετε την υπάρχουσα βάση δεδομένων της Αλυσίδας Ρελέ Kusama (πιθανόν RocksDb) και να την αντικαταστήσετε με μια άλλη Db, όπως το ParityDb. Εκτελέστε τις παρακάτω εντολές:

1. Βρείτε τον κατάλογο του κόμβου Robonomics και ελέγξτε τα αρχεία:

```shell
cd /home/robonomics/
ls -a
```

2. Βεβαιωθείτε ότι βλέπετε τον κατάλογο polkadot και μετά μεταβείτε στον κατάλογο chains:

```shell
cd /polkadot/chains/
ls -a
```

3. Διαγράψτε τον κατάλογο `ksmcc3`:

```shell
rm -r ksmcc3
```

4. Δημιουργήστε έναν νέο κατάλογο `ksmcc3`.

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

5. Τώρα πρέπει να κατεβάσετε ένα νέο απόσπασμα. Αυτό το παράδειγμα χρησιμοποιεί ένα απόσπασμα της αλυσίδας ρελέ που έχει υποστεί έντονη περικοπή, αλλά μπορείτε να το αντικαταστήσετε με οποιοδήποτε άλλο απόσπασμα προτιμάτε.

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

6. Ενώ το απόσπασμα κατεβαίνει, ανοίξτε μια νέα συνεδρία και επεξεργαστείτε το αρχείο υπηρεσίας σας:

```shell
sudo nano /etc/systemd/system/robonomics.service
```

Τροποποιήστε τις γραμμές μέσα στο αρχείο υπηρεσίας που σχετίζονται με τη βάση δεδομένων και την περικοπή:

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

Χρησιμοποιήστε `Ctrl + S` και στη συνέχεια `Ctrl + X` για να αποθηκεύσετε και να βγείτε από το αρχείο υπηρεσίας.

7. Τώρα πρέπει να επαναφορτώσετε τον δαίμονά σας.

```shell
systemctl daemon-reload
```

8. Μέχρι αυτή τη στιγμή, στην άλλη συνεδρία σας, ελπίζουμε ότι το νέο Db έχει κατέβει, οπότε αποσυμπιέστε το αρχείο:

```shell
tar -xvzf ksm_pruned.tar.gz
```

9. Αφού ολοκληρωθεί η αποσυμπίεση, εκτελέστε τα παρακάτω:

```shell
chown -R robonomics:robonomics paritydb
```

10. Τώρα μπορείτε να ξεκινήσετε την υπηρεσία, να την παρακολουθήσετε για οποιαδήποτε σφάλματα και να ελέγξετε ότι συνδέεται τόσο στην αλυσίδα ρελέ όσο και στην παραλλαγή:

```shell
systemctl start robonomics && journalctl -fu robonomics
```