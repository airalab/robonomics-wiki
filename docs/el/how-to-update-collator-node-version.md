---
title: Πώς να ενημερώσετε την έκδοση του Robonomics Collator Node

contributors: [Leemo94]
---

Συνιστάται να έχετε διαβάσει τα παρακάτω άρθρα πριν από την ανάγνωση αυτής της ανάρτησης: ["Πώς να κατασκευάσετε τον κόμβο Collator"](/docs/how-to-build-collator-node) & ["Πώς να ξεκινήσετε τον Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator).

Αυτό το άρθρο περιέχει τις εντολές που απαιτούνται για την ενημέρωση ενός κόμβου Robonomics collator (που εκτελείται σε Ubuntu) και δίνει επίσης ένα παράδειγμα αμέσως μετά.

## **Απαιτούμενες Εντολές**

0. Πριν ξεκινήσετε, συνιστάται να είστε συνδεδεμένοι ως `root`, αν όχι, τότε θα σας συνιστούσα να χρησιμοποιήσετε:

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. Διακόψτε την υπηρεσία Robonomics:

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. Αφαιρέστε την προηγούμενη έκδοση του Robonomics (βεβαιωθείτε ότι βρίσκεστε στον σωστό κατάλογο):

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. Λάβετε την [τελευταία έκδοση](https://github.com/airalab/robonomics/releases) του Robonomics:

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. Αποσυμπιέστε το αρχείο:

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. Μετακινήστε το αρχείο:

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

Πρέπει να μετακινήσετε αυτό το αρχείο στον σωστό κατάλογο όπου εγκαταστήσατε τον κόμβο Robonomics)

</robo-wiki-note>

6. Ξεκινήστε το Robonomics:

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

Παράδειγμα για αναβάθμιση του κόμβου collator σε Robonomics v1.8.4:

<code-helper>

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
</code-helper>

## **Αλλαγή της Βάσης Δεδομένων της Αλυσίδας Ρελέ Kusama χωρίς Ορισμένη Βασική Διαδρομή**

Υπάρχουν στιγμές όπου ορισμένα αποτυπώματα της Αλυσίδας Ρελέ Kusama προκαλούν σφάλματα στον κόμβο σας. Αυτό συνήθως οδηγεί στον τερματισμό του κόμβου σας. Παράδειγμα σφάλματος που προκαλείται από κατεστραμμένη βάση δεδομένων της Αλυσίδας Ρελέ:

<code-helper>

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
</code-helper>

Για να διορθώσετε αυτό το σφάλμα, πρέπει να αφαιρέσετε την υπάρχουσα βάση δεδομένων της Αλυσίδας Ρελέ Kusama (πιθανότατα RocksDb) και να την αντικαταστήσετε με μια άλλη Db, όπως το ParityDb. Εκτελέστε τις παρακάτω εντολές:

1. Βρείτε τον κατάλογο του κόμβου Robonomics και ελέγξτε τα αρχεία:

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. Βεβαιωθείτε ότι βλέπετε τον κατάλογο polkadot και στη συνέχεια μεταβείτε στον κατάλογο chains:

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3. Διαγράψτε τον κατάλογο `ksmcc3`:

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. Δημιουργήστε ένα νέο κατάλογο `ksmcc3`.

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. Τώρα πρέπει να κατεβάσετε ένα νέο αποτύπωμα. Αυτό το παράδειγμα χρησιμοποιεί ένα αποτύπωμα της αλυσίδας ρελέ που έχει υποστεί έντονη περικοπή, αλλά μπορείτε να το αντικαταστήσετε με οποιοδήποτε αποτύπωμα προτιμάτε.

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. Ενώ το αποτύπωμα κατεβαίνει, ανοίξτε μια νέα συνεδρία και επεξεργαστείτε το αρχείο υπηρεσίας σας:


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

Τροποποιήστε τις γραμμές μέσα στο αρχείο υπηρεσίας που σχετίζονται με τη βάση δεδομένων και την περικοπή:

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
Χρησιμοποιήστε `Ctrl + S` και στη συνέχεια `Ctrl + X` για να αποθηκεύσετε και να βγείτε από το αρχείο υπηρεσίας.

7. Τώρα πρέπει να επαναφορτώσετε το daemon σας.

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. Μέχρι αυτή τη στιγμή, στην άλλη συνεδρία σας, ελπίζω ότι έχει κατεβάσει η νέα Db, οπότε αποσυμπιέστε το αρχείο:

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. Αφού ολοκληρωθεί η αποσυμπίεση, εκτελέστε τα παρακάτω:

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. Τώρα μπορείτε να ξεκινήσετε την υπηρεσία, να την παρακολουθείτε για οποιαδήποτε σφάλματα και να ελέγξετε ότι συνδέεται τόσο με την αλυσίδα ρελέ όσο και με την παραλλαγή.


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>