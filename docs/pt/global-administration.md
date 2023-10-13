---
title: Administração Global

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

**Este artigo mostrará como configurar um novo usuário para o seu Home Assistant.**

## Adicionando Usuários à Assinatura

Você não pode usar contas criadas anteriormente porque `SUB_OWNER` e `SUB_CONTROLLER` fornecem segurança, e o primeiro usuário que você criou quando começou o Home Assistant não possui uma conta Robonomics Parachain.

1. Crie uma conta na Robonomics parachain, como você fez no [artigo anterior](/docs/sub-activate/).

2. Usando a conta `SUB_OWNER`, adicione uma nova conta de usuário à assinatura no [dapp](https://dapp.robonomics.network/#/subscription/devices). Agora deve haver três endereços na lista de acesso: `SUB_OWNER`, `SUB_CONTROLLER` e `USER`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSxzram7CF4SXpVgEyv98XetjYsxNFQY2GY4PfyhJak7H', type:'mp4'}]" />


## Concedendo Acesso ao Usuário

1. Acesse o serviço dapp chamado [Home Assistant Account](https://dapp.robonomics.network/#/home-assistant). Escolha a conta que você acabou de criar na barra lateral direita (verifique se você escolheu a conta desejada pressionando o ícone de perfil).

2. Insira a seed `USER` no campo obrigatório. Adicione os endereços `SUB_OWNER` e `SUB_CONTROLLER` nos campos de créditos de administrador. Se tudo estiver correto, você verá o status de verificação `VERIFIED`.

3. Crie uma senha para o novo usuário que você acabou de registrar e confirme a transação, que agora será sem taxa devido à assinatura. Mais tarde, você pode restaurar a senha na guia Restaurar.

4. Após o processo de registro, faça login no Home Assistant com o endereço do seu usuário como login e a senha recém-criada.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmW2TXuwCYXzgcRfEUx4imZU5ZerEzkuD5P53u9g2WnxDh', type:'mp4'}]" />

Agora você pode usar o dapp para controlar sua casa através do Robonomics, verifique o artigo [**"Obter Telemetria de Casa Inteligente"**](/docs/smart-home-telemetry/).

## Solucionando Problemas

1. Se você esquecer a senha do Home Assistant da sua conta Robonomics, [verifique o Dapp.](https://dapp.robonomics.network/#/home-assistant)
Vá para a parte "Your Home Assistant password" e escolha a guia "Restore".
