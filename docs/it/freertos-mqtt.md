---
title: Collega un dispositivo Amazon FreeRTOS a Robonomics tramite MQTT

contributors: [khssnv]
---

Ecco la dimostrazione di come un microcontrollore che esegue [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) può essere collegato alla rete Robonomics tramite MQTT. Si prega di controllare [questo repository](http://github.com/khssnv/freertos_mqtt_robonomics_example) per il codice sorgente del progetto.

Utilizziamo [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) con distribuzione FreeRTOS e implementazione MQTT fornita da [Espressif IoT Development Framework](https://github.com/espressif/esp-idf) mentre Espressif è un fornitore del microcontrollore utilizzato.

Inoltre, c'è un sensore [PMS-3003](http://www.plantower.com/en/content/?107.html) a scopo dimostrativo. Il sensore misura la presenza di particolato nell'aria e può essere utilizzato per stimare la qualità dell'aria.

La qualità dell'aria non è un argomento dell'articolo, è possibile trovare ulteriori informazioni al sito web dell'OMS: [Inquinamento atmosferico ambientale (all'aperto)](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). L'obiettivo del sistema è pubblicare le misurazioni del sensore sulla rete Robonomics di Airalab.

## Configurazione hardware

Colleghiamo il PIN5 TXD di PMS3003 a ESP32 DevKitC IO17 per trasferire le misurazioni tramite UART.
Entrambi i dispositivi richiedono anche alimentazione e massa comune.

![Wiring Diagram](../images/freertos-mqtt/wiring.png)

## Flusso dei dati

Al fine di inviare le misurazioni del sensore alla rete Robonomics, a livello di firmware il nostro obiettivo è ottenere i dati da un sensore tramite il protocollo di comunicazione integrato che supporta (UART nel nostro caso) e passarli a un'istanza AIRA tramite MQTT / TCP.

![Sending](../images/freertos-mqtt/send.svg)

Nel nostro esempio utilizziamo l'implementazione cloud di AIRA disponibile tramite indirizzo IP pubblico e nome di dominio assegnato.
Nell'istanza AIRA configuriamo il broker MQTT `mosquitto` e ci iscriviamo al topic `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` per ricevere messaggi da MQTT.

Quindi passiamo i messaggi al writer `robonomics io` tramite pipe.

![Receiving](../images/freertos-mqtt/recv.svg)

Ora i dati sono disponibili nella rete Robonomics e possiamo leggerli nuovamente con `robonomics io`.

## Firmware

Utilizziamo l'applicazione di esempio [ESP-MQTT con trasporto TCP](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) come base.

Modifichiamo solo `main/app_main.c` per la connessione UART al sensore, la sincronizzazione dell'ora SNTP e la routine periodica di pubblicazione MQTT.

Se stai cercando di ripetere il progetto e si tratta del tuo primo progetto basato su ESP IDF, ti preghiamo di seguire prima la guida di programmazione ESP-IDF di Espressif's ESP-IDF](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step) per familiarizzare con le operazioni del firmware come configurazione, compilazione e caricamento con lo strumento `idf.py`.

### Configurazione Wi-Fi

Al fine di comunicare con l'istanza AIRA distribuita nel cloud, il nostro microcontrollore richiede una connessione Internet.
Utilizziamo il Wi-Fi di ESP32 per questo.
Espressif fornisce strumenti per configurare il Wi-Fi integrato.
Nel nostro esempio utilizziamo un ambiente di sviluppo con Ubuntu 20.04 GNU/Linux.
Per configurare il Wi-Fi andiamo nella cartella del progetto e avviamo lo strumento di configurazione SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Quindi impostiamo il nome SSID e la password del punto di accesso Wi-Fi nella sezione `Example Connettiion Configurazione`.

![Menuconfig Wi-Fi](../images/freertos-mqtt/menuconfig-wi-fi.png)

### Configurazione del punto di accesso MQTT

Ci sono due cose da configurare per MQTT.
La prima è l'indirizzo del broker MQTT.
È configurabile con lo strumento di configurazione SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Imposta l'URL del broker nella sezione `Example Configurazione`.

![Menuconfig MQTT](../images/freertos-mqtt/menuconfig-mqtt.png)

La seconda cosa è il topic MQTT.
Lo impostiamo nel firmware con il prefisso del nome del progetto seguito dal nostro indirizzo MAC ESP32.
Ciò ci dà `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` per il nostro particolare microchip.

## Da MQTT a Robonomics

Iniziamo controllando se riceviamo dati tramite MQTT.
Possiamo iscriverci al topic del broker MQTT Mosquitto che il dispositivo pubblica.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Qui portiamo il pacchetto `mosquitto` nel nostro ambiente per utilizzare l'utilità `mosquitto_sub`.
Poi ci iscriviamo all'argomento impostato nel firmware.
Abbiamo ottenuto le nostre misurazioni, il che significa che AIRA riceve correttamente i dati tramite MQTT.
Ora facciamo passare questi messaggi alla rete Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Qui utilizziamo l'utilità `robonomics` per pubblicare messaggi nel canale pubsub `/freertos_mqtt_robonomics_example`.
Specifichiamo `bootnodes` per garantire almeno una connessione stabilita.

Ora stiamo leggendo questi messaggi dallo stesso canale pubsub.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  New peer connected: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Mesh link added for peer: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") in topic: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Risorse originali utilizzate

* Pinout ESP32 DevKitC da GoJimmy's blog https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* Struttura dati e decodificatore PSM3003 da OpenAirProject https://github.com/openairproject/sensor-esp32

**Grazie a tutti!**
