---
title: Gemelli digitali
contributors: [nakata5321, PaTara43]

tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---
  
**Immagina di avere un dispositivo o un sistema complicato che ha diversi moduli da mantenere e richiede alcuni account per essere utilizzato. Per tenerli tutti in un unico posto o per codificare alcune funzionalità con account separati o, ad esempio, per impostare diverse origini di dati per diversi flussi di informazioni, viene utilizzato il modulo Gemello digitale.**

<robo-wiki-note type="warning" title="Dev Node">

  Si prega di prestare attenzione al fatto che questi tutorial vengono dimostrati su un'istanza locale di Robonomics Node. Configura la tua con [queste istruzioni](/docs/run-dev-node).

</robo-wiki-note>

## Panoramica della teoria
Qualsiasi account può creare e gestire un Gemello digitale. Il Gemello può essere immaginato come una sorta di tabella con i seguenti contenuti:

| DT id  | Topic Name 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Dove:
* **DT id** è un indice di Gemello digitale univoco non firmato.
* **Topic name** è un dato esadecimale `H256` o ASCII di lunghezza 32 byte, come [`Lancio`](/docs/launch) parametro estrinseco. 
Ad esempio: `0x1234....FF` o `hello.parachain.robonomics.world`.
* **Source** - è un indirizzo di Account.

<robo-wiki-note type="note" title="Topics">

  Come discusso in precedenza nella panoramica dell'estrinseco di lancio, l'`H256` può essere rappresentato come un CID IPFS codificato (vedi
  [strumento Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) per questo).
  Pertanto, i topic possono essere utilizzati anche come archivio dati, ad esempio, una descrizione del modulo di un Gemello.

</robo-wiki-note>


## Crea Gemello digitale

### 1. Vai a Developer -> Extrinsics

<robo-wiki-picture src="digital-twin/extrinsics.jpg" />

### 2. Scegli digitalTwin -> create dal menu a discesa degli estrinseci possibili

<robo-wiki-picture src="digital-twin/twin-create.jpg" />

Invia la transazione. Qui non sono necessari parametri per creare un Gemello. Sarà assegnato un indice e solo il proprietario del Gemello digitale sarà in grado di aggiungere/modificare i topic del Gemello da questo momento in poi.

L'ID del Gemello può essere trovato nella pagina di panoramica dell'Esploratore.

<robo-wiki-picture src="digital-twin/create-log.jpg" />

## Aggiungi Topic

### Scegli digitalTwin -> setSource dal menu a discesa degli estrinseci possibili

<robo-wiki-picture src="digital-twin/set-topic.jpg" />

* `id` - Digital Twin ID, che è stato ottenuto sulla pagina Esplorar.
* `topic` - nome del topic `H256` precedentemente discusso. In questa immagine è una stringa di 32 simboli.
* `source` - indirizzo dell'account da associare al topic.

<robo-wiki-note type="note" title="Overwrite">

  Fai attenzione che il topic può essere sovrascritto con un altro indirizzo di origine se necessario.

</robo-wiki-note>

Firma e invia l'estrinseco.

## Explore

Puoi trovare tutte le informazioni sui Gemelli digitali esistenti nel modulo di archiviazione `digitalTwin` dello stato della catena in `eveloper -> Chain state`.

- Numero totale di Gemelli - `total()`;
- Proprietario del Gemello digitale - `owner(u32)`;
- Informazioni sui topic di un Gemello digitale - `digitalTwin(u32)`.

<robo-wiki-picture src="digital-twin/chain-state.jpg" />