---
title: Εκτέλεση collator
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

Οι collators παράγουν τα blocks του parachain Robonomics. Αυτός ο οδηγός στήνει έναν collator σε server Linux, τον καταχωρίζει on-chain και εξηγεί πώς κερδίζει.

Πηγή αυτού του οδηγού είναι ο [collator guide](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md) στο αποθετήριο του runtime.

## Τι χρειάζεστε

- Έναν server: 8 πυρήνες CPU, 64 GB RAM, 2 TB NVMe. Ένας τέτοιος server κοστίζει περίπου $120–150 τον μήνα.
- Δίσκο: το parachain και το relay chain του Polkadot μαζί πιάνουν περίπου 1.1 TB και συνεχίζουν να μεγαλώνουν. Υπολογίστε τουλάχιστον 2 TB.
- Έναν λογαριασμό στο Robonomics με περισσότερα από 32 XRT ελεύθερο υπόλοιπο.

## 1. Εγκαταστήστε τον κόμβο

Δεν υπάρχει binary κόμβου Robonomics. Ένας collator τρέχει το γενικό `polkadot-omni-node` της Parity με το chain spec του Robonomics. Ο οδηγός υποθέτει έναν χρήστη `robonomics` με home `/var/lib/robonomics/` και base path `/var/lib/robonomics/base/`.

Κατεβάστε το `polkadot-omni-node` από τις [εκδόσεις του Polkadot SDK](https://github.com/paritytech/polkadot-sdk/releases). Χρησιμοποιήστε την πιο πρόσφατη έκδοση `polkadot-stable*`· οι παρακάτω εντολές χρησιμοποιούν το `polkadot-stable2609`.

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

Κατεβάστε το chain spec:

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. Δημιουργήστε το κλειδί δικτύου

Ο collator δεν ξεκινά χωρίς κλειδί δικτύου:

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

Το κλειδί γράφεται στο `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519`. Κρατήστε αντίγραφο ασφαλείας.

## 3. Ξεκινήστε τον κόμβο

Προτεινόμενο `ExecStart` για υπηρεσία systemd:

{% codeHelper {copy: true} %}

```
ExecStart=/usr/local/bin/polkadot-omni-node \
  --name "YOUR_NODE_NAME" \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json \
  --base-path /var/lib/robonomics/base/ \
  --collator \
  --sync warp \
  --telemetry-url "wss://telemetry.parachain.robonomics.network/submit/ 0" \
  -- \
  --sync warp
```

{% endcodeHelper %}

- Το πρώτο `--sync warp` αφορά το parachain. Αυτό μετά το `--` αφορά το ενσωματωμένο relay chain. Χωρίς αυτό, ο συγχρονισμός του relay chain μπορεί να πάρει εβδομάδες.
- Το chain spec δεν έχει endpoint τηλεμετρίας, οπότε η τηλεμετρία ενεργοποιείται με `--telemetry-url`.

## 4. Δημιουργήστε τα session keys

Τα session keys είναι κλειδιά Aura (sr25519). Ξεκινήστε προσωρινά τον κόμβο με `--rpc-methods unsafe` και μετά καλέστε το `author_rotateKeysWithOwner` με τον λογαριασμό του collator σας:

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Το αποτέλεσμα έχει δύο πεδία: `keys` και `proof`. Αποθηκεύστε και τα δύο. Ελέγξτε ότι ο κόμβος έχει τα κλειδιά:

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Μετά αφαιρέστε το `--rpc-methods unsafe` και επανεκκινήστε τον κόμβο.

## 5. Καταχωριστείτε on-chain

Στείλτε αυτά τα extrinsics από τον λογαριασμό του collator σας, για παράδειγμα στο [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics):

1. `session.setKeys(keys, proof)` με τις δύο τιμές από το προηγούμενο βήμα. Μη δώσετε κενό proof: το proof συνδέει τα κλειδιά με τον λογαριασμό σας.
2. `collatorSelection.registerAsCandidate()`. Αυτό δεσμεύει **32 XRT**.

Ο κόμβος σας μπαίνει στο σύνολο μετά από αλλαγή session. Στο runtime ένα session διαρκεί 3,600 blocks, περίπου 6 ώρες με blocks των 6 δευτερολέπτων.

Ελέγξτε την υποψηφιότητά σας on-chain, όχι μόνο από την κατάσταση του κόμβου: δείτε τα `collatorSelection.candidateList` και `collatorSelection.invulnerables` στο **Developer → Chain state**.

Η εγγύηση και τα όρια για τους υποψηφίους είναι ρυθμίσεις του runtime. Για να αλλάξουν χρειάζεται δημοψήφισμα Root. Δείτε [XRT και διακυβέρνηση](/docs/xrt-and-governance/).

## Πώς λειτουργούν οι ανταμοιβές

Ένας collator κερδίζει με δύο τρόπους:

1. **Ανταμοιβή ανά block.** Ένα σταθερό ποσό 0.0042 XRT εκδίδεται απευθείας στον δημιουργό κάθε block. Ισχύει από το runtime 43.
2. **Τέλη και φιλοδωρήματα.** Όλα τα τέλη και τα φιλοδωρήματα πηγαίνουν στο κοινό ταμείο των collators. Ο δημιουργός ενός block παίρνει ένα μερίδιο από αυτό.

Η ανταμοιβή ανά block έχει οριστεί ώστε να καλύπτει έναν server με περιθώριο:

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

Τα δεδομένα είναι ένας server των $2,040 τον χρόνο, 7 collators, περιθώριο 30% και τιμή XRT $1. Όταν αλλάζουν, η ανταμοιβή αναθεωρείται με αναβάθμιση του runtime.

Το εισόδημά σας εξαρτάται από το μερίδιό σας στα blocks: όσο περισσότεροι collators υπάρχουν, τόσο λιγότερα blocks παράγει ο καθένας. Υπόβαθρο και μετρήσεις: [Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/).
