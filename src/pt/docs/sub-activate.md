---
title: Ativar Assinatura
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.8.2
    https://github.com/airalab/robonomics.app
---

**Neste artigo, você criará contas de parachain Robonomics e comprará uma assinatura de IoT.**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Para controlar o Home Assistant com Robonomics, você precisa de 2 contas na parachain Robonomics. Para uma das contas (`PROPRIETÁRIO`), você comprará uma assinatura Robonomics. A segunda conta (`CONTROLADOR`) controlará todos os processos do Home Assistant (como telemetria) e dará acesso a outros usuários. Essas contas fornecerão segurança para o seu Home Assistant.

Se você não tiver uma conta, verifique este artigo e crie [a conta do PROPRIETÁRIO](/docs/create-account-in-dapp/). A conta do Controlador será criada automaticamente durante a configuração.

No artigo, é utilizado uma carteira de extensão [Polkadot.js](https://polkadot.js.org/extension/) para trabalhar com contas, mas você pode usar outra carteira que seja conveniente para você.

## Ativar Assinatura Robonomics

{% roboWikiNote {type:"ok"} %}

Para esta etapa, você deve ter uma quantidade suficiente de tokens XRT (mínimo de 2-3 XRT) em sua conta `OWNER`.

{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Acesse o Robonomics dApp e vá para a [página de inscrição](https://robonomics.app/#/rws-buy). Em seguida, clique em `Conectar Conta` na barra lateral direita.

2. No menu pop-up seguinte, conecte a extensão Polkadot.js. Você verá o endereço da sua conta juntamente com seu saldo.

3. Antes de comprar, certifique-se de ter selecionado a conta `OWNER`. Clique no ícone do perfil do endereço e você deverá ver a conta `OWNER`.

4. Por fim, clique no botão `COMPRAR INSCRIÇÃO` e insira a senha da sua conta. Aguarde até que o processo de ativação seja concluído. Você verá o estado da sua inscrição após algum tempo.

## Configure sua Inscrição

Agora você precisa configurar sua inscrição adicionando a conta `CONTROLLER` a ela.

{% roboWikiPicture {src:"docs/home-assistant/sub-download-backup.png",alt:"sub_setup"} %}{% endroboWikiPicture %}

1. Acesse o Robonomics dApp e vá para a [página de configuração de assinatura](https://robonomics.app/#/rws-setup). Navegue até a seção de **Configurações de Assinatura**.

2. Clique em `FAZER DOWNLOAD DO BACKUP` e selecione a opção `PARA O SERVIDOR`.

{% roboWikiNote {type: "warning", title: "Informação importante" }%} Esta ação criará um novo controlador para a sua assinatura. Não se esqueça de adicioná-lo à assinatura. {% endroboWikiNote %}

3. Na janela pop-up, crie uma senha para a conta `CONTROLADOR`.

{% roboWikiPicture {src:"docs/home-assistant/server-new-settings.png", alt:"criar controlador"} %}{% endroboWikiPicture %}

4. Na próxima janela pop-up, você verá o endereço da sua nova conta e a frase semente mnemônica. Salve a frase semente mnemônica com segurança. Na pasta de downloads, você encontrará dois arquivos JSON: o primeiro arquivo é nomeado `Controlador-<endereço>.json`, onde `<endereço>` é o endereço do seu controlador recém-gerado. O segundo arquivo é nomeado `robonomics.app-settings-<nome-da-assinatura>-servidor.json`, onde `<nome-da-assinatura>` é o nome da sua assinatura. Salve esses arquivos com segurança, pois serão necessários posteriormente para a configuração da integração. Além disso, você pode importar o seu controlador.conta em sua carteira. As instruções para importá-la para a extensão Polkadot.js podem ser encontradas [aqui](/docs/create-account-in-dapp/).

{% roboWikiPicture {src:"docs/home-assistant/controller-acc.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

5. (Opcional) Você pode adicionar credenciais para o serviço de fixação Pinata ou outro gateway personalizado para espalhar seus dados de forma mais ampla pela rede IPFS.

{% roboWikiNote {title:"Nota", type: "Nota"}%} Na seção [Configuração do Pinata](/docs/pinata-setup), você pode encontrar informações mais detalhadas sobre o uso do Pinata.{% endroboWikiNote %}

6. Feche a janela pop-up e clique no botão `SALVAR`.

{% roboWikiPicture {src:"docs/home-assistant/save-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

## Adicionar Conta do Controlador à Assinatura

Agora, você precisa adicionar sua conta `CONTROLADOR` à **lista de acesso**.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls']} %}{% endroboWikiVideo %}

1. Acesse o dApp Robonomics eAcesse a [página de configuração de assinatura](https://robonomics.app/#/rws-setup). Certifique-se de ter selecionado a assinatura correta e a conta `OWNER`.

2. Copie o endereço do `CONTROLLER`: abra a extensão e clique no ícone ao lado do nome da conta ou copie o endereço na seção **Configurações de Assinatura**.

3. Cole este endereço no campo `Endereço Polkadot` na seção **USUÁRIOS NA ASSINATURA** e clique no botão `+`.

4. Insira a senha da sua conta `OWNER` na janela pop-up e aguarde a conclusão do processo de ativação.

Isso é tudo. Vá para o próximo artigo.