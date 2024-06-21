---
title: Ativar Assinatura
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

Neste artigo, você criará contas de parachain Robonomics e comprará uma assinatura IoT. 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


Para controlar o Home Assistant com Robonomics, você precisa de 2 contas no parachain Robonomics. Para uma das contas (`sub_owner`), você comprará uma assinatura Robonomics. A segunda conta (`sub_controller`) controlará todos os processos do Home Assistant (como telemetria) e dará acesso a outros usuários. Essas contas fornecerão segurança para o seu Home Assistant. 

<robo-wiki-note type="warning" title="WARNING">

Ambas as contas devem ser criadas com criptografia **ed25519**. Por causa disso, você precisa criar uma conta usando a UI Polkadot-JS e selecionar a criptografia necessária.

Essa funcionalidade está desativada por padrão na interface do Polkadot-JS UI. Para ativá-la, vá para `Settings` -> `General` -> `account options` e selecione `Allow local in-browser account storage` no menu suspenso`in-browser account creation`.

</robo-wiki-note>

## Criar contas de proprietário e controlador

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQiJYPYajUJXENX2PzSJMSKGSshyWyPNqugSYxP5eCNvm', type:'mp4'}]" />

1. Acesse o [aplicativo Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) no Portal Polkadot / Substrate. **Verifique o canto superior esquerdo para garantir que você esteja conectado ao Robonomics Parachain.**

2. Vá para `Accounts` -> `Accounts` e clique no botão `Add account`. Você verá o menu suspenso com a semente da conta. Ela tem duas formas: *Mnemonic* (legível por humanos) e *Raw* (uma sequência de dígitos e letras). 

3. Abra `Advanced creation options`, altere o tipo de criptografia da criação da conta para `Edwards - ed25519` e clique em `Next`.


4. Salve a frase-semente mnemônica com segurança e clique em `Next`.

5. No próximo menu, você precisa definir o nome da conta e a senha. Dê a ele o nome `sub_owner` para conveniência. Clique em `Next`.

6. Na última janela, clique em `Save` para concluir a criação da conta. Ele também gerará arquivos JSON de backup que você deve armazenar com segurança. Você pode usar este arquivo posteriormente para recuperar sua conta, se lembrar da senha.

7. Repita essas etapas para uma conta com o nome `sub_controller`.


## Adicionar Contas ao Polkadot.js

Para maior conveniência, você deve usar a [extensão Polkadot.js](https://polkadot.js.org/extension/) e adicionar essas contas recém-criadas a ela. Para uma conta ed25519, você só pode fazer isso com um arquivo JSON de backup. Você pode usar os arquivos salvos quando criou as contas.

Você pode obter esses arquivos novamente criando um arquivo de backup da conta. Clique nos três pontos em sua conta, escolha `Create a backup file for this account` e digite sua senha.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmRd7gztUjWkLF4W2XuJwy5aXBwzNV2aPCU6CQQLvUpSNj', type:'mp4'}]" />

1. Abra uma extensão e clique no botão `+` no canto superior direito, em seguida, escolha `Restore account from backup JSON file`.

2. Em uma janela aberta, faça o upload do arquivo JSON, insira a senha e clique em `Restore`.

3. Verifique se a rede Robonomics está selecionada para as contas na extensão Polkadot.js. No Portal Polkadot / Substrate, vá para  `Setting` -> `Metadata` e clique no botão `Update metadata`.

4. Confirme a atualização dos metadados na janela pop-up. Agora, a extensão mostrará o rótulo da rede para a qual o endereço é usado.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmT5sTNP9t8gpbD4RJJw6ETwG4wiziiChAh2uHHBk9Zsyd', type:'mp4'}]" />

## Ativar Assinatura Robonomics 

<robo-wiki-note type="okay">

Para esta etapa, você deve ter uma quantidade suficiente de tokens XRT (mínimo de 2-3 XRTs) em sua conta `sub_owner`.

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmXrFCajmJgkRDSbshGD3QehjnoyS6jafEPSjHdYkoBHum', type:'mp4'}]" />

1. Acesse o dapp Robonomics na [página de assinatura](https://dapp.robonomics.network/#/subscription) e clique em conectar conta na barra lateral direita.

2. No menu pop-up seguinte, conecte a extensão Polkadot.js. Você verá o endereço da sua conta com saldo.

3. Antes de comprar, verifique se você escolheu a conta `sub_owner`. Clique no ícone do perfil do endereço, você deve ver a conta `sub_owner` abaixo do campo `Verificar conta proprietária`.

4. Por fim, clique no botão `SUBMIT` e insira a senha da sua conta. Depois disso, aguarde até que o processo de ativação seja concluído. Você verá o estado da sua assinatura após algum tempo.


## Adicionar Contas à Assinatura

Agora você precisa adicionar uma conta `sub_controller` à **lista de acesso**.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmV1gkwtcXsWv54ov9tuXfcHg7nqs1foM8cRwts4sqnqtX', type:'mp4'}]" />

1. Abra a extensão e clique no ícone próximo ao nome da conta. Ele copiará o endereço da conta.


2. Cole este endereço no campo `Robonomics parachain address` na parte **Gerenciar acesso**. Dê um nome a ele e clique no botão `+`. 

3. Repita as etapas 1 e 2 para a conta `sub_owner`.

4. Clique em `Save`. Insira a senha do seu `sub_owner` na janela pop-up e aguarde até que o processo de ativação seja concluído.
