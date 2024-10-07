---
title: Collegare un dispositivo Amazon FreeRTOS a Robonomics tramite MQTT

contributors: [khssnv]
---

Ecco la dimostrazione di come un microcontrollore in esecuzione su [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) possa essere collegato alla rete Robonomics tramite MQTT. Si prega di controllare [questo repository](http://github.com/khssnv/freertos_mqtt_robonomics_example) per il codice sorgente del progetto.

Utilizziamo [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) con distribuzione FreeRTOS e implementazione MQTT fornita da [Espressif IoT Development Framework](https://github.com/espressif/esp-idf) mentre Espressif è un fornitore del microcontrollore utilizzato.

Inoltre c'è un sensore [PMS-3003](http://www.plantower.com/en/content/?107.html) a scopo dimostrativo. Il sensore misura la presenza di particelle nell'aria e può essere utilizzato per stimare la qualità dell'aria.

La qualità dell'aria non è l'argomento dell'articolo, è possibile trovare ulteriori informazioni a riguardo sul sito web dell'OMS: [Inquinamento dell'aria ambientale (all'aperto)](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). L'obiettivo del sistema è pubblicare le misurazioni del sensore sulla rete Robonomics di Airalab.

## Configurazione hardware

Colleghiamo il PIN5 TXD del PMS3003 al pin IO17 dell'ESP32 DevKitC per trasferire le misurazioni tramite UART.
Entrambi i dispositivi richiedono anche alimentazione e massa comune.

{% roboWikiPicture {src:"docs/freertos-mqtt/wiring.png", alt:"Diagramma di cablaggio"} %}{% endroboWikiPicture %}

## Flusso dei dati

Per inviare le misurazioni del sensore alla rete Robonomics, a livello di firmware il nostro obiettivo è ottenere i dati da un sensore tramite il protocollo di comunicazione integrato che supporta (UART nel nostro caso) e passarli a un'istanza AIRA tramite MQTT / TCP.

{% roboWikiPicture {src:"docs/freertos-mqtt/send.svg", alt:"Invio"} %}{% endroboWikiPicture %}

Nel nostro esempio utilizziamo il deployment cloud di AIRA disponibile tramite indirizzo IP pubblico e nome di dominio assegnato.
Sull'istanza AIRA configuriamo il broker MQTT `mosquitto` e ci iscriviamo a `/freertos_mqtt_robonomics_example/98:F4`:AB:72:23:C4` argomento per ricevere messaggi da MQTT.

Successivamente passiamo i messaggi al writer `robonomics io` tramite pipe.

{% roboWikiPicture {src:"docs/freertos-mqtt/recv.svg", alt:"Ricezione"} %}{% endroboWikiPicture %}

Ora i dati sono disponibili nella rete Robonomics e possiamo leggerli di nuovo con `robonomics io`.

## Firmware

Utilizziamo [l'applicazione di esempio ESP-MQTT con trasporto TCP](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) come base.

Modifichiamo solo `main/app_main.c` per la connessione UART al sensore, la sincronizzazione dell'ora SNTP e la routine periodica di pubblicazione MQTT.

Se stai cercando di ripetere il progetto e è il tuo primo progetto basato su ESP IDF, ti preghiamo di seguire prima la [guida alla programmazione ESP-IDF di Espressif](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step) per familiarizzare con le operazioni del firmware come configurazione, compilazione e caricamento con lo strumento `idf.py`.

### Configurazione Wi-Fi

Per comunicare con l'istanza AIRA implementata nel cloud, il nostro microcontrollore richiede una connessione Internet.
Utilizziamo il Wi-Fi dell'ESP32 per questo.
Espressif fornisce utilità per configurare il Wi-Fi integrato.
Nel nostro esempio utilizziamo un ambiente di sviluppo con Ubuntu 20.04 GNU/Linux.
Per configurare il Wi-Fi andiamo alla cartella del progetto ed eseguiamo lo strumento di configurazione SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Successivamente impostiamo il nome SSID e la password dell'access point Wi-Fi nella sezione `Example Connection Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-wi-fi.png", alt:"Menuconfig Wi-Fi"} %}{% endroboWikiPicture %}

### Configurazione Endpoint MQTT

Ci sono due cose da configurare per MQTT.
La prima è l'indirizzo del broker MQTT.
È configurabile con lo strumento di configurazione SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Imposta l'`URL del broker` nella sezione `Example Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-mqtt.png", alt:"Menuconfig MQTT"} %}{% endroboWikiPicture %}

La seconda cosa è un argomento MQTT..
Lo impostiamo nel firmware con il prefisso del nome del progetto seguito dal nostro indirizzo MAC ESP32.
Ci restituisce `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` per il nostro particolare microchip.

## Da MQTT a Robonomics

Inizialmente verifichiamo se riceviamo dati tramite MQTT.
Possiamo iscriverci al topic del nostro broker MQTT Mosquitto a cui il dispositivo pubblica.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Qui portiamo il pacchetto `mosquitto` nel nostro ambiente per utilizzare l'utilità `mosquitto_sub`.
Poi ci iscriviamo al topic impostato nel firmware.
Abbiamo ricevuto le nostre misurazioni, il che significa che AIRA riceve correttamente i dati tramite MQTT.
Ora inoltriamo questi messaggi alla Rete Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Qui utilizziamo l'utilità `robonomics` per pubblicare messaggi nel canale pubsub `/freertos_mqtt_robonomics_example`.
Specifichiamo `bootnodes` per garantire che almeno una connessione venga stabilita.

Ora leggiamo questi messaggi dallo stesso canale pubsub.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  Nuovo peer connesso: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Collegamento mesh aggiunto per il peer: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") nel topic: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Risorse Originali Utilizzate

* Schema dei pin ESP32 DevKitC dal blog di GoJimmy https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* Struttura dati e decodificatore PSM3003 da OpenAirProject https://github.com/openairproject/sensor-esp32

**Grazie a tutti!**