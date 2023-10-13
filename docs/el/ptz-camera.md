---
title: Έλεγχος κάμερας PTZ στο Home Assistant
contributors: [nakata5321]
---

Αυτό το άρθρο καλύπτει τη διαδικασία εγκατάστασης μιας κάμερας PTZ στο Home Assistant. 
Θα χρησιμοποιηθεί το πρωτόκολλο ONVIF. Αυτό απαιτεί ένα τοπικό λογαριασμό κάμερας.

<robo-wiki-note type="warning">
Η διαδικασία ρύθμισης του τοπικού λογαριασμού κάμερας δεν καλύπτεται σε αυτό το άρθρο.
</robo-wiki-note>

Απαιτήσεις:
- Κάμερα PTZ
- Τοπικός λογαριασμός κάμερας
- Διεύθυνση IP κάμερας
- Ρυθμισμένο Home Assistant

## Ενσωμάτωση ONVIF

Ας ξεκινήσουμε με την εγκατάσταση της **ενσωμάτωσης ONVIF**. 

Πηγαίνετε στο "Devices & Services" στις "Settings" και πατήστε το κουμπί "ADD INTEGRATION".
Πληκτρολογήστε "ONVIF" και επιλέξτε την ενσωμάτωση. Θα δείτε το επόμενο παράθυρο.

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

Πατήστε το κουμπί "Submit". Θα προσπαθήσει να αναζητήσει αυτόματα την κάμερά σας. Εάν επιτύχει, 
επιλέξτε την κάμερά σας από τη λίστα και συμπληρώστε τα κενά πεδία. 
Διαφορετικά, πρέπει να συμπληρώσετε όλα τα πεδία χειροκίνητα. Θα δείτε το παρακάτω παράθυρο.

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

Συμπληρώστε τα κενά:
- Name - δώστε ένα όνομα στην κάμερά σας
- Host - δώστε τη διεύθυνση IP της κάμεράς σας
- Port - συνήθως είναι 2020, αλλά ο πάροχος της κάμεράς σας μπρεί να το αλλάξει
- Username - γράψτε ένα όνομα χρήστη του τοπικού λογαριασμού της κάμεράς σας
  - Password - γράψτε έναν κωδικό πρόσβασης για τον τοπικό λογαριασμό της κάμεράς σας

και πατήστε "Submit". Επιλέξτε μια περιοχή για την κάμερά σας και κάντε κλικ στο "Finish".

## Προσθέστε έλεγχο κάμερας στον πίνακα ελέγχου

Τώρα που έχετε ρυθμίσει πλήρως την κάμερα, μπορείτε να προσθέσετε τη ροή και τα κουμπιά ελέγχου στον πίνακα ελέγχου.

Πηγαίνετε στον πίνακα ελέγχου και ξεκινήστε δημιουργώντας μια νέα κάρτα. Επιλέξτε την "Picture Glance".

 <robo-wiki-picture src="home-assistant/glance.jpg" />

Συμπληρώστε τα δεδομένα:
- Title - επιλέξτε τον τίτλο της εικόνας της κάμερας
- Camera Entity - επιλέξτε μια οντότητα κάμερας από τη λίστα
- Camera View - επιλέξτε "live" για να έχετε λιγότερη καθυστέρηση

Στη συνέχεια, μεταβείτε στη λειτοργία "Code Editor" πατώντας το κουμπί στην κάτω αριστερή πλευρά. Θα δείτε τον παρακάτω κώδικα:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Αντικαταστήστε το περιεχόμενο του `entities: []` σύμφωνα με το παράδειγμα παρακάτω (`<YOUR_CAMERA_ENTITY>` είναι το ίδιο με την παράμετρο `camera_image`):

<code-helper copy>

```
entities:
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Left
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Up
    icon: 'mdi:arrow-up'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Down
    icon: 'mdi:arrow-down'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Right
    icon: 'mdi:arrow-right'
    show_icon: true
```

</code-helper>

Αυτά είναι όλα. Τώρα θα πρέπει να δείτε την κάρτα της κάμερας PTZ στον πίνακα ελέγχου μαζί με τα κουμπιά ελέγχου.

## Επίλυση Προβλημάτων
Εάν χρησιμοποιείτε το Home Assistant Core και δεν βλέπετε μια ροή από την κάμερα, θα πρέπει να εγκαταστήσετε τις ενσωματώσεις "stream" και "FFMPEG". 
Για να το κάνετε αυτό, πρέπει να προσθέσετε τις συμβολοσειρές `stream: ` και `ffmpeg: ` στο τέλος του configuration.yaml.