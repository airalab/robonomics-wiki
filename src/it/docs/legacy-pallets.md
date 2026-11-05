---
title: Pallet legacy
contributors: [PaTara43, nakata5321, LoSk-p, ensrationis]
---

Nel runtime ci sono ancora cinque pallet delle versioni precedenti di Robonomics: Datalog, Launch, RWS, DigitalTwin e Liability. Il [README del nodo](https://github.com/airalab/robonomics#readme) li indica come deprecati: "following pallets will be removed in near future". Non è stata annunciata una data di rimozione.

Oggi funzionano ancora on-chain, e alcune app e integrazioni li usano. Per i nuovi progetti parti dall'[albero dei dispositivi](/docs/device-tree/).

| Pallet | Cosa fa | Successore |
|---|---|---|
| Datalog | Salva brevi record sotto il tuo account | Albero dei dispositivi; lo storage 5.0 è in programma |
| Launch | Invia un comando firmato all'account di un dispositivo | — |
| RWS | Abbonamenti per transazioni senza commissioni | Abbonamenti 5.0 (in lavorazione) |
| DigitalTwin | Collega i topic di un gemello digitale ad account | Albero dei dispositivi |
| Liability | Accordi tra parti con un report finale | — |

## Datalog

Datalog conserva brevi record on-chain sotto il tuo account. Ogni record riceve un timestamp.

- `record(record)` aggiunge un record fino a 512 byte.
- `erase()` cancella tutti i tuoi record.
- Ogni account conserva i suoi **ultimi 127 record**. Quelli più vecchi vengono sovrascritti. (La finestra ha 128 slot, e uno resta sempre libero.)
- Per dati più grandi, mettili su IPFS e registra il CID.
- Si leggono con le query sullo storage `datalog.datalogIndex(account)`, che restituisce il primo e l'ultimo slot, e `datalog.datalogItem([account, slot])`. L'evento è `NewRecord`.
- Non c'è deposito, solo la normale commissione. Al momento in cui scriviamo un record pieno da 512 byte costa circa 0.0006 XRT.
- Con un abbonamento RWS si può inviare un record senza commissione, tramite `rws.call`.

Chi lo usa oggi: Robonomics Report Service per Home Assistant, gli agenti di connettività di sensors.social e i grafici di Altruist e del monitoraggio energetico in robonomics.app.

Una guida al primo record si trova in [Primi passi](/docs/getting-started/#4-send-your-first-record).

## Launch

Launch invia un comando firmato a un dispositivo.

- `launch(robot, param)`: `robot` è l'account del dispositivo, `param` sono 32 byte. Una convenzione diffusa è metterci il digest di un CID IPFS.
- Il dispositivo resta in ascolto degli eventi `NewLaunch(sender, robot, param)` con il suo indirizzo.
- Chiunque può inviare un launch a qualsiasi indirizzo. Il dispositivo deve verificare chi è il mittente.
- Il pallet scrive anche `param` in un unico valore globale `Goal`, che ogni launch di chiunque sovrascrive. Usa gli eventi, non questo valore nello storage.
- La commissione è più o meno quella di un breve record datalog. Con un abbonamento RWS si può inviare senza commissione.

robonomics.app usa Launch per controllare Home Assistant, e il vecchio wrapper ROS 2 lo usava per avviare i robot.

<a id="rws-subscriptions"></a>

## Abbonamenti RWS

RWS (Robonomics Web Services) dà a un account transazioni senza commissioni.

- Due tipi: `Daily { days }` e `Lifetime { tps }`.
- Un dispositivo elencato nell'abbonamento invia chiamate tramite `rws.call(subscription_owner, call)` e non paga commissioni. La capacità gratuita si accumula nel tempo. Per un abbonamento Daily si accumula a 10,000 µTPS, l'equivalente di 0.01 trasferimenti semplici al secondo.
- `set_devices(devices)` elenca fino a 32 account di dispositivi che possono usare l'abbonamento. Sostituisce l'intera lista. Solo un dispositivo in lista può usare `rws.call`.
- `transfer(target)` sposta il tuo abbonamento su un account che non ne ha.

### Come si ottiene un abbonamento

- Gli abbonamenti si vendono all'asta. `bid(index, amount)`: la prima offerta deve superare 1 XRT. Le offerte vengono riservate. Le aste con un'offerta si chiudono ogni 10 blocchi. L'offerta vincente viene bruciata e l'abbonamento viene registrato.
- La pagina **Buy a subscription** di [robonomics.app](https://robonomics.app) fa un'offerta su un'asta libera e aggiunge il tuo account come dispositivo in un'unica transazione. Ti serve un saldo superiore al prezzo più 0.01 XRT. L'app si rifiuta se non c'è un'asta libera.

### Stato attuale

- Le nuove aste può avviarle solo Root. Dato che non c'è Sudo, ogni nuovo lotto di aste richiede un referendum Root. Finché non ne passa uno, le aste libere possono esaurirsi.
- Gli abbonamenti emessi dall'oracolo (per esempio dai token RWS su Ethereum, un esperimento del 2021) non sono collegati: l'account dell'oracolo non è impostato. La pagina della tokenomics dice che RWS sarà collegato alla rete di produzione dopo che i saldi XRT di Kusama saranno passati su Polkadot, prima per progetti non commerciali come sensors.social.
- Il successore è la Subscription della 5.0. Con essa un dispositivo potrà usare la rete senza possedere XRT. È in lavorazione e non è ancora nel runtime.

## DigitalTwin

Un gemello digitale è una lista di topic, ognuno collegato a un account che fornisce i dati.

- `create()` crea un gemello.
- `set_source(id, topic, source)` collega un topic da 32 byte a un account sorgente.
- `remove_source(id)` rimuove la sorgente.

L'[albero dei dispositivi](/docs/device-tree/) lo sostituisce.

## Liability

Liability registra accordi firmati tra le parti.

- `create(agreement)` registra un accordo firmato. La sua parte tecnica rimanda a IPFS.
- `finalize(report)` lo chiude con un report.

Il pallet include anche un semplice mercato per questi accordi. Non è stato annunciato un successore.
