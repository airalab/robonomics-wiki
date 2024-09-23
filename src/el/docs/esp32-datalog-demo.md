---
title: Πώς να Στείλετε Εξωτερικό Από ESP32

contributors: [LoSk-p]
---

Στείλτε δεδομένα καταγραφής στο Robonomics Network από το ESP32 χρησιμοποιώντας το [robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp). Τον κώδικα του demo μπορείτε να βρείτε [εδώ](https://github.com/LoSk-p/esp32-datalog-demo).

### Απαιτήσεις

* Πυρήνας Platformio ([οδηγίες εγκατάστασης](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)).
* Οποιοδήποτε πρόγραμμα σειριακής επικοινωνίας για το λειτουργικό σύστημά σας (`tio` για Linux, για παράδειγμα). Μπορείτε να εγκαταστήσετε το `tio` με την ακόλουθη εντολή
```bash
sudo apt install tio
```
### Εγκατάσταση
Κλωνοποιήστε το αποθετήριο:
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### Διαμόρφωση
Δημιουργήστε το αρχείο `Private.h` στον φάκελο `src` με τον παρακάτω περιεχόμενο:
```
#pragma once

// Ορίστε πραγματικά κλειδιά και διευθύνσεις αντί για τιμές χωρίς νόημα
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
και συμπληρώστε το με τις πληροφορίες για τον λογαριασμό Robonomics σας και το δίκτυο WiFi. Το `PRIV_KEY` είναι το ιδιωτικό κλειδί του λογαριασμού Robonomics σας, το `SS58_ADR` είναι η διεύθυνσή του.

{% roboWikiNote {type: "warning"}%} Αυτό το demo λειτουργεί μόνο για λογαριασμούς ED25519!
{% endroboWikiNote %}

Για να λάβετε το ιδιωτικό κλειδί από τη φράση εκκίνησης του λογαριασμού σας, μπορείτε να χρησιμοποιήσετε το σενάριο [get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py). Απλά τρέξτε το και ακολουθήστε τις οδηγίες:
```bash
python3 get-private-key.py
```

### Μεταφόρτωση
Συνδέστε το ESP32 στον υπολογιστή χρησιμοποιώντας καλώδιο USB και χτίστε το έργο:
```bash
cd esp32-datalog-demo
platformio run -t upload
```
Αυτή η εντολή θα δημιουργήσει δυαδικά αρχεία για το esp και θα τα μεταφορτώσει, οπότε στο τέλος θα δείτε κάτι παρόμοιο με αυτό
```
Writing at 0x000b9def... (84 %)
Writing at 0x000bf4c2... (87 %)
Writing at 0x000c56bf... (90 %)
Writing at 0x000cc6df... (93 %)
Writing at 0x000d1dec... (96 %)
Writing at 0x000d71b0... (100 %)
Wrote 836160 bytes (538555 compressed) at 0x00010000 in 12.2 seconds (effective 548.7 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
=========================== [SUCCESS] Took 24.08 seconds ===========================
```

### Εκτέλεση

Μετά τη μεταφόρτωση, επανασυνδέστε το ESP στον υπολογιστή και εκτελέστε το πρόγραμμα σας σειριακής επικοινωνίας (tio με τη θύρα `/dev/ttyACM0` σε αυτό το παράδειγμα):
```bash
tio /dev/ttyACM0
```
Και γράψτε το κείμενο για την εξωτερική εγγραφή δεδομένων.

Μπορείτε να βρείτε τη θύρα στα αρχεία καταγραφής μετά την εντολή `platformio run -t upload` στην προηγούμενη ενότητα. Ψάξτε για κάτι παρόμοιο με αυτό:
```
Auto-detected: /dev/ttyACM0
Uploading .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Serial port /dev/ttyACM0
Connecting.......
```