---
title: Datalog
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Agora que você tem alguns fundos em sua conta, você pode enviar extrínsecos. O primeiro a tentar é um Datalog. Ele permite que você armazene dados de forma persistente no blockchain. Imagine um armazenamento distribuído e criptoprotegido para seus dados e é isso!**

{% roboWikiNote {type: "warning", title: "Nó de Desenvolvimento"}%}Por favor, preste atenção que este e os próximos tutoriais são demonstrados em uma instância local do Nó Robonomics. Configure o seu com [essas instruções](/docs/run-dev-node).
{% endroboWikiNote %}


## 1. Navegue até Desenvolvedor -> Extrínsecos

{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. Escolha datalog -> record na lista suspensa de extrínsecos possíveis

Também escolha uma conta com a qual deseja enviar o extrínseco. Preencha o campo de registro.

{% roboWikiPicture {src:"docs/datalog/record.jpg", alt:"record"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Grande quantidade de dados"}%} Datalog suporta uma string com um máximo de 512 bytes. Para armazenar uma grande quantidade de dados, pode-se usar [IPFS](https://ipfs.tech/).
{% endroboWikiNote %}

## 3. Enviar transação

Assine e envie a transação com uma conta criada anteriormente usando a extensão ou o DApp.

{% roboWikiPicture {src:"docs/datalog/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Apagar"}%} Você também pode apagar **TODOS** os seus registros com a chamada *datalog -> erase*.
{% endroboWikiNote %}

## 4. Revise seu datalog no armazenamento

Para isso, navegue até *Desenvolvedor -> Estado da Cadeia*, selecione *datalog -> datalogIndex*, especifique sua conta e pressione o botão "+"
para obter os índices dos registros de sua conta e então explore o que você precisa com *datalog -> datalogItem*.

{% roboWikiPicture {src:"docs/datalog/item.jpg", alt:"item"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Explorador"}%} Todos os eventos, incluindo o registro do datalog, podem ser vistos no fluxo de eventos no *Explorador*.
{% endroboWikiNote %}