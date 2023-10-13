---
title: Interface Python e Robonomics IO
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Algumas extrínsecas implementadas em paletes Robonomics são difíceis de serem enviadas pelo aplicativo Polkadot. Além disso, 
há a necessidade de interagir com essa funcionalidade usando linguagens de programação. Para esse fim, uma ferramenta Python simples foi desenvolvida
chamado [interface robonomics](https://github.com/Multi-Agent-io/robonomics-interface). É um invólucro mantido pelo polkascan
[py-substrate-interface](https://github.com/polkascan/py-substrate-interface). Abaixo está uma breve descrição deste pacote
e alguns links e exemplos úteis. Além disso, as ferramentas CLI são discutidas.**

## robonomics-interface

Disponível no [PyPi](https://pypi.org/project/robonomics-interface/) o pacote está pronto para download e configuração.
Há também uma documentação detalhada gerada por docstring [documentação](https://multi-agent-io.github.io/robonomics-interface/) disponível.

No geral, esta é uma ferramenta para desenvolvedores que desejam interagir com a blockchain Robonomics por meio de ferramentas de programação. Quase 
todos os projetos Python da equipe Robonomics que interagem com a parachain usam esta interface.

### Instalação

O processo de instalação requer que o usuário tenha pelo menos o Python 3.8 instalado. Nem `x86`, nem `arm7`, nem `arm8`
arquiteturas requerem processo de compilação. Todas as rodas são construídas e publicadas pelos mantenedores das dependências.

`pip` é usado como ferramenta de instalação:

```bash
$ pip3 install robonomics_interface
```

### Uso de exemplo

A ideia principal é criar uma instância de `Account` e depois usá-la para criar instâncias dedicadas a paletes.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  Também é possível usar pontos de extremidade personalizados (por exemplo, nó local para testes):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

As extrínsecas também podem ser enviadas:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  Como foi dito, mais exemplos estão disponíveis na página de [documentação](https://multi-agent-io.github.io/robonomics-interface/).

</robo-wiki-note>

## CLI tool

`robonomics-interface` também contém ferramentas CLI Python `click` para uso em prototipagem e testes rápidos. Ele é instalado
com o pacote e disponível no Terminal:

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

Você pode tentar usá-lo com um nó local. A filosofia de pipeline é adotada:

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```