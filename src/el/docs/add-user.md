---
title: Προσθήκη Χρήστη
contributors: [nakata5321, Fingerling42, LoSk-p]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**Αυτό το άρθρο θα σας δείξει πώς να δημιουργήσετε ένα νέο χρήστη στο Home Assistant σας.**

## Προσθήκη Χρηστών στην Συνδρομή

Δεν μπορείτε να χρησιμοποιήσετε προηγουμένως δημιουργημένους λογαριασμούς επειδή οι `ΙΔΙΟΚΤΗΤΗΣ` και `ΕΛΕΓΚΤΗΣ` παρέχουν ασφάλεια, και ο πρώτος χρήστης που δημιουργήσατε όταν ξεκινήσατε το Home Assistant δεν έχει λογαριασμό Robonomics Parachain.

{% roboWikiVideo {videos:[{src: 'QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Δημιουργήστε ένα λογαριασμό στο Robonomics parachain, όπως κάνατε στο [προηγούμενο άρθρο](/docs/sub-activate/).

2. Χρησιμοποιώντας τον λογαριασμό `ΙΔΙΟΚΤΗΤΗ` προσθέστε τον νέο λογαριασμό χρήστη στη συνδρομή στη σελίδα `ΡΥΘΜΙΣΗ ΣΥΝΔΡΟΜΗΣ` στο [Robonomics DApp](https://robonomics.app/#/rws-setup). Τώρα στην ενότητα `ΧΡΗΣΤΕΣ ΣΤΗΝ ΣΥΝΔΡΟΜΗ` θα πρέπει να υπάρχουν τρεις διευθύνσεις στη λίστα πρόσβασης: `ΙΔΙΟΚΤΗΤΗΣ`, `ΕΛΕΓΚΤΗΣ` και `ΧΡΗΣΤΗΣ`.

## Αρχείο JSON Ρυθμίσεων RWS

Αρχικά, ο χρήστης θα πρέπει να λάβει το αρχείο JSON με τις πληροφορίες της RWS Setup.

### Δημιουργία JSON Ρυθμίσεων RWS

Ο διαχειριστής μπορεί να δημιουργήσει το αρχείο JSON για τη ρύθμισή του στη σελίδα [ΡΥΘΜΙΣΗ ΣΥΝΔΡΟΜΗΣ](https://robonomics.app/#/rws-setup) χρησιμοποιώντας το κουμπί `Λήψη εισαγωγής για άλλους χρήστες`.

{% roboWikiPicture {src:"docs/home-assistant/download_rws_setup_json.png", alt:"image"} %}{% endroboWikiPicture %}

### Εισαγωγή Ρυθμίσεων RWS

Τώρα με αυτό το αρχείο JSON ο χρήστης μπορεί να εισάγει τις ρυθμίσεις RWS χρησιμοποιώντας το κουμπί `ΕΙΣΑΓΩΓΗ ΡΥΘΜΙΣΗΣ`.

{% roboWikiVideo {videos:[{src: 'QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Χορήγηση Πρόσβασης στον Χρήστη

Στην ίδια σελίδα ([ΡΥΘΜΙΣΗ ΣΥΝΔΡΟΜΗΣ](https://robonomics.app/#/rws-setup)) μπορείτε να ορίσετε τον κωδικό πρόσβασης για τον νέο χρήστη.

{% roboWikiVideo {videos:[{src: 'Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Επιλέξτε τον λογαριασμό που μόλις δημιουργήσατε στη δεξιά μπάρα πλοήγησης (ελέγξτε ότι έχετε επιλέξει τον επιθυμητό λογαριασμό πατώντας το εικονίδιο προφίλ).

2. Εισάγετε τη διεύθυνση και το seed phrase του `ΧΡΗΣΤΗ` στα απαιτούμενα πεδία.

3. Συμπληρώστε έναν κωδικό και στη συνέχεια επιβεβαιώστε τη συναλλαγή με το κουμπί `ΔΗΜΙΟΥΡΓΙΑ ΚΩΔΙΚΟΥ`, το οποίο τώρα θα είναι χωρίς χρέωση λόγω της συνδρομής.

4. Μετά τη διαδικασία εγγραφής, συνδεθείτε στο Home Assistant με τη διεύθυνση χρήστη σας ως σύνδεση και έναν νεοδημιουργημένο κωδικό πρόσβασης.

Τώρα μπορείτε να χρησιμοποιήσετε το dapp για να ελέγξετε το σπίτι σας μέσω του Robonomics, ελέγξτε το άρθρο [**"Λήψη Έξυπνης Οικιακής Τηλεμετρίας"**](/docs/smart-home-telemetry/).