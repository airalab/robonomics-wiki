---
title: Σύνδεση συσκευών
contributors: [Fingerling42, nakata5321, ensrationis]
---

Υπάρχουν δύο τρόποι να φέρετε συσκευές στο Robonomics: μέσω του Home Assistant, ή απευθείας, με οποιαδήποτε συσκευή μπορεί να υπογράψει μια συναλλαγή ή να επικοινωνήσει με ένα gateway.

Έτοιμο υλικό και εγκαταστάσεις έξυπνου σπιτιού παρέχει η Pinout Limited. Προϊόντα και υπηρεσίες στο [pinout.cloud](https://pinout.cloud).

## Home Assistant

Υπάρχουν τρεις ενσωματώσεις για το Home Assistant. Κάνουν διαφορετικά πράγματα και δεν είναι όλες εξίσου ενημερωμένες.

| Ενσωμάτωση | Τι κάνει | Κατάσταση |
|---|---|---|
| [Robonomics Report Service](https://github.com/PinoutLTD/rrs-ha-integration) (Pinout) | Παρακολουθεί το Home Assistant για προβλήματα. Κρυπτογραφεί μια αναφορά σφάλματος, την ανεβάζει στο IPFS και καταγράφει το CID της on-chain. Η αναφορά γίνεται αίτημα υποστήριξης στον εγκαταστάτη σας. Στέλνει επίσης ένα ημερήσιο heartbeat. | Συντηρείται. Κυκλοφορεί ως pre-release. Απαιτεί Home Assistant 2026.3.1 ή νεότερο· εγκαθίσταται μέσω HACS ως custom repository. |
| [Robonomics integration](https://github.com/airalab/homeassistant-robonomics-integration) (airalab) | Απομακρυσμένη πρόσβαση στο Home Assistant με κρυπτογραφημένες συναλλαγές μέσω συνδρομής RWS, καθώς και χρήστες και αντίγραφα ασφαλείας. | Χωρίς ενημερώσεις. Η τελευταία έκδοση είναι η 2.2.1 από τον Οκτώβριο του 2025. Χρησιμοποιεί το παλιό `robonomics-interface` 1.6.3, χρειάζεται τοπικό κόμβο IPFS, και τα προεπιλεγμένα endpoints δείχνουν ακόμα στο Kusama, που έχει σταματήσει. Μπορεί να επιλεγεί endpoint του Polkadot. Δεν έχει ελεγχθεί με το τρέχον runtime. |
| [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration) (airalab) | Διαβάζει έναν αισθητήρα Altruist μέσω του τοπικού δικτύου. Δεν χρησιμοποιεί την αλυσίδα. | Μικρή, μόνο τοπική. |

Η ενσωμάτωση Robonomics της airalab εξαρτάται από τις συνδρομές RWS. Για την τρέχουσα κατάστασή τους δείτε [Παλαιά pallets](/docs/legacy-pallets/#rws-subscriptions).

## Οποιαδήποτε συσκευή

Αυτά είναι τα δομικά στοιχεία για να συνδέσετε τη δική σας συσκευή.

1. **Δώστε στη συσκευή δικό της λογαριασμό.** Το κλειδί μένει στη συσκευή.
2. **Πληρώστε τις συναλλαγές της.** Είτε στείλτε στον λογαριασμό λίγο XRT (τη στιγμή που γράφεται αυτή η σελίδα, μια εγγραφή datalog κοστίζει ένα κλάσμα του χιλιοστού του XRT), είτε προσθέστε τον σε συνδρομή RWS με `rws.set_devices` (έως 32 συσκευές) και στείλτε τις συναλλαγές του μέσω `rws.call`.
3. **Περιγράψτε την εγκατάσταση στο δέντρο συσκευών.** Δημιουργήστε έναν κόμβο για τον χώρο και κόμβους για τις συσκευές του. Συνδέστε τον λογαριασμό της συσκευής με τον κόμβο της ως ταυτότητα του κόμβου. Δώστε `Write` σε ένα gateway αν το gateway γράφει για λογαριασμό της συσκευής. Δείτε [Δέντρο συσκευών (CPS)](/docs/device-tree/).
4. **Γράψτε δεδομένα.** Βάλτε την τρέχουσα κατάσταση στο `payload` του κόμβου (έως 8 KiB), ή γράψτε εγγραφές με `datalog.record` (έως 512 bytes, [παλαιό](/docs/legacy-pallets/#datalog)). Βάλτε μεγαλύτερα δεδομένα στο IPFS και γράψτε το CID τους.
5. **Στείλτε εντολές, αν χρειάζεται.** Η παλαιά κλήση `launch` στέλνει ένα υπογεγραμμένο event εντολής στον λογαριασμό μιας συσκευής. Δείτε [Launch](/docs/legacy-pallets/#launch).

Βιβλιοθήκες για κάθε βήμα: Python `robonomics-interface`, JavaScript `@polkadot/api` και Rust `libcps` με το εργαλείο `cps`. Δείτε [Βιβλιοθήκες πελάτη](/docs/client-libraries/).

### Gateways για μικρές συσκευές

Δεν μπορεί κάθε συσκευή να επικοινωνεί με την αλυσίδα. Αυτά τα gateways ανοιχτού κώδικα μπαίνουν στη μέση:

- **edge** ([airalab/robins](https://github.com/airalab/robins)): δέχεται υπογεγραμμένα μηνύματα μέσω HTTP και Meshtastic και τα προωθεί μέσω libp2p GossipSub.
- **mqtt-bridge** ([airalab/robins](https://github.com/airalab/robins)): μετατρέπει μηνύματα MQTT σε ενημερώσεις του δέντρου συσκευών.
- **sensors-connectivity** ([airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)): συλλέγει υπογεγραμμένες μετρήσεις αισθητήρων και τις προωθεί στο IPFS pubsub και στο parachain. Εξυπηρετεί τους αισθητήρες του [sensors.social](https://sensors.social).

Οι δημόσιοι κόμβοι relay και η κατάστασή τους βρίσκονται στο [pubsub.robonomics.network](https://pubsub.robonomics.network).
