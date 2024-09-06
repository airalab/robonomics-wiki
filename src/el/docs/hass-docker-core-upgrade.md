---
title: Αναβαθμίστε το Home Assistant Docker ή Core σας για Unix-like λειτουργικό σύστημα
contributors: [PaTara43]
tools:
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Robonomics Home Assistant Integration 1.8.5-beta
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.2
    https://github.com/Multi-Agent-io/robonomics-interface/
  - HACS 1.34.0
    https://hacs.xyz/docs/setup/download



---

**Αυτό το άρθρο περιέχει οδηγίες για την αναβάθμιση του υπάρχοντος Home Assistant Docker ή Core (σε ένα Unix-like λειτουργικό σύστημα) με την ενσωμάτωση του Robonomics.**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"ΑΠΟΠΟΙΗΣΗ ΕΥΘΥΝΗΣ", type: "warning"}%}
  1. Υποθέτεται ότι το Docker είναι εγκατεστημένο σωστά.
  2. Υποθέτεται ότι χρησιμοποιούνται οι προεπιλεγμένες εικόνες και container του Home Assistant ή του Home Assitant Core.
  3. Το IPFS και το Libp2p-ws-proxy θα εγκατασταθούν ως Docker containers.
{% endroboWikiNote %}


## Εγκατάσταση

Κατεβάστε το σενάριο εγκατάστασης και εκτελέστε το στο τερματικό:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

Θα ελέγξει αν το Docker είναι εγκατεστημένο σωστά. Στη συνέχεια, θα προσπαθήσει να βρει το IPFS και θα προτείνει να ελέγξετε τη διαμόρφωση αν το IPFS είναι εγκατεστημένο. Αν το IPFS δεν βρεθεί, το σενάριο θα εγκαταστήσει και το IPFS και το Libp2p-ws Proxy. Θα δείτε την ακόλουθη έξοδο:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
Docker εγκατεστημένο
Ο χρήστης ανήκει στην ομάδα docker.
Έλεγχος εάν το IPFS είναι εγκατεστημένο... Μπορεί να πάρει λίγα λεπτά. Παρακαλώ περιμένετε
<...>
 ✔ Container ipfs-daemon      Ξεκίνησε
 ✔ Container lipb2p-ws-proxy  Ξεκίνησε
Όλα έτοιμα!
``` install_integration_core.sh
```

{% endcodeHelper %}

Αν το IPFS είναι ήδη εγκατεστημένο, θα δείτε την ακόλουθη έξοδο:
```shell
Docker εγκατεστημένο
Ο χρήστης ανήκει στην ομάδα docker.
Έλεγχος εάν το IPFS είναι εγκατεστημένο... Μπορεί να πάρει λίγα λεπτά. Παρακαλώ περιμένετε
Βρέθηκε η περίπτωση του IPFS. Βεβαιωθείτε ότι η διαμόρφωσή σας είναι ρυθμισμένη σωστά με τις ακόλουθες ρυθμίσεις:
      - 'Gateway': '/ip4/0.0.0.0/tcp/8080'
      - Οι θύρες 4001, 5001 και 8080 είναι διαθέσιμες.
      Επίσης, προσθέστε τους ακόλουθους κόμβους εκκίνησης:
      1. '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8'
      2. '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
      3. '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      Η διαμόρφωσή σας είναι ρυθμισμένη σωστά; [ναι/Όχι]:

```
Σε αυτήν την περίπτωση, πρέπει να προσαρμόσετε το αρχείο διαμόρφωσης του IPFS και να το επιβεβαιώσετε.

{% roboWikiNote {title:"Προσοχή!", type: "warning"}%} Η σωστή διαμόρφωση του IPFS είναι σημαντική· μην παραλείψετε αυτό το βήμα!{% endroboWikiNote %}

## Λήψη Ενσωμάτωσης Robonomics

Θα χρησιμοποιήσουμε το [HACS](https://hacs.xyz/) για να εγκαταστήσουμε την ενσωμάτωση. Αν το HACS δεν είναι εγκατεστημένο στο Home Assistant σας ακόμα, πρέπει πρώτα να το [εγκαταστήσετε](https://hacs.xyz/docs/setup/download/).

Στη συνέχεια, στο Home Assistant σας, πλοηγηθείτε στο HACS και αναζητήστε το `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Ανοίξτε το και κάντε κλικ στο `Λήψη` στην κάτω δεξιά γωνία. Η λήψη του αποθετηρίου μπορεί να πάρει κάποιο χρόνο.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

Αυτά είναι όλα. Συνεχίστε στο επόμενο άρθρο.