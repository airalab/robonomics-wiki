---
title: Interface Python e Robonomics IO
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Alguns extrínsecos implementados nos paletes Robonomics são difíceis de serem enviados pelo aplicativo Polkadot. Além disso, há a necessidade de interagir com essa funcionalidade usando linguagens de programação. Para esse fim, foi desenvolvida uma ferramenta simples em Python chamada [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). É um invólucro sobre [py-substrate-interface](https://github.com/polkascan/py-substrate-interface) mantido pelo polkascan. Abaixo está uma breve descrição deste pacote e alguns links e exemplos úteis. Além disso, as ferramentas de linha de comando são discutidas.**

## robonomics-interface

Disponível no pacote [PyPi](https://pypi.org/project/robonomics-interface/) pronto para download e configuração.
Há também uma [documentação](https://multi-agent-io.github.io/robonomics-interface/) detalhada gerada por docstrings disponível.

No geral, esta é uma ferramenta para desenvolvedores que desejam interagir com a blockchain Robonomics por meio de ferramentas de programação. Quase todos os projetos em Python da equipe Robonomics que interagem com a paracadeia usam esta interface.

### Instalação

O processo de instalação requer que o usuário tenha pelo menos o Python 3.8 instalado. Nem as arquiteturas `x86`, nem `arm7`, nem `arm8` requerem processo de compilação. Todos os pacotes estão construídos e publicados pelos mantenedores das dependências.

O `pip` é usado como ferramenta de instalação:

```bash
$ pip3 install robonomics_interface
```

### Uso de Exemplo

A ideia principal é criar uma instância de `Account` e então usá-la para criar instâncias dedicadas a paletes.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

{% roboWikiNote {title:"Nó Local", type: "note"}%}
  Também é possível usar endpoints personalizados (por exemplo, um nó local para testes):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```
{% endroboWikiNote %}

Extrínsecos também podem ser enviados:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Olá, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # este é um hash extrínseco
```

{% roboWikiNote {title:"Documentos", type: "note"}%}Como foi dito, mais exemplos estão disponíveis na página de [documentação](https://multi-agent-io.github.io/robonomics-interface/). {% endroboWikiNote %}

## Ferramenta de Linha de Comando

`robonomics-interface` também contém ferramentas CLI `click` em Python para uso em prototipagem e testes rápidos. Ela é instalada com o pacote e disponível no Terminal:

```bash
$ robomomics_interface --help

#Uso: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Opções:
#  --help  Mostra esta mensagem e sai.
#
#Comandos:
#  read   Inscreva-se em eventos de datalog/lançamento na cadeia
#  write  Envie vários extrínsecos (comandos de lançamento ou registro de datalogs)
```

Você pode tentar usá-lo com um nó local. A filosofia de pipeline é adotada:

```bash
$ echo "Olá, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # este é um hash extrínseco
```