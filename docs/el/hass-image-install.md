---
title: Προεγκατεστημένη εικόνα για το Raspberry Pi
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.0
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.21.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt
  - Yggdrasil 0.4.7
    https://github.com/yggdrasil-network/yggdrasil-go/
---

**Καλώς ήλθατε στον οδηγό εγκατάστασης του Home Assistant με ενσωμάτωση Robonomics σε ένα Raspberry Pi. Το Home Assistant είναι ένα σύστημα αυτοματισμού του σπιτιού ανοικτού κώδικα που παρέχει ένα κεντρικό κέντρο ελέγχου για τον έλεγχο έξυπνων συσκευών στο δίκτυο του σπιτιού σας. Με την ενσωμάτωση του Robonomics, ενός αποκεντρωμένου υπηρεσίας cloud, μπορείτε να ενισχύσετε τη λειτουργικότητα και την ασφάλεια του έξυπνου σπιτιού σας. Σε αυτό το άρθρο, θα παρέχουμε οδηγίες βήμα προς βήμα για την εγκατάσταση του Home Assistant με το Robonomics σε ένα Raspberry Pi, προσφέροντάς σας τη δυνατότητα αυτοματισμού και έλεγχου διάφορων πτυχών του σπιτιού σας χρησιμοποιώντας μια ασφαλή και αποκεντρωμένη λύση. Ας ξεκινήσουμε!**

## Υλικό που χρειάζεστε για την εγκατάσταση

Εάν δεν έχετε ήδη ενσωματώσει το Home Assistant στην έξυπνη κατοικία σας, είναι σημαντικό να γνωρίζετε τον εξοπλισμό που θα χρειαστείτε για να δημιουργήσετε ένα πλήρες σύστημα έξυπνου σπιτιού από το μηδέν.

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>Raspberry Pi 4 (at least 2 GB RAM)</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_3.png" /> 
      <b>SD card 16Gb+</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_7.png" /> 
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"><b>Zigbee smart devices</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. Λήψη προεγκατεστημένης εικόνας Robonomics

Η προεγκατεστημένη εικόνα Robonomics περιλαμβάνει:
- Home Assistant Core
- IPFS
- Μεσίτη MQTT και Ενσωμάτωση
- Zigbee2MQTT
- Robonomics Integration

<robo-wiki-button label="Download image (~528 Mb)" link="QmeDPrNYLQKFCZgPmxyxDWSAXSjSaw7Dx46d9p3JSGM1hA?filename=robonomics_rpi.xz&download=true" />

<robo-wiki-note type="warning" title="For advanced users">

Μπορείτε να ελέγξετε τον πηγαίο κώδικα και να κατεβάσετε την τελευταία έκδοση της εικόνας στο [GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)

</robo-wiki-note>


## 2. Διαμόρφωση της εικόνας

