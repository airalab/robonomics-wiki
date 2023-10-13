---
title: Responsabilidade
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Para transformar robôs em agentes econômicos, é necessário uma ferramenta de contrato para isso. Conheça a Responsabilidade - Robonomics pallet implementando contratos entre contas parachain!**

<robo-wiki-note type="warning" title="Dev Node">

  Por favor, preste atenção que este tutorial é demonstrado em uma instância local do Robonomics Node. Configure o seu com [estas instruções](/docs/run-dev-node).

</robo-wiki-note>

## Visão Geral da Teoria

De volta ao Ethereum, havia uma estrutura bastante complicada de interação de responsabilidade. Você pode se familiarizar com ela [aqui](/docs/robonomics-how-it-works). Hoje em dia as coisas estão um pouco mais fáceis com o Kusama!

### Negociações

Para assinar um contrato, os dois lados precisam primeiro negociar. Isso pode ser feito de várias maneiras, incluindo [IPFS PubSub](https://blog.ipfs.tech/25-pubsub/) ou Robonomics PubSub. Um exemplo de código Python usando Robonomics PubSub é apresentado [aqui](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

Oferta e demanda são mensagens contendo duas características principais de um contrato: **descrição do trabalho** e **preço**. O formato da mensagem deve ser projetado pelo usuário para cada aplicação específica. Não é tão importante no processo de negociação seguir uma regra de formato estrito. O fluxo possível é apresentado na imagem abaixo.

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  Observe que o PubSub é um protocolo aberto, portanto, nenhum dado sensível deve ser transferido. Para isso, você deve usar outros protocolos.

</robo-wiki-note>


### Assinaturas

Quando as negociações terminam com sucesso, cada lado precisa assinar o chamado acordo denominado assinatura. Esta é uma mensagem contendo descrição do trabalho e preço **em formato específico** assinado com uma chave privada da conta. Existe uma [ferramenta Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) para isso também.
 - A descrição do trabalho é chamada de **técnica**. Esta é uma string de 32 bytes de comprimento, semelhante a um lançamento, que pode ser um CID IPFS codificado.
 - O preço é chamado de **economia**. Este é um decimal XRT - Weiner. 1 Weiner = 10**-9 XRT.

<robo-wiki-note type="note" title="32 bytes">

  Você pode obter um [CID](https://ipfs.tech/) IPFS formatado de maneira adequada com a [biblioteca Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
  Ao usar a função `sign_liability`, não é necessário transformar o hash, isso será feito automaticamente.

</robo-wiki-note>

Seguindo o exemplo do café:

1. A tarefa é um JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. Seu CID IPFS é `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Portanto, a **técnica** (CID transformado) é `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9` 
4. **Economia** é `1.5 XRT`.

Quando assinado, é hora de criar uma responsabilidade! Isso pode ser feito por um dos lados (seja o promitente ou o promissor) ou por uma conta de terceiros de um chamado provedor.

## Criar Responsabilidade

### Preparativos

Como mencionado anteriormente, pelo menos dois lados estão envolvidos no processo. Para este exemplo, vamos usar três e fazer um provedor separado para isso. Suponha que as negociações já tenham ocorrido de alguma forma.

### 1. Crie três contas e adicione fundos a elas

<robo-wiki-picture src="liability/balances.jpg" />

Aqui fornecemos ao provedor 100 XRT para assinar extrínsecos de responsabilidade, o promitente recebeu 2 XRT para pagar pelo trabalho.
O promissor não recebeu nenhum fundo (exceto por um depósito existencial de pelo menos 1 mXRT).

### 1. Navegue até Developer -> Extrinsics

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. Escolha a liability -> create na lista suspensa de extrínsecos possíveis

Também escolha uma conta com a qual você deseja enviar o extrínseco. Preencha todos os parâmetros.

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="Signatures">

  Como o provedor é usado aqui, não é necessário conhecer as sementes dos participantes. Apenas suas assinaturas são necessárias.

</robo-wiki-note>

### 3. Envie a transação

<robo-wiki-picture src="liability/submit.jpg" />

### 4. Revise sua responsabilidade nos eventos

Para isso, navegue até `Network -> Explorer` e encontre uma lista de eventos à direita. Clique em um ícone de triângulo para expandir.

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  O hash pode ser transformado em um CID IPFS com a mesma [ferramenta Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).

</robo-wiki-note>

### 5. Explorando o armazenamento

Você também pode explorar algumas características das responsabilidades no módulo de armazenamento `liability`.

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  A função de armazenamento `Next Index` mostra o último índice de responsabilidade +1, então mesmo que seja `1`, a responsabilidade `0` é explorada.

</robo-wiki-note>

## Relatórios

Imaginem que um café foi feito e agora a máquina de café precisa relatar de alguma forma. É aí que entram os relatórios de responsabilidade. Como prova de trabalho, a conta adiciona outro CID IPFS como conteúdo do relatório ao finalizar a responsabilidade existente. Isso novamente requer uma assinatura do promissor.

<robo-wiki-note type="note" title="Report signature">

  A mensagem assinada contém o índice de responsabilidade existente e o CID IPFS do relatório codificado em uma representação de 32 bytes. Mais uma vez, a [ferramenta Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) pode ajudar a assinar o relatório.

</robo-wiki-note>

Continuando com o exemplo da máquina de café:

1. O relatório é um JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. Seu CID IPFS é `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Portanto, a **carga útil** (CID transformado) é `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. **Índice** é `0`, é o índice de responsabilidade existente.

### 1. Navegue até extrinsics, liability -> finalize(report)

Preencha os parâmetros e envie extrínseco. Novamente, isso pode ser feito por uma conta de terceiros.

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  Atenção para que a conta do promissor não esteja "inativa" - ela deve ter o depósito existencial de pelo menos 1 mXRT.

</robo-wiki-note>

Assine e envie o relatório. Quando terminar, você pode explorá-lo nos eventos.

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. Explore relatórios

Você também pode observar o relatório no armazenamento. Vá para  `Developer -> Storage` e escolha `liability` na lista suspensa.

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. Verifique os saldos

Na imagem é mostrado que agora o promissor recebeu o "salário". A relação econômica aconteceu!

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Verifying">

  Por enquanto, não há maneira de verificar se o trabalho foi concluído, portanto, assim que o promissor relatar, os tokens são transferidos para sua conta. 
  O recurso de verificação será adicionado no futuro.

</robo-wiki-note>