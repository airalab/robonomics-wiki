---
title: Create Account for Robonomics Parachaστην 

contributors: [PaTara43, Fingerling42]
---

**In order to interact αντίστοιχα. Ωστόσο, αυτές οι διαδρομές μπορεί να διαφέρουν ανάλογα με την συγκεκριμένη εγκατάστασή σας. operate with Robonomics Parachain, developers and users need to create an account on the Polkadot / Substrate Portal. The account performs basic functions for the network: your public network address(the public key), the access control to the address and funds (the private key), sending transactions to the network, showing your tokens and their amount, etc. Below are two main ways to create an account for Robonomics Parachain.**

## 1. Χρησιμοποιώντας την Επέκταση Περιηγητή Polkadot{.js}

Η Επέκταση Polkadot παρέχει ένα μηχανισμό για τη δημιουργία λογαριασμού και την αλληλεπίδραση με όλα τα έργα Polkadot / Kusama, συμπεριλαμβανομένου του Robonomics Parachain. Αυτός δεν είναι ο ασφαλέστερος τρόπος διαχείρισης του λογαριασμού σας, αλλά είναι ο πιο βολικός από άποψη ισορροπίας ασφάλειας / χρηστικότητας.

## 1.1. Εγκατάσταση Επέκτασης Περιηγητή

