---
title: Αναβαθμίστε το Home Assistant OS σας
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.31.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.4.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**Αυτό το άρθρο περιέχει οδηγίες για την αναβάθμιση του υπάρχοντος Home Assistant OS σας με την ενσωμάτωση του Robonomics.**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## Εγκατάσταση IPFS Add-on


Η ενσωμάτωση Robonomics αποθηκεύει τα δεδομένα χρησιμοποιώντας το τοπικό IPFS daemon, οπότε πρέπει να το εγκαταστήσετε πρώτα. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. Υπάρχει ένα [IPFS Add-on για το Home Assistant](https://github.com/airalab/ipfs-addon). Για να το εγκαταστήσετε, πηγαίνετε στις `Settings` -> `Add-ons` και πατήστε το κουμπί `ADD-ON STORE` στην κάτω δεξιά γωνία.

2. Πατήστε στις τρεις τελείες στην επάνω δεξιά γωνία και επιλέξτε `Repositories`. Προσθέστε εκεί τον παρακάτω σύνδεσμο:

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. Πατήστε το κουμπί `ADD`.

4. λείστε τον διαχειριστή αποθετηρίων και ανανεώστε τη σελίδα. Τώρα στο τέλος της σελίδας μπορείτε να δείτε το IPFS Daemon Add-on.

5. Ανοίξτε το πρόσθετο και πατήστε `INSTALL`. Μετά την εγκατάσταση, πατήστε `START`.

## Εγκατάσταση HACS

Το [Home Assistant Community Store (HACS)](https://hacs.xyz/) σας επιτρέπει να εγκαταστήσετε προσαρμοσμένες ενσωματώσεις.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. Πριν ξεκινήσετε, πρέπει να εγκαταστήσετε πρόσθετο για σύνδεση με τη συσκευή Home Assistant μέσω SSH. Στο Add-on Store αναζητήστε `ssh`. Συνιστούμε να εγκαταστήσετε το πρόσθετο `SSH & Web Terminal`.

<robo-wiki-note type="warning" title="Warning">

  Αν δεν βρεθεί το πρόσθετο SSH, δοκιμάστε να ενεργοποιήσετε την Προηγμένη Λειτουργία στις ρυθμίσεις του προφίλ χρήστη σας. Για να το κάνετε αυτό, κάντε κλικ στο εικονίδιο του προφίλ στην κάτω αριστερή γωνία και βρείτε την επιλογή Προηγμένη Λειτοργία.

</robo-wiki-note>

2. Επιλέξτε το πρόσθετο και πατήστε `INSTALL`. Αφού ολοκληρωθεί η εγκατάσταση, πηγαίνετε στην καρτέλα `Διαμόρφωση` και προσθέστε `password` ή `authorized_keys`. Μην ξεχάσετε να αποθηκεύσετε αυτό το μέρος της ρύθμισης.

3. Στην καρτέλα `Info` πατήστε `START``. Αν θέλετε να δείτε το πρόσθετο στην πλαϊνή γραμμή, μην ξεχάσετε να ενεργοποιήσετε την επιλογή `Show in sidebar`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. Ανοίξτε το SSH Add-on και εκτελέστε την παρακάτω εντολή:

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. Επανεκκινήστε το Home Assistant (μπορείτε να το κάνετε στις `Settings`->`System`). 

6. Τώρα η ενσωμάτωση HACS θα είναι διαθέσιμη για προσθήκη στο μενού `Integrations`. Πηγαίνετε στις `Settings`->`Devices & Services`, πατήστε `Add Integration` και βρείτε το HACS.

<robo-wiki-note type="warning" title="Warning">

  Για να χρησιμοποιήσετε το HACS χρειάζεστε έναν λογαριασμό Github.

</robo-wiki-note>

7. Κάντε κλικ επάνω του και ακολουθήστε τις οδηγίες εγκατάστασης. 

## Εγκατάσταση Robonomics Integration

Τώρα μπορείτε να εγκαταστήσετε την ενσωμάτωση Robonomics χρησιμοποιώντας το HACS.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

Ανοίξτε το HACS από το μενού της πλαϊνής γραμμής και μεταβείτε στην επιλογή `Integrations`. Κάντε κλικ στο `Εxplore & Download Repositories`, μετά αναζητήστε `Robonomics` και κάντε κλικ στο κουμπί `Download` που βρίσκεται στην κάτω δεξιά γωνία. Μόλις ολοκληρωθεί η λήψη, επανεκκινήστε το Home Assistant.