---
title: Primi passi
contributors: [Vourhey, positivecrash, ensrationis]
---

Questa pagina ti porta da zero al tuo primo record sulla rete Robonomics. Ti servono un browser, un'estensione wallet e un po' di XRT.

## 1. Crea un account

1. Installa l'[estensione Polkadot.js](https://polkadot.js.org/extension/) o un altro wallet Polkadot che supporti reti personalizzate.
2. Crea un account nel wallet. Annota la frase di recupero e conservala offline.
3. Lo stesso account funziona su Robonomics. Robonomics mostra gli indirizzi nel proprio formato (prefisso SS58 32), quindi lì il tuo indirizzo inizia con `4`.

Un account esiste on-chain solo quando contiene almeno il deposito esistenziale, 0.000001 XRT.

## 2. Procurati XRT

Ne serve pochissimo. Al momento in cui scriviamo, un record datalog costa in commissioni molto meno di 0.001 XRT.

Dove si scambia XRT oggi:

- **Uniswap su Ethereum.** L'XRT di produzione su Ethereum è XRT trasferito da Polkadot tramite Snowbridge. Il suo contratto è `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. [Scambia su Uniswap](https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x1f752250f518e419f2f03804e25728c5c6dff73f). [Snowbridge](https://app.snowbridge.network/send) sposta i token tra Ethereum e Polkadot.
- **Polkadot Asset Hub.** XRT esiste su Asset Hub, e lì c'è un pool di scambio DOT–XRT.

Spostare XRT da Asset Hub al tuo account sulla parachain Robonomics è un trasferimento cross-chain. Per ora non è stata pubblicata una guida passo passo. Se ti blocchi, chiedi nel gruppo Telegram [XRT Traders](https://t.me/xrt_trade).

{% roboWikiNote {type: "warning", title: "Link vecchi"}%} Alcune pagine più vecchie rimandano ancora a exchange che non quotano più XRT e al vecchio token Ethereum `0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`. Il vecchio token non è l'XRT di produzione. {% endroboWikiNote %}

## 3. Collega Polkadot.js Apps

Apri [Polkadot.js Apps con l'RPC di Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer). Si collega all'endpoint pubblico `wss://polkadot.rpc.robonomics.network/`. Autorizza il sito nell'estensione wallet perché compaia il tuo account.

Per vedere blocchi, account e trasferimenti puoi usare anche il block explorer [scan.robonomics.network](https://scan.robonomics.network).

<a id="4-send-your-first-record"></a>

## 4. Invia il tuo primo record

Il primo passo più semplice è un record datalog: un piccolo dato salvato on-chain sotto il tuo account.

1. In Polkadot.js Apps apri **Developer → Extrinsics**.
2. Scegli il tuo account, poi `datalog` e `record`.
3. Inserisci i dati, fino a 512 byte. Va bene anche testo semplice.
4. Invia la transazione e firmala nel wallet.

Per rileggerlo apri **Developer → Chain state**, scegli `datalog` e `datalogIndex` e interroga il tuo account. Vedrai quali slot contengono i tuoi record. Poi interroga `datalogItem` con il tuo account e il numero di uno slot. Ogni record ha un timestamp.

Datalog è uno dei [pallet legacy](/docs/legacy-pallets/#datalog). Funziona ancora ed è un buon primo test, ma i nuovi progetti dovrebbero usare l'albero dei dispositivi.

## 5. Prossimo passo: descrivi i tuoi dispositivi

Il cuore di Robonomics è l'albero dei dispositivi. Crei un nodo per la tua installazione, aggiungi nodi per le sue parti e i dispositivi, e decidi chi può aggiornarli. Vedi [Albero dei dispositivi (CPS)](/docs/device-tree/), poi [Collegare i dispositivi](/docs/connect-devices/).
