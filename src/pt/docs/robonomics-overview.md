---
title: Visão Geral
contributors: [ensrationis]
---

Robonomics é uma nuvem para dispositivos no Polkadot. Na nuvem você guarda a descrição dos seus dispositivos e o estado atual deles, grava medições e envia comandos. Você paga em XRT, o token da rede. Nenhuma empresa controla a nuvem sozinha: collators independentes a mantêm, e quem tem XRT a governa com votações on-chain.

## Partes principais

- **Árvore de dispositivos (CPS).** Uma árvore de nós que descreve a sua instalação: um prédio, seus cômodos, os dispositivos dentro deles. Cada nó guarda uma descrição curta e o estado atual. O dono decide quem pode gravar em cada parte da árvore. Hoje esse é o núcleo do Robonomics. Veja [Árvore de dispositivos (CPS)](/docs/device-tree/).
- **XRT.** O token. Ele paga taxas de transação e assinaturas, e quem tem XRT vota com ele. Veja [XRT e governança](/docs/xrt-and-governance/).
- **Governança.** OpenGov padrão do Polkadot, com dois tracks. Não existe chave Sudo: toda mudança privilegiada, incluindo atualizações do runtime, passa por um referendo.
- **Collators.** Os servidores que produzem os blocos. Qualquer pessoa pode se candidatar bloqueando XRT como garantia. Veja [Executar um collator](/docs/run-collator/).

Os componentes mais antigos (Datalog, Launch, assinaturas RWS, Digital Twin, Liability) ainda funcionam, mas estão obsoletos. Veja [Pallets legados](/docs/legacy-pallets/).

## A rede

| | |
|---|---|
| Rede | Parachain Robonomics no Polkadot |
| Para ID | 3388 |
| Token | XRT, 9 casas decimais |
| Formato de endereço | Prefixo SS58 32 (os endereços começam com `4`) |
| Tempo de bloco | 6 segundos (meta) |
| RPC público | `wss://polkadot.rpc.robonomics.network/` |
| Explorador de blocos | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [abrir com o RPC do Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

O Polkadot é a única rede Robonomics em funcionamento. A parachain na Kusama foi desligada. Veja [XRT em outras redes](/docs/xrt-migration/).

## O que está sendo construído

O Robonomics 5.0 adiciona a nuvem em camadas. A governança e a árvore de dispositivos com Scope e Access já estão no ar. As assinaturas estão em desenvolvimento: um dispositivo vai poder usar a rede sem ter XRT. Armazenamento e computação estão planejados; ainda não há código para eles.

Saiba mais no post do blog [Robonomics 5.0, part one](https://robonomics.network/blog/robonomics-5-0-runtime-first/) e no [roadmap do 5.0](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md).

## Software e mantenedores

Todo o software do Robonomics é de código aberto:

- [airalab/robonomics](https://github.com/airalab/robonomics): o runtime e seus pallets.
- [airalab/robins](https://github.com/airalab/robins): ferramentas, incluindo a ferramenta de linha de comando `cps` e gateways para dispositivos.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): a biblioteca Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): o app web em [robonomics.app](https://robonomics.app).

Não existe um programa de nó próprio do Robonomics. Os collators rodam o `polkadot-omni-node`, o nó genérico da Parity, com a chain spec do Robonomics.

Os sites do Robonomics, incluindo esta wiki, são operados pela Akagi Engineering Co., Ltd. (Japão). Notícias e notas de versão ficam no [blog do Robonomics](https://robonomics.network/blog/).
