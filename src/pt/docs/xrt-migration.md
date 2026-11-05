---
title: XRT em outras redes
contributors: [nakata5321, ensrationis]
---

O XRT de produção fica na parachain Robonomics no Polkadot. Esta página explica o que acontece com o XRT na Kusama e no Ethereum, e onde o XRT existe no Polkadot Asset Hub.

## Kusama

A parachain Robonomics na Kusama foi desligada. Ela produziu o seu último bloco, #12,268,835, em 28 de setembro de 2026. Um arquivo do banco de dados está em [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama).

O que os posts publicados dizem sobre o XRT da Kusama:

- Todos os saldos de XRT no último bloco passam para o Polkadot com um **bônus de +20%**.
- **Não há recompra** do lado da Kusama.
- Onde os saldos vão aparecer no Polkadot e se os detentores precisam fazer algo será explicado em um post separado.

Acompanhe o [blog do Robonomics](https://robonomics.network/blog/) para ver esse post. Fontes: [The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/) e a [página de tokenomics](https://robonomics.network/tokenomics/).

## Ethereum

O antigo token XRT no Ethereum (`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`) está obsoleto. Em 5 de fevereiro de 2026, o mecanismo de emissão dele foi explorado para cunhar tokens de graça. O XRT no Polkadot e na Kusama não foi afetado.

Quem tinha o token antigo no snapshot (bloco 24,390,081 do Ethereum) pode migrar:

1. Abra o app de migração: [airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/).
2. Conecte a carteira que tinha XRT em 5 de fevereiro de 2026. O app mostra o seu saldo no snapshot e o valor com o bônus.
3. Escolha uma opção. Cada endereço só pode escolher uma vez.
   - **Accept**: receber XRT de produção no Ethereum, o seu saldo no snapshot mais 20%.
   - **Decline**: entrar no programa de recompra, a um preço de referência de $2.20, pago ao longo de 12–36 meses e só conforme os recursos da tesouraria permitirem.

Antes de assinar, confira se o app fala com o contrato de resgate `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c`. O código-fonte dele está em [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts).

O que você recebe é XRT de produção no Ethereum, contrato `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. É XRT transferido 1:1 do Polkadot pela [Snowbridge](https://app.snowbridge.network/send). Você pode guardar, negociar na Uniswap ou transferir para o Polkadot. Não existe bridge do token antigo para o novo.

Os posts definem um prazo de 12 meses para a migração. XRT não resgatado no prazo só pode ser restaurado por uma votação de governança on-chain, com prova de propriedade. Leia os termos exatos nos posts: [Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/) e [Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/).

Dúvidas: o grupo do Telegram [XRT Traders](https://t.me/xrt_trade).

## Polkadot Asset Hub

O XRT existe no Polkadot Asset Hub como ativo estrangeiro, e há um pool de troca DOT–XRT. No Asset Hub, as taxas podem ser pagas em XRT.

Ainda não foi publicado um guia para mover XRT entre o Asset Hub e a parachain Robonomics.
