---
title: Como Enviar Lançamento com Assinatura

contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"Parachain", type: "warning"}%}Preste atenção que este tutorial demonstra o uso de uma assinatura na parachain Robonomics Kusama. Você também pode realizar todos os mesmos passos em seu [nó local](/docs/run-dev-node). {% endroboWikiNote %}


Se o seu endereço tiver uma assinatura ativa, então qualquer dispositivo configurado com a chave da conta pode enviar extrínsecos sem taxa.
Vamos tentar enviar o comando `lançamento`.

Vá para a página `Desenvolvedor/Extrínsecos`, então escolha sua conta (aquela da lista de dispositivos) e selecione `rws -> call(subscriptionId, call)`.
Em seguida, no campo `subscriptionId`, cole o endereço do proprietário da assinatura (quem fez a oferta no leilão) e no próximo campo
escolha `lançamento -> lançamento(robô, parâmetro)`. No campo `robô`, digite o endereço para o qual deseja enviar a transação de `lançamento`
e insira o comando (para descrição do comando de lançamento, consulte [aqui](/docs/launch)). Em seguida, envie a transação:

{% roboWikiPicture {src:"docs/rws/launch.png", alt:"lançamento"} %}{% endroboWikiPicture %}


Agora vá para a página `Rede/Explorador`, e na área `Eventos Recentes` você verá dois eventos que você criou; `rws.NewCall` e `lançamento.NewLaunch`

{% roboWikiPicture {src:"docs/rws/events.png", alt:"eventos"} %}{% endroboWikiPicture %}