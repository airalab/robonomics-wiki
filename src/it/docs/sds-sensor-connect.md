---
title: Come Collegare il Sensore SDS011

contributors: [tubleronchik]
---

**Ecco una guida passo passo su come collegare il tuo sensore alla Rete dei Sensori Robonomics e all'Assistente Domestico. I nostri sensori utilizzano il firmware Robonomics, che è una versione migliorata del firmware sensor.community. Include sensori aggiuntivi e ha un meccanismo di invio dati modificato.**

{% roboWikiNote {type: "warning"}%} Tutti i dispositivi di Robonomics possono essere acquistati sul sito ufficiale [website](https://robonomics.network/devices/).
{% endroboWikiNote %}


## Configurazione

1. Inserisci il sensore nella presa per alimentarlo.
2. La scheda creerà una rete Wi-Fi chiamata `RobonomicsSensor-xxxxxxxxx`. Connettiti ad essa dal tuo telefono o computer: vedrai la finestra di autorizzazione (se non la vedi, apri il browser e vai su `192.168.4.1`).
3. Seleziona la tua rete Wi-Fi dalla lista (o scrivila tu stesso se non è nella lista) e compila il campo della password.
{% roboWikiNote {type: "warning", title: "INFO"}%} Il sensore può essere collegato solo a una rete Wi-Fi a 2,4 GHz. {% endroboWikiNote %}
{% roboWikiPicture {src:"docs/sds-sensor-wifi.png", alt:"sds-sensor-wifi"} %}{% endroboWikiPicture %}
4. Scrivi le coordinate del luogo in cui verrà installato il sensore. Puoi ottenerle da qualsiasi mappa o ottenerle dall'indirizzo utilizzando [questo link.](https://www.latlong.net/convert-address-to-lat-long.html)
{% roboWikiNote {type: "warning", title: "WARNING"}%} Le coordinate del sensore verranno quindi visualizzate su una mappa pubblicamente disponibile. Se non vuoi mostrare le tue informazioni private, scrivi coordinate approssimative, ma non esatte.
{% endroboWikiNote %}
5. Fai clic su `Salva configurazione e riavvia`. La scheda si riavvierà e si connetterà alla rete Wi-Fi specificata.
6. Apri [mappa dei sensori Robonomics](https://sensors.robonomics.network/#/) e trova il luogo in cui hai installato il sensore. In un paio di minuti sarai in grado di vedere il tuo sensore con i dati sulla mappa.
{% roboWikiPicture {src:"docs/sds-sensor-map.png", alt:"sds-sensor-map"} %} {% endroboWikiPicture %}

## Home Assistant

Ci sono due opzioni di installazione disponibili:

### Opzione 1: HACS

Il modo più semplice per aggiungere un sensore Local Luftdaten è tramite HACS. [Qui](https://hacs.xyz/docs/setup/download/) puoi trovare una breve spiegazione su come configurare HACS.

Una volta installato HACS, vai su HACS -> Integrations e cerca l'integrazione `Local Luftdaten Sensor`. Clicca sul pulsante di download e riavvia Home Assistant una volta che l'integrazione è stata scaricata.
{% roboWikiPicture {src:"docs/sds-hacs.png", alt:"sds-hacs"} %}{% endroboWikiPicture %}

### Opzione 2: Installazione Manuale

Sotto l'utente `homeassistant`, clona il repository del progetto:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
```

{% endcodeHelper %}

Se hai già delle integrazioni personalizzate, copia la cartella `custom_components/local_luftdaten/` nella tua directory `custom_components`, ad esempio:

{% codeHelper { copy: true}%}

```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

Se non hai integrazioni personalizzate, copia l'intera cartella `custom_components` nella directory di configurazione di Home Assistant. Ad esempio:

{% codeHelper { copy: true}%}

 ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Configurazione

Crea una nuova voce del sensore nel tuo `configuration.yaml` e regola il nome host o l'indirizzo IP. Per trovare l'indirizzo IP locale del tuo sensore, puoi utilizzare [l'app mobile Fing](https://www.fing.com/products) o lo strumento CLI [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Il nome può essere qualsiasi.

|Parametro              |Tipo    | Necessità    | Descrizione
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | richiesto     | Indirizzo IP del sensore
|`scan_interval`        | numero | predefinito: 180 | Frequenza (in secondi) tra gli aggiornamenti
|`name`                 | string | richiesto    | Nome del sensore
| `monitored_conditions` | elenco | richiesto | Elenco dei sensori monitorati


{% codeHelper { copy: true}%}


  ```yaml
  sensore:
    - piattaforma: local_luftdaten
      host: 192.168.0.100
      intervallo_scansione: 150
      nome: Sensore qualità dell'aria
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperatura
        - HTU21D_umidità
        - segnale
  ```

{% endcodeHelper %}

> Un elenco di tutti i sensori supportati può essere trovato nel [repository](https://github.com/lichtteil/local_luftdaten).

Riavvia il tuo Home Assistant.
Dopo di che, puoi aggiungere un sensore al tuo cruscotto. Il nome dell'entità sarà il nome che hai aggiunto a `configuration.yaml`.

{% roboWikiPicture {src:"docs/sds-configuration-card.png", alt:"sds-configuration-car"} %}{% endroboWikiPicture %}