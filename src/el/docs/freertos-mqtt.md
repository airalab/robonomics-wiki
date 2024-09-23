---
title: Σύνδεση ενός συσκευής Amazon FreeRTOS στο Robonomics μέσω MQTT

contributors: [khssnv]
---

Εδώ παρουσιάζεται πώς ένας μικροελεγκτής που εκτελεί το [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) μπορεί να συνδεθεί στο δίκτυο Robonomics μέσω MQTT. Παρακαλούμε ελέγξτε το [αποθετήριο αυτό](http://github.com/khssnv/freertos_mqtt_robonomics_example) για τον πηγαίο κώδικα του έργου.

Χρησιμοποιούμε το [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) με διανομή FreeRTOS και υλοποίηση MQTT που παρέχεται από το [Espressif IoT Development Framework](https://github.com/espressif/esp-idf) ενώ η Espressif είναι ένας προμηθευτής του μικροελεγκτή που χρησιμοποιείται.

Επίσης, υπάρχει ένας αισθητήρας [PMS-3003](http://www.plantower.com/en/content/?107.html) για διαδειγματικούς σκοπούς. Ο αισθητήρας μετρά την παρουσία σωματιδίων στον αέρα και μπορεί να χρησιμοποιηθεί για να εκτιμήσει την ποιότητα του αέρα.

Η ποιότητα του αέρα δεν είναι θέμα του άρθρου, μπορείτε να βρείτε περισσότερες πληροφορίες στην ιστοσελίδα του ΠΟΥ: [Περιβαλλοντική (εξωτερική) ατμοσφαιρική ρύπανση](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). Ένας στόχος του συστήματος είναι να δημοσιεύει μετρήσεις του αισθητήρα στο δίκτυο Robonomics της Airalab.

## Ρύθμιση υλικού

Συνδέουμε τον PMS3003 TXD PIN5 με το ESP32 DevKitC IO17 για τη μεταφορά μετρήσεων μέσω UART.
Και οι δύο συσκευές απαιτούν τροφοδοσία και κοινή γείωση.

{% roboWikiPicture {src:"docs/freertos-mqtt/wiring.png", alt:"Διάγραμμα Σύνδεσης"} %}{% endroboWikiPicture %}

## Ροή Δεδομένων

Για να παραδώσουμε τις μετρήσεις του αισθητήρα στο δίκτυο Robonomics, σε επίπεδο firmware ο στόχος μας είναι να λάβουμε δεδομένα από έναν αισθητήρα μέσω του ενσωματωμένου πρωτοκόλλου επικοινωνίας που υποστηρίζει (UART στην περίπτωσή μας) και να τα περάσουμε στο AIRA instance μέσω MQTT / TCP.

{% roboWikiPicture {src:"docs/freertos-mqtt/send.svg", alt:"Αποστολή"} %}{% endroboWikiPicture %}

Στο παράδειγμά μας χρησιμοποιούμε την αναπτυγμένη από το κοινό υπηρεσία cloud του AIRA με διεύθυνση IP και όνομα τομέα που έχουν ανατεθεί.
Στο AIRA instance ρυθμίζουμε τον μεσίτη MQTT `mosquitto` και εγγραφόμαστε στο `/freertos_mqtt_robonomics_example/98:F4`:AB:72:23:C4` θέμα για να λάβετε μηνύματα από το MQTT.

Στη συνέχεια περνάμε τα μηνύματα στον συγγραφέα `robonomics io` με τη χρήση αγωγού.

{% roboWikiPicture {src:"docs/freertos-mqtt/recv.svg", alt:"Λήψη"} %}{% endroboWikiPicture %}

Τώρα τα δεδομένα είναι διαθέσιμα στο Δίκτυο Robonomics και μπορούμε να τα διαβάσουμε ξανά με το `robonomics io`.

## Λογισμικό Ενσωματωμένου Συστήματος

Χρησιμοποιούμε την [εφαρμογή δείγματος ESP-MQTT με μεταφορά TCP](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) ως βάση.

Τροποποιούμε μόνο το `main/app_main.c` για τη σύνδεση UART με τον αισθητήρα, τον χρονοσυγχρονισμό SNTP και την περιοδική διαδικτυακή δημοσίευση MQTT.

Αν προσπαθείτε να επαναλάβετε το έργο και είναι το πρώτο σας έργο βασισμένο στο ESP IDF, παρακαλούμε ακολουθήστε αρχικά τον [οδηγό προγραμματισμού ESP-IDF της Espressif](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step) για να εξοικειωθείτε με τις λειτουργίες του λογισμικού όπως η ρύθμιση, η δημιουργία και η μεταφόρτωση με το εργαλείο `idf.py`.

### Ρύθμιση Wi-Fi

Για να επικοινωνήσει ο μικροελεγκτής μας με την AIRA που είναι εγκατεστημένη στο cloud, απαιτείται σύνδεση στο Internet.
Χρησιμοποιούμε το Wi-Fi του ESP32 γι' αυτό.
Η Espressif παρέχει εργαλεία για τη ρύθμιση του ενσωματωμένου Wi-Fi.
Στο παράδειγμά μας χρησιμοποιούμε περιβάλλον ανάπτυξης με Ubuntu 20.04 GNU/Linux.
Για να ρυθμίσουμε το Wi-Fi, μεταβαίνουμε στον φάκελο του έργου και εκτελούμε το εργαλείο ρύθμισης SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Στη συνέχεια ορίζουμε το όνομα SSID και τον κωδικό πρόσβασης Wi-Fi στην ενότητα `Example Connection Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-wi-fi.png", alt:"Ρύθμιση Wi-Fi στο Menuconfig"} %}{% endroboWikiPicture %}

### Ρύθμιση Τελικού Σημείου MQTT

Υπάρχουν δύο πράγματα που πρέπει να ρυθμιστούν για το MQTT.
Το πρώτο είναι η διεύθυνση του μεσίτη MQTT.
Μπορεί να ρυθμιστεί με το εργαλείο ρύθμισης SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Ορίστε τη διεύθυνση `Broker URL` στην ενότητα `Example Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-mqtt.png", alt:"Ρύθμιση MQTT στο Menuconfig"} %}{% endroboWikiPicture %}

Το δεύτερο πράγμα είναι ένα θέμα MQTT..
Το καθορίζουμε στο firmware με το πρόθεμα του ονόματος του έργου ακολουθούμενο από τη διεύθυνση MAC του ESP32 μας.
Αυτό μας δίνει `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` για το συγκεκριμένο μικροτσίπ μας.

## Από το MQTT στο Robonomics

Αρχικά ας ελέγξουμε αν λαμβάνουμε δεδομένα μέσω MQTT.
Μπορούμε να εγγραφούμε στον μεσίτη MQTT Mosquitto στο θέμα που δημοσιεύει η συσκευή.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Εδώ φέρνουμε το πακέτο `mosquitto` στο περιβάλλον μας για να χρησιμοποιήσουμε το εργαλείο `mosquitto_sub`.
Στη συνέχεια εγγραφόμαστε στο θέμα που έχει οριστεί στο firmware.
Λάβαμε τις μετρήσεις μας, που σημαίνει ότι το AIRA λαμβάνει σωστά δεδομένα μέσω MQTT.
Τώρα ας προωθήσουμε αυτά τα μηνύματα στο Δίκτυο Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Εδώ χρησιμοποιούμε το εργαλείο `robonomics` για να δημοσιεύσουμε μηνύματα στο κανάλι pubsub `/freertos_mqtt_robonomics_example`.
Καθορίζουμε τα `bootnodes` για να διασφαλίσουμε την ίδρυση τουλάχιστον μιας σύνδεσης.

Τώρα διαβάζουμε αυτά τα μηνύματα από το ίδιο κανάλι pubsub.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Δημιουργήθηκε τυχαία ταυτότητα ομότιμου: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Εγγραφή στο θέμα: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Εγγραφή στο θέμα: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  Νέος συνομιλητής συνδέθηκε: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Προστέθηκε σύνδεσμος δικτύου για τον συνομιλητή: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") στο θέμα: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Αρχικοί Πόροι που Χρησιμοποιήθηκαν

* Το pinout του ESP32 DevKitC από το blog του GoJimmy https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* Η δομή δεδομένων και ο αποκωδικοποιητής PSM3003 από το OpenAirProject https://github.com/openairproject/sensor-esp32

**Σας ευχαριστούμε όλους!**