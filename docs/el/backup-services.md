---
title: Υπηρεσίες Αντιγράφου Ασφαλείας

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Σε αυτό το άρθρο, θα μάθετε πώς να δημιουργήσετε αντίγραφα ασφαλείας της διαμόρφωσης του Home Assistant και πώς να την ανακτήσετε όταν χρειαστεί. Για να δημιουργήσετε αντίγραφα ασφαλείας, καλείται μια υπηρεσία που δημιουργεί ένα ασφαλές αρχείο με τα αρχεία διαμόρφωσης. Επίσης, η υπηρεσία προσθέτει τη διαμόρφωση του Mosquitto brocker και του Zigbee2MQTT στο αντίγραφο ασφαλείας, αν υπάρχουν. Στη συνέχεια, η υπηρεσία προσθέτει το αρχείο στο IPFS και αποθηκεύει το αποτέλεσμα CID στο Robonomics Digital Twin.**
## Δημιουργία Αντιγράφου Ασφαλείας της Διαμόρφωσης του Home Assistant

Η δημιουργία ενός αντιγράφου ασφαλείας σας επιτρέπει να ανακτήσετε εύκολα τη διαμόρφωση του Home Assistant σε περίπτωση αποτυχίας.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type:'mp4'}]" />

<robo-wiki-note type="warning" title="ΠΡΟΕΙΔΟΠΟΙΗΣΗ">

Για να δημιουργήσετε αντίγραφα ασφαλείας και να ανακτήσετε τη διαμόρφωσή σας, είναι απαραίτητο να χρησιμοποιήσετε ένα **προσαρμοσμένο πύλη IPFS** όπως το Pinata. Χωρίς αυτό, το αντίγραφο ασφαλείας θα αποθηκευτεί αποκλειστικά σον τοπικό κόμβο IPFS σας, πράγμα που μπορεί να σας εμποδίσει να ανακτήσετε τη διαμόρφωση του Home Assistant σε περίπτωση αποτυχίας του τοπικού κόμβου.

</robo-wiki-note>

1. Στη διεπαφή χρήστη του Home Assistant, μεταβείτε στο `Developer Tools` -> `Services`. Αναζήτηση για `Robonomics: Save Backup to Robonomics` και πατήστε `CALL SERVICE`.

2. Περιμένετε μέχρι να εμφανιστεί η ειδοποίηση `Backup was updated in Robonomics` στο `Notification`.

<robo-wiki-note type="warning" title="ΠΡΟΕΙΔΟΠΟΙΗΣΗ">

Μην προσπαθήσετε να δημιουργήσετε ένα αντίγραφο ασφαλείας ή να ανακτήσετε τη διαμόρφωση αμέσως μετά τη φόρτωση του Home Assistant και της Ενσωμάτωσης Robonomics. Παρακαλώ, **περιμένετε περίπου 5 λεπτά** για να επιτραπεί η αρχική ρύθμιση.

</robo-wiki-note>

Παράμετροι υπηρεσίας:
- **Πλήρες Αντίγραφο Ασφαλείας**  (default: False) - προσθέστε τη βάση δεδομένων στο αντίγραφο ασφαλείας, έτσι ώστε να αποθηκεύονται και οι ιστορικοί καταγραφής των καταστάσεων των οντοτήτων.
- **Διαδρομή προς το αρχείο κωδικού πρόσβασης του mosquitto** (default: `/etc/mosquitto`) - Εάν χρησιμοποιήσατε τις μεθόδους εγκατάστασης Home Assistant Core ή Docker και δεν έχετε την προεπιλεγμένη διαδρομή προς τον Mosquitto brocker, θα πρέπει να αλλάξετε αυτήν την παράμετρο. *Δεν απαιτείται για το Home Assistant OS ή το Superviser*.

## Ανάκτηση της Διαμόρφωσης του Home Assistant από Αντίγραφο Ασφαλείας

Για να ανακτήσετε τη διαμόρφωσή σας, θα χρειαστεί να έχετε εγκατεστημένο το Home Assistant και την Ενσωμάτωση Robonomics. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type:'mp4'}]" />

