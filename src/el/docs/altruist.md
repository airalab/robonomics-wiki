---
title: Altruist και sensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

Το Altruist είναι ένας περιβαλλοντικός αισθητήρας ανοιχτού κώδικα. Οι μετρήσεις του καταλήγουν σε ένα ανοιχτό σύνολο δεδομένων που μπορεί να δει οποιοσδήποτε στο [sensors.social](https://sensors.social).

## Ο αισθητήρας

- Υπάρχει έκδοση για εξωτερικούς χώρους (Urban), έκδοση για εσωτερικούς χώρους (Insight) και ένα kit.
- Ο αισθητήρας υπογράφει κάθε μέτρηση, οπότε οι μετρήσεις δεν μπορούν να πλαστογραφηθούν στη διαδρομή.
- Οι μετρήσεις μπορούν να ταξιδεύουν μέσω Wi-Fi ή, όπου δεν υπάρχει Wi-Fi, μέσω ραδιοσυχνοτήτων LoRa και δικτύων mesh Meshtastic.
- Ο ιδιοκτήτης μπορεί να επιλέξει να κρυπτογραφεί τις μετρήσεις. Τότε μόνο εκείνος μπορεί να τις βλέπει στο sensors.social, με το δικό του κλειδί.

Τους αισθητήρες Altruist κατασκευάζει η Pinout Limited. Μπορείτε να τους αγοράσετε στο [cyberpunks.shop](https://cyberpunks.shop/) και στο Amazon στην ΕΕ. Για ρύθμιση και υποστήριξη, δείτε τις σελίδες των προϊόντων εκεί και το [pinout.cloud](https://pinout.cloud).

## sensors.social

Το [sensors.social](https://sensors.social) είναι ένας χάρτης ανεξάρτητων αισθητήρων ποιότητας αέρα. Δείχνει μετρήσεις από 100+ αισθητήρες και έχει δικό του blog με νέα του έργου.

Για να χρησιμοποιήσετε έναν αισθητήρα στο Home Assistant στο τοπικό σας δίκτυο, υπάρχει η [ενσωμάτωση Altruist](https://github.com/airalab/altruist-homeassistant-integration).

## Πηγαίος κώδικας

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware): firmware.
- [airalab/webflasher](https://github.com/airalab/webflasher): εγκατάσταση του firmware από τον browser.
- [airalab/sensors.social](https://github.com/airalab/sensors.social): ο χάρτης.
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity): η υπηρεσία που συλλέγει τις μετρήσεις.
