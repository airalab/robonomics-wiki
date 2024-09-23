---
title: Πώς να συνδέσετε τον αισθητήρα SDS011

contributors: [tubleronchik]
---

**Εδώ υπάρχει ένας οδηγός βήμα προς βήμα για το πώς να συνδέσετε τον αισθητήρα σας στο Δίκτυο Αισθητήρων Robonomics και στο Home Assistant. Οι αισθητήρες μας χρησιμοποιούν το firmware του Robonomics, το οποίο είναι μια βελτιωμένη έκδοση του firmware του sensor.community. Περιλαμβάνει επιπλέον αισθητήρες και έχει τροποποιημένο μηχανισμό αποστολής δεδομένων.**

{% roboWikiNote {type: "warning"}%} Όλες οι συσκευές από το Robonomics μπορούν να αγοραστούν από την επίσημη [ιστοσελίδα](https://robonomics.network/devices/).
{% endroboWikiNote %}


## Ρύθμιση

1. Συνδέστε τον αισθητήρα στην πρίζα για να τον τροφοδοτήσετε με ρεύμα.
2. Το πίνακας θα δημιουργήσει ένα δίκτυο Wi-Fi με το όνομα `RobonomicsSensor-xxxxxxxxx`. Συνδεθείτε σε αυτό από το τηλέφωνο ή τον υπολογιστή σας: θα δείτε το παράθυρο εξουσιοδότησης (αν όχι, ανοίξτε τον περιηγητή και πηγαίνετε στο `192.168.4.1`).
3. Επιλέξτε το δίκτυο Wi-Fi σας από τη λίστα (ή γράψτε το μόνοι σας αν δεν υπάρχει στη λίστα) και συμπληρώστε το πεδίο κωδικού πρόσβασης.
{% roboWikiNote {type: "warning", title: "INFO"}%} Ο αισθητήρας μπορεί να συνδεθεί μόνο σε ένα δίκτυο Wi-Fi 2,4GHz. {% endroboWikiNote %}
{% roboWikiPicture {src:"docs/sds-sensor-wifi.png", alt:"sds-sensor-wifi"} %}{% endroboWikiPicture %}
4. Γράψτε τις συντεταγμένες του μέρους όπου θα τοποθετηθεί ο αισθητήρας. Μπορείτε να τις πάρετε από οποιοδήποτε χάρτη ή να τις πάρετε από τη διεύθυνση χρησιμοποιώντας [αυτόν τον σύνδεσμο.](https://www.latlong.net/convert-address-to-lat-long.html)
{% roboWikiNote {type: "warning", title: "WARNING"}%} Οι συντεταγμένες του αισθητήρα θα εμφανιστούν στη συνέχεια σε έναν δημόσια διαθέσιμο χάρτη. Αν δεν θέλετε να εμφανιστούν τα προσωπικά σας στοιχεία, γράψτε κοντά, αλλά όχι ακριβείς συντεταγμένες.
{% endroboWikiNote %}
5. Κάντε κλικ στο `Αποθήκευση ρύθμισης και επανεκκίνηση`. Ο πίνακας θα επανεκκινήσει και θα συνδεθεί στο καθορισμένο δίκτυο Wi-Fi.
6. Ανοίξτε το [χάρτη αισθητήρων Robonomics](https://sensors.robonomics.network/#/) και βρείτε το μέρος όπου εγκαταστήσατε τον αισθητήρα. Μέσα σε λίγα λεπτά θα μπορείτε να δείτε τον αισθητήρα σας με δεδομένα στο χάρτη.
{% roboWikiPicture {src:"docs/sds-sensor-map.png", alt:"sds-sensor-map"} %} {% endroboWikiPicture %}

## Home Assistant

Υπάρχουν δύο επιλογές εγκατάστασης διαθέσιμες:

### Επιλογή 1: HACS

Ο ευκολότερος τρόπος για να προσθέσετε έναν τοπικό αισθητήρα Luftdaten είναι μέσω του HACS. [Εδώ](https://hacs.xyz/docs/setup/download/) μπορείτε να βρείτε μια σύντομη εξήγηση για το πώς να εγκαταστήσετε το HACS.

Μόλις εγκατασταθεί το HACS, πλοηγηθείτε στο HACS -> Ενσωματώσεις και αναζητήστε την ενσωμάτωση `Local Luftdaten Sensor`. Κάντε κλικ στο κουμπί λήψης και επανεκκινήστε το Home Assistant μόλις ολοκληρωθεί η λήψη της ενσωμάτωσης.

### Επιλογή 2: Χειροκίνητη Εγκατάσταση

Με τον χρήστη `homeassistant`, κλωνοποιήστε το αποθετήριο του έργου:

```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
```

Αν έχετε ήδη οποιεσδήποτε προσαρμοσμένες ενσωματώσεις, αντιγράψτε τον κατάλογο `custom_components/local_luftdaten/` στον κατάλογο `custom_components` σας. Για παράδειγμα:

```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```

Αν δεν έχετε καμία προσαρμοσμένη ενσωμάτωση, αντιγράψτε ολόκληρο τον κατάλογο `custom_components` στον κατάλογο διαμόρφωσης του Home Assistant σας. Για παράδειγμα:

```
cd local_luftdaten
mv custom_components/ ~/.homeassistant/
```

## Διαμόρφωση

Δημιουργήστε μια νέα καταχώριση αισθητήρα στο αρχείο `configuration.yaml` σας και προσαρμόστε το όνομα του κόμβου ή τη διεύθυνση IP. Για να βρείτε την τοπική διεύθυνση IP του αισθητήρα σας, μπορείτε να χρησιμοποιήσετε την εφαρμογή κινητού [Fing](https://www.fing.com/products) ή το εργαλείο γραμμής εντολών [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Το όνομα μπορεί να είναι οποιοδήποτε.

|Παράμετρος            |Τύπος   | Αναγκαιότητα | Περιγραφή
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | απαιτείται    | Διεύθυνση IP του αισθητήρα
|`scan_interval`        | number | προεπιλογή: 180 | Συχνότητα (σε δευτερόλεπτα) μεταξύ των ενημερώσεων
|`name`                 | string | απαιτείται    
```| Όνομα του αισθητήρα
|`monitored_conditions` | λίστα   | απαιτείται     | Λίστα των αισθητήρων που παρακολουθούνται


{% codeHelper { copy: true}%}


  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Αισθητήρας ποιότητας αέρα
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```

{% endcodeHelper %}

> Μια λίστα με όλους τους υποστηριζόμενους αισθητήρες μπορεί να βρεθεί στο [αποθετήριο](https://github.com/lichtteil/local_luftdaten).

Επανεκκινήστε το Home Assistant σας.
Μετά από αυτό, μπορείτε να προσθέσετε έναν αισθητήρα στον πίνακα ελέγχου σας. Το όνομα του στοιχείου θα είναι το όνομα που προσθέσατε στο `configuration.yaml`.

{% roboWikiPicture {src:"docs/sds-configuration-card.png", alt:"sds-configuration-car"} %}{% endroboWikiPicture %}