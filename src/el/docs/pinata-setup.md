---
title: Ρύθμιση Pinata

συνεισφέροντες: [tubleronchik, LoSk-p]
εργαλεία:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Αυτό το άρθρο σας καθοδηγεί στη διαδικασία ρύθμισης του [Pinata](https://www.pinata.cloud/) για το pinning αρχείων από την ενσωμάτωση Robonomics. Αυτό βελτιώνει την προσβασιμότητα των αρχείων αντιγράφων ασφαλείας και τηλεμετρίας.**

Για να μπορείτε να κάνετε pin τα αρχεία σας στο Pinata, πρέπει πρώτα να δημιουργήσετε ένα λογαριασμό. Στη συνέχεια, πλοηγηθείτε στην ενότητα `API Keys` και δημιουργήστε ένα νέο κλειδί με τις ακόλουθες άδειες:

1. `pinFileToIPFS`
2. `unpin`

{% roboWikiPicture {src:"docs/home-assistant/pinata-permissions.jpg", alt:"pinata-permissions"} %}{% endroboWikiPicture %}

Στη συνέχεια, αντιγράψτε το `API Key` και το `API Secret` και κρατήστε τα ιδιωτικά.

{% roboWikiPicture {src:"docs/home-assistant/pinata-key.jpg", alt:"pinata-key"} %}{% endroboWikiPicture %}

Αν έχετε ήδη ρυθμίσει την ενσωμάτωση Robonomics, πλοηγηθείτε στο `Ρυθμίσεις` -> `Συσκευές & Υπηρεσίες` και πατήστε `ρύθμιση` στην ενσωμάτωση Robonomics. Εισαγάγετε τα διαπιστευτήριά σας για το Pinata.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-reconfigure-pinata.jpg", alt:"robonomics-reconfigure-pinata"} %}{% endroboWikiPicture %}