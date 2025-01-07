---
title: Εγκατάσταση Έξυπνου Σπιτιού
contributors: [nakata5321, PaTara43]
εργαλεία:
  - Home-assistant-web3-build 0.0.5
    https://github.com/airalab/home-assistant-web3-build
  - Home Assistant 2024.11.3
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.40.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Καλώς ήρθατε στον οδηγό εγκατάστασης του Home Assistant με ενσωμάτωση Robonomics. Το Home Assistant είναι ένα σύστημα αυτοματισμού σπιτιού ανοικτού κώδικα που παρέχει ένα κεντρικό κέντρο ελέγχου για την χειρισμό έξυπνων συσκευών στο δίκτυο του σπιτιού σας. Με την ενσωμάτωση με το Robonomics, ένα αποκεντρωμένο υπηρεσία cloud, μπορείτε να ενισχύσετε τη λειτουργικότητα και την ασφάλεια του έξυπνου σπιτιού σας. Σε αυτό το άρθρο, θα παρέχουμε οδηγίες βήμα προς βήμα για το πώς να εγκαταστήσετε το Home Assistant με το Robonomics, δίνοντάς σας τη δυνατότητα να αυτοματοποιήσετε και να ελέγξετε διάφορες πτυχές του σπιτιού σας χρησιμοποιώντας μια ασφαλή και αποκεντρωμένη λύση. Ας ξεκινήσουμε!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"εγκατάσταση"} %}{% endroboWikiPicture %}

## Δοκιμή

ΕδώΕίναι ένα παράδειγμα μιας πλήρους εγκατάστασης ολοκληρωμένου συστήματος Smart Home και Robonomics. Να λάβετε υπόψη ότι ο χρόνος που απαιτείται μπορεί να ποικίλει ανάλογα με τη σύνδεση στο Internet.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Υλικό που χρειάζεστε για την εγκατάσταση

Αν δεν έχετε ήδη ενσωματώσει το Home Assistant στην εγκατάσταση Smart Home σας, είναι σημαντικό να γνωρίζετε τον εξοπλισμό που θα χρειαστείτε για να δημιουργήσετε ένα πλήρες σύστημα Smart Home από το μηδέν. Η ομάδα του Robonomics συνιστά να χρησιμοποιήσετε το Raspberry Pi 4 ως διακομιστή Smart Home.

{% roboWikiGridWrapper {columns: '2', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (τουλάχιστον 2 GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Κάρτα SD16GB</b> {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
    {% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
     <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b>Έξυπνες συσκευές Zigbee (Προαιρετικά)</b> </a>  {% endroboWikiGrid %}
    {% roboWikiGrid %}     {% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
    <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b>Προσαρμογέας Zigbee (Προαιρετικά)</b> </a>  {% endroboWikiGrid %}
    
{% endroboWikiGridWrapper %}


## 1. Εγκατάσταση Προαπαιτούμενων

{% roboWikiNote {type: "warning", title: "Σημαντικές πληροφορίες" }%} Όλα αυτά τα βήματα πρέπει να πραγματοποιηθούν σε Raspberry Pi 4 με σύστημα Ubuntu. {% endroboWikiNote %}

Το Robonomics Docker περιλαμβάνει:
- Home Assistant
- IPFS
- Μεσίτη MQTT και Ενσωμάτωση- Zigbee2MQTT
- Προξενητής libp2p
- Ενσωμάτωση Robonomics

Πρώτα πρέπει να εγκαταστήσετε τα παρακάτω πακέτα:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

Στη συνέχεια, πρέπει να εγκαταστήσετε το Docker στο Raspberry Pi 4 σας. Οδηγίες εγκατάστασης βρίσκονται στην [επίσημη ιστοσελίδα](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Σημαντικές πληροφορίες" }%} Προσθέστε τον χρήστη σας στην ομάδα docker, για να μπορείτε να ξεκινήσετε τα docker containers χωρίς δικαιώματα ρίζας. Βρείτε τις [οδηγίες εδώ](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

## 2. Ρύθμιση

Κατεβάστε το αποθετήριο GitHub και πλοηγηθείτε μέσα σε αυτό:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Στη συνέχεια, δημιουργήστε ένα αρχείο `.env` από το `template.env`:


{% codeHelper {copy: true}%}

```
cp template.env .env
```

{% endcodeHelper %}

Έπειτα, μπορείτε να ανοίξετε το αρχείο `.env` και να επεξεργαστείτε τις προεπιλεγμένες τιμές, όπως:
- η διαδρομή προς το αποθετήριο όπου θα αποθηκεύονται όλοι οι φάκελοι ρυθμίσεων.
- ζώνη ώρας σε ["όνομα βάσης δεδομένων tz"](https://en.wikipedia.org/wiki/List_of_t_database_time_zones).

## 3. Έναρξη

Εκτελέστε το bash script και περιμένετε μέχρι να εγκατασταθούν όλα τα απαιτούμενα πακέτα:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Το script θα επαληθεύσει όλες τις απαιτούμενες ενέργειες που έχουν ολοκληρωθεί στα προηγούμενα βήματα και θα εμφανίσει ένα σφάλμα αν κάτι δεν είναι σωστό.

Κατά τη διάρκεια της διαδικασίας εγκατάστασης μπορεί να συμβούν οι ακόλουθες καταστάσεις:
- Αν αποφασίσετε να μη χρησιμοποιήσετε το συντονιστή Zigbee, θα δείτε μια γραμμή διαλόγου επιβεβαίωσης εάν θέλετε να συνεχίσετε την εγκατάσταση:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
Cannot find zigbee coordinator location. Please insert it and run script again. The directory /dev/serial/by-id/ does not exist
Do you want to continue without zigbee coordinator? It will not start Zigbee2MQTT container.
Do you want to proceed? (Y/n)
```

{% endcodeHelper %}


- Αν υπάρχουν πολλές συσκευές στο Raspberry Pi 4 που χρησιμοποιούν σειριακές θύρες, το script θα ρωτήσει ποια συσκευή θέλετε να χρησιμοποιήσετε:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/σειριακός/με-αναγνωριστικό/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?

{% endcodeHelper %}

## Μετά την εγκατάσταση

Αφού ξεκινήσει όλα, μπορείτε να χρησιμοποιήσετε το σενάριο `update.sh` για να ενημερώσετε την έκδοση των πακέτων Docker:
{% codeHelper {copy: true}%}

```
bash update.sh
```

{% endcodeHelper %} 
Αυτό το σενάριο θα κατεβάσει νέες εκδόσεις, θα διαγράψει παλιές εκδόσεις πακέτων και θα επανεκκινήσει αυτόματα τα πάντα, αποθηκεύοντας όλες τις διαμορφώσεις σας.

Για να σταματήσετε τα πάντα, χρησιμοποιήστε το σενάριο `stop.sh`:
{% codeHelper {copy: true}%}

```
bash stop.sh
```

{% endcodeHelper %}

Αυτά είναι όλα. Συνεχίστε στο επόμενο άρθρο.