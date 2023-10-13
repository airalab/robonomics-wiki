---
title: Como enviar um lançamento com assinatura

contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="warning" title="Parachain">

  Preste atenção que este tutorial demonstra o uso de uma assinatura na parachain Robonomics Kusama. Você também pode realizar todos os mesmos passos em seu [nó local](/docs/run-dev-node).

</robo-wiki-note>

Se o seu endereço tiver uma assinatura ativa, então qualquer dispositivo configurado com a chave secreta dessa conta pode enviar extrínsecos sem taxa. 
Vamos tentar enviar o comando `launch`.

Vá para a página `Developer/Extrinsics`, em seguida, escolha sua conta (aquela da lista de dispositivos) e selecione `rws -> call(subscriptionId, call)`. 
Em seguida, no campo `subscriptionId`, cole o endereço do proprietário da assinatura (aquele que fez o lance no leilão) e no próximo campo escolha `launch -> launch(robot, param)`. No campo `robot`, digite o endereço para o qual você deseja enviar a transação `launch` e insira o comando (para a descrição do comando de lançamento, consulte [aqui](/docs/launch)). Em seguida, envie a transação:

![launch](../images/rws/launch.png)


Agora vá para a página `Network/Explorer` e na área `Recent Events` você verá dois eventos que você criou; `rws.NewCall` e `launch.NewLaunch`:

![events](../images/rws/events.png)
