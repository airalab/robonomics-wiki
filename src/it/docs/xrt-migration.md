---
title: XRT su altre reti
contributors: [nakata5321, ensrationis]
---

L'XRT di produzione vive sulla parachain Robonomics su Polkadot. Questa pagina spiega cosa succede all'XRT su Kusama ed Ethereum, e dove si trova XRT su Polkadot Asset Hub.

## Kusama

La parachain Robonomics su Kusama è stata fermata. Ha prodotto il suo ultimo blocco, #12,268,835, il 28 settembre 2026. Un archivio del database è su [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama).

Cosa dicono i post pubblicati sull'XRT di Kusama:

- Tutti i saldi XRT all'ultimo blocco passano su Polkadot con un **bonus del +20%**.
- Sul lato Kusama **non c'è buyback**.
- Dove compariranno i saldi su Polkadot e se i possessori dovranno fare qualcosa sarà spiegato in un post a parte.

Segui il [blog di Robonomics](https://robonomics.network/blog/) per quel post. Fonti: [The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/) e la [pagina della tokenomics](https://robonomics.network/tokenomics/).

## Ethereum

Il vecchio token XRT su Ethereum (`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`) è deprecato. Il 5 febbraio 2026 il suo meccanismo di emissione è stato sfruttato per coniare token gratis. L'XRT su Polkadot e Kusama non è stato toccato.

Chi possedeva il vecchio token al momento dello snapshot (blocco Ethereum 24,390,081) può migrare:

1. Apri l'app di migrazione: [airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/).
2. Collega il wallet che deteneva XRT il 5 febbraio 2026. L'app mostra il saldo dello snapshot e l'importo con il bonus.
3. Scegli un'opzione. Ogni indirizzo può scegliere una sola volta.
   - **Accept**: ricevi XRT di produzione su Ethereum, pari al saldo dello snapshot più il 20%.
   - **Decline**: aderisci invece al programma di buyback, a un prezzo di riferimento di $2.20, pagato in 12–36 mesi e solo nella misura consentita dai fondi della tesoreria.

Prima di firmare, verifica che l'app comunichi con il contratto di claim `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c`. Il suo codice sorgente è su [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts).

Ricevi XRT di produzione su Ethereum, contratto `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. È XRT trasferito 1:1 da Polkadot tramite [Snowbridge](https://app.snowbridge.network/send). Puoi tenerlo, scambiarlo su Uniswap o trasferirlo su Polkadot. Non esiste un bridge dal vecchio token al nuovo.

I post fissano una finestra di 12 mesi per la migrazione. L'XRT non richiesto in tempo può essere ripristinato solo con un voto di governance on-chain e una prova di possesso. I termini esatti sono nei post: [Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/) e [Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/).

Domande: il gruppo Telegram [XRT Traders](https://t.me/xrt_trade).

## Polkadot Asset Hub

XRT esiste su Polkadot Asset Hub come asset estero, e c'è un pool di scambio DOT–XRT. Su Asset Hub le commissioni si possono pagare in XRT.

Per ora non è stata pubblicata una guida per spostare XRT tra Asset Hub e la parachain Robonomics.
