---
title: Responsabilità
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Per trasformare i robot in agenti economici è necessario uno strumento contrattuale per questo. Incontra Liability - Robonomics pallet che implementa contratti tra account parachain!**

<robo-wiki-note type="warning" title="Dev Node">

  Si prega di prestare attenzione al fatto che questo tutorial viene dimostrato su un'istanza locale di Robonomics Node. Configura la tua con [queste istruzioni](/docs/run-dev-node).

</robo-wiki-note>

## Panoramica della teoria

Tornando all'Ethereum c'era una struttura abbastanza complicata di interazione di responsabilità. Puoi conoscerla [qui](/docs/robonomics-how-it-works). Oggi le cose sono un po' più facili con Kusama!

### Negoziazioni

Per firmare un contratto le due parti devono prima negoziare. Questa operazione può essere eseguita in diversi modi, tra cui [IPFS PubSub](https://blog.ipfs.tech/25-pubsub/) o Robonomics PubSub. Un esempio di codice Python che utilizza Robonomics PubSub è
presentato [qui](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub). 

Offerta e domanda sono messaggi che contengono due caratteristiche principali di un contratto: **descrizione del lavoro** e **prezzo**. Il formato del messaggio deve essere progettato dall'utente per ogni applicazione specifica. Non è così importante nel processo di negoziazione seguire una regola di formato rigorosa. Il flusso possibile è presentato nell'immagine qui sotto.

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  Si noti che PubSub è un protocollo aperto, quindi non dovrebbero essere trasferiti dati sensibili. Per questo è necessario utilizzare altri protocolli.

</robo-wiki-note>


### Firme

Una volta che i negoziati si sono conclusi con successo, ciascuna parte deve firmare il cosiddetto accordo denominato firma. Questo è un messaggio contenente la descrizione del lavoro e il prezzo **in un formato specifico** firmato con una chiave privata dell'account.
Esiste anche uno [Strumento Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) per questo.
 - La descrizione del lavoro è chiamata **tecnica**. Si tratta di una stringa lunga 32 byte simile a un lancio che può essere un CID IPFS codificato.
 - Il prezzo è chiamato **economia**. Si tratta di un decimale XRT - Weiner. 1 Weiner = 10**-9 XRT.

<robo-wiki-note type="note" title="32 bytes">

  È possibile ottenere un [CID IPFS](https://ipfs.tech/) formattato correttamente con la [libreria Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
  Quando si utilizza la funzione `sign_liability`, non è necessario trasformare l'hash, verrà fatto automaticamente.

</robo-wiki-note>

Seguendo l'esempio del caffè:

1. Il compito è un JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. Il suo CID IPFS è `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Quindi la **tecnica** (CID trasformato) è `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9` 
4. **Economia** è `1,5 XRT`.

Quando viene firmato, è il momento di creare una responsabilità! Questo può essere fatto da una delle parti (sia il promissario che il promittente) o da un account di terze parti di un cosiddetto fornitore.

## Creare responsabilità

### Preparativi

Come accennato in precedenza, nel processo sono coinvolti almeno due parti. Per questo esempio, utilizziamo tre e creiamo un fornitore separato per questo. Supponiamo che le negoziazioni abbiano già avuto luogo in qualche modo.

### 1. Crea tre account e aggiungi fondi ad essi

<robo-wiki-picture src="liability/balances.jpg" />

Qui abbiamo fornito al fornitore 100 XRT per firmare le estrinseche di responsabilità, al promissario sono stati dati 2 XRT per pagare il lavoro.
Al promittente non sono stati concessi fondi (tranne un deposito esistenziale di almeno 1 mXRT).

### 1. Vai su Developer -> Extrinsics

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. Scegli la liability -> create dal menu a discesa delle estrinseche possibili

Scegli anche un account con cui desideri inviare l'estrinseco. Compila tutti i parametri.

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="Signatures">

  Poiché qui viene utilizzato il fornitore, non è necessario conoscere i seed dei partecipanti. Sono necessarie solo le loro firme.

</robo-wiki-note>

### 3. Invia la transazione

<robo-wiki-picture src="liability/submit.jpg" />

### 4. Esamina la tua responsabilità negli eventi

Per fare ciò, vai su `Network -> Explorer` e trova un elenco di eventi sulla destra. Fai clic su un'icona a triangolo per espanderla.

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  The hash may be transformed to an IPFS CID with the same [Python tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).

</robo-wiki-note>

### 5. Esplorazione dello storage

Puoi anche esplorare alcune caratteristiche delle responsabilità nel modulo di storage `liability`.

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  La funzione di storage `Next Index` mostra l'ultimo indice di responsabilità +1, quindi anche se è `1`, la responsabilità `0` viene esplorata.

</robo-wiki-note>

## Rapporti

Immagina che sia stato preparato un caffè e ora la macchina del caffè ha bisogno di segnalarlo in qualche modo. Ecco dove entrano in gioco i rapporti di responsabilità. Come prova di lavoro, l'account aggiunge un altro CID IPFS come contenuto del rapporto quando si finalizza la responsabilità esistente. Anche questo richiede una firma del promittente.

<robo-wiki-note type="note" title="Report signature">

  Il messaggio firmato contiene l'indice di responsabilità esistente e l'IPFS CID del rapporto codificato in una rappresentazione di 32 byte. Ancora una volta, lo [strumento Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) può aiutare a firmare il rapporto.

</robo-wiki-note>

Continuando con l'esempio della macchina del caffè:

1. Il rapporto è un JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. Il suo IPFS CID è `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Quindi il **carico utile** (CID trasformato) è "0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2"
4. **L'indice** è `0`, è l'indice di responsabilità esistente.

### 1. Naviga su extrinsics, liability -> finalize(report)

Compila i parametri e invia estrinseco. Ancora una volta, questo può essere fatto da un account di terze parti.

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  Fai attenzione che l'account promettente non dovrebbe essere "morto" - dovrebbe avere un deposito esistenziale di almeno 1 mXRT.

</robo-wiki-note>

Firma e invia il rapporto. Quando hai finito, puoi esplorarlo negli eventi.

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. Esplora i rapporti

Puoi anche osservare il rapporto nello storage. Vai su `Developer -> Storage` e scegli `liability` dalla lista a discesa.

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. Controlla i saldi

Nell'immagine è mostrato che ora il promettente ha ricevuto il "salario". È avvenuta una relazione economica!

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Verifying">

  Al momento non c'è modo di verificare che il lavoro sia stato completato, quindi non appena il promettente segnala, i token vengono trasferiti sul suo account. 
  La funzione di verifica verrà aggiunta in futuro.

</robo-wiki-note>