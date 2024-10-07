---
title: Πώς να χτίσετε τον κόμβο συλλέκτη από την πηγή
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---


{% roboWikiNote {title:"Σημείωση", type: "note"}%} Στο screencast και στις στιγμιότυπες οθόνης αυτού του άρθρου, χρησιμοποιήσαμε την έκδοση 1.4.0 του Robonomics. Πρέπει να χρησιμοποιήσετε τις ίδιες εντολές, αλλά να αντικαταστήσετε την έκδοση του Robonomics με την τρέχουσα.{% endroboWikiNote %}

## Τι είναι ένας συλλέκτης

Ο συλλέκτης είναι μέρος της παρακαταθηκης του Robonomics. Αυτός ο τύπος κόμβων δημιουργεί νέα τμήματα για την αλυσίδα.

>Οι συλλέκτες διατηρούν τις παρακαταθήκες συλλέγοντας συναλλαγές παρακαταθήκης από χρήστες και παράγοντας αποδείξεις μετάβασης κατάστασης για τους επικυρωτές της αλυσίδας μετάδοσης. Με άλλα λόγια, οι συλλέκτες διατηρούν τις παρακαταθήκες συλλέγοντας συναλλαγές παρακαταθήκης σε υποψήφια τμήματα παρακαταθήκης και παράγοντας αποδείξεις μετάβασης κατάστασης για τους επικυρωτές βάσει αυτών των τμημάτων.

Μπορείτε να μάθετε περισσότερα για τον συλλέκτη στη σχετική [σελίδα wiki του Polkadot](https://wiki.polkadot.network/docs/learn-collator)

Στην παρακαταθήκη του Robonomics, κάθε συλλέκτης λαμβάνει ανταμοιβή (**0.000380520 XRT**) για κάθε τμήμα που χτίζει, αν αυτό το τμήμα σφραγιστεί στην αλυσίδα.
Επίσης, ο συλλέκτης λαμβάνει το **50% των τελών συναλλαγών** από αυτό το τμήμα.

## Διαδικασία κατασκευής

https://youtu.be/wnAtD7w0Pxk

Βεβαιωθείτε ότι έχετε εγκαταστήσει το Rust και το αναγκαίο λογισμικό υποστήριξης. Ο εγκαταστάτης του Rust θα σας ρωτήσει σχετικά με τις τρέχουσες επιλογές εγκατάστασης, θα πρέπει να επιλέξετε την επιλογή `1) Συνέχεια με την εγκατάσταση (προεπιλογή)`.


```
  curl https://sh.rustup.rs -sSf | sh
  # σε Windows κατεβάστε και εκτελέστε το rustup-init.exe
  # από το https://rustup.rs αντίστοιχα
  source $HOME/.cargo/env
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_rust.jpg", alt:"εγκατάσταση rust"} %}{% endroboWikiPicture %}


Εγκαταστήστε το απαιτούμενο εργαλείο nightly και τον στόχο wasm.
Οι επόμενες εντολές είναι ενεργές για το Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_nightly.jpg", alt:"εγκατάσταση nightly"} %}{% endroboWikiPicture %}


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
Θα πρέπει επίσης να εγκαταστήσετε τα ακόλουθα πακέτα:

  1. Linux:

  ```
    sudo apt install cmake git clang libclang-dev
  ```
  2. Mac:

  ```
    brew install cmake pkg-config git llvm
  ```
  3. Windows (PowerShell):

  ```
    # Εγκαταστήστε το git https://git-scm.com/download/win
    # Εγκαταστήστε το LLVM
    # Κατεβάστε και εγκαταστήστε τα Pre Build Windows binaries
    # του LLVM από http://releases.llvm.org/download.html
  ```
Τώρα μπορείτε να εγκαταστήσετε τον κόμβο robonomics από την πηγή git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/start_build_robonomics.jpg", alt:"Έναρξη κατασκευής Robonomics"} %}{% endroboWikiPicture %}
{% roboWikiPicture {src:"docs/how-to-build-collator-node/end_build_robonomics.jpg", alt:"Ολοκλήρωση κατασκευής Robonomics"} %}{% endroboWikiPicture %}


Μετά από αυτήν την εντολή, το μεταγλωττισμένο δυαδικό αρχείο robonomics θα βρίσκεται στον κατάλογο `~/.cargo/bin`.

Το επόμενο βήμα είναι πώς να ξεκινήσετε τον κόμβο συλλέκτη. Μπορείτε να διαβάσετε σχετικά στο άρθρο ["Πώς να ξεκινήσετε τον συλλέκτη Robonomics"](/docs/how-to-launch-the-robonomics-collator).