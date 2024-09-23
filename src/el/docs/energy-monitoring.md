---
title: Παρακολούθηση Ενέργειας
contributors: [nakata5321]
---
Αυτό το άρθρο θα σας δείξει τη διαδικασία εγκατάστασης της Παρακολούθησης Ενέργειας.

{% roboWikiNote {type: "warning"}%} Όλες οι συσκευές από τη Robonomics μπορούν να αγοραστούν από την επίσημη [ιστοσελίδα](https://robonomics.network/devices/).
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Βήμα 1 — Φλασάρισμα {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Όλες οι συσκευές από τη Robonomics έρχονται προ-φλασαρισμένες. Ωστόσο, επειδή όλες οι συσκευές είναι κιτ ανάπτυξης, οι οδηγίες θα καλύψουν την επιλογή του φλασαρίσματος της συσκευής από την αρχή. Αν δεν επιθυμείτε να το κάνετε αυτό τώρα, προχωρήστε στο [**Βήμα 2 - Σημείο Πρόσβασης**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

Πάρτε τη συσκευή από το κουτί και συνδέστε τη στον υπολογιστή. Στη συνέχεια, μεταβείτε στην ιστοσελίδα [webflasher.robonomics.network](https://webflasher.robonomics.network/). Αυτό είναι το web flasher.

{% roboWikiVideo {videos:[{src: 'QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Σημείωση! Το web flasher λειτουργεί μόνο με τον περιηγητή Google Chrome ή τον Microsoft Edge.
{% endroboWikiNote %}

Στο αναπτυσσόμενο μενού "Firmware" επιλέξτε την επιλογή **"ENERGY MONITOR"** και στη συνέχεια στο "SELECT CHIP" επιλέξτε **"ESP32-S3"**. Πατήστε το κουμπί **"CONNECT"**.
Θα εμφανιστεί ένα παράθυρο όπου θα πρέπει να επιλέξετε τη σειριακή θύρα στην οποία είναι συνδεδεμένη η συσκευή (συνήθως είναι `/ttyUSB0`). Στη συνέχεια, επιλέξτε **"INSTALL ENERGY-MONITOR_EN"**.
Στο επόμενο παράθυρο, μπορείτε να κάνετε **ΚΑΘΑΡΗ ΕΓΚΑΤΑΣΤΑΣΗ** επιλέγοντας το **ERASE DEVICE**. Πατήστε Επόμενο και στη συνέχεια Εγκατάσταση. Περιμένετε μέχρι να μεταφορτωθεί το firmware στη συσκευή Παρακολούθησης Ενέργειας.

Μετά την ολοκλήρωση της διαδικασίας εγκατάστασης, θα εμφανιστεί ένα παράθυρο ρύθμισης Wi-Fi. Καταχωρίστε τα διαπιστευτήρια Wi-Fi.

Αφού ρυθμίσετε το Wi-Fi, μπορείτε να επισκεφθείτε τη συσκευή μέσω του κουμπιού **VISIT DEVICE**. Αργότερα, μπορείτε να επισκεφθείτε τη συσκευή μέσω της διεύθυνσης IP στο δίκτυο. Για να τη βρείτε, μπορείτε να χρησιμοποιήσετε την εφαρμογή κινητού [Fing](https://www.fing.com/products) ή το
εργαλείο γραμμής εντολών [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Παραλείψτε το **Βήμα 2 — Σημείο Πρόσβασης** και πηγαίνετε στο [**Βήμα 3 — Ρύθμιση**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Βήμα 2 — Σημείο Πρόσβασης {% endroboWikiTitle %}

Αν πάρετε τον Ενεργειακό Παρακολουθητή από το κουτί και τον συνδέσετε στην πηγή τροφοδοσίας, θα δημιουργήσει ένα hotspot με το όνομα "robonomics-XXXXXXX". Συνδεθείτε σε αυτό. Θα πρέπει να ανοίξει το παράθυρο ρύθμισης. Αν όχι, ανοίξτε τον περιηγητή και μεταβείτε στη σελίδα `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Καταχωρίστε τα διαπιστευτήρια Wi-Fi. Μετά από αυτό, η συσκευή Παρακολούθησης Ενέργειας θα συνδεθεί στο δίκτυο Wi-Fi. Ελέγξτε τη συσκευή μέσω της διεύθυνσης IP της στο δίκτυο. Για να τη βρείτε, μπορείτε να χρησιμοποιήσετε την εφαρμογή κινητού [Fing](https://www.fing.com/products) ή το
εργαλείο γραμμής εντολών [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Βήμα 3 — Ρύθμιση {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Μεταβείτε στο **"Ρύθμιση"**->**"Διαμόρφωση άλλων"**. Στη συμβολοσειρά **"Πρότυπο"** εισάγετε το παρακάτω:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```

{% endcodeHelper %}

Βεβαιωθείτε ότι τα πλαίσια ελέγχου **"Ενεργοποίηση"** και **"Ενεργοποίηση MQTT"** είναι ενεργοποιημένα. Αν όχι, ενεργοποιήστε τα και πατήστε το κουμπί Αποθήκευση.

Επιστρέψτε στο "κύριο μενού" και μεταβείτε στο **"Ρύθμιση"** -> **"Διαμόρφωση MQTT"**.
Καταχωρίστε τα διαπιστευτήρια MQTT σας εδώ:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

Αυτά είναι όλα με το ESP προς το παρόν. Το επόμενο βήμα είναι να εγκαταστήσετε την ενσωμάτωση Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Βήμα 4 — Ρύθμιση Ενσωμάτωσης {% endroboWikiTitle %}

Αυτό το άρθρο υποθέτει ότι έχετε το Home Assistant. Για να συνδέσετε τη συσκευή Παρακολούθησης Ενέργειας στο Home Assistant, πρέπει να εγκαταστήσετε την ενσωμάτωση "Tasmota".

{% roboWikiVideo {videos:[{src: 'QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Βασικά, το Home Assistant θα ανακαλύψει αυτόματα την ενσωμάτωση "Tasmota". Αν όχι, προσθέστε τη χειροκίνητα.

{% roboWikiPicture {src:"docs/energymeter/HA.jpg", alt:"energymeter-ha"} %}{% endroboWikiPicture %}

Αυτά είναι όλα. Τώρα μπορείτε να προσθέσετε τις ενεργειακές μονάδες στον πίνακα ελέγχου.

{% roboWikiNote {type: "warning"}%} Όλες οι συσκευές από τη Robonomics μπορούν να αγοραστούν από την επίσημη [ιστοσελίδα](https://robonomics.network/devices/).
{% endroboWikiNote %}