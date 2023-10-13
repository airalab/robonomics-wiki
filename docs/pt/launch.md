---
title: Lançamento
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Outra funcionalidade básica do parachain Robonomics é o pallet de Lançamento. Ele permite enviar comandos para as contas/entidades por trás delas. Esses comandos incluem parâmetros para especificar a tarefa a ser executada.**

<robo-wiki-note type="warning" title="Dev Node">

  Por favor, preste atenção que este e os seguintes tutoriais são demonstrados em uma instância local do Robonomics Node. Configure o seu com [estas instruções](/docs/run-dev-node).

</robo-wiki-note>

## 1. Navegue até Developer -> Extrinsics

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. Escolha launch -> launch na lista suspensa de extrínsecos possíveis

Também escolha uma conta na qual você deseja enviar o extrínseco. Preencha o campo de endereço de destino e o campo de parâmetro.

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  - O Launch suporta strings de 32 bytes como comandos ([source](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  então há espaço para improvisar aqui:
  - Para comandos básicos como alternar, você pode usar "0x00000000000000000000000000000000000000000000000000000000001" ou
  "0x000000000000000000000000000000000000000000000000000000000".
  - Para comandos avançados, incluindo json, você pode usar [IPFS](https://ipfs.tech/) CID formatado em um
  [maneira correta](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).

</robo-wiki-note>

## 3. Envie a transação

<robo-wiki-picture src="launch/submit.jpg" />

## 4. Revise seu lançamento nos eventos

Para isso, navegue até *Network -> Explorer* e encontre uma lista de eventos à direita. Clique em um ícone de triângulo para expandir.

<robo-wiki-picture src="launch/event.jpg" />
