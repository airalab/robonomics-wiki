---
title: Aggiorna il tuo Home Assistant OS
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.31.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.4.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**Questo articolo contiene istruzioni per aggiornare il tuo Home Assistant OS esistente con l'integrazione di Robonomics.**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## Installa IPFS Add-on


L'integrazione di Robonomics memorizza i dati utilizzando il demone IPFS locale, quindi è necessario installarlo prima. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. C'è un [add-on IPFS per Home Assistant](https://github.com/airalab/ipfs-addon). Per installarlo vai su `Settings` -> `Add-ons`  e premi il pulsante `ADD-ON STORE` nell'angolo in basso a destra.

2. Premi sui tre puntini nell'angolo in alto a destra e scegli `Repositories`. Aggiungi lì il seguente link:

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. Premi il pulsante `ADD`.

4. Chiudi il gestore dei repository e aggiorna la pagina. Ora alla fine della pagina puoi vedere l'add-on IPFS Daemon.

5. Apri l'add-on e premi `INSTALL`. Dopo l'installazione premi `START`.

## Installa HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) ti permette di installare integrazioni personalizzate.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. Prima di iniziare, è necessario installare l'add-on per connettersi al dispositivo Home Assistant tramite SSH. Nella ricerca dell'Add-on Store cerca `ssh`. Consigliamo di installare l'add-on `SSH & Web Terminal`.

<robo-wiki-note type="warning" title="Warning">

  Se l'add-on SSH non viene trovato, prova ad abilitare la modalità avanzata nelle impostazioni del tuo profilo utente. Per farlo, clicca sull'icona del profilo nell'angolo in basso a sinistra e trova l'opzione Modalità avanzata.

</robo-wiki-note>

2. Scegli l'add-on e premi `INSTALL`. Dopo aver completato l'installazione, vai alla scheda `Configurazione` e aggiungi `password` o `authorized_keys`. Non dimenticare di salvare questa parte della configurazione.

3. Nella scheda `Info` premi `START`. Se vuoi vedere l'add-on nella barra laterale, non dimenticare di abilitare `Show in sidebar`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. Apri l'add-on SSH e esegui il seguente comando:

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. Riavvia Home Assistant (puoi farlo in `Settings`->`System`). 

6. Ora l'integrazione HACS sarà disponibile per essere aggiunta nel menu `Integrations`. Vai su `Settings`->`Devices & Services`, premi `Add Integration` e trova HACS.

<robo-wiki-note type="warning" title="Warning">

  Per utilizzare HACS è necessario un account Github.

</robo-wiki-note>

7. Clicca su di esso e segui le istruzioni di installazione. 

## Installa l'integrazione di Robonomics

Ora puoi installare l'integrazione di Robonomics utilizzando HACS.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

Apri HACS dal menu della barra laterale e vai su `Integrations`. Clicca su `Explore & Download Repositories`, quindi cerca `Robonomics` e clicca sul pulsante `Download` situato nell'angolo in basso a destra. Una volta completato il download, riavvia Home Assistant.