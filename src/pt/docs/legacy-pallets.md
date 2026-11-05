---
title: Pallets legados
contributors: [PaTara43, nakata5321, LoSk-p, ensrationis]
---

Cinco pallets de versões anteriores do Robonomics ainda estão no runtime: Datalog, Launch, RWS, DigitalTwin e Liability. O [README do nó](https://github.com/airalab/robonomics#readme) os marca como obsoletos: "following pallets will be removed in near future". Nenhuma data de remoção foi anunciada.

Eles ainda funcionam on-chain, e alguns apps e integrações os usam. Para projetos novos, comece pela [árvore de dispositivos](/docs/device-tree/).

| Pallet | O que faz | Sucessor |
|---|---|---|
| Datalog | Guarda registros curtos na sua conta | Árvore de dispositivos; o armazenamento do 5.0 está planejado |
| Launch | Envia um comando assinado para a conta de um dispositivo | — |
| RWS | Assinaturas para transações sem taxa | Assinaturas do 5.0 (em desenvolvimento) |
| DigitalTwin | Associa os tópicos de um gêmeo digital a contas | Árvore de dispositivos |
| Liability | Acordos entre partes com um relatório no final | — |

## Datalog

O Datalog guarda registros curtos on-chain na sua conta. Cada registro recebe um timestamp.

- `record(record)` adiciona um registro de até 512 bytes.
- `erase()` apaga todos os seus registros.
- Cada conta guarda os seus **últimos 127 registros**. Os mais antigos são sobrescritos. (A janela tem 128 slots, e um slot fica sempre livre.)
- Para dados maiores, coloque-os no IPFS e registre o CID.
- Leia com as consultas ao storage `datalog.datalogIndex(account)`, que dá o primeiro e o último slot, e `datalog.datalogItem([account, slot])`. O evento é `NewRecord`.
- Não há depósito, só a taxa normal. No momento em que escrevemos, um registro completo de 512 bytes custa cerca de 0.0006 XRT.
- Com uma assinatura RWS, um registro pode ser enviado sem taxa, via `rws.call`.

Quem usa hoje: o Robonomics Report Service para Home Assistant, os agentes de conectividade do sensors.social e os gráficos do Altruist e do monitor de energia no robonomics.app.

Um passo a passo do primeiro registro está em [Primeiros passos](/docs/getting-started/#4-send-your-first-record).

## Launch

O Launch envia um comando assinado para um dispositivo.

- `launch(robot, param)`: `robot` é a conta do dispositivo, `param` são 32 bytes. Uma convenção comum é colocar ali o digest de um CID do IPFS.
- O dispositivo fica atento aos eventos `NewLaunch(sender, robot, param)` com o seu endereço.
- Qualquer pessoa pode enviar um launch para qualquer endereço. O dispositivo precisa verificar quem é o remetente.
- O pallet também grava `param` em um único valor global `Goal`, que todo launch de qualquer pessoa sobrescreve. Use os eventos, não esse valor do storage.
- A taxa é mais ou menos a de um registro curto de datalog. Com uma assinatura RWS, ele pode ser enviado sem taxa.

O robonomics.app usa o Launch para controlar o Home Assistant, e o antigo wrapper do ROS 2 o usava para iniciar robôs.

<a id="rws-subscriptions"></a>

## Assinaturas RWS

O RWS (Robonomics Web Services) dá a uma conta transações sem taxa.

- Dois tipos: `Daily { days }` e `Lifetime { tps }`.
- Um dispositivo listado na assinatura envia chamadas via `rws.call(subscription_owner, call)` e não paga taxa. A capacidade gratuita se acumula com o tempo. Numa assinatura Daily ela se acumula a 10,000 µTPS, o equivalente a 0.01 transferência simples por segundo.
- `set_devices(devices)` lista até 32 contas de dispositivos que podem usar a assinatura. Ela substitui a lista inteira. Só um dispositivo listado pode usar `rws.call`.
- `transfer(target)` passa a sua assinatura para uma conta que não tem nenhuma.

### Como obter uma assinatura

- As assinaturas são vendidas em leilão. `bid(index, amount)`: o primeiro lance precisa ser maior que 1 XRT. Os lances ficam reservados. Leilões com lance fecham a cada 10 blocos. O lance vencedor é queimado e a assinatura é registrada.
- A página **Buy a subscription** no [robonomics.app](https://robonomics.app) dá um lance em um leilão livre e adiciona a sua própria conta como dispositivo em uma única transação. Você precisa de um saldo acima do preço mais 0.01 XRT. O app recusa se não houver leilão livre.

### Situação atual

- Novos leilões só podem ser abertos pelo Root. Como não há Sudo, cada novo lote de leilões precisa de um referendo Root. Os leilões livres podem acabar até que um seja aprovado.
- As assinaturas emitidas pelo oráculo (por exemplo, a partir dos tokens RWS no Ethereum, um experimento de 2021) não estão conectadas: a conta do oráculo não está definida. A página de tokenomics diz que o RWS será conectado à rede de produção depois que os saldos de XRT da Kusama passarem para o Polkadot, primeiro para projetos não comerciais como o sensors.social.
- O sucessor é a Subscription do 5.0. Com ela, um dispositivo vai poder usar a rede sem ter XRT. Ela está em desenvolvimento e ainda não está no runtime.

## DigitalTwin

Um gêmeo digital é uma lista de tópicos, cada um ligado a uma conta que fornece dados para ele.

- `create()` cria um gêmeo.
- `set_source(id, topic, source)` liga um tópico de 32 bytes a uma conta de origem.
- `remove_source(id)` remove a origem.

A [árvore de dispositivos](/docs/device-tree/) substitui este pallet.

## Liability

O Liability registra acordos assinados entre partes.

- `create(agreement)` registra um acordo assinado. A parte técnica dele aponta para o IPFS.
- `finalize(report)` encerra o acordo com um relatório.

O pallet também inclui um mercado simples para esses acordos. Nenhum sucessor foi anunciado.
