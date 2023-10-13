---
title: Immagine preinstallata per Raspberry Pi
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.0
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.21.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt
  - Yggdrasil 0.4.7
    https://github.com/yggdrasil-network/yggdrasil-go/
---

**Benvenuti alla guida sull'installazione di Home Assistant con integrazione Robonomics su un Raspberry Pi. Home Assistant è un sistema di automazione domestica open-source che fornisce un hub centralizzato per il controllo dei dispositivi intelligenti nella rete domestica. Integrando con Robonomics, un servizio cloud decentralizzato, è possibile migliorare la funzionalità e la sicurezza della propria casa intelligente. In questo articolo, forniremo istruzioni passo-passo su come installare Home Assistant con Robonomics su un Raspberry Pi, dando la possibilità di automatizzare e controllare vari aspetti della propria casa utilizzando una soluzione sicura e decentralizzata. Iniziamo!**

## Hardware necessario per l'installazione

Se non hai ancora incorporato Home Assistant nella tua configurazione di casa intelligente, è importante essere consapevoli dell'attrezzatura necessaria per stabilire un sistema di casa intelligente completo da zero.

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>Raspberry Pi 4 (at least 2 GB RAM)</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_3.png" /> 
      <b>SD card 16Gb+</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_7.png" /> 
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"><b>Zigbee smart devices</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. Scarica l'immagine preinstallata di Robonomics

L'immagine preinstallata di Robonomics contiene:
- Home Assistant Core
- IPFS
- Broker MQTT e integrazione
- Zigbee2MQTT
- Robonomics Integration

<robo-wiki-button label="Download image (~528 Mb)" link="https://crustipfs.info/ipfs/QmeDPrNYLQKFCZgPmxyxDWSAXSjSaw7Dx46d9p3JSGM1hA?filename=robonomics_rpi.xz&download=true" />

<robo-wiki-note type="warning" title="For advanced users">

Puoi controllare il codice sorgente e scaricare l'ultima versione dell'immagine su [GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)

</robo-wiki-note>


## 2. Configura l'immagine

Installa [Raspberry Pi Imager](https://www.raspberrypi.com/software/) sul tuo computer. Quindi, inserisci la scheda SD.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


Esegui il programma Raspberry Pi Imager. Scegli l'immagine richiesta come sistema operativo e assicurati di selezionare la scheda SD dal menu a discesa di archiviazione.
Nelle impostazioni:
- Imposta nome utente e password (salva il nome utente predefinito "pi" per facilitarne il ricordo),  
- fornisci il nome e la password della tua rete Wi-Fi, 
- scegli il tuo paese dall'elenco a discesa
e quindi `Scrivi` l'immagine. 
                   
<robo-wiki-note type="note">Salva attentamente nome utente e password, perché queste credenziali saranno necessarie in caso di risoluzione dei problemi</robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" cover="covers/cover-1.png" />

Puoi trovare i codici dei paesi [qui](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

## 3. Primo avvio

**Espelli in modo sicuro la scheda SD**, inseriscila nel Raspberry Pi. Quindi **inserisci l'adattatore Zigbee** nel Raspberry Pi.

<robo-wiki-note type="warning">È importante inserire l'adattatore Zigbee prima del primo avvio del Raspberry Pi! 
È necessario per l'autoconfigurazione della rete Zigbee.</robo-wiki-note>

**Se hai il [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) (che ha tutti i firmware necessari), puoi semplicemente procedere con queste istruzioni. Tuttavia, se hai un altro adattatore, la prima cosa da fare è flasharlo con il software Zigbee2MQTT. Puoi trovare le istruzioni per il tuo dispositivo [qui](https://www.zigbee2mqtt.io/information/supported_adapters.html).**

Successivamente, collega il cavo di alimentazione al tuo dispositivo. Dovrebbe connettersi alla tua rete Wi-Fi. 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Una volta collegato il tuo Raspberry Pi, il LED rosso si accenderà e il LED verde lampeggerà per qualche tempo. Attendi fino a 5 minuti affinché il Raspberry Pi si avvii e si registri sulla rete.

Ora trova l'indirizzo IP del Raspberry Pi. Per trovarlo puoi utilizzare l'app mobile [Fing](https://www.fing.com/products) o 
[lo strumento CLI nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Trova il nome `robots-home` (il nome opzionale potrebbe essere `Home(homeassistant)`) 
della macchina host nell'elenco degli IP. 

In questo esempio l'indirizzo è `192.168.43.56`. 

Per verificare che tutto funzioni, apri il browser web e vai alla pagina web `http://%INDIRIZZO_IP_RASPBERRY%:8123`. In questo esempio, sarà `192.168.43.56:8123`.
Se tutto è corretto, vedrai l'interfaccia web di Home Assistant. Se la pagina web non si apre, attendi fino a 5 minuti per l'avvio del Raspberry Pi e riprova. 

<robo-wiki-video loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## Risoluzione dei problemi

1. Per modificare le impostazioni Wi-Fi in seguito, devi accedere al tuo Raspberry Pi tramite il comando `ssh`. Per fare ciò, apri il terminale sul tuo computer
e digita il comando ssh con il tuo nome utente, che hai creato durante il passaggio "Configurazione dell'immagine" (quello predefinito è "pi"). 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

e quindi usa il comando `sudo raspi-config`. Trova ulteriori informazioni su questo comando sul [sito ufficiale.](https://www.raspberrypi.com/documentation/computers/configuration.html)
