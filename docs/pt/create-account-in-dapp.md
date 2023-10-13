---
title: Criar conta para Robonomics Parachain

contributors: [PaTara43, Fingerling42]
---

**Para interagir e operar com Robonomics Parachain, desenvolvedores e usuários precisam criar uma conta no Portal Polkadot/Substrate. A conta executa funções básicas para a rede: seu endereço de rede pública (a chave pública), o controle de acesso ao endereço e aos fundos (a chave privada), enviando transações para a rede, mostrando seus tokens e sua quantidade, etc. duas maneiras principais de criar uma conta no Robonomics Parachain.**

## 1. Usando a Extensão do Navegador Polkadot{.js}

A Extensão Polkadot fornece um mecanismo para gerar a conta e interagir com todos os projetos Polkadot / Kusama, incluindo Robonomics Parachain. Esta não é a maneira mais segura de gerenciar sua conta, mas é a mais conveniente em termos de equilíbrio entre segurança / usabilidade.

## 1.1. Instalar a Extensão do Navegador

A extensão do navegador está disponível para [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) and [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (além de navegadores baseados em Chromium).

![Browser Extension](../images/creating-an-account/1.1-polkadot-extension.png "Browser Extension")

## 1.2. Abrir o Aplicativo Robonomics Parachain

Vá para [Aplicativo Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) no Portal Polkadot / Substrate. Se esta for a primeira vez que você entra no portal, ele solicitará acesso à extensão do navegador, então permita o acesso. 

Depois de abrir o aplicativo, dê uma olhada no canto superior esquerdo. Lá são exibidos o nome da rede, seu ícone e o número do último bloco. Clicar nesta área abrirá uma lista de todas as redes Polkadot/Kusama, incluindo redes de teste e nós locais. Você pode alternar entre redes selecionando a desejada e pressionando o botão `Switch`. **Certifique-se de estar conectado ao Robonomics Parachain agora**. 

![Robonomics Parachain app](../images/creating-an-account/1.2-robonomics-app.png "Robonomics Parachain app")

## 1.3. Atualizar Metadados da Extensão

É muito provável que o aplicativo solicite que você atualize os metadados da extensão para exibir as informações corretas sobre a cadeia à qual você está conectado. Vá para **Settings -> Metadata**, press `Update metadata` botão e, em seguida, na janela pop-up, permita que a extensão faça isso. 

![Updating metadata](../images/creating-an-account/1.3-metadata-update.png "Updating metadata")

## 1.4. Criar Conta na Extensão

Abra a extensão do navegador Polkadot{.js}. Clique no grande botão de adição ou selecione `Create new account` no pequeno ícone de adição no canto superior direito. Você deverá ver o seguinte menu, com uma semente mnemônica gerada na forma de doze palavras e o endereço. 

![Account creation, step one](../images/creating-an-account/1.4-create-account-step-1.png "Account creation, step one")

A semente é a chave para a conta. Saber a semente permite que você (ou qualquer outra pessoa que saiba a semente) controle essa conta e até mesmo a recrie, caso esqueça a senha. **É muito importante armazená-la em um local seguro**, preferencialmente em papel ou outro dispositivo não digital, não em armazenamento digital ou em um computador. 

Salve a semente e pressione `Next step`. Você deve ver o seguinte menu.

![Account creation, step two](../images/creating-an-account/1.5-create-account-step-2.png "Account creation, step two")

- *Network* permite que você escolha em qual das redes esta conta será usada exclusivamente. Você pode usar o mesmo endereço em várias redes, no entanto, por motivos de privacidade, é recomendável que você crie um novo endereço para cada rede que você usa. 
Selecione a rede Robonomics na lista suspensa. Se você não conseguiu encontrar a rede Robonomics, provavelmente você não atualizou os metadados, volte e faça isso.

    - Você notará que o formato do endereço e o ícone da conta mudarão - isso é normal. Os formatos de rede diferentes são apenas outras representações da mesma chave pública. 

- *Name* é apenas o nome da conta para seu uso exclusivo. Ele não é armazenado no blockchain e não será visível para outros usuários. 

- *Password* é usado para criptografar as informações da sua conta. Você precisará digitá-lo novamente ao assinar transações no portal. Crie um e lembre-se dele.

Como resultado, após criar uma conta, você a verá na lista de contas na extensão Polkadot{.js}. Clicando em três pontos, você pode renomear a conta, exportá-la, removê-la da extensão e alterar a rede usada para a conta. 

Além disso, a conta aparecerá no menu **Accounts -> Accounts** do portal, onde será notado que foi injetada utilizando a extensão.

![Successful account creation](../images/creating-an-account/1.6-account-injected.png "Successful account creation")


## 2. Diretamente no aplicativo Robonomics Parachain

Você pode usar a interface do usuário no Portal Polkadot / Substrate para criar uma conta. Ela pode ser usada para desenvolvimento e testes. 

## 2.1. Abra o aplicativo Robonomics Parachain

Vá para [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) no Portal Polkadot / Substrate. **Verifique no canto superior esquerdo se você está conectado ao Robonomics Parachain**.  

Vá para **Accounts -> Accounts** e pressione o botão `Add account`.

![Robonomics Parachain App](../images/creating-an-account/2.1-robonomics-app-main-view.png "Robonomics Parachain App")

## 2.2. Criar Conta

Você deve ver o seguinte menu pop-up com a semente da conta. 

![Generating account seed](../images/creating-an-account/2.2-robonomics-app-seed.png "Generating account seed")

Tem duas formas: *Mnemonic* (legível por humanos) e *Raw* (uma sequência de dígitos e letras). Guarde a frase-semente de forma segura e pressione `Next`.

> Também é possível alterar o tipo de criptografia para criar uma conta, para isso abra `Advanced creation options` e escolha o tipo (`ed25519` na imagem).

![ed25519 crypto type account](../images/creating-an-account/ed-account.jpg)

No próximo menu, você precisa definir o nome da conta e a senha, semelhante às instruções de extensão descritas acima.

![Generating account name and password](../images/creating-an-account/2.3-robonomics-app-name-pass.png "Generating account name and password")

Clicar no botão `Next` irá levá-lo para a última janela. Clique em `Save` para finalizar a criação da conta. Ele também irá gerar arquivos JSON de backup que você deve armazenar com segurança. Você pode usar este arquivo posteriormente para recuperar sua conta, caso se lembre da senha.

![Successful account creation](../images/creating-an-account/2.4-robonomics-app-account-created.png "Successful account creation")

## 2.3 Adicionar conta ed25519 à extensão Polkadot

Você pode precisar adicionar a conta criada à extensão Polkadot.js (para contas ed25519, você só pode fazer isso com o arquivo JSON de backup). Para isso, você precisa criar um arquivo de backup da conta. Clique nos três pontos em sua conta e escolha `Create a backup file for this account` e escreva sua senha.

![Backup file](../images/creating-an-account/backup-file.jpg)

Em seguida, abra uma extensão e clique no botão `+` no canto superior direito, em seguida, escolha `Restore account from backup JSON file`.

![Restore backup in extension](../images/creating-an-account/extention-add-backup.jpg)

Na janela aberta, solte o arquivo salvo, insira a senha e pressione `Restore`.

![Restore backup in extension 2](../images/creating-an-account/file-backup.jpg)

## 3. Conta criada com sucesso 

Agora você pode operar completamente com sua conta recém-criada. Envie e receba tokens, mensagens, escreva datalog e muito mais. Sinta-se à vontade para explorar todos os recursos do aplicativo. Para copiar o endereço da sua conta, basta clicar em seu ícone, o endereço será copiado para a área de transferência. 

Se você deseja saber mais sobre contas Polkadot / Kusama e outras formas adicionais de criá-las, mais informações podem ser encontradas [aqui](https://wiki.polkadot.network/docs/learn-accounts) e [aqui](https://wiki.polkadot.network/docs/learn-account-generation).
