---
title: Ευθύνη
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

Here's the Markdown text translated into Greek:

---

**Για να μετατρέψετε τα ρομπότ σε οικονομικούς πράκτορες, χρειάζεστε ένα εργαλείο συμβολαίων για αυτό. Γνωρίστε το Liability - ένα εργαλείο της Robonomics που υλοποιεί συμβόλαια μεταξύ λογαριασμών parachain!**

{% roboWikiNote {title:"Dev Node", type: "warning"}%}  Παρακαλούμε δώστε προσοχή ότι αυτό το σεμινάριο δείχνεται σε μια τοπική εγκατάσταση του Robonomics Node. Ρυθμίστε το δικό σας με [αυτές τις οδηγίες](/docs/run-dev-node).
{% endroboWikiNote %}

## Θεωρητική Επισκόπηση

Στο Ethereum υπήρχε μια αρκετά πολύπλοκη δομή αλληλεπίδρασης των liabilities. Μπορείτε να εξοικειωθείτε με αυτή
[εδώ](/docs/robonomics-how-it-works). Σήμερα τα πράγματα είναι λίγο πιο απλά με το Kusama!

### Διαπραγματεύσεις

Για να υπογράψουν ένα συμβόλαιο, οι δύο πλευρές πρέπει πρώτα να διαπραγματευτούν. Αυτό μπορεί να γίνει με διάφορους τρόπους, συμπεριλαμβανομένων των
[IPFS PubSub ](https://blog.ipfs.tech/25-pubsub/) ή Robonomics PubSub. Ένα παράδειγμα κώδικα Python χρησιμοποιώντας το Robonomics PubSub
παρουσιάζεται [εδώ](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

Η προσφορά και η ζήτηση είναι μηνύματα που περιέχουν δύο κύρια χαρακτηριστικά ενός συμβολαίου: **περιγραφή εργασίας** και **τιμή**. Η μορφή του μηνύματος
σχεδιάζεται από τον χρήστη για κάθε συγκεκριμένη εφαρμογή. Δεν είναι τόσο σημαντικό στη διαδικασία των διαπραγματεύσεων να ακολουθείται ένας αυστηρός κανόνας μορφής. Η πιθανή ροή παρουσιάζεται στην παρακάτω εικόνα.

{% roboWikiPicture {src:"docs/liability/negotiations.jpg", alt:"negotiations"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"PubSub", type: "warning"}%} Σημειώστε ότι το PubSub είναι ένα ανοιχτό πρωτόκολλο, οπότε δεν πρέπει να μεταφερθούν ευαίσθητα δεδομένα. Για αυτό, θα πρέπει να χρησιμοποιήσετε άλλα πρωτόκολλα.
{% endroboWikiNote %}

### Υπογραφές

Όταν οι διαπραγματεύσεις ολοκληρωθούν επιτυχώς, κάθε πλευρά πρέπει να υπογράψει τη λεγόμενη συμφωνία της, γνωστή ως υπογραφή. Αυτό είναι ένα
μήνυμα που περιέχει την περιγραφή της εργασίας και την τιμή **σε συγκεκριμένη μορφή**, υπογεγραμμένο με το ιδιωτικό κλειδί του λογαριασμού. Υπάρχει ένα
[εργαλείο Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) και για αυτό.
 - Η περιγραφή της εργασίας ονομάζεται **technics**. Πρόκειται για μια συμβολοσειρά μήκους 32 bytes που μπορεί να είναι ένας κωδικοποιημένος IPFS CID.
 - Η τιμή ονομάζεται **economics**. Αυτό είναι ένα δεκαδικό XRT - Weiner. 1 Weiner = 10**-9 XRT.

{% roboWikiNote {title:"32 bytes", type: "note"}%} Μπορείτε να αποκτήσετε έναν [IPFS](https://ipfs.tech/) CID διαμορφωμένο σωστά με τη [βιβλιοθήκη Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
Όταν χρησιμοποιείτε τη λειτουργία `sign_liability`, δεν χρειάζεται να μετατρέψετε το hash, θα γίνει αυτόματα.{% endroboWikiNote %}

Ακολουθώντας το παράδειγμα του καφέ:

1. Η εργασία είναι ένα JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. Το IPFS CID είναι `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Άρα το **technics** (μετασχηματισμένο CID) είναι `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`
4. **Economics** είναι `1.5 XRT`.

Όταν υπογραφεί, είναι ώρα να δημιουργηθεί η υποχρέωση! Αυτό μπορεί να γίνει από μία από τις πλευρές (είτε την υποσχόμενη είτε τον υπόσχοντα) ή από έναν
λογαριασμό τρίτου, του λεγόμενου παρόχου.

## Δημιουργία Υποχρέωσης

### Προετοιμασίες

Όπως αναφέρθηκε νωρίτερα, τουλάχιστον δύο πλευρές εμπλέκονται στη διαδικασία. Για αυτό το παράδειγμα, ας χρησιμοποιήσουμε τρεις και να κάνουμε
ξεχωριστό πάροχο για αυτό. Υποθέτουμε ότι οι διαπραγματεύσεις έχουν ήδη πραγματοποιηθεί με κάποιο τρόπο.

### 1. Δημιουργία τριών λογαριασμών και προσθήκη κεφαλαίων σε αυτούς

{% roboWikiPicture {src:"docs/liability/balances.jpg", alt:"balances"} %}{% endroboWikiPicture %}

Εδώ έχουμε προμηθεύσει τον πάροχο με 100 XRT για να υπογράψει εξωστρέφεια υποχρέωσης, στον υποσχόμενο δόθηκαν 2 XRT για να πληρώσει για την εργασία.
Στον υπόσχοντα δεν χορηγήθηκαν κεφάλαια (εκτός από μια υπαρξιακή κατάθεση τουλάχιστον 1 mXRT).

### 1. Πλοηγηθείτε στο Developer -> Extrinsics

{% roboWikiPicture {src:"docs/liability/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. Επιλέξτε liability -> create από τη λίστα των δυνατών extrinsics

Επιλέξτε επίσης έναν λογαριασμό με τον οποίο θέλετε να υποβάλετε το εξωστρέφιο. Συμπληρώστε όλες τις παραμέτρους.

{% roboWikiPicture {src:"docs/liability/create.jpg", alt:"create"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Signatures", type: "note"}%} Δεδομένου ότι χρησιμοποιείται πάροχος εδώ, δεν χρειάζεται να γνωρίζετε τους σπόρους των συμμετεχόντων. Μόνο οι υπογραφές τους χρειάζονται.
{% endroboWikiNote %}

### 3. Υποβολή συναλλαγής

{% roboWikiPicture {src:"docs/liability/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

### 4. Ανασκόπηση της υποχρέωσής σας στα συμβάντα

Για αυτό, μεταβείτε στο `Network -> Explorer` και βρείτε μια λίστα συμβάντων στα δεξιά. Κάντε κλικ στο εικονίδιο του τριγώνου για να επεκταθεί.

{% roboWikiPicture {src:"docs/liability/new-liability.jpg", alt:"new-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Hash", type: "note"}%} Το hash μπορεί να μετατραπεί σε IPFS CID με το ίδιο [εργαλείο Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).
{% endroboWikiNote %}

### 5. Εξερεύνηση αποθήκευσης

Μπορείτε επίσης να εξερευνήσετε κάποια χαρακτηριστικά των υποχρεώσεων στη μονάδα αποθήκευσης `liability`.

{% roboWikiPicture {src:"docs/liability/storage-liability.jpg", alt:"storage-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Next Index", type: "note"}%} Η λειτουργία αποθήκευσης `Next Index` δείχνει το τελευταίο ευρετήριο υποχρέωσης +1, οπότε παρόλο που είναι `1`, εξετάζεται η υποχρέωση `0`.
{% endroboWikiNote %}

## Αναφορές

Φανταστείτε ότι έχει γίνει ο καφές και τώρα η μηχανή καφέ πρέπει να το αναφέρει κάπως. Αυτό είναι το σημείο όπου οι αναφορές υποχρέωσης
έρχονται στη σκηνή. Ως

 απόδειξη εργασίας, ο λογαριασμός προσθέτει έναν άλλο IPFS CID ως περιεχόμενο της αναφοράς όταν ολοκληρώνεται η υπάρχουσα
υποχρέωση. Αυτό απαιτεί ξανά την υπογραφή του υπόσχοντος.

{% roboWikiNote {title:"Report signature", type: "note"}%} Το υπογεγραμμένο μήνυμα περιέχει το υπάρχον ευρετήριο υποχρέωσης και τον IPFS CID της αναφοράς κωδικοποιημένο σε αναπαράσταση 32 bytes. Για άλλη μια φορά, το [εργαλείο Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) μπορεί να βοηθήσει στην υπογραφή της αναφοράς.
{% endroboWikiNote %}

Συνεχίζοντας με το παράδειγμα της μηχανής καφέ:

1. Η αναφορά είναι ένα JSON
```json
{"report": "Ο καφές έγινε! Χρόνος εκτέλεσης - 80 δευτερόλεπτα."}
```
2. Το IPFS CID είναι `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Άρα το **payload** (μετασχηματισμένο CID) είναι `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. **Index** είναι `0`, είναι το υπάρχον ευρετήριο υποχρέωσης.

### 1. Πλοηγηθείτε στα extrinsics, liability -> finalize(report)

Συμπληρώστε τις παραμέτρους και υποβάλετε την εξωστρέφεια. Και πάλι, αυτό μπορεί να γίνει από έναν λογαριασμό τρίτου.

{% roboWikiPicture {src:"docs/liability/report.jpg", alt:"report"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Existential deposit", type: "warning"}%} Δώστε προσοχή ότι ο λογαριασμός του υπόσχοντος δεν πρέπει να είναι "νεκρός" - πρέπει να έχει την υπαρξιακή κατάθεση τουλάχιστον 1 mXRT.
{% endroboWikiNote %}

Υπογράψτε και υποβάλετε την αναφορά. Όταν ολοκληρωθεί, μπορείτε να την εξερευνήσετε στα συμβάντα.

{% roboWikiPicture {src:"docs/liability/new-report.jpg", alt:"new-report"} %}{% endroboWikiPicture %}

### 2. Εξερεύνηση αναφορών

Μπορείτε επίσης να παρατηρήσετε την αναφορά στην αποθήκευση. Μεταβείτε στο `Developer -> Storage` και επιλέξτε `liability` από τη λίστα επιλογών.

{% roboWikiPicture {src:"docs/liability/storage-report.jpg", alt:"storage-report"} %}{% endroboWikiPicture %}

### 3. Έλεγχος υπολοίπων

Στην εικόνα φαίνεται ότι τώρα ο υπόσχων έχει λάβει τον "μισθό" του. Η οικονομική σχέση πραγματοποιήθηκε!

{% roboWikiPicture {src:"docs/liability/balances-2.jpg", alt:"balances-2"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Verifying", type: "note"}%} Προς το παρόν δεν υπάρχει τρόπος να επαληθευτεί αν η εργασία έχει ολοκληρωθεί, οπότε μόλις ο υπόσχων υποβάλει αναφορά, τα tokens μεταφέρονται στον λογαριασμό του.
Η δυνατότητα επαλήθευσης θα προστεθεί στο μέλλον.
{% endroboWikiNote %}