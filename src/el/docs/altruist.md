---
title: Ρύθμιση Altruist
contributors: [tubleronchik]
---

**Αυτός ο οδηγός σας καθοδηγεί στη ρύθμιση και ενεργοποίηση ενός αισθητήρα Altruist Outdoor. Θα συνδέσετε τον αισθητήρα στο Wi-Fi, θα διαμορφώσετε την τοποθεσία του και θα ενεργοποιήσετε μια συνδρομή χρησιμοποιώντας XRT tokens. Επιπλέον, παρέχονται οδηγίες για την ενσωμάτωση του αισθητήρα με το Home Assistant μέσω HACS ή χειροκίνητης εγκατάστασης.**

{% roboWikiNote {type: "warning"}%} Όλες οι συσκευές από το Robonomics μπορούν να αγοραστούν από την επίσημη [ιστοσελίδα](https://robonomics.network/devices/).{% endroboWikiNote %}

## Ενεργοποίηση Συνδρομής Robonomics

{% roboWikiNote {type: "okay"} %}Για να ολοκληρώσετε αυτό το βήμα, βεβαιωθείτε ότι έχετε τουλάχιστον 2-3 XRT tokens στον λογαριασμό σας `Robonomics Polkadot`.{% endroboWikiNote %}

1) Μεταβείτε στη [σελίδα συνδρομής](https://robonomics.app/#/rws-buy) της εφαρμογής Robonomics dApp. 
2) Κάντε κλικ στο **Λογαριασμός** και συνδέστε το πορτοφόλι σας. Η διεύθυνση και το υπόλοιπο του λογαριασμού σας θα εμφανιστούν.
Αν δεν έχετε λογαριασμό, ακολουθήστε [αυτόν τον οδηγό](https://wiki.robonomics.network/docs/create-account-in-dapp/) για να δημιουργήσετε έναν.

{% roboWikiPicture {src:"docs/altruist/altruist_syb_buy.jpg", alt:"σελίδα συνδρομής"} %}{% endroboWikiPicture %}

3) Κάντε κλικ στο `ΑΓΟΡΑ ΣΥΝΔΡΟΜΗΣ` και υπογράψτε τη συναλλαγή. **Περιμένετε να ολοκληρωθεί η διαδικασία ενεργοποίησης**. 
4) Μόλις ενεργοποιηθεί, θα ανακατευθυνθείτε στη **σελίδα ρύθμισης**, όπου μπορείτε να δείτε το όνομα της συνδρομής σας και την ημερομηνία λήξης. 

{% roboWikiPicture {src:"docs/altruist/altruist_setup_page.jpg", alt:"σελίδα ρύθμισης συνδρομής"} %}{% endroboWikiPicture %}

5) **Αποθηκεύστε τη διεύθυνση του λογαριασμού σας** — θα τη χρειαστείτε κατά τη ρύθμιση του αισθητήρα. Μπορείτε να την αντιγράψετε από την ενότητα "OWNER" ή κάνοντας κλικ στο όνομα του λογαριασμού σας στην επάνω δεξιά γωνία και επιλέγοντας το κουμπί αντιγραφής.

## Ρύθμιση Αισθητήρα

{% roboWikiNote {type: "warning", title: "ΠΛΗΡΟΦΟΡΙΕΣ"}%} Ο αισθητήρας μπορεί να συνδεθεί μόνο σε δίκτυο Wi-Fi 2.4GHz.{% endroboWikiNote %}

1) **Συνδέστε τον αισθητήρα** σε μια πρίζα.
2) Η πλακέτα θα δημιουργήσει ένα δίκτυο Wi-Fi με το όνομα Altruist-xxxxxxxxx. Συνδεθείτε σε αυτό από το τηλέφωνο ή τον υπολογιστή σας. Θα πρέπει να σας ζητηθεί αυτόματα να ανοίξετε το παράθυρο εξουσιοδότησης. 
- Αν όχι, ανοίξτε ένα πρόγραμμα περιήγησης και πηγαίνετε στη διεύθυνση 192.168.4.1.

{% roboWikiPicture {src:"docs/altruist/networks.png", alt:"altruist-sensor", small: true} %}{% endroboWikiPicture %}

