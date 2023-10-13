---
title: Como comprar uma assinatura

contributors: [LoSk-p, PaTara43]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Pagar comissões por transações em blockchain é irritante. Imagine um dispositivo IoT que envia telemetria a cada 5-10 minutos. Isso fará com que você pague bastante durante o mês. Uma das principais características da Rede Robonomics é a assinatura do Serviço Web Robonomics (RWS). Pague mensalmente e esqueça o custo da transação! Para informações teóricas, consulte [este](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) artigo.**

<robo-wiki-note type="warning" title="Parachain">

  Preste atenção que este tutorial demonstra a compra de uma assinatura na parachain Robonomics Kusama. Você também pode realizar todos os mesmos passos em seu [nó local](/docs/run-dev-node).

  Mais uma coisa antes de começar. Esta é uma forma "difícil" de comprar uma assinatura. Existe uma forma convencional de fazer isso através do [Robonomics DApp](https://dapp.robonomics.network/#/).

</robo-wiki-note>

## Dar um lance em um leilão

As assinaturas na Robonomics são vendidas com um modelo de leilão. Para obter uma, você precisa dar um lance em um leilão e vencê-lo (não se preocupe, é rápido).

Em `Developer/Chain state`, você pode ver os leilões disponíveis. 
Escolha `rws` e `auctionQueue` e pressione o botão `+`, você verá os IDs dos leilões disponíveis:

![queue](../images/rws/queue.png)

Você pode ver informações sobre qualquer assinatura com `rws` `auction` e o ID do leilão (o ID do leilão na imagem é 79):

![auction](../images/rws/auction.png)

Nas informações sobre o leilão, você pode ver o campo `winner`, no momento ele está `null`, então ninguém possui essa assinatura e você pode obtê-la. Para isso, vá para `Developer/Extrinsic`, escolha sua conta e `rws -> bid`. Também defina o ID do leilão (79) e a quantidade de unidades para dar um lance (mais de 1000000000 Wn):

![bid](../images/rws/bid.png)

Envie a transação e verifique as informações sobre o leilão com o ID 79 (em `Chain state`, escolha `rws -> auction` e ID 79):

![win](../images/rws/auc_win.png)

Agora, no campo `winner`, você verá o endereço da sua conta, o que significa que essa conta possui a assinatura 79. Um leilão começa com o primeiro lance e dura alguns blocos, então se alguém der mais tokens do que você nos próximos blocos, essa pessoa será a vencedora e ficará com a assinatura.

Agora você pode adicionar dispositivos. Dispositivos são contas que podem usar essa assinatura e enviar extrínsecos sem taxa.
Para testá-lo, crie uma nova conta sem tokens e adicione-a aos dispositivos. 

Para adicionar dispositivos, escolha `rws -> setDevices` em `Developer/Extrinsic`. Em seguida, pressione o botão `Add Item` e escolha a conta recentemente criada sem tokens:

![set_devices](../images/rws/set_devices.png)

Envie a transação. Agora você pode verificar a lista de dispositivos em `Chain state` com `rws -> devices`. Lá você verá o endereço da sua conta sem tokens. Escolha a conta que comprou a assinatura e pressione `+`:

![devices](../images/rws/devices.png)

Agora você pode tentar [enviar um lançamento](/docs/subscription-launch) extrínseco usando a assinatura.