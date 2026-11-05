---
title: Albero dei dispositivi (CPS)
contributors: [ensrationis]
---

L'albero dei dispositivi descrive la tua installazione nel cloud Robonomics: un sito, le sue stanze, i dispositivi al loro interno. Ogni parte è un nodo. La chain conserva la struttura dell'installazione e l'ultimo stato di ogni nodo. Non è pensata per grandi volumi di dati.

Nel runtime l'albero dei dispositivi è il pallet `CPS` (sistemi cyber-fisici). Riferimento tecnico completo: [README del pallet CPS](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md).

## Nodi

- Ogni nodo ha un numero (`NodeId`). I numeri crescono di uno in uno e non vengono mai riusati.
- Un nodo può avere un genitore. Un nodo senza genitore è un nodo radice.
- Un nodo ha due campi, entrambi facoltativi:
  - `meta`: una descrizione che cambia di rado, fino a 1 KiB.
  - `payload`: lo stato attuale, fino a 8 KiB.
- Entrambi i campi sono semplici byte. Il formato lo scegli tu, per esempio JSON.
- Il genitore di un nodo non cambia mai. Per spostare un nodo, creane uno nuovo e cancella quello vecchio.
- Un nodo può avere al massimo 100 figli. Si può cancellare solo un nodo senza figli.

<!-- -->

{% roboWikiNote {type: "warning", title: "I dati sono pubblici"}%} Tutto ciò che sta nell'albero dei dispositivi può essere letto da chiunque. Se i dati devono restare privati, cifrali prima di scriverli. Lo strumento `cps` di [airalab/robins](https://github.com/airalab/robins) può cifrarli per te. {% endroboWikiNote %}

## Scope

Uno Scope è la parte dell'albero che appartiene a un account.

- Quando crei un nodo radice, crei anche uno Scope, e ne sei il proprietario.
- Ogni nodo appartiene alla radice di Scope più vicina sopra di lui, oppure al proprio Scope se è esso stesso una radice di Scope.
- Puoi trasformare un nodo all'interno del tuo albero nella radice di un nuovo Scope annidato. Uno Scope annidato è un confine netto: il proprietario esterno e i permessi esterni non hanno effetto al suo interno. Un'eccezione: il proprietario dello Scope che lo contiene direttamente può sostituirlo.
- Il proprietario di uno Scope non cambia mai. Per cedere uno Scope lo si sostituisce: un account autorizzato a creare uno Scope sul suo nodo radice chiama `create_scope`. Si ottiene un nuovo ID di Scope, il chiamante diventa proprietario e tutti i vecchi permessi vengono cancellati.
- Uno Scope è profondo al massimo 32 nodi, contando da un nodo fino alla sua radice di Scope. L'albero intero può essere più profondo.
- Uno Scope scompare solo quando viene cancellato il suo nodo radice.

## Access

Il proprietario dello Scope può fare tutto al suo interno. Gli altri account hanno bisogno di un permesso, che solo il proprietario può concedere.

| Capability | Consente |
|---|---|
| `Write` | `set_meta` e `set_payload` |
| `CreateScope` | `create_scope` |

- Un permesso vale in una di due modalità: `Node` (un solo nodo) o `Subtree` (il nodo e tutto ciò che sta sotto, ma non dentro gli Scope annidati).
- Uno Scope contiene al massimo 32 permessi.
- Creare figli, cancellare nodi e concedere o revocare permessi non si può delegare. Può farlo solo il proprietario.

Altre capability (per transazioni, storage e calcolo) sono previste nella roadmap 5.0. Non sono ancora nel runtime.

## Account dei nodi

Un nodo può essere legato a un account, la sua identità. Di solito è la chiave del dispositivo stesso. Un account può essere l'identità di un solo nodo, quindi puoi trovare un nodo a partire dall'account del dispositivo.

- Solo il proprietario dello Scope può impostare o rimuovere un'identità. Il permesso `Write` non basta.
- Se l'identità non è il chiamante, l'account dell'identità deve firmare un permit. Il permit è la codifica SCALE di `(b"robonomics:cps:node-identity:v1", genesis_hash, scope_id, valid_until)`, firmata come byte grezzi senza il wrapper `<Bytes>`.
- Un permit vale al massimo un giorno (14,400 blocchi). Non si consuma: funziona nel suo Scope fino alla scadenza. Sostituire lo Scope invalida i vecchi permit.
- Un nuovo nodo radice accetta come identità solo l'account del chiamante.
- Cancellare un nodo rimuove la sua identità.

