---
title: Gemelli Digitali
contributors: [nakata5321, PaTara43]

strumenti:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Immagina di avere un dispositivo o sistema complicato che ha diversi moduli da mantenere e richiede alcuni account per essere utilizzato. Per mantenere tutto in un unico posto o per codificare alcune funzionalità con account separati o, ad esempio, per impostare diverse fonti di dati per diversi flussi informativi, viene utilizzato il modulo Gemello Digitale.**

{% roboWikiNote {title:"Nodo Dev", type: "warning"}%} Presta attenzione che questi e i tutorial seguenti sono dimostrati su un'istanza locale di Robonomics Node. Configura il tuo con [queste istruzioni](/docs/run-dev-node).
{% endroboWikiNote %}

## Panoramica della teoria
Qualsiasi account può creare e gestire un Gemello Digitale. Il Gemello può essere immaginato come una sorta di tabella con i seguenti contenuti:

| ID Gemello  | Nome Argomento 	| Fonte    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Dove:
* **ID Gemello** è un indice univoco di Gemello Digitale non firmato.
* **Nome Argomento** è un dato esadecimale `H256` o ASCII di lunghezza 32 byte, come il parametro estrinseco [`Launch`](/docs/launch).
Ad esempio: `0x1234....FF` o  `hello.parachain.robonomics.world`.
* **Fonte** - è un indirizzo di un account.

{% roboWikiNote {title:"Argomenti", type: "note"}%} Come discusso in precedenza nella panoramica dell'estrinseco di Lancio, l'`H256` può essere rappresentato come un CID IPFS codificato (vedi [strumento Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) per questo).
Pertanto, gli argomenti possono essere utilizzati anche come archiviazione di dati, ad esempio, una descrizione del modulo di un Gemello. {% endroboWikiNote %}


## Creare un Gemello Digitale

### 1. Vai su Sviluppatore -> Estrinseci

{% roboWikiPicture {src:"docs/digital-twin/extrinsics.jpg", alt:"estrinseci"} %}{% endroboWikiPicture %}

### 2. Scegli digitalTwin -> crea dall'elenco a discesa degli estrinseci possibili

{% roboWikiPicture {src:"docs/digital-twin/twin-create.jpg", alt:"crea-gemello"} %}{% endroboWikiPicture %}

Invia la transazione. Qui, non sono necessari parametri per creare un Gemello. Sarà assegnato un indice e solo il proprietario del Gemello Digitale potrà aggiungere/modificare gli argomenti del Gemello da ora in poi.

L'ID del Gemello può essere trovato sulla pagina di panoramica dell'Esploratore.

{% roboWikiPicture {src:"docs/digital-twin/create-log.jpg", alt:"crea-log"} %}{% endroboWikiPicture %}

## Aggiungi Argomento

### Scegli digitalTwin -> setSource dall'elenco a discesa degli estrinseci possibili

{% roboWikiPicture {src:"docs/digital-twin/set-topic.jpg", alt:"imposta-argomento"} %}{% endroboWikiPicture %}

* `id` - ID del Gemello Digitale, ottenuto dalla pagina dell'Esploratore.
* `argomento` - nome dell'argomento `H256` precedentemente discusso. In questa immagine è una stringa di 32 simboli.
* `fonte` - indirizzo dell'account da associare all'argomento.

{% roboWikiNote {title:"Sovrascrittura", type: "note"}%} Presta attenzione che l'argomento può essere sovrascritto con un altro indirizzo di origine se necessario.{% endroboWikiNote %}

Firma e invia l'estrinseco.

## Esplora

Puoi trovare tutte le informazioni sui Gemelli Digitali esistenti nel modulo di archiviazione `digitalTwin` di `Sviluppatore -> Stato della catena`.

- Numero totale di Gemelli - `total()`;
- Proprietario del Gemello Digitale - `owner(u32)`;
- Informazioni sugli argomenti di un Gemello Digitale - `digitalTwin(u32)`.

{% roboWikiPicture {src:"docs/digital-twin/chain-state.jpg", alt:"stato-catena"} %}{% endroboWikiPicture %}