Η επέκταση περιηγητή είναι διαθέσιμη για [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) and [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (συμπεριλαμβανομένων των περιηγητών που βασίζονται στο Chromium).

![Browser Extension](../images/creating-an-account/1.1-polkadot-extension.png "Browser Extension")

## 1.2. Άνοιγμα Εφαρμογής Robonomics Parachain

Πηγαίνετε στο [Εφαρμογή Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) στο Portal του Polkadot / Substrate. Εάν αυτή είναι η πρώτη φορά που εισέρχεστε στο portal, θα ζητηθεί πρόσβαση στην επέκταση περιηγητή, οπότε επιτρέψτε την πρόσβαση. 

Μόλις ανοίξετε την εφαρμογή, ρίξτε μια ματιά στην επάνω αριστερή γωνία. Το όνομα του δικτύου, το εικονίδιό του και ο αριθμός του τελευταίου μπλοκ εμφανίζονται εκεί. Κάνοντας κλικ σε αυτήν την περιοχή θα ανοίξει μια λίστα με όλα τα δίκτυα Polkadot / Kusama, συμπεριλαμβανομένων των δοκιμαστικών δικτύων και των τοπικών κόμβων. Μπορείτε να κάνετε εναλλαγή μεταξύ δικτύων επιλέγοντας το απαιτούμενο και πατώντας το κουμπί `Switch`. **Βεβαιωθείτε ότι είστε συνδεδεμένοι στο Robonomics Parachain τώρα**. 

![Robonomics Parachain app](../images/creating-an-account/1.2-robonomics-app.png "Robonomics Parachain app")

## 1.3. Ενημέρωση Μεταδεδομένων Επέκτασης 

Είναι πολύ πιθανό η εφαρμογή να σας ζητήσει να ενημερώσετε τα μεταδεδομένα για την επέκταση ώστε να εμφανίζονται τα σωστά στοιχεία για την αλυσίδα στην οποία είστε συνδεδεμένοι. Πηγαίνετε στο **Settings -> Metadata**, πατήστε το κουμπί `Update metadata` και στη συνέχεια, στο αναδυόμενο παράθυρο, επιτρέψτε στην επέκταση να το κάνει. 

![Updating metadata](../images/creating-an-account/1.3-metadata-update.png "Updating metadata")

## 1.4. Δημιουργία Λογαριασμού στην Επέκταση   

Ανοίξτε την επέκταση περιηγητή Polkadot{.js}. Κάντε κλικ στο μεγάλο κουμπί συν, ή επιλέξτε `Create new account` από το μικρό εικονίδιο συν στην πάνω δεξιά γωνία. Θα πρέπει να δείτε το παρακάτω μενού, με τον δημιουργημένο μνημονικό σπόρο σε μορφή δώδεκα λέξεων και τη διεύθυνση. 

 

![Account creation, step one](../images/creating-an-account/1.4-create-account-step-1.png "Account creation, step one")

Ο σπόρος είναι το κλειδί για τον λογαριαμό. Με τη γνώση του σπόρου, μπορείτε (ή οποιοσδήποτε άλλος γνωρίζει το σπόρο) να αποκτήσετε έλεγχο σε αυτόν τον λογαριασμό και ακόμα να τον ανακτήσετε, αν ξεχάσετε τον κωδικό πρόσβασης.   **Είναι πολύ σημαντικό να το αποθηκεύσετε κάπου με ασφάλεια**, προτιμητέον σε χαρτί ή άλλη μη ψηφιακή συσκευή, όχι σε ψηφιακή αποθήκευση ή σε υπολογιστή. 

Αποθήκευση του σπόρου και πίεση `Next step`. Θα πρέπει να δείτε το ακόλουθο μενού.

![Account creation, step two](../images/creating-an-account/1.5-create-account-step-2.png "Account creation, step two")

- *Network* σας επιτρέπει να επιλέξετε σε ποιο από τα δίκτυα θα χρησιμοποιηθεί αποκλειστικά αυτός ο λογαριασμός. Μπορείτε να χρησιμοποιήσετε την ίδια διεύθυνση σε πολλά δίκτυα, ωστόσο, για λόγους απορρήτου, συνιστάται να δημιουργήσετε μια νέα διεύθυνση για κάθε δίκτυο που χρησιμοποιείτε. 
Επιλέξτε το δίκτυο Robonomics από την αναπτυσσόμενη λίστα. Εάν δεν μπορέσατε να βρείτε το δίκτυο Robonomics, τότε πιθανότατα δεν ενημερώσατε τα μεταδεδομένα, πηγαίνετε πίσω και κάντε το.

    - Θα παρατηρήσετε ότι η μορφή της διεύθυνσης και το εικονίδιο του λογαριασμού θα αλλάξουν - αυτό είναι φυσιολογικό. Οι διάφορες μορφές δικτύου είναι απλώς άλλες αναπαραστάσεις του ίδιου δημόσιου κλειδιού. 

- *Name* είναι απλώς το όνομα του λογαριασμού για τη δική σας χρήση. Δεν αποθηκεύεται στο blockchain και δεν θα είνα ορατό σε άλλους χρήστες. 

- *Password* χρησιμοποιείται για την κρυπτογράφηση των πληροφοριών του λογαριασμού σας. Θα χρειαστεί να το ξαναεισάγετε όταν υπογράφετε συναλλαγές στην πύλη. Δημιουργήστε ένα και θυμηθείτε το.

Ως αποτέλεσμα, μετά τη δημιουργία ενός λογαριασμού, θα τον δείτε στη λίστα των λογαριασμών στην επέκταση Polkadot{.js}. Κάνοντας κλικ στις τρεις τελείες, μπορείτε να μετονομάσετε τον λογαριασμό, να τον εξαγάγετε, να τον αφαιρέσετε από την επέκταση και να αλλάξετε το δίκτυο που χρησιμοποιείται για τον λογαριασμό. 

Επίσης, ο λογαριασμός θα εμφανιστεί στο μενού **Accounts -> Accounts** στην πύλη, όπου θα σημειωθεί ότι έγινε ένεση με χρήση της επέκτασης.

![Successful account creation](../images/creating-an-account/1.6-account-injected.png "Successful account creation")


## 2. Απευθείας στην εφαρμογή Robonomics Parachain

Μπορείτε να χρησιμοποιήσετε τη διεπαφή χρήστη στην Πύλη Polkadot / Substrate για να δημιουργήσετε έναν λογαριασμό. Μπορεί να χρησιμοποιηθεί για ανάπτυξη και δοκιμές. 

## 2.1. Ανοίξτε την εφαρμογή Robonomics Parachain

Παω σε [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) στην Πύλη Polkadot / Substrate. **Ελέγξτε στην πάνω αριστερή γωνία ότι είστε συνδεδεμένοι με το Robonomics Parachain**.  

Παω σε **Accounts -> Accounts** και πατήστε το κουμπί `Add account`. 

![Robonomics Parachain App](../images/creating-an-account/2.1-robonomics-app-main-view.png "Robonomics Parachain App")

## 2.2. Δημιουργία Λογαριασμού

Θα πρέπει να δείτε το ακόλουθο αναδυόμενο μενού με τον σπόρο του λογαριασμού. 

![Generating account seed](../images/creating-an-account/2.2-robonomics-app-seed.png "Generating account seed")

Έχει δύο μορφές: *Mnemonic* (αναγνώσιμη από ανθρώπους) και *Raw* (μια ακολουθία από ψηφία και γράμματα). Αποθηκεύστε με ασφάλεια τη φράση σπόρου και πατήστε `Next`.

> Επίσης, μπορείτε να αλλάξετε τον τύο κρυπτονομίσματος για τη δημιουργία λογαριασμού, ανοίξτε `Advanced creation options` και επιλέξτε τον τύπο (`ed25519` στην εικόνα).

![ed25519 crypto type account](../images/creating-an-account/ed-account.jpg)

Στο επόμενο μενού, πρέπει να ορίσετε το όνομα του λογαριασμού και τον κωδικό πρόσβασης, παρόμοια με τις οδηγίες της επέκτασης που περιγράφονται παραπάνω.

![Generating account name and password](../images/creating-an-account/2.3-robonomics-app-name-pass.png "Generating account name and password")

Κάνοντας κλικ στο κουμπί `Next` θα σας οδηγήσει στο τελευταίο παράθυρο. Κάντε κλικ `Save` για να ολοκληρώσετε τη δημιουργία λογαριασμού. Θα δημιουργηθούν επίσης αρχεία JSON αντιγράφου ασφαλείας που πρέπει να αποθηκεύσετε με ασφάλεια. Αργότερα μπορείτε να χρησιμοποιήσετε αυτό το αρχείο για να ανακτήσετε τον λογαριασμό σας αν θυμάστε τον κωδικό πρόσβασης.

![Successful account creation](../images/creating-an-account/2.4-robonomics-app-account-created.png "Successful account creation")

## 2.3 Προσθήκη λογαριασμού ed25519 στην επέκταση Polkadot

Μπορεί να χρειαστεί να προσθέσετε τον δημιουργημένο λογαριασμό στην επέκταση Polkadot.js (γι λογαριασμό ed25519 μπορείτε να το κάνετε μόνο με αρχείο JSON αντιγράφου ασφαλείας). Για αυτό χρειάζεστε να δημιουργήσετε αρχείο αντιγράφου ασφαλείας του λογαριασμού. Πατήστε στις τρεις τελείες στον λογαριασμό σας και επιλέξτε `Create a backup file for this account` και γράψτε τον κωδικό πρόσβασής σας.

![Backup file](../images/creating-an-account/backup-file.jpg)

Στη συνέχεια, ανοίξτε μια επέκταση και πατήστε το κουμπί `+` στην επάνω δεξιά γωνία, και στη συνέχεια επιλέξτε `Restore account from backup JSON file`.

![Restore backup in extension](../images/creating-an-account/extention-add-backup.jpg)

Στο ανοιχτό παράθυρο αποθέστε το αποθηκευμένο αρχείο, εισαγάγετε τον κωδικό πρόσβασης και πατήστε `Restore`.

![Restore backup in extension 2](../images/creating-an-account/file-backup.jpg)

## 3. Ο λογαριασμός δημιουργήθηκε με επιτυχία 

Τώρα μπορείτε να λειτουργήσετε πλήρως με τον πρόσφατα δημιουργημένο λογαριασμό σας. Αποστολή και λήψη κρυπτονομισμάτων, μηνύματα, εγγραφή datalog και πολλά άλλα. Μη διστάσετε να εξερευνήσετε όλες τις δυνατότητες της εφαρμογής. Για να αντιγράψετε τη διεύθυνση του λογαριασμού σας, απλά κάντε κλικ στο εικονίδιο του, η διεύθυνση θα αντιγραφεί στο πρόχειρο. 

Εάν θέλετε να μάθετε περισσότερα για τους λογαριασμούς Polkadot / Kusama και επιπλέον τρόπους δημιουργίας τους, μπορείτε να βρείτε περισσότερες πληροφορίες [εδώ](https://wiki.polkadot.network/docs/learn-accounts) και [εδώ](https://wiki.polkadot.network/docs/learn-account-generation).
