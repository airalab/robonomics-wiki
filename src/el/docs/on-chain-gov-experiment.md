---
title: Πείραμα κυβέρνησης On-chain

---

Προς το παρόν, το Polkadot είναι ένα από τα μεγαλύτερα DAOs στον κόσμο! Υπάρχουν πολλά ενδιαφέροντα γεγονότα που λαμβάνουν χώρα στο οικοσύστημα ως μέρος του πειράματος κυβέρνησης on-chain. Οι προγραμματιστές του Robonomics προτείνουν στους συμμετέχοντες στο hackathon να αυξήσουν το επίπεδο εμβύθισης της κοινότητας του Polkadot ενσωματώνοντας γεγονότα που σχετίζονται με ψηφοφορίες, νέα αιτήματα ταμείου, αλλαγές εποχής και πολλά άλλα σε έναν τυπικό έξυπνο οικιακό σύστημα.


---

Αυτό το άρθρο αναφέρεται στη διαχείριση έξυπνου σπιτιού μέσω του Robonomics Cloud ως αποτέλεσμα οποιουδήποτε γεγονότος στο οικοσύστημα του Polkadot. Εδώ υπάρχει ένα παράδειγμα πώς μια λάμπα μπορεί να ανάψει όταν υποβάλλεται μια νέα αναφορά στο δίκτυο του Polkadot.

