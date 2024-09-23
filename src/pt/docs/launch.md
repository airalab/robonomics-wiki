---
title: Lançamento
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Outra característica básica da parachain Robonomics é o pallet de Lançamento. Ele permite enviar comandos para as contas/entidades por trás delas. Esses comandos incluem parâmetros para especificar a tarefa a ser executada.**

{% roboWikiNote {title:"Nó de Desenvolvimento", type: "Aviso"}%} Por favor, preste atenção que este e os tutoriais seguintes são demonstrados em uma instância local do Nó Robonomics. Configure o seu com [essas instruções](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Navegue até Desenvolvedor -> Extrínsecos

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"extrínsecos"} %}{% endroboWikiPicture %}

## 2. Escolha lançamento -> lançamento na lista suspensa de extrínsecos possíveis

Também escolha uma conta na qual deseja enviar o extrínseco. Preencha o endereço de destino e o campo de parâmetro.

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"lançamento"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32 bytes", type: "nota"}%}   O Lançamento suporta strings de 32 bytes de comprimento como comandos ([fonte](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  então há espaço para improvisar aqui:
  - Para comandos básicos como alternância, você pode usar "0x0000000000000000000000000000000000000000000000000000000000000001" ou
  "0x0000000000000000000000000000000000000000000000000000000000000000".
  - Para comandos avançados, incluindo json-like, você pode usar [IPFS](https://ipfs.tech/) CID formatado de uma
  [maneira adequada](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
{% endroboWikiNote %}

## 3. Enviar transação

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"enviar"} %}{% endroboWikiPicture %}

## 4. Revise seu lançamento nos eventos

Para isso, navegue até *Rede -> Explorador* e encontre uma lista de eventos à direita. Clique em um ícone de triângulo para expandir.

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"evento"} %}{% endroboWikiPicture %}
