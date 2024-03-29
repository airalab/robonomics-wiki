---
title: Robonomics OpenGov

contributors: [Leemo94]
---

## Εισαγωγή

Η Robonomics έχει μεταβεί στο μηχανισμό διακυβέρνησης OpenGov του Polkadot που επιτρέπει στην αλυσίδα να εξελίσσεται με τον χρόνο, κατά την απόλυτη επιθυμία των κατόχων των τοκενών.
Η μετάβαση της Robonomics στο OpenGov εξασφαλίζει ότι η DAO των κατόχων των τοκενών, η οποία ελέγχει την πλειοψηφία του μεριδίου, μπορεί πάντα να διατάξει την κατεύθυνση της αλυσίδας της Robonomics, επιβάλλοντας οποιαδήποτε αλλαγή στο δίκτυο που θεωρεί κατάλληλη.

<robo-wiki-note title='Note:' type="warning">
  Το OpenGov εφαρμόζεται μόνο στην Robonomics Parachain, η οποία είναι μια αλυσίδα βασισμένη στο Substrate που συνδέεται με την Kusama Relay Chain. Το OpenGov δεν εφαρμόζεται για την υλοποίηση της Robonomics Ethereum, καθώς το Ethereum mainnet δεν υποστηρίζει αυτήν τη στιγμή προηγμένα συστήματα διακυβέρνησης όπως το OpenGov.
</robo-wiki-note>

Το OpenGov αλλάζει τον τρόπο με τον οποίο πραγματοποιούνται οι καθημερινές λειτουργίες και οι αποφάσεις στην parachain. Παρέχει μεγαλύτερη σαφήνεια όσον αφορά το πεδίο των δημοψηφισμάτων και έχει τη δυνατότητα να αυξήσει δραματικά την απόδοση των αποφάσεων που λαμβάνονται στην parachain.

Το OpenGov είναι ήδη ενεργό στην Kusama relay chain εδώ και μερικούς μήνες και έχει αποδείξει ότι αυξάνει δραματικά τον αριθμό των αποφάσεων (ατομικών και διακριτών δημοψηφισμάτων) που μπορεί να προτείνει, να ψηφίσει και να ελέγξει την κατεύθυνση του πρωτοκόλλου η DAO των κατόχων των τοκενών.

**Το παρακάτω περιεχόμενο που περιέχεται σε αυτήν την ενότητα του wiki θα εξετάσει τις βασικές αρχές του OpenGov στην parachain της Robonomics και θα σας βοηθήσει να κατανοήσετε καλύτερα τις έννοιες πίσω από το OpenGov.**

*Σημειώνεται ότι η διακυβέρνηση είναι ένας συνεχώς εξελισσόμενος μηχανισμός στο πρωτόκολλο, ειδικά στα αρχικά στάδια εφαρμογής.*

