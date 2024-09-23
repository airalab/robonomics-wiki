---
title: Telecomando IR
contributors: [nakata5321]
---
Questo articolo ti mostrerà il processo di configurazione del telecomando IR.

{% roboWikiNote {type: "warning"}%} Tutti i dispositivi di Robonomics possono essere acquistati sul sito ufficiale [website](https://robonomics.network/devices/).{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmUpSdy3oQbU7dx59sE3MMdL1kr6E2TKsPA5kmFeKHTgF4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Passo 1 — Flashing {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Tutti i dispositivi di Robonomics vengono pre-flashati direttamente dalla confezione. Tuttavia, poiché tutti i dispositivi sono kit di sviluppo, le istruzioni copriranno l'opzione di flashare il dispositivo da zero. Se non desideri farlo ora, procedi al [**Passo 2 - Access Point**](/docs/ir-controller/#step2). {% endroboWikiNote %}

Prendi il dispositivo dalla confezione e collegalo al computer. Quindi vai al sito web [webflasher.robonomics.network](https://webflasher.robonomics.network/). Questo è il web flasher.

{% roboWikiVideo {videos:[{src: 'QmT6CDmmF8yahM1WTCwmAZBcrYUh6xxXpmvuboiYe42rEQ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Nota! Il web flasher funziona solo con il browser Google Chrome o Microsoft Edge. {% endroboWikiNote %}

Nel menu a discesa "Firmware" scegli l'opzione **"IR REMOTE"** e successivamente in "SELECT CHIP" seleziona **"ESP32"**. Premi il pulsante **"CONNECT"**.
Verrà visualizzata una finestra popup in cui dovrai selezionare la porta seriale a cui è collegato il dispositivo (solitamente è `/ttyUSB0`). Quindi scegli **"INSTALL IR-REMOTE_EN"**.
Nella finestra successiva, puoi effettuare una **CLEAR INSTALLATION** spuntando **ERASE DEVICE**. Premi Avanti e poi Installa. Attendi che il firmware venga caricato sul controller IR.

Dopo aver completato il processo di installazione, verrà visualizzata una finestra popup di configurazione Wi-Fi. Avrai le seguenti opzioni:

1) Puoi fornire le credenziali Wi-Fi, saltare il **Passo 2 - Access Point** e passare a [**Passo 3 - Configurazione**](/docs/ir-controller/#step3).

{% roboWikiVideo {videos:[{src: 'QmVbCvncuEZFVDpxnpD3VyE4LCx8TN6xKCVs4MkrJGhGDx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Dopo aver configurato il Wi-Fi, puoi visitare il dispositivo tramite il pulsante **VISIT DEVICE**. Successivamente, puoi visitare il dispositivo tramite il suo indirizzo IP nella rete. Per trovarlo, puoi utilizzare l'app mobile [Fing](https://www.fing.com/products) o
lo strumento CLI [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

2) Oppure scollega il dispositivo dal computer e collegalo all'alimentazione. Il telecomando IR si avvierà e creerà un hotspot Wi-Fi. Per connettere il telecomando IR alla rete Wi-Fi domestica tramite un hotspot, segui le istruzioni nel Passo 2.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Passo 2 — Access Point {% endroboWikiTitle %}

Se prendi il telecomando IR dalla confezione e lo colleghi all'alimentazione, creerà un hotspot con il nome "tasmota-XXXXXXX". Connettiti ad esso. Dovrebbe aprirsi una finestra di configurazione. Se non si apre, apri il browser web e vai alla pagina `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Fornisci le credenziali Wi-Fi. Dopo di che, il telecomando IR si connetterà alla rete Wi-Fi. Verifica il dispositivo tramite il suo indirizzo IP nella rete. Per trovarlo, puoi utilizzare l'app mobile [Fing](https://www.fing.com/products) o
lo strumento CLI [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Passo 3 — Configurazione {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Vai a **"Configuration"**->**"Configure other"**. Nella stringa **"Template"** inserisci quanto segue:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics IR remote","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Verifica che le caselle di controllo **"Activate"** e **"MQTT Enable"** siano abilitate. Se non lo sono, abilitali e premi il pulsante Salva.

Torna al **"Menu principale"** e vai a **"Configuration"** -> **"Configure MQTT"**.
Fornisci qui le tue credenziali MQTT:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

Per ora è tutto con ESP. Il prossimo passo è installare l'integrazione con Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Passo 4 — Configurazione dell'Integrazione {% endroboWikiTitle %}

Questo articolo presuppone che tu abbia Home Assistant e HACS. Vai su HACS e aggiungi un repository personalizzato.

{% roboWikiVideo {videos:[{src: 'QmSqvGpq5q9tHUsi45VkycQamR2o2hoDcyAgiz2dp279eF', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Per farlo, premi sui tre puntini nell'angolo in alto a destra, scegli **CUSTOM REPOSITORIES**
e inserisci questo URL: `https://github.com/hristo-atanasov/Tasmota-IRHVAC`. in Categoria scegli "Integration". Successivamente, trovalo nella ricerca e installalo. Non dimenticare di riavviare Home Assistant dopo averlo fatto.

Apri i log del telecomando IR. Per farlo, vai all'URL locale corretto, oppure apri nuovamente [webflasher.robonomics.network](https://webflasher.robonomics.network/) e scegli "Tasmota IR" e "ESP32". Premi "Connect" e scegli la porta.
Premi **VISIT DEVICE**, e vedrai la pagina principale del dispositivo. Vai su "Console" -> "console".

Punta il tuo telecomando IR (ad esempio, da un condizionatore d'aria) al Robonomics IR Remote e premi i pulsanti sul telecomando. Vedrai il seguente log nella console:
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Protocol":"MITSUBISHI112","Bits":112,"Data":"0x23CB260100A003060D00000000CB","Repeat":0,"IRHVAC":{"Vendor":"MITSUBISHI112","Model":-1,"Mode":"Cool","Power":"Off","Celsius":"On","Temp":25,"FanSpeed":"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":"Off","Filter":"Off","Clean":"Off","Beep":"Off","Sleep":-1}}}
```
Hai bisogno delle informazioni dal topic `IRHVAC`.

Apri il file `configuration.yaml` della tua istanza di Home Assistant e inserisci quanto segue:

{% codeHelper { copy: true}%}

```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Some Name Here>"
    command_topic: "cmnd/<your_tasmota_device>/irhvac"
    # Scegli una delle seguenti opzioni:
    # Lo stato viene aggiornato quando il dispositivo tasmota riceve un segnale IR (include la propria trasmissione e il telecomando originale)
    # utile quando un telecomando normale è in uso insieme al dispositivo tasmota, potrebbe essere meno affidabile della seconda opzione.
    state_topic: "tele/<your_tasmota_device>/RESULT"
    # Lo stato viene aggiornato quando il dispositivo tasmota completa la trasmissione IR, dovrebbe essere piuttosto affidabile.
    #state_topic: "stat/<your_tasmota_device>```>/RISULTATO"
    # Rimuovi il commento se il 'topic disponibile' del dispositivo IR Tasmota è diverso (se il dispositivo in HA è disabilitato)
    #availability_topic: "tele/<your_tasmota_device>/LWT"
    temperature_sensor: <sensore di temperatura in stanza> - # necessario per misurare la temperatura in una stanza. es. sensor.kitchen_temperature
    humidity_sensor: None #opzionale - predefinito Nessuno (es. sensor.kitchen_humidity)
    power_sensor: None #opzionale - predefinito Nessuno (es. binary_sensor.kitchen_ac_power)
    vendor: "<Il tuo fornitore qui>" #trova il tuo fornitore nei log.
    min_temp: 16 #opzionale - predefinito 16 valore int
    max_temp: 32 #opzionale - predefinito 32 valore int
    target_temp: 26 #opzionale - predefinito 26 valore int
    initial_operation_mode: "off" # opzionale - predefinito "off" valore stringa (uno dei "supported_modes")
    away_temp: 24 #opzionale - predefinito 24 valore int
    precision: 1 #opzionale - predefinito 1 valore int o float. Può essere impostato su 1, 0.5 o 0.1
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only" # Usa "fan_only" anche se Tasmota mostra "Mode":"Fan"
      - "auto"
      - "off" #Spegni il condizionatore d'aria - Deve essere tra virgolette
      # Alcuni dispositivi hanno "auto" e "fan_only" invertiti
      # Se le due righe seguenti sono decommentate, "auto" e "fan" dovrebbero essere commentati
      #- "auto_fan_only" #se il telecomando mostra il ventilatore ma Tasmota dice auto
      #- "fan_only_auto" #se il telecomando mostra auto ma Tasmota dice ventilatore
    supported_fan_speeds:
      # Alcuni dispositivi dicono max, ma è alto, e auto che è il massimo
      # Se decommenti le due seguenti, devi commentare alto e max
      # - "auto_max" #diventerebbe max
      # - "max_high" #diventerebbe alto
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
      - "vertical" #da su a giù
      # - "horizontal" # Da sinistra a destra
      # - "both"
    default_quiet_mode: "Off" #opzionale - predefinito "Off" valore stringa
    default_turbo_mode: "Off" #opzionale - predefinito "Off" valore stringa
    default_econo_mode: "Off" #opzionale - predefinito "Off" valore stringa
    hvac_model: "-1" #opzionale - predefinito "1" valore stringa
    celsius_mode: "On" #opzionale - predefinito "On" valore stringa
    default_light_mode: "Off" #opzionale - predefinito "Off" valore stringa
    default_filter_mode: "Off" #opzionale - predefinito "Off" valore stringa
    default_clean_mode: "Off" #opzionale - predefinito "Off" valore stringa
    default_beep_mode: "Off" #opzionale - predefinito "Off" valore stringa
    default_sleep_mode: "-1" #opzionale - predefinito "-1" valore stringa
    default_swingv: "high" #opzionale - predefinito "" valore stringa
    default_swingh: "left" #opzionale - predefinito "" valore stringa
    keep_mode_when_off: True #opzionale - predefinito False valore booleano: Deve essere True per MITSUBISHI_AC, ECOCLIM, ecc.
    toggle_list: #opzionale - predefinito []
      # La proprietà toggled è un'impostazione che non mantiene lo stato di accensione.
      # Imposta questo se le proprietà del tuo condizionatore d'aria sono una funzione di toggle.
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

Modifica tutte le dichiarazioni necessarie nella parte inserita con i valori dal messaggio della console. Di conseguenza, una parte del tuo file di configurazione dovrebbe assomigliare a questo
(ad esempio, la dichiarazione non utilizzata è stata eliminata):
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "controllo clima bangkok"
    unique_id : "clima di prova bangkok"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #opzionale - predefinito 16 valore int
    max_temp: 31 #opzionale - predefinito 32 valore int
    target_temp: 25 #opzionale - predefinito 26 valore int
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # Usa "fan_only" anche se Tasmota mostra "Mode":"Fan"
      - "auto"
      - "off" #Spegni il condizionatore d'aria - Deve essere tra virgolette
      # Alcuni dispositivi hanno "auto" e "fan_only" invertiti
      # Se le due righe seguenti sono decommentate, "auto" e "fan" dovrebbero essere commentati
      #- "auto_fan_only" #se il telecomando mostra il ventilatore ma Tasmota dice auto
      #- "fan_only_auto" #se il telecomando mostra auto ma Tasmota dice ventilatore
    supported_fan_speeds:
      # Alcuni dispositivi dicono max, ma è alto, e auto che è il massimo
      # Se decommenti le due seguenti, devi commentare alto e max
      # - "auto_max" #diventerebbe max
      # - "max_high" #diventerebbe alto
      - "low"
      - "medium"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #da su a giù

    hvac_model: "-1" #opzionale - predefinito "1" valore stringa

    keep_mode_when_off: True #opzionale - predefinito False valore booleano: Deve essere True per MITSUBISHI_AC, ECOCLIM, ecc.

```

Salva `configuration.yaml` e riavvia Home Assistant.
Dopo il riavvio, puoi aggiungere nella UI una nuova scheda termostato e selezionare il dispositivo appena integrato.

{% roboWikiPicture {src:"docs/ir-controller/thermo.jpg", alt:"thermo"} %}{% endroboWikiPicture %}

Se hai problemi con la modalità GUI, passa alla "CODE EDITOR" e scrivi quanto segue:
```
type: thermostat
entity: climate.<nome del tuo clima>
```

{% roboWikiNote { type: "warning"}%} Tutti i dispositivi di Robonomics possono essere acquistati sul sito ufficiale [website](https://robonomics.network/devices/).{% endroboWikiNote %}