Εγκαταστήστε το [Raspberry Pi Imager](https://www.raspberrypi.com/software/) στον υπολογιστή σας. Στη συνέχεια, εισαγάγετε την κάρτα SD.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />

Εκτελέστε το πρόγραμμα Raspberry Pi Imager. Επιλέξτε την απαιτούμενη εικόνα ως λειτουργικό σύστημα και βεβαιωθείτε ότι έχετε επιλέξει την κάρτα SD από το αναπτυσσόμενο μενού αποθήκευσης.
Στις ρυθμίσεις:
- Ορίστε όνομα χρήστη και κωδικό πρόσβασης (αποθηκεύστε το προεπιλεγμένο όνομα χρήστη "pi" για ευκολία στην ανάκληση),  
- παρέχετε το όνομα και τον κωδικό πρόσβασης του Wi-Fi σας, 
- επιλέξτε τη χώρα σας από την αναπτυσσόμενη λίστα
και στη συνέχεια `Εγγραφή` της εικόνας. 
                   
<robo-wiki-note type="note">Φυλάξτε προσεκτικά το όνομα χρήτη και τον κωδικό πρόσβασης, καθώς αυτά τα διαπιστευτήρια θα χρειαστούν σε περίπτωση προβλημάτων.</robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" cover="covers/cover-1.png" />

Μπορείτε να βρείτε τους κωδικούς χώρας [εδώ](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

## 3. Πρώτη εκκίνηση

**Αποσυνδέστε με ασφάλεια την κάρτα SD**, εισαγάγετέ την στο Raspberry Pi. Στη συνέχεια, **εισαγάγετε τον προσαρμογέα Zigbee** στο Raspberry Pi.

<robo-wiki-note type="warning">Είναι σημαντικό να εισαγάγετε τον προσαρμογέα Zigbee πριν από την πρώτη εκκίνηση του Raspberry Pi! 
Αυτό απαιτείται για την αυτόματη διαμόρφωση του δικτύου zigbee.</robo-wiki-note>

**Εάν έχετε το [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) (το οποίο διαθέτει όλο τον απαραίτητο firmware), μπορείτε απλά να συνεχίσετε με αυτές τις οδηγίες. Ωστόσο, εάν έχετε άλλο προσαρμογέα, το πρώτο πράγμα που πρέπει να κάνετε είναι να τον εγγράψετε με το λογισμικό Zigbee2MQTT. Μπορείτε να βρείτε οδηγίες για τη συσκευή σας [εδώ](https://www.zigbee2mqtt.io/information/supported_adapters.html).**

Στη συνέχεια, συνδέστε το καλώδιο τροφοδοσίας στη συσκευή σας. Θα πρέπει να συνδεθεί στο δίκτυο Wi-Fi σας. 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Μόλις συνδεθεί το Raspberry Pi, το κόκκινο LED θα ανάψει και το πράσινο LED θα αναβοσβήνει για κάποιο χρονικό διάστημα. Περιμένετε έως και 5 λεπτά για να εκκινήσει το Raspberry Pi και εγγραφείτε στο δίκτυο.

Τώρα βρείτε τη διεύθυνση IP του Raspberry Pi. Για να το βρείτε, μπορείτε να χρησιμοποιήσετε την εφαρμογή κινητού [Fing](https://www.fing.com/products) ή 
το [εργαλείο γραμμής εντολών nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Βρείτε το `robots-home` (προαιρετικό όνομα μπορεί να είναι `Home(homeassistant)`) 
όνομα της κεντρικής μηχανής στη λίστα IP. 

Σε αυτό το παράδειγμα η διεύθυνση είναι `192.168.43.56`. 

Για να ελέγξετε ότι όλα λειτουργούν σωστά, ανοίξτε έναν web browser και μεταβείτε στην ιστοσελίδα `http://%RASPBERRY_IP_ADDRESS%:8123`. Σε αυτό το παράδειγμα, θα είναι `192.168.43.56:8123`.
Εάν όλα είναι εντάξει, θα δείτε τη διεπαφ χρήστη του Home Assistant. Εάν η ιστοσελίδα δεν ανοίγει, περιμένετε έως 5 λεπτά για να εκκινήσει το Raspberry Pi και δοκιμάστε ξανά. 

<robo-wiki-video loop controls :videos="[{src: 'QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## Αντιμετώπιση προβλημάτων

1. Για να αλλάξετε τις ρυθμίσεις Wi-Fi αργότερα, πρέπει να συνδεθείτε στο Raspberry Pi σας μέσω της εντολής `ssh`. Για να το κάνετε αυτό, ανοίξτε το τερματικό στον υπολογιστή σας
και πληκτρολογήστε την εντολή ssh με το όνομα χρήστη σας, που δημιουργήσατε στο βήμα "Διαμόρφωση της εικόνας" (το προεπιλεγμένο είναι "pi"). 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

και στη συνέχεια χρησιμοποιήστε την εντολή `sudo raspi-config`. Βρείτε περισσότερες πληροφορίες σχετικά με αυτήν την εντολή στο [επίσημο site.](https://www.raspberrypi.com/documentation/computers/configuration.html)
