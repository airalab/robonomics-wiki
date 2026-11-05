---
title: Primeiros passos
contributors: [Vourhey, positivecrash, ensrationis]
---

Esta página leva você do zero ao seu primeiro registro na rede Robonomics. Você precisa de um navegador, uma extensão de carteira e um pouco de XRT.

## 1. Crie uma conta

1. Instale a [extensão Polkadot.js](https://polkadot.js.org/extension/) ou outra carteira Polkadot que funcione com redes personalizadas.
2. Crie uma conta na carteira. Anote a frase de recuperação e guarde-a offline.
3. A mesma conta funciona no Robonomics. O Robonomics mostra os endereços no seu próprio formato (prefixo SS58 32), então lá o seu endereço começa com `4`.

Uma conta só existe on-chain quando tem pelo menos o depósito existencial, 0.000001 XRT.

## 2. Consiga XRT

Você precisa de muito pouco. No momento em que escrevemos, um registro de datalog custa bem menos de 0.001 XRT em taxas.

Onde o XRT é negociado hoje:

- **Uniswap no Ethereum.** O XRT de produção no Ethereum é XRT transferido do Polkadot pela Snowbridge. O contrato é `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. [Trocar na Uniswap](https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x1f752250f518e419f2f03804e25728c5c6dff73f). A [Snowbridge](https://app.snowbridge.network/send) move tokens entre o Ethereum e o Polkadot.
- **Polkadot Asset Hub.** O XRT existe no Asset Hub, e lá há um pool de troca DOT–XRT.

Mover XRT do Asset Hub para a sua conta na parachain Robonomics é uma transferência entre chains. Ainda não foi publicado um guia passo a passo para isso. Se você travar, pergunte no grupo do Telegram [XRT Traders](https://t.me/xrt_trade).

{% roboWikiNote {type: "warning", title: "Links antigos"}%} Algumas páginas antigas ainda apontam para exchanges que não listam mais o XRT e para o token legado no Ethereum `0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`. O token legado não é o XRT de produção. {% endroboWikiNote %}

## 3. Conecte o Polkadot.js Apps

Abra o [Polkadot.js Apps com o RPC do Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer). Ele se conecta ao endpoint público `wss://polkadot.rpc.robonomics.network/`. Autorize o site na extensão da carteira para que a sua conta apareça.

Para ver blocos, contas e transferências, você também pode usar o explorador de blocos em [scan.robonomics.network](https://scan.robonomics.network).

<a id="4-send-your-first-record"></a>

## 4. Envie o seu primeiro registro

O primeiro passo mais simples é um registro de datalog: um pequeno dado guardado on-chain na sua conta.

1. No Polkadot.js Apps, abra **Developer → Extrinsics**.
2. Escolha a sua conta, depois `datalog` e `record`.
3. Digite os dados, até 512 bytes. Texto simples serve.
4. Envie a transação e assine na carteira.

Para ler de volta, abra **Developer → Chain state**, escolha `datalog` e `datalogIndex` e consulte a sua conta. Você vê quais slots guardam os seus registros. Depois consulte `datalogItem` com a sua conta e o número de um slot. Cada registro vem com um timestamp.

O Datalog é um dos [pallets legados](/docs/legacy-pallets/#datalog). Ele ainda funciona e é um bom primeiro teste, mas projetos novos devem usar a árvore de dispositivos.

## 5. Próximo passo: descreva os seus dispositivos

O núcleo do Robonomics é a árvore de dispositivos. Você cria um nó para a sua instalação, adiciona nós para as partes e os dispositivos e decide quem pode atualizá-los. Veja [Árvore de dispositivos (CPS)](/docs/device-tree/) e depois [Conectar dispositivos](/docs/connect-devices/).
