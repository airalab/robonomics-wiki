---
title: Ρύθμιση ολοκλήρωσης Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Ολοκλήρωση 1.8.6
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Σε αυτό το άρθρο, θα προσθέσετε το Robonomics στο Home Assistant. Αυτό επιτρέπει στο Home Assistant να καταγράφει datalogs με κρυπτογραφημένα δεδομένα στο Robonomics Parachain και να ακούει εντολές εκκίνησης από το parachain για τον έλεγχο έξυπνων συσκευών. Η ολοκλήρωση χρησιμοποιεί το IPFS για την αποθήκευση δεδομένων και την αποστολή των hash του IPFS στις λειτουργίες datalog ή εκκίνηση.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'Ρύθμιση ολοκλήρωσης'}%} {% endroboWikiPicture %}

Καταρχάς, πρέπει να δημιουργήσετε τον πίνακα ρυθμίσεων για τον πίνακα ελέγχου σας. Για να το κάνετε αυτό, ανοίξτε τον πίνακα ελέγχου του Home Assistant σας και στην πάνω δεξιά γωνία πατήστε το κουμπί "Επεξεργασία Πίνακα" (ένα μολύβι).
Στο ανοιχτό παράθυρο, κάντε κλικ στο εικονίδιο με τις τρεις τελείες και επιλέξτε το κουμπί "Πάρτε Έλεγχο":

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'Ρύθμιση ολοκλήρωσης'}%} {% endroboWikiPicture %}

Πατήστε "Πάρτε Έλεγχο" ακόμη μια φορά:

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'Ρύθμιση ολοκλήρωσης'}%} {% endroboWikiPicture %}

Τώρα μπορείτε να εγκαταστήσετε την ολοκλήρωση Robonomics. Για να το κάνετε αυτό, ακολουθήστε αυτά τα βήματα:
 
{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Στην ιστοσελίδα του Home Assistant πηγαίνετε σε `Ρυθμίσεις` -> `Συσκευές & Υπηρεσίες` και πατήστε `ΠΡΟΣΘΗΚΗ ΟΛΟΚΛΗΡΩΣΗΣ`. Αναζητήστε το `Robonomics`.

2. Κάντε κλικ στο Robonomics και συμπληρώστε την ρύθμιση:

- Προσθέστε το seed από τον λογαριασμό `SUB_CONTROLLER` στο seed του λογαριασμού ελεγκτή.
- Προσθέστε τη δημόσια διεύθυνση του λογαριασμού `SUB_OWNER` στη διεύθυνση του κατόχου συνδρομής.
- Ορίστε το διάστημα αποστολής δεδομένων (από προεπιλογή είναι 10 λεπτά).
- (Προαιρετικό) Μπορείτε να προσθέσετε διαπιστευτήρια για την υπηρεσία pinning Pinata ή άλλη προσαρμοσμένη πύλη για να διαδώσετε τα δεδομένα σας ευρύτερα στο δίκτυο IPFS.

{% roboWikiNote {title:"Σημείωση", type: "Σημείωση"}%} Στην [ενότητα Ρύθμισης Pinata](/docs/pinata-setup) μπορείτε να βρείτε περισσότερες λεπτομέρειες σχετικά με τη χρήση του Pinata.{% endroboWikiNote %}

3. Πατήστε `ΥΠΟΒΟΛΗ` μετά την ολοκλήρωση της ρύθμισης. Αν συμπληρώσατε όλα σωστά, θα δείτε το παράθυρο επιτυχίας.

Αυτό είναι όλα! Έχετε εγκαταστήσει πλήρως την Ολοκλήρωση Robonomics στο Home Assistant. Τώρα μπορείτε να χρησιμοποιήσετε όλες τις Υπηρεσίες Ιστού Robonomics. Για περισσότερες πληροφορίες σχετικά με αυτές, μεταβείτε στην ["Χρήση" ενότητα](/docs/add-user).