<robo-wiki-note type="warning" title="ΠΡΟΕΙΔΟΠΟΙΗΣΗ">

Για να διασφαλίσετε την επιτυχή ανάκτηση της διαμόρφωσής σας στις μεθόδους εγκατάστασης Home Assistant Core και Docker, πρέπει να εκτελέσετε επιπλέον βήματα ρύθμισης όπως περιγράφεται στο τέλος της σελίδας.

</robo-wiki-note>

1. Εγκαταστήστε το Home Assisntant με την Ενσωμάτωση Robonomics (εάν δεν έχει εγκατασταθεί ακόμα), ακολουθώντας τα βήματα από το άρθρο για την [επιθυμητή μέθοδο εγκατάστασης](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-εδώ-your-smart-home).

2.  [Ρύθμιση Ενσωμάτωσης Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration) χρησιμοποιώντας **τους ίδιους κωδικούς σπόρων** που χρησιμοποιήσατε στην προηγούμενη ρύθμιση Robonomics. Εάν η συνδρομή σας έχει λήξει, [επανενεργοποιήστε την](https://wiki.robonomics.network/docs/sub-activate).

3. Στην διεπαφή ιστού του Home Assistant πηγαίνετε στην `Developer Tools` -> `Services`. Search for `Robonomics: Restore from the Backup in Robonomics` αντίστοιχα. Ωστόσο, αυτές οι διαδρομές μπορεί να διαφέρουν ανάλογα με την συγκεκριμένη εγκατάστασή σας. και στη συνέχεια, στο αναδυόμενο παράθυρο, επιτρέψτε στην επέκταση να το κάνει. `CALL SERVICE`. Πλοηγηθείτε στην `Overview` σελίδα, για να ελέγξετε την κατάσταση του αντιγράφου ασφαλείας σας.

4. Μετά την αποκατάσταση, το Home Assistant θα επανεκκινήσει αυτόματα. Εάν για οποιονδήποτε λόγο το Home Assistant δεν επανεκκινηθεί, μπορείτε να ελέγξετε την κατάσταση της αποκατάστασης παρακολουθώντας την κατάσταση του `robonomics.backup` οντότητας. Εάν η κατάσταση είναι `restored` θα πρέπει να επανεκκινήσετε το Home Assistant χειροκίνητα πηγαίνοντας στην `Settings` > `System` και κάνοντας κλικ στο κουμπί `RESTART` που βρίσκεται στην πάνω δεξιά γωνία.

5. Εάν το αντίγραφο ασφαλείας σας περιλαμβάνει την ρύθμιση του Zigbee2MQTT ή Mosquitto, θα πρέπει να επανεκκινήσετε αυτές τις υπηρεσίες για να ενεργοποιήσετε τη νέα ρύθμιση. Μπορείτε να το κάνετε αυτό χειροκίνητα επανεκκινώτας τις υπηρεσίες ξεχωριστά, ή μπορείτε απλά να επανεκκινήσετε τον υπολογιστή του Home Assistant για να βεβαιωθείτε ότι όλες οι υπηρεσίες επανεκκινούν.

Επιχειρήματα υπηρεσίας:
- **Path to mosquitto αρχείο κωδικού πρόσβασης** (default: `/etc/mosquitto`) - Εάν χρησιμοποιήσατε τις μεθόδους εγκατάστασης Home Assistant Core ή Docker και δεν έχετε την προεπιλεγμένη διαδρομή για τον Mosquitto brocker, θα πρέπει να αλλάξετε αυτήν την παράμετρο. *Δεν απαιτείται για το Home Assistant OS ή το Superviser*.
- **Διαδρομή για την ρύθμιση του Zigbee2MQTT**  (default: `/opt/zigbee2mqtt`) - Εάν χρησιμοποιήσατε τις μεθόδους εγκατάστασης Home Assistant Core ή Docker και δεν έχετε την προεπιλεγμένη διαδρομή για το Zigbee2MQTT, θα πρέπει να αλλάξετε αυτήν την παράμετρο. *Δεν απαιτείται για το Home Assistant OS ή το Superviser*.

## Αποκατάσταση Ρυθμίσεων Mosquitto και Zigbee2MQTT για την Μέθοδο Εγκατάστασης Home Assistant Core

Εάν το αντίγραφο ασφαλείας περιλαμβάνει την ρύθμιση για το Mosquitto ή το Zigbee2MQTT, κατά τη διαδικασία αποκατάστασης, θα τοποθετηθούν στην προεπιλεγμένη διαδρομή ή στη διαδρομή που καθορίζεται στα ορίσματα. Ωστόσο, εάν εγκαταστήσατε την ενσωμάτωση Robonomics σε ένα υπάρχον Home Assistant Core *(όχι από την προεγκατεστημένη εικόνα Robonomics)*, the `homeassistant` ο χρήστης μπορεί να μην έχει πρόσβαση σε αυτήν τη διαδρομή.

Έτσι, για να αποκαταστήσετε τη ρύθμιση του Mosquitto και του Zigbee2MQTT, θα πρέπει να χορηγήσετε τα απαραίτητα δικαιώματα ανάγνωσης στον χρήστη `homeassistant`:
```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Αντίγραφο Ασφαλείας Ρυθμίσεων Mosquitto και Zigbee2MQTT για την Μέθοδο Εγκατάστασης Home Assistant Docker

Για να δημιουργήσετε αντίγραφα ασφαλείας των ρυθμίσεων Mosquitto και Zigbee2MQTT από έναν δοχείο Docker, θα πρέπει να δημιουργήσετε όγκους για τις αντίστοιχες ρυθμίσεις τους. Αυτό μπορεί να επιτευχθεί εκτελώντας τον δοχείο του Home Assistant με επιπλέον ορίσματα:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

ή να κάνετε αλλαγές στο αρχείο σας `compose.yaml`.

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```
<robo-wiki-note type="note" title="Note">

Λάβετε υπόψη ότι οι προεπιλεγμένες διαδρομές για τις διαμορφώσεις Mosquitto και Zigbee2MQTT είναι `/etc/mosquitto` και `/opt/zigbee2mqtt`, αντίστοιχα. Ωστόσο, αυτές οι διαδρομές ενδέχεται να διαφέρουν ανάλογα με τη συγκεκριμένη ρύθμιση.

</robo-wiki-note>


## Κουμπιά Αντιγράφου Ασφαλείας 

Εκτός από τη χρήση υπηρεσιών για την εργασία με αντίγραφα ασφαλείας, μπορείτε να απλοποιήσετε τη διαδικασία χρησιμοποιώντας τα κουμπιά από την ενσωμάτωση Robonomics. Αυτά τα κουμπιά καλούν τις αντίστοιχες υπηρεσίες με προεπιλεγμένες παραμέτρους (το κουμπί αντιγράφου ασφαλείας δημιουργεί ένα αντίγραφο ασφαλείας χωρίς ιστορικό). Βεβαιωθείτε ότι είστε συνδεδεμένοι με το Robonomics Parachain τώρα `create_backup` and `button.restore_from_backup`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type:'mp4'}]" />

Για να προσθέσετε κουμπιά στον πίνακα ελέγχου σας, ακολουθήστε αυτά τα βήματα:

1. Κάντε κλικ στις τρεις τελείες στην πάνω δεξιά γωνία του πίνακα ελέγχου.
2. Επιλέξτε `Edit Dashboard`
3. Κάνε κλικ στο κουμπί `Add Card` κάρτα στην κάτω δεξιά γωνία. 
4. Επιλέξτε το `Entities` 
5. Στο πεδίο `Entities` αναζήτησης, αναζητήστε τις οντότητες `button.create_backup `και `button.restore_from_backup`. 
6. Πατήστε `Save` για να προσθέσετε τις οντότητες στην κάρτα. 
7. Ολοκληρώστε την επεξεργασία κάνοντας κλικ `Done` στο κουμπί στην πάνω δεξιά γωνία. 