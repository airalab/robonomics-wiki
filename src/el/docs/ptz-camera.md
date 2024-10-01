---
title: Έλεγχος κάμερας PTZ στο Home Assistant
contributors: [nakata5321]
---

Αυτό το άρθρο καλύπτει τη διαδικασία εγκατάστασης μιας κάμερας PTZ στο Home Assistant.
Θα χρησιμοποιηθεί το πρωτόκολλο ONVIF. Αυτό απαιτεί ένα τοπικό λογαριασμό κάμερας.

{% roboWikiNote {type: "warning"}%} Η διαδικασία δημιουργίας του τοπικού λογαριασμού κάμερας δεν καλύπτεται σε αυτό το άρθρο.
{% endroboWikiNote %}

Απαιτήσεις:
- Κάμερα PTZ
- Τοπικός λογαριασμός κάμερας
- Διεύθυνση IP κάμερας
- Ρυθμισμένο Home Assistant

## Ενσωμάτωση ONVIF

Ας ξεκινήσουμε με την εγκατάσταση της **ενσωμάτωσης ONVIF**.

Πηγαίνετε στο "Συσκευές & Υπηρεσίες" στις "Ρυθμίσεις" και πατήστε το κουμπί "ΠΡΟΣΘΗΚΗ ΕΝΣΩΜΑΤΩΣΗΣ".
Πληκτρολογήστε "ONVIF" και επιλέξτε την ενσωμάτωση. Θα δείτε το επόμενο παράθυρο.

{% roboWikiPicture {src:"docs/home-assistant/onvifsetup.jpg", alt:"onvif setup"} %}{% endroboWikiPicture %}

Πατήστε το κουμπί "Υποβολή". Θα προσπαθήσει να αναζητήσει αυτόματα την κάμερά σας. Αν επιτύχει,
επιλέξτε την κάμερά σας από τη λίστα και συμπληρώστε τα κενά πεδία.
Διαφορετικά, θα πρέπει να συμπληρώσετε όλα τα πεδία χειροκίνητα. Θα δείτε το ακόλουθο παράθυρο.

{% roboWikiPicture {src:"docs/home-assistant/onvifconfig.jpg", alt:"onvif config"} %}{% endroboWikiPicture %}

Συμπληρώστε τα κενά:
- Όνομα - δώστε ένα όνομα στην κάμερά σας
- Κεντρικός υπολογιστής - δώστε τη διεύθυνση IP της κάμεράς σας
- Θύρα - συνήθως είναι η 2020, αλλά ο πάροχος της κάμεράς σας μπορεί να την αλλάξει
- Όνομα χρήστη - γράψτε ένα όνομα χρήστη του τοπικού λογαριασμού της κάμεράς σας
  - Κωδικός πρόσβασης - γράψτε έναν κωδικό πρόσβασης για τον τοπικό λογαριασμό της κάμεράς σας

και πατήστε "Υποβολή". Επιλέξτε μια Περιοχή για την κάμερά σας και κάντε κλικ στο "Τέλος".

## Προσθήκη ελέγχου κάμερας στον πίνακα ελέγχου

Τώρα που έχετε εγκαταστήσει πλήρως την κάμερα, μπορείτε να προσθέσετε τη ροή της και τα κουμπιά ελέγχου στον πίνακα ελέγχου.

Πηγαίνετε στον πίνακα ελέγχου και ξεκινήστε δημιουργώντας μια νέα κάρτα. Επιλέξτε την "Εικόνα Μάτι" (Picture Glance).

{% roboWikiPicture {src:"docs/home-assistant/glance.jpg", alt:"glance"} %}{% endroboWikiPicture %}

Συμπληρώστε τα δεδομένα:
- Τίτλος - επιλέξτε τον τίτλο της εικόνας της κάμερας
- Οντότητα Κάμερας - επιλέξτε μια οντότητα κάμερας από τη λίστα αναπτυσσόμενου μενού
- Προβολή Κάμερας - επιλέξτε "ζωντανή" για λιγότερη καθυστέρηση

Στη συνέχεια, μεταβείτε στη λειτουργία "Επεξεργαστής Κώδικα" πατώντας το κουμπί στην κάτω αριστερή πλευρά. Θα δείτε τον παρακάτω κώδικα:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Αντικαταστήστε το περιεχόμενο του `entities: []` σύμφωνα με το παράδειγμα παρακάτω (`<Η_ΟΝΤΟΤΗΤΑ_ΤΗΣ_ΚΑΜΕΡΑΣ_ΣΑΣ>` είναι το ίδιο με την παράμετρο `camera_image`):

{% codeHelper { copy: true}%}

```
entities:
  - entity: <Η_ΟΝΤΟΤΗΤΑ_ΤΗΣ_ΚΑΜΕΡΑΣ_ΣΑΣ>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <Η_ΟΝΤΟΤΗΤΑ_ΤΗΣ_ΚΑΜΕΡΑΣ_ΣΑΣ>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Περιστροφή Αριστερά
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <Η_ΟΝΤΟΤΗΤΑ_ΤΗΣ_ΚΑΜΕΡΑΣ_ΣΑΣ>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <Η_ΟΝΤΟΤΗΤΑ_ΤΗΣ_ΚΑΜΕΡΑΣ_ΣΑΣ>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Κλίση Πάνω
    icon: 'mdi:arrow-up'
  - entity: <Η_ΟΝΤΟΤΗΤΑ_ΤΗΣ_ΚΑΜΕΡΑΣ_ΣΑΣ>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <Η_ΟΝΤΟΤΗΤΑ_ΤΗΣ_ΚΑΜΕΡΑΣ_ΣΑΣ>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Κλίση Κάτω
    icon: 'mdi:arrow-down'
  - entity: <Η_ΟΝΤΟΤΗΤΑ_ΤΗΣ_ΚΑΜΕΡΑΣ_ΣΑΣ>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <Η_ΟΝΤΟΤΗΤΑ_ΤΗΣ_ΚΑΜΕΡΑΣ_ΣΑΣ>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Περιστροφή Δεξιά
    icon: 'mdi:arrow-right'
    show_icon: true
```

{% endcodeHelper %}

Αυτά είναι όλα. Τώρα θα πρέπει να βλέπετε την κάρτα της κάμερας PTZ στον πίνακα ελέγχου μαζί με τα κουμπιά ελέγχου.

## Αντιμετώπιση προβλημάτων
Αν χρησιμοποιείτε το Home Assistant Core και δεν βλέπετε μια ροή από την κάμερα, θα πρέπει να εγκαταστήσετε τις ενσωματώσεις "stream" και "FFMPEG".
Για να το κάνετε αυτό, θα πρέπει να προσθέσετε τις συμβολοσειρές `stream: ` και `ffmpeg: ` στο τέλος του configuration.yaml.