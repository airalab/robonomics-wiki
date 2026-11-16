---
title: Usando o robonomics.app
contributors: [vol4tim, positivecrash, ensrationis]
---

O [robonomics.app](https://robonomics.app) é o app web do Robonomics. Com ele você compra uma assinatura, conecta o Home Assistant, controla a sua casa de qualquer navegador e consulta a árvore de dispositivos e os dados dos sensores. Esta página mostra o app tela por tela.

Você precisa de uma extensão de carteira Polkadot com uma conta no Robonomics. Para comprar qualquer coisa ou enviar uma transação, a conta precisa de um pouco de XRT. Veja [Primeiros passos](/docs/getting-started/).

## Conecte a sua carteira

O botão da carteira fica no canto superior direito. Escolha uma conta da sua extensão e autorize o site a usá-la. O mesmo botão troca a rede. Use o Polkadot.

## Compre uma assinatura

**Buy/renew a subscription** no menu.

- A página mostra o preço, o tempo de ativação (cerca de dois minutos) e quantas assinaturas estão disponíveis agora.
- O seu saldo precisa cobrir o preço mais uma pequena taxa.
- Uma única transação dá um lance em um leilão livre e adiciona a sua conta à assinatura.
- Se não houver assinaturas disponíveis, novas só abrem depois de uma votação de governança. Veja [Pallets legados](/docs/legacy-pallets/#current-state).

A assinatura permite que as contas listadas nela enviem transações sem taxa. É isso que o Home Assistant usa para falar com a chain. Detalhes: [Assinaturas RWS](/docs/legacy-pallets/#rws-subscriptions).

## Adicione uma instalação

Uma instalação é a sua casa como o app a vê: uma assinatura e as contas ligadas a ela. **New setup** no menu tem três formas de adicionar uma:

- **Pelo endereço do dono.** Cole o endereço que tem a assinatura. O app encontra a assinatura e mostra a data de término, mesmo que ela já tenha expirado.
- **Com a extensão.** Escolha a conta do dono na sua carteira em vez de digitá-la.
- **A partir de um arquivo.** Envie um backup que você exportou antes.

A lista de instalações fica só no seu navegador. Remover uma instalação do app tira ela dessa lista, e nada muda on-chain.

## Sua instalação

**Your setup** mostra uma assinatura:

- **Active until.** A data de término, em vermelho quando já passou.
- **Owner.** A conta que tem a assinatura.
- **Controller.** A conta que o seu Home Assistant usa para gravar na chain. A integração do Home Assistant cria essa conta; você cola o endereço aqui.
- **Users.** As contas que podem controlar a casa. Adicionar ou remover um usuário é uma transação do dono.
- **Subscription backup.** Exporta a instalação para um arquivo. Para passar para outro navegador ou dispositivo, envie esse arquivo em **New setup**.

## Dispositivos e controle

**Devices & Control** abre o painel do seu Home Assistant no navegador.

- Escolha um usuário e digite a frase-chave desse usuário. O app usa essa frase para decifrar os dados do Home Assistant. Ela fica no navegador.
- Marque **Keep me signed in** só em um dispositivo em que você confia.
- O app se conecta ao Home Assistant diretamente, ponto a ponto. Quando uma conexão direta não é possível, ele passa por um relay. Os dados ficam cifrados o caminho todo.

Para esta página funcionar, o Home Assistant precisa da integração Robonomics. [Conectar dispositivos](/docs/connect-devices/#home-assistant) diz quais integrações existem e quão atualizadas elas estão.

## Árvore de dispositivos

**Device tree** no menu mostra a [árvore de dispositivos](/docs/device-tree/) do Robonomics 5.0.

- A página inicial lista os nós raiz e os seus donos.
- Abra um nó pelo número ou pela conta do dispositivo dele.
- A página de um nó mostra o caminho até a raiz, o dono, a conta do dispositivo, o `meta` e o `payload` (JSON e texto aparecem como texto), os filhos e as permissões de acesso.
- Com uma conta conectada, você pode criar um nó raiz, adicionar filhos aos nós de que é dono e editar `meta` e `payload` onde você é o dono ou tem acesso `Write`. Tudo na árvore é público.

## Datalog

**Send your first record** na página inicial abre a página do Datalog.

- Digite até 512 bytes e envie. A taxa fica bem abaixo de 0.001 XRT.
- Abaixo você vê os registros de qualquer conta, do mais novo para o mais antigo. A chain guarda os últimos 128 registros de cada conta.

O Datalog é um [pallet legado](/docs/legacy-pallets/#datalog). Ele é um bom primeiro teste. Para dispositivos, use a árvore de dispositivos.

## Sensores e gêmeos digitais

- **Altruist.** Abra `robonomics.app/#/altruist/<sensor address>` para ver as leituras do sensor registradas on-chain: material particulado, ruído, temperatura, umidade e pressão em hPa no seu próprio eixo. Veja [Altruist e sensors.social](/docs/altruist/).
- **Monitor de energia.** Abra `robonomics.app/#/energy-monitor/<address>` para fazer o mesmo com um monitor de energia.
- **Gêmeo digital.** Lista os seus gêmeos e as contas por trás de cada tópico. Veja [DigitalTwin](/docs/legacy-pallets/#digitaltwin).

Se um endereço não tem leituras, a página avisa em vez de ficar carregando para sempre.

## Se algo der errado

- **O app se conecta à rede errada.** O app lembra um endereço de rede que veio uma vez em um link. Abra `https://robonomics.app/?rpc=wss://polkadot.rpc.robonomics.network/` uma vez para voltar.
- **Um link da Uniswap mostra outro token.** O XRT de produção no Ethereum é `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. O token antigo `0x7dE9…1cb7` não é o XRT de produção. Veja [XRT em outras redes](/docs/xrt-migration/).
- **Uma assinatura da Kusama não pode ser gerenciada.** O Robonomics na Kusama foi encerrado, então o app trabalha apenas com assinaturas na Polkadot. Veja [XRT em outras redes](/docs/xrt-migration/).
- **Qualquer outra coisa.** Abra uma issue em [github.com/airalab/robonomics.app](https://github.com/airalab/robonomics.app/issues). Inclua a versão do build que aparece no console do navegador. Ela é impressa quando o app inicia.
