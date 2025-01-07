---
title: Ρύθμιση ολοκλήρωσης Robonomics

συνεισφέροντες: [LoSk-p, nakata5321, Fingerling42]
εργαλεία:
  - Robonomics Home Assistant Ολοκλήρωση 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Σε αυτό το άρθρο, θα προσθέσετε το Robonomics στο Home Assistant. Αυτό επιτρέπει στο Home Assistant να καταγράφει datalogs με κρυπτογραφημένα δεδομένα στο Robonomics Parachain και να ακούει εντολές εκκίνησης από το parachain για τον έλεγχο έξυπνων συσκευών. Η ολοκλήρωση χρησιμοποιεί το IPFS για την αποθήκευση δεδομένων και την αποστολή των κατακερματισμένων IPFS στις λειτουργίες datalog ή εκκίνησης.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'Ρύθμιση ολοκλήρωσης'}%} {% endroboWikiPicture %}

Καταρχάς, πρέπει να δημιουργήσετε τον πίνακα ρυθμίσεων για τον πίνακα ελέγχου σας. Για να το κάνετε αυτό, ανοίξτε τον πίνακα ελέγχου του Home Assistant σας και στην πάνω δεξιά γωνία πατήστε το κουμπί "Επεξεργασία Πίνακα" (ένα μολύβι).
Στο ανοιχτό παράθυρο, κάντε κλικ στο εικονίδιο με τις τρεις τελείες και επιλέξτε το κουμπί "Λήψη Ελέγχου":

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'Ρύθμιση ολοκλήρωσης'}%} {% endroboWikiPicture %}

Πατήστε "Λήψη Ελέγχου" ακόμη μια φορά:

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'Ρύθμιση ολοκλήρωσης'}%} {% endroboWikiPicture %}

Τώρα μπορείτε να εγκαταστήσετε την ολοκλήρωση Robonomics. Για να το κάνετε αυτό, ακολουθήστε αυτά τα βήματα:
 

1. Στην ιστοσελίδα του Home Assistant πηγαίνετε σε `Ρυθμίσεις` -> `Συσκευές & Υπηρεσίες` και πατήστε `ΠΡΟΣΘΗΚΗ ΟΛΟΚΛΗΡΩΣΗΣ`. Αναζητήστε το `Robonomics`.

2. Κάντε κλικ στο Robonomics, μεταφορτώστε το αρχείο ρύθμισης σας (με το όνομα `robonomics.app-settings-<subscirption-name>-server.json`, όπου `<subscirption-name>` είναι το όνομα της συνδρομής σας) και εισάγετε τον κωδικό για τον λογαριασμό `CONTROLLER`. Οδηγίες για το πώς να δημιουργήσετε το αρχείο ρύθμισης μπορείτε να βρείτε [εδώ](/docs/sub-activate/?topic=smart-home#setup-your-subscription).

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"δημιουργία ελεγκτή"} %}{% endroboWikiPicture %}

3. Προαιρετικά: Μπορείτε να επιλέξετε ποιο δίκτυο να χρησιμοποιήσετε.

4. Πατήστε `ΥΠΟΒΟΛΗ` μετά την ολοκλήρωση της ρύθμισης. Αν συμπληρώσατε όλα σωστά, θα δείτε το παράθυρο επιτυχίας. 

{% roboWikiNote {type: "okay", title: "" }%} Η εγκατάσταση μπορεί να διαρκέσει περίπου 10–15 λεπτά, ανάλογα με τη σύνδεσή σας στο internet. {% endroboWikiNote %}

Αυτά είναι όλα! Έχετε εγκαταστήσει πλήρως την Ολοκλήρωση Robonomics στο Home Assistant. Τώρα μπορείτε να χρησιμοποιήσετε όλες τις Υπηρεσίες Ιστού Robonomics. Για να μάθετε περισσότερα σχετικά με αυτές, μεταβείτε στην ενότητα ["Χρήση"](/docs/add-user).