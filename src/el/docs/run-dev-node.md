---
title: Πώς να Εκτελέσετε Έναν Κόμβο Ανάπτυξης Robonomics
contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Για να δοκιμάσετε τις εφαρμογές σας στο Robonomics, μπορεί να θέλετε να τον εκτελέσετε σε λειτουργία ανάπτυξης. Αυτό το άρθρο παρουσιάζει οδηγίες βήμα προς βήμα για να αποκτήσετε τη δική σας τοπική δοκιμαστική εκδοχή του Robonomics.**


## Λήψη του Δυαδικού Αρχείου του Κόμβου

1. Πρώτα, χρειάζεστε ένα δυαδικό αρχείο, κατεβάστε το αρχείο απόσυμπίεσης από την τελευταία [έκδοση](https://github.com/airalab/robonomics/releases).

2. Μεταβείτε στο φάκελο του αρχείου αποσυμπίεσης, αποσυμπιέστε το δυαδικό αρχείο και αλλάξτε τα δικαιώματα:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## Εκτέλεση

Εκτελέστε τον κόμβο με:

```bash
./robonomics --dev
```
Θα δείτε την ακόλουθη έξοδο:

{% roboWikiPicture {src:"docs/dev-node/robonomics.png", alt:"robonomics"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Από την Αρχή", type: "note"}%} Αν θέλετε να εκκαθαρίσετε τα υπάρχοντα μπλοκ, μπορείτε να το κάνετε αυτό αφαιρώντας το RocksDB από τη διαδρομή `/tmp/substrate******/chains/dev/db/full`.
Αντικαταστήστε το `******` με τον αντίστοιχο αναγνωριστικό που εμφανίζεται στα logs κατά την εκκίνηση.

Αν θέλετε να ξεκινήσετε τον κόμβο από την αρχή κάθε φορά, χρησιμοποιήστε τη σημαία `--tmp`.
{% endroboWikiNote %}


## Σύνδεση

Τώρα μπορείτε να συνδεθείτε στον τοπικό σας κόμβο μέσω της [Πύλης Polkadot](https://polkadot.js.org/apps/#/explorer).

Αλλάξτε το δίκτυο σε `Τοπικός Κόμβος` στην πάνω αριστερή γωνία και πατήστε `Αλλαγή`.

{% roboWikiPicture {src:"docs/dev-node/portal.png", alt:"switch"} %}{% endroboWikiPicture %}

Καλώς ήρθατε στην τοπική εκδοχή του Robonomics!

{% roboWikiPicture {src:"docs/dev-node/dev-portal.png", alt:"local node"} %}{% endroboWikiPicture %}