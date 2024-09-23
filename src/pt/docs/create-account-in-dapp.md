---
title: Criar Conta para Robonomics Parachain

contributors: [PaTara43, Fingerling42]
---

**Para interagir e operar com o Robonomics Parachain, desenvolvedores e usuários precisam criar uma conta no Portal Polkadot / Substrate. A conta desempenha funções básicas para a rede: seu endereço público na rede (a chave pública), o controle de acesso ao endereço e aos fundos (a chave privada), enviar transações para a rede, mostrar seus tokens e sua quantidade, etc. Abaixo estão as duas principais maneiras de criar uma conta para o Robonomics Parachain.**

## 1. Usando a Extensão do Navegador Polkadot{.js}

A Extensão do Polkadot fornece um mecanismo para gerar a conta e interagir com todos os projetos Polkadot / Kusama, incluindo o Robonomics Parachain. Esta não é a maneira mais segura de gerenciar sua conta, mas é a mais conveniente em termos de equilíbrio entre segurança e usabilidade.

## 1.1. Instalar a Extensão do Navegador

A extensão do navegador está disponível para [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) e [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (além de navegadores baseados em Chromium).

{% roboWikiPicture {src:"docs/creating-an-account/1.1-polkadot-extension.png", alt:"Extensão do Navegador"} %}{% endroboWikiPicture %}

## 1.2. Abrir o Aplicativo Robonomics Parachain

Acesse o [aplicativo Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) no Portal Polkadot / Substrate. Se esta for a primeira vez que você entra no portal, ele solicitará acesso à extensão do navegador, então permita o acesso.

Depois de abrir o aplicativo, dê uma olhada no canto superior esquerdo. O nome da rede, seu ícone e o número do último bloco são exibidos lá. Clicar nesta área abrirá uma lista de todas as redes Polkadot / Kusama, incluindo redes de teste e nós locais. Você pode alternar entre as redes selecionando a necessária e pressionando o botão `Switch`. **Certifique-se de queestão conectados à Robonomics Parachain agora**.

{% roboWikiPicture {src:"docs/creating-an-account/1.2-robonomics-app.png", alt:"Aplicativo Robonomics Parachain"} %}{% endroboWikiPicture %}

## 1.3. Atualizar Metadados da Extensão e Criação de Conta no Navegador

É muito provável que o aplicativo solicite que você atualize os metadados da extensão para exibir as informações corretas sobre a cadeia à qual você está conectado. Vá para **Configurações -> Metadados**, pressione o botão `Atualizar metadados` e, em seguida, na janela pop-up, permita que a extensão o faça.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-metadata-update.png", alt:"Atualizando metadados"} %}{% endroboWikiPicture %}

Por padrão, o aplicativo da web só funciona com contas externas. Para permitir a criação de novas contas diretamente no navegador, vá para **Configurações -> Geral -> Opções de Conta -> criação de conta no navegador**, escolha `Permitir armazenamento local de conta no navegador` e pressione o botão `Salvar`.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-in-browser-account-creation.png", alt:"Atualizando criação de conta no navegador"} %}{% endroboWikiPicture %}

## 1.4. Criar Conta na Extensão

Abra a extensão do navegador Polkadot{.js}. Clique no grande botão de adição ou selecione `Criar nova conta` no pequeno ícone de adição no canto superior direito. Você deverá ver o seguinte menu, com uma semente mnemônica gerada na forma de doze palavras e o endereço.

{% roboWikiPicture {src:"docs/creating-an-account/1.4-create-account-step-1.png", alt:"Criação de conta, passo um"} %}{% endroboWikiPicture %}

A semente é a chave para a conta. Saber a semente permite a você (ou qualquer outra pessoa que saiba a semente) controlar essa conta e até mesmo recriá-la, caso esqueça a senha. **É muito importante armazená-la de forma segura**, preferencialmente em papel ou outro dispositivo não digital, não em armazenamento digital ou em um computador.

Salve a semente e pressione `Próxima etapa`. Você deverá ver o seguinte menu.

{% roboWikiPicture {src:"docs/creating-an-account/1.5-create-account-step-2.png", alt:"Criação de conta, passo dois"} %}{% endroboWikiPicture %}


- *Rede* permite que você escolha em qual das redes essa conta será usada exclusivamente. Você pode usar o mesmo endereço em várias redes, no entanto, por motivos de privacidade, é recomendável que você crie um novo endereço para cada rede que você usar.
Selecione a rede Robonomics na lista suspensa. Se você não conseguir encontrar a rede Robonomics, provavelmente você não atualizou os metadados, volte e faça isso.

    `Você notará que o formato do endereço e o ícone da conta mudarão - isso é normal. Os diferentes formatos de rede são apenas outras representações da mesma chave pública.`

- *Nome* é apenas o nome da conta para seu uso exclusivo. Não é armazenado no blockchain e não será visível para outros usuários.

- *Senha* é usada para criptografar as informações da sua conta. Você precisará digitá-la novamente ao assinar transações no portal. Crie uma e lembre-se dela.

Como resultado, após criar uma conta, você a verá na lista de contas na extensão Polkadot{.js}. Clicando nos três pontos, você pode renomear a conta, exportá-la, removê-la da extensão e alterar a rede usada para a conta.

Além disso, a conta aparecerá no menu **Contas -> Contas** no portal, onde será observado que foi injetada usando a extensão.

{% roboWikiPicture {src:"docs/creating-an-account/1.6-account-injected.png", alt:"Criação de conta bem-sucedida"} %}{% endroboWikiPicture %}


## 2. Diretamente no Aplicativo Robonomics Parachain

Você pode usar a interface do usuário no Portal Polkadot / Substrate para criar uma conta. Pode ser usada para desenvolvimento e testes.

## 2.1. Abrir o Aplicativo Robonomics Parachain

Acesse o [aplicativo Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) no Portal Polkadot / Substrate. **Verifique no canto superior esquerdo se você está conectado ao Robonomics Parachain**.

Vá para **Contas -> Contas** e pressione o botão `Adicionar conta`.

{% roboWikiPicture {src:"docs/creating-an-account/2.1-robonomics-app-main-view.png", alt:"Aplicativo Robonomics Parachain"} %}{% endroboWikiPicture %}

## 2.2. Criar Conta

Você deve ver o seguinte menu pop-up com a semente da conta.

{% roboWikiPicture {src:"docs/creating-an-account/2.2-robonomics-app-seed.png", alt:"Gerando semente da conta"} %}{% endroboWikiPicture %}

Existem duas formas: *Mnemônico* (legível por humanos) e *Bruto* (uma sequência de dígitos e letras). Salve a frase-semente com segurança e pressione `Próximo`.

> Você também pode alterar o tipo de criptografia da conta a ser criada, para isso abra `Opções avançadas de criação` e escolha o tipo (`ed25519` na imagem).

{% roboWikiPicture {src:"docs/creating-an-account/ed-account.jpg", alt:"Conta do tipo de criptografia ed25519"} %}{% endroboWikiPicture %}

No próximo menu, você precisa definir o nome da conta e a senha, semelhante às instruções da extensão descritas acima.

{% roboWikiPicture {src:"docs/creating-an-account/2.3-robonomics-app-name-pass.png", alt:"Gerando nome da conta e senha"} %}{% endroboWikiPicture %}

Clicar no botão `Próximo` o levará para a última janela. Clique em `Salvar` para concluir a criação da conta. Também será gerado um arquivo JSON de backup que você deve armazenar com segurança. Você pode usar este arquivo posteriormente para recuperar sua conta se lembrar da senha.

{% roboWikiPicture {src:"docs/creating-an-account/2.4-robonomics-app-account-created.png", alt:"Criação de conta bem-sucedida"} %}{% endroboWikiPicture %}

## 2.3 Adicionar conta ed25519 à extensão Polkadot

Você pode precisar adicionar a conta criada à extensão Polkadot.js (para a conta ed25519, você só pode fazer isso com o arquivo JSON de backup). Para isso, você precisa criar um arquivo de backup da conta. Clique nos três pontos em sua conta e escolha `Criar um arquivo de backup para esta conta` e escreva sua senha.

{% roboWikiPicture {src:"docs/creating-an-account/backup-file.jpg", alt:"Arquivo de backup"} %}{% endroboWikiPicture %}

Em seguida, abra a extensão e clique no botão `+` no canto superior direito, depois escolha `Restaurar conta a partir do arquivo JSON de backup`.

{% roboWikiPicture {src:"docs/creating-an-account/extention-add-backup.jpg", alt:"Restaurar backup na extensão"} %}{% endroboWikiPicture %}

Na janela aberta, solte o arquivo salvo, insira a senha e pressione `Restaurar`.

{% roboWikiPicture {src:"docs/creating-an-account/file-backup.jpg", alt:"Restaurar backup na extensão 2"} %}{% endroboWikiPicture %}

## 3. Conta Criada com Sucesso

Agora você pode operar totalmente com sua conta recém-criada. Envie e receba tokens, mensagens, escreva datalogs e muito mais. Sinta-se à vontade para explorar todos os recursos do aplicativo. Para copiar o endereço da sua conta, basta clicar no ícone correspondente, e o endereço será copiado para a área de transferência.

Se desejar saber mais sobre contas Polkadot / Kusama e maneiras adicionais de criá-las, mais informações podem ser encontradas [aqui](https://wiki.polkadot.network/docs/learn-accounts) e [aqui](https://wiki.polkadot.network/docs/learn-account-generation).