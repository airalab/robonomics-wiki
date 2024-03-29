---
title: Πώς να συνδέσετε τον αισθητήρα SDS011

contributors: [tubleronchik]
---

** Εδώ υπάρχει ένας οδηγός βήμα προς βήμα για το πώς να συνδέσετε τον αισθητήρα σας στο Δίκτυο Αισθητήρων Robonomics. Οι αισθητήρες μας χρησιμοποιούν το firmware του Robonomics, το οποίο είναι μια βελτιωμένη έκδοση του firmware του sensor.community. Περιλαμβάνει επιπλέον αισθητήρες και έχει έναν τροποποιημένο μηχανισμό αποστολής δεδομένων. **

1. Συνδέστε τον αισθητήρα στην πρίζα για να τον τροφοδοτήσετε.
2. Το πίνακας θα δημιουργήσει ένα δίκτυο Wi-Fi με το όνομα `RobonomicsSensor-xxxxxxxxx`. Συνδεθείτε σε αυτό από το τηλέφωνο ή τον υπολογιστή σας: θα δείτε το παράθυρο εξουσιοδότησης (αν δεν το δείτε, ανοίξτε τον περιηγητή και μεταβείτε στη διεύθυνση `192.168.4.1`).
3. Επιλέξτε το δίκτυο Wi-Fi σας από τη λίστα (ή γράψτε το μόνοι σας αν δεν είναι στη λίστα) και συμπληρώστε το πεδίο κωδικού πρόσβασης.
<robo-wiki-note type="okay" title="INFO">
Ο αισθητήρας μπορεί να συνδεθεί μόνο σε δίκτυο Wi-Fi 2,4 GHz.
</robo-wiki-note> 
<robo-wiki-picture src="sds-sensor-wifi.png"/>
4. Γράψτε τις συντεταγμένες του μέρους όπου θα εγκατασταθεί ο αισθητήρας. Μπορείτε να τις αποκτήσετε από οποιοδήποτε χάρτη ή να τις αποκτήσετε από τη διεύθυνση χρησιμοποιώντας [αυτόν το σύνδεσμο.](https://www.latlong.net/convert-address-to-lat-long.html)
<robo-wiki-note type="warning" title="WARNING">
Οι συντεταγμένες του αισθητήρα θα εμφανιστούν σε έναν δημόσια διαθέσιμο χάρτη. Αν δεν θέλετε να εμφανίζονται οι προσωπικές σας πληροφορίες, γράψτε κοντά, αλλά όχι ακριβείς συντεταγμένες.
</robo-wiki-note> 
5. Κάντε κλικ στο `Save configuration and restart`. Ο πίνακας θα επανεκκινήσει και θα συνδεθεί στο καθορισμένο δίκτυο Wi-Fi.
6. Ανοίξτε το [χάρτη αισθητήρων Robonomics](https://sensors.robonomics.network/#/) και βρείτε τον τόπο όπου εγκαταστήσατε τον αισθητήρα. Σε λίγα λεπτά θα μπορείτε να δείτε τον αισθητήρα σας με δεδομένα στο χάρτη.
<robo-wiki-picture src="sds-sensor-map.png"/>

