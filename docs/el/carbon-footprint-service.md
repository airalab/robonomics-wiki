---
title: Υπηρεσία αντιστάθμισης

contributors: [tubleronchik]
---

Παράδειγμα εργασίας βρίσκεται στο βίντεο:

https://youtu.be/Ha9wN6bjh64

Υπηρεσία για την αντιστάθμιση του αποτυπώματος CO2 καίγοντας τα πιστοποιητικά στο δίκτυο Statemine. 
Το παραγόμενο CO2 υπολογίζεται ως εξής: τα δεδομένα από τη σσκευή σε Wh πολλαπλασιάζονται με συντελεστές που εξαρτώνται από την περιοχή. 1 τόνος CO2 καλύπτεται από την κατανάλωση 1 πιστοποιητικού. [Εδώ](/docs/carbon-footprint-sensor) είναι οι οδηγίες για τη σύνδεση της συσκευής.

## Σενάριο

1. Καταχωρίστε μια νέα συσκευή στο Digital Twin στο δίκτυο Robonomics
2. Μια φορά σε ένα διάστημα λαμβάνετε τα τελευταία δεδομένα από όλες τις συσκευές και πολλαπλασιάζετε με τον συντελεστή ανάλογα με την περιοχή
3. Συνολίζοντας τα δεδομένα και μετατρέποντάς τα σε τόνους CO2
4. Αφαιρώντας τον συνολικό αριθμό των καίγοντων πιστοποιητικών από τα τρέχοντα δεδομένα 
5. Καύση ακέραιου αριθμού πιστοποιητικών στο δίκτυο Statemine 
6. Αποθήκευση του συνολικού αριθμού των καίγοντων πιστοποιητικών στην τοπική βάση δεδομένων και στο Αρχείο καταγραφής δεδομένων 


## Εγκατάσταση

Κλωνοποίηση του αποθετηρίου και επεξεργασία του αρχείου ρυμίσεων.

```
git clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Διαμόρφωση description

Να μην τροποποιηθεί `config/config_template.yaml`!

```
robonomics:
  seed: <seed for account in Robonomics Network wεδώ Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```
Οι συντελεστές για τη μη ανανεώσιμη ενέργεια έχουν ληφθεί από το [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) και αποθηκεύονται στο `utils/coefficients.py`. 

## Εκτόξευση

```
docker-compose up
```