3) **Ρυθμίστε τις ρυθμίσεις Wi-Fi**:
- Επιλέξτε το δίκτυο Wi-Fi σας από τη λίστα ή εισάγετέ το χειροκίνητα αν δεν εμφανίζεται.
- Εισάγετε τον κωδικό πρόσβασης στο πεδίο "WI-FI SETTINGS".
- Αν έχετε πολλαπλές συσκευές Altruist στο ίδιο δίκτυο, αλλάξτε το Τοπικό Όνομα Υποδοχής. Μετά τη ρύθμιση του WiFi, μπορείτε να συνδεθείτε στον αισθητήρα σας χρησιμοποιώντας αυτό το όνομα υποδοχής.

{% roboWikiPicture {src:"docs/altruist/wifi_creds.png", alt:"altruist-sensor", small: true} %}{% endroboWikiPicture %}

4) **Αποθήκευση Ρυθμίσεων**
- Κάντε κλικ στο κουμπί `Αποθήκευση Ρυθμίσεων και Επανεκκίνηση` και περιμένετε να συνδεθεί ο αισθητήρας στο WiFi. Μόλις συνδεθεί, θα εμφανίσει τη νέα του διεύθυνση IP — αντιγράψτε την, καθώς αυτός είναι ένας εναλλακτικός τρόπος για να συνδεθείτε στους αισθητήρες σας μετά τη ρύθμιση.

{% roboWikiPicture {src:"docs/altruist/connected.png", alt:"altruist-sensor", small: true} %}{% endroboWikiPicture %}

5) **Εισάγετε τα στοιχεία σας στο Robonomics**:
- Ανοίξτε τη διαδικτυακή διεπαφή του Altruist στη διεύθυνση http://altruist.local (ή χρησιμοποιήστε το προσαρμοσμένο Τοπικό Όνομα Υποδοχής σας ακολουθούμενο από `.local` αν το αλλάξατε). Στη συνέχεια, μεταβείτε στη σελίδα `Ρυθμίσεις`.
- Στην ενότητα `Robonomics` επικολλήστε τη Διεύθυνση Ιδιοκτήτη RWS που αντιγράψατε νωρίτερα στο καθορισμένο πεδίο.

6) **Ορίστε την τοποθεσία του αισθητήρα**:
- Στην ενότητα `Διόρθωση GPS & Θερμοκρασίας` εισάγετε τις συντεταγμένες του σημείου εγκατάστασης του αισθητήρα.
- Μπορείτε να βρείτε συντεταγμένες χρησιμοποιώντας διαδικτυακούς χάρτες ή να μετατρέψετε μια διεύθυνση σε γεωγραφικό πλάτος/μήκος χρησιμοποιώντας [αυτόν τον σύνδεσμο.](https://www.latlong.net/convert-address-to-lat-long.html)

{% roboWikiNote {type: "warning", title: "ΠΡΟΕΙΔΟΠΟΙΗΣΗ"}%}Οι συντεταγμένες του αισθητήρα θα εμφανιστούν σε έναν δημόσια διαθέσιμο χάρτη. Αν δεν θέλετε να εμφανίσετε τις προσωπικές σας πληροφορίες, γράψτε κοντινές, αλλά όχι ακριβείς συντεταγμένες.{% endroboWikiNote %}

{% roboWikiPicture {src:"docs/altruist/robo-gps.png", alt:"altruist-sensor-wifi", small: true} %}{% endroboWikiPicture %}

7) **Αντιγράψτε τη "Διεύθυνση Robonomics" του Altruist**:
- Θα το βρείτε στην κορυφή της σελίδας. Αποθηκεύστε το για το τελικό βήμα.

{% roboWikiPicture {src:"docs/altruist/address.jpg", alt:"διεύθυνση altruist",  small: true} %}{% endroboWikiPicture %}

8) Κάντε κλικ στο "**Αποθήκευση ρυθμίσεων και επανεκκίνηση**" στο κάτω μέρος της σελίδας. Η πλακέτα θα επανεκκινήσει.

## Ενεργοποίηση Altruist
Το τελικό βήμα στη διαδικασία ρύθμισης είναι η προσθήκη της **διεύθυνσης Altruist** στη **Συνδρομή Robonomics** σας.

