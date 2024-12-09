---
title: Ativar Assinatura
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.7.0
    https://github.com/airalab/robonomics.app
---

**Neste artigo, você criará contas de parachain Robonomics e comprará uma assinatura de IoT.**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Para controlar o Home Assistant com Robonomics, você precisa de 2 contas na parachain Robonomics. Para uma das contas (`OWNER`), você comprará uma assinatura Robonomics. A segunda conta (`CONTROLLER`) controlará todos os processos do Home Assistant (como telemetria) e dará acesso a outros usuários. Essas contas fornecerão segurança para o seu Home Assistant.

Se você não tiver uma conta, verifique este artigo e crie [a conta OWNER](/docs/create-account-in-dapp/). A conta Controller será criada automaticamente durante a configuração.

No artigo, é utilizado uma carteira de extensão [Polkadot.js](https://polkadot.js.org/extension/) para trabalhar com contas, mas você pode usar outra carteira que seja conveniente para você.

## Ativar Assinatura Robonomics

{% roboWikiNote {type:"ok"}%}

Para esta etapa, você deve ter uma quantidade suficiente de tokens XRT (mínimo de 2-3 XRT) em sua conta `OWNER`.

{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

1. Acesse o Robonomics dApp e vá para a [página de assinatura](https://robonomics.app/#/rws-buy). Em seguida, clique em `Conectar Conta` na barra lateral direita.

2. No menu pop-up seguinte, conecte a extensão Polkadot.js. Você verá o endereço da sua conta juntamente com seu saldo.

3. Antes de comprar, certifique-se de ter selecionado a conta `OWNER`. Clique no ícone do perfil do endereço e você deverá ver a conta `OWNER`.

4. Por fim, clique no botão `COMPRAR ASSINATURA` e insira a senha da sua conta. Aguarde até que o processo de ativação seja concluído. Você verá o estado da sua assinatura após algum tempo.

## Configure sua Assinatura

Agora você precisa configurar sua assinatura adicionando a conta `CONTROLLER` a ela.

{% roboWikiPicture {src:"docs/home-assistant/sub-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

1. Acesse o dApp Robonomics e vá para a [página de configuração de uma assinatura](https://robonomics.app/#/rws-setup). Navegue até a seção **Configurações de Assinatura**.

2. No campo `Frase-semente do Controlador`, clique na varinha mágica para criar uma nova conta `CONTROLADOR`.

3. Na janela pop-up, crie uma senha para a conta `CONTROLADOR`.

4. Na próxima janela pop-up, você verá o endereço da sua nova conta e a frase-semente mnemônica. Guarde a frase-semente mnemônica com segurança, pois você precisará dela posteriormente para a configuração da integração. Além disso, o arquivo JSON com a conta `CONTROLADOR` será baixado. Você pode importá-lo para sua carteira. Saiba como fazer isso para a extensão Polkadot.js [aqui](/docs/create-account-in-dapp/).

{% roboWikiPicture {src:"docs/home-assistant/controller-create.jpg", alt:"controller create"} %}{% endroboWikiPicture %}

5. Feche a janela pop-up e clique no botão `SALVAR`.

## Adicionar Conta do Controlador à Assinatura

Agora, você precisa adicionar sua conta `CONTROLADOR` à **lista de acesso**.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls']} %}{% endroboWikiVideo %}

1. Acesse o dApp Robonomics e vá para a [página de configuração de assinatura](https://robonomics.app/#/rws-setup). Certifique-se de ter selecionado a assinatura correta e a conta `OWNER`.

2. Copie o endereço do `CONTROLLER`: abra a extensão e clique no ícone ao lado do nome da conta ou copie o endereço na seção **Configurações de Assinatura**.

3. Cole este endereço no campo `Endereço Polkadot` na seção **USUÁRIOS NA ASSINATURA** e clique no botão `+`.

4. Insira a senha da sua conta `OWNER` na janela pop-up e aguarde a conclusão do processo de ativação.

É isso. Vá para o próximo artigo.