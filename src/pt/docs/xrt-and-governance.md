---
title: XRT e governança
contributors: [Leemo94, ensrationis]
---

XRT é o token da rede Robonomics. Você usa o XRT para pagar pela nuvem e para votar em como a rede muda. Esta página trata das duas coisas.

## Para que serve o XRT

- **Taxas.** Toda transação paga uma taxa em XRT. Todas as taxas e gorjetas vão para o fundo dos collators.
- **Assinaturas.** As assinaturas atuais (RWS) são ganhas em leilão, e o lance vencedor é queimado. Veja [Pallets legados](/docs/legacy-pallets/#rws-subscriptions).
- **Votos.** Quem tem XRT decide os referendos.
- **Garantia do collator.** Um candidato a collator bloqueia XRT como garantia. Veja [Executar um collator](/docs/run-collator/).

## Unidades e oferta

- O XRT tem 9 casas decimais. 1 XRT = 1,000 Glushkov (mXRT) = 1,000,000 Coase (µXRT).
- O depósito existencial é 1 Coase, ou seja, 0.000001 XRT.
- O runtime cunha 0.0042 XRT para o autor de cada bloco como recompensa do collator. A tokenomics limita a emissão para collators a no máximo 25,000 XRT por ano.
- A tokenomics limita a oferta a 5,100,000 XRT. As alocações e o ciclo de vida do token estão na [página de tokenomics](https://robonomics.network/tokenomics/).

O XRT também existe no Ethereum e no Polkadot Asset Hub. Veja [XRT em outras redes](/docs/xrt-migration/).

## Governança

O Robonomics usa o OpenGov padrão do Polkadot. Não existe chave Sudo: desde o runtime 52 (outubro de 2026), toda mudança privilegiada, incluindo atualizações do runtime, precisa de um referendo. O próprio Sudo foi removido por referendo. Não há council, fellowship nem track de tesouraria.

Um referendo é aprovado quando dois limites são atingidos ao mesmo tempo:

- **Approval**: a parcela de "aye" entre os votos dados.
- **Support**: a parcela de todo o XRT que votou "aye".

Os dois começam altos e caem ao longo do período de decisão. Quando um referendo é aprovado e se mantém durante o período de confirmação, a chamada é executada.

### Tracks

| | Root | Whitelisted Caller |
|---|---|---|
| Usado para | Atualizações do runtime e qualquer outra chamada privilegiada: garantia e limites dos collators, leilões RWS, configuração | Um track rápido para uma chamada específica que o Core Team colocou na whitelist |
| Referendos em decisão ao mesmo tempo | 1 | 10 |
| Depósito de decisão | 5,000 XRT | 1 XRT |
| Período de preparação | 12 horas | 5 minutos |
| Período de decisão | 14 dias | 3 dias |
| Período de confirmação | 24 horas | 20 minutos |
| Atraso mínimo de execução | 1 hora | 5 minutos |
| Approval | de 90% a 51% ao longo do período de decisão | de 99% a 80% |
| Support | de 50% a 15% | de 2% a 1% |

Esses são os valores do runtime atual. Para mudá-los é preciso um referendo Root.

### Outros depósitos

- **Depósito de submissão:** 10 XRT. Qualquer conta pode submeter um referendo.
- **Depósito de preimage:** 100 XRT mais 0.00001 XRT por byte da chamada. O código do runtime marca esses valores como provisórios, então eles podem mudar.
- Um referendo que não entra em decisão em 14 dias expira.

### Core Team e whitelist

O Core Team é um pequeno coletivo de no máximo 7 membros. Só um referendo Root pode mudar quem faz parte dele.

A whitelist funciona assim:

1. O Core Team vota para colocar na whitelist o hash de uma chamada exata. Pelo menos metade de todos os membros precisa concordar. Uma moção do Core Team dura 3 dias.
2. A whitelist não executa nada. A chamada ainda precisa de um referendo no track Whitelisted Caller.
3. Uma chamada fora da whitelist não pode passar pelo track rápido. Ela ainda pode passar pelo track Root.

Então há duas formas de fazer uma mudança privilegiada: um referendo Root, ou uma chamada na whitelist mais um referendo rápido. As duas terminam em uma votação de quem tem XRT.

<a id="how-to-propose-a-change"></a>

## Como propor uma mudança

Os passos que a equipe publicou:

1. Descreva a ideia em uma issue no [airalab/robonomics](https://github.com/airalab/robonomics/issues).
2. Submeta um referendo no Polkadot.js Apps, na seção Governance, conectado à rede Robonomics.
3. Avise a comunidade.

O que acontece on-chain:

1. A chamada é guardada como preimage (depósito de preimage).
2. O referendo é submetido em um track (depósito de submissão de 10 XRT).
3. Alguém coloca o depósito de decisão: 5,000 XRT no Root, 1 XRT no Whitelisted Caller. Qualquer pessoa pode colocá-lo.
4. O referendo entra em decisão depois do período de preparação, assim que o depósito de decisão estiver feito e o track tiver uma vaga livre. A votação decide o resultado dentro do período de decisão.

## Como votar

- Mantenha o seu XRT na sua própria carteira na rede Robonomics. Tokens guardados em uma exchange não votam.
- Vote com conviction: bloqueie o seu XRT por mais tempo para dar mais peso ao voto.

| Bloqueio | Peso do voto |
|---|---|
| Sem bloqueio | 0.1× |
| 7 dias | 1× |
| 14 dias | 2× |
| 28 dias | 3× |
| 56 dias | 4× |
| 112 dias | 5× |
| 224 dias | 6× |

- Em vez de votar você mesmo, você pode delegar o seu poder de voto a outra conta.

Os referendos abertos e passados ficam no Polkadot.js Apps, na seção Governance, quando ele está conectado ao [RPC do Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer).

## Leia mais

- [Robonomics 5.0: handing the keys to XRT holders](https://robonomics.network/blog/robonomics-5-0-governance/)
- [Sudo is gone: the Robonomics cloud is now run by its community](https://robonomics.network/blog/robonomics-5-0-sudo-removed/)
- [Discussão no fórum sobre o modelo de dois tracks](https://forum.polkadot.network/t/robonomics-replacing-sudo-with-a-two-track-opengov-sized-for-a-small-community/18719)
