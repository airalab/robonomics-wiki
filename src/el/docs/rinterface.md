---
title: Διεπαφή Python και Robonomics IO
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Κάποιες εξωτερικές λειτουργίες που υλοποιούνται στα pallets του Robonomics είναι δύσκολο να υποβληθούν από την εφαρμογή Polkadot. Επιπλέον, υπάρχει ανάγκη για αλληλεπίδραση με αυτήν τη λειτουργικότητα χρησιμοποιώντας γλώσσες προγραμματισμού. Γι' αυτό το σκοπό αναπτύχθηκε ένα απλό εργαλείο Python με το όνομα [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). Είναι ένα περιτύλιγμα πάνω από το [py-substrate-interface](https://github.com/polkascan/py-substrate-interface) που διατηρείται από το polkascan. Παρακάτω παρουσιάζεται μια σύντομη περιγραφή αυτού του πακέτου και μερικοί χρήσιμοι σύνδεσμοι και παραδείγματα. Επίσης, συζητείται το εργαλείο CLI.**

## robonomics-interface

Διατίθεται στο [PyPi](https://pypi.org/project/robonomics-interface/) το πακέτο είναι έτοιμο για λήψη και εγκατάσταση. Υπάρχει επίσης διαθέσιμη μια λεπτομερής τεκμηρίωση που δημιουργήθηκε από το docstring [εδώ](https://multi-agent-io.github.io/robonomics-interface/).

Συνολικά, αυτό είναι ένα εργαλείο για προγραμματιστές που επιθυμούν να αλληλεπιδράσουν με την αλυσίδα Robonomics μέσω εργαλείων προγραμματισμού. Σχεδόν όλα τα έργα Python της ομάδας Robonomics που αλληλεπιδρούν με το parachain χρησιμοποιούν αυτήν τη διεπαφή.

### Εγκατάσταση

Η διαδικασία εγκατάστασης απαιτεί τον χρήστη να έχει εγκατεστημένο τουλάχιστον το Python 3.8. Ούτε οι αρχιτεκτονικές `x86`, ούτε `arm7`, ούτε `arm8` απαιτούν διαδικασία συναρμολόγησης. Όλα τα wheels κατασκευάζονται και δημοσιεύονται από τους διαχειριστές των εξαρτήσεων.

Χρησιμοποιείται το `pip` ως εργαλείο εγκατάστασης:

```bash
$ pip3 install robonomics_interface
```

### Δείγμα χρήσης

Η βασική ιδέα είναι να δημιουργήσετε μια παράσταση `Account` και στη συνέχεια να τη χρησιμοποιήσετε για τη δημιουργία παραλληλογράφων παραδειγμάτων.

```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

{% roboWikiNote {title:"Τοπικός κόμβος", type: "note"}%}
  Είναι επίσης δυνατό να χρησιμοποιηθούν προσαρμοσμένα σημεία (π.χ. τοπικός κόμβος για δοκιμές):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```
{% endroboWikiNote %}

Είναι επίσης δυνατή η υποβολή εξωτερικών λειτουργιών:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Γεια, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # αυτό είναι το hash της εξωτερικής λειτουργίας
```

{% roboWikiNote {title:"Εγγραφές", type: "note"}%}Όπως έχει αναφερθεί, περισσότερα παραδείγματα είναι διαθέσιμα στη σελίδα [τεκμηρίωσης](https://multi-agent-io.github.io/robonomics-interface/). {% endroboWikiNote %}

## Εργαλείο CLI

Το `robonomics-interface` περιλαμβάνει επίσης εργαλεία CLI Python με τη χρήση του `click` για σκοπούς πρωτότυπων και γρήγορων δοκιμών. Εγκαθίσταται με το πακέτο και είναι διαθέσιμο στο Terminal:

```bash
$ robomomics_interface --help

#Χρήση: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Επιλογές:
#  --help  Εμφάνιση αυτού του μηνύματος και έξοδος.
#
#Εντολές:
#  read   Εγγραφή σε συμβάντα datalog/launch στην αλυσίδα
#  write  Αποστολή διαφόρων εξωτερικών λειτουργιών (εντολές εκκίνησης ή εγγραφή datalogs)
```

Μπορείτε να το δοκιμάσετε με τον τοπικό κόμβο. Η φιλοσοφία του pipeline εφαρμόζεται:

```bash
$ echo "Γεια, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # αυτό είναι το hash της εξωτερικής λειτουργίας
```