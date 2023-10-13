---
title: Πώς να χρησιμοποιήσετε τα σχέδια
contributors: [tubleronchik]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

Σε αυτό το άρθρο θα μάθετε πώς να προσθέσετε αυτοματισμούς σχεδίων στο Home Assistant σας και να το διαμορφώσετε.

## Αυτοματισμοί Σχεδίων

Ορισμένα σχέδια έχουν ήδη εγκατασταθεί. Οι αυτοματισμοί που βασίζονται σε τέτοια σχέδια χρειάζεται μόνο να διαμορφωθούν. Στη διεπαφή ιστού μπορείτε να βρείτε προεγκατεστημένα σχέδια στις `Settings/Automations & Scenes`. Ανοίξτε τα `Blueprints` και βρείτε το σχέδιο που θέλετε να χρησιμοποιήσετε. Σε αυτό το παράδειγμα θα χρησιμοποιηθεί το `Motion-activated Light`. 

<robo-wiki-picture src="home-assistant/blueprint-settings.jpg" alt="Blueprint Settings" />

Κάντε κλικ στο `Create Automation` για να ανοίξετε τον επεξεργαστή αυτοματισμού. Δώστε ένα όνομα, επιλέξτε ένα σχέδιο που θέλετε να χρησιμοποιήσετε (`Motion-activated Light` στην περίπτωσή μας). Έπειτα πρέπει να επιλέξετε αισθητήρα κίνησης και λάμπα. Όταν ολοκληρωθεί η διαμόρφωση, κάντε κλικ στο `Save`.

<robo-wiki-picture src="home-assistant/automation-configure.jpg" alt="Automation Διαμόρφωση" />

Αν θέλετε να κάνετε αλλαγές, μπορείτε να το βρείτε πηγαίνοντας στις `Settings/Automations & Scenes` και στη συνέχεια στους `Automations`. 

<robo-wiki-picture src="home-assistant/automations-all.jpg" alt="Automations List" />

## Εισαγωγή Σχεδίων

Το Home Assistant μπορεί να εισάγει σχέδια από τα φόρουμ του Home Assistant, το GitHub και τα GitHub gists. Η λίστα όλων των Σχεδίων βρίσκεται στο [Ανταλλαγή Σχεδίων](https://community.home-assistant.io/c/blueprints-exchange/53). Αφού επιλέξετε, πηγαίνετε στις `Settings/Automations & Scenes`  και ανοίξτε τα `Blueprints`. Κάντε κλικ στο `Import Blueprint` και εισαγάγετε το URL του επιλεγμένου σχεδίου. Στη συνέχεια κάντε κλικ στο `PREVIEW BLUEPRINT`. Σε αυτήν την περίπτωση θα χρησιμοποιήσουμε το [Ανίχνευση χαμηλού επιπέδου μπαταρίας και ειδοποίηση για όλους τους αισθητήρες μπαταρίας](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664). 

<robo-wiki-picture src="home-assistant/importing-blueprint.jpg" alt="Importing Blueprint" /> 

Αυτό θα φορτώσει το σχέδιο και θα εμφανσει μια προεπισκόπηση στο παράθυρο εισαγωγής. Μπορείτε να αλλάξετε το όνομα και να ολοκληρώσετε την εισαγωγή. Κάντε κλικ στο `Create Automation` για να ανοίξετε τον επεξεργαστή αυτοματισμού. Εδώ μπορείτε να διαμορφώσετε τις παραμέτρους του αυτοματισμού και να προσθέσετε ενέργειες για να λάβετε ειδοποιήσεις.

<robo-wiki-picture src="home-assistant/configure-battery-blueprint.jpg" alt="Configure Battery Blueprint" /> 