---
title: Responsabilidade
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Para transformar robôs em agentes econômicos, é necessário uma ferramenta de contrato para isso. Conheça a Responsabilidade - um pallet Robonomics que implementa contratos entre contas de parachain!**

{% roboWikiNote {title:"Nó de Desenvolvimento", type: "warning"}%}   Por favor, preste atenção que este tutorial é demonstrado em uma instância local do Nó Robonomics. Configure o seu com [essas instruções](/docs/run-dev-node).
{% endroboWikiNote %}

## Visão Geral da Teoria

De volta ao Ethereum, havia uma estrutura bastante complicada de interação de responsabilidade. Você pode se familiarizar com isso [aqui](/docs/robonomics-how-it-works). Atualmente, as coisas estão um pouco mais fáceis com o Kusama!

### Negociações

Para assinar um contrato, os dois lados precisam negociar primeiro. Isso pode ser feito de várias maneiras, incluindo [IPFS PubSub](https://blog.ipfs.tech/25-pubsub/) ou Robonomics PubSub. Um exemplo de código Python usando Robonomics PubSub é apresentado [aqui](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

Oferta e demanda são mensagens contendo duas características principais de um contrato: **descrição do trabalho** e **preço**. O formato da mensagem deve ser projetado pelo usuário para cada aplicação específica. Não é tão importante no processo de negociação seguir uma regra de formato estrito. O fluxo possível é apresentado na imagem abaixo.

{% roboWikiPicture {src:"docs/liability/negotiations.jpg", alt:"negotiations"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"PubSub", type: "warning"}%} Note que o PubSub é um protocolo aberto, então nenhum dado sensível deve ser transferido. Para isso, você deve usar outros protocolos.
{% endroboWikiNote %}

### Assinaturas

Quando as negociações são concluídas com sucesso, cada lado precisa assinar seu chamado acordo chamado assinatura. Esta é uma mensagem contendo a descrição do trabalho e o preço **em um formato específico** assinado com a chave privada da conta. Existe uma [ferramenta Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) para isso também.
 - A descrição do trabalho é chamada de **técnica**. Este é uma string longa de 32 bytes semelhante a um lançamento que pode ser um CID IPFS codificado.
 - O preço é chamado de **economia**. Este é um decimal XRT - Weiner. 1 Weiner = 10**-9 XRT.

{% roboWikiNote {title:"32 bytes", type: "note"}%} Pode-se obter um CID [IPFS](https://ipfs.tech/) formatado de maneira adequada com a [biblioteca Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes). Ao usar a função `sign_liability`, não é necessário transformar o hash, isso será feito automaticamente.{% endroboWikiNote %}

Seguindo o exemplo do café:

1. A tarefa é um JSON
```json
{"tarefa": "fazer_espresso", "descrição": "Fazer uma xícara de espresso"}
```
2. Seu CID IPFS é `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Então a **técnica** (CID transformado) é `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`
4. A **economia** é `1.5 XRT`.

Quando assinado, é hora de criar uma responsabilidade! Isso pode ser feito por um dos lados (seja o promitente ou o promitente) ou por uma conta de terceiros de um provedor chamado.

## Criar Responsabilidade

### Preparações

Como mencionado anteriormente, pelo menos dois lados estão envolvidos no processo. Para este exemplo, vamos usar três e criar um provedor separado para isso. Vamos supor que as negociações já tenham ocorrido de alguma forma.

### 1. Criar três contas e adicionar fundos a elas

{% roboWikiPicture {src:"docs/liability/balances.jpg", alt:"balances"} %}{% endroboWikiPicture %}

Aqui fornecemos ao provedor 100 XRT para assinar extrínsecos de responsabilidade, ao promitente foi dado 2 XRT para pagar pelo trabalho. O promitente não recebeu nenhum fundo (exceto por um depósito existencial de pelo menos 1 mXRT).

### 1. Navegar para Desenvolvedor -> Extrínsecos

{% roboWikiPicture {src:"docs/liability/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. Escolher responsabilidade -> criar na lista suspensa de extrínsecos possíveis

Também escolha uma conta com a qual deseja enviar o extrínseco. Preencha todos os parâmetros.

{% roboWikiPicture {src:"docs/liability/create.jpg", alt:"create"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Assinaturas", type: "note"}%} Como o provedor é usado aqui, não é necessário saber as sementes dos participantes. Apenas suas assinaturas são necessárias.
{% endroboWikiNote %}

### 3. Enviar transação

{% roboWikiPicture {src:"docs/liability/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

### 4. Rever sua responsabilidade nos eventos

Para isso, vá para `Rede -> Explorador` e encontre uma lista de eventos à direita. Clique em um ícone de triângulo para expandir.

{% roboWikiPicture {src:"docs/liability/new-liability.jpg", alt:"new-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Hash", type: "note"}%} O hash pode ser transformado em um CID IPFS com a mesma [ferramenta Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).
{% endroboWikiNote %}

### 5. Explorar armazenamento

Você também pode explorar algumas características das responsabilidades no módulo de armazenamento `liability`.

{% roboWikiPicture {src:"docs/liability/storage-liability.jpg", alt:"storage-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Próximo Índice", type: "note"}%} A função de armazenamento `Próximo Índice` mostra o último índice de responsabilidade +1, então mesmo que seja `1`, a responsabilidade `0` é explorada.
{% endroboWikiNote %}

## Relatórios

Imaginem que um café foi feito e agora a máquina de café precisa relatar de alguma forma. É aí que entram os relatórios de responsabilidade. Como prova de trabalho, a conta adiciona outro CID IPFS como conteúdo de relatório ao finalizar a responsabilidade existente. Isso novamente requer uma assinatura do promitente.

{% roboWikiNote {title:"Assinatura do Relatório", type: "note"}%} A mensagem assinada contém o índice de responsabilidade existente e o CID IPFS do relatório codificado em representação de 32 bytes. Novamente, a [ferramenta Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) pode ajudar a assinar o relatório.
{% endroboWikiNote %}

Seguindo o exemplo da máquina de café:

1. O relatório é um JSON
```json
{"relatório": "Café feito! Tempo para executar - 80 segundos."}
```
2. Seu CID IPFS é `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Então o **payload** (CID transformado) é `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. O **Índice** é `0`, é o índice de responsabilidade existente.

### 1. Navegar para extrínsecos, responsabilidade -> finalizar(relatório)

Preencha os parâmetros e envie o extrínseco. Novamente, isso pode ser feito por uma conta de terceiros.

{% roboWikiPicture {src:"docs/liability/report.jpg", alt:"report"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Depósito Existencial", type: "warning"}%} Preste atenção que a conta do promitente não deve estar "inativa" - ela deve ter o depósito existencial de pelo menos 1 mXRT.
{% endroboWikiNote %}

Assine e envie o relatório. Quando feito, você pode explorá-lo nos eventos.

{% roboWikiPicture {src:"docs/liability/new-report.jpg", alt:"new-report"} %}{% endroboWikiPicture %}

### 2. Explorar relatórios

Você também pode observar o relatório no armazenamento. Vá para `Desenvolvedor -> Armazenamento` e escolha `responsabilidade` na lista suspensa.

{% roboWikiPicture {src:"docs/liability/storage-report.jpg", alt:"storage-report"} %}{% endroboWikiPicture %}

### 3. Verificar saldos

Na imagem é mostrado que agora o promissor recebeu o "salário". A relação econômica aconteceu!

{% roboWikiPicture {src:"docs/liability/balances-2.jpg", alt:"balances-2"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Verificação", type: "note"}%} Até o momento, não há maneira de verificar se o trabalho foi concluído, então assim que o promissor relatar, os tokens são transferidos para sua conta.
O recurso de verificação será adicionado no futuro.
{% endroboWikiNote %}