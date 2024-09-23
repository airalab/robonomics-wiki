---
title: Εκκίνηση
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Μια άλλη βασική λειτουργία του Robonomics parachain είναι το πακέτο εκκίνησης. Σας επιτρέπει να στέλνετε εντολές στους λογαριασμούς/οποιοδήποτε οντότητες βρίσκονται πίσω από αυτούς. Αυτές οι εντολές περιλαμβάνουν παραμέτρους για να καθορίσετε την εργασία που πρέπει να εκτελεστεί.**

{% roboWikiNote {title:"Κόμβος Dev", type: "Προειδοποίηση"}%} Παρακαλούμε να προσέξετε ότι αυτό και τα ακόλουθα εγχειρίδια παρουσιάζονται σε μια τοπική εκδοχή του Robonomics Node. Δημιουργήστε το δικό σας με [αυτές τις οδηγίες](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Πλοήγηση στο Developer -> Extrinsics

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. Επιλέξτε launch -> launch από την λίστα αναπτύσσοντων εξωτερικών

Επιλέξτε επίσης έναν λογαριασμό στον οποίο θέλετε να υποβάλετε την εξωτερική εντολή. Συμπληρώστε τη διεύθυνση στόχο και το πεδίο παραμέτρων.

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"launch"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32 byte", type: "σημείωση"}%}   Η εκκίνηση υποστηρίζει συμβολοσειρές μήκους 32 bytes ως εντολές ([πηγή](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  οπότε υπάρχει χώρος για βελτίωση εδώ:
  - Για βασικές εντολές όπως εναλλαγή μπορείτε να χρησιμοποιήσετε "0x0000000000000000000000000000000000000000000000000000000000000001" ή
  "0x0000000000000000000000000000000000000000000000000000000000000000".
  - Για προηγμένες εντολές που περιλαμβάνουν json-like μπορείτε να χρησιμοποιήσετε το [IPFS](https://ipfs.tech/) CID μορφοποιημένο με έναν
  [κατάλληλο τρόπο](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
{% endroboWikiNote %}

## 3. Υποβολή συναλλαγής

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

## 4. Αναθεώρηση της εκκίνησής σας στα γεγονότα

Για αυτό, πλοηγηθείτε στο *Δίκτυο -> Εξερευνητής* και βρείτε μια λίστα γεγονότων στα δεξιά. Κάντε κλικ σε ένα εικονίδιο τριγώνου για να επεκτείνετε.

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"event"} %}{% endroboWikiPicture %}
