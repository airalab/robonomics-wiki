---
title: Monitoraggio dell'Energia
contributors: [nakata5321]
---
Questo articolo ti mostrerà il processo di configurazione del Monitoraggio dell'Energia.

{% roboWikiNote {type: "warning"}%} Tutti i dispositivi di Robonomics possono essere acquistati sul sito ufficiale [website](https://robonomics.network/devices/).
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Passo 1 — Flashing {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Tutti i dispositivi di Robonomics vengono pre-flashati direttamente dalla confezione. Tuttavia, poiché tutti i dispositivi sono kit di sviluppo, le istruzioni copriranno l'opzione di flashare il dispositivo da zero. Se non desideri farlo ora, procedi al [**Passo 2 - Access Point**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

Prendi il dispositivo dalla confezione e collegalo al computer. Quindi vai al sito web [webflasher.robonomics.network](https://webflasher.robonomics.network/). Questo è il web flasher.

{% roboWikiVideo {videos:[{src: 'QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Nota! Il web flasher funziona solo con il browser Google Chrome o Microsoft Edge.
{% endroboWikiNote %}

Nel menu a discesa "Firmware" scegli l'opzione **"ENERGY MONITOR"** e successivamente nel menu a discesa "SELECT CHIP" seleziona **"ESP32-S3"**. Premi il pulsante **"CONNECT"**.
Comparirà una finestra popup in cui dovrai selezionare la porta seriale a cui il dispositivo è collegato (di solito è `/ttyUSB0`). Quindi scegli **"INSTALL ENERGY-MONITOR_EN"**.
Nella finestra successiva, puoi effettuare una **CLEAR INSTALLATION** spuntando **ERASE DEVICE**. Premi Avanti e poi Installa. Attendi che il firmware venga caricato sul dispositivo di Monitoraggio dell'Energia.

Dopo aver completato il processo di installazione, comparirà una finestra popup di configurazione Wi-Fi. Fornisci le credenziali Wi-Fi.

Dopo aver configurato il Wi-Fi, puoi visitare il dispositivo tramite il pulsante **VISIT DEVICE**. In seguito, puoi visitare il dispositivo tramite il suo indirizzo IP nella rete. Per trovarlo, puoi utilizzare l'app mobile [Fing](https://www.fing.com/products) o il
strumento CLI [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Salta il **Passo 2 — Access Point** e vai al [**Passo 3 — Configurazione**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Passo 2 — Access Point {% endroboWikiTitle %}

Se prendi il monitoraggio dell'energia dalla confezione e lo colleghi all'alimentazione, creerà un hotspot con il nome "robonomics-XXXXXXX". Connettiti ad esso. Dovrebbe aprirsi una finestra di configurazione. Se non si apre, apri il browser web e vai alla pagina `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Fornisci le credenziali Wi-Fi. Dopo di che, il dispositivo di Monitoraggio dell'Energia si connetterà alla rete Wi-Fi. Controlla il dispositivo tramite il suo indirizzo IP nella rete. Per trovarlo, puoi utilizzare l'app mobile [Fing](https://www.fing.com/products) o lo
strumento CLI [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Passo 3 — Configurazione {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Vai su **"Configuration"**->**"Configure other"**. Nella stringa **"Template"** inserisci quanto segue:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```

{% endcodeHelper %}

Verifica che le caselle di controllo **"Activate"** e **"MQTT Enable"** siano abilitate. Se non lo sono, abilitali e premi il pulsante Salva.

Torna al "menu principale" e vai su **"Configuration"** -> **"Configure MQTT"**.
Fornisci qui le tue credenziali MQTT:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

Questo è tutto per ESP per ora. Il prossimo passo è installare l'integrazione con Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Passo 4 — Configurazione dell'Integrazione {% endroboWikiTitle %}

Questo articolo presume che tu abbia Home Assistant. Per collegare il dispositivo di Monitoraggio dell'Energia a Home Assistant, è necessario installare l'integrazione "Tasmota".

{% roboWikiVideo {videos:[{src: 'QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

In sostanza, Home Assistant scoprirà automaticamente l'integrazione "Tasmota". Ma se non lo fa, aggiungila manualmente.

{% roboWikiPicture {src:"docs/energymeter/HA.jpg", alt:"energymeter-ha"} %}{% endroboWikiPicture %}

Questo è tutto. Ora puoi aggiungere le entità energetiche al cruscotto.

{% roboWikiNote {type: "warning"}%} Tutti i dispositivi di Robonomics possono essere acquistati sul sito ufficiale [website](https://robonomics.network/devices/).
{% endroboWikiNote %}