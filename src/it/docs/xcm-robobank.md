---
title: Suite di test della Parachain Cumulus Substrate per il messaggio cross-chain

contributors: [ddulesov, boogerwooger, tubleronchik]
---

L'obiettivo principale di questo progetto è semplificare lo sviluppo del runtime della parachain quando vengono utilizzati messaggi cross-chain.
Consente lo sviluppo del codice del runtime con test di integrazione ad alto grado di ripetibilità e semplicità d'uso.
Automatizza la costruzione, la creazione di una configurazione di rete predefinita (cioè 1 relay chain + 2 parachains), l'impostazione dei canali di passaggio dei messaggi tra le parachains e l'esecuzione di test di messaggistica, l'invio di messaggi, utilizzando la chiamata al runtime, il tutto costruito e composto in Python.

Il Testsuite XCM viene utilizzato per testare il ciclo produttivo di Robobank - l'insieme di pallets Substrate, che consentono ai robot di registrarsi su parachains esterne, ricevere ordini prepagati, eseguirli e ricevere pagamenti utilizzando token esterni. Ciò consente ai robot di operare all'interno della rete Robonomics con tutta l'infrastruttura necessaria, ma allo stesso tempo, offrire i loro servizi su qualsiasi altra parachain.

Un esempio video è disponibile su [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)

