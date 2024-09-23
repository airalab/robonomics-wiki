---

title: Aggiorna il tuo Home Assistant OS
contributors: [LoSk-p]
tools:
  - Home Assistant OS 12.1 per RaspPi
    https://github.com/home-assistant/operating-system
  - Home Assistant Core 2024.5.1
    https://github.com/home-assistant/core
  - HACS 1.34.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.3.2
    https://github.com/PinoutLTD/ipfs-addon
  - Libp2p <-> WS Proxy Add-on 0.0.1
    https://github.com/PinoutLTD/addon-libp2p-ws-proxy

---

**Questo articolo contiene istruzioni per aggiornare il tuo attuale Home Assistant OS con l'integrazione di Robonomics.**


{% roboWikiPicture {src:"docs/home-assistant/homeassistant_os.png", alt:"homeassistant_os"} %}{% endroboWikiPicture %}

## Installa HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) ti consente di installare integrazioni personalizzate.

{% roboWikiVideo {videos:[{src: 'mYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Prima di iniziare, devi installare l'add-on per connetterti al dispositivo Home Assistant tramite SSH. Nella ricerca dell'Add-on Store, cerca `ssh`. Ti consigliamo di installare l'add-on `SSH & Web Terminal`.

{% roboWikiNote {title:"Avviso", type: "warning"}%} Se l'add-on SSH non viene trovato, prova ad abilitare la Modalità Avanzata nelle impostazioni del tuo profilo utente. Per farlo, clicca sull'icona del profilo nell'angolo in basso a sinistra e trova l'opzione Modalità Avanzata.{% endroboWikiNote %}

2. Scegli l'add-on e premi `INSTALLA`. Dopo che l'installazione è completata, vai alla scheda `Configurazione` e aggiungi `password` o `authorized_keys`. Non dimenticare di salvare questa parte della configurazione.

3. Nella scheda `Informazioni`, premi `AVVIA`. Se desideri visualizzare l'add-on nella barra laterale, non dimenticare di abilitare `Mostra nella barra laterale`.

{% roboWikiVideo {videos:[{src: 'QmYfLWdLH3jTU2uQhr1pzZFsjUNSZ8wtbtEsCdpvmyn4YH', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

4. Apri l'add-on SSH e esegui il seguente comando:

{% codeHelper { additionalLine: "Home Assistant Command Line", copy: true}%}

```bash
wget -O - https://get.hacs.xyz | bash -
```

{% endcodeHelper %}

5. Riavvia Home Assistant (puoi farlo in `Impostazioni`->`Sistema`).

6. Ora l'Integrazione HACS sarà disponibile per essere aggiunta nel menu `Integrazioni`. Vai su `Impostazioni`->`Dispositivi e Servizi`, premi `Aggiungi Integrazione` e trova HACS.

{% roboWikiNote {title:"Avviso", type: "warning"}%} Per utilizzare HACS è necessario un account Github.{% endroboWikiNote %}

7. Clicca su di esso e segui le istruzioni di installazione.

## Installa IPFS Daemon e Libp2p - WS Proxy Add-Ons

L'Integrazione Robonomics memorizza i dati utilizzando un demone IPFS locale e utilizza anche Libp2p per il controllo remoto, quindi è necessario installarlo prima. Puoi aggiungere il repository degli Add-Ons di Robonomics utilizzando questo pulsante

[![Apri la tua istanza di Home Assistant e mostra il dialogo per aggiungere un add-on con un URL di repository specifico precaricato.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPinoutLTD%2Frobonomics-addons)

Oppure manualmente seguendo i seguenti passaggi:

{% roboWikiVideo {videos:[{src: 'QmZgXme4HSrBwDKekBEy5svpQNVWywrvmN7Zthfa27Gu2H', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. C'è un [Repository degli Add-Ons di Robonomics](https://github.com/PinoutLTD/robonomics-addons). Per installarlo vai su `Impostazioni` -> `Add-Ons` e premi il pulsante `AGGIUNGI REPOSITORY` nell'angolo in basso a destra.

2. Premi sui tre puntini nell'angolo in alto a destra e scegli `Repository`. Aggiungi lì il seguente link:

{% codeHelper { copy: true}%}

```
https://github.com/PinoutLTD/robonomics-addons
```

{% endcodeHelper %}

3. Premi il pulsante `AGGIUNGI`.

4. Chiudi il gestore dei repository e aggiorna la pagina. Ora alla fine della pagina puoi vedere gli Add-Ons di Robonomics.

Ora puoi installare entrambi gli add-on. Aprili e premi `INSTALLA`. Dopo l'installazione premi `AVVIA`.

## Installa l'Integrazione Robonomics

Ora puoi installare l'Integrazione Robonomics utilizzando HACS.

{% roboWikiVideo {videos:[{src: 'QmSsCYxp7xJ22RZEx3FtJBFfGASu1t4rmqhf78xasnMwt4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Apri HACS dal menu della barra laterale e cerca `Robonomics`. Quindi clicca sul pulsante `Download` situato nell'angolo in basso a destra. Una volta completato il download, riavvia Home Assistant.