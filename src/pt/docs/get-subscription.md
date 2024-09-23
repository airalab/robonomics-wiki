---
title: Como Comprar uma Assinatura

contributors: [LoSk-p, PaTara43]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Pagar comissões por transações em blockchain é irritante. Imagine um dispositivo IoT que envia telemetria a cada 5-10 minutos. Isso fará com que você pague bastante ao longo do mês. Uma das principais características da Rede Robonomics é a assinatura do Serviço Web Robonomics (RWS). Pague mensalmente e esqueça o custo das transações! Para obter informações teóricas, consulte [este](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) artigo.**


{% roboWikiNote {title:"Parachain", type: "warning"}%}   Preste atenção que este tutorial demonstra como comprar uma assinatura na parachain Robonomics Kusama. Você também pode realizar todos os mesmos passos em seu [nó local](/docs/run-dev-node).
Mais uma coisa antes de começar. Este é um "modo difícil" de comprar uma assinatura. Existe uma maneira convencional de fazer isso através do [Robonomics DApp](https://dapp.robonomics.network/#/).
{% endroboWikiNote %}

## Dar Lance em um Leilão

As assinaturas na Robonomics são vendidas com um modelo de leilão. Para obter uma, você precisa dar lance em um leilão e vencê-lo (não se preocupe, é rápido).

Em `Desenvolvedor/Estado da Cadeia` você pode ver os leilões disponíveis.
Escolha `rws` e `auctionQueue` e pressione o botão `+`, você verá os IDs dos leilões disponíveis:

{% roboWikiPicture {src:"docs/rws/queue.png", alt:"queue"} %}{% endroboWikiPicture %}

Você pode ver informações sobre qualquer assinatura com `rws` `auction` e o ID do leilão (o ID do leilão na imagem é 79):

{% roboWikiPicture {src:"docs/rws/auction.png", alt:"auction"} %}{% endroboWikiPicture %}

Nas informações sobre o leilão, você pode ver o campo `winner`, no momento está como `null`, então ninguém possui essa assinatura e você pode adquiri-la. Para isso, vá para `Desenvolvedor/Extrínseco`, escolha sua conta e `rws -> bid`. Além disso, defina o ID do leilão (79) e a quantidade de unidades a serem apostadas (mais de 1000000000 Wn):

{% roboWikiPicture {src:"docs/rws/bid.png", alt:"bid"} %}{% endroboWikiPicture %}

Envie a transação e verifique as informações sobre o leilão com o ID 79 (em `Estado da Cadeia` escolha `rws -> auction` e ID 79):

{% roboWikiPicture {src:"docs/rws/auc_win.png", alt:"auc_win"} %}{% endroboWikiPicture %}

Agora no campo `winner` você verá o endereço de sua conta, o que significa que esta conta possui a assinatura 79. Um leilão começa com o primeiro lance e dura alguns blocos, então se alguém apostar mais tokens do que você nos próximos blocos, essa pessoa será a vencedora e obterá a assinatura.

Agora você pode adicionar dispositivos. Dispositivos são contas que podem usar esta assinatura e enviar extrínsecos sem taxa.
Para testar, crie uma nova conta sem tokens e adicione-a aos dispositivos.

Para adicionar dispositivos, escolha `rws -> setDevices` em `Desenvolvedor/Extrínseco`. Em seguida, pressione o botão `Adicionar Item` e escolha a conta recém-criada sem tokens:

{% roboWikiPicture {src:"docs/rws/set_devices.png", alt:"set_devices"} %}{% endroboWikiPicture %}

Envie a transação. Agora você pode verificar a lista de dispositivos em `Estado da Cadeia` com `rws -> devices`. Lá você verá o endereço de sua conta sem tokens. Escolha a conta que comprou a assinatura e pressione `+`:

{% roboWikiPicture {src:"docs/rws/devices.png", alt:"devices"} %}{% endroboWikiPicture %}

Agora você pode tentar [enviar lançamento](/docs/subscription-launch) extrínseco usando a assinatura.