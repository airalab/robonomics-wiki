---
title: Gêmeos Digitais
contributors: [nakata5321, PaTara43]

ferramentas:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Imagine ter um dispositivo ou sistema complicado que possui vários módulos para manter e requer algumas contas para serem usadas. Para manter todos eles em um só lugar ou para codificar alguma funcionalidade com contas separadas ou, por exemplo, para definir diferentes fontes de dados para diferentes fluxos de informações, o módulo Gêmeos Digitais deve ser usado.**

{% roboWikiNote {title:"Nó de Desenvolvimento", type: "warning"}%} Por favor, preste atenção que este e os tutoriais seguintes são demonstrados em uma instância local do Nó Robonomics. Configure o seu com [essas instruções](/docs/run-dev-node).
{% endroboWikiNote %}

## Visão geral da teoria
Qualquer conta pode criar e gerenciar um Gêmeo Digital. O Gêmeo pode ser imaginado como uma espécie de tabela com o seguinte conteúdo:

| ID do GD | Nome do Tópico | Fonte     |
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Onde:
* **ID do GD** é um índice único de Gêmeo Digital não assinado.
* **Nome do Tópico** é um dado hex `H256` ou ASCII de comprimento de 32 bytes, o mesmo que o parâmetro extrínseco [`Launch`](/docs/launch).
Por exemplo: `0x1234....FF` ou  `hello.parachain.robonomics.world`.
* **Fonte** - é algum endereço de conta.

{% roboWikiNote {title:"Tópicos", type: "note"}%} Como discutido anteriormente na visão geral do extrínseco de Lançamento, o `H256` pode ser representado como um CID IPFS codificado (veja a [ferramenta Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) para isso).
Portanto, os tópicos podem ser usados como um armazenamento de dados, por exemplo, uma descrição do módulo de um Gêmeo. {% endroboWikiNote %}


## Criar Gêmeo Digital

### 1. Navegue até Desenvolvedor -> Extrínsecos

{% roboWikiPicture {src:"docs/digital-twin/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. Escolha digitalTwin -> criar na lista suspensa de extrínsecos possíveis

{% roboWikiPicture {src:"docs/digital-twin/twin-create.jpg", alt:"twin-create"} %}{% endroboWikiPicture %}

Envie a transação. Aqui, nenhum parâmetro é necessário para criar um Gêmeo. Ele receberá um índice e apenas o proprietário do Gêmeo Digital poderá adicionar/modificar tópicos do Gêmeo a partir de agora.

O ID do Gêmeo pode ser encontrado na página de visão geral do Explorador.

{% roboWikiPicture {src:"docs/digital-twin/create-log.jpg", alt:"create-log"} %}{% endroboWikiPicture %}

## Adicionar Tópico

### Escolha digitalTwin -> setSource na lista suspensa de extrínsecos possíveis

{% roboWikiPicture {src:"docs/digital-twin/set-topic.jpg", alt:"set-topic"} %}{% endroboWikiPicture %}

* `id` - ID do Gêmeo Digital, que foi obtido na página do Explorador.
* `tópico` - nome do tópico `H256` discutido anteriormente. Nesta imagem, é uma sequência de 32 símbolos.
* `fonte` - endereço da conta a ser associado ao tópico.

{% roboWikiNote {title:"Sobrescrever", type: "note"}%} Preste atenção que o tópico pode ser sobrescrito com outro endereço de fonte, se necessário.{% endroboWikiNote %}

Assine e envie o extrínseco.

## Explorar

Você pode encontrar todas as informações sobre os Gêmeos Digitais existentes no armazenamento `Desenvolvedor -> Estado da Cadeia` do módulo `digitalTwin`.

- Número total de Gêmeos - `total()`;
- Proprietário do Gêmeo Digital - `owner(u32)`;
- Informações sobre os tópicos de um Gêmeo Digital - `digitalTwin(u32)`.

{% roboWikiPicture {src:"docs/digital-twin/chain-state.jpg", alt:"chain-state"} %}{% endroboWikiPicture %}