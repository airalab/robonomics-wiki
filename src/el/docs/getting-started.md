---
title: Πρώτα βήματα
contributors: [Vourhey, positivecrash, ensrationis]
---

Αυτή η σελίδα σας οδηγεί από το μηδέν στην πρώτη σας εγγραφή στο δίκτυο Robonomics. Χρειάζεστε έναν browser, ένα wallet extension και λίγο XRT.

## 1. Δημιουργήστε λογαριασμό

1. Εγκαταστήστε το [Polkadot.js extension](https://polkadot.js.org/extension/) ή άλλο wallet του Polkadot που υποστηρίζει προσαρμοσμένα δίκτυα.
2. Δημιουργήστε έναν λογαριασμό στο wallet. Γράψτε τη φράση ανάκτησης και φυλάξτε την offline.
3. Ο ίδιος λογαριασμός λειτουργεί και στο Robonomics. Το Robonomics εμφανίζει τις διευθύνσεις στη δική του μορφή (πρόθεμα SS58 32), οπότε εκεί η διεύθυνσή σας ξεκινά με `4`.

Ένας λογαριασμός υπάρχει on-chain μόνο όταν έχει τουλάχιστον την υπαρξιακή κατάθεση (existential deposit), 0.000001 XRT.

## 2. Αποκτήστε XRT

Χρειάζεστε πολύ λίγο. Τη στιγμή που γράφεται αυτή η σελίδα, μια εγγραφή datalog κοστίζει σε τέλη πολύ λιγότερο από 0.001 XRT.

Πού διαπραγματεύεται σήμερα το XRT:

- **Uniswap στο Ethereum.** Το XRT παραγωγής στο Ethereum είναι XRT που έχει μεταφερθεί από το Polkadot μέσω του Snowbridge. Το συμβόλαιό του είναι `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. [Ανταλλαγή στο Uniswap](https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x1f752250f518e419f2f03804e25728c5c6dff73f). Το [Snowbridge](https://app.snowbridge.network/send) μεταφέρει tokens μεταξύ Ethereum και Polkadot.
- **Polkadot Asset Hub.** Το XRT υπάρχει στο Asset Hub, και εκεί υπάρχει pool ανταλλαγής DOT–XRT.

Η μεταφορά XRT από το Asset Hub στον λογαριασμό σας στο parachain Robonomics είναι μεταφορά μεταξύ αλυσίδων (cross-chain). Δεν έχει δημοσιευτεί ακόμα οδηγός βήμα προς βήμα. Αν κολλήσετε, ρωτήστε στην ομάδα Telegram [XRT Traders](https://t.me/xrt_trade).

{% roboWikiNote {type: "warning", title: "Παλιοί σύνδεσμοι"}%} Ορισμένες παλαιότερες σελίδες παραπέμπουν ακόμα σε ανταλλακτήρια που δεν διαπραγματεύονται πια XRT και στο παλιό token του Ethereum `0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`. Το παλιό token δεν είναι το XRT παραγωγής. {% endroboWikiNote %}

## 3. Συνδέστε το Polkadot.js Apps

Ανοίξτε το [Polkadot.js Apps με το RPC του Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer). Συνδέεται στο δημόσιο endpoint `wss://polkadot.rpc.robonomics.network/`. Επιτρέψτε τον ιστότοπο στο wallet extension ώστε να εμφανιστεί ο λογαριασμός σας.

Για να δείτε blocks, λογαριασμούς και μεταφορές, μπορείτε να χρησιμοποιήσετε και τον block explorer στο [scan.robonomics.network](https://scan.robonomics.network).

<a id="4-send-your-first-record"></a>

## 4. Στείλτε την πρώτη σας εγγραφή

Το πιο απλό πρώτο βήμα είναι μια εγγραφή datalog: ένα μικρό κομμάτι δεδομένων που αποθηκεύεται on-chain στον λογαριασμό σας.

1. Στο Polkadot.js Apps ανοίξτε **Developer → Extrinsics**.
2. Επιλέξτε τον λογαριασμό σας, μετά `datalog` και `record`.
3. Εισαγάγετε τα δεδομένα σας, έως 512 bytes. Απλό κείμενο αρκεί.
4. Υποβάλετε τη συναλλαγή και υπογράψτε την στο wallet.

Για να τη διαβάσετε, ανοίξτε **Developer → Chain state**, επιλέξτε `datalog` και `datalogIndex` και κάντε ερώτημα για τον λογαριασμό σας. Θα δείτε ποια slots περιέχουν τις εγγραφές σας. Μετά κάντε ερώτημα στο `datalogItem` με τον λογαριασμό σας και τον αριθμό ενός slot. Κάθε εγγραφή έχει χρονοσφραγίδα.

Το Datalog είναι ένα από τα [παλαιά pallets](/docs/legacy-pallets/#datalog). Λειτουργεί ακόμα και είναι καλή πρώτη δοκιμή, αλλά τα νέα έργα καλό είναι να χρησιμοποιούν το δέντρο συσκευών.

## 5. Επόμενο βήμα: περιγράψτε τις συσκευές σας

Ο πυρήνας του Robonomics είναι το δέντρο συσκευών. Δημιουργείτε έναν κόμβο για την εγκατάστασή σας, προσθέτετε κόμβους για τα μέρη της και τις συσκευές, και αποφασίζετε ποιος μπορεί να τους ενημερώνει. Δείτε [Δέντρο συσκευών (CPS)](/docs/device-tree/) και μετά [Σύνδεση συσκευών](/docs/connect-devices/).
