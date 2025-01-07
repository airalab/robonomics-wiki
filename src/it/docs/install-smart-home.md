---
title: Installazione Smart Home
contributors: [nakata5321, PaTara43]
strumenti:
  - Home-assistant-web3-build 0.0.5
    https://github.com/airalab/home-assistant-web3-build
  - Home Assistant 2024.11.3
    https://github.com/home-assistant/core
  - Integrazione Robonomics Home Assistant 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.40.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Benvenuti alla guida sull'installazione di Home Assistant con integrazione Robonomics. Home Assistant è un sistema di automazione domestica open-source che fornisce un hub centralizzato per controllare dispositivi intelligenti nella rete domestica. Integrando Robonomics, un servizio cloud decentralizzato, è possibile migliorare la funzionalità e la sicurezza della propria smart home. In questo articolo, forniremo istruzioni passo-passo su come installare Home Assistant con Robonomics, offrendo la possibilità di automatizzare e controllare vari aspetti della propria casa utilizzando una soluzione sicura e decentralizzata. Iniziamo!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"installazione"} %}{% endroboWikiPicture %}

## Demo

Eccoè un esempio di un'installazione completa di integrazione Smart Home e Robonomics. Tieni presente che il tempo necessario può variare a seconda della connessione Internet.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Hardware necessario per l'installazione

Se non hai ancora incorporato Home Assistant nella tua configurazione smart home, è importante essere consapevoli dell'attrezzatura necessaria per stabilire un sistema smart home completo da zero. Il team di Robonomics consiglia di utilizzare Raspberry Pi 4 come server smart home.

{% roboWikiGridWrapper {columns: '2', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (almeno 2 GB di RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Scheda SD16 GB</b> {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
    {% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
     <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Dispositivi smart Zigbee (opzionale) </b> </a>  {% endroboWikiGrid %}
    {% roboWikiGrid %}     {% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
    <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adattatore Zigbee (opzionale) </b> </a>  {% endroboWikiGrid %}
    
{% endroboWikiGridWrapper %}


## 1. Installare i prerequisiti


{% roboWikiNote {type: "warning", title: "Informazioni importanti" }%} Tutti questi passaggi devono essere eseguiti su Raspberry Pi 4 con sistema Ubuntu. {% endroboWikiNote %}

Robonomics Docker contiene:
- Home Assistant
- IPFS
- Broker e integrazione MQTT- Zigbee2MQTT
- proxy libp2p
- Integrazione Robonomics

Prima di tutto è necessario installare i seguenti pacchetti:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

Successivamente è necessario installare Docker sul tuo Raspberry Pi 4. Trova le istruzioni di installazione sul [sito ufficiale](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Informazioni importanti" }%} Aggiungi il tuo utente al gruppo docker, per avviare i container docker senza permessi di root. Trova le [istruzioni qui](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

## 2. Configurazione

Scarica il repository GitHub e naviga al suo interno:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Successivamente, crea un file `.env` dal file `template.env`:


{% codeHelper {copy: true}%}

```
cp template.env .env
```

{% endcodeHelper %}

Dopo di che, puoi aprire il file `.env` e modificare i valori predefiniti, come:
- il percorso del repository in cui saranno memorizzate tutte le cartelle di configurazione.
- fuso orario in ["nome del database tz"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. Inizio

Esegui lo script bash e attendi finché non installa tutti i pacchetti richiesti:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Lo script verificherà che tutte le azioni richieste siano state completate nei passaggi precedenti e visualizzerà un errore se qualcosa non è corretto.

Durante il processo di installazione possono verificarsi le seguenti situazioni:
- Se decidi di non utilizzare il coordinatore Zigbee, vedrai una riga di dialogo che conferma se continuare l'installazione:

{% codeHelper %}

```
questo script creerà tutti i repository necessari e avvierà i contenitori docker
Impossibile trovare la posizione del coordinatore Zigbee. Inseriscila e esegui nuovamente lo script. La directory /dev/serial/by-id/ non esiste
Vuoi continuare senza il coordinatore Zigbee? Non avvierà il contenitore Zigbee2MQTT.
Vuoi procedere? (Y/n)
```

{% endcodeHelper %}


- Se ci sono diversi dispositivi sul tuo Raspberry Pi 4 che utilizzano porte seriali, lo script chiederà quale dispositivo utilizzare:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/seriale/per-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## Post-installazione

Dopo che tutto è stato avviato, puoi utilizzare lo script `update.sh` per aggiornare la versione dei pacchetti Docker:
{% codeHelper %}

```
bash update.sh
```

{% endcodeHelper %} 
Questo script scaricherà le nuove versioni, eliminerà le vecchie versioni dei pacchetti e riavvierà tutto automaticamente, salvando tutte le tue configurazioni.

Per interrompere tutto, utilizza lo script `stop.sh`:
{% codeHelper %}

```
bash stop.sh
```

{% endcodeHelper %}

Questo è tutto. Continua con il prossimo articolo.