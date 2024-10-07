---
title: Τηλεχειριστήριο IR
contributors: [nakata5321]
---
Αυτό το άρθρο θα σας δείξει τη διαδικασία ρύθμισης του τηλεχειριστηρίου IR.

{% roboWikiNote {type: "warning"}%} Όλες οι συσκευές από τη Robonomics μπορούν να αγοραστούν από την επίσημη [ιστοσελίδα](https://robonomics.network/devices/).{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmUpSdy3oQbU7dx59sE3MMdL1kr6E2TKsPA5kmFeKHTgF4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Βήμα 1 — Φλασάρισμα {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Όλες οι συσκευές από τη Robonomics έρχονται προ-φλασαρισμένες. Ωστόσο, επειδή όλες οι συσκευές είναι κιτ ανάπτυξης, οι οδηγίες θα καλύψουν την επιλογή φλασαρίσματος της συσκευής από την αρχή. Αν δεν επιθυμείτε να το κάνετε τώρα, προχωρήστε στο [**Βήμα 2 - Σημείο Πρόσβασης**](/docs/ir-controller/#step2). {% endroboWikiNote %}

Πάρτε τη συσκευή από το κουτί και συνδέστε τη στον υπολογιστή. Στη συνέχεια, μεταβείτε στην ιστοσελίδα [webflasher.robonomics.network](https://webflasher.robonomics.network/). Αυτός είναι ο ιστός φλασαρίσματος.

{% roboWikiVideo {videos:[{src: 'QmT6CDmmF8yahM1WTCwmAZBcrYUh6xxXpmvuboiYe42rEQ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Σημείωση! Ο ιστός φλασαρίσματος λειτουργεί μόνο με τον περιηγητή Google Chrome ή Microsoft Edge. {% endroboWikiNote %}

Στο αναπτυσσόμενο μενού "Firmware" επιλέξτε την επιλογή **"IR REMOTE"** και στη συνέχεια στο "SELECT CHIP" επιλέξτε **"ESP32"**. Πατήστε το κουμπί **"CONNECT"**.
Θα εμφανιστεί ένα παράθυρο όπου θα πρέπει να επιλέξετε τη σειριακή θύρα στην οποία είναι συνδεδεμένη η συσκευή (συνήθως είναι `/ttyUSB0`). Στη συνέχεια επιλέξτε **"INSTALL IR-REMOTE_EN"**.
Στο επόμενο παράθυρο, μπορείτε να κάνετε **ΚΑΘΑΡΗ ΕΓΚΑΤΑΣΤΑΣΗ** επιλέγοντας **ERASE DEVICE**. Πατήστε Επόμενο και στη συνέχεια Εγκατάσταση. Περιμένετε μέχρι να μεταφορτωθεί το firmware στον IR ελεγκτή.

Μετά την ολοκλήρωση της διαδικασίας εγκατάστασης, θα εμφανιστεί ένα παράθυρο ρύθμισης Wi-Fi. Εκεί έχετε τις επιλογές:

1) Μπορείτε να δώσετε τα διαπιστευτήρια Wi-Fi, παραλείψτε το **Βήμα 2 - Σημείο Πρόσβασης** και πηγαίνετε στο [**Βήμα 3 - Ρύθμιση**](/docs/ir-controller/#step3).

{% roboWikiVideo {videos:[{src: 'QmVbCvncuEZFVDpxnpD3VyE4LCx8TN6xKCVs4MkrJGhGDx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Αφού ρυθμίσετε το Wi-Fi, μπορείτε να επισκεφθείτε τη συσκευή μέσω του κουμπιού **VISIT DEVICE**. Αργότερα μπορείτε να επισκεφθείτε τη συσκευή μέσω της διεύθυνσης IP της στο δίκτυο. Για να τη βρείτε, μπορείτε να χρησιμοποιήσετε την εφαρμογή κινητού [Fing](https://www.fing.com/products) ή το
εργαλείο γραμμής εντολών [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

2) Ή αποσυνδέστε τη συσκευή από τον υπολογιστή και συνδέστε τη στην πηγή τροφοδοσίας. Το IR Remote θα ξεκινήσει και θα δημιουργήσει ένα Wi-Fi hotspot. Για να συνδέσετε το IR Remote στο δίκτυο Wi-Fi του σπιτιού σας μέσω ενός hotspot, ακολουθήστε τις οδηγίες στο Βήμα 2.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Βήμα 2 — Σημείο Πρόσβασης {% endroboWikiTitle %}

Αν πάρετε το IR Remote από το κουτί και το συνδέσετε στην πηγή τροφοδοσίας, θα δημιουργήσει ένα hotspot με το όνομα "tasmota-XXXXXXX". Συνδεθείτε σε αυτό. Θα πρέπει να ανοίξει το παράθυρο ρύθμισης. Αν όχι, ανοίξτε τον περιηγητή και μεταβείτε στη σελίδα `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Δώστε τα διαπιστευτήρια Wi-Fi. Έπειτα το IR Remote θα συνδεθεί στο δίκτυο Wi-Fi. Ελέγξτε τη συσκευή μέσω της διεύθυνσης IP της στο δίκτυο. Για να τη βρείτε, μπορείτε να χρησιμοποιήσετε την εφαρμογή κινητού [Fing](https://www.fing.com/products) ή το
εργαλείο γραμμής εντολών [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Βήμα 3 — Ρύθμιση {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Πηγαίνετε στο **"Configuration"**->**"Configure other"**. Στη συμβολοσειρά **"Template"** εισάγετε το παρακάτω:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics IR remote","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Βεβαιωθείτε ότι τα πλαίσια ελέγχου **"Activate"** και **"MQTT Enable"** είναι ενεργοποιημένα. Αν όχι, ενεργοποιήστε τα και πατήστε το κουμπί Αποθήκευση.

Επιστρέψτε στο **"Main Menu"** και πηγαίνετε στο **"Configuration"** -> **"Configure MQTT"**.
Δώστε τα διαπιστευτήρια MQTT σας εδώ:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

Αυτά είναι όλα με το ESP προς το παρόν. Το επόμενο βήμα είναι να εγκαταστήσετε την ολοκλήρωση με το Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Βήμα 4 — Ρύθμιση Ολοκλήρωσης {% endroboWikiTitle %}

Αυτό το άρθρο υποθέτει ότι έχετε το Home Assistant και το HACS. Πηγαίνετε στο HACS και προσθέστε προσαρμοσμένο αποθετήριο.

{% roboWikiVideo {videos:[{src: 'QmSqvGpq5q9tHUsi45VkycQamR2o2hoDcyAgiz2dp279eF', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Για να το κάνετε αυτό, πατήστε τρεις τελίτσες στην πάνω δεξιά γωνία, επιλέξτε **CUSTOM REPOSITORIES**
και εισάγετε αυτήν τη διεύθυνση URL: `https://github.com/hristo-atanasov/Tasmota-IRHVAC`. Στην κατηγορία επιλέξτε "Integration". Στη συνέχεια βρείτε το στην αναζήτηση και εγκαταστήστε το. Μην ξεχάσετε να επανεκκινήσετε το Home Assistant μετά από αυτό.

Ανοίξτε τα logs του IR remote. Για να το κάνετε αυτό, μεταβείτε στην κατάλληλη τοπική διεύθυνση URL, ή ανοίξτε ξανά την ιστοσελίδα [webflasher.robonomics.network](https://webflasher.robonomics.network/) και επιλέξτε "Tasmota IR" και "ESP32". Πατήστε "Connect" και επιλέξτε θύρα.
Πατήστε **VISIT DEVICE**, και θα δείτε την κύρια σελίδα της συσκευής. Πηγαίνετε στο "Consoles" -> "console".

Στρέψτε το τηλεχειριστήριο υπερύθρων (π.χ. από ένα κλιματιστικό) στο Robonomics IR Remote και πατήστε τα κουμπιά στο τηλεχειριστήριο. Θα λάβετε το επόμενο log στην κονσόλα:
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Πρωτόκολλο":"MITSUBISHI112","Bits":112,"Δεδομένα":"0x23CB260100A0030060"A0030060D :{"Πωλητής":"MITSUBISHI112","Μοντέλο":-1,"Λειτουργία":"Ψυχρός","Λειτουργία":"Απενεργοποίηση","Κελσίου":"Ενεργό","Θερμοκρασία":25,"Ταχύτητα ανεμιστήρα" :"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":" Off", "Filter": "Off", "Clean": "Off", "Beep": "Off", "Sleep":-1}}}
```
Χρειάζεστε πληροφορίες από το θέμα «IRHVAC».

Ανοίξτε το αρχείο `configuration.yaml` της παρουσίας του Home Assistant και εισαγάγετε τα εξής:

{% codeHelper { copy: true}%}

```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Some Name Here>"
    command_topic: "cmnd/<your_tasmota_device>/irhvac"
    # Pick one of the following:
    # State is updated when the tasmota device receives an IR signal (includes own transmission and original remote)
    # useful when a normal remote is in use alongside the tasmota device, may be less reliable than the second option.
    state_topic: "tele/<your_tasmota_device>/RESULT"
    # State is updated when the tasmota device completes IR transmission, should be pretty reliable.
    #state_topic: "stat/<your_tasmota_device>/RESULT"
    # Uncomment if your 'available topic' of Tasmota IR device are different (if device in HA is disabled)
    #availability_topic: "tele/<your_tasmota_device>/LWT"
    temperature_sensor: <temperature sensor in room> - # required to measure temperature in a room. e.x. sensor.kitchen_temperature
    humidity_sensor: None #optional - default None (e.x. sensor.kitchen_humidity)
    power_sensor: None #optional - default None (e.x. binary_sensor.kitchen_ac_power)
    vendor: "<Your vendor here>" #find your vendor in logs.
    min_temp: 16 #optional - default 16 int value
    max_temp: 32 #optional - default 32 int value
    target_temp: 26 #optional - default 26 int value
    initial_operation_mode: "off" # optional - default "off" string value (one of the "supported_modes")
    away_temp: 24 #optional - default 24 int value
    precision: 1 #optional - default 1 int or float value. Can be set to 1, 0.5 or 0.1
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only" # Use "fan_only" even if Tasmota shows "Mode":"Fan"
      - "auto"
      - "off" #Turns the AC off - Should be in quotes
      # Some devices have "auto" and "fan_only" switched
      # If the following two lines are uncommented, "auto" and "fan" should be commented out
      #- "auto_fan_only" #if remote shows fan but tasmota says auto
      #- "fan_only_auto" #if remote shows auto but tasmota says fan
    supported_fan_speeds:
      # Some devices say max,but it is high, and auto which is max
      # If you uncomment the following two, you have to comment high and max
      # - "auto_max" #woud become max
      # - "max_high" #would become high
      #- "on"
      #- "off"
      #- "low"
      - "medium"
      - "high"
      #- "middle"
      #- "focus"
      #- "diffuse"
      - "min"
      - "max"
      #- "auto"
    supported_swing_list:
      - "off"
      - "vertical" #up to down
      # - "horizontal" # Left to right
      # - "both"
    default_quiet_mode: "Off" #optional - default "Off" string value
    default_turbo_mode: "Off" #optional - default "Off" string value
    default_econo_mode: "Off" #optional - default "Off" string value
    hvac_model: "-1" #optional - default "1" string value
    celsius_mode: "On" #optional - default "On" string value
    default_light_mode: "Off" #optional - default "Off" string value
    default_filter_mode: "Off" #optional - default "Off" string value
    default_clean_mode: "Off" #optional - default "Off" string value
    default_beep_mode: "Off" #optional - default "Off" string value
    default_sleep_mode: "-1" #optional - default "-1" string value
    default_swingv: "high" #optional - default "" string value
    default_swingh: "left" #optional - default "" string value
    keep_mode_when_off: True #optional - default False boolean value : Must be True for MITSUBISHI_AC, ECOCLIM, etc.
    toggle_list: #optional - default []
      # The toggled property is a setting that does not retain the On state.
      # Set this if your AC properties are toggle function.
      #- Beep
      #- Clean
      #- Econo
      #- Filter
      #- Light
      #- Quiet
      #- Sleep
      #- SwingH
      #- SwingV
      #- Turbo
```

{% endcodeHelper %}

Αλλάξτε όλες τις απαραίτητες δηλώσεις στο εισαγόμενο τμήμα με τιμές από το μήνυμα κονσόλας. Ως αποτέλεσμα, το τμήμα του αρχείου διαμόρφωσής σας θα πρέπει να μοιάζει με αυτό
(στο παράδειγμα διαγράφηκε μια μη χρησιμοποιούμενη δήλωση):
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "έλεγχος κλίματος Μπανγκόκ"
    unique_id : "δοκιμή κλίματος Μπανγκόκ"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #προαιρετικό - προεπιλογή 16 ακέραια τιμή
    max_temp: 31 #προαιρετικό - προεπιλογή 32 ακέραια τιμή
    target_temp: 25 #προαιρετικό - προεπιλογή 26 ακέραια τιμή
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # Χρησιμοποιήστε "fan_only" ακόμα κι αν η Tasmota δείχνει "Mode":"Fan"
      - "auto"
      - "off" #Απενεργοποιεί τον κλιματιστικό - Πρέπει να είναι σε εισαγωγικά
      # Κάποιες συσκευές έχουν τα "auto" και "fan_only" αντιστραμμένα
      # Αν οι παρακάτω δύο γραμμές είναι σχολιασμένες, το "auto" και το "fan" πρέπει να είναι σχολιασμένα
      #- "auto_fan_only" #αν ο τηλεχειριστήριο δείχνει ανεμιστήρα αλλά η Tasmota λέει auto
      #- "fan_only_auto" #αν ο τηλεχειριστήριο δείχνει auto αλλά η Tasmota λέει ανεμιστήρας
    supported_fan_speeds:
      # Κάποιες συσκευές λένε max, αλλά είναι υψηλή, και το auto είναι max
      # Αν κάνετε σχόλιο τις παρακάτω δύο, πρέπει να κάνετε σχόλιο το high και το max
      # - "auto_max" #θα γίνει max
      # - "max_high" #θα γίνει high
      - "low"
      - "medium"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #από πάνω προς τα κάτω

    hvac_model: "-1" #προαιρετικό - προεπιλογή "1" τιμή συμβολοσειράς

    keep_mode_when_off: True #προαιρετικό - προεπιλογή False τιμή boolean: Πρέπει να είναι True για MITSUBISHI_AC, ECOCLIM, κλπ.

```

Αποθηκεύστε το `configuration.yaml` και επανεκκινήστε το Home Assistant.
Μετά την επανεκκίνηση, μπορείτε να προσθέσετε στο UI ένα νέο κάρτερ θερμοστάτη και να επιλέξετε τη νεοενταγμένη συσκευή.

{% roboWikiPicture {src:"docs/ir-controller/thermo.jpg", alt:"thermo"} %}{% endroboWikiPicture %}

Αν αντιμετωπίζετε πρόβλημα με τη λειτουργία GUI, μεταβείτε στο "CODE EDITOR" και γράψτε το επόμενο:
```
type: thermostat
entity: climate.<το όνομα του κλίματος σας>
```

{% roboWikiNote { type: "warning"}%} Όλες οι συσκευές από τη Robonomics μπορούν να αγοραστούν από την επίσημη [ιστοσελίδα](https://robonomics.network/devices/).{% endroboWikiNote %}