---
title: Επισκόπηση
contributors: [ensrationis]
---

Το Robonomics είναι ένα cloud για συσκευές στο Polkadot. Στο cloud κρατάτε την περιγραφή των συσκευών σας και την τρέχουσα κατάστασή τους, καταγράφετε μετρήσεις και στέλνετε εντολές. Πληρώνετε σε XRT, το token του δικτύου. Καμία εταιρεία δεν ελέγχει μόνη της το cloud: το λειτουργούν ανεξάρτητοι collators, και οι κάτοχοι XRT το διοικούν με ψηφοφορίες on-chain.

## Βασικά μέρη

- **Δέντρο συσκευών (CPS).** Ένα δέντρο από κόμβους που περιγράφει την εγκατάστασή σας: ένα κτίριο, τα δωμάτιά του, τις συσκευές μέσα σε αυτά. Κάθε κόμβος περιέχει μια σύντομη περιγραφή και την τρέχουσα κατάσταση. Ο ιδιοκτήτης αποφασίζει ποιος μπορεί να γράφει σε ποιο μέρος του δέντρου. Σήμερα αυτό είναι ο πυρήνας του Robonomics. Δείτε [Δέντρο συσκευών (CPS)](/docs/device-tree/).
- **XRT.** Το token. Με αυτό πληρώνονται τα τέλη συναλλαγών και οι συνδρομές, και με αυτό ψηφίζουν οι κάτοχοί του. Δείτε [XRT και διακυβέρνηση](/docs/xrt-and-governance/).
- **Διακυβέρνηση.** Το τυπικό OpenGov του Polkadot με δύο tracks. Δεν υπάρχει κλειδί Sudo: κάθε προνομιακή αλλαγή, μαζί και οι αναβαθμίσεις του runtime, περνά από δημοψήφισμα.
- **Collators.** Οι servers που παράγουν τα blocks. Οποιοσδήποτε μπορεί να γίνει υποψήφιος δεσμεύοντας XRT. Δείτε [Εκτέλεση collator](/docs/run-collator/).

Τα παλαιότερα δομικά στοιχεία (Datalog, Launch, συνδρομές RWS, Digital Twin, Liability) λειτουργούν ακόμα, αλλά είναι παρωχημένα (deprecated). Δείτε [Παλαιά pallets](/docs/legacy-pallets/).

## Το δίκτυο

| | |
|---|---|
| Δίκτυο | Parachain Robonomics στο Polkadot |
| Para ID | 3388 |
| Token | XRT, 9 δεκαδικά |
| Μορφή διευθύνσεων | Πρόθεμα SS58 32 (οι διευθύνσεις ξεκινούν με `4`) |
| Χρόνος block | 6 δευτερόλεπτα (στόχος) |
| Δημόσιο RPC | `wss://polkadot.rpc.robonomics.network/` |
| Block explorer | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [άνοιγμα με το RPC του Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

Το Polkadot είναι το μόνο ενεργό δίκτυο Robonomics. Το parachain στο Kusama έχει σταματήσει. Δείτε [Το XRT σε άλλα δίκτυα](/docs/xrt-migration/).

## Τι χτίζεται

Το Robonomics 5.0 προσθέτει το cloud σε επίπεδα. Η διακυβέρνηση και το δέντρο συσκευών με Scope και Access λειτουργούν ήδη. Οι συνδρομές είναι υπό ανάπτυξη: μια συσκευή θα μπορεί να χρησιμοποιεί το δίκτυο χωρίς να έχει δικό της XRT. Η αποθήκευση και ο υπολογισμός είναι προγραμματισμένα· δεν υπάρχει ακόμα κώδικας για αυτά.

Διαβάστε περισσότερα στο άρθρο του blog [Robonomics 5.0, part one](https://robonomics.network/blog/robonomics-5-0-runtime-first/) και στον [οδικό χάρτη του 5.0](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md).

## Λογισμικό και συντηρητές

Όλο το λογισμικό του Robonomics είναι ανοιχτού κώδικα:

- [airalab/robonomics](https://github.com/airalab/robonomics): το runtime και τα pallets του.
- [airalab/robins](https://github.com/airalab/robins): εργαλεία, μεταξύ των οποίων το εργαλείο γραμμής εντολών `cps` και gateways για συσκευές.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): η βιβλιοθήκη Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): η web εφαρμογή στο [robonomics.app](https://robonomics.app).

Δεν υπάρχει ξεχωριστό πρόγραμμα κόμβου Robonomics. Οι collators τρέχουν το γενικό `polkadot-omni-node` της Parity με το chain spec του Robonomics.

Οι ιστότοποι του Robonomics, μαζί και αυτό το wiki, λειτουργούνται από την Akagi Engineering Co., Ltd. (Ιαπωνία). Νέα και σημειώσεις εκδόσεων υπάρχουν στο [blog του Robonomics](https://robonomics.network/blog/).