{% roboWikiVideo {videos:[{src: 'QmWARwfH8WSEjnWUEFSDn28ya8Xp93qyjmSdGkdkwFntWe', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Απαιτήσεις

 - Εγκατεστημένη πρότυπη εγκατάσταση Home Assistant με ενσωμάτωση Robonomics. Οι μέθοδοι εγκατάστασης μπορούν να βρεθούν [εδώ](/docs/install-smart-home).
 - Κόμβος ή πύλη Polkadot για αλληλεπίδραση. Για παράδειγμα - `wss://polkadot.api.onfinality.io`
 - Κόμβος ή πύλη Robonomics για αλληλεπίδραση.
 - Δημιουργημένος λογαριασμός σε μορφή ED25519. Οδηγίες μπορούν να βρεθούν [εδώ](/docs/sub-activate).
 - Έχοντας δημιουργήσει λογαριασμό σε λίστα συσκευών της συνδρομής Robonomics. Μάθετε περισσότερα [εδώ](/docs/add-user).
 - Διευθύνσεις ιδιοκτήτη και ελεγκτή της συνδρομής.

Βιβλιοθήκες Python:
- [substrate-interface](https://pypi.org/project/substrate-interface/)
- [IPFS-Toolkit](https://pypi.org/project/IPFS-Toolkit/)
- [robonomics-interface](https://pypi.org/project/robonomics-interface/)

## Δημιουργία Ακροατή Polkadot

Πρώτα, πρέπει να δημιουργήσετε ένα σενάριο που θα ακούει για νέα γεγονότα στο δίκτυο του Polkadot. Στο παράδειγμα, θα παρακολουθήσουμε τη δημιουργία νέων Αναφορών.

Για την ευκολία των δοκιμών, χρησιμοποιήθηκε ένας τοπικός κόμβος Polkadot σε λειτουργία ανάπτυξης. Μπορείτε να βρείτε το εγχειρίδιο ανάπτυξης [εδώ](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot#hacking-on-polkadot).

Για σύνδεση σε δημόσιο κόμβο, αλλάξτε το "POLKAD"Μεταβλητή "POLKADOT_GATEWAY".

Παράδειγμα κώδικα:

```python
from substrateinterface import SubstrateInterface

POLKADOT_GATEWAY = "ws://127.0.0.1:9944"

substrate = SubstrateInterface(
    url=POLKADOT_GATEWAY
)

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Έναρξη μετρητή ψηφοφοριών:', data.value)
    if update_nr > 0:
        print('Αύξηση μετρητή ψηφοφοριών:', data.value)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

Αυτό το σενάριο θα ακούει για αλλαγές στον τρέχοντα αριθμό ψηφοφοριών και θα εμφανίζει τον αριθμό της τελευταίας ψηφοφορίας.

### Δοκιμή

Εκτελέστε το πρόγραμμα και ανοίξτε το [polkadot.js](https://polkadot.js.org/apps/#/explorer).
Για να μεταβείτε στο τοπικό κόμβο ανάπτυξης, κάντε κλικ στο εικονίδιο στην επάνω αριστερή γωνία και θα εμφανιστεί ένα πλευρικό μενού. Επιλέξτε "Development" και "Local Node" στο κάτω μέρος, και μετά κάντε κλικ στο "Switch".

{% roboWikiPicture {src:"docs/gov-exp/polka_sidemenu.png", alt:"polka_sidemenu"} %}{% endroboWikiPicture %}

Θα μεταβείτε στον τοπικό κόμβο. Πηγαίνετε στην καρτέλα "Governance" -> "Preimages".

{% roboWikiPicture {src:"docs/gov-exp/preimage.png", alt:"preimage"} %}{% endroboWikiPicture %}

Δημιουργήστε ένα νέο preimage. Αφήστε ένα σχόλιο στο δίκτυο. Υπογράψτε το και στείλτε το στο δίκτυο.

{% roboWikiPicture {src:"docs/gov-exp/remark.png", alt:"remark"} %}{% endroboWikiPicture %}

Θα λάβετε το hash του. Αντιγράψτε το και πηγαίνετε στην καρτέλα "Governance" -> "Referenda". Κάντε "Υποβολή Πρότασης". Καθώς αυτό είναι ένα δίκτυο δοκιμών, οι περισσότερες από τις ρυθμίσεις μπορούν να παραμείνουν ως προεπιλογή. Επικολλήστε το hash του preimage και υπογράψτε την πρόταση.

{% roboWikiPicture {src:"docs/gov-exp/proposal.png", alt:"proposal"} %}{% endroboWikiPicture %}

Μετά την αποστολή στο δίκτυο, το πρόγραμμα θα ανιχνεύσει τη νέα πρόταση και θα εμφανίσει τα ακόλουθα logs:

```
Έναρξη μετρητή ψηφοφοριών: 0
Αύξηση μετρητή ψηφοφοριών: 1## Σύνδεση με το Έξυπνο Σπίτι

Τώρα πρέπει να προσθέσουμε μια αλληλεπίδραση με το έξυπνο σπίτι μετά τη δημιουργία μιας νέας πρότασης.

Γι' αυτό, πρέπει να γνωρίζουμε τα παρακάτω:
- Τομέας υπηρεσίας
- Όνομα υπηρεσίας
- Στοχευμένος οντότητα
- Δεδομένα - πρέπει να είναι τύπου "dict"

Ας δούμε πού μπορούμε να τα βρούμε. Ανοίξτε την εγκατεστημένη εφαρμογή Home Assistant. Πηγαίνετε σε "Εργαλεία Προγραμματιστή -> Υπηρεσίες", επιλέξτε οποιαδήποτε υπηρεσία και μεταβείτε στη λειτουργία YAML. Ας θεωρήσουμε το παράδειγμα ενός διακόπτη.

{% roboWikiPicture {src:"docs/gov-exp/service.png", alt:"υπηρεσίες"} %}{% endroboWikiPicture %}

Το κλειδί "service" περιέχει τον τομέα υπηρεσίας και το όνομα. Ό,τι βρίσκεται πριν το τελεία είναι ο τομέας και ό,τι βρίσκεται μετά την τελεία είναι το όνομα της υπηρεσίας. Απαιτείται επίσης το πεδίο δεδομένων.

Για να βρείτε τη στοχευμένη οντότητα, πηγαίνετε σε "Ρυθμίσεις -> Συσκευές & Υπηρεσίες -> Οντότητες". Θα υπάρχει μια στήλη με το "ID οντότητας" - αυτή είναι η απαιτούμενη παράμετρος στοχευμένης οντότητας.

Τώρα που γνωρίζουμε όλες τις παραμέτρους, ας δούμε τι θα συμβεί στο σενάριο.

Το σενάριο θα συνδεθεί με το τοπικό δαίμονα IPFS. (Αν ακολουθήσατε τις οδηγίες εγκατάστασης του έξυπνου σπιτιού, ήδη έχετε το δαίμονα IPFS να λειτουργεί.)

Πρώτα, θα δημιουργήσουμε μια εντολή σε μορφή JSON. Στη συνέχεια, το μήνυμα κρυπτογραφείται με τα κλειδιά του χρήστη και του ελεγκτή. Στη συνέχεια, η κρυπτογραφημένη εντολή αποθηκεύεται σε ένα αρχείο και προστίθεται στο IPFS. Έπειτα, το αποτέλεσμα του hash του IPFS στέλνεται στην παρακαταθήκη Robonomics μέσω μιας εξωτερικής `Εκκίνησης` στη διεύθυνση του ελεγκτή.
Όταν ο ελεγκτής λάβει την εκκίνηση, θα κατεβάσει το αρχείο από το IPFS, θα το αποκρυπτογραφήσει και θα καλέσει την υπηρεσία που καθορίζεται μέσα.

Ο πλήρης κώδικας είναι ο εξής:

{% codeHelper { copy: true}%}

```python
import os
import json
import ipfshttpclient2
from substrateinterface import SubstrateInterface
from robonomicsinterface import Account, Launch
from substrateinterface import Keypair, KeypairType
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes, web_3_auth

# polkadot part
POLKADOT_GATEWAY = "<POLKADOT_GATEWAY>" # ws://127.0.0.1:9944
substrate = SubstrateInterface(url=POLKADOT_GATEWAY)

# Robonomics part

# Robonomics credentials
# User address must be inΣυσκευές RWS
# Η διεύθυνση χρήστη πρέπει να είναι ED25519
user_seed = "<SEED_PHRASE>"
controller_address = "<ΔΙΕΥΘΥΝΣΗ_ΕΛΕΓΧΟΥ>"
sub_owner_address = "<ΔΙΕΥΘΥΝΣΗ_ΙΔΙΟΚΤΗΤΗ>"

# Εντολή
service_domain = "<DOMAIN>"  # το domain είναι αυτό που βρίσκεται πριν το τελεία στο όνομα της υπηρεσίας. Για παράδειγμα "switch"
service_name = "<NAME>"  # όνομα - αυτό που ακολουθεί μετά την τελεία στο όνομα της υπηρεσίας. Για παράδειγμα "turn_on"
target_entity = "<ENTITY_ID>"  #  entity_id. Για παράδειγμα "switch.boiler"
data = {}  # Πρέπει να είναι λεξικό


def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Έναρξη μετρητή ψηφοφορίας:', data.value)

    if update_nr > 0:
        print('Αύξηση μετρητή ψηφοφορίας:', data.value)
        # Αποστολή εκκίνησης στη διεύθυνση ελέγχου με το hash του ipfs
        launch = Launch(sender, rws_sub_owner=sub_owner_address)
        res = launch.launch(controller_address, result_ipfs)
        print(f"Αποτέλεσμα συναλλαγής: {res}")

def encrypt_message(
        message, sender_keypair: Keypair, recipient_public_key: bytes
) -> str:
    """
    Κρυπτογράφηση μηνύματος με το ιδιωτικό κλειδί του αποστολέα και το δημόσιο κλειδί του παραλήπτη
    :param message: Μήνυμα προς κρυπτογράφηση
    :param sender_keypair: Κλειδί Keypair λογαριασμού αποστολέα
    :param recipient_public_key: Δημόσιο κλειδί παραλήπτη
    :return: κρυπτογραφημένο μήνυμα
    """
    encrypted = sender_keypair.encrypt_message(message, recipient_public_key)
    return f"0x{encrypted.hex()}"

# Διαμόρφωση μηνύματος για εκκίνηση
data['entity_id'] = target_entity
command = {'platform': service_domain, 'name': service_name, 'params': data}

message = json.dumps(command)
print(f"Μήνυμα: {message}")
sender = Account(user_seed, crypto_type=KeypairType.ED25519)

# Κρυπτογράφηση εντολής
recipient = Keypair(
    ss58_address=controller_address, crypto_type=KeypairType.ED25519
)
message = encrypt_message(message, sender.keypair, recipient.public_key)
print(f"Κρυπτογραφημένο μήνυμα: {message}")
filename = "temporal_file"
with open(filename, "w") as f:
    f.write(message)
with ipfshttpclient2.connect() as client:
    result = client.add(filename, pin=False)```python
result_ipfs  = result["Hash"]
    print(f"IPFS hash: {result_ipfs}")
    print(f"IPFS hash for launch {ipfs_qm_hash_to_32_bytes(result_ipfs)}")

os.remove(filename)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

if you did everything correctly, you will see the following logs:
```
Μήνυμα: {"platform": "switch", "name": "turn_on", "params": {"entity_id": "switch.boiler"}}
Κρυπτογραφημένο μήνυμα: 0x33356b915e51e4c050180db0c3e39de86e946b6807ea83114978c848d016ab34a812e271dd1e5b40aa8632edd5acf4254090d2c2849daafcc46d2d4a4406a169a04edb4a668a268b3265e96ded0411398e3520fd5b676109752d24f12a7ece976bdc58da6a5b95d3c9e77aa59270bbc86c66c2ffe69ef7b10fae20
IPFS hash: QmcrqSD3bBYmm4rpaDMUVNQwF8CSi5WWVnwPtuGJdzgWpK
IPFS hash for launch 0xd7bf2b46baebf5556ac30fda97d7bf34a71558acdafde694c849521d01ccd8b4
Έναρξη μετρητή αναφορών: 0
Αύξηση μετρητή αναφορών: 1
Αποτέλεσμα συναλλαγής: 0xe07d43462d540a7312763349b362318c427ca9a61e7d5bfa3c890e8b1c0294c1
```