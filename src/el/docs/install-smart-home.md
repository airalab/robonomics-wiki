---
title: Εγκατάσταση Έξυπνου Σπιτιού
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.27.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Καλώς ήρθατε στον οδηγό εγκατάστασης του Home Assistant με ενσωμάτωση Robonomics. Το Home Assistant είναι ένα σύστημα αυτοματισμού σπιτιού ανοικτού κώδικα που παρέχει ένα κεντρικό κέντρο ελέγχου για τη διαχείριση έξυπνων συσκευών στο δίκτυο του σπιτιού σας. Με την ενσωμάτωση με το Robonomics, ένα αποκεντρωμένο υπηρεσία cloud, μπορείτε να ενισχύσετε τη λειτουργικότητα και την ασφάλεια του έξυπνου σπιτιού σας. Σε αυτό το άρθρο, θα παρέχουμε οδηγίες βήμα προς βήμα για το πώς να εγκαταστήσετε το Home Assistant με το Robonomics, δίνοντάς σας τη δυνατότητα να αυτοματοποιήσετε και να ελέγξετε διάφορες πτυχές του σπιτιού σας χρησιμοποιώντας μια ασφαλή και αποκεντρωμένη λύση. Ας ξεκινήσουμε!**

## Δείγμα

Εδώ υπάρχει ένα παράδειγμα πλήρους εγκατάστασης Έξυπνου Σπιτιού και ενσωμάτωσης Robonomics. Να έχετε υπόψη ότι ο χρόνος που απαιτείται μπορεί να ποικίλει ανάλογα με τη σύνδεση στο Internet.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Υλικό που χρειάζεστε για την εγκατάσταση

Αν δεν έχετε ήδη ενσωματώσει το Home Assistant στην εγκατάσταση του έξυπνου σπιτιού σας, είναι σημαντικό να γνωρίζετε τον εξοπλισμό που θα χρειαστείτε για να δημιουργήσετε ένα πλήρες σύστημα έξυπνου σπιτιού από το μηδέν. Η ομάδα του Robonomics συνιστά να χρησιμοποιήσετε το Raspberry Pi 4 ως διακομιστή έξυπνου σπιτιού. **Αλλά είναι δυνατόν να εγκαταστήσετε τα πάντα στον υπολογιστή σας.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (τουλάχιστον 2 GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Κάρτα SD 16GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Προσαρμογέας Zigbee(Προαιρετικά) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Έξυπνες συσκευές Zigbee(Προαιρετικά) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Επιφάνεια εργασίας για την εγκατάσταση</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

## 1. Εγκατάσταση Προαπαιτούμενων

Το Robonomics Docker περιλαμβάνει:
- Home Assistant
- IPFS
- MQTT Broker και Ενσωμάτωση
- Zigbee2MQTT
- libp2p proxy
- Ενσωμάτωση Robonomics

Αυτό το άρθρο θα δείξει τη διαδικασία εγκατάστασης σε σύστημα Ubuntu. Πρώτα πρέπει να εγκαταστήσετε τα επόμενα πακέτα:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git
```

{% endcodeHelper %}

Στη συνέχεια, πρέπει να εγκαταστήσετε το Docker στον υπολογιστή σας. Οι οδηγίες εγκατάστασης βρίσκονται στην [επίσημη ιστοσελίδα](https://docs.docker.com/engine/install/).

<robo-wiki-note type="warning" title="Σημαντικές πληροφορίες">

  Προσθέστε τον χρήστη σας στην ομάδα docker, για να μπορείτε να ξεκινήσετε τα containers Docker χωρίς δικαιώματα ρίζας. Βρείτε τις [οδηγίες εδώ](https://docs.docker.com/engine/install/linux-postinstall/).

</robo-wiki-note>

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
mv template.env .env
```

{% endcodeHelper %}

Μετά από αυτό, μπορείτε να ανοίξετε το αρχείο `.env` και να επεξεργαστείτε τις προεπιλεγμένες τιμές όπως:
- Εκδόσεις πακέτων
- διαδρομή προς το αποθετήριο όπου θα αποθηκεύονται όλοι οι φάκελοι ρυθμίσεων.
- ζώνη ώρας σε ["όνομα βάσης δεδομένων tz"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. Έναρξη

Εκτελέστε το bash script και περιμένετε μέχρι να εγκατασταθούν όλα τα απαιτούμενα πακέτα:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Το script θα ελέγξει όλες τις απαιτούμενες ενέργειες που έχετε ολοκληρώσει στα προηγούμενα βήματα και θα εμφανίσει ένα σφάλμα αν κάτι δεν είναι σωστό.

Κατά τη διάρκεια της διαδικασίας εγκατάστασης μπορεί να συμβούν τα ακόλουθα:
- Αν αποφασίσετε να μη χρησιμοποιήσετε το συντονιστή Zigbee, θα δείτε μια γραμμή διαλόγου που επιβεβαιώνει εάν θα συνεχίσετε την εγκατάσταση:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
Cannot find zigbee coordinator location. Please insert it and run script again. The directory /dev/serial/by-id/ does not exist
Do you want to continue without zigbee coordinator? It will not start Zigbee2MQTT container.
Do you want to proceed? (y/n)
```

{% endcodeHelper %}


- Αν υπάρχουν πολλές συσκευές στον υπολογιστή σας που χρησιμοποιούν σειριακές θύρες, το script θα ρωτήσει ποια συσκευή να χρησιμοποιήσετε:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

Αυτά είναι όλα. Συνεχίστε στο επόμενο άρθρο.