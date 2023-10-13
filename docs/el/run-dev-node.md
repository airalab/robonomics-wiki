---
title: Πώς να εκτελέσετε τον κόμβο ανάπτυξης του Robonomics
contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

** Για να δοκιμάσετε τις εφαρμογές σας στο Robonomics μπορεί να θέλετε να το εκτελέσετε σε λειτουργία ανάπτυξης. Αυτό το άρθρο δείχνει βήμα προς βήμα 
οδηγίες για το πώς να αποκτήσετε τη δική σας τοπική δοκιμαστική περίπτωση του Robonomics. **


## Λήψη δυαδικού κόμβου

1. Πρώτα, χρειάζεστε ένα δυαδικό αρχείο, κατεβάστε το αρχείο απόσυμπιέστε το αρχείο από την τελευταία [έκδοση](https://github.com/airalab/robonomics/releases).

2. Πλοηγηθείτε στον φάκελο του αρχείου, αποσυμπιέστε το δυαδικό και αλλάξτε τα δικαιώματα:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## Εκτέλεση

Εκτελέστε τον κόμβο με:

```bash
./robonomics --dev
```
Θα δείτε την παρακάτω έξοδο:

![robonomics](../images/dev-node/robonomics.png)

<robo-wiki-note type="note" title="From Scratch">

  Εάν θέλετε να απαλείψετε υπάρχουσες μπλοκ, μπορείτε να το κάνετε αυτό αφαιρώντας το RocksDB από `/tmp/substrate******/chains/dev/db/full`.
  Αντικαταστήστε το `******` με τον αντίστοιχο αναγνωριστικό που εμφανίζεται στα αρχεία καταγραφής κατά την εκκίνηση.

  Εάν θέλετε να ξεκινήσετε τον κόμβο από την αρχή κάθε φορά, χρησιμοποιήστε τη σημαία `--tmp`.

</robo-wiki-note>

## Σύνδεση

Τώρα μπορείτε να συνδεθείτε στον τοπικό σας κόμβο μέσω του [Polkadot Portal](https://polkadot.js.org/apps/#/explorer).

Αλλάξτε το δίκτυο σε `Local Node` στην πάνω αριστερή γωνία και πατήστε `Swtitch`.

![switch](../images/dev-node/portal.png)

Καλώς ήλθατε στην τοπική περίπτωση του Robonomics!

![local_node](../images/dev-node/dev-portal.png)