1) Επιστρέψτε στη [σελίδα Ρύθμισης](https://robonomics.app/#/rws-setup).

2) Κάντε κύλιση προς τα κάτω στην ενότητα "**Χρήστες στη συνδρομή**".

3) Στο πεδίο "**Προσθήκη χρήστη**", επικολλήστε τη **διεύθυνση Altruist Robonomics** που αντιγράψατε νωρίτερα.

{% roboWikiPicture {src:"docs/altruist/add_user.jpg", alt:"προσθήκη χρήστη"} %}{% endroboWikiPicture %}

4) Κάντε κλικ στο **κουμπί συν (+)** και υπογράψτε το μήνυμα.

5) Περιμένετε να ολοκληρωθεί η λειτουργία.

Αυτό ήταν! Η ρύθμισή σας είναι τώρα ολοκληρωμένη. 🎉

Μπορείτε τώρα να βρείτε το Altruist σας στον χάρτη [Robonomics Sensors Social](https://sensors.social/#). 🚀

{% roboWikiPicture {src:"docs/altruist/map.jpg", alt:"χάρτης αισθητήρων"} %}{% endroboWikiPicture %}

## Home Assistant

Υπάρχουν δύο τρόποι για να προσθέσετε το **Altruist** στο **Home Assistant**:

### Επιλογή 1: HACS (Συνιστάται)

Ο πιο εύκολος τρόπος για να προσθέσετε το **Altruist** είναι μέσω του **HACS**.Μπορείτε να βρείτε έναν σύντομο οδηγό εγκατάστασης [εδώ](https://hacs.xyz/docs/use/)

**Βήματα**:
1) Μόλις εγκατασταθεί το HACS, ανοίξτε το.

2) Κάντε κλικ στις **τρεις τελείες** στην επάνω δεξιά γωνία και επιλέξτε "**Custom repositories**".

3) Στο αναδυόμενο παράθυρο, εισάγετε το ακόλουθο URL:

```
https://github.com/airalab/altruist-homeassistant-integration
```
4) Ορίστε τον τύπο σε "**Integration**" και κάντε κλικ στο "**ADD**".

{% roboWikiPicture {src:"docs/altruist/hacs.jpg", alt:"altruist-add"} %}{% endroboWikiPicture %}

5) Αναζητήστε την ενσωμάτωση **Altruist Sensor**.

6) Κάντε κλικ στο κουμπί **Download**, και στη συνέχεια επανεκκινήστε το **Home Assistant** μόλις εγκατασταθεί η ενσωμάτωση.


{% roboWikiPicture {src:"docs/altruist/integration.jpg", alt:"altruist-hacs"} %}{% endroboWikiPicture %}

### Επιλογή 2: Χειροκίνητη Εγκατάσταση

1) Υπό τον χρήστη `homeassistant`, κλωνοποιήστε το αποθετήριο του έργου:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/airalab/altruist-homeassistant-integration.git
```

{% endcodeHelper %}

2) Αν έχετε ήδη οποιεσδήποτε προσαρμοσμένες ενσωματώσεις, μετακινήστε τον φάκελο `altruist` στον κατάλογο `custom_components` σας:

{% codeHelper { copy: true}%}

```
cd altruist-homeassistant-integration
mv custom_components/altruist ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

3) Αν **δεν** έχετε οποιεσδήποτε προσαρμοσμένες ενσωματώσεις, μετακινήστε ολόκληρο το custom_components directory:

{% codeHelper { copy: true}%}

 ```
cd altruist-homeassistant-integration
mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Διαμόρφωση

Μετά την εγκατάσταση και την επανεκκίνηση του Home Assistant, η ενσωμάτωση θα ανιχνεύσει αυτόματα το Altruist στο δίκτυό σας.

1) Πηγαίνετε στις **Ρυθμίσεις → Συσκευές & Υπηρεσίες**.

2) Προσθέστε τον **Αισθητήρα Altruist**.

{% roboWikiPicture {src:"docs/altruist/add_altruist.jpg", alt:"discover altruist"} %}{% endroboWikiPicture %}

Αυτό είναι! 🚀 Ο Αισθητήρας Altruist είναι τώρα ενσωματωμένος με το Home Assistant.