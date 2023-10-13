---
title: Robonomics SLS Gateway

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  -  SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**Σε αυτό το άρθρο θα ρυθμίσετε το Robonomics SLS Gateway. Θα εγκαταστήσετε το απαιτούμενο λογισμικό για την πύλη, θα το διαμορφώσετε και θα το συνδέσετε με το Home Assistant.**

<robo-wiki-picture src="home-assistant/sls_gateway.png" />

## Firmware

Πρώτα πρέπει να εγκαταστήσετε το λογισμικό του μικροελεγκτή της πύλης. Προετοιμάστε την πύλη ρυθμίζοντας τις διακόπτες `1` και `3` στο κάτω μέρος του SLS Gateway σε `ON`, οι υπόλοιποι πρέπει να είναι `OFF`.

<robo-wiki-picture src="home-assistant/sls-gateway-13.gif" />

Συνδέστε την πύλη στο Raspberry Pi σας μέσω της θύρας USB τύπου C στην πύλη.

<robo-wiki-picture src="home-assistant/sls-rpi.gif" />

Κλωνοποιήστε το αποθετήριο με το λογισμικό στο Raspberry Pi σας:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

</code-helper>

Μεταβείτε στο `robonomics-hass-utils/esp_firmware/linux`. Για να αναβαθμίσετε την πύλη SLS, πρέπει να εκτελέσετε τα σενάρια `Clear` και `Flash_16mb`.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

</code-helper>

### Επίλυση Προβλημάτων

Εάν αντιμετωπίζετε προβλήματα κατά την ενημέρωση του λογισμικού της πύλης, πρέπει να ακολουθήσετε επιπλέον βήματα:

1. Βεβαιωθείτε ότι έχετε εγκαταστήσει το πρόσθετο pySerial:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
pip install pyserial
```
</code-helper>

2. Δώστε στον χρήστη σας δικαιώματα πρόσβασης στη θύρα USB και επανεκκινήστε τον υπολογιστή:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```
</code-helper>

3. Σε ορισμένες περιπτώσεις, είναι απαραίτητο να αλλάξετε τη ρύθμιση της εύρους ζώνης στο σενάριο για την ενημέρωση του λογισμικού. Ανοίξτε το σενάριο `Flash_16mb.sh` με τον επεξεργαστή κειμένου `nano` και αλλάξτε την παράμετρο baud από `921600` σε μικρότερη τιμή (για παράδειγμα, `115200`).

## Διαμόρφωση

1. Αποσυνδέστε το SLS Gateway από τον υπολογιστή. Ρυθμίστε τους διακόπτες στο πίσω μέρος της πύλης στη σωστή θέση. Οι διακόπτες `5` (RX Zigbee προς ESP) και `6` (TX Zigbee προς ESP) πρέπει να είναι στη θέση `ON`, οι υπόλοιποι πρέπει να είναι `OFF`. 

<robo-wiki-picture src="home-assistant/sls-gateway-56.gif" />

2. Συνδέστε το καλώδιο τροφοδοσίας τύπου C. Το φωτεινό ένδειγμα στο κέντρο πρέπει να γίνει πράσινο.

<robo-wiki-picture src="home-assistant/sls-gateway-connect.gif" />

3. Κατά την πρώτη εκκίνηση, η πύλη θα αρχίσει να μοιράζεται Wi-Fi με το SSID `zgw****`. Συνδεθείτε σε αυτό το δίκτυο. Να έχετε υπόψη ότι το σήμα μπορεί να είναι αρκετά αδύναμο, επομένως είναι καλτερο να κρατήσετε την πύλη SLS κοντά στον υπολογιστή σας. 

<robo-wiki-picture src="home-assistant/sls-gateway-wifi.gif" />

4. Εάν η σύνδεση είναι επιτυχής, η διεπαφή ιστού θα ανοίξει (ή μπορείτε να τη βρείτε στη διεύθυνση 192.168.1.1). 

5. Θα δείτε τη σελίδα `Wi-Fi Settings`. Επιλέξτε το Wi-Fi σας και εισαγάγετε τον κωδικό πρόσβασης. Πατήστε το κουμπί `Apply`. Η πύλη θα επανεκκινήσει και θα συνδεθεί στο δίκτυο Wi-Fi σας. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type:'mp4'}]" />

