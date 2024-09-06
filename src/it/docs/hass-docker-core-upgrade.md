---
title: Aggiorna il tuo Home Assistant Docker o Core per OS simili a Unix
contributors: [PaTara43]
tools:
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Integrazione Robonomics Home Assistant 1.8.5-beta
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.2
    https://github.com/Multi-Agent-io/robonomics-interface/
  - HACS 1.34.0
    https://hacs.xyz/docs/setup/download



---

**Questo articolo contiene istruzioni per aggiornare il tuo attuale Home Assistant Docker o Core (su un OS simile a Unix) con l'integrazione Robonomics.**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"DISCLAIMER", type: "warning"}%}
  1. Si presume che Docker sia installato correttamente.
  2. Si presume che vengano utilizzate le immagini e i container Docker predefiniti di Home Assistant o Home Assistant Core.
  3. IPFS e Libp2p-ws-proxy verranno installati come container Docker.
{% endroboWikiNote %}


## Installazione

Scarica lo script di installazione ed eseguilo nel terminale:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

Verificherà se Docker è installato correttamente. Successivamente, cercherà di trovare IPFS e suggerirà di controllare la configurazione se IPFS è installato. Se IPFS non viene trovato, lo script installerà sia IPFS che il Libp2p-ws Proxy. Vedrai il seguente output:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
Docker installato
$User appartiene al gruppo docker.
Verifica se IPFS è installato... Potrebbero essere necessari alcuni minuti. Attendere prego
<...>
 ✔ Container ipfs-daemon      Avviato
 ✔ Container lipb2p-ws-proxy  Avviato
Tutto pronto!
``` install_integration_core.sh
```

{% endcodeHelper %}

Se IPFS è già installato, vedrai il seguente output:
```shell
Docker installato
$User appartiene al gruppo docker.
Verifica se IPFS è installato... Potrebbero essere necessari alcuni minuti. Attendere prego
È stata trovata un'istanza di IPFS. Assicurati che la tua configurazione sia impostata correttamente con le seguenti impostazioni:
      - 'Gateway': '/ip4/0.0.0.0/tcp/8080'
      - Le porte 4001, 5001 e 8080 sono disponibili.
      Aggiungi anche i seguenti nodi di bootstrap:
      1. '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8'
      2. '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
      3. '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      La tua configurazione è impostata correttamente? [sì/No]:

```
In questo caso, è necessario regolare il file di configurazione di IPFS e confermarlo.

{% roboWikiNote {title:"Attenzione!", type: "warning"}%} È importante una corretta configurazione di IPFS; non saltare questo passaggio!{% endroboWikiNote %}

## Scarica l'Integrazione Robonomics

Utilizzeremo [HACS](https://hacs.xyz/) per installare l'integrazione. Se HACS non è ancora installato sul tuo Home Assistant, devi [installarlo](https://hacs.xyz/docs/setup/download/) prima.

Successivamente, nel tuo Home Assistant, vai su HACS e cerca `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Aprilo e clicca su `Download` nell'angolo in basso a destra. Il download del repository potrebbe richiedere del tempo.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

Questo è tutto. Continua con il prossimo articolo.