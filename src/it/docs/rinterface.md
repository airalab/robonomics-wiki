---
title: Interfaccia Python e Robonomics IO
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Alcuni estrinseci implementati nei pallets di Robonomics sono difficili da inviare dall'applicazione Polkadot. Inoltre, c'è la necessità di interagire con questa funzionalità utilizzando linguaggi di programmazione. A questo scopo è stato sviluppato uno strumento Python chiamato [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). Si tratta di un wrapper su [py-substrate-interface](https://github.com/polkascan/py-substrate-interface) mantenuto da polkascan. Di seguito è riportata una breve descrizione di questo pacchetto e alcuni utili collegamenti ed esempi. Viene anche discusso l'utilizzo degli strumenti CLI.**

## robonomics-interface

Disponibile su [PyPi](https://pypi.org/project/robonomics-interface/), il pacchetto è pronto per il download e l'installazione.
È disponibile anche una [documentazione](https://multi-agent-io.github.io/robonomics-interface/) dettagliata generata da docstring.

In generale, questo è uno strumento per sviluppatori che desiderano interagire con la blockchain di Robonomics tramite strumenti di programmazione. Quasi tutti i progetti Python del team di Robonomics che interagiscono con la parachain utilizzano questa interfaccia.

### Installazione

Il processo di installazione richiede che l'utente abbia installato almeno Python 3.8. Né le architetture `x86`, né `arm7`, né `arm8` richiedono un processo di compilazione. Tutte le ruote sono costruite e pubblicate dai manutentori delle dipendenze.

`pip` viene utilizzato come strumento di installazione:

```bash
$ pip3 install robonomics_interface
```

### Utilizzo di esempio

L'idea principale è creare un'istanza di `Account` e poi utilizzarla per creare istanze dedicate ai pallet.

```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

{% roboWikiNote {title:"Nodo locale", type: "note"}%}
  È anche possibile utilizzare endpoint personalizzati (ad esempio, un nodo locale per il testing):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```
{% endroboWikiNote %}

È anche possibile inviare estrinseci:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Ciao, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # questo è l'hash estrinseco
```

{% roboWikiNote {title:"Documenti", type: "note"}%}Come detto, sono disponibili ulteriori esempi sulla pagina della [documentazione](https://multi-agent-io.github.io/robonomics-interface/). {% endroboWikiNote %}

## Strumento CLI

`robonomics-interface` contiene anche strumenti CLI `click` Python da utilizzare per scopi di prototipazione e test rapidi. Viene installato con il pacchetto ed è disponibile nel Terminale:

```bash
$ robomomics_interface --help

#Usage: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Options:
#  --help  Mostra questo messaggio ed esce.
#
#Commands:
#  read   Iscriviti agli eventi datalog/launch nella catena
#  write  Invia vari estrinseci (comandi di lancio o registra datalogs)
```

Puoi provare a usarlo con un nodo locale. È adottata la filosofia del pipeline:

```bash
$ echo "Ciao, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # questo è l'hash estrinseco
```