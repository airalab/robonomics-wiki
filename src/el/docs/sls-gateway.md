---
title: Robonomics SLS Gateway

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**Σε αυτό το άρθρο θα ρυθμίσετε την πύλη Robonomics SLS. Θα εγκαταστήσετε τον απαιτούμενο λογισμικό για την πύλη, θα το ρυθμίσετε και θα το συνδέσετε με το Home Assistant.**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"sls gateway"} %}{% endroboWikiPicture %}

## Firmware

Πρώτα πρέπει να εγκαταστήσετε το firmware του μικροελεγκτή της πύλης. Προετοιμάστε την πύλη ρυθμίζοντας τις διακόπτες `1` και `3` στο κάτω μέρος της SLS Gateway σε `ON`, οι υπόλοιποι πρέπει να είναι `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"sls gateway 13"} %}{% endroboWikiPicture %}

Συνδέστε την πύλη στο Raspberry Pi σας μέσω της θύρας USB τύπου C στην πύλη.

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

Κλωνοποιήστε το αποθετήριο με το firmware στο Raspberry Pi σας:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

{% endcodeHelper %}

Μεταβείτε στο `robonomics-hass-utils/esp_firmware/linux`. Για να ενημερώσετε την πύλη SLS, πρέπει να εκτελέσετε τα scripts `Clear` και `Flash_16mb`.

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### Αντιμετώπιση προβλημάτων

Αν αντιμετωπίζετε προβλήματα κατά την ενημέρωση του firmware της πύλης, πρέπει να ακολουθήσετε επιπλέον βήματα:

1. Βεβαιωθείτε ότι έχετε εγκαταστήσει το πρόσθετο pySerial module:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}

2. Δώστε στον χρήστη σας δικαιώματα πρόσβασης στη θύρα USB και επανεκκινήστε τον υπολογιστή:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}

3. Σε ορισμένες περιπτώσεις, είναι απαραίτητο να αλλάξετε τη ρύθμιση εύρους ζώνης στο script για την ενημέρωση του firmware. Ανοίξτε το script `Flash_16mb.sh` με τον επεξεργαστή `nano` καιΑλλάξτε την παράμετρο baud από `921600` σε μικρότερη τιμή (για παράδειγμα, `115200`).

## Ρύθμιση

1. Αποσυνδέστε την πύλη SLS από τον υπολογιστή. Ρυθμίστε τις διακοπτικές στο πίσω μέρος της πύλης στη σωστή θέση. Οι διακόπτες `5` (RX Zigbee προς ESP) και `6` (TX Zigbee προς ESP) πρέπει να είναι στη θέση `ON`, οι υπόλοιποι πρέπει να είναι `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. Συνδέστε το καλώδιο τροφοδοσίας τύπου C. Το φωτεινό δείκτη στο κέντρο θα πρέπει να ανάψει πράσινο.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. Κατά την πρώτη εκκίνηση, η πύλη θα αρχίσει να μοιράζεται Wi-Fi με το SSID `zgw****`. Συνδεθείτε σε αυτό το δίκτυο. Να έχετε υπόψη ότι το σήμα μπορεί να είναι αρκετά αδύναμο, οπότε είναι καλύτερο να κρατάτε την πύλη SLS πιο κοντά στον υπολογιστή σας.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. Εάν η σύνδεση είναι επιτυχής, το web interface θα ανοίξει (ή μπορείτε να το βρείτε στη διεύθυνση 192.168.1.1 διεύθυνση).

