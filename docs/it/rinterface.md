---
title: Interfaccia Python e Robonomics IO
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Alcune estrinseche implementate nei pallet Robonomics sono difficili da inviare dall'app Polkadot. Inoltre, 
è necessario interagire con questa funzionalità utilizzando linguaggi di programmazione. A questo scopo è stato sviluppato uno strumento Python semplice
chiamato [interfaccia-robonomics](https://github.com/Multi-Agent-io/robonomics-interface). È un wrapper gestito da Polkascan
[py-substrate-interface](https://github.com/polkascan/py-substrate-interface). Di seguito è riportata una breve descrizione di questo pacchetto
e alcuni link utili ed esempi. Inoltre, viene discusso lo strumento CLI.**

## robonomics-interface

Disponibile su [PyPi](https://pypi.org/project/robonomics-interface/) il pacchetto è pronto per il download e l'installazione.
È disponibile anche una documentazione dettagliata generata da docstring [documentazione](https://multi-agent-io.github.io/robonomics-interface/).

Tutto sommato, si tratta di uno strumento per sviluppatori che desiderano interagire con la blockchain Robonomics tramite strumenti di programmazione. Quasi 
tutti i progetti Python del team Robonomics che interagiscono con la parachain utilizzano questa interfaccia.

### Installazione

Il processo di installazione richiede che l'utente abbia almeno Python 3.8 installato. Né `x86`, né `arm7`, né `arm8`
architetture richiedono un processo di compilazione. Tutte le ruote sono costruite e pubblicate dai manutentori delle dipendenze.

`pip` viene utilizzato come strumento di installazione:

```bash
$ pip3 install robonomics_interface
```

### Esempio di utilizzo

L'idea principale è creare un'istanza di `Account` e poi usarla per creare istanze dedicate ai pallet.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  È anche possibile utilizzare endpoint personalizzati (ad esempio un nodo locale per i test):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

È anche possibile inviare estrinseche:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  Come detto, sono disponibili ulteriori esempi nella [documentazione](https://multi-agent-io.github.io/robonomics-interface/).

</robo-wiki-note>

## CLI tool

`robonomics-interface` contiene anche strumenti CLI Python `click` da utilizzare per scopi di prototipazione e test rapidi. Viene installato
con il pacchetto ed è disponibile nel Terminale:

```bash
$ robomomics_interface --help

#Usage: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Options:
#  --help  Show this message and exit.
#
#Commands:
#  read   Subscribe to datalog/launch events in the chain
#  write  Send various extrinsics (launch commands or record datalogs)
```

Puoi provare a usarlo con un nodo locale. Viene adottata la filosofia del pipeline:

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```