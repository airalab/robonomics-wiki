---
title: Πώς να προσθέσετε τον αισθητήρα SDS011 στο Home Assistant

contributors: [tubleronchik]
---

Αυτό το άρθρο εξηγεί πώς να συνδέσετε τον αισθητήρα ποιότητας αέρα SDS με το [Luftdaten](https://github.com/opendata-stuttgart/sensors-software) & [Robonomics](https://github.com/airalab/sensors-software) Λογισμκό ενσωματωμένου στο Home Assistant.

## Εγκατάσταση 
Υπάρχουν δύο επιλογές εγκατάστασης διαθέσιμες:

### Επιλογή 1: HACS

Ο ευκολότερος τρόπος για να προσθέσετε έναν τοπικό αισθητήρα Luftdaten είναι μέσω του HACS. [Εδώ](https://hacs.xyz/docs/setup/download/) μπορείτε να βρείτε μια σύντομη εξήγηση για το πώς να εγκαταστήσετε το HACS.

Αφού εγκατασταθεί το HACS, μεταβείτε στο HACS -> Ενσωματώσεις και αναζητήστε την ενσωμάτωση `Local Luftdaten Sensor`. Κάντε κλικ στο κουμπί λήψης και επανεκκινήστε το Home Assistant μόλις ολοκληρωθεί η λήψη της ενσωμάτωσης.
<robo-wiki-picture src="sds-hacs.png"/>

### Επιλογή 2: Χειροκίνητη εγκατάσταση

Υπό τον χρήστη homeassistant, κλωνοποιήστε το αποθετήριο του έργου:

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

Εάν ήδη έχετε οποιεσδήποτε προσαρμοσμένες ενσωματώσεις, αντιγράψτε τον φάκελο `custom_components/local_luftdaten/` στον φάκελο `custom_components` σας, για παράδειγμα:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```
</code-helper>
Εάν δεν έχετε αμία προσαρμοσμένη ενσωμάτωση, αντιγράψτε ολόκληρο τον φάκελο `custom_components` στον κατάλογο διαμόρφωσης του Home Assistant σας. Για παράδειγμα:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```
</code-helper>

## Διαμόρφωση

Δημιουργήστε μια νέα καταχώριση αισθητήρα στο `configuration.yaml` σας και προσαρμόστε το όνομα του υπολογιστή ή τη διεύθυνση IP. Για να βρείτε την τοπική διεύθυνση IP του αισθητήρα σας, μπορείτε να χρησιμοποιήσετε την εφαρμογή κινητού [Fing](https://www.fing.com/products) ή το εργαλείο γραμμής εντολών [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Το όνομα μπορεί να είναι οποιοδήποτε.

|Parameter              |Type    | Necessity    | Description
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | required     | IP address of the sensor
|`scan_interval`        | number | default: 180 | Frequency (in seconds) between updates
|`name`                 | string | required     | Name of the sensor
|`monitored_conditions` | list   | required     | List of the monitored sensors

<code-helper copy>

  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Air quality sensor
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```
</code-helper>

> Μπορείτε να βρείτε τη λίστα όλων των υποστηριζόμενων αισθητήρων στο [αποθετήριο](https://github.com/lichtteil/local_luftdaten).

Επανεκκινήστε το Home Assistant σας.
Μετά από αυτό, μπορείτε να προσθέσετε τον αισθητήρα στον πίνακα ελέγχου σας. Το όνομα του στοιχείου θα είναι το όνομα που προσθέσατε στο `configuration.yaml`.
<robo-wiki-picture src="sds-configuration-card.png"/>