---
title: Aggiungi Utente

contributors: [nakata5321, Fingerling42, LoSk-p]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**Questo articolo ti mostrerà come configurare un nuovo utente per il tuo Home Assistant.**

## Aggiunta Utenti alla Sottoscrizione

Non è possibile utilizzare account creati in precedenza perché `OWNER` e `CONTROLLER` forniscono sicurezza, e il primo utente che hai creato quando hai avviato Home Assistant non ha un account Robonomics Parachain.

{% roboWikiVideo {videos:[{src: 'QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Crea un account sulla parachain di Robonomics, come hai fatto nell'[articolo precedente](/docs/sub-activate/).

2. Utilizzando l'account `OWNER`, aggiungi il nuovo account utente alla sottoscrizione nella pagina `SETUP A SUBSCRIPTION` in [Robonomics DApp](https://robonomics.app/#/rws-setup). Ora nella sezione `USERS IN SUBSCRIPTION` dovrebbero esserci tre indirizzi nell'elenco degli accessi: `OWNER`, `CONTROLLER` e `USER`.


## File JSON di Configurazione RWS

Innanzitutto, l'utente dovrebbe ottenere il file JSON con le informazioni della configurazione RWS.

### Creare File JSON di Configurazione RWS

L'amministratore può creare un file JSON per la sua configurazione nella pagina [SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup) utilizzando il pulsante `Download import for other users`.

{% roboWikiPicture {src:"docs/home-assistant/download_rws_setup_json.png", alt:"image"} %}{% endroboWikiPicture %}

### Importare Configurazione RWS

Ora con questo file JSON l'utente può importare la configurazione RWS utilizzando il pulsante `IMPORT SETUP`.

{% roboWikiVideo {videos:[{src: 'QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Concessione di Accesso all'Utente

Nella stessa pagina ([SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup)) puoi impostare la password per il nuovo utente.

{% roboWikiVideo {videos:[{src: 'Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Scegli l'account che hai appena creato nella barra laterale destra (verifica di aver selezionato l'account desiderato premendo sull'icona del profilo).

2. Inserisci l'indirizzo e la frase seed del `USER` nei campi richiesti.

3. Inserisci una password e conferma la transazione con il pulsante `CREATE PASSWORD`, che ora sarà senza commissioni a causa della sottoscrizione.

4. Dopo il processo di registrazione, accedi a Home Assistant con l'indirizzo dell'utente come login e una password appena creata.

Ora puoi utilizzare l'applicazione per controllare la tua casa tramite Robonomics, controlla l'articolo [**"Get Smart Home Telemetry"**](/docs/smart-home-telemetry/).