Για όσους ενδιαφέρονται αποκλειστικά για τις παραμέτρους του Robonomics OpenGov Track, δείτε [εδώ](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

## Σχετικά με τα Δημοψηφίσματα

Τα δημοψηφίσματα είναι απλά, συμπερασματικά και βασισμένα στο μερίδιο συμμετοχής στο stake. Κάθε δημοψήφισμα έχει συγκεκριμένη πρόταση που συνδέεται με μια προνομιούχα κλήση συνάρτησης στην εκτέλεση των αλυσίδων. Αυτό μπορεί να περιλαμβάνει και την ισχυρότερη κλήση `set_code`, το οποίο έχει τη δυνατότητα να απενεργοποιεί ολόκληρο τον κώδικα του χρόνου εκτέλεσης των αλυσίδων – αυτό είναι μοναδικό για τις αλυσίδες που βασίζονται στο υπόστρωμα και καταργεί την απαίτηση για "σκληρό πιρούνι" της αλυσίδας κατά την ενημέρωση της επιχειρηματικής λογικής των αλυσίδων ( χρόνος εκτέλεσης).

Τα δημοψηφίσματα είναι διακριτά γεγονότα που έχουν μια σταθερή περίοδο ψηφοφορίας (περισσότερα για τις διάφορες περιόδους κατά τη διάρκεια του κύκλου ζωής ενός δημοψηφίσματος αργότερα). Οι ατομικοί κάτοχοι των τοκενών μπορούν να ψηφίσουν με τρεις τρόπους σε ένα δημοψήφισμα - ΝΑΙ (συμφωνώ/ναι), ΟΧΙ (διαφωνώ/όχι) ή ΑΠΟΧΗΣΗ από την ψήφο.

Όλα τα δημοψηφίσματα έχουν μια καθυστέρηση εκτέλεσης που συνδέεται με αυτά. Αυτή είναι η περίοδος μεταξύ της λήξης του δημοψηφίσματος και, υποθέτοντας ότι το δημοψήφισμα εγκρίθηκε, η εφαρμογή των αλλαγών στο δίκτυο. 

<robo-wiki-note title='Note:' type="warning">

  Υπάρχει ένας **Ελάχιστος** Χρόνος Εφαρμογής που έχει οριστεί ειδικά για κάθε διαφορετικό τύπο Προέλευσης, αλλά ο δημιουργός ενός συγκεκριμένου δημοψηφίσματος μπορεί να ορίσει τις εργασίες αυτού του συγκεκριμένου δημοψηφίσματος για εκτέλεση πολλών μπλοκ στο μέλλον

</robo-wiki-note>

Τα δημοψηφίσματα θεωρούνται "ψημένα" αν έχουν κλείσει και έχουν καταμετρηθεί οι ψήφοι. Υποθέτοντας ότι το δημοψήφισμα εγκρίθηκε, θα προγραμματιστεί για εφαρμογή (στον προγραμματιστή των αλυσίδων). Τα δημοψηφίσματα θεωρούνται "ανψημένα" αν η έκβαση είναι εκκρεμής - όπως αν το δημοψήφισμα εξακολουθεί να ψηφίζεται.

Με την προσθήκη του OpenGov, οποιοσδήποτε μπορεί να ξεκινήσει ένα δημοψήφισμα οποιαδήποτε στιγμή και μπορεί να το κάνει όσες φορές επιθυμεί. Το OpenGov καταργεί τον περιορισμό του μόνο 1 δημοψηφίσματος που μπορεί να επεξεργαστεί ταυτόχρονα (σημειώστε ότι, στο Gov v1, μόνο 1 δημοψήφισμα μπορεί να ψηφιστεί ταυτόχρονα. Μόνη εξαίρεση είναι ένα επιπλέον έκτακτο δημοψήφισμα από την επιταχυνόμενη Τεχνική Επιτροπή που μπορεί επίσης να ψηφιστεί ταυτόχρονα από την κοινότητα).

Η OpenGov παρουσιάζει αρκετά νέα χαρακτηριστικά / έννοιες που ονομάζονται Προέλευση και Κομμάτια, και αυτά εισάγονται για να βοηθήσουν στη ροή και επεξεργασία των δημοψηφισμάτων στο πρτόκολλο.

Κάθε Προέλευση συνδέεται με μια μόνο κλάση δημοψηφίσματος, και κάθε κλάση συνδέεται με ένα κομμάτι. Το κομμάτι περιγράφει τον κύκλο ζωής του δημοψηφίσματος και είναι συγκεκριμένο για αυτήν τη συγκεκριμένη Προέλευση από την οποία προέρχεται το δημοψήφισμα. Έχοντας κομμάτια με τις δικές τους συγκεκριμένες παραμέτρους επιτρέπει στο δίκτυο να τροποποιεί δυναμικά τον κύκλο ζωής των δημοψηφισμάτων με βάση το επίπεδο προνομίου τους (μπορείτε να σκεφτείτε το επίπεδο προνομίου ως το πόσο ισχυρό μπορεί να είναι ένα δημοψήφισμα / ποιες τύπου αλλαγές μπορεί να κάνει στο πρωτόκολλο).

*Σκεφτείτε τις Προελεύσεις ως τη δύναμη που συνδέεται με ένα δημοψήφισμα και σκεφτείτε τα Κομμάτια ως τις παραμέτρους ψηφοφορίας που συνδέονται με ένα δμοψήφισμα, όπως οι διάρκειες των περιόδων του και οι κριτήρια Έγκρισης και Υποστήριξης.*

Για παράδειγμα, μια αναβάθμιση κατά τη διάρκεια εκτέλεσης δεν έχει τις ίδιες επιπτώσεις για το πρωτόκολλο με ένα μικρό κεφάλαιο ταμείου, και για τον λόγο αυτό χρειάζονται διαφορετικές προελεύσεις στις οποίες θα προκαθορίζονται διάφορες συμμετοχές, έγκρισεις, καταθέσεις και περίοδοι εκτέλεσης (Κομμάτια) στο πλέγμα.

## Πρόταση δημοψηφίσματος και κύκλος ζωής δημοψηφίσματος 

### Περίοδος προετοιμασίας

Στο OpenGov, όταν δημιουργείται αρχικά ένα δημοψήφισμα, μπορεί να ψηφιστεί αμέσως από την κοινότητα ων κατόχων των δικαιωμάτων. Ωστόσο, δεν βρίσκεται αμέσως σε κατάσταση όπου μπορεί να τελειώσει ή να μετρηθούν οι ψήφοι του, να εγκριθεί και να εφαρμοστεί απότομα. Αντ' αυτού, τα δημοψηφίσματα πρέπει να πληρούν ορισμένα κριτήρια πριν μεταφερθούν στην περίοδο Απόφασης. Μέχρι να μπουν τα δημοψηφίσματα στην περίοδο Απόφασης, θα παραμείνουν αναποφασισμένα - και τελικά θα λήξουν μετά την συνολική περίοδο ζωής όπως ορίζεται στον ατομικό τροχό.

<robo-wiki-picture src='robonomics-opengov/1.jpeg' alt="picture" />

Τα κριτήρια για την είσοδο ενός δημοψηφίσματος στην περίοδο Απόφασης είναι τα εξής:
1. Μια περίοδος προετοιμασίας που καθορίζει το χρονικό διάστημα που πρέπει να παρέλθει πριν αρχίσει η περίοδος Απόφασης. Αυτή η περίοδος προετοιμασίας βοηθά να αντιμετωπιστεί η πιθανότητα "επίθεσης με απόφαση" όπο ένας επιτιθέμενος που ελέγχει μεγάλο μέρος της ψηφοφορικής ισχύος μπορεί να επιδιώξει να περάσει ένα δημοψήφισμα αμέσως μετά την πρόταση, παρακάμπτοντας τη δυνατότητα για τα άλλα μέλη του DAO των κατόχων των δικαιωμάτων να έχουν επαρκή χρόνο για να εξετάσουν το δημοψήφισμα και να συμμετάσχουν στην ψηφοφορία. Γι' αυτό τα Origins με υψηλότερα επίπεδα προνομίου έχουν σημαντικά μεγαλύτερες περίοδους προετοιμασίας.

2. Πρέπει να υπάρχει χώρος για την απόφαση. Κάθε κομμάτι έχει τα δικά του όρια για τον αριθμό των δημοψηφισμάτων που μπορούν να αποφασιστούν ταυτόχρονα (max_deciding). Τα κομμάτια που έχουν ιο ισχυρά επίπεδα προνομίων θα έχουν χαμηλότερα όρια. Για παράδειγμα, η προέλευση Root επιπέδου θα έχει ένα σημαντικά χαμηλότερο ποσό δημοψηφισμάτων που μπορούν να αποφασιστούν ταυτόχρονα σε σύγκριση με προελεύσεις χαμηλότερου επιπέδου προνομίων, όπως η προέλευση Small Tipper.

3. Πρέπει να υποβληθεί η Κατάθεση Απόφασης. Αρχικά, η δημιουργία ενός δημοψηφίσματος είναι αρκετά φθηνή, και η αξία της Κατάθεσης Υποβολής (που κρατείται όταν δημιουργείται αρχικά το δημοψήφισμα) είναι αρκετά χαμηλή και αποτελείται κυρίως από την αξία που κοστίζει για την αποθήκευση στην αλυσίδα που συνδέεται με το δημοψήφισμα. Οι Καταθέσεις Απόφασης είναι αρκετά υψηλές, πράγμα που απαιτείται για να αντιμετωπιστεί το spam και παίζει ρόλο στο οικονομικό παιχνίδι που φέρνει το OpenGov, το οποίο θα αναλύσουμε αργότερα.

Μόλις έχουν πληρούνται όλα τα παραπάνω τρία κριτήρια, το δημοψήφισμα θα μεταβεί στην Περίοδο Απόφασης. Οι ψήφοι για το δημοψήφισμα θα μετρηθούν για το αποτέλεσμα.

### Περίοδος Απόφασης

*Για μια γρήγορη επίδειξη βίντεο της Περιόδου Απόφασης, [δείτε αυτό το βίντεο](https://www.youtube.com/watch?v=wk58C-2CqPI)*.

Μόλις ένα δημοψήφισμα πληροί όλα τα κριτήρια που αναφέρονται στην παραπάνω ενότητα, θα εισέλθει στην Περίοδο Απόφασης.

Η Περίοδος Απόφασης περιστρέφεται γύρω από δύο κύριες έννοιες, αυτές της Έγκρισης και της Υποστήριξης. 

Η Έγκριση ορίζεται ως το ποσοστό του βάρους της ψήφου έγκρισης (AYEs έναντι NAYs) σε σύγκριση με το συνολικό βάρος της ψήφου (όλες οι AYE & NAY ψήφοι συνδυασμένες). Η πεποίθηση κάθε ψήφου συντελεί στο συνολικό βάρος των ψήφων AYE/NAY (περισσότερα για την ψηφοφορία πεποίθησης / εθελοντικό κλείδωμα σε μια αργότερη ενότητα).

Η Υποστήριξη είναι το συνολικό αριθμό ψήφων (κέρματα) που έχουν συμμετάσχει στο δημοψήφισμα (και δεν προσαρμόζεται για την πεποίθηση) σε σύγκριση με τον συνολικό δυνατό αριθμό ψήφων που μπορούν να γίνουν στο σύστημα (σκεφτείτε αυτό ως τη συνολική έκδοση του XRT στο parachain - ιδιαίτερα, ο συνολικός κυκλοφορούντας εφοδιασμός του XRT δεν είναι το κύριο στοιχείο εδώ, λόγω του γεγονότος ότι μια μερίδα αυτού του αριθμού υπάρχει στο Ethereum ως ERC-20 κέρματα).

** Οι ψήφοι που είναι στην κατεύθυνση ΑΠΟΧΗΣΗΣ ΔΕΝ συνεισφέρουν στα κριτήρια Έγκρισης, αλλά συμπεριλαμβάνονται / μετρώνται για τα κριτήρια Υποστήριξης **

Ένα δημοψήφισμα πρέπει να πληροί τα κριτήρια Υποστήριξης ΚΑΙ Έγκρισης κατά την Περίοδο Απόφασης για να προχωρήσει στην Περίοδο Επιβεβαίωσης.

Για λεπτομέρειες για τα ατομικά κριτήρια Υποστήριξης και Έγκρισης για κάθε κομμάτι, δείτε αυτό το [υπολογιστικό φύλλο](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

### Περίοδος Επιβεβαίωσης

Κάθε κομμάτι έχει τη δική του συγκεκριμένη διάρκεια για την Περίοδο Επιβεβαίωσης. Τα κομμάτια που έχουν υψηλότερα επίπεδα προνομίων (όπως το Root) έχουν σημαντικά μεγαλύτερες Περίοδους Επιβεβαίωσης από αυτά με χαμηλότερα επίπεδα προνομίων (όπως το Small Tipper).

Οι δημοψηφίσματα πρέπει να συνεχίσουν να πληρούν τα κριτήρια Έγκρισης και Υποστήριξης για ολόκληρη τη διάρκεια της Περιόδου Επιβεβαίωσης, διαφορετικά θα επιστραφούν και πάλι στην Περίοδο Απόφασης (σημείωση: η Περίοδος Απόφασης δεν διακόπτεται κατά τη διάρκεια της Περιόδου Επιβεβαίωσης, οπότε είναι εντελώς πιθανό μια Περίοδος Απόφασης να λήξει κατά τη διάρκεια της Περιόδου Επιβεβαίωσης, προκαλώντας έτσι την απόρριψη του δημοψηφίσματος και τη μη εφαρμογή του).

**Είναι δυνατή η προσαρμογή των κριτηρίων Έγκρισης και Υποστήριξης για τα μεμονωμένα κομμάτια μέσω δημοψηφίσματος με προνόμια Root Origin.**

Οι προέλευσες με χαμηλότερα επίπεδα πονομίων έχουν πολύ πιο εύκολα κριτήρια έγκρισης και υποστήριξης (ορίζονται από το κομμάτι) προς εκπλήρωση από αυτές με υψηλότερα επίπεδα προνομίων. Αντίστοιχα, οι προέλευσεις με υψηλότερα επίπεδα προνομίων έχουν λιγότερο απότομες καμπύλες από αυτές με λιγότερα προνόμια (όπως ορίζονται στο κομμάτι), προκειμένου να διασφαλιστεί ότι το DAO κάτοχος των καταλλήλων κριτηρίων έγκρισης του δημοψηφίσματος και να αποφευχθεί η επίθεση στα δημοψηφίσματα υψηλού προνομίου.

Στο OpenGov, τα δημοψηφίσματα που δεν εγκρίνονται μετά τη λήξη της Περιόδου Απόφασης θεωρούνται απόρριψη από προεπιλογή, και τόσο οι καταθέσεις υποβολής όσο και απόφασης επιστρέφονται στους αποστολείς τους (σημείωση: η κατάθεση απόφασης μπορεί να γίνει από κάποιον άλλον εκτός από τον αποστολέα του δημοψηφίσματος).

Αν ένα δημοψήφισμα καταφέρει να πληροί συνεχώς τα κριτήρια Έγκρισης και Υποστήριξης για ολόκληρη την Περίοδο Επιβεβαίωσης, τότε θεωρείται εγκεκριμένο και θα προγραμματιστεί να εκτελεστεί από την προτεινόμενη προέλευση, αλλά το δημοψήφισμα θα εκτελεστεί μόνο μετά τη λήξη της ελάχιστης περιόδου εφαρμογής.

### Περίοδος Εφαρμογής

Η Περίοδος Εφαρμογής καθορίζεται από τον αποστολέα κατά την πρόταση του δημοψηφίσματος, αλλά υπόκειται στην Ελάχιστη Περίοδο Εφαρμογής που καθορίζεται σε κάθε κομμάτι. Οι πιο ισχυρές Προελεύσεις έχουν πολύ μεγαλύτερη ελάχιστη περίοδο εφαρμογής από αυτές με λιγότερα προνόμια. Αυτό εξασφαλίζει ότι το δίκτυο έχει επαρκή χρόνο για να προετοιμαστεί για οποιεσδήποτε αλλαγές πορεί να επιβάλει ένα ισχυρό δημοψήφισμα.

## Εθελοντικό Κλείδωμα / Πεποίθηση

Το Robonomics χρησιμοποιεί έναν έννοια γνωστή ως εθελοντικό κλείδωμα ή ψήφος πεποίθησης. Αυτό επιτρέπει στους κατόχους των κερμάτων να αυξήσουν την εξουσία ψήφου τους αποφασίζοντας για πόσο καιρό είναι πρόθυμοι να κλειδώσουν τα κέρματά τους για μια συγκεκριμένη δημοψήφιση. Αυτός ο μηχανισμός επηρεάζει μόνο τα κριτήρια έγκρισης για κάθε δημοψήφιση, και η ψήφος πεποίθησης δεν επηρεάζει τα κριτήρια υποστήριξης.

Η ψήφος πεποίθησης μπορεί να υπολογιστεί χρησιμοποιώντας τον παρακάτω τύπο:

$$\text{Approval Votes} = \text{Tokens} * \text{Conviction\_Multiplier}$$


Αυτός ο πίνακας σας δείχνει πώς κάθε αυξανόμενο επίπεδο περιόδου κλειδώματος πολλαπλασιάζει την ψήφο σας για τα κριτήρια έγκρισης:

| Lock Periods | Vote Multiplier | Lock Up Days |
|--------------|-----------------|--------------|
| No Lock      | 0.1x            | 0          |
| 1            | 1x              | 7            |
| 2            | 2x              | 14           |
| 4            | 3x              | 28           |
| 8            | 4x              | 56           |
| 16           | 5x              | 112          |
| 32           | 6x              | 224          |


Το μέγιστο ποσό πεποίθησης που μπορεί να χρησιμοποιήσει ένας κάτοχος κερμάτων είναι 6 φορές η πεποίθηση. Μπορείτε να ορίσετε μόνο την πεποίθηση σύμφωνα με τον παραπάνω πίνακα και δεν μπορείτε, για παράδειγμα, να χρησιμοποιήσετε 5,5 φορές πεποίθηση.

Ενώ ένα κέρμα είναι κλειδωμένο λόγω ψήφου, μπορεί ακόμα να χρησιμοποιηθεί για ψήφο σε άλλες δημοψηφίσεις, ωστόσο δεν θα αποτελεί μέρος του μεταφερόμενου υπολοίπου σας (δεν μπορείτε να το στείλετε σε άλλο λογαριασμό) - και το υπόλοιπο θα γίνει μεταφερόμενο ξανά μόνο όταν ολοκληρωθεί η περίοδος κλειδώματος.

## Ανάθεση Ψήφου

Στο OpenGov, προστέθηκε ένας μηχανισμός για να επιτρέπει στους κατόχους κερμάτων που δεν έχουν αρκετό χρόνο για να εξετάσουν κάθε δημοψήφιση να χρησιμοποιούν τα κέρματά τους ως μέρος του συστήματος διακυβέρνησης, αυτό είναι γνωστό ως ανάθεση ψήφου.

Οι κάτοχοι κερμάτων μπορούν να επιλέξουν να αναθέσουν την εξουσία ψήφου τους σε έναν άλλο ψηφοφόρο στο σύστημα (άλλο λογαριασμό). Οι ψηφοφόροι μπορούν να καθορίσουν την ανάθεση της εξουσίας ψήφυ τους με ευελιξία, επιτρέποντάς τους να αναθέσουν την εξουσία ψήφου τους σε διαφορετικό λογαριασμό για κάθε ξεχωριστή Προέλευση. Οι ψηφοφόροι μπορούν επίσης να ορίσουν διαφορετικό ποσό εξουσίας ψήφου για κάθε Προέλευση (αριθμός κερμάτων και επίπεδο πεποίθησης).

Αυτή η δυνατότητα ανάθεσης έχει έναν στόχο, να αυξήσει την συμμετοχή των ψηφοφόρων και να βοηθήσει να διασφαλιστεί ότι οι απαιτούμενες συμμετοχές για την έγκριση και υποστήριξη των κριτηρίων πληρούνται.

Για να αναθέσετε την εξουσία ψήφου σας, μπορείτε να χρησιμοποιήσετε τη λειτουργία "Ανάθεση" που μπορείτε να βρείτε στην ενότητα Διακυβέρνηση -> Δημοψήφισμα του [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer). Εναλλακτικά, οι χρήστες μπορούν να υποβάλουν το extrinsic convictionVoting(Delegate) χρησιμοποιώντας την ενότητα Προγραμματιστής -> Extrinsics του Robonomics Portal, ωστόσο η χρήση της λειτουργίας "Ανάθεση" της ενότητας δημοψηφίσματος του portal είναι πολύ πιο εύκολη.

## Ακύρωση / Εξόντωση Δημοψηφίσματος και του Οικονομικού Παιχνιδιού Διακυβέρνησης

Στο OpenGov, υπάρχουν Προέλευση που απορρίπτουν τα διαρκή δημοψηφίσματα, ανεξάρτητα από την κατάστασ τους. Αυτά είναι γνωστά ως τα ίχνη του Διακυβερνητικού Ακυρωτή και του Διακυβερνητικού Εξοντωτή.

Αυτές οι Προέλευση παρεμβαίνουν σε ένα δημοψήφισμα που έχει ήδη ψηφιστεί. Αυτές οι Προέλευση, εάν το δημοψήφισμα που προέρχεται από αυτές εγκριθεί, θα απορρίψουν αμέσως ένα διαρκές δημοψήφισμα, ανεξάρτητα από την κατάστασή του. 

Η ακύρωση αυτή καθεαυτή είναι ένας τύπος δημοψηφίσματος που πρέπει να ψηφιστεί από τους κατόχους των διακριτικών σημάτων για να εκτελεστεί. Η ακύρωση έρχεται με τη δική της προέλευση και ίχνος που έχουν μικρότερο χρόνο οδήγησης (Περίοδος Απόφασης, κλπ.) και έχουν καμπύλες Έγκρισης και Υποστήριξης με πιο απότομη καμπύλη (που σημαίνει ότι τα κριτήριά τους είναι πολύ πιο εύκολο να πληρούνται με την πάροδο του χρόνου) από άλλες Προελεύσεις. Αυτό οφείλεται στο γεγονός ότι η ακύρωση ενός δημοψηφίσματος συνήθως συνοδεύεται από μια αίσθηση επείγοντος.

Ο Διακυβερνητικός Ακυρωτής στοχεύει να απορρίψει αμέσως ένα ήδη διεξαγόμενο δημοψήφισμα. Όταν ένα δημοψήφισμα ακυρώνεται από αυτήν την προέλευση, τόσο η Κατάθεση Υποβολής όσο και η Κατάθεση Απόφασης επιστρέφονται στους προέλευσης τους. Ένα παράδειγμα όταν ένα δημοψήφισμα μπορεί να θεωρηθεί ότι ακυρώνεται είναι εάν ο προέλευσης έχει κάνει κάποιο ανθρώπινο λάθος στο περιεχόμενο του δημοψηφίσματος του και δεν έχει απαραιτήτως προσπαθήσει να κάνει κάτι κακό.

Ο Διακυβερνητικός Εξοντωτής στοχεύει να απορρίψει αμέσως ένα ήδη διεξαγόμενο δημοψήφισμα. Εδώ έρχεται σε παιχνίδι το οικονομικό παιχνίδι της διακυβέρνησης. Οι Προέλευση με υψηλά επίπεδα προνομίου, όπως η Root, έχουν μια Κατάθεση Απόφασης που απαιτεί μεγάλο ποσό κεφαλαίου (XRT tokens) για να κατατεθεί προκειμένου το δημοψήφισμα να εισέλθει στην Περίοδο Απόφασης. 

Εάν ένας κακόβουλος δράστης υποβάλει ένα δημοψήφισμα, όπως ένα δημοψήφισμα με προέλευση Root που στοχεύει να `set_code` της χρονικής λειτουργίας της αλυσίδας σε κάτι που θα σταματήσει την παραγωγή μπλοκ της αλυσίδας, τότε η DAO των κατόχων διακριτικών σημάτων μπορεί να ανασηκώσει έναν αντί-δημοψήφισμα Διακυβερνητικού Εξοντωτή για να τιμωρήσει αυτήν την ενέργεια. Εάν το κακόβουλο δημοψήφισμα απορριφθεί μέσω της προέλευσης του Διακυβερνητικού Εξοντωτή, τότε και οι δύο καταθέσεις Υποβολής και Απόφασης κόβονται, πράγμα που σημαίνει τι ο προέλευσης (οι λογαριασμοί που κατέθεσαν αυτές τις καταθέσεις) θα χάσουν αυτά τα κεφάλαια. 

Αυτό σημαίνει ότι υπάρχει μια σοβαρή οικονομική συνέπεια για κακόβουλους δράστες που προσπαθούν να ανασηκώσουν δημοψήφισμα που θα είχε σοβαρές αρνητικές επιπτώσεις για την αλυσίδα, πράγμα που θεωρητικά θα σταματήσει οποιονδήποτε κακόβουλο δράστη να προσπαθήσει να το κάνει.

Η Κατάθεση Απόφασης για το ίχνος του Διακυβερνητικού Εξοντωτή είναι αρκετά υψηλή, αυτό γίνεται για να σταματήσει εξίσου κακόβουλους δράστες από το να κόψουν καταθέσεις κατά άλλα καλά δημοψηφίσματα. **Ένα υπάρχον δημοψήφισμα Διακυβερνητικού Εξοντωτή μπορεί να εξοντωθεί από ένα επόμενο δημοψήφισμα Διακυβερνητικού Εξοντωτή.**

## Τεχνική Επιτροπή Robonomics & Λευκολίστα Προέλευση

Αυτή η ομάδα είναι ένα αυτοδιοικούμενο επιτελείο εμπειρογνωμόνων που έχει ως κύριο στόχο να εκπροσωπεί ανθρώπους που ενσαρκώνουν κα διαθέτουν τεχνικές γνώσεις του πρωτοκόλλου δικτύου Robonomics. 

Αυτή η ομάδα (και μόνο αυτή η ομάδα) έχει τη δυνατότητα να προέρχεται από το Whitelist pallet. Αυτό το pallet κάνει μόνο μία πράξη, επιτρέπει σε μία Προέλευση να ανεβάσει το επίπεδο προνομίων μίας άλλης Προέλευσης για μία συγκεκριμένη λειτουργία. 

Αυτή η ομάδα μπορεί να εξουσιοδοτήσει δημοψήφισμα από μία προέλευση που είναι γνωστή ως Whitelisted-Root, και αυτά τα δημοψηφίσματα μπορούν να εκτελεστούν με προνόμια Root-level, αλλά αυτά τα δημοψηφίσματα θα λειτουργήσουν μόνο με συγκεκριμένες εντολές που έχουν εξουσιοδοτηθεί από την ομάδα. Το Whitelist pallet επαληθεύει δύο πράγματα:
1. Η Προέλευση είναι πραγματικά η Whitelisted-Root (δηλαδή το δημοψήφισμα πέρασε από την πορεία αυτής της Προέλευσης).
2. Η πρόταση έχει ράγματι εξουσιοδοτηθεί από την ομάδα.

Εάν και οι δύο προϋποθέσεις είναι αληθείς, τότε η λειτουργία θα εκτελεστεί με προνόμια Root-level.

Αυτό το σύστημα επιτρέπει τη δυνατότητα να υπάρχει ένα νέο παράλληλο Track (Whitelisted-Root Origin), των παραμέτρων του οποίου επιτρέπουν μια πιο σύντομη διαδικασία ψηφοφορίας (οι κριτήρια Έγκρισης και Υποστήριξης είναι ελαφρώς πιο εύκολα να εκπληρωθούν από το Root). Αυτή η ανοιχτή και διαφανής διαδικασία επιτρέπει σε αυτό το σώμα εμπειρογνωμόνων για το Πρωτόκολλο Δικτύου Robonomics να προτείνει δημοψηφίσματα που έχουν κρίνει ασφαλή και επείγοντα.

Να σημειωθεί ότι τα Κριτήρια Υποστήριξης για δημοψηφίσματα που ξεκινούν με την προέλευση Whitelisted-Root δεν τείνουν προς το 0 όπως πολλές άλλες προελεύσεις/πορείες. Αυτό εξασφαλίζει ότι αυτή η ομάδα δεν έχει απόλυτο έλεγχο στο σύνολο του Πρωτοκόλλου Δικτύου Robonomics, και απαιτεί ένα ελάχιστο επίπεδο Υποστήριξης (συμμετοχή ψηφοφόρων) από το συνολικό κατόχους των token.


## Διάρκειες Δημοψηφίσματος 

Είναι σημαντικό να κατανοήσουμε ότι η διάρκεια κάθε μεμονωμένου δημοψηφίσματος δεν είναι κάτι συγκεκριμένο, δεν είναι απόλυτη. Ορισμένα διαστήματα εντς του κύκλου ζωής του δημοψηφίσματος, όπως το ελάχιστο διάστημα εφαρμογής, έχουν πράγματι συγκεκριμένη διάρκεια, όμως - άλλα, συμπεριλαμβανομένης της περιόδου απόφασης, δεν έχουν. Για παράδειγμα, δεν είναι ακριβές να προσθέσετε τις μέγιστες διάρκειες για τις περιόδους Προετοιμασίας, Απόφασης, Επιβεβαίωσης και Ελάχ. Περίοδος Εφαρμογής και να δηλώσετε ότι "κάθε δημοψήφισμα θα πάρει X αριθμό ημερών", είναι πολύ πιο ευέλικτο από αυτό.

Ας δούμε αυτό μέσα από το πρίσμα μερικών ξεχωριστών δημοψηφισμάτων, όλα τα οποία προέρχονται από την ίδια Προέλευση, σε αυτήν την περίπτωση την Ρίζα προέλευση. 

Η Ρίζα Προέλευση έχει το δικό της κομμάτι, όπου ορίζονται οι διάρκειες για κάθε περίοδο, καθώς και οι καμπύλες Έγκρισης και Υποστήριξης.

Είναι σημαντικό να θυμάστε ότι τα Δημοψηφίσματα θα προχωρήσουν μόνο στο επόμενο στάδιο του κύκλου ζωής τους εάν πληρούνται ορισμένες προϋποθέσεις. 

<robo-wiki-picture src='robonomics-opengov/2.jpeg' alt="picture" />

Θα πρέπει να υποθέσετε στις παρακάτω εικόνες ότι, προκειμένου ένα δημοψήφισμα να ανέβει στο επόμενο στάδιο του κύκλου ζωής του, θα πρέπει να έχουν πληρούνται οι προϋποθέσεις που περιγράφονται στην παραπάνω εικόνα (εκτός αν αναφέρεται διαφορετικά).


### Μέγιστη δυνατή διάρκεια με πολύ χαμηλή συμμετοχή των ψηφοφόρων

Η παρακάτω εικόνα αποτελεί μια αναπαράσταση του μέγιστου δυνατού χρονοδιαγράμματος για ένα δημοψήφισμα, σκεφτείτε αυτό ως ένα δημοψήφισμα που:
1. Έχει δημοσιευθεί η Κατάθεση Απόφασης και έχει εισέλθει στην Περίοδο Απόφασης.
2. Έχει μία μόνο ψήφο, για παράδειγμα, 1 XRT, προς την κατεύυνση ΝΑΙ - αυτό σημαίνει ότι θα πληροί την απαιτούμενη Υποστήριξη (συμμετοχή των ψηφοφόρων) μόνο στο πολύ τέλος της Περιόδου Απόφασης (αφού η συνολική Υποστήριξη είναι πολύ χαμηλή), αλλά έχει 100% Έγκριση, οπότε τελικά θα πληροί τις απαιτήσεις για να εισέλθει στην Περίοδο Επιβεβαίωσης.
3. Συνεχίζει να πληροί τα προαναφερθέντα κριτήρια κατά την Περίοδο Επιβεβαίωσης.
4. Η πρόταση που έχει ανακύψει από το δημοψήφισμα θα εφαρμοστεί ακριβώς στο ίδιο μπλοκ με το τέλος της Ελάχ. Περιόδου Εφαρμογής - τεχνικά, ο δημιουργός του δημοψηφίσματος μπορεί να ορίσει τις αλλαγές στο δίκτυο όπως περιγράφονται στο δημοψήφισμα για να εφαρμοστούν πολλά μπλοκ στο μέλλον, οπότε ρεαλιστικά ο πραγματικός κύκλος ζωής ενός μεμονωμένου δημοψηφίσματος μπορεί να διακέσει πολλές ημέρες, εβδομάδες, μήνες ή χρόνια.

<robo-wiki-picture src='robonomics-opengov/3.jpeg' alt="picture" />

Βλέπουμε ότι σε αυτό το παράδειγμα, ο κύκλος ζωής του δημοψηφίσματος θα ήταν (περίπου) 17 ημέρες.


### Διάρκεια με πολύ υψηλή συμμετοχή ψηφοφόρων (με υψηλό αριθμό ψήφων ΥΠΕΡ)

Ας ρίξουμε μια ματιά σε ένα δημοψήφισμα όπου ο DAO κάτοχος του τοκετού XRT έχει εκφράσει μεγάλο ενδιαφέρον. Σε αυτό το παράδειγμα, θα υποθέσουμε ότι έχει συμβεί συνολική συμμετοχή ψηφοφόρων περίπου 248.771 XRT και όλοι οι ψηφοφόροι ψηφίζουν υπέρ (σημείωση: τεχνικά, σε αυτό το στάδιο ενός δημοψηφίσματος Root, σύμφωνα με την πορεία, μόνο το 60% των ψήφων πρέπει να είναι υπέρ για να πληροί τα κριτήρια έγκρισης).

<robo-wiki-note title="Note:" type="warning">

 Πάντα συμβουλεύεστε τις πληροφορίες που αφορούν την πορεία για ακριβείς πληροφορίες για κάθε πορεία, περισσότερες πληροφορίες μπορούν να βρεθούν σε αυτό το [φύλλο εργασίας](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

</robo-wiki-note>

Σε αυτό το παράδειγμα:
1. Το Κατάθεση Απόφασης αναρτήθηκε κατά τη διάρκεια της Περιόδου Προετοιμασίας και, ως εκ τούτου, μπόρεσε να μεταβεί στην Περίοδο Απόφασης στο τέλος της Περιόδου Προετοιμασίας.
2. Πολλοί ψηφοφόροι ψφισαν σε αυτό το δημοψήφισμα - επιτυγχάνοντας συμμετοχή ψηφοφόρων περίπου 248.771 XRT σε σχετικά σύντομο χρονικό διάστημα.
3. Οι ψήφοι ήταν πλειοψηφία υπέρ (πάνω από 60% υπέρ).
4. Το δημοψήφισμα πληροί συνεχώς τα κριτήρια της Περιόδου Επιβεβαίωσης για ολόκληρη την Περίοδο Επιβεβαίωσης (Σημείωση: Εάν ένα δημοψήφισμα σταματήσει να πληροί τα κριτήρια της Περιόδου Επιβεβαίωσης, τότε επιστρέφεται στην Περίοδο Απόφασης).
5. Η πρόταση που ανακοινώθηκε από το δημοψήφισμα θα εφαρμοστεί ακριβώς στο ίδιο μπλοκ που λήγει η Ελάχιστη Περίοδος Εφαρμογής.

Λόγω του γεγονότος ότι υπήρξε συμμετοχή περίπου 248.771 XRT, το δημοψήφισμα θα πληροί τα κριτήρια για να εισέλθει στην Περίοδο Επιβεβαίωσης του μετά από περίπου 168 ώρες (7 ημέρες).

<robo-wiki-picture src='robonomics-opengov/4.jpeg' alt="picture" />

Βλέπουμε ότι σε αυτό το δεύτερο παράδειγμα, λόγω του γεγονότος ότι υπήρξε μεγάλη συμμετοχή των ψηφοφόρων, η Περίοδος Απόφασης τελείωσε πριν το μισό από το μέγιστο επιτρεπόμενο χρόνο. Αποτέλεσμα αυτού είναι ένα δημοψήφισμα που μπορεί να εφαρμοστεί σε περίπου 10 ημέρες.


### Διάρκεια όταν η Κατάθεση Απόφασης δεν έχει ποτέ αναρτηθεί

Ας ρίξουμε τώρα μια ματιά σε ένα δημοψήφισμα που προήλθε, αλλά ποτέ δεν έχει αναρτηθεί η Κατάθεση Απόφασης του. Τέτοια δημοψηφίσματα βρίσκονται σε μια είδους κατάσταση "λιμβού", όπου η Περίοδος Προετοιμασίας τους έχει λήξει, αλλά επειδή η Κατάθεση Απόφασης δεν έχει αναρτηθεί, το δημοψήφισμα παραμένει στην κατάσταση "Προετοιμασίας".

<robo-wiki-picture src='robonomics-opengov/5.jpeg' alt="picture" />

Βλέπουμε ότι σε αυτό το τρίτο παράδειγμα, λόγω του γεγονότος ότι η Κατάθεση Απόφασης δεν έχει ποτέ αναρτηθεί, το δημοψήφισμα πραγματικά δεν θα εισέλθει ποτέ στην Περίοδο Απόφασης, αντίθετα παραμένει στην κατάσταση "Προετοιμασίας". Αυτό σημαίνει ότι τελικά, αν δεν αναρτηθεί ποτέ η Κατάθεση Απόφασης, το δημοψήφισμα θα λήξει μετά τη διάρκεια που καθορίζεται στη σταθερά timeOut του παλέτου.

Αυτό έχει συμβεί προηγουμένως στο Kusama, όπου ένα δημοψήφισμα αναρτήθηκε με ρίζες, αλλά λόγω των υψηλών απαιτήσεων κεφαλαίου για την ανάρτηση της Κατάθεσης Απόφασης, το δημοψήφισμα δεν εισήλθε ποτέ στα επόμενα στάδια του κύκλου ζωής του. Τέτοια δημοψηφίσματα ολοκληρώνονται με τη σημαία "λήξης χρόνου".


### Διάρκεια όταν η Κατάθεση Απόφασης αναρτήθηκε αργά

Τέλος, ας ρίξουμε μια ματιά σε ένα παράδειγμα όπου η Κατάθεση Απόφασης αναρτήθηκε αρκετά αργά μετά την αρχική ανάρτηση του δημοψηφίσματος. Αυτό έχει συμβεί προηγουμένως στο Kusama, όπου ένα δημοψήφισμα αναρτήθηκε με τη ρίζα, αλλά ο αρχικός δημιουργός χρειάτηκε χρόνο για να βρει κάποιον με μεγάλο ποσό κεφαλαίου για να αναρτήσει την Κατάθεση Απόφασης εκ μέρους του.

<robo-wiki-picture src='robonomics-opengov/6.jpeg' alt="picture" />

Σε αυτό το τελικό παράδειγμα, λόγω του γεγονότος ότι η Κατάθεση Απόφασης αναρτήθηκε μετά τη λήξη της Περιόδου Προετοιμασίας, αλλά πριν το δημοψήφισμα λήξει χρονικά – ο κύκλος ζωής του δημοψηφίσματος είναι πραγματικά πολύ μεγαλύτερος από τον κανονικό, καθώς εισέρχεται στην Περίοδο Απόφασης μετά από μεγαλύτερο χρονικό διάστημα.

Είναι σημαντικό να σημειωθεί ότι η DAO κατόχου των κερμάτων έχει τη δυνατότητα να ψηφίσει ΝΑΙ/ΟΧΙ σε δημοψηφίσματα που βρίσκονται στην Περίοδο Προετοιμασίας ή είναι ακόμα στην κατάσταση "Προετοιμασίας".