6. Βρείτε την τοπική IP της πύλης SLS για να αποκτήσετε πρόσβαση στη διεπαφή ιστού. Για να το βρείτε, μπορείτε να χρησιμοποιήσετε την εφαρμογή κινητού [Fing](https://www.fing.com/products) ή το εργαλείο γραμμής εντολών [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Το όνομα της πύλης πρέπει να φαίνεται όπως αυτό: `zgw****`. Ανοίξτε τη διεπαφή ιστού της πύλης επικολλώντας την IP της πύλης στον περιηγητή.

7. Πηγαίνετε στο `Setting` -> `Hardware` και βεβαιωθείτε ότι οι ρυθμίσεις φαίνονται όπως στην εικόνα. Διορθώστε τις ρυθμίσεις αν είναι απαραίτητο και κάντε κλικ στο κουμπί `Save`:

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type:'mp4'}]" />

Ο πίνακας με τις απαιτούμενες τιμές:

| Field                    | Value              |
|--------------------------|:-------------------|
| Zigbee module            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Service Button Pin       | 33 (pullUP - true) |
| Number addressable leds  | 0                  |
| Led Red (or addr)        | 21                 |
| Led Green                | 5                  |
| Led Blue                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Στη συνέχεια επανεκκινήστε την πύλη. Επιλέξτε  `Actions` -> `Reboot system` στην πάνω δεξιά γωνία.

9. Βεβαιωθείτε ότι η πύλη λειτουργεί σωστά στο παράθυρο πληροφοριών Zigbee. Η κατάσταση της συσκευής πρέπει να είναι `OK`.

10. Διαμορφώστε την αυτόματη προσθήκη συσκευών στο Home Assistant. Πηγαίνετε στο  `Zigbee` -> `Config` και επιλέξτε `Home Assistant MQTT Discovery` και `Clear States`. Αποθηκεύστε τις αλλαγές και ξανα**επανεκκινήστε** την πύλη SLS.

<robo-wiki-note type="warning">

Εάν ήδη έχετε μια ενεργή πύλη SLS στο σπίτι σας και τώρα διαμορφώνετε μια άλλη, τότε θα συγκρουστούν εταξύ τους. Για να λύσετε αυτό το πρόβλημα, πρέπει να αλλάξετε το κανάλι στη νέα συσκευή. Για να το κάνετε αυτό, πηγαίνετε στο `Zigbee` -> `Config`  και αλλάξτε το κανάλι σε ένα άλλο (π.χ. κανάλι 15).

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZ', type:'mp4'}]" />

## Σύζευξη SLS με MQTT

Μετά τη διαμόρφωση της πύλης SLS, πρέπει να συνδέσετε την πύλη SLS με το Home Assistant. Ανοίξτε τη διεπαφή ιστού της πύλης SLS και πηγαίνετε στο `Settings/Link` -> `MQTT Setup`:


Προσθέστε τη διεύθυνση του μεσολαβητή (διεύθυνση του Raspberry Pi με το Home Assistant στο τοπικό δίκτυο, μπορείτε να το βρείτε με την εφαρμογή κινητού [Fing](https://www.fing.com/products) ή το εργαλείο γραμμής εντολών [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), τη θύρα (η προεπιλεγμένη είναι `1883`), το όνομα χρήστη και ο κωδικός πρόσβασης του μεσολαβητή (το οποίο έχετε δημιουργήσει προηγουμένως) και το όνομα του θέματος (μπορείτε να επιλέξετε οποιοδήποτε). Επίσης, η IP διεύθυνση του Raspberry Pi πρέπει να είναι στατική. Κάντε κλικ στο  `Enable` και `Retain states`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdNKDqwwy87VQEDDVsX5kpaDQm9wKKPEJUNJnhnjx6e5y', type:'mp4'}]" />

Αποθηκεύστε τις αλλαγές. Τώρα οι συσκευές θα εμφανίζονται αυτόματα στο Home Assistant.

## Σύνδεση Συσκευών

Συνδέστε τις συσκευές σας πηγαίνοντας στο `Zigbee` -> `Join`. Βάλτε τους αισθητήρες σας σε λειτουργία σύζευξης, ο πιο κοινός τρόπος να μεταβείτε μια συσκευή σε λειτουργία σύνδεσης είναι να κρατήσετε πατημένο το κουμπί λειτουργίας ή να τα ενεργοποιήσετε/απενεργοποιήσετε 5 φορές. Πατήστε το κουμπί `Enable Join` για να ξεκινήσει η αναζήτηση συσκευών Zigbee. Θα δείτε ενεργοποιημένους αισθητήρες.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type:'mp4'}]" />


Τώρα μπορείτε να μεταβείτε στην ενότητα [**Συνδρομή IoT**](/docs/sub-activate) και να ξεκινήσετε την ενεργοποίηση της συνδρομής Robonomics.
