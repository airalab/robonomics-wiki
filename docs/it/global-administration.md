---
title: Amministrazione globale

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

**Questo articolo ti mostrerà come configurare un nuovo utente per il tuo Home Assistant.**

## Aggiunta di utenti alla sottoscrizione

Non è possibile utilizzare account creati in precedenza perché `SUB_OWNER` e `SUB_CONTROLLER` forniscono sicurezza e il primo utente creato quando hai avviato per la prima volta Home Assistant non ha un account Robonomics Parachain.

1. Crea un account su Robonomics parachain, come hai fatto nell'[articolo precedente](/docs/sub-activate/).

2. Utilizzando l'account `SUB_OWNER`, aggiungi il nuovo account utente alla sottoscrizione nella [dapp](https://dapp.robonomics.network/#/subscription/devices). Ora dovrebbero esserci tre indirizzi nell'elenco degli accessi: `SUB_OWNER`, `SUB_CONTROLLER` e `USER`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSxzram7CF4SXpVgEyv98XetjYsxNFQY2GY4PfyhJak7H', type:'mp4'}]" />


## Concessione di accesso all'utente

1. Vai al servizio dapp chiamato [Home Assistant Account](https://dapp.robonomics.network/#/home-assistant). Scegli l'account che hai appena creato nella barra laterale destra (verifica di aver scelto l'account desiderato premendo l'icona del profilo).

2. Inserisci il seed `USER` nel campo richiesto. Aggiungi gli indirizzi `SUB_OWNER` e `SUB_CONTROLLER` nei campi dei crediti degli amministratori. Se tutto è corretto, vedrai lo stato di verifica `VERIFIED`.

3. Crea una password per il nuovo utente che hai appena registrato e conferma la transazione, che ora sarà senza commissioni a causa della sottoscrizione. In seguito potrai ripristinare la password nella scheda Ripristina.

4. Dopo il processo di registrazione, accedi a Home Assistant con il tuo indirizzo utente come login e la password appena creata.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmW2TXuwCYXzgcRfEUx4imZU5ZerEzkuD5P53u9g2WnxDh', type:'mp4'}]" />

Ora puoi utilizzare la dapp per controllare la tua casa tramite Robonomics, consulta l'articolo [**"Ottieni Telemetria per la Smart Home"**](/docs/smart-home-telemetry/).

## Risoluzione dei problemi

1. Se dimentichi una password per Home Assistant dal tuo account Robonomics, [controlla la Dapp.](https://dapp.robonomics.network/#/home-assistant)
Vai alla sezione "Your Home Assistant password" e scegli la scheda "Restore".
