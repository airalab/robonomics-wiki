---
title: Installazione Smart Home
contributors: [nakata5321, PaTara43]
strumenti:
  - Home Assistant 2024.6.2
    https://github.com/home-assistant/core
  - Integrazione Robonomics Home Assistant 1.8.6
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.38.0
    https://github.com/Koenkk/zigbee2mqtt
---

**Benvenuti alla guida sull'installazione di Home Assistant con integrazione Robonomics. Home Assistant è un sistema di automazione domestica open-source che fornisce un hub centralizzato per controllare dispositivi intelligenti nella rete domestica. Integrando con Robonomics, un servizio cloud decentralizzato, è possibile migliorare la funzionalità e la sicurezza della propria smart home. In questo articolo, forniremo istruzioni passo-passo su come installare Home Assistant con Robonomics, offrendo la possibilità di automatizzare e controllare vari aspetti della propria casa utilizzando una soluzione sicura e decentralizzata. Cominciamo!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"installazione"} %}{% endroboWikiPicture %}

## Dimostrazione

Ecco un esempio di un'installazione completa di Smart Home e integrazione Robonomics. Tenete presente che il tempo necessario può variare a seconda delConnessione Internet.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Hardware necessario per l'installazione

Se non hai ancora integrato Home Assistant nel tuo setup smart home, è importante essere consapevoli dell'attrezzatura necessaria per stabilire un sistema smart home completo
da zero. Il team di Robonomics consiglia di utilizzare Raspberry Pi 4 come server smart home. **Ma è possibile configurare tutto sul tuo PC.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (almeno 2 GB di RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Scheda SD da 16Gb</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adattatore Zigbee (opzionale) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Dispositivi smart Zigbee (opzionale) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Desktop per l'installazione</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


## 1. Installare i prerequisiti

Robonomics Docker contiene:
- Home Assistant
- IPFS
- Broker MQTT e Integrazione- Zigbee2MQTT
- proxy libp2p
- Integrazione Robonomics

Questo articolo mostrerà il processo di installazione su un sistema Ubuntu. Prima è necessario installare i pacchetti successivi:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

Successivamente è necessario installare Docker sul PC. Le istruzioni per l'installazione si trovano sul [sito ufficiale](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Informazioni importanti" }%} Aggiungi il tuo utente al gruppo docker, per avviare i container docker senza permessi di root. Trova le [istruzioni qui](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

## 2. Configurazione

Scarica il repository GitHub e naviga al suo interno:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Successivamente, crea un file `.env` dal `template.env`:


{% codeHelper {copy: true}%}

```
cp template.env .env
```

{% endcodeHelper %}

Dopo di ciò, è possibile aprire il file `.env` e modificare i valori predefiniti come:
- percorso del repository dove saranno memorizzate tutte le cartelle di configurazione.
- fuso orario in ["nome del database tz"](https://en.wikipedia.org/wiki/Elenco_delle_fusi_orari_del_database_tz).

## 3. Inizio

Esegui lo script bash e attendi finché non installa tutti i pacchetti richiesti:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Lo script verificherà tutte le azioni necessarie che hai completato nei passaggi precedenti e restituirà un errore se qualcosa non va.

Durante il processo di installazione possono verificarsi le seguenti situazioni:
- Se decidi di non utilizzare il coordinatore Zigbee, vedrai una riga di dialogo che conferma se continuare l'installazione:

{% codeHelper %}

```
questo script creerà tutti i repository necessari e avvierà i container docker
Impossibile trovare la posizione del coordinatore Zigbee. Inseriscilo e esegui di nuovo lo script. La directory /dev/serial/by-id/ non esiste
Vuoi continuare senza il coordinatore Zigbee? Non avvierà il container Zigbee2MQTT.
Vuoi procedere? (Y/n)
```

{% endcodeHelper %}


- Se ci sono diversi dispositivi sul tuo PC che utilizzano porte seriali, lo script chiederà quale dispositivo utilizzare:

{% codeHelper %}

```
questo script creerà tutti i repository necessari e avvierà i container docker
il coordinatore Zigbee è installato
Hai più di 1 dispositivi connessi. Scegli uno
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## Post-installazione

Dopo che tutto è stato avviato, puoi utilizzare lo script `update.sh` per aggiornare la versione dei pacchetti Docker. Questo script scaricherà le nuove versioni, 
eliminerà le vecchie versioni dei pacchetti e riavvierà tutto automaticamente, salvando tutte le tue configurazioni.

Per interrompere tutto, utilizza lo script `stop.sh`.


Questo è tutto. Continua con il prossimo articolo.