5. Θα δείτε τη σελίδα `Ρυθμίσεις Wi-Fi`. Επιλέξτε το Wi-Fi σας και εισάγετε τον κωδικό πρόσβασης. Πατήστε το κουμπί `Εφαρμογή`. Η πύλη θα επανεκκινήσει και θα συνδεθεί στο δίκτυο Wi-Fi σας.

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. Βρείτε την τοπική IP της πύλης SLS για πρόσβαση στη διεπαφή web. Για να τη βρείτε, μπορείτε να χρησιμοποιήσετε την εφαρμογή κινητού [Fing](https://www.fing.com/products) ή το εργαλείο γραμμής εντολών [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Το όνομα της πύλης θα πρέπει να μοιάζει με αυτό: `zgw****`. Ανοίξτε τη διεπαφή web της πύλης εισάγοντας την IP της πύλης στον περιηγητή.

7. Πηγαίνετε σε `Ρύθμιση` -> `Υλικό` και βεβαιωθείτε ότι οι ρυθμίσεις μοιάζουν με αυτές στην εικόνα. Διορθώστε τις ρυθμίσεις αν είναι απαραίτητο και κάντε κλικ στο κουμπί `Αποθήκευση`:

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

Ο πίνακας με τις απαιτούμενες τιμές:

| Πεδίο                    | Τιμή              |
|--------------------------|:-------------------|
| Μονάδα Zigbee            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Κουμπί Υπηρεσίας       | 33 (pullUP - true) |
| Αριθμός διευθύνσιμων led  | 0                  |
| Led Κόκκινο (ή addr)    | 21                 |
| Led Πράσινο             | 5                  |
| Led Μπλε                | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Στη συνέχεια επανεκκινήστε την πύλη. Επιλέξτε `Ενέργειες` -> `Επανεκκίνηση συστήματος` στην πάνω δεξιά γωνία.

9. Βεβαιωθείτε ότι η πύλη λειτουργεί σωστά στο παράθυρο πληροφοριών Zigbee. Το DeviceState πρέπει να είναι `OK`.

10. Ρυθμίστε την αυτόματη προσθήκη συσκευών στο Home Assistant. Πηγαίνετε σε `Zigbee` -> `Ρυθμίσεις` και επιλέξτε `Home Assistant MQTT Discovery` και `Καθαρισμός καταστάσεων`. Αποθηκεύστε τις αλλαγές και ξανα **επανεκκινήστε** την πύλη SLS.

{% roboWikiNote {type: "warning"}%} Αν έχετε ήδη μια ενεργή πύλη SLS στο σπίτι σας και τώρα ρυθμίζετε μια άλληΑν συνδέσετε δύο συσκευές στο ίδιο κανάλι Zigbee, τότε θα δημιουργηθεί σύγκρουση μεταξύ τους. Για να λύσετε αυτό το πρόβλημα, πρέπει να αλλάξετε το κανάλι στη νέα συσκευή. Για να το κάνετε αυτό, πηγαίνετε στο `Zigbee` -> `Ρύθμιση` και αλλάξτε το κανάλι σε ένα άλλο (π.χ. κανάλι 15). {% endroboWikiNote %}

## Σύζευξη SLS με MQTT

Αφού ρυθμίσετε την πύλη SLS, πρέπει να συνδέσετε την πύλη SLS στο Home Assistant. Ανοίξτε τη διεπαφή ιστού της πύλης SLS και πηγαίνετε στο `Ρυθμίσεις/Σύνδεση` -> `Ρύθμιση MQTT`:

Προσθέστε τη διεύθυνση του μεσολαβητή (διεύθυνση του Raspberry Pi με το Home Assistant στο τοπικό δίκτυο, μπορείτε να τη βρείτε με την εφαρμογή κινητού [Fing](https://www.fing.com/products) ή το εργαλείο γραμμής εντολών [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), τη θύρα (η προεπιλεγμένη είναι `1883`), το όνομα χρήστη και ο κωδικός του μεσολαβητή (τους οποίους δημιουργήσατε νωρίτερα) και το όνομα θέματος (μπορείτε να επιλέξετε οποιοδήποτε). Επίσης, η διεύθυνση IP του Raspberry Pi πρέπει να είναι στατική. Κάντε κλικ στο `Ενεργοποίηση` και `Διατήρηση καταστάσεων`.Αποθηκεύστε τις αλλαγές. Τώρα οι συσκευές θα εμφανίζονται αυτόματα στο Home Assistant.

## Σύνδεση Συσκευών

Συνδέστε τις συσκευές σας πηγαίνοντας στο `Zigbee` -> `Σύνδεση`. Βάλτε τους αισθητήρες σας σε λειτουργία σύζευξης, ο πιο συνηθισμένος τρόπος για να μεταβείτε μια συσκευή σε λειτουργία σύνδεσης είναι να κρατήσετε πατημένο το κουμπί τροφοδοσίας της ή να τις ενεργοποιήσετε/απενεργοποιήσετε 5 φορές. Πατήστε το κουμπί `Ενεργοποίηση Σύνδεσης` για να ξεκινήσετε την αναζήτηση συσκευών Zigbee. Θα δείτε ενεργούς αισθητήρες.

{% roboWikiVideo {videos:[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

Τώρα μπορείτε να πάτε στην ενότητα [**Συνδρομή IoT**](/docs/sub-activate) και να ξεκινήσετε την ενεργοποίηση της συνδρομής Robonomics.