---
title: Gêmeos Digitais
contributors: [nakata5321, PaTara43]

tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---
  
**Imagine ter um dispositivo ou sistema complicado que possui vários módulos para manter e requer algumas contas para usar. Para mantê-los todos em um só lugar ou codificar alguma funcionalidade com contas separadas ou, por exemplo, definir diferentes fontes de dados para diferentes fluxos de informações, o módulo Gêmeo Digital deve ser usado.**

<robo-wiki-note type="warning" title="Dev Node">

  Por favor, preste atenção que este e os seguintes tutoriais são demonstrados em uma instância local do Robonomics Node. Configure o seu com [estas instruções](/docs/run-dev-node).

</robo-wiki-note>

## Visão geral da teoria
Qualquer conta pode criar e gerenciar um Gêmeo Digital. O Gêmeo pode ser imaginado como uma espécie de tabela com o seguinte conteúdo:

| DT id  | Topic Name 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Onde:
* **DT id** é um índice de Gêmeo Digital único e não assinado.
* **Topic name** é um dado hex `H256` ou ASCII de comprimento de 32 bytes, o mesmo que [`Lançamento`](/docs/launch) parâmetro extrínseco. 
Por exemplo: `0x1234....FF` ou `hello.parachain.robonomics.world`.
* **Source** - é algum endereço de conta.

<robo-wiki-note type="note" title="Topics">

  Como discutido anteriormente na visão geral do extrínseco de lançamento, o `H256` pode ser representado como um CID IPFS codificado (consulte a
  [ferramenta Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) para isso).
  Portanto, os tópicos podem ser usados como algum armazenamento de dados também, digamos, uma descrição do módulo de um Gêmeo.

</robo-wiki-note>


## Criar Gêmeo Digital

### 1. Navegue até Developer -> Extrinsics

<robo-wiki-picture src="digital-twin/extrinsics.jpg" />

### 2. Escolha digitalTwin -> create na lista suspensa de possíveis extrínsecos

<robo-wiki-picture src="digital-twin/twin-create.jpg" />

Envie a transação. Aqui, nenhum parâmetro é necessário para criar um Gêmeo. Ele receberá um índice e apenas o proprietário do Gêmeo Digital poderá adicionar/modificar tópicos do Gêmeo a partir de agora.

O ID do Gêmeo pode ser encontrado na página de visão geral do Explorador.

<robo-wiki-picture src="digital-twin/create-log.jpg" />

## Adicionar Tópico

### Escolha digitalTwin -> setSource na lista suspensa de possíveis extrínsecos

<robo-wiki-picture src="digital-twin/set-topic.jpg" />

* `id` - Digital Twin ID, obtido na página do Explorer.
* `topic` - nome do tópico `H256` discutido anteriormente. Nesta imagem, é uma string de 32 símbolos.
* `source` - endereço da conta a ser associada ao tópico.

<robo-wiki-note type="note" title="Overwrite">

  Atenção que o tópico pode ser sobrescrito com outro endereço de origem, se necessário.

</robo-wiki-note>

Assine e envie o extrínseco.

## Explore

Você pode encontrar todas as informações sobre os Gêmeos Digitais existentes no módulo de armazenamento `digitalTwin` do estado da cadeia em `Developer -> Chain state`.

- Número total de Gêmeos - `total()`;
- Proprietário do Gêmeo Digital - `owner(u32)`;
- Informações sobre os tópicos de um Gêmeo Digital - `digitalTwin(u32)`.

<robo-wiki-picture src="digital-twin/chain-state.jpg" />