---
title: Panoramica
contributors: [ensrationis]
---

Robonomics è un cloud per dispositivi su Polkadot. Nel cloud tieni la descrizione dei tuoi dispositivi e il loro stato attuale, scrivi le misure e invii comandi. Paghi in XRT, il token della rete. Nessuna azienda gestisce da sola il cloud: lo fanno girare collator indipendenti, e chi possiede XRT lo governa con votazioni on-chain.

## Componenti principali

- **Albero dei dispositivi (CPS).** Un albero di nodi che descrive la tua installazione: un edificio, le sue stanze, i dispositivi al loro interno. Ogni nodo contiene una breve descrizione e lo stato attuale. Il proprietario decide chi può scrivere in quale parte dell'albero. Oggi è il cuore di Robonomics. Vedi [Albero dei dispositivi (CPS)](/docs/device-tree/).
- **XRT.** Il token. Serve a pagare le commissioni delle transazioni e gli abbonamenti, e chi lo possiede lo usa per votare. Vedi [XRT e governance](/docs/xrt-and-governance/).
- **Governance.** OpenGov standard di Polkadot con due track. Non esiste una chiave Sudo: ogni modifica privilegiata, compresi gli aggiornamenti del runtime, passa per un referendum.
- **Collator.** I server che producono i blocchi. Chiunque può candidarsi vincolando XRT. Vedi [Avviare un collator](/docs/run-collator/).

I componenti più vecchi (Datalog, Launch, abbonamenti RWS, Digital Twin, Liability) funzionano ancora, ma sono deprecati. Vedi [Pallet legacy](/docs/legacy-pallets/).

## La rete

| | |
|---|---|
| Rete | Parachain Robonomics su Polkadot |
| Para ID | 3388 |
| Token | XRT, 9 decimali |
| Formato degli indirizzi | Prefisso SS58 32 (gli indirizzi iniziano con `4`) |
| Tempo di blocco | 6 secondi (obiettivo) |
| RPC pubblico | `wss://polkadot.rpc.robonomics.network/` |
| Block explorer | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [apri con l'RPC di Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

Polkadot è l'unica rete Robonomics attiva. La parachain su Kusama è stata fermata. Vedi [XRT su altre reti](/docs/xrt-migration/).

## Cosa si sta costruendo

Robonomics 5.0 aggiunge il cloud a livelli. La governance e l'albero dei dispositivi con Scope e Access sono già attivi. Gli abbonamenti sono in lavorazione: un dispositivo potrà usare la rete senza possedere XRT. Storage e calcolo sono in programma; per ora non c'è codice.

Per saperne di più leggi il post del blog [Robonomics 5.0, part one](https://robonomics.network/blog/robonomics-5-0-runtime-first/) e la [roadmap 5.0](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md).

## Software e manutentori

Tutto il software di Robonomics è open source:

- [airalab/robonomics](https://github.com/airalab/robonomics): il runtime e i suoi pallet.
- [airalab/robins](https://github.com/airalab/robins): strumenti, tra cui lo strumento a riga di comando `cps` e i gateway per i dispositivi.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): la libreria Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): l'app web su [robonomics.app](https://robonomics.app).

Non esiste un programma separato per il nodo Robonomics. I collator usano `polkadot-omni-node`, il nodo generico di Parity, con la chain spec di Robonomics.

I siti web di Robonomics, compresa questa wiki, sono gestiti da Akagi Engineering Co., Ltd. (Giappone). Notizie e note di rilascio sono sul [blog di Robonomics](https://robonomics.network/blog/).
