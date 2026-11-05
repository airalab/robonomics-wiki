---
title: Εκτέλεση κόμβου ανάπτυξης
contributors: [LoSk-p, ensrationis]
---

Ένας κόμβος ανάπτυξης (dev node) είναι μια τοπική αλυσίδα Robonomics με έναν μόνο κόμβο, για να δοκιμάζετε τον κώδικά σας. Τα blocks παράγονται αμέσως, οι δοκιμαστικοί λογαριασμοί έχουν κεφάλαια και τίποτα δεν αγγίζει το ενεργό δίκτυο.

Δεν υπάρχει πια binary `robonomics --dev`. Κάνετε build το runtime από το [airalab/robonomics](https://github.com/airalab/robonomics), δημιουργείτε από αυτό ένα chain spec και τρέχετε το γενικό `polkadot-omni-node` της Parity με αυτό το spec.

## Μία εντολή (Nix)

Από ένα clone του αποθετηρίου:

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

Το script κάνει build το runtime με το feature `dev-runtime` αν χρειάζεται, δημιουργεί ένα προσωρινό chain spec και ξεκινά το `polkadot-omni-node --chain <spec> --dev`.

## Χωρίς Nix

Εγκαταστήστε τα δύο εργαλεία με το Cargo και μετά τρέξτε το ίδιο script:

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## Χειροκίνητα

Για να κρατήσετε το chain spec ή να αλλάξετε τα flags του κόμβου, κάντε τα βήματα μόνοι σας:

{% codeHelper {copy: true} %}

```bash
cargo build --release -p robonomics-runtime --features dev-runtime

chain-spec-builder -c ./chain_spec.json create \
  -n "Robonomics Dev" -i robonomics-dev -t development \
  -r ./target/release/wbuild/robonomics-runtime/robonomics_runtime.compact.compressed.wasm \
  --para-id 2000 --relay-chain westend-local \
  --properties tokenSymbol=XRT,tokenDecimals=9 \
  named-preset development

polkadot-omni-node --chain ./chain_spec.json --dev
```

{% endcodeHelper %}

Δεν υπάρχει ενσωματωμένο `--chain dev`: δίνετε πάντα το spec που δημιουργήσατε συν `--dev`. Προσθέστε `--base-path <dir>` για να διατηρείται η κατάσταση της αλυσίδας μεταξύ επανεκκινήσεων.

## Τι παίρνετε

- RPC και WebSocket στο `ws://127.0.0.1:9944`.
- Chain id `robonomics-dev`, para ID 2000, relay chain `westend-local`, token XRT με 9 δεκαδικά.
- Λογαριασμούς ανάπτυξης με κεφάλαια: Alice, Bob, Charlie και τα υπόλοιπα γνωστά δοκιμαστικά κλειδιά.
- Η Alice είναι Sudo. Το Sudo υπάρχει μόνο σε builds `dev-runtime`, ποτέ στο ενεργό δίκτυο.
- Καθαρή κατάσταση σε κάθε εκκίνηση, εκτός αν ορίσετε `--base-path`.

Συνδέστε το [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) στο `ws://127.0.0.1:9944` για να εξερευνήσετε. Με το εργαλείο `cps`, χρησιμοποιήστε `ROBONOMICS_WS_URL=ws://127.0.0.1:9944` και `ROBONOMICS_SURI=//Alice`.

## RWS σε αλυσίδα ανάπτυξης

Τις δημοπρασίες RWS τις δημιουργεί το Root. Για να παραλείψετε αυτό το βήμα όταν δοκιμάζετε κώδικα RWS, το αποθετήριο `robonomics-interface` έχει ένα `scripts/devchain.sh` που ξεκινά αλυσίδα ανάπτυξης με δημοπρασίες RWS ήδη στο genesis.

Περισσότερες επιλογές, μαζί με ένα Docker image, υπάρχουν στον [developer guide](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain).
