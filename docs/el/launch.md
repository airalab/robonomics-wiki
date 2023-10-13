---
title: Εκκίνηση
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Ένα άλλο βασικό χαρακτηριστικό του Robonomics parachain είναι η παλέτα Launch. Σας επιτρέπει να στέλνετε εντολές στους λογαριασμούς/οποιεσδήποτε οντότητες βρίσκονται πίσω από αυτές. Αυτές οι εντολές περιλαμβάνουν παράμετρο για τον καθορισμό της εργασίας που θα εκτελεστεί.**

<robo-wiki-note type="warning" title="Dev Node">

  Παρακαλούμε να προσέξετε ότι αυτά και τα επόμενα εκπαιδευτικά προγράμματα παρουσιάζονται σε μια τοπική εκδοχή του Robonomics Node. Δημιουργήστε τη δική σας με [αυτές τις οδηγίες](/docs/run-dev-node).

</robo-wiki-note>

## 1. Πλοηγηθείτε στο Developer -> Extrinsics

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. Επιλέξτε launch -> launch από την αναπτυσσόμενη λίστα πιθανών extrinsics

Επίσης, επιλέξτε έναν λογαριασμό στον οποίο θέλετε να υποβάλετε το extrinsic. Συμπληρώστε τη διεύθυνση προορισμού και το πεδίο παραμέτρου.

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  - Η εκκίνηση υποστηρίζει συμβολοσειρές μήκους 32 byte ως εντολές ([πηγή](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  οπότε υπάρχει χώρος για αυτοσχεδιασμό εδώ:
  - Για βασικές εντολές όπως η εναλλαγή μπορείτε να χρησιμοποιήσετε "0x000000000000000000000000000000000000000000000000000000000001" ή
   "0x0000000000000000000000000000000000000000000000000000000000000000000000000.
  - Για προχωρημένες εντολές, συμπεριλαμβανομένων json-like, μπορείτε να χρησιμοποιήσετε [IPFS](https://ipfs.tech/) CID μορφοποιημένο σε
  [σωστός τρόπος](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).

</robo-wiki-note>

## 3. Υποβολή συναλλαγής

<robo-wiki-picture src="launch/submit.jpg" />

## 4. Ελέγξτε την εκκίνησή σας στα events

Για αυτό, πλοηγηθείτε στο *Network -> Explorer* και βρείτε μια λίστα με events στα δεξιά. Κάντε κλικ σε ένα εικονίδιο τριγώνου για να το αναπτύξετε.

<robo-wiki-picture src="launch/event.jpg" />