## Chiamate

Polkadot.js mostra questi nomi in camelCase, per esempio `cps.createNode`.

| Chiamata | Argomenti | Chi può chiamarla |
|---|---|---|
| `create_node` | `parent_id` (facoltativo), `meta` (facoltativo), `payload` (facoltativo), `identity` (facoltativo: un account e, se serve, un permit) | Nodo radice: qualsiasi account, che diventa proprietario dello Scope. Nodo figlio: il proprietario dello Scope del genitore. |
| `set_meta` | `node_id`, `meta` (`None` lo rimuove) | Chi ha `Write` |
| `set_payload` | `node_id`, `payload` (`None` lo rimuove) | Chi ha `Write` |
| `delete_node` | `node_id` | Proprietario dello Scope. Il nodo non deve avere figli. Cancellare una radice di Scope cancella lo Scope e i suoi permessi. |
| `create_scope` | `node_id` | Chi ha `CreateScope`. Alla radice di uno Scope annidato, anche il proprietario dello Scope che lo contiene. |
| `grant_access` | `node_id`, `principal`, `capability` (`Write` o `CreateScope`), `mode` (`Node` o `Subtree`) | Proprietario dello Scope |
| `revoke_access` | `node_id`, `principal`, `capability` | Proprietario dello Scope |
| `set_identity` | `node`, `identity`, `permit` (facoltativo) | Proprietario dello Scope |
| `clear_identity` | `node` | Proprietario dello Scope |

Eventi: `NodeCreated`, `MetaSet`, `PayloadSet`, `NodeDeleted`, `ScopeCreated`, `ScopeDeleted`, `AccessGranted`, `AccessRevoked`, `IdentitySet`, `IdentityCleared`.

## Leggere l'albero

- Le letture semplici sono query sullo storage: `cps.nodes`, `cps.meta`, `cps.payload`, `cps.children`.
- Il pallet ha anche delle view function (richiedono i metadata V16, che la chain fornisce):
  - per numero di nodo: `resolve_scope`, `has_capability`, `identity_of`, `node_by_identity`;
  - per account del dispositivo: `parent`, `children`, `meta`, `payload`, `scope_of`, `address_capability`. Falliscono con `MissingProjectedIdentity` se un nodo nel risultato non ha un'identità.
- In JavaScript le view function sono `api.view.cps.*`, che richiede una versione di `@polkadot/api` con supporto alle view function. In Rust si trovano nel crate tipizzato `robonomics-runtime-subxt-api`.

## Limiti e commissioni

| Limite | Valore |
|---|---|
| Dimensione di `meta` | 1,024 byte |
| Dimensione di `payload` | 8,192 byte |
| Profondità dello Scope | 32 nodi |
| Figli per nodo | 100 |
| Permessi per Scope | 32 |
| Durata del permit di identità | 1 giorno (14,400 blocchi) |

Sono costanti del runtime. Per cambiarle serve un aggiornamento del runtime.

L'albero dei dispositivi non richiede un deposito per lo storage. Paghi la normale commissione della transazione, che cresce con la dimensione dei dati. Per esempio, al momento in cui scriviamo, un nodo radice con 100 byte di `meta` e 100 byte di `payload` costa circa 0.0003 XRT.

## Strumenti

- Lo strumento a riga di comando `cps` e la libreria Rust `libcps` coprono tutto l'albero dei dispositivi. Vedi [Librerie client](/docs/client-libraries/#cps-command-line-tool).
- Funziona anche qualsiasi client in grado di inviare extrinsic, per esempio `@polkadot/api`.
- Per i dispositivi che non possono parlare direttamente con la chain, vedi [Collegare i dispositivi](/docs/connect-devices/).

## Cosa arriverà

Con gli abbonamenti (5.0, in lavorazione) il proprietario dello Scope potrà pagare le transazioni dei dispositivi dell'albero, così un sensore potrà scrivere senza possedere XRT. Non è ancora nel runtime.
