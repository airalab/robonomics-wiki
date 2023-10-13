---
title: Προσαρμογέας Zigbee με Zigbee2MQTT για προεγκατεστημένη εικόνα

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**Σε αυτό το άρθρο θα συνδέσετε έξυπνες συσκευές.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

Ανοίξτε έναν περιηγητή ιστού και μεταβείτε στη διεύθυνση `http://%RASPBERRY_IP_ADDRESS%:8099`. Μπορείτε να βρείτε τη διεύθυνση IP του Raspberry Pi χρησιμοποιώντας την εφαρμογή [Fing mobile app](https://www.fing.com/products) ή το εργαλείο γραμμής εντολών [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Θα δείτε τη διεπαφή χρήστη του Zigbee2MQTT:

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




Ήρθε η ώρα να συνδέσετε την έξυπνη συσκευή σας. 
Πατήστε πρώτα το κουμπί `Permit join (All)` στην κορυφή της διεπαφής χρήστη του Zigbee2MQTT. 

Στη συνέχεια, ξεκινήστε τη σύζευξη των συσκευών. Ο πιο συνηθισμένος τρόπος να μεταβείτε μια συσκευή σε λειτουργία σύνδεσης είναι να κρατήσετε πατημένο το κουμπί λειτουργίας ή να τις ενεργοποιήσετε/απενεργοποιήσετε 5 φορές. Βεβαιωθείτε ότι το Zigbee2MQTT εκτελείται.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

Όταν η συσκευή συνδεθεί, θα τις δείτε στη διεπαφή χρήστη:

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

Τώρα θα πρέπει να δείτε αυτόν τον αισθητήρα στο Home Assistant WebUI σας. Μεταείτε στις `Settings` -> `Devices & Services` -> `Devices`:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

Αφού προσθέσετε όλους τους αισθητήρες, μπορείτε να κλείσετε τη διεπαφή χρήστη του Zigbee2MQTT.
