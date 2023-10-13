---
title: Σύνδεση αισθητήρα

contributors: [LoSk-p, makyul]
---

Παράδειγμα εργασίας βρίσκεται στο βίντεο:

https://youtu.be/jsaFCVAx2sA

## Απαιτήσεις

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (ή ένα από [υποστηριζόμενο](https://www.zigbee2mqtt.io/στηνformation/supported_adapters.html))

Service is running on Raspberry Pi αντίστοιχα. Ωστόσο, αυτές οι διαδρομές μπορεί να διαφέρουν ανάλογα με την συγκεκριμένη εγκατάστασή σας. contact the smart plug via zigbee protocol.

## Στικ Zigbee

Εάν έχετε το JetHome USB JetStick Z2, ήδη διαθέτει τον απαραίτητο firmware, οπότε δεν χρειάζεται να τον αναβαθμίσετε. Αλλά εάν έχετε έναν άλλο προσαρμογέα, πρέπει πρώτα να τον αναβαθμίσετε με το λογισμικό zigbee2MQTT. Μπορείτε να βρείτε οδηγίες για τη συσκευή σας [εδώ](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Συνδέστε τον προσαρμογέα και επαληθεύστε τη διεύθυνση του προσαρμογέα (μπορεί επίσης να είναι `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

You might need to get access to the USB port first. Add your user to `dialout` ομάδα (λειτουργεί για ubuntu, αλλά το όνομα της ομάδας μπορεί να είναι διαφορετικό σε άλλα λειτουργικά συστήματα).

Για το ubuntu:
```bash
sudo usermod -a -G dialout $USER
```
Για το arch:
```bash
sudo usermod -a -G uucp $USER
```
Στη συνέχεια, αποσυνδεθείτε και συνδεθείτε ξανά ή επανεκκινήστε τον υπολογιστή.

## Εγκατάσταση

Κλωνοποιήστε το αποθετήριο:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Διαμόρφωση

Πηγαίνετε στο `data/configuration.yaml` και ορίστε `permit_join: true`:

```
# Home Assistant integration (MQTT discovery)
homeassistant: false

# allow new devices to join
permit_join: true

# MQTT settings
mqtt:
  # MQTT base topic for zigbee2mqtt MQTT messages
  base_topic: zigbee2mqtt
  # MQTT server URL
  server: 'mqtt://172.17.0.1'
  # MQTT server authentication, uncomment if required:
  # user: my_user
  # password: my_password

# Serial settings
serial:
  # Location of CC2531 USB sniffer
  port: /dev/ttyUSB0
```
Επίσης, μπορεί ν θέλετε να συμπληρώσετε τα πεδία `server` και `port` με τις αντίστοιχες πληροφορίες. Στο `server` πεδίο χρησιμοποιήστε τη διεύθυνση IP της `docker0` γέφυρας για να εγκαθιδρύσετε τη σύνδεση: 

```bash
$ ip a                                                 127
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

...

5: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 02:42:0d:ff:5f:a3 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:dff:feff:5fa3/64 scope link 
       valid_lft forever preferred_lft forever
```
Εδώ η διεύθυνσή σας είναι `172.17.0.1`.

Στη συνέχεια, δημιουργήστε το αρχείο config/config.yaml με τις παρακάτω πληροφορίες και ορίστε την τοποθεσία σας (μπορείτε να ανατρέξετε στο https://countrycode.org/ για το 3-γράμματο ISO-κωδικό):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Συνδέστε το Plug

Πρώτη εκτέλεση:

```
docker-compose up     
```

Για να μεταβείτε στη λειτουργία σύζευξης στο βύσμα, πατήστε παρατεταμένα το κουμπί λειτουργίας για μερικά δευτερόλεπτα έως ότου το φως αρχίσει να αναβοσβήνει γρήγορα μπλε. 

Στα αρχεία καταγραφής θα πρέπει να δείτε τώρα το βύσμα σας άρχισε να δημοσιεύεται στο mqtt.


## Μετά τη σύζευξη

Εάν δεν θέλετε να επιτρέψετε σε άλλες συσκευές να συζεύξουν με το ραβδί σας, τώρα πρέπει να πάτε στο `data/configuration.yaml` και να θέσει `permit_join: false`.Επανεκκινήστε την υπηρεσία (χρησιμοποιήστε «Ctrl+C» και

```bash
docker-compose up     
```
ξανά για να υποβάλετε τις αλλαγές).

## Εκτέλεση
Κατά την πρώτη εκκίνηση, θα δημιουργηθεί ο λογαριασμός για το plug. 
> Εάν έχετε ήδη λογαριασμό, θα πρέπει να προσθέσετε τον αρχικό του λογαριασμό `config.config.yaml` αρχείο στην ενότητα`device_seed`:
>
> ```
> location: RUS
> service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
> twin_id: 5
> sending_timeout: 3600
> broker_address: "172.17.0.1"
> broker_port: 1883
> device_seed: <device_seed>
>```

Μετά τη δημιουργία του λογαριασμού, θα δείτε τη διεύθυνση στα logs (το seed θα προστεθεί στο `config/config.yaml`):
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
Πρέπει να μεταφέρετε μερικ tokens σε αυτόν τον λογαριασμό για τα τέλη συναλλαγής, μπορείτε να το κάνετε στο [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts). 

Η υπηρεσία θα δει ότι έχετε αρκετά tokens, στα logs θα δείτε:
```
plug               | Balance is OK
```
Η υπηρεσία θα δει τα μηνύματα mqtt από το plug και θα διασφαλίσει την ασφαλή χρήση ισχύος. Κάθε ώρα (μπορείτε να αλλάξετε το χρονικό όριο στο `config/config.yaml` και `sending_timeout` ενότητα, το χρονικό όριο είναι σε δευτερόλεπτα) θα δημιουργηθεί ημερολόγιο δεδομένων με τις παρακάτω πληροφορίες:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
