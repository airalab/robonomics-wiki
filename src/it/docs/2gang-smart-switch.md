---
title: Interruttore Smart a 2 Gang
contributors: [nakata5321]
---
Questo articolo ti mostrerà il processo di configurazione dell'Interruttore Smart a 2 Gang.

{% roboWikiNote {type: "warning"}%}Tutti i dispositivi di Robonomics possono essere acquistati sul sito ufficiale [website](https://robonomics.network/devices/).
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmQiq21yPEJbysPgvv35uJmG9rHQqbUSySu8za8BqA1kcZ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Passo 1 — Flashing {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%}Tutti i dispositivi di Robonomics vengono pre-flashati direttamente dalla confezione. Tuttavia, poiché tutti i dispositivi sono kit di sviluppo, le istruzioni copriranno l'opzione di flashare il dispositivo da zero. Se non desideri farlo ora, procedi al [**Passo 2 - Access Point**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

Prendi il dispositivo dalla confezione e collegalo al computer. Quindi vai al sito web [webflasher.robonomics.network](https://webflasher.robonomics.network/). Questo è il web flasher.

{% roboWikiVideo {videos:[{src: 'QQmZ6kYAusdjH3Yq7L9UzorZdfXAa4awD1twp5SB5z57z9R', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Nota! Il web flasher funziona solo con il browser Google Chrome o Microsoft Edge.{% endroboWikiNote %}

Nel menu a discesa "Firmware" scegli l'opzione **"SWS-2G-E-11-23"** e successivamente in "SELECT CHIP" seleziona **"ESP32"**. Premi il pulsante **"CONNECT"**.
Comparirà una finestra popup in cui dovrai selezionare la porta seriale a cui è collegato il dispositivo (solitamente è `/ttyUSB0`). Quindi scegli **"INSTALL SWS-2G-E-11-23"**.
Nella finestra successiva, puoi effettuare una **CLEAR INSTALLATION** spuntando **ERASE DEVICE**. Premi Avanti e poi Installa. Attendi che il firmware venga caricato sul dispositivo Smart switch.

Dopo aver completato il processo di installazione, comparirà una finestra popup di configurazione Wi-Fi. Fornisci le credenziali Wi-Fi.

Dopo aver configurato il Wi-Fi, puoi visitare il dispositivo tramite il pulsante **VISIT DEVICE**. In seguito, puoi visitare il dispositivo tramite il suo indirizzo IP nella rete. Per trovarlo, puoi utilizzare l'app mobile [Fing](https://www.fing.com/products) o
lo strumento CLI [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Salta il **Passo 2 — Access Point** e vai al [**Passo 3 — Configurazione**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Passo 2 — Access Point {% endroboWikiTitle %}

Se prendi l'Interruttore Smart dalla confezione e lo colleghi all'alimentazione, creerà un hotspot con il nome "robonomics-XXXXXXX". Connettiti ad esso.
Dovrebbe aprirsi una finestra di configurazione. Se non si apre, apri un browser web e vai alla pagina `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"image"} %}{% endroboWikiPicture %}

Fornisci le credenziali Wi-Fi. Dopo di che, il dispositivo Smart switch si connetterà alla rete Wi-Fi. Controlla il dispositivo tramite il suo indirizzo IP nella rete. Per trovarlo, puoi utilizzare l'app mobile [Fing](https://www.fing.com/products) o
lo strumento CLI [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Passo 3 — Configurazione {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

Vai su **"Configurazione"**->**"Configura altro"**. Nella stringa **"Template"** inserisci quanto segue:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-2L-Switch","GPIO":[1,1,1,1,1,1,1,1,1,576,1,1,1,1,3200,5440,0,224,225,0,0,320,1,321,0,0,0,0,33,1,32,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Verifica che le caselle di controllo **"Activate"** e **"MQTT Enable"** siano abilitate. Se non lo sono, abilitali e premi il pulsante Salva.

Torna al menu principale e vai su **"Configurazione"** -> **"Configura MQTT"**.
Fornisci qui le tue credenziali MQTT:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"image"} %}{% endroboWikiPicture %}

Per ora è tutto con ESP. Il prossimo passo è installare l'integrazione con Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Passo 4 — Configurazione dell'integrazione {% endroboWikiTitle %}

Questo articolo presume che tu abbia Home Assistant. Per collegare il dispositivo Smart Switch a Home Assistant, è necessario installare l'integrazione Tasmota.

{% roboWikiVideo {videos:[{src: 'QmXLSLSFJKrrEtQXVQbpeFAvsKFSgW15J9ZFaSH1pteMXR', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

In sostanza, Home Assistant scoprirà automaticamente l'integrazione Tasmota. Ma se non lo fa, aggiungila manualmente.
Questo è tutto. Ora puoi aggiungere l'entità dell'interruttore al pannello di controllo.

{% roboWikiNote {type: "warning"}%}Tutti i dispositivi di Robonomics possono essere acquistati sul sito ufficiale [website](https://robonomics.network/devices/).
{% endroboWikiNote %}