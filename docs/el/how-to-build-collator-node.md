---
title: Πώς να κατασκευάσετε κόμβο συλλέκτη από την πηγή
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---

<robo-wiki-note type="note" title="Note">
  Στο συνεχόμενο βίντεο και στις στιγμιότυπες οθόνης αυτού του άρθρου, χρησιμοποιήσαμε την έκδοση 1.4.0 του Robonomics. Θα πρέπει να χρησιμοποιήσετε τις ίδιες εντολές, αλλά να αντικαταστήσετε την έκδοση του Robonomics με την τρέχουσα.
</robo-wiki-note>

## Τι είναι ένας συλλέκτης

Ο συλλέκτης είναι μέρος του Robonomics parachain. Αυτός ο τύπος κόμβων δημιουργεί νέα μπλοκ για την αλυσίδα.

>Οι συλλέκτες διατηρούν τα parachains συλλέγοντας συναλλαγές parachain από χρήστες και παράγοντας αποδείξεις μετάβασης κατάστασης για τους επικυρωτές της Relay Chain. Με άλλα λόγια, οι συλλέκτες διατηρούν τα parachains συγκεντρώνοντας συναλλαγές parachain σε υποψήφια μπλοκ parachain και παράγοντας αποδείξεις μετάβασης κατάστασης για τους επικυρωτές βάσει αυτών των μπλοκ.

Μπορείτε να μάθετε περισσότερα για τον συλλέκτη στη σχετική [σελίδα του wiki του Polkadot](https://wiki.polkadot.network/docs/learn-collator)

Στο Robonomics parachain, κάθε συλλέκτης λαμβάνει ανταμοιβές (**0.000380520 XRT**) για κάθε μπλοκ που κατασκεύασε, εάν αυτό το μπλοκ ήταν σφραγισμένο στην αλυσίδα.
Επίσης, ο συλλέκτης λαμβάνει **50% χρεώσεις συναλλαγών** από αυτό το μπλοκ.

## Διαδικασία κατασκευής

https://youtu.be/wnAtD7w0Pxk

Βεβαιωθείτε ότι έχετε εγκαταστήσει το Rust και το λογισμικό υποστήριξης. Ο εγκαταστάτης του Rust θα σας ρωτήσει για τις τρέχουσες επιλογές εγκατάστασης, θα πρέπει να επιλέξετε την επιλογή `1) Συνέχεια με την εγκατάσταση (προεπιλογή)`.


```
  curl https://sh.rustup.rs -sSf | sh
  # on Windows download and run rustup-init.exe
  # from https://rustup.rs instead
  source $HOME/.cargo/env
```
![Εγκατάσταση Rust](../images/how-to-build-collator-node/install_rust.jpg)


Εγκατάσταση the required nightly toolchain and wasm target.
Οι επόμενες εντολές ισχύουν για το Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```
![Install nightly](../images/how-to-build-collator-node/install_nightly.jpg)


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
Θα πρέπει επίσης να εγκαταστήσετε τα παρακάτω πακέτα:

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
    # Install git https://git-scm.com/download/win
    # Install LLVM
    # Download and install the Pre Build Windows binaries
    # of LLVM  from http://releases.llvm.org/download.html
  ```
Τώρα μπορείτε να εγκαταστήσετε τον κόμβο robonomics από την πηγή git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```
![Start build Robonomics](../images/how-to-build-collator-node/start_build_robonomics.jpg)
![End build Robonomics](../images/how-to-build-collator-node/end_build_robonomics.jpg)


Μετά από αυτήν την εντολή, το μεταγλωττισμένο δυαδικό αρχείο robonomics θα βρίσκεται στον κατάλογο `~/.cargo/bin`.

Το επόμενο βήμα είναι πώς να ξεκινήσετε τον κόμβο συλλέκτη. Μπορείτε να διαβάσετε σχετικά στο ["Πώς να ξεκινήσετε τον συλλέκτη Robonomics"](/docs/how-to-launch-the-robonomics-collator) άρθρο.