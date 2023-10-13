---
title: Διεπαφή Python και Robonomics IO
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

** Ορισμένες εξωτερικές λειτουργίες που υλοποιούνται στα παλέτα του Robonomics είναι δύσκολο να υποβληθούν από την εφαρμογή Polkadot. Περισσότερο από αυτό, υπάρχει 
μια ανάγκη αλληλεπίδρασης με αυτή τη λειτουργία χρησιμοποιώντας γλώσσες προγραμματισμού. Για το σκοπό αυτό αναπτύχθηκε ένα απλό εργαλείο Python
ονομάζεται [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). Είναι ένα περιτύλιγμα πάνω από πουλικά συντηρημένο
[py-substrate-interface](https://github.com/polkascan/py-substrate-interface). Παρακάτω παρέχεται μια σύντομη περιγραφή αυτού του πακέτου
και μερικοί χρήσιμοι σύνδεσμοι και παραδείγματα. Επίσης, συζητείται το εργαλείο CLI. **

## robonomics-interface

Διαθέσιμο στο [PyPi](https://pypi.org/project/robonomics-interface/) το πακέτο είναι έτοιμο για λήψη και εγκατάσταση.
Υπάρχει επίσης μια λεπτομερής τεκμηρίωση που δημιουργήθηκε από το docstring [τεκμηρίωση](https://multi-agent-io.github.io/robonomics-interface/) διαθέσιμη επίσης.

Συνολικά, αυτό είναι ένα εργαλείο για προγραμματιστές που επιθυμούν να αλληλεπιδράσουν με το blockchain του Robonomics μέσω εργαλείων προγραμματισμού. Σχεδόν 
όλα τα έργα Python της ομάδας Robonomics που αλληλεπιδρούν με το parachain χρησιμοποιούν αυτήν τη διεπαφή.

### Εγκατάσταση

Η διαδικασία εγκατάστασης απαιτεί τον χρήστη να έχει τουλάχιστον εγκατεστημένο το Python 3.8. Ούτε οι αρχιτεκτονικές `x86`, ούτε οι `arm7`, ούτε οι `arm8`
απαιτούν διαδικασία συναρμολόγησης. Όλοι οι τροχοί κατασκευάζονται και δημοσιεύονται από τους διαχειριστές των εξαρτήσεων.

Χρησιμοποιείται το `pip` ως εργαλείο εγκατάστασης:

```bash
$ pip3 install robonomics_interface
```

### Δείγμα χρήσης

Η κύρια ιδέα είναι να δημιουργήσετε μια περίπτωση `Account` και στη συνέχεια να τη χρησιμοποιήσετε για τη δημιουργία αφιερωμένων παλετών.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  Είναι επίσης δυνατή η χρήση προσαρμοσμένων σημείων πρόσβασης (π.χ. τοπικός κόμβος για δοκιμές):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

Είναι επίσης δυνατή η υποβολή εξωτερικών λειτουργιών:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  Όπως έχει αναφερθεί, περισσότερα παραδείγματα είναι διαθέσιμα στη [τεκμηρίωση](https://multi-agent-io.github.io/robonomics-interface/) σελίδα.

</robo-wiki-note>

## CLI tool

Το `robonomics-interface` περιλαμβάνει επίσης εργαλεία Python `click` CLI για χρήση σε σκοπούς πρωτοτυπίας και γρήγορων δοκιμών. Είναι εγκατεστημένο
με το πακέτο και είναι διαθέσιμο στο Terminal:

```bash
$ robomomics_interface --help

#Usage: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Options:
#  --help  Show this message and exit.
#
#Commands:
#  read   Subscribe to datalog/launch events in the chain
#  write  Send various extrinsics (launch commands or record datalogs)
```

Μπορείτε να δοκιμάσετε να το χρησιμοποιήσετε με τον τοπικό κόμβο. Η φιλοσοφία του pipeline υιοθετείται:

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```