---
title: Ativar Assinatura
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp
    https://github.com/airalab/robonomics.app
---

Neste artigo, você irá criar contas de parachain da Robonomics e comprar uma assinatura de IoT.

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Para controlar o Home Assistant com a Robonomics, você precisa de 2 contas na parachain da Robonomics. Para uma das contas (`OWNER`), você comprará uma assinatura da Robonomics. A segunda conta (`CONTROLLER`) controlará todos os processos do Home Assistant (como telemetria) e dará acesso a outros usuários. Essas contas fornecerão segurança para o seu Home Assistant.

{% roboWikiNote {title:"ATENÇÃO", type: "warning"}%}
Ambas as contas devem ser criadas com criptografia **ed25519**. Portanto, você precisa criar uma conta usando a interface Polkadot-JS e selecionar a criptografia necessária.

Essa funcionalidade está desativada por padrão na interface Polkadot-JS. Para ativá-la, vá para `Configurações` -> `Geral` -> `opções de conta` e selecione `Permitir armazenamento local de conta no navegador` no menu suspenso em `criação de conta no navegador`.
{% endroboWikiNote %}

## Criar Contas de Proprietário e Controlador

{% roboWikiVideo {videos:[{src: 'QmajeEV4adqR2DCaBJPZhH6NR74eHaRmvCcbeQtnLm7Kcc', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Acesse o [aplicativo Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) no Portal Polkadot / Substrate. **Verifique o canto superior esquerdo para garantir que você está conectado à Parachain da Robonomics.**

2. Vá para `Contas` -> `Contas` e clique no botão `Adicionar conta`. Você verá o menu pop-up com a semente da conta. Ela temDois formulários: *Mnemônico* (legível por humanos) e *Bruto* (uma sequência de dígitos e letras).

3. Abra `Opções avançadas de criação`, altere o tipo de criptografia da conta que está sendo criada para `Edwards - ed25519` e pressione `Próximo`.

4. Salve a frase mnemônica com segurança e pressione `Próximo`.

5. No próximo menu, você precisa definir o nome da conta e a senha. Para conveniência, nomeie-a como `OWNER`. Pressione `Próximo`.

6. Na janela final, clique em `Salvar` para concluir a criação da conta. Isso também gerará arquivos JSON de backup que você deve armazenar com segurança. Você pode usar este arquivo posteriormente para recuperar sua conta se lembrar da senha.

7. Repita essas etapas para criar uma conta com o nome `CONTROLLER`.


## Adicionar Contas ao Polkadot.js

Para conveniência, você deve usar a [extensão Polkadot.js](https://polkadot.js.org/extension/) e adicionar essas contas recém-criadas a ela. Para uma conta ed25519, você só pode fazer isso com um arquivo JSON de backup. Você pode usar os arquivos salvos ao criar as contas.

Você pode obter esses arquivos novamente criando um arquivo de backup da conta. Clique nos três pontos ao lado da sua conta, escolha `Criar um arquivo de backup para esta conta` e digite sua senha.

{% roboWikiVideo {videos:[{src: 'Qmc5LcbLSdVCUubLomUUo5Qxrxb2xaixpwUFqnpj2C9iM5', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Abra a extensão e pressione o botão `+` no canto superior direito, em seguida, escolha `Restaurar conta a partir de um arquivo JSON de backup`.

2. Na janela aberta, faça o upload do arquivo JSON, insira a senha e pressione `Restaurar`.

3. Certifique-se de que a rede Robonomics está selecionada para as contas na extensão Polkadot.js. No Portal Polkadot / Substrate, vá para `Configurações` -> `Metadados` e clique no botão `Atualizar metadados`.

4. Confirme a atualização dos metadados na janela pop-up. A extensão agora mostrará o rótulo da rede para a qual o endereço é usado.## Ativar a Assinatura Robonomics

{% roboWikiNote {type: "okay"}%} Para este passo, você deve ter uma quantidade suficiente de tokens XRT (mínimo de 2-3 XRT) em sua conta `OWNER`. {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Acesse o Robonomics dApp e vá para a [página de assinatura](https://robonomics.app/#/rws-buy). Em seguida, clique em `Conectar Conta` na barra lateral direita.

2. No menu pop-up seguinte, conecte a extensão Polkadot.js. Você verá o endereço da sua conta juntamente com seu saldo.

3. Antes de comprar, certifique-se de ter selecionado a conta `OWNER`. Clique no ícone do perfil do endereço e você deverá ver a conta `OWNER`.

4. Por fim, clique no botão `COMPRAR ASSINATURA` e insira a senha da sua conta. Aguarde até que o processo de ativação seja concluído. Você verá o estado da sua assinatura após algum tempo.

## Configurar sua Assinatura

Agora você precisa configurar sua assinatura adicionando a conta `CONTROLLER` a ela.

{% roboWikiVideo {videos:[{src: 'Qmd5P356UE1yDLAd4uSdq1dERbyp5gk5wpWD3iENNt2mjV', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Acesse o Robonomics dApp e vá para a [página de configuração de assinatura](https://robonomics.app/#/rws-setup). Navegue até a seção **CONFIGURAÇÕES GERAIS**.

2. Remova a frase-semente do campo `Frase-semente do Controlador` e insira a frase-semente da conta `CONTROLLER`.

3. Copie o endereço do `CONTROLLER`: abra a extensão e clique no ícone ao lado.o nome da conta.

4. Cole este endereço no campo `Controlador` e clique no botão `SALVAR`.

## Adicionar Contas à Assinatura

Agora, você precisa adicionar sua conta `CONTROLADOR` à **lista de acesso**.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Acesse o dApp Robonomics e vá para a [página de configuração de assinatura](https://robonomics.app/#/rws-setup). Certifique-se de ter selecionado a assinatura correta e a conta `PROPRIETÁRIO`.

2. Copie o endereço do `CONTROLADOR`: abra a extensão e clique no ícone ao lado do nome da conta.

3. Cole este endereço no campo `Endereço Polkadot` na seção **USUÁRIOS NA ASSINATURA** e clique no botão `+`.

4. Insira a senha da sua conta `PROPRIETÁRIO` na janela pop-up e aguarde a conclusão do processo de ativação.