I principali passaggi nello scenario dimostrativo sono:
- avviare la relay chain e due parachains in un pacchetto di 6 processi
- impostare i canali di messaggi XCM tra le parachains
- registrare un robot in entrambe le parachains
- creare un ordine per questo robot nella parachain client (riservando il pagamento per il completamento dell'ordine)
- inviare un messaggio XCM alla parachain Robonomics
- creare il record dell'ordine "specchiato" sulla parachain Robonomics
- il robot accetta l'ordine sulla parachain Robonomics
- inviare un messaggio XCM sull'accettazione dell'ordine alla parachain client
- accettare l'ordine sulla parachain client (riservando una tassa di penalità per mancato completamento dell'ordine fino alla scadenza dell'ordine)
- il robot completa l'ordine sulla parachain Robonomics
- inviare un messaggio XCM sul completamento dell'ordine alla parachain client
- regolare tutti i pagamenti (il pagamento del cliente viene trasferito al robot, così come la tassa di penalità non utilizzata)
- chiudere l'ordine

## Sorgente
Questo progetto è un fork del
[Modello di Nodo del Substrate Developer Hub](https://github.com/substrate-developer-hub/substrate-node-template).
Contiene il codice dei pallets del runtime in fase di test.
Come nell'originaleIl codice node delle parachains si trova nelle cartelle "./pallets", "./runtime", "./node".

Differenze con il "substrate-node-template" originale:
- questo runtime del collatore ha il modulo gestore HRMP e può gestire messaggi dalle parachains fratelle
- mock test runtime pronto per test XCM interni

## Costruzione ed Esecuzione
Configurazione consigliata (altamente):
```
Ubuntu 20, 16 Gb di RAM, 8 CPU, 120 Gb di SSD
```
[NOTA] La prima compilazione può richiedere molto tempo, fino a diverse ore su macchine non ottimali.

[NOTA] Lo script funziona con le versioni FISSE (hash dei commit) di Polkadot(Rococo) nella relay chain e nelle parachains.

[NOTA] Per impostazione predefinita, lo script ricrea lo stesso ambiente ad ogni avvio, rimuovendo tutti gli stati precedenti. Questo comportamento può essere modificato in "config.sh" utilizzando il parametro "PERSISTENT".

Esegui lo script di compilazione e configurazione.
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

Azioni di base dello script "init.sh":
 - legge la configurazione (file "config.sh" con numero di revisione, chiavi e identificatori iniziali del nodo, parametro di persistenza dei dati della catena, ecc.)
 - configura i pacchetti OS, Rust e Python
 - genera binari separati per la relay chain e anche per entrambe le parachains
    - i binari verranno generati nella sottodirectory ./bin.
 - (opzionale) rimuove tutti i dati della catena precedenti per tutte le catene
    - disabilitato se "PERSISTENT=1" è impostato in "config.sh"
 - esegue come processi separati (con PID e pipe I/O separati):
    - validatori della relay chain (cioè 4 validatori che eseguono una revisione stabile di Rococo)
    - collatori per la parachain-100 (cioè un singolo collatore per la prima parachain che stai sviluppando)
    - collatori per la parachain-200 (cioè un singolo collatore per la seconda parachain che stai sviluppando)
 - stampa tutti gli endpoint, le porte sulla console, consentendoti di studiare qualsiasi catena utilizzando app frontend (esploratore, DApp)
 - continua a stampare tutti i dati di output di tutte le catene sulla console

[ATTENZIONE] Dopo il lancio, attendere che la rete sia attiva, assicurarsi che la finalizzazione del blocco sia iniziata e che le parachains siano registrate. Questi processi dovrebberoRichiede circa 5 minuti (50 blocchi x 6 secondi).

## Verifica che la configurazione iniziale funzioni

Utilizza il frontend standard di Polkadot e gli endpoint generati "--ws-port" per connetterti con ciascun nodo.
Apri l'[applicazione Polkadot](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/) per monitorare le catene.

### Esempio:
Localhost, 4 validatori della catena di relè, un collatore della parachain-100, un collatore della parachain-200:
- [Validatore di relè 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Validatore di relè 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Validatore di relè 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Validatore di relè 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Collatore della Parachain-100](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Collatore della Parachain-200](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)

Se tutto funziona e il consenso è stato avviato, possiamo procedere ad eseguire i nostri casi di test (in un nuovo terminale).

### Test di passaggio dei messaggi UMP
```bash
./scripts/init.sh ump
```
Crea un messaggio `Balance.transfer` nella `parachain-100` e lo passa alla catena di relè.
Quando la catena di relè riceve il messaggio, trasferirà 15 token dall'account `para 100` all'account di Charlie.

### Test di passaggio dei messaggi HRMP
```bash
./scripts/init.sh ump
```

Crea un messaggio `Balance.transfer` nella `parachain-100` e lo passa alla `sibling 200`.
Prima di ciò, endow il conto `subl 100` con 1000 token e stabilisce un canale di comunicazione tra le parachains.
```bash
./scripts/init.sh hrmp
```
I messaggi successivi possono essere inviati eseguendo il sottocomando `hrmpm`. Non crea un canale e quindi si esegue più velocemente.
```bash
./scripts/init.sh hrmpm
```

### Altre opzioni
```bash
./scripts/init.sh help
```

## Testnet Locale### Creare specifiche di catena personalizzate
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

Modifica rococo_local.json, sostituisci i parametri dei saldi e delle autorità con i tuoi.
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
URI chiave segreta `//Alice//stash` è account:
Seed segreto:      

Chiave pubblica (esadecimale): 

ID account:       

Indirizzo SS58:     
```

Chiave di sessione grandpa di Polkadot per //Alice (crittografia ed25519).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
URI chiave segreta `//Alice` è account:
Seed segreto:      

Chiave pubblica (esadecimale): 

ID account:       

Indirizzo SS58:     
```

Indirizzo Polkadot per //Alice (crittografia sr25519).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
URI chiave segreta `//Alice` è account:
Seed segreto:      

Chiave pubblica (esadecimale): 

ID account:       

Indirizzo SS58:     
```

Converti rococo_local.json nel formato grezzo.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
Per utilizzare le nuove specifiche di catena, sostituisci il file rococo.json nella directory ./config/ con questo nuovo e riavvia la catena.
```bash
./scripts/init.sh run
```
Puoi modificare liberamente il codice. Il comando sopra ricostruirà il progetto e aggiornerà il nodo collator prima di avviarlo.
Cumulus è un software pre-release ancora in fase di sviluppo intenso.
Stiamo utilizzando un commit specifico di polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)

Puoi utilizzare versioni più recenti del software. Per farlo, cambia  POLKADOT_COMMIT  in ./scipt/config.sh
all'ultimo commit del ramo `rococo-v1`, elimina ./bin/polkadot e esegui 
```bash
./scripts/init.sh run
```

Aggiorna le dipendenze del progetto del collator 
```bash
cargo update
./scripts/init.sh build
```
Probabilmente alcune dipendenze richiedono nuove funzionalità del toolchain di Rust. Questo progetto si basa su Rust `nightly-2021-01-26`
Aggiorna la versione del toolchain di Rust in ./scripts/config.sh prima di compilare.

## Hack parachain
[Aggiungi pallet esterno](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - dovrebbe probabilmente essere in "ulteriori informazioni"?
## Ulteriori informazioni

Fai riferimento all'upstream
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)
per saperne di più sulla struttura di questo progetto, sulle capacità che racchiude e sul modo in cui
tali capacità sono implementate. Puoi approfondire
[Il Percorso di un Blocco Parachain](https://polkadot.network/the-path-of-a-parachain-block/) sul
blog ufficiale di Polkadot.
[Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)