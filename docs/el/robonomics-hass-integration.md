---
title: Ρύθμιση ενσωμάτωσης Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Σε αυτό το άρθρο, θα προσθέσετε το Robonomics στο Home Assistant. Αυτό επιτρέπει στο Home Assistant να καταγράφει δεδομένα με κρυπτογραφημένα δεδομένα στο Robonomics Parachain και α ακούει εντολές εκκίνησης από το parachain για τον έλεγχο έξυπνων συσκευών. Η ενσωμάτωση χρησιμοποιεί το IPFS για την αποθήκευση δεδομένων και την αποστολή των κατακερματισμένων IPFS στις λειτουργίες καταγραφής δεδομένων ή εκκίνησης.**

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. Στην διεπαφή ιστού του Home Assistant πηγαίνετε σε `Settings` -> `Device & Services` και πατήστε `ADD INTEGRATION`. Αναζητήστε το `Robonomics`.

2. Κάντε κλικ στο Robonomics και συμπληρώστε τη διαμόρφωση: 

- Προσθέστε το seed από τον λογαριασμό `SUB_CONTROLLER` στο seed του λογαριασμού ελεγκτή.
- Προσθέστε τη δημόσια διεύθυνση του λογαριασμού `SUB_OWNER` στη διεύθυνση του κατόχου συνδρομής.
- Ορίστε το διάστημα αποστολής δεδομένων (από προεπιλογή είναι 10 λεπτά).
- (Προαιρετικά) Μπορείτε να προσθέσετε διαπιστευτήρια για την υπηρεσία pinning Pinata ή άλλη προσαρμοσμένη πύλη για να διαδώσετε τα δεδομένα σας ευρύτερα στο δίκτυο IPFS.

3. Πατήστε `SUBMIT` αφού ολοκληρώσετε τη διαμόρφωση. Αν συμπληρώσατε όλα σωστά, θα δείτε το παράθυρο επιτυχίας.

Αυτό είναι όλο! Έχετε πλήρως εγκαταστήσει την Ενσωμάτωση Robonomics στο Home Assistant. Τώρα μπορείτε να χρησιμοποιήσετε όλες τις 
Υπηρεσίες Ιστού Robonomics. Για να μάθετε περισσότερα για αυτές, πηγαίνετε στο ["Χρήση" τμήμα](/docs/global-administration).
