---
title: Υποχρέωση
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Για να μετατρέψετε τους ρομπότ σε οικονομικούς παράγοντες, χρειάζεστε ένα εργαλείο σύμβασης για αυτό. Γνωρίστε την Υποχρέωση - Ρομπονομική παλέτα που εφαρμόζει συμβάσεις μεταξύ λογαριασμών parachain!**

<robo-wiki-note type="warning" title="Dev Node">

  Παρακαλούμε να προσέξετε ότι αυτός ο οδηγός παρουσιάζεται σε μια τοπική περίπτωση του Robonomics Node. Δημιουργήστε το δικό σας με [αυτές τις οδηγίες](/docs/run-dev-node).

</robo-wiki-note>

## Επισκόπηση Θεωρίας

Στο Ethereum υπήρχε μια αρκετά περίπλοκη δομή αλληλεπίδρασης υποχρέωσης. Μπορείτε να το γνωρίσετε [εδώ](/docs/robonomics-how-it-works). Σήμερα τα πράγματα είναι λίγο πιο εύκολα με το Kusama!

### Διαπραγματεύσεις

To sign a contract the two sides need to negotiate first. This may be done several ways, including [IPFS PubSub ](https://blog.ipfs.tech/25-pubsub/) or Robonomics PubSub. A sample of Python code using Robonomics PubSub is 
presented [here](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub). 

Προσφορά και ζήτηση είναι μηνύματα που περιέχουν δύο κύρια χαρακτηριστικά μιας σύμβασης: **περιγραφή εργασίας** και **τιμή**. Η μορφή του μηνύματος πρέπει να σχεδιαστεί από τον χρήστη για κάθε συγκεκριμένη εφαρμογή. Δεν είναι τόσο σημαντικό στη διαδικασία διαπραγμάτευσης να ακολουθείται μια αυστηρή κανόνα μορφής. Η πιθανή ροή παρουσιάζεται σην παρακάτω εικόνα.

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  Σημειώστε ότι το PubSub είναι ένα ανοιχτό πρωτόκολλο, οπότε δεν πρέπει να μεταφέρονται ευαίσθητα δεδομένα. Για αυτό πρέπει να χρησιμοποιήσετε άλλα πρωτόκολλα.

</robo-wiki-note>


### Υπογραφές

Όταν οι διαπραγματεύσεις τελειώσουν με επιτυχία, κάθε πλευρά πρέπει να υπογράψει τη λεγόμενη συμφωνία της που ονομάζεται υπογραφή. Αυτό είναι ένα μήνυμα που περιέχει περιγραφή εργασίας και τιμή **σε συγκεκριμένη μορφή** υπογεγραμμένο με ιδιωτικό κλειδί του Konto brauchen. Υπάρχει ένα [Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Υποχρέωση.sign_liability) και για αυτό.
 - Η περιγραφή της εργασίας ονομάζεται **τεχνική**. Αυτό είναι ένα συμβολοσειρά μήκους 32 bytes που μπορεί να είναι ένα κωδικοποιημένο IPFS CID.
 - Η τιμή ονομάζεται **οικονομία**. Αυτό είναι ένα δεκαδικό XRT - Weiner. 1 Weiner = 10**-9 XRT.

<robo-wiki-note type="note" title="32 bytes">

  Μπορείτε να λάβετε ένα [IPFS](https://ipfs.tech/) CID με τη σωστή μορφοποίηση με τη [βιβλιοθήκη Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
  Όταν χρησιμοποιείτε τη λειτουργία `sign_liability`, δεν χρειάζεται να μετατρέψετε το hash, θα γίνει αυτόματα.

</robo-wiki-note>

Ακολουθώντας το παράδειγμα του καφέ:

1. Η εργασία είναι ένα JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. Το IPFS CID της είναι `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Έτσι η **τεχνική** (μετατραπέντα CID) είναι `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9` 
4. Η **οικονομία** είναι `1.5 XRT`.

Όταν υπογραφεί, είναι ώρα να δημιουργηθεί μια υποχρέωση! Αυτό μπορεί να γίνει από μία από τις πλευρές (είτε ο υπόσχομαι είτε ο υπόσχομαι) ή από έναν λογαριασμό τρίτου μέρους ενός ονομαζόμενου παρόχου.

## Δημιουργία Υποχρέωσης

### Προετοιμασίες

Όπως αναφέρθηκε νωρίτερα, στη διαδικασία συμμετέχουν τουλάχιστον δύο πλευρές. Για αυτό το παράδειγμα, ας χρησιμοποιήσουμε τρεις και να δημιουργήσουμε έναν ξεχωριστό πάροχο για αυτό. Υποθέστε ότι οι διαπραγματεύσεις έλαβαν ήδη χώρα κάπως.

### 1. Δημιουργήστε τρεις λογαριασμούς και προσθέστε κεφάλαια σε αυτούς

<robo-wiki-picture src="liability/balances.jpg" />

Εδώ έχουμε παρέχει στον πάροχο 100 XRT για να υπογράψει εξωτερικές υποχρεώσεις, ο υπόσχομαι έλαβε 2 XRT για να πληρώσει την εργασία.
Ο υπόσχομαι δεν έλαβε κανένα κεφάλαιο (εκτός από ένα επιταγματικό κατάθεση τουλάχιστον 1 mXRT).

### 1. Πλοηγηθείτε στο Developer -> Extrinsics

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. Επιλέξτε liability -> create  από την αναπτυσσόμενη λίστα πιθανών εξωτερικών υποχρεώσεων

Επίσης, επιλέξτε έναν λογαριασμό με τον οποίο θέλετε να υποβάλετε ην εξωτερική υποχρέωση. Συμπληρώστε όλες τις παραμέτρους.

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="Υπογραφές">

  Εφόσον χρησιμοποιείται ο πάροχος εδώ, δεν χρειάζεται να γνωρίζετε τους κωδικούς σπόρων των συμμετεχόντων. Χρειάζονται μόνο οι υπογραφές τους.

</robo-wiki-note>

### 3. Υποβολή συναλλαγής

<robo-wiki-picture src="liability/submit.jpg" />

### 4. Ελέγξτε την ευθύνη σας στα γεγονότα

Για αυτό, πλοηγηθείτε στο `Network -> Explorer` και βρείτε μια λίστα με τα γεγονότα στα δεξιά. Κάντε κλικ σε ένα εικονίδιο τριγώνου για να το ανοίξετε.

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  Ο κατακερματισμός μπορεί να μετατραπεί σε ένα IPFS CID με το ίδιο [εργαλείο Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).

</robo-wiki-note>

### 5. Εξερεύνηση αποθήκευσης

Μπορείτε επίσης να εξερευνήσετε μερικά χαρακτηριστικά των υποχρεώσεων στο αποθηκευτικό μοντέλο `υποχρέωση`.

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  Η λειτουργία αποθήκευσης `Next Index` δείχνει τον τελευταίο δείκτη υποχρέωσης +1, οπότε αν και είναι `1`, η υποχρέωση `0` εξερευνάται.

</robo-wiki-note>

## Αναφορές

Φανταστείτε ότι ένας καφές έχει φτιαχτεί και τώρα η μηχανή καφέ χρειάζεται να το αναφέρει κάπως. Εκεί εμφανίζονται οι αναφορές ευθύνης. Ως απόδειξη εργασίας, ο λογαριασμός προσθέτει έναν ακόμα IPFS CID ως περιεχόμενο αναφοράς κατά την ολοκλήρωση της υπάρχουσας υποχρέωσης. Αυτό απαιτεί ξανά μια υπογραφή του διαθέτη.

<robo-wiki-note type="note" title="Report signature">

  Το υπογεγραμμένο μήνυμα περιέχει τον υπάρχοντα δείκτη υποχρέωσης και τον κωδικοποιημένο σε 32 bytes αναπαράσταση του IPFS CID της αναφορς. Και πάλι, το [εργαλείο Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Υποχρέωση.sign_report) μπορεί να βοηθήσει στην υπογραφή της αναφοράς.

</robo-wiki-note>

Συνεχίζοντας με το παράδειγμα της μηχανής καφέ:

1. Η αναφορά είναι ένα JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. Το IPFS CID της είναι `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Έτσι, το **ωφέλιμο φορτίο** (μετασχηματισμένο CID) είναι `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. **Δείκτης** είναι `0` είναι ο υπάρχων δείκτης υποχρέωσης.

### 1. Πλοηγηθείτε στις extrinsics, liability -> finalize(report)

Συμπληρώστε τις παραμέτρους και υποβάλετε εξωγενείς. Και πάλι, αυτό μπορεί να γίνει από λογαριασμό τρίτου μέρους.

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  Προσέξτε ότι ο λογαριασμός του διαθέτη δεν πρέπει να είναι "νεκρός" - πρέπει να έχει την υπαρξιακή κατάθεση τουλάχιστον 1 mXRT.

</robo-wiki-note>

Υπογράψτε και υποβάλετε την αναφορά. Όταν τελειώσετε, μπορείτε να την εξερευνήσετε στα γεγονότα.

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. Εξερεύνηση αναφορών

Μπορείτε επίσης να παρατηρήσετε την αναφορά στην αποθήκευση. Πηγαίνετε στο `Developer -> Storage` και επιλέξτε `liability` από την αναπτυσσόμενη λίστα.

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. Ελέγξτε τις υπολογιστικές ισορροπίες

Στην εικόνα φαίνεται ότι τώρα ο διαθέτης έχει λάβει το "μισθό". Έχει συμβεί οικονομική σχέση!

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Verifying">

  Μέχρι στιγμής δεν υπάρχει τρόπος να επαληθευτεί ότι η εργασία έχει γίνει, οπότε μόλις ο διαθέτης αναφέρει, τα κέρματα μεταφέρονται στον λογαριασμό του. 
  Η δυνατότητα επαλήθευσης θα προστεθεί στο μέλλον.

</robo-wiki-note>