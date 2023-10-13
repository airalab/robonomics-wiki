---
title: Substrate Cumulus Parachain Testsuite per il messaggio cross-chain 

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


L'obiettivo principale di questo progetto è semplificare lo sviluppo del runtime di parachain, quando vengono utilizzati messaggi cross-chain. 
Consente lo sviluppo del codice di runtime con test di integrazione con un alto grado di ripetibilità e semplicità d'uso.
Automatizza la costruzione, la configurazione predefinita della rete (ad esempio 1 relay chain + 2 parachain), l'installazione dei canali di passaggio dei messaggi tra le parachain e l'esecuzione dei test di messaggistica, l'invio di messaggi, utilizzando la chiamata al runtime, il tutto costruito e composto in Python.

XCM Testsuite viene utilizzato per testare il ciclo di produzione di Robobank - l'insieme di pallette Substrate, che consentono ai robot di registrarsi su parachain esterne, ricevere ordini prepagati, eseguirli e ricevere pagamenti utilizzando token esterni. Ciò consente ai robot di operare all'interno della rete Robonomics con tutta l'infrastruttura necessaria, ma allo stesso tempo, offrire i loro servizi su qualsiasi altra parachain.

Un video di esempio è disponibile su [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)

I principali passaggi dello scenario di demo sono:
- lanciare la relay chain e due parachain in un pacchetto di 6 processi
- configurare i canali di messaggi XCM tra le parachain
- registrare un robot in entrambe le parachain
- creare un ordine per questo robot nella parachain client (riservando il pagamento per il completamento dell'ordine)
- inviare un messaggio XCM alla parachain Robonomics
- creare il record dell'ordine "speculare" sulla parachain Robonomics
- il robot accetta l'ordine sulla parachain Robonomics
- inviare un messaggio XCM sull'accettazione dell'ordine alla parachain client
- accettare l'ordine sulla parachain client (riservando una penale per mancato completamento dell'ordine fino alla scadenza dell'ordine)
- il robot completa l'ordine sulla parachain Robonomics
- inviare un messaggio XCM sul completamento dell'ordine alla parachain client
- regolare tutti i pagamenti (il pagamento del cliente viene trasferito al robot, così come la penale non utilizzata)
- chiudere l'ordine1


## Upstream
Questo progetto è un fork del
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
Contiene il codice dei pallette di runtime in fase di test.
Come nel codice originale del nodo, le parachain si trovano nelle cartelle "./pallets", "./runtime", "./node".

Differenze con il modello originale di "substrate-node-template":
- questo runtime del collatore ha il modulo gestore HRMP e può gestire i messaggi dalle parachain fratelli
- test di simulazione del runtime pronto per i test XCM interni

## Build & Run
Setup consigliato (molto): 
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[NOTA] La prima compilazione può richiedere molto tempo, fino a diverse ore su macchine non ottimali.

[NOTA] Lo script funziona con le versioni FISSE (commit hash) di Polkadot(Rococo) nella relay chain e nelle parachain.

[NOTA] Per impostazione predefinita, lo script ricrea lo stesso ambiente ad ogni avvio, rimuovendo tutti gli stati precedenti. Questo comportamento può essere modificato in "config.sh" utilizzando il parametro "PERSISTENT".


Esegui lo script di compilazione e configurazione.  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

Azioni di base dello script "init.sh":
 - leggi la configurazione (file "config.sh" con numero di revisione, chiavi e identificatori iniziali del nodo, parametro di persistenza dei dati della catena, ecc.)
 - configura i pacchetti del sistema operativo, Rust e Python
 - compila binari separati per la relay chain e anche per entrambe le parachain
    - i binari verranno generati nella sottodirectory ./bin. 
 - (opzionale) rimuove tutti i dati precedenti della catena per tutte le catene
    - disabilitato se "PERSISTENT=1" è impostato in "config.sh"
 - viene eseguito come processi separati (con PID e pipe I/O separati):
    - validatori della relay chain (ad esempio 4 validatori in esecuzione su una revisione stabile di Rococo)
    - collatori per la parachain-100 (ad esempio un singolo collatore per la prima parachain che si sta sviluppando)
    - collatori per la parachain-200 (ad esempio un singolo collatore per la seconda parachain che si sta sviluppando)
 - stampa tutte le endpoint, le porte sulla console, consentendo di studiare qualsiasi catena utilizzando app frontend (esploratore, DApp)
 - continua a stampare tutti i dati di output di tutte le catene sulla console

[ATTENZIONE] Dopo il lancio, attendere che la rete sia attiva, assicurarsi che la finalizzazione del blocco sia iniziata e che le parachain siano registrate. Questi processi dovrebbero richiedere circa 5 minuti (50 blocchi x 6 secondi).

## Verifica che la configurazione iniziale funzioni 

Utilizza il frontend standard di Polkadot e gli endpoint generati "--ws-port" per connettersi a ciascun nodo.
Apri [Polkadot application](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/) per monitorare le catene. 

### Esempio:
Localhost, 4 validatori della relay chain, un collatore per la parachain-100, un collatore per la parachain-200:
- [Relay validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)


Se tutto funziona e il consenso è iniziato, possiamo procedere ad eseguire i nostri casi di test (in un nuovo terminale).

### Test di trasmissione dei messaggi UMP
```bash
./scripts/init.sh ump
```
Crea un messaggio `Balance.transfer` in `parachain-100` e lo passa alla relay chain.
Quando la relay chain riceve il messaggio, trasferisce 15 token dall'account `para 100` all'account Charlie.


### Test di trasmissione dei messaggi HRMP
```bash
./scripts/init.sh ump
```

Crea un messaggio `Balance.transfer` in `parachain-100` e lo passa al `sibling 200`.
Prima di ciò, fornisce all'account `subl 100` 1000 token e stabilisce un canale di comunicazione tra le parachain.
```bash
./scripts/init.sh hrmp
```
I messaggi successivi possono essere inviati eseguendo il sottocomando `hrmpm`. Non crea un canale e quindi viene eseguito più velocemente.
```bash
./scripts/init.sh hrmpm
```

### Altre opzioni
```bash
./scripts/init.sh help
```

## Testnet locale

### Crea una specifica di catena personalizzata
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

Modifica rococo_local.json, sostituisci i parametri di bilancio e autorità con i tuoi.
```json
  "keys": [
    [
      "",
      "",
      {
        "grandpa": "",
        "babe": "",
        "im_online": "",
        "para_validator": "",
        "para_assignment": "",
        "authority_discovery": ""
      }
    ]
```

Indirizzo Polkadot per //Alice//stash (crittografia sr25519).
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
Secret Key URI `//Alice//stash` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Chiave di sessione grandpa di Polkadot per //Alice (crittografia ed25519).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Indirizzo Polkadot per //Alice (crittografia sr25519).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Converti rococo_local.json nel formato raw.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
Per utilizzare la nuova specifica di catena, sostituisci il file rococo.json nella directory ./config/ con questo nuovo e riavvia la catena.
```bash
./scripts/init.sh run
```
Puoi modificare liberamente il codice. Il comando precedente ricostruirà il progetto e aggiornerà il nodo collator prima di avviarlo.
Cumulus è un software pre-release ancora in fase di sviluppo intensivo.
Stiamo utilizzando un commit specifico di polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15 18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)

Puoi utilizzare versioni più recenti del software. Per farlo, modifica POLKADOT_COMMIT in ./scipt/config.sh
all'ultimo commit del ramo `rococo-v1`, elimina ./bin/polkadot e esegui 
```bash
./scripts/init.sh run
```

Aggiorna le dipendenze del progetto collator 
```bash
cargo update
./scripts/init.sh build
```
Alcune dipendenze probabilmente richiedono nuove funzionalità del toolchain di Rust. Questo progetto si basa su Rust `nightly-2021-01-26`
Aggiorna la versione del toolchain di Rust in ./scripts/config.sh prima di compilare.

## Hack parachain
[Aggiungi un pallet esterno](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - dovrebbe probabilmente essere in "ulteriori informazioni"?
## Learn More

Fai riferimento al [Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template) per saperne di più sulla struttura di questo progetto, sulle capacità che incapsula e sul modo in cui tali capacità sono implementate. Puoi saperne di più su [Il percorso di un blocco di parachain](https://polkadot.network/the-path-of-a-parachain-block/) sul blog ufficiale di Polkadot. [Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)
