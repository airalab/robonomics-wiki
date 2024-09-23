---
title: Σύνδεση αισθητήρα

contributors: [LoSk-p, makyul]
---

Παράδειγμα της εργασίας βρίσκεται στο βίντεο:

https://youtu.be/jsaFCVAx2sA

## Απαιτήσεις

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Προσαρμογέας Zigbee [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (ή ένας από τους [υποστηριζόμενους](https://www.zigbee2mqtt.io/information/supported_adapters.html))

Η υπηρεσία λειτουργεί στο Raspberry Pi και επικοινωνεί με το έξυπνο φις μέσω πρωτοκόλλου zigbee.

## Προσαρμογέας Zigbee

Αν έχετε το JetHome USB JetStick Z2, έχει ήδη τον απαραίτητο firmware, οπότε δεν χρειάζεται να τον φλασάρετε. Αλλά αν έχετε έναν άλλο προσαρμογέα, πρέπει πρώτα να τον φλασάρετε με το λογισμικό zigbee2MQTT. Μπορείτε να βρείτε οδηγίες για τη συσκευή σας [εδώ](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Συνδέστε τον προσαρμογέα και επαληθεύστε τη διεύθυνση του προσαρμογέα (ενδέχεται να είναι και `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

Μπορεί να χρειαστείτε πρόσβαση στη θύρα USB πρώτα. Προσθέστε τον χρήστη σας στην ομάδα `dialout` (λειτουργεί για το ubuntu, αλλά το όνομα της ομάδας μπορεί να είναι διαφορετικό σε άλλα λειτουργικά συστήματα).
Για το ubuntu:
```bash
sudo usermod -a -G dialout $USER
```
Για το arch:
```bash
sudo usermod -a -G uucp $USER
```
Στη συνέχεια αποσυνδεθείτε και συνδεθείτε ξανά ή επανεκκινήστε τον υπολογιστή.

## Εγκατάσταση

Κλωνοποιήστε το αποθετήριο:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Ρύθμιση

Μεταβείτε στο `data/configuration.yaml` και ορίστε `permit_join: true`:

```
# Ενσωμάτωση Home Assistant (ανακάλυψη MQTT)
homeassistant: false

# επιτρέψτε σε νέες συσκευές να ενταχθούν
permit_join: true

# ρυθμίσεις MQTT
mqtt:
  # Βασικό θέμα MQTT για τα μηνύματα MQTT του zigbee2mqtt
  base_topic: zigbee2mqtt
  # Διεύθυνση διακομιστή MQTT
  server: 'mqtt://172.17.0.1'
  # Αυθεντικοποίηση διακομιστή MQTT, ξεσχολιάστε αν απαιτείται:
  # user: my_user
  # password: my_password

# Ρυθμίσεις σειριακής θύρας
serial:
  # Τοποθεσία του CC2531 USB sniffer
  port: /dev/ttyUSB0
```
Επίσης, μπορείτε να συμπληρώσετε τα πεδία `server` και `port` με τις αντίστοιχες πληροφορίες. Στο πεδίο `server` χρησιμοποιήστε τη διεύθυνση IP της γέφυρας `docker0` για να καθιερώσετε τη σύνδεση:

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

Στη συνέχεια δημιουργήστε το αρχείο config/config.yaml με τις παρακάτω πληροφορίες και ορίστε την τοποθεσία σας (μπορείτε να ανατρέξετε στο https://countrycode.org/ για τον τριών γραμμάτων κωδικό ISO):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Σύνδεση Φις

Πρώτα εκτελέστε:

```
docker-compose up     
```

Για να μεταβείτε στη λειτουργία σύζευξης στο φις, πατήστε παρατεταμένα το κουμπί λειτουργίας για λίγα δευτερόλεπτα μέχρι να αρχίσει να αναβοσβήνει γρήγορα μπλε το φως.

Στα logs θα πρέπει τώρα να βλέπετε το φις σας να αρχίζει να δημοσιεύει στο mqtt.

## Μετά τη σύζευξη

Αν δεν θέλετε να επιτρέψετε σε άλλες συσκευές να συζευχθούν με τον προσαρμογέα σας, τώρα θα πρέπει να μεταβείτε στο `data/configuration.yaml` και να ορίσετε `permit_join: false`. Επανεκκινήστε την υπηρεσία (χρησιμοποιήστε 'Ctrl+C' και

```bash
docker-compose up     
```
ξανά για να υποβάλετε τις αλλαγές).

## Εκτέλεση
Κατά την πρώτη εκκίνηση θα δημιουργηθεί ο λογαριασμός για το φις.
> Αν έχετε ήδη λογαριασμό, πρέπει να προσθέσετε το seed του στο αρχείο `config.config.yaml` στην ενότητα `device_seed`:
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
Πρέπει να μεταφέρετε μερικά tokens σε αυτόν τον λογαριασμό για τα τέλη συναλλαγών, μπορείτε να το κάνετε στο [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts).

Η υπηρεσία θα δει ότι έχετε αρκετά tokens, στα logs θα δείτε:
```
plug               | Balance is OK
```
Η υπηρεσία θα βλέπει τα μηνύματα mqtt από το φις και θα αποθηκεύει την κατανάλωση ενέργειας. Κάθε ώρα (μπορείτε να αλλάξετε το χρονικό όριο στο `config/config.yaml` στην ενότητα `sending_timeout`, το χρονικό όριο είναι σε δευτερόλεπτα) θα δημιουργείται ένα αρχείο καταγραφής με τις παρακάτω πληροφορίες:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```