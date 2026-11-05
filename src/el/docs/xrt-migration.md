---
title: Το XRT σε άλλα δίκτυα
contributors: [nakata5321, ensrationis]
---

Το XRT παραγωγής βρίσκεται στο parachain Robonomics στο Polkadot. Αυτή η σελίδα εξηγεί τι γίνεται με το XRT στο Kusama και στο Ethereum, και πού υπάρχει XRT στο Polkadot Asset Hub.

## Kusama

Το parachain Robonomics στο Kusama έχει σταματήσει. Παρήγαγε το τελευταίο του block, #12,268,835, στις 28 Σεπτεμβρίου 2026. Ένα αρχείο της βάσης δεδομένων υπάρχει στο [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama).

Τι λένε οι δημοσιευμένες αναρτήσεις για το XRT του Kusama:

- Όλα τα υπόλοιπα XRT στο τελευταίο block μεταφέρονται στο Polkadot με **μπόνους +20%**.
- Στην πλευρά του Kusama **δεν υπάρχει επαναγορά (buyback)**.
- Πού θα εμφανιστούν τα υπόλοιπα στο Polkadot και αν οι κάτοχοι πρέπει να κάνουν κάτι θα εξηγηθεί σε ξεχωριστή ανάρτηση.

Παρακολουθήστε το [blog του Robonomics](https://robonomics.network/blog/) για αυτή την ανάρτηση. Πηγές: [The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/) και η [σελίδα tokenomics](https://robonomics.network/tokenomics/).

## Ethereum

Το παλιό token XRT στο Ethereum (`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`) είναι παρωχημένο (deprecated). Στις 5 Φεβρουαρίου 2026 ο μηχανισμός έκδοσής του αξιοποιήθηκε κακόβουλα για δωρεάν έκδοση tokens. Το XRT στο Polkadot και στο Kusama δεν επηρεάστηκε.

Όσοι είχαν το παλιό token κατά το snapshot (block 24,390,081 του Ethereum) μπορούν να κάνουν μετάβαση:

1. Ανοίξτε την εφαρμογή μετάβασης: [airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/).
2. Συνδέστε το wallet που είχε XRT στις 5 Φεβρουαρίου 2026. Η εφαρμογή δείχνει το υπόλοιπό σας στο snapshot και το ποσό με το μπόνους.
3. Επιλέξτε μία επιλογή. Κάθε διεύθυνση μπορεί να επιλέξει μία φορά.
   - **Accept**: λαμβάνετε XRT παραγωγής στο Ethereum, το υπόλοιπο του snapshot συν 20%.
   - **Decline**: μπαίνετε αντί γι' αυτό στο πρόγραμμα επαναγοράς, με τιμή αναφοράς $2.20, που πληρώνεται σε 12–36 μήνες και μόνο όσο το επιτρέπουν τα κεφάλαια του ταμείου.

Πριν υπογράψετε, ελέγξτε ότι η εφαρμογή επικοινωνεί με το συμβόλαιο διεκδίκησης `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c`. Ο πηγαίος κώδικάς του βρίσκεται στο [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts).

Αυτό που λαμβάνετε είναι XRT παραγωγής στο Ethereum, συμβόλαιο `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. Είναι XRT που μεταφέρθηκε 1:1 από το Polkadot μέσω του [Snowbridge](https://app.snowbridge.network/send). Μπορείτε να το κρατήσετε, να το ανταλλάξετε στο Uniswap ή να το μεταφέρετε στο Polkadot. Δεν υπάρχει γέφυρα από το παλιό token στο νέο.

Οι αναρτήσεις ορίζουν παράθυρο 12 μηνών για τη μετάβαση. XRT που δεν διεκδικείται εγκαίρως μπορεί να αποκατασταθεί μόνο με ψηφοφορία διακυβέρνησης on-chain και απόδειξη κυριότητας. Διαβάστε τους ακριβείς όρους στις αναρτήσεις: [Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/) και [Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/).

Ερωτήσεις: η ομάδα Telegram [XRT Traders](https://t.me/xrt_trade).

## Polkadot Asset Hub

Το XRT υπάρχει στο Polkadot Asset Hub ως foreign asset, και υπάρχει pool ανταλλαγής DOT–XRT. Στο Asset Hub τα τέλη μπορούν να πληρωθούν σε XRT.

Δεν έχει δημοσιευτεί ακόμα οδηγός για τη μεταφορά XRT μεταξύ του Asset Hub και του parachain Robonomics.
