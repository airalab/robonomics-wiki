---
title: XRT e governance
contributors: [Leemo94, ensrationis]
---

XRT è il token della rete Robonomics. Lo usi per pagare il cloud e per votare su come cambia la rete. Questa pagina tratta entrambi gli aspetti.

## A cosa serve XRT

- **Commissioni.** Ogni transazione paga una commissione in XRT. Tutte le commissioni e le mance finiscono nel fondo dei collator.
- **Abbonamenti.** Gli abbonamenti attuali (RWS) si vincono all'asta, e l'offerta vincente viene bruciata. Vedi [Pallet legacy](/docs/legacy-pallets/#rws-subscriptions).
- **Voti.** Chi possiede XRT decide sui referendum.
- **Cauzione dei collator.** Un candidato collator vincola XRT. Vedi [Avviare un collator](/docs/run-collator/).

## Unità e offerta

- XRT ha 9 decimali. 1 XRT = 1,000 Glushkov (mXRT) = 1,000,000 Coase (µXRT).
- Il deposito esistenziale è 1 Coase, cioè 0.000001 XRT.
- Il runtime conia 0.0042 XRT per l'autore di ogni blocco come ricompensa del collator. La tokenomics limita l'emissione per i collator a non più di 25,000 XRT l'anno.
- La tokenomics fissa l'offerta massima a 5,100,000 XRT. Allocazioni e ciclo di vita del token sono sulla [pagina della tokenomics](https://robonomics.network/tokenomics/).

XRT esiste anche su Ethereum e su Polkadot Asset Hub. Vedi [XRT su altre reti](/docs/xrt-migration/).

## Governance

Robonomics usa OpenGov standard di Polkadot. Non esiste una chiave Sudo: dal runtime 52 (ottobre 2026) ogni modifica privilegiata, compresi gli aggiornamenti del runtime, richiede un referendum. Anche Sudo è stato rimosso con un referendum. Non ci sono council, fellowship né track di tesoreria.

Un referendum passa quando due soglie sono raggiunte nello stesso momento:

- **Approval**: la quota di "aye" tra i voti espressi.
- **Support**: la quota di tutto l'XRT che ha votato "aye".

Entrambe partono alte e scendono durante il periodo di decisione. Quando un referendum passa e regge per tutto il periodo di conferma, la chiamata viene eseguita.

### Track

| | Root | Whitelisted Caller |
|---|---|---|
| Uso | Aggiornamenti del runtime e qualsiasi altra chiamata privilegiata: cauzione e limiti dei collator, aste RWS, configurazione | Un track veloce per una singola chiamata che il Core Team ha messo in whitelist |
| Referendum in decisione contemporaneamente | 1 | 10 |
| Deposito di decisione | 5,000 XRT | 1 XRT |
| Periodo di preparazione | 12 ore | 5 minuti |
| Periodo di decisione | 14 giorni | 3 giorni |
| Periodo di conferma | 24 ore | 20 minuti |
| Ritardo minimo di esecuzione | 1 ora | 5 minuti |
| Approval | da 90% a 51% durante il periodo di decisione | da 99% a 80% |
| Support | da 50% a 15% | da 2% a 1% |

Sono i valori del runtime attuale. Per cambiarli serve un referendum Root.

### Altri depositi

- **Deposito di presentazione:** 10 XRT. Qualsiasi account può presentare un referendum.
- **Deposito per la preimage:** 100 XRT più 0.00001 XRT per ogni byte della chiamata. Nel codice del runtime questi valori sono segnati come provvisori, quindi possono cambiare.
- Un referendum che non entra in decisione entro 14 giorni scade.

### Core Team e whitelist

Il Core Team è un piccolo collettivo di al massimo 7 membri. Solo un referendum Root può cambiarne la composizione.

La whitelist funziona così:

1. Il Core Team vota per mettere in whitelist l'hash di una chiamata precisa. Deve essere d'accordo almeno la metà di tutti i membri. Una mozione del Core Team dura 3 giorni.
2. La whitelist non esegue nulla. La chiamata ha comunque bisogno di un referendum sul track Whitelisted Caller.
3. Una chiamata non in whitelist non può passare dal track veloce. Può comunque passare dal track Root.

Quindi ci sono due modi per fare una modifica privilegiata: un referendum Root, oppure una chiamata in whitelist più un referendum veloce. In entrambi i casi decide il voto di chi possiede XRT.

<a id="how-to-propose-a-change"></a>

## Come proporre una modifica

I passi pubblicati dal team:

1. Descrivi l'idea in una issue su [airalab/robonomics](https://github.com/airalab/robonomics/issues).
2. Presenta un referendum in Polkadot.js Apps, nella sezione Governance, collegato alla rete Robonomics.
3. Fallo sapere alla community.

Cosa succede on-chain:

1. La chiamata viene salvata come preimage (deposito per la preimage).
2. Il referendum viene presentato su un track (deposito di presentazione di 10 XRT).
3. Qualcuno versa il deposito di decisione: 5,000 XRT su Root, 1 XRT su Whitelisted Caller. Può versarlo chiunque.
4. Il referendum entra in decisione dopo il periodo di preparazione, quando il deposito di decisione è stato versato e il track ha un posto libero. Poi il voto lo decide entro il periodo di decisione.

## Come votare

- Tieni i tuoi XRT nel tuo wallet sulla rete Robonomics. I token tenuti su un exchange non possono votare.
- Vota con conviction: blocca i tuoi XRT più a lungo per dare più peso al voto.

| Blocco | Peso del voto |
|---|---|
| Nessun blocco | 0.1× |
| 7 giorni | 1× |
| 14 giorni | 2× |
| 28 giorni | 3× |
| 56 giorni | 4× |
| 112 giorni | 5× |
| 224 giorni | 6× |

- Invece di votare tu, puoi delegare il tuo potere di voto a un altro account.

I referendum aperti e passati si trovano in Polkadot.js Apps, nella sezione Governance, quando è collegato all'[RPC di Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer).

## Per approfondire

- [Robonomics 5.0: handing the keys to XRT holders](https://robonomics.network/blog/robonomics-5-0-governance/)
- [Sudo is gone: the Robonomics cloud is now run by its community](https://robonomics.network/blog/robonomics-5-0-sudo-removed/)
- [Discussione sul forum del modello a due track](https://forum.polkadot.network/t/robonomics-replacing-sudo-with-a-two-track-opengov-sized-for-a-small